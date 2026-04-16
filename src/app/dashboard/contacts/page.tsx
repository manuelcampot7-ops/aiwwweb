import { createClient } from '@/lib/supabase/server';
import ContactsTable from '@/components/dashboard/ContactsTable';

async function getContactSummary(contactId: string): Promise<string | null> {
  if (!process.env.GHL_API_KEY) return null;
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
    // Find the most recent AI call note
    const note = data.notes
      ?.slice()
      .sort((a: { dateAdded: string }, b: { dateAdded: string }) =>
        new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      )
      .find((n: { body?: string }) => n.body?.includes('AI Call with:'));
    if (!note) return null;
    // Extract just the Call Summary section
    const match = note.body.match(/Call Summary:\n([\s\S]*?)(?:\n\nFetched info:|-{10,})/);
    return match ? match[1].trim() : null;
  } catch {
    return null;
  }
}

async function getOpportunities(pipelineId: string | null) {
  if (!pipelineId || !process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) return [];

  try {
    const url = new URL('https://services.leadconnectorhq.com/opportunities/search');
    url.searchParams.set('pipeline_id', pipelineId);
    url.searchParams.set('location_id', process.env.GHL_LOCATION_ID);
    url.searchParams.set('limit', '100');

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${process.env.GHL_API_KEY}`,
        Version: '2021-07-28',
      },
      cache: 'no-store',
    });

    if (!res.ok) return [];
    const data = await res.json();
    const opps = data.opportunities ?? [];

    // Fetch AI call summaries in parallel for all contacts
    const summaries = await Promise.all(
      opps.map((opp: { contact?: { id?: string } }) =>
        opp.contact?.id ? getContactSummary(opp.contact.id) : Promise.resolve(null)
      )
    );

    return opps.map((opp: object, i: number) => ({ ...opp, callSummary: summaries[i] }));
  } catch {
    return [];
  }
}

export default async function ContactsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: client } = await supabase
    .from('clients')
    .select('ghl_pipeline_id, company_name')
    .eq('id', user?.id)
    .single();

  const opportunities = await getOpportunities(client?.ghl_pipeline_id ?? null);

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="font-['Space_Grotesk'] font-extrabold text-[1.6rem] text-gray-900">
            Contacts
          </h1>
          {opportunities.length > 0 && (
            <span className="px-2.5 py-0.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-[0.75rem] font-bold">
              {opportunities.length}
            </span>
          )}
        </div>
        <p className="text-[0.9rem] text-gray-400">
          Leads from {client?.company_name ?? 'your website'}
        </p>
      </div>

      <ContactsTable opportunities={opportunities} companyName={client?.company_name ?? 'Client'} />

      {!client?.ghl_pipeline_id && (
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4 text-[0.875rem] text-amber-700">
          <strong>Setup needed:</strong> Your pipeline is not linked yet. Contact your administrator.
        </div>
      )}
    </div>
  );
}
