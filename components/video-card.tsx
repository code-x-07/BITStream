'use client';

import { Video } from '@/lib/videos';
import { Play, Heart, Eye } from 'lucide-react';
import Image from 'next/image';

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-all duration-300">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="w-7 h-7 text-primary-foreground fill-primary-foreground" />
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/70 text-white text-xs font-medium">
          {video.duration}
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 space-y-2">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {video.title}
        </h3>

        <p className="text-sm text-muted-foreground">By {video.uploadedBy}</p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            {(video.views / 1000).toFixed(0)}K views
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5" />
            {(video.likes / 100).toFixed(0)}K likes
          </div>
        </div>
      </div>
    </div>
  );
}
