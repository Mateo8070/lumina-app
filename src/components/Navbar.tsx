import React, { useState } from 'react';
import { ShoppingCart, Search, User, Menu, X, Sparkles } from 'lucide-react';
import { useCartStore } from '../store';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

export const Navbar = ({ onCartOpen }: { onCartOpen: () => void }) => {
  const cartItems = useCartStore((state) => state.items);
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-bold tracking-tighter flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
              LUMINA
            </Link>
            
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600">
              <Link to="/" className="hover:text-black transition-colors">Shop</Link>
              <Link to="/" className="hover:text-black transition-colors">New Arrivals</Link>
              <Link to="/" className="hover:text-black transition-colors">Collections</Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center bg-zinc-100 rounded-full px-4 py-1.5 gap-2 border border-transparent focus-within:border-zinc-300 transition-all">
              <Search size={16} className="text-zinc-400" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="bg-transparent border-none outline-none text-sm w-48"
              />
            </div>
            
            <button className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
              <User size={20} />
            </button>
            
            <button 
              onClick={onCartOpen}
              className="p-2 hover:bg-zinc-100 rounded-full transition-colors relative"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </button>

            <button 
              className="md:hidden p-2 hover:bg-zinc-100 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-zinc-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              <Link to="/" className="block text-sm font-medium">Shop</Link>
              <Link to="/" className="block text-sm font-medium">New Arrivals</Link>
              <Link to="/" className="block text-sm font-medium">Collections</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
