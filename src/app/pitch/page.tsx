
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
  Presentation
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
    <div className="min-h-screen bg-dark">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-48 pb-40">
        {/* Hero Pitch - Massive & Impactful */}
        <section className="mb-40 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="w-20 h-20 bg-primary/10 rounded-[1.5rem] flex items-center justify-center text-primary mx-auto mb-12 border border-primary/20 shadow-2xl">
              <Target className="w-10 h-10" />
            </div>
            <h1 className="text-6xl md:text-[8rem] font-black italic gold-text mb-12 uppercase tracking-tighter leading-[0.85]">
              THE DIGITAL <br />UPGRADE.
            </h1>
            <p className="text-gray-500 text-xl md:text-2xl leading-relaxed mb-16 max-w-3xl mx-auto font-medium">
              Chikini Monie has the taste Akure loves. Now it's time to build the digital engine that powers 24/7 operations and global-scale growth.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Link
                href="/demo"
                className="premium-gradient px-12 py-6 rounded-[2rem] text-white font-black text-xl shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 uppercase tracking-widest"
              >
                Experience the Demo
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </motion.div>
        </section>

        {/* The Opportunity - Spacious Grid */}
        <section className="mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div>
              <span className="text-accent font-black text-xs uppercase tracking-[0.5em] mb-8 block">The Opportunity</span>
              <h2 className="text-4xl md:text-7xl font-black italic mb-10 uppercase tracking-tighter leading-none">FROM SOCIAL <br /><span className="text-primary">TO SCALABLE.</span></h2>
              <p className="text-gray-500 text-xl leading-relaxed mb-8 font-medium">
                Chikini Monie has built incredible momentum. But managing high-volume 24/7 orders through fragmented social channels limits growth and data visibility.
              </p>
              <p className="text-gray-500 text-xl leading-relaxed font-medium">
                By establishing an integrated digital hub, Chikini Monie moves from a popular local spot to a high-end food system that scales across branches with total operational control.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
              <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full -z-10" />
              <div className="glass-premium p-10 rounded-[3rem] border border-white/10 space-y-6 shadow-2xl">
                <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 border border-green-500/20">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <h4 className="font-black text-2xl uppercase italic tracking-tighter">Growth Potential</h4>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest leading-relaxed">Capture 100% of digital traffic with a unified, high-trust brand portal.</p>
              </div>
              <div className="glass-premium p-10 rounded-[3rem] border border-white/10 space-y-6 shadow-2xl sm:mt-12">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                  <Zap className="w-7 h-7" />
                </div>
                <h4 className="font-black text-2xl uppercase italic tracking-tighter">Operational Efficiency</h4>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest leading-relaxed">Reduce manual order friction by up to 60% through digital ticket automation.</p>
              </div>
            </div>
          </div>
        </section>

        {/* What This System Solves - Clean & Breathable */}
        <section className="mb-40 py-40 border-y border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white/[0.01] pointer-events-none" />
          <div className="text-center mb-24 relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-6 uppercase italic leading-none tracking-tighter">WHAT WE <span className="text-primary">SOLVE.</span></h2>
            <p className="text-gray-500 text-xl max-w-3xl mx-auto font-medium">Eliminating the friction between Akure's cravings and your kitchen's capacity.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10">
            {[
              { title: "Unified Ordering", desc: "Customers browse the full menu and order directly, eliminating WhatsApp chaos and order errors." },
              { title: "Staff Visibility", desc: "Staff boards provide total clarity on every pending, preparing, and completed order in real-time." },
              { title: "Kitchen Precision", desc: "Digital tickets prioritize kitchen workflow, ensuring faster preparation and zero missed orders." },
              { title: "Owner Oversight", desc: "Track sales, branch performance, and customer trends from any device, anywhere in the world." },
              { title: "Brand Authority", desc: "A world-class digital presence builds massive trust with premium customers and corporate clients." },
              { title: "24/7 Ready", desc: "A system built for the night—handles late-night surges without manual coordination stress." },
            ].map((sol, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-10 glass-premium rounded-[3rem] border border-white/5 group hover:border-primary/20 transition-all duration-500"
              >
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black italic mb-4 uppercase tracking-tighter leading-none">{sol.title}</h3>
                <p className="text-gray-500 text-lg leading-relaxed font-medium">{sol.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Roadmap - Luxurious Cards */}
        <section className="mb-40">
          <div className="text-center mb-24">
            <span className="text-primary font-black text-xs uppercase tracking-[0.5em] mb-6 block">The Vision Plan</span>
            <h2 className="text-4xl md:text-7xl font-black mb-8 uppercase italic leading-none tracking-tighter">THE <span className="text-primary">ROADMAP.</span></h2>
            <p className="text-gray-500 text-xl max-w-3xl mx-auto font-medium">From breathtaking prototype to Akure's leading food enterprise infrastructure.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {phases.map((phase, idx) => (
              <div key={idx} className="glass-premium p-10 rounded-[3.5rem] border border-white/5 flex flex-col h-full group hover:bg-white/[0.02] transition-all duration-500 shadow-2xl">
                <div className="mb-10 flex justify-between items-start">
                  <span className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black text-xl italic border border-primary/10">
                    {idx + 1}
                  </span>
                  <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border ${
                    idx === 0 ? "bg-green-500/10 text-green-500 border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.2)]" :
                    idx === 1 ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                    "bg-gray-500/10 text-gray-500 border-gray-500/20"
                  }`}>
                    {phase.status}
                  </span>
                </div>
                <h3 className="text-2xl font-black italic mb-8 uppercase tracking-tighter leading-tight group-hover:text-primary transition-colors">{phase.title}</h3>
                <ul className="space-y-4 mb-10 flex-grow">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-gray-500 text-sm font-bold leading-relaxed uppercase tracking-widest group-hover:text-gray-400 transition-colors">
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${idx === 0 || idx === 1 ? "bg-green-500" : "bg-gray-700"}`} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full bg-primary/30 w-${(idx + 1) * 25}% transition-all duration-1000`} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Closing - Final High Trust CTA */}
        <section className="text-center max-w-5xl mx-auto py-32 glass-premium rounded-[5rem] border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute bottom-0 right-0 p-12 opacity-[0.02] scale-150">
            <Lock className="w-64 h-64 text-primary" />
          </div>
          <div className="w-24 h-24 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto mb-12 border border-primary/20 shadow-2xl">
            <Lock className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-4xl md:text-[6rem] font-black italic mb-10 uppercase tracking-tighter leading-none">A SYSTEM FOR THE <br /><span className="gold-text">NEW ERA.</span></h2>
          <p className="text-gray-500 text-xl md:text-2xl mb-16 leading-relaxed max-w-3xl mx-auto font-medium">
            The foundation is built. We are ready to transition this high-fidelity preview into the live production engine that powers Chikini Monie's next chapter.
          </p>
          <Link
            href="/demo"
            className="premium-gradient px-16 py-8 rounded-[2.5rem] text-white font-black text-2xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-4 shadow-[0_20px_50px_rgba(255,102,0,0.3)] uppercase tracking-widest"
          >
            Explore the Infrastructure
            <ArrowRight className="w-7 h-7" />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
