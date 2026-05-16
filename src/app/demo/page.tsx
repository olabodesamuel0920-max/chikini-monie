
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
  Presentation,
  Cloud,
  ChevronRight,
  ShieldCheck,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DemoCommandCenter() {
  const journey = [
    {
      id: "01",
      role: "Customer",
      title: "Digital Front",
      desc: "Experience the premium storefront where the brand comes to life.",
      links: [
        { name: "Home Experience", route: "/" },
        { name: "Interactive Menu", route: "/menu" }
      ],
      icon: Utensils,
      value: "Professionalizes brand presence beyond social media."
    },
    {
      id: "02",
      role: "Operations",
      title: "Active Ticket",
      desc: "Place a demo order and see it flow through the system in real-time.",
      links: [
        { name: "Demo Checkout", route: "/order" },
        { name: "Staff Board", route: "/staff" }
      ],
      icon: Smartphone,
      value: "Automates the transition from craving to confirmed sale."
    },
    {
      id: "03",
      role: "Kitchen",
      title: "Fulfillment",
      desc: "Manage the high-intensity preparation queue with digital clarity.",
      links: [
        { name: "Kitchen Display", route: "/kitchen" }
      ],
      icon: ChefHat,
      value: "Optimizes kitchen workflow and reduces prep errors."
    },
    {
      id: "04",
      role: "Owner",
      title: "Intelligence",
      desc: "Track every naira and craving with live executive analytics.",
      links: [
        { name: "Manager Dashboard", route: "/manager" },
        { name: "Growth Roadmap", route: "/pitch" }
      ],
      icon: BarChart3,
      value: "Empowers the owner with data-driven decision making."
    }
  ];

  return (
    <div className="min-h-screen bg-dark font-body selection:bg-primary/30">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-48 pb-64">
        {/* Cinematic Header */}
        <section className="mb-48 text-center max-w-6xl mx-auto relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[200px] rounded-full pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-[0.5em] mb-12 backdrop-blur-3xl hospitality-glow">
              <Zap className="w-5 h-5 animate-pulse" />
              The Command Center
            </div>
            <h1 className="text-6xl md:text-[9.5rem] font-extrabold gold-text mb-12 uppercase tracking-tighter leading-[0.85] font-heading">
              FROM <span className="italic">SOCIAL</span> <br /><span className="italic text-white">TO SYSTEMS.</span>
            </h1>
            <p className="text-gray-400 text-2xl md:text-3xl leading-relaxed max-w-4xl mx-auto font-medium mb-16">
              Explore the high-fidelity digital ecosystem engineered for Akure's finest hospitality brand. From first craving to final fulfillment.
            </p>
            <div className="flex items-center justify-center gap-6 py-6 border-y border-white/5 max-w-2xl mx-auto">
              <Cloud className="text-primary w-6 h-6" />
              <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-gray-500">Supabase Realtime Cloud Sync Active</span>
            </div>
          </motion.div>
        </section>

        {/* Guided Journey - Vertical Timeline Style */}
        <div className="space-y-32 relative mb-64">
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/50 via-accent/30 to-transparent hidden lg:block" />
          
          {journey.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-32 ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="flex-1 w-full">
                <div className="glass-dark p-16 rounded-[4rem] border border-white/10 relative overflow-hidden hospitality-glow group hover:border-primary/30 transition-all duration-700 shadow-2xl">
                  <div className="absolute top-0 right-0 p-12 text-8xl font-black text-white/[0.03] italic font-heading group-hover:text-primary/10 transition-colors">
                    {step.id}
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-12 group-hover:scale-110 transition-all duration-500">
                      <step.icon className="w-10 h-10" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-accent mb-4 block">{step.role} Experience</span>
                    <h3 className="text-5xl font-extrabold mb-8 uppercase tracking-tighter font-heading text-white">{step.title}</h3>
                    <p className="text-gray-400 text-xl leading-relaxed mb-12 font-medium">{step.desc}</p>
                    
                    <div className="p-8 bg-black/40 rounded-[2.5rem] border border-white/5 mb-12">
                      <div className="flex items-center gap-3 mb-4">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Operational Value</span>
                      </div>
                      <p className="text-sm text-gray-500 font-bold italic leading-relaxed">
                        "{step.value}"
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      {step.links.map((link, lidx) => (
                        <Link
                          key={lidx}
                          href={link.route}
                          className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-primary hover:border-transparent transition-all group/btn shadow-xl"
                        >
                          {link.name}
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 hidden lg:flex justify-center items-center">
                <div className="w-24 h-24 rounded-full bg-dark border-4 border-primary/20 flex items-center justify-center shadow-2xl hospitality-glow relative z-10">
                  <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Massive Vision CTA */}
        <section className="glass-dark rounded-[5rem] p-16 md:p-32 border border-primary/20 relative overflow-hidden shadow-[0_60px_150px_rgba(0,0,0,0.8)] hospitality-glow">
          <div className="absolute top-0 right-0 p-32 opacity-[0.03] scale-150 rotate-12">
            <Rocket className="w-96 h-96 text-primary" />
          </div>
          <div className="max-w-4xl relative z-10">
            <span className="text-primary font-bold text-xs uppercase tracking-[0.5em] mb-8 block">Operational Readiness</span>
            <h2 className="text-6xl md:text-[8rem] font-extrabold mb-12 uppercase tracking-tighter leading-none font-heading text-white">
              READY TO <br /><span className="gold-text italic">SCALE?</span>
            </h2>
            <p className="text-gray-300 text-2xl md:text-3xl mb-20 leading-relaxed font-medium">
              This digital ecosystem is engineered to handle the intensity of Akure's 24/7 food landscape. Move beyond fragmented social orders into a unified, high-trust system.
            </p>
            <div className="flex flex-col sm:flex-row gap-10">
              <Link
                href="/pitch"
                className="premium-gradient px-16 py-8 rounded-[2.5rem] font-bold text-2xl text-white shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all text-center uppercase tracking-widest hospitality-glow"
              >
                View Vision Roadmap
              </Link>
              <Link
                href="/contact"
                className="glass-premium border border-white/20 px-16 py-8 rounded-[2.5rem] font-bold text-2xl text-white hover:bg-white/10 transition-all text-center uppercase tracking-widest"
              >
                Request Deployment
              </Link>
            </div>
          </div>
        </section>

        {/* Technical Notice - Luxury Style */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-48 glass-dark p-16 rounded-[4rem] border border-accent/20 flex flex-col lg:flex-row items-center gap-12 text-center lg:text-left hospitality-glow-gold"
        >
          <div className="w-24 h-24 bg-accent/20 rounded-[2.5rem] flex items-center justify-center text-accent shrink-0 border border-accent/20 shadow-2xl">
            <ShieldCheck className="w-12 h-12" />
          </div>
          <div>
            <h4 className="text-3xl font-bold uppercase gold-text mb-4 font-heading tracking-tight">Technical Architecture Disclaimer</h4>
            <p className="text-gray-400 text-xl leading-relaxed max-w-5xl font-medium">
              The Chikini Monie Command Center is a high-fidelity business review prototype. 
              Operational logic—including real-time sync, kitchen queue, and executive analytics—is implemented using browser-based storage and Supabase Realtime for demonstration purposes. 
              No live financial transactions are processed in this session.
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
