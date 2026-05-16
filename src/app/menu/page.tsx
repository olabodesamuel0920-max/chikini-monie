
"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FoodCard from "@/components/FoodCard";
import { categories, menuItems, MenuItem, Category } from "@/lib/demo-data";
import { ShoppingBag, X, Search, ChevronRight, Info, Filter, Sparkles, Utensils } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredItems = menuItems.filter(
    (item) =>
      (item.category === activeCategory || activeCategory === "All") &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-dark font-body selection:bg-primary/30">
      <Navbar />
      
      {/* Cinematic Menu Header */}
      <div className="relative pt-64 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1543353071-873f17a7a088?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-30 scale-105 animate-slow-zoom" 
            alt="Menu Ambience"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/60 to-dark" />
          <div className="absolute inset-0 cinematic-vignette" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-16"
          >
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-[0.4em] mb-10 backdrop-blur-3xl">
                <Sparkles className="w-4 h-4" />
                The Master Selection
              </div>
              <h1 className="text-7xl md:text-[9rem] font-extrabold mb-8 uppercase tracking-tighter leading-none font-heading text-white">
                THE <span className="gold-text italic">MENU.</span>
              </h1>
              <p className="text-gray-400 text-2xl md:text-3xl font-medium leading-relaxed">
                A curated digital library of Akure's finest flavors. <br className="hidden md:block" /> 
                Crafted for big enjoyment, engineered for small money.
              </p>
            </div>
            
            <div className="relative w-full lg:w-[500px] group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-[2.5rem] blur opacity-0 group-hover:opacity-100 transition duration-1000 group-focus-within:opacity-100" />
              <div className="relative bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-2 flex items-center shadow-2xl">
                <div className="pl-6 pr-4">
                  <Search className="text-gray-500 group-focus-within:text-primary transition-colors w-7 h-7" />
                </div>
                <input
                  type="text"
                  placeholder="Search your cravings..."
                  className="flex-grow bg-transparent py-6 pr-8 focus:outline-none text-white font-bold text-xl placeholder:text-gray-600"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modern Filter Bar - Sticky */}
      <div className="sticky top-20 z-30 bg-dark/90 backdrop-blur-3xl border-y border-white/5 py-8 px-6 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center gap-8 overflow-x-auto no-scrollbar scroll-smooth">
          <div className="flex items-center gap-4 shrink-0 text-gray-500 border-r border-white/10 pr-8">
            <Filter className="w-5 h-5 text-primary" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em]">Cuisine</span>
          </div>
          <div className="flex items-center gap-5">
            {["All", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`whitespace-nowrap px-10 py-4 rounded-[1.5rem] text-[13px] font-bold uppercase tracking-wider transition-all duration-500 ${
                  activeCategory === cat
                    ? "premium-gradient text-white shadow-[0_15px_35px_rgba(255,102,0,0.3)] scale-110 hospitality-glow"
                    : "bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white hover:scale-105"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Grid - Cinematic Layout */}
      <main className="max-w-7xl mx-auto px-6 py-32 pb-64">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} onAddToCart={addToCart} />
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-64 glass-premium rounded-[5rem] border border-dashed border-white/10"
          >
            <div className="w-32 h-32 bg-white/5 rounded-[3rem] flex items-center justify-center mx-auto mb-10 border border-white/5">
              <Utensils className="w-16 h-16 text-gray-700" />
            </div>
            <h3 className="text-4xl font-bold uppercase text-gray-400 font-heading tracking-tight mb-4">No cravings matched.</h3>
            <p className="text-gray-500 text-xl font-medium max-w-md mx-auto leading-relaxed">
              Our digital chefs couldn't find that specific item. Try another search or explore all categories.
            </p>
          </motion.div>
        )}

        {/* Hospitality Disclaimer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-48 glass-dark p-16 rounded-[4rem] border border-accent/20 flex flex-col lg:flex-row items-center gap-12 text-center lg:text-left hospitality-glow-gold"
        >
          <div className="w-24 h-24 bg-accent/10 rounded-[2.5rem] flex items-center justify-center text-accent shrink-0 border border-accent/10 shadow-2xl">
            <Info className="w-12 h-12" />
          </div>
          <div>
            <h4 className="text-3xl font-bold uppercase gold-text mb-4 font-heading tracking-tight">Hospitality Verification Notice</h4>
            <p className="text-gray-400 text-xl leading-relaxed max-w-4xl font-medium">
              Menu selections, sensory descriptions, and investment values are presented for high-fidelity business demonstration. 
              Final operational specifications are pending Chikini Monie management confirmation.
            </p>
          </div>
        </motion.div>
      </main>

      {/* Hospitality Cart - Desktop Float */}
      <AnimatePresence>
        {cartCount > 0 && !isCartOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-16 right-16 z-[45] w-24 h-24 bg-primary rounded-[2.5rem] flex items-center justify-center text-white shadow-[0_25px_60px_rgba(255,102,0,0.5)] hover:scale-110 active:scale-95 transition-all hidden md:flex group hospitality-glow"
          >
            <ShoppingBag className="w-10 h-10 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-3 -right-3 w-10 h-10 bg-white text-primary rounded-2xl flex items-center justify-center text-lg font-bold shadow-2xl border-4 border-dark">
              {cartCount}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Cart Experience */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[45] w-full px-8 md:hidden">
        <button
          onClick={() => setIsCartOpen(true)}
          className="w-full premium-gradient h-24 rounded-[2.5rem] flex items-center justify-between px-10 text-white font-bold shadow-[0_20px_50px_rgba(255,102,0,0.4)] active:scale-95 transition-all hospitality-glow"
        >
          <div className="flex items-center gap-5">
            <ShoppingBag className="w-8 h-8" />
            <span className="uppercase tracking-[0.2em] text-[13px]">Your Cart ({cartCount})</span>
          </div>
          <span className="text-3xl font-heading">{formatPrice(cartTotal)}</span>
        </button>
      </div>

      {/* Premium Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-3xl z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 40, stiffness: 400 }}
              className="fixed top-0 right-0 h-full w-full max-w-2xl bg-dark border-l border-white/5 z-[70] flex flex-col shadow-[-100px_0_200px_rgba(0,0,0,0.9)]"
            >
              <div className="p-16 border-b border-white/10 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-8">
                  <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary border border-primary/20 shadow-2xl">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <div>
                    <h2 className="text-5xl font-extrabold gold-text leading-none uppercase font-heading tracking-tight">CRAVING HUB.</h2>
                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.4em] mt-3">Refining your digital ticket</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)} 
                  className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all border border-white/10"
                >
                  <X className="w-10 h-10" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-16 space-y-12 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-10 opacity-20">
                    <div className="w-48 h-48 bg-white/5 rounded-full flex items-center justify-center border border-white/5">
                      <ShoppingBag className="w-24 h-24" />
                    </div>
                    <div>
                      <h4 className="text-4xl font-bold uppercase font-heading tracking-tight mb-4">Cart is clear.</h4>
                      <p className="text-xl font-medium">Your next big enjoyment experience starts here.</p>
                    </div>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-10 group items-center bg-white/[0.02] p-8 rounded-[3rem] border border-white/5 hover:border-primary/20 transition-all duration-500">
                      <div className="w-32 h-32 bg-white/5 rounded-[2.5rem] overflow-hidden shrink-0 border border-white/10 shadow-2xl">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-bold text-2xl uppercase font-heading tracking-tight text-white">{item.name}</h4>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-600 hover:text-red-500 transition-colors p-2">
                            <X className="w-6 h-6" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center bg-black/40 rounded-2xl p-2 border border-white/10 shadow-inner">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-10 h-10 flex items-center justify-center hover:bg-primary rounded-xl transition-all font-bold text-xl"
                            >
                              -
                            </button>
                            <span className="w-16 text-center text-lg font-bold font-heading">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-10 h-10 flex items-center justify-center hover:bg-primary rounded-xl transition-all font-bold text-xl"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-bold text-2xl text-primary font-heading">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-16 border-t border-white/10 bg-black/60 space-y-12 shadow-[0_-30px_100px_rgba(0,0,0,0.5)]">
                  <div className="space-y-6">
                    <div className="flex justify-between text-gray-500 font-bold uppercase tracking-[0.3em] text-[11px]">
                      <span>Operational Subtotal</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-500 font-bold uppercase tracking-[0.3em] text-[11px]">
                      <span>Hospitality Fee</span>
                      <span className="text-green-500">Free (Demo)</span>
                    </div>
                    <div className="flex justify-between items-end pt-10 border-t border-white/10">
                      <span className="text-3xl font-extrabold uppercase font-heading tracking-tight text-white">Investment</span>
                      <span className="text-5xl font-extrabold gold-text font-heading">{formatPrice(cartTotal)}</span>
                    </div>
                  </div>
                  
                  <Link
                    href="/order"
                    className="w-full premium-gradient py-10 rounded-[2.5rem] text-white font-bold text-3xl text-center block shadow-[0_25px_60px_rgba(255,102,0,0.5)] hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-wider hospitality-glow"
                  >
                    Confirm Selection
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
