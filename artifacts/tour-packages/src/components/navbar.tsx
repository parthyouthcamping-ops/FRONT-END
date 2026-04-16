import { Link } from "wouter";
import { useState } from "react";
import { Search, Phone, Menu, X, User as UserIcon, LogOut, Calendar } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useSettings } from "@/hooks/use-settings";
import { AuthModal } from "./auth-modal";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const { data: settings } = useSettings();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
             <div className="h-14 overflow-hidden flex items-center">
               <img src={settings?.logo || "/logo-header.png"} alt="YouthCamping Logo" className="h-[150px] w-auto object-contain" />
             </div>
          </Link>

          {/* Desktop Nav - Centered */}
          <div className="hidden lg:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
             {/* Centered links removed for cleaner look, as trips show on main page */}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-8">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-all overflow-hidden border border-gray-100 shadow-sm">
                    <UserIcon className="w-5 h-5 mx-auto text-gray-600" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-2xl shadow-2xl border-gray-100 p-2 mt-2">
                  <div className="px-3 py-2 border-b border-gray-50 mb-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Explorer</p>
                    <p className="text-sm font-bold text-black truncate">{user.email}</p>
                  </div>
                  <Link href="/my-trips">
                    <DropdownMenuItem className="cursor-pointer text-gray-600 focus:text-black focus:bg-gray-50 py-3 rounded-xl font-bold text-xs uppercase tracking-widest">
                       Bookings
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem 
                    onClick={logout}
                    className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50 py-3 rounded-xl font-black text-xs border-t border-gray-50 mt-2 tracking-widest"
                  >
                    LOG OUT
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button 
                onClick={() => setAuthModalOpen(true)}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all border border-gray-100"
              >
                <UserIcon className="w-5 h-5 text-gray-600" />
              </button>
            )}

            <button className="p-2.5 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors text-black lg:hidden">
              <Menu className="w-5 h-5" onClick={() => setMenuOpen(true)} />
            </button>
          </div>
        </div>
      </div>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-[60] transition-transform duration-700 cubic-bezier(0.2, 0, 0, 1) transform ${menuOpen ? "translate-x-0" : "translate-x-full"} lg:hidden`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-16">
            <span className="text-2xl font-black text-black">{settings?.siteName || "YouthCamping"}</span>
            <X className="w-8 h-8 text-black bg-gray-50 p-2 rounded-xl" onClick={() => setMenuOpen(false)} />
          </div>
          <div className="flex flex-col gap-8">
            <MobileNavLink href="/" onClick={() => setMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink href="/about" onClick={() => setMenuOpen(false)}>Our Story</MobileNavLink>
          </div>
          
          <div className="mt-auto pb-10">
            {!user ? (
              <button 
                onClick={() => { setAuthModalOpen(true); setMenuOpen(false); }}
                className="avian-button w-full shadow-2xl shadow-primary/30"
              >
                LOG IN / REGISTER
              </button>
            ) : (
              <div className="flex flex-col gap-6">
                <Link href="/my-trips" onClick={() => setMenuOpen(false)} className="text-3xl font-black text-black">My Bookings</Link>
                <button onClick={logout} className="text-3xl font-black text-primary text-left">Sign Out</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm font-bold text-black/60 hover:text-black transition-colors relative group">
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
    </Link>
  );
}

function MobileNavLink({ href, children, onClick }: { href: string, children: React.ReactNode, onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="text-5xl font-black text-black tracking-tighter hover:text-primary transition-colors">
      {children}
    </Link>
  );
}


