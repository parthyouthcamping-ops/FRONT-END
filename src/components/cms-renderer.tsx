import React from 'react';
import { motion } from 'framer-motion';
import { TourCard } from './tour-card';
import { BookOpen, Play, ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface Section {
  id: string;
  type: string;
  data: any;
}

export const CmsRenderer: React.FC<{ sections: Section[] }> = ({ sections }) => {
  const visibleSections = sections.filter(s => s.isVisible !== false);
  
  return (
    <>
      {visibleSections.map((section) => (
        <SectionItem key={section.id} section={section} />
      ))}
    </>
  );
};

const SectionItem = ({ section }: { section: Section }) => {
  switch (section.type) {
    case 'hero':
      return <HeroSection data={section.data} />;
    case 'videohero':
      return <VideoHeroSection data={section.data} />;
    case 'trips':
      return <TripsSection data={section.data} />;
    case 'grid':
      return <GridSection data={section.data} />;
    case 'banner':
      return <BannerSection data={section.data} />;
    case 'blogs':
      return <BlogsSection data={section.data} />;
    case 'video':
      return <VideoSection data={section.data} />;
    case 'content':
      return <ContentSection data={section.data} />;
    case 'stats':
      return <StatsSection data={section.data} />;
    case 'reviews':
      return <ReviewsSection data={section.data} />;
    default:
      return null;
  }
};

const BannerSection = ({ data }: { data: any }) => (
  <section className="py-20 px-6 lg:px-20 bg-white">
    <div className="relative h-[400px] w-full rounded-[40px] overflow-hidden shadow-2xl group">
       <img 
        src={data.image} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        alt={data.title}
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6 space-y-6">
         <span className="text-white text-xl lg:text-3xl font-medium italic drop-shadow-md">It's time for</span>
         <h2 className="text-white text-6xl lg:text-9xl font-black drop-shadow-2xl" 
             style={{ fontFamily: "'Dancing Script', cursive" }}>
            {data.title.includes('Winter') ? 'Winter Trips' : data.title}
         </h2>
         <div className="bg-white/90 backdrop-blur-md px-10 py-3 rounded-full flex gap-3 text-xs lg:text-base font-bold shadow-xl">
            {data.subtitle?.split('•').map((tag: string, i: number) => (
              <React.Fragment key={i}>
                <span className="text-gray-800">{tag.trim()}</span>
                {i < (data.subtitle.split('•').length - 1) && <span className="text-gray-300">•</span>}
              </React.Fragment>
            ))}
         </div>
      </div>
    </div>
  </section>
);

const BlogsSection = ({ data }: { data: any }) => {
  const apiUrl = (import.meta as any).env.VITE_API_URL || "https://back-end-production-191d.up.railway.app/api";
  const [blogs, setBlogs] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch(`${apiUrl}/blogs`)
      .then(res => res.json())
      .then(json => setBlogs(json.data || []));
  }, [apiUrl]);

  return (
    <section className="py-24 bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
         <h2 className="text-4xl font-black uppercase tracking-tighter mb-12">{data.title || 'Watch & Read'}</h2>
         
         <div className="flex gap-8 overflow-x-auto pb-10 scrollbar-hide snap-x">
            {blogs.length > 0 ? blogs.map((blog, i) => (
              <motion.div 
                key={blog._id}
                whileHover={{ y: -10 }}
                className="min-w-[320px] lg:min-w-[380px] bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all snap-start"
              >
                 <div className="h-56 relative overflow-hidden">
                    <img src={blog.image} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute top-4 right-4 bg-white/40 backdrop-blur-md p-2 rounded-lg">
                       <BookOpen className="w-3 h-3 text-white" />
                    </div>
                 </div>
                 <div className="p-8 space-y-4">
                    <h3 className="text-xl font-black leading-tight h-14 line-clamp-2 uppercase">
                      <a href={`/blog/${blog._id}`} className="hover:text-primary transition-colors">{blog.title}</a>
                    </h3>
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
                       <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border-2 border-white shadow-sm">
                          <img src={`https://ui-avatars.com/api/?name=${blog.author}&background=random`} />
                       </div>
                       <div className="flex-1">
                          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none">by {blog.author}</p>
                          <p className="text-[10px] text-gray-400 italic mt-1 font-bold">{blog.readTime || '5 MIN READ'}</p>
                       </div>
                    </div>
                 </div>
              </motion.div>
            )) : (
              <div className="w-full text-center py-20 opacity-20 font-black uppercase tracking-widest text-sm">Waiting for stories...</div>
            )}
         </div>
      </div>
    </section>
  );
};

