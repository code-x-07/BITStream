"use client";

import { useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Clapperboard, ImagePlus, Link2 } from "lucide-react";
import { CONTENT_CATEGORIES } from "@/backend/content/types";
import { SubmitButton } from "@/frontend/components/submit-button";
import { submitMediaAction } from "@/backend/content/actions";

interface UploadFormProps {
  directUploadEnabled: boolean;
  message?: string;
  status?: string;
}

interface UploadedAssetState {
  publicId: string;
  url: string;
}

interface SignedUploadPayload {
  apiKey: string;
  cloudName: string;
  folder: string;
  publicId: string;
  resourceType: "video" | "image";
  signature: string;
  tags: string;
  timestamp: string;
}

async function getSignedUpload(kind: "video" | "thumbnail") {
  const response = await fetch("/api/uploads/sign", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ kind }),
  });

  const payload = (await response.json()) as SignedUploadPayload & { error?: string };

  if (!response.ok) {
    throw new Error(payload.error || "Unable to prepare upload.");
  }

  return payload;
}

async function uploadAsset(kind: "video" | "thumbnail", file: File): Promise<UploadedAssetState> {
  const signedUpload = await getSignedUpload(kind);
  const formData = new FormData();

  formData.append("file", file);
  formData.append("api_key", signedUpload.apiKey);
  formData.append("timestamp", signedUpload.timestamp);
  formData.append("folder", signedUpload.folder);
  formData.append("public_id", signedUpload.publicId);
  formData.append("signature", signedUpload.signature);
  formData.append("tags", signedUpload.tags);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${signedUpload.cloudName}/${signedUpload.resourceType}/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const payload = (await response.json()) as {
    error?: { message?: string };
    public_id?: string;
    secure_url?: string;
  };

  if (!response.ok || !payload.secure_url || !payload.public_id) {
    throw new Error(payload.error?.message || "Upload failed.");
  }

  return {
    publicId: payload.public_id,
    url: payload.secure_url,
  };
}

