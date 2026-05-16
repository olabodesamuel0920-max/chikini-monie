
"use client";

import { useState, useEffect } from "react";
import { Lock, ArrowRight, ShieldAlert, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PreviewGateProps {
  children: React.ReactNode;
  dashboardName: string;
}

const PreviewGate = ({ children, dashboardName }: PreviewGateProps) => {
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const access = sessionStorage.getItem(`chikini_access_${dashboardName}`);
    if (access) setHasAccess(true);
    setIsLoading(false);
  }, [dashboardName]);

  const handleEnter = () => {
    sessionStorage.setItem(`chikini_access_${dashboardName}`, "true");
    setHasAccess(true);
  };

  if (isLoading) return <div className="min-h-screen bg-dark" />;

  return (
    <AnimatePresence mode="wait">
      {!hasAccess ? (
        <motion.div
          key="gate"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-dark flex items-center justify-center p-4 pt-20"
        >
          <div className="max-w-md w-full glass p-8 md:p-12 rounded-[3rem] border border-white/10 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Lock className="w-40 h-40" />
            </div>
            
            <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center text-primary mx-auto mb-8">
              <Lock className="w-10 h-10" />
            </div>
            
            <h2 className="text-3xl font-black italic gold-text mb-4 uppercase tracking-tight">Preview Access</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              The <span className="text-white font-bold">{dashboardName}</span> is part of the business review demo and is not connected to live Chikini Monie operations yet.
            </p>
            
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-start gap-3 text-left mb-8">
              <Info className="text-gray-500 w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">
                No real customer, payment, or staff data is used in this demonstration.
              </p>
            </div>

            <button
              onClick={handleEnter}
              className="w-full premium-gradient py-5 rounded-2xl text-white font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
            >
              Enter Preview Dashboard
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-primary/10 border-b border-primary/20 py-2 px-4 text-center fixed top-16 left-0 right-0 z-[45] backdrop-blur-md">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
              Preview Demo Mode • Local Session Data Only
            </p>
          </div>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreviewGate;
