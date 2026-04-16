import { type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

async function getCallSummary(contactId: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://services.leadconnectorhq.com/contacts/${contactId}/notes`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GHL_API_KEY}`,
          Version: '2021-07-28',
        },
        cache: 'no-store',
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const note = data.notes
      ?.slice()
      .sort((a: { dateAdded: string }, b: { dateAdded: string }) =>
        new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      )
      .find((n: { body?: string }) => n.body?.includes('AI Call with:'));
    if (!note) return null;
    const match = note.body.match(/Call Summary:\n([\s\S]*?)(?:\n\nFetched info:|-{10,})/);
    return match ? match[1].trim() : null;
  } catch {
    return null;
  }
}

export async function GET(_request: NextRequest) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (!user || authError) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: client, error: clientError } = await supabase
    .from('clients')
    .select('ghl_pipeline_id')
    .eq('id', user.id)
    .single();

  if (clientError || !client?.ghl_pipeline_id) {
    return Response.json({ error: 'Pipeline not configured' }, { status: 404 });
  }

  if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) {
    return Response.json({ error: 'GHL not configured' }, { status: 500 });
  }

  const url = new URL('https://services.leadconnectorhq.com/opportunities/search');
  url.searchParams.set('pipeline_id', client.ghl_pipeline_id);
  url.searchParams.set('location_id', process.env.GHL_LOCATION_ID);
  url.searchParams.set('limit', '100');

  const ghlRes = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${process.env.GHL_API_KEY}`,
      Version: '2021-07-28',
    },
    cache: 'no-store',
  });

  if (!ghlRes.ok) {
    const errText = await ghlRes.text();
    console.error('GHL API error:', ghlRes.status, errText);
    return Response.json({ error: 'GHL API error', status: ghlRes.status, detail: errText }, { status: 502 });
  }

  const data = await ghlRes.json();
  const opps = data.opportunities ?? [];

  // Fetch call summaries in parallel
  const summaries = await Promise.all(
    opps.map((opp: { contact?: { id?: string } }) =>
      opp.contact?.id ? getCallSummary(opp.contact.id) : Promise.resolve(null)
    )
  );

  const enriched = opps.map((opp: object, i: number) => ({
    ...opp,
    callSummary: summaries[i],
  }));

  return Response.json({ opportunities: enriched });
}
