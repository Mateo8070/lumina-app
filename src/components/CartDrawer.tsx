import React from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { items, total, updateQuantity, removeItem } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
          >
            <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} />
                <h2 className="text-lg font-bold">Your Cart</h2>
                <span className="bg-zinc-100 text-zinc-600 text-xs px-2 py-0.5 rounded-full font-medium">
                  {items.length}
                </span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center">
                    <ShoppingBag size={24} className="text-zinc-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-zinc-900">Your cart is empty</h3>
                    <p className="text-sm text-zinc-500">Looks like you haven't added anything yet.</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="text-sm font-bold underline underline-offset-4"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-zinc-50 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-medium text-zinc-900 truncate pr-4">{item.name}</h4>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-zinc-400 hover:text-red-500 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <p className="text-xs text-zinc-500 mb-2">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-zinc-50 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-zinc-50 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-zinc-100 bg-zinc-50/50 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-500">Subtotal</span>
                  <span className="font-bold text-zinc-900">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-500">Shipping</span>
                  <span className="text-zinc-900 font-medium">Calculated at checkout</span>
                </div>
                <div className="pt-4 border-t border-zinc-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-base font-bold">Total</span>
                    <span className="text-xl font-bold">${total.toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-[0.98] shadow-xl shadow-zinc-200">
                    Checkout <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
