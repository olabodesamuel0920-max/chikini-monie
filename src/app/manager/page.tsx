
"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardStatCard from "@/components/DashboardStatCard";
import { getOrders, Order, loadSampleOrders, resetOrders } from "@/lib/order-utils";
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
  MapPin
} from "lucide-react";
import { motion } from "framer-motion";

export default function ManagerPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const data = getOrders();
    setOrders(data);
  }, []);

  const totalSales = orders.reduce((sum, o) => o.status !== "Cancelled" ? sum + o.total : sum, 0);
  const pendingOrders = orders.filter(o => o.status === "Pending" || o.status === "Confirmed" || o.status === "Preparing").length;
  const completedOrders = orders.filter(o => o.status === "Completed").length;
  
  const handleLoadSample = () => {
    loadSampleOrders();
    setOrders(getOrders());
  };

  const handleReset = () => {
    if (confirm("Reset all demo data?")) {
      resetOrders();
      setOrders([]);
    }
  };

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 pt-32 pb-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2 text-accent">
              <BarChart3 className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Manager Preview Dashboard</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black italic gold-text">ANALYTICS</h1>
            <p className="text-gray-500 mt-2">Business performance and branch overview.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleLoadSample}
              className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-white/10 transition-all"
            >
              <Database className="w-4 h-4 text-accent" />
              Load Sample Day
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-red-900/20 border border-red-900/30 rounded-xl text-sm font-bold text-red-400 flex items-center gap-2 hover:bg-red-900/40 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              Reset Data
            </button>
            <button className="px-6 py-3 bg-primary rounded-xl text-sm font-bold text-white shadow-lg shadow-primary/20 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <DashboardStatCard 
            title="Total Demo Sales" 
            value={formatPrice(totalSales)} 
            icon={TrendingUp} 
            color="green-500" 
            trend="+12.5%" 
          />
          <DashboardStatCard 
            title="Total Orders" 
            value={orders.length} 
            icon={ShoppingBag} 
            color="primary" 
            trend="+8%" 
          />
          <DashboardStatCard 
            title="Pending Cravings" 
            value={pendingOrders} 
            icon={Calendar} 
            color="orange-500" 
          />
          <DashboardStatCard 
            title="Completed" 
            value={completedOrders} 
            icon={Users} 
            color="purple-500" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Placeholder */}
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
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    className="w-full bg-gradient-to-t from-primary/20 to-primary rounded-t-xl group-hover:to-accent transition-colors"
                  />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {formatPrice(h * 1000)}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-6 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>

          {/* Branch Performance */}
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
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(branch.sales / 125000) * 100}%` }}
                      className={`h-full ${branch.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-white/5 rounded-3xl border border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center text-accent">
                  <PieChart className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm">Best Seller</h4>
              </div>
              <p className="text-gray-400 text-xs mb-2">Jollof Rice & Chicken</p>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-black italic gold-text">42%</span>
                <span className="text-[10px] font-bold text-green-500">+5.2%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-12 glass rounded-[2.5rem] border border-white/10 overflow-hidden">
          <div className="p-8 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-xl font-bold italic">Recent Demo Orders</h3>
            <button className="text-xs font-bold text-primary hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
                  <th className="p-6">Order ID</th>
                  <th className="p-6">Customer</th>
                  <th className="p-6">Branch</th>
                  <th className="p-6">Total</th>
                  <th className="p-6">Status</th>
                  <th className="p-6">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-6 font-bold">{order.id}</td>
                    <td className="p-6">
                      <div className="flex flex-col">
                        <span className="font-bold">{order.customerName}</span>
                        <span className="text-[10px] text-gray-500">{order.phone}</span>
                      </div>
                    </td>
                    <td className="p-6 text-gray-400">{order.branch}</td>
                    <td className="p-6 font-bold gold-text">{formatPrice(order.total)}</td>
                    <td className="p-6">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                        order.status === 'Completed' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' :
                        order.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                        'bg-blue-500/10 text-blue-500 border-blue-500/20'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-6">
                      <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-gray-400">
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
