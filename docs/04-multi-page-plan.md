# From landing page to full website

**Status (15 Nov 2026):** built — Home, Services, Work + 3 case studies, Process, FAQ, Contact,
Privacy Policy, Terms & Conditions. Not built yet: About, per-pillar service pages, blog.

The site today is one long page plus the new Work section (`/work` and three case studies). This plan
turns it into a complete multi-page site without losing what works: the dark glass look, the
Build / Grow / Create story, WhatsApp-first enquiries and no prices anywhere.

## Sitemap

```
/                     Home (shorter: a front door, not the whole story)
/services             Overview of Build · Grow · Create
  /services/build     Websites, e-commerce, web apps
  /services/grow      Performance & digital marketing, tracking
  /services/create    Graphic design, Instagram management, creator content
/work                 Case studies index                      ✅ built
  /work/heseos        Smart-home store + simulation           ✅ built
  /work/tuklogic      Cinematic 3D story, bilingual           ✅ built
  /work/comparemytrip Travel platform, payments, CMS          ✅ built
/about                Founder story, how we work, values
/contact              Form + WhatsApp + email + FAQ
/privacy, /terms      Legal (short, plain English)
```

**Nav:** Services · Work · About · Contact, plus the existing "Let's talk" WhatsApp button.
**Footer:** keeps the three service columns, the case studies column (already added) and contact details.

## What goes on each page

### Home (`/`)
Keep: hero, Build/Grow/Create, selected work, process, testimonials, CTA.
Change: each service card links to its service page; selected work becomes 3 compact cards that link
to the case studies (the full recordings now live on the case study pages); FAQ moves to `/contact`.
Goal: a visitor understands who you are in 5 seconds and picks a path in 15.

### Services (`/services` + one page per pillar)
One page per pillar, built from the copy already in `pillars` (`src/lib/site.ts`):
- Hero with the pillar's promise ("Websites that work as hard as you do.")
- Each service as its own block: what it is, who it's for, what's included, typical timeline (no prices)
- The case study that proves it (Build → all three; Grow / Create → add work as it ships)
- The process for that pillar, a short FAQ, and a WhatsApp CTA pre-filled with the pillar's message

Later, for search: split Build into `/services/websites`, `/services/ecommerce` and `/services/web-apps`,
each aimed at one search term ("e-commerce website India", "Next.js agency India").

### Work (`/work`, `/work/[slug]`) ✅
Done. Every case study shares one structure (brief → signature → what's different → numbers →
how it's built → what shipped → next project) and gets its own accent colour and its own interactive
section. Add a project by adding an entry to `src/lib/case-studies.ts` and a signature component.

### About (`/about`)
- Daksh's story: why one studio for website, marketing and content
- How you work: direct access to the founder, fast timelines, a clear quote before work starts
- The numbers already on the site (projects delivered, launch speed)
- Tools and stack, with a photo or two of the real team / workspace

### Contact (`/contact`)
Move the current form here (it already opens WhatsApp with the details filled in), plus phone,
email, hours, Instagram and the FAQ. Keep a short CTA band at the bottom of every page that links here.

## Build order

1. ~~Work + case studies~~ ✅
2. Contact page (move form + FAQ; quick win, every CTA can point at it)
3. Three service pages
4. About page
5. Slim the homepage and switch the nav to page links
6. Legal pages
7. Optional, for growth: `/insights` (blog) and industry pages (clinics, real estate, D2C)

## How the code is set up for this

- `SiteShell` (`src/components/site/site-shell.tsx`) wraps every page with the ambient light, nav,
  footer and the phone CTA bar. A new page is `<SiteShell page="…"><main>…</main></SiteShell>`
  with an `id="top"` on its first section.
- `navLinks` in `src/lib/site.ts` hold real URLs (`/work`, `/#services`). On the homepage, `/#…` links
  become same-page anchors automatically. When a section becomes a page, change its `href`
  (e.g. `/#services` → `/services`) and add the page name to `SitePage`.
- Each page sets its own canonical URL and share card (spread `ogDefaults` from `src/lib/seo.ts`),
  and gets an entry in `src/app/sitemap.ts`.
