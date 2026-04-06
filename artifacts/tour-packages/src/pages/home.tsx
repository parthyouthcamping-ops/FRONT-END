import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { DestinationTabs } from "@/components/destination-tabs";
import { TourCard } from "@/components/tour-card";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const CDN = "https://vl-prod-static.b-cdn.net/system/images";

type Tour = {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  price: number;
  originalPrice: number;
  destination: string[];
  images: string[];
  bookingUrl: string;
};

const allTours: Tour[] = [
  {
    id: "manali-kasol-1",
    title: "Manali Kasol Amritsar Backpacking Trip",
    subtitle: "Wagah Border · Golden Temple · Bijli Mahadev Trek",
    duration: "8 Nights 9 Days",
    price: 11999,
    originalPrice: 11999,
    destination: ["manali", "kasol"],
    bookingUrl: "https://www.youthcamping.in/tours/manali-kasol-amritsar-adventure-trip-140500",
    images: [
      `${CDN}/000/888/076/6f012c2f939c45fd491d86b3d33b0cbb/x540gt/IMG_3309.jpg`,
      `${CDN}/000/748/614/9b56160b1abe219a402c11001702ae24/x540gt/IMG_3398.JPG`,
      `${CDN}/000/748/611/6293bbb8cff91918ba4aea8025dca151/x540gt/IMG_3359.JPG`,
    ],
  },
  {
    id: "manali-kasol-summer",
    title: "Manali Kasol Amritsar Trip (Summer 2026)",
    subtitle: "Vashisht Hot Springs · Solang Valley · Chalal Village",
    duration: "8 Nights 9 Days",
    price: 11999,
    originalPrice: 11999,
    destination: ["manali", "kasol"],
    bookingUrl: "https://www.youthcamping.in/tours/manali-kasol-amritsar-trip-137683",
    images: [
      `${CDN}/000/748/614/9b56160b1abe219a402c11001702ae24/x540gt/IMG_3398.JPG`,
      `${CDN}/000/748/611/6293bbb8cff91918ba4aea8025dca151/x540gt/IMG_3359.JPG`,
      `${CDN}/000/748/612/fea69680cd85a1e40d4f3643574c89af/x540gt/IMG_3326.JPG`,
    ],
  },
  {
    id: "shimla-manali-kullu",
    title: "Shimla Manali Kullu",
    subtitle: "Mall Road · Hadimba Temple · Kullu Rafting",
    duration: "7 Nights 8 Days",
    price: 12999,
    originalPrice: 12999,
    destination: ["manali", "shimla"],
    bookingUrl: "https://www.youthcamping.in/tours/shimla-manali-kullu-138567",
    images: [
      `${CDN}/000/795/284/3bba832671671da87e0f23ce9864e6c1/x540gt/27121997__26_.jpg`,
      `${CDN}/000/750/627/c9e426f29444d71754171e3f6c9081c8/x540gt/Untitled_design__18_.png`,
      `${CDN}/000/750/628/e1eea3594999b766f2e8a399debb52d2/x540gt/Untitled_design__21_.png`,
    ],
  },
  {
    id: "shimla-manali-dalhousie",
    title: "Shimla Manali Dalhousie Dharamshala",
    subtitle: "Colonial Shimla · Snowy Manali · Mcleod Ganj",
    duration: "9 Nights 10 Days",
    price: 16999,
    originalPrice: 16999,
    destination: ["manali", "shimla"],
    bookingUrl: "https://www.youthcamping.in/tours/shimla-manali-dalhousie-dharamshala-155815",
    images: [
      `${CDN}/000/856/207/68ae0d6c7bcc0a7716d1c860e7f2c58d/original/42294194395`,
      `${CDN}/000/795/284/3bba832671671da87e0f23ce9864e6c1/x540gt/27121997__26_.jpg`,
    ],
  },
  {
    id: "winter-spiti",
    title: "Winter Spiti Road Trip",
    subtitle: "Frozen Rivers · Snow-covered Villages · Key Monastery",
    duration: "9 Nights 10 Days",
    price: 19999,
    originalPrice: 19999,
    destination: ["spiti"],
    bookingUrl: "https://www.youthcamping.in/tours/winter-spiti-156526",
    images: [
      `${CDN}/000/862/062/b7cb9dc7ccc9fe863f0f009c4fe1746f/x540gt/Website_Itinerary_Ohotos__2_.png`,
      `${CDN}/000/862/060/5d50edec4e8decdefec9e352873b99e8/x540gt/Website_Itinerary_Ohotos__4_.png`,
      `${CDN}/000/862/061/9b72e8a2d0b5f7708ed73d1c712eed1a/x540gt/Website_Itinerary_Ohotos__3_.png`,
      `${CDN}/000/862/064/e80df5925dd74919f520937e2a6bda8f/x540gt/Website_Itinerary_Ohotos.png`,
      `${CDN}/000/862/067/098b53266d5d6f407b3eb0f6b798f8dc/x540gt/Website_Itinerary_Ohotos__5_.png`,
    ],
  },
  {
    id: "spiti-valley",
    title: "Spiti Valley Road Trip",
    subtitle: "Sangla · Chitkul · Chandrataal Lake · Kaza",
    duration: "10 Nights 11 Days",
    price: 21499,
    originalPrice: 21499,
    destination: ["spiti"],
    bookingUrl: "https://www.youthcamping.in/tours/spiti-valley-road-trip-137856",
    images: [
      `${CDN}/000/751/384/13bebee8f5dfb67ee1756619de11e44a/x540gt/Untitled_design__50_.png`,
      `${CDN}/000/751/383/f9e9b476346ed8ae84d29f5837f6e093/x540gt/Untitled_design__51_.png`,
      `${CDN}/000/751/385/0b859075c5accb9bb1decb348aa419ad/x540gt/Untitled_design__49_.png`,
      `${CDN}/000/751/386/a0218b14753015027900b134d4aa3a95/x540gt/Untitled_design__48_.png`,
      `${CDN}/000/751/387/779ac1dc6dbfb5b09f1e80da0a3a0325/x540gt/Untitled_design__47_.png`,
    ],
  },
  {
    id: "leh-ladakh-bike",
    title: "Leh Ladakh Bike Expedition 2026",
    subtitle: "Khardung La · Nubra Valley · Turtuk · Pangong Lake",
    duration: "6 Nights 7 Days",
    price: 18999,
    originalPrice: 18999,
    destination: ["ladakh"],
    bookingUrl: "https://www.youthcamping.in/tours/leh-to-leh-bike-expedition-2026-youth-camping-164365",
    images: [
      `${CDN}/000/888/077/e84148f8d1adacaa5dc96e8f834b8cdd/x540gt/t2-graphy-IJfpVYlRv5I-unsplash.jpg`,
      `${CDN}/000/888/133/bae231ef3cdd69e7dc0d467e3ba04cbe/x540gt/Website_Itinerary_Ohotos__4_.jpg`,
      `${CDN}/000/888/134/10b5d1ede53e33bb93e210e4846fcec9/x540gt/Website_Itinerary_Ohotos__3_.jpg`,
      `${CDN}/000/888/135/4aa2a2c0426f7d3274b80929e939eec6/x540gt/Website_Itinerary_Ohotos__2_.jpg`,
      `${CDN}/000/888/136/64717d607b65d3efbf804a96b4e8732b/x540gt/Website_Itinerary_Ohotos__1_.jpg`,
    ],
  },
  {
    id: "kedarnath-badrinath",
    title: "Kedarnath Badrinath – Tungnath & Rishikesh",
    subtitle: "Char Dham · Panch Kedar · Ganga Aarti · Bungee",
    duration: "8 Nights 7 Days",
    price: 19499,
    originalPrice: 19499,
    destination: ["kedarnath"],
    bookingUrl: "https://www.youthcamping.in/tours/kedarnath-tungnath-rishikesh-multiple-starting-points-as-addons-138288",
    images: [
      `${CDN}/000/748/925/95ce9359f68bd2d93dee6aa2e3a18d17/x540gt/Untitled_design__11_.png`,
      `${CDN}/000/748/920/5abeca5343adce67a22013a929647f71/x540gt/Untitled_design__12_.png`,
      `${CDN}/000/748/921/30e9ea2cafbd0b433acdf1c21b6d3e0c/x540gt/Untitled_design__13_.png`,
    ],
  },
  {
    id: "kedarnath-tungnath",
    title: "Kedarnath Tungnath & Rishikesh Trip",
    subtitle: "Har ki Pauri · Laxman Jhula · Chopta Meadows",
    duration: "5 Nights 6 Days",
    price: 16500,
    originalPrice: 16500,
    destination: ["kedarnath"],
    bookingUrl: "https://www.youthcamping.in/tours/kedarnath-tungnath-rishikesh-backpacking-trip",
    images: [
      `${CDN}/000/748/931/95ce9359f68bd2d93dee6aa2e3a18d17/x540gt/Untitled_design__11_.png`,
      `${CDN}/000/748/926/5abeca5343adce67a22013a929647f71/x540gt/Untitled_design__12_.png`,
      `${CDN}/000/748/927/30e9ea2cafbd0b433acdf1c21b6d3e0c/x540gt/Untitled_design__13_.png`,
    ],
  },
  {
    id: "kerala-getaway",
    title: "Kerala Getaway",
    subtitle: "Munnar · Alleppey Backwaters · Wayanad · Kochi",
    duration: "4 Nights 5 Days",
    price: 15999,
    originalPrice: 15999,
    destination: ["kerala"],
    bookingUrl: "https://www.youthcamping.in/tours/kerala-getaway-165724",
    images: [
      `${CDN}/000/899/117/e79b48de54e83646c865c90dee281eb2/x540gt/ravi-sangar-dfB4L6PfS4w-unsplash__1_.jpg`,
    ],
  },
];

