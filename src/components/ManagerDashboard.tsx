
"use client";

import { useState, useEffect } from "react";
import DashboardStatCard from "@/components/DashboardStatCard";
import { getOrders, Order, loadSampleOrders, resetOrders, getDemoMode } from "@/lib/order-utils";
import { formatPrice } from "@/lib/utils";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  ArrowUpRight, 
  Download, 
  Calendar,
  Database,
  Trash2,
  PieChart,
  Cloud,
  WifiOff
} from "lucide-react";
import { motion } from "framer-motion";
import { isSupabaseConfigured, supabase } from "@/lib/supabase-client";
import { fetchSupabaseOrders } from "@/lib/supabase-orders";

export default function ManagerDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchManagerData = async () => {
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
  };

  useEffect(() => {
    fetchManagerData();
    if (isSupabaseConfigured) {
      const channel = supabase
        .channel('manager-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'demo_orders' }, () => fetchManagerData())
        .subscribe();
      return () => { supabase.removeChannel(channel); };
    }
  }, []);

  const totalSales = orders.reduce((sum, o) => o.status !== "Cancelled" ? sum + o.total : sum, 0);
  const pendingOrders = orders.filter(o => o.status === "Pending" || o.status === "Confirmed" || o.status === "Preparing").length;
  const completedOrders = orders.filter(o => o.status === "Completed").length;
  
  const handleLoadSample = () => {
    loadSampleOrders();
    fetchManagerData();
  };

  const handleReset = () => {
    if (confirm("Reset all local demo data?")) {
      resetOrders();
      fetchManagerData();
    }
  };

  const demoMode = getDemoMode();

  return (
    <main className="max-w-7xl mx-auto px-4 pt-32 pb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <BarChart3 className="w-5 h-5" />
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
          <h1 className="text-4xl md:text-5xl font-black italic gold-text uppercase tracking-tight">Analytics</h1>
          <p className="text-gray-500 mt-2">Business performance and branch overview.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleLoadSample}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-white/10 transition-all"
          >
            <Database className="w-4 h-4 text-accent" />
            Load Samples
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-red-900/20 border border-red-900/30 rounded-xl text-sm font-bold text-red-400 flex items-center gap-2 hover:bg-red-900/40 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Reset Local
          </button>
          <button className="px-6 py-3 bg-primary rounded-xl text-sm font-bold text-white shadow-lg shadow-primary/20 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <DashboardStatCard title="Demo Total Sales" value={formatPrice(totalSales)} icon={TrendingUp} color="green-500" trend="+12.5%" />
        <DashboardStatCard title="Total Orders" value={orders.length} icon={ShoppingBag} color="primary" trend="+8%" />
        <DashboardStatCard title="Pending Cravings" value={pendingOrders} icon={Calendar} color="orange-500" />
        <DashboardStatCard title="Completed" value={completedOrders} icon={Users} color="purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass rounded-[2.5rem] border border-white/10 p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold italic">Sales Overview</h3>
            <div className="flex gap-2">
              {["D", "W", "M", "Y"].map((t) => (
                <button key={t} className={`w-8 h-8 rounded-lg text-[10px] font-bold flex items-center justify-center ${t === 'W' ? 'bg-primary text-white' : 'bg-white/5 text-gray-500 hover:bg-white/10'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 px-4">
            {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
              <div key={i} className="w-full relative group">
                <motion.div initial={{ height: 0 }} animate={{ height: `${h}%` }} className="w-full bg-gradient-to-t from-primary/20 to-primary rounded-t-xl group-hover:to-accent transition-colors" />
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-[2.5rem] border border-white/10 p-8">
          <h3 className="text-xl font-bold italic mb-8">Branch Performance</h3>
          <div className="space-y-8">
            {[
              { name: "FUTA South Gate", sales: 125000, color: "bg-primary" },
              { name: "Agape Junction", sales: 85000, color: "bg-accent" },
              { name: "Branch 3 (Demo)", sales: 42000, color: "bg-blue-500" },
            ].map((branch, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-bold">{branch.name}</span>
                  <span className="text-gray-400">{formatPrice(branch.sales)}</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(branch.sales / 125000) * 100}%` }} className={`h-full ${branch.color}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 glass rounded-[2.5rem] border border-white/10 overflow-hidden">
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-xl font-bold italic">Recent Activity</h3>
        </div>
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white/5 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
                <th className="p-6">Order ID</th>
                <th className="p-6">Customer</th>
                <th className="p-6">Branch</th>
                <th className="p-6">Total</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {orders.length === 0 ? (
                <tr><td colSpan={6} className="p-12 text-center text-gray-500 italic">No demo orders yet.</td></tr>
              ) : (
                orders.slice(0, 10).map((order) => (
                  <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-6 font-bold">{order.id}</td>
                    <td className="p-6">{order.customerName}</td>
                    <td className="p-6 text-gray-400 text-xs">{order.branch}</td>
                    <td className="p-6 font-bold gold-text">{formatPrice(order.total)}</td>
                    <td className="p-6">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                        order.status === 'Completed' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' :
                        'bg-blue-500/10 text-blue-500 border-blue-500/20'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <button className="p-2 bg-white/5 rounded-lg hover:bg-primary transition-colors text-gray-400 hover:text-white">
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
