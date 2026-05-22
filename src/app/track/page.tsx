"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoNotice from "@/components/DemoNotice";
import { 
  getOrders, 
  Order, 
  getOrderStatusLabel, 
  isPendingStatus, 
  isConfirmedStatus, 
  isPreparingStatus, 
  isReadyStatus, 
  isCompletedStatus, 
  isCancelledStatus,
  getFulfillmentTypeLabel,
  getPaymentMethodStatusLabel
} from "@/lib/order-utils";
import { isSupabaseConfigured } from "@/lib/supabase-client";
import { fetchSupabaseOrders } from "@/lib/supabase-orders";
import { formatPrice } from "@/lib/utils";
import { 
  Search, 
  MapPin, 
  Phone, 
  User, 
  Clock, 
  Truck, 
  CheckCircle2, 
  ShieldAlert, 
  Compass, 
  ClipboardCheck, 
  Info,
  Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function TrackPageContent() {
  const searchParams = useSearchParams();
  const [trackingCode, setTrackingCode] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Auto-fill from URL query param if present
  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      setTrackingCode(code);
      setSearchQuery(code);
      handleTrackOrder(code);
    }
  }, [searchParams]);

  const handleTrackOrder = async (codeToSearch: string) => {
    const trimmed = codeToSearch.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setErrorMsg("");
    setOrder(null);

    try {
      // 1. Fetch from localStorage fallback
      const localOrders = getOrders();
      let matched = localOrders.find(
        (o) => 
          o.customerTrackingCode?.toLowerCase() === trimmed.toLowerCase() ||
          o.id.toLowerCase() === trimmed.toLowerCase()
      );

      // 2. Fetch from Supabase if configured
      if (!matched && isSupabaseConfigured) {
        const cloudOrders = await fetchSupabaseOrders();
        matched = cloudOrders.find(
          (o) => 
            o.customerTrackingCode?.toLowerCase() === trimmed.toLowerCase() ||
            o.id.toLowerCase() === trimmed.toLowerCase()
        );
      }

      if (matched) {
        setOrder(matched);
      } else {
        setErrorMsg("No active demo order found matching that code. Check your spelling or ensure you are in the correct branch demo.");
      }
    } catch (err) {
      console.error("Tracking lookup failed:", err);
      setErrorMsg("An error occurred while retrieving order information.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTrackOrder(searchQuery);
    setTrackingCode(searchQuery);
  };

  // Status timeline steps configuration
  const timelineSteps = [
    { title: "Order Placed", key: "received", check: (o: Order) => true },
    { title: "Confirmed", key: "confirmed", check: (o: Order) => isConfirmedStatus(o.status) || isPreparingStatus(o.status) || isReadyStatus(o.status) || isCompletedStatus(o.status) },
    { title: "In Kitchen", key: "preparing", check: (o: Order) => isPreparingStatus(o.status) || isReadyStatus(o.status) || isCompletedStatus(o.status) },
    { title: "Ready / Out", key: "ready", check: (o: Order) => isReadyStatus(o.status) || isCompletedStatus(o.status) },
    { title: "Completed", key: "completed", check: (o: Order) => isCompletedStatus(o.status) }
  ];

  // Detect current timeline step index
  const getCurrentStepIndex = () => {
    if (!order) return 0;
    if (isCompletedStatus(order.status)) return 4;
    if (isReadyStatus(order.status)) return 3;
    if (isPreparingStatus(order.status)) return 2;
    if (isConfirmedStatus(order.status)) return 1;
    return 0;
  };

  const activeStepIdx = getCurrentStepIndex();

  return (
    <div className="min-h-screen bg-dark text-white font-body">
      <Navbar />
      <DemoNotice />
      
      <main className="max-w-4xl mx-auto px-6 pt-48 pb-32">
        <div className="text-center mb-16 space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-[1.8rem] flex items-center justify-center text-primary border border-primary/20 shadow-2xl shadow-primary/20 mx-auto mb-6">
            <Compass className="w-8 h-8 animate-spin-slow" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none uppercase font-heading">
            TRACK DEMO <span className="gold-text">ORDER.</span>
          </h1>
          <p className="text-gray-500 font-medium text-lg max-w-lg mx-auto leading-relaxed">
            Enter your customer tracking code (TRK-XXXX) or Order ID to inspect progress.
          </p>
        </div>

        {/* Input Box */}
        <form onSubmit={handleFormSubmit} className="glass-premium p-6 rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col sm:flex-row items-center gap-4 mb-16">
          <div className="relative flex-grow w-full group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors w-6 h-6" />
            <input
              type="text"
              required
              placeholder="e.g. TRK-12345 or ORD-12345..."
              className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-16 pr-8 focus:border-primary focus:bg-black/60 transition-all focus:outline-none text-lg font-bold text-white uppercase tracking-wider placeholder:normal-case placeholder:text-gray-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-10 py-5 premium-gradient rounded-2xl font-black text-sm uppercase tracking-widest text-white shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 shrink-0"
          >
            {isLoading ? "Searching..." : "Track Status"}
          </button>
        </form>

        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-500 font-bold uppercase tracking-wider text-xs">Pinging databases...</p>
            </motion.div>
          )}

          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="glass-premium p-10 rounded-[3rem] border border-red-500/20 bg-red-500/[0.02] text-center space-y-6 shadow-2xl"
            >
              <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 border border-red-500/20 mx-auto">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-xl uppercase tracking-tight text-white font-heading">Lookup Unsuccessful</h3>
                <p className="text-xs text-gray-500 font-bold leading-relaxed uppercase tracking-wider max-w-md mx-auto">
                  {errorMsg}
                </p>
              </div>
            </motion.div>
          )}

          {order && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="space-y-12"
            >
              {/* Status Timeline Card */}
              <div className="glass-premium p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 border-b border-white/5 pb-8 mb-10">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold block mb-1">Active Tracker</span>
                    <h2 className="text-2xl md:text-3xl font-black uppercase text-white font-heading tracking-tight leading-none">
                      {order.customerTrackingCode || "Tracking Pending"}
                    </h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-extrabold uppercase tracking-widest text-accent font-mono">
                      Ref: {order.id}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                      isCancelledStatus(order.status)
                        ? "bg-red-500/10 text-red-500 border-red-500/20"
                        : isCompletedStatus(order.status)
                        ? "bg-purple-500/10 text-purple-500 border-purple-500/20"
                        : "bg-green-500/10 text-green-500 border-green-500/20"
                    }`}>
                      {getOrderStatusLabel(order.status)}
                    </span>
                  </div>
                </div>

                {/* Timeline Render */}
                {isCancelledStatus(order.status) ? (
                  <div className="p-8 bg-red-500/5 border border-red-500/20 rounded-3xl flex items-start gap-4">
                    <ShieldAlert className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-extrabold text-sm uppercase text-red-400 tracking-wider">Demo Order Terminated</h4>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider leading-relaxed mt-2">
                        This demo transaction has been flagged as cancelled or refunded for administrative review. Re-submit your menu checkout to start a new stream.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative py-4">
                    {/* Connecting progress line */}
                    <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/15 -translate-y-1/2 hidden md:block" />
                    <div 
                      className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-primary to-accent -translate-y-1/2 hidden md:block transition-all duration-1000" 
                      style={{ width: `${(activeStepIdx / 4) * 100}%` }}
                    />
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative gap-10 md:gap-4">
                      {timelineSteps.map((step, idx) => {
                        const isDone = step.check(order);
                        const isActive = idx === activeStepIdx;
                        
                        return (
                          <div key={step.key} className="flex md:flex-col items-center gap-6 md:gap-4 md:text-center w-full md:w-auto relative">
                            {/* Glowing connector for vertical layout on mobile */}
                            {idx < 4 && (
                              <div className="absolute left-4 top-10 bottom-[-40px] w-[2px] bg-white/10 md:hidden" />
                            )}
                            
                            {/* Circle Node */}
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center border font-bold text-xs shrink-0 transition-all duration-500 ${
                              isActive 
                                ? "bg-primary border-primary text-white shadow-lg shadow-primary/40 scale-110" 
                                : isDone 
                                ? "bg-accent/20 border-accent text-accent" 
                                : "bg-black border-white/10 text-gray-700"
                            }`}>
                              {isDone ? <CheckCircle2 className="w-4.5 h-4.5" /> : idx + 1}
                            </div>
                            
                            <div>
                              <span className={`text-[10px] font-black uppercase tracking-widest block ${
                                isActive ? "text-primary font-black" : isDone ? "text-white" : "text-gray-700"
                              }`}>{step.title}</span>
                              <span className="text-[8px] text-gray-500 font-bold uppercase tracking-wider block mt-0.5 md:hidden">
                                {isActive ? "CURRENT STAGE" : isDone ? "COMPLETED" : "PENDING"}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Order Specifications Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* Specs Info Block */}
                <div className="md:col-span-7 glass-premium p-10 rounded-[3rem] border border-white/5 shadow-2xl space-y-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent border border-accent/20">
                      <ClipboardCheck className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-white font-heading">Order Specs</h3>
                  </div>

                  <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center group">
                        <div className="flex gap-4 items-center">
                          <div className="w-12 h-12 bg-white/5 rounded-xl overflow-hidden border border-white/5">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                          </div>
                          <div>
                            <p className="font-extrabold text-sm uppercase tracking-tight text-white leading-tight font-heading">{item.name}</p>
                            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">
                              {item.quantity}× <span className="mx-1 opacity-20">|</span> {formatPrice(item.price)} each
                            </p>
                          </div>
                        </div>
                        <p className="font-bold text-sm font-heading">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-8 border-t border-white/5 space-y-4">
                    <div className="flex justify-between text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                      <span>Operational Branch</span>
                      <span className="text-white">{order.branch}</span>
                    </div>
                    <div className="flex justify-between text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                      <span>Fulfillment Class</span>
                      <span className="text-white">
                        {order.fulfillmentType ? getFulfillmentTypeLabel(order.fulfillmentType) : order.orderType}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                      <span>Payment Preview Mode</span>
                      <span className="text-white">
                        {order.paymentMethodStatus ? getPaymentMethodStatusLabel(order.paymentMethodStatus) : order.paymentStatus}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                      <span>Demo Placed At</span>
                      <span className="text-white flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="flex justify-between items-end pt-6 border-t border-white/5">
                      <span className="text-lg font-black uppercase text-white font-heading">Demo Total</span>
                      <span className="text-3xl font-black gold-text font-heading italic leading-none">{formatPrice(order.total)}</span>
                    </div>
                  </div>
                </div>

                {/* Dispatch & Delivery Block */}
                <div className="md:col-span-5 space-y-8">
                  
                  {/* Delivery details if applicable */}
                  {(order.fulfillmentType === "delivery" || order.orderType === "Delivery") ? (
                    <div className="glass-premium p-10 rounded-[3rem] border border-white/5 shadow-2xl space-y-8 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
                      
                      <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                          <Truck className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-sm uppercase tracking-wider text-white">Rider Dispatch</h3>
                          <span className="text-[8px] font-bold text-accent uppercase tracking-widest">Simulated dispatch sandbox</span>
                        </div>
                      </div>

                      <div className="space-y-5 text-xs font-bold uppercase tracking-widest text-gray-400">
                        <div className="space-y-1">
                          <span className="text-[9px] font-black text-gray-600 block">Rider Name</span>
                          <span className="text-white text-sm font-heading">{order.riderName || "Pending Assignment"}</span>
                        </div>
                        
                        {order.riderPhone && order.riderPhone !== "Pending Assignment" && (
                          <div className="space-y-1">
                            <span className="text-[9px] font-black text-gray-600 block">Rider Contact</span>
                            <span className="text-white font-mono flex items-center gap-1">
                              <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                              {order.riderPhone}
                            </span>
                          </div>
                        )}
                        
                        <div className="space-y-1">
                          <span className="text-[9px] font-black text-gray-600 block">Estimated Arrival Time</span>
                          <span className="text-accent flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 shrink-0" />
                            {order.estimatedDeliveryTime || "Calculating..."}
                          </span>
                        </div>

                        {order.deliveryNote && (
                          <div className="pt-4 border-t border-white/5 space-y-1">
                            <span className="text-[9px] font-black text-gray-600 block">Delivery Note</span>
                            <p className="text-[10px] text-gray-500 normal-case leading-relaxed font-bold">
                              "{order.deliveryNote}"
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="glass-premium p-10 rounded-[3rem] border border-white/5 shadow-2xl space-y-6 text-center">
                      <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent border border-accent/20 mx-auto">
                        <User className="w-6 h-6 animate-pulse" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-extrabold text-sm uppercase tracking-wider text-white">In-Store Pickup</h4>
                        <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider leading-relaxed">
                          This order was submitted for customer counter pickup or dine-in service at our {order.branch} branch. No dispatch rider required.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Staging Disclaimer Box */}
                  <div className="glass-premium p-8 rounded-[2.5rem] border border-primary/20 bg-primary/[0.01] space-y-4 shadow-xl">
                    <div className="flex items-center gap-3 text-primary">
                      <Info className="w-5 h-5 shrink-0" />
                      <h4 className="font-extrabold text-xs uppercase tracking-wider font-heading">Staging Preview Mode</h4>
                    </div>
                    <p className="text-[9px] text-gray-500 font-bold leading-relaxed uppercase tracking-wider">
                      This is a business review tracking preview. Live customer tracking, real-time rider GPS tracking, and delivery notifications require production approval and infrastructure setup.
                    </p>
                  </div>

                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Safety Disclaimer footer */}
        <div className="mt-40 glass-premium p-10 rounded-[3.5rem] border border-white/5 flex flex-col md:flex-row gap-8 items-center text-center md:text-left bg-white/[0.01]">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-gray-500 border border-white/5 shrink-0">
            <Info className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-accent uppercase tracking-[0.4em] mb-3">Customer Tracking Suite Prototype</h4>
            <p className="text-xs text-gray-500 font-bold leading-relaxed uppercase tracking-wider">
              This digital dashboard is for workflow visualization purposes only. 
              Live rider GPS locations, payment receipts, and automated email/SMS dispatch notifications will be integrated in the production pipeline after management review.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-dark flex items-center justify-center text-white font-body">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Loading Tracking Engine...</p>
        </div>
      </div>
    }>
      <TrackPageContent />
    </Suspense>
  );
}