const sections = [
  {
    id: "top-selling",
    title: "Top Selling Group Trips",
    filterIds: ["manali-kasol-1", "winter-spiti", "kedarnath-badrinath", "leh-ladakh-bike", "spiti-valley"],
  },
  {
    id: "manali",
    title: "Manali & Himachal Pradesh",
    tags: ["manali"],
  },
  {
    id: "spiti",
    title: "Spiti Valley",
    tags: ["spiti"],
  },
  {
    id: "ladakh",
    title: "Leh Ladakh",
    tags: ["ladakh"],
  },
  {
    id: "kedarnath",
    title: "Kedarnath & Rishikesh",
    tags: ["kedarnath"],
  },
  {
    id: "kerala",
    title: "South India – Kerala",
    tags: ["kerala"],
  },
];

function toursForTab(tab: string): { sectionTitle: string; tours: Tour[] }[] {
  if (tab === "all") {
    return sections.map((sec) => {
      const tours = sec.filterIds
        ? allTours.filter((t) => sec.filterIds!.includes(t.id))
        : allTours.filter((t) => sec.tags!.some((tag) => t.destination.includes(tag)));
      return { sectionTitle: sec.title, tours };
    }).filter((s) => s.tours.length > 0);
  }
  const tours = allTours.filter((t) => t.destination.includes(tab));
  if (!tours.length) return [];
  const sec = sections.find((s) => s.tags?.includes(tab));
  return [{ sectionTitle: sec?.title ?? "Tour Packages", tours }];
}

