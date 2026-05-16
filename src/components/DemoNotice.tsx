
"use client";

import { motion } from "framer-motion";
import { Info } from "lucide-react";

const DemoNotice = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-[100] pointer-events-none"
    >
      <div className="flex justify-center p-2">
        <div className="glass-premium border border-white/10 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-2xl backdrop-blur-xl font-body">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">
            Preview Demo <span className="mx-2 opacity-30">|</span> Business Review Only
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default DemoNotice;