const VideoSection = ({ data }: { data: any }) => {
  const [playing, setPlaying] = React.useState(false);
  
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/') || url.includes('youtu.be/')) {
      const id = url.split('v=')[1] || url.split('/').pop();
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return url;
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
         <div className="relative aspect-video w-full rounded-[40px] overflow-hidden shadow-2xl bg-black">
            {!playing ? (
               <div className="absolute inset-0 group cursor-pointer" onClick={() => setPlaying(true)}>
                  <img src={data.image} className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform shadow-2xl">
                        <Play className="w-10 h-10 fill-white text-white translate-x-1" />
                     </div>
                     <p className="text-white font-black uppercase tracking-[0.3em] mt-8 drop-shadow-lg text-xs lg:text-sm">Click to play journey</p>
                  </div>
               </div>
            ) : (
               <iframe 
                src={getEmbedUrl(data.url)}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
               />
            )}
         </div>
      </div>
    </section>
  );
};


const HeroSection = ({ data }: { data: any }) => (
  <section className="relative h-[80vh] w-full flex items-center overflow-hidden bg-black">
    <img 
      src={data.image} 
      className="absolute inset-0 w-full h-full object-cover opacity-60"
      alt={data.title}
    />
    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-20">
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
        className="max-w-4xl lg:ml-24"
      >
        <h1 className="text-[7vw] lg:text-[4.5vw] font-black text-white leading-[1] tracking-tighter uppercase">
          {data.title}
        </h1>
        {data.subtitle && <p className="text-xl text-gray-300 mt-6 max-w-xl font-medium">{data.subtitle}</p>}
      </motion.div>
    </div>
  </section>
);

const ContentSection = ({ data }: { data: any }) => (
  <section className="py-24 bg-white">
    <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
      <h2 className="text-4xl font-black uppercase tracking-tighter">{data.title}</h2>
      <div 
        className="text-lg text-gray-600 leading-relaxed prose prose-lg mx-auto"
        dangerouslySetInnerHTML={{ __html: data.html }}
      />
    </div>
  </section>
);

