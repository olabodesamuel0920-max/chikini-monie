
"use client";

import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";
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
      className="glass-premium rounded-[2.5rem] p-10 border border-white/5 hover:border-accent/20 transition-all duration-500 group shadow-2xl"
    >
      <div className="flex items-center gap-6 mb-10">
        <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center border border-accent/10 shadow-2xl shadow-accent/5 group-hover:scale-110 transition-transform">
          <MapPin className="text-accent w-8 h-8" />
        </div>
        <div>
          <h3 className="font-black text-2xl uppercase italic tracking-tighter group-hover:text-accent transition-colors leading-none mb-1">{branch.name}</h3>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">{branch.status}</p>
        </div>
      </div>

      <div className="space-y-6 mb-10">
        <div className="flex items-center gap-4 text-gray-400">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
            <Clock className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-bold uppercase tracking-widest">{branch.is247 ? "Available 24/7" : branch.status}</span>
        </div>
        <div className="flex items-start gap-4 text-gray-400">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-bold leading-relaxed">{branch.address}</span>
        </div>
        <div className="flex items-center gap-4 text-gray-400">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
            <Phone className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-bold tracking-widest">{branch.phone}</span>
        </div>
      </div>

      <button className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-accent group-hover:text-black group-hover:border-transparent transition-all font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3">
        Locate Branch
        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
      </button>
    </motion.div>
  );
};

export default BranchCard;
