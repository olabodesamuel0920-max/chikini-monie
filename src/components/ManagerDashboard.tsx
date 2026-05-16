
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
    <main className="max-w-7xl mx-auto px-6 pt-48 pb-32">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-primary/10 rounded-[1.5rem] flex items-center justify-center text-primary border border-primary/20 shadow-2xl shadow-primary/20">
              <BarChart3 className="w-7 h-7" />
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
          <h1 className="text-5xl md:text-7xl font-black italic gold-text uppercase tracking-tighter leading-none">Analytics.</h1>
          <p className="text-gray-500 mt-4 text-xl font-medium max-w-xl">Real-time business performance and operational insights.</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleLoadSample}
            className="px-8 py-4 bg-white/5 border border-white/10 rounded-[2rem] text-[11px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-white/10 transition-all"
          >
            <Database className="w-4 h-4 text-accent" />
            Load Samples
          </button>
          <button
            onClick={handleReset}
            className="px-8 py-4 bg-red-900/10 border border-red-900/20 rounded-[2rem] text-[11px] font-black uppercase tracking-widest text-red-400 flex items-center gap-3 hover:bg-red-900/30 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Reset Analytics
          </button>
          <button className="px-8 py-4 bg-primary rounded-[2rem] text-[11px] font-black uppercase tracking-widest text-white shadow-2xl shadow-primary/30 flex items-center gap-3 hover:scale-105 active:scale-95 transition-all">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        <DashboardStatCard title="Demo Total Sales" value={formatPrice(totalSales)} icon={TrendingUp} color="green-500" trend="+12.5%" />
        <DashboardStatCard title="Total Orders" value={orders.length} icon={ShoppingBag} color="primary" trend="+8%" />
        <DashboardStatCard title="Active Prep" value={pendingOrders} icon={Calendar} color="orange-500" />
        <DashboardStatCard title="Completed" value={completedOrders} icon={Users} color="purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
        <div className="lg:col-span-2 glass-premium rounded-[3.5rem] border border-white/5 p-12 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-1">Sales Overview</h3>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Revenue trends across timeframes</p>
            </div>
            <div className="flex gap-3 bg-white/5 p-2 rounded-2xl border border-white/5">
              {["D", "W", "M", "Y"].map((t) => (
                <button key={t} className={`w-10 h-10 rounded-xl text-[10px] font-black flex items-center justify-center transition-all ${t === 'W' ? 'bg-primary text-white shadow-lg' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="h-80 flex items-end justify-between gap-4 px-4 relative">
            <div className="absolute inset-0 flex flex-col justify-between opacity-5 pointer-events-none">
              {[1, 2, 3, 4].map(i => <div key={i} className="w-full h-[1px] bg-white" />)}
            </div>
            {[40, 70, 45, 90, 65, 85, 100, 60, 80, 55, 95, 75].map((h, i) => (
              <div key={i} className="w-full relative group">
                <motion.div 
                  initial={{ height: 0 }} 
                  animate={{ height: `${h}%` }} 
                  transition={{ delay: i * 0.05, duration: 0.8 }}
                  className="w-full bg-gradient-to-t from-primary/10 via-primary/40 to-primary rounded-t-xl group-hover:to-accent transition-all duration-500 cursor-pointer" 
                />
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black px-2 py-1 rounded text-[8px] font-black opacity-0 group-hover:opacity-100 transition-opacity">
                  {h}%
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-8 px-4 text-[10px] font-black text-gray-700 uppercase tracking-widest">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
        </div>

        <div className="glass-premium rounded-[3.5rem] border border-white/5 p-12 shadow-2xl">
          <div className="mb-12">
            <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-1">Branch Mix</h3>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Revenue contribution by location</p>
          </div>
          <div className="space-y-10">
            {[
              { name: "FUTA South Gate", sales: 125000, color: "bg-primary", percentage: 65 },
              { name: "Agape Junction", sales: 85000, color: "bg-accent", percentage: 45 },
              { name: "Branch 3 (Demo)", sales: 42000, color: "bg-blue-500", percentage: 25 },
            ].map((branch, i) => (
              <div key={i} className="space-y-4 group">
                <div className="flex justify-between text-sm items-end">
                  <div>
                    <span className="font-black uppercase italic tracking-tighter text-lg block leading-none mb-1 group-hover:text-primary transition-colors">{branch.name}</span>
                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{branch.percentage}% of market share</span>
                  </div>
                  <span className="text-lg font-black text-white italic">{formatPrice(branch.sales)}</span>
                </div>
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden p-[2px] border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${branch.percentage}%` }} 
                    transition={{ delay: i * 0.2, duration: 1 }}
                    className={`h-full rounded-full ${branch.color} shadow-[0_0_15px_rgba(255,102,0,0.3)]`} 
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 p-6 bg-white/5 rounded-3xl border border-white/5">
            <div className="flex items-center gap-3 mb-2 text-accent">
              <TrendingUp className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Growth Insight</span>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed font-medium">South Gate branch continues to dominate the morning peak hours, contributing to over 40% of daily digital revenue.</p>
          </div>
        </div>
      </div>

      <div className="glass-premium rounded-[3.5rem] border border-white/5 overflow-hidden shadow-2xl">
        <div className="p-12 border-b border-white/5 flex justify-between items-center">
          <div>
            <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-none mb-1">Recent Activity.</h3>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Live feed of global demo transactions</p>
          </div>
          <button className="px-6 py-3 bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors border border-white/5">View Full Log</button>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-white/[0.02] text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">
                <th className="p-8">Order Identifier</th>
                <th className="p-8">Customer Name</th>
                <th className="p-8">Operational Branch</th>
                <th className="p-8">Transaction Total</th>
                <th className="p-8">Fulfillment Status</th>
                <th className="p-8 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {orders.length === 0 ? (
                <tr><td colSpan={6} className="p-24 text-center text-gray-600 italic font-medium uppercase tracking-widest">No demo transactions found.</td></tr>
              ) : (
                orders.slice(0, 10).map((order) => (
                  <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-all group">
                    <td className="p-8 font-black text-white italic group-hover:text-primary">{order.id}</td>
                    <td className="p-8">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center font-black text-gray-500 group-hover:text-white group-hover:bg-primary/20 transition-all">{order.customerName[0]}</div>
                        <span className="font-bold">{order.customerName}</span>
                      </div>
                    </td>
                    <td className="p-8 text-gray-500 font-bold uppercase tracking-widest text-[10px]">{order.branch}</td>
                    <td className="p-8 font-black gold-text italic text-lg">{formatPrice(order.total)}</td>
                    <td className="p-8">
                      <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                        order.status === 'Completed' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' :
                        'bg-blue-500/10 text-blue-500 border-blue-500/20'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-8 text-right">
                      <button className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-all group-hover:scale-110">
                        <ArrowUpRight className="w-5 h-5" />
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
