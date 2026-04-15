import type { AppSessionUser } from "@/backend/auth/session";
import { getSupabaseClient } from "@/backend/storage/supabase";
import type { CreateSnapInput, SnapComment, SnapFeedResult, SnapItem } from "@/backend/snap/types";

type SnapPostRow = {
  caption: string;
  created_at: string;
  expires_at: string;
  id: string;
  image_url: string;
  user_avatar: string | null;
  user_email: string;
  user_name: string;
};

type SnapLikeRow = {
  snap_id: string;
  user_email: string;
};

type SnapCommentRow = {
  comment: string;
  created_at: string;
  id: string;
  snap_id: string;
  user_avatar: string | null;
  user_email: string;
  user_name: string;
};

const EMPTY_FEED: SnapFeedResult = {
  enabled: false,
  items: [],
};

function formatSnapSetupReason(message: string) {
  const normalized = message.toLowerCase();

  if (
    normalized.includes("snap_posts") ||
    normalized.includes("snap_likes") ||
    normalized.includes("snap_comments") ||
    normalized.includes("schema cache") ||
    normalized.includes("does not exist")
  ) {
    return "Supabase is connected, but the Snap tables are missing. Run database/supabase/snap-schema.sql in the Supabase SQL editor, then redeploy.";
  }

  if (
    normalized.includes("fetch failed") ||
    normalized.includes("network") ||
    normalized.includes("econnrefused") ||
    normalized.includes("enotfound") ||
    normalized.includes("etimedout")
  ) {
    return "Snap is temporarily unable to reach Supabase. Try again in a moment.";
  }

  return message;
}

function formatExpiresInLabel(expiresAt: string) {
  const remainingMs = new Date(expiresAt).getTime() - Date.now();

  if (remainingMs <= 0) {
    return "Expired";
  }

  const totalMinutes = Math.ceil(remainingMs / (1000 * 60));

  if (totalMinutes < 60) {
    return `${totalMinutes}m left`;
  }

  const totalHours = Math.ceil(totalMinutes / 60);

  if (totalHours < 24) {
    return `${totalHours}h left`;
  }

  return `${Math.ceil(totalHours / 24)}d left`;
}

function buildSnapComments(rows: SnapCommentRow[]) {
  return rows.map(
    (row): SnapComment => ({
      comment: row.comment,
      createdAt: row.created_at,
      id: row.id,
      userAvatar: row.user_avatar,
      userEmail: row.user_email,
      userName: row.user_name,
    }),
  );
}

function buildSnapItems(params: {
  comments: SnapCommentRow[];
  likes: SnapLikeRow[];
  posts: SnapPostRow[];
  viewerEmail?: string;
}) {
  const commentsBySnap = new Map<string, SnapCommentRow[]>();

  for (const comment of params.comments) {
    const current = commentsBySnap.get(comment.snap_id) || [];
    current.push(comment);
    commentsBySnap.set(comment.snap_id, current);
  }

  const likesBySnap = new Map<string, Set<string>>();

  for (const like of params.likes) {
    const current = likesBySnap.get(like.snap_id) || new Set<string>();
    current.add(like.user_email);
    likesBySnap.set(like.snap_id, current);
  }

  return params.posts.map(
    (post): SnapItem => ({
      caption: post.caption,
      comments: buildSnapComments(commentsBySnap.get(post.id) || []),
      commentsCount: (commentsBySnap.get(post.id) || []).length,
      createdAt: post.created_at,
      expiresAt: post.expires_at,
      expiresInLabel: formatExpiresInLabel(post.expires_at),
      id: post.id,
      imageUrl: post.image_url,
      likesCount: (likesBySnap.get(post.id) || new Set<string>()).size,
      userAvatar: post.user_avatar,
      userEmail: post.user_email,
      userName: post.user_name,
      viewerHasLiked: params.viewerEmail ? (likesBySnap.get(post.id) || new Set<string>()).has(params.viewerEmail) : false,
    }),
  );
}

async function getSnapInteractions(snapIds: string[]) {
  const supabase = getSupabaseClient();

  if (!supabase || snapIds.length === 0) {
    return {
      comments: [] as SnapCommentRow[],
      likes: [] as SnapLikeRow[],
    };
  }

  const [{ data: likes, error: likesError }, { data: comments, error: commentsError }] = await Promise.all([
    supabase.from("snap_likes").select("snap_id,user_email").in("snap_id", snapIds),
    supabase
      .from("snap_comments")
      .select("id,snap_id,user_email,user_name,user_avatar,comment,created_at")
      .in("snap_id", snapIds)
      .order("created_at", { ascending: true }),
  ]);

  if (likesError) {
    throw new Error(likesError.message);
  }

  if (commentsError) {
    throw new Error(commentsError.message);
  }

  return {
    comments: (comments || []) as SnapCommentRow[],
    likes: (likes || []) as SnapLikeRow[],
  };
}

