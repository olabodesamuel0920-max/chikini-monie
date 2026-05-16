
import Link from "next/link";
import { Utensils, Instagram, Phone, MessageCircle, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Utensils className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tighter gold-text">CHIKINI MONIE</span>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed">
            Akure's premium 24/7 food experience. Big enjoyment with small money. Built for cravings, students, and workers.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors">
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link href="/menu" className="hover:text-primary transition-colors">View Menu</Link></li>
            <li><Link href="/order" className="hover:text-primary transition-colors">Order Now</Link></li>
            <li><Link href="/branches" className="hover:text-primary transition-colors">Branches</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Branches</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex gap-2">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span>FUTA South Gate, Akure</span>
            </li>
            <li className="flex gap-2">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span>Agape Junction, Akure</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Support</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex gap-2">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <span>0800-CHIKINI-1</span>
            </li>
            <li className="flex gap-2">
              <MessageCircle className="w-4 h-4 text-primary shrink-0" />
              <span>WhatsApp Orders</span>
            </li>
            <li><Link href="/pitch" className="text-accent hover:underline">Business Pitch</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 text-center">
        <p className="text-[10px] text-gray-500 leading-relaxed max-w-3xl mx-auto uppercase tracking-widest">
          © {new Date().getFullYear()} Chikini Monie. This is a business review prototype. Final menu, pricing, phone numbers, branch details, media, payments, and operational workflows require confirmation from Chikini Monie management.
        </p>
        <p className="mt-4 text-[9px] opacity-30 uppercase tracking-[0.4em] font-black">Premium Digital Hub Demo • Akure</p>
      </div>
    </footer>
  );
};

export default Footer;
