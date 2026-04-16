# BITStream Team Split

This project is split across six contributors. 
## Ownership Summary

| Member | Role | Primary Folders To Read | Contribution Scope |
| --- | --- | --- | --- |
| Hemant Kushwaha | SQL Development Lead | `database/`, `database/supabase/`, `backend/analytics/`, `backend/storage/supabase.ts`, `app/api/track/`, `app/profile/` | The core SQL layer, analytics integration, views, procedures/triggers strategy, and any unassigned cross-layer work. |
| Kanav Midha | SQL, Analytics & Chatbot | `database/supabase/analytics-queries.sql`, `backend/analytics/service.ts`, `frontend/modules/profile/`, `app/api/chat/`, `frontend/components/chat-widget.tsx` | Owns analytical queries for view counts, watch duration, user engagement, content popularity, metrics validation, and chatbot integration including the BITStream assistant UI, prompt grounding, and media recommendation flow. |
| Abhisht Shankar | Backend Developer | `backend/content/`, `backend/storage/`, `app/api/`, `backend/analytics/client.ts` | Owns Node.js/server setup, API routes, media moderation flow, and database connectivity from backend to UI. |
| Akshank Bhadauria | Database Architect | `database/schema.sql`, `database/supabase/analytics-schema.sql`, `SCHEMA.md` | Owns ER design, DDL, table/index creation, relationships, and schema documentation. |
| Gauravi Srinivas | UI/UX Designer | `frontend/components/`, `frontend/modules/`, `app/globals.css`, `public/` | Owns interface design, navigation flow, responsive polish, and frontend integration of backend states. |
| Ziyan Sayyad | Auth & Testing | `auth.ts`, `backend/auth/`, `app/api/auth/`, `backend/content/actions.ts`, `app/api/track/` | Owns Google OAuth, validation, route protection, security checks, and testing against injection/bad input. |

## Folder Reading Guide

### Hemant Kushwaha
- Read first: `database/supabase/`, `backend/analytics/`, `backend/storage/supabase.ts`
- Read next: `app/api/track/`, `app/profile/`, `database/schema.sql`
- Why: This is the heaviest ownership area because it spans SQL, data modeling, analytics pipelines, and profile integration.

### Kanav Midha
- Read first: `database/supabase/analytics-queries.sql`, `app/api/chat/route.ts`
- Read next: `backend/analytics/service.ts`, `frontend/modules/profile/profile-charts.tsx`, `frontend/components/chat-widget.tsx`
- Why: This area covers analytics logic, profile insights, and the chatbot recommendation flow built on top of the BITStream media library.

### Abhisht Shankar
- Read first: `backend/content/`, `backend/storage/`
- Read next: `app/api/uploads/`, `app/api/track/`
- Why: These are the server-side integration points between uploads, moderation, tracking, and storage.

### Akshank Bhadauria
- Read first: `database/schema.sql`, `database/supabase/analytics-schema.sql`
- Read next: `SCHEMA.md`, `database/supabase/SETUP.md`
- Why: These files define tables, relationships, indexes, and the analytics schema rollout.

### Gauravi Srinivas
- Read first: `frontend/modules/home/`, `frontend/modules/profile/`, `frontend/modules/upload/`
- Read next: `frontend/components/`, `app/globals.css`, `public/`
- Why: These areas define the visual language, the navigation flow, and all user-facing interactions.

### Ziyan Sayyad
- Read first: `auth.ts`, `backend/auth/`
- Read next: `app/api/auth/`, `backend/content/actions.ts`, `app/api/track/`
- Why: These files control authentication, authorization, validation, and attack-surface testing.


