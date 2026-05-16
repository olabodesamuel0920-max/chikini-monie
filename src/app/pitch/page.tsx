
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
  Layers
} from "lucide-react";
import { motion } from "framer-motion";

export default function PitchPage() {
  const phases = [
    {
      title: "Phase 1: Brand Launch",
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
            <Rocket className="w-12 h-12" />
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black italic gold-text mb-8 uppercase leading-tight">
            DIGITAL <br />GROWTH SYSTEM.
          </h1>
          <p className="text-gray-400 text-xl leading-relaxed mb-12">
            Chikini Monie is more than just a restaurant. It's a high-performance digital ecosystem designed to scale food satisfaction across Akure.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="premium-gradient px-10 py-5 rounded-2xl text-white font-bold text-lg shadow-2xl shadow-primary/30 hover:scale-105 transition-all">
              Request Full Demo
            </button>
            <button className="glass px-10 py-5 rounded-2xl text-white font-bold text-lg border border-white/10 hover:bg-white/5 transition-all">
              View Roadmap
            </button>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: "Official Website", desc: "A premium digital storefront that builds trust and makes ordering a breeze." },
              { icon: Smartphone, title: "Mobile Ordering", desc: "Optimized for the mobile generation. WhatsApp integration for friction-less orders." },
              { icon: LayoutDashboard, title: "Staff Board", desc: "Clean, efficient order management for front-of-house teams." },
              { icon: ChefHat, title: "Kitchen Display", desc: "Real-time kitchen queue to reduce wait times and eliminate errors." },
              { icon: BarChart3, title: "Manager Intel", desc: "Data-driven insights to monitor sales, branch performance, and trends." },
              { icon: Database, title: "Demo Engine", desc: "A fully working prototype using local storage to demonstrate real-world usage." },
            ].map((feature, idx) => (
              <div key={idx} className="glass p-10 rounded-[3rem] border border-white/5 hover:border-primary/20 transition-all group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-primary/20 group-hover:text-primary mb-8 transition-all">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4 italic uppercase tracking-tight">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section className="mb-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 italic uppercase">THE ROAD <span className="text-primary">AHEAD.</span></h2>
            <p className="text-gray-500 max-w-2xl mx-auto">From breathtaking prototype to Akure's leading food platform.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 hidden lg:block z-0" />
            
            {phases.map((phase, idx) => (
              <div key={idx} className="glass p-10 rounded-[3rem] border border-white/10 relative z-10 flex flex-col h-full hover:bg-black/40 transition-colors">
                <div className="mb-6 flex justify-between items-start">
                  <span className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-xl">
                    {idx + 1}
                  </span>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
                    idx === 0 ? "bg-green-500/10 text-green-500 border-green-500/20" :
                    idx === 1 ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                    "bg-gray-500/10 text-gray-500 border-gray-500/20"
                  }`}>
                    {phase.status}
                  </span>
                </div>
                <h3 className="text-2xl font-black italic mb-8 uppercase tracking-tighter">{phase.title}</h3>
                <ul className="space-y-4 mb-10 flex-grow">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-400 text-sm">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${idx === 0 ? "text-green-500" : "text-gray-600"}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="glass rounded-[4rem] p-12 md:p-20 border border-primary/20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white mx-auto mb-10 shadow-2xl shadow-primary/40">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-3xl md:text-6xl font-black italic mb-8 uppercase">READY FOR <br />DEPLOYMENT.</h2>
            <p className="text-gray-400 text-lg mb-12">
              The foundational system is ready. We are awaiting final menu, branch, and workflow confirmation to transition from preview to production.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="premium-gradient px-12 py-6 rounded-2xl text-white font-black text-xl hover:scale-105 transition-all">
                APPROVE PROJECT
              </button>
              <button className="bg-white/5 border border-white/10 px-12 py-6 rounded-2xl text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                <Layers className="w-5 h-5" />
                Technical Docs
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
