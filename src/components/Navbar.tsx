
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Utensils, ChevronDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { publicLinks, demoTools } from "@/lib/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDemoTools, setShowDemoTools] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6 py-8",
        scrolled ? "bg-dark/80 backdrop-blur-3xl border-b border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-5" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/30 group-hover:rotate-12 transition-transform duration-700 hospitality-glow">
            <Utensils className="text-white w-8 h-8" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-2xl tracking-tighter gold-text leading-none font-heading">CHIKINI</span>
            <span className="font-extrabold text-2xl tracking-tighter text-white leading-none font-heading">MONIE</span>
          </div>
        </Link>

        {/* Desktop Links - Premium Hospitality Style */}
        <div className="hidden lg:flex items-center gap-12 font-body">
          {publicLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/60 hover:text-primary transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-1 bg-primary rounded-full transition-all group-hover:w-4" />
            </Link>
          ))}

          {/* Demo Center Dropdown */}
          <div className="relative">
            <div 
              onMouseEnter={() => setShowDemoTools(true)}
              onMouseLeave={() => setShowDemoTools(false)}
              className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent hover:text-accent/80 transition-all cursor-pointer"
            >
              <Link href="/demo">Demo Center</Link>
              <ChevronDown className={cn("w-4 h-4 transition-transform duration-500", showDemoTools && "rotate-180")} />
            </div>

            <AnimatePresence>
              {showDemoTools && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.98 }}
                  onMouseEnter={() => setShowDemoTools(true)}
                  onMouseLeave={() => setShowDemoTools(false)}
                  className="absolute top-full right-0 mt-6 w-80 glass-dark rounded-[2.5rem] border border-white/10 p-5 shadow-[0_30px_70px_rgba(0,0,0,0.8)] backdrop-blur-3xl hospitality-glow-gold"
                >
                  <div className="grid gap-3">
                    {demoTools.map((tool) => (
                      <Link
                        key={tool.name}
                        href={tool.href}
                        className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all group/tool"
                      >
                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-gray-500 group-hover/tool:text-primary group-hover/tool:bg-primary/10 transition-all border border-white/5 shadow-inner">
                          <tool.icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover/tool:text-white transition-colors">
                          {tool.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/menu"
            className="premium-gradient px-10 py-4 rounded-[1.5rem] text-white text-[12px] font-bold uppercase tracking-widest shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all hospitality-glow flex items-center gap-3"
          >
            <Sparkles className="w-4 h-4" />
            Order Now
          </Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <Link href="/menu" className="relative w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white backdrop-blur-xl">
            <ShoppingCart className="w-7 h-7" />
            <span className="absolute -top-2 -right-2 w-7 h-7 bg-primary text-[11px] font-bold flex items-center justify-center rounded-xl text-white shadow-2xl border-2 border-dark">0</span>
          </Link>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white backdrop-blur-xl"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-0 h-screen bg-dark/98 backdrop-blur-3xl z-[60] lg:hidden overflow-y-auto"
          >
            <div className="p-10 pt-32 space-y-16">
              <div className="grid gap-12">
                {publicLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-5xl font-extrabold uppercase tracking-tighter text-white hover:text-primary font-heading"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/demo"
                  onClick={() => setIsOpen(false)}
                  className="text-5xl font-extrabold uppercase tracking-tighter text-accent hover:text-accent/80 font-heading"
                >
                  Demo Center
                </Link>
              </div>

              <div className="space-y-8">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-accent/50 border-b border-white/5 pb-6">
                  Internal Demo Engine
                </h3>
                <div className="grid grid-cols-1 gap-5">
                  {demoTools.map((tool) => (
                    <Link
                      key={tool.name}
                      href={tool.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-6 p-6 bg-white/5 rounded-[2.5rem] border border-white/5 shadow-inner"
                    >
                      <tool.icon className="w-8 h-8 text-primary" />
                      <span className="text-sm font-bold uppercase tracking-widest text-gray-300">{tool.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/menu"
                onClick={() => setIsOpen(false)}
                className="premium-gradient block w-full py-8 rounded-[2.5rem] text-white text-center font-bold text-2xl uppercase tracking-widest shadow-2xl hospitality-glow"
              >
                Explore Collection
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
