/**
 * All site copy and business details live here, so the page can be edited
 * without touching layout code. No prices anywhere: every project is custom-quoted.
 */

export const site = {
  name: "ZockTech",
  url: "https://zocktech.com",
  tagline: "Websites that work. Results that show.",
  // Primary number: every WhatsApp button and call link uses it.
  phoneDisplay: "+91 97419 90955",
  phoneHref: "tel:+919741990955",
  whatsappNumber: "919741990955",
  // Secondary number, listed next to the primary wherever contact details are shown.
  phone2Display: "+91 78294 75479",
  phone2Href: "tel:+917829475479",
  whatsapp2Number: "917829475479",
  email: "hello@zocktech.com",
  instagram: "https://instagram.com/zocktech",
  instagramHandle: "@zocktech",
  hours: "Mon–Sat · 9:30am–6:30pm IST",
  founder: "Daksh Tandel",
  location: "India",
  // Matches the business address on the Meta Business account (town level).
  city: "Honnavar",
  region: "Karnataka",
  addressDisplay: "Honnavar, Karnataka, India",
} as const;

/** Build a WhatsApp deep link (primary number unless `number` is given), optionally with a pre-filled message. */
export function whatsapp(message?: string, number: string = site.whatsappNumber) {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Both WhatsApp numbers, primary first, for places that list contact details. */
export const phones = [
  { label: "Primary", display: site.phoneDisplay, tel: site.phoneHref, wa: site.whatsappNumber },
  { label: "Secondary", display: site.phone2Display, tel: site.phone2Href, wa: site.whatsapp2Number },
] as const;

/** Main pages. On the homepage, `id` is also the section the nav highlights while scrolling. */
export const navLinks = [
  { id: "services", label: "Services", href: "/services" },
  { id: "work", label: "Work", href: "/work" },
  { id: "process", label: "Process", href: "/process" },
  { id: "faq", label: "FAQ", href: "/faq" },
  { id: "contact", label: "Contact", href: "/contact" },
] as const;

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
] as const;

export type SitePage = "home" | "services" | "work" | "process" | "faq" | "contact" | "legal";

/** Resolve a site link for the page it is rendered on. */
export function pageHref(href: string, page: SitePage) {
  return page === "home" && href.startsWith("/#") ? href.slice(1) : href;
}

export type Pillar = {
  id: "build" | "grow" | "create";
  index: string;
  name: string;
  kicker: string;
  title: string;
  body: string;
  services: { name: string; desc: string }[];
  chips: string[];
  image: { src: string; alt: string };
  cta: { label: string; message: string };
};

export const pillars: Pillar[] = [
  {
    id: "build",
    index: "01",
    name: "Build",
    kicker: "Websites & tech",
    title: "Websites that work as hard as you do.",
    body: "Fast, modern, mobile-first websites and web apps on React + Next.js, designed to turn visitors into enquiries.",
    services: [
      { name: "Landing Pages", desc: "One sharp page for ads, launches and offers. Live in 3–5 days." },
      { name: "Business Websites", desc: "Multi-page, SEO-ready sites with enquiry forms and WhatsApp built in." },
      { name: "E-commerce Stores", desc: "Razorpay + UPI checkout, product pages and WhatsApp order alerts." },
      { name: "Custom Websites", desc: "Animation-rich, one-of-a-kind experiences. Never a template." },
      { name: "Custom Web Apps", desc: "Dashboards, portals, admin panels and integrations, built full-stack." },
    ],
    chips: ["React + Next.js", "SEO-ready", "Mobile-first"],
    image: { src: "/media/build.jpg", alt: "Layered glass interface panels glowing orange" },
    cta: { label: "Discuss a website", message: "Hi ZockTech! I'd like to discuss a website project." },
  },
  {
    id: "grow",
    index: "02",
    name: "Grow",
    kicker: "Marketing that brings customers",
    title: "Marketing you can measure in enquiries.",
    body: "Performance campaigns and digital strategy focused on leads and sales, not vanity likes.",
    services: [
      { name: "Performance Marketing", desc: "Meta & Google Ads with sharp targeting, creatives and weekly optimisation." },
      { name: "Digital Marketing", desc: "A clear plan across channels to get found, get chosen and stay top of mind." },
      { name: "Tracking & Reporting", desc: "Pixels, conversions and simple reports, so you see exactly what's working." },
    ],
    chips: ["Meta Ads", "Google Ads", "Weekly reports"],
    image: { src: "/media/grow.jpg", alt: "Glowing orange glass blocks rising like a growth chart" },
    cta: { label: "Grow my business", message: "Hi ZockTech! I'm interested in performance marketing for my business." },
  },
  {
    id: "create",
    index: "03",
    name: "Create",
    kicker: "Brand & content",
    title: "Content that stops the scroll.",
    body: "Design and content for brands and creators: consistent, on-trend and made to perform.",
    services: [
      { name: "Graphic Design", desc: "Brand identity, social creatives and ad designs that look as good as you are." },
      { name: "Instagram Page Management", desc: "Content calendars, posts, reels, captions and posting, handled end to end." },
      { name: "Content for Creators", desc: "Reel editing, hooks and scripts for creators and personal brands." },
    ],
    chips: ["Reels", "Creatives", "Instagram"],
    image: { src: "/media/create.jpg", alt: "Creator recording a reel on her phone under warm orange light" },
    cta: { label: "Plan my content", message: "Hi ZockTech! I'd like help with design / Instagram content." },
  },
];

