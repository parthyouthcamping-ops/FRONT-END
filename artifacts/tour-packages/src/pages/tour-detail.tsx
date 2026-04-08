import { useState } from "react";
import { useParams, Link } from "wouter";
import { allTours } from "@/data/tours";
import { Navbar } from "@/components/navbar";
import { ArrowLeft, Clock, Check, X, ChevronLeft, ChevronRight, Phone, MessageCircle } from "lucide-react";

export default function TourDetail() {
  const { id } = useParams<{ id: string }>();
  const tour = allTours.find((t) => t.id === id);
  const [activeImg, setActiveImg] = useState(0);

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

  const relatedTours = allTours.filter((t) =>
    t.id !== tour.id && t.destination.some((d) => tour.destination.includes(d))
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Poppins, sans-serif" }}>
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
        <Link href="/" className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" />
          Back to Tours
        </Link>
      </div>

      {/* Hero Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 rounded-2xl overflow-hidden" style={{ height: 400 }}>
          {/* Main image */}
          <div className="md:col-span-2 relative group cursor-pointer" style={{ height: 400 }}>
            <img
              src={tour.images[activeImg]}
              alt={tour.title}
              className="w-full h-full object-cover"
            />
            {tour.images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImg((i) => (i === 0 ? tour.images.length - 1 : i - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-9 h-9 flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-800" />
                </button>
                <button
                  onClick={() => setActiveImg((i) => (i === tour.images.length - 1 ? 0 : i + 1))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-9 h-9 flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="w-5 h-5 text-gray-800" />
                </button>
              </>
            )}
          </div>
          {/* Side thumbnails */}
          <div className="hidden md:flex flex-col gap-2" style={{ height: 400 }}>
            {tour.images.slice(1, 3).map((img, i) => (
              <div
                key={i}
                className={`flex-1 cursor-pointer overflow-hidden rounded-lg border-2 transition-all ${activeImg === i + 1 ? "border-primary" : "border-transparent"}`}
                onClick={() => setActiveImg(i + 1)}
              >
                <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
            {tour.images.length > 3 && (
              <div
                className="flex-1 cursor-pointer overflow-hidden rounded-lg relative"
                onClick={() => setActiveImg(3)}
              >
                <img src={tour.images[3]} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-lg">
                  +{tour.images.length - 3} more
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail strip on mobile */}
        {tour.images.length > 1 && (
          <div className="flex gap-2 mt-2 md:hidden overflow-x-auto">
            {tour.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${activeImg === i ? "border-primary" : "border-transparent"}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Title Block */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {tour.duration}
                </span>
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-2">{tour.title}</h1>
              <p className="text-gray-500 text-base">{tour.subtitle}</p>
            </div>

            {/* Overview */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">Overview</h2>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">{tour.overview}</p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Highlights</h2>
              <div className="flex flex-wrap gap-2">
                {tour.highlights.map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-full"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0"></span>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">Itinerary</h2>
              <div className="space-y-0">
                {tour.itinerary.map((item, i) => (
                  <div key={i} className="relative flex gap-4 pb-6">
                    {/* Timeline line */}
                    {i < tour.itinerary.length - 1 && (
                      <div className="absolute left-[19px] top-8 w-0.5 h-full bg-gray-200" />
                    )}
                    {/* Day circle */}
                    <div className="shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold z-10 shadow">
                      {i + 1}
                    </div>
                    {/* Content */}
                    <div className="flex-1 bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-primary uppercase tracking-wide">{item.day}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Includes / Excludes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">What's Included</h2>
                <ul className="space-y-2">
                  {tour.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">What's Excluded</h2>
                <ul className="space-y-2">
                  {tour.excludes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                      <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
                <div className="mb-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Starting from</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-primary">₹{tour.price.toLocaleString("en-IN")}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">per person</p>
                </div>

                <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 mb-4">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">{tour.duration}</span>
                </div>

                <a
                  href={tour.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-primary hover:bg-red-600 text-white font-bold text-center py-3.5 rounded-xl transition-colors mb-3 text-sm"
                >
                  Book Now
                </a>

                <a
                  href="https://wa.me/919924246267?text=Hi%2C+I%27m+interested+in+the+trip+to+your+website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full border border-green-500 text-green-600 hover:bg-green-50 font-semibold py-3 rounded-xl transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Us
                </a>

                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Check className="w-3.5 h-3.5 text-green-500" />
                    Instant Confirmation
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Check className="w-3.5 h-3.5 text-green-500" />
                    Secure & Easy Booking
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    +91 99242 46267 (10AM–7PM)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Trips */}
        {relatedTours.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-gray-900 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedTours.map((t) => (
                <Link href={`/tours/${t.id}`} key={t.id}>
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <img src={t.images[0]} alt={t.title} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <p className="text-xs text-gray-400 mb-1">{t.duration}</p>
                      <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2">{t.title}</h3>
                      <p className="text-primary font-extrabold">₹{t.price.toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
