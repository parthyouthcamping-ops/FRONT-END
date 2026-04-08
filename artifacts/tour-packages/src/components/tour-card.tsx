import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Clock, ArrowRight } from "lucide-react";

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

export function TourCard({ title, subtitle, duration, price, originalPrice, images }: TourCardProps) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const savings = originalPrice - price;

  const go = useCallback((dir: 1 | -1, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCurrent((i) => (i + dir + images.length) % images.length);
  }, [images.length]);

  const goTo = useCallback((i: number, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCurrent(i);
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;
    if (isHovered) {
      if (autoRef.current) clearInterval(autoRef.current);
      return;
    }
    autoRef.current = setInterval(() => {
      setCurrent((i) => (i + 1) % images.length);
    }, 3200);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [isHovered, images.length]);

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) go(diff > 0 ? 1 : -1);
  };

  const onMouseDown = (e: React.MouseEvent) => { setDragging(false); touchStartX.current = e.clientX; };
  const onMouseMove = (e: React.MouseEvent) => { if (Math.abs(e.clientX - touchStartX.current) > 5) setDragging(true); };
  const onMouseUp = (e: React.MouseEvent) => {
    const diff = touchStartX.current - e.clientX;
    if (dragging && Math.abs(diff) > 40) go(diff > 0 ? 1 : -1);
    setDragging(false);
  };

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── IMAGE SLIDER ── */}
      <div
        className="relative h-52 overflow-hidden bg-gray-100"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        {/* Slides */}
        {images.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
          >
            <img
              src={src}
              alt={`${title} ${i + 1}`}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        ))}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 pointer-events-none" />

        {/* Duration badge */}
        <div className="absolute top-3 left-3 z-20 bg-black/55 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5">
          <Clock className="w-3 h-3" />
          {duration}
        </div>

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => go(-1, e)}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft className="w-4 h-4 text-gray-800" />
            </button>
            <button
              onClick={(e) => go(1, e)}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
            >
              <ChevronRight className="w-4 h-4 text-gray-800" />
            </button>
          </>
        )}

        {/* Progress-bar style indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 z-20 flex gap-0.5 px-0">
            {images.map((_, i) => (
              <div
                key={i}
                onClick={(e) => goTo(i, e)}
                className="flex-1 h-[3px] cursor-pointer overflow-hidden bg-white/30"
              >
                <div
                  className={`h-full bg-white transition-all duration-300 ${i === current ? "w-full" : "w-0"}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── CARD CONTENT ── */}
      <div className="p-4">
        <div className="mb-3">
          <h3 className="text-sm font-bold text-gray-900 leading-snug">{title}</h3>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5 font-medium">{subtitle}</p>}
        </div>

        <div className="flex items-center justify-between">
          <div>
            {savings > 0 && (
              <p className="text-xs text-primary font-semibold mb-0.5">Save ₹{savings.toLocaleString("en-IN")}</p>
            )}
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-primary">₹{price.toLocaleString("en-IN")}</span>
              {originalPrice > price && (
                <span className="text-xs text-gray-300 line-through">₹{originalPrice.toLocaleString("en-IN")}</span>
              )}
            </div>
            <p className="text-xs text-gray-400">per person</p>
          </div>

          <div className="bg-primary group-hover:bg-red-600 text-white text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1 transition-colors duration-200 shrink-0">
            View Details
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
