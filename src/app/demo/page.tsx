
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
  Info
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DemoCommandCenter() {
  const steps = [
    {
      id: "01",
      title: "Customer Website",
      desc: "Explore the official digital storefront where the brand comes to life.",
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
      icon: Rocket,
      value: "Outlines the path from prototype to real-world deployment."
    }
  ];

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 pt-32 pb-24">
        {/* Header */}
        <section className="mb-20 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                <Rocket className="w-6 h-6" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-accent">Demo Command Center</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black italic gold-text mb-8 uppercase leading-tight">
              FROM SOCIAL TO <br />SYSTEMS.
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
              See how Chikini Monie can move from social orders to a full digital food system. A premium preview of the customer website, order flow, staff board, kitchen queue, and manager dashboard.
            </p>
          </motion.div>
        </section>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {steps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-10 rounded-[3rem] border border-white/5 flex flex-col h-full group hover:border-primary/30 transition-all"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-gray-500 group-hover:bg-primary/20 group-hover:text-primary transition-all">
                  <step.icon className="w-7 h-7" />
                </div>
                <span className="text-4xl font-black text-white/5 group-hover:text-primary/10 transition-colors">{step.id}</span>
              </div>
              
              <h3 className="text-2xl font-black italic mb-4 uppercase tracking-tight">{step.title}</h3>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed flex-grow">{step.desc}</p>
              
              <div className="mb-8 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3" />
                  Business Value
                </p>
                <p className="text-xs text-gray-300 font-medium">{step.value}</p>
              </div>

              <Link
                href={step.route}
                className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-center group-hover:bg-primary transition-all flex items-center justify-center gap-2"
              >
                Open {step.title}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <section className="bg-gradient-to-br from-primary/20 to-black rounded-[4rem] p-12 md:p-20 border border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 scale-150">
            <Rocket className="w-64 h-64 text-primary" />
          </div>
          <div className="max-w-3xl relative z-10">
            <h2 className="text-3xl md:text-5xl font-black italic mb-8 uppercase leading-tight">
              Ready to <br /><span className="text-primary">Operationalize?</span>
            </h2>
            <p className="text-gray-300 text-lg mb-10 leading-relaxed">
              This digital system is built to handle the intensity of Akure's 24/7 food cravings. Move beyond WhatsApp chats into a scalable, high-trust business hub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/pitch"
                className="premium-gradient px-10 py-5 rounded-xl font-bold text-white shadow-xl shadow-primary/20 hover:scale-105 transition-all text-center"
              >
                View Full Proposal
              </Link>
              <Link
                href="/contact"
                className="bg-white/5 border border-white/10 px-10 py-5 rounded-xl font-bold text-white hover:bg-white/10 transition-all text-center"
              >
                Discuss Deployment
              </Link>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="mt-16 flex items-start gap-4 p-8 glass rounded-[2rem] border border-white/5 max-w-4xl mx-auto">
          <Info className="text-gray-500 w-6 h-6 shrink-0 mt-1" />
          <p className="text-xs text-gray-500 leading-relaxed">
            <span className="font-bold uppercase tracking-widest text-gray-400 block mb-2">Technical Disclaimer</span>
            This Command Center is a business review prototype. No real customer data, live payments, or actual kitchen hardware are used. All operational logic (order flow, kitchen queue, analytics) is simulated using browser-based storage for demonstration purposes.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
