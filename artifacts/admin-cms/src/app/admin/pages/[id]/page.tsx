"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { CMSSection, SectionType } from '@/lib/cms-types';
import { SectionRenderer } from '@/components/cms/SectionRenderer';
import { EditorSidebar } from '@/components/admin/EditorSidebar';
import { SectionEditorPanel } from '@/components/admin/SectionEditorPanel';
import { Button } from '@/components/ui/button';
import { Save, Eye, Globe, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function PageEditor() {
  const { id } = useParams();
  const [page, setPage] = useState<any>(null);
  const [sections, setSections] = useState<CMSSection[]>([]);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    // Fetch page data
    // fetch(`/api/admin/pages/${id}`)
  }, [id]);

  const handleSave = async () => {
    toast.info("Saving changes...");
    // await savePage(id, { sections })
    toast.success("Page updated successfully");
  };

  const handlePublish = async () => {
     // await publishPage(id)
  };

  const addSection = (type: SectionType) => {
    const newSection: CMSSection = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      data: getDefaultDataForType(type),
      isVisible: true
    };
    setSections([...sections, newSection]);
    setActiveSectionId(newSection.id);
  };

  const activeSection = sections.find(s => s.id === activeSectionId);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      {/* Header */}
      <header className="h-16 border-b bg-white flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-4">
          <Link href="/admin/pages">
            <Button variant="ghost" size="icon"><ChevronLeft /></Button>
          </Link>
          <h1 className="font-black uppercase tracking-tight text-xl">Editing Page: {page?.title || 'Draft'}</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => setIsPreview(!isPreview)}>
            <Eye className="w-4 h-4 mr-2" />
            {isPreview ? 'Edit' : 'Preview'}
          </Button>
          <Button variant="outline" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={handlePublish}>
            <Globe className="w-4 h-4 mr-2" />
            Publish
          </Button>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        {!isPreview && (
          <EditorSidebar 
            sections={sections} 
            activeId={activeSectionId} 
            onSelect={setActiveSectionId}
            onAdd={addSection}
            onReorder={setSections}
          />
        )}

        <div className={`flex-1 overflow-y-auto bg-gray-100 transition-all ${isPreview ? 'p-0' : 'p-8'}`}>
           <div className={`bg-white shadow-2xl mx-auto transition-all ${isPreview ? 'w-full' : 'max-w-4xl min-h-full rounded-2xl overflow-hidden'}`}>
              <div className="bg-white">
                {sections.map(section => (
                  <div 
                    key={section.id} 
                    className={`relative group ${activeSectionId === section.id ? 'ring-2 ring-primary ring-inset' : ''} ${isPreview ? '' : 'cursor-pointer'}`}
                    onClick={() => !isPreview && setActiveSectionId(section.id)}
                  >
                    <SectionRenderer section={section} />
                    {!isPreview && (
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    )}
                  </div>
                ))}
              </div>
           </div>
        </div>

        {!isPreview && activeSection && (
          <SectionEditorPanel 
            section={activeSection} 
            onChange={(updatedData) => {
              setSections(sections.map(s => s.id === activeSection.id ? { ...s, data: updatedData } : s));
            }}
          />
        )}
      </main>
    </div>
  );
}

function getDefaultDataForType(type: SectionType) {
  switch(type) {
    case 'hero': return { title: 'New Hero', subtitle: 'Short description here', ctaText: 'Learn More', ctaLink: '/' };
    case 'stats': return { items: [{ label: 'Stat', value: '100+' }] };
    case 'faq': return { items: [{ question: 'Question?', answer: 'Answer.' }] };
    default: return {};
  }
}
