
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
  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    "green-500": { bg: "bg-green-500/10", text: "text-green-500", border: "border-green-500/20" },
    "primary": { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20" },
    "orange-500": { bg: "bg-orange-500/10", text: "text-orange-500", border: "border-orange-500/20" },
    "purple-500": { bg: "bg-purple-500/10", text: "text-purple-500", border: "border-purple-500/20" },
  };

  const activeColor = colorMap[color] || colorMap["primary"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-premium p-8 rounded-[2.5rem] border border-white/5 flex flex-col justify-between h-full shadow-2xl group hover:border-white/10 transition-all"
    >
      <div className="flex items-center justify-between mb-8">
        <div className={`w-14 h-14 rounded-2xl ${activeColor.bg} ${activeColor.text} ${activeColor.border} border flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <Icon className="w-7 h-7" />
        </div>
        {trend && (
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-green-500 bg-green-500/10 px-3 py-1 rounded-lg border border-green-500/20 uppercase tracking-widest">
              {trend}
            </span>
            <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest mt-1">v. last month</span>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{title}</h3>
        <p className="text-4xl font-black text-white italic tracking-tighter">{value}</p>
      </div>
    </motion.div>
  );
};

export default DashboardStatCard;
