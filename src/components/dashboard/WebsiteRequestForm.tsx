"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function WebsiteRequestForm({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [title, setTitle]           = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority]     = useState('normal');
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) { setError('Not authenticated.'); setLoading(false); return; }

    const { error: insertError } = await supabase.from('website_requests').insert({
      client_id: user.id,
      title,
      description,
      priority,
    });

    if (insertError) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
      return;
    }

    router.refresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center px-4 bg-black/30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-[520px] p-7">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-['Space_Grotesk'] font-bold text-[1.15rem] text-gray-900">
            New Website Request
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-light leading-none"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-[0.8rem] font-semibold text-gray-600 mb-1.5">
              Request title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Update the contact page phone number"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[0.875rem] outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/10 placeholder:text-gray-300"
            />
          </div>

          <div>
            <label className="block text-[0.8rem] font-semibold text-gray-600 mb-1.5">
              Description
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe exactly what you'd like changed or added…"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[0.875rem] outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/10 placeholder:text-gray-300 resize-none"
            />
          </div>

          <div>
            <label className="block text-[0.8rem] font-semibold text-gray-600 mb-1.5">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[0.875rem] outline-none focus:border-red-400 bg-white cursor-pointer"
            >
              <option value="low">Low — no rush</option>
              <option value="normal">Normal</option>
              <option value="high">High — urgent</option>
            </select>
          </div>

          {error && (
            <p className="text-[0.82rem] text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          <div className="flex gap-3 mt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-[0.875rem] font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-gradient-to-br from-red-600 to-red-800 text-white font-bold text-[0.875rem] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(220,38,38,0.25)] transition-all duration-300 disabled:opacity-60"
            >
              {loading ? 'Sending…' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
