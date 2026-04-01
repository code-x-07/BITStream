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
      {/* Thumbnail Container */}
      <div className="relative w-full aspect-video rounded-sm overflow-hidden bg-black border border-gray-700/50 group-hover:border-primary transition-all duration-300">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transform transition-all duration-200">
            <Play className="w-6 h-6 text-black fill-black ml-1" />
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-sm bg-black/80 text-white text-xs font-bold">
          {video.duration}
        </div>

        {/* Category Badge */}
        <div className="absolute top-2 left-2 px-2.5 py-1 rounded-sm bg-primary/90 text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {video.category}
        </div>
      </div>

      {/* Video Info */}
      <div className="mt-3 space-y-1.5">
        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 text-sm leading-tight">
          {video.title}
        </h3>

        <p className="text-xs text-gray-400">By {video.uploadedBy}</p>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs text-gray-400 pt-1">
          <div className="flex items-center gap-1.5">
            <Eye className="w-3 h-3" />
            <span>{(video.views / 1000).toFixed(0)}K</span>
          </div>
          <div className="w-1 h-1 bg-gray-600 rounded-full" />
          <div className="flex items-center gap-1.5">
            <Heart className="w-3 h-3" />
            <span>{(video.likes / 100).toFixed(0)}K</span>
          </div>
        </div>
      </div>
    </div>
  );
}
