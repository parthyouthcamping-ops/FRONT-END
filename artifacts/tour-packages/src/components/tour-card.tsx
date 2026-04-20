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
  return (
    <Link href={`/tours/${id}`}>
      <div className="avian-card flex flex-col group h-full cursor-pointer">
        <div className="relative h-64 overflow-hidden image-zoom">
          <img
            src={images[0] || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
             <span className="badge-cyan">{duration}</span>
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-3.5 h-3.5 text-primary fill-primary" />
            <span className="text-[11px] font-bold text-black tracking-tight">4.9/5</span>
            <span className="text-[11px] text-gray-400 font-medium">(2.4k+ reviews)</span>
          </div>
          
          <h3 className="text-base font-bold leading-snug text-[#212121] line-clamp-2 group-hover:text-primary transition-colors mb-2">
            {title}
          </h3>
          <p className="text-xs text-gray-500 font-medium mb-4">{subtitle}</p>
          
          <div className="mt-auto pt-4 border-t border-gray-50 flex items-end justify-between">
            <div className="flex flex-col">
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Starting from</span>
               <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-primary tracking-tight">₹{price.toLocaleString()}</span>
                  {originalPrice > price && (
                    <span className="text-xs font-medium text-gray-400 line-through">₹{originalPrice.toLocaleString()}</span>
                  )}
               </div>
            </div>
            <div className="avian-button-outline !px-4 !py-2 !text-[10px] scale-90 group-hover:scale-100 transition-transform">
               View Details
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
