"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Save, RefreshCw, Smartphone, Monitor } from 'lucide-react';
import { toast } from 'sonner';

export default function ThemeSettings() {
  const [buttonStyle, setButtonStyle] = useState('rounded');
  const [headingStyle, setHeadingStyle] = useState('default');
  const [headerStyle, setHeaderStyle] = useState('full');

  const handleSave = () => {
    toast.success("Theme settings updated successfully");
  };

  return (
    <div className="p-10 max-w-6xl mx-auto space-y-12">
      <div className="flex items-center justify-between sticky top-0 bg-gray-50/80 backdrop-blur-md z-10 py-4 -translate-y-4">
         <div className="space-y-1">
            <h1 className="text-4xl font-black uppercase tracking-tight">Website Theme</h1>
            <p className="text-gray-500 font-medium tracking-tight">Configure global styles, typography, and UI elements.</p>
         </div>
         <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-2xl h-12">
               <RefreshCw className="w-4 h-4 mr-2" />
               Reset Defaults
            </Button>
            <Button onClick={handleSave} className="rounded-2xl h-12 px-8 font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20">
               <Save className="w-4 h-4 mr-2" />
               Save Changes
            </Button>
         </div>
      </div>

      {/* Button Styles */}
      <section className="space-y-6">
         <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Button Style</h2>
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { id: 'box', label: 'Fill - Box', css: 'rounded-none' },
              { id: 'curved', label: 'Fill - Curved', css: 'rounded-lg' },
              { id: 'rounded', label: 'Fill - Rounded', css: 'rounded-full' },
              { id: 'hollow-box', label: 'Hollow - Box', css: 'rounded-none border-2 border-primary bg-transparent text-primary' },
              { id: 'hollow-curved', label: 'Hollow - Curved', css: 'rounded-lg border-2 border-primary bg-transparent text-primary' },
              { id: 'hollow-rounded', label: 'Hollow - Rounded', css: 'rounded-full border-2 border-primary bg-transparent text-primary' },
            ].map((style) => (
              <div 
                key={style.id}
                onClick={() => setButtonStyle(style.id)}
                className={`
                  p-6 rounded-[32px] border-2 transition-all cursor-pointer flex flex-col items-center gap-6 justify-center
                  ${buttonStyle === style.id ? 'border-primary bg-white shadow-xl shadow-primary/10' : 'border-gray-100 bg-white hover:border-gray-200'}
                `}
              >
                <div className="flex-1 flex items-center justify-center">
                   <button className={`bg-primary text-black font-black uppercase text-[10px] px-4 py-2 pointer-events-none ${style.css}`}>
                     BOOK NOW
                   </button>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-center">{style.label}</span>
              </div>
            ))}
         </div>
      </section>

      {/* Heading Styles */}
      <section className="space-y-6">
         <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Section Heading Style</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 'default', label: 'Default', content: <div className="space-y-1"><p className="text-sm font-black mx-auto">Section Heading</p><div className="w-10 h-0.5 bg-gray-200 mx-auto" /></div> },
              { id: 'star', label: 'Embellishment - Star', content: <div className="space-y-1"><p className="text-sm font-black mx-auto">Section Heading</p><div className="flex items-center gap-2 justify-center"><div className="w-6 h-0.5 bg-gray-200" /><div className="w-2 h-2 bg-primary rotate-45" /><div className="w-6 h-0.5 bg-gray-200" /></div></div> },
              { id: 'lines', label: 'Side Lines', content: <div className="flex items-center gap-2"><div className="flex-1 h-0.5 bg-gray-200" /><p className="text-sm font-black whitespace-nowrap">Section Heading</p><div className="flex-1 h-0.5 bg-gray-200" /></div> },
              { id: 'left', label: 'Left Aligned', content: <div className="space-y-1 text-left w-full pl-4"><p className="text-sm font-black">Section Heading</p><div className="w-10 h-0.5 bg-gray-200" /></div> },
            ].map((style) => (
              <div 
                key={style.id}
                onClick={() => setHeadingStyle(style.id)}
                className={`
                  p-8 rounded-[32px] border-2 transition-all cursor-pointer flex flex-col items-center gap-8
                  ${headingStyle === style.id ? 'border-primary bg-white shadow-xl shadow-primary/10' : 'border-gray-100 bg-white hover:border-gray-200'}
                `}
              >
                <div className="h-10 flex items-center justify-center w-full uppercase">
                  {style.content}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-center">{style.label}</span>
              </div>
            ))}
         </div>
      </section>

      {/* Header Style Preview */}
      <section className="space-y-6">
         <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Header Style</h2>
         <div className="bg-white p-8 rounded-[40px] border-2 border-gray-100 space-y-8">
            <div className="w-full h-48 bg-gray-50 rounded-[32px] relative overflow-hidden flex items-center justify-center border-dashed border-2 border-gray-200">
               <div className="absolute top-0 left-0 right-0 h-14 bg-white border-b flex items-center justify-between px-6">
                  <div className="font-black text-sm">LOGO</div>
                  <div className="flex gap-4">
                     {[...Array(4)].map((_, i) => <div key={i} className="w-8 h-2 bg-gray-100 rounded" />)}
                  </div>
               </div>
               <div className="text-gray-300 font-bold italic tracking-tighter text-4xl">LIVE PREVIEW</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <Button variant={headerStyle === 'full' ? 'default' : 'outline'} onClick={() => setHeaderStyle('full')} className="rounded-2xl h-14 font-black uppercase">Sticky Header</Button>
               <Button variant={headerStyle === 'static' ? 'default' : 'outline'} onClick={() => setHeaderStyle('static')} className="rounded-2xl h-14 font-black uppercase">Static Header</Button>
            </div>
         </div>
      </section>
    </div>
  );
}