async function assertSnapIsActive(snapId: string) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    throw new Error("Supabase is not configured for Snap.");
  }

  const { data, error } = await supabase
    .from("snap_posts")
    .select("id")
    .eq("id", snapId)
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("This snap has expired or is unavailable.");
  }
}

export async function listActiveSnaps(viewerEmail?: string): Promise<SnapFeedResult> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return {
      ...EMPTY_FEED,
      reason: "Add Supabase env vars to enable Snap stories.",
    };
  }

  try {
    const { data: posts, error } = await supabase
      .from("snap_posts")
      .select("id,user_email,user_name,user_avatar,image_url,caption,created_at,expires_at")
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(40);

    if (error) {
      throw new Error(error.message);
    }

    const normalizedPosts = (posts || []) as SnapPostRow[];

    if (normalizedPosts.length === 0) {
      return {
        enabled: true,
        items: [],
      };
    }

    const interactions = await getSnapInteractions(normalizedPosts.map((post) => post.id));

    return {
      enabled: true,
      items: buildSnapItems({
        comments: interactions.comments,
        likes: interactions.likes,
        posts: normalizedPosts,
        viewerEmail,
      }),
    };
  } catch (error) {
    return {
      ...EMPTY_FEED,
      reason: error instanceof Error ? formatSnapSetupReason(error.message) : "Snap is not ready yet.",
    };
  }
}

export async function getSnapByIdForViewer(snapId: string, viewerEmail?: string) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("snap_posts")
    .select("id,user_email,user_name,user_avatar,image_url,caption,created_at,expires_at")
    .eq("id", snapId)
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return null;
  }

  const interactions = await getSnapInteractions([snapId]);

  return buildSnapItems({
    comments: interactions.comments,
    likes: interactions.likes,
    posts: [data as SnapPostRow],
    viewerEmail,
  })[0] || null;
}

export async function createSnap(user: AppSessionUser, input: CreateSnapInput) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    throw new Error("Supabase is not configured for Snap.");
  }

  const caption = input.caption.trim().slice(0, 220);
  const imageUrl = input.imageUrl.trim();

  if (!imageUrl) {
    throw new Error("Upload an image or paste a hosted image URL.");
  }

  const createdAt = new Date();
  const expiresAt = new Date(createdAt.getTime() + 24 * 60 * 60 * 1000);

  const { data, error } = await supabase
    .from("snap_posts")
    .insert({
      caption,
      created_at: createdAt.toISOString(),
      expires_at: expiresAt.toISOString(),
      image_url: imageUrl,
      user_avatar: user.image || null,
      user_email: user.email,
      user_name: user.name,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return getSnapByIdForViewer(data.id, user.email);
}

export async function toggleSnapLike(user: AppSessionUser, snapId: string) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    throw new Error("Supabase is not configured for Snap.");
  }

  await assertSnapIsActive(snapId);

  const { data: existingLike, error: existingLikeError } = await supabase
    .from("snap_likes")
    .select("snap_id,user_email")
    .eq("snap_id", snapId)
    .eq("user_email", user.email)
    .maybeSingle();

  if (existingLikeError) {
    throw new Error(existingLikeError.message);
  }

  if (existingLike) {
    const { error } = await supabase.from("snap_likes").delete().eq("snap_id", snapId).eq("user_email", user.email);

    if (error) {
      throw new Error(error.message);
    }
  } else {
    const { error } = await supabase.from("snap_likes").insert({
      snap_id: snapId,
      user_email: user.email,
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  return getSnapByIdForViewer(snapId, user.email);
}

export async function addSnapComment(user: AppSessionUser, snapId: string, comment: string) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    throw new Error("Supabase is not configured for Snap.");
  }

  await assertSnapIsActive(snapId);

  const normalizedComment = comment.trim();

  if (!normalizedComment) {
    throw new Error("Write a comment before posting.");
  }

  const { error } = await supabase.from("snap_comments").insert({
    comment: normalizedComment.slice(0, 280),
    snap_id: snapId,
    user_avatar: user.image || null,
    user_email: user.email,
    user_name: user.name,
  });

  if (error) {
    throw new Error(error.message);
  }

  return getSnapByIdForViewer(snapId, user.email);
}
