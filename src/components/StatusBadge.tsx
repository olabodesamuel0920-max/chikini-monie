
import { OrderStatus, getOrderStatusLabel } from "@/lib/order-utils";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusStyles = () => {
    switch (status) {
      // Legacy statuses mapping
      case "Pending":
      case "order_received":
      case "awaiting_payment":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";

      case "Confirmed":
      case "payment_previewed":
      case "payment_confirmed":
      case "staff_confirmed":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";

      case "Preparing":
      case "preparing_or_packing":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";

      case "Ready":
      case "ready_for_pickup":
      case "assigned_to_rider":
        return "bg-green-500/10 text-green-500 border-green-500/20";

      case "out_for_delivery":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";

      case "Completed":
      case "completed":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";

      case "Cancelled":
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20";

      case "refunded_review":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";

      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <span
      className={cn(
        "px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider",
        getStatusStyles(),
        className
      )}
    >
      {getOrderStatusLabel(status)}
    </span>
  );
};

export default StatusBadge;
