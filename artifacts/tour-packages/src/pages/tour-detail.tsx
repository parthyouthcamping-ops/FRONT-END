import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "wouter";
import { allTours } from "@/data/tours";
import { Navbar } from "@/components/navbar";
import {
  ArrowLeft, Clock, Check, X, ChevronLeft, ChevronRight,
  Phone, MessageCircle, Users, Utensils, Car, Tent, Star,
  Share2, Heart, MapPin
} from "lucide-react";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "itinerary", label: "Itinerary" },
  { id: "inclusions", label: "Inclusions" },
  { id: "faqs", label: "FAQs" },
];

const faqs = [
  { q: "What is the group size for this trip?", a: "Our trips are curated for youth aged 12–35 with group sizes typically between 15–30 travellers, ensuring a fun and social experience." },
  { q: "Can I join if I'm travelling solo?", a: "Absolutely! Most of our travellers are solo adventurers. You'll be grouped with like-minded people from across India." },
  { q: "What is the cancellation policy?", a: "Cancellations made 30+ days before departure receive a full refund. 15–29 days: 50% refund. Under 15 days: no refund." },
  { q: "Is travel insurance included?", a: "Travel insurance is not included in the package price but is strongly recommended. We can help you with recommendations." },
  { q: "What should I pack for this trip?", a: "Comfortable trekking shoes, warm layers, sunscreen, a daypack, personal medications, and a valid ID are essentials. We'll send a detailed packing list after booking." },
];