export function UploadForm({ directUploadEnabled, message, status }: UploadFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const bypassDirectUploadRef = useRef(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadState, setUploadState] = useState("");
  const [uploadedVideo, setUploadedVideo] = useState<UploadedAssetState | null>(null);
  const [uploadedThumbnail, setUploadedThumbnail] = useState<UploadedAssetState | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (bypassDirectUploadRef.current) {
      bypassDirectUploadRef.current = false;
      return;
    }

    if (!directUploadEnabled) {
      return;
    }

    const videoFile = videoInputRef.current?.files?.[0];
    const thumbnailFile = thumbnailInputRef.current?.files?.[0];

    if (!videoFile && !thumbnailFile) {
      return;
    }

    event.preventDefault();
    setUploadError("");

    try {
      let nextVideo = uploadedVideo;
      let nextThumbnail = uploadedThumbnail;

      if (videoFile && !uploadedVideo) {
        setUploadState("Uploading video...");
        nextVideo = await uploadAsset("video", videoFile);
        setUploadedVideo(nextVideo);
      }

      if (thumbnailFile && !uploadedThumbnail) {
        setUploadState("Uploading thumbnail...");
        nextThumbnail = await uploadAsset("thumbnail", thumbnailFile);
        setUploadedThumbnail(nextThumbnail);
      }

      setUploadState("Saving submission...");
      bypassDirectUploadRef.current = true;

      if (formRef.current) {
        const videoUrlField = formRef.current.elements.namedItem("uploadedVideoUrl") as HTMLInputElement | null;
        const videoPublicIdField = formRef.current.elements.namedItem("uploadedVideoPublicId") as HTMLInputElement | null;
        const thumbnailUrlField = formRef.current.elements.namedItem("uploadedThumbnailUrl") as HTMLInputElement | null;
        const thumbnailPublicIdField = formRef.current.elements.namedItem("uploadedThumbnailPublicId") as HTMLInputElement | null;

        if (videoUrlField) {
          videoUrlField.value = nextVideo?.url || "";
        }

        if (videoPublicIdField) {
          videoPublicIdField.value = nextVideo?.publicId || "";
        }

        if (thumbnailUrlField) {
          thumbnailUrlField.value = nextThumbnail?.url || "";
        }

        if (thumbnailPublicIdField) {
          thumbnailPublicIdField.value = nextThumbnail?.publicId || "";
        }

        formRef.current.requestSubmit();
      }
    } catch (error) {
      setUploadState("");
      setUploadError(error instanceof Error ? error.message : "Upload failed.");
    }
  }

  return (
    <form ref={formRef} action={submitMediaAction} onSubmit={handleSubmit} className="space-y-7">
      {status && message && (
        <div
          className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm ${
            status === "success"
              ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-100"
              : "border-red-400/30 bg-red-500/10 text-red-100"
          }`}
        >
          {status === "success" ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4" />
          ) : (
            <AlertCircle className="mt-0.5 h-4 w-4" />
          )}
          <span>{message}</span>
        </div>
      )}

      {uploadError && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          <AlertCircle className="mt-0.5 h-4 w-4" />
          <span>{uploadError}</span>
        </div>
      )}

      <input type="hidden" name="uploadedVideoUrl" defaultValue="" />
      <input type="hidden" name="uploadedVideoPublicId" defaultValue="" />
      <input type="hidden" name="uploadedThumbnailUrl" defaultValue="" />
      <input type="hidden" name="uploadedThumbnailPublicId" defaultValue="" />

      <div className="grid gap-6 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-white">Title</span>
          <input
            name="title"
            required
            placeholder="Campus documentary, movie cut, tutorial..."
            className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-[#8fa3bd] focus:border-[#f0d6a8]"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-white">Category</span>
          <select
            name="category"
            required
            defaultValue={CONTENT_CATEGORIES[0]}
            className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#f0d6a8]"
          >
            {CONTENT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-sm font-medium text-white">Description</span>
        <textarea
          name="description"
          required
          rows={5}
          placeholder="What is it, what vibe does it carry, and why should it be featured?"
          className="w-full rounded-[1.75rem] border border-white/10 bg-white/6 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-[#8fa3bd] focus:border-[#f0d6a8]"
        />
      </label>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-white">Tags</span>
          <input
            name="tags"
            placeholder="hostel, fest, monsoon, tutorial"
            className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-[#8fa3bd] focus:border-[#f0d6a8]"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-white">Duration</span>
          <input
            name="durationLabel"
            placeholder="08:45"
            className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-[#8fa3bd] focus:border-[#f0d6a8]"
          />
        </label>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[1.75rem] border border-white/10 bg-white/4 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Clapperboard className="h-4 w-4 text-[#f0d6a8]" />
            <h2 className="font-semibold text-white">Video</h2>
          </div>
          <div className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm text-[#afc0d6]">Hosted MP4 / WebM URL</span>
              <div className="relative">
                <Link2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8fa3bd]" />
                <input
                  type="url"
                  name="externalVideoUrl"
                  placeholder="https://..."
                  className="w-full rounded-2xl border border-white/10 bg-white/6 py-3 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-[#8fa3bd] focus:border-[#f0d6a8]"
                />
              </div>
            </label>

            <label className="block space-y-2">
              <span className="text-sm text-[#afc0d6]">
                {directUploadEnabled ? "Upload a local video file" : "Local file upload is not live yet"}
              </span>
              <input
                ref={videoInputRef}
                type="file"
                name={directUploadEnabled ? undefined : "videoFile"}
                accept="video/mp4,video/webm,video/quicktime"
                className="block w-full rounded-2xl border border-dashed border-white/10 bg-white/6 px-4 py-3 text-sm text-[#afc0d6] file:mr-4 file:rounded-full file:border-0 file:bg-[#f0d6a8] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#101827]"
              />
            </label>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-white/10 bg-white/4 p-6">
          <div className="mb-4 flex items-center gap-2">
            <ImagePlus className="h-4 w-4 text-[#f0d6a8]" />
            <h2 className="font-semibold text-white">Thumbnail</h2>
          </div>
          <div className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm text-[#afc0d6]">Hosted image URL</span>
              <div className="relative">
                <Link2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8fa3bd]" />
                <input
                  type="url"
                  name="externalThumbnailUrl"
                  placeholder="https://..."
                  className="w-full rounded-2xl border border-white/10 bg-white/6 py-3 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-[#8fa3bd] focus:border-[#f0d6a8]"
                />
              </div>
            </label>

            <label className="block space-y-2">
              <span className="text-sm text-[#afc0d6]">
                {directUploadEnabled ? "Upload a local thumbnail image" : "Local image upload is not live yet"}
              </span>
              <input
                ref={thumbnailInputRef}
                type="file"
                name={directUploadEnabled ? undefined : "thumbnailFile"}
                accept="image/png,image/jpeg,image/webp"
                className="block w-full rounded-2xl border border-dashed border-white/10 bg-white/6 px-4 py-3 text-sm text-[#afc0d6] file:mr-4 file:rounded-full file:border-0 file:bg-[#f0d6a8] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#101827]"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-[#f0d6a8]/20 bg-[#f0d6a8]/8 p-5 text-sm leading-7 text-[#d9e3f0]">
        {uploadState ||
          (directUploadEnabled
            ? "Local files upload directly to Cloudinary before the submission is saved."
            : "Direct uploads become available on the live site after Cloudinary env vars are added in Vercel. Until then, use hosted URLs.")}
      </div>

      <SubmitButton
        idleLabel="Send for review"
        pendingLabel={uploadState || "Submitting..."}
        className="inline-flex w-full items-center justify-center rounded-full bg-[#f0d6a8] px-6 py-3 text-sm font-semibold text-[#111827] transition-colors hover:bg-[#f7dfb7] disabled:cursor-not-allowed disabled:opacity-70"
      />
    </form>
  );
}
