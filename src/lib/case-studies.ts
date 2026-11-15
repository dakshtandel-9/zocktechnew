/**
 * Case study copy for /work and /work/[slug]. Each project keeps the recordings from `projects`
 * in site.ts and adds the long-form story. Every figure here comes from the project's own code,
 * docs or commit history; nothing is a guessed business result. No prices and no links to the
 * client sites (by request).
 */

import { projects, type Project } from "@/lib/site";

export type CaseSlug = "tuklogic" | "heseos" | "comparemytrip";

export type CaseStudy = {
  slug: CaseSlug;
  name: string;
  category: string;
  year: string;
  /** Accent for this case study only (the rest of the page keeps the ZockTech orange). */
  accent: string;
  /** Same accent as space-separated RGB, for glows with alpha. */
  accentRgb: string;
  /** Darker accent for text on the light theme, where the bright accent would not be readable. */
  accentInk: string;
  headline: string;
  summary: string;
  facts: { label: string; value: string }[];
  services: string[];
  stack: string[];
  brief: string;
  challenges: string[];
  signature: { label: string; title: string; body: string };
  highlights: { title: string; body: string }[];
  numbers: { value: string; label: string }[];
  engineering: { title: string; body: string }[];
  delivered: string[];
  cover: string;
  project: Project;
};

