import { createClient } from '@/lib/supabase/server';

const statusConfig: Record<string, { label: string; dot: string; badge: string }> = {
  active:    { label: 'Active',    dot: 'bg-green-500', badge: 'bg-green-50 text-green-700 border-green-200' },
  paused:    { label: 'Paused',    dot: 'bg-amber-500', badge: 'bg-amber-50 text-amber-700 border-amber-200' },
  cancelled: { label: 'Cancelled', dot: 'bg-gray-400',  badge: 'bg-gray-50 text-gray-600 border-gray-200' },
};

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: client } = await supabase
    .from('clients')
    .select('*')
    .eq('id', user?.id)
    .single();

  const status = statusConfig[client?.plan_status ?? 'active'];
  const started = client?.plan_started_at
    ? new Date(client.plan_started_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : '—';
  const renews = client?.plan_renews_at
    ? new Date(client.plan_renews_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : '—';

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-['Space_Grotesk'] font-extrabold text-[1.6rem] text-gray-900 mb-1">
          Account
        </h1>
        <p className="text-[0.9rem] text-gray-400">
          Your membership plan and billing details
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-[860px]">
        {/* Plan Card */}
        <div className="bg-white border border-red-500/[0.12] rounded-2xl p-7 shadow-[0_2px_16px_rgba(220,38,38,0.06)]">
          <div className="flex items-center justify-between mb-5">
            <p className="text-[0.75rem] font-bold tracking-[2px] uppercase text-gray-400">Current Plan</p>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[0.72rem] font-semibold ${status.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </span>
          </div>

          <div className="mb-5">
            <h2 className="font-['Space_Grotesk'] font-extrabold text-[2.2rem] text-gray-900 leading-none mb-1">
              {client?.plan_name ?? 'Starter'}
            </h2>
            {client?.plan_price && (
              <p className="text-[1rem] text-gray-400">
                <span className="text-[1.4rem] font-bold text-gray-700">${client.plan_price}</span>
                <span className="text-gray-400"> / month</span>
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2.5 pt-5 border-t border-gray-100">
            <div className="flex justify-between text-[0.85rem]">
              <span className="text-gray-400">Member since</span>
              <span className="font-medium text-gray-700">{started}</span>
            </div>
            <div className="flex justify-between text-[0.85rem]">
              <span className="text-gray-400">Next renewal</span>
              <span className="font-medium text-gray-700">{renews}</span>
            </div>
          </div>
        </div>

        {/* Account Info Card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-7">
          <p className="text-[0.75rem] font-bold tracking-[2px] uppercase text-gray-400 mb-5">
            Account Info
          </p>

          <div className="flex flex-col gap-4">
            {client?.full_name && (
              <div>
                <p className="text-[0.75rem] text-gray-400 mb-0.5">Name</p>
                <p className="font-medium text-gray-800">{client.full_name}</p>
              </div>
            )}
            {client?.company_name && (
              <div>
                <p className="text-[0.75rem] text-gray-400 mb-0.5">Company</p>
                <p className="font-medium text-gray-800">{client.company_name}</p>
              </div>
            )}
            <div>
              <p className="text-[0.75rem] text-gray-400 mb-0.5">Email</p>
              <p className="font-medium text-gray-800">{user?.email}</p>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-[0.8rem] text-gray-400">
              Need to make changes to your plan?{' '}
              <a href="mailto:hello@aiwwweb.com" className="text-red-600 font-semibold hover:underline">
                Contact us
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
