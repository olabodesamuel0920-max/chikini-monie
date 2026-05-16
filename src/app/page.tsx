
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FoodCard from "@/components/FoodCard";
import BranchCard from "@/components/BranchCard";
import { menuItems, branches, testimonials } from "@/lib/demo-data";
import { ArrowRight, Star, Clock, ShieldCheck, Zap, UtensilsCrossed, Smartphone, LayoutDashboard, ChefHat, BarChart3, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const popularItems = menuItems.filter(item => item.popular);

  return (
    <>
      <Navbar />
      <main className="flex-grow font-body selection:bg-primary/30">
        {/* Hero Section - Refined Cinematic Hospitality */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-32">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 cinematic-overlay z-10" />
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop"
              alt="Premium Food"
              className="w-full h-full object-cover scale-105 animate-slow-zoom"
            />
          </div>

          <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-accent text-[11px] font-bold uppercase tracking-[0.3em] mb-12 backdrop-blur-3xl hospitality-glow">
                <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                Akure's Premium 24/7 Digital Hub
              </div>
              
              <h1 className="text-6xl md:text-[9rem] font-extrabold mb-12 tracking-tighter leading-[0.85] uppercase font-heading text-white">
                Big <span className="italic">enjoyment</span> <br />
                <span className="text-white/90">with </span>
                <span className="gold-text italic">small money.</span>
              </h1>
              
              <p className="text-xl md:text-3xl text-gray-400 mb-20 max-w-4xl mx-auto leading-relaxed font-medium">
                Akure's premier digital food destination. <br className="hidden md:block" /> 
                Authentic local soul meets global fast-food excellence.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
                <Link
                  href="/menu"
                  className="premium-gradient w-full sm:w-auto px-16 py-8 rounded-[2.5rem] text-white font-bold text-2xl shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 uppercase tracking-widest hospitality-glow"
                >
                  Start Order
                  <ArrowRight className="w-7 h-7" />
                </Link>
                <Link
                  href="/demo"
                  className="glass-premium w-full sm:w-auto px-16 py-8 rounded-[2.5rem] text-white font-bold text-2xl hover:bg-white/10 transition-all border border-white/10 uppercase tracking-widest"
                >
                  Demo Center
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Popular Preview - Refined Spacing */}
        <section className="py-56 px-6 bg-black relative">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-dark to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
              <div className="max-w-3xl">
                <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-6 block">Popular Selection</span>
                <h2 className="text-4xl md:text-[7rem] font-extrabold mb-8 tracking-tight uppercase font-heading leading-none">Crave it. <br /><span className="text-primary italic">Get it.</span></h2>
                <p className="text-gray-500 text-2xl font-medium max-w-2xl">Our most requested satisfaction boosters, crafted for your delight and delivered digitally.</p>
              </div>
              <Link href="/menu" className="text-primary font-bold uppercase tracking-[0.2em] text-xs flex items-center gap-4 hover:gap-6 transition-all group pb-4 border-b border-primary/20">
                Explore Full Menu <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
              {popularItems.slice(0, 3).map((item) => (
                <FoodCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* Why Chikini Monie - Narrative Depth */}
        <section className="py-56 px-6 bg-dark relative overflow-hidden">
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full bg-primary/5 blur-[200px] rounded-full -mr-64 pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-40 items-center">
              <div>
                <span className="text-accent font-bold text-xs uppercase tracking-[0.4em] mb-8 block">The Standard</span>
                <h2 className="text-4xl md:text-[8rem] font-extrabold mb-16 leading-[0.85] tracking-tighter uppercase font-heading">
                  WHY AKURE <br />
                  <span className="text-primary italic">LOVES US.</span>
                </h2>
                <div className="space-y-20">
                  {[
                    { icon: Zap, color: "primary", title: "Speed that kills hunger.", desc: "Orders confirmed in seconds, ready in minutes. We value your time as much as your taste buds." },
                    { icon: UtensilsCrossed, color: "accent", title: "Quality for everyone.", desc: "From students to CEOs, we serve premium meals at prices that make perfect sense." },
                    { icon: Clock, color: "white", title: "Always awake for you.", desc: "Midnight cravings? Early morning breakfast? Our kitchen never sleeps." },
                  ].map((feature, idx) => (
                    <div key={idx} className="flex gap-10 group">
                      <div className={`w-20 h-20 shrink-0 bg-${feature.color}/10 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform border border-${feature.color}/20 shadow-2xl`}>
                        <feature.icon className={`text-${feature.color} w-10 h-10`} />
                      </div>
                      <div>
                        <h4 className="font-bold text-3xl mb-4 uppercase font-heading tracking-tight text-white">{feature.title}</h4>
                        <p className="text-gray-500 text-xl leading-relaxed font-medium">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 premium-gradient blur-[150px] opacity-10 group-hover:opacity-20 transition-opacity" />
                <div className="relative z-10 glass-premium p-6 rounded-[4rem] border border-white/10 rotate-2 group-hover:rotate-0 transition-all duration-1000 hospitality-glow">
                  <img
                    src="https://images.unsplash.com/photo-1594998893017-36147cbcae05?auto=format&fit=crop&q=80&w=1000"
                    alt="Delicious Food"
                    className="rounded-[3rem] shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Abula Backyard - Sister Concept */}
        <section className="py-56 px-6 bg-black border-y border-white/5 relative overflow-hidden">
          <div className="max-w-7xl mx-auto glass-premium p-16 md:p-32 rounded-[5rem] border border-primary/10 relative overflow-hidden hospitality-glow">
            <div className="absolute top-0 right-0 p-16 opacity-[0.02] -rotate-12 scale-150">
              <UtensilsCrossed className="w-96 h-96" />
            </div>
            <div className="relative z-10 lg:max-w-4xl">
              <span className="text-primary font-bold text-xs uppercase tracking-[0.5em] mb-8 block">Sister Brand Heritage</span>
              <h2 className="text-4xl md:text-[8rem] font-extrabold mb-10 uppercase font-heading leading-none tracking-tighter">ABULA <br /><span className="italic">BACKYARD</span></h2>
              <p className="text-gray-400 text-2xl md:text-3xl mb-16 leading-relaxed font-medium">
                Experience authentic local flavors at our sister brand, Abula Backyard. The traditional soul of Akure, served with premium hospitality.
              </p>
              <Link href="/about" className="inline-flex items-center gap-6 font-bold uppercase tracking-widest text-white hover:text-primary transition-all group border-b border-white/10 pb-4">
                Discover Our Heritage <ArrowRight className="w-8 h-8 group-hover:translate-x-4 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Operational Flow - Business Ready */}
        <section className="py-56 px-6 bg-dark border-b border-white/5 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-32">
              <span className="text-primary font-bold text-xs uppercase tracking-[0.5em] mb-8 block">Digital Infrastructure</span>
              <h2 className="text-4xl md:text-[8.5rem] font-extrabold mb-10 uppercase font-heading leading-none tracking-tighter">THE <span className="text-primary italic">LIFECYCLE.</span></h2>
              <p className="text-gray-500 text-2xl max-w-4xl mx-auto font-medium">A seamless digital journey powered by Supabase Realtime—from the first craving to executive reporting.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { title: "Order", step: "01", desc: "Customer chooses their craving from the interactive digital menu.", icon: Smartphone },
                { title: "Confirm", step: "02", desc: "Order appears instantly on the staff board for verification.", icon: LayoutDashboard },
                { title: "Prepare", step: "03", desc: "Kitchen receives the digital ticket and begins preparation.", icon: ChefHat },
                { title: "Analyze", step: "04", desc: "Owner tracks the sale and performance in real-time.", icon: BarChart3 },
              ].map((item, idx) => (
                <div key={idx} className="glass-premium p-14 rounded-[4rem] border border-white/5 relative group hover:bg-white/[0.03] transition-all duration-700 hospitality-glow">
                  <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-12 group-hover:scale-110 transition-transform border border-primary/20 shadow-inner">
                    <item.icon className="w-10 h-10" />
                  </div>
                  <span className="absolute top-14 right-14 text-7xl font-bold text-white/[0.02] group-hover:text-primary/10 transition-colors leading-none italic font-heading">{item.step}</span>
                  <h3 className="text-3xl font-bold mb-6 uppercase font-heading tracking-tight text-white">{item.title}</h3>
                  <p className="text-gray-500 text-lg leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-32 text-center">
              <Link
                href="/demo"
                className="bg-white text-black px-16 py-8 rounded-[2.5rem] font-bold text-2xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-6 shadow-2xl shadow-white/10 uppercase tracking-widest"
              >
                Experience The Engine
                <ArrowRight className="w-8 h-8" />
              </Link>
            </div>
          </div>
        </section>

        {/* Branches - Hospitality Hubs */}
        <section className="py-56 px-6 bg-black relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-32">
              <span className="text-accent font-bold text-xs uppercase tracking-[0.5em] mb-8 block">Global Footprint</span>
              <h2 className="text-4xl md:text-[8rem] font-extrabold mb-10 uppercase font-heading leading-none tracking-tighter">ALWAYS <span className="gold-text italic">NEARBY.</span></h2>
              <p className="text-gray-500 text-2xl max-w-3xl mx-auto font-medium">Pick up your order or dine with us at any of our strategically located hospitality hubs across Akure.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
              {branches.map((branch) => (
                <BranchCard key={branch.id} branch={branch} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials - Community Proof */}
        <section className="py-56 px-6 bg-dark overflow-hidden relative">
          <div className="max-w-7xl mx-auto relative z-10">
            <h2 className="text-4xl md:text-[8rem] font-extrabold mb-10 text-center uppercase font-heading leading-none tracking-tighter">THE <span className="text-primary italic">CULTURE.</span></h2>
            <p className="text-gray-600 text-center text-xs font-bold uppercase tracking-[0.3em] mb-32 font-body max-w-2xl mx-auto">Sample customer review layout — final testimonials pending Chikini Monie management approval.</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              {testimonials.map((t, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-premium p-16 rounded-[4rem] border border-white/5 relative flex flex-col justify-between hospitality-glow"
                >
                  <div>
                    <div className="flex gap-2 text-accent/40 mb-10">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 text-2xl leading-relaxed italic mb-16 font-medium">"{t.content}"</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center font-bold text-2xl text-primary border border-white/10 font-heading shadow-inner">
                      {t.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-xl uppercase tracking-tight font-heading text-white">{t.name}</h4>
                      <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA - Executive Invitation */}
        <section className="py-72 px-6 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none" />
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <h2 className="text-6xl md:text-[11rem] font-extrabold text-white mb-16 tracking-tighter uppercase font-heading leading-[0.8] drop-shadow-2xl">
              BIG <br /> <span className="italic text-white/90">ENJOYMENT?</span>
            </h2>
            <p className="text-white/90 text-2xl md:text-4xl mb-24 max-w-3xl mx-auto font-medium leading-relaxed">
              Join the thousands who trust Chikini Monie for Akure's best 24/7 food experience.
            </p>
            <Link
              href="/menu"
              className="bg-white text-primary px-24 py-10 rounded-[3rem] font-bold text-3xl shadow-[0_30px_70px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all inline-block uppercase tracking-widest"
            >
              Order Now
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
