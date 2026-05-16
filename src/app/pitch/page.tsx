
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Rocket, 
  ArrowRight,
  CheckCircle2,
  Lock,
  TrendingUp,
  Target,
  Zap,
  Clock,
  ChevronRight,
  ShieldCheck,
  Smartphone,
  Presentation,
  Shield,
  Briefcase,
  Layers,
  Activity
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PitchPage() {
  const roadmap = [
    {
      title: "Phase 1: Brand Foundation",
      status: "Operational Preview",
      items: [
        "Digital Customer Website",
        "Interactive Digital Menu",
        "WhatsApp Ordering Flow Preview",
        "Brand Story & About Page",
        "Branch Locator UI"
      ]
    },
    {
      title: "Phase 2: Operational Flow",
      status: "Implemented Demo",
      items: [
        "Cloud demo sync implemented",
        "Staff Order Management Board",
        "Kitchen Display System (KDS)",
        "Mobile-First Workflows",
        "Manager Reporting Preview"
      ]
    },
    {
      title: "Phase 3: Operational Hardening",
      status: "Next Steps",
      items: [
        "Production backend hardening",
        "Staff login & controlled database access",
        "Branch Inventory Logic Preview",
        "Advanced Analytics Hub",
        "Operational Security Pass"
      ]
    },
    {
      title: "Phase 4: Scaling & Integration",
      status: "Future Vision",
      items: [
        "Payment integration (Mgmt Approval)",
        "Delivery workflow confirmation",
        "Multi-branch Centralized Hub",
        "Automated Receipt Printing",
        "AI-driven Demand Forecasting"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-dark font-body">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-48 pb-40">
        {/* Hero Pitch - Business Proposal Style */}
        <section className="mb-40 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="w-20 h-20 bg-primary/10 rounded-[1.5rem] flex items-center justify-center text-primary mx-auto mb-12 border border-primary/20 shadow-2xl">
              <Briefcase className="w-10 h-10" />
            </div>
            <span className="text-primary font-bold text-xs uppercase tracking-[0.5em] mb-8 block font-heading">Business Proposal</span>
            <h1 className="text-6xl md:text-[8rem] font-extrabold gold-text mb-12 uppercase tracking-tighter leading-[0.85] font-heading">
              SYSTEMS FOR <br /><span className="italic text-white">GROWTH.</span>
            </h1>
            <p className="text-gray-500 text-xl md:text-2xl leading-relaxed mb-16 max-w-3xl mx-auto font-medium">
              Chikini Monie is ready for its next chapter. This proposal outlines the digital infrastructure designed to demonstrate a high-trust, scalable food system for Akure.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Link
                href="/demo"
                className="premium-gradient px-12 py-6 rounded-[2rem] text-white font-bold text-xl shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 uppercase tracking-wider"
              >
                Experience the Preview
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </motion.div>
        </section>

        {/* The Problem & Opportunity */}
        <section className="mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 border border-red-500/20">
                  <Activity className="w-5 h-5" />
                </div>
                <span className="text-red-500 font-bold text-[10px] uppercase tracking-[0.4em] font-heading">The Challenge</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-extrabold mb-10 uppercase tracking-tight leading-none font-heading">SCALING <span className="italic">THE</span> <br /><span className="text-primary italic">INTENSITY.</span></h2>
              <p className="text-gray-500 text-xl leading-relaxed mb-8 font-medium">
                Chikini Monie's popularity creates high-volume intensity. Managing this through fragmented social channels and manual coordination limits operational visibility and brand trust.
              </p>
              <div className="p-8 bg-white/[0.02] border-l-4 border-primary rounded-r-3xl">
                <p className="text-gray-400 text-lg leading-relaxed font-bold italic">
                  "The goal is to transition from a popular local spot to a world-class food system that scales with total management control."
                </p>
              </div>
            </div>
            
            <div className="space-y-8 relative">
              <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full -z-10" />
              <div className="glass-premium p-10 rounded-[3rem] border border-white/10 space-y-6 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 border border-green-500/20">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-2xl uppercase tracking-tight font-heading text-white">The Opportunity</h4>
                </div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider leading-relaxed">
                  Capture 100% of digital traffic and establish a unified, high-trust brand presence that appeals to premium customers.
                </p>
              </div>
              <div className="glass-premium p-10 rounded-[3rem] border border-white/10 space-y-6 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-2xl uppercase tracking-tight font-heading text-white">Operational Power</h4>
                </div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider leading-relaxed">
                  Designed to reduce ordering friction and make order handling faster and clearer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The System - Capabilities Preview */}
        <section className="mb-40 py-40 border-y border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white/[0.01] pointer-events-none" />
          <div className="text-center mb-24 relative z-10">
            <span className="text-accent font-bold text-xs uppercase tracking-[0.4em] mb-6 block font-heading">System Capabilities</span>
            <h2 className="text-4xl md:text-7xl font-extrabold mb-6 uppercase leading-none tracking-tight font-heading">CORE <span className="text-primary italic">INFRASTRUCTURE.</span></h2>
            <p className="text-gray-500 text-xl max-w-3xl mx-auto font-medium">Built to demonstrate how we eliminate the friction in your daily operations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10">
            {[
              { title: "Unified Ordering", desc: "A premium digital storefront that eliminates social media order chaos and verification delays." },
              { title: "Staff Clarity", desc: "Real-time boards that ensure staff always know what needs to be confirmed and served." },
              { title: "Kitchen Precision", desc: "Digital ticket prioritization to ensure faster preparation times and zero missed orders." },
              { title: "Owner Dashboard", desc: "Real-time sales and branch visibility, giving you total control from any location." },
              { title: "Brand Premium", desc: "A world-class digital presence that builds massive trust with corporate and high-end clients." },
              { title: "24/7 Readiness", desc: "Designed for the intensity of night-time surges without the stress of manual coordination." },
            ].map((sol, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-10 glass-premium rounded-[3rem] border border-white/5 group hover:border-primary/20 transition-all duration-500 shadow-xl"
              >
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight leading-none font-heading">{sol.title}</h3>
                <p className="text-gray-500 text-lg leading-relaxed font-medium">{sol.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Roadmap - Production Vision */}
        <section className="mb-40">
          <div className="text-center mb-24">
            <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-6 block font-heading">Deployment Roadmap</span>
            <h2 className="text-4xl md:text-7xl font-extrabold mb-8 uppercase leading-none tracking-tight font-heading">THE <span className="text-primary italic">PATHWAY.</span></h2>
            <p className="text-gray-500 text-xl max-w-3xl mx-auto font-medium">From high-fidelity demonstration to Akure's leading future-ready food operations platform.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {roadmap.map((phase, idx) => (
              <div key={idx} className="glass-premium p-10 rounded-[3.5rem] border border-white/5 flex flex-col h-full group hover:bg-white/[0.02] transition-all duration-500 shadow-2xl">
                <div className="mb-10 flex justify-between items-start">
                  <span className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-bold text-xl border border-primary/10 font-heading">
                    {idx + 1}
                  </span>
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full border ${
                    idx === 0 ? "bg-green-500/10 text-green-500 border-green-500/20" :
                    idx === 1 ? "bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]" :
                    "bg-gray-500/10 text-gray-500 border-gray-500/20"
                  }`}>
                    {phase.status}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-8 uppercase tracking-tight leading-tight group-hover:text-primary transition-colors font-heading text-white">{phase.title}</h3>
                <ul className="space-y-4 mb-10 flex-grow font-body">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-gray-500 text-sm font-bold leading-relaxed uppercase tracking-wider group-hover:text-gray-400 transition-colors">
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${idx === 0 || idx === 1 ? "bg-primary" : "bg-gray-700"}`} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full bg-primary/40 w-${(idx + 1) * 25}% transition-all duration-1000`} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why This Matters */}
        <section className="mb-40 py-24 glass-premium rounded-[5rem] border border-primary/10 relative overflow-hidden shadow-2xl font-body bg-primary/[0.01]">
          <div className="max-w-4xl mx-auto px-10">
            <h2 className="text-4xl md:text-7xl font-extrabold mb-10 uppercase tracking-tight leading-none font-heading text-center">WHY THIS <br /><span className="gold-text italic">MATTERS.</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
              <div className="space-y-6">
                <h4 className="text-2xl font-bold uppercase tracking-tight font-heading text-white">Protecting the Taste</h4>
                <p className="text-gray-500 leading-relaxed font-medium">By automating the logistics, we free up your team to focus 100% on what matters: the uncompromising quality of the food.</p>
              </div>
              <div className="space-y-6">
                <h4 className="text-2xl font-bold uppercase tracking-tight font-heading text-white">Scaling the Vision</h4>
                <p className="text-gray-500 leading-relaxed font-medium">This infrastructure allows you to open new branches with a "plug-and-play" digital setup, maintaining brand standards everywhere.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Safety & Compliance Notice */}
        <div className="mt-32 glass-premium p-12 rounded-[3.5rem] border border-primary/20 max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-center text-center md:text-left font-body">
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary shrink-0 border border-primary/20">
            <Shield className="w-10 h-10" />
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] mb-4">Strategic Presentation Disclaimer</h4>
            <div className="space-y-4 text-sm text-gray-500 leading-relaxed font-bold">
              <p>This business proposal is designed to demonstrate future capabilities for Chikini Monie.</p>
              <p>Roadmap phases and production deployment are subject to final management confirmation and business process alignment.</p>
              <p>No real-world financial commitments or live operational claims are made in this preview session.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
