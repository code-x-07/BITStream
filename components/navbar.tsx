'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline text-foreground group-hover:text-primary transition-colors">
              BITStream
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-foreground/80 hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/" className="text-sm text-foreground/80 hover:text-primary transition-colors">
              Discover
            </Link>
            <Link href="/admin" className="text-sm text-foreground/80 hover:text-primary transition-colors">
              Upload
            </Link>
          </div>

          {/* Search and Mobile Menu */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors hidden sm:block">
              <Search className="w-5 h-5 text-foreground" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-1 animate-slide-in-up">
            <Link href="/" className="block px-3 py-2 text-sm text-foreground/80 hover:bg-white/10 hover:text-primary rounded-lg transition-colors">
              Home
            </Link>
            <Link href="/" className="block px-3 py-2 text-sm text-foreground/80 hover:bg-white/10 hover:text-primary rounded-lg transition-colors">
              Discover
            </Link>
            <Link href="/admin" className="block px-3 py-2 text-sm text-foreground/80 hover:bg-white/10 hover:text-primary rounded-lg transition-colors">
              Upload Video
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
