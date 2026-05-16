
import Link from "next/link";
import { Utensils, Instagram, Phone, MessageCircle, MapPin, Twitter, Facebook, ShieldCheck, Mail, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark border-t border-white/5 pt-48 pb-20 px-6 font-body relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/[0.02] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 p-32 opacity-[0.02] scale-150 rotate-12">
        <Utensils className="w-96 h-96 text-primary" />
      </div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-24 mb-32 relative z-10">
        <div className="lg:col-span-4 space-y-10">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-14 h-14 bg-primary rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-primary/30 group-hover:rotate-12 transition-transform duration-700 hospitality-glow">
              <Utensils className="text-white w-8 h-8" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-2xl tracking-tighter gold-text leading-none font-heading">CHIKINI</span>
              <span className="font-extrabold text-2xl tracking-tighter text-white leading-none font-heading">MONIE.</span>
            </div>
          </Link>
          <p className="text-gray-500 font-medium leading-relaxed text-lg max-w-sm">
            Akure's premium 24/7 digital food destination. Uncompromising taste engineered for the modern craving.
          </p>
          <div className="flex items-center gap-5">
            {[Instagram, MessageCircle, Twitter, Facebook].map((Icon, idx) => (
              <a key={idx} href="#" className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-white/10 shadow-2xl group">
                <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="font-bold text-xs uppercase tracking-[0.4em] mb-12 text-white font-heading">The Collection</h4>
          <ul className="space-y-6 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
            <li><Link href="/menu" className="hover:text-primary transition-all">Digital Menu</Link></li>
            <li><Link href="/order" className="hover:text-primary transition-all">Start Order</Link></li>
            <li><Link href="/branches" className="hover:text-primary transition-all">Branch Locator</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-all">Our Story</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="font-bold text-xs uppercase tracking-[0.4em] mb-12 text-white font-heading">Hospitality Hubs</h4>
          <ul className="space-y-8 text-[11px] font-bold uppercase tracking-widest text-gray-500">
            <li className="flex gap-5 items-start group">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <span className="leading-relaxed group-hover:text-white transition-colors">FUTA South Gate Hub,<br /><span className="text-gray-600">Central Akure</span></span>
            </li>
            <li className="flex gap-5 items-start group">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <span className="leading-relaxed group-hover:text-white transition-colors">Agape Junction Branch,<br /><span className="text-gray-600">Akure District</span></span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="font-bold text-xs uppercase tracking-[0.4em] mb-12 text-white font-heading">Operational Sync</h4>
          <ul className="space-y-8 text-[11px] font-bold uppercase tracking-widest text-gray-500">
            <li className="flex gap-5 items-center group">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <span className="text-white/80 group-hover:text-white transition-colors">Phone pending confirmation</span>
            </li>
            <li className="flex gap-5 items-center group">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <span className="group-hover:text-white transition-colors">WhatsApp Verified Channel</span>
            </li>
            <li>
              <Link href="/pitch" className="inline-flex items-center gap-3 text-accent hover:text-white transition-all border-b border-accent/20 pb-2">
                <Sparkles className="w-4 h-4" />
                Executive Vision Roadmap
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-20 border-t border-white/5 text-center">
        <div className="p-8 glass-premium rounded-[2.5rem] border border-white/5 mb-16 max-w-4xl mx-auto backdrop-blur-3xl shadow-inner">
          <div className="flex items-center justify-center gap-4 mb-4">
            <ShieldCheck className="w-6 h-6 text-gray-700" />
            <h5 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-600">Business Integrity Clause</h5>
          </div>
          <p className="text-[10px] text-gray-600 leading-relaxed uppercase tracking-widest font-bold">
            © {new Date().getFullYear()} Chikini Monie Digital. High-fidelity business review prototype. Operational confirmation required for final menu, pricing, branch coordinates, and live financial flows. Not connected to live restaurant operations yet.
          </p>
        </div>
        
        <div className="flex items-center justify-center gap-6 opacity-30">
          <div className="h-[1.5px] w-32 bg-gradient-to-r from-transparent to-white" />
          <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-white whitespace-nowrap">Engineering Premium Cravings</p>
          <div className="h-[1.5px] w-32 bg-gradient-to-l from-transparent to-white" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
