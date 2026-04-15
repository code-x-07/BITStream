"use client";

import { useMemo, useState } from "react";
import { Camera, Flame, Sparkles } from "lucide-react";
import type { AppSessionUser } from "@/backend/auth/session";
import type { SnapFeedResult, SnapItem } from "@/backend/snap/types";
import { Navbar } from "@/frontend/components/navbar";
import { SiteFooter } from "@/frontend/components/site-footer";
import { SnapComposer } from "@/frontend/modules/snap/snap-composer";
import { SnapStrip } from "@/frontend/modules/snap/snap-strip";
import { SnapViewer } from "@/frontend/modules/snap/snap-viewer";

interface SnapPageProps {
  currentUser: AppSessionUser;
  directUploadEnabled: boolean;
  initialFeed: SnapFeedResult;
}

async function createSnapRequest(payload: { caption: string; imageUrl: string }) {
  const response = await fetch("/api/snap", {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const result = (await response.json()) as { error?: string; snap?: SnapItem; success?: boolean };

  if (!response.ok || !result.success || !result.snap) {
    throw new Error(result.error || "Unable to create snap.");
  }

  return result.snap;
}

async function likeSnapRequest(snapId: string) {
  const response = await fetch("/api/snap/like", {
    body: JSON.stringify({ snapId }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const result = (await response.json()) as { error?: string; snap?: SnapItem; success?: boolean };

  if (!response.ok || !result.success || !result.snap) {
    throw new Error(result.error || "Unable to update like.");
  }

  return result.snap;
}

async function commentSnapRequest(snapId: string, comment: string) {
  const response = await fetch("/api/snap/comment", {
    body: JSON.stringify({ comment, snapId }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const result = (await response.json()) as { error?: string; snap?: SnapItem; success?: boolean };

  if (!response.ok || !result.success || !result.snap) {
    throw new Error(result.error || "Unable to add comment.");
  }

  return result.snap;
}

export function SnapPage({ currentUser, directUploadEnabled, initialFeed }: SnapPageProps) {
  const [feed, setFeed] = useState(initialFeed);
  const [selectedSnapId, setSelectedSnapId] = useState("");
  const selectedSnap = useMemo(
    () => feed.items.find((item) => item.id === selectedSnapId) || null,
    [feed.items, selectedSnapId],
  );

  function upsertSnap(nextSnap: SnapItem, options?: { prepend?: boolean }) {
    setFeed((current) => {
      const filtered = current.items.filter((item) => item.id !== nextSnap.id);
      return {
        ...current,
        enabled: true,
        items: options?.prepend ? [nextSnap, ...filtered] : [nextSnap, ...filtered],
      };
    });
    setSelectedSnapId(nextSnap.id);
  }

  async function handleCreateSnap(payload: { caption: string; imageUrl: string }) {
    const nextSnap = await createSnapRequest(payload);
    upsertSnap(nextSnap, { prepend: true });
  }

  async function handleLikeSnap(snapId: string) {
    const nextSnap = await likeSnapRequest(snapId);
    upsertSnap(nextSnap);
  }

  async function handleCommentSnap(snapId: string, comment: string) {
    const nextSnap = await commentSnapRequest(snapId, comment);
    upsertSnap(nextSnap);
  }

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />

      <main className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "url('/homepage-assets/film-texture.jpg')",
            backgroundPosition: "top center",
            backgroundRepeat: "repeat-y",
            backgroundSize: "100% auto",
          }}
        />

        <section className="relative border-b border-white/10 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
              <aside className="space-y-6">
                <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(12,20,34,0.95),rgba(18,32,52,0.92))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-8">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[#f0d6a8]">
                    <Sparkles className="h-4 w-4" />
                    24-hour lane
                  </div>
                  <h1 className="mt-5 text-4xl font-semibold text-white sm:text-5xl">Snap</h1>
                  <p className="mt-4 text-sm leading-7 text-[#c2d1e4] sm:text-base">
                    Fast image drops for Goa BITS. Post a moment, keep it live for 24 hours, and let the campus react in real time.
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-[#d8bc88]">Signed in</p>
                      <p className="mt-3 text-sm font-semibold text-white">{currentUser.name}</p>
                    </div>
                    <div className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-[#d8bc88]">Live now</p>
                      <p className="mt-3 text-2xl font-bold text-white">{feed.items.length}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-white/4 p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <Camera className="h-5 w-5 text-[#f0d6a8]" />
                    <h2 className="text-lg font-semibold text-white">How Snap works</h2>
                  </div>
                  <div className="mt-5 space-y-4 text-sm leading-7 text-[#afc0d6]">
                    <p>1. Upload an image or paste a hosted image URL.</p>
                    <p>2. Add a short caption and post it to the lane.</p>
                    <p>3. The snap stays visible to all signed-in BITS users for 24 hours.</p>
                    <p>4. Others can like it and comment while it is live.</p>
                  </div>
                </div>
              </aside>

              <div className="space-y-8">
                <SnapComposer directUploadEnabled={directUploadEnabled} onCreate={handleCreateSnap} />

                <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,30,0.96),rgba(17,27,43,0.92))] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.24)] sm:p-6">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-[#d8bc88]">Campus strip</p>
                      <h2 className="mt-2 text-2xl font-semibold text-white">Live snaps</h2>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#c0cede]">
                      <Flame className="h-4 w-4 text-[#f0d6a8]" />
                      {feed.items.length} active
                    </div>
                  </div>

                  {!feed.enabled && feed.reason && (
                    <div className="mb-5 rounded-[1.5rem] border border-amber-400/25 bg-amber-500/10 p-4 text-sm text-amber-50">
                      <p className="font-semibold">Snap is not fully active yet.</p>
                      <p className="mt-2 text-amber-100/90">{feed.reason}</p>
                      <p className="mt-2 text-amber-100/75">
                        Required file: <code className="rounded bg-black/20 px-2 py-1 text-xs">database/supabase/snap-schema.sql</code>
                      </p>
                    </div>
                  )}

                  {feed.items.length > 0 ? (
                    <SnapStrip items={feed.items} onOpen={setSelectedSnapId} selectedId={selectedSnap?.id} />
                  ) : (
                    <div className="rounded-[1.6rem] border border-dashed border-white/10 bg-black/10 px-4 py-16 text-center text-sm text-[#9bb0ca]">
                      No active snaps yet. Post the first one from your side of campus.
                    </div>
                  )}
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>

      {selectedSnap && (
        <SnapViewer onClose={() => setSelectedSnapId("")} onComment={handleCommentSnap} onLike={handleLikeSnap} snap={selectedSnap} />
      )}

      <SiteFooter />
    </div>
  );
}
