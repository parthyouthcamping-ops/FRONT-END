import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "wouter";
import { Navbar } from "@/components/navbar";
import {
  ArrowLeft, Clock, Check, X,
  MessageCircle, Users, Utensils, Star,
  Share2, Heart, MapPin, Loader2, ChevronDown,
  Car, Sparkles, ArrowRight, Plus
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useSettings } from "@/hooks/use-settings";
import { InquiryPopup } from "@/components/inquiry-popup";
import { AnimatePresence, motion } from "framer-motion";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";

const TABS = [
  { id: "overview", label: "About" },
  { id: "packages", label: "Packages" },
  { id: "dates", label: "Dates" },
  { id: "itinerary", label: "Itinerary" },
  { id: "inclusions", label: "Inclusions" },
  { id: "faqs", label: "FAQs" },
];

const DEPARTURE_MONTHS = ["May", "June", "July", "August", "September", "October"];
const DATES_BY_MONTH: Record<string, number[]> = {
  "May": [1, 8, 15, 22, 24, 27, 29, 31],
  "June": [5, 12, 19, 26],
  "July": [3, 10, 17, 24, 31],
  "August": [7, 14, 21, 28],
  "September": [4, 11, 18, 25],
  "October": [2, 9, 16, 23, 30],
};

import { API_URL } from "@/lib/api-config";

interface Variant {
  id?: string;
  location: string;
  duration: string;
  originalPrice: number;
  discountedPrice: number;
  image: string;
  label?: string;
}

interface TravelOption {
  id?: string;
  label: string;
  priceDelta: number;
  description?: string;
}

interface RoomOption {
  id?: string;
  label: string;
  priceDelta: number;
}

interface Addon {
  name: string;
  rate: number;
  description?: string;
}

interface LiveTrip {
  id: string;
  title: string;
  location: string;
  price: number;
  duration: string;
  description: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  images: string[];
  heroImage?: string;
  itinerary: { day: number; title: string; description: string; location?: string; activities?: string[]; stay?: string; meals?: string; photos?: string[] }[];
  faqs?: { question: string; answer: string }[];
  availableDates?: any[];
  variants?: Variant[];
  travelOptions?: TravelOption[];
  roomOptions?: RoomOption[];
  addons?: Addon[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
    focusKeyword?: string;
    canonicalUrl?: string;
    faqSchema?: Array<{ question: string; answer: string }>;
  };
}

