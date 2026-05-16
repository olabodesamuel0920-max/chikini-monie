
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MessageCircle, Phone, Instagram, MapPin, Send, Info, Calendar, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-dark font-body">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-48 pb-40">
        {/* Header - Impactful */}
        <div className="text-center mb-32 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-8 block">Operational Contact</span>
            <h1 className="text-6xl md:text-[8rem] font-extrabold gold-text uppercase tracking-tighter leading-none font-heading">CONNECT<span className="italic text-white">.</span></h1>
            <p className="text-gray-500 mt-10 max-w-3xl mx-auto text-xl md:text-2xl font-medium leading-relaxed">
              Have a partnership vision, a branch inquiry, or a technical question? The Chikini Monie management team is ready to connect.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Contact Methods - Left Column */}
          <div className="lg:col-span-5 space-y-12 font-body">
            <section className="space-y-8">
              <div className="glass-premium p-10 rounded-[3rem] border border-white/5 flex gap-8 group hover:border-primary/20 transition-all duration-500 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/[0.01] group-hover:bg-primary/[0.03] transition-colors" />
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20 shrink-0 relative z-10">
                  <Phone className="w-8 h-8" />
                </div>
                <div className="relative z-10">
                  <h4 className="font-bold text-xl uppercase tracking-tight mb-2 text-white font-heading">Hub Enquiries</h4>
                  <p className="text-gray-500 text-[10px] font-bold mb-4 uppercase tracking-[0.2em]">Regional Ops Line</p>
                  <p className="text-primary font-bold text-lg leading-none tracking-tight">Phone pending management confirmation</p>
                </div>
              </div>

              <div className="glass-premium p-10 rounded-[3rem] border border-white/5 flex gap-8 group hover:border-accent/20 transition-all duration-500 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-accent/[0.01] group-hover:bg-accent/[0.03] transition-colors" />
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent border border-accent/20 shrink-0 relative z-10">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div className="relative z-10">
                  <h4 className="font-bold text-xl uppercase tracking-tight mb-2 text-white font-heading">Partnerships</h4>
                  <p className="text-gray-500 text-[10px] font-bold mb-4 uppercase tracking-[0.2em]">Strategic Growth Group</p>
                  <p className="text-accent font-bold text-lg leading-none tracking-tight">Management confirmation pending</p>
                </div>
              </div>

              <div className="glass-premium p-10 rounded-[3rem] border border-white/5 flex gap-8 group hover:border-green-500/20 transition-all duration-500 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-green-500/[0.01] group-hover:bg-green-500/[0.03] transition-colors" />
                <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 border border-green-500/20 shrink-0 relative z-10">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <div className="relative z-10">
                  <h4 className="font-bold text-xl uppercase tracking-tight mb-2 text-white font-heading">Digital Support</h4>
                  <p className="text-gray-500 text-[10px] font-bold mb-4 uppercase tracking-[0.2em]">Customer Experience Engine</p>
                  <p className="text-green-500 font-bold text-lg leading-none tracking-tight">WhatsApp pending confirmation</p>
                </div>
              </div>
            </section>

            <div className="glass-premium border border-primary/20 p-10 rounded-[3rem] flex items-start gap-6 shadow-2xl bg-primary/[0.02] hospitality-glow">
              <Info className="text-primary w-8 h-8 shrink-0 mt-1" />
              <div>
                <h5 className="font-bold text-[10px] mb-3 uppercase tracking-[0.2em] text-primary">Operational Review Prototype</h5>
                <p className="text-xs text-gray-500 leading-relaxed font-bold">
                  This contact hub is a structural demonstration for business review. Brand details, social handles, and direct lines are undergoing final verification.
                </p>
              </div>
            </div>
          </div>

          {/* Reservation Form - Right Column */}
          <div className="lg:col-span-7">
            <div className="glass-premium p-12 md:p-16 rounded-[4rem] border border-white/5 shadow-2xl relative overflow-hidden font-body">
              <div className="absolute top-0 right-0 p-16 opacity-[0.02] -rotate-12 scale-150">
                <Calendar className="w-64 h-64" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20 shadow-lg">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-4xl font-bold gold-text uppercase tracking-tight leading-none font-heading">INQUIRIES<span className="italic text-white">.</span></h3>
                </div>
                
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl mb-12">
                  <p className="text-xs text-gray-500 font-bold leading-relaxed italic">
                    "This preview form is for structural demonstration only. It is not connected to live restaurant operations yet. Data submitted here will not be processed."
                  </p>
                </div>
                
                <form className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">Full Name</label>
                      <input type="text" placeholder="e.g. Samuel Olabode" className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 px-8 focus:border-primary focus:bg-black/60 transition-all focus:outline-none font-bold text-white shadow-inner placeholder:text-gray-700" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">Mobile Line</label>
                      <input type="tel" placeholder="e.g. 08012345678" className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 px-8 focus:border-primary focus:bg-black/60 transition-all focus:outline-none font-bold text-white shadow-inner placeholder:text-gray-700" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">Preferred Date</label>
                      <input type="date" className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 px-8 focus:border-primary focus:bg-black/60 transition-all focus:outline-none text-white font-bold shadow-inner" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">Inquiry Type</label>
                      <select className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 px-8 focus:border-primary focus:bg-black/60 transition-all focus:outline-none font-bold text-white shadow-inner appearance-none cursor-pointer">
                        <option>General Enquiry</option>
                        <option>Table Reservation</option>
                        <option>Event Hosting</option>
                        <option>Corporate Catering</option>
                        <option>Partnership Proposal</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">Message / Operational Notes</label>
                    <textarea rows={4} placeholder="Tell us about your inquiry..." className="w-full bg-black/40 border border-white/10 rounded-[2rem] py-6 px-8 focus:border-primary focus:bg-black/60 transition-all focus:outline-none resize-none font-bold text-white shadow-inner placeholder:text-gray-700"></textarea>
                  </div>

                  <button type="button" className="w-full premium-gradient py-8 rounded-[2rem] text-white font-bold text-xl flex items-center justify-center gap-4 shadow-2xl shadow-primary/30 hover:scale-[1.01] active:scale-95 transition-all uppercase tracking-[0.2em]">
                    <Send className="w-6 h-6" />
                    Submit Inquiry Preview
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
