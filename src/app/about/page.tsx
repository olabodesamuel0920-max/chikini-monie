
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UtensilsCrossed, Heart, Zap, Award, Star, Info, Target } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dark">
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
              <span className="text-primary font-black text-xs uppercase tracking-[0.5em] mb-8 block">Our Journey</span>
              <h1 className="text-6xl md:text-8xl font-black italic gold-text mb-10 uppercase tracking-tighter leading-none">
                BUILT FOR <br />CRAVINGS.
              </h1>
              <div className="space-y-8 text-gray-400 text-xl leading-relaxed font-medium">
                <p>
                  Chikini Monie was born from a singular vision: to prove that "small money" can command "big enjoyment." In the heart of Akure, we've redefined the 24/7 food landscape.
                </p>
                <p>
                  Whether you're a student burning the midnight oil or a professional on a tight schedule, we deliver a digital-first food experience that values your taste as much as your time.
                </p>
                <div className="p-8 glass-premium rounded-[2rem] border border-primary/10 inline-block">
                  <p className="font-black text-white italic text-2xl">
                    "Big satisfaction isn't a luxury—it's your right."
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
                    <Heart className="w-8 h-8 fill-primary" />
                  </div>
                  <div>
                    <h4 className="font-black text-4xl italic gold-text leading-none mb-1">100%</h4>
                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.3em]">Passion Infused</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section - Premium Cards */}
        <section className="mb-40 py-40 border-y border-white/5">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-7xl font-black mb-6 uppercase italic tracking-tighter">THE <span className="text-primary">CHIKINI</span> WAY.</h2>
            <p className="text-gray-500 text-xl font-medium">Core principles that define every digital ticket we fulfill.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Zap,
                title: "Energy & Vibe",
                desc: "We bring a youthful, bold spirit to Akure's food scene. Every interaction should feel like an event."
              },
              {
                icon: Award,
                title: "Premium Quality",
                desc: "Small money never means secondary ingredients. We source the finest to ensure first-class satisfaction."
              },
              {
                icon: UtensilsCrossed,
                title: "Authentic Soul",
                desc: "We celebrate Akure's local culinary heritage, refined through a modern digital lens."
              }
            ].map((value, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-premium p-12 rounded-[3.5rem] border border-white/5 group hover:border-primary/20 transition-all duration-500"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary mb-10 group-hover:scale-110 transition-transform shadow-2xl">
                  <value.icon className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-black mb-6 italic uppercase tracking-tighter">{value.title}</h3>
                <p className="text-gray-500 text-lg leading-relaxed font-medium">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Sister Brand Section - Elegant & Massive */}
        <section className="glass-premium rounded-[5rem] p-16 md:p-32 border border-white/5 relative overflow-hidden mb-40 shadow-2xl">
          <div className="absolute top-0 right-0 p-24 opacity-[0.02] scale-150 rotate-12">
            <UtensilsCrossed className="w-96 h-96" />
          </div>
          <div className="max-w-4xl relative z-10">
            <span className="text-accent font-black text-xs uppercase tracking-[0.5em] mb-8 block">Heritage & Lineage</span>
            <h2 className="text-5xl md:text-[6rem] font-black italic mb-10 uppercase tracking-tighter leading-none">
              ABULA <br /><span className="text-accent">BACKYARD.</span>
            </h2>
            <p className="text-gray-400 text-xl md:text-2xl mb-12 leading-relaxed font-medium">
              Chikini Monie is the energetic sibling of Akure's legendary <span className="text-accent font-black">Abula Backyard</span>. 
              While we focus on fast/casual cravings, Abula Backyard remains the sanctuary of deep tradition and local mastery.
            </p>
            <div className="bg-white/[0.03] border border-white/10 p-8 rounded-[2.5rem] flex items-start gap-6 mb-12 max-w-2xl">
              <Info className="text-gray-600 w-8 h-8 shrink-0 mt-1" />
              <p className="text-sm text-gray-500 font-medium uppercase tracking-widest leading-relaxed">
                Sister-brand ecosystem and shared loyalty integrations are currently in the final modeling phase.
              </p>
            </div>
            <button className="bg-accent text-black px-12 py-6 rounded-[2rem] font-black text-xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest shadow-2xl shadow-accent/20">
              Explore Our Roots
            </button>
          </div>
        </section>

        {/* Vision Quote - Final Impact */}
        <section className="text-center max-w-5xl mx-auto">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-16 border border-primary/20 shadow-2xl">
            <Target className="text-primary w-10 h-10" />
          </div>
          <h2 className="text-4xl md:text-7xl font-black italic mb-12 leading-[0.9] tracking-tighter uppercase">
            "REDEFINING HOW <br />AKURE EATS, 
            <span className="gold-text block mt-4">ONE CRAVING AT A TIME.</span>"
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-white/10" />
            <p className="text-gray-600 font-black uppercase tracking-[0.4em] text-[10px]">
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
