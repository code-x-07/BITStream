import Link from "next/link";
import { Film, Filter, PlayCircle, Sparkles, UploadCloud } from "lucide-react";
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

function shelfTitle(category: string) {
  return category === "All" ? "Recently approved" : category;
}

export async function HomePage({ searchParams }: HomePageProps) {
  const resolvedParams = (await searchParams) || {};
  const category = getSingleValue(resolvedParams.category) || "All";
  const query = getSingleValue(resolvedParams.q) || "";
  const media = await getApprovedMedia({ category, query });
  const counts = await getLibraryCounts();
  const heroCards = media.slice(0, 3);
  const featured = media.slice(0, 8);
  const categoryShelves =
    category === "All"
      ? CONTENT_CATEGORIES.map((chip) => ({
          name: chip,
          items: media.filter((item) => item.category === chip).slice(0, 6),
        })).filter((section) => section.items.length > 0)
      : [{ name: category, items: media.slice(0, 12) }];

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

        <section className="relative min-h-[88vh] overflow-hidden border-b border-white/10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(4,10,18,0.92) 0%, rgba(4,10,18,0.74) 42%, rgba(4,10,18,0.38) 70%, rgba(4,10,18,0.62) 100%), url('/homepage-assets/campus-goa.jpeg')",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,211,161,0.14),transparent_24%),linear-gradient(180deg,rgba(5,11,20,0.05),rgba(5,11,20,0.88))]" />

          <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-4 pb-16 pt-16 sm:px-6 lg:px-8 lg:pb-24">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.35em] text-[#f0d6a8] backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Goa campus archive
              </div>

              <div className="space-y-4">
                <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                  Campus Stories
                </h1>
                <p className="max-w-2xl text-base leading-7 text-[#d9e3f0] sm:text-lg">
                  Movies, late-night edits, hostel memories, tutorials, festival cuts, and campus moments collected in
                  one stream.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="#discover"
                  className="inline-flex items-center gap-2 rounded-full bg-[#f0d6a8] px-6 py-3 text-sm font-semibold text-[#111827] transition-colors hover:bg-[#f7dfb7]"
                >
                  <PlayCircle className="h-4 w-4" />
                  Start watching
                </Link>
                <Link
                  href="/upload"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/12"
                >
                  <UploadCloud className="h-4 w-4" />
                  Upload a story
                </Link>
              </div>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/22 p-5 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.28em] text-[#d8bc88]">Approved</p>
                <p className="mt-3 text-4xl font-bold text-white">{counts.approved}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-black/22 p-5 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.28em] text-[#d8bc88]">Pending</p>
                <p className="mt-3 text-4xl font-bold text-white">{counts.pending}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-black/22 p-5 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.28em] text-[#d8bc88]">Mood</p>
                <p className="mt-3 text-lg font-semibold text-white">A campus feed with more cinema and less clutter.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative border-b border-white/10 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <form className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <input
                  type="search"
                  name="q"
                  defaultValue={query}
                  placeholder="Search titles, tags, categories"
                  className="w-full rounded-full border border-white/10 bg-white/6 px-5 py-3 text-sm text-white outline-none transition-colors placeholder:text-[#94a6bd] focus:border-[#f0d6a8]"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-[#f0d6a8]/50 hover:text-[#f0d6a8]"
              >
                <Filter className="h-4 w-4" />
                Filter
              </button>
            </form>

            <div className="mt-4 flex flex-wrap gap-3">
              {["All", ...CONTENT_CATEGORIES].map((chip) => {
                const active = chip === category;
                return (
                  <Link
                    key={chip}
                    href={buildQueryString(query, chip)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "bg-[#f0d6a8] text-[#111827]"
                        : "border border-white/10 bg-white/6 text-[#d7e1ef] hover:border-[#f0d6a8]/50 hover:text-[#f0d6a8]"
                    }`}
                  >
                    {chip}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section id="discover" className="relative px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {heroCards.length > 0 && (
              <div className="mb-14">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-[#d8bc88]">Featured tonight</p>
                    <h2 className="mt-2 text-3xl font-semibold text-white">Fresh from the archive</h2>
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
                  <Link
                    href={`/video/${heroCards[0].slug}`}
                    className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d1624] shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
                  >
                    <img
                      src={heroCards[0].thumbnailUrl}
                      alt={heroCards[0].title}
                      className="h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-8">
                      <span className="inline-flex rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-semibold text-white">
                        {heroCards[0].category}
                      </span>
                      <h3 className="mt-4 max-w-xl text-4xl font-semibold text-white">{heroCards[0].title}</h3>
                      <p className="mt-3 max-w-xl text-sm leading-7 text-[#dce5f2]">{heroCards[0].description}</p>
                    </div>
                  </Link>

                  <div className="grid gap-6">
                    {heroCards.slice(1).map((item) => (
                      <Link
                        key={item.id}
                        href={`/video/${item.slug}`}
                        className="group grid gap-4 rounded-[2rem] border border-white/10 bg-[#0d1624]/92 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.18)] sm:grid-cols-[200px_1fr]"
                      >
                        <img
                          src={item.thumbnailUrl}
                          alt={item.title}
                          className="h-44 w-full rounded-[1.5rem] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        <div className="space-y-3 self-center">
                          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                            {item.category}
                          </span>
                          <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                          <p className="text-sm leading-7 text-[#b8c7db]">{item.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {featured.length > 0 && (
              <div className="mb-14">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-[#d8bc88]">Row one</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">{shelfTitle(category)}</h2>
                  </div>
                  <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#b6c4d8] md:inline-flex">
                    <Film className="h-4 w-4" />
                    {featured.length} titles
                  </div>
                </div>

                <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory">
                  {featured.map((item) => (
                    <div key={item.id} className="min-w-[290px] max-w-[290px] snap-start">
                      <MediaCard media={item} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-14">
              {categoryShelves.map((section) => (
                <section key={section.name}>
                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-[0.28em] text-[#d8bc88]">Category shelf</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">{section.name}</h2>
                  </div>

                  <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory">
                    {section.items.map((item) => (
                      <div key={item.id} className="min-w-[290px] max-w-[290px] snap-start">
                        <MediaCard media={item} />
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {media.length === 0 && (
              <div className="rounded-[2rem] border border-dashed border-white/12 bg-white/4 px-6 py-16 text-center">
                <p className="text-lg font-semibold text-white">No approved uploads match this filter yet.</p>
                <p className="mt-2 text-sm text-[#aebdd1]">Try another category or upload the first story for it.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
