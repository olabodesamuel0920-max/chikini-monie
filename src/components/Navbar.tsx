
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Utensils, ChevronDown } from "lucide-react";
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
        scrolled ? "bg-dark/80 backdrop-blur-xl border-b border-white/5 shadow-2xl py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/30 group-hover:rotate-12 transition-transform duration-500">
            <Utensils className="text-white w-7 h-7" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tighter gold-text leading-none font-heading">CHIKINI</span>
            <span className="font-extrabold text-xl tracking-tighter text-white leading-none font-heading">MONIE</span>
          </div>
        </Link>

        {/* Desktop Links - Exact specification */}
        <div className="hidden lg:flex items-center gap-10 font-body">
          {publicLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[13px] font-bold uppercase tracking-wider text-white/70 hover:text-primary transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}

          {/* Demo Center - Dropdown contains the internal tools */}
          <div className="relative">
            <div 
              onMouseEnter={() => setShowDemoTools(true)}
              onMouseLeave={() => setShowDemoTools(false)}
              className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-accent hover:text-accent/80 transition-all cursor-pointer"
            >
              <Link href="/demo">Demo Center</Link>
              <ChevronDown className={cn("w-4 h-4 transition-transform", showDemoTools && "rotate-180")} />
            </div>

            <AnimatePresence>
              {showDemoTools && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  onMouseEnter={() => setShowDemoTools(true)}
                  onMouseLeave={() => setShowDemoTools(false)}
                  className="absolute top-full right-0 mt-4 w-72 glass-premium rounded-[2rem] border border-white/10 p-4 shadow-2xl backdrop-blur-2xl"
                >
                  <div className="grid gap-2">
                    {demoTools.map((tool) => (
                      <Link
                        key={tool.name}
                        href={tool.href}
                        className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 transition-all group"
                      >
                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:bg-primary/10 transition-all">
                          <tool.icon className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-300 group-hover:text-white">
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
            className="premium-gradient px-8 py-3 rounded-2xl text-white text-[12px] font-bold uppercase tracking-wider shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
          >
            Order Now
          </Link>
        </div>

        {/* Mobile Icons */}
        <div className="flex items-center gap-3 lg:hidden font-body">
          <Link href="/menu" className="relative w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-[10px] font-bold flex items-center justify-center rounded-lg text-white shadow-lg">0</span>
          </Link>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 top-0 h-screen bg-dark/98 backdrop-blur-3xl z-[60] lg:hidden overflow-y-auto"
          >
            <div className="p-8 pt-24 space-y-12 font-body">
              <div className="grid gap-8">
                {publicLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-extrabold uppercase tracking-tighter text-white hover:text-primary font-heading"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/demo"
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-extrabold uppercase tracking-tighter text-accent hover:text-accent/80 font-heading"
                >
                  Demo Center
                </Link>
              </div>

              <div className="space-y-6">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent border-b border-white/5 pb-4">
                  Internal Demo Tools
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {demoTools.map((tool) => (
                    <Link
                      key={tool.name}
                      href={tool.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-[2rem] border border-white/5"
                    >
                      <tool.icon className="w-6 h-6 text-primary" />
                      <span className="text-sm font-bold uppercase tracking-wider text-gray-300">{tool.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/menu"
                onClick={() => setIsOpen(false)}
                className="premium-gradient block w-full py-6 rounded-[2rem] text-white text-center font-bold text-xl uppercase tracking-wider"
              >
                Start Your Order
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
