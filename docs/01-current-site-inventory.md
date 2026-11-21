# Zocktech — Current Site Content Inventory

Snapshot of everything on https://zocktech.com as of 14 Nov 2026, pulled from the live HTML and JS bundle.
Copy is kept word for word, including typos and inconsistencies, so nothing gets lost in the redesign.

Status key used in the last column of each section:
- **KEEP**: reuse as is or nearly as is
- **REWORK**: keep the idea, rewrite the copy
- **REMOVE**: drop from the new site

---

## 1. Meta / SEO

| Field | Current value | Status |
|---|---|---|
| Page title | Zocktech — Professional Web Development for Indian Businesses | REWORK (too narrow now) |
| Meta description | Zocktech builds fast, modern websites using React and Next.js. Starting ₹8,000. For gyms, salons, real estate agents, coaches, and D2C brands. Based in India. | REWORK (has a price, web-only) |
| Meta keywords | web development India, Next.js website India, React website agency India, affordable web development, Zocktech, website for small business India, landing page India, gym website, salon website | REWORK |
| Sitemap | Broken: only lists `https://zocktech.com/page.js` | FIX |
| robots.txt | Allow all, points to sitemap | KEEP |
| Brand spelling | "Zocktech" on site, "ZocTech" inside testimonials | Pick one: **Zocktech** |

## 2. Brand assets

| Asset | Value |
|---|---|
| Logo | `/zocktechLogo/darkLogo.png` |
| Accent colour | `#FF9500` (orange), with `#ff6b00` and `#ffcc44` as glow tints |
| Dark backgrounds | `#0a0a0a`, `#0e0e0e`, `#111111`, borders `#1f1f1f`, muted text `#888888` |
| Theme | Light/dark toggle |
| Tagline | Websites that work. Results that show. |
| Stack note | Built with Next.js |

## 3. Contact details

| Channel | Value |
|---|---|
| WhatsApp / phone | +91 78294 75479 (`https://wa.me/917829475479`) |
| Email | support@zocktech.com |
| Instagram | https://instagram.com/zocktech |
| Hours | Mon–Sat 9:30am–6:30pm IST |
| Founder | Daksh Tandel |

Prefilled WhatsApp messages in use:
- `Hi Daksh, I am interested in the Landing Page package ₹8,000` → REMOVE (price)
- `Hi Daksh, I am interested in the Dynamic Website package ₹15,000` → REMOVE (price)
- `Hi Daksh, I am interested in the E-commerce package ₹30,000` → REMOVE (price)
- `Hi Daksh, I have a custom project I would like to discuss` → KEEP the pattern

## 4. Navigation

Header: Services · Pricing · Portfolio · FAQs · Contact · Theme toggle · **Chat on WhatsApp**
Mobile: "Open menu" with the same links (the nav is rendered twice in the HTML).
Footer: "Navigation" (same 5 links) · "Connect" (WhatsApp icon, Instagram icon) · `© 2026 Zocktech · Built with Next.js · Made by Daksh Tandel`

Status: REWORK. "Pricing" goes away, and the services list grows.

## 5. Hero

