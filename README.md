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
3. Install dependencies.
4. Run the app.

```bash
npm install
npm run dev
```

## Local storage

Development content is stored in:

- `database/content-library.json`
- `public/uploads/videos`
- `public/uploads/thumbnails`

For production, the included schema in `database/schema.sql` is the intended next step toward a real database and durable object storage.
