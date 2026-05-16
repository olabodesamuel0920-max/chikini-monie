
"use client";

import { MapPin, Phone, Clock, ArrowRight, Navigation, Sparkles } from "lucide-react";
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
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "glass-premium rounded-2xl p-8 border transition-all duration-500 group shadow-lg font-body flex flex-col h-full relative overflow-hidden",
        isActive ? "border-primary/30 bg-primary/[0.02]" : "border-white/[0.05]",
        isComingSoon && "opacity-70 grayscale-[0.4]"
      )}
    >
      {isActive && (
        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
          <Sparkles className="w-20 h-20 text-primary" />
        </div>
      )}
      
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500",
          isActive ? "bg-primary/10 border-primary/20 text-primary" : "bg-white/[0.03] border-white/[0.05] text-gray-500"
        )}>
          {isActive ? <Navigation className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
        </div>
        <div className={cn(
          "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider border backdrop-blur-md",
          isActive ? "bg-primary/10 border-primary/20 text-primary" : 
          isPending ? "bg-accent/10 border-accent/20 text-accent" :
          "bg-white/[0.03] border-white/[0.05] text-gray-500"
        )}>
          {branch.status}
        </div>
      </div>

      <div className="flex-grow relative z-10">
        <h3 className="font-bold text-2xl uppercase tracking-tight mb-4 font-heading text-white group-hover:text-primary transition-colors leading-tight">
          {branch.name}
        </h3>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-gray-500">
            <Clock className="w-4 h-4 text-primary/70" />
            <span className="text-[11px] font-bold uppercase tracking-widest">
              {branch.is247 ? "Active 24/7 Service" : "Operational hours pending"}
            </span>
          </div>
          <div className="flex items-start gap-3 text-gray-400">
            <MapPin className="w-4 h-4 text-primary/70 mt-0.5 shrink-0" />
            <span className="text-[12px] font-medium leading-relaxed">
              {branch.address}
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-500">
            <Phone className="w-4 h-4 text-primary/70" />
            <span className="text-[11px] font-bold tracking-widest italic">
              {branch.phone}
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-auto">
        <button 
          disabled={isComingSoon || isPending}
          className={cn(
            "w-full py-4 rounded-xl border transition-all duration-300 font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2",
            isActive 
              ? "premium-gradient text-white border-transparent shadow-lg shadow-primary/10 hover:scale-[1.02]" 
              : "bg-white/[0.03] border-white/[0.05] text-white hover:bg-white/[0.08]",
            (isComingSoon || isPending) && "cursor-not-allowed opacity-50"
          )}
        >
          {isComingSoon 
            ? "Hub Expansion Planned" 
            : isActive 
              ? "View Hub Preview" 
              : "Location Pending"}
          {isActive && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
        </button>

        {!isActive && !isComingSoon && (
          <p className="text-[8px] text-gray-600 font-bold uppercase tracking-widest text-center mt-4">
            Pending management approval
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default BranchCard;
