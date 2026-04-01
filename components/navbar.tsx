'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-b from-black/80 via-black/60 to-black/20 backdrop-blur-lg border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-md bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center shadow-lg shadow-red-600/50">
              <span className="text-white font-black text-lg">B</span>
            </div>
            <span className="font-black text-lg hidden sm:inline text-white group-hover:text-red-400 transition-colors tracking-tight">
              BITStream
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-gray-300 hover:text-white transition-colors font-medium">
              Home
            </Link>
            <Link href="/" className="text-sm text-gray-300 hover:text-white transition-colors font-medium">
              Discover
            </Link>
            <Link href="/admin" className="text-sm text-gray-300 hover:text-white transition-colors font-medium">
              Upload
            </Link>
          </div>

          {/* Search and Mobile Menu */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-800/50 rounded-lg transition-all duration-200 hidden sm:block">
              <Search className="w-5 h-5 text-gray-400 hover:text-white" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-gray-800/50 rounded-lg transition-all duration-200"
            >
              {isOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-slide-in-up">
            <Link href="/" className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white rounded-lg transition-colors font-medium">
              Home
            </Link>
            <Link href="/" className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white rounded-lg transition-colors font-medium">
              Discover
            </Link>
            <Link href="/admin" className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white rounded-lg transition-colors font-medium">
              Upload Video
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
