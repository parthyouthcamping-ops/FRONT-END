import { useState } from "react";
import { X, Check, Calendar, Users, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface InquiryPopupProps {
  onClose: () => void;
  tour: {
    title: string;
    duration: string;
    subtitle: string;
    images: string[];
  };
}

export function InquiryPopup({ onClose, tour }: InquiryPopupProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    count: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting inquiry...", formData);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || import.meta.env.NEXT_PUBLIC_API_URL;
      console.log("Using API URL:", apiUrl);
      
      const response = await fetch(`${apiUrl}/inquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tripTitle: tour.title
        }),
      });

      const result = await response.json();
      console.log("Server response:", result);

      if (response.ok) {
        console.log("Inquiry submitted successfully");
        setSubmitted(true);
      } else {
        console.error("Submission failed:", result);
        alert(`Failed to submit: ${result.message || "Please try again."}`);
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      alert("Something went wrong. Please check your connection.");
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[40px] p-10 text-center max-w-sm shadow-2xl"
        >
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg mx-auto mb-8">
            <Check className="w-12 h-12 text-white stroke-[3px]" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Thank You!</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">Our destination expert will connect with you within 24 hours.</p>
          <button 
            onClick={onClose}
            className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl hover:bg-black transition-all shadow-xl"
          >
            Close
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto py-10">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[40px] w-full max-w-6xl overflow-hidden flex flex-col md:flex-row shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 bg-white/20 hover:bg-white/40 text-white md:text-gray-400 md:bg-gray-100 md:hover:bg-gray-200 rounded-full transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left Side: Image with Overlay */}
        <div className="md:w-[55%] relative h-[300px] md:h-auto min-h-[500px]">
          <img 
            src={tour.images[0]} 
            alt={tour.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-12 left-12 right-12 text-white">
            <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-lg text-sm font-semibold mb-4 border border-white/20">
              {tour.duration}
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-3 tracking-tight leading-none">{tour.title}</h2>
            <p className="text-white/80 font-medium text-xl leading-snug">{tour.subtitle}</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-[45%] p-10 md:p-14 bg-white flex flex-col justify-center">
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-black text-gray-900">Plan Your Next Trip</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <input 
              required
              type="text" 
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border-2 border-gray-100 focus:border-primary bg-gray-50 focus:bg-white px-5 py-4 rounded-2xl outline-none transition-all font-medium text-gray-800 placeholder:text-gray-400"
            />

            {/* Phone */}
            <div className="flex gap-3">
              <div className="w-20 shrink-0 border-2 border-gray-100 bg-gray-50 px-4 py-4 rounded-2xl flex items-center justify-center font-bold text-gray-500">
                +91
              </div>
              <input 
                required
                type="tel" 
                placeholder="Mobile No."
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="flex-1 border-2 border-gray-100 focus:border-primary bg-gray-50 focus:bg-white px-5 py-4 rounded-2xl outline-none transition-all font-medium text-gray-800 placeholder:text-gray-400"
              />
            </div>

            {/* Email */}
            <input 
              type="email" 
              placeholder="Email (optional)"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full border-2 border-gray-100 focus:border-primary bg-gray-50 focus:bg-white px-5 py-4 rounded-2xl outline-none transition-all font-medium text-gray-800 placeholder:text-gray-400"
            />

            {/* Date and Count */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input 
                  required
                  type="date" 
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full border-2 border-gray-100 focus:border-primary bg-gray-50 focus:bg-white px-5 py-4 rounded-2xl outline-none transition-all font-medium text-gray-800 text-sm appearance-none"
                />
                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <input 
                  required
                  type="number" 
                  placeholder="Traveller Count"
                  value={formData.count}
                  onChange={(e) => setFormData({...formData, count: e.target.value})}
                  className="w-full border-2 border-gray-100 focus:border-primary bg-gray-50 focus:bg-white px-5 py-4 rounded-2xl outline-none transition-all font-medium text-gray-800 text-sm placeholder:text-gray-300"
                />
                <Users className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Message */}
            <div className="relative">
              <textarea 
                placeholder="Message (optional)"
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full border-2 border-gray-100 focus:border-primary bg-gray-50 focus:bg-white px-5 py-4 rounded-2xl outline-none transition-all font-medium text-gray-800 placeholder:text-gray-400 resize-none"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-black text-xl py-5 rounded-2xl transition-all shadow-xl shadow-primary/20 active:scale-[0.98] mt-4"
            >
              Connect with Expert
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
