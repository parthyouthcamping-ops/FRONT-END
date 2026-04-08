import { useState } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/navbar";
import { DestinationTabs } from "@/components/destination-tabs";
import { TourCard } from "@/components/tour-card";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { allTours } from "@/data/tours";

function Home() {
  const [activeTab, setActiveTab] = useState("all");

  const visibleTours =
    activeTab === "all"
      ? allTours
      : allTours.filter((t) => t.destination.includes(activeTab));

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "Poppins, sans-serif" }}>
      <Navbar />
      <DestinationTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Hero Banner */}
      <div className="relative w-full overflow-hidden" style={{ height: 320 }}>
        <img
          src="https://vl-prod-static.b-cdn.net/system/images/000/780/691/c436acb230aef2966afeac73a90aa076/original/Purple_Illustration_City_Desktop_Wallpaper.jpg"
          alt="Discover Your Next Adventure"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent flex flex-col items-start justify-center px-10 md:px-20">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-2 drop-shadow">
            Discover Your Next<br />Adventure
          </h1>
          <p className="text-white/80 text-base md:text-lg mb-6 font-medium">"One Trip at a Time"</p>
          <button
            onClick={() => setActiveTab("all")}
            className="bg-primary hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm shadow-lg"
          >
            Explore Now
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            {activeTab === "all" ? "All Trips" : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Trips`}
            <span className="ml-2 text-sm font-normal text-gray-400">({visibleTours.length} trips)</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {visibleTours.map((tour) => (
            <Link key={tour.id} href={`/tours/${tour.id}`}>
              <TourCard
                id={tour.id}
                title={tour.title}
                subtitle={tour.subtitle}
                duration={tour.duration}
                price={tour.price}
                originalPrice={tour.originalPrice}
                images={tour.images}
                destination={tour.destination[0]}
              />
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-1">
              <div className="text-xl font-bold mb-3">
                <span className="text-primary">Youth</span>Camping
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Your trusted travel partner for unforgettable youth camping trips and customised tour packages across India.
              </p>
              <div className="flex gap-3">
                {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm text-gray-300 uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {["Tour Packages", "Group Trips", "About Us", "Contact Us", "Privacy Policy", "Terms & Conditions"].map((l) => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm text-gray-300 uppercase tracking-wider mb-4">Destinations</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {["Manali & Kasol", "Spiti Valley", "Leh Ladakh", "Kedarnath", "Shimla", "Kerala"].map((l) => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm text-gray-300 uppercase tracking-wider mb-4">Contact Us</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                  <span>+91 99242 46267</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                  <span>youthcampingmedia@gmail.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                  <span>Ahmedabad, Gujarat, India</span>
                </li>
                <li className="text-xs text-gray-500">Available 10AM – 7PM</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
            <p>© {new Date().getFullYear()} YouthCamping. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Made with care for travellers across India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
