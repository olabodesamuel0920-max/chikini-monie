
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MessageCircle, Phone, Instagram, MapPin, Send, Info, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 pt-32 pb-24">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-primary font-bold text-sm uppercase tracking-[0.3em] mb-4 block">Get in Touch</span>
          <h1 className="text-5xl md:text-8xl font-black italic gold-text uppercase">CONNECT.</h1>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
            Have a question, a craving, or just want to say hi? We're always here for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Methods */}
          <div className="space-y-8">
            <section className="glass p-10 rounded-[2.5rem] border border-white/5 space-y-10">
              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all">
                  <MessageCircle className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">WhatsApp Orders</h4>
                  <p className="text-gray-400 mb-2">Fastest way to get your food.</p>
                  <a href="#" className="text-primary font-bold hover:underline">Chat with us now</a>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Call for Delivery</h4>
                  <p className="text-gray-400 mb-2">Available 24/7 across Akure.</p>
                  <p className="text-white font-bold">0800-CHIKINI-1</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-all">
                  <Instagram className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Instagram</h4>
                  <p className="text-gray-400 mb-2">Follow our food journey.</p>
                  <a href="#" className="text-primary font-bold hover:underline">@chikini_monie</a>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all">
                  <MapPin className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Brand Hub</h4>
                  <p className="text-gray-400 mb-2">Visit us anytime.</p>
                  <p className="text-white font-bold">FUTA South Gate, Akure</p>
                </div>
              </div>
            </section>

            <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] flex items-start gap-4">
              <Info className="text-gray-500 w-6 h-6 shrink-0" />
              <div>
                <h5 className="font-bold text-sm mb-1 uppercase tracking-widest text-gray-400">Confirmation Pending</h5>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Exact social handles, phone numbers, and reservation policies are currently being finalized. 
                  Contact details shown are placeholders for demonstration.
                </p>
              </div>
            </div>
          </div>

          {/* Reservation UI */}
          <div className="glass p-10 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Calendar className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black italic gold-text mb-8 uppercase">RESERVATIONS</h3>
              <p className="text-gray-400 mb-10">Planning a group hangout? Let us know in advance.</p>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                    <input type="text" placeholder="Your Name" className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 focus:border-primary transition-colors focus:outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Phone</label>
                    <input type="tel" placeholder="Your Phone" className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 focus:border-primary transition-colors focus:outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Date</label>
                    <input type="date" className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 focus:border-primary transition-colors focus:outline-none text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Guests</label>
                    <select className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 focus:border-primary transition-colors focus:outline-none">
                      <option>1-2 Persons</option>
                      <option>3-5 Persons</option>
                      <option>6-10 Persons</option>
                      <option>Large Group (10+)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Branch</label>
                  <select className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 focus:border-primary transition-colors focus:outline-none">
                    <option>FUTA South Gate</option>
                    <option>Agape Junction</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Additional Notes</label>
                  <textarea rows={3} placeholder="Special requests..." className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 focus:border-primary transition-colors focus:outline-none resize-none"></textarea>
                </div>

                <button className="w-full premium-gradient py-5 rounded-2xl text-white font-bold flex items-center justify-center gap-3 shadow-xl shadow-primary/30 hover:scale-[1.02] transition-all">
                  <Send className="w-5 h-5" />
                  Request Reservation (Preview)
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
