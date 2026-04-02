import { Navbar } from "@/frontend/components/navbar";
import { requireCampusUser } from "@/backend/auth/session";
import { supabase } from "@/backend/storage/supabase";

export default async function ProfilePage() {
  const user = await requireCampusUser("/profile");

  // Fetch the user's specific watch history from Supabase
  const { data: history, error } = await supabase
    .from("watch_history")
    .select("media_slug, duration_watched_seconds, watched_at")
    .eq("user_email", user.email)
    .order("watched_at", { ascending: false });

  // Group the raw pings into total watch time per video
  const aggregatedHistory = (history || []).reduce((acc: any, curr) => {
    if (!acc[curr.media_slug]) {
      acc[curr.media_slug] = { totalSeconds: 0, lastWatched: curr.watched_at };
    }
    acc[curr.media_slug].totalSeconds += curr.duration_watched_seconds;
    return acc;
  }, {});

  const watchList = Object.entries(aggregatedHistory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-4xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-border/70 bg-card/50 p-8">
          <h1 className="text-4xl font-bold text-foreground">Welcome back, {user.name}</h1>
          <p className="mt-2 text-muted-foreground">{user.email}</p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Your Watch History</h2>
          {watchList.length === 0 ? (
            <p className="text-muted-foreground">You haven't watched any videos yet!</p>
          ) : (
            <div className="grid gap-4">
              {watchList.map(([slug, data]: any) => (
                <div key={slug} className="flex items-center justify-between rounded-2xl border border-border/50 bg-card/30 p-4">
                  <span className="font-medium">{slug.replace(/-/g, " ")}</span>
                  <span className="text-sm text-muted-foreground">
                    Watched {Math.floor(data.totalSeconds / 60)}m {data.totalSeconds % 60}s
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
