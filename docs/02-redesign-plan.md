# Zocktech Website Redesign Plan

Planning only, with no code yet. This file covers the strategy, page structure, motion and design system.
- What's on the current site: `01-current-site-inventory.md`
- Draft copy for every new section: `03-new-site-content.md`

---

## 1. Goal

Turn zocktech.com from a busy web-dev price list into **one calm, confident, single-page site** that:
1. Presents Zocktech as a **complete digital studio** (websites, marketing, design, content), not only a web developer.
2. Shows **no prices**. Every project gets a custom quote, so the site's job is to start a conversation.
3. Feels **unique and premium**, with motion that has a purpose, while staying simple to read on a phone.
4. Turns visitors into **WhatsApp chats and form enquiries**, and tracks both.

## 2. Positioning

**Old:** "Indie web developer. Websites in 3–5 days. From ₹8,000."
**New:** "One studio for everything your brand needs online: we build it, grow it, and create for it."

### The three pillars

Every service sits under one of three verbs. This becomes the backbone of the nav, the services section, the work filters and the forms.

| Pillar | What it means | Services |
|---|---|---|
| **BUILD** | Websites and tech | Landing Pages · Business Websites · E-commerce Stores · Custom Websites · Custom Web Apps |
| **GROW** | Getting customers | Performance Marketing (Meta + Google Ads) · Digital Marketing · *(confirm: SEO, Google Business Profile, WhatsApp/email marketing)* |
| **CREATE** | Brand and content | Graphic Design · Instagram Page Management · Content Creation for Creators · *(confirm: branding/logo, reels editing, ad creatives)* |

Line to use around the site: **Build. Grow. Create. All in one place.**

### What we keep from the old positioning
- **Direct access.** You work with the founder and a small team, with no account managers in between.
- **Speed.** The website timelines are still a real selling point.
- **Honesty.** "Honest pricing" becomes "a clear custom quote before we start, with no surprise invoices."

### Who the site is for
1. **Small and growing Indian businesses** (clinics, hospitals, real estate, salons, gyms, trading companies, D2C brands) that need a website, then leads.
2. **Creators and personal brands** who need content, editing and Instagram growth.
3. **Startups** that need a custom web app or dashboard.

## 3. Page structure

The current site has 10 sections plus a duplicate nav. The new site has 8 sections plus the nav and footer. It stays a single page with anchor links.

| # | Section | Job it does | Replaces |
|---|---|---|---|
| 0 | **Nav** | Navigation and an always-visible CTA | Old nav (minus Pricing) |
| 1 | **Hero** with the logo strip built in | Say who we are in 5 seconds, show proof straight away | Hero + Trust bar |
| 2 | **Services: Build / Grow / Create** | Show the full offer through one signature scroll animation | Services + Pricing feature lists |
| 3 | **Selected Work** | Proof across all three pillars | Portfolio |
| 4 | **Why Zocktech + Numbers** | Why us, in four points and four numbers | About + counters |
| 5 | **Process** | Take the fear out of starting | Process |
| 6 | **Testimonials** | Social proof from real businesses | Testimonials (1 row, not 3) |
| 7 | **FAQ** | Handle objections, explain custom pricing | FAQs (prices removed) |
| 8 | **Final CTA + enquiry form** | Convert | Final CTA |
| — | **Footer** | Contact, socials, service links | Footer |

**Removed:** the Pricing section, every ₹ amount, the "Limited slots" line, the duplicate nav and process markup, three testimonial rows (cut to one), the glow effect on every card, the hover-only services menu, and the dead "Case study" buttons.

**Later (phase 2, optional):** `/work/[client]` case-study pages, `/privacy` and `/terms` pages (Meta lead ads and Google Ads want a privacy policy URL), and a `/creators` page if creator work becomes a big part of the business.

## 4. Section-by-section plan

### 0. Nav
- **Desktop:** logo on the left. Links: Services · Work · Process · FAQ. On the right, a **Let's talk** button that opens WhatsApp.
- **Mobile:** logo plus a menu icon that opens a full-screen sheet with large links. A **sticky bottom bar** stays on screen with "WhatsApp us" and "Get a quote" (jumps to the form).
- **Behaviour:** transparent over the hero. After 80px of scroll it becomes a small floating pill with a blur behind it. It hides when you scroll down and comes back when you scroll up.
- Drop the theme toggle (see §6).

