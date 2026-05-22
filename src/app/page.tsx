// Verified safe preview copywriting - Phase 2L-B Polish
"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FoodCard from "@/components/FoodCard";
import BranchCard from "@/components/BranchCard";
import { menuItems, branches, testimonials, MenuItem } from "@/lib/demo-data";
import { ArrowRight, Star, Clock, UtensilsCrossed, Smartphone, LayoutDashboard, ChefHat, BarChart3, Sparkles, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/lib/utils";


export default function Home() {
  const popularItems = menuItems.filter(item => item.popular);
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("chikini_monie_cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("chikini_monie_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          const newQty = Math.max(1, i.quantity + delta);
          return { ...i, quantity: newQty };
        }
        return i;
      })
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (

    <>
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-24 md:py-32">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-dark/20 to-dark z-10" />
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop"
              alt="Premium Food"
              className="w-full h-full object-cover animate-slow-zoom"
            />
          </div>

          <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-10 backdrop-blur-xl">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                Akure's Premium 24/7 Digital Hub
              </div>
              
              <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter leading-[0.95] uppercase font-heading text-white">
                Big <span className="italic text-primary">enjoyment</span> <br />
                <span className="text-white/80">with </span>
                <span className="gold-text italic">small money.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-400 mb-16 max-w-2xl mx-auto leading-relaxed font-medium">
                Akure's premier digital food destination. <br className="hidden md:block" /> 
                Authentic local soul meets global fast-food excellence.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  href="/menu"
                  className="premium-gradient w-full sm:w-auto px-10 py-5 rounded-2xl text-white font-bold text-sm shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-widest"
                >
                  Start Your Order
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/demo"
                  className="glass w-full sm:w-auto px-10 py-5 rounded-2xl text-white font-bold text-sm hover:bg-white/[0.05] transition-all border border-white/[0.1] uppercase tracking-widest"
                >
                  Demo Center
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Popular Preview */}
        <section className="section-spacing container-wide">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] mb-4 block">Selection</span>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight uppercase font-heading leading-tight">Crave it. <span className="text-primary italic">Get it.</span></h2>
              <p className="text-gray-500 text-lg md:text-xl font-medium">Our most requested satisfaction boosters, crafted for your delight and delivered digitally.</p>
            </div>
            <Link href="/menu" className="text-primary font-bold uppercase tracking-widest text-[11px] flex items-center gap-3 hover:gap-5 transition-all group pb-3 border-b border-primary/20">
              Explore Menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {popularItems.slice(0, 3).map((item) => (
              <FoodCard key={item.id} item={item} onAddToCart={addToCart} />
            ))}
          </div>
        </section>

        {/* Why Chikini Monie */}
        <section className="section-spacing bg-white/[0.01] border-y border-white/[0.03]">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <span className="text-accent font-bold text-[10px] uppercase tracking-[0.3em] mb-6 block">The Standard</span>
                <h2 className="text-4xl md:text-6xl font-bold mb-16 leading-[0.95] tracking-tighter uppercase font-heading">
                  WHY AKURE <br />
                  <span className="text-primary italic">LOVES US.</span>
                </h2>
                <div className="space-y-12">
                  {[
                    { icon: UtensilsCrossed, color: "primary", title: "Designed for speed.", desc: "Designed to make ordering faster, clearer, and easier to manage." },
                    { icon: Star, color: "accent", title: "Quality for everyone.", desc: "From students to CEOs, we serve premium meals at prices that make perfect sense." },
                    { icon: Clock, color: "white", title: "Always awake for you.", desc: "Designed around late-night cravings, early meals, and flexible food demand." },
                  ].map((feature, idx) => (
                    <div key={idx} className="flex gap-8 group">
                      <div className="w-16 h-16 shrink-0 bg-white/[0.03] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform border border-white/[0.05]">
                        <feature.icon className={`text-${feature.color} w-7 h-7`} />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-3 uppercase font-heading tracking-tight text-white">{feature.title}</h4>
                        <p className="text-gray-500 text-base leading-relaxed font-medium">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="relative z-10 glass-premium p-4 rounded-[3rem] border border-white/[0.08] rotate-2">
                  <img
                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800"
                    alt="Delicious Food"
                    className="rounded-[2.2rem] shadow-2xl grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Abula Backyard */}
        <section className="section-spacing container-wide">
          <div className="glass-premium p-12 md:p-24 rounded-[3.5rem] border border-primary/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.02] -rotate-12 scale-150">
              <UtensilsCrossed className="w-72 h-72" />
            </div>
            <div className="relative z-10 lg:max-w-3xl">
              <span className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] mb-6 block">Heritage</span>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 uppercase font-heading leading-tight tracking-tighter">ABULA <span className="italic text-primary">BACKYARD</span></h2>
              <p className="text-gray-400 text-lg md:text-xl mb-12 leading-relaxed font-medium">
                Experience authentic local flavors at our sister brand, Abula Backyard. The traditional soul of Akure, served with premium hospitality.
              </p>
              <Link href="/about" className="inline-flex items-center gap-4 font-bold uppercase tracking-widest text-[11px] text-white hover:text-primary transition-all group pb-2 border-b border-white/10">
                Our Heritage <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Operational Flow */}
        <section className="section-spacing bg-white/[0.01]">
          <div className="container-wide">
            <div className="text-center mb-24">
              <span className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] mb-6 block">Infrastructure</span>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 uppercase font-heading leading-tight tracking-tighter">THE <span className="text-primary italic">LIFECYCLE.</span></h2>
              <p className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto font-medium">A seamless digital journey powered by Supabase—from the first craving to executive reporting.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Order", step: "01", desc: "Choose your craving from the interactive digital menu.", icon: Smartphone },
                { title: "Confirm", step: "02", desc: "Demo orders can appear on the staff board for workflow preview.", icon: LayoutDashboard },
                { title: "Prepare", step: "03", desc: "Kitchen receives the digital ticket and begins preparation.", icon: ChefHat },
                { title: "Analyze", step: "04", desc: "Preview performance and sales-style insights from demo orders.", icon: BarChart3 },
              ].map((item, idx) => (
                <div key={idx} className="glass p-10 rounded-[2.5rem] relative group hover:bg-white/[0.05] transition-all">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-10 group-hover:scale-110 transition-transform border border-primary/20">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <span className="absolute top-10 right-10 text-6xl font-bold text-white/[0.02] leading-none italic font-heading">{item.step}</span>
                  <h3 className="text-2xl font-bold mb-4 uppercase font-heading tracking-tight text-white">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-20 text-center">
              <Link
                href="/demo"
                className="bg-white text-black px-12 py-5 rounded-2xl font-bold text-sm hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-4 shadow-xl shadow-white/5 uppercase tracking-widest"
              >
                Experience The Engine
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Branches */}
        <section className="section-spacing container-wide">
          <div className="text-center mb-24">
            <span className="text-accent font-bold text-[10px] uppercase tracking-[0.3em] mb-6 block">Locations</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 uppercase font-heading leading-tight tracking-tighter">ALWAYS <span className="gold-text italic">NEARBY.</span></h2>
            <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">Pick up your order or dine with us at any of our hospitality hubs across Akure.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {branches.map((branch) => (
              <BranchCard key={branch.id} branch={branch} />
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-spacing bg-white/[0.01]">
          <div className="container-wide">
            <h2 className="text-4xl md:text-6xl font-bold mb-10 text-center uppercase font-heading tracking-tighter">THE <span className="text-primary italic">CULTURE.</span></h2>
            <p className="text-gray-600 text-center text-[10px] font-bold uppercase tracking-[0.2em] mb-24 max-w-xl mx-auto">Sample layout — Built for Akure food lovers and future digital ordering.</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {testimonials.map((t, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass p-10 rounded-[2.5rem] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex gap-1.5 text-accent/40 mb-8">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed italic mb-12 font-medium">"{t.content}"</p>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-white/[0.03] rounded-xl flex items-center justify-center font-bold text-lg text-primary border border-white/[0.05]">
                      {t.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-base uppercase tracking-tight font-heading text-white">{t.name}</h4>
                      <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 md:py-40 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="max-w-4xl mx-auto text-center relative z-10 px-6">
            <h2 className="text-5xl md:text-8xl font-bold text-white mb-10 tracking-tighter uppercase font-heading leading-[0.9]">
              BIG <br /> <span className="italic text-white/90">ENJOYMENT?</span>
            </h2>
            <p className="text-white/90 text-xl md:text-2xl mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
              Built for Akure food lovers and future digital ordering.
            </p>
            <Link
              href="/menu"
              className="bg-white text-primary px-16 py-6 rounded-2xl font-bold text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all inline-block uppercase tracking-widest"
            >
              Order Now
            </Link>
          </div>
        </section>

        {/* Floating Cart Pill (Universal) */}
        <AnimatePresence>
          {cartCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[45] w-full max-w-md px-6 font-body"
            >
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="w-full premium-gradient h-16 rounded-full flex items-center justify-between px-8 text-white font-bold shadow-2xl shadow-primary/40 active:scale-95 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <ShoppingBag className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 bg-white text-primary text-[9px] font-black flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  </div>
                  <span className="uppercase tracking-widest text-[10px] font-black">View Order</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-heading tracking-tighter">{formatPrice(cartTotal)}</span>
                  <ArrowRight className="w-5 h-5 opacity-70" />
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cart Drawer */}
        <AnimatePresence>
          {isCartOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)}
                className="fixed inset-0 bg-dark/60 backdrop-blur-md z-[60]"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-full max-w-lg glass-dark z-[70] flex flex-col shadow-2xl font-body"
              >
                <div className="p-8 border-b border-white/[0.05] flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <ShoppingBag className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold uppercase font-heading tracking-tighter text-white">ORDER REVIEW</h2>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setIsCartOpen(false)} 
                    className="w-10 h-10 bg-white/[0.05] rounded-xl flex items-center justify-center border border-white/[0.05] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-grow overflow-y-auto p-8 space-y-8 custom-scrollbar">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-20 py-20">
                      <ShoppingBag className="w-20 h-20 mb-6" />
                      <h4 className="text-xl font-bold uppercase font-heading">Your bag is empty.</h4>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="flex gap-6 group items-center">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-white/[0.05]">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-lg leading-tight text-white/90">{item.name}</h4>
                            <button type="button" onClick={() => removeFromCart(item.id)} className="text-gray-600 hover:text-red-500 transition-colors cursor-pointer">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center bg-white/[0.03] rounded-xl p-1 border border-white/[0.05]">
                              <button type="button" onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-white/[0.05] rounded-lg transition-all font-bold text-sm cursor-pointer">-</button>
                              <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                              <button type="button" onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white/[0.05] rounded-lg transition-all font-bold text-sm cursor-pointer">+</button>
                            </div>
                            <span className="font-bold text-lg text-primary">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="p-8 border-t border-white/[0.05] space-y-8 bg-black/20 backdrop-blur-3xl">
                    <div className="space-y-4">
                      <div className="flex justify-between text-gray-500 font-bold uppercase tracking-widest text-[10px]">
                        <span>Subtotal</span>
                        <span className="text-white">{formatPrice(cartTotal)}</span>
                      </div>
                      <div className="flex justify-between text-gray-500 font-bold uppercase tracking-widest text-[10px]">
                        <span>Service Fee</span>
                        <span className="text-green-500">Free (Demo)</span>
                      </div>
                      <div className="flex justify-between items-end pt-6 border-t border-white/[0.05]">
                        <span className="text-xl font-bold uppercase font-heading tracking-tight text-white">Grand Total</span>
                        <span className="text-3xl font-bold text-primary font-heading tracking-tighter">{formatPrice(cartTotal)}</span>
                      </div>
                    </div>
                    
                    <Link
                      href="/order"
                      className="w-full premium-gradient py-5 rounded-2xl text-white font-bold text-lg text-center block shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest"
                    >
                      Proceed to Checkout
                    </Link>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