export type Project = {
  id: string;
  name: string;
  category: string;
  headline: string;
  description: string;
  services: string[];
  video: { desktop: string; mobile: string; desktopPoster: string; mobilePoster: string };
};

export const projects: Project[] = [
  {
    id: "heseos",
    name: "Heseos",
    category: "Smart home brand",
    headline: "A smart-home brand you can step inside.",
    description:
      "A product website for a smart-home automation brand, with a day/night hero, an interactive 3D touch-panel viewer and a browser-based simulation where visitors switch lights room by room.",
    services: ["UX/UI design", "Web development", "Interactive simulation", "Product storytelling"],
    video: {
      desktop: "/work/heseos-desktop.mp4",
      mobile: "/work/heseos-mobile.mp4",
      desktopPoster: "/work/heseos-desktop.jpg",
      mobilePoster: "/work/heseos-mobile.jpg",
    },
  },
  {
    id: "tuklogic",
    name: "Tuklogic",
    category: "IT services & staffing",
    headline: "An immersive 3D journey through technology.",
    description:
      "A cinematic, scroll-driven WebGL experience for an IT services and staffing company: a journey from the first tools to today's technology, with 3D service showcases and Arabic/English support.",
    services: ["Creative direction", "3D / WebGL", "Motion design", "Bilingual build"],
    video: {
      desktop: "/work/tuklogic-desktop.mp4",
      mobile: "/work/tuklogic-mobile.mp4",
      desktopPoster: "/work/tuklogic-desktop.jpg",
      mobilePoster: "/work/tuklogic-mobile.jpg",
    },
  },
  {
    id: "comparemytrip",
    name: "CompareMyTrip",
    category: "Travel platform",
    headline: "Trip planning that feels like a holiday.",
    description:
      "A travel platform for treks, weekend getaways and holidays, with smart search by travel style, destination, dates, travellers and budget, plus curated package listings.",
    services: ["UX/UI design", "Search & filters", "Package listings", "Responsive build"],
    video: {
      desktop: "/work/comparemytrip-desktop.mp4",
      mobile: "/work/comparemytrip-mobile.mp4",
      desktopPoster: "/work/comparemytrip-desktop.jpg",
      mobilePoster: "/work/comparemytrip-mobile.jpg",
    },
  },
];

export const moreWork = [
  { name: "AkswayFilms", tag: "Photography studio", image: "/work/more/akswayfilms.jpg" },
  { name: "Zelvaa", tag: "Data analytics", image: "/work/more/zelvaa.jpg" },
  { name: "Sparkle Global Trade", tag: "Sourcing & trade", image: "/work/more/sparkle.jpg" },
  { name: "First Frame Media", tag: "LinkedIn branding", image: "/work/more/firstframe.jpg" },
] as const;

export const stats = [
  { value: 50, suffix: "+", label: "Projects delivered" },
  { value: 5, suffix: " days", label: "Typical website launch" },
  { value: 24, suffix: "h", label: "To scope & kick off" },
  { value: 100, suffix: "%", label: "Client satisfaction" },
] as const;

