
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Rocket, 
  Smartphone, 
  Utensils, 
  LayoutDashboard, 
  ChefHat, 
  BarChart3, 
  ArrowRight,
  MousePointer2,
  CheckCircle2,
  Info,
  Presentation
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DemoCommandCenter() {
  const steps = [
    {
      id: "01",
      title: "Customer Website",
      desc: "Explore the premium digital storefront where the brand comes to life.",
      route: "/",
      icon: Utensils,
      value: "Professionalizes the brand presence beyond social media."
    },
    {
      id: "02",
      title: "Digital Menu",
      desc: "Browse categories, search for cravings, and manage a real-time cart.",
      route: "/menu",
      icon: Smartphone,
      value: "Reduces ordering friction and increases average order value."
    },
    {
      id: "03",
      title: "Place Demo Order",
      desc: "Move through the checkout flow and see how orders are processed.",
      route: "/order",
      icon: MousePointer2,
      value: "Automates the transition from craving to confirmed sale."
    },
    {
      id: "04",
      title: "Staff Board",
      desc: "Manage the incoming order flow and update statuses for customers.",
      route: "/staff",
      icon: LayoutDashboard,
      value: "Gives front-of-house staff total clarity on active operations."
    },
    {
      id: "05",
      title: "Kitchen Display",
      desc: "See how the kitchen prioritizes orders based on time and type.",
      route: "/kitchen",
      icon: ChefHat,
      value: "Optimizes kitchen workflow and reduces preparation errors."
    },
    {
      id: "06",
      title: "Manager Analytics",
      desc: "Review sales performance, branch data, and growth metrics.",
      route: "/manager",
      icon: BarChart3,
      value: "Empowers the owner with data-driven decision making."
    },
    {
      id: "07",
      title: "Growth Roadmap",
      desc: "See the long-term vision for scaling Chikini Monie digitally.",
      route: "/pitch",
      icon: Presentation,
      value: "Outlines the path from prototype to real-world deployment."
    }
  ];

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-48 pb-40">
        {/* Header - More Spacing */}
        <section className="mb-32 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-[1.5rem] flex items-center justify-center text-primary border border-primary/20 shadow-2xl">
                <Rocket className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-accent">Demo Command Center</span>
            </div>
            <h1 className="text-6xl md:text-[8rem] font-black italic gold-text mb-12 uppercase tracking-tighter leading-[0.85]">
              FROM SOCIAL <br />TO SYSTEMS.
            </h1>
            <p className="text-gray-500 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto font-medium">
              A high-fidelity presentation of the Chikini Monie digital food system. From customer website to kitchen display.
            </p>
          </motion.div>
        </section>

        {/* Steps Grid - Luxurious Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-40">
          {steps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-premium p-12 rounded-[4rem] border border-white/5 flex flex-col h-full group hover:border-primary/20 transition-all duration-500 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-10">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-gray-500 group-hover:bg-primary/20 group-hover:text-primary transition-all border border-white/5">
                  <step.icon className="w-8 h-8" />
                </div>
                <span className="text-6xl font-black text-white/[0.03] group-hover:text-primary/10 transition-colors leading-none italic">{step.id}</span>
              </div>
              
              <h3 className="text-3xl font-black italic mb-6 uppercase tracking-tighter group-hover:text-white transition-colors">{step.title}</h3>
              <p className="text-gray-500 text-lg mb-10 leading-relaxed flex-grow">{step.desc}</p>
              
              <div className="mb-10 p-6 bg-primary/[0.03] rounded-3xl border border-primary/5 group-hover:bg-primary/[0.06] transition-all">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Business Value
                </p>
                <p className="text-sm text-gray-400 font-bold leading-relaxed italic">{step.value}</p>
              </div>

              <Link
                href={step.route}
                className="w-full py-6 rounded-[2rem] bg-white/5 border border-white/10 text-white font-black text-center group-hover:bg-primary group-hover:border-transparent transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-[12px] shadow-xl"
              >
                Open {step.title}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Final CTA - Premium Banner */}
        <section className="glass-premium rounded-[5rem] p-16 md:p-32 border border-primary/10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-24 opacity-[0.02] scale-150 rotate-12">
            <Rocket className="w-96 h-96 text-primary" />
          </div>
          <div className="max-w-4xl relative z-10">
            <span className="text-primary font-black text-xs uppercase tracking-[0.5em] mb-8 block">Operational Readiness</span>
            <h2 className="text-5xl md:text-[6rem] font-black italic mb-10 uppercase tracking-tighter leading-none">
              Ready to <br /><span className="text-primary">Operationalise?</span>
            </h2>
            <p className="text-gray-400 text-xl md:text-2xl mb-16 leading-relaxed font-medium">
              This digital ecosystem is engineered to handle the intensity of Akure's 24/7 food landscape. Move beyond fragmented social orders into a unified, high-trust system.
            </p>
            <div className="flex flex-col sm:flex-row gap-8">
              <Link
                href="/pitch"
                className="premium-gradient px-12 py-6 rounded-[2rem] font-black text-xl text-white shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all text-center uppercase tracking-widest"
              >
                View Vision Roadmap
              </Link>
              <Link
                href="/contact"
                className="glass-premium border border-white/10 px-12 py-6 rounded-[2rem] font-black text-xl text-white hover:bg-white/10 transition-all text-center uppercase tracking-widest"
              >
                Discuss Deployment
              </Link>
            </div>
          </div>
        </section>

        {/* Technical Notice - More Subtle */}
        <div className="mt-32 glass-premium p-12 rounded-[3.5rem] border border-white/5 max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-center text-center md:text-left">
          <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-gray-700 shrink-0 border border-white/5">
            <Info className="w-10 h-10" />
          </div>
          <div>
            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-4">Technical Architecture Disclaimer</h4>
            <p className="text-sm text-gray-600 leading-relaxed font-medium">
              The Chikini Monie Command Center is a high-fidelity business review prototype. Operational logic (real-time sync, kitchen queue, analytics) is implemented using browser-based storage and Supabase Realtime for demonstration purposes. No live payments are processed in this session.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
