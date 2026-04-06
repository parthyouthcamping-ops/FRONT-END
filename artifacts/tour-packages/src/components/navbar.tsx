import { Link } from "wouter";
import { useState } from "react";
import { Search, Phone, Menu, X } from "lucide-react";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex items-center">
              <span className="text-xl font-bold text-primary tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Avian
              </span>
              <span className="text-xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Experiences
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/" className="px-4 py-2 text-sm font-semibold text-primary border-b-2 border-primary">
              Tour Packages
            </Link>
            <Link href="#" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              Group Trips
            </Link>
            <Link href="#" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              Creator Trips
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span>+91 98765 43210</span>
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600">
              <Search className="w-5 h-5" />
            </button>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          <Link href="/" className="block px-3 py-2 text-sm font-semibold text-primary rounded-lg bg-red-50">Tour Packages</Link>
          <Link href="#" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">Group Trips</Link>
          <Link href="#" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">Creator Trips</Link>
          <div className="pt-2 border-t border-gray-100">
            <a href="tel:+919876543210" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700">
              <Phone className="w-4 h-4" />
              +91 98765 43210
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