- Badge: **Web Development Agency · India**
- H1 (word-by-word blur-in): **Professional Websites That Bring** / **You Customers** (second line in orange)
- Sub: We design and build fast, modern websites that help businesses attract, engage, and convert customers delivered in **3–5 days**.
- CTAs: **Chat on WhatsApp** (primary) · **Our Work** (secondary → #portfolio)
- Urgency line: ✦ ⚡ Limited slots available this week ✦
- Background: interactive grid of squares with an orange radial glow

Status: REWORK. The positioning is web-only and needs to cover the full digital offer. The "Limited slots" line is generic urgency, so either drop it or replace it with something true (for example "Now booking projects for December").

## 6. Trust bar

- Label: **Trusted by 50+ businesses across India**
- Logo marquee (pauses on hover). Logo files are `/trustB/1–10`, and their alt text is just "1"–"10":

| # | Client (identified from logo) |
|---|---|
| 1 | Arjun Hospital |
| 2 | 3 Frames Photography |
| 3 | Identity Dental |
| 4 | Sarala Foundation ("Creating a Brighter Tomorrow") |
| 5 | Insightoria Testing Private Limited |
| 6 | HV Fashions — Blazer World |
| 7 | REPX |
| 8 | *Unnamed logo (scales of justice, black/gold). Probably a legal brand, so confirm the name.* |
| 9 | TR Enterprises (Safety Nets, Safety Products & Equipment) |
| 10 | SRK Holidays |

Status: KEEP. Give every logo proper alt text with the client name.

## 7. Services ("What We Build")

- Eyebrow: What We Build · H2: **Services**
- Sub: React + Next.js only. Fast delivery, clean code, no bloat.
- Four rows with a hover marquee that shows a screenshot. Every row links to `/#contact`:
  1. Landing Page
  2. Business Website
  3. E-commerce Store
  4. Custom Web App
- Hint text: Hover over a service to explore ↑

Status: REWORK. There are no descriptions, hover doesn't work on mobile, and marketing, design and content are all missing.

## 8. About

- Eyebrow: About Zocktech
- H2: **Built by a developer who gets your business.**
- Body: Zocktech is an indie web development studio run by Daksh Tandel. No agency overhead. You talk directly to the developer building your site. Fast delivery, honest pricing, and work you can actually show off.
- Counters (render as "0" until JS runs):
  - **50+** Projects delivered
  - **5** Days avg delivery
  - **100%** Client satisfaction
- CTAs: Chat on WhatsApp · See Results (→ #portfolio)
- Four value cards:
  - **Direct access**: You talk to the developer building your site — no account managers, no middlemen.
  - **Fast delivery**: Landing pages in 3–5 days. Business websites in 5–7 days. Always.
  - **Honest pricing**: Quoted before we start. No surprise invoices. No scope creep billing.
  - **Modern stack**: React + Next.js. Fast, SEO-friendly, and easy to maintain.

Status: REWORK. "Direct access" and "Honest pricing" (now as transparent custom quotes) are worth keeping. The counters need to be in the server-rendered HTML.

## 9. Pricing (REMOVE the whole section)

Recorded here only for reference and internal quoting.

- Eyebrow: Pricing · H2: Simple, honest pricing. No hidden costs. · Sub: Pick what your business needs. Every package includes our best work.

| Package | Price | Description | Features | CTA |
|---|---|---|---|---|
| Landing Page | ₹8,000 one-time | High-converting single page. Built for ads, offers, and first impressions. | 1-page responsive website · React + Next.js or HTML/CSS/JS · Framer Motion animations included · WhatsApp CTA button · Mobile-first design · Delivery in 3–5 days | Get Started |
| Dynamic Website *(Most Popular)* | ₹15,000 one-time | Multi-page professional website. Everything your business needs online. | 3–5 pages fully responsive · React + Next.js · Framer Motion scroll animations · SEO-ready structure · Contact form + WhatsApp button · Delivery in 5–7 days | Get Started |
| E-commerce Store | ₹30,000 one-time | Sell online with a fast, modern store. Built to convert browsers into buyers. | Up to 50 products · Razorpay + UPI payment integration · Cart, checkout, order flow · Mobile-optimised product pages · WhatsApp order notifications · Delivery in 10–15 days | Get Started |
| Custom Website *(Let's Talk)* | Custom pricing, quoted based on your scope | Something unique that doesn't fit a package. Dashboards, web apps, portals, APIs — we'll build it. | React + Node.js full-stack · Auth, dashboards, admin panels · API and third-party integrations · Custom animations and UI · Dedicated project timeline · Scoped and quoted before we start | Chat with Daksh |

The feature lists are still useful. They move into the service descriptions without the prices (see `03-new-site-content.md`).

## 10. Portfolio ("Our Work")

- Eyebrow: Our Work · H2: **Portfolio** · Sub: Real projects for real businesses across India.
- Every card has **Case study** (links to `#`, a dead link) and **Visit website**.

| Client | Tag | Description | Live URL | Screenshot |
|---|---|---|---|---|
| AkswayFilms | Photography Studio | Full business website for a photography studio. Enquiry form, tour packages. | https://akswayfilms.in/ | cloudinary …/Screenshot_2026-04-15_at_17.28.05_fo24eo.png |
| Zelvaa | Analytics | Data analytics company providing AI, machine learning, and data-driven business solutions. | https://www.zelvaa.com/ | cloudinary …/Screenshot_2026-04-15_at_17.28.19_yx04sp.png |
| Sanjari Herbal Hair Oil | Herbal Hair Oil | Herbal hair oil brand offering natural solutions for hair growth, dandruff, and scalp care. | https://www.sanjariherbalhairoil.com/ | cloudinary …/Screenshot_2026-04-15_at_19.33.18_cjxka9.png |
| Sparkle Global Trade | Trading Company | Trading company supplying industrial, consumer, and commercial products across multiple industries. | https://www.sparkleglobaltrade.com/ | cloudinary …/Screenshot_2026-04-15_at_17.28.32_cshwyt.png |
| First Frame Media | Media & Entertainment | Helping professionals build authentic LinkedIn presence that feels earned, not engineered. | https://www.firstframemedia.com/ | cloudinary …/Screenshot_2026-04-15_at_19.32.15_nieo6q.png |
| Identity Dental | Dental Clinic | Identity Dental is a dental clinic located in Kadapa, Andhra Pradesh. | https://www.identitydental.in/ | cloudinary …/Screenshot_2026-04-17_at_19.17.30_gqfqlb.png |

Cloudinary base: `https://res.cloudinary.com/dwethh3fq/image/upload/w_1200,f_auto,q_auto/…`

Status: KEEP the projects. REWORK the cards to say what we did and what changed for the client, and remove the dead "Case study" button. All six are web projects, so marketing, design and content work needs adding.

## 11. Process ("Our Process")

- H2: **Simple, fast, and transparent** · Sub: Four focused stages — from idea to launch.

| # | Step | Description | Deliverable |
|---|---|---|---|
| 1 | Discover | A quick call to align goals, scope, pages, and success metrics. You get a clear proposal and timeline. | Scope & proposal |
| 2 | Design | Wireframes and premium visuals that match the brand. Review, refine, and sign off fast. | Wireframes + UI mockups |
| 3 | Build | Responsive, SEO-ready implementation with clean code, analytics, and performance passes. | Staging site + QA |
| 4 | Launch | Go live with DNS/hosting, final checks, and a walkthrough so you can self-manage. | Live site + handover |

- CTA: Start your project

Status: REWORK so the steps also fit marketing and content work, not only websites. The steps are rendered twice (desktop and mobile copies).

## 12. Testimonials ("What clients say")

- H2: **What clients say** · Sub: Real feedback from businesses we've built for.
- Three marquee rows, each repeated four times in the HTML. All photos are **Unsplash stock images**.

| Name | Quote |
|---|---|
| Rahul Shetty | ZocTech delivered my business website in just 3 days. Clean UI and super fast loading. |
| Priya Nair | The design looks premium. I started getting leads within the first week itself. |
| Amit Verma | Very smooth process. Daksh handled everything from domain to deployment. |
| Sneha Kulkarni | Loved the mobile responsiveness. My clients mostly use phones and it works perfectly. |
| Rohit Patil | Affordable pricing and quick delivery. No unnecessary delays or confusion. |
| Anjali Sharma | The website design looks clean and modern. Exactly what I had in mind. |
| Kiran Naik | Communication was very clear on WhatsApp. Got regular updates during development. |
| Meera Joshi | Super fast service. Website went live in 4 days and everything worked perfectly. |
| Vikram Desai | ZocTech understands business needs, not just design. That made a big difference. |
| Pooja Reddy | Very professional work. The website feels premium even at a low budget. |

Status: REWORK. Stock photos next to client names make the reviews look fake to anyone who reverse-searches an image, so use the client's business name and logo (or a real photo with permission) instead. "Affordable pricing" and "low budget" pull against the custom-pricing positioning.

## 13. FAQs ("Everything you need to know")

- Sub: Can't find what you need? Chat with us on WhatsApp.

| Question | Current answer | Status |
|---|---|---|
| How fast can you deliver? | Basic landing page in 3–5 days. Pro business website in 5–7 days. Timeline starts after advance payment and kickoff form. | REWORK (drop Basic/Pro) |
| What do you need from me to start? | Your business name, logo, colour preferences, and any content you have. We guide you through everything else. | KEEP |
| How do I pay? | 50% advance to start. 50% on delivery and approval. UPI and bank transfer accepted. | KEEP, add retainers |
| Do you only work with React and Next.js? | Primarily yes. We also do pure HTML/CSS/JS for simple landing pages. We don't offer WordPress or Shopify builds. | KEEP (confirm) |
| Do you offer revisions? | Basic includes 1 revision round. Pro includes 2 revision rounds. Additional revisions at ₹500 each. | REWORK (has prices) |
| Can you host the website? | Yes. Hostinger hosting is included in the Pro package. For Basic, we help you set up your own hosting. | REWORK (package-based) |
| Will the site work on mobile? | Every site we build is mobile-first. We test on multiple screen sizes before delivery. | KEEP |
| Can I add more pages later? | Yes. Additional pages are ₹1,000 each, added at any time after launch. | REWORK (has a price) |

- Box below: **Still have questions?** Chat with Daksh directly on WhatsApp. → Chat on WhatsApp

## 14. Final CTA ("Get Started")

- H2: **Ready to get started?**
- Body: Chat with Daksh directly on WhatsApp. Most projects are scoped and started within 24 hours.
- CTA: **Chat on WhatsApp Now**
- Contact line: +91 78294 75479 · support@zocktech.com · Mon–Sat 9:30am–6:30pm IST

Status: KEEP the idea, add a short enquiry form.

---

## 15. Why the current site feels "too much"

1. **Ten sections plus a duplicate nav.** Visitors have to scroll through pricing, three testimonial rows and two process layouts before they reach the contact section.
2. **The same effect on every card.** Every card uses the orange "border-glow" effect, so nothing stands out. It also makes the HTML heavy: the homepage is about **1.5 MB** of HTML.
3. **Content is duplicated in the markup.** The testimonials are rendered 12 times, the service marquees 5 times, and the nav and process steps twice each.
4. **Hover-only interactions** (the services marquee) do nothing on phones, which is where most traffic for Indian SMBs comes from.
5. **Text is hidden until JavaScript runs.** The counters show "0" and the hero headline waits for a `ready` flag, which hurts SEO and first paint.
6. **Credibility gaps:** stock-photo testimonials, dead "Case study" links, "50+ businesses" next to only 6 portfolio items, and a "limited slots" line that reads as generic.
7. **The positioning is web-only,** while the business now covers marketing, design, Instagram management and creator content.