function Home() {
  const [activeTab, setActiveTab] = useState("all");
  const pageSections = toursForTab(activeTab);

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
          <a
            href="https://www.youthcamping.in/collections/tours"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm shadow-lg"
          >
            Explore Now
          </a>
        </div>
      </div>

      {/* Tour Sections */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-10 space-y-14">
        {pageSections.map((sec) => (
          <section key={sec.sectionTitle}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">{sec.sectionTitle}</h2>
              <a
                href="https://www.youthcamping.in/collections/tours"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary font-semibold hover:underline"
              >
                View All
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {sec.tours.map((tour) => (
                <a
                  key={tour.id}
                  href={tour.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block no-underline"
                >
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
                </a>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* About Strip */}
      <section className="bg-white border-y border-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            At YouthCamping, we're all about awesome trips across India! Whether you're into road trips, trekking, or just
            exploring cool places, we've got you covered. Our trips are designed for groups of like-minded people who want to
            have a blast together. We take care of everything — from comfortable accommodations to guided tours — all without
            breaking the bank. Just tell us when you want to go, and get ready for an epic adventure filled with fun, history,
            and great food! Join us for the trip of a lifetime.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 flex-wrap text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Instant Confirmation
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Secure & Easy Booking
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Age 12–35 Group Trips
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Starting from ₹11,999
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand */}
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

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-sm text-gray-300 uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {["Tour Packages", "Group Trips", "About Us", "Contact Us", "Privacy Policy", "Terms & Conditions"].map((l) => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Destinations */}
            <div>
              <h4 className="font-semibold text-sm text-gray-300 uppercase tracking-wider mb-4">Destinations</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {["Manali & Kasol", "Spiti Valley", "Leh Ladakh", "Kedarnath", "Shimla", "Kerala"].map((l) => (
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
                  <span>youthcampingmedia@gmail.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                  <span>Ahmedabad, Gujarat, India</span>
                </li>
                <li className="flex items-start gap-2 mt-1">
                  <span className="text-gray-500 text-xs">Available 10AM – 7PM</span>
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

export default Home;
