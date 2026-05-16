
"use client";

import { useState, useEffect } from "react";
import OrderCard from "@/components/OrderCard";
import { getOrders, Order, getDemoMode } from "@/lib/order-utils";
import { ChefHat, RefreshCw, Cloud, WifiOff } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { supabase, isSupabaseConfigured } from "@/lib/supabase-client";
import { fetchSupabaseOrders } from "@/lib/supabase-orders";

export default function KitchenDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchKitchenOrders = async () => {
    setIsRefreshing(true);
    
    // Get local data
    const localData = getOrders().filter(o => ["Pending", "Confirmed", "Preparing"].includes(o.status));
    
    // Get cloud data if available
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
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'demo_orders' },
          () => fetchKitchenOrders()
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, []);

  const demoMode = getDemoMode();

  return (
    <main className="max-w-7xl mx-auto px-4 pt-32 pb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center text-accent">
              <ChefHat className="w-6 h-6" />
            </div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-[10px] font-black uppercase tracking-widest ${
              demoMode === "Cloud Demo Active" 
              ? "bg-green-500/10 border-green-500/20 text-green-500" 
              : "bg-blue-500/10 border-blue-500/20 text-blue-500"
            }`}>
              {demoMode === "Cloud Demo Active" ? <Cloud className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
              {demoMode}
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic">Kitchen Display</h1>
          <p className="text-gray-500 mt-2">Active food preparation queue.</p>
        </div>

        <button
          onClick={fetchKitchenOrders}
          className={`p-4 bg-accent/20 rounded-2xl text-accent shadow-lg shadow-accent/10 transition-transform active:scale-95 ${isRefreshing ? "animate-spin" : ""}`}
        >
          <RefreshCw className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {orders.length === 0 ? (
            <div className="md:col-span-2 xl:col-span-3 text-center py-32 glass rounded-[3rem] border border-dashed border-white/10">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <ChefHat className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Kitchen is clear</h3>
              <p className="text-gray-500">No active orders in preparation.</p>
            </div>
          ) : (
            orders.map((order) => (
              <OrderCard key={order.id} order={order} onUpdate={fetchKitchenOrders} />
            ))
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
