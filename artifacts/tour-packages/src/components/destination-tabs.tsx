import { useRef } from "react";
import { ChevronLeft, ChevronRight, Mountain, Palmtree, TentTree, Trees, Landmark, Waves, Snowflake, Compass } from "lucide-react";

const destinations = [
  { id: "all", label: "All Trips", icon: Compass },
  { id: "manali", label: "Manali", icon: TentTree },
  { id: "spiti", label: "Spiti Valley", icon: Mountain },
  { id: "ladakh", label: "Ladakh", icon: Snowflake },
  { id: "kedarnath", label: "Kedarnath", icon: Landmark },
  { id: "shimla", label: "Shimla", icon: Mountain },
  { id: "kerala", label: "Kerala", icon: Palmtree },
  { id: "kasol", label: "Kasol", icon: Trees },
];

interface DestinationTabsProps {
  activeTab: string;
  onTabChange: (id: string) => void;
}

export function DestinationTabs({ activeTab, onTabChange }: DestinationTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md border border-gray-200 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>

        <div
          ref={scrollRef}
          className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2 px-8"
        >
          {destinations.map((dest) => {
            const Icon = dest.icon;
            return (
              <button
                key={dest.id}
                onClick={() => onTabChange(dest.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                  activeTab === dest.id
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{dest.label}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md border border-gray-200 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
