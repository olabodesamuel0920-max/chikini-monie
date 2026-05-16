
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UtensilsCrossed, Heart, Zap, Award, Star, Info, Target, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dark font-body">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-48 pb-40">
        {/* Story Section - Luxurious Spacing */}
        <section className="mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-8 block">Our Philosophy</span>
              <h1 className="text-6xl md:text-[8rem] font-extrabold gold-text mb-12 uppercase tracking-tighter leading-[0.85] font-heading">
                BIG ENJOYMENT. <br /><span className="italic text-white text-5xl md:text-7xl">SMALL MONEY.</span>
              </h1>
              <div className="space-y-8 text-gray-400 text-xl leading-relaxed font-medium">
                <p>
                  Chikini Monie was established to bridge the gap between premium hospitality and everyday affordability. In the vibrant heart of Akure, we have engineered a logistics-driven food system that prioritizes quality without the high-end markup.
                </p>
                <p>
                  Our 24/7 food culture is designed for the modern Akure—fueling students during midnight study sessions, supporting workers on the night shift, and providing families with high-quality meals at any hour. We blend traditional flavors with a digital engine for seamless satisfaction.
                </p>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-8">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest italic">
                    Brand details and media pending management confirmation. This preview represents the strategic vision of Chikini Monie.
                  </p>
                </div>
                <div className="p-10 glass-premium rounded-[3rem] border border-primary/10 inline-block hospitality-glow">
                  <p className="font-bold text-white italic text-3xl font-heading leading-tight">
                    "Maximum satisfaction is no <br className="hidden md:block" /> longer a luxury—it's a standard."
                  </p>
                </div>
              </div>
            </motion.div>
            
            <div className="relative group">
              <div className="absolute -inset-10 bg-primary/5 blur-[120px] rounded-full group-hover:bg-primary/10 transition-all duration-1000" />
              <div className="relative z-10 glass-premium p-4 rounded-[4rem] border border-white/10 rotate-2 group-hover:rotate-0 transition-all duration-700">
                <img
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop"
                  alt="Chikini Monie Kitchen"
                  className="rounded-[3.5rem] shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-12 -left-12 glass-premium p-10 rounded-[3rem] border border-white/10 z-20 shadow-2xl hidden md:block group-hover:scale-105 transition-transform">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary shadow-xl">
                    <UtensilsCrossed className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-4xl gold-text leading-none mb-1 font-heading uppercase">24/7</h4>
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em]">Operational Culture</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Details - Clean & Informative */}
        <section className="mb-40 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="glass-premium p-16 rounded-[4rem] border border-white/5 font-body">
            <h3 className="text-3xl font-bold mb-8 uppercase tracking-tight font-heading text-white">Digital-First Growth</h3>
            <p className="text-gray-500 text-lg leading-relaxed mb-8 font-medium">
              We aren't just a kitchen; we are a tech-enabled hospitality platform. By digitizing the entire flow from order to delivery, we minimize errors and maximize the speed of satisfaction.
            </p>
            <div className="flex items-center gap-4 text-xs font-bold text-primary uppercase tracking-[0.2em]">
              <Target className="w-5 h-5" />
              Operational Transparency
            </div>
          </div>
          <div className="glass-premium p-16 rounded-[4rem] border border-white/5 font-body">
            <h3 className="text-3xl font-bold mb-8 uppercase tracking-tight font-heading text-white">The Akure Audience</h3>
            <p className="text-gray-500 text-lg leading-relaxed mb-8 font-medium">
              Our menu is curated for the diverse energy of Akure. From student-friendly combos to family-sized swallow platters, we serve the community that keeps this city moving.
            </p>
            <div className="flex items-center gap-4 text-xs font-bold text-accent uppercase tracking-[0.2em]">
              <Heart className="w-5 h-5" />
              Community Focused
            </div>
          </div>
        </section>

        {/* Sister Brand Section - Elegant & Massive */}
        <section className="glass-premium rounded-[5rem] p-16 md:p-32 border border-white/5 relative overflow-hidden mb-40 shadow-2xl font-body">
          <div className="absolute top-0 right-0 p-24 opacity-[0.02] scale-150 rotate-12">
            <UtensilsCrossed className="w-96 h-96" />
          </div>
          <div className="max-w-4xl relative z-10">
            <span className="text-accent font-bold text-xs uppercase tracking-[0.4em] mb-8 block">Heritage & Lineage</span>
            <h2 className="text-5xl md:text-[6rem] font-extrabold mb-10 uppercase tracking-tight leading-none font-heading">
              ABULA <br /><span className="text-accent italic">BACKYARD.</span>
            </h2>
            <p className="text-gray-400 text-xl md:text-2xl mb-12 leading-relaxed font-medium">
              Chikini Monie draws inspiration from the culinary legacy of <span className="text-accent font-bold">Abula Backyard</span>. 
              While Chikini Monie focuses on high-speed, 24/7 digital satisfaction, our heritage is rooted in the deep tradition and local mastery that Abula Backyard is renowned for.
            </p>
            <div className="bg-white/[0.03] border border-white/10 p-8 rounded-[2.5rem] flex items-start gap-6 mb-12 max-w-2xl">
              <Info className="text-gray-600 w-8 h-8 shrink-0 mt-1" />
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider leading-relaxed">
                Sister-brand ecosystem and shared media pending final management confirmation. Currently in strategic preview mode.
              </p>
            </div>
          </div>
        </section>

        {/* Vision Quote - Final Impact */}
        <section className="text-center max-w-5xl mx-auto font-body">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-16 border border-primary/20 shadow-2xl">
            <Sparkles className="text-primary w-10 h-10" />
          </div>
          <h2 className="text-4xl md:text-7xl font-extrabold mb-12 leading-[0.9] tracking-tight uppercase font-heading">
            "REDEFINING HOW <br /><span className="italic text-primary">AKURE EATS,</span> 
            <span className="gold-text block mt-4 italic">ONE CRAVING AT A TIME.</span>"
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-white/10" />
            <p className="text-gray-600 font-bold uppercase tracking-[0.3em] text-[10px]">
              Chikini Monie Strategy Group
            </p>
            <div className="h-[1px] w-12 bg-white/10" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
