
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BranchCard from "@/components/BranchCard";
import { branches } from "@/lib/demo-data";
import { MapPin, Info, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function BranchesPage() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 pt-32 pb-24">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-primary font-bold text-sm uppercase tracking-[0.3em] mb-4 block">Our Locations</span>
          <h1 className="text-5xl md:text-7xl font-black italic gold-text mb-6 uppercase leading-tight">
            FIND YOUR <br />SATISFACTION.
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Chikini Monie is expanding rapidly across Akure. Find our official branches below and enjoy premium meals 24/7.
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-accent/10 border border-accent/20 p-8 rounded-[2rem] mb-16 flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-accent/20">
            <Info className="text-black w-8 h-8" />
          </div>
          <div className="flex-grow text-center md:text-left">
            <h4 className="font-bold text-xl mb-1">Operational Confirmation</h4>
            <p className="text-gray-400 text-sm">
              Branch details, exact coordinates, and specific opening hours are currently under final business review. 
              The information shown here is for platform demonstration purposes.
            </p>
          </div>
          <button className="premium-gradient px-8 py-4 rounded-xl font-bold text-white shadow-xl shadow-primary/20 shrink-0">
            Get Notification
          </button>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {branches.map((branch) => (
            <BranchCard key={branch.id} branch={branch} />
          ))}
        </div>

        {/* Future Expansion Section */}
        <section className="glass rounded-[3rem] p-12 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full -mr-32" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 italic uppercase">We are <br /><span className="text-primary">Growing.</span></h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Want a Chikini Monie branch in your neighborhood? We are looking for strategic locations in Akure and beyond. 
                Our mission is to bring affordable premium food to every street.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                  Suggest a Location
                </button>
                <button className="bg-white/5 border border-white/10 px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                  Partnership Inquiry <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-8">
                <div className="aspect-square bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center p-6 text-center">
                  <div>
                    <h4 className="text-3xl font-black gold-text mb-1">10+</h4>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Planned Branches</p>
                  </div>
                </div>
                <div className="aspect-square bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center p-6 text-center">
                  <div>
                    <h4 className="text-3xl font-black gold-text mb-1">24h</h4>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Service Standard</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="aspect-square bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center p-6 text-center">
                  <div>
                    <h4 className="text-3xl font-black gold-text mb-1">100%</h4>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Quality Guarantee</p>
                  </div>
                </div>
                <div className="aspect-[4/5] bg-primary/20 border border-primary/30 rounded-3xl flex items-center justify-center p-6 text-center shadow-inner">
                  <div>
                    <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h4 className="font-bold text-sm">Akure Hub</h4>
                    <p className="text-[10px] text-primary/60 font-bold uppercase mt-1">Headquarters</p>
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