const byId = (id: string) => {
  const p = projects.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown project ${id}`);
  return p;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "heseos",
    name: "Heseos",
    category: "Smart home & automation",
    year: "2026",
    accent: "#8fe3ff",
    accentRgb: "143 227 255",
    accentInk: "#0a7396",
    headline: "A smart-home brand you can step inside.",
    summary:
      "Heseos has made switches, panels, locks, sensors and lighting for over fifteen years. We turned a dense product brochure into an Apple-style store where visitors can try the system before they buy it: switch a room's lights, dim them, close the curtains, ask for the AC by voice.",
    facts: [
      { label: "Industry", value: "Smart home & automation" },
      { label: "Catalogue", value: "106 configurations" },
      { label: "Built for", value: "Homes, hotels & builders" },
      { label: "Year", value: "2026" },
    ],
    services: ["UX/UI design", "Web development", "Interactive simulation", "3D product viewer", "Store & checkout", "Admin panel"],
    stack: ["Next.js 16", "React 19", "three.js", "Web Speech API", "Turso (SQLite)", "Vercel Blob", "Vercel"],
    brief:
      "Smart-home hardware is hard to sell online. In a photo, a touch panel is a black rectangle, and its real value (a light that dims, a curtain that closes, a door that opens with a code) is invisible until you use it. Heseos needed a site that lets people feel what living with the system is like, and that helps them find the right product among more than a hundred configurations.",
    challenges: [
      "A brochure catalogue of 5 categories, 15 ranges, 37 product families and 106 configurations, each with specs, options and FAQs.",
      "Products whose benefit only shows when you use them, room by room.",
      "A team that needs to run products, orders, stock and enquiries without a developer.",
    ],
    signature: {
      label: "Try it here",
      title: "Switch the lights, room by room.",
      body: "This is how the Heseos Simulation works. Every room is photographed lights-on and lights-off from the same camera, and each room is lit through its own outline, so one switch only ever changes one room. Tap a room, or pick a scene.",
    },
    highlights: [
      {
        title: "Try before you buy",
        body: "The Heseos Simulation is a walk-through apartment with five rooms. Visitors switch and dim lights, run the fan, the TV and the AC, and close the curtains. The dimmer cross-fades between real lit and unlit photographs.",
      },
      {
        title: "A 3D touch panel you can touch",
        body: "The 4-module Touch Panel is built in three.js at real-world scale, wearing a flattened photo of the real glass face. Visitors turn it, tap its rings to light them, and switch between five metal finishes.",
      },
      {
        title: "Talk to the house",
        body: "“Turn off the bedroom lights” works typed or spoken. Voice stays off until the visitor enables it, and every control also works as plain HTML when WebGL isn't available.",
      },
      {
        title: "A catalogue you can actually search",
        body: "106 configurations reorganised into 8 categories, 14 subcategories and 40 product types, with filters, a configurator and a quote request on every product.",
      },
      {
        title: "A hero that orbits",
        body: "Product categories circle the headline on an elliptical path. Cards are spaced by arc length and tilt along the curve; scrolling turns the orbit and opens it out into the brand story.",
      },
      {
        title: "A store the team runs",
        body: "Smart packages, a bag and checkout, plus a private admin for products, orders, stock, enquiries and CSV reports. Leave a price blank and the product collects quote requests instead.",
      },
    ],
    numbers: [
      { value: "106", label: "Product configurations, searchable and filterable" },
      { value: "5", label: "Rooms you can switch in the simulation" },
      { value: "5", label: "Metal finishes on the 3D touch panel" },
      { value: "7", label: "Automated check suites guarding the build" },
    ],
    engineering: [
      {
        title: "Measured, not guessed",
        body: "Every marker and overlay (TV, AC, fan, window) is stored as a percentage of its photograph, so it stays on the right fitting at any screen size. A test fails if a fitting has no marker on its own room.",
      },
      {
        title: "Rules a real home follows",
        body: "One lighting circuit and one main control per room. A room action never changes another room; only Home, Evening and Away touch the whole house. Regression tests enforce every rule.",
      },
      {
        title: "Light enough for phones",
        body: "The 3D apartment model was compressed to 0.6 MB with Draco and meshopt, and the Draco decoder runs in a worker served from the site itself.",
      },
      {
        title: "Checkout that can't double-book stock",
        body: "Every order submission is idempotent. The server re-checks price and stock, reserves tracked stock, and releases it when an order is cancelled.",
      },
      {
        title: "A safe back office",
        body: "Admin sessions last eight hours and a password change signs every session out. Products, orders and submissions live in Turso; product photos in private Blob storage.",
      },
    ],
    delivered: [
      "Story-led homepage",
      "Heseos Simulation",
      "3D touch panel studio",
      "Product directory & configurator",
      "Store, packages, bag & checkout",
      "Admin: products, orders, stock, reports",
      "Demo, support & partner forms",
    ],
    cover: "/work/case/heseos/hero.webp",
    project: byId("heseos"),
  },
  {
    slug: "tuklogic",
    name: "Tuklogic",
    category: "IT services & staffing",
    year: "2026",
    accent: "#6f93ff",
    accentRgb: "111 147 255",
    accentInk: "#2f4fd0",
    headline: "An immersive journey from the first tools to today's technology.",
    summary:
      "Tuklogic sells IT solutions and skilled teams. On paper every IT company sounds the same, so instead of a list of services the website tells the story of technology itself: a cinematic, narrated journey through history that ends at Tuklogic's door, in English and Arabic.",
    facts: [
      { label: "Industry", value: "IT services & staffing" },
      { label: "Languages", value: "English + Arabic" },
      { label: "Offices", value: "Middle East, India, US" },
      { label: "Year", value: "2026" },
    ],
    services: ["Creative direction", "Story & narration", "AI character films", "3D / WebGL", "Bilingual build", "Performance engineering"],
    stack: ["Next.js 16", "React 19", "WebGL", "Web Audio", "Cloudflare R2", "Vercel", "Google Apps Script"],
    brief:
      "Tuklogic needed a first impression nobody forgets, one that feels as big as the work it does. It also had to load quickly on a phone on mobile data in Dubai or Indore, and read naturally in Arabic, right to left.",
    challenges: [
      "A story told in full-HD frame sequences, film, music and narration: about a gigabyte of media.",
      "Cinematic on a laptop, yet quick to start on a mid-range phone.",
      "Every page in two languages, including right-to-left Arabic.",
    ],
    signature: {
      label: "The story",
      title: "Scroll through time.",
      body: "Each chapter shows people solving problems with the technology of their age, then hands over to Tuklogic. Visitors understand the positioning before they read a single service. These are frames from the live site, with the chapter names as they appear in English and Arabic.",
    },
    highlights: [
      {
        title: "History as the pitch",
        body: "From early humans to the present, every era carries one idea: invention exists to help people. The last chapter is Tuklogic, with its services one tap away.",
      },
      {
        title: "Characters made for the story",
        body: "New character films for each era (builders in Egypt, a monk in Ancient China, a warrior in Greece, twin astronomers for India's Golden Age), generated with AI video tools and graded to one deep-blue look.",
      },
      {
        title: "Narrated, with music",
        body: "Every chapter has a voice-over in English and Arabic over a music bed. The next chapter's narration preloads, so a transition never waits on audio.",
      },
      {
        title: "A 3D services experience",
        body: "Services open in a real-time WebGL scene with particles and project films. It runs even without a graphics card, and we cut the desktop particle count by 90% so the first scene appears faster.",
      },
      {
        title: "Truly bilingual",
        body: "English and Arabic on every page, with right-to-left layouts. Switching language keeps you on the same section instead of sending you home.",
      },
      {
        title: "A phone cut, not a shrunk desktop",
        body: "Phones get their own 9:16 edit of the intro film and portrait character clips, cut so faces and hands are never cropped out.",
      },
    ],
    numbers: [
      { value: "2", label: "Languages on every page, with right-to-left Arabic" },
      { value: "1 GB", label: "Of cinematic media, streamed only when needed" },
      { value: "−90%", label: "WebGL particles at start, for a faster first scene" },
      { value: "38", label: "Pages with bilingual SEO titles and descriptions" },
    ],
    engineering: [
      {
        title: "Frames decoded off the main thread",
        body: "The player decodes about ten frames ahead with createImageBitmap. Drawing a full-HD frame used to cost 15 ms on a fast laptop and around 50 ms on a slow one, which made scenes stutter; now it's a cheap copy.",
      },
      {
        title: "A download queue that recovers",
        body: "One shared queue of twelve downloads (six on slow connections), three attempts per frame, and only the eras just ahead of the visitor. A stalled clip reloads itself after nine seconds.",
      },
      {
        title: "Lite mode for modest phones",
        body: "Devices with 4 GB of memory or less, Data Saver or reduced motion get 960×540 frames instead of 1920×1080, no blur and native scrolling.",
      },
      {
        title: "Media on the site's own domain",
        body: "About a gigabyte of media lives in Cloudflare R2 but is served through the site's own address, so canvas, WebGL and Web Audio never hit cross-origin errors.",
      },
      {
        title: "Small things that matter",
        body: "iPhones ignore volume control, so they get their own music mix 7.4 dB quieter to keep the narration clear. Enquiries land in a Google Sheet, with the visitor's country preselected on the phone field.",
      },
    ],
    delivered: [
      "Cinematic homepage story",
      "3D services experience",
      "9 case study pages",
      "About, careers & articles",
      "Contact with Google Sheets lead capture",
      "Privacy & terms",
      "English + Arabic throughout",
    ],
    cover: "/work/case/tuklogic/present.webp",
    project: byId("tuklogic"),
  },
  {
    slug: "comparemytrip",
    name: "CompareMyTrip",
    category: "Travel platform",
    year: "2026",
    accent: "#ffc40c",
    accentRgb: "255 196 12",
    accentInk: "#8a6100",
    headline: "Trip planning that feels like a holiday.",
    summary:
      "CompareMyTrip curates and sells its own treks, weekend getaways, holidays and cruises. We built the whole platform: a hero you fly through as you scroll, side-by-side package comparison, online payments, and a CMS the team runs every day.",
    facts: [
      { label: "Industry", value: "Travel & tours" },
      { label: "Scope", value: "Website, payments, CMS" },
      { label: "Market", value: "India" },
      { label: "Year", value: "2026" },
    ],
    services: ["UX/UI design", "Full-stack build", "Payments", "CMS & admin", "AI workflow", "SEO & performance"],
    stack: ["Next.js 16", "React 19", "Firebase Auth", "Firestore", "PayU", "Cloudflare R2", "Tiptap", "Vercel + Cloudflare"],
    brief:
      "A travel company that sells its own curated packages wanted travellers to discover, compare and pay on the site, following one journey: discover, explore, compare, choose a package, book. And it wanted its own team to run everything, from packages and banners to coupons and blog posts, without calling a developer.",
    challenges: [
      "Comparison is in the name, so comparing packages side by side had to be a first-class flow.",
      "Real money: payments, retries, pending bookings and reconciliation had to be airtight.",
      "Packages arrive as supplier PDFs, and typing each one into a CMS by hand is slow.",
    ],
    signature: {
      label: "The hero",
      title: "Scroll to take off.",
      body: "The homepage opens on a 15.5-second flight that follows your scroll, from the cabin window, over the mountains, down to the beach. Scroll this panel to fly it.",
    },
    highlights: [
      {
        title: "A hero you fly through",
        body: "All 372 frames of the flight scrub with the page. Seeks land on exact frames with one in flight at a time, and the headline waits for the decoded frame so text never runs ahead of the picture.",
      },
      {
        title: "Compare up to three packages",
        body: "A comparison tray that follows you across the site and stays in sync across tabs. Once all three slots are full, a new pick replaces the oldest, so nothing is silently dropped.",
      },
      {
        title: "AI package import",
        body: "The team gives ChatGPT a supplier PDF with our prompt and uploads the JSON it returns. The package page fills itself in: itinerary, inclusions, FAQs and icons from a fixed set of 1,000. Anything malformed is rejected with a clear error.",
      },
      {
        title: "Edit the page on the page",
        body: "The package editor is the public page itself. Click any text to edit it, reorder photos, undo, preview as a traveller, then save as draft or publish.",
      },
      {
        title: "Payments that don't lose bookings",
        body: "PayU checkout with signed callbacks. Pending trips offer Pay again, Check status and I've already paid, and an hourly job checks every expired booking with PayU before it is removed.",
      },
      {
        title: "Reviews and quotes, handled",
        body: "The admin connects the Google Business Profile so reviews can refresh on a daily schedule. Travellers can attach a quote PDF that uploads straight to private storage and deletes itself after 72 hours.",
      },
    ],
    numbers: [
      { value: "372", label: "Frames in the scroll-driven hero, none dropped" },
      { value: "−81%", label: "Lighter hero video on phones after re-encoding" },
      { value: "15", label: "Admin sections the team runs on their own" },
      { value: "58", label: "Automated test files behind every release" },
    ],
    engineering: [
      {
        title: "Video that never stalls the page",
        body: "The hero downloads the whole rendition and scrubs it from memory, because a paused video only buffers at playback speed. A stalled load falls back to a still and releases the scroll after 12 seconds; Save-Data and 2G get the still from the start.",
      },
      {
        title: "Lighter by default",
        body: "Desktop and phone get their own hero encodes, 57.6% and 80.8% smaller than the original file, with every frame kept. 49 site photos went from 33.8 MB to 10.4 MB, and images fade in only once fully loaded.",
      },
      {
        title: "Private uploads, straight to storage",
        body: "Quote PDFs up to 10 MB go from the browser to a private bucket through a ten-minute signed link, are checked for type and size, and are swept away 72 hours later.",
      },
      {
        title: "Reconciled, not guessed",
        body: "Expired pending payments are verified with PayU inside a transaction before deletion, so a late successful payment is recovered instead of lost.",
      },
      {
        title: "Two hosts, one codebase",
        body: "The same code deploys to Vercel and to Cloudflare Workers, with release checks for credentials, video budgets and caching.",
      },
    ],
    delivered: [
      "Home, destinations & package pages",
      "Compare, cruises & corporate trips",
      "Accounts with Google sign-in",
      "PayU checkout & custom payments",
      "Admin CMS (packages, banners, coupons, blog)",
      "AI package import",
      "Google reviews integration",
      "Blog, legal & trust pages",
    ],
    cover: "/work/case/comparemytrip/flight/f20.webp",
    project: byId("comparemytrip"),
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

/** The case study after this one, wrapping round, for the "next project" card. */
export function nextCaseStudy(slug: CaseSlug) {
  const i = caseStudies.findIndex((c) => c.slug === slug);
  return caseStudies[(i + 1) % caseStudies.length];
}
