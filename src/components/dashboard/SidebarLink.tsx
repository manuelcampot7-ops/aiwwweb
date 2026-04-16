"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type LucideIcon } from 'lucide-react';

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

export default function SidebarLink({ href, icon: Icon, label, onClick }: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-[0.875rem] font-medium transition-all duration-200 ${
        isActive
          ? 'bg-gradient-to-r from-red-50 to-rose-50 text-red-600 font-semibold shadow-sm'
          : 'text-gray-400 hover:bg-gray-50 hover:text-gray-700'
      }`}
    >
      {/* Active indicator bar */}
      <span
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full bg-red-500 transition-all duration-300 ${
          isActive ? 'h-6 opacity-100' : 'h-0 opacity-0'
        }`}
      />
      <Icon
        size={18}
        strokeWidth={isActive ? 2.2 : 1.8}
        className={`transition-transform duration-200 ${!isActive && 'group-hover:scale-110'}`}
      />
      {label}
    </Link>
  );
}
