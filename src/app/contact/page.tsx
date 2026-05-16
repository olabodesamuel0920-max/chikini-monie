
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MessageCircle, Phone, Instagram, MapPin, Send, Info, Calendar, Sparkles, Mail, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-dark font-body selection:bg-primary/30">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-48 pb-64">
        {/* Cinematic Header */}
        <div className="text-center mb-48 max-w-5xl mx-auto relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[180px] rounded-full pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-[0.5em] mb-12 backdrop-blur-3xl hospitality-glow">
              <Mail className="w-4 h-4" />
              Direct Communication
            </div>
            <h1 className="text-6xl md:text-[9.5rem] font-extrabold gold-text uppercase tracking-tighter leading-none font-heading">
              CONNECT<span className="italic text-white">.</span>
            </h1>
            <p className="text-gray-400 mt-12 max-w-3xl mx-auto text-2xl md:text-3xl font-medium leading-relaxed">
              Have a question, a craving, or a partnership vision? <br className="hidden md:block" /> 
              The Chikini Monie hospitality team is standing by.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          {/* Contact Methods - Left Column */}
          <div className="lg:col-span-5 space-y-12">
            <section className="glass-dark p-12 rounded-[4rem] border border-white/5 space-y-12 shadow-[0_50px_100px_rgba(0,0,0,0.5)] hospitality-glow">
              <div className="flex gap-10 group">
                <div className="w-20 h-20 bg-green-500/10 rounded-3xl flex items-center justify-center text-green-500 border border-green-500/10 group-hover:bg-green-500 group-hover:text-white transition-all duration-500 shadow-2xl">
                  <MessageCircle className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="font-bold text-3xl uppercase tracking-tight mb-3 group-hover:text-green-500 transition-colors font-heading text-white">WhatsApp Hub</h4>
                  <p className="text-gray-500 text-[11px] font-bold mb-4 uppercase tracking-[0.3em]">Fastest operational route</p>
                  <a href="#" className="text-primary font-bold uppercase tracking-widest text-xs hover:underline decoration-2 underline-offset-8">Open Chat Channel</a>
                </div>
              </div>

              <div className="flex gap-10 group">
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-2xl">
                  <Phone className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="font-bold text-3xl uppercase tracking-tight mb-3 group-hover:text-primary transition-colors font-heading text-white">Voice Hotline</h4>
                  <p className="text-gray-500 text-[11px] font-bold mb-4 uppercase tracking-[0.3em]">Direct branch priority line</p>
                  <p className="text-white font-bold text-xl tracking-tight leading-none italic group-hover:gold-text transition-all">Phone pending confirmation</p>
                </div>
              </div>

              <div className="flex gap-10 group">
                <div className="w-20 h-20 bg-pink-500/10 rounded-3xl flex items-center justify-center text-pink-500 border border-pink-500/10 group-hover:bg-pink-500 group-hover:text-white transition-all duration-500 shadow-2xl">
                  <Instagram className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="font-bold text-3xl uppercase tracking-tight mb-3 group-hover:text-pink-500 transition-colors font-heading text-white">Digital Pulse</h4>
                  <p className="text-gray-500 text-[11px] font-bold mb-4 uppercase tracking-[0.3em]">Social updates & vibe</p>
                  <a href="#" className="text-primary font-bold uppercase tracking-widest text-xs hover:underline decoration-2 underline-offset-8">@chikini_monie</a>
                </div>
              </div>

              <div className="flex gap-10 group">
                <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center text-accent border border-accent/10 group-hover:bg-accent group-hover:text-black transition-all duration-500 shadow-2xl">
                  <MapPin className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="font-bold text-3xl uppercase tracking-tight mb-3 group-hover:text-accent transition-colors font-heading text-white">Operations HQ</h4>
                  <p className="text-gray-500 text-[11px] font-bold mb-4 uppercase tracking-[0.3em]">Visit our central hub</p>
                  <p className="text-white font-bold text-lg tracking-tight leading-none uppercase">FUTA South Gate, Akure</p>
                </div>
              </div>
            </section>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="glass-dark border border-accent/20 p-12 rounded-[4rem] flex items-start gap-8 shadow-2xl hospitality-glow-gold"
            >
              <ShieldCheck className="text-accent w-10 h-10 shrink-0 mt-1" />
              <div>
                <h5 className="font-bold text-xs mb-4 uppercase tracking-[0.4em] text-accent">Business Integrity</h5>
                <p className="text-sm text-gray-500 leading-relaxed font-bold">
                  Exact social handles, phone numbers, and operational protocols are undergoing final business confirmation. 
                  All details serve as high-fidelity demonstration placeholders.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Reservation Form - Right Column */}
          <div className="lg:col-span-7">
            <div className="glass-dark p-16 rounded-[5rem] border border-white/5 shadow-[0_60px_120px_rgba(0,0,0,0.6)] relative overflow-hidden hospitality-glow">
              <div className="absolute top-0 right-0 p-24 opacity-[0.02] -rotate-12 scale-150 pointer-events-none">
                <Calendar className="w-96 h-96 text-white" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-6 mb-12">
                  <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary border border-primary/20 shadow-2xl">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="text-5xl font-extrabold gold-text uppercase tracking-tighter leading-none font-heading">RESERVATIONS<span className="italic text-white">.</span></h3>
                </div>
                <p className="text-gray-400 text-2xl font-medium mb-16 leading-relaxed">Planning a group session or a special event? Secure your spot in our digital queue.</p>
                
                <form className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.3em] ml-2">Full Name</label>
                      <input type="text" placeholder="e.g. Samuel Olabode" className="w-full bg-black/60 border border-white/10 rounded-[2rem] py-7 px-10 focus:border-primary focus:bg-black/80 transition-all focus:outline-none font-bold text-white shadow-2xl text-lg placeholder:text-gray-700" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.3em] ml-2">Mobile Line</label>
                      <input type="tel" placeholder="e.g. 08012345678" className="w-full bg-black/60 border border-white/10 rounded-[2rem] py-7 px-10 focus:border-primary focus:bg-black/80 transition-all focus:outline-none font-bold text-white shadow-2xl text-lg placeholder:text-gray-700" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.3em] ml-2">Preferred Date</label>
                      <input type="date" className="w-full bg-black/60 border border-white/10 rounded-[2rem] py-7 px-10 focus:border-primary focus:bg-black/80 transition-all focus:outline-none text-white font-bold shadow-2xl text-lg appearance-none" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.3em] ml-2">Guest Volume</label>
                      <select className="w-full bg-black/60 border border-white/10 rounded-[2rem] py-7 px-10 focus:border-primary focus:bg-black/80 transition-all focus:outline-none font-bold text-white shadow-2xl text-lg appearance-none cursor-pointer">
                        <option>1-2 Persons</option>
                        <option>3-5 Persons</option>
                        <option>6-10 Persons</option>
                        <option>Large Group (10+)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.3em] ml-2">Operational Branch</label>
                    <select className="w-full bg-black/60 border border-white/10 rounded-[2rem] py-7 px-10 focus:border-primary focus:bg-black/80 transition-all focus:outline-none font-bold text-white shadow-2xl text-lg appearance-none cursor-pointer">
                      <option>FUTA South Gate</option>
                      <option>Agape Junction</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.3em] ml-2">Hospitality Notes</label>
                    <textarea rows={5} placeholder="Special dietary requests or seating preferences for your party..." className="w-full bg-black/60 border border-white/10 rounded-[2.5rem] py-8 px-10 focus:border-primary focus:bg-black/80 transition-all focus:outline-none resize-none font-bold text-white shadow-2xl text-lg placeholder:text-gray-700"></textarea>
                  </div>

                  <button type="button" className="w-full premium-gradient py-10 rounded-[2.5rem] text-white font-bold text-2xl flex items-center justify-center gap-5 shadow-[0_25px_60px_rgba(255,102,0,0.5)] hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest hospitality-glow">
                    <Send className="w-8 h-8" />
                    Request Reservation
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
