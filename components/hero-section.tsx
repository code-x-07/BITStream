'use client';

import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-transparent to-primary/5" />

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-primary/20" />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 rounded-full glass-dark text-sm font-medium text-primary">
            Your Educational Video Platform
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance animate-slide-in-up">
          <span className="text-foreground">Unlock</span>
          <br />
          <span className="neon-cyan">Endless Learning</span>
        </h1>

        <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto text-balance animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
          Stream curated educational content from lectures, tutorials, and expert talks. Find the knowledge you need with advanced search and filtering.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold flex items-center justify-center gap-2 glow-cyan"
          >
            <Play className="w-5 h-5" />
            Start Exploring
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 text-foreground hover:bg-white/10"
          >
            Learn More
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
          <div>
            <div className="text-2xl md:text-3xl font-bold text-primary">1000+</div>
            <p className="text-sm text-foreground/60">Videos</p>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-secondary">50+</div>
            <p className="text-sm text-foreground/60">Courses</p>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-primary">24/7</div>
            <p className="text-sm text-foreground/60">Access</p>
          </div>
        </div>
      </div>
    </section>
  );
}
