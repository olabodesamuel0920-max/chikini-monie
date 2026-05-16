
"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SyncTestDashboard = dynamic(() => import("@/components/SyncTestDashboard"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-[#050505] flex items-center justify-center text-gray-500 font-black uppercase tracking-widest">Preparing Sync Test Center...</div>
});

export default function SyncTestPage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar />
      <SyncTestDashboard />
      <Footer />
    </div>
  );
}
