import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="page-enter flex-1 min-w-0 px-6 py-8 md:px-10 md:py-10 pt-16 md:pt-10 bg-[#fafafa]">
        {children}
      </main>
    </div>
  );
}
