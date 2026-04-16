"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import ContactsTable from '@/components/dashboard/ContactsTable';

interface Opportunity {
  id: string;
  name: string;
  status: string;
  monetaryValue?: number;
  createdAt?: string;
  callSummary?: string | null;
  contact?: {
    id?: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
}

export default function ContactsPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [companyName, setCompanyName] = useState('your website');
  const [loading, setLoading] = useState(true);
  const [pipelineLinked, setPipelineLinked] = useState(true);

  useEffect(() => {
    async function load() {
      // Get company name from Supabase client-side
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: client } = await supabase
          .from('clients')
          .select('company_name, ghl_pipeline_id')
          .eq('id', user.id)
          .single();
        if (client?.company_name) setCompanyName(client.company_name);
        if (!client?.ghl_pipeline_id) {
          setPipelineLinked(false);
          setLoading(false);
          return;
        }
      }

      // Fetch contacts via API route (handles GHL server-side)
      try {
        const res = await fetch('/api/contacts');
        if (res.ok) {
          const data = await res.json();
          setOpportunities(data.opportunities ?? []);
        }
      } catch {
        // silently fail — show empty table
      }

      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="page-enter">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="font-['Space_Grotesk'] font-extrabold text-[1.6rem] text-gray-900">
            Contacts
          </h1>
          {!loading && opportunities.length > 0 && (
            <span className="px-2.5 py-0.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-[0.75rem] font-bold">
              {opportunities.length}
            </span>
          )}
        </div>
        <p className="text-[0.9rem] text-gray-400">
          Leads from {companyName}
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-[88px] bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <ContactsTable opportunities={opportunities} companyName={companyName} />

          {!pipelineLinked && (
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4 text-[0.875rem] text-amber-700">
              <strong>Setup needed:</strong> Your pipeline is not linked yet. Contact your administrator.
            </div>
          )}
        </>
      )}
    </div>
  );
}
