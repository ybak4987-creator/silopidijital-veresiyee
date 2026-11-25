# 0.3.3 — Vercel API routing fix

- Replaced the single dynamic `/api/veresiye/[function]` endpoint with three explicit static Vercel routes: health, customer login, and admin.
- Moved shared proxy logic outside the `api/` route tree so route discovery cannot confuse the reusable handler with a public endpoint.
- Narrowed the SPA rewrite to `/admin` only. API requests can no longer be rewritten to `index.html`, which previously produced a misleading HTTP 200 HTML response.
- Kept the existing Supabase project, publishable key, Edge Functions, customer data, session validation, and rate limiting unchanged.
- PWA cache continues to bypass every `/api/` URL.
