
"use client";

import { MapPin, Phone, Clock, ArrowRight, ShieldCheck, Sparkles, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import { Branch } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

interface BranchCardProps {
  branch: Branch;
}

const BranchCard = ({ branch }: BranchCardProps) => {
  const isComingSoon = branch.status === "Coming Soon";
  const isActive = branch.status === "Active Preview Branch";
  const isPending = branch.status === "Pending Confirmation";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "glass-premium rounded-[3rem] p-10 border transition-all duration-700 group shadow-2xl font-body flex flex-col h-full relative overflow-hidden",
        isActive ? "border-primary/20 bg-primary/[0.03] hospitality-glow" : "border-white/5",
        isComingSoon && "opacity-80 grayscale-[0.5]"
      )}
    >
      {isActive && (
        <div className="absolute top-0 right-0 p-8 opacity-10 -mr-4 -mt-4">
          <Sparkles className="w-24 h-24 text-primary" />
        </div>
      )}
      <div className="flex justify-between items-start mb-10 relative z-10">
        <div className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center border shadow-2xl transition-all duration-700",
          isActive ? "bg-primary/20 border-primary/20 text-primary group-hover:scale-110 rotate-3 group-hover:rotate-0" : "bg-white/5 border-white/10 text-gray-500"
        )}>
          {isActive ? <Navigation className="w-8 h-8" /> : <MapPin className="w-8 h-8" />}
        </div>
        <div className={cn(
          "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border backdrop-blur-md",
          isActive ? "bg-primary/10 border-primary/20 text-primary" : 
          isPending ? "bg-accent/10 border-accent/20 text-accent" :
          "bg-white/5 border-white/10 text-gray-500"
        )}>
          {branch.status}
        </div>
      </div>

      <div className="flex-grow relative z-10">
        <h3 className="font-bold text-3xl uppercase tracking-tighter mb-4 font-heading text-white group-hover:text-primary transition-colors leading-none">
          {branch.name}
        </h3>
        
        <div className="space-y-6 mb-10">
          <div className="flex items-center gap-4 text-gray-500">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 shrink-0">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider">
              {branch.is247 ? "Active 24/7 Service" : "Operational hours pending"}
            </span>
          </div>
          <div className="flex items-start gap-4 text-gray-400">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 shrink-0 mt-0.5">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <span className="text-xs font-medium leading-relaxed">
              {branch.address}
            </span>
          </div>
          <div className="flex items-center gap-4 text-gray-500">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 shrink-0">
              <Phone className="w-4 h-4 text-primary" />
            </div>
            <span className="text-xs font-bold tracking-wider italic">
              {branch.phone}
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <button 
          disabled={isComingSoon || isPending}
          className={cn(
            "w-full py-5 rounded-2xl border transition-all duration-300 font-bold text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3",
            isActive 
              ? "premium-gradient text-white border-transparent shadow-xl shadow-primary/20 hover:scale-[1.02]" 
              : "bg-white/5 border-white/10 text-white hover:bg-white/10",
            (isComingSoon || isPending) && "cursor-not-allowed opacity-50"
          )}
        >
          {isComingSoon 
            ? "Hub Expansion Planned" 
            : isActive 
              ? "View Hub Preview" 
              : "Location Pending Confirmation"}
          {isActive && <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />}
        </button>

        {!isActive && !isComingSoon && (
          <p className="text-[9px] text-gray-600 font-bold uppercase tracking-wider text-center mt-6 italic">
            Verification pending management approval
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default BranchCard;
