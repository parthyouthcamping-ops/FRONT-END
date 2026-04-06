import { Link } from "wouter";
import { Leaf } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 py-4 px-6 md:px-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-foreground group">
          <Leaf className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" />
          <span className="font-serif text-xl tracking-wide font-medium">Avian Experiences</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          <Link href="#expeditions" className="hover:text-primary transition-colors text-muted-foreground hover-elevate px-2 py-1">Expeditions</Link>
          <Link href="#ethos" className="hover:text-primary transition-colors text-muted-foreground hover-elevate px-2 py-1">Our Ethos</Link>
          <Link href="#journal" className="hover:text-primary transition-colors text-muted-foreground hover-elevate px-2 py-1">Field Journal</Link>
          <Link href="#contact" className="hover:text-primary transition-colors text-muted-foreground hover-elevate px-2 py-1">Contact</Link>
        </div>
        
        <div className="flex items-center">
          <Link href="#expeditions" className="bg-primary text-primary-foreground px-6 py-2 text-sm font-medium hover:bg-secondary transition-colors hover-elevate">
            View Tours
          </Link>
        </div>
      </div>
    </nav>
  );
}