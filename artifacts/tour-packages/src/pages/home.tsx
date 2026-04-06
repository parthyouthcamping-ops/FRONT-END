import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { DestinationTabs } from "@/components/destination-tabs";
import { TourCard } from "@/components/tour-card";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const tourData: Record<string, {
  sectionTitle: string;
  tours: {
    id: string;
    title: string;
    subtitle: string;
    duration: string;
    price: number;
    originalPrice: number;
    destination: string;
    images: string[];
  }[];
}[]> = {
  dubai: [{
    sectionTitle: "Dubai Tour Packages",
    tours: [
      {
        id: "dubai-1",
        title: "Dubai Tour Package",
        subtitle: "with Abu Dhabi City Tour",
        duration: "7 Days 6 Nights",
        price: 48800,
        originalPrice: 53300,
        destination: "dubai",
        images: [
          "https://img.avianexperiences.com/trek/7d83992f-285e-431a-b86b-bd5d5c06d038",
          "https://img.avianexperiences.com/trek/2a2f806c-4a55-4f49-9873-4a47969db037",
          "https://img.avianexperiences.com/trek/c303c796-e108-4ee5-95bd-48e4441d68f1",
        ],
      },
      {
        id: "dubai-2",
        title: "Dubai Travel Package",
        subtitle: "with Monorail Experience",
        duration: "6 Days 5 Nights",
        price: 40800,
        originalPrice: 45800,
        destination: "dubai",
        images: [
          "https://img.avianexperiences.com/trek/e77d0991-92d6-4460-b925-894b844bc372",
          "https://img.avianexperiences.com/trek/f7facbaf-700f-4603-8fe6-165ca4accc49",
          "https://img.avianexperiences.com/trek/c7ea0062-078e-4f5d-9292-46b985547e4b",
        ],
      },
      {
        id: "dubai-3",
        title: "Dubai Highlights",
        subtitle: "City Tour & Burj Khalifa Visit",
        duration: "5 Days 4 Nights",
        price: 33800,
        originalPrice: 37300,
        destination: "dubai",
        images: [
          "https://img.avianexperiences.com/trek/84333c16-cceb-40a2-aa77-dd08da486a10",
          "https://img.avianexperiences.com/trek/1a4e683b-91a1-462b-b462-0313d33028dd",
          "https://img.avianexperiences.com/trek/68f188e0-61ca-4d10-bb77-1b84adcd9457",
        ],
      },
      {
        id: "dubai-4",
        title: "Discover Dubai",
        subtitle: "with Desert Safari",
        duration: "4 Days 3 Nights",
        price: 25800,
        originalPrice: 29800,
        destination: "dubai",
        images: [
          "https://img.avianexperiences.com/trek/df905eb8-301d-4205-82d9-8c4af1e46d11",
          "https://img.avianexperiences.com/trek/034719fc-0457-4609-9412-c4500e212edb",
          "https://img.avianexperiences.com/trek/4ffeb481-1cec-4f88-9c2d-93f5d890ff41",
        ],
      },
      {
        id: "dubai-5",
        title: "Best of Dubai",
        subtitle: "with Abu Dhabi Stay",
        duration: "6 Days 5 Nights",
        price: 52800,
        originalPrice: 58800,
        destination: "dubai",
        images: [
          "https://img.avianexperiences.com/trek/d9ed86bd-92cc-441e-bbcb-b118add29133",
          "https://img.avianexperiences.com/trek/ea4aeb45-1e6e-4178-835c-a04737825869",
          "https://img.avianexperiences.com/trek/1602a1ab-c834-4530-8366-e1ce49f741b1",
        ],
      },
      {
        id: "dubai-6",
        title: "Dubai with Lapita Resort",
        subtitle: "Free Access to one Park",
        duration: "6 Days 5 Nights",
        price: 45800,
        originalPrice: 50600,
        destination: "dubai",
        images: [
          "https://img.avianexperiences.com/trek/56631a68-c1c5-4bf5-96cc-0e003a467a07",
          "https://img.avianexperiences.com/trek/2e1ce3cb-4f6d-4f2d-81e6-f1971475b971",
          "https://img.avianexperiences.com/trek/aaa91944-e165-46ea-b95d-30d94754bb03",
        ],
      },
    ],
  }],
  vietnam: [{
    sectionTitle: "Vietnam Tour Packages",
    tours: [
      {
        id: "vietnam-1",
        title: "Explore Vietnam",
        subtitle: "Hanoi, Da Nang & Ho Chi Minh",
        duration: "9 Days 8 Nights",
        price: 52600,
        originalPrice: 58000,
        destination: "vietnam",
        images: [
          "https://img.avianexperiences.com/trek/c94d1328-79f6-431e-b8a0-29832507cd84",
          "https://img.avianexperiences.com/trek/a25b32e6-49f9-4380-b077-6b83c4ef2c0e",
          "https://img.avianexperiences.com/trek/3a3f7044-9329-4fb2-b3f9-ecb9c682b6ac",
        ],
      },
      {
        id: "vietnam-2",
        title: "Vietnam Golden Triangle",
        subtitle: "Hanoi, Halong Bay & Hoi An",
        duration: "8 Days 7 Nights",
        price: 44800,
        originalPrice: 51000,
        destination: "vietnam",
        images: [
          "https://img.avianexperiences.com/trek/629979f0-d1c8-482f-85b6-0c0ede857850",
          "https://img.avianexperiences.com/trek/69788bcf-0b55-4a67-89f3-4f658b4bd8a1",
          "https://img.avianexperiences.com/trek/af82ff55-fc0d-4f18-b3f9-ecb9c682b6ac",
        ],
      },
      {
        id: "vietnam-3",
        title: "Vietnam & Cambodia",
        subtitle: "with Angkor Wat Tour",
        duration: "11 Days 10 Nights",
        price: 67200,
        originalPrice: 75000,
        destination: "vietnam",
        images: [
          "https://img.avianexperiences.com/trek/cd1bff33-8c58-41d1-810d-5d5d0d05d678",
          "https://img.avianexperiences.com/trek/c94d1328-79f6-431e-b8a0-29832507cd84",
          "https://img.avianexperiences.com/trek/483196f2-312e-4ed4-afeb-9574c8ed9084",
        ],
      },
    ],
  }],
  bali: [{
    sectionTitle: "Bali Tour Packages",
    tours: [
      {
        id: "bali-1",
        title: "Best of Bali",
        subtitle: "Ubud, Seminyak & Uluwatu",
        duration: "7 Days 6 Nights",
        price: 38500,
        originalPrice: 44000,
        destination: "bali",
        images: [
          "https://img.avianexperiences.com/trek/bd45d14c-099e-4d76-9378-4a6e72c00f9d",
          "https://img.avianexperiences.com/trek/ff285884-bd5b-4f93-a8ad-9501b3e17bad",
          "https://img.avianexperiences.com/trek/7d83992f-285e-431a-b86b-bd5d5c06d038",
        ],
      },
      {
        id: "bali-2",
        title: "Romantic Bali Honeymoon",
        subtitle: "Private Villa & Spa Included",
        duration: "6 Days 5 Nights",
        price: 55000,
        originalPrice: 62000,
        destination: "bali",
        images: [
          "https://img.avianexperiences.com/trek/2a2f806c-4a55-4f49-9873-4a47969db037",
          "https://img.avianexperiences.com/trek/bd45d14c-099e-4d76-9378-4a6e72c00f9d",
          "https://img.avianexperiences.com/trek/c303c796-e108-4ee5-95bd-48e4441d68f1",
        ],
      },
      {
        id: "bali-3",
        title: "Bali Budget Package",
        subtitle: "Temples, Rice Terraces & Beach",
        duration: "5 Days 4 Nights",
        price: 24800,
        originalPrice: 29500,
        destination: "bali",
        images: [
          "https://img.avianexperiences.com/trek/e77d0991-92d6-4460-b925-894b844bc372",
          "https://img.avianexperiences.com/trek/7d83992f-285e-431a-b86b-bd5d5c06d038",
          "https://img.avianexperiences.com/trek/f7facbaf-700f-4603-8fe6-165ca4accc49",
        ],
      },
    ],
  }],
  spiti: [{
    sectionTitle: "Spiti Valley Tour Packages",
    tours: [
      {
        id: "spiti-1",
        title: "Winter Spiti Group Trip",
        subtitle: "from Delhi with Chitkul Stay",
        duration: "8 Days 7 Nights",
        price: 17800,
        originalPrice: 21800,
        destination: "spiti",
        images: [
          "https://img.avianexperiences.com/trek/a2199543-ae66-4cd1-8013-4632f393a1b8/Winter_Spiti_01.webp",
          "https://img.avianexperiences.com/trek/987f7011-6106-4c6f-a526-a46d706497dc/Winter_Spiti_02.webp",
          "https://img.avianexperiences.com/trek/ba5e9d18-6e69-4a7d-a44c-bcfa38c79844/Winter_Spiti_04.webp",
        ],
      },
      {
        id: "spiti-2",
        title: "Spiti Valley Summer Trek",
        subtitle: "Pin Valley & Key Monastery",
        duration: "10 Days 9 Nights",
        price: 22500,
        originalPrice: 27000,
        destination: "spiti",
        images: [
          "https://img.avianexperiences.com/trek/bcd7ce32-bbbc-418b-86e9-17a69b595477/Winter_Spiti_03.webp",
          "https://img.avianexperiences.com/trek/03722d76-bdc1-41db-8b36-25e76e4dbd1b/Winter_Spiti_05.webp",
          "https://img.avianexperiences.com/trek/a2199543-ae66-4cd1-8013-4632f393a1b8/Winter_Spiti_01.webp",
        ],
      },
    ],
  }],
  ladakh: [{
    sectionTitle: "Ladakh Tour Packages",
    tours: [
      {
        id: "ladakh-1",
        title: "Ladakh Bike Trip",
        subtitle: "Leh to Khardung La Pass",
        duration: "9 Days 8 Nights",
        price: 29500,
        originalPrice: 34000,
        destination: "ladakh",
        images: [
          "https://img.avianexperiences.com/trek/c94d1328-79f6-431e-b8a0-29832507cd84",
          "https://img.avianexperiences.com/trek/84333c16-cceb-40a2-aa77-dd08da486a10",
          "https://img.avianexperiences.com/trek/1a4e683b-91a1-462b-b462-0313d33028dd",
        ],
      },
      {
        id: "ladakh-2",
        title: "Leh Ladakh Family Trip",
        subtitle: "Pangong Tso & Nubra Valley",
        duration: "7 Days 6 Nights",
        price: 24800,
        originalPrice: 29000,
        destination: "ladakh",
        images: [
          "https://img.avianexperiences.com/trek/68f188e0-61ca-4d10-bb77-1b84adcd9457",
          "https://img.avianexperiences.com/trek/40073301-adb6-4870-a9dd-f6e31719adcf",
          "https://img.avianexperiences.com/trek/41a457a6-9bbe-452d-9380-1fc0f9e87b61",
        ],
      },
      {
        id: "ladakh-3",
        title: "Ladakh Winter Frozen Lake",
        subtitle: "Chadar Trek Experience",
        duration: "11 Days 10 Nights",
        price: 35000,
        originalPrice: 41000,
        destination: "ladakh",
        images: [
          "https://img.avianexperiences.com/trek/df905eb8-301d-4205-82d9-8c4af1e46d11",
          "https://img.avianexperiences.com/trek/034719fc-0457-4609-9412-c4500e212edb",
          "https://img.avianexperiences.com/trek/c94d1328-79f6-431e-b8a0-29832507cd84",
        ],
      },
    ],
  }],
  kashmir: [{
    sectionTitle: "Kashmir Tour Packages",
    tours: [
      {
        id: "kashmir-1",
        title: "Kashmir Winter Wonderland",
        subtitle: "Gulmarg Snow Experience",
        duration: "6 Days 5 Nights",
        price: 21500,
        originalPrice: 26000,
        destination: "kashmir",
        images: [
          "https://img.avianexperiences.com/trek/4ffeb481-1cec-4f88-9c2d-93f5d890ff41",
          "https://img.avianexperiences.com/trek/dbed4fce-c2f1-4137-a69e-d9cdb8a5a391",
          "https://img.avianexperiences.com/trek/7d273d5b-a134-4e9f-ad74-0d7566e89914",
        ],
      },
      {
        id: "kashmir-2",
        title: "Kashmir Paradise Valley",
        subtitle: "Dal Lake & Pahalgam",
        duration: "7 Days 6 Nights",
        price: 19800,
        originalPrice: 24500,
        destination: "kashmir",
        images: [
          "https://img.avianexperiences.com/trek/d9ed86bd-92cc-441e-bbcb-b118add29133",
          "https://img.avianexperiences.com/trek/ea4aeb45-1e6e-4178-835c-a04737825869",
          "https://img.avianexperiences.com/trek/4ffeb481-1cec-4f88-9c2d-93f5d890ff41",
        ],
      },
    ],
  }],
};

