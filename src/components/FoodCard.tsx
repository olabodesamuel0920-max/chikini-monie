
"use client";

import { Plus, Heart, Flame, Sparkles, Star } from "lucide-react";
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
      className="glass-premium group rounded-[3rem] overflow-hidden flex flex-col h-full border border-white/5 hover:border-primary/30 transition-all duration-700 shadow-2xl font-body hospitality-glow"
    >
      <div className="relative h-72 w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-60" />
        
        <div className="absolute top-6 right-6">
          <button className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-2xl text-white/80 hover:text-primary hover:bg-white transition-all flex items-center justify-center border border-white/10">
            <Heart className="w-6 h-6" />
          </button>
        </div>

        <div className="absolute top-6 left-6 flex flex-col gap-3">
          {item.popular && (
            <div className="bg-primary px-5 py-2 rounded-2xl flex items-center gap-2 shadow-2xl border border-white/10 backdrop-blur-md">
              <Flame className="w-4 h-4 text-white fill-white" />
              <span className="text-[11px] font-bold text-white uppercase tracking-wider">Hottest</span>
            </div>
          )}
          <div className="category-chip bg-white/5 text-white/70 flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-accent" />
            {item.category}
          </div>
        </div>
      </div>

      <div className="p-10 flex flex-col flex-grow">
        <div className="mb-8">
          <h3 className="font-bold text-3xl leading-tight font-heading tracking-tight text-white mb-4 group-hover:text-primary transition-colors">{item.name}</h3>
          <p className="text-gray-500 text-lg leading-relaxed line-clamp-2 font-medium">{item.description}</p>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em] mb-2">Price</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold gold-text font-heading">{formatPrice(item.price)}</span>
              <span className="text-[10px] text-gray-700 font-bold uppercase tracking-widest">/ serving</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-4">
            <div className="flex items-center gap-2 text-accent/60 opacity-50">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-[10px] font-bold tracking-widest">4.9 (Sample)</span>
            </div>
            <button
              onClick={() => onAddToCart?.(item)}
              className="w-16 h-16 premium-gradient rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-primary/30 hover:scale-110 active:scale-95 transition-all hospitality-glow"
            >
              <Plus className="w-9 h-9" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
