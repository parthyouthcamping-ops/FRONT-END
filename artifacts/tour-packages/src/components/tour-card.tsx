import { MapPin, Clock, ArrowRight, Star } from "lucide-react";
import { Link } from "wouter";

interface TourCardProps {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  price: number;
  originalPrice: number;
  images: string[];
  destination: string;
}

export function TourCard({ id, title, subtitle, duration, price, originalPrice, images }: TourCardProps) {
  const savings = originalPrice - price;

  return (
    <Link href={`/tours/${id}`}>
      <div className="bg-white rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col group h-full">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={images[0] || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-8 flex-1 flex flex-col space-y-4">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">{duration}</p>
            <h3 className="text-lg font-black leading-tight text-black line-clamp-2 uppercase tracking-tight group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-[10px] text-gray-500 font-medium italic">{subtitle}</p>
          </div>
          
          <div className="mt-auto pt-4 flex flex-col gap-4">
            {savings > 0 && (
              <div className="self-start bg-green-50 text-green-600 px-4 py-1.5 rounded-full flex items-center gap-2 border border-green-100">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Save ₹{savings.toLocaleString()}</span>
              </div>
            )}
            
            <div className="flex items-baseline gap-3">
               <span className="text-xl font-black text-primary italic">₹{price.toLocaleString()}</span>
               {originalPrice > price && (
                 <span className="text-xs font-bold text-gray-300 line-through decoration-2 tracking-tighter decoration-gray-200">₹{originalPrice.toLocaleString()}</span>
               )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}



