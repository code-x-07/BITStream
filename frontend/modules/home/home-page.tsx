import Link from "next/link";
import { Film, Filter, ShieldCheck, UploadCloud } from "lucide-react";
import { Navbar } from "@/frontend/components/navbar";
import { MediaCard } from "@/frontend/components/media-card";
import { SiteFooter } from "@/frontend/components/site-footer";
import { CONTENT_CATEGORIES } from "@/backend/content/types";
import { getApprovedMedia, getLibraryCounts } from "@/backend/content/repository";

interface HomePageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function buildQueryString(search: string, category: string) {
  const params = new URLSearchParams();

  if (search) {
    params.set("q", search);
  }

  if (category && category !== "All") {
    params.set("category", category);
  }

  const query = params.toString();
  return query ? `/?${query}` : "/";
}

export async function HomePage({ searchParams }: HomePageProps) {
  const resolvedParams = (await searchParams) || {};
  const category = getSingleValue(resolvedParams.category) || "All";
  const query = getSingleValue(resolvedParams.q) || "";
  const media = await getApprovedMedia({ category, query });
  const counts = await getLibraryCounts();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-border/60 px-4 py-16 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(236,72,153,0.16),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
                <ShieldCheck className="h-4 w-4" />
                Only approved uploads go live
              </div>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Campus stories, movies, tutorials, and student-made media in one clean stream.
                </h1>
                <p className="max-w-2xl text-lg text-muted-foreground">
                  Students submit content, admins review it, and the approved uploads become discoverable through
                  category filters and search.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/upload"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <UploadCloud className="h-4 w-4" />
                  Submit a video
                </Link>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Admin review queue
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-3xl border border-border/70 bg-card/70 p-6">
                <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">Approved</p>
                <p className="mt-3 text-4xl font-bold text-foreground">{counts.approved}</p>
                <p className="mt-2 text-sm text-muted-foreground">Content already visible to the campus audience.</p>
              </div>
              <div className="rounded-3xl border border-border/70 bg-card/70 p-6">
                <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">Pending</p>
                <p className="mt-3 text-4xl font-bold text-foreground">{counts.pending}</p>
                <p className="mt-2 text-sm text-muted-foreground">Submissions waiting for an admin decision.</p>
              </div>
              <div className="rounded-3xl border border-border/70 bg-card/70 p-6">
                <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">Workflow</p>
                <p className="mt-3 text-lg font-semibold text-foreground">Student upload → admin approval → publish</p>
                <p className="mt-2 text-sm text-muted-foreground">Built to match the review flow you described.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border/60 bg-card/20 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-5">
            <form className="flex flex-col gap-3 md:flex-row">
              <div className="relative flex-1">
                <input
                  type="search"
                  name="q"
                  defaultValue={query}
                  placeholder="Search approved uploads, tags, or categories"
                  className="w-full rounded-2xl border border-border/70 bg-background/80 px-5 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Filter className="h-4 w-4" />
                Apply filters
              </button>
            </form>

            <div className="flex flex-wrap gap-3">
              {["All", ...CONTENT_CATEGORIES].map((chip) => {
                const active = chip === category;
                return (
                  <Link
                    key={chip}
                    href={buildQueryString(query, chip)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "border border-border/70 bg-background/70 text-muted-foreground hover:border-primary/50 hover:text-primary"
                    }`}
                  >
                    {chip}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">Discover</p>
                <h2 className="mt-2 text-3xl font-bold text-foreground">
                  {category === "All" ? "Latest approved uploads" : `${category} uploads`}
                </h2>
              </div>
              <div className="hidden items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-2 text-sm text-muted-foreground md:inline-flex">
                <Film className="h-4 w-4" />
                {media.length} result{media.length === 1 ? "" : "s"}
              </div>
            </div>

            {media.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {media.map((item) => (
                  <MediaCard key={item.id} media={item} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-border/70 bg-card/40 px-6 py-16 text-center">
                <p className="text-lg font-semibold text-foreground">No approved uploads match this filter yet.</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try another category or submit the first upload for this section.
                </p>
                <Link
                  href="/upload"
                  className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Submit an upload
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
