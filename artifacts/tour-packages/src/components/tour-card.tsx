import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TourCardProps {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: string;
  difficulty: "Easy" | "Moderate" | "Challenging";
  imageUrl: string;
  highlights: string[];
  species: string[];
  delay?: number;
}

export function TourCard({ 
  title, 
  location, 
  duration, 
  price, 
  difficulty, 
  imageUrl, 
  highlights,
  species,
  delay = 0 
}: TourCardProps) {
  
  const difficultyColor = {
    Easy: "bg-accent/20 text-accent-foreground border-accent/30",
    Moderate: "bg-primary/20 text-primary-foreground border-primary/30",
    Challenging: "bg-destructive/20 text-destructive border-destructive/30"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: delay * 0.1, ease: "easeOut" }}
      className="group flex flex-col bg-card border border-border overflow-hidden hover:shadow-xl transition-all duration-500"
    >
      <div className="relative h-72 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-4 left-4 z-20">
          <Badge variant="outline" className={`backdrop-blur-md ${difficultyColor[difficulty]}`}>
            {difficulty}
          </Badge>
        </div>
        <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end">
          <div className="flex items-center gap-1.5 text-white/90 text-sm font-medium backdrop-blur-sm bg-black/30 px-3 py-1.5 w-fit">
            <MapPin className="w-4 h-4" />
            {location}
          </div>
          <div className="flex items-center gap-1.5 text-white/90 text-sm font-medium backdrop-blur-sm bg-black/30 px-3 py-1.5 w-fit font-mono">
            <Clock className="w-4 h-4" />
            {duration}
          </div>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-serif mb-3 group-hover:text-primary transition-colors">{title}</h3>
        
        <div className="mb-6 space-y-2 flex-grow">
          <p className="text-sm text-muted-foreground uppercase tracking-wider font-mono font-medium mb-2 border-b border-border/50 pb-2">Target Species</p>
          <div className="flex flex-wrap gap-2">
            {species.map((s, i) => (
              <span key={i} className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-sm italic">
                {s}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-6 border-t border-border mt-auto">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase tracking-widest">From</span>
            <span className="font-mono text-lg font-medium">{price}</span>
          </div>
          
          <button className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors group/btn">
            View Itinerary
            <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}