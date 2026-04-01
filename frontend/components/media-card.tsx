import Link from "next/link";
import type { MediaItem } from "@/backend/content/types";
import { formatCompactNumber } from "@/backend/content/utils";

interface MediaCardProps {
  media: MediaItem;
}

export function MediaCard({ media }: MediaCardProps) {
  return (
    <Link
      href={`/video/${media.slug}`}
      className="group relative block overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(17,28,44,0.92),rgba(12,20,33,0.95))] shadow-[0_24px_80px_rgba(0,0,0,0.24)] transition-all duration-500 hover:-translate-y-1 hover:border-[#f4d3a1]/50 hover:shadow-[0_30px_90px_rgba(0,0,0,0.3)]"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.08] mix-blend-screen"
        style={{ backgroundImage: "url('/homepage-assets/film-texture.jpg')" }}
      />

      <div className="relative aspect-video overflow-hidden border-b border-white/8">
        <img
          src={media.thumbnailUrl}
          alt={media.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-transparent to-transparent" />
        <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs font-semibold text-white">
          {media.category}
        </div>
        <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
          {media.durationLabel}
        </div>
      </div>

      <div className="relative space-y-3 p-5">
        <div>
          <h3 className="line-clamp-2 text-xl font-semibold text-white transition-colors group-hover:text-[#f4d3a1]">
            {media.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#b8c6da]">{media.description}</p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-[#c6d3e3]">
          {media.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full border border-white/8 bg-background/60 px-2.5 py-1">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-[#99abc3]">
          <span>{media.uploader.name}</span>
          <span>
            {formatCompactNumber(media.stats.views)} views · {formatCompactNumber(media.stats.likes)} likes
          </span>
        </div>
      </div>
    </Link>
  );
}
