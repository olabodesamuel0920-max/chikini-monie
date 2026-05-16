
"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { getOrders, Order, updateOrderStatus } from "@/lib/order-utils";
import { ChefHat, Clock, CheckCircle, Info, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/lib/utils";

export default function KitchenPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchOrders = () => {
    setIsRefreshing(true);
    const data = getOrders();
    // Only show active kitchen orders (Confirmed, Preparing, Ready)
    const active = data.filter(o => ["Confirmed", "Preparing", "Ready"].includes(o.status));
    // Sort by oldest first
    active.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    setOrders(active);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // More frequent for kitchen
    return () => clearInterval(interval);
  }, []);

  const handleUpdate = (id: string, status: "Preparing" | "Ready" | "Completed") => {
    updateOrderStatus(id, status);
    fetchOrders();
  };

  const getTimeSince = (dateStr: string) => {
    const minutes = Math.floor((new Date().getTime() - new Date(dateStr).getTime()) / 60000);
    return minutes;
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 px-4 pb-12 flex flex-col max-w-[1600px] mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-600/20">
              <ChefHat className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl font-black italic gold-text">KITCHEN DISPLAY</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-gray-500">Preview System</span>
                <span className="text-xs text-orange-500 font-bold">• {orders.length} ACTIVE ORDERS</span>
              </div>
            </div>
          </div>

          <button onClick={fetchOrders} className={`p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors ${isRefreshing ? "animate-spin" : ""}`}>
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center opacity-30">
            <ChefHat className="w-32 h-32 mb-6" />
            <p className="text-2xl font-bold">Kitchen queue is clear</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {orders.map((order) => {
                const waitTime = getTimeSince(order.createdAt);
                const isUrgent = waitTime > 15;

                return (
                  <motion.div
                    key={order.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`glass rounded-3xl overflow-hidden border-2 flex flex-col ${
                      isUrgent ? "border-red-600/50 shadow-red-600/10 shadow-2xl" : "border-white/5"
                    }`}
                  >
                    <div className={`p-4 flex items-center justify-between ${isUrgent ? "bg-red-600/20" : "bg-white/5"}`}>
                      <span className="font-black text-xl italic">{order.id}</span>
                      <div className="flex items-center gap-2">
                        <Clock className={`w-4 h-4 ${isUrgent ? "text-red-500" : "text-gray-500"}`} />
                        <span className={`font-bold text-sm ${isUrgent ? "text-red-500" : "text-gray-400"}`}>{waitTime}m</span>
                      </div>
                    </div>

                    <div className="p-6 flex-grow">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Customer</p>
                          <p className="font-bold text-lg">{order.customerName}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Type</p>
                          <p className="font-bold text-primary">{order.orderType}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Items</p>
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex gap-4 items-start pb-4 border-b border-white/5 last:border-0">
                            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center shrink-0">
                              <span className="font-black text-primary">{item.quantity}</span>
                            </div>
                            <div>
                              <p className="font-bold leading-tight">{item.name}</p>
                              <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-black/40 grid grid-cols-1 gap-2">
                      {order.status === "Confirmed" && (
                        <button
                          onClick={() => handleUpdate(order.id, "Preparing")}
                          className="w-full bg-orange-600 hover:bg-orange-500 py-4 rounded-2xl font-black text-sm transition-all"
                        >
                          START PREPARING
                        </button>
                      )}
                      {order.status === "Preparing" && (
                        <button
                          onClick={() => handleUpdate(order.id, "Ready")}
                          className="w-full bg-green-600 hover:bg-green-500 py-4 rounded-2xl font-black text-sm transition-all"
                        >
                          MARK AS READY
                        </button>
                      )}
                      {order.status === "Ready" && (
                        <button
                          onClick={() => handleUpdate(order.id, "Completed")}
                          className="w-full bg-purple-600 hover:bg-purple-500 py-4 rounded-2xl font-black text-sm transition-all"
                        >
                          MARK COMPLETED
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </main>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-black/80 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-600 rounded-full" />
          <span className="text-xs font-bold text-gray-400">Over 15m</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-600 rounded-full" />
          <span className="text-xs font-bold text-gray-400">Preparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-600 rounded-full" />
          <span className="text-xs font-bold text-gray-400">Ready</span>
        </div>
      </div>
    </div>
  );
}
