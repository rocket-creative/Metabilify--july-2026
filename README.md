# Metablify Website

Light mode marketing site for Metablify: an LC/MS platform built on the first principles of physics.

## Stack

- Next.js App Router (TypeScript)
- Tailwind CSS
- Vercel
- Supabase (`project_inquiries`)
- Resend (inquiry email)
- GitHub

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.example` to `.env.local` and fill:

- `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY` / `RESEND_FROM_EMAIL` / `NOTIFY_EMAIL`

Run `supabase/schema.sql` in the Supabase SQL editor before accepting form traffic.

Without Supabase/Resend configured, the discuss API validates input and logs a warning (useful for local UI work).

## Branches

- `METABLIFY_MAIN` — production
- `METABLIFY_DEV` — development

## Design

Light mode only. Botanical palette: evergreen, blueberry, ripened strawberry. Magazine layout over stone frame. Copy sourced from the client PowerPoint; client owns final text.
