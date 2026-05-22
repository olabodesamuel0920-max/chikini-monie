
"use client";

import { Clock, Phone, MapPin, User, ChevronRight } from "lucide-react";
import { Order, updateOrderStatus, OrderStatus } from "@/lib/order-utils";
import StatusBadge from "./StatusBadge";
import { formatPrice } from "@/lib/utils";
import { motion } from "framer-motion";

interface OrderCardProps {
  order: Order;
  onUpdate?: () => void;
  showActions?: boolean;
  isKitchenView?: boolean;
}

const OrderCard = ({ order, onUpdate, showActions = true, isKitchenView = false }: OrderCardProps) => {
  const handleStatusUpdate = async (status: OrderStatus) => {
    await updateOrderStatus(order.id, status);
    onUpdate?.();
  };

  const getUrgency = (dateStr: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(dateStr).getTime()) / 1000);
    if (seconds > 900) return { label: "Needs attention", color: "text-red-500 bg-red-500/10 border-red-500/20" };
    if (seconds > 450) return { label: "Waiting", color: "text-orange-500 bg-orange-500/10 border-orange-500/20" };
    return { label: "Normal", color: "text-blue-500 bg-blue-500/10 border-blue-500/20" };
  };

  const timeAgo = (dateStr: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(dateStr).getTime()) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const urgency = getUrgency(order.createdAt);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-premium rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl font-body"
    >
      <div className="p-8 border-b border-white/5 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold block mb-1">Order Identifier</span>
          <h3 className="font-bold text-xl text-white tracking-tight font-heading">{order.id}</h3>
        </div>
        <div className="flex items-center gap-3">
          {isKitchenView && (
            <div className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border ${urgency.color}`}>
              {urgency.label}
            </div>
          )}
          <StatusBadge status={order.status} />
        </div>
      </div>

      <div className="p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-bold text-lg uppercase tracking-tight leading-none mb-1 font-heading">{order.customerName}</p>
              <p className="text-xs text-gray-500 font-bold tracking-wider">{order.phone}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-2 text-primary mb-1">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">{timeAgo(order.createdAt)}</span>
            </div>
            <span className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-accent border border-accent/20">
              {order.orderType}
            </span>
          </div>
        </div>

        <div className="bg-black/40 rounded-3xl p-6 space-y-4 border border-white/5">
          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm">
                <span className="text-gray-300 font-medium">
                  <span className="text-primary font-bold mr-3">{item.quantity}×</span>
                  {item.name}
                </span>
                <span className="font-bold text-gray-500">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-white/5 flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Subtotal</span>
            <span className="text-2xl font-bold gold-text font-heading">{formatPrice(order.total)}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{order.branch}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              (order.paymentStatus || "").includes("Confirmed") || (order.paymentStatus || "").includes("Success")
                ? "bg-green-500"
                : (order.paymentStatus || "").includes("Pending") || (order.paymentStatus || "").includes("Transfer")
                ? "bg-orange-500 animate-pulse"
                : "bg-blue-500"
            }`} />
            <span className={`text-[10px] font-bold uppercase tracking-wider ${
              (order.paymentStatus || "").includes("Confirmed") || (order.paymentStatus || "").includes("Success")
                ? "text-green-400"
                : (order.paymentStatus || "").includes("Pending") || (order.paymentStatus || "").includes("Transfer")
                ? "text-orange-400"
                : "text-gray-400"
            }`}>{order.paymentStatus || "Demo Only"}</span>
          </div>
        </div>

        {showActions && (
          <div className="grid grid-cols-2 gap-3 pt-4">
            {order.status === "Pending" && (
              <button
                onClick={() => handleStatusUpdate("Confirmed")}
                className="px-4 py-4 bg-blue-600/20 border border-blue-600/30 rounded-2xl text-[10px] font-bold uppercase tracking-wider text-blue-400 hover:bg-blue-600 hover:text-white transition-all shadow-xl shadow-blue-600/10"
              >
                Confirm Order
              </button>
            )}
            {(order.status === "Confirmed" || order.status === "Pending") && (
              <button
                onClick={() => handleStatusUpdate("Preparing")}
                className="px-4 py-4 bg-orange-600/20 border border-orange-600/30 rounded-2xl text-[10px] font-bold uppercase tracking-wider text-orange-400 hover:bg-orange-600 hover:text-white transition-all shadow-xl shadow-orange-600/10"
              >
                Send to Kitchen
              </button>
            )}
            {order.status === "Preparing" && (
              <button
                onClick={() => handleStatusUpdate("Ready")}
                className="px-4 py-4 bg-green-600/20 border border-green-600/30 rounded-2xl text-[10px] font-bold uppercase tracking-wider text-green-400 hover:bg-green-600 hover:text-white transition-all shadow-xl shadow-green-600/10"
              >
                Mark as Ready
              </button>
            )}
            {order.status === "Ready" && (
              <button
                onClick={() => handleStatusUpdate("Completed")}
                className="px-4 py-4 bg-purple-600/20 border border-purple-600/30 rounded-2xl text-[10px] font-bold uppercase tracking-wider text-purple-400 hover:bg-purple-600 hover:text-white transition-all shadow-xl shadow-purple-600/10"
              >
                Complete Order
              </button>
            )}
            {order.status !== "Completed" && order.status !== "Cancelled" && (
              <button
                onClick={() => handleStatusUpdate("Cancelled")}
                className="px-4 py-4 bg-red-900/10 border border-red-900/20 rounded-2xl text-[10px] font-bold uppercase tracking-wider text-red-400 hover:bg-red-900 hover:text-white transition-all"
              >
                Cancel Order
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default OrderCard;
