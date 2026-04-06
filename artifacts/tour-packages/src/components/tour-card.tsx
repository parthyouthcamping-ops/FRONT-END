import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Tag } from "lucide-react";

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

export function TourCard({
  title,
  subtitle,
  duration,
  price,
  originalPrice,
  images,
}: TourCardProps) {
  const [currentImg, setCurrentImg] = useState(0);
  const savings = originalPrice - price;

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImg((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImg((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer group"
      data-testid={`card-tour-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Image Slider */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        {/* Images */}
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentImg * 100}%)` }}
        >
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${title} - photo ${i + 1}`}
              className="w-full h-full object-cover shrink-0"
              style={{ width: "100%" }}
            />
          ))}
        </div>

        {/* Duration badge */}
        <div className="absolute top-3 left-3 bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-sm">
          <Clock className="w-3 h-3" />
          {duration}
        </div>

        {/* Prev/Next arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4 text-gray-800" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4 text-gray-800" />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentImg(i); }}
                className={`rounded-full transition-all ${
                  i === currentImg ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/60"
                }`}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Title */}
        <div className="mb-3">
          <h3 className="text-sm font-bold text-gray-900 leading-snug" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-0.5 font-medium">{subtitle}</p>
          )}
        </div>

        {/* Price Row */}
        <div className="flex items-center justify-between">
          <div>
            {/* Save badge */}
            {savings > 0 && (
              <div className="flex items-center gap-1 mb-1">
                <Tag className="w-3 h-3 text-primary" />
                <span className="text-xs text-primary font-semibold">
                  Save ₹{savings.toLocaleString('en-IN')}
                </span>
              </div>
            )}
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-primary" style={{ fontFamily: 'Poppins, sans-serif' }}>
                ₹{price.toLocaleString('en-IN')}
              </span>
              {originalPrice > price && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400">per person</p>
          </div>

          <button
            className="bg-primary text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            data-testid={`button-book-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
