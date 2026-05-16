
"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PreviewGate from "@/components/PreviewGate";

const KitchenDashboard = dynamic(() => import("@/components/KitchenDashboard"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-black flex items-center justify-center text-gray-500 font-black uppercase tracking-widest">Initialising Kitchen Display...</div>
});

export default function KitchenPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <PreviewGate dashboardName="Kitchen Display">
        <KitchenDashboard />
      </PreviewGate>
      <Footer />
    </div>
  );
}
