import { useState, useMemo } from "react";
import { Navbar } from "@/components/navbar";
import { TourCard } from "@/components/tour-card";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Search, SlidersHorizontal, MapPin, Calendar } from "lucide-react";
import { Link } from "wouter";

interface LiveTrip {
  id: string;
  title: string;
  location: string;
  price: number;
  duration: string;
  heroImage?: string;
  images: string[];
  category?: string;
}

export default function TourListings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8888/api";

  const { data: trips = [], isLoading } = useQuery<LiveTrip[]>({
    queryKey: ["trips"],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/trips`);
      const json = await res.json();
      return json.data;
    }
  });

  const filteredTrips = useMemo(() => {
    return trips.filter(trip => {
      const matchesSearch = trip.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           trip.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = maxPrice === "" || trip.price <= maxPrice;
      const matchesCategory = selectedCategory === "all" || trip.category?.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesPrice && matchesCategory;
    });
  }, [trips, searchQuery, maxPrice, selectedCategory]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── PAGE HERO ── */}
      <section className="bg-black py-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <h1 className="text-7xl md:text-8xl font-black text-white leading-none tracking-tighter uppercase mb-6">
              Top Selling<br /><span className="text-primary italic">Group Trips!</span>
            </h1>
            <p className="max-w-xl text-lg text-gray-400 font-medium">Explore our curated collection of extraordinary experiences across the subcontinent and beyond.</p>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <section className="bg-white border-b border-gray-100 py-10 px-6 sticky top-[79px] z-30 shadow-sm shadow-black/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 justify-between">
          <div className="flex flex-1 items-center gap-4 w-full">
            <div className="relative flex-1">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
              <input 
                type="text" 
                placeholder="SEARCH DESTINATIONS" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border-none p-5 pl-14 text-xs font-black tracking-widest text-black outline-none focus:ring-2 ring-primary transition-all rounded-3xl"
              />
            </div>
            <div className="relative w-56 hidden md:block">
              <input 
                type="number" 
                placeholder="MAX PRICE" 
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full bg-gray-50 border-none p-5 text-xs font-black tracking-widest text-black outline-none focus:ring-2 ring-primary transition-all rounded-3xl"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0">
            {["all", "himachal", "ladakh", "trekking", "backpacking"].map(cat => (
               <FilterButton key={cat} active={selectedCategory === cat} onClick={() => setSelectedCategory(cat)}>
                 {cat}
               </FilterButton>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRIP GRID ── */}
      <main className="max-w-7xl mx-auto px-6 py-24 min-h-[60vh]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <Loader2 className="w-16 h-16 text-primary animate-spin" />
            <p className="text-xs font-black tracking-[0.4em] text-black uppercase animate-pulse">Locating Expeditions...</p>
          </div>
        ) : filteredTrips.length === 0 ? (
          <div className="text-center py-32 border-2 border-dashed border-gray-100 rounded-3xl">
            <h3 className="text-3xl font-black text-black mb-4 tracking-tighter uppercase">No Journeys Found</h3>
            <p className="text-gray-500 font-medium">Broaden your horizons by exploring other categories.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredTrips.map((tour) => (
              <div key={tour.id}>
                <TourCard
                  id={tour.id}
                  title={tour.title}
                  subtitle={tour.location}
                  duration={tour.duration}
                  price={tour.price}
                  originalPrice={tour.price}
                  images={tour.images.length > 0 ? tour.images : [tour.heroImage || ""]}
                  destination={tour.location}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function FilterButton({ children, active, onClick }: { children: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`whitespace-nowrap font-black text-[10px] tracking-[0.2em] uppercase py-3.5 px-8 rounded-full transition-all border-2 ${active ? "bg-black text-white border-black" : "text-gray-400 border-gray-100 hover:border-black hover:text-black"}`}
    >
      {children}
    </button>
  );
}
