
"use client";

import { Plus, Heart, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { MenuItem } from "@/lib/demo-data";
import { formatPrice } from "@/lib/utils";

interface FoodCardProps {
  item: MenuItem;
  onAddToCart?: (item: MenuItem) => void;
}

const FoodCard = ({ item, onAddToCart }: FoodCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-premium group rounded-[2.5rem] overflow-hidden flex flex-col h-full border border-white/5 hover:border-primary/20 transition-all duration-500 shadow-2xl font-body"
    >
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute top-4 right-4">
          <button className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-xl text-white/80 hover:text-primary transition-all flex items-center justify-center border border-white/10">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        {item.popular && (
          <div className="absolute top-4 left-4 bg-primary px-4 py-1.5 rounded-xl flex items-center gap-2 shadow-xl border border-white/10">
            <Flame className="w-3 h-3 text-white fill-white" />
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Hottest</span>
          </div>
        )}
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <div className="mb-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-2xl leading-tight font-heading tracking-tight group-hover:text-primary transition-colors">{item.name}</h3>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 font-medium">{item.description}</p>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Price</span>
            <span className="text-2xl font-bold gold-text font-heading">{formatPrice(item.price)}</span>
          </div>
          <button
            onClick={() => onAddToCart?.(item)}
            className="w-14 h-14 premium-gradient rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-primary/30 hover:scale-110 active:scale-95 transition-all"
          >
            <Plus className="w-8 h-8" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
