import { AlertCircle, CheckCircle2, CloudUpload, Film, ImagePlus } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[2rem] border border-border/70 bg-card/50 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
            <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">Upload flow</p>
            <h1 className="mt-3 text-4xl font-bold text-foreground">Submit a video for review</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Signed in as <span className="font-semibold text-foreground">{user.email}</span>. Your upload stays in
              the pending queue until an admin approves it.
            </p>

            {status && message && (
              <div
                className={`mt-6 flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm ${
                  status === "success"
                    ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-200"
                    : "border-red-400/30 bg-red-500/10 text-red-200"
                }`}
              >
                {status === "success" ? <CheckCircle2 className="mt-0.5 h-4 w-4" /> : <AlertCircle className="mt-0.5 h-4 w-4" />}
                <span>{message}</span>
              </div>
            )}

            <form action={submitMediaAction} className="mt-8 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-foreground">Title</span>
                  <input
                    name="title"
                    required
                    placeholder="Monsoon documentary, movie recap, tutorial..."
                    className="w-full rounded-2xl border border-border/70 bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-foreground">Category</span>
                  <select
                    name="category"
                    required
                    defaultValue={CONTENT_CATEGORIES[0]}
                    className="w-full rounded-2xl border border-border/70 bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
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
                <span className="text-sm font-medium text-foreground">Description</span>
                <textarea
                  name="description"
                  required
                  rows={5}
                  placeholder="Tell reviewers what the video is about, why it belongs on BITStream, and anything they should know."
                  className="w-full rounded-3xl border border-border/70 bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                />
              </label>

              <div className="grid gap-6 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-foreground">Tags</span>
                  <input
                    name="tags"
                    placeholder="campus, documentary, fest, comedy"
                    className="w-full rounded-2xl border border-border/70 bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-foreground">Duration label</span>
                  <input
                    name="durationLabel"
                    placeholder="12:45"
                    className="w-full rounded-2xl border border-border/70 bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                  />
                </label>
              </div>

              <div className="grid gap-6 xl:grid-cols-2">
                <div className="rounded-3xl border border-border/70 bg-background/60 p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <Film className="h-4 w-4 text-primary" />
                    <h2 className="font-semibold text-foreground">Video source</h2>
                  </div>
                  <div className="space-y-4">
                    <label className="block space-y-2">
                      <span className="text-sm text-muted-foreground">Upload a local demo file</span>
                      <input
                        type="file"
                        name="videoFile"
                        accept="video/mp4,video/webm,video/quicktime"
                        className="block w-full rounded-2xl border border-dashed border-border/70 bg-background/80 px-4 py-3 text-sm text-muted-foreground file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground"
                      />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-sm text-muted-foreground">Or paste a hosted MP4/WebM URL</span>
                      <input
                        type="url"
                        name="externalVideoUrl"
                        placeholder="https://..."
                        className="w-full rounded-2xl border border-border/70 bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                      />
                    </label>
                  </div>
                </div>

                <div className="rounded-3xl border border-border/70 bg-background/60 p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <ImagePlus className="h-4 w-4 text-secondary" />
                    <h2 className="font-semibold text-foreground">Thumbnail</h2>
                  </div>
                  <div className="space-y-4">
                    <label className="block space-y-2">
                      <span className="text-sm text-muted-foreground">Upload an image</span>
                      <input
                        type="file"
                        name="thumbnailFile"
                        accept="image/png,image/jpeg,image/webp"
                        className="block w-full rounded-2xl border border-dashed border-border/70 bg-background/80 px-4 py-3 text-sm text-muted-foreground file:mr-4 file:rounded-full file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-secondary-foreground"
                      />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-sm text-muted-foreground">Or paste an image URL</span>
                      <input
                        type="url"
                        name="externalThumbnailUrl"
                        placeholder="https://..."
                        className="w-full rounded-2xl border border-border/70 bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-primary/20 bg-primary/10 p-5 text-sm text-muted-foreground">
                Small note for now: the local demo supports modest file sizes directly on the app server. For larger
                videos, paste a hosted URL and let the admin approval flow handle publication.
              </div>

              <SubmitButton
                idleLabel="Send for admin approval"
                pendingLabel="Submitting..."
                className="inline-flex w-full items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
              />
            </form>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-border/70 bg-card/50 p-8">
              <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">How it works</p>
              <div className="mt-6 space-y-4">
                {[
                  "Students sign in with their Goa BITS email account.",
                  "Uploads go into a pending queue rather than publishing instantly.",
                  "Admins approve or reject with notes from the moderation dashboard.",
                  "Approved media automatically shows up on the public discovery page.",
                ].map((step, index) => (
                  <div key={step} className="flex gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-background text-sm font-semibold text-primary">
                      {index + 1}
                    </div>
                    <p className="pt-1 text-sm text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-border/70 bg-card/50 p-8">
              <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">Review tips</p>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li>Use descriptive titles so category filters stay useful.</li>
                <li>Short, clear tags improve discoverability on the home page.</li>
                <li>Thumbnail quality matters because approved uploads become public cards immediately.</li>
                <li>Hosted MP4/WebM links are best for large files until you plug in cloud storage.</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
