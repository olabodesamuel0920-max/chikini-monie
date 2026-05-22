"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  getOrders, 
  Order, 
  OrderStatus, 
  updateOrder, 
  getDemoMode, 
  getOrderStatusLabel, 
  isIssueStatus,
  getNextRiderStatus 
} from "@/lib/order-utils";
import { 
  Bike, 
  Search, 
  RefreshCw, 
  Cloud, 
  WifiOff, 
  Filter, 
  User, 
  Phone, 
  Clock, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  MapPin, 
  ChevronRight, 
  Info,
  Database,
  Trash2,
  ExternalLink
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase, isSupabaseConfigured } from "@/lib/supabase-client";
import { fetchSupabaseOrders } from "@/lib/supabase-orders";
import DemoNotice from "@/components/DemoNotice";
import StatusBadge from "@/components/StatusBadge";

export default function RiderDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<"active" | "completed" | "issues" | "all">("active");
  const [filterBranch, setFilterBranch] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Inline assignment forms state
  const [assigningOrderId, setAssigningOrderId] = useState<string | null>(null);
  const [riderForm, setRiderForm] = useState({
    riderName: "Chikini Rider Alpha",
    riderPhone: "08031122334",
    estimatedDeliveryTime: "25-35 mins",
    deliveryNote: "Leave at security gate"
  });

  // Issue reporting form state
  const [reportingOrderId, setReportingOrderId] = useState<string | null>(null);
  const [issueNote, setIssueNote] = useState("");

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
        .channel('rider-db-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'demo_orders' }, () => fetchAllOrders())
        .subscribe();
      return () => { supabase.removeChannel(channel); };
    }
  }, []);

  const handleUpdateStatus = async (order: Order, newStatus: OrderStatus) => {
    const updated = {
      ...order,
      status: newStatus,
      lastStatusUpdate: new Date().toISOString()
    };
    await updateOrder(updated);
    fetchAllOrders();
  };

  const handleAssignRider = async (e: React.FormEvent, order: Order) => {
    e.preventDefault();
    const updated: Order = {
      ...order,
      status: "assigned_to_rider",
      riderName: riderForm.riderName,
      riderPhone: riderForm.riderPhone,
      estimatedDeliveryTime: riderForm.estimatedDeliveryTime,
      deliveryNote: riderForm.deliveryNote,
      lastStatusUpdate: new Date().toISOString()
    };
    await updateOrder(updated);
    setAssigningOrderId(null);
    fetchAllOrders();
  };

  const handleReportIssue = async (e: React.FormEvent, order: Order) => {
    e.preventDefault();
    const updated: Order = {
      ...order,
      status: "issue_reported",
      deliveryNote: `ISSUE: ${issueNote} | Previous: ${order.deliveryNote || ""}`,
      lastStatusUpdate: new Date().toISOString()
    };
    await updateOrder(updated);
    setReportingOrderId(null);
    setIssueNote("");
    fetchAllOrders();
  };

  const handleResolveIssue = async (order: Order, nextStatus: OrderStatus) => {
    const cleanNote = order.deliveryNote?.replace(/^ISSUE:.*?\| Previous:\s*/, "") || "";
    const updated: Order = {
      ...order,
      status: nextStatus,
      deliveryNote: cleanNote,
      lastStatusUpdate: new Date().toISOString()
    };
    await updateOrder(updated);
    fetchAllOrders();
  };

  // Filter only delivery orders
  const deliveryOrders = orders.filter(o => o.fulfillmentType === "delivery" || o.orderType === "Delivery");

  const filteredOrders = deliveryOrders.filter((order) => {
    // Tab filter
    let matchesTab = false;
    if (activeTab === "all") {
      matchesTab = true;
    } else if (activeTab === "active") {
      matchesTab = ["ready_for_pickup", "assigned_to_rider", "picked_up", "out_for_delivery"].includes(order.status) || 
                   order.status === "Preparing" || order.status === "Confirmed" || order.status === "Pending" || order.status === "order_received";
    } else if (activeTab === "completed") {
      matchesTab = ["delivered", "completed", "Completed"].includes(order.status);
    } else if (activeTab === "issues") {
      matchesTab = order.status === "issue_reported";
    }

    // Branch filter
    const matchesBranch = filterBranch === "All" || order.branch === filterBranch;

    // Search filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchLower) ||
      order.id.toLowerCase().includes(searchLower) ||
      (order.riderName && order.riderName.toLowerCase().includes(searchLower)) ||
      (order.customerTrackingCode && order.customerTrackingCode.toLowerCase().includes(searchLower));

    return matchesTab && matchesBranch && matchesSearch;
  });

  const demoMode = getDemoMode();

  // Metrics
  const activeCount = deliveryOrders.filter(o => ["ready_for_pickup", "assigned_to_rider", "picked_up", "out_for_delivery"].includes(o.status)).length;
  const completedCount = deliveryOrders.filter(o => ["delivered", "completed", "Completed"].includes(o.status)).length;
  const issueCount = deliveryOrders.filter(o => o.status === "issue_reported").length;

  return (
    <div className="min-h-screen bg-dark">
      <DemoNotice />
      <main className="max-w-7xl mx-auto px-6 pt-48 pb-32 font-body">
        
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-primary/10 rounded-[1.5rem] flex items-center justify-center text-primary border border-primary/20 shadow-2xl shadow-primary/20">
                <Bike className="w-7 h-7" />
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
            <h1 className="text-5xl md:text-7xl font-extrabold text-white uppercase leading-none font-heading tracking-tight">Rider <span className="gold-text italic">Board.</span></h1>
            <p className="text-gray-500 mt-4 text-xl font-medium max-w-xl">
              Dispatch preview and simulated rider updates.
              <span className="block mt-2 text-xs text-primary font-bold uppercase tracking-widest">Delivery preview system for business review only.</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={fetchAllOrders}
              className={`w-14 h-14 bg-primary rounded-[1.5rem] text-white shadow-2xl shadow-primary/30 flex items-center justify-center active:scale-95 transition-all ${isRefreshing ? "animate-spin" : ""}`}
            >
              <RefreshCw className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Staging warning disclaimer banner */}
        <div className="mb-12 glass-premium p-6 rounded-[2rem] border border-amber-500/20 bg-amber-500/[0.02] flex items-start gap-4">
          <AlertTriangle className="text-amber-500 w-6 h-6 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-1">Rider Workflow Simulation</h4>
            <p className="text-xs text-gray-400 font-medium leading-relaxed">
              This panel simulates rider assignments and dispatch updates. The order tracking timeline updates dynamically, but does NOT connect to real riders, require live device GPS/location coordinates, or send actual notification webhooks.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Active Deliveries", count: activeCount, style: "text-primary border-primary/10 bg-primary/[0.02]" },
            { label: "Delivered / Staged", count: completedCount, style: "text-purple-400 border-purple-500/10 bg-purple-500/[0.01]" },
            { label: "Reported Issues", count: issueCount, style: `${issueCount > 0 ? 'text-red-500 border-red-500/20 bg-red-500/[0.03] animate-pulse' : 'text-gray-500 border-white/5'}` },
            { label: "Total Deliveries", count: deliveryOrders.length, style: "text-white border-white/5" }
          ].map((stat, idx) => (
            <div key={idx} className={`glass-premium p-6 rounded-[2rem] border ${stat.style}`}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-2">{stat.label}</span>
              <span className="text-3xl font-black">{stat.count}</span>
            </div>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="glass-premium p-6 rounded-[2.5rem] border border-white/5 mb-12 flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-grow relative w-full group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors w-5 h-5" />
            <input
              type="text"
              placeholder="Search Code, Customer, or Rider..."
              className="w-full bg-black/40 border border-white/10 rounded-[1.5rem] py-4 pl-14 pr-6 focus:border-primary focus:bg-black/60 transition-all focus:outline-none text-md font-bold"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-4 w-full md:w-auto shrink-0">
            <div className="flex flex-col gap-2 w-full sm:w-48">
              <select
                className="w-full bg-black/40 border border-white/10 rounded-[1.2rem] py-4 px-6 focus:border-primary transition-colors focus:outline-none text-xs font-bold appearance-none cursor-pointer"
                value={filterBranch}
                onChange={(e) => setFilterBranch(e.target.value)}
              >
                <option value="All">All Branches</option>
                <option value="FUTA South Gate">FUTA South Gate</option>
                <option value="Agape Junction">Agape Junction</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabs navigation */}
        <div className="flex gap-2 border-b border-white/5 pb-4 mb-8 overflow-x-auto">
          {[
            { id: "active", label: "Active Delivery Tasks" },
            { id: "completed", label: "Completed / Staged" },
            { id: "issues", label: `Issues (${issueCount})` },
            { id: "all", label: "All Records" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* List of Orders */}
        <div className="min-h-[400px]">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-32 glass-premium rounded-[3rem] border border-dashed border-white/10 font-body">
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/5">
                <Bike className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold uppercase text-gray-400 mb-2 tracking-tight font-heading">No Delivery orders found.</h3>
              <p className="text-gray-600 text-sm font-medium mb-4">No records matching the filter criteria.</p>
              <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Orders must be created as "Delivery" to appear here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredOrders.map((order) => {
                  const isIssue = isIssueStatus(order.status);
                  
                  return (
                    <motion.div
                      key={order.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className={`glass-premium p-8 rounded-[2.5rem] border transition-all ${
                        isIssue 
                          ? "border-red-500/30 bg-red-950/[0.03] shadow-lg shadow-red-950/10" 
                          : "border-white/5 hover:border-white/10"
                      }`}
                    >
                      {/* Top Row: ID, status badge */}
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">{order.id}</span>
                            <span className="text-[10px] bg-white/5 px-2.5 py-0.5 rounded text-primary font-bold uppercase tracking-widest">
                              {order.customerTrackingCode}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-white mt-1 uppercase tracking-tight">{order.customerName}</h3>
                          <p className="text-xs text-gray-500 mt-0.5">{order.phone} • {order.branch}</p>
                        </div>
                        <StatusBadge status={order.status} />
                      </div>

                      {/* Summary Info */}
                      <div className="bg-black/30 border border-white/5 rounded-2xl p-4 mb-6 text-xs text-gray-400">
                        <div className="flex justify-between items-center mb-2 pb-2 border-b border-white/5">
                          <span className="font-bold text-gray-500 uppercase tracking-wider">Fulfillment Method</span>
                          <span className="text-white font-bold uppercase">Delivery</span>
                        </div>
                        <div className="flex justify-between items-center mb-2 pb-2 border-b border-white/5">
                          <span className="font-bold text-gray-500 uppercase tracking-wider">Payment Preview Status</span>
                          <span className="text-white font-bold">{order.paymentStatus}</span>
                        </div>
                        <div>
                          <span className="font-bold text-gray-500 uppercase tracking-wider block mb-1">Items</span>
                          <p className="text-white font-medium">
                            {order.items.map(i => `${i.name} (x${i.quantity})`).join(", ")}
                          </p>
                        </div>
                      </div>

                      {/* Rider Assigned Details Display */}
                      {order.riderName && order.riderName !== "Pending Assignment" && (
                        <div className="border border-white/5 bg-white/[0.01] rounded-2xl p-4 mb-6">
                          <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <User className="w-3.5 h-3.5 text-primary" /> Assigned Dispatch Rider (Simulated)
                          </h4>
                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                              <span className="text-gray-500 font-bold block uppercase tracking-wider text-[9px]">Rider Name</span>
                              <span className="text-white font-bold">{order.riderName}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 font-bold block uppercase tracking-wider text-[9px]">Rider Phone</span>
                              <span className="text-white font-bold">{order.riderPhone}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 font-bold block uppercase tracking-wider text-[9px]">Est. Time</span>
                              <span className="text-white font-bold">{order.estimatedDeliveryTime}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 font-bold block uppercase tracking-wider text-[9px]">Instruction/Notes</span>
                              <span className="text-white font-medium block truncate" title={order.deliveryNote}>
                                {order.deliveryNote}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Active Issue display */}
                      {isIssue && (
                        <div className="border border-red-500/20 bg-red-500/[0.03] rounded-2xl p-4 mb-6 text-xs text-red-400 flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 shrink-0 animate-pulse text-red-500" />
                          <div>
                            <span className="font-black uppercase tracking-wider block mb-0.5">Delivery Issue Active</span>
                            <p className="font-medium text-gray-300 leading-relaxed">
                              {order.deliveryNote || "No details provided"}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Action Triggers */}
                      <div className="flex flex-col gap-3">
                        {/* Assign Rider Form */}
                        {assigningOrderId === order.id ? (
                          <form onSubmit={(e) => handleAssignRider(e, order)} className="border border-primary/20 bg-primary/[0.01] rounded-2xl p-4 mb-3">
                            <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3">Dispatch Details</h4>
                            <div className="grid grid-cols-2 gap-3 mb-4">
                              <div className="flex flex-col gap-1">
                                <label className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Rider Name</label>
                                <input
                                  type="text"
                                  className="bg-black border border-white/10 rounded-lg p-2 text-xs font-bold text-white focus:outline-none focus:border-primary"
                                  value={riderForm.riderName}
                                  onChange={(e) => setRiderForm({ ...riderForm, riderName: e.target.value })}
                                  required
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Rider Phone</label>
                                <input
                                  type="text"
                                  className="bg-black border border-white/10 rounded-lg p-2 text-xs font-bold text-white focus:outline-none focus:border-primary"
                                  value={riderForm.riderPhone}
                                  onChange={(e) => setRiderForm({ ...riderForm, riderPhone: e.target.value })}
                                  required
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Est. Time</label>
                                <input
                                  type="text"
                                  className="bg-black border border-white/10 rounded-lg p-2 text-xs font-bold text-white focus:outline-none focus:border-primary"
                                  value={riderForm.estimatedDeliveryTime}
                                  onChange={(e) => setRiderForm({ ...riderForm, estimatedDeliveryTime: e.target.value })}
                                  required
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Instruction</label>
                                <input
                                  type="text"
                                  className="bg-black border border-white/10 rounded-lg p-2 text-xs font-bold text-white focus:outline-none focus:border-primary"
                                  value={riderForm.deliveryNote}
                                  onChange={(e) => setRiderForm({ ...riderForm, deliveryNote: e.target.value })}
                                />
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                type="submit"
                                className="flex-1 bg-primary py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-white hover:scale-[1.02] active:scale-95 transition-all"
                              >
                                Save & Assign Preview
                              </button>
                              <button
                                type="button"
                                onClick={() => setAssigningOrderId(null)}
                                className="bg-white/5 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:bg-white/10 transition-all"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        ) : reportingOrderId === order.id ? (
                          <form onSubmit={(e) => handleReportIssue(e, order)} className="border border-red-500/20 bg-red-950/[0.02] rounded-2xl p-4 mb-3">
                            <h4 className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-3">Describe Delivery Issue</h4>
                            <div className="flex flex-col gap-1 mb-4">
                              <label className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Details</label>
                              <textarea
                                className="bg-black border border-white/10 rounded-lg p-2 text-xs font-bold text-white focus:outline-none focus:border-red-500 min-h-[60px]"
                                placeholder="Customer phone unreachable / Rider vehicle breakdown..."
                                value={issueNote}
                                onChange={(e) => setIssueNote(e.target.value)}
                                required
                              />
                            </div>
                            <div className="flex gap-2">
                              <button
                                type="submit"
                                className="flex-1 bg-red-600 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-white hover:scale-[1.02] active:scale-95 transition-all"
                              >
                                Report Issue
                              </button>
                              <button
                                type="button"
                                onClick={() => { setReportingOrderId(null); setIssueNote(""); }}
                                className="bg-white/5 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:bg-white/10 transition-all"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        ) : null}

                        {/* Transition Buttons */}
                        {!assigningOrderId && !reportingOrderId && (
                          <div className="flex flex-wrap gap-2">
                            {order.status === "ready_for_pickup" && (
                              <button
                                onClick={() => {
                                  setRiderForm({
                                    riderName: "Chikini Rider Alpha",
                                    riderPhone: "08031122334",
                                    estimatedDeliveryTime: "25-35 mins",
                                    deliveryNote: order.deliveryNote || "Leave at security gate"
                                  });
                                  setAssigningOrderId(order.id);
                                }}
                                className="flex-1 bg-primary text-white py-3 rounded-2xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
                              >
                                <User className="w-3.5 h-3.5" /> Assign Rider Preview
                              </button>
                            )}

                            {order.status === "assigned_to_rider" && (
                              <>
                                <button
                                  onClick={() => handleUpdateStatus(order, "picked_up")}
                                  className="flex-1 bg-indigo-600 text-white py-3 rounded-2xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
                                >
                                  Mark Picked Up
                                </button>
                                <button
                                  onClick={() => setReportingOrderId(order.id)}
                                  className="bg-red-950/20 text-red-400 border border-red-900/20 px-4 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-red-900/10 transition-all"
                                >
                                  <AlertTriangle className="w-3.5 h-3.5" /> Report Issue
                                </button>
                              </>
                            )}

                            {order.status === "picked_up" && (
                              <>
                                <button
                                  onClick={() => handleUpdateStatus(order, "out_for_delivery")}
                                  className="flex-1 bg-cyan-600 text-white py-3 rounded-2xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
                                >
                                  Mark Out for Delivery
                                </button>
                                <button
                                  onClick={() => setReportingOrderId(order.id)}
                                  className="bg-red-950/20 text-red-400 border border-red-900/20 px-4 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-red-900/10 transition-all"
                                >
                                  <AlertTriangle className="w-3.5 h-3.5" /> Report Issue
                                </button>
                              </>
                            )}

                            {order.status === "out_for_delivery" && (
                              <>
                                <button
                                  onClick={() => handleUpdateStatus(order, "delivered")}
                                  className="flex-1 bg-purple-600 text-white py-3 rounded-2xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
                                >
                                  <CheckCircle className="w-3.5 h-3.5" /> Mark Delivered
                                </button>
                                <button
                                  onClick={() => setReportingOrderId(order.id)}
                                  className="bg-red-950/20 text-red-400 border border-red-900/20 px-4 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-red-900/10 transition-all"
                                >
                                  <AlertTriangle className="w-3.5 h-3.5" /> Report Issue
                                </button>
                              </>
                            )}

                            {isIssue && (
                              <div className="flex gap-2 w-full">
                                <button
                                  onClick={() => handleResolveIssue(order, "out_for_delivery")}
                                  className="flex-1 bg-cyan-600 text-white py-3 rounded-2xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
                                >
                                  Resolve & Dispatch
                                </button>
                                <button
                                  onClick={() => handleResolveIssue(order, "delivered")}
                                  className="flex-1 bg-purple-600 text-white py-3 rounded-2xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
                                >
                                  Resolve & Deliver
                                </button>
                              </div>
                            )}

                            {order.status === "delivered" && (
                              <div className="w-full flex items-center justify-center py-2.5 border border-purple-500/20 bg-purple-500/[0.02] text-purple-400 rounded-2xl text-[10px] font-bold uppercase tracking-wider gap-2">
                                <CheckCircle className="w-4 h-4 text-purple-400" /> Delivery Complete (Simulation Staged)
                              </div>
                            )}

                            {/* Standard Staging Order Status Workflow bypass if they have not got to ready_for_pickup */}
                            {!["ready_for_pickup", "assigned_to_rider", "picked_up", "out_for_delivery", "delivered", "issue_reported"].includes(order.status) && (
                              <div className="w-full flex flex-col gap-2">
                                <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest text-center">
                                  Waiting for Kitchen and Staff Confirmation
                                </div>
                                <button
                                  onClick={() => handleUpdateStatus(order, "ready_for_pickup")}
                                  className="w-full bg-white/5 border border-white/10 text-gray-400 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                                >
                                  Bypass: Mark Ready for Pickup
                                </button>
                              </div>
                            )}

                            <Link
                              href={`/track?code=${order.customerTrackingCode}`}
                              target="_blank"
                              className="w-full text-center bg-white/5 text-gray-400 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white/10 hover:text-white transition-all"
                            >
                              Track Order Page <ExternalLink className="w-3 h-3" />
                            </Link>
                          </div>
                        )}
                      </div>

                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Safety Note */}
        <div className="mt-40 glass-premium p-10 rounded-[3.5rem] border border-primary/20 flex flex-col md:flex-row gap-8 items-center text-center md:text-left bg-primary/[0.02]">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20 shrink-0">
            <Info className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] mb-3">Business Review Prototype</h4>
            <p className="text-xs text-gray-500 font-bold leading-relaxed uppercase tracking-wider">
              This internal rider dashboard is not connected to live dispatch operations. 
              No real locations, maps, GPS coordinates, or notifications are triggered. 
              All data updates locally and on staging database parameters to showcase the end-to-end user experience of order status lifecycles.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}
