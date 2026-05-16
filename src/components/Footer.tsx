
import Link from "next/link";
import { Utensils, Instagram, Phone, MessageCircle, MapPin, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
        <div className="space-y-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/20 group-hover:scale-110 transition-transform">
              <Utensils className="text-white w-6 h-6" />
            </div>
            <span className="font-black text-2xl tracking-tighter gold-text italic uppercase">CHIKINI MONIE.</span>
          </Link>
          <p className="text-gray-500 font-medium leading-relaxed">
            Akure's premium 24/7 digital food destination. Uncompromising taste for every craving. Built for the bold.
          </p>
          <div className="flex items-center gap-4">
            {[Instagram, MessageCircle, Twitter, Facebook].map((Icon, idx) => (
              <a key={idx} href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-white/5 shadow-xl">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-black text-sm uppercase tracking-[0.4em] mb-10 text-white italic">The Menu</h4>
          <ul className="space-y-4 text-[12px] font-black uppercase tracking-widest text-gray-500">
            <li><Link href="/menu" className="hover:text-primary transition-colors">Digital Menu</Link></li>
            <li><Link href="/order" className="hover:text-primary transition-colors">Start Order</Link></li>
            <li><Link href="/branches" className="hover:text-primary transition-colors">Branch Locator</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">The Story</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-sm uppercase tracking-[0.4em] mb-10 text-white italic">Global Presence</h4>
          <ul className="space-y-6 text-[12px] font-black uppercase tracking-widest text-gray-500">
            <li className="flex gap-4 items-start">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <span className="leading-relaxed">FUTA South Gate,<br /> Akure Hub</span>
            </li>
            <li className="flex gap-4 items-start">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <span className="leading-relaxed">Agape Junction,<br /> Akure Branch</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-sm uppercase tracking-[0.4em] mb-10 text-white italic">Operational Hub</h4>
          <ul className="space-y-6 text-[12px] font-black uppercase tracking-widest text-gray-500">
            <li className="flex gap-4 items-center">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <span className="text-white">Phone pending confirmation</span>
            </li>
            <li className="flex gap-4 items-center">
              <MessageCircle className="w-5 h-5 text-primary shrink-0" />
              <span>WhatsApp Logic</span>
            </li>
            <li><Link href="/pitch" className="text-accent hover:text-white transition-colors border-b border-accent/20 pb-1">Business Vision 2.0</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-16 border-t border-white/5 text-center">
        <p className="text-[10px] text-gray-700 leading-relaxed max-w-4xl mx-auto uppercase tracking-widest font-medium">
          © {new Date().getFullYear()} Chikini Monie Digital Hub. This platform is a high-fidelity business review prototype. Operational confirmation required for final menu, pricing, phone numbers, branch details, and live transaction flows.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4 opacity-20">
          <div className="h-[1px] w-20 bg-white" />
          <p className="text-[9px] uppercase tracking-[0.6em] font-black text-white">Engineering Premium Cravings</p>
          <div className="h-[1px] w-20 bg-white" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
