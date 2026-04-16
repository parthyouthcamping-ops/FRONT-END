"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Paintbrush, 
  FileText, 
  Newspaper, 
  Globe, 
  Settings, 
  Image as ImageIcon,
  LogOut,
  ChevronRight,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: 'General', icon: LayoutDashboard, href: '/admin' },
    { label: 'Website Theme', icon: Paintbrush, href: '/admin/theme' },
    { label: 'Pages', icon: FileText, href: '/admin/pages' },
    { label: 'Blog', icon: Newspaper, href: '/admin/blogs', badge: 'NEW' },
    { label: 'Media Gallery', icon: ImageIcon, href: '/admin/media' },
    { label: 'Localization', icon: Globe, href: '/admin/localization' },
    { label: 'Settings', icon: Settings, href: '/admin/settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r flex flex-col z-50">
        <div className="p-8 border-b">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center">
                 <div className="w-5 h-5 border-4 border-white rounded-full" />
              </div>
              <div className="flex flex-col">
                 <span className="text-xl font-black tracking-tighter text-black uppercase">AVIAN</span>
                 <span className="text-[8px] font-black tracking-[0.2em] text-gray-400 uppercase leading-none">Control Panel</span>
              </div>
           </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link key={item.label} href={item.href}>
                <div className={`
                  flex items-center justify-between px-4 py-4 rounded-2xl transition-all group
                  ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:bg-gray-50 hover:text-black'}
                `}>
                  <div className="flex items-center gap-4">
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-black uppercase tracking-widest">{item.label}</span>
                  </div>
                  {item.badge ? (
                    <span className="bg-primary text-black text-[8px] font-black px-1.5 py-0.5 rounded-full">{item.badge}</span>
                  ) : isActive ? (
                    <ChevronRight className="w-4 h-4" />
                  ) : null}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t">
           <button className="flex items-center gap-4 px-4 py-4 w-full text-red-500 hover:bg-red-50 rounded-2xl transition-all font-black uppercase tracking-widest text-xs">
              <LogOut className="w-5 h-5" />
              Log Out
           </button>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto relative">
        {children}
      </main>
    </div>
  );
}
