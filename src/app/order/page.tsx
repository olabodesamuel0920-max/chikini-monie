
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatPrice } from "@/lib/utils";
import { saveOrder, Order } from "@/lib/order-utils";
import { ShoppingBag, MapPin, Truck, Utensils, MessageCircle, Save, ArrowLeft, Info } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function OrderPage() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    branch: "FUTA South Gate",
    orderType: "Takeaway" as "Takeaway" | "Dine-in" | "Delivery",
    paymentStatus: "Pay on pickup/delivery" as "Pay on pickup/delivery" | "Transfer pending",
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("chikini_monie_cart");
    if (savedCart) {
      const items = JSON.parse(savedCart);
      if (items.length === 0) router.push("/menu");
      setCart(items);
    } else {
      router.push("/menu");
    }
  }, [router]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateWhatsAppLink = () => {
    const itemsText = cart.map((i) => `*${i.quantity}x ${i.name}* (${formatPrice(i.price * i.quantity)})`).join("\n");
    const text = `*NEW ORDER - CHIKINI MONIE*\n\n*Customer:* ${formData.name}\n*Phone:* ${formData.phone}\n*Branch:* ${formData.branch}\n*Type:* ${formData.orderType}\n*Payment:* ${formData.paymentStatus}\n\n*Items:*\n${itemsText}\n\n*TOTAL: ${formatPrice(cartTotal)}*\n\n_Sent from Chikini Monie Digital Hub_`;
    return `https://wa.me/2340000000000?text=${encodeURIComponent(text)}`;
  };

  const handleSaveDemoOrder = () => {
    if (!formData.name || !formData.phone) {
      alert("Please fill in your name and phone number.");
      return;
    }

    setIsSaving(true);
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 9000) + 1000}`,
      customerName: formData.name,
      phone: formData.phone,
      branch: formData.branch,
      items: cart,
      total: cartTotal,
      orderType: formData.orderType,
      paymentStatus: formData.paymentStatus,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      saveOrder(newOrder);
      localStorage.removeItem("chikini_monie_cart");
      setIsSaving(false);
      alert("Demo order saved successfully! You can view it in the Staff Dashboard.");
      router.push("/staff");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 pt-32 pb-24">
        <div className="flex items-center gap-2 text-gray-500 mb-8 hover:text-white transition-colors cursor-pointer" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
          <span className="font-bold uppercase tracking-widest text-xs">Back to Menu</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Form */}
          <div className="space-y-8">
            <section>
              <h1 className="text-4xl md:text-5xl font-black mb-6 italic gold-text uppercase">COMPLETE ORDER</h1>
              <p className="text-gray-400 mb-10">Review your cravings and choose how you want them served.</p>
            </section>

            <section className="glass p-8 rounded-3xl border border-white/10 space-y-8">
              <div className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-3">
                  <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-sm">1</span>
                  Your Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Samuel Olabode"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 focus:border-primary transition-colors focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 0812 345 6789"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 focus:border-primary transition-colors focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-3">
                  <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-sm">2</span>
                  Service Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Select Branch</label>
                    <select
                      name="branch"
                      value={formData.branch}
                      onChange={handleInputChange}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 focus:border-primary transition-colors focus:outline-none"
                    >
                      <option>FUTA South Gate</option>
                      <option>Agape Junction</option>
                      <option>Other (Pending Confirmation)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Order Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Dine-in", "Takeaway", "Delivery"].map((type) => (
                        <button
                          key={type}
                          onClick={() => setFormData(prev => ({ ...prev, orderType: type as any }))}
                          className={`py-4 rounded-xl text-xs font-bold transition-all border ${
                            formData.orderType === type
                              ? "bg-primary/20 border-primary text-primary"
                              : "bg-black/40 border-white/10 text-gray-500"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-3">
                  <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-sm">3</span>
                  Payment Status
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["Pay on pickup/delivery", "Transfer pending"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFormData(prev => ({ ...prev, paymentStatus: status as any }))}
                      className={`py-4 px-6 rounded-xl text-xs font-bold transition-all border text-left flex items-center gap-3 ${
                        formData.paymentStatus === status
                          ? "bg-primary/20 border-primary text-primary"
                          : "bg-black/40 border-white/10 text-gray-500"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 ${formData.paymentStatus === status ? "border-primary bg-primary" : "border-gray-600"}`} />
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <div className="bg-accent/10 border border-accent/20 p-6 rounded-3xl flex items-start gap-4">
              <Info className="text-accent w-6 h-6 shrink-0" />
              <p className="text-xs text-gray-400">
                This is a <span className="text-accent font-bold">PREVIEW SYSTEM</span>. No real payments are processed. Saving the order will store it locally for staff dashboard demonstration.
              </p>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:sticky lg:top-32 h-fit space-y-6">
            <div className="glass rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-white/5 bg-white/5">
                <h3 className="text-xl font-black italic">ORDER SUMMARY</h3>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2 no-scrollbar">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/5 overflow-hidden shrink-0 border border-white/10">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.quantity} x {formatPrice(item.price)}</p>
                        </div>
                      </div>
                      <span className="font-bold text-sm">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/5 space-y-4">
                  <div className="flex justify-between text-gray-400 text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 text-sm">
                    <span>VAT (Included)</span>
                    <span>₦0</span>
                  </div>
                  <div className="flex justify-between text-2xl font-black pt-4 border-t border-white/10">
                    <span>TOTAL</span>
                    <span className="gold-text">{formatPrice(cartTotal)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-4">
                  <a
                    href={generateWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] py-5 rounded-2xl text-white font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-green-500/10"
                  >
                    <MessageCircle className="w-6 h-6" />
                    Send Order on WhatsApp
                  </a>
                  <button
                    onClick={handleSaveDemoOrder}
                    disabled={isSaving}
                    className="w-full premium-gradient py-5 rounded-2xl text-white font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/30 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Save className="w-6 h-6" />
                        Save Demo Order
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            <p className="text-center text-[10px] text-gray-600 uppercase tracking-[0.2em]">
              CHIKINI MONIE • PREMIUM FOOD HUB • AKURE
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
