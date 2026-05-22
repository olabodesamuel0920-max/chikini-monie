
"use client";

import { Plus, Heart, Sparkles, Star } from "lucide-react";
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
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-premium group rounded-2xl overflow-hidden flex flex-col h-full border border-white/[0.05] hover:border-primary/40 transition-all duration-500 shadow-xl font-body"
    >
      {/* Image Container */}
      <div className="relative h-48 md:h-56 w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-40" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {item.popular && (
            <div className="bg-primary/90 backdrop-blur-md px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-lg">
              <Sparkles className="w-3 h-3 text-white fill-white" />
              <span className="text-[9px] font-black text-white uppercase tracking-[0.1em]">Hottest</span>
            </div>
          )}
          <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg text-white/90 text-[9px] font-bold uppercase tracking-[0.1em] border border-white/10">
            {item.category}
          </div>
        </div>

        {/* Favorite Button */}
        <button 
          type="button"
          onClick={(e) => e.stopPropagation()}
          className="absolute z-10 top-4 right-4 w-9 h-9 bg-black/40 backdrop-blur-md rounded-xl text-white/70 hover:text-primary hover:bg-white transition-all flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 cursor-pointer pointer-events-auto"
        >
          <Heart className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3 gap-4">
          <h3 className="font-bold text-xl leading-tight font-heading tracking-tight text-white group-hover:text-primary transition-colors">{item.name}</h3>
          <div className="flex items-center gap-1 text-accent shrink-0">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-[10px] font-black tracking-widest">4.9</span>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 font-medium mb-6">
          {item.description}
        </p>
        
        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/[0.05]">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-1">Price</span>
            <span className="text-xl font-bold text-white font-heading">{formatPrice(item.price)}</span>
          </div>
          
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(item);
            }}
            className="relative z-10 w-10 h-10 premium-gradient rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/10 hover:scale-110 active:scale-95 transition-all cursor-pointer pointer-events-auto"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

    </motion.div>
  );
};

export default FoodCard;
