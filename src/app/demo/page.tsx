
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
  ShieldCheck,
  Zap,
  Target
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DemoCommandCenter() {
  const demoPath = [
    {
      id: "01",
      title: "Public Hub",
      desc: "The digital storefront where brand trust is established.",
      route: "/",
      icon: Utensils,
      value: "Customer Convenience",
      detail: "Professionalizes the brand presence beyond social media."
    },
    {
      id: "02",
      title: "Place Demo Order",
      desc: "Simulate a customer order flow through the digital menu.",
      route: "/menu",
      icon: MousePointer2,
      value: "Order Friction Reduction",
      detail: "Automates the transition from craving to confirmed sale."
    },
    {
      id: "03",
      title: "Staff Board",
      desc: "Real-time order verification and status management.",
      route: "/staff",
      icon: LayoutDashboard,
      value: "Faster Order Confirmation",
      detail: "Gives front-of-house staff total clarity on active operations."
    },
    {
      id: "04",
      title: "Kitchen Display",
      desc: "Digital ticket queue for optimized preparation flow.",
      route: "/kitchen",
      icon: ChefHat,
      value: "Kitchen Visibility",
      detail: "Optimizes workflow and reduces preparation errors."
    },
    {
      id: "05",
      title: "Manager Analytics",
      desc: "High-level performance tracking and business reporting.",
      route: "/manager",
      icon: BarChart3,
      value: "Owner Decision-Making",
      detail: "Empowers the owner with data-driven decision making."
    }
  ];

  return (
    <div className="min-h-screen bg-dark font-body">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-48 pb-40">
        {/* Header - Guided Presentation Feel */}
        <section className="mb-32 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-[1.5rem] flex items-center justify-center text-primary border border-primary/20 shadow-2xl">
                <Presentation className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Business Presentation Hub</span>
            </div>
            <h1 className="text-6xl md:text-[8rem] font-extrabold gold-text mb-12 uppercase tracking-tighter leading-[0.85] font-heading">
              GUIDED <span className="italic">SYSTEM</span> <br /><span className="italic text-white">WALKTHROUGH.</span>
            </h1>
            <p className="text-gray-500 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto font-medium">
              Explore how the Chikini Monie digital engine connects every part of your business—from a student's late-night craving to your executive dashboard.
            </p>
          </motion.div>
        </section>

        {/* Guided Flow Section - Best Demo Path */}
        <section className="mb-40">
          <div className="flex items-center gap-6 mb-16">
            <div className="h-[1px] flex-grow bg-white/5" />
            <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.5em] whitespace-nowrap">The Best Demo Path</h2>
            <div className="h-[1px] flex-grow bg-white/5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-20">
            {demoPath.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative"
              >
                <Link href={step.route} className="block">
                  <div className="glass-premium p-10 rounded-[3rem] border border-white/5 flex flex-col h-full group-hover:border-primary/30 transition-all duration-500 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                      <step.icon className="w-16 h-16" />
                    </div>
                    
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-gray-500 group-hover:bg-primary/20 group-hover:text-primary transition-all mb-8 border border-white/5 relative z-10">
                      <step.icon className="w-7 h-7" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 uppercase tracking-tight text-white font-heading relative z-10">{step.title}</h3>
                    
                    <div className="mt-auto pt-6 border-t border-white/5 relative z-10">
                      <p className="text-[9px] font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Target className="w-3 h-3" />
                        {step.value}
                      </p>
                      <p className="text-[11px] text-gray-500 font-bold leading-relaxed">{step.detail}</p>
                    </div>

                    <div className="absolute bottom-4 right-8 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                      <ArrowRight className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </Link>
                {idx < demoPath.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-20 opacity-20">
                    <ArrowRight className="w-8 h-8 text-white" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Business Value Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-40 font-body">
          <div className="glass-premium p-16 rounded-[4rem] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-16 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
              <Zap className="w-64 h-64 text-primary" />
            </div>
            <div className="relative z-10">
              <span className="text-primary font-bold text-[10px] uppercase tracking-[0.4em] mb-8 block">Operational Standard</span>
              <h3 className="text-4xl font-bold mb-8 uppercase tracking-tight text-white font-heading">Future Production Readiness</h3>
              <p className="text-gray-500 text-lg leading-relaxed font-medium mb-10">
                While this is a preview session, the architecture is designed to scale. The transition to a live production backend involves hardening existing logic, not rebuilding it.
              </p>
              <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-t border-white/5 pt-8">
                <ShieldCheck className="w-5 h-5 text-primary" />
                Scalable Core Infrastructure
              </div>
            </div>
          </div>

          <div className="glass-premium p-16 rounded-[4rem] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-16 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
              <BarChart3 className="w-64 h-64 text-accent" />
            </div>
            <div className="relative z-10">
              <span className="text-accent font-bold text-[10px] uppercase tracking-[0.4em] mb-8 block">Strategic Vision</span>
              <h3 className="text-4xl font-bold mb-8 uppercase tracking-tight text-white font-heading">Business Scaling Strategy</h3>
              <p className="text-gray-500 text-lg leading-relaxed font-medium mb-10">
                By digitizing the order-to-kitchen flow, Chikini Monie can handle higher volumes with fewer errors, leading to better customer retention and increased daily revenue.
              </p>
              <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-t border-white/5 pt-8">
                <Target className="w-5 h-5 text-accent" />
                Data-Driven Growth Engine
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA - Strategic Roadmap */}
        <section className="glass-premium rounded-[5rem] p-16 md:p-32 border border-primary/10 relative overflow-hidden shadow-2xl font-body">
          <div className="absolute top-0 right-0 p-24 opacity-[0.02] scale-150 rotate-12">
            <Rocket className="w-96 h-96 text-primary" />
          </div>
          <div className="max-w-4xl relative z-10">
            <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-8 block">Strategic Roadmap</span>
            <h2 className="text-5xl md:text-[6rem] font-extrabold mb-10 uppercase tracking-tight leading-none font-heading">
              Ready to <br /><span className="text-primary italic">Operationalise?</span>
            </h2>
            <p className="text-gray-400 text-xl md:text-2xl mb-16 leading-relaxed font-medium">
              This preview environment is designed to demonstrate the future production version of Chikini Monie. Explore the roadmap to see how we transition from demo to deployment.
            </p>
            <div className="flex flex-col sm:flex-row gap-8">
              <Link
                href="/pitch"
                className="premium-gradient px-12 py-6 rounded-[2rem] font-bold text-xl text-white shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all text-center uppercase tracking-wider"
              >
                View Business Proposal
              </Link>
              <Link
                href="/contact"
                className="glass-premium border border-white/10 px-12 py-6 rounded-[2rem] font-bold text-xl text-white hover:bg-white/10 transition-all text-center uppercase tracking-wider"
              >
                Inquiry Preview
              </Link>
            </div>
          </div>
        </section>

        {/* Safety & Compliance Notice */}
        <div className="mt-32 glass-premium p-12 rounded-[3.5rem] border border-primary/20 max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-center text-center md:text-left font-body bg-primary/[0.02]">
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary shrink-0 border border-primary/20">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] mb-4">Business Review Prototype Notice</h4>
            <div className="space-y-4 text-sm text-gray-500 leading-relaxed font-bold">
              <p>This is a guided preview environment not connected to live restaurant operations yet.</p>
              <p>All data used in this session is for demonstration. No real customer, payment, or banking data should be used.</p>
              <p>Operational logic and cloud sync are implemented for preview purposes pending final management confirmation.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
