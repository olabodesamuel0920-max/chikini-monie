
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Rocket, 
  Smartphone, 
  Globe, 
  Database, 
  LayoutDashboard, 
  ChefHat, 
  BarChart3, 
  ArrowRight,
  CheckCircle2,
  Lock,
  Layers,
  TrendingUp,
  Target,
  Zap,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PitchPage() {
  const phases = [
    {
      title: "Phase 1: Brand Foundation",
      status: "Built / Demo Ready",
      items: [
        "Official Customer Website",
        "Interactive Digital Menu",
        "WhatsApp Ordering Flow",
        "Brand Story & About Page",
        "Branch Locator UI"
      ]
    },
    {
      title: "Phase 2: Operational Flow",
      status: "In Development",
      items: [
        "Staff Order Management Board",
        "Kitchen Display System (KDS)",
        "Local Persistence (localStorage)",
        "Mobile-First Workflows",
        "Manager Reporting Preview"
      ]
    },
    {
      title: "Phase 3: Scale & Integration",
      status: "Next Steps",
      items: [
        "Real-time Cloud Database",
        "Secure Online Payments",
        "Live Delivery Tracking",
        "Inventory Management",
        "Advanced Branch Analytics"
      ]
    },
    {
      title: "Phase 4: Enterprise Operations",
      status: "Future Vision",
      items: [
        "Multi-branch Centralized Hub",
        "Automated Receipt Printing",
        "Loyalty & Reward Programs",
        "AI-driven Demand Forecasting",
        "Enterprise API Integrations"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 pt-32 pb-24">
        {/* Hero Pitch */}
        <section className="mb-32 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto mb-10 border border-primary/20"
          >
            <Target className="w-12 h-12" />
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black italic gold-text mb-8 uppercase leading-tight">
            THE DIGITAL <br />UPGRADE.
          </h1>
          <p className="text-gray-400 text-xl leading-relaxed mb-12">
            Chikini Monie already has the momentum and the taste Akure loves. Now it's time to build the official digital engine that powers 24/7 operations and future growth.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/demo"
              className="premium-gradient px-12 py-5 rounded-2xl text-white font-bold text-lg shadow-2xl shadow-primary/30 hover:scale-105 transition-all flex items-center gap-2"
            >
              Enter Demo Center
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* The Opportunity */}
        <section className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-accent font-black text-xs uppercase tracking-[0.4em] mb-4 block">The Opportunity</span>
              <h2 className="text-3xl md:text-5xl font-black italic mb-8 uppercase">FROM SOCIAL TO <br /><span className="text-primary">SCALABLE.</span></h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Chikini Monie has built a strong social presence and branch momentum. However, managing high-volume 24/7 orders through WhatsApp alone has limitations in tracking, prioritization, and professional branding.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                By establishing an official digital home and an integrated operating layer, Chikini Monie moves from a "popular spot" to a "premium food system" that can scale to multiple branches with total control.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass p-8 rounded-3xl border border-white/5 space-y-4">
                <TrendingUp className="text-green-500 w-8 h-8" />
                <h4 className="font-bold">Growth Potential</h4>
                <p className="text-xs text-gray-500">Capture 100% of digital traffic with a professional storefront.</p>
              </div>
              <div className="glass p-8 rounded-3xl border border-white/5 space-y-4 mt-8">
                <Zap className="text-primary w-8 h-8" />
                <h4 className="font-bold">Efficiency</h4>
                <p className="text-xs text-gray-500">Reduce manual order processing time by up to 60%.</p>
              </div>
            </div>
          </div>
        </section>

        {/* What This System Solves */}
        <section className="mb-32 py-24 border-y border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase italic">WHAT WE <span className="text-primary">SOLVE.</span></h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Bridging the gap between cravings and completion.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Unified Ordering", desc: "Customers view the full menu and order directly, reducing chat noise and order errors." },
              { title: "Staff Visibility", desc: "Front-of-house staff see exactly what's pending, preparing, and ready in one view." },
              { title: "Kitchen Precision", desc: "The kitchen gets a prioritized digital queue, eliminating paper slips and confusion." },
              { title: "Owner Oversight", desc: "Understand sales, branch performance, and trends without being physically present." },
              { title: "Brand Authority", desc: "An official platform builds high trust, especially for new customers and large orders." },
              { title: "24/7 Readiness", desc: "A system that never sleeps, perfectly built for Akure's late-night food culture." },
            ].map((sol, idx) => (
              <div key={idx} className="p-8 border-l-2 border-primary/20 hover:border-primary transition-all">
                <h3 className="text-xl font-black italic mb-3 uppercase">{sol.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{sol.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 24/7 Context */}
        <section className="mb-32">
          <div className="glass rounded-[3rem] p-12 md:p-20 border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div className="space-y-8">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-4xl md:text-6xl font-black italic uppercase leading-tight">
                  BUILT FOR <br />THE <span className="gold-text">NIGHT.</span>
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary w-5 h-5 shrink-0 mt-1" />
                    <p className="text-gray-300 font-medium">Handles late-night student surges effortlessly.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary w-5 h-5 shrink-0 mt-1" />
                    <p className="text-gray-300 font-medium">Optimizes takeaway and delivery coordination.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary w-5 h-5 shrink-0 mt-1" />
                    <p className="text-gray-300 font-medium">Syncs multi-branch operations in real-time.</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop"
                  alt="Late Night Food"
                  className="rounded-3xl shadow-2xl rotate-2 grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="mb-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 italic uppercase">THE <span className="text-primary">ROADMAP.</span></h2>
            <p className="text-gray-500 max-w-2xl mx-auto">From breathtaking prototype to Akure's leading food enterprise.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {phases.map((phase, idx) => (
              <div key={idx} className="glass p-8 rounded-[2.5rem] border border-white/10 flex flex-col h-full hover:bg-black/40 transition-colors">
                <div className="mb-6 flex justify-between items-start">
                  <span className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary font-black">
                    {idx + 1}
                  </span>
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full border ${
                    idx === 0 ? "bg-green-500/10 text-green-500 border-green-500/20" :
                    idx === 1 ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                    "bg-gray-500/10 text-gray-500 border-gray-500/20"
                  }`}>
                    {phase.status}
                  </span>
                </div>
                <h3 className="text-xl font-black italic mb-6 uppercase tracking-tighter">{phase.title}</h3>
                <ul className="space-y-3 mb-8 flex-grow">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-500 text-[11px] font-medium leading-tight">
                      <div className={`w-1 h-1 rounded-full ${idx === 0 ? "bg-green-500" : "bg-gray-700"}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="text-center max-w-4xl mx-auto py-20">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-12 border border-primary/30">
            <Lock className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-3xl md:text-6xl font-black italic mb-8 uppercase">A SYSTEM FOR THE <br /><span className="gold-text">NEW ERA.</span></h2>
          <p className="text-gray-500 text-lg mb-12 leading-relaxed">
            The foundation is built. We are ready to transition this preview into a live, production-grade system that powers the next chapter of the Chikini Monie story.
          </p>
          <Link
            href="/demo"
            className="premium-gradient px-12 py-6 rounded-2xl text-white font-black text-xl hover:scale-105 transition-all inline-block shadow-2xl shadow-primary/30"
          >
            Explore the Demo System
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
