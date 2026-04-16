"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import WebsiteRequestForm from '@/components/dashboard/WebsiteRequestForm';
import { ExternalLink } from 'lucide-react';

interface Request {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  created_at: string;
}

const statusConfig: Record<string, { label: string; classes: string }> = {
  pending:     { label: 'Pending',     classes: 'bg-amber-50 text-amber-600 border-amber-200' },
  in_progress: { label: 'In Progress', classes: 'bg-blue-50 text-blue-600 border-blue-200' },
  done:        { label: 'Done',        classes: 'bg-green-50 text-green-600 border-green-200' },
};

const priorityConfig: Record<string, { label: string; classes: string }> = {
  low:    { label: 'Low',    classes: 'text-gray-400' },
  normal: { label: 'Normal', classes: 'text-gray-500' },
  high:   { label: 'High',   classes: 'text-red-500 font-semibold' },
};

function WebsitePreview({ url }: { url: string }) {
  const displayUrl = url.replace(/^https?:\/\//, '');

  return (
    <div className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3 mb-8 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-2.5">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span className="text-[0.85rem] font-mono text-gray-600">{displayUrl}</span>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-[0.78rem] font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-all duration-150"
      >
        <ExternalLink size={12} />
        Open site
      </a>
    </div>
  );
}

export default function WebsitePage() {
  const [requests, setRequests]     = useState<Request[]>([]);
  const [websiteUrl, setWebsiteUrl] = useState<string | null>(null);
  const [loading, setLoading]       = useState(true);
  const [showForm, setShowForm]     = useState(false);

  const loadData = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const [{ data: client }, { data: reqs }] = await Promise.all([
      supabase.from('clients').select('website_url').eq('id', user!.id).single(),
      supabase.from('website_requests').select('*').order('created_at', { ascending: false }),
    ]);

    setWebsiteUrl(client?.website_url ?? null);
    setRequests(reqs ?? []);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const handleClose = () => {
    setShowForm(false);
    loadData();
  };

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="font-['Space_Grotesk'] font-extrabold text-[1.6rem] text-gray-900 mb-1">
            Website
          </h1>
          <p className="text-[0.9rem] text-gray-400">
            Your live site and update requests
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-br from-red-600 to-red-800 text-white font-bold text-[0.875rem] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(220,38,38,0.25)] transition-all duration-300 whitespace-nowrap"
        >
          + New Request
        </button>
      </div>

      {/* Website preview */}
      {!loading && websiteUrl && <WebsitePreview url={websiteUrl} />}

      {/* Requests label */}
      <p className="text-[0.62rem] font-bold tracking-[2.5px] uppercase text-gray-300 mb-3">
        Update Requests
      </p>

      {/* List */}
      {loading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[88px] bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-2xl mb-4">
            🌐
          </div>
          <h3 className="font-['Space_Grotesk'] font-bold text-gray-700 mb-1">No requests yet</h3>
          <p className="text-[0.85rem] text-gray-400 max-w-[280px]">
            Use the button above to submit your first website update request.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {requests.map((req) => {
            const status   = statusConfig[req.status]     ?? statusConfig.pending;
            const priority = priorityConfig[req.priority] ?? priorityConfig.normal;
            const date = new Date(req.created_at).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric',
            });

            return (
              <div
                key={req.id}
                className="bg-white border border-gray-100 rounded-2xl px-6 py-5 hover:border-red-100 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
                      <h3 className="font-['Space_Grotesk'] font-semibold text-gray-800 text-[0.95rem]">
                        {req.title}
                      </h3>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[0.7rem] font-semibold ${status.classes}`}>
                        {status.label}
                      </span>
                    </div>
                    <p className="text-[0.85rem] text-gray-400 line-clamp-2">{req.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[0.72rem] text-gray-300 mb-1">{date}</p>
                    <p className={`text-[0.75rem] ${priority.classes}`}>
                      {priority.label} priority
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showForm && <WebsiteRequestForm onClose={handleClose} />}
    </div>
  );
}