### 1. Hero
- **Layout:** big headline in the centre-left, short subline, two CTAs, then a logo strip running along the bottom edge of the first screen.
- **Headline:** recommended option is "We build, grow & create brands online." The word in the second line rotates: *websites → campaigns → content → brands*. Other options are in the copy doc.
- **Proof under the CTAs:** "Trusted by 50+ businesses across India", followed by the logo marquee. This replaces the separate trust-bar section.
- **Visual:** the right side, or the background on mobile, shows a **floating stack of three cards**: a website screenshot, an Instagram post and an ad results card. They drift slowly and tilt a little as the cursor moves. This tells visitors "we do all three" before they read a word.
- **Must:** the headline is in the server HTML and visible immediately. The animation runs on top of text that is already there, never in place of it.

### 2. Services: Build / Grow / Create (the signature section)
- **Desktop, sticky scroll:** the section pins for about 3 screen-heights. On the left are the three pillar titles, BUILD, GROW and CREATE. The active pillar is in full colour and the others are faded. On the right, **one device frame morphs** as you scroll:
  - BUILD → a browser window showing a website scrolling
  - GROW → the same frame turns into an ads dashboard with a rising graph and lead counters ticking up
  - CREATE → the frame turns into a phone with an Instagram grid filling in, tile by tile
- Under each pillar title there's a one-line promise and the service chips (for example "Landing Pages", "E-commerce"). Tapping a chip opens WhatsApp with a message about that service already typed in.
- **Mobile:** no pinning. Show three stacked cards, each with its own small looping visual, and use swipeable tabs at the top (Build · Grow · Create).
- This one section replaces the old Services, the Pricing feature lists and the "Custom Website" card.

### 3. Selected Work
- **Filter tabs:** All · Build · Grow · Create
- **Cards:** large image, client name, industry tag, **what we did** (as chips) and a **one-line result** (for example "Live in 4 days", "3x enquiries in month one"). Clicking opens the live site. There's no "Case study" button until real case-study pages exist.
- **Website cards:** on hover (or when the card scrolls into view on mobile), the full-page screenshot scrolls inside the card frame, like a live preview.
- **Grow and Create cards:** an ad creative carousel, a before/after follower count, or a short muted reel.
- **Start with:** the six current web projects, plus at least two marketing and two content/design pieces (assets needed from you, see §9).
- **Layout:** desktop uses a two-column masonry grid with varied card heights. Mobile uses one column, or a horizontal swipe.

### 4. Why Zocktech + Numbers
- **Four reasons:**
  1. One team for everything
  2. You talk to the people doing the work
  3. Fast and on time
  4. A clear quote before we start
- **Number strip, four stats:** 50+ projects delivered · X brands managed · X+ followers grown for clients · ₹X ad spend managed (or average ROAS). Every number must be real, see §9.
- An optional small founder card (photo, "Daksh Tandel, Founder", one line) keeps the personal touch without making the whole site about one person.
- **Motion:** numbers count up once when they come into view, and the real value is already in the HTML.

### 5. Process
- **Four steps** that work for every kind of project: **Discover → Plan → Create → Launch & Grow**. Each step lists what you receive.
- **Desktop:** a horizontal line that **draws itself** as you scroll, lighting up each step in turn.
- **Mobile:** the same idea, with the line running vertically.
- **CTA at the end:** "Start your project".

### 6. Testimonials
- **One** slow marquee row that pauses on hover. On mobile it becomes a swipeable stack.
- **Each card:** quote, name, **business name and logo** (not a stock face), and a service tag (Build/Grow/Create).
- A video testimonial of 15–30 seconds would beat ten text cards. Get at least one if you can.
- Remove or rewrite quotes that talk about "low budget" or "affordable pricing".