export const process = [
  {
    n: "01",
    title: "Discover",
    desc: "A quick call to understand your business, your goals and what success looks like.",
    deliverable: "Clear scope & custom quote",
    details: [
      "A short call or WhatsApp chat about your business, customers and goals",
      "We look at what you have today: website, ads, Instagram, competitors",
      "You get a written scope, a timeline and a fixed custom quote, usually within 24 hours",
    ],
  },
  {
    n: "02",
    title: "Plan",
    desc: "Wireframes for websites, a strategy for ads, a calendar for content. Mapped before we make anything.",
    deliverable: "Plan & timeline",
    details: [
      "Websites: sitemap, page structure and wireframes",
      "Marketing: audience, offers, budget split and tracking plan",
      "Content: themes, formats and a posting calendar",
    ],
  },
  {
    n: "03",
    title: "Create",
    desc: "We design, build, shoot and edit. You review at every stage and sign off fast.",
    deliverable: "Drafts & staging previews",
    details: [
      "Design first, then build, so you approve the look before code",
      "A private staging link to try the site on your own phone",
      "Feedback rounds agreed upfront, with updates on WhatsApp",
    ],
  },
  {
    n: "04",
    title: "Launch & Grow",
    desc: "We go live, track the numbers and keep improving, month after month.",
    deliverable: "Live project & reports",
    details: [
      "Domain, hosting, speed and SEO checks before launch",
      "Tracking for enquiries, calls and WhatsApp clicks",
      "Handover of every login, plus ongoing support if you want it",
    ],
  },
] as const;

/** Typical timelines (same figures as the FAQ). */
export const timelines = [
  { name: "Landing page", time: "3–5 days" },
  { name: "Business website", time: "5–7 days" },
  { name: "E-commerce store", time: "10–15 days" },
  { name: "Custom web app", time: "Own timeline" },
  { name: "Ads & marketing", time: "Agreed upfront" },
  { name: "Content & Instagram", time: "Monthly calendar" },
] as const;

export const needFromYou = [
  { title: "Your brand", desc: "Logo, colours and any brand guidelines you already have." },
  { title: "Your content", desc: "Text, photos and product or service details, if you have them. We help with the rest." },
  { title: "Access", desc: "Domain, hosting, ad or social accounts we need, shared securely. You keep ownership of all of them." },
  { title: "Quick feedback", desc: "One point of contact who can review and approve. Fast replies mean a fast launch." },
] as const;

export const workingTogether = [
  { title: "Direct access", desc: "You talk to the people doing the work, on WhatsApp and calls. No account managers in between." },
  { title: "Fixed custom quote", desc: "One clear quote before we start. Anything new is quoted first, never added to the bill later." },
  { title: "50% to start, 50% on delivery", desc: "The balance is due only after you've reviewed and approved the work. UPI and bank transfer accepted." },
  { title: "Revisions included", desc: "Every quote includes revision rounds, agreed upfront, so there are no surprises." },
] as const;

/** Included with every website project (shown on /services). */
export const included = [
  { title: "Mobile-first", desc: "Designed for phones first, where most of your customers are, and tested on real screen sizes." },
  { title: "SEO-ready", desc: "Clean structure, page titles, descriptions, sitemap and fast loading, so Google can find you." },
  { title: "WhatsApp built in", desc: "Enquiry forms and WhatsApp buttons that turn visitors into conversations." },
  { title: "Tracking set up", desc: "Know which pages, ads and buttons bring enquiries, from day one." },
  { title: "You own it", desc: "Once paid in full, the website, its content and every login are yours." },
  { title: "Support after launch", desc: "Updates, new pages and fixes whenever you need them." },
] as const;

export const testimonials = [
  { name: "Rahul Shetty", quote: "ZockTech delivered my business website in just 3 days. Clean UI and super fast loading." },
  { name: "Priya Nair", quote: "The design looks premium. I started getting leads within the first week itself." },
  { name: "Amit Verma", quote: "Very smooth process. Daksh handled everything from domain to deployment." },
  { name: "Sneha Kulkarni", quote: "Loved the mobile responsiveness. My clients mostly use phones and it works perfectly." },
  { name: "Kiran Naik", quote: "Communication was very clear on WhatsApp. Got regular updates during development." },
  { name: "Meera Joshi", quote: "Super fast service. Website went live in 4 days and everything worked perfectly." },
  { name: "Vikram Desai", quote: "ZockTech understands business needs, not just design. That made a big difference." },
  { name: "Anjali Sharma", quote: "The website design looks clean and modern. Exactly what I had in mind." },
] as const;

export type Faq = { q: string; a: string };

