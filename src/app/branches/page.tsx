
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BranchCard from "@/components/BranchCard";
import { branches } from "@/lib/demo-data";
import { MapPin, Info, ArrowRight, Target, Navigation } from "lucide-react";
import { motion } from "framer-motion";

export default function BranchesPage() {
  return (
    <div className="min-h-screen bg-dark font-body">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-48 pb-40">
        {/* Header - Refined & Clear */}
        <div className="max-w-5xl mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-8 block">Network Footprint</span>
            <h1 className="text-6xl md:text-[8rem] font-extrabold gold-text mb-10 uppercase tracking-tighter leading-[0.85] font-heading">
              PREVIEW OUR <br /><span className="italic text-white text-5xl md:text-7xl">BRANCHES.</span>
            </h1>
            <p className="text-gray-500 text-xl md:text-2xl leading-relaxed max-w-3xl font-medium">
              Chikini Monie is strategically expanding across Akure to ensure 24/7 craving coverage. Find our active preview hubs or stay updated on upcoming locations.
            </p>
          </motion.div>
        </div>

        {/* Status Legend - Premium & Subtle */}
        <div className="flex flex-wrap gap-8 mb-20 pb-12 border-b border-white/5 font-body">
          <div className="flex items-center gap-4 group">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse shadow-[0_0_15px_rgba(255,102,0,0.5)]" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-primary transition-colors">Active Preview Hub</span>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_15px_rgba(212,175,55,0.3)]" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-accent transition-colors">Pending Confirmation</span>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-3 h-3 rounded-full bg-white/20" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">Planned Expansion</span>
          </div>
        </div>

        {/* Branches Grid - Balanced Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-40">
          {branches.map((branch) => (
            <BranchCard key={branch.id} branch={branch} />
          ))}
        </div>

        {/* Info Box - High-Trust Disclaimer */}
        <div className="glass-premium p-12 rounded-[4rem] border border-white/10 mb-40 flex flex-col lg:flex-row items-center gap-12 shadow-2xl relative overflow-hidden font-body">
          <div className="absolute inset-0 bg-primary/[0.02] pointer-events-none" />
          <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center shrink-0 border border-white/10">
            <Info className="text-gray-500 w-8 h-8" />
          </div>
          <div className="flex-grow text-center lg:text-left relative z-10">
            <h4 className="font-bold text-2xl uppercase tracking-tight mb-3 leading-none font-heading text-white">Business Verification Notice</h4>
            <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-3xl">
              Exact hub coordinates, live operating hours, and localized menus are currently undergoing final management verification. The data provided in this preview is for demonstration of the digital logistics system.
            </p>
          </div>
        </div>

        {/* Scaling Vision - Bold Section */}
        <section className="glass-premium rounded-[5rem] p-16 md:p-32 border border-white/5 relative overflow-hidden shadow-2xl font-body">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[150px] rounded-full -mr-40 pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-8 block">Scaling Vision</span>
              <h2 className="text-5xl md:text-8xl font-extrabold mb-10 uppercase leading-[0.9] tracking-tighter font-heading text-white">HUB <br /><span className="text-primary italic">EXPANSION.</span></h2>
              <p className="text-gray-500 text-xl leading-relaxed mb-12 font-medium">
                Our mission is unified craving coverage. We are strategically scouting high-impact locations in Akure and beyond to bring Chikini Monie closer to you.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="bg-white/5 border border-white/10 px-10 py-5 rounded-2xl text-[10px] font-bold text-gray-500 uppercase tracking-widest italic">
                  Expansion inquiries pending management approval
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 relative">
              <div className="space-y-8 pt-16">
                <div className="aspect-square glass-premium border border-white/10 rounded-[3rem] flex flex-col items-center justify-center p-8 text-center shadow-2xl font-heading">
                  <h4 className="text-5xl font-extrabold gold-text mb-2 leading-none">Future</h4>
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider font-body">Hubs</p>
                </div>
                <div className="aspect-square glass-premium border border-white/10 rounded-[3rem] flex flex-col items-center justify-center p-8 text-center shadow-2xl font-heading">
                  <h4 className="text-5xl font-extrabold gold-text mb-2 leading-none">24h</h4>
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider font-body">Digital Standard</p>
                </div>
              </div>
              <div className="space-y-8">
                <div className="aspect-square glass-premium border border-white/10 rounded-[3rem] flex flex-col items-center justify-center p-8 text-center shadow-2xl font-heading">
                  <h4 className="text-5xl font-extrabold gold-text mb-2 leading-none">Quality</h4>
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider font-body">Standard</p>
                </div>
                <div className="aspect-[4/5] bg-primary/20 border border-primary/20 rounded-[3.5rem] flex flex-col items-center justify-center p-8 text-center shadow-[inset_0_0_50px_rgba(255,102,0,0.1)] relative group font-body overflow-hidden">
                  <div className="absolute inset-0 bg-primary/10 blur-[40px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                  <div className="relative z-10">
                    <Navigation className="w-12 h-12 text-primary mx-auto mb-6" />
                    <h4 className="font-bold text-xl uppercase tracking-tight font-heading text-white">Akure HQ</h4>
                    <p className="text-[10px] text-primary/70 font-bold uppercase tracking-wider mt-2">Central Ops Hub</p>
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