const StatsSection = ({ data }: { data: any }) => (
  <section className="py-20 bg-[#111] text-white">
    <div className="max-w-7xl mx-auto px-6 lg:px-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center lg:text-left">
        {(data.items || [
          { label: 'Happy Travelers', value: '10,000+' },
          { label: 'Group Trips', value: '500+' },
          { label: 'Destinations', value: '25+' },
          { label: 'Review Rating', value: '4.9/5' }
        ]).map((item: any, i: number) => (
          <div key={i} className="space-y-2 group">
            <h4 className="text-5xl lg:text-6xl font-black tracking-tighter group-hover:text-primary transition-colors duration-500 italic">
              {item.value}
            </h4>
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <div className="w-4 h-[2px] bg-primary" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const TripsSection = ({ data }: { data: any }) => {
  const apiUrl = (import.meta as any).env.VITE_API_URL || "https://back-end-production-191d.up.railway.app/api";
  const [trips, setTrips] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch(`${apiUrl}/trips`)
      .then(res => res.json())
      .then(json => {
        const mapped = (json.data || []).map((t: any) => ({ ...t, id: t._id }));
        setTrips(mapped);
      });
  }, [apiUrl]);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 mb-12 flex items-center justify-between">
         <h2 className="text-3xl font-black text-black tracking-tighter uppercase">{data.title || 'Trending'}</h2>
         <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50"><ChevronLeft className="w-4 h-4" /></button>
            <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center bg-gray-50"><ChevronRight className="w-4 h-4" /></button>
         </div>
      </div>

      <div className="flex gap-8 overflow-x-auto pb-10 scrollbar-hide px-6 lg:px-20 snap-x">
         {trips.length > 0 ? trips.map((trip, i) => (
           <motion.div key={trip.id} className="snap-start min-w-[300px] lg:min-w-[320px]">
              <TourCard {...trip} originalPrice={trip.price + 5000} subtitle={trip.location} />
           </motion.div>
         )) : (
           <div className="w-full text-center py-20 opacity-20 font-black uppercase tracking-widest">No trips found in database...</div>
         )}
      </div>
    </section>
  );
};


const GridSection = ({ data }: { data: any }) => {
  const apiUrl = (import.meta as any).env.VITE_API_URL || "https://back-end-production-191d.up.railway.app/api";
  const [trips, setTrips] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch(`${apiUrl}/trips`)
      .then(res => res.json())
      .then(json => {
        const mapped = (json.data || []).map((t: any) => ({ ...t, id: t._id }));
        setTrips(mapped);
      });
  }, [apiUrl]);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
         <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 gap-6">
            <div className="space-y-4">
               <h2 className="text-xs font-black tracking-[0.4em] text-primary uppercase">{data.subtitle || 'Global Expeditions'}</h2>
               <h3 className="text-5xl font-black text-black tracking-tighter uppercase">{data.title || 'Our Packages'}</h3>
            </div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {trips.slice(0, data.count || 6).map((tour) => (
             <TourCard key={tour.id} {...tour} originalPrice={tour.price + 5000} subtitle={tour.location} />
           ))}
         </div>
         
         {trips.length === 0 && (
           <div className="w-full text-center py-20 opacity-20 font-black uppercase tracking-widest">No trips found in database...</div>
         )}
      </div>
    </section>
  );
};

const VideoHeroSection = ({ data }: { data: any }) => {
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/') || url.includes('youtu.be/')) {
      const id = url.split('v=')[1] || url.split('/').pop();
      return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&modestbranding=1&rel=0&showinfo=0`;
    }
    return url;
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 scale-110 pointer-events-none">
        <iframe 
          src={getEmbedUrl(data.url)}
          className="w-full h-full border-0"
          allow="autoplay; encrypted-media"
        />
      </div>
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-20" />
      
      {/* Clean video-only hero — no overlay text */}
    </section>
  );
};


const ReviewsSection = ({ data }: { data: any }) => {
  const apiUrl = (import.meta as any).env.VITE_API_URL || "https://back-end-production-191d.up.railway.app/api";
  const [reviews, setReviews] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch(`${apiUrl}/reviews?featured=true`)
      .then(res => res.json())
      .then(json => setReviews(json.data || []));
  }, [apiUrl]);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 mb-12 flex items-center justify-between">
        <h2 className="text-4xl font-black text-black tracking-tighter uppercase">{data.title || 'Reviews'}</h2>
      </div>

      <div className="flex gap-8 overflow-x-auto pb-12 scrollbar-hide px-6 lg:px-20 snap-x">
        {reviews.map((rev, idx) => (
          <div key={idx} className="min-w-[280px] md:min-w-[320px] snap-start">
            <div className="flex flex-col gap-6 group">
              <div className="aspect-[4/5] rounded-[32px] overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-700 relative">
                <img src={rev.userImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" />
              </div>
              <div className="space-y-4 px-2">
                <div className="flex gap-1">
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
                  ))}
                </div>
                <p className="text-sm font-medium text-gray-600 leading-relaxed line-clamp-3 italic">"{rev.comment}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                    <img src={`https://ui-avatars.com/api/?name=${rev.userName}&background=000&color=fff`} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-xs font-black text-black uppercase tracking-tight">{rev.userName}</h4>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{rev.tripName}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