/** FAQ page content, grouped by topic. No prices anywhere: every project is custom-quoted. */
export const faqGroups: { id: string; title: string; items: Faq[] }[] = [
  {
    id: "general",
    title: "Working with us",
    items: [
      {
        q: "What does ZockTech do?",
        a: "We're one studio for everything your brand needs online. We build websites, online stores and web apps; we grow businesses with Meta and Google Ads and digital marketing; and we create brand design, Instagram content and reels for businesses and creators.",
      },
      {
        q: "Can I hire you for just one service?",
        a: "Yes. Many clients start with a website and add ads, design or Instagram management later. Pick what you need now and we'll grow with you.",
      },
      {
        q: "Do you work with creators?",
        a: "Yes. We edit reels, write hooks and scripts, and manage Instagram pages for creators and personal brands.",
      },
      {
        q: "Do you work with clients outside my city?",
        a: "Yes. We work with clients across India over WhatsApp, calls and video meetings, so where you are doesn't slow anything down.",
      },
      {
        q: "How will we communicate?",
        a: "Mostly on WhatsApp, with calls whenever they help. You get updates at every stage and a private preview link to review the work before anything goes live.",
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing & payment",
    items: [
      {
        q: "How much does a project cost?",
        a: "Every project is custom-quoted, because no two businesses need exactly the same thing. Tell us what you need on WhatsApp or through the form and you'll get a clear, fixed quote, usually within 24 hours. No hidden costs, no surprise invoices.",
      },
      {
        q: "How does payment work?",
        a: "Projects run on 50% advance to start and 50% on delivery and approval. For ongoing services like ads and page management, we agree a simple monthly plan upfront. UPI and bank transfer accepted.",
      },
      {
        q: "Are there any other costs?",
        a: "Your quote lists everything we'll do. Third-party costs such as your domain, hosting, paid plugins or your ad budget are paid by you directly to the provider, and we tell you about each one before we start.",
      },
      {
        q: "Do you offer revisions?",
        a: "Yes. Every quote includes revision rounds, agreed upfront so there are no surprises.",
      },
    ],
  },
  {
    id: "timelines",
    title: "Timelines & getting started",
    items: [
      {
        q: "How fast can you deliver?",
        a: "Landing pages typically go live in 3–5 days, business websites in 5–7 days and e-commerce stores in 10–15 days. Custom web apps get a dedicated timeline. For marketing and content, we agree the launch date with you upfront.",
      },
      {
        q: "What do you need from me to start?",
        a: "Your business name, logo, colour preferences and any content you already have. We guide you through everything else.",
      },
      {
        q: "What happens after launch?",
        a: "We hand over every login and stay available for updates, new pages and fixes. If you'd like, we can also keep running ads or your Instagram month after month.",
      },
    ],
  },
  {
    id: "websites",
    title: "Websites & tech",
    items: [
      {
        q: "What tech do you use?",
        a: "Mostly React and Next.js, which are fast, SEO-friendly and easy to maintain. Simple landing pages can also be built in pure HTML, CSS and JavaScript. Every site is mobile-first and tested on multiple screen sizes.",
      },
      {
        q: "Can you handle domain, hosting and maintenance?",
        a: "Yes. We can set up and manage your domain and hosting, or help you run it yourself. Updates and new pages can be added any time after launch.",
      },
      {
        q: "Will I own my website?",
        a: "Yes. Once the project is paid in full, the design, code and content we create for you are yours, and the domain and hosting stay in your name.",
      },
      {
        q: "Will my website show up on Google?",
        a: "Every site is built SEO-ready: clean structure, page titles and descriptions, a sitemap and fast loading. Rankings take time and depend on competition, so we never promise a position, but we give Google everything it needs.",
      },
    ],
  },
  {
    id: "marketing",
    title: "Marketing & content",
    items: [
      {
        q: "Do you guarantee results from ads?",
        a: "No honest agency can guarantee leads or sales, because results depend on your market, offer and budget. What we commit to is the work: sharp targeting, strong creatives, weekly optimisation and simple reports that show exactly what's working.",
      },
      {
        q: "Who pays for the ad budget?",
        a: "You do, directly to Meta or Google from an ad account in your name. Our quote covers planning, creatives and managing the campaigns, and you can see the spend at any time.",
      },
      {
        q: "How does Instagram page management work?",
        a: "We agree a monthly content calendar with you, then design the posts, edit the reels, write the captions and handle posting. You approve the calendar before anything goes out.",
      },
    ],
  },
];

export const faqs: Faq[] = faqGroups.flatMap((g) => g.items);

export const contactServices = [
  "Website",
  "E-commerce",
  "Web app",
  "Ads / Marketing",
  "Instagram management",
  "Graphic design",
  "Creator content",
  "Not sure yet",
] as const;
