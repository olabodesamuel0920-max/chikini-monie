
"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FoodCard from "@/components/FoodCard";
import { categories, menuItems, MenuItem, Category } from "@/lib/demo-data";
import { ShoppingBag, X, Search, Info, Filter, Sparkles, Star, ArrowRight } from "lucide-react";
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
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      {/* Menu Header */}
      <div className="pt-40 md:pt-48 pb-20 px-6 bg-white/[0.01]">
        <div className="container-tight relative z-10">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-[10px] uppercase tracking-[0.4em] mb-5 block">The Collection</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 uppercase tracking-tighter leading-none font-heading text-white">
              EXPLORE <span className="text-primary italic">OUR MENU.</span>
            </h1>
            <p className="text-gray-500 text-base md:text-lg font-medium max-w-xl mx-auto leading-relaxed">
              Crafted with passion by Akure's finest. <br />
              Every selection is an investment in big enjoyment.
            </p>
          </div>
          
          <div className="relative max-w-2xl mx-auto group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-all w-5 h-5" />
            <input
              type="text"
              placeholder="Search for cravings..."
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl py-5 pl-16 pr-8 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all text-white font-medium text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="sticky top-16 md:top-20 z-30 bg-dark/80 backdrop-blur-xl border-y border-white/[0.03] py-5 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-6 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 shrink-0 text-gray-600 mr-2">
            <Filter className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Filter</span>
          </div>
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                  : "bg-white/[0.02] text-gray-500 border-white/[0.05] hover:bg-white/[0.08] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <main className="max-w-7xl mx-auto px-6 py-16 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} onAddToCart={addToCart} />
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-40 glass rounded-3xl border border-dashed border-white/[0.05]">
            <Search className="w-12 h-12 text-gray-700 mx-auto mb-6" />
            <h3 className="text-2xl font-bold uppercase text-gray-600 font-heading tracking-tight">No cravings found.</h3>
            <p className="text-gray-700 mt-2 text-base font-medium">Try a different search or browse all categories.</p>
          </div>
        )}

        {/* Safety Disclaimer */}
        <div className="mt-40 glass p-10 rounded-3xl border border-white/[0.03] flex flex-col md:flex-row items-center gap-8">
          <div className="w-16 h-16 bg-accent/5 rounded-2xl flex items-center justify-center text-accent shrink-0 border border-accent/10">
            <Info className="w-8 h-8" />
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold uppercase gold-text mb-2 font-heading tracking-tight">Review Prototype</h4>
            <p className="text-gray-600 text-sm leading-relaxed max-w-3xl font-medium">
              This menu demonstration showcases high-fidelity digital infrastructure. All pricing and items are simulated for structural verification and pending management confirmation.
            </p>
          </div>
        </div>
      </main>

      {/* Floating Cart Pill (Universal) */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[45] w-full max-w-md px-6"
          >
            <button
              onClick={() => setIsCartOpen(true)}
              className="w-full premium-gradient h-16 rounded-full flex items-center justify-between px-8 text-white font-bold shadow-2xl shadow-primary/40 active:scale-95 transition-all group"
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
              className="fixed top-0 right-0 h-full w-full max-w-lg glass-dark z-[70] flex flex-col shadow-2xl"
            >
              <div className="p-8 border-b border-white/[0.05] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <ShoppingBag className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold uppercase font-heading tracking-tighter text-white">ORDER REVIEW</h2>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)} 
                  className="w-10 h-10 bg-white/[0.05] rounded-xl flex items-center justify-center border border-white/[0.05]"
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
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-600 hover:text-red-500 transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center bg-white/[0.03] rounded-xl p-1 border border-white/[0.05]">
                            <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-white/[0.05] rounded-lg transition-all font-bold text-sm">-</button>
                            <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white/[0.05] rounded-lg transition-all font-bold text-sm">+</button>
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

      <Footer />
    </div>
  );
}
