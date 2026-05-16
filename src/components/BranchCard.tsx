
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
      className="glass rounded-3xl p-6 border border-white/10 hover:border-accent/50 transition-colors group"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center">
          <MapPin className="text-accent w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-xl group-hover:text-accent transition-colors">{branch.name}</h3>
          <p className="text-sm text-gray-400">{branch.status}</p>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-3 text-sm text-gray-300">
          <Clock className="w-4 h-4 text-primary" />
          <span>{branch.is247 ? "Open 24/7" : branch.status}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-300">
          <MapPin className="w-4 h-4 text-primary" />
          <span>{branch.address}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-300">
          <Phone className="w-4 h-4 text-primary" />
          <span>{branch.phone}</span>
        </div>
      </div>

      <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-accent group-hover:text-black transition-all font-bold flex items-center justify-center gap-2">
        View on Map
        <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default BranchCard;
