
"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FoodCard from "@/components/FoodCard";
import { categories, menuItems, MenuItem, Category } from "@/lib/demo-data";
import { ShoppingBag, X, Search, ChevronRight, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("chikini_monie_cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Save cart to localStorage on change
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
      <div className="pt-32 pb-12 px-4 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-black mb-4 gold-text">OUR MENU</h1>
              <p className="text-gray-400">Crafted with passion, served with love.</p>
            </div>
            
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for cravings..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-primary transition-colors text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Scroller */}
      <div className="sticky top-16 z-30 bg-dark/80 backdrop-blur-md border-y border-white/5 py-4 overflow-x-auto no-scrollbar px-4">
        <div className="max-w-7xl mx-auto flex gap-4">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat
                  ? "premium-gradient text-white shadow-lg shadow-primary/20"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <main className="max-w-7xl mx-auto px-4 py-12 pb-32">
        {/* Demo Notice */}
        <div className="mb-12 bg-accent/10 border border-accent/20 p-6 rounded-3xl flex items-start gap-4">
          <div className="bg-accent/20 p-2 rounded-full shrink-0">
            <Info className="text-accent w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-accent mb-1 uppercase tracking-wider text-sm">Demo Mode Preview</h4>
            <p className="text-sm text-gray-400">
              Menu items and prices are for demonstration purposes and pending final confirmation from Chikini Monie management.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} onAddToCart={addToCart} />
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No items found matching your search.</p>
          </div>
        )}
      </main>

      {/* Cart Drawer Toggle (Mobile) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-full px-6 md:hidden">
        <button
          onClick={() => setIsCartOpen(true)}
          className="w-full premium-gradient h-16 rounded-2xl flex items-center justify-between px-8 text-white font-bold shadow-2xl shadow-primary/40 active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span>View Cart ({cartCount})</span>
          </div>
          <span className="text-xl">{formatPrice(cartTotal)}</span>
        </button>
      </div>

      {/* Cart Drawer / Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-dark border-l border-white/10 z-[60] flex flex-col"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-black italic gold-text">YOUR CART</h2>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 bg-white/5 rounded-full">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
                      <ShoppingBag className="w-10 h-10" />
                    </div>
                    <p className="font-bold">Your cart is empty.</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="text-primary font-bold hover:underline"
                    >
                      Browse our cravings
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-20 h-20 bg-white/5 rounded-2xl overflow-hidden shrink-0 border border-white/10">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-bold text-sm">{item.name}</h4>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-500">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">{formatPrice(item.price)}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center bg-white/5 rounded-lg p-1 border border-white/10">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-bold text-primary">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-8 border-t border-white/5 bg-black/40 space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Delivery Fee</span>
                      <span className="text-green-500">Free</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold pt-4 border-t border-white/5">
                      <span>Total</span>
                      <span className="gold-text">{formatPrice(cartTotal)}</span>
                    </div>
                  </div>
                  
                  <Link
                    href="/order"
                    className="w-full premium-gradient py-5 rounded-2xl text-white font-bold text-center block shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
                  >
                    Continue to Order
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
