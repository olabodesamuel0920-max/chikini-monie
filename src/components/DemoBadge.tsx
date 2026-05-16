
"use client";

import { motion } from "framer-motion";

const DemoBadge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-24 right-0 z-[60] hidden md:block"
    >
      <div className="bg-accent/90 backdrop-blur-md border-y border-l border-white/10 px-4 py-2 rounded-l-full shadow-2xl flex items-center gap-2 font-body">
        <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-black">Preview Demo</span>
      </div>
    </motion.div>
  );
};

export default DemoBadge;
