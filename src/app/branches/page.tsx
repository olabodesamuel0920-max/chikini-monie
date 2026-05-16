
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BranchCard from "@/components/BranchCard";
import { branches } from "@/lib/demo-data";
import { MapPin, Info, ArrowRight, Target, Navigation, Sparkles, Globe, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function BranchesPage() {
  return (
    <div className="min-h-screen bg-dark font-body selection:bg-primary/30">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-48 pb-64">
        {/* Cinematic Header */}
        <div className="relative mb-48 overflow-hidden rounded-[4rem] p-16 md:p-32 glass-dark border border-white/5 hospitality-glow shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2066&auto=format&fit=crop" 
              className="w-full h-full object-cover opacity-20 scale-105 animate-slow-zoom" 
              alt="Global Footprint"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/40 to-transparent" />
            <div className="absolute inset-0 cinematic-vignette" />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 max-w-4xl"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-bold uppercase tracking-[0.4em] mb-12 backdrop-blur-3xl">
              <Globe className="w-4 h-4" />
              Expanding Operations
            </div>
            <h1 className="text-6xl md:text-[9rem] font-extrabold gold-text mb-12 uppercase tracking-tighter leading-[0.85] font-heading">
              FIND YOUR <br /><span className="italic text-white">SATISFACTION.</span>
            </h1>
            <p className="text-gray-400 text-2xl md:text-3xl leading-relaxed max-w-3xl font-medium">
              Chikini Monie is scaling rapidly across Akure. From student hubs to business districts, our hospitality engine is always nearby.
            </p>
          </motion.div>
        </div>

        {/* Operational Notice - Premium Callout */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass-dark p-16 rounded-[4rem] border border-accent/20 mb-48 flex flex-col lg:flex-row items-center gap-16 shadow-2xl relative overflow-hidden hospitality-glow-gold"
        >
          <div className="absolute inset-0 bg-accent/[0.02] pointer-events-none" />
          <div className="w-28 h-28 bg-accent/20 rounded-[2.5rem] flex items-center justify-center shrink-0 shadow-2xl border border-accent/20">
            <ShieldCheck className="text-accent w-12 h-12" />
          </div>
          <div className="flex-grow text-center lg:text-left relative z-10">
            <h4 className="font-bold text-4xl uppercase tracking-tight mb-4 leading-none font-heading text-white">Business Review Verification</h4>
            <p className="text-gray-400 text-xl font-medium leading-relaxed max-w-4xl">
              Branch locations, live operational hours, and specific service availability are currently part of a high-fidelity business demonstration. 
              Final site confirmations are pending management approval.
            </p>
          </div>
          <button className="premium-gradient px-16 py-8 rounded-[2.5rem] font-bold text-xl text-white shadow-2xl shadow-primary/30 shrink-0 uppercase tracking-widest hover:scale-105 active:scale-95 transition-all hospitality-glow">
            Request Update
          </button>
        </motion.div>

        {/* Branches Grid - Premium Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-64">
          {branches.map((branch) => (
            <BranchCard key={branch.id} branch={branch} />
          ))}
        </div>

        {/* Future Expansion - Luxury Section */}
        <section className="glass-dark rounded-[5rem] p-16 md:p-32 border border-white/5 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[200px] rounded-full -mr-40 pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div>
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-[0.4em] mb-12 backdrop-blur-3xl">
                <Target className="w-4 h-4" />
                The Future Model
              </div>
              <h2 className="text-6xl md:text-[9rem] font-extrabold mb-12 uppercase leading-[0.85] tracking-tighter font-heading text-white">
                WE ARE <br /><span className="text-primary italic">GROWING.</span>
              </h2>
              <p className="text-gray-400 text-2xl leading-relaxed mb-16 font-medium">
                Our mission is 100% craving coverage. We are strategically scouting high-impact locations in Akure and beyond to bring the Chikini Monie experience closer to you.
              </p>
              <div className="flex flex-col sm:flex-row gap-8">
                <button className="bg-white text-black px-16 py-8 rounded-[2.5rem] font-bold uppercase tracking-widest text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl">
                  Suggest Location
                </button>
                <button className="glass-premium border border-white/10 px-16 py-8 rounded-[2.5rem] font-bold text-white hover:bg-white/10 transition-all flex items-center justify-center gap-4 uppercase tracking-widest text-lg">
                  Partnership Hub <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-10 relative">
              <div className="space-y-10 pt-20">
                <div className="aspect-square glass-dark border border-white/10 rounded-[4rem] flex items-center justify-center p-12 text-center shadow-2xl hospitality-glow">
                  <div>
                    <h4 className="text-6xl font-extrabold gold-text mb-3 leading-none font-heading">10+</h4>
                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Planned Hubs</p>
                  </div>
                </div>
                <div className="aspect-square glass-dark border border-white/10 rounded-[4rem] flex items-center justify-center p-12 text-center shadow-2xl hospitality-glow-gold">
                  <div>
                    <h4 className="text-6xl font-extrabold gold-text mb-3 leading-none font-heading">24H</h4>
                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Global Sync</p>
                  </div>
                </div>
              </div>
              <div className="space-y-10">
                <div className="aspect-square glass-dark border border-white/10 rounded-[4rem] flex items-center justify-center p-12 text-center shadow-2xl hospitality-glow">
                  <div>
                    <h4 className="text-6xl font-extrabold gold-text mb-3 leading-none font-heading">100%</h4>
                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Quality Standard</p>
                  </div>
                </div>
                <div className="aspect-[4/5] bg-primary/20 border border-primary/20 rounded-[4.5rem] flex items-center justify-center p-12 text-center shadow-[inset_0_0_80px_rgba(255,102,0,0.3)] relative group overflow-hidden">
                  <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                  <div className="relative z-10">
                    <Navigation className="w-16 h-16 text-primary mx-auto mb-8 animate-float" />
                    <h4 className="font-bold text-2xl uppercase tracking-tight font-heading text-white">Akure HQ</h4>
                    <p className="text-[11px] text-primary font-bold uppercase tracking-widest mt-3">Strategic Core</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
