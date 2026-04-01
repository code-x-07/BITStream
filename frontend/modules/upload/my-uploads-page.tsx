import Link from "next/link";
import { Clock3, Eye, ShieldCheck, XCircle } from "lucide-react";
import { Navbar } from "@/frontend/components/navbar";
import { SiteFooter } from "@/frontend/components/site-footer";
import { requireCampusUser } from "@/backend/auth/session";
import { getMedia } from "@/backend/content/repository";

function tone(status: "pending" | "approved" | "rejected") {
  switch (status) {
    case "approved":
      return "border-emerald-400/20 bg-emerald-500/10 text-emerald-200";
    case "rejected":
      return "border-red-400/20 bg-red-500/10 text-red-200";
    default:
      return "border-amber-400/20 bg-amber-500/10 text-amber-100";
  }
}

export async function MyUploadsPage() {
  const user = await requireCampusUser("/my-uploads");
  const uploads = await getMedia({ uploaderEmail: user.email });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <section className="rounded-[2rem] border border-border/70 bg-card/50 p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">My submissions</p>
            <h1 className="mt-3 text-4xl font-bold text-foreground">Track everything you have uploaded</h1>
            <p className="mt-4 text-muted-foreground">
              Review status, moderator notes, and public availability for your content.
            </p>
          </section>

          <section className="space-y-4">
            {uploads.map((upload) => (
              <article key={upload.id} className="rounded-[2rem] border border-border/70 bg-card/40 p-5">
                <div className="grid gap-5 md:grid-cols-[220px_1fr]">
                  <img
                    src={upload.thumbnailUrl}
                    alt={upload.title}
                    className="aspect-video w-full rounded-3xl border border-border/70 object-cover"
                  />
                  <div className="space-y-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h2 className="text-2xl font-semibold text-foreground">{upload.title}</h2>
                        <p className="mt-2 text-sm text-muted-foreground">{upload.description}</p>
                      </div>
                      <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${tone(upload.approval.status)}`}>
                        {upload.approval.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-2">
                        {upload.approval.status === "approved" ? (
                          <ShieldCheck className="h-4 w-4" />
                        ) : upload.approval.status === "rejected" ? (
                          <XCircle className="h-4 w-4" />
                        ) : (
                          <Clock3 className="h-4 w-4" />
                        )}
                        {upload.approval.status}
                      </span>
                      <span>Submitted {new Date(upload.submittedAt).toLocaleString()}</span>
                    </div>

                    {upload.approval.notes && (
                      <div className="rounded-2xl border border-border/70 bg-background/60 px-4 py-3 text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">Reviewer note:</span> {upload.approval.notes}
                      </div>
                    )}

                    {upload.approval.status === "approved" && (
                      <Link
                        href={`/video/${upload.slug}`}
                        className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
                      >
                        <Eye className="h-4 w-4" />
                        View live page
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            ))}

            {uploads.length === 0 && (
              <div className="rounded-[2rem] border border-dashed border-border/70 bg-card/30 px-6 py-16 text-center">
                <p className="text-lg font-semibold text-foreground">No uploads yet.</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your pending and approved submissions will appear here after the first upload.
                </p>
                <Link
                  href="/upload"
                  className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Upload your first video
                </Link>
              </div>
            )}
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
