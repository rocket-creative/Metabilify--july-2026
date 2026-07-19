# Deploy on Vercel

1. Push this repo to GitHub.
2. Import the project in Vercel (Framework Preset: Next.js).
3. Set environment variables from `.env.example`:
   - `NEXT_PUBLIC_SITE_URL`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `NOTIFY_EMAIL`
4. Run `supabase/schema.sql` in the Supabase SQL editor.
5. Production branch: `METABLIFY_MAIN` (rename `main` after first push if needed).
6. Preview / development branch: `METABLIFY_DEV`.

```bash
git branch -m main METABLIFY_MAIN
git checkout -b METABLIFY_DEV
git push -u origin METABLIFY_MAIN
git push -u origin METABLIFY_DEV
```

In Vercel Project Settings → Git, set Production Branch to `METABLIFY_MAIN`.
