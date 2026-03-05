import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { AISearch } from './components/AISearch';
import { products } from './data';
import { Category } from './types';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  
  const categories: Category[] = ['All', 'Electronics', 'Home', 'Fashion', 'Lifestyle'];

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    return products.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-zinc-900 text-white">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 text-emerald-400 mb-6">
              <Sparkles size={20} />
              <span className="text-sm font-bold tracking-widest uppercase">New Collection 2026</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-8">
              Elevate Your <br />
              <span className="text-zinc-400">Everyday.</span>
            </h1>
            <p className="text-lg text-zinc-300 mb-10 max-w-lg leading-relaxed">
              Discover a curated selection of premium products designed to blend seamlessly into your modern lifestyle.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-black px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-zinc-200 transition-all active:scale-95">
                Shop Now <ArrowRight size={20} />
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all">
                View Lookbook
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-4">Featured Products</h2>
            <p className="text-zinc-500 max-w-md">Our most popular items, hand-picked for their exceptional quality and design.</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  selectedCategory === cat 
                    ? 'bg-black text-white shadow-lg shadow-zinc-200' 
                    : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-zinc-50 py-24 border-y border-zinc-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Lumina Community</h2>
          <p className="text-zinc-500 mb-8">Subscribe to receive updates on new arrivals, exclusive offers, and design inspiration.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 bg-white border border-zinc-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-black transition-all"
            />
            <button className="bg-black text-white px-8 py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-all active:scale-95">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-xl font-bold tracking-tighter">LUMINA</div>
            <div className="flex gap-8 text-sm text-zinc-500 font-medium">
              <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-black transition-colors">Shipping Info</a>
              <a href="#" className="hover:text-black transition-colors">Contact</a>
            </div>
            <div className="text-sm text-zinc-400">
              © 2026 Lumina Shop. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <div className="font-sans antialiased text-zinc-900 selection:bg-zinc-900 selection:text-white">
        <Navbar onCartOpen={() => setIsCartOpen(true)} />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <AISearch />
      </div>
    </Router>
  );
}
