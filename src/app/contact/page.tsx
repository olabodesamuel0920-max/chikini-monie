
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MessageCircle, Phone, Instagram, MapPin, Send, Info, Calendar, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-48 pb-40">
        {/* Header - Impactful */}
        <div className="text-center mb-32 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-primary font-black text-xs uppercase tracking-[0.5em] mb-8 block">Get in Touch</span>
            <h1 className="text-6xl md:text-[8rem] font-black italic gold-text uppercase tracking-tighter leading-none">CONNECT.</h1>
            <p className="text-gray-500 mt-10 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
              Have a question, a craving, or a partnership vision? The Chikini Monie team is ready for you.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Contact Methods - Left Column */}
          <div className="lg:col-span-5 space-y-10">
            <section className="glass-premium p-12 rounded-[3.5rem] border border-white/5 space-y-12 shadow-2xl">
              <div className="flex gap-8 group">
                <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 border border-green-500/10 group-hover:bg-green-500 group-hover:text-white transition-all shadow-2xl shadow-green-500/5">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-black text-2xl uppercase italic tracking-tighter mb-2 group-hover:text-green-500 transition-colors">WhatsApp Order</h4>
                  <p className="text-gray-500 text-sm font-medium mb-3 uppercase tracking-widest">Fastest way to crave.</p>
                  <a href="#" className="text-primary font-black uppercase tracking-widest text-[10px] hover:underline">Chat with us now</a>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all shadow-2xl shadow-primary/5">
                  <Phone className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-black text-2xl uppercase italic tracking-tighter mb-2 group-hover:text-primary transition-colors">Voice Hotline</h4>
                  <p className="text-gray-500 text-sm font-medium mb-3 uppercase tracking-widest">Direct branch line.</p>
                  <p className="text-white font-black text-xl italic leading-none tracking-widest">0800-CHIKINI-1</p>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="w-16 h-16 bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-500 border border-pink-500/10 group-hover:bg-pink-500 group-hover:text-white transition-all shadow-2xl shadow-pink-500/5">
                  <Instagram className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-black text-2xl uppercase italic tracking-tighter mb-2 group-hover:text-pink-500 transition-colors">Digital Vibe</h4>
                  <p className="text-gray-500 text-sm font-medium mb-3 uppercase tracking-widest">Behind the scenes.</p>
                  <a href="#" className="text-primary font-black uppercase tracking-widest text-[10px] hover:underline">@chikini_monie</a>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent border border-accent/10 group-hover:bg-accent group-hover:text-black transition-all shadow-2xl shadow-accent/5">
                  <MapPin className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-black text-2xl uppercase italic tracking-tighter mb-2 group-hover:text-accent transition-colors">Operations HQ</h4>
                  <p className="text-gray-500 text-sm font-medium mb-3 uppercase tracking-widest">Visit the mothership.</p>
                  <p className="text-white font-black text-lg italic tracking-tight leading-none uppercase">FUTA South Gate, Akure</p>
                </div>
              </div>
            </section>

            <div className="glass-premium border border-white/5 p-10 rounded-[3rem] flex items-start gap-6 shadow-2xl">
              <Info className="text-gray-600 w-8 h-8 shrink-0 mt-1" />
              <div>
                <h5 className="font-black text-[10px] mb-3 uppercase tracking-[0.3em] text-gray-500">Business Verification</h5>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  Exact social handles, phone numbers, and operational policies are undergoing final brand confirmation. 
                  The details provided above serve as high-fidelity demonstration placeholders.
                </p>
              </div>
            </div>
          </div>

          {/* Reservation Form - Right Column */}
          <div className="lg:col-span-7">
            <div className="glass-premium p-12 rounded-[4rem] border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-16 opacity-[0.02] -rotate-12 scale-150">
                <Calendar className="w-64 h-64" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-4xl font-black italic gold-text uppercase tracking-tighter leading-none">RESERVATIONS.</h3>
                </div>
                <p className="text-gray-500 text-xl font-medium mb-12">Planning a group session? Secure your spot in advance.</p>
                
                <form className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                      <input type="text" placeholder="e.g. Samuel Olabode" className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 px-8 focus:border-primary focus:bg-black/60 transition-all focus:outline-none font-bold text-white shadow-inner" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Mobile Line</label>
                      <input type="tel" placeholder="e.g. 08012345678" className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 px-8 focus:border-primary focus:bg-black/60 transition-all focus:outline-none font-bold text-white shadow-inner" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Preferred Date</label>
                      <input type="date" className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 px-8 focus:border-primary focus:bg-black/60 transition-all focus:outline-none text-white font-bold shadow-inner" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Guest Volume</label>
                      <select className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 px-8 focus:border-primary focus:bg-black/60 transition-all focus:outline-none font-bold text-white shadow-inner appearance-none cursor-pointer">
                        <option>1-2 Persons</option>
                        <option>3-5 Persons</option>
                        <option>6-10 Persons</option>
                        <option>Large Group (10+)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Operational Branch</label>
                    <select className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 px-8 focus:border-primary focus:bg-black/60 transition-all focus:outline-none font-bold text-white shadow-inner appearance-none cursor-pointer">
                      <option>FUTA South Gate</option>
                      <option>Agape Junction</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Operational Notes</label>
                    <textarea rows={4} placeholder="Special dietary requests or seating preferences..." className="w-full bg-black/40 border border-white/10 rounded-[2rem] py-6 px-8 focus:border-primary focus:bg-black/60 transition-all focus:outline-none resize-none font-bold text-white shadow-inner"></textarea>
                  </div>

                  <button type="button" className="w-full premium-gradient py-8 rounded-[2rem] text-white font-black text-xl flex items-center justify-center gap-4 shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest">
                    <Send className="w-6 h-6" />
                    Submit Reservation Request
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
