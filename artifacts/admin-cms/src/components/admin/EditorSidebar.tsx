import React from 'react';
import { CMSSection, SectionType } from '@/lib/cms-types';
import { Button } from '@/components/ui/button';
import { Plus, GripVertical, Trash2, Eye, EyeOff } from 'lucide-react';

interface EditorSidebarProps {
  sections: CMSSection[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onAdd: (type: SectionType) => void;
  onReorder: (sections: CMSSection[]) => void;
}

export function EditorSidebar({ sections, activeId, onSelect, onAdd }: EditorSidebarProps) {
  return (
    <div className="w-80 border-r bg-white flex flex-col z-40">
      <div className="p-4 border-b flex items-center justify-between">
         <h2 className="font-bold uppercase text-xs tracking-widest text-gray-500">Content Sections</h2>
         <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => (window as any).showSectionPicker()}>
            <Plus className="w-4 h-4" />
         </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
         {sections.map((section, idx) => (
           <div 
            key={section.id}
            className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all cursor-move ${activeId === section.id ? 'border-primary bg-primary/5' : 'border-gray-50 hover:border-gray-200 bg-white'}`}
            onClick={() => onSelect(section.id)}
           >
             <GripVertical className="w-4 h-4 text-gray-400 shrink-0" />
             <div className="flex-1 min-w-0">
               <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-0.5">{section.type}</p>
               <p className="text-sm font-bold text-gray-900 truncate">{(section.data as any).title || (section.data as any).label || 'Section ' + (idx + 1)}</p>
             </div>
             <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="w-3 h-3" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500"><Trash2 className="w-3 h-3" /></Button>
             </div>
           </div>
         ))}
      </div>
      
      <div className="p-4 border-t bg-gray-50 grid grid-cols-2 gap-2">
         <Button 
          variant="outline" 
          size="sm" 
          className="text-[10px] font-black uppercase"
          onClick={() => onAdd('hero')}
        >
          Add Hero
        </Button>
         <Button 
          variant="outline" 
          size="sm" 
          className="text-[10px] font-black uppercase"
          onClick={() => onAdd('content')}
        >
          Add Content
        </Button>
         <Button 
          variant="outline" 
          size="sm" 
          className="text-[10px] font-black uppercase"
          onClick={() => onAdd('stats')}
        >
          Add Stats
        </Button>
         <Button 
          variant="outline" 
          size="sm" 
          className="text-[10px] font-black uppercase"
          onClick={() => onAdd('faq')}
        >
          Add FAQ
        </Button>
      </div>
    </div>
  );
}
