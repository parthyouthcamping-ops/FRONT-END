import { Navbar } from "@/components/navbar";
import { TourCard } from "@/components/tour-card";
import { motion } from "framer-motion";
import { ChevronDown, Filter, Leaf } from "lucide-react";
import heroImg from "@/assets/images/hero.png";
import costaRicaImg from "@/assets/images/costa-rica.png";
import pantanalImg from "@/assets/images/pantanal.png";
import himalayasImg from "@/assets/images/himalayas.png";
import madagascarImg from "@/assets/images/madagascar.png";
import africaImg from "@/assets/images/africa.png";
import newZealandImg from "@/assets/images/new-zealand.png";
import aboutImg from "@/assets/images/about.png";

const TOURS = [
  {
    id: "costa-rica",
    title: "Cloud Forests & Quetzals",
    location: "Costa Rica",
    duration: "10 Days",
    price: "$4,200",
    difficulty: "Moderate" as const,
    imageUrl: costaRicaImg,
    highlights: ["Monteverde Reserve", "Arenal Volcano", "Sarapiquí"],
    species: ["Resplendent Quetzal", "Three-wattled Bellbird", "Keel-billed Toucan"]
  },
  {
    id: "pantanal",
    title: "Wetlands & Macaws",
    location: "Brazil",
    duration: "12 Days",
    price: "$5,800",
    difficulty: "Easy" as const,
    imageUrl: pantanalImg,
    highlights: ["Northern Pantanal", "Porto Jofre", "Cuiabá River"],
    species: ["Hyacinth Macaw", "Jaguar", "Jabiru Stork", "Sunbittern"]
  },
  {
    id: "himalayas",
    title: "Himalayan Avian Altitudes",
    location: "Bhutan & India",
    duration: "15 Days",
    price: "$6,500",
    difficulty: "Challenging" as const,
    imageUrl: himalayasImg,
    highlights: ["Phobjikha Valley", "Pele La Pass", "Eaglenest Sanctuary"],
    species: ["Himalayan Monal", "Rufous-necked Hornbill", "Ward's Trogon"]
  },
  {
    id: "madagascar",
    title: "Endemic Evolution",
    location: "Madagascar",
    duration: "14 Days",
    price: "$5,900",
    difficulty: "Moderate" as const,
    imageUrl: madagascarImg,
    highlights: ["Andasibe-Mantadia", "Ranomafana", "Ifaty"],
    species: ["Paradise Flycatcher", "Pitta-like Ground Roller", "Indri Lemur"]
  },
  {
    id: "africa",
    title: "Savanna Winged Wonders",
    location: "Kenya & Tanzania",
    duration: "12 Days",
    price: "$7,200",
    difficulty: "Easy" as const,
    imageUrl: africaImg,
    highlights: ["Masai Mara", "Serengeti", "Ngorongoro Crater"],
    species: ["Lilac-breasted Roller", "Secretarybird", "Kori Bustard"]
  },
  {
    id: "new-zealand",
    title: "Alpine Parrots & Fjords",
    location: "New Zealand",
    duration: "16 Days",
    price: "$6,800",
    difficulty: "Moderate" as const,
    imageUrl: newZealandImg,
    highlights: ["Fiordland", "Arthur's Pass", "Stewart Island"],
    species: ["Kea", "Takahē", "Yellow-eyed Penguin", "Kākāpō"]
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-primary">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src={heroImg} 
            alt="Misty rainforest canopy" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center text-white mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="text-sm md:text-base font-mono uppercase tracking-[0.3em] mb-6 text-white/80">Avian Experiences</h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 leading-tight">
              Quiet pursuit of <br />the extraordinary.
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed mb-12">
              Elite expeditions for passionate naturalists. We trace the world's most biodiverse edges to find the rare, the endemic, and the magnificent.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/60 flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest font-mono">Scroll to explore</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>
      </section>

      {/* Ethos Section */}
      <section id="ethos" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px]"
          >
            <div className="absolute inset-0 bg-primary/10 translate-x-4 translate-y-4 -z-10" />
            <img 
              src={aboutImg} 
              alt="Field journal and binoculars" 
              className="w-full h-full object-cover border border-border"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">Our Ethos</h2>
            <h3 className="text-4xl md:text-5xl font-serif mb-8 text-foreground leading-tight">Like a field journal brought to life.</h3>
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg font-light">
              <p>
                We are not a traditional travel company. We are a collective of master naturalists, ornithologists, and conservationists who believe that true wildlife observation requires patience, reverence, and deep local knowledge.
              </p>
              <p>
                Our expeditions are small, considered, and intimately connected to the rhythms of the habitats we visit. We don't chase checkboxes; we pursue profound encounters with the natural world in its most undisturbed states.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-8 pt-8 border-t border-border/50">
              <div>
                <h4 className="font-serif text-2xl mb-2">4-6</h4>
                <p className="text-sm text-muted-foreground font-mono uppercase tracking-wider">Guests per expedition</p>
              </div>
              <div>
                <h4 className="font-serif text-2xl mb-2">15+</h4>
                <p className="text-sm text-muted-foreground font-mono uppercase tracking-wider">Years field experience</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expeditions Section */}
      <section id="expeditions" className="py-24 bg-card/50 px-6 md:px-12 border-y border-border/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">Curated Journeys</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-foreground">Upcoming Expeditions</h3>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-4 text-sm"
            >
              <button className="flex items-center gap-2 border border-border bg-background px-4 py-2 hover:border-primary transition-colors hover-elevate">
                <Filter className="w-4 h-4" />
                Filter by Region
              </button>
              <button className="flex items-center gap-2 border border-border bg-background px-4 py-2 hover:border-primary transition-colors hover-elevate">
                Difficulty
              </button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TOURS.map((tour, idx) => (
              <TourCard key={tour.id} {...tour} delay={idx} />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <button className="border border-border bg-background px-8 py-4 font-medium hover:border-primary hover:text-primary transition-colors hover-elevate font-mono uppercase tracking-wider text-sm">
              View Complete Calendar
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Leaf className="w-6 h-6 text-primary" />
              <span className="font-serif text-2xl tracking-wide">Avian Experiences</span>
            </div>
            <p className="text-background/60 max-w-md font-light leading-relaxed mb-8">
              Quietly premium wildlife and bird-watching expeditions for those who revere the natural world.
            </p>
            <div className="flex gap-4">
              {/* Social icons would go here */}
            </div>
          </div>
          
          <div>
            <h4 className="font-mono text-sm uppercase tracking-widest text-background/40 mb-6">Expeditions</h4>
            <ul className="space-y-3 text-background/80 font-light">
              <li><a href="#" className="hover:text-primary transition-colors">Neotropics</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Africa & Madagascar</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Asia & Himalayas</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Australasia</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Custom Private Tours</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-mono text-sm uppercase tracking-widest text-background/40 mb-6">Connect</h4>
            <ul className="space-y-3 text-background/80 font-light">
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Request Brochure</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Our Guides</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Conservation Impact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between text-xs text-background/40 font-mono">
          <p>© {new Date().getFullYear()} Avian Experiences. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-background transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-background transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}