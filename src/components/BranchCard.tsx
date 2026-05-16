
"use client";

import { MapPin, Phone, Clock, ArrowRight, Coffee, Music, Wifi } from "lucide-react";
import { motion } from "framer-motion";
import { Branch } from "@/lib/demo-data";

interface BranchCardProps {
  branch: Branch;
}

const BranchCard = ({ branch }: BranchCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="glass-dark rounded-[3.5rem] p-12 border border-white/5 hover:border-accent/30 transition-all duration-700 group shadow-2xl font-body hospitality-glow-gold relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[80px] rounded-full group-hover:bg-accent/10 transition-all" />
      
      <div className="flex items-center gap-8 mb-12 relative z-10">
        <div className="w-20 h-20 bg-accent/10 rounded-[2rem] flex items-center justify-center border border-accent/10 shadow-2xl shadow-accent/5 group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-500">
          <MapPin className="text-accent w-10 h-10" />
        </div>
        <div>
          <h3 className="font-bold text-3xl uppercase tracking-tight group-hover:text-accent transition-colors leading-none mb-2 font-heading">{branch.name}</h3>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">{branch.status}</p>
          </div>
        </div>
      </div>

      <p className="text-gray-400 text-lg leading-relaxed mb-12 font-medium italic group-hover:text-gray-200 transition-colors relative z-10">
        "Built for students, workers, families, and late-night food lovers looking for that signature Akure vibe."
      </p>

      <div className="space-y-8 mb-12 relative z-10">
        <div className="flex items-center gap-5 text-gray-500 group-hover:text-white/80 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <span className="text-sm font-bold uppercase tracking-wider">{branch.is247 ? "Premium 24/7 Service" : branch.status}</span>
        </div>
        <div className="flex items-start gap-5 text-gray-500 group-hover:text-white/80 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <span className="text-sm font-bold leading-relaxed">{branch.address}</span>
        </div>
        <div className="flex items-center gap-5 text-gray-500 group-hover:text-white/80 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
            <Phone className="w-5 h-5 text-primary" />
          </div>
          <span className="text-sm font-bold tracking-wider">{branch.phone}</span>
        </div>
      </div>

      <div className="flex gap-4 mb-12 py-6 border-y border-white/5 relative z-10">
        {[Wifi, Coffee, Music].map((Icon, idx) => (
          <div key={idx} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-600 border border-white/5">
            <Icon className="w-5 h-5" />
          </div>
        ))}
      </div>

      <button className="w-full py-6 rounded-[2rem] bg-white/5 border border-white/10 group-hover:bg-accent group-hover:text-black group-hover:border-transparent transition-all font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-4 relative z-10 hospitality-glow-gold">
        Experience this Hub
        <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
      </button>
    </motion.div>
  );
};

export default BranchCard;
