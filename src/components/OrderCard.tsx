
"use client";

import { Clock, Phone, MapPin, ChevronRight } from "lucide-react";
import { Order, updateOrderStatus, OrderStatus } from "@/lib/order-utils";
import StatusBadge from "./StatusBadge";
import { formatPrice } from "@/lib/utils";
import { motion } from "framer-motion";

interface OrderCardProps {
  order: Order;
  onUpdate?: () => void;
  showActions?: boolean;
}

const OrderCard = ({ order, onUpdate, showActions = true }: OrderCardProps) => {
  const handleStatusUpdate = (status: OrderStatus) => {
    updateOrderStatus(order.id, status);
    onUpdate?.();
  };

  const timeAgo = (dateStr: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(dateStr).getTime()) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass rounded-2xl overflow-hidden border border-white/10"
    >
      <div className="p-5 border-b border-white/5 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-1">Order ID</span>
          <h3 className="font-bold text-white tracking-tight">{order.id}</h3>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
              <span className="font-bold text-primary">{order.customerName[0]}</span>
            </div>
            <div>
              <p className="font-bold text-sm">{order.customerName}</p>
              <p className="text-xs text-gray-400">{order.phone}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 flex items-center justify-end gap-1">
              <Clock className="w-3 h-3" />
              {timeAgo(order.createdAt)}
            </p>
            <p className="text-sm font-bold text-accent">{order.orderType}</p>
          </div>
        </div>

        <div className="bg-black/20 rounded-xl p-4 space-y-2">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-sm">
              <span className="text-gray-300">
                <span className="text-primary font-bold mr-2">{item.quantity}x</span>
                {item.name}
              </span>
              <span className="font-medium text-gray-400">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
          <div className="pt-2 border-t border-white/5 flex justify-between items-center mt-2">
            <span className="font-bold text-white">Total</span>
            <span className="font-bold gold-text text-lg">{formatPrice(order.total)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400">
          <MapPin className="w-3 h-3 text-primary" />
          <span>{order.branch}</span>
          <span className="mx-1">•</span>
          <span className={order.paymentStatus.includes("Transfer") ? "text-orange-400" : "text-green-400"}>
            {order.paymentStatus}
          </span>
        </div>

        {showActions && (
          <div className="flex flex-wrap gap-2 pt-2">
            {order.status === "Pending" && (
              <button
                onClick={() => handleStatusUpdate("Confirmed")}
                className="px-4 py-2 bg-blue-600 rounded-lg text-xs font-bold text-white hover:bg-blue-500 transition-colors"
              >
                Confirm
              </button>
            )}
            {(order.status === "Confirmed" || order.status === "Pending") && (
              <button
                onClick={() => handleStatusUpdate("Preparing")}
                className="px-4 py-2 bg-orange-600 rounded-lg text-xs font-bold text-white hover:bg-orange-500 transition-colors"
              >
                Prepare
              </button>
            )}
            {order.status === "Preparing" && (
              <button
                onClick={() => handleStatusUpdate("Ready")}
                className="px-4 py-2 bg-green-600 rounded-lg text-xs font-bold text-white hover:bg-green-500 transition-colors"
              >
                Mark Ready
              </button>
            )}
            {order.status === "Ready" && (
              <button
                onClick={() => handleStatusUpdate("Completed")}
                className="px-4 py-2 bg-purple-600 rounded-lg text-xs font-bold text-white hover:bg-purple-500 transition-colors"
              >
                Complete
              </button>
            )}
            {order.status !== "Completed" && order.status !== "Cancelled" && (
              <button
                onClick={() => handleStatusUpdate("Cancelled")}
                className="px-4 py-2 bg-red-900/50 rounded-lg text-xs font-bold text-red-200 hover:bg-red-800 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default OrderCard;
