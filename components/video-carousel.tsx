'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  professor: string;
  progress?: number;
}

interface VideoCarouselProps {
  title: string;
  videos: Video[];
}

export default function VideoCarousel({ title, videos }: VideoCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-balance">
          <span className="text-foreground">{title}</span>
        </h2>

        <div className="relative">
          {/* Scroll Buttons */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 p-2 rounded-full transition-colors md:block hidden"
            >
              <ChevronLeft className="w-6 h-6 text-primary" />
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 p-2 rounded-full transition-colors md:block hidden"
            >
              <ChevronRight className="w-6 h-6 text-primary" />
            </button>
          )}

          {/* Video Cards */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          >
            {videos.map((video) => (
              <div
                key={video.id}
                className="flex-shrink-0 w-full sm:w-80 group cursor-pointer"
              >
                <div className="relative mb-3 rounded-lg overflow-hidden bg-card border border-white/10 hover-glow">
                  {/* Thumbnail */}
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
                    {/* Animated Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all" />

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all">
                      <Play className="w-12 h-12 text-primary opacity-0 group-hover:opacity-100 transition-all transform group-hover:scale-110" />
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/80 text-xs font-medium text-foreground">
                      {video.duration}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {video.progress && (
                    <div className="h-1 bg-input">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${video.progress}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Video Info */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-sm text-foreground/60">{video.professor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