export default function TourDetail() {
  const { id } = useParams<{ id: string }>();
  const tour = allTours.find((t) => t.id === id);

  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [liked, setLiked] = useState(false);

  const overviewRef = useRef<HTMLDivElement>(null);
  const itineraryRef = useRef<HTMLDivElement>(null);
  const inclusionsRef = useRef<HTMLDivElement>(null);
  const faqsRef = useRef<HTMLDivElement>(null);

  const refs: Record<string, React.RefObject<HTMLDivElement>> = {
    overview: overviewRef,
    itinerary: itineraryRef,
    inclusions: inclusionsRef,
    faqs: faqsRef,
  };

  const scrollToTab = (tabId: string) => {
    setActiveTab(tabId);
    refs[tabId]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 160;
      const order = ["overview", "itinerary", "inclusions", "faqs"];
      for (let i = order.length - 1; i >= 0; i--) {
        const ref = refs[order[i]];
        if (ref.current && ref.current.offsetTop <= scrollY) {
          setActiveTab(order[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Trip not found</h1>
          <Link href="/" className="text-primary font-semibold hover:underline">← Back to all trips</Link>
        </div>
      </div>
    );
  }

  const relatedTours = allTours
    .filter((t) => t.id !== tour.id && t.destination.some((d) => tour.destination.includes(d)))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Poppins, sans-serif" }}>
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-3 pb-1">
        <Link href="/" className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" />
          Back to Tours
        </Link>
      </div>

      {/* ── HERO GALLERY ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-0">
        <div className="relative">
          {/* Main hero image */}
          <div className="relative h-[340px] md:h-[440px] rounded-2xl overflow-hidden bg-gray-200 group cursor-pointer" onClick={() => setGalleryOpen(true)}>
            <img
              src={tour.images[activeImg]}
              alt={tour.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            {/* Image nav arrows */}
            {tour.images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveImg((i) => (i === 0 ? tour.images.length - 1 : i - 1)); }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-800" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveImg((i) => (i === tour.images.length - 1 ? 0 : i + 1)); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all"
                >
                  <ChevronRight className="w-5 h-5 text-gray-800" />
                </button>
              </>
            )}

            {/* Dot indicators */}
            {tour.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {tour.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setActiveImg(i); }}
                    className={`rounded-full transition-all ${i === activeImg ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/60"}`}
                  />
                ))}
              </div>
            )}

            {/* View all photos */}
            {tour.images.length > 1 && (
              <div className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-lg shadow cursor-pointer">
                View {tour.images.length} Photos
              </div>
            )}
          </div>

          {/* Thumbnail strip */}
          {tour.images.length > 1 && (
            <div className="flex gap-2 mt-2">
              {tour.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`shrink-0 w-16 md:w-20 h-12 md:h-14 rounded-lg overflow-hidden border-2 transition-all ${activeImg === i ? "border-primary" : "border-transparent hover:border-gray-300"}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── TITLE + KEY INFO + ACTIONS ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Title row */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">{tour.title}</h1>
                <p className="text-gray-500 mt-1 text-sm md:text-base">{tour.subtitle}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setLiked((l) => !l)}
                  className={`p-2 rounded-full border transition-all ${liked ? "bg-red-50 border-red-200 text-primary" : "border-gray-200 text-gray-400 hover:text-primary hover:border-primary"}`}
                >
                  <Heart className={`w-4 h-4 ${liked ? "fill-primary" : ""}`} />
                </button>
                <button className="p-2 rounded-full border border-gray-200 text-gray-400 hover:text-primary hover:border-primary transition-all">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Key info pills */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 text-sm text-gray-700">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span className="font-medium">{tour.duration}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 text-sm text-gray-700">
                <Users className="w-3.5 h-3.5 text-primary" />
                <span className="font-medium">15–30 people</span>
              </div>
              <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 text-sm text-gray-700">
                <Utensils className="w-3.5 h-3.5 text-primary" />
                <span className="font-medium">Meals included</span>
              </div>
              <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 text-sm text-gray-700">
                <Car className="w-3.5 h-3.5 text-primary" />
                <span className="font-medium">Transfers</span>
              </div>
              <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 text-sm text-gray-700">
                <Tent className="w-3.5 h-3.5 text-primary" />
                <span className="font-medium">Age 12–35</span>
              </div>
            </div>

            {/* Rating bar */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className={`w-4 h-4 ${s <= 4 ? "text-yellow-400 fill-yellow-400" : "text-yellow-400 fill-yellow-400"}`} />
                ))}
              </div>
              <span className="text-sm font-bold text-gray-800">4.8</span>
              <span className="text-sm text-gray-400">(127 reviews)</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>Himachal Pradesh, India · Departing from Gujarat</span>
            </div>
          </div>

          {/* Sidebar placeholder column (rendered below in sticky) */}
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* ── STICKY TAB NAV ── */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm mt-6">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToTab(tab.id)}
                className={`px-5 py-3.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT + SIDEBAR ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-2 space-y-12">

            {/* OVERVIEW */}
            <section ref={overviewRef} id="overview" className="scroll-mt-32">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full inline-block" />
                Overview
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">{tour.overview}</p>

              {/* Highlights */}
              <h3 className="text-base font-bold text-gray-900 mt-7 mb-3">Trip Highlights</h3>
              <div className="flex flex-wrap gap-2">
                {tour.highlights.map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-full shadow-sm"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                    {item}
                  </span>
                ))}
              </div>
            </section>

            {/* ITINERARY */}
            <section ref={itineraryRef} id="itinerary" className="scroll-mt-32">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full inline-block" />
                Day-by-Day Itinerary
              </h2>
              <div className="space-y-0">
                {tour.itinerary.map((item, i) => {
                  const isOpen = openFaq === 100 + i;
                  return (
                    <div key={i} className="relative flex gap-4 pb-3">
                      {i < tour.itinerary.length - 1 && (
                        <div className="absolute left-5 top-10 w-0.5 bg-gray-200 z-0" style={{ height: "calc(100% - 4px)" }} />
                      )}
                      <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold z-10 shadow-md transition-colors ${isOpen ? "bg-primary" : "bg-gray-300"}`}>
                        {i + 1}
                      </div>
                      <div className="flex-1 border border-gray-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : 100 + i)}
                          className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-primary uppercase tracking-wide shrink-0">{item.day}</span>
                            <span className="font-semibold text-gray-900 text-sm">{item.title}</span>
                          </div>
                          <ChevronRight className={`w-4 h-4 text-gray-400 shrink-0 ml-2 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} />
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* INCLUSIONS */}
            <section ref={inclusionsRef} id="inclusions" className="scroll-mt-32">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full inline-block" />
                Inclusions & Exclusions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
                  <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4" />
                    What's Included
                  </h3>
                  <ul className="space-y-2.5">
                    {tour.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-white" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                  <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2 text-sm">
                    <X className="w-4 h-4" />
                    What's Excluded
                  </h3>
                  <ul className="space-y-2.5">
                    {tour.excludes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <div className="w-4 h-4 bg-red-400 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <X className="w-2.5 h-2.5 text-white" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section ref={faqsRef} id="faqs" className="scroll-mt-32">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full inline-block" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-sm text-gray-900 pr-4">{faq.q}</span>
                      <ChevronRight
                        className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${openFaq === i ? "rotate-90" : ""}`}
                      />
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3 bg-gray-50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
                {/* Price header */}
                <div className="bg-primary px-6 py-4">
                  <p className="text-white/70 text-xs uppercase tracking-wider mb-0.5">Starting from</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white">₹{tour.price.toLocaleString("en-IN")}</span>
                    <span className="text-white/70 text-sm">/ person</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 space-y-4">
                  {/* Duration pill */}
                  <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-gray-700">{tour.duration}</span>
                  </div>

                  {/* Book Now */}
                  <a
                    href={tour.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-primary hover:bg-red-600 text-white font-bold text-center py-3.5 rounded-xl transition-colors text-sm shadow-sm"
                  >
                    Book Now
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/919924246267?text=Hi%2C+I%27m+interested+in+the+${encodeURIComponent(tour.title)}+trip`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full border-2 border-green-500 text-green-600 hover:bg-green-50 font-bold py-3 rounded-xl transition-colors text-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Enquire on WhatsApp
                  </a>

                  {/* Trust badges */}
                  <div className="space-y-2 pt-1">
                    {[
                      { icon: Check, text: "Instant Confirmation" },
                      { icon: Check, text: "Secure & Easy Booking" },
                      { icon: Users, text: "Youth group trip (Age 12–35)" },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-2 text-xs text-gray-500">
                        <Icon className="w-3.5 h-3.5 text-green-500 shrink-0" />
                        {text}
                      </div>
                    ))}
                  </div>

                  {/* Contact */}
                  <div className="border-t border-gray-100 pt-3 flex items-center gap-2 text-xs text-gray-500">
                    <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>+91 99242 46267 (10AM–7PM)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── RELATED TRIPS ── */}
        {relatedTours.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full inline-block" />
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedTours.map((t) => (
                <Link href={`/tours/${t.id}`} key={t.id}>
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                    <div className="h-44 overflow-hidden">
                      <img src={t.images[0]} alt={t.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {t.duration}
                      </p>
                      <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 line-clamp-2">{t.title}</h3>
                      <p className="text-primary font-extrabold">₹{t.price.toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── FULL-SCREEN GALLERY LIGHTBOX ── */}
      {galleryOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center"
          onClick={() => setGalleryOpen(false)}
        >
          <button className="absolute top-4 right-4 text-white/70 hover:text-white p-2" onClick={() => setGalleryOpen(false)}>
            <X className="w-7 h-7" />
          </button>
          <div className="relative w-full max-w-4xl px-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={tour.images[activeImg]}
              alt={tour.title}
              className="w-full max-h-[70vh] object-contain rounded-xl"
            />
            {tour.images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImg((i) => (i === 0 ? tour.images.length - 1 : i - 1))}
                  className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full w-10 h-10 flex items-center justify-center"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => setActiveImg((i) => (i === tour.images.length - 1 ? 0 : i + 1))}
                  className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full w-10 h-10 flex items-center justify-center"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </>
            )}
          </div>
          <div className="flex gap-2 mt-4 px-4 overflow-x-auto" onClick={(e) => e.stopPropagation()}>
            {tour.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`shrink-0 w-16 h-11 rounded-lg overflow-hidden border-2 transition-all ${activeImg === i ? "border-white" : "border-transparent opacity-60"}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <p className="text-white/50 text-sm mt-3">{activeImg + 1} / {tour.images.length}</p>
        </div>
      )}
    </div>
  );
}
