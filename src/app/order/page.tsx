
"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const OrderCheckout = dynamic(() => import("@/components/OrderCheckout"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-[#050505] flex items-center justify-center text-gray-500 font-black uppercase tracking-widest">Initialising Checkout...</div>
});

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar />
      <OrderCheckout />
      <Footer />
    </div>
  );
}
