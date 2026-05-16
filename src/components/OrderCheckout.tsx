
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { saveOrder, Order, getDemoMode } from "@/lib/order-utils";
import { ShoppingBag, MapPin, Truck, Utensils, MessageCircle, Save, ArrowLeft, Info, Cloud, WifiOff } from "lucide-react";
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
    if (savedCart) {
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
      alert("Demo order saved! If Cloud Demo is active, it will now appear instantly on the Staff, Kitchen, and Manager dashboards.");
      router.push("/staff");
    }, 1000);
  };

  const demoMode = getDemoMode();

  return (
    <main className="max-w-7xl mx-auto px-4 pt-32 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <section>
            <h1 className="text-4xl md:text-5xl font-black mb-6 italic gold-text uppercase">COMPLETE ORDER</h1>
            <p className="text-gray-400 mb-6">Review your cravings and choose how you want them served.</p>
            
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-widest mb-10 ${
              demoMode === "Cloud Demo Active" 
              ? "bg-green-500/10 border-green-500/20 text-green-500" 
              : "bg-blue-500/10 border-blue-500/20 text-blue-500"
            }`}>
              {demoMode === "Cloud Demo Active" ? <Cloud className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
              {demoMode}
            </div>
          </section>

          <form onSubmit={handleSaveDemoOrder} className="glass p-8 rounded-3xl border border-white/10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samuel Olabode"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 focus:border-primary focus:outline-none transition-colors"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 08012345678"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 focus:border-primary focus:outline-none transition-colors"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Select Branch</label>
              <select
                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 focus:border-primary focus:outline-none transition-colors appearance-none"
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
              >
                <option>FUTA South Gate</option>
                <option>Agape Junction</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {["Dine-in", "Takeaway", "Delivery"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, orderType: type as any })}
                  className={`p-4 rounded-2xl border font-bold text-sm transition-all ${
                    formData.orderType === type
                      ? "bg-primary border-primary text-white"
                      : "bg-white/5 border-white/10 text-gray-500 hover:bg-white/10"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full premium-gradient py-6 rounded-2xl font-black text-xl text-white shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
            >
              {isSaving ? "Saving Demo Order..." : "Place Demo Order"}
              <Save className="w-6 h-6" />
            </button>
          </form>
        </div>

        <div className="space-y-8">
          <h3 className="text-2xl font-black italic gold-text uppercase">Order Summary</h3>
          <div className="glass p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="space-y-4">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.quantity}x @ {formatPrice(item.price)}</p>
                  </div>
                  <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 space-y-2">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Service/Delivery Fee</span>
                <span>{formatPrice(deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-2xl font-black text-white pt-4">
                <span className="italic uppercase">Total</span>
                <span className="gold-text">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
