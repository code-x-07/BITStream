# BITStream

BITStream is now structured around a clearer split:

- `frontend/`
  UI modules and reusable presentation components
- `backend/`
  auth, moderation, content storage, and server-side actions
- `database/`
  the file-backed development store plus SQL schema reference
- `app/`
  thin Next.js routes that wire the frontend and backend layers together

## Features

- Google OAuth login
- Domain restriction to `@goa.bits-pilani.ac.in`
- Student upload submissions
- Admin approval and rejection queue
- Public discovery page that only shows approved uploads
- My uploads page for submitters

## Getting started

1. Copy `.env.example` into your local environment.
2. Add Google OAuth credentials and at least one admin email.
3. Add Cloudinary credentials if you want live file uploads on Vercel.
4. Install dependencies.
5. Run the app.

```bash
npm install
npm run dev
```

## Storage

Local development content is stored in:

- `database/content-library.json`
- `public/uploads/videos`
- `public/uploads/thumbnails`

Production file uploads can use Cloudinary by setting:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Without those vars, the live site falls back to hosted URLs for submitted media.

## Team Split

Team ownership and folder-level contribution mapping are documented in:

- `TEAM_SPLIT.md`
