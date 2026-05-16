
"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FoodCard from "@/components/FoodCard";
import { categories, menuItems, MenuItem, Category } from "@/lib/demo-data";
import { ShoppingBag, X, Search, ChevronRight, Info, Filter } from "lucide-react";
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
    <div className="min-h-screen bg-dark font-body">
      <Navbar />
      
      {/* Menu Header - Deep & Premium */}
      <div className="pt-48 pb-24 px-6 relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full -top-40 -left-40" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="max-w-2xl">
              <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-6 block">Premium Cravings</span>
              <h1 className="text-6xl md:text-8xl font-extrabold mb-6 uppercase tracking-tighter leading-none font-heading">
                OUR <span className="gold-text italic">MENU.</span>
              </h1>
              <p className="text-gray-500 text-xl font-medium">Crafted with passion, served with soul. Every bite is a story.</p>
            </div>
            
            <div className="relative w-full lg:w-[450px] group font-body">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors w-6 h-6" />
              <input
                type="text"
                placeholder="Search for cravings..."
                className="w-full bg-white/5 border border-white/10 rounded-3xl py-6 pl-16 pr-8 focus:outline-none focus:border-primary focus:bg-white/[0.08] transition-all text-white font-bold text-lg shadow-2xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Scroller - Modern & Sticky */}
      <div className="sticky top-20 z-30 bg-dark/80 backdrop-blur-2xl border-y border-white/5 py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-6 overflow-x-auto no-scrollbar font-body">
          <div className="flex items-center gap-3 shrink-0 text-gray-500 mr-4">
            <Filter className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Filter</span>
          </div>
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`whitespace-nowrap px-8 py-3 rounded-2xl text-[12px] font-bold uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? "premium-gradient text-white shadow-2xl shadow-primary/30 scale-105"
                  : "bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid - Generous Spacing */}
      <main className="max-w-7xl mx-auto px-6 py-24 pb-48">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} onAddToCart={addToCart} />
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-40 bg-white/5 rounded-[4rem] border border-dashed border-white/10 font-body">
            <Search className="w-16 h-16 text-gray-700 mx-auto mb-6" />
            <h3 className="text-2xl font-bold uppercase text-gray-400 font-heading tracking-tight">No cravings found.</h3>
            <p className="text-gray-600 mt-2 font-medium">Try searching for something else or browse all categories.</p>
          </div>
        )}

        {/* Demo Footer Notice */}
        <div className="mt-40 glass-premium p-12 rounded-[3.5rem] border border-white/5 flex flex-col md:flex-row items-center gap-8 text-center md:text-left font-body">
          <div className="w-20 h-20 bg-accent/20 rounded-[2rem] flex items-center justify-center text-accent shrink-0 border border-accent/10">
            <Info className="w-10 h-10" />
          </div>
          <div>
            <h4 className="text-2xl font-bold uppercase gold-text mb-2 font-heading tracking-tight">Business Review Notice</h4>
            <p className="text-gray-500 text-lg leading-relaxed max-w-3xl font-medium">
              Menu items, descriptions, and pricing are part of a high-fidelity demonstration and are subject to change pending final business confirmation.
            </p>
          </div>
        </div>
      </main>

      {/* Cart Float (Desktop) */}
      <AnimatePresence>
        {cartCount > 0 && !isCartOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-12 right-12 z-[45] w-20 h-20 bg-primary rounded-[2rem] flex items-center justify-center text-white shadow-[0_20px_50px_rgba(255,102,0,0.4)] hover:scale-110 active:scale-95 transition-all hidden md:flex group font-body"
          >
            <ShoppingBag className="w-8 h-8 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-2 -right-2 w-8 h-8 bg-white text-primary rounded-xl flex items-center justify-center text-sm font-bold shadow-lg">
              {cartCount}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cart Toggle (Mobile) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-full px-6 md:hidden">
        <button
          onClick={() => setIsCartOpen(true)}
          className="w-full premium-gradient h-20 rounded-3xl flex items-center justify-between px-10 text-white font-bold shadow-2xl shadow-primary/40 active:scale-95 transition-transform font-body"
        >
          <div className="flex items-center gap-4">
            <ShoppingBag className="w-6 h-6" />
            <span className="uppercase tracking-wider text-sm">Cart ({cartCount})</span>
          </div>
          <span className="text-2xl font-heading">{formatPrice(cartTotal)}</span>
        </button>
      </div>

      {/* Cart Sidebar / Modal */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-xl bg-dark border-l border-white/5 z-[70] flex flex-col shadow-[-50px_0_100px_rgba(0,0,0,0.5)] font-body"
            >
              <div className="p-10 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold italic gold-text leading-none uppercase font-heading tracking-tight">YOUR ORDER</h2>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Review your selection</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)} 
                  className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-10 space-y-10 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-30">
                    <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center">
                      <ShoppingBag className="w-16 h-16" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold uppercase font-heading tracking-tight mb-2">Cart is empty.</h4>
                      <p className="text-sm font-medium">Your next big enjoyment starts here.</p>
                    </div>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-6 group items-center">
                      <div className="w-24 h-24 bg-white/5 rounded-[2rem] overflow-hidden shrink-0 border border-white/10">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-xl uppercase font-heading tracking-tight">{item.name}</h4>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-600 hover:text-red-500 transition-colors p-1">
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center bg-white/5 rounded-xl p-1.5 border border-white/10">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-primary rounded-lg transition-colors font-bold"
                            >
                              -
                            </button>
                            <span className="w-12 text-center text-sm font-bold italic">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-primary rounded-lg transition-colors font-bold"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-bold text-xl text-primary">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-10 border-t border-white/5 bg-black/40 space-y-10">
                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                      <span>Subtotal</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                      <span>Service Fee</span>
                      <span className="text-green-500">Free (Demo)</span>
                    </div>
                    <div className="flex justify-between items-end pt-6 border-t border-white/5">
                      <span className="text-2xl font-bold uppercase font-heading tracking-tight">Total</span>
                      <span className="text-4xl font-bold gold-text italic font-heading">{formatPrice(cartTotal)}</span>
                    </div>
                  </div>
                  
                  <Link
                    href="/order"
                    className="w-full premium-gradient py-8 rounded-[2rem] text-white font-bold text-2xl text-center block shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-wider"
                  >
                    Checkout Now
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
