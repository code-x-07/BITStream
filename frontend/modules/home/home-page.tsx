import Link from "next/link";
import { ArrowDownRight, Film, Filter, MapPin, PlayCircle, Sparkles, UploadCloud } from "lucide-react";
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
  const featuredMedia = media.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-border/60 px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24">
          <div className="pointer-events-none absolute inset-0 opacity-20 mix-blend-screen">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/homepage-assets/film-texture.jpg')" }}
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,214,153,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.22),transparent_24%),linear-gradient(180deg,rgba(7,17,31,0.14),rgba(7,17,31,0.94))]" />

          <div className="relative mx-auto grid max-w-7xl items-end gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-8 pt-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.35em] text-[#f4d3a1]">
                <Sparkles className="h-3.5 w-3.5" />
                BITS Goa archive
              </div>

              <div className="space-y-4">
                <h1 className="max-w-2xl font-serif text-5xl tracking-[0.02em] text-white sm:text-6xl lg:text-7xl">
                  Campus Stories
                </h1>
                <p className="max-w-xl text-base leading-7 text-[#d3dded] sm:text-lg">
                  Faded frames, hostel moments, fest nights, movie edits, and student-made reels from around BITS Goa.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="#discover"
                  className="inline-flex items-center gap-2 rounded-full bg-[#f4d3a1] px-6 py-3 text-sm font-semibold text-[#101a2e] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <PlayCircle className="h-4 w-4" />
                  Explore stories
                </Link>
                <Link
                  href="/upload"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <UploadCloud className="h-4 w-4" />
                  Submit yours
                </Link>
              </div>

              <div className="grid max-w-xl gap-4 sm:grid-cols-2">
                <div className="rounded-[1.75rem] border border-white/10 bg-black/25 p-5 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.28em] text-[#d6b986]">Approved</p>
                  <p className="mt-3 text-4xl font-bold text-white">{counts.approved}</p>
                  <p className="mt-2 text-sm text-[#b8c6da]">Stories already playing live on the archive.</p>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-black/25 p-5 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.28em] text-[#d6b986]">Pending</p>
                  <p className="mt-3 text-4xl font-bold text-white">{counts.pending}</p>
                  <p className="mt-2 text-sm text-[#b8c6da]">Fresh uploads waiting to be reviewed.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute -left-8 top-12 hidden h-32 w-32 rounded-full border border-white/10 bg-white/5 blur-2xl lg:block" />
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/12 bg-[#0d1728] p-3 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_30%),linear-gradient(180deg,rgba(7,17,31,0),rgba(7,17,31,0.18))]" />
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-screen"
                  style={{ backgroundImage: "url('/homepage-assets/film-texture.jpg')" }}
                />
                <div className="relative overflow-hidden rounded-[2rem]">
                  <img
                    src="/homepage-assets/campus-goa.jpeg"
                    alt="BITS Goa campus"
                    className="h-[420px] w-full object-cover object-center opacity-78 saturate-90 lg:h-[560px]"
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_42%,rgba(7,17,31,0.55)_100%)]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-transparent to-[rgba(7,17,31,0.18)]" />
                  <div className="absolute bottom-6 left-6 right-6 rounded-[1.75rem] border border-white/12 bg-black/28 p-5 backdrop-blur-md">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-[#e6caa2]">
                      <MapPin className="h-3.5 w-3.5" />
                      BITS Pilani, Goa Campus
                    </div>
                    <p className="mt-3 max-w-md text-2xl font-semibold text-white">
                      A softer frame, a stronger landing page.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-b border-border/60 px-4 py-14 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.01),rgba(255,255,255,0.03),rgba(255,255,255,0.01))]" />
          <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-xs uppercase tracking-[0.35em] text-[#d6b986]">Reel fragments</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Scroll through the campus moodboard.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-[#aebed4]">
                Less dashboard, more archive. The feed below stays discoverable, but the landing page now opens with a
                stronger cinematic feel.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {featuredMedia.map((item, index) => (
                <Link
                  key={item.id}
                  href={`/video/${item.slug}`}
                  className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-card/60 p-5 transition-transform duration-500 hover:-translate-y-1 ${
                    index === 0 ? "md:col-span-2" : ""
                  } ${index === 1 ? "md:translate-y-10" : ""} ${index === 2 ? "md:-translate-y-6" : ""}`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-screen"
                    style={{ backgroundImage: "url('/homepage-assets/film-texture.jpg')" }}
                  />
                  <div className={`relative grid gap-5 ${index === 0 ? "lg:grid-cols-[1.1fr_0.9fr]" : ""}`}>
                    <div className="space-y-3">
                      <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {item.category}
                      </span>
                      <h3 className="text-2xl font-semibold text-white transition-colors group-hover:text-[#f4d3a1]">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-7 text-[#b5c4d8]">{item.description}</p>
                      <span className="inline-flex items-center gap-2 text-sm text-[#f4d3a1]">
                        Watch now
                        <ArrowDownRight className="h-4 w-4" />
                      </span>
                    </div>
                    <div className="overflow-hidden rounded-[1.5rem] border border-white/8">
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                          index === 0 ? "h-64" : "h-52"
                        }`}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="sticky top-[72px] z-30 border-b border-border/60 bg-[rgba(7,17,31,0.82)] px-4 py-6 backdrop-blur-xl sm:px-6 lg:px-8">
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
                        ? "bg-[#f4d3a1] text-[#101a2e]"
                        : "border border-white/10 bg-white/5 text-[#d7e1ef] hover:border-[#f4d3a1]/50 hover:text-[#f4d3a1]"
                    }`}
                  >
                    {chip}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section id="discover" className="relative px-4 py-16 sm:px-6 lg:px-8">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-[0.05] mix-blend-screen"
            style={{ backgroundImage: "url('/homepage-assets/film-texture.jpg')" }}
          />
          <div className="relative mx-auto max-w-7xl">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-[#d6b986]">Discover</p>
                <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                  {category === "All" ? "Latest approved uploads" : `${category} uploads`}
                </h2>
              </div>
              <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#b6c4d8] md:inline-flex">
                <Film className="h-4 w-4" />
                {media.length} result{media.length === 1 ? "" : "s"}
              </div>
            </div>

            {media.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-12">
                {media.map((item, index) => (
                  <div
                    key={item.id}
                    className={index === 0 ? "xl:col-span-7" : index === 1 ? "xl:col-span-5" : "xl:col-span-4"}
                  >
                    <MediaCard media={item} />
                  </div>
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
