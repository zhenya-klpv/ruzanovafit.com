# Ruzanova Fitness — Experience Site

Premium marketing site for **Ruzanova Fitness**: personal training and nutrition coaching.

- **Design:** Editorial luxury direction (Vogue x Margiela mood), with restrained typography and boutique conversion-first layout.
- **Frontend:** Next.js 14 (App Router), Tailwind CSS, TypeScript.
- **Platform stack target:** FastAPI + PostgreSQL + Supabase Auth, deployed via Docker on VPS or Vercel edge/frontend split.
- **Run:** `npm install` then `npm run dev` (dev) or `npm run build` (static export to `out/`).

## Scripts

- `npm run dev` — development server
- `npm run build` — static export to `out/`
- `npm run start` — serve production build (after `build`)
- `npm run lint` — ESLint

## Live Yelp Reviews (append mode)

The testimonials section can load real Yelp text reviews and append them to curated local testimonials.

1. Configure env values (see `.env.example`):
   - `NEXT_PUBLIC_REVIEWS_API_URL=http://localhost:8000/api/yelp-reviews`
   - In production, point to deployed backend URL (not localhost)
   - `YELP_API_KEY=...`
2. Run backend:
   - `python3 -m venv .venv && source .venv/bin/activate`
   - `pip install -r backend/requirements.txt`
   - `uvicorn backend.main:app --reload --port 8000`
3. Run frontend (`npm run dev`) and reviews will append automatically.

### Netlify alternative (no separate FastAPI required)

This repo includes `netlify/functions/yelp-reviews.js` and `netlify.toml`.

- Set `YELP_API_KEY` in Netlify environment variables.
- Set frontend env `NEXT_PUBLIC_REVIEWS_API_URL=/api/yelp-reviews`.
- Deploy to Netlify; `/api/yelp-reviews` will proxy Yelp via serverless function.

## Booking form email delivery (EmailJS)

The package modal form in `CTABlock` sends request details to coach email via EmailJS.

1. Create EmailJS service/template and map fields:
   - `from_name`, `from_email`, `phone`, `package_name`
   - `coaching_format`, `program_name`, `goal`, `notes`, `message`
2. Add frontend env values:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID=...`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...`
3. Restart frontend and submit the modal form from a selected package.
4. Security note: do not hardcode EmailJS IDs in source code; configure only via environment variables.

## Security headers with static export

This project uses `output: export`, so HTTP security headers must be configured on the hosting layer (Vercel, Nginx, Cloudflare, etc.), not in Next.js route headers.

## Structure

- `app/` — layout, globals, page
- `components/` — Hero, Philosophy, ProblemSolution, InputTypes, UseCases, Security, TrustAnchors, CTABlock, Header, Footer, Section
- `backend/` — FastAPI endpoints (including Yelp reviews proxy)

Main content and copy are adapted from the previous `ruzanovafit.com` version.
