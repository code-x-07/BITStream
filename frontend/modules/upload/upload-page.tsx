import { AlertCircle, CheckCircle2, Clapperboard, Film, ImagePlus, Link2, UploadCloud } from "lucide-react";
import { Navbar } from "@/frontend/components/navbar";
import { SiteFooter } from "@/frontend/components/site-footer";
import { SubmitButton } from "@/frontend/components/submit-button";
import { requireCampusUser } from "@/backend/auth/session";
import { CONTENT_CATEGORIES } from "@/backend/content/types";
import { submitMediaAction } from "@/backend/content/actions";

interface UploadPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

function pickValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export async function UploadPage({ searchParams }: UploadPageProps) {
  const user = await requireCampusUser("/upload");
  const resolvedParams = (await searchParams) || {};
  const status = pickValue(resolvedParams.status);
  const message = pickValue(resolvedParams.message);

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />

      <main className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "url('/homepage-assets/film-texture.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />

        <section className="relative border-b border-white/10 px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
              <aside className="space-y-6">
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#d8bc88]">Upload</p>
                  <h1 className="mt-4 text-4xl font-semibold text-white">Send a story for review</h1>
                  <p className="mt-4 text-sm leading-7 text-[#afc0d6]">
                    Signed in as <span className="font-semibold text-white">{user.email}</span>. Add a clean hosted
                    video link, a thumbnail, and the category. Admins will review before it goes live.
                  </p>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-[#0d1624]/90 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.2)]">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#d8bc88]">Best flow</p>
                  <div className="mt-6 space-y-5">
                    {[
                      "Paste a hosted MP4 or WebM URL for the video.",
                      "Add a hosted image URL for the thumbnail.",
                      "Keep the title short and tags sharp so the shelf looks clean.",
                    ].map((point, index) => (
                      <div key={point} className="flex gap-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/8 text-sm font-semibold text-[#f0d6a8]">
                          {index + 1}
                        </div>
                        <p className="pt-1 text-sm leading-7 text-[#afc0d6]">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>

              <section className="rounded-[2rem] border border-white/10 bg-[#0d1624]/92 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.3)]">
                {status && message && (
                  <div
                    className={`mb-6 flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm ${
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

                <form action={submitMediaAction} className="space-y-7">
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
                          <span className="text-sm text-[#afc0d6]">Optional local file for local demo only</span>
                          <input
                            type="file"
                            name="videoFile"
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
                          <span className="text-sm text-[#afc0d6]">Optional local image for local demo only</span>
                          <input
                            type="file"
                            name="thumbnailFile"
                            accept="image/png,image/jpeg,image/webp"
                            className="block w-full rounded-2xl border border-dashed border-white/10 bg-white/6 px-4 py-3 text-sm text-[#afc0d6] file:mr-4 file:rounded-full file:border-0 file:bg-[#f0d6a8] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#101827]"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] border border-[#f0d6a8]/20 bg-[#f0d6a8]/8 p-5 text-sm leading-7 text-[#d9e3f0]">
                    On the live Vercel site, use hosted URLs for the video and thumbnail. Direct file upload is only
                    safe for local development right now.
                  </div>

                  <SubmitButton
                    idleLabel="Send for review"
                    pendingLabel="Submitting..."
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#f0d6a8] px-6 py-3 text-sm font-semibold text-[#111827] transition-colors hover:bg-[#f7dfb7] disabled:cursor-not-allowed disabled:opacity-70"
                  />
                </form>
              </section>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
