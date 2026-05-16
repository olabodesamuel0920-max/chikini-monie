
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UtensilsCrossed, Heart, Zap, Award, Star, Info, Target, Sparkles, Quote, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dark font-body selection:bg-primary/30">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-48 pb-64">
        {/* Story Section - Cinematic Introduction */}
        <section className="mb-64">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            >
              <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-[0.4em] mb-12 backdrop-blur-3xl hospitality-glow">
                <Sparkles className="w-4 h-4" />
                The Origin Story
              </div>
              <h1 className="text-6xl md:text-[8.5rem] font-extrabold gold-text mb-12 uppercase tracking-tighter leading-none font-heading">
                BUILT FOR <br /><span className="italic text-white">CRAVINGS.</span>
              </h1>
              
              <div className="space-y-12 text-gray-400 text-2xl leading-relaxed font-medium">
                <p>
                  Chikini Monie was born from a singular vision: to prove that "small money" can command "big enjoyment." In the heart of Akure, we've redefined the 24/7 hospitality landscape.
                </p>
                <p>
                  Whether you're a student burning the midnight oil or a professional on a tight schedule, we deliver a digital-first food experience that values your taste as much as your time.
                </p>
                
                <div className="p-12 glass-dark rounded-[3rem] border border-accent/20 relative overflow-hidden hospitality-glow-gold group">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Quote className="w-16 h-16 text-accent" />
                  </div>
                  <p className="font-bold text-white italic text-3xl font-heading relative z-10 group-hover:text-accent transition-colors">
                    "Big satisfaction isn't a luxury—it's a digital baseline for everyone."
                  </p>
                </div>
              </div>
            </motion.div>
            
            <div className="relative group">
              <div className="absolute -inset-10 bg-primary/10 blur-[150px] rounded-full group-hover:bg-primary/20 transition-all duration-1000" />
              <div className="relative z-10 glass-dark p-6 rounded-[5rem] border border-white/10 rotate-3 group-hover:rotate-0 transition-all duration-1000 hospitality-glow shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
                <img
                  src="https://images.unsplash.com/photo-1543353071-873f17a7a088?q=80&w=2070&auto=format&fit=crop"
                  alt="Chikini Monie Ambience"
                  className="rounded-[4rem] shadow-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                />
              </div>
              <div className="absolute -bottom-16 -left-16 glass-dark p-12 rounded-[4rem] border border-accent/20 z-20 shadow-2xl hidden xl:block group-hover:scale-110 transition-transform duration-700 hospitality-glow-gold backdrop-blur-3xl">
                <div className="flex items-center gap-8">
                  <div className="w-20 h-20 bg-accent/20 rounded-3xl flex items-center justify-center text-accent shadow-2xl border border-accent/20">
                    <Heart className="w-10 h-10 fill-accent" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-5xl gold-text leading-none mb-2 font-heading tracking-tighter">100%</h4>
                    <p className="text-[11px] text-gray-500 uppercase font-bold tracking-[0.3em]">Hospitality Focused</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Narrative Blocks - Premium Storytelling */}
        <section className="mb-64">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {[
              { 
                title: "The Chikini Idea", 
                desc: "We started with a simple question: why should premium food be restricted by high prices? We engineered a system that delivers Aristo-level quality at street-smart rates.", 
                icon: Target 
              },
              { 
                title: "24/7 Food Culture", 
                desc: "Akure is a city that moves at all hours. Our digital engine never sleeps, ensuring that whether it's 2 PM or 2 AM, your craving is handled with precision.", 
                icon: Zap 
              },
              { 
                title: "Digital Growth", 
                desc: "We are scaling beyond a single kitchen. By integrating real-time cloud sync and digital ticket management, we ensure consistency across every branch.", 
                icon: ShieldCheck 
              },
              { 
                title: "Hospitality First", 
                desc: "Food is the product, but hospitality is the experience. We've automated the friction so our staff can focus on the soul of service.", 
                icon: Heart 
              }
            ].map((block, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="glass-dark p-16 rounded-[4rem] border border-white/5 group hover:border-primary/30 transition-all duration-700 hospitality-glow"
              >
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-primary mb-12 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
                  <block.icon className="w-10 h-10" />
                </div>
                <h3 className="text-4xl font-extrabold mb-6 uppercase tracking-tight font-heading text-white">{block.title}</h3>
                <p className="text-gray-400 text-xl leading-relaxed font-medium">{block.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Sister Brand Section - Elegant & Massive */}
        <section className="glass-dark rounded-[5rem] p-16 md:p-32 border border-accent/10 relative overflow-hidden mb-64 shadow-[0_50px_150px_rgba(0,0,0,0.8)] hospitality-glow-gold">
          <div className="absolute top-0 right-0 p-32 opacity-[0.03] scale-150 rotate-12">
            <UtensilsCrossed className="w-96 h-96 text-accent" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent pointer-events-none" />
          
          <div className="max-w-4xl relative z-10">
            <span className="text-accent font-bold text-xs uppercase tracking-[0.5em] mb-8 block">Hospitality Lineage</span>
            <h2 className="text-6xl md:text-[8rem] font-extrabold mb-12 uppercase tracking-tighter leading-none font-heading">
              ABULA <br /><span className="text-accent italic">BACKYARD.</span>
            </h2>
            <p className="text-gray-300 text-2xl md:text-3xl mb-16 leading-relaxed font-medium">
              Chikini Monie is the energetic sibling of Akure's legendary <span className="text-accent font-extrabold">Abula Backyard</span>. 
              While we focus on fast/casual cravings, Abula Backyard remains the sanctuary of deep tradition and local mastery.
            </p>
            <div className="bg-white/[0.03] border border-white/10 p-10 rounded-[3rem] flex items-start gap-8 mb-16 max-w-2xl backdrop-blur-3xl shadow-inner">
              <Info className="text-accent w-10 h-10 shrink-0 mt-1" />
              <p className="text-sm text-gray-400 font-bold uppercase tracking-wider leading-relaxed">
                Sister-brand ecosystem and shared loyalty integrations are currently in the final business verification phase.
              </p>
            </div>
            <button className="bg-accent text-black px-16 py-8 rounded-[2.5rem] font-bold text-2xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest shadow-[0_20px_50px_rgba(212,175,55,0.3)] hospitality-glow-gold">
              Explore Our Roots
            </button>
          </div>
        </section>

        {/* Vision Quote - Final Impact */}
        <section className="text-center max-w-6xl mx-auto py-32 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-20 border border-primary/20 shadow-2xl hospitality-glow">
            <Target className="text-primary w-12 h-12" />
          </div>
          <h2 className="text-5xl md:text-[7.5rem] font-extrabold mb-16 leading-[0.9] tracking-tighter uppercase font-heading text-white">
            "REDEFINING HOW <br /><span className="italic">AKURE EATS,</span> 
            <span className="gold-text block mt-6 italic">ONE CRAVING AT A TIME.</span>"
          </h2>
          <div className="flex items-center justify-center gap-6">
            <div className="h-[2px] w-20 bg-gradient-to-r from-transparent to-white/20" />
            <p className="text-gray-500 font-bold uppercase tracking-[0.5em] text-xs">
              Chikini Monie Strategy Group
            </p>
            <div className="h-[2px] w-20 bg-gradient-to-l from-transparent to-white/20" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
