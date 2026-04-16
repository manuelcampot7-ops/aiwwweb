import { type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

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
    return Response.json({ error: 'GHL API error' }, { status: 502 });
  }

  const data = await ghlRes.json();
  return Response.json(data);
}