// All destinations combined  
const allSections = Object.values(tourData).flat();

const tabToKey: Record<string, string[]> = {
  all: Object.keys(tourData),
  dubai: ["dubai"],
  vietnam: ["vietnam"],
  bali: ["bali"],
  spiti: ["spiti"],
  ladakh: ["ladakh"],
  kashmir: ["kashmir"],
  thailand: [],
  northeast: [],
  manali: [],
  goa: [],
  maldives: [],
  malaysia: [],
  georgia: [],
  jaisalmer: [],
  kerala: [],
  andaman: [],
  rajasthan: [],
  uttarakhand: [],
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("all");

  const visibleKeys = tabToKey[activeTab] ?? [];
  const sections =
    activeTab === "all"
      ? allSections
      : visibleKeys.flatMap((k) => tourData[k] ?? []);

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Navbar />
      <DestinationTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {sections.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🏕️</p>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Coming Soon</h3>
            <p className="text-gray-500 text-sm">Tour packages for this destination are being curated. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.sectionTitle}>
                <h2
                  className="text-xl font-bold text-gray-900 mb-5"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  data-testid={`section-${section.sectionTitle.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {section.sectionTitle}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {section.tours.map((tour) => (
                    <TourCard key={tour.id} {...tour} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="text-xl font-bold mb-3">
                <span className="text-primary">Youth</span>Camping
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Your trusted travel partner for unforgettable youth camping trips and customised tour packages across India and abroad.
              </p>
              <div className="flex gap-3">
                {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Popular Destinations */}
            <div>
              <h4 className="font-semibold text-sm text-gray-300 uppercase tracking-wider mb-4">Popular Destinations</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {["Ladakh", "Spiti Valley", "Kashmir", "Bali", "Vietnam", "Dubai", "Thailand", "Maldives"].map((d) => (
                  <li key={d}><a href="#" className="hover:text-white transition-colors">{d}</a></li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-sm text-gray-300 uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {["Tour Packages", "Group Trips", "About Us", "Blog", "Privacy Policy", "Terms & Conditions"].map((l) => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-sm text-gray-300 uppercase tracking-wider mb-4">Contact Us</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                  <span>+91 99242 46267</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                  <span>hello@youthcamping.in</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                  <span>Ahmedabad, Gujarat, India</span>
                </li>
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
