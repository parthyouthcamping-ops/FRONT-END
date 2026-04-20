import { MapPin } from "lucide-react";

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities?: string[];
  stay?: string;
}

interface ItineraryProps {
  days: ItineraryDay[];
}

export function Itinerary({ days }: ItineraryProps) {
  return (
    <div className="space-y-12 relative">
      {/* Connector Line */}
      <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gray-100 hidden md:block" />

      {days.map((item, idx) => (
        <div key={idx} className="flex flex-col md:flex-row gap-8 relative">
          {/* Day Marker */}
          <div className="hidden md:flex flex-col items-center">
             <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center z-10">
                <span className="text-[10px] font-bold">D{item.day}</span>
             </div>
          </div>

          {/* Content */}
          <div className="flex-1 bg-white p-6 md:p-8 rounded-2xl border border-gray-100 hover:border-primary/30 transition-all group">
            <div className="flex items-center gap-3 mb-4 md:hidden">
              <span className="bg-primary text-black px-3 py-1 rounded-full text-[10px] font-bold">DAY {item.day}</span>
            </div>
            
            <h3 className="text-2xl font-serif font-bold mb-4 group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {item.description}
            </p>

            {(item.activities || item.stay) && (
              <div className="flex flex-wrap gap-6 pt-6 border-t border-gray-50">
                {item.activities && (
                  <div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Activities</span>
                    <div className="flex flex-wrap gap-2">
                       {item.activities.map((act, i) => (
                         <span key={i} className="bg-gray-50 px-3 py-1 rounded-full text-xs text-foreground font-medium">{act}</span>
                       ))}
                    </div>
                  </div>
                )}
                {item.stay && (
                  <div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Overnight</span>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <MapPin className="w-4 h-4 text-primary" /> {item.stay}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
