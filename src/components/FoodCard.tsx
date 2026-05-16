
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
      className="glass-dark group rounded-[3rem] overflow-hidden flex flex-col h-full border border-white/5 hover:border-primary/30 transition-all duration-700 shadow-2xl font-body hospitality-glow group/card"
    >
      <div className="relative h-80 w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
        
        <div className="absolute top-6 right-6">
          <button className="w-12 h-12 bg-black/60 backdrop-blur-md rounded-2xl text-white/80 hover:text-primary hover:bg-white transition-all flex items-center justify-center border border-white/10 shadow-2xl">
            <Heart className="w-6 h-6" />
          </button>
        </div>

        <div className="absolute top-6 left-6 flex flex-col gap-3">
          {item.popular && (
            <div className="bg-primary px-5 py-2 rounded-2xl flex items-center gap-2 shadow-2xl border border-white/10 backdrop-blur-md hospitality-glow">
              <Flame className="w-4 h-4 text-white fill-white" />
              <span className="text-[11px] font-bold text-white uppercase tracking-wider">Hottest</span>
            </div>
          )}
          <div className="bg-white/10 backdrop-blur-xl px-5 py-2 rounded-2xl flex items-center gap-2 shadow-2xl border border-white/10">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-[11px] font-bold text-white uppercase tracking-wider">{item.category}</span>
          </div>
        </div>
      </div>

      <div className="p-10 flex flex-col flex-grow relative">
        <div className="absolute -top-12 right-10">
          <button
            onClick={() => onAddToCart?.(item)}
            className="w-20 h-20 premium-gradient rounded-3xl flex items-center justify-center text-white shadow-[0_20px_50px_rgba(255,102,0,0.4)] hover:scale-110 active:scale-95 transition-all hospitality-glow border-4 border-dark group-hover:rotate-6 duration-500"
          >
            <Plus className="w-10 h-10" />
          </button>
        </div>

        <div className="mb-8 pt-4">
          <h3 className="font-bold text-3xl leading-tight font-heading tracking-tight text-white mb-4 group-hover:text-primary transition-colors">{item.name}</h3>
          <p className="text-gray-400 text-lg leading-relaxed line-clamp-2 font-medium">{item.description}</p>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mb-2">Investment</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold gold-text font-heading">{formatPrice(item.price)}</span>
              <span className="text-xs text-gray-600 font-bold uppercase tracking-widest">/ serving</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-accent">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-bold tracking-widest">4.9</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
