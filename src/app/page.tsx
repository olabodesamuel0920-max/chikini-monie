
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FoodCard from "@/components/FoodCard";
import BranchCard from "@/components/BranchCard";
import { menuItems, branches, testimonials } from "@/lib/demo-data";
import { ArrowRight, Star, Clock, ShieldCheck, Zap, UtensilsCrossed, Smartphone, LayoutDashboard, ChefHat, BarChart3 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const popularItems = menuItems.filter(item => item.popular);

  return (
    <>
      <Navbar />
      <main className="flex-grow font-body">
        {/* Hero Section - Luxurious & Spacious */}
        <section className="relative min-h-[110vh] flex items-center justify-center overflow-hidden py-40">
          <div className="absolute inset-0 z-0">
            {/* Multi-layered gradient for depth and readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-10" />
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop"
              alt="Premium Food"
              className="w-full h-full object-cover scale-105 animate-slow-zoom"
            />
          </div>

          <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-accent text-[11px] font-bold uppercase tracking-[0.2em] mb-10 backdrop-blur-2xl">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                Akure's 24/7 Food Spot
              </div>
              
              <h1 className="text-6xl md:text-9xl font-extrabold mb-10 tracking-tighter leading-[0.85] uppercase font-heading">
                Big <span className="italic">enjoyment</span> <br />
                <span className="text-white">with </span>
                <span className="gold-text italic">small money.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-3xl mx-auto leading-relaxed font-medium">
                Akure's premier 24/7 digital food hub. <br className="hidden md:block" /> 
                Authentic local soul meets global fast-food excellence.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <Link
                  href="/menu"
                  className="premium-gradient w-full sm:w-auto px-12 py-6 rounded-[2rem] text-white font-bold text-xl shadow-[0_20px_50px_rgba(255,102,0,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-wider"
                >
                  Start Order
                  <ArrowRight className="w-6 h-6" />
                </Link>
                <Link
                  href="/branches"
                  className="glass-premium w-full sm:w-auto px-12 py-6 rounded-[2rem] text-white font-bold text-xl hover:bg-white/10 transition-all border border-white/10 uppercase tracking-wider"
                >
                  Find Branch
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Popular Categories - More Spacing */}
        <section className="py-40 px-6 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-7xl font-extrabold mb-6 tracking-tight uppercase font-heading leading-none">Crave it. <span className="text-primary italic">Get it.</span></h2>
                <p className="text-gray-500 text-xl font-medium">Our most requested satisfaction boosters, crafted for your delight.</p>
              </div>
              <Link href="/menu" className="text-primary font-bold uppercase tracking-wider text-sm flex items-center gap-3 hover:gap-5 transition-all group">
                View full menu <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {popularItems.slice(0, 3).map((item) => (
                <FoodCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* Why Chikini Monie - Premium Visuals */}
        <section className="py-40 px-6 bg-dark relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[150px] rounded-full -mr-40" />
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
              <div>
                <h2 className="text-4xl md:text-7xl font-extrabold mb-12 leading-[0.9] tracking-tight uppercase font-heading">
                  Why Akure <br />
                  <span className="text-primary italic">Loves Us.</span>
                </h2>
                <div className="space-y-12">
                  {[
                    { icon: Zap, color: "primary", title: "Speed that kills hunger.", desc: "Orders confirmed in seconds, ready in minutes. We value your time as much as your taste buds." },
                    { icon: UtensilsCrossed, color: "accent", title: "Quality for everyone.", desc: "From students to CEOs, we serve premium meals at prices that make perfect sense." },
                    { icon: Clock, color: "white", title: "Always awake for you.", desc: "Midnight cravings? Early morning breakfast? Our kitchen never sleeps." },
                  ].map((feature, idx) => (
                    <div key={idx} className="flex gap-8 group">
                      <div className={`w-16 h-16 shrink-0 bg-${feature.color}/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <feature.icon className={`text-${feature.color} w-8 h-8`} />
                      </div>
                      <div>
                        <h4 className="font-bold text-2xl mb-3 uppercase font-heading">{feature.title}</h4>
                        <p className="text-gray-500 text-lg leading-relaxed font-medium">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 premium-gradient blur-[120px] opacity-20 group-hover:opacity-30 transition-opacity" />
                <div className="relative z-10 glass-premium p-4 rounded-[3rem] border border-white/10 rotate-3 group-hover:rotate-0 transition-all duration-700">
                  <img
                    src="https://images.unsplash.com/photo-1594998893017-36147cbcae05?auto=format&fit=crop&q=80&w=1000"
                    alt="Delicious Food"
                    className="rounded-[2.5rem] shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Abula Backyard Sister Brand - Bold & Elegant */}
        <section className="py-40 px-6 bg-black border-y border-white/5">
          <div className="max-w-7xl mx-auto glass-premium p-12 md:p-24 rounded-[4rem] border border-primary/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
              <UtensilsCrossed className="w-80 h-80" />
            </div>
            <div className="relative z-10 lg:max-w-3xl">
              <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-6 block">Sister Concept</span>
              <h2 className="text-4xl md:text-7xl font-extrabold mb-8 uppercase font-heading leading-none">Abula <span className="italic">Backyard</span></h2>
              <p className="text-gray-400 text-xl md:text-2xl mb-12 leading-relaxed font-medium">
                Experience authentic local flavors at our sister brand, Abula Backyard. The traditional soul of Akure, served with premium hospitality.
              </p>
              <Link href="/about" className="inline-flex items-center gap-4 font-bold uppercase tracking-wider text-white hover:text-primary transition-all group">
                Discover our heritage <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Digital Workflow - Clean Grid */}
        <section className="py-40 px-6 bg-dark border-b border-white/5 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-6 block">Digital Infrastructure</span>
              <h2 className="text-4xl md:text-7xl font-extrabold mb-8 uppercase font-heading leading-none tracking-tight">From Craving to <span className="text-primary italic">Completion.</span></h2>
              <p className="text-gray-500 text-xl max-w-3xl mx-auto font-medium">Experience the seamless digital lifecycle of a Chikini Monie order, powered by Supabase Realtime.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { title: "Order", step: "01", desc: "Customer chooses their craving from the interactive digital menu.", icon: Smartphone },
                { title: "Confirm", step: "02", desc: "Order appears instantly on the staff board for verification.", icon: LayoutDashboard },
                { title: "Prepare", step: "03", desc: "Kitchen receives the digital ticket and begins preparation.", icon: ChefHat },
                { title: "Analyze", step: "04", desc: "Owner tracks the sale and performance in real-time.", icon: BarChart3 },
              ].map((item, idx) => (
                <div key={idx} className="glass-premium p-12 rounded-[3.5rem] border border-white/5 relative group hover:bg-white/[0.02] transition-all">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-10 group-hover:scale-110 transition-transform">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <span className="absolute top-12 right-12 text-6xl font-bold text-white/[0.03] group-hover:text-primary/10 transition-colors leading-none italic font-heading">{item.step}</span>
                  <h3 className="text-2xl font-bold mb-4 uppercase font-heading tracking-tight">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-24 text-center">
              <Link
                href="/demo"
                className="bg-white text-black px-12 py-6 rounded-[2rem] font-bold text-xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-4 shadow-2xl shadow-white/10 uppercase tracking-wider"
              >
                Open Demo Center
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </section>

        {/* Branches - Clean Layout */}
        <section className="py-40 px-6 bg-dark">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-7xl font-extrabold mb-6 uppercase font-heading leading-none tracking-tight">Always <span className="gold-text italic">Nearby.</span></h2>
              <p className="text-gray-500 text-xl max-w-2xl mx-auto font-medium">Pick up your order or dine with us at any of our strategically located branches across Akure.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {branches.map((branch) => (
                <BranchCard key={branch.id} branch={branch} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials - Elegant Cards */}
        <section className="py-40 px-6 bg-black overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-extrabold mb-6 text-center uppercase font-heading leading-none tracking-tight">What the <span className="text-primary italic">Streets</span> Say.</h2>
            <p className="text-gray-600 text-center text-xs font-bold uppercase tracking-[0.2em] mb-24 font-body">Sample customer review layout — final testimonials pending Chikini Monie approval.</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {testimonials.map((t, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-premium p-12 rounded-[3.5rem] border border-white/5 relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex gap-2 text-accent mb-8">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 text-xl leading-relaxed italic mb-12 font-medium">"{t.content}"</p>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center font-bold text-xl text-primary border border-white/10 font-heading">
                      {t.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg uppercase tracking-tight font-heading">{t.name}</h4>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA - Massive & Bold */}
        <section className="py-56 px-6 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <h2 className="text-6xl md:text-[10rem] font-extrabold text-white mb-12 tracking-tighter uppercase font-heading leading-[0.8]">
              Ready for big <br /> <span className="italic">enjoyment?</span>
            </h2>
            <p className="text-white/80 text-xl md:text-3xl mb-20 max-w-2xl mx-auto font-medium">
              Join thousands of Akure food lovers today. Your cravings don't have to wait.
            </p>
            <Link
              href="/menu"
              className="bg-white text-primary px-16 py-8 rounded-[2.5rem] font-bold text-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all inline-block uppercase tracking-wider"
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
