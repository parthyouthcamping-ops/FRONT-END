import { useParams, Link } from "wouter";
import { Navbar } from "@/components/navbar";
import { ArrowLeft, Share2, MessageCircle, Clock, User, Calendar, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8888/api";

  const { data: blog, isLoading, error } = useQuery<any>({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/blogs/${id}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4">
        <p className="text-xl font-bold text-gray-400">Article not found</p>
        <Link href="/" className="text-primary font-bold uppercase tracking-widest text-xs border-b-2 border-primary">Return to Journal</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-primary/10 selection:text-primary">
      <Navbar />

      {/* ── BREADCRUMB ── */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-primary transition-all uppercase tracking-widest mb-12">
          <ArrowLeft className="w-4 h-4" />
          Back to Journal
        </Link>

        {/* ── HEADER ── */}
        <header className="space-y-8 mb-16 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[10px] font-black tracking-widest uppercase text-primary">
             <span className="bg-primary/10 px-3 py-1 rounded-full">{blog.readTime}</span>
             <span className="flex items-center gap-2 text-gray-400"><Calendar className="w-3 h-3" /> {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-[0.95] tracking-tighter uppercase">
            {blog.title}
          </h1>

          <div className="flex items-center justify-center md:justify-start gap-4 border-t border-gray-100 pt-8">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
               <User className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Article By</p>
              <p className="text-sm font-black text-gray-900 uppercase tracking-tight">{blog.author}</p>
            </div>
          </div>
        </header>

        {/* ── HERO IMAGE ── */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-[21/9] overflow-hidden rounded-[40px] mb-16 shadow-2xl"
        >
          <img src={blog.image} className="w-full h-full object-cover" alt="Blog Hero" />
        </motion.div>

        {/* ── CONTENT ── */}
        <div className="prose prose-xl prose-gray max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-blockquote:border-primary prose-blockquote:text-gray-900 prose-blockquote:font-bold prose-img:rounded-3xl">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>

        {/* ── FOOTER ACTIONS ── */}
        <footer className="mt-20 pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-10">
              <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-primary transition-all uppercase tracking-widest">
                <Share2 className="w-4 h-4" /> Share Article
              </button>
              <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-primary transition-all uppercase tracking-widest">
                <MessageCircle className="w-4 h-4" /> Comments (0)
              </button>
           </div>
           
           <Link href="/tour-packages">
             <button className="avian-button text-xs !px-10">Expedition Packages</button>
           </Link>
        </footer>
      </div>
    </div>
  );
}
