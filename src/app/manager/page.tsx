
"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InternalAccessGate from "@/components/InternalAccessGate";

const ManagerDashboard = dynamic(() => import("@/components/ManagerDashboard"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-dark flex items-center justify-center text-gray-500 font-black uppercase tracking-widest">Preparing Manager Analytics...</div>
});

export default function ManagerPage() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <InternalAccessGate dashboardName="Manager Dashboard">
        <ManagerDashboard />
      </InternalAccessGate>
      <Footer />
    </div>
  );
}
