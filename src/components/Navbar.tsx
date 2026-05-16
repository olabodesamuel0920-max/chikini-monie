
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Utensils, ChevronDown, ArrowRight } from "lucide-react";
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

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6",
        scrolled ? "bg-dark/80 backdrop-blur-xl border-b border-white/[0.05] py-3" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-xl shadow-primary/20 group-hover:rotate-6 transition-transform duration-500">
            <Utensils className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-tighter gold-text leading-none font-heading uppercase">CHIKINI</span>
            <span className="font-black text-lg tracking-tighter text-white leading-none font-heading uppercase">MONIE</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 font-body">
          {publicLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[12px] font-bold uppercase tracking-[0.1em] text-white/70 hover:text-primary transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}

          {/* Demo Center Dropdown */}
          <div className="relative">
            <button 
              onMouseEnter={() => setShowDemoTools(true)}
              onMouseLeave={() => setShowDemoTools(false)}
              className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-accent hover:text-accent/80 transition-all cursor-pointer"
            >
              <Link href="/demo">Demo Center</Link>
              <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", showDemoTools && "rotate-180")} />
            </button>

            <AnimatePresence>
              {showDemoTools && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  onMouseEnter={() => setShowDemoTools(true)}
                  onMouseLeave={() => setShowDemoTools(false)}
                  className="absolute top-full right-0 mt-4 w-64 glass-premium rounded-3xl border border-white/[0.08] p-3 shadow-2xl backdrop-blur-2xl"
                >
                  <div className="grid gap-1">
                    {demoTools.map((tool) => (
                      <Link
                        key={tool.name}
                        href={tool.href}
                        className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-white/[0.05] transition-all group"
                      >
                        <div className="w-9 h-9 bg-white/[0.05] rounded-xl flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:bg-primary/10 transition-all">
                          <tool.icon className="w-4.5 h-4.5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 group-hover:text-white">
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
            className="premium-gradient px-7 py-2.5 rounded-full text-white text-[11px] font-bold uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            Order Now
          </Link>
        </div>

        {/* Mobile Navbar Controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link href="/menu" className="relative w-10 h-10 bg-white/[0.05] rounded-xl flex items-center justify-center text-white border border-white/[0.05]">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-[9px] font-black flex items-center justify-center rounded-full text-white border-2 border-dark shadow-lg">0</span>
          </Link>
          <button 
            onClick={() => setIsOpen(true)} 
            className="w-10 h-10 bg-white/[0.05] rounded-xl flex items-center justify-center text-white border border-white/[0.05]"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Rebuilt Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 h-full w-[85%] max-w-sm glass-dark shadow-2xl p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-16">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-500">Navigation</span>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 bg-white/[0.05] rounded-xl flex items-center justify-center text-white border border-white/[0.05]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-6 mb-12">
                {publicLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-bold tracking-tight text-white/90 hover:text-primary transition-all font-heading"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/demo"
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-bold tracking-tight text-accent hover:text-accent/80 transition-all font-heading"
                >
                  Demo Center
                </Link>
              </div>

              <div className="mt-auto border-t border-white/[0.05] pt-10">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-accent mb-6 block">Internal Tools</span>
                <div className="grid grid-cols-2 gap-3 mb-10">
                  {demoTools.slice(0, 4).map((tool) => (
                    <Link
                      key={tool.name}
                      href={tool.href}
                      onClick={() => setIsOpen(false)}
                      className="flex flex-col gap-2 p-4 bg-white/[0.03] rounded-2xl border border-white/[0.05]"
                    >
                      <tool.icon className="w-5 h-5 text-primary" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{tool.name}</span>
                    </Link>
                  ))}
                </div>

                <Link
                  href="/menu"
                  onClick={() => setIsOpen(false)}
                  className="premium-gradient flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-white font-bold text-sm uppercase tracking-widest shadow-xl shadow-primary/20"
                >
                  Start Your Order
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
