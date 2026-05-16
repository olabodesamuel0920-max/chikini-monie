
import { OrderStatus } from "@/lib/order-utils";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusStyles = () => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "Confirmed":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Preparing":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "Ready":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Completed":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "Cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <span
      className={cn(
        "px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase tracking-wider",
        getStatusStyles(),
        className
      )}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
