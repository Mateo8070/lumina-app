import React from 'react';
import { Product } from '../types';
import { useCartStore } from '../store';
import { Plus, Star } from 'lucide-react';
import { motion } from 'motion/react';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-zinc-100 hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300"
    >
      <div className="aspect-square overflow-hidden bg-zinc-50 relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider border border-zinc-100">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-medium text-zinc-900 group-hover:text-black transition-colors truncate pr-4">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 text-xs font-medium text-zinc-500">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            {product.rating}
          </div>
        </div>
        
        <p className="text-sm text-zinc-500 line-clamp-2 mb-4 h-10">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-semibold text-zinc-900">
            ${product.price.toFixed(2)}
          </span>
          <button 
            onClick={() => addItem(product)}
            className="p-2 bg-zinc-900 text-white rounded-xl hover:bg-black transition-all active:scale-95 shadow-lg shadow-zinc-200"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
