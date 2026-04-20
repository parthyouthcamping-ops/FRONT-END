import { Link } from "wouter";
import { 
  Phone, Mail, MapPin, MessageCircle, 
  Instagram, Youtube, Facebook, Twitter, Linkedin,
  Send
} from "lucide-react";
import { useSettings } from "@/hooks/use-settings";

export function Footer() {
  const { data: settings } = useSettings();

  return (
    <footer className="relative mt-40">
      {/* ── CTA BAR (Overlapping) ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl px-6 z-20">
        <div className="bg-white rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-10">
           {/* Left: WhatsApp Call */}
           <div className="flex flex-col md:flex-row items-center gap-6 flex-1 justify-center lg:justify-start">
              <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-green-200 shrink-0">
                 <MessageCircle className="w-10 h-10 text-white fill-white" />
              </div>
              <div className="text-center md:text-left">
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Don't wait any longer, Contact us!</p>
                 <a href={`https://wa.me/${settings?.contactPhone?.replace(/\D/g, '') || "919099599331"}`} target="_blank" className="text-3xl lg:text-4xl font-black text-black tracking-tighter">
                   {settings?.contactPhone || "90 99 599 331"}
                 </a>
              </div>
           </div>

           {/* Divider */}
           <div className="hidden lg:block h-16 w-px bg-gray-100 mx-8" />

           {/* Right: Social Media */}
           <div className="flex flex-col items-center lg:items-start flex-1 justify-center lg:justify-start">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Be part of our Social Media Journey!</p>
              <div className="flex gap-3">
                 {[
                   { icon: Instagram, color: 'bg-[#E4405F]', href: settings?.socialLinks?.instagram },
                   { icon: Youtube, color: 'bg-[#FF0000]', href: settings?.socialLinks?.youtube },
                   { icon: Facebook, color: 'bg-[#1877F2]', href: settings?.socialLinks?.facebook },
                   { icon: Twitter, color: 'bg-[#000000]', href: settings?.socialLinks?.twitter },
                   { icon: Linkedin, color: 'bg-[#0A66C2]', href: settings?.socialLinks?.linkedin }
                 ].map((social, i) => (
                   <a key={i} href={social.href || "#"} target="_blank" rel="noopener noreferrer" className={`${social.color} w-9 h-9 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform shadow-sm`}>
                      <social.icon className="w-4 h-4" />
                   </a>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* ── MAIN FOOTER ── */}
      <div className="bg-[#2A2A2A] text-white pt-48 pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24">
             {/* Brand Column */}
             <div className="lg:col-span-12 xl:col-span-4 space-y-12">
                <div className="flex flex-col gap-2">
                   <div className="flex items-center gap-4">
                      {settings?.logo ? (
                        <img src={settings.logo} alt="Logo" className="h-16 w-auto object-contain" />
                      ) : (
                        <div className="flex flex-col">
                           <span className="text-4xl font-black tracking-tighter uppercase leading-none">{settings?.siteName || "YouthCamping"}</span>
                           <span className="font-handwriting text-primary text-xl ml-1">experiences</span>
                        </div>
                      )}
                   </div>
                </div>
                
                <div className="flex items-start gap-4 max-w-sm">
                   <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                   </div>
                   <pre className="font-sans whitespace-pre-wrap text-[13px] text-gray-400 leading-relaxed pt-1">
                      {settings?.address || "A - 738, Money Plant High Street,\nIIM Road, Ahmedabad,\nGujarat 380015"}
                   </pre>
                </div>
             </div>

             {/* Links Column */}
             <div className="lg:col-span-6 xl:col-span-4 space-y-10">
                <h4 className="text-xs font-black tracking-[0.3em] uppercase text-white pb-2 border-b border-white/10 w-fit">Explore</h4>
                <ul className="grid grid-cols-2 gap-y-4 gap-x-8 text-gray-400 font-bold text-sm">
                   {[
                     { label: "Home", href: "/" },
                     { label: "Tour Packages", href: "/tour-packages" },
                     { label: "Group Trips", href: "/group-trips" },
                     { label: "Creator", href: "/creator" },
                     { label: "Team", href: "/team" },
                     { label: "Careers", href: "/careers" },
                     { label: "About Us", href: "/about" },
                     { label: "Contact Us", href: "/contact" },
                     { label: "Terms & Conditions", href: "/terms" },
                     { label: "Privacy Policy", href: "/privacy" }
                   ].map((link, i) => (
                     <li key={i}><Link href={link.href} className="hover:text-primary transition-colors">{link.label}</Link></li>
                   ))}
                </ul>
             </div>

             {/* Newsletter Column */}
             <div className="lg:col-span-6 xl:col-span-4 space-y-10">
                <h4 className="text-xs font-black tracking-[0.3em] uppercase text-white pb-2 border-b border-white/10 w-fit">Get Updates & more!</h4>
                <div className="space-y-4">
                   <p className="text-sm text-gray-400 font-medium leading-relaxed">Subscribe to the free newsletter and stay up to date.</p>
                   <div className="space-y-3">
                      <input 
                        type="email" 
                        placeholder="Your Email" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm font-bold focus:bg-white/10 focus:border-primary transition-all outline-none" 
                      />
                      <button className="w-full bg-white text-black font-black uppercase text-xs tracking-widest py-4 rounded-xl hover:bg-primary hover:text-white transition-all shadow-xl shadow-black/20">
                         Subscribe
                      </button>
                   </div>
                </div>
             </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  © 2026 {settings?.siteName || "YouthCamping"} Private Limited
                </p>
             </div>
             
             <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Made with ❤️ in India</span>
                <img src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" alt="India Flag" className="h-3 shadow-sm rounded-sm" />
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
