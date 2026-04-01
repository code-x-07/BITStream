"use client";

import { useEffect, useState, type ImgHTMLAttributes } from "react";
import { getThumbnailCandidates } from "@/backend/content/thumbnail-utils";

interface MediaThumbnailProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src?: string | null;
  videoUrl?: string | null;
}

export function MediaThumbnail({ src, videoUrl, alt, ...props }: MediaThumbnailProps) {
  const candidates = getThumbnailCandidates({ thumbnailUrl: src, videoUrl });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [src, videoUrl]);

  return (
    <img
      {...props}
      alt={alt}
      src={candidates[index] || candidates[candidates.length - 1]}
      onError={() => {
        setIndex((current) => (current < candidates.length - 1 ? current + 1 : current));
      }}
    />
  );
}
