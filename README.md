# ZockTech — website

Website for ZockTech (websites, performance marketing, design and content). Pages: `/`, `/services`,
`/work` (+ a case study per project), `/process`, `/faq`, `/contact`, `/privacy`, `/terms`.
What's next is in `docs/04-multi-page-plan.md`.
Built with Next.js 16 (App Router), Tailwind CSS 4, Motion and Lenis. No prices are shown anywhere: every project is custom-quoted.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where things live

| What | Where |
|---|---|
| All copy: services, projects, process, FAQ, testimonials, contact details, nav links | `src/lib/site.ts` |
| Privacy Policy and Terms text (update the date when you edit) | `src/lib/legal.ts` |
| Homepage section order | `src/app/page.tsx` |
| Nav, footer & phone bar around every page | `src/components/site/site-shell.tsx` |
| Case study copy, accent colours and figures | `src/lib/case-studies.ts` |
| Case study layout / interactive sections | `src/components/case-study/*` |
| Case study images (era frames, room plates, flight frames) | `public/work/case/` |
| Case study share images (generated from the covers in `src/assets/og/`) | `src/app/work/[slug]/opengraph-image.tsx` |
| Sections | `src/components/sections/*` |
| Nav, theme switch, smooth scroll, mobile bottom bar | `src/components/site/*` |
| Colours, glass styles, animations (light + dark tokens) | `src/app/globals.css` |
| Hero portraits & section imagery | `public/media/` |
| Portfolio recordings (+ poster frames) | `public/work/` |
| Client logos (monochrome masks, take the text colour) | `public/clients/` |
| Your logo files | `public/brand/` |
| Favicon / app icons | `src/app/icon.svg`, `src/app/favicon.ico`, `src/app/apple-icon.png` |
| Social share image | `src/app/opengraph-image.jpg` |

## Common edits

- **Change the WhatsApp number, email or hours:** `site` in `src/lib/site.ts`.
- **Add a portfolio project:** add an entry to `projects` in `src/lib/site.ts` and put
  `<id>-desktop.mp4`, `<id>-mobile.mp4` and matching `.jpg` posters in `public/work/`.
  Desktop videos are 16:10 (1440×900 recorded), mobile videos are 390×844 at 2×.
- **Add a case study:** add the project to `projects` (above), then an entry to `caseStudies` in
  `src/lib/case-studies.ts` (copy, accent colours, numbers), its images under `public/work/case/<id>/`,
  a JPEG cover in `src/assets/og/<id>.jpg` for the share image, and its interactive section in
  `src/components/case-study/signature.tsx`. Keep every figure traceable to the project itself.
- **Add a client logo:** drop a transparent PNG in `public/clients/` and add it to `clients`.
  Logos are drawn as masks, so any colour works; only the shape matters.
- **Default theme:** dark. Visitors can switch; their choice is remembered.

## Contact form

The form has no backend. On submit it composes a WhatsApp message with the visitor's name, number,
selected services and notes, and opens `wa.me` in a new tab, with an email fallback.
Nothing is stored on the site.
# zocktechnew