### 7. FAQ
- **Eight questions in an accordion.** The first question is "How much does it cost?", with an answer that explains custom quotes.
- **Desktop layout:** questions in the left column. The right column holds a sticky "Still have questions? Chat on WhatsApp" card.

### 8. Final CTA + enquiry form
- **Big closing headline**, then two paths side by side:
  - **WhatsApp** (fastest): a big button, the number, and "Usually replies within 1 hour".
  - **Short form,** about 30 seconds to fill: Name · WhatsApp number · What do you need? (multi-select chips: Website, E-commerce, Web App, Ads, Social Media, Design, Content) · Tell us briefly (optional) · Budget range (optional dropdown). The budget dropdown qualifies leads without showing any prices.
- **After submit:** a thank-you state with "We'll WhatsApp you within X hours". The lead goes to email plus a Google Sheet or CRM.
- **Contact line:** phone · email · hours.

### Footer
- Logo and the tagline "Websites that work. Results that show." (keep it, it's good) or "Build. Grow. Create."
- **Three link columns:** Build (services), Grow (services), Create (services)
- **Contact column:** WhatsApp, email, hours, location
- **Socials:** Instagram, LinkedIn (add), WhatsApp
- `© 2026 Zocktech`. Optionally keep "Made in India".
- Privacy / Terms links (phase 2)

## 5. Motion plan

**Principle:** one signature move per section, smooth but quick. Motion should explain something; decoration alone isn't a reason.

| Where | Motion | Notes |
|---|---|---|
| Whole page | Smooth scroll (Lenis) | Switched off when the user prefers reduced motion |
| Nav | Shrinks into a pill, hides on scroll down, shows on scroll up | |
| Hero headline | Lines rise up from a mask, staggered, about 0.8s in total | Text is visible in the HTML first |
| Hero rotating word | Vertical slot-machine swap every 2.2s | |
| Hero card stack | Slow float plus cursor tilt (parallax) | Static on mobile |
| Logo strip | Continuous marquee, pauses on hover, greyscale turning to colour on hover | |
| Services | **Pinned scroll, device frame morphs** Build → Grow → Create | The signature moment |
| Work cards | Screenshot scrolls inside the frame on hover or when in view, slight lift | |
| Numbers | Count up once when in view | |
| Process | Line draws on scroll, steps light up one by one | |
| Testimonials | Slow marquee, pauses on hover | |
| FAQ | Smooth height animation, "+" rotates into "×" | |
| CTA button | Magnetic hover (desktop only) | |
| Section entries | Short fade-up (12–20px, 0.5s), once only | Never on every card at once |

**Performance rules for motion:**
- Animate only `transform` and `opacity`, never layout properties.
- Honour `prefers-reduced-motion`: turn off the pinned scroll, marquees and parallax, and keep simple fades.
- Never hide real text behind JavaScript. The old site's "0" counters and the hero's `ready` flag shouldn't come back.
- On mobile, drop the pinning and the cursor effects so phones stay smooth.

## 6. Design system direction

| Item | Recommendation |
|---|---|
| **Theme** | Pick **one** theme. Recommended: dark (near-black `#0B0B0C`) with warm off-white text. It suits the orange and the "studio" feel. Removing the toggle halves the design and QA work. |
| **Accent** | Keep **Zocktech orange `#FF9500`** for brand recognition, but use it **sparingly**: CTAs, the active pillar, key words, nothing else. No glow borders on cards. |
| **Pillar tints (optional)** | Build = orange, Grow = green (`#3DDC84`-ish), Create = pink/violet. Only for small chips and the device-frame states. |
| **Type** | One bold display face for headlines (for example *Clash Display*, *General Sans* or *Satoshi* from Fontshare, or *Space Grotesk* / *Inter Tight* from Google Fonts) and one clean sans for body text. Headlines go big: 56–96px on desktop, 40–48px on mobile. |
| **Spacing** | Generous: 120–160px between sections on desktop, 80px on mobile. Max text width around 640px. |
| **Cards** | Flat surfaces (`#141416`), a 1px subtle border, 20–24px radius. No glow. Depth comes from imagery, not effects. |
| **Imagery** | Real screenshots, real ad creatives and real reels, all from Zocktech's own work. No stock people. |
| **Icons** | One consistent line icon set (for example Lucide). |

"Easy-looking" in practice means fewer elements, more space, one accent colour, large type and one hero visual.

## 7. Conversion and tracking

- **Primary CTA:** WhatsApp, which suits Indian SMBs.
- **Secondary CTA:** the enquiry form, for people who don't want to chat yet and for ad conversion tracking.
- **Service-specific WhatsApp messages,** for example `Hi Zocktech, I'm interested in Performance Marketing for my business.`
- **Track everything,** because a marketing agency's own site should show it measures results:
  - GA4 (or Vercel Analytics) and the Meta Pixel
  - Events: `whatsapp_click` (labelled by where on the page it was clicked), `form_submit`, `service_chip_click`, `work_card_click`
  - UTM parameters passed into the form's hidden fields
- **Leads go to:** email (support@zocktech.com) and a Google Sheet or simple CRM.

## 8. SEO and technical plan

- **Stack:** keep **Next.js (App Router) + Tailwind**. Motion uses Framer Motion (now called "Motion") plus Lenis. Hosting on Vercel, unless you prefer to stay on your current host.
- **Rendering:** a fully static page. Every word is in the server HTML.
- **Performance budget:** LCP under 2.0s on mobile 4G, CLS under 0.05, page HTML under 200 KB (currently about 1.5 MB), first-load JS around 150 KB or less. Images use `next/image` with AVIF/WebP. Reels load lazily as muted MP4s.
- **New title:** `Zocktech — Websites, Performance Marketing & Content Studio | India`
- **New meta description:** Websites, ads, design and Instagram content, all from one studio. Zocktech builds and grows brands across India. Get a custom quote on WhatsApp. (No price.)
- **Structured data:** `Organization` / `ProfessionalService`, a `Service` entry for each service, `FAQPage`, `Review` (only for real reviews).
- **Fix** the sitemap (it currently lists `/page.js`) and add an Open Graph image (1200×630) plus a favicon set.
- **Accessibility:** proper alt text on logos (client names, not "1"–"10"), visible focus states, AA contrast, keyboard-usable accordion and menu.

## 9. What I need from you before design/build

**Decisions:**
1. **Voice:** "we" (studio) with a founder touch (recommended), or keep "talk to Daksh" front and centre?
2. **Theme:** dark only (recommended), light only, or keep the toggle?
3. **Hero headline:** pick from the options in `03-new-site-content.md`.
4. **Pillar colours:** one orange accent only, or orange/green/pink pillar tints?
5. **Form:** add the enquiry form next to WhatsApp (recommended), or WhatsApp only?
6. **Budget dropdown** in the form: yes or no? And which ranges?
7. **Tech claim:** is "no WordPress / no Shopify" still true now that you offer full digital services?

**Content and assets:**
1. **The full list of services** you mentioned, so it can be checked against the Build/Grow/Create table in §2.
2. **Real numbers:** projects delivered, brands managed, followers grown, ad spend managed or ROAS, content pieces made.
3. **Marketing work:** two or three campaigns with results (screenshots of ad dashboards, blurred where needed).
4. **Design and content work:** creatives, Instagram grids, reels. Which creators can be named, and do you have their permission?
5. **Testimonials:** real names plus business names, with permission to show each business's logo. Ideally one video.
6. **The name of logo #8** (scales of justice).
7. **Response-time promise:** within 1 hour? Same day?
8. **City or location** for the footer and local SEO.
9. **LinkedIn and any other social links.**
10. **Logo files:** SVG preferred, light and dark versions.

## 10. Build order (once you approve this plan)

1. Lock the decisions and final copy (this doc and the copy doc).
2. Design the hero and the services section first. These two set the whole look.
3. Build static sections: Hero → Services → Work → Why → Process → Testimonials → FAQ → CTA → Footer.
4. Add the motion layer, then the reduced-motion and mobile passes.
5. Form, WhatsApp links, analytics and pixel.
6. SEO, structured data, OG image, sitemap.
7. QA on real phones (Android Chrome first), a Lighthouse pass, then launch.
