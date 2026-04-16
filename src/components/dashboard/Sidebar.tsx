"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Globe, CreditCard, Settings, LogOut, X, Menu } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import SidebarLink from './SidebarLink';

const navItems = [
  { href: '/dashboard/contacts', icon: Users,      label: 'Contacts' },
  { href: '/dashboard/website',  icon: Globe,      label: 'Website' },
  { href: '/dashboard/account',  icon: CreditCard, label: 'Account' },
];

export default function Sidebar() {
  const router   = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full py-6 px-3">

      {/* Logo */}
      <div className="px-3 mb-8 flex items-center justify-between">
        <a href="/" className="group font-['Space_Grotesk'] font-extrabold text-[1.2rem] tracking-tight">
          <span className="bg-gradient-to-br from-red-500 to-red-700 bg-clip-text text-transparent">AI</span>
          <span className="text-gray-800 group-hover:text-gray-600 transition-colors duration-200">WWWEB</span>
        </a>
        <button
          className="md:hidden text-gray-400 hover:text-gray-600 transition-colors"
          onClick={() => setOpen(false)}
        >
          <X size={18} />
        </button>
      </div>

      {/* Label */}
      <p className="px-4 text-[0.62rem] font-bold tracking-[2.5px] uppercase text-gray-300 mb-2">
        Menu
      </p>

      {/* Main nav */}
      <nav className="flex flex-col gap-0.5">
        {navItems.map((item) => (
          <SidebarLink
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            onClick={() => setOpen(false)}
          />
        ))}
      </nav>

      {/* Bottom */}
      <div className="mt-auto flex flex-col gap-0.5">
        <div className="h-px bg-gray-100 mx-1 mb-3" />
        <SidebarLink
          href="/dashboard/settings"
          icon={Settings}
          label="Settings"
          onClick={() => setOpen(false)}
        />
        <button
          onClick={handleLogout}
          className="group flex items-center gap-3 px-4 py-2.5 rounded-xl text-[0.875rem] font-medium text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all duration-200 w-full"
        >
          <LogOut size={18} strokeWidth={1.8} className="group-hover:scale-110 transition-transform duration-200" />
          Log Out
        </button>
      </div>

      {/* Status dot */}
      <div className="flex items-center gap-2 px-4 mt-5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[0.6rem] font-mono tracking-widest uppercase text-gray-300">Systems online</span>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 min-h-screen bg-white border-r border-gray-100 flex-col shrink-0 shadow-[1px_0_12px_rgba(0,0,0,0.03)]">
        <SidebarContent />
      </aside>

      {/* Mobile toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-[300] bg-white border border-gray-200 rounded-xl p-2 shadow-sm hover:shadow-md transition-shadow"
        onClick={() => setOpen(true)}
      >
        <Menu size={20} className="text-gray-600" />
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-[200] bg-black/20 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-full w-56 bg-white z-[250] shadow-xl transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
