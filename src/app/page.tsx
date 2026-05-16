
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FoodCard from "@/components/FoodCard";
import BranchCard from "@/components/BranchCard";
import { menuItems, branches, testimonials } from "@/lib/demo-data";
import { ArrowRight, Star, Clock, ShieldCheck, Zap, UtensilsCrossed, Smartphone, LayoutDashboard, ChefHat, BarChart3, Moon, MapPin, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const popularItems = menuItems.filter(item => item.popular);

  const experiences = [
    {
      title: "Late-night cravings",
      desc: "Our kitchens burn bright when the city sleeps. Premium midnight fuel for the bold.",
      icon: Moon,
      color: "blue-500"
    },
    {
      title: "Fast pickup",
      desc: "Digital precision meets physical speed. In and out with zero friction.",
      icon: Zap,
      color: "primary"
    },
    {
      title: "Local meals",
      desc: "Authentic Akure soul, refined for the modern digital food landscape.",
      icon: Heart,
      color: "red-500"
    },
    {
      title: "Grills and quick bites",
      desc: "Smoke, fire, and flavor. Crafted for moments that need an extra kick.",
      icon: UtensilsCrossed,
      color: "accent"
    },
    {
      title: "Student-friendly prices",
      desc: "Big enjoyment doesn't demand big money. We value your pocket and your taste.",
      icon: Sparkles,
      color: "green-500"
    },
    {
      title: "Premium hospitality",
      desc: "Every ticket is an invitation to excellence. Hospitality is our digital baseline.",
      icon: ShieldCheck,
      color: "purple-500"
    }
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow font-body bg-dark overflow-x-hidden">
        {/* Cinematic Hero Section */}
        <section className="relative min-h-[110vh] flex items-center justify-center overflow-hidden pt-32 pb-48">
          <div className="absolute inset-0 z-0">
            {/* Cinematic Layered Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-dark z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 z-10" />
            <div className="absolute inset-0 cinematic-vignette z-10" />
            <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-dark to-transparent z-10" />
            
            {/* Ambient Glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-[150px] rounded-full z-0 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 blur-[180px] rounded-full z-0" />

            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
              alt="Premium Hospitality Experience"
              className="w-full h-full object-cover scale-105 animate-slow-zoom opacity-60"
            />
          </div>

          <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-accent text-[11px] font-bold uppercase tracking-[0.3em] mb-12 backdrop-blur-3xl hospitality-glow-gold">
                <span className="w-2 h-2 bg-accent rounded-full animate-float" />
                The Hospitality Standard in Akure
              </div>
              
              <h1 className="text-6xl md:text-[9.5rem] font-extrabold mb-12 tracking-tighter leading-[0.85] uppercase font-heading">
                Big <span className="italic gold-text">enjoyment</span> <br />
                <span className="text-white">with </span>
                <span className="italic">small money.</span>
              </h1>
              
              <p className="text-xl md:text-3xl text-gray-400 mb-20 max-w-4xl mx-auto leading-relaxed font-medium">
                Experience the intersection of luxury food-tech and authentic hospitality. <br className="hidden md:block" /> 
                A 24/7 digital engine built for Akure's finest cravings.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
                <Link
                  href="/menu"
                  className="premium-gradient w-full sm:w-auto px-16 py-8 rounded-[2.5rem] text-white font-bold text-2xl shadow-[0_25px_60px_rgba(255,102,0,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 uppercase tracking-wider hospitality-glow"
                >
                  Explore Menu
                  <ArrowRight className="w-7 h-7" />
                </Link>
                <Link
                  href="/demo"
                  className="glass-premium w-full sm:w-auto px-16 py-8 rounded-[2.5rem] text-white font-bold text-2xl hover:bg-white/10 transition-all border border-white/10 uppercase tracking-wider"
                >
                  Watch Demo
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Premium Experience Section */}
        <section className="py-48 px-6 bg-dark relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white/[0.01] pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-32">
              <span className="text-primary font-bold text-xs uppercase tracking-[0.5em] mb-8 block">The Lifestyle</span>
              <h2 className="text-5xl md:text-8xl font-extrabold mb-10 tracking-tight uppercase font-heading leading-none">More than food. <br /><span className="text-primary italic">A 24/7 experience.</span></h2>
              <p className="text-gray-500 text-2xl max-w-3xl mx-auto font-medium">We've built an ecosystem that understands the pulse of Akure.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-premium p-12 rounded-[4rem] border border-white/5 group hover:border-primary/20 transition-all duration-500 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all" />
                  <div className={`w-20 h-20 bg-${exp.color}/10 rounded-3xl flex items-center justify-center text-${exp.color} mb-10 group-hover:scale-110 group-hover:bg-${exp.color}/20 transition-all duration-500 border border-${exp.color}/10`}>
                    <exp.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold mb-6 uppercase tracking-tight font-heading group-hover:text-white transition-colors">{exp.title}</h3>
                  <p className="text-gray-500 text-lg leading-relaxed font-medium">{exp.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Upgraded Menu Preview */}
        <section className="py-48 px-6 bg-black relative">
          <div className="absolute top-1/2 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-dark/50 pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
              <div className="max-w-3xl">
                <span className="text-accent font-bold text-xs uppercase tracking-[0.5em] mb-8 block">Chef's Selection</span>
                <h2 className="text-5xl md:text-8xl font-extrabold mb-8 tracking-tight uppercase font-heading leading-none">Crave it. <span className="gold-text italic">Command it.</span></h2>
                <p className="text-gray-400 text-2xl font-medium">The most requested masterpieces in our digital inventory.</p>
              </div>
              <Link href="/menu" className="premium-gradient px-12 py-6 rounded-[2rem] text-white font-bold uppercase tracking-wider text-sm flex items-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-2xl hospitality-glow group">
                Browse Collection <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
              {popularItems.slice(0, 3).map((item) => (
                <FoodCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* Upgraded Branch Section */}
        <section className="py-48 px-6 bg-dark border-t border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[200px] rounded-full pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-32">
              <span className="text-accent font-bold text-xs uppercase tracking-[0.5em] mb-8 block">Our Locations</span>
              <h2 className="text-5xl md:text-8xl font-extrabold mb-10 uppercase font-heading leading-none tracking-tight">Always <span className="gold-text italic">Nearby.</span></h2>
              <p className="text-gray-500 text-2xl max-w-3xl mx-auto font-medium mb-8">
                Built for students, workers, families, and late-night food lovers.
              </p>
              <p className="text-gray-600 text-xl font-medium max-w-2xl mx-auto">Find the Chikini Monie hub closest to your current vibe.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
              {branches.map((branch) => (
                <BranchCard key={branch.id} branch={branch} />
              ))}
            </div>
          </div>
        </section>

        {/* Upgraded Testimonials */}
        <section className="py-48 px-6 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20 pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-32">
              <span className="text-primary font-bold text-xs uppercase tracking-[0.5em] mb-8 block">Community Voice</span>
              <h2 className="text-5xl md:text-8xl font-extrabold mb-10 uppercase font-heading leading-none tracking-tight">What the <span className="text-primary italic">Streets</span> Say.</h2>
              <div className="p-4 glass-premium rounded-2xl border border-white/5 inline-block">
                <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] font-body">
                  Sample customer review layout — final testimonials pending Chikini Monie approval.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              {testimonials.map((t, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-dark p-16 rounded-[4rem] border border-white/10 relative flex flex-col justify-between shadow-2xl hospitality-glow group hover:border-primary/20 transition-all duration-700"
                >
                  <div className="absolute top-12 left-12 opacity-10">
                    <Star className="w-16 h-16 fill-primary text-primary" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex gap-2 text-accent mb-12">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-200 text-2xl leading-relaxed italic mb-16 font-medium group-hover:text-white transition-colors">"{t.content}"</p>
                  </div>
                  <div className="flex items-center gap-6 relative z-10">
                    <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center font-bold text-2xl text-primary border border-primary/20 font-heading">
                      {t.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-xl uppercase tracking-tight font-heading text-white">{t.name}</h4>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA - Immersive & Powerful */}
        <section className="py-64 px-6 bg-dark relative overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1543353071-873f17a7a088?q=80&w=2070&auto=format&fit=crop" 
              className="w-full h-full object-cover opacity-20 scale-110 animate-slow-zoom" 
              alt="Hospitality Ambience"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent" />
            <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
          </div>
          
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-7xl md:text-[12rem] font-extrabold text-white mb-16 tracking-tighter uppercase font-heading leading-[0.8] mix-blend-difference">
                Experience <br /> <span className="italic gold-text">Satisfaction.</span>
              </h2>
              <p className="text-gray-300 text-2xl md:text-4xl mb-24 max-w-4xl mx-auto font-medium leading-relaxed">
                Join thousands of Akure food lovers. Your next great hospitality experience is just a digital ticket away.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
                <Link
                  href="/menu"
                  className="premium-gradient px-20 py-10 rounded-[3rem] font-bold text-3xl text-white shadow-[0_30px_70px_rgba(255,102,0,0.5)] hover:scale-105 active:scale-95 transition-all inline-block uppercase tracking-wider hospitality-glow"
                >
                  Order Now
                </Link>
                <Link
                  href="/contact"
                  className="glass-premium border border-white/20 px-20 py-10 rounded-[3rem] font-bold text-3xl text-white hover:bg-white/10 transition-all inline-block uppercase tracking-wider"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
