
"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InternalAccessGate from "@/components/InternalAccessGate";

const StaffDashboard = dynamic(() => import("@/components/StaffDashboard"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-[#050505] flex items-center justify-center text-gray-500 font-black uppercase tracking-widest">Preparing Staff Dashboard...</div>
});

export default function StaffPage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar />
      <InternalAccessGate dashboardName="Staff Dashboard">
        <StaffDashboard />
      </InternalAccessGate>
      <Footer />
    </div>
  );
}
