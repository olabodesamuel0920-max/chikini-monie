
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
        {/* Header - Massive & Impactful */}
        <div className="max-w-4xl mb-32">
          <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-8 block">Global Footprint</span>
          <h1 className="text-6xl md:text-[8rem] font-extrabold gold-text mb-10 uppercase tracking-tighter leading-[0.85] font-heading">
            FIND YOUR <br /><span className="italic text-white">SATISFACTION.</span>
          </h1>
          <p className="text-gray-500 text-xl md:text-2xl leading-relaxed max-w-2xl font-medium">
            Chikini Monie is expanding rapidly across Akure. Locate your nearest craving-point and enjoy premium quality 24/7.
          </p>
        </div>

        {/* Info Box - Luxurious Glass */}
        <div className="glass-premium p-12 rounded-[4rem] border border-accent/20 mb-32 flex flex-col lg:flex-row items-center gap-10 shadow-2xl relative overflow-hidden font-body">
          <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
          <div className="w-24 h-24 bg-accent/20 rounded-[2rem] flex items-center justify-center shrink-0 shadow-2xl shadow-accent/10 border border-accent/20">
            <Info className="text-accent w-10 h-10" />
          </div>
          <div className="flex-grow text-center lg:text-left relative z-10">
            <h4 className="font-bold text-3xl uppercase tracking-tight mb-2 leading-none font-heading">Operational Confirmation</h4>
            <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-2xl">
              Exact coordinates and live opening hours are currently undergoing final business verification. The data below is for platform demonstration purposes.
            </p>
          </div>
          <button className="premium-gradient px-12 py-6 rounded-[2rem] font-bold text-lg text-white shadow-2xl shadow-primary/30 shrink-0 uppercase tracking-wider hover:scale-105 active:scale-95 transition-all">
            Get Alerts
          </button>
        </div>

        {/* Branches Grid - Spacious */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-40">
          {branches.map((branch) => (
            <BranchCard key={branch.id} branch={branch} />
          ))}
        </div>

        {/* Future Expansion - Bold Section */}
        <section className="glass-premium rounded-[5rem] p-16 md:p-32 border border-white/5 relative overflow-hidden shadow-2xl font-body">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[150px] rounded-full -mr-40 pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-8 block">Scaling Vision</span>
              <h2 className="text-5xl md:text-8xl font-extrabold mb-10 uppercase leading-[0.9] tracking-tighter font-heading">We are <br /><span className="text-primary italic">Growing.</span></h2>
              <p className="text-gray-500 text-xl leading-relaxed mb-12 font-medium">
                Want a Chikini Monie hub in your neighborhood? We are strategically scouting high-impact locations in Akure and beyond. Our mission is 100% craving coverage.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="bg-white text-black px-12 py-6 rounded-[2rem] font-bold uppercase tracking-wider text-sm hover:scale-105 active:scale-95 transition-all shadow-2xl">
                  Suggest a Spot
                </button>
                <button className="glass-premium border border-white/10 px-12 py-6 rounded-[2rem] font-bold text-white hover:bg-white/10 transition-all flex items-center justify-center gap-3 uppercase tracking-wider text-sm">
                  Partnership Hub <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 relative">
              <div className="space-y-8 pt-16">
                <div className="aspect-square glass-premium border border-white/10 rounded-[3rem] flex items-center justify-center p-8 text-center shadow-2xl font-heading">
                  <div>
                    <h4 className="text-5xl font-extrabold gold-text mb-2 leading-none">10+</h4>
                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider font-body">Future Hubs</p>
                  </div>
                </div>
                <div className="aspect-square glass-premium border border-white/10 rounded-[3rem] flex items-center justify-center p-8 text-center shadow-2xl font-heading">
                  <div>
                    <h4 className="text-5xl font-extrabold gold-text mb-2 leading-none">24h</h4>
                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider font-body">Digital Standard</p>
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                <div className="aspect-square glass-premium border border-white/10 rounded-[3rem] flex items-center justify-center p-8 text-center shadow-2xl font-heading">
                  <div>
                    <h4 className="text-5xl font-extrabold gold-text mb-2 leading-none">100%</h4>
                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider font-body">Quality Sync</p>
                  </div>
                </div>
                <div className="aspect-[4/5] bg-primary/20 border border-primary/20 rounded-[3.5rem] flex items-center justify-center p-8 text-center shadow-[inset_0_0_50px_rgba(255,102,0,0.2)] relative group font-body">
                  <div className="absolute inset-0 bg-primary/10 blur-[40px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                  <div className="relative z-10">
                    <Navigation className="w-12 h-12 text-primary mx-auto mb-6" />
                    <h4 className="font-bold text-lg uppercase tracking-tight font-heading">Akure HQ</h4>
                    <p className="text-[10px] text-primary/70 font-bold uppercase tracking-wider mt-2">Central Operations</p>
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
