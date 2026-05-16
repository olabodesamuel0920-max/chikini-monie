
"use client";

import Image from "next/image";
import { Plus, Heart } from "lucide-react";
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
      className="glass group rounded-2xl overflow-hidden flex flex-col h-full border border-white/5 hover:border-primary/30 transition-colors shadow-2xl"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute bottom-2 left-3 z-20">
          <span className="text-[7px] text-white/40 uppercase tracking-widest font-medium">Placeholder Preview</span>
        </div>
        <div className="absolute top-3 right-3">
          <button className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white/80 hover:text-primary transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>
        {item.popular && (
          <div className="absolute top-3 left-3 bg-primary px-3 py-1 rounded-full">
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Popular</span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{item.name}</h3>
        </div>
        <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">{item.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold gold-text">{formatPrice(item.price)}</span>
          <button
            onClick={() => onAddToCart?.(item)}
            className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-all"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
