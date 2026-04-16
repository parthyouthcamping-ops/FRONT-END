"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Paintbrush, 
  FileText, 
  Newspaper, 
  Globe, 
  Image as ImageIcon,
  ArrowRight,
  TrendingUp,
  Users,
  Eye,
  Settings
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const stats = [
    { label: 'Active Pages', value: '8', icon: FileText, color: 'text-blue-500' },
    { label: 'Total Visits', value: '12.4k', icon: Eye, color: 'text-green-500' },
    { label: 'New Blogs', value: '3', icon: Newspaper, color: 'text-orange-500' },
    { label: 'Subscribers', value: '842', icon: Users, color: 'text-purple-500' },
  ];

  const quickActions = [
    { 
      label: 'Manage Website Theme', 
      desc: 'Change buttons, colors, and global styles', 
      icon: Paintbrush, 
      href: '/admin/theme',
      color: 'bg-primary' 
    },
    { 
      label: 'Edit Content Pages', 
      desc: 'Modify homepage, about, and landing sections', 
      icon: FileText, 
      href: '/admin/pages',
      color: 'bg-black' 
    },
    { 
      label: 'Write Blog Post', 
      desc: 'Create new field notes and travel guides', 
      icon: Newspaper, 
      href: '/admin/blogs',
      color: 'bg-gray-800' 
    },
  ];

  return (
    <div className="p-10 max-w-7xl mx-auto space-y-12">
      <div className="flex items-center justify-between">
         <div className="space-y-1">
            <h1 className="text-4xl font-black uppercase tracking-tight">System Overview</h1>
            <p className="text-gray-500 font-medium tracking-tight text-lg">Good morning, Admin. Here's what's happening with your platform.</p>
         </div>
         <Link href="/">
           <Button variant="outline" className="rounded-2xl h-12">
             Visit Live Website
             <ArrowRight className="w-4 h-4 ml-2" />
           </Button>
         </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {stats.map((stat) => (
           <div key={stat.label} className="bg-white p-8 rounded-[32px] border-2 border-gray-50 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                 <div className={`p-3 rounded-2xl bg-gray-50 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                 </div>
                 <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-3xl font-black text-black">{stat.value}</p>
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mt-1">{stat.label}</p>
           </div>
         ))}
      </div>

      {/* Primary Actions (including Theme Management) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {quickActions.map((action) => (
           <Link key={action.label} href={action.href} className="group">
              <div className="bg-white p-8 rounded-[40px] border-2 border-gray-50 h-full flex flex-col items-start gap-8 hover:border-primary transition-all shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 group-hover:bg-primary/5">
                 <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center ${action.color} text-white transition-transform group-hover:scale-110`}>
                    <action.icon className="w-8 h-8" />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-2xl font-black uppercase tracking-tight text-black">{action.label}</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">{action.desc}</p>
                 </div>
                 <div className="mt-auto pt-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest group-hover:text-primary transition-colors">
                    Go to section
                    <ArrowRight className="w-4 h-4" />
                 </div>
              </div>
           </Link>
         ))}
      </div>

      {/* Recent Activity Mockup */}
      <div className="bg-black text-white p-12 rounded-[50px] relative overflow-hidden">
         <div className="relative z-10 space-y-6">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-primary">Notifications</h2>
            <div className="space-y-4">
               <div className="flex items-center gap-6 p-4 rounded-3xl bg-white/5 border border-white/10">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                  <p className="font-bold">Homepage hero image updated by Admin</p>
                  <span className="ml-auto text-[10px] uppercase font-black opacity-40">2 mins ago</span>
               </div>
               <div className="flex items-center gap-6 p-4 rounded-3xl bg-white/5 border border-white/10">
                  <div className="w-3 h-3 bg-gray-600 rounded-full" />
                  <p className="font-bold text-gray-400">Prisma database synced with Supabase</p>
                  <span className="ml-auto text-[10px] uppercase font-black opacity-40">1 hour ago</span>
               </div>
            </div>
         </div>
         <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-[180px] opacity-20 -translate-y-1/2 translate-x-1/2" />
      </div>
    </div>
  );
}