export default function TourDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: settings } = useSettings();

  const { data: trip, isLoading, error } = useQuery<LiveTrip>({
    queryKey: ["trip", id],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/trips/${id}`);
      if (!res.ok) {
        throw new Error(`API Error ${res.status}`);
      }
      const json = await res.json();
      return json.data;
    },
    enabled: !!id,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30,    // 30 minutes
  });

  const [activeTab, setActiveTab] = useState("overview");
  const [openDay, setOpenDay] = useState<number | null>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [showInquiry, setShowInquiry] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState<Record<string, number>>({});
  
  // selection state using final options
  const finalVariants = (trip?.variants && trip.variants.length > 0) 
    ? trip.variants.map((v, i) => ({ ...v, id: `v-${i}`, label: v.location || (v as any).label || `Option ${i+1}` })) 
    : [{ 
        id: "v-default", 
        location: trip?.location || "Main Origin", 
        duration: trip?.duration || "Standard", 
        originalPrice: Math.round((trip?.price || 0) * 1.25), 
        discountedPrice: trip?.price || 0,
        image: trip?.heroImage || trip?.images?.[0] || "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800&auto=format&fit=crop",
        label: trip?.location || "Main Origin"
      }];
    
  const finalTravelOptions = (trip?.travelOptions && trip.travelOptions.length > 0) 
    ? trip.travelOptions.map((o, i) => ({ ...o, id: `o-${i}` })) 
    : [{ id: "o-default", label: "Standard Travel", priceDelta: 0, description: "Standard transportation as per itinerary" }];
    
  const finalRoomOptions = (trip?.roomOptions && trip.roomOptions.length > 0) 
    ? trip.roomOptions.map((o, i) => ({ ...o, id: `r-${i}` })) 
    : [{ id: "r-default", label: "Standard Sharing", priceDelta: 0 }];

  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedTravel, setSelectedTravel] = useState<string>("");
  const [selectedRoom, setSelectedRoom] = useState<string>("");

  // Sync selection when trip data loads
  useEffect(() => {
    if (trip) {
      if (finalVariants.length) setSelectedLocation(finalVariants[0].id!);
      if (finalTravelOptions.length) setSelectedTravel(finalTravelOptions[0].id!);
      if (finalRoomOptions.length) setSelectedRoom(finalRoomOptions[0].id!);
    }
  }, [trip?.id]);

  const currentVariant = finalVariants.find(v => v.id === selectedLocation) || finalVariants[0];
  const currentTravel = finalTravelOptions.find(t => t.id === selectedTravel) || finalTravelOptions[0];
  const currentRoom = finalRoomOptions.find(r => r.id === selectedRoom) || finalRoomOptions[0];

  const travelLabel = currentTravel?.label || "Standard";
  const roomLabel = currentRoom?.label || "Standard Sharing";
  
  // Calculate price delta (if any)
  const travelDelta = (currentTravel as any)?.priceDelta || 0;
  const roomDelta = (currentRoom as any)?.priceDelta || 0;
  
  const totalPrice = (currentVariant?.discountedPrice || 0) + travelDelta + roomDelta + 
    Object.entries(selectedAddons).reduce((acc, [name, qty]) => {
      const addon = trip?.addons?.find(a => a.name === name);
      return acc + (addon?.rate || 0) * qty;
    }, 0);
  const totalOriginalPrice = (currentVariant?.originalPrice || 0) + travelDelta + roomDelta + 
    Object.entries(selectedAddons).reduce((acc, [name, qty]) => {
      const addon = trip?.addons?.find(a => a.name === name);
      return acc + (addon?.rate || 0) * qty;
    }, 0);

  // Dynamic Dates Logic
  const { departureMonths, datesByMonth } = useRef<{departureMonths: string[], datesByMonth: Record<string, number[]>}>({
    departureMonths: DEPARTURE_MONTHS,
    datesByMonth: DATES_BY_MONTH
  }).current;

  // Process available dates from trip data if they exist
  const dynamicDates = typeof window !== 'undefined' ? (() => {
    if (!trip?.availableDates || trip.availableDates.length === 0) return null;
    const months: string[] = [];
    const dbm: Record<string, number[]> = {};
    
    // Support both string dates and object-based dates { date: string, capacity: number }
    const normalizeDate = (d: any) => typeof d === 'string' ? d : d?.date;
    
    const sortedDates = [...trip.availableDates]
      .filter(d => normalizeDate(d))
      .sort((a,b) => new Date(normalizeDate(a)).getTime() - new Date(normalizeDate(b)).getTime());
    
    if (sortedDates.length === 0) return null;

    sortedDates.forEach(dEntry => {
      const d = new Date(normalizeDate(dEntry));
      if (isNaN(d.getTime())) return;
      
      const m = d.toLocaleDateString('en-US', { month: 'long' });
      if (!months.includes(m)) months.push(m);
      if (!dbm[m]) dbm[m] = [];
      dbm[m].push(d.getDate());
    });
    return { months, dbm, firstDate: new Date(normalizeDate(sortedDates[0])) };
  })() : null;

  const finalMonths = dynamicDates?.months || departureMonths;
  const finalDBM = dynamicDates?.dbm || datesByMonth;

  const [selectedMonth, setSelectedMonth] = useState(finalMonths[0]);
  const [selectedDate, setSelectedDate] = useState<number | null>(finalDBM[finalMonths[0]]?.[0] || 1);

  // Sync selection when trip data loads
  useEffect(() => {
    if (dynamicDates) {
      setSelectedMonth(dynamicDates.months[0]);
      setSelectedDate(dynamicDates.dbm[dynamicDates.months[0]][0]);
    }
  }, [trip?.id, !!dynamicDates]);

  const overviewRef = useRef<HTMLDivElement>(null);
  const packagesRef = useRef<HTMLDivElement>(null);
  const datesRef = useRef<HTMLDivElement>(null);
  const itineraryRef = useRef<HTMLDivElement>(null);
  const inclusionsRef = useRef<HTMLDivElement>(null);
  const faqsRef = useRef<HTMLDivElement>(null);

  const refs: Record<string, React.RefObject<HTMLDivElement>> = {
    overview: overviewRef,
    packages: packagesRef,
    dates: datesRef,
    itinerary: itineraryRef,
    inclusions: inclusionsRef,
    faqs: faqsRef,
  };



  const scrollToTab = (tabId: string) => {
    setActiveTab(tabId);
    refs[tabId]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 200;
      const order = ["overview", "packages", "dates", "itinerary", "inclusions", "faqs"];
      for (let i = order.length - 1; i >= 0; i--) {
        const ref = refs[order[i]];
        if (ref && ref.current && ref.current.offsetTop <= scrollY) {
          setActiveTab(order[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [refs]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-6">
        <Loader2 className="h-16 w-16 text-primary animate-spin" />
        <p className="text-black font-black tracking-[0.4em] uppercase text-[10px] animate-pulse">Mapping Route...</p>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black text-black uppercase tracking-tighter">Experience Not Found</h1>
          <Link href="/" className="inline-block avian-button">Return to Base Camp</Link>
        </div>
      </div>
    );
  }

  const tripImages = (trip.images && trip.images.length > 0) ? trip.images : [trip.heroImage || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"];
  const displayImages = [...tripImages, ...tripImages, ...tripImages].slice(0, 5);

  const displayFaqs = trip.faqs && trip.faqs.length > 0 ? trip.faqs : [
    { question: "What is the group size for this trip?", answer: "Our trips are curated for youth aged 12–35 with group sizes typically between 15–30 travellers." },
    { question: "Can I join if I'm travelling solo?", answer: "Absolutely! Most of our travellers are solo adventurers. You'll be grouped with like-minded people." },
    { question: "What should I pack for this trip?", answer: "Comfortable trekking shoes, warm layers, sunscreen, and a valid ID are essentials." },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={trip.seo?.metaTitle || trip.title} 
        description={trip.seo?.metaDescription || trip.description?.substring(0, 160)} 
        image={trip.seo?.ogImage || trip.heroImage || trip.images?.[0]} 
        focusKeyword={trip.seo?.focusKeyword}
        canonicalUrl={trip.seo?.canonicalUrl}
        faqSchema={trip.seo?.faqSchema}
      />
      <Navbar />

      {/* ── GALLERY GRID (AVIAN STYLE) ── */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[550px]">
          {/* Main Large Image */}
          <div className="md:col-span-8 h-full overflow-hidden rounded-[50px] group cursor-pointer relative shadow-2xl">
            <img src={displayImages[0]} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            
            {/* Top Floating Badge */}
            <div className="absolute top-10 left-10 flex flex-col gap-2">
               <div className="bg-white/90 backdrop-blur-xl px-6 py-3 rounded-full flex items-center gap-3 border border-white/20 shadow-xl">
                 <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Selected City:</span>
                 <span className="text-sm font-black text-black uppercase tracking-tight">{(currentVariant as any)?.location || currentVariant?.label || "Trip"}</span>
               </div>
               <div className="bg-primary px-6 py-4 rounded-[24px] shadow-2xl shadow-primary/40 flex flex-col">
                 <span className="text-[9px] font-black text-white/70 uppercase tracking-widest">Starting From</span>
                 <span className="text-3xl font-black text-white tracking-tighter">₹{totalPrice.toLocaleString()}</span>
               </div>
            </div>

            <div className="absolute bottom-10 left-10 flex gap-4">
               <button onClick={() => setLiked(!liked)} className={`p-4 rounded-full backdrop-blur-xl border border-white/20 transition-all ${liked ? "bg-primary text-white" : "bg-white/10 text-white"}`}>
                 <Heart className={`w-6 h-6 ${liked ? "fill-white" : ""}`} />
               </button>
               <button className="p-4 rounded-full backdrop-blur-xl border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-all">
                 <Share2 className="w-6 h-6" />
               </button>
            </div>
          </div>

          {/* Smaller Grid */}
          <div className="md:col-span-4 grid grid-cols-1 gap-4 h-full">
            {displayImages.slice(1, 3).map((img, i) => (
              <div key={i} className="h-full overflow-hidden rounded-[40px] group cursor-pointer shadow-lg">
                <img src={img} className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STICKY SUB-NAV ── */}
      <div className="sticky top-20 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100 py-2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-12 overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => (
              <button 
                key={tab.id} 
                onClick={() => scrollToTab(tab.id)} 
                className={`py-6 text-[10px] font-black uppercase tracking-[0.3em] transition-all shrink-0 relative group ${activeTab === tab.id ? "text-primary" : "text-gray-400 hover:text-black"}`}
              >
                {tab.label}
                {activeTab === tab.id && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-1 bg-primary" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* ── LEFT CONTENT ── */}
          <div className="lg:col-span-8 space-y-32">
            
            {/* Overview */}
            <div ref={overviewRef} className="scroll-mt-52">
              <div className="space-y-6 mb-12">
                <div className="flex items-center gap-3 text-primary">
                  <MapPin className="w-5 h-5" />
                  <span className="text-[11px] font-black tracking-[0.4em] uppercase">{trip.location}</span>
                </div>
                <h1 className="text-6xl font-black text-black leading-[0.9] tracking-tighter uppercase">{trip.title}</h1>

                {/* Quick Selection Summary */}
                <div className="flex flex-wrap items-center gap-6 p-6 bg-gray-50 rounded-[30px] border border-gray-100 mt-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Next Departure</p>
                      <p className="text-sm font-black text-black uppercase tracking-tight">{selectedMonth} {selectedDate}, 2026</p>
                    </div>
                  </div>
                  <div className="w-[1px] h-10 bg-gray-200 hidden md:block" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Starting From</p>
                      <p className="text-sm font-black text-black uppercase tracking-tight">{(currentVariant as any)?.location || currentVariant?.label || "Trip"}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => scrollToTab('packages')}
                    className="ml-auto bg-black text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-colors shadow-lg shadow-black/10"
                  >
                    Change Options
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16 py-12 border-y border-gray-100">
                <StatItem icon={<Clock className="w-6 h-6" />} label="Duration" value={trip.duration} />
                <StatItem icon={<Users className="w-6 h-6" />} label="Group Size" value="20 Travelers" />
                <StatItem icon={<Utensils className="w-6 h-6" />} label="Cuisine" value="Local Base" />
                <StatItem icon={<Star className="w-6 h-6" />} label="Verified" value="4.9 / 5.0" />
              </div>

              <div className="space-y-10">
                <h3 className="text-3xl font-black text-black uppercase tracking-tight">The Experience</h3>
                <p className="text-xl text-gray-500 leading-relaxed font-medium">{trip.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
                  {trip.highlights.map((h, i) => (
                    <div key={i} className="flex gap-5 items-center p-8 bg-gray-50 rounded-[32px] hover:bg-black hover:text-white transition-all duration-500 group">
                      <div className="w-3 h-3 bg-primary rounded-full group-hover:scale-150 transition-transform" />
                      <span className="text-sm font-black uppercase tracking-tight">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Packages Selection */}
            <div ref={packagesRef} className="scroll-mt-52 space-y-16">
              <div className="space-y-10">
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-black uppercase tracking-widest">Choose Starting Location</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {finalVariants.map((loc) => (
                      <button
                        key={loc.id}
                        onClick={() => setSelectedLocation(loc.id)}
                        className={`relative group p-1 rounded-[30px] transition-all duration-500 ${selectedLocation === loc.id ? "bg-primary shadow-xl scale-105" : "bg-transparent scale-100"}`}
                      >
                        <div className="bg-white rounded-[28px] overflow-hidden p-3 h-full flex flex-col items-start text-left">
                          <div className="relative w-full h-40 rounded-[22px] overflow-hidden mb-4">
                            <img src={loc.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/20">
                              {loc.duration}
                            </div>
                            {selectedLocation === loc.id && (
                              <div className="absolute top-4 right-4 bg-primary text-white p-1.5 rounded-full shadow-lg">
                                <Check className="w-3 h-3" />
                              </div>
                            )}
                          </div>
                          <div className="px-2 pb-2 space-y-1">
                            <h4 className="font-black text-lg text-black uppercase tracking-tight">{loc.label || (loc as any).location}</h4>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400 line-through text-xs font-bold">₹{loc.originalPrice.toLocaleString()}</span>
                              <span className="text-primary font-black text-lg">₹{loc.discountedPrice.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-10 border-t border-gray-100 space-y-12">
                  <div className="space-y-6">
                    <h3 className="text-sm font-black text-black uppercase tracking-widest">Travelling Options</h3>
                    <div className="flex flex-wrap gap-4">
                      {finalTravelOptions.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setSelectedTravel(opt.id)}
                          className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all duration-300 ${selectedTravel === opt.id ? "bg-white border-primary text-primary shadow-md" : "bg-gray-50 border-transparent text-gray-400 hover:bg-gray-100"}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-sm font-black text-black uppercase tracking-widest">Room Sharing</h3>
                    <div className="flex flex-wrap gap-4">
                      {finalRoomOptions.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setSelectedRoom(opt.id)}
                          className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all duration-300 ${selectedRoom === opt.id ? "bg-white border-primary text-primary shadow-md" : "bg-gray-50 border-transparent text-gray-400 hover:bg-gray-100"}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Departure Dates */}
            <div ref={datesRef} className="scroll-mt-52 bg-white rounded-[40px] border border-gray-100 p-12 shadow-sm space-y-10">
              <h3 className="text-2xl font-black text-black uppercase tracking-tighter">Departure Dates</h3>
              
              <div className="space-y-8">
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide border-b border-gray-100">
                  {finalMonths.map(m => (
                    <button
                      key={m}
                      onClick={() => {
                        setSelectedMonth(m);
                        setSelectedDate(finalDBM[m][0]);
                      }}
                      className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${selectedMonth === m ? "bg-primary text-white shadow-lg shadow-primary/30" : "bg-white text-gray-400 border border-gray-100 hover:border-gray-200"}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  {finalDBM[selectedMonth]?.map(d => (
                    <button
                      key={d}
                      onClick={() => setSelectedDate(d)}
                      className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-sm transition-all border-2 ${selectedDate === d ? "bg-primary border-primary text-white shadow-lg" : "bg-white border-gray-100 text-black hover:border-gray-200"}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
                
                <div className="pt-6">
                  <button 
                    onClick={() => setShowInquiry(true)}
                    className="avian-button !rounded-[20px] !py-5 px-10 text-xs tracking-widest shadow-xl"
                  >
                    Confirm & Book Now
                  </button>
                </div>
              </div>
            </div>

            {/* Package Price Comparison Table */}
            <div className="space-y-8">
              <h3 className="text-2xl font-black text-black uppercase tracking-tighter">Package Price Comparison</h3>
              <div className="overflow-hidden rounded-[40px] border border-gray-100 bg-white shadow-sm overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500 border-b border-gray-100">Package</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500 border-b border-gray-100">Sub Package</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500 border-b border-gray-100">Regular Price</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500 border-b border-gray-100">Discounted Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {finalVariants.map((loc) => (
                      <tr key={loc.id} className="group transition-colors hover:bg-gray-50/10">
                        <td className="px-10 py-12 border-b border-gray-100 align-top">
                          <div className="space-y-1">
                            <span className="font-black text-2xl text-black uppercase tracking-tighter block">{loc.label || (loc as any).location}</span>
                            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">{loc.duration}</p>
                          </div>
                        </td>
                        <td className="px-10 py-12 border-b border-gray-100 space-y-10">
                          {finalTravelOptions.map(opt => (
                            <div key={opt.id} className="block py-2">
                              <span className="text-sm font-black text-gray-800 uppercase tracking-tight block">{opt.label}</span>
                              {opt.description && <p className="text-[10px] text-gray-400 font-medium leading-tight mt-1 max-w-[200px]">{opt.description}</p>}
                            </div>
                          ))}
                        </td>
                        <td className="px-10 py-12 border-b border-gray-100 space-y-10">
                           {finalTravelOptions.map(opt => {
                             const original = (loc.originalPrice + (opt?.priceDelta || 0));
                             const discounted = (loc.discountedPrice + (opt?.priceDelta || 0));
                             const savings = original - discounted;
                             return (
                              <div key={opt.id} className="py-2">
                                <span className="text-lg font-bold text-gray-300 line-through block">₹{original.toLocaleString()}</span>
                                <span className="text-[10px] font-black text-primary/60 uppercase tracking-widest mt-1 block">₹{savings.toLocaleString()}/- OFF</span>
                              </div>
                             );
                           })}
                        </td>
                        <td className="px-10 py-12 border-b border-gray-100 space-y-10">
                           {finalTravelOptions.map(opt => (
                            <div key={opt.id} className={`py-2 h-[48px] flex flex-col justify-center`}>
                              <span className={`text-2xl font-black tracking-tighter ${selectedLocation === loc.id && selectedTravel === opt.id ? "text-primary" : "text-black"}`}>
                                ₹{(loc.discountedPrice + (opt?.priceDelta || 0)).toLocaleString()}
                              </span>
                              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">per person</p>
                              {selectedLocation === loc.id && selectedTravel === opt.id && (
                                <span className="bg-[#ff5722] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest w-fit mt-1">Selected</span>
                              )}
                            </div>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest px-8">* All prices are per person and exclude applicable taxes.</p>
            </div>

            {/* Itinerary */}
            <section ref={itineraryRef} className="scroll-mt-52">
              <div className="flex items-end justify-between mb-16 px-2">
                <div className="space-y-4">
                  <h2 className="text-xs font-black tracking-[0.4em] text-[#ff5722] uppercase">Day By Day</h2>
                  <h3 className="text-5xl font-black text-black tracking-tighter uppercase">The Itinerary</h3>
                </div>
              </div>
              
              <div className="space-y-6">
                {trip.itinerary.map((day, i) => {
                  const photo = (day.photos && day.photos.length > 0) ? day.photos[0] : (tripImages[i % tripImages.length] || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b");
                  
                  // Calculate dynamic date if a departure date is selected
                  let dynamicDateText = "";
                  if (selectedDate) {
                    let baseDate: Date;
                    
                    if (trip?.availableDates?.length) {
                      // Normalize helper for mixed string/object dates
                      const normalize = (d: any) => typeof d === 'string' ? d : d?.date;
                      
                      // Find the actual date string that matches our selection
                      const dateEntry = trip.availableDates.find(ds => {
                        const d = new Date(normalize(ds));
                        return !isNaN(d.getTime()) && d.toLocaleDateString('en-US', { month: 'long' }) === selectedMonth && d.getDate() === selectedDate;
                      }) || trip.availableDates[0];
                      
                      const dVal = normalize(dateEntry);
                      baseDate = new Date(dVal);
                    } else {
                      const monthIndex = DEPARTURE_MONTHS.indexOf(selectedMonth);
                      baseDate = new Date(2026, monthIndex + 4, selectedDate);
                    }
                    
                    const calcDate = new Date(baseDate);
                    calcDate.setDate(calcDate.getDate() + i);
                    dynamicDateText = calcDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                  }

                  // Build description: use description field, or auto-generate from activities
                  const displayDescription = day.description || 
                    (day.activities && day.activities.length > 0 
                      ? day.activities.join(". ") + "." 
                      : "Explore and experience the journey.");
                  // Build glance items from structured data
                  const glanceItems: { icon: "location" | "stay" | "meals" | "activity"; label: string }[] = [];
                  if (day.location) glanceItems.push({ icon: "location", label: day.location });
                  if (day.stay) glanceItems.push({ icon: "stay", label: day.stay });
                  if (day.meals) glanceItems.push({ icon: "meals", label: day.meals });
                  if (day.activities && day.activities.length > 0) {
                    day.activities.forEach(a => glanceItems.push({ icon: "activity", label: a }));
                  }
                  // Fallback: split description into glance if no structured data
                  if (glanceItems.length === 0) {
                    (day.description || "").split('.').filter(s => s.trim().length > 5).slice(0, 3)
                      .forEach(s => glanceItems.push({ icon: "activity", label: s.trim() }));
                  }

                  return (
                  <div key={i} className="bg-white border border-gray-100 rounded-[40px] overflow-hidden hover:border-black/10 transition-all shadow-sm">
                    <button 
                      onClick={() => setOpenDay(openDay === day.day ? null : day.day)}
                      className="w-full flex items-center justify-between p-10 text-left"
                    >
                      <div className="flex items-center gap-8">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center font-black text-2xl transition-all ${openDay === day.day ? "bg-[#ff5722] text-white" : "bg-gray-50 text-gray-400"}`}>
                          {day.day}
                        </div>
                        <div>
                          <span className="font-black text-3xl text-black tracking-tighter uppercase block">
                            {day.title.replace(/ To /ig, ' → ').replace(/ - /g, ' → ')}
                          </span>
                          <div className="flex items-center gap-4 mt-2">
                             {dynamicDateText && (
                               <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] bg-primary/5 px-3 py-1 rounded-full">
                                 {dynamicDateText}
                               </span>
                             )}
                             {day.location && (
                               <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                 <MapPin className="w-3 h-3" />{day.location}
                               </span>
                             )}
                          </div>
                        </div>
                      </div>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${openDay === day.day ? "bg-black text-white" : "bg-gray-50 text-gray-400"}`}>
                        <ChevronDown className={`w-6 h-6 transition-transform duration-500 ${openDay === day.day ? "rotate-180" : ""}`} />
                      </div>
                    </button>
                    <AnimatePresence>
                      {openDay === day.day && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
                        >
                          <div className="px-10 pb-12 pt-2">
                             
                             {/* Image */}
                             <div className="w-full h-[400px] mb-12 rounded-[40px] overflow-hidden shadow-2xl relative">
                               <img src={photo} alt={day.title} className="w-full h-full object-cover" />
                               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                             </div>

                             {/* Two Columns */}
                             <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
                               {/* Experience Highlights */}
                               <div className="md:col-span-7 space-y-6">
                                 <div className="flex items-center gap-4">
                                   <div className="w-12 h-[2px] bg-[#ff5722]"></div>
                                   <span className="text-[11px] font-black tracking-[0.3em] uppercase text-black">Experience Highlights</span>
                                 </div>
                                 <p className="text-xl text-gray-600 leading-relaxed font-medium">
                                   {displayDescription}
                                 </p>
                               </div>

                               {/* At a Glance */}
                               <div className="md:col-span-5 space-y-6">
                                 <div className="flex items-center gap-4">
                                   <div className="w-12 h-[2px] bg-[#ff5722]"></div>
                                   <span className="text-[11px] font-black tracking-[0.3em] uppercase text-black">At A Glance</span>
                                 </div>
                                 <div className="space-y-4">
                                   {glanceItems.length > 0 ? (
                                     glanceItems.slice(0, 5).map((item, idx) => (
                                       <div key={idx} className="flex items-center gap-5 p-5 rounded-2xl border border-gray-100 bg-white shadow-sm hover:border-[#ff5722]/30 transition-colors">
                                         {item.icon === "location" ? <MapPin className="w-5 h-5 text-[#ff5722] shrink-0" /> :
                                          item.icon === "stay" ? <Users className="w-5 h-5 text-[#ff5722] shrink-0" /> :
                                          item.icon === "meals" ? <Utensils className="w-5 h-5 text-[#ff5722] shrink-0" /> :
                                          idx % 2 === 0 ? <Car className="w-5 h-5 text-[#ff5722] shrink-0" /> : <Sparkles className="w-5 h-5 text-[#ff5722] shrink-0" />}
                                         <span className="text-xs font-black uppercase tracking-widest text-black/80">{item.label.substring(0, 50)}</span>
                                       </div>
                                     ))
                                   ) : (
                                      <div className="flex items-center gap-5 p-5 rounded-2xl border border-gray-100 bg-white shadow-sm hover:border-[#ff5722]/30 transition-colors">
                                        <Sparkles className="w-5 h-5 text-[#ff5722] shrink-0" />
                                        <span className="text-xs font-black uppercase tracking-widest text-black/80">Scenic Views & Activities</span>
                                      </div>
                                   )}
                                 </div>
                               </div>
                             </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )})}
              </div>
            </section>

            {/* Inclusions */}
            <section ref={inclusionsRef} className="scroll-mt-52">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-black text-white p-14 rounded-[60px]">
                  <h3 className="text-[10px] font-black text-primary tracking-[0.5em] uppercase mb-12">Inclusions</h3>
                  <div className="space-y-6">
                    {trip.inclusions.map((item, i) => (
                      <div key={i} className="flex gap-6 items-start">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                        <span className="text-base font-bold text-gray-400 leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 p-14 rounded-[60px]">
                  <h3 className="text-[10px] font-black text-gray-400 tracking-[0.5em] uppercase mb-12">Exclusions</h3>
                  <div className="space-y-6">
                    {trip.exclusions.map((item, i) => (
                      <div key={i} className="flex gap-6 items-start">
                        <X className="w-5 h-5 text-gray-300 shrink-0 mt-1" />
                        <span className="text-base font-bold text-gray-500 leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section ref={faqsRef} className="scroll-mt-52 pt-12 border-t border-gray-100">
              <h3 className="text-4xl font-black text-black tracking-tighter uppercase mb-12">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {displayFaqs.map((faq, i) => (
                  <div key={i} className="bg-gray-50 rounded-[30px] overflow-hidden">
                    <button 
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full text-left p-8 flex items-center justify-between"
                    >
                      <h4 className="font-bold text-lg text-black pr-4">{faq.question}</h4>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${openFaq === i ? "bg-black text-white" : "bg-white text-gray-400"}`}>
                        <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                      </div>
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-8 pb-8 pt-0 text-gray-500 font-medium leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ── STICKY SIDEBAR ── */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-48 space-y-8">
              <div className="p-12 bg-white rounded-[60px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col gap-10">
                <div className="space-y-2">
                   <div className="flex items-center justify-between">
                     <span className="bg-primary/10 text-primary text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Early Bird</span>
                     <span className="text-green-600 font-black text-xs uppercase">Save ₹4,000</span>
                   </div>
                   <div className="flex flex-col pt-4">
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Starting from</p>
                     <div className="flex items-baseline gap-3">
                       <span className="text-6xl font-black text-black tracking-tighter">₹{totalPrice.toLocaleString()}</span>
                     </div>
                     <div className="flex items-center gap-2 pl-1">
                        <span className="text-gray-400 line-through text-lg font-bold">₹{totalOriginalPrice.toLocaleString()}</span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">/ per person</span>
                     </div>
                     <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2 pl-1">+ taxes</p>
                   </div>
                </div>

                <div className="pt-6 border-t border-gray-100 space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-green-500 shrink-0 mt-1" />
                    <div>
                       <p className="text-xs font-black text-black uppercase tracking-tight leading-tight">
                         {(currentVariant as any)?.location || currentVariant?.label || "Trip"} Package with {travelLabel}
                       </p>
                       <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                         {currentVariant?.duration || trip.duration} / {roomLabel} Sharing 
                         {selectedDate && ` • ${selectedMonth} ${selectedDate}, 2026`}
                       </p>
                    </div>
                  </div>
                </div>

                {trip.addons && trip.addons.length > 0 && (
                  <div className="pt-6 border-t border-gray-100 space-y-4">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Available Add-ons</h4>
                    <div className="space-y-3">
                      {trip.addons.map((addon, i) => {
                        const currentQty = selectedAddons[addon.name] || 0;
                        return (
                          <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${currentQty > 0 ? "bg-primary/5 border-primary/20 shadow-sm" : "bg-gray-50 border-gray-200"}`}>
                            <div>
                              <p className="text-xs font-black text-black uppercase tracking-tight">{addon.name}</p>
                              <p className="text-[9px] text-gray-400 font-medium">₹{addon.rate.toLocaleString()} / unit</p>
                            </div>
                            <div className="flex items-center gap-2">
                               {currentQty > 0 && (
                                 <button 
                                   onClick={() => setSelectedAddons({ ...selectedAddons, [addon.name]: Math.max(0, currentQty - 1) })}
                                   className="h-8 w-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-red-500 transition-all shadow-sm"
                                 >
                                   <X className="w-3 h-3 text-red-500" />
                                 </button>
                               )}
                               <button 
                                 onClick={() => setSelectedAddons({ ...selectedAddons, [addon.name]: currentQty + 1 })}
                                 className={`h-8 w-8 rounded-lg border flex items-center justify-center transition-all shadow-sm ${currentQty > 0 ? "bg-primary text-white border-primary" : "bg-white border-gray-200 hover:border-primary"}`}
                               >
                                 {currentQty > 0 ? <span className="text-xs font-black">{currentQty}</span> : <Plus className="w-4 h-4 text-primary" />}
                               </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <button 
                    onClick={() => setShowInquiry(true)}
                    className="avian-button w-full !rounded-[24px] !py-6 text-sm !tracking-widest shadow-2xl shadow-primary/30"
                  >
                    SEND ENQUIRY
                  </button>
                  <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest">Group of 2+ Travellers? Request Callback</p>
                </div>
              </div>

              <div className="p-8 bg-gray-50 border border-gray-100 rounded-[50px] space-y-6">
                <h4 className="font-black text-xs uppercase tracking-widest text-black pl-2">Private Trips Available</h4>
                <button className="flex items-center justify-between w-full bg-white border border-gray-100 text-black font-black text-[10px] px-8 py-5 rounded-[24px] hover:border-black transition-all tracking-widest shadow-sm">
                   REQUEST A CALLBACK
                   <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex gap-4">
                <a 
                  href={`https://wa.me/${settings?.contactPhone?.replace(/\D/g, '') || "919924246267"}?text=Hi!+Interested+in+${encodeURIComponent(trip.title)}`}
                  target="_blank"
                  className="flex-1 flex items-center justify-center gap-3 bg-white border border-gray-100 text-black font-black text-[10px] py-6 rounded-[24px] hover:bg-green-500 hover:text-white hover:border-green-500 transition-all tracking-widest shadow-sm"
                >
                   <MessageCircle className="w-5 h-5 fill-current" />
                   WHATSAPP
                </a>
                <button className="flex-1 flex items-center justify-center gap-3 bg-white border border-gray-100 text-black font-black text-[10px] py-6 rounded-[24px] hover:bg-black hover:text-white hover:border-black transition-all tracking-widest shadow-sm">
                   GET PDF
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />

      <AnimatePresence>
        {showInquiry && (
          <InquiryPopup 
            tour={{
              title: `${trip.title} - ${(currentVariant as any)?.location || currentVariant?.label || "Trip"}`,
              duration: currentVariant?.duration || trip.duration,
              subtitle: `${travelLabel} | ${roomLabel} Sharing${Object.entries(selectedAddons).length > 0 ? ` | ${Object.entries(selectedAddons).map(([n, q]) => `${n} x${q}`).join(', ')}` : ""}`,
              images: tripImages
            }}
            onClose={() => setShowInquiry(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function StatItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-primary mb-2">
        {icon}
      </div>
      <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">{label}</p>
      <p className="text-base font-black text-black tracking-tighter uppercase">{value}</p>
    </div>
  );
}
