
"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardStatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  trend?: string;
}

const DashboardStatCard = ({ title, value, icon: Icon, color, trend }: DashboardStatCardProps) => {
  const colorMap: Record<string, { bg: string; text: string }> = {
    "green-500": { bg: "bg-green-500/20", text: "text-green-500" },
    "primary": { bg: "bg-primary/20", text: "text-primary" },
    "orange-500": { bg: "bg-orange-500/20", text: "text-orange-500" },
    "purple-500": { bg: "bg-purple-500/20", text: "text-purple-500" },
  };

  const activeColor = colorMap[color] || colorMap["primary"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6 rounded-2xl border border-white/5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${activeColor.bg} ${activeColor.text}`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </motion.div>
  );
};

export default DashboardStatCard;
