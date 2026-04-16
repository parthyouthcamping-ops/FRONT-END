import React from 'react';
import { CMSSection } from '@/lib/cms-types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface SectionEditorPanelProps {
  section: CMSSection;
  onChange: (data: any) => void;
}

export function SectionEditorPanel({ section, onChange }: SectionEditorPanelProps) {
  const data = section.data;

  const handleChange = (key: string, value: any) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div className="w-96 border-l bg-white flex flex-col z-40 overflow-y-auto">
      <div className="p-4 border-b">
         <h2 className="font-black uppercase text-sm tracking-tighter">Edit {section.type}</h2>
      </div>
      
      <div className="p-6 space-y-8">
        {/* Render different fields based on section type */}
        {section.type === 'hero' && (
          <>
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Section Title</Label>
              <Input 
                value={data.title} 
                onChange={(e) => handleChange('title', e.target.value)}
                className="font-bold border-2 focus:border-primary rounded-xl"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Subtitle</Label>
              <Textarea 
                value={data.subtitle} 
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="font-medium border-2 focus:border-primary rounded-xl h-24"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Background Image URL</Label>
              <Input 
                value={data.backgroundImage} 
                onChange={(e) => handleChange('backgroundImage', e.target.value)}
                className="font-bold border-2 focus:border-primary rounded-xl"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-3">
                 <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">CTA Text</Label>
                 <Input 
                   value={data.ctaText} 
                   onChange={(e) => handleChange('ctaText', e.target.value)}
                   className="font-bold border-2 focus:border-primary rounded-xl"
                 />
               </div>
               <div className="space-y-3">
                 <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">CTA Link</Label>
                 <Input 
                   value={data.ctaLink} 
                   onChange={(e) => handleChange('ctaLink', e.target.value)}
                   className="font-bold border-2 focus:border-primary rounded-xl"
                 />
               </div>
            </div>
          </>
        )}

        {/* Global Settings for the section */}
        <div className="pt-8 border-t space-y-4">
           <div className="flex items-center justify-between">
              <Label className="text-xs font-bold text-gray-700">Show Section</Label>
              <Switch checked={section.isVisible !== false} />
           </div>
        </div>
      </div>
    </div>
  );
}
