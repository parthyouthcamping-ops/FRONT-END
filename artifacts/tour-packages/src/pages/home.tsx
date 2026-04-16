import { useMemo, useState, useEffect } from "react";
import { Link } from "wouter";
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
}

export default function Home() {
  const apiUrl = import.meta.env.VITE_API_URL || "https://back-end-production-191d.up.railway.app/api";

  const { data: trips = [], isLoading } = useQuery<LiveTrip[]>({
    queryKey: ["trips"],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/trips`);
      const json = await res.json();
      return json.data;
    }
  });

  const { data: pageData, isLoading: pageLoading } = useQuery<PageData>({
    queryKey: ["page", "home"],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/pages/home`);
      const json = await res.json();
      return json.data;
    }
  });

  const { data: blogs = [], isLoading: blogsLoading } = useQuery<any[]>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/blogs`);
      const json = await res.json();
      return json.data;
    }
  });

  const { data: settings } = useSettings();

  const { data: reviews = [], isLoading: reviewsLoading } = useQuery<any[]>({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/reviews?featured=true`);
      const json = await res.json();
      return json.data;
    }
  });

  const featuredTrips = useMemo(() => trips.slice(0, 10), [trips]);
  const internationalTrips = useMemo(() => trips.filter(t => t.location.toLowerCase().includes("bali") || t.location.toLowerCase().includes("dubai") || t.location.toLowerCase().includes("vietnam")), [trips]);

  return (
    <div className="min-h-screen bg-white">
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
          <InternationalDestinations />
        </>
      )}

      {/* ── CONTACT & SOCIAL BAR (WHATSAPP) ── */}
      <section className="relative z-20 -mb-20 px-6">
        <div className="max-w-6xl mx-auto bg-white rounded-[40px] shadow-2xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-10 border border-gray-100">
           {/* WhatsApp Part */}
           <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-green-200">
                 <MessageCircle className="w-10 h-10 text-white fill-white" />
              </div>
              <div className="text-center md:text-left">
                 <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Don't wait any longer, Contact us!</p>
                 <a href={`https://wa.me/${settings?.contactPhone?.replace(/\D/g, '') || "919924246267"}`} target="_blank" className="text-4xl lg:text-5xl font-black text-black tracking-tighter">
                   {settings?.contactPhone || "99 242 46 267"}
                 </a>
              </div>
           </div>

           <div className="h-px lg:h-20 w-full lg:w-px bg-gray-100" />

           {/* Social Part */}
           <div className="text-center md:text-right">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Be part of our Social Media Journey!</p>
              <div className="flex gap-4 justify-center md:justify-end">
                 {[
                   { icon: Instagram, color: 'bg-[#E4405F]', href: settings?.socialLinks?.instagram },
                   { icon: Youtube, color: 'bg-[#FF0000]', href: settings?.socialLinks?.youtube },
                   { icon: Facebook, color: 'bg-[#1877F2]', href: settings?.socialLinks?.facebook },
                   { icon: Twitter, color: 'bg-[#000000]', href: settings?.socialLinks?.twitter },
                   { icon: Linkedin, color: 'bg-[#0077B5]', href: settings?.socialLinks?.linkedin }
                 ].map((social, i) => (
                   <a key={i} href={social.href || "#"} target="_blank" rel="noopener noreferrer" className={`${social.color} w-10 h-10 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md`}>
                      <social.icon className="w-5 h-5" />
                   </a>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#1a1a1a] text-white pt-40 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32">
             {/* Brand & Address */}
             <div className="lg:col-span-4 space-y-12">
                <div className="flex flex-col gap-2">
                   <span className="text-4xl font-black tracking-tighter uppercase">{settings?.siteName || "YouthCamping"}</span>
                   <span className="text-[10px] font-black tracking-[0.4em] text-gray-500 uppercase">experiences</span>
                </div>
                
                <div className="flex items-start gap-4">
                   <div className="bg-white/5 p-4 rounded-2xl">
                      <MapPin className="w-6 h-6 text-primary" />
                   </div>
                   <div className="text-sm text-gray-400 font-medium leading-relaxed">
                      <p className="text-white font-black uppercase tracking-widest mb-2">{settings?.siteName || "YouthCamping"} Pvt. Ltd.</p>
                      <pre className="font-sans whitespace-pre-wrap">{settings?.address || "Money Plant High Street, A 738,\nJagatpur Rd, Gota, Ahmedabad,\nGujarat 382470"}</pre>
                   </div>
                </div>
             </div>

             {/* Links */}
             <div className="lg:col-span-4 grid grid-cols-2 gap-10">
                <div className="space-y-8">
                   <h4 className="text-xs font-black tracking-[0.3em] uppercase text-white">Explore</h4>
                   <ul className="space-y-4 text-gray-400 font-bold text-sm">
                      <li className="hover:text-primary transition-colors hover:translate-x-1 inline-block"><Link href="/">Home</Link></li>
                      <li className="hover:text-primary transition-colors hover:translate-x-1 inline-block"><Link href="/tour-packages">Tour Packages</Link></li>
                      <li className="hover:text-primary transition-colors hover:translate-x-1 inline-block"><Link href="/tour-packages">Group Trips</Link></li>
                      <li className="hover:text-primary transition-colors hover:translate-x-1 inline-block"><Link href="/creator">Creator</Link></li>
                      <li className="hover:text-primary transition-colors hover:translate-x-1 inline-block"><Link href="/team">Team</Link></li>
                   </ul>
                </div>
                <div className="space-y-8 mt-12">
                   <ul className="space-y-4 text-gray-400 font-bold text-sm pt-4">
                      <li className="hover:text-primary transition-colors hover:translate-x-1 inline-block"><Link href="/about">About Us</Link></li>
                      <li className="hover:text-primary transition-colors hover:translate-x-1 inline-block"><Link href="/contact">Contact Us</Link></li>
                      <li className="hover:text-primary transition-colors hover:translate-x-1 inline-block"><Link href="/terms">Terms & Conditions</Link></li>
                      <li className="hover:text-primary transition-colors hover:translate-x-1 inline-block"><Link href="/privacy">Privacy Policy</Link></li>
                   </ul>
                </div>
             </div>

             {/* Newsletter */}
             <div className="lg:col-span-4 space-y-10">
                <div className="space-y-4">
                   <h4 className="text-2xl font-black tracking-tighter uppercase whitespace-nowrap">Get Updates & more!</h4>
                   <p className="text-gray-500 font-medium text-sm">Subscribe to the free newsletter and stay up to date.</p>
                </div>
                <div className="space-y-4">
                   <input 
                      type="email" 
                      placeholder="Your Email" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-medium focus:border-primary outline-none transition-all"
                   />
                   <button className="avian-button w-full shadow-2xl shadow-primary/20">
                      SUBSCRIBE
                   </button>
                </div>
             </div>
          </div>
          
          <div className="pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-10">
             <p className="text-[10px] font-black tracking-[0.2em] text-gray-500 uppercase italic">© 2026 {settings?.siteName || "YouthCamping"} Private Limited</p>
             <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="flex items-center gap-2 text-[10px] font-black">
                   <span className="text-gray-500 tracking-widest uppercase">CONTACT:</span>
                   <a href={`tel:${settings?.contactPhone?.replace(/\D/g, '') || "+919924246267"}`} className="text-white hover:text-primary transition-colors">
                     {settings?.contactPhone || "+91 99242 46267"}
                   </a>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black">
                   <span className="text-gray-500 tracking-widest uppercase">Made with <span className="text-primary italic">❤</span> in India</span>
                   <span className="text-sm">🇮🇳</span>
                </div>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}



function Hero() {
  const slides = [
    { type: 'image', url: "https://images.unsplash.com/photo-1647427017067-8f33ccbae493?auto=format&fit=crop&q=80", title: "ADVENTURE AWAITS", sub: "Explore the wilderness with high-end luxury." },
    { type: 'video', url: "https://www.w3schools.com/html/mov_bbb.mp4", title: "UNFORGETTABLE JOURNEYS", sub: "Create memories that last a lifetime." },
    { type: 'image', url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80", title: "DISCOVER NATURE", sub: "Immerse yourself in the great outdoors." }
  ];
  
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="px-6 pt-10 pb-20 bg-gray-50">
       <div 
         className="max-w-7xl mx-auto relative rounded-[40px] lg:rounded-[60px] overflow-hidden shadow-2xl group transition-all duration-500"
         style={{ height: 'var(--hero-height, 650px)' }}
       >
          <AnimatePresence mode="wait">
             <motion.div 
               key={index}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 1.5 }}
               className="absolute inset-0"
             >
                {slides[index].type === 'video' ? (
                  <video 
                    src={slides[index].url} 
                    autoPlay 
                    muted 
                    loop 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img 
                    src={slides[index].url} 
                    className="w-full h-full object-cover" 
                    alt="Hero"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
             </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 flex flex-col justify-end p-10 lg:p-20 text-white">
             <motion.div
               key={`text-${index}`}
               initial={{ y: 50, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ duration: 0.8, delay: 0.5 }}
               className="max-w-3xl space-y-6"
             >
                <div className="flex items-center gap-3">
                   <div className="w-12 h-0.5 bg-primary" />
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Est. 2026</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                  {slides[index].title}
                </h1>
                <p className="text-lg lg:text-xl font-medium text-gray-300 max-w-xl">
                  {slides[index].sub}
                </p>
                <div className="flex gap-4 pt-6">
                   <button className="avian-button shadow-2xl shadow-primary/40">
                      EXPLORE TRIPS
                   </button>
                   <button className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-black uppercase text-[10px] tracking-widest px-10 rounded-2xl h-14 transition-all">
                      VIEW BLOG
                   </button>
                </div>
             </motion.div>
          </div>

          {/* Slider Controls */}
          <div className="absolute bottom-10 right-10 flex gap-2">
             {slides.map((_, i) => (
               <button 
                 key={i} 
                 onClick={() => setIndex(i)}
                 className={`h-1.5 transition-all duration-500 rounded-full ${i === index ? "w-16 bg-white" : "w-6 bg-white/30"}`}
               />
             ))}
          </div>
       </div>
    </section>
  );
}

function InternationalDestinations() {
  const destinations = [
    { name: "Maldives", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80" },
    { name: "Singapore", image: "https://images.unsplash.com/photo-1525625239513-94e94fabf2c4?auto=format&fit=crop&q=80" },
    { name: "Thailand", image: "https://images.unsplash.com/photo-1528181304800-2f140819ad9c?auto=format&fit=crop&q=80" },
    { name: "Malaysia", image: "https://images.unsplash.com/photo-1555217851-6141535bd771?auto=format&fit=crop&q=80" },
    { name: "Bali", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80" },
    { name: "Vietnam", image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80" }
  ];

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
       <div className="mx-auto px-6 mb-12" style={{ maxWidth: 'var(--container-max-width, 1280px)' }}>
          <h2 className="text-3xl font-black uppercase tracking-tight text-black">International Destinations</h2>
          <div className="w-20 h-1.5 bg-primary mt-4 rounded-full" />
       </div>
       
       <div className="flex gap-6 overflow-x-auto pb-10 px-6 lg:px-20 no-scrollbar scroll-smooth">
          {destinations.map((dest, i) => (
            <motion.div 
               key={i}
               whileHover={{ y: -10 }}
               className="min-w-[280px] h-[400px] relative rounded-[32px] overflow-hidden shadow-lg group cursor-pointer"
            >
               <img src={dest.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
               <div className="absolute bottom-8 left-8">
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter">{dest.name}</h3>
               </div>
            </motion.div>
          ))}
       </div>
    </section>
  );
}

function BlogCard({ id, image, title, author, time }: { id: string, image: string, title: string, author: string, time: string, hasVideo?: boolean }) {
  return (
    <Link href={`/blog/${id}`}>
      <div className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer h-full border border-gray-100">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-xl">
             <div className="w-5 h-5 bg-black rounded-lg flex items-center justify-center">
                <span className="text-[10px] text-white font-bold leading-none">M</span>
             </div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                <img src={`https://ui-avatars.com/api/?name=${author}&background=random`} className="w-full h-full object-cover" />
             </div>
             <div className="flex flex-col">
                <h4 className="text-sm font-black text-black leading-tight line-clamp-2 uppercase tracking-tight group-hover:text-primary transition-colors">
                  {title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">by {author}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{time}</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ReviewCard({ text, author, trip, image }: { text: string, author: string, trip: string, image: string, initials: string }) {
  return (
    <div className="flex flex-col gap-6 group">
      <div className="aspect-[4/5] rounded-[32px] overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-700 relative">
        <img src={image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" />
      </div>
      
      <div className="space-y-4 px-2">
        <div className="flex gap-1">
           {[...Array(5)].map((_, i) => (
             <Star key={i} className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
           ))}
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600 leading-relaxed line-clamp-3">
            {text}
          </p>
          <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-black transition-colors">
            Read more...
          </button>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
           <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
             <img src={`https://ui-avatars.com/api/?name=${author}&background=000&color=fff`} className="w-full h-full object-cover" />
           </div>
           <div className="flex flex-col">
             <h4 className="text-xs font-black text-black uppercase tracking-tight">{author}</h4>
             <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{trip}</p>
           </div>
        </div>
      </div>
    </div>
  );
}
