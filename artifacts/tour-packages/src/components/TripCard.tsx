import { Check, Clock } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TripCardProps {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  originalPrice: number;
  images: string[];
}

export function TripCard({ id, title, location, duration, price, originalPrice, images }: TripCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const savings = originalPrice - price;
  const tourImages = images.length > 0 ? images : ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"];

  return (
    <Link href={`/tours/${id}`}>
      <div className="premium-card group cursor-pointer flex flex-col h-full bg-white">
        {/* Avian-style Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={tourImages[currentImageIndex]}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              alt={title}
            />
          </AnimatePresence>

          {/* Dots */}
          {tourImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {tourImages.map((_, idx) => (
                <div 
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? "bg-white w-3" : "bg-white/40"}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase flex items-center gap-1.5">
              <Clock className="w-3 h-3" /> {duration}
            </span>
            {savings > 0 && (
              <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1">
                <Check className="w-2.5 h-2.5" /> Save ₹{savings.toLocaleString()}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-serif font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>

          <div className="mt-auto pt-4 flex items-end gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">From</span>
              <span className="text-2xl font-bold text-[#E11D48] leading-none">₹{price.toLocaleString()}</span>
            </div>
            {originalPrice > price && (
              <span className="text-sm text-muted-foreground line-through mb-0.5">₹{originalPrice.toLocaleString()}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
