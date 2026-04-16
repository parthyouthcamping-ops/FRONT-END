"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Settings, Layout, ExternalLink, MoreVertical, Edit2 } from 'lucide-react';
import Link from 'next/link';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

export default function PagesList() {
  // Mock data for pages
  const [pages] = useState([
    { id: 'home', title: 'Homepage', slug: '/', status: 'published', updatedAt: '2 hours ago' },
    { id: 'about', title: 'About Us', slug: '/about', status: 'published', updatedAt: '1 day ago' },
    { id: 'contact', title: 'Contact Us', slug: '/contact', status: 'published', updatedAt: '3 days ago' },
    { id: 'privacy', title: 'Privacy Policy', slug: '/privacy', status: 'draft', updatedAt: '5 mins ago' },
  ]);

  return (
    <div className="p-10 max-w-6xl mx-auto space-y-10">
      <div className="flex items-center justify-between">
         <div className="space-y-1">
            <h1 className="text-4xl font-black uppercase tracking-tight">Website Pages</h1>
            <p className="text-gray-500 font-medium tracking-tight">Manage your website content and landing pages.</p>
         </div>
         <Button className="font-black uppercase tracking-widest text-xs px-6 py-6 rounded-2xl shadow-xl shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" />
            New Page
          </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {pages.map(page => (
           <div key={page.id} className="bg-white p-6 rounded-[32px] border-2 border-gray-100 hover:border-primary transition-all group relative overflow-hidden">
              <div className="flex items-start justify-between mb-8">
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${page.status === 'published' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-400'}`}>
                    <FileText className="w-6 h-6" />
                 </div>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                       <Button variant="ghost" size="icon"><MoreVertical className="w-5 h-5 text-gray-400" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-2xl p-2 min-w-[160px]">
                       <DropdownMenuItem className="p-3 rounded-xl font-bold text-xs uppercase cursor-pointer">Duplicate</DropdownMenuItem>
                       <DropdownMenuItem className="p-3 rounded-xl font-bold text-xs uppercase cursor-pointer text-red-600">Delete Page</DropdownMenuItem>
                    </DropdownMenuContent>
                 </DropdownMenu>
              </div>

              <div className="space-y-1">
                 <h3 className="text-xl font-black uppercase tracking-tight text-black">{page.title}</h3>
                 <p className="text-xs font-bold text-gray-400 tracking-widest">{page.slug}</p>
              </div>

              <div className="mt-8 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${page.status === 'published' ? 'bg-green-500' : 'bg-orange-400'}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{page.status}</span>
                 </div>
                 <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{page.updatedAt}</span>
              </div>

              <div className="absolute inset-0 bg-primary/95 flex flex-col items-center justify-center gap-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-10 p-6">
                  <Link href={`/admin/pages/${page.id}`} className="w-full">
                    <Button className="w-full bg-white text-black font-black uppercase tracking-widest rounded-2xl py-6 hover:bg-gray-100">
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit Content
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full text-white font-black uppercase tracking-widest rounded-2xl py-6 border-white/20 border">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Page
                  </Button>
              </div>
           </div>
         ))}

         <div className="border-2 border-dashed border-gray-200 rounded-[32px] flex flex-col items-center justify-center p-10 group cursor-pointer hover:border-primary transition-all">
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
               <Plus className="w-8 h-8 text-gray-300 group-hover:text-primary" />
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400">Add New Landing Page</p>
         </div>
      </div>
    </div>
  );
}
