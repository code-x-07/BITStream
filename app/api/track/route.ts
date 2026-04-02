import { NextResponse } from "next/server";
import { getCurrentUser } from "@/backend/auth/session";
import { supabase } from "@/backend/storage/supabase";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body || !body.mediaSlug || !body.durationSeconds) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { error } = await supabase.from('watch_history').insert({
    user_email: user.email,
    media_slug: body.mediaSlug,
    duration_watched_seconds: body.durationSeconds
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
