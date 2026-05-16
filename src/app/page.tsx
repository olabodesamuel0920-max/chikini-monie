
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
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop"
              alt="Premium Food"
              className="w-full h-full object-cover scale-105 animate-slow-zoom"
            />
            <div className="absolute bottom-10 right-10 z-20">
              <span className="text-[10px] text-white/20 uppercase tracking-[0.5em] font-black">Official Media Pending Confirmation</span>
            </div>
          </div>

          <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
                Akure's 24/7 Food Spot
              </span>
              <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-tight">
                Big enjoyment with <br />
                <span className="gold-text">small money.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                A 24/7 food experience built for cravings, quick meals, and unforgettable taste. Authentic local meals meets fast food excellence.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/menu"
                  className="premium-gradient w-full sm:w-auto px-10 py-5 rounded-2xl text-white font-bold text-lg shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  Start Your Order
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/branches"
                  className="glass w-full sm:w-auto px-10 py-5 rounded-2xl text-white font-bold text-lg hover:bg-white/10 transition-all border border-white/10"
                >
                  Find Branch
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-8 text-xs font-medium uppercase tracking-widest text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              24/7 Delivery
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Verified Taste
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Fast Prep
            </div>
          </div>
        </section>

        {/* Popular Categories Placeholder / Navigation */}
        <section className="py-24 px-4 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-5xl font-black mb-4">Crave it. Get it.</h2>
                <p className="text-gray-400">Our most requested satisfaction boosters.</p>
              </div>
              <Link href="/menu" className="text-primary font-bold flex items-center gap-2 hover:underline hidden sm:flex">
                View full menu <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {popularItems.slice(0, 3).map((item) => (
                <FoodCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* Why Chikini Monie */}
        <section className="py-24 px-4 bg-dark relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] rounded-full -mr-20" />
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
                  Why Akure <span className="text-primary">Loves Us.</span>
                </h2>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-14 h-14 shrink-0 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <Zap className="text-primary w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-2">Speed that kills hunger.</h4>
                      <p className="text-gray-400">We don't play with your time. Orders confirmed in seconds, ready in minutes.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-14 h-14 shrink-0 bg-accent/10 rounded-2xl flex items-center justify-center">
                      <UtensilsCrossed className="text-accent w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-2">Quality for everyone.</h4>
                      <p className="text-gray-400">From students to CEOs, we serve premium meals at prices that make sense.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-14 h-14 shrink-0 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                      <Clock className="text-white w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-2">24/7 Food Hub.</h4>
                      <p className="text-gray-400">Midnight cravings? Early morning breakfast? We are always awake for you.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 premium-gradient blur-[100px] opacity-20" />
                <img
                  src="https://images.unsplash.com/photo-1594998893017-36147cbcae05?auto=format&fit=crop&q=80&w=1000"
                  alt="Delicious Food"
                  className="relative z-10 rounded-3xl shadow-2xl border border-white/10 rotate-3 hover:rotate-0 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Abula Backyard Sister Brand */}
        <section className="py-24 px-4 bg-black border-y border-white/5">
          <div className="max-w-7xl mx-auto bg-gradient-to-r from-primary/20 to-black p-12 rounded-[3rem] border border-primary/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-20">
              <UtensilsCrossed className="w-40 h-40" />
            </div>
            <div className="relative z-10 md:max-w-2xl">
              <span className="text-primary font-bold text-sm uppercase tracking-widest mb-4 block">Sister Concept</span>
              <h2 className="text-3xl md:text-5xl font-black mb-6">Abula Backyard</h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Experience authentic local flavors at our sister brand, Abula Backyard. The traditional taste of Akure, served with premium hospitality.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 font-bold text-white hover:text-primary transition-colors">
                Learn more about our heritage <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Demo Story Workflow */}
        <section className="py-24 px-4 bg-dark border-b border-white/5 relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 hidden lg:block" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-4 block">The Digital Workflow</span>
              <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase italic">From Craving to <span className="text-primary">Completion.</span></h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Experience the full digital lifecycle of a Chikini Monie order.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Browse & Order", step: "01", desc: "Customer chooses their craving from the interactive digital menu.", icon: Smartphone },
                { title: "Staff Confirmation", step: "02", desc: "Order appears instantly on the staff board for verification.", icon: LayoutDashboard },
                { title: "Kitchen Prep", step: "03", desc: "Kitchen receives the digital ticket and begins preparation.", icon: ChefHat },
                { title: "Manager Intel", step: "04", desc: "Owner tracks the sale and performance in real-time.", icon: BarChart3 },
              ].map((item, idx) => (
                <div key={idx} className="glass p-10 rounded-[3rem] border border-white/10 relative hover:bg-black transition-colors group">
                  <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="absolute top-10 right-10 text-4xl font-black text-white/5">{item.step}</span>
                  <h3 className="text-xl font-black italic mb-4 uppercase">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link
                href="/demo"
                className="bg-white text-black px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all inline-flex items-center gap-2 shadow-2xl shadow-white/10"
              >
                Open Demo Command Center
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Branches */}
        <section className="py-24 px-4 bg-dark">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black mb-4">Always <span className="gold-text">Nearby.</span></h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Pick up your order or dine with us at any of our strategically located branches across Akure.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {branches.map((branch) => (
                <BranchCard key={branch.id} branch={branch} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 px-4 bg-black overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-16 text-center">What the <span className="text-primary">Streets</span> Say.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass p-8 rounded-3xl border border-white/5 relative"
                >
                  <div className="flex gap-1 text-accent mb-6">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-8 italic">"{t.content}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold">
                      {t.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold">{t.name}</h4>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-4 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter">
              Ready for big <br /> enjoyment?
            </h2>
            <p className="text-white/80 text-xl mb-12 max-w-xl mx-auto">
              Join thousands of Akure food lovers today. Your cravings don't have to wait.
            </p>
            <Link
              href="/menu"
              className="bg-white text-primary px-12 py-6 rounded-2xl font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all inline-block"
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
