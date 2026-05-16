
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
  BarChart3,
  Globe,
  Award,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PitchPage() {
  const phases = [
    {
      title: "Phase 1: Brand Foundation",
      status: "Operational / Demo Ready",
      items: [
        "Digital Customer Website",
        "Interactive Digital Menu",
        "WhatsApp Ordering Flow",
        "Brand Story & About Page",
        "Branch Locator UI"
      ]
    },
    {
      title: "Phase 2: Operational Flow",
      status: "Implemented",
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
        "Staff login and controlled database access",
        "Branch Inventory Logic",
        "Advanced Analytics Hub",
        "Operational Security Pass"
      ]
    },
    {
      title: "Phase 4: Scaling & Integration",
      status: "Future Vision",
      items: [
        "Payment integration after management approval",
        "Delivery workflow after business process confirmation",
        "Multi-branch Centralized Hub",
        "Automated Receipt Printing",
        "AI-driven Demand Forecasting"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-dark font-body selection:bg-primary/30">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-48 pb-64">
        {/* Hero Pitch - Executive High Impact */}
        <section className="mb-64 text-center max-w-6xl mx-auto relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[200px] rounded-full pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-[0.5em] mb-12 backdrop-blur-3xl hospitality-glow">
              <Presentation className="w-5 h-5" />
              Strategic Growth Deck
            </div>
            <h1 className="text-6xl md:text-[9.5rem] font-extrabold gold-text mb-12 uppercase tracking-tighter leading-[0.85] font-heading">
              THE DIGITAL <br /><span className="italic text-white">UPGRADE.</span>
            </h1>
            <p className="text-gray-400 text-2xl md:text-3xl leading-relaxed mb-16 max-w-4xl mx-auto font-medium">
              Chikini Monie has the flavor Akure loves. Now, we build the digital infrastructure to handle 24/7 high-trust operations at scale.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
              <Link
                href="/demo"
                className="premium-gradient px-16 py-8 rounded-[2.5rem] text-white font-bold text-2xl shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-4 uppercase tracking-widest hospitality-glow"
              >
                Experience Infrastructure
                <ArrowRight className="w-7 h-7" />
              </Link>
              <Link
                href="/contact"
                className="glass-premium border border-white/20 px-16 py-8 rounded-[2.5rem] font-bold text-2xl text-white hover:bg-white/10 transition-all uppercase tracking-widest"
              >
                Discuss Deployment
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Executive Summary - Modern Deck Style */}
        <section className="mb-64">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-bold uppercase tracking-[0.4em] mb-10 backdrop-blur-3xl">
                <Target className="w-4 h-4" />
                Strategic Context
              </div>
              <h2 className="text-5xl md:text-[7.5rem] font-extrabold mb-10 uppercase tracking-tighter leading-none font-heading text-white">FROM <span className="italic">SOCIAL</span> <br /><span className="gold-text italic">TO SCALABLE.</span></h2>
              <div className="space-y-10 text-gray-400 text-2xl leading-relaxed font-medium">
                <p>
                  Chikini Monie has built incredible momentum. But managing high-volume 24/7 cravings through fragmented social channels limits growth and dilutes data visibility.
                </p>
                <p>
                  By establishing an integrated digital hub, Chikini Monie moves from a popular local spot to a high-end food system that scales across branches with total operational control.
                </p>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 relative">
              <div className="absolute inset-0 bg-primary/10 blur-[150px] rounded-full -z-10" />
              <motion.div 
                whileHover={{ y: -10 }}
                className="glass-dark p-12 rounded-[4rem] border border-white/10 space-y-8 shadow-[0_40px_80px_rgba(0,0,0,0.4)] hospitality-glow"
              >
                <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 border border-green-500/20 shadow-2xl">
                  <TrendingUp className="w-9 h-9" />
                </div>
                <h4 className="font-bold text-3xl uppercase tracking-tight font-heading text-white">Growth Potential</h4>
                <p className="text-gray-500 text-lg font-bold leading-relaxed">Capture 100% of digital traffic with a unified, high-trust brand portal.</p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -10 }}
                className="glass-dark p-12 rounded-[4rem] border border-white/10 space-y-8 shadow-[0_40px_80px_rgba(0,0,0,0.4)] sm:mt-16 hospitality-glow"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20 shadow-2xl">
                  <Zap className="w-9 h-9" />
                </div>
                <h4 className="font-bold text-3xl uppercase tracking-tight font-heading text-white">Efficiency</h4>
                <p className="text-gray-500 text-lg font-bold leading-relaxed">Reduce manual order friction by up to 60% through digital automation.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Business Logic - The Solver Grid */}
        <section className="mb-64 py-48 bg-dark relative overflow-hidden rounded-[5rem] border border-white/5">
          <div className="absolute top-0 left-0 w-full h-full bg-white/[0.01] pointer-events-none" />
          <div className="max-w-5xl mx-auto text-center mb-32 relative z-10 px-6">
            <span className="text-primary font-bold text-xs uppercase tracking-[0.5em] mb-8 block">Operational Hardening</span>
            <h2 className="text-5xl md:text-[8rem] font-extrabold mb-10 uppercase leading-none tracking-tighter font-heading text-white">WHAT WE <span className="text-primary italic">SOLVE.</span></h2>
            <p className="text-gray-400 text-2xl max-w-3xl mx-auto font-medium">Eliminating the friction between Akure's cravings and your kitchen's capacity.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-6 relative z-10 max-w-7xl mx-auto">
            {[
              { title: "Unified Ordering", desc: "Customers browse the full menu and order directly, eliminating WhatsApp chaos and order errors.", icon: Smartphone },
              { title: "Staff Visibility", desc: "Staff boards provide total clarity on every pending, preparing, and completed order in real-time.", icon: LayoutDashboard },
              { title: "Kitchen Precision", desc: "Digital tickets prioritize kitchen workflow, ensuring faster preparation and zero missed orders.", icon: ChefHat },
              { title: "Owner Oversight", desc: "Track sales, branch performance, and customer trends from any device, anywhere in the world.", icon: BarChart3 },
              { title: "Brand Authority", desc: "A world-class digital presence builds massive trust with premium customers and corporate clients.", icon: Award },
              { title: "24/7 Readiness", desc: "A system built for the night—handles late-night surges without manual coordination stress.", icon: Moon },
            ].map((sol, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-16 glass-dark rounded-[4rem] border border-white/5 group hover:border-primary/40 transition-all duration-700 hospitality-glow shadow-2xl"
              >
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-primary mb-10 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500 shadow-inner">
                  <sol.icon className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold mb-6 uppercase tracking-tight leading-none font-heading text-white">{sol.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed font-medium">{sol.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Roadmap - Executive Visualization */}
        <section className="mb-64">
          <div className="text-center mb-32">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-bold uppercase tracking-[0.4em] mb-10 backdrop-blur-3xl">
              <Globe className="w-4 h-4" />
              Strategic Deployment
            </div>
            <h2 className="text-5xl md:text-[9rem] font-extrabold mb-10 uppercase leading-none tracking-tighter font-heading text-white">THE <span className="gold-text italic">ROADMAP.</span></h2>
            <p className="text-gray-400 text-2xl max-w-4xl mx-auto font-medium">From breathtaking prototype to Akure's leading food enterprise infrastructure.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {phases.map((phase, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -15 }}
                className="glass-dark p-12 rounded-[4.5rem] border border-white/10 flex flex-col h-full group hover:bg-black/60 transition-all duration-700 shadow-[0_40px_100px_rgba(0,0,0,0.5)] hospitality-glow relative"
              >
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-dark border border-white/10 rounded-full flex items-center justify-center text-primary font-bold text-2xl shadow-2xl font-heading">
                  {idx + 1}
                </div>
                
                <div className="mb-12">
                  <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-5 py-2 rounded-full border ${
                    idx === 0 ? "bg-green-500/10 text-green-500 border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.3)]" :
                    idx === 1 ? "bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.2)]" :
                    "bg-gray-500/10 text-gray-500 border-gray-500/20"
                  }`}>
                    {phase.status}
                  </span>
                </div>
                
                <h3 className="text-3xl font-extrabold mb-10 uppercase tracking-tight leading-tight group-hover:text-primary transition-colors font-heading text-white">{phase.title}</h3>
                
                <ul className="space-y-6 mb-12 flex-grow">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-gray-500 text-[13px] font-bold leading-relaxed uppercase tracking-widest group-hover:text-gray-300 transition-colors">
                      <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${idx === 0 || idx === 1 ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" : "bg-gray-700"}`} />
                      {item}
                    </li>
                  ))}
                </ul>
                
                <div className="mt-auto pt-8 border-t border-white/5">
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden shadow-inner">
                    <div className={`h-full bg-primary/40 w-${(idx + 1) * 25}% transition-all duration-2000 ease-out`} />
                  </div>
                  <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-4 text-right">
                    {(idx + 1) * 25}% System Integration
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Executive Closing - Massive High Trust Section */}
        <section className="text-center max-w-6xl mx-auto py-48 glass-dark rounded-[6rem] border border-primary/20 shadow-[0_80px_200px_rgba(0,0,0,0.8)] relative overflow-hidden font-body hospitality-glow">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/[0.03] to-transparent pointer-events-none" />
          <div className="absolute bottom-0 right-0 p-32 opacity-[0.02] scale-150 rotate-12">
            <ShieldCheck className="w-[40rem] h-[40rem] text-primary" />
          </div>
          
          <div className="relative z-10 px-12">
            <div className="w-28 h-28 bg-primary/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-16 border border-primary/20 shadow-2xl hospitality-glow animate-float">
              <Lock className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-5xl md:text-[9rem] font-extrabold mb-12 uppercase tracking-tighter leading-none font-heading text-white">A SYSTEM FOR THE <br /><span className="gold-text italic">NEW ERA.</span></h2>
            <p className="text-gray-400 text-2xl md:text-4xl mb-24 leading-relaxed max-w-5xl mx-auto font-medium">
              The digital foundation is built. We are ready to transition this high-fidelity business review into the live production engine that powers Chikini Monie's next chapter of growth.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
              <Link
                href="/demo"
                className="premium-gradient px-24 py-10 rounded-[3rem] text-white font-bold text-3xl shadow-[0_30px_70px_rgba(255,102,0,0.5)] hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-6 uppercase tracking-widest hospitality-glow"
              >
                Explore Infrastructure
                <ArrowRight className="w-8 h-8" />
              </Link>
              <Link
                href="/contact"
                className="glass-premium border border-white/20 px-24 py-10 rounded-[3rem] font-bold text-3xl text-white hover:bg-white/10 transition-all inline-block uppercase tracking-widest"
              >
                Discuss Deployment
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

import { LayoutDashboard, ChefHat, Moon } from "lucide-react";
