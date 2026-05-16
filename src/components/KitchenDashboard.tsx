
"use client";

import { useState, useEffect } from "react";
import OrderCard from "@/components/OrderCard";
import { getOrders, Order, getDemoMode } from "@/lib/order-utils";
import { ChefHat, RefreshCw, Cloud, WifiOff } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase, isSupabaseConfigured } from "@/lib/supabase-client";
import { fetchSupabaseOrders } from "@/lib/supabase-orders";

export default function KitchenDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchKitchenOrders = async () => {
    setIsRefreshing(true);
    const localData = getOrders().filter(o => ["Pending", "Confirmed", "Preparing"].includes(o.status));
    if (isSupabaseConfigured) {
      const cloudData = await fetchSupabaseOrders();
      const kitchenCloud = cloudData.filter(o => ["Pending", "Confirmed", "Preparing"].includes(o.status));
      if (kitchenCloud.length > 0 || cloudData.length > 0) {
        setOrders(kitchenCloud);
      } else {
        setOrders(localData);
      }
    } else {
      setOrders(localData);
    }
    setTimeout(() => setIsRefreshing(false), 500);
  };

  useEffect(() => {
    fetchKitchenOrders();
    if (isSupabaseConfigured) {
      const channel = supabase
        .channel('kitchen-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'demo_orders' }, () => fetchKitchenOrders())
        .subscribe();
      return () => { supabase.removeChannel(channel); };
    }
  }, []);

  const demoMode = getDemoMode();

  return (
    <main className="max-w-7xl mx-auto px-6 pt-48 pb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-accent/10 rounded-[1.5rem] flex items-center justify-center text-accent border border-accent/20 shadow-2xl shadow-accent/20">
              <ChefHat className="w-8 h-8" />
            </div>
            <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-2xl border text-[11px] font-black uppercase tracking-[0.2em] ${
              demoMode === "Cloud Demo Active" 
              ? "bg-green-500/10 border-green-500/20 text-green-500" 
              : "bg-blue-500/10 border-blue-500/20 text-blue-500"
            }`}>
              {demoMode === "Cloud Demo Active" ? <Cloud className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              {demoMode}
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">Kitchen <span className="text-accent">Display.</span></h1>
          <p className="text-gray-500 mt-4 text-xl font-medium max-w-xl">Active food preparation queue and digital tickets.</p>
        </div>

        <button
          onClick={fetchKitchenOrders}
          className={`w-16 h-16 bg-accent/10 border border-accent/20 rounded-[1.5rem] text-accent shadow-2xl shadow-accent/10 flex items-center justify-center active:scale-95 transition-all ${isRefreshing ? "animate-spin" : ""}`}
        >
          <RefreshCw className="w-7 h-7" />
        </button>
      </div>

      <div className="min-h-[500px]">
        {orders.length === 0 ? (
          <div className="text-center py-40 glass-premium rounded-[4rem] border border-dashed border-white/10">
            <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-white/5">
              <ChefHat className="w-10 h-10 text-gray-700" />
            </div>
            <h3 className="text-3xl font-black uppercase italic text-gray-400 mb-4 tracking-tighter">Kitchen is clear.</h3>
            <p className="text-gray-600 text-lg">No active orders in the preparation queue.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            <AnimatePresence mode="popLayout">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} onUpdate={fetchKitchenOrders} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  );
}
