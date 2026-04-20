import { useMemo, useState, useEffect } from "react";
import { Link } from "wouter";
import { API_URL } from "@/lib/api-config";
import { Navbar } from "@/components/navbar";
import { TourCard } from "@/components/tour-card";
import { 
  Phone, Mail, MapPin, Loader2, ArrowRight,
  Star, Quote, Play, Clock as ClockIcon,
  Facebook, Instagram, Youtube, Twitter, Linkedin,
  Mountain, Landmark, Building2, Trees, MessageCircle,
  Palmtree, Cloud, Waves, Ship, Sun, 
  Wind, Map as MapIcon, Compass
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useSettings } from "@/hooks/use-settings";

import { CmsRenderer } from "@/components/cms-renderer";
import { SEO } from "@/components/seo";

interface LiveTrip {
  id: string;
  title: string;
  location: string;
  price: number;
  duration: string;
  heroImage?: string;
  images: string[];
  status: string;
}

interface PageData {
  title: string;
  sections: any[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
    focusKeyword?: string;
    canonicalUrl?: string;
    faqSchema?: Array<{ question: string; answer: string }>;
  };
}

import { Footer } from "@/components/footer";

export default function Home() {
  const { data: trips = [], isLoading } = useQuery<LiveTrip[]>({
    queryKey: ["trips"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/trips`);
      const json = await res.json();
      return json.data;
    }
  });

  const { data: pageData, isLoading: pageLoading } = useQuery<PageData>({
    queryKey: ["page", "home"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/pages/home`);
      const json = await res.json();
      return json.data;
    }
  });

  const { data: settings } = useSettings();

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={pageData?.seo?.metaTitle} 
        description={pageData?.seo?.metaDescription} 
        image={pageData?.seo?.ogImage} 
        focusKeyword={pageData?.seo?.focusKeyword}
        canonicalUrl={pageData?.seo?.canonicalUrl}
        faqSchema={pageData?.seo?.faqSchema}
      />
      <Navbar />
      
      {/* ── DYNAMIC SECTIONS ── */}
      {pageLoading ? (
        <div className="h-screen flex items-center justify-center bg-black">
           <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
      ) : pageData?.sections ? (
        <CmsRenderer sections={pageData.sections} />
      ) : (
        <>
          <Hero />
          <div className="relative -mt-16 z-30 max-w-5xl mx-auto px-6">
            <div className="bg-white p-4 rounded-[32px] shadow-[0_8px_40px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col md:flex-row items-center gap-4">
               <div className="flex-1 w-full px-6 flex items-center gap-4 border-r border-gray-100">
                  <Compass className="w-6 h-6 text-primary" />
                  <input type="text" placeholder="Where to next?" className="w-full py-4 text-lg font-bold text-black border-none focus:ring-0 placeholder:text-gray-300" />
               </div>
               <div className="flex-1 w-full px-6 flex items-center gap-4">
                  <MapPin className="w-6 h-6 text-cyan" />
                  <select className="w-full py-4 text-lg font-bold text-gray-500 border-none focus:ring-0 appearance-none bg-transparent">
                    <option>All Destinations</option>
                    <option>Himalayas</option>
                    <option>Coastal</option>
                  </select>
               </div>
               <button className="avian-button w-full md:w-auto min-w-[180px]">
                 Search
               </button>
            </div>
          </div>
          <VideoHero />
          <div className="max-w-7xl mx-auto px-6 py-20">
             <h2 className="text-3xl font-black text-black tracking-tighter uppercase mb-12">Trending Trips</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {trips.slice(0, 6).map(trip => (
                  <TourCard key={trip.id} {...trip} originalPrice={trip.price + 5000} subtitle={trip.location} />
                ))}
             </div>
             {trips.length === 0 && !isLoading && (
               <div className="text-center py-20 opacity-20 font-black uppercase tracking-widest text-sm">No trips found in database...</div>
             )}
          </div>
          <InternationalDestinations />
        </>
      )}

      <Footer />
    </div>
  );
}

function Hero() {
  const slides = [
    { url: "https://images.unsplash.com/photo-1647427017067-8f33ccbae493?auto=format&fit=crop&q=80", title: "ADVENTURE AWAITS", sub: "Explore the wilderness with high-end luxury." }
  ];
  const [index, setIndex] = useState(0);

  return (
    <section className="px-0 pt-0 pb-10 bg-white">
       <div className="w-full relative overflow-hidden" style={{ height: '500px' }}>
          <img src={slides[0].url} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center p-10 text-white">
             <span className="font-handwriting text-3xl md:text-4xl text-white/90 mb-4 block">Let's explore the world</span>
             <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
               {slides[0].title}
             </h1>
          </div>
       </div>
    </section>
  );
}

function VideoHero() {
  const [playing, setPlaying] = useState(false);
  
  return (
    <section className="py-24 section-ghost relative">
       <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="relative w-full rounded-[60px] overflow-hidden shadow-2xl bg-black" style={{ height: '500px' }}>
             {!playing ? (
                <div className="absolute inset-0 cursor-pointer flex items-center justify-center bg-gray-900" onClick={() => setPlaying(true)}>
                   <Play className="w-20 h-20 text-white fill-white" />
                </div>
             ) : (
                <iframe src="https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1" className="w-full h-full border-0" />
             )}
          </div>
       </div>
    </section>
  );
}

function InternationalDestinations() {
  return null; // Simplified for stability check
}
