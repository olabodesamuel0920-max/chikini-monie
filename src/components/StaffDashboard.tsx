
"use client";

import { useState, useEffect } from "react";
import OrderCard from "@/components/OrderCard";
import { getOrders, Order, OrderStatus, loadSampleOrders, resetOrders, getDemoMode } from "@/lib/order-utils";
import { Search, Trash2, Database, LayoutDashboard, RefreshCw, Cloud, WifiOff } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { supabase, isSupabaseConfigured } from "@/lib/supabase-client";
import { fetchSupabaseOrders } from "@/lib/supabase-orders";

export default function StaffDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "All">("All");
  const [filterBranch, setFilterBranch] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchAllOrders = async () => {
    setIsRefreshing(true);
    const localData = getOrders();
    if (isSupabaseConfigured) {
      const cloudData = await fetchSupabaseOrders();
      if (cloudData.length > 0) {
        setOrders(cloudData);
      } else {
        setOrders(localData);
      }
    } else {
      setOrders(localData);
    }
    setTimeout(() => setIsRefreshing(false), 500);
  };

  useEffect(() => {
    fetchAllOrders();
    if (isSupabaseConfigured) {
      const channel = supabase
        .channel('schema-db-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'demo_orders' }, () => fetchAllOrders())
        .subscribe();
      return () => { supabase.removeChannel(channel); };
    }
  }, []);

  const handleLoadSample = () => {
    loadSampleOrders();
    fetchAllOrders();
  };

  const handleReset = () => {
    if (confirm("Reset all local demo orders?")) {
      resetOrders();
      fetchAllOrders();
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus === "All" || order.status === filterStatus;
    const matchesBranch = filterBranch === "All" || order.branch === filterBranch;
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesBranch && matchesSearch;
  });

  const demoMode = getDemoMode();

  return (
    <main className="max-w-7xl mx-auto px-4 pt-32 pb-24">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
              <LayoutDashboard className="w-6 h-6" />
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
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic">Staff Dashboard</h1>
          <p className="text-gray-500 mt-2">Manage customer orders and workflow in real-time.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleLoadSample}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-white/10 transition-all"
          >
            <Database className="w-4 h-4 text-blue-400" />
            Load Samples
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-red-900/20 border border-red-900/30 rounded-xl text-sm font-bold text-red-400 flex items-center gap-2 hover:bg-red-900/40 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Reset Local
          </button>
          <button
            onClick={fetchAllOrders}
            className={`p-3 bg-primary rounded-xl text-white shadow-lg shadow-primary/20 transition-transform active:scale-95 ${isRefreshing ? "animate-spin" : ""}`}
          >
            <RefreshCw className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="glass p-6 rounded-3xl border border-white/10 mb-12 flex flex-col md:flex-row gap-6">
        <div className="flex-grow relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search ID or Customer..."
            className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-6 focus:border-primary transition-colors focus:outline-none text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Branch</label>
            <select
              className="bg-black/40 border border-white/10 rounded-xl py-3 px-4 focus:border-primary transition-colors focus:outline-none text-sm"
              value={filterBranch}
              onChange={(e) => setFilterBranch(e.target.value)}
            >
              <option>All</option>
              <option>FUTA South Gate</option>
              <option>Agape Junction</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Status</label>
            <select
              className="bg-black/40 border border-white/10 rounded-xl py-3 px-4 focus:border-primary transition-colors focus:outline-none text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
            >
              <option>All</option>
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Preparing</option>
              <option>Ready</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="min-h-[400px]">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-32 glass rounded-[3rem] border border-dashed border-white/10">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <LayoutDashboard className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">No orders found</h3>
            <p className="text-gray-500 mb-8">Try clearing filters or check your cloud connection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredOrders.map((order) => (
                <OrderCard key={order.id} order={order} onUpdate={fetchAllOrders} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  );
}
