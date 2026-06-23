# Advocate Tejveer Singh Kharoud — Website

A 5-page static site (HTML/CSS/JS, no build step, no framework) for
Advocate Tejveer Singh Kharoud, Patiala — civil litigation, industrial
dispute resolution, recovery proceedings, contract enforcement, arbitration
and commercial disputes, with practice before the District Courts, Patiala
and the Hon'ble Punjab & Haryana High Court.

Palette: matte off-white background, near-black ink typography, muted
brass/gold accent. Subtle scroll-reveal and hover animations throughout —
restrained, not flashy.

## Pages
- `index.html` — Home (hero, intro with photo, practice areas, why-choose)
- `about.html` — About / bio / practice details
- `services.html` — Detailed breakdown of all 7 practice areas
- `contact.html` — Phone, email, address, Google Map embed, contact form
- `blog.html` — Articles for local SEO (recovery, arbitration, industrial
  disputes, High Court practice)

## Photos
Both supplied photos are included under `assets/`:
- `assets/tejveer-portrait.jpg` — used on the About page
- `assets/tejveer-fulllength.jpg` — used in the homepage introduction section

## Animations included
- Fade-and-rise scroll reveal on section headings, cards, and content blocks
  (`.reveal` class + IntersectionObserver in `js/script.js`), staggered
  slightly for sibling elements
- Hero text/quote entrance animation on page load
- Card and blog-card hover lift with soft shadow
- Button hover lift + soft shadow
- Nav link underline that grows from the center on hover
- Photo zoom-on-hover (`.media-frame`)
- Gold underline draw-in on the homepage stat numbers when scrolled into view
- Brand monogram subtle tilt on hover
- All motion respects `prefers-reduced-motion` and degrades gracefully

## Deploy to your existing GitHub + Vercel setup
1. Copy all files and folders (`index.html`, `about.html`, `services.html`,
   `contact.html`, `blog.html`, `css/`, `js/`, `assets/`) into the root of
   your repo (root is simplest for a plain static site — no `vercel.json`
   needed).
2. Commit and push:
   ```
   git add .
   git commit -m "Rebuilt site for Advocate Tejveer Singh Kharoud"
   git push
   ```
3. Vercel auto-deploys from the connected branch. Once live, point your
   GoDaddy domain to Vercel (Vercel project → Settings → Domains → follow
   the A/CNAME instructions, then add those records in GoDaddy DNS).

## Still to personalize
- **Domain references** — `https://www.example.com` appears in `<link
  rel="canonical">` and Open Graph tags on every page. Replace with the
  real domain once connected.
- **Contact form backend** — `contact.html`'s form currently falls back to
  opening the visitor's email app. To receive submissions directly, sign up
  for a free form backend (e.g. formspree.io or web3forms.com) and replace
  `FORM_ENDPOINT` in the form's `action` attribute.
- **Google Map embed** — built from the office address text (no API key
  needed). For pixel-accurate placement, search the address on Google Maps,
  click Share → Embed a map, and swap in that `src` URL.
- **Blog articles** — the four entries are full teaser-length pieces.
  Expanding 1–2 into full standalone article pages over time tends to help
  local search ranking more than short previews.

No placeholder testimonials or invented credentials are included — only
information that was explicitly provided. Add a bar enrollment number,
client testimonials, or further credentials whenever you'd like them
reflected on the site.
