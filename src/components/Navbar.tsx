
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, User, Utensils } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Demo Center", href: "/demo" },
    { name: "Menu", href: "/menu" },
    { name: "Staff", href: "/staff" },
    { name: "Kitchen", href: "/kitchen" },
    { name: "Manager", href: "/manager" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-3",
        scrolled ? "bg-dark/80 backdrop-blur-md border-b border-white/10 shadow-lg" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
            <Utensils className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tighter gold-text">CHIKINI MONIE</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/menu"
            className="premium-gradient px-6 py-2 rounded-full text-white text-sm font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-transform"
          >
            Order Now
          </Link>
        </div>

        {/* Mobile Icons */}
        <div className="flex items-center gap-4 md:hidden">
          <Link href="/menu" className="relative p-2">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-[10px] flex items-center justify-center rounded-full text-white">0</span>
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-dark/95 backdrop-blur-xl border-b border-white/10 p-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-semibold"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/menu"
                onClick={() => setIsOpen(false)}
                className="premium-gradient w-full py-4 rounded-xl text-white text-center font-bold"
              >
                Start Order
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
