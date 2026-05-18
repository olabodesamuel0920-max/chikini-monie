
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { saveOrder, Order, getDemoMode } from "@/lib/order-utils";
import { Save, Cloud, WifiOff, ArrowLeft, ShoppingBag, Info } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function OrderCheckout() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    branch: "FUTA South Gate",
    orderType: "Takeaway" as "Dine-in" | "Takeaway" | "Delivery",
    paymentStatus: "Pay on pickup/delivery" as "Pay on pickup/delivery" | "Transfer pending",
    notes: "",
  });

  useEffect(() => {
    const savedCart = localStorage.getItem("chikini_monie_cart");
    if (savedCart && JSON.parse(savedCart).length > 0) {
      setCart(JSON.parse(savedCart));
    } else {
      router.push("/menu");
    }
  }, [router]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = formData.orderType === "Delivery" ? 500 : 0;
  const total = subtotal + deliveryFee;

  const handleSaveDemoOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone) {
      alert("Please enter your name and phone number.");
      return;
    }

    setIsSaving(true);

    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 90000) + 10000}`,
      customerName: formData.customerName,
      phone: formData.phone,
      branch: formData.branch,
      items: cart,
      total: total,
      orderType: formData.orderType,
      paymentStatus: formData.paymentStatus,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    setTimeout(async () => {
      await saveOrder(newOrder);
      localStorage.removeItem("chikini_monie_cart");
      setIsSaving(false);
      alert("Demo order saved! If Cloud Demo is active, it will now appear instantly on the operational dashboards in the Demo Center.");
      router.push("/staff");
    }, 1000);
  };

  const demoMode = getDemoMode();

  return (
    <main className="max-w-7xl mx-auto px-6 pt-48 pb-32 font-body">
      <div className="flex items-center gap-4 mb-12">
        <Link href="/menu" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-colors border border-white/5 group">
          <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </Link>
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold gold-text uppercase leading-none font-heading tracking-tight">CHECKOUT<span className="italic text-white">.</span></h1>
          <p className="text-gray-500 mt-2 font-medium">One step away from big enjoyment.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Side: Form */}
        <div className="lg:col-span-7 space-y-12">
          <section className="space-y-8">
            <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-2xl border text-[11px] font-bold uppercase tracking-wider ${
              demoMode === "Cloud Demo Active" 
              ? "bg-green-500/10 border-green-500/20 text-green-500" 
              : "bg-blue-500/10 border-blue-500/20 text-blue-500"
            }`}>
              {demoMode === "Cloud Demo Active" ? <Cloud className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              {demoMode}
            </div>

            <form onSubmit={handleSaveDemoOrder} className="glass-premium p-10 rounded-[3rem] border border-white/10 space-y-10 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samuel Olabode"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 focus:border-primary focus:bg-black/60 focus:outline-none transition-all text-white font-bold"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 08012345678"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 focus:border-primary focus:bg-black/60 focus:outline-none transition-all text-white font-bold"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Select Branch</label>
                <div className="relative">
                  <select
                    className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 focus:border-primary focus:bg-black/60 focus:outline-none transition-all text-white font-bold appearance-none cursor-pointer"
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  >
                    <option>FUTA South Gate</option>
                    <option>Agape Junction</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Order Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {["Dine-in", "Takeaway", "Delivery"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, orderType: type as any })}
                      className={`py-5 rounded-2xl border font-bold text-xs uppercase tracking-wider transition-all ${
                        formData.orderType === type
                          ? "premium-gradient border-transparent text-white shadow-xl shadow-primary/30 scale-105"
                          : "bg-white/5 border-white/10 text-gray-500 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="w-full premium-gradient py-8 rounded-[2rem] font-bold text-xl text-white shadow-[0_20px_50px_rgba(255,102,0,0.3)] flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 uppercase tracking-wider"
              >
                {isSaving ? "Finalising Demo Order..." : "Place Demo Order"}
                <Save className="w-6 h-6" />
              </button>
            </form>
          </section>
        </div>

        {/* Right Side: Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-32 space-y-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent border border-accent/20">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-extrabold gold-text uppercase leading-none font-heading tracking-tight">SUMMARY.</h3>
            </div>

            <div className="glass-premium p-10 rounded-[3rem] border border-white/10 space-y-10 shadow-2xl">
              <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center group">
                    <div className="flex gap-4 items-center">
                      <div className="w-14 h-14 bg-white/5 rounded-2xl overflow-hidden border border-white/5">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <p className="font-bold text-lg leading-tight uppercase font-heading tracking-tight">{item.name}</p>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-1">
                          {item.quantity} units <span className="mx-2 opacity-30">|</span> {formatPrice(item.price)} each
                        </p>
                      </div>
                    </div>
                    <p className="font-bold text-lg font-heading">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="pt-10 border-t border-white/5 space-y-4">
                <div className="flex justify-between text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                  <span>Delivery/Service Fee</span>
                  <span className="text-green-500">{formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between items-end pt-8 border-t border-white/5">
                  <span className="text-3xl font-extrabold uppercase font-heading tracking-tight">Total</span>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] block mb-1">Final Amount</span>
                    <span className="text-5xl font-extrabold gold-text italic leading-none font-heading">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-[#ff6600]/5 border border-[#ff6600]/20 rounded-3xl space-y-4">
                  <div className="flex items-center gap-3">
                    <Info className="w-5 h-5 text-primary shrink-0" />
                    <h4 className="font-extrabold text-sm text-primary uppercase tracking-wider font-heading">Payment Preview</h4>
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold leading-relaxed uppercase tracking-wider">
                    Payment is NOT active in this business review preview. No real customer banking or card data should be used in this demo mode.
                  </p>
                  <div className="pt-3 border-t border-white/5">
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mb-2">Production Options (Pending CEO Selection):</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                      <li className="flex items-center gap-1.5"><span className="text-primary">•</span> Pay on Delivery</li>
                      <li className="flex items-center gap-1.5"><span className="text-primary">•</span> Bank transfer confirmation workflow</li>
                      <li className="flex items-center gap-1.5"><span className="text-primary">•</span> POS / Counter Payment</li>
                      <li className="flex items-center gap-1.5"><span className="text-primary">•</span> Paystack Online Pay</li>
                      <li className="flex items-center gap-1.5 sm:col-span-2"><span className="text-primary">•</span> WhatsApp Payment Confirm</li>
                    </ul>
                  </div>
                </div>

                <div className="p-6 bg-white/5 rounded-3xl border border-white/5 flex items-start gap-4">
                  <Info className="w-5 h-5 text-gray-500 mt-1 shrink-0" />
                  <p className="text-[10px] text-gray-500 font-bold leading-relaxed uppercase tracking-wider">
                    This is a business review prototype. Demo orders will appear instantly on the operational dashboards for workflow preview.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
