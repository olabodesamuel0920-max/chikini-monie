
"use client";

import { useState, useEffect } from "react";
import OrderCard from "@/components/OrderCard";
import { getOrders, Order, OrderStatus, loadSampleOrders, resetOrders, getDemoMode } from "@/lib/order-utils";
import { Search, Trash2, Database, LayoutDashboard, RefreshCw, Cloud, WifiOff, Filter } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase, isSupabaseConfigured } from "@/lib/supabase-client";
import { fetchSupabaseOrders } from "@/lib/supabase-orders";

import DemoNotice from "@/components/DemoNotice";
import { Info, Target } from "lucide-react";

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
    <div className="min-h-screen bg-dark">
      <DemoNotice />
      <main className="max-w-7xl mx-auto px-6 pt-48 pb-32 font-body">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-primary/10 rounded-[1.5rem] flex items-center justify-center text-primary border border-primary/20 shadow-2xl shadow-primary/20">
                <LayoutDashboard className="w-7 h-7" />
              </div>
              <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-2xl border text-[11px] font-bold uppercase tracking-wider ${
                demoMode === "Cloud Demo Active" 
                ? "bg-green-500/10 border-green-500/20 text-green-500" 
                : "bg-blue-500/10 border-blue-500/20 text-blue-500"
              }`}>
                {demoMode === "Cloud Demo Active" ? <Cloud className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
                {demoMode}
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white uppercase leading-none font-heading tracking-tight">Staff <span className="gold-text italic">Board.</span></h1>
            <p className="text-gray-500 mt-4 text-xl font-medium max-w-xl">
              Manage the live digital order stream and update fulfillment status.
              <span className="block mt-2 text-xs text-primary font-bold uppercase tracking-widest">Demo order board for business review only.</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleLoadSample}
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-[2rem] text-[11px] font-bold uppercase tracking-wider flex items-center gap-3 hover:bg-white/10 transition-all"
            >
              <Database className="w-4 h-4 text-accent" />
              Load Samples
            </button>
            <button
              onClick={handleReset}
              className="px-8 py-4 bg-red-900/10 border border-red-900/20 rounded-[2rem] text-[11px] font-bold uppercase tracking-wider text-red-400 flex items-center gap-3 hover:bg-red-900/30 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              Reset Data
            </button>
            <button
              onClick={fetchAllOrders}
              className={`w-14 h-14 bg-primary rounded-[1.5rem] text-white shadow-2xl shadow-primary/30 flex items-center justify-center active:scale-95 transition-all ${isRefreshing ? "animate-spin" : ""}`}
            >
              <RefreshCw className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Order Pipeline Guide */}
        <div className="mb-12 glass-premium p-8 rounded-[2.5rem] border border-white/5 overflow-x-auto custom-scrollbar">
          <div className="flex items-center justify-between min-w-[800px] px-4">
            {[
              { status: "Pending", desc: "Awaiting Confirmation" },
              { status: "Confirmed", desc: "Sent to Kitchen" },
              { status: "Preparing", desc: "Food in Prep" },
              { status: "Ready", desc: "Awaiting Pickup" },
              { status: "Completed", desc: "Fulfilled" }
            ].map((step, idx, arr) => (
              <div key={step.status} className="flex items-center gap-6">
                <div className="text-center">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-1">{step.status}</span>
                  <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{step.desc}</span>
                </div>
                {idx < arr.length - 1 && (
                  <div className="w-12 h-[1px] bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-premium p-10 rounded-[3.5rem] border border-white/5 mb-20 flex flex-col lg:flex-row gap-10 items-center shadow-2xl">
          <div className="flex-grow relative w-full group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors w-6 h-6" />
            <input
              type="text"
              placeholder="Search Order ID or Customer Name..."
              className="w-full bg-black/40 border border-white/10 rounded-[2rem] py-6 pl-16 pr-8 focus:border-primary focus:bg-black/60 transition-all focus:outline-none text-lg font-bold"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-6 w-full lg:w-auto shrink-0">
            <div className="flex flex-col gap-3 w-full sm:w-48">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1 flex items-center gap-2">
                <Filter className="w-3 h-3" /> Branch
              </label>
              <select
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 focus:border-primary transition-colors focus:outline-none text-sm font-bold appearance-none cursor-pointer"
                value={filterBranch}
                onChange={(e) => setFilterBranch(e.target.value)}
              >
                <option>All</option>
                <option>FUTA South Gate</option>
                <option>Agape Junction</option>
              </select>
            </div>
            <div className="flex flex-col gap-3 w-full sm:w-48">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1 flex items-center gap-2">
                <Filter className="w-3 h-3" /> Status
              </label>
              <select
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 focus:border-primary transition-colors focus:outline-none text-sm font-bold appearance-none cursor-pointer"
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

        <div className="min-h-[500px]">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-40 glass-premium rounded-[4rem] border border-dashed border-white/10 font-body">
              <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-white/5">
                <LayoutDashboard className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-3xl font-bold uppercase text-gray-400 mb-4 tracking-tight font-heading">No live orders.</h3>
              <p className="text-gray-600 text-lg font-medium mb-4">Waiting for the next craving to arrive...</p>
              <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em]">Place a demo order from the customer menu to test the workflow.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
              <AnimatePresence mode="popLayout">
                {filteredOrders.map((order) => (
                  <OrderCard key={order.id} order={order} onUpdate={fetchAllOrders} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Safety Notice */}
        <div className="mt-40 glass-premium p-10 rounded-[3.5rem] border border-primary/20 flex flex-col md:flex-row gap-8 items-center text-center md:text-left bg-primary/[0.02]">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20 shrink-0">
            <Info className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] mb-3">Business Review Prototype</h4>
            <p className="text-xs text-gray-500 font-bold leading-relaxed uppercase tracking-wider">
              This internal dashboard is not connected to live restaurant operations yet. 
              No real customer, payment, or staff data should be used. 
              All logic is for structural demonstration pending management confirmation.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
