
"use client";

import { useState, useEffect } from "react";
import { isSupabaseConfigured } from "@/lib/supabase-client";
import { getOrders, saveOrder, resetOrders, getDemoMode, Order } from "@/lib/order-utils";
import { Cloud, WifiOff, Trash2, Plus, AlertCircle } from "lucide-react";

export default function SyncTestDashboard() {
  const [localCount, setLocalCount] = useState(0);
  const [cloudStatus, setCloudStatus] = useState<"Checking" | "Connected" | "Disconnected">("Checking");
  const [lastSync, setLastSync] = useState<string | null>(null);

  useEffect(() => {
    setLocalCount(getOrders().length);
    if (isSupabaseConfigured) {
      setCloudStatus("Connected");
    } else {
      setCloudStatus("Disconnected");
    }
  }, []);

  const handleCreateTestOrder = async () => {
    const testOrder: Order = {
      id: `TEST-${Math.floor(Math.random() * 9000) + 1000}`,
      customerName: "Sync Test User",
      phone: "08000000000",
      branch: "FUTA South Gate",
      items: [{ id: "r1", name: "Test Jollof", price: 1000, category: "Rice Meals", image: "", quantity: 1, description: "Sync test item" }],
      total: 1000,
      orderType: "Dine-in",
      paymentStatus: "Pay on pickup/delivery",
      status: "Pending",
      createdAt: new Date().toISOString()
    };
    await saveOrder(testOrder);
    setLocalCount(getOrders().length);
    setLastSync(new Date().toLocaleTimeString());
    alert("Test order created!");
  };

  const handleClearLocal = () => {
    if (confirm("Clear local storage orders?")) {
      resetOrders();
      setLocalCount(0);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 pt-32 pb-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black italic gold-text mb-4 uppercase tracking-tighter">Sync Test Center</h1>
        <p className="text-gray-500">Developer tool to verify cloud synchronization status.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="glass p-8 rounded-[2.5rem] border border-white/10">
          <h3 className="text-gray-500 text-xs font-black uppercase tracking-widest mb-6">Environment Status</h3>
          <div className="flex items-center gap-4 mb-8">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${cloudStatus === "Connected" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}>
              {cloudStatus === "Connected" ? <Cloud className="w-8 h-8" /> : <WifiOff className="w-8 h-8" />}
            </div>
            <div>
              <p className="text-2xl font-black italic uppercase tracking-tighter">{getDemoMode()}</p>
            </div>
          </div>
        </div>

        <div className="glass p-8 rounded-[2.5rem] border border-white/10 space-y-4">
          <button onClick={handleCreateTestOrder} className="w-full premium-gradient p-5 rounded-2xl text-white font-black flex items-center justify-center gap-3">
            <Plus className="w-5 h-5" /> Create Sync Test Order
          </button>
          <button onClick={handleClearLocal} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-gray-400 font-bold flex items-center justify-center gap-3">
            <Trash2 className="w-5 h-5" /> Clear Local Storage
          </button>
        </div>
      </div>
    </main>
  );
}
