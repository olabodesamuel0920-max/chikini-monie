
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UtensilsCrossed, Heart, Zap, Award, Star, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 pt-32 pb-24">
        {/* Story Section */}
        <section className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-primary font-bold text-sm uppercase tracking-[0.3em] mb-4 block">Our Story</span>
              <h1 className="text-5xl md:text-8xl font-black italic gold-text mb-8 uppercase leading-none">
                BUILT FOR <br />CRAVINGS.
              </h1>
              <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                <p>
                  Chikini Monie started with a bold food vision in the heart of Akure. We realized that people shouldn't have to choose between affordability and premium quality.
                </p>
                <p>
                  Built for students burning the midnight oil, workers on the go, families craving a treat, and anyone who appreciates unforgettable taste, we've created a 24/7 digital-first food hub.
                </p>
                <p className="font-bold text-white italic">
                  "Chikini Monie" means small money, but big satisfaction. It's our promise to you.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 blur-[60px] rounded-full" />
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop"
                alt="Chikini Monie Kitchen"
                className="relative z-10 rounded-[3rem] shadow-2xl border border-white/10"
              />
              <div className="absolute -bottom-10 -left-10 bg-black p-8 rounded-3xl border border-white/10 z-20 shadow-2xl hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-2xl">100%</h4>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Passion Infused</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">THE <span className="text-primary">CHIKINI</span> WAY.</h2>
            <p className="text-gray-400">Our core values that drive every meal we serve.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Energy & Vibe",
                desc: "We bring a youthful, energetic spirit to everything we do. Food should be an experience, not just a meal."
              },
              {
                icon: Award,
                title: "Premium Quality",
                desc: "Small money doesn't mean cheap ingredients. We source the best to give you a first-class taste."
              },
              {
                icon: UtensilsCrossed,
                title: "Authentic Local",
                desc: "We celebrate the local flavors of Akure, refined with a modern, fast-food twist."
              }
            ].map((value, idx) => (
              <div key={idx} className="glass p-10 rounded-[2.5rem] border border-white/5 hover:border-primary/20 transition-colors">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 italic">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sister Brand Section */}
        <section className="bg-gradient-to-br from-black to-zinc-900 rounded-[4rem] p-12 md:p-20 border border-white/5 relative overflow-hidden mb-32">
          <div className="absolute top-0 right-0 p-12 opacity-5 scale-150">
            <UtensilsCrossed className="w-64 h-64" />
          </div>
          <div className="max-w-3xl relative z-10">
            <span className="text-accent font-bold text-sm uppercase tracking-[0.3em] mb-6 block">Legacy & Heritage</span>
            <h2 className="text-4xl md:text-6xl font-black italic mb-8 uppercase leading-tight">
              ABULA <br />BACKYARD.
            </h2>
            <p className="text-gray-300 text-lg mb-10 leading-relaxed">
              Chikini Monie is part of a larger food family, including our sister concept <span className="text-accent font-bold">Abula Backyard</span>. 
              While Chikini focuses on fast/casual cravings, Abula Backyard is the home of deep tradition and local culinary excellence.
            </p>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-start gap-4 mb-10">
              <Info className="text-gray-500 w-6 h-6 shrink-0" />
              <p className="text-sm text-gray-500">
                Detailed business relationships and exact sister-brand integration details are currently pending final confirmation.
              </p>
            </div>
            <button className="bg-accent text-black px-10 py-5 rounded-xl font-bold hover:scale-105 transition-transform">
              Explore Our Heritage
            </button>
          </div>
        </section>

        {/* Team / Mission Quote */}
        <section className="text-center max-w-4xl mx-auto">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-12">
            <Star className="text-primary w-10 h-10 fill-current" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black italic mb-8 leading-tight">
            "WE ARE REDEFINING HOW AKURE EATS, <br />
            <span className="gold-text">ONE CRAVING AT A TIME.</span>"
          </h2>
          <p className="text-gray-500 font-medium uppercase tracking-widest text-sm">
            The Chikini Monie Visionary Team
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
