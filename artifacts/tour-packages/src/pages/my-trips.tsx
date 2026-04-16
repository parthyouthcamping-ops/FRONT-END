import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { useAuth } from "@/lib/auth-context";
import { useLocation } from "wouter";
import { Loader2, Calendar, MapPin, Users, ChevronRight, BookOpen, Clock, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

interface Booking {
  _id: string;
  status: string;
  travelers: number;
  totalAmount: number;
  createdAt: string;
  tripId: {
    _id: string;
    title: string;
    location: string;
    price: number;
    images: string[];
    itinerary: { day: number; title: string; description: string }[];
  };
}

export default function MyTrips() {
  const { user, token, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8888/api";

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("Please login to view your trips");
      setLocation("/");
      return;
    }

    if (user && token) {
      fetchBookings();
    }
  }, [user, authLoading, token]);

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${apiUrl}/users/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setBookings(data.data);
      }
    } catch (error) {
      toast.error("Failed to load your trips");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed": return "text-green-600 bg-green-50 border-green-200";
      case "cancelled": return "text-red-600 bg-red-50 border-red-200";
      case "completed": return "text-blue-600 bg-blue-50 border-blue-200";
      default: return "text-yellow-600 bg-yellow-50 border-yellow-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed": return <CheckCircle2 className="w-4 h-4" />;
      case "cancelled": return <XCircle className="w-4 h-4" />;
      case "completed": return <BookOpen className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32">
          <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Fetching your adventures...</p>
        </div>
      </div>
    );
  }

  const upcomingTrips = bookings.filter(b => b.status !== "completed" && b.status !== "cancelled");
  const pastTrips = bookings.filter(b => b.status === "completed" || b.status === "cancelled");

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 pt-10">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Trips</h1>
          <p className="text-gray-500">Manage and track your travel experiences</p>
        </header>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">No trips booked yet</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">Your next big adventure is just a click away. Start exploring our amazing tour packages!</p>
            <button 
              onClick={() => setLocation("/")}
              className="bg-primary text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
            >
              Explore Trips
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Upcoming Trips */}
            {upcomingTrips.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Upcoming Adventures
                </h2>
                <div className="grid gap-6">
                  {upcomingTrips.map(booking => (
                    <TripCard key={booking._id} booking={booking} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} />
                  ))}
                </div>
              </section>
            )}

            {/* Past Trips */}
            {pastTrips.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                  Past Journeys
                </h2>
                <div className="grid gap-6 opacity-80">
                  {pastTrips.map(booking => (
                    <TripCard key={booking._id} booking={booking} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function TripCard({ booking, getStatusColor, getStatusIcon }: { booking: Booking, getStatusColor: any, getStatusIcon: any }) {
  const [showItinerary, setShowItinerary] = useState(false);
  
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md">
      <div className="flex flex-col md:flex-row">
        {/* Trip Image */}
        <div className="md:w-64 h-48 md:h-auto relative overflow-hidden">
          <img 
            src={booking.tripId.images[0] || "/placeholder-trip.jpg"} 
            alt={booking.tripId.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${getStatusColor(booking.status)}`}>
              {getStatusIcon(booking.status)}
              <span className="uppercase">{booking.status}</span>
            </div>
          </div>
        </div>

        {/* Trip Details */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                  {booking.tripId.title}
                </h3>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="w-4 h-4 text-primary" />
                    {booking.tripId.location}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="w-4 h-4 text-primary" />
                    Booked on {new Date(booking.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 font-medium">Total Paid</p>
                <p className="text-xl font-bold text-gray-900">₹{booking.totalAmount.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 py-4 border-y border-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                  <Users className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Travelers</p>
                  <p className="text-sm font-bold text-gray-700">{booking.travelers} Persons</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button 
              onClick={() => setShowItinerary(!showItinerary)}
              className="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all"
            >
              {showItinerary ? "Hide Itinerary" : "View Itinerary"}
              <ChevronRight className={`w-4 h-4 transition-transform ${showItinerary ? 'rotate-90' : ''}`} />
            </button>
            <div className="text-[10px] font-bold text-gray-300 uppercase">
              Booking ID: {booking._id.slice(-8).toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Itinerary Dropdown */}
      {showItinerary && (
        <div className="bg-gray-50 p-6 border-t border-gray-100 animate-in slide-in-from-top-4 duration-300">
          <h4 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
            <div className="w-1 h-4 bg-primary rounded-full" />
            Day-wise Plan
          </h4>
          <div className="space-y-6">
            {booking.tripId.itinerary.map((day) => (
              <div key={day.day} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {day.day}
                  </div>
                  <div className="w-0.5 flex-1 bg-gray-200 my-1" />
                </div>
                <div className="pb-4">
                  <h5 className="font-bold text-gray-800 mb-1">{day.title}</h5>
                  <p className="text-sm text-gray-500 leading-relaxed">{day.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
