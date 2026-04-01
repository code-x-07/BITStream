'use client';

import { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass-dark border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold neon-cyan">BITStream</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">
              Home
            </a>
            <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">
              Browse
            </a>
            <a href="/admin" className="text-foreground/80 hover:text-foreground transition-colors">
              Admin
            </a>
          </div>

          {/* Search & Actions */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search videos..."
                className="bg-input/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="md:hidden pb-4">
            <input
              type="text"
              placeholder="Search videos..."
              className="w-full bg-input/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary"
            />
          </div>
        )}

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-1 animate-slide-in-up">
            <a href="#" className="block text-foreground/80 hover:text-foreground hover:bg-white/10 py-2 px-2 rounded transition-colors">
              Home
            </a>
            <a href="#" className="block text-foreground/80 hover:text-foreground hover:bg-white/10 py-2 px-2 rounded transition-colors">
              Browse
            </a>
            <a href="/admin" className="block text-foreground/80 hover:text-foreground hover:bg-white/10 py-2 px-2 rounded transition-colors">
              Admin
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
