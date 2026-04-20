import { useMemo, useState } from "react";
import { Navbar } from "@/components/navbar";
import { TourCard } from "@/components/tour-card";
import { Search, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/lib/api-config";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";

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

interface LiveTrip {
  id: string;
  title: string;
  location: string;
  price: number;
  duration: string;
  category: string;
  images: string[];
  status: string;
}

export default function TourListings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: trips = [], isLoading } = useQuery<LiveTrip[]>({
    queryKey: ["trips"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/trips`);
      const json = await res.json();
      return json.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30,    // 30 minutes
  });

  const filteredTrips = useMemo(() => {
    return trips.filter(trip => {
      const matchesSearch = trip.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           trip.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || trip.category?.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory && trip.status === 'published';
    });
  }, [trips, searchQuery, selectedCategory]);

  const { data: pageData } = useQuery<PageData>({
    queryKey: ["page", "tour-packages"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/pages/tour-packages`);
      const json = await res.json();
      return json.data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 1 day
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen section-ghost">
      <SEO 
        title={pageData?.seo?.metaTitle} 
        description={pageData?.seo?.metaDescription} 
        image={pageData?.seo?.ogImage} 
        focusKeyword={pageData?.seo?.focusKeyword}
        canonicalUrl={pageData?.seo?.canonicalUrl}
        faqSchema={pageData?.seo?.faqSchema}
      />
      <Navbar />

      {/* Filter Header */}
      <div className="bg-white border-b border-gray-100 py-10 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-black tracking-tight">Adventure & Activities</h1>
            <p className="text-gray-500 font-medium tracking-tight">Discover your next epic journey with YouthCamping.</p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search destinations or experiences..."
                className="w-full pl-14 pr-6 py-4 rounded-[20px] bg-gray-50 border-transparent focus:bg-white focus:border-primary focus:ring-0 font-medium transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
               {["all", "Beach", "Adventure", "Cultural", "Wildlife", "Luxury", "Trekking"].map(cat => (
                 <button 
                   key={cat}
                   onClick={() => setSelectedCategory(cat)}
                   className={`px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${selectedCategory === cat ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-gray-50 text-gray-400 hover:bg-gray-100"}`}
                 >
                   {cat}
                 </button>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {filteredTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredTrips.map((trip) => (
              <TourCard
                key={trip.id}
                id={trip.id}
                title={trip.title}
                subtitle={trip.location}
                duration={trip.duration}
                price={trip.price}
                originalPrice={trip.price * 1.2}
                images={trip.images}
                destination={trip.location}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-40">
            <p className="text-2xl font-bold text-black uppercase tracking-tighter">No experiences found.</p>
            <button onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }} className="mt-6 text-primary font-bold uppercase tracking-widest text-xs hover:underline underline-offset-8">Clear all filters</button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
