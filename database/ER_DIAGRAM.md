# BITStream ER Diagram

This document captures the current relational structure defined in:

- `/database/schema.sql`
- `/database/supabase/analytics-schema.sql`
- `/database/supabase/snap-schema.sql`

It covers:

- Core BITStream media/moderation tables
- Supabase analytics tables and views
- Supabase Snap feature tables

## Detailed ER Diagram

```mermaid
erDiagram
    USERS {
        UUID id PK
        TEXT email UK
        TEXT name
        TEXT image_url
        TEXT role
        TIMESTAMPTZ created_at
    }

    MEDIA_ITEMS {
        UUID id PK
        TEXT slug UK
        TEXT title
        TEXT description
        TEXT category
        TEXT duration_label
        TEXT video_url
        TEXT thumbnail_url
        TEXT approval_status
        TEXT review_notes
        TIMESTAMPTZ reviewed_at
        TEXT reviewed_by_email
        TEXT uploader_email FK
        TIMESTAMPTZ submitted_at
        TIMESTAMPTZ updated_at
    }

    MEDIA_TAGS {
        UUID media_id PK, FK
        TEXT tag PK
    }

    USER_PROFILES {
        TEXT user_email PK
        TEXT display_name
        TEXT avatar_url
        TEXT role
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
        TIMESTAMPTZ last_seen_at
    }

    MEDIA_WATCH_EVENTS {
        BIGINT id PK
        UUID session_id
        TEXT user_email FK
        TEXT media_id
        TEXT media_slug
        TEXT media_title
        TEXT media_category
        TEXT video_url
        TEXT event_type
        INTEGER watch_seconds
        NUMERIC progress_percent
        INTEGER duration_seconds
        INTEGER current_time_seconds
        JSONB metadata
        TIMESTAMPTZ occurred_at
    }

    SNAP_POSTS {
        UUID id PK
        TEXT user_email
        TEXT user_name
        TEXT user_avatar
        TEXT image_url
        TEXT caption
        TIMESTAMPTZ created_at
        TIMESTAMPTZ expires_at
    }

    SNAP_LIKES {
        BIGINT id PK
        UUID snap_id FK
        TEXT user_email
        TIMESTAMPTZ created_at
    }

    SNAP_COMMENTS {
        UUID id PK
        UUID snap_id FK
        TEXT user_email
        TEXT user_name
        TEXT user_avatar
        TEXT comment
        TIMESTAMPTZ created_at
    }

    ANALYTICS_CONTENT_POPULARITY {
        TEXT media_slug
        TEXT media_title
        TEXT media_category
        BIGINT unique_viewers
        BIGINT total_watch_seconds
        TIMESTAMPTZ last_engaged_at
    }

    ANALYTICS_USER_WATCH_SUMMARY {
        TEXT user_email
        BIGINT titles_watched
        BIGINT sessions_count
        BIGINT total_watch_seconds
        TIMESTAMPTZ last_active_at
    }

    USERS ||--o{ MEDIA_ITEMS : "uploads via uploader_email"
    MEDIA_ITEMS ||--o{ MEDIA_TAGS : "has tags"

    USER_PROFILES ||--o{ MEDIA_WATCH_EVENTS : "creates watch events"

    SNAP_POSTS ||--o{ SNAP_LIKES : "receives likes"
    SNAP_POSTS ||--o{ SNAP_COMMENTS : "receives comments"

    MEDIA_WATCH_EVENTS }o..|| ANALYTICS_CONTENT_POPULARITY : "aggregated into view"
    MEDIA_WATCH_EVENTS }o..|| ANALYTICS_USER_WATCH_SUMMARY : "aggregated into view"
```

## Relationship Notes

### 1. Core BITStream content model

- `users.email -> media_items.uploader_email`
  Each media item is uploaded by exactly one application user.
- `media_items.id -> media_tags.media_id`
  Each media item can have many tags.

### 2. Analytics model

- `user_profiles.user_email -> media_watch_events.user_email`
  Each watch event belongs to one tracked user profile.
- `analytics_content_popularity`
  This is a view derived from `media_watch_events`, grouped by `media_slug`.
- `analytics_user_watch_summary`
  This is a view derived from `media_watch_events`, grouped by `user_email`.

### 3. Snap model

- `snap_posts.id -> snap_likes.snap_id`
  One snap can have many likes.
- `snap_posts.id -> snap_comments.snap_id`
  One snap can have many comments.

## Important Design Detail

Some relations are **logical** rather than enforced by a database foreign key:

- `media_watch_events.media_slug` refers to app content identified in the content library / media repository, but it is stored as text rather than as a strict FK to `media_items.slug`.
- `snap_posts.user_email`, `snap_likes.user_email`, and `snap_comments.user_email` are stored as text and represent BITS users, but they are not currently enforced as foreign keys to `user_profiles` or `users`.

This means the schema mixes:

- **strict relational links** where cascading or consistency matters most
- **application-level links** where the app controls consistency through code

## Table Groups

### Core app schema

- `users`
- `media_items`
- `media_tags`

### Supabase analytics schema

- `user_profiles`
- `media_watch_events`
- `analytics_content_popularity` (view)
- `analytics_user_watch_summary` (view)

### Supabase Snap schema

- `snap_posts`
- `snap_likes`
- `snap_comments`
