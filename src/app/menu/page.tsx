
"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FoodCard from "@/components/FoodCard";
import { categories, menuItems, MenuItem, Category } from "@/lib/demo-data";
import { ShoppingBag, X, Search, ChevronRight, Info, Filter, Sparkles, Star } from "lucide-react";
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

  const recommendedItems = menuItems.filter(item => item.popular).slice(0, 3);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-dark font-body selection:bg-primary/30">
      <Navbar />
      
      {/* Menu Header - Cinematic Hospitality */}
      <div className="pt-56 pb-32 px-6 relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-primary/5 blur-[150px] rounded-full -top-48 -left-48 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-16">
            <div className="max-w-3xl">
              <span className="text-primary font-bold text-xs uppercase tracking-[0.5em] mb-8 block">The Collection</span>
              <h1 className="text-6xl md:text-[8rem] font-extrabold mb-8 uppercase tracking-tighter leading-none font-heading text-white">
                EXPLORE <br /><span className="gold-text italic text-white/90">OUR MENU.</span>
              </h1>
              <p className="text-gray-500 text-2xl font-medium max-w-2xl leading-relaxed">Crafted with passion by Akure's finest chefs. Every selection is an investment in big enjoyment.</p>
            </div>
            
            <div className="relative w-full lg:w-[500px] group">
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-all w-7 h-7" />
              <input
                type="text"
                placeholder="Search for cravings..."
                className="w-full bg-white/5 border border-white/10 rounded-[2.5rem] py-8 pl-20 pr-10 focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all text-white font-bold text-xl shadow-2xl hospitality-glow"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Picks Area */}
      {activeCategory === "All" && searchQuery === "" && (
        <section className="bg-dark/50 py-32 border-b border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-16">
              <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center border border-accent/20">
                <Star className="w-6 h-6 text-accent fill-accent" />
              </div>
              <div>
                <h2 className="text-3xl font-bold uppercase tracking-tight font-heading text-white">Recommended Picks</h2>
                <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mt-1">
                  Sample highlighted picks pending final menu confirmation.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {recommendedItems.map(item => (
                <FoodCard key={item.id} item={item} onAddToCart={addToCart} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Scroller - Premium Navigation */}
      <div className="sticky top-20 z-30 bg-dark/80 backdrop-blur-3xl border-y border-white/5 py-8 px-6 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center gap-8 overflow-x-auto no-scrollbar font-body">
          <div className="flex items-center gap-4 shrink-0 text-gray-600 mr-4">
            <Filter className="w-5 h-5" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em]">Sort</span>
          </div>
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`whitespace-nowrap px-10 py-4 rounded-[1.5rem] text-[13px] font-bold uppercase tracking-[0.2em] transition-all duration-500 border ${
                activeCategory === cat
                  ? "premium-gradient text-white border-transparent shadow-[0_15px_40px_rgba(255,102,0,0.4)] scale-105"
                  : "bg-white/5 text-gray-500 border-white/5 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <main className="max-w-7xl mx-auto px-6 py-32 pb-64">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} onAddToCart={addToCart} />
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-56 glass-premium rounded-[5rem] border border-dashed border-white/10">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-10 border border-white/5">
              <Search className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-4xl font-bold uppercase text-gray-500 font-heading tracking-tighter">No cravings found.</h3>
            <p className="text-gray-600 mt-4 text-xl font-medium">Try a different search or browse all categories.</p>
          </div>
        )}

        {/* Business Review Guard */}
        <div className="mt-56 glass-premium p-16 rounded-[4rem] border border-white/5 flex flex-col md:flex-row items-center gap-12 text-center md:text-left hospitality-glow">
          <div className="w-24 h-24 bg-accent/10 rounded-[2.5rem] flex items-center justify-center text-accent shrink-0 border border-accent/20 animate-pulse">
            <Info className="w-12 h-12" />
          </div>
          <div>
            <h4 className="text-3xl font-bold uppercase gold-text mb-4 font-heading tracking-tight">Business Integrity Clause</h4>
            <p className="text-gray-500 text-xl leading-relaxed max-w-4xl font-medium">
              This menu and pricing structure are high-fidelity demonstrations of the Chikini Monie digital experience. All operational data is pending final management verification.
            </p>
          </div>
        </div>
      </main>

      {/* Cart Summary (Desktop) */}
      <AnimatePresence>
        {cartCount > 0 && !isCartOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-16 right-16 z-[45] w-24 h-24 bg-primary rounded-[2.5rem] flex items-center justify-center text-white shadow-[0_30px_70px_rgba(255,102,0,0.5)] hover:scale-110 active:scale-95 transition-all hidden md:flex group hospitality-glow"
          >
            <ShoppingBag className="w-10 h-10 group-hover:rotate-12 transition-transform duration-500" />
            <span className="absolute -top-3 -right-3 w-10 h-10 bg-white text-primary rounded-2xl flex items-center justify-center text-lg font-bold shadow-2xl border-4 border-dark">
              {cartCount}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Cart Bar */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[45] w-full px-8 md:hidden">
        <button
          onClick={() => setIsCartOpen(true)}
          className="w-full premium-gradient h-24 rounded-[2.5rem] flex items-center justify-between px-12 text-white font-bold shadow-[0_30px_70px_rgba(255,102,0,0.5)] active:scale-95 transition-all hospitality-glow"
        >
          <div className="flex items-center gap-6">
            <ShoppingBag className="w-8 h-8" />
            <span className="uppercase tracking-widest text-sm font-black">Review Order ({cartCount})</span>
          </div>
          <span className="text-3xl font-heading">{formatPrice(cartTotal)}</span>
        </button>
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 35, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-2xl bg-dark border-l border-white/10 z-[70] flex flex-col shadow-[-50px_0_150px_rgba(0,0,0,0.8)]"
            >
              <div className="p-12 border-b border-white/5 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold gold-text uppercase font-heading tracking-tighter">ORDER REVIEW</h2>
                    <p className="text-[11px] font-bold text-gray-600 uppercase tracking-[0.3em] mt-1">Hospitality Verification Required</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)} 
                  className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-colors border border-white/5"
                >
                  <X className="w-10 h-10" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-12 space-y-12 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-8 opacity-20">
                    <ShoppingBag className="w-32 h-32" />
                    <h4 className="text-3xl font-bold uppercase font-heading">Your bag is empty.</h4>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-8 group items-center">
                      <div className="w-32 h-32 bg-white/5 rounded-[2.5rem] overflow-hidden shrink-0 border border-white/10 shadow-2xl">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-bold text-2xl uppercase font-heading tracking-tight text-white">{item.name}</h4>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-700 hover:text-red-500 transition-colors p-2">
                            <X className="w-6 h-6" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center bg-white/5 rounded-2xl p-2 border border-white/10">
                            <button onClick={() => updateQuantity(item.id, -1)} className="w-10 h-10 flex items-center justify-center hover:bg-primary rounded-xl transition-all font-bold">-</button>
                            <span className="w-14 text-center text-lg font-bold italic">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="w-10 h-10 flex items-center justify-center hover:bg-primary rounded-xl transition-all font-bold">+</button>
                          </div>
                          <span className="font-bold text-2xl text-primary">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-12 border-t border-white/10 bg-black/60 space-y-12 backdrop-blur-3xl">
                  <div className="space-y-6">
                    <div className="flex justify-between text-gray-500 font-bold uppercase tracking-widest text-xs">
                      <span>Subtotal</span>
                      <span className="text-white">{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-500 font-bold uppercase tracking-widest text-xs">
                      <span>Operational Fee</span>
                      <span className="text-green-500">Free (Demo)</span>
                    </div>
                    <div className="flex justify-between items-end pt-8 border-t border-white/5">
                      <span className="text-3xl font-bold uppercase font-heading tracking-tighter text-white">Grand Total</span>
                      <span className="text-5xl font-bold gold-text italic font-heading tracking-tighter">{formatPrice(cartTotal)}</span>
                    </div>
                  </div>
                  
                  <Link
                    href="/order"
                    className="w-full premium-gradient py-10 rounded-[2.5rem] text-white font-bold text-3xl text-center block shadow-2xl shadow-primary/40 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest hospitality-glow"
                  >
                    Checkout Collection
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
