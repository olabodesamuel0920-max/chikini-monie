"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InternalAccessGate from "@/components/InternalAccessGate";

const RiderDashboard = dynamic(() => import("@/components/RiderDashboard"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-[#050505] flex items-center justify-center text-gray-500 font-black uppercase tracking-widest">Preparing Rider Dashboard...</div>
});

export default function RiderPage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar />
      <InternalAccessGate dashboardName="Rider Dashboard">
        <RiderDashboard />
      </InternalAccessGate>
      <Footer />
    </div>
  );
}
