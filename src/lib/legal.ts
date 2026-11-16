/**
 * Privacy Policy and Terms & Conditions. Written in plain English for an India-based studio.
 * A block is a paragraph (string) or a bullet list (string[]). Keep these free of prices.
 * Have a lawyer review before relying on them, and update `updated` whenever the text changes.
 */

import { site } from "@/lib/site";

export type LegalSection = { id: string; title: string; body: (string | string[])[] };
export type LegalDoc = { title: string; updated: string; intro: string; sections: LegalSection[] };

const contactLine = `Email ${site.email}, or call or WhatsApp ${site.phoneDisplay} or ${site.phone2Display} (${site.hours}).`;

export const privacy: LegalDoc = {
  title: "Privacy Policy",
  updated: "16 November 2026",
  intro:
    "This policy explains what personal information ZockTech collects, why, and what you can do about it. The short version: we only collect what we need to reply to you and do your project, we never sell it, and this website does not use advertising or analytics cookies.",
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      body: [
        `ZockTech (“we”, “us”) is a digital studio based in India, founded by ${site.founder}. We design and build websites and web apps, run digital marketing, and create design and social media content.`,
        `This policy covers ${site.url.replace("https://", "")} (the “website”) and the information you share with us when you enquire about or use our services. ${contactLine}`,
      ],
    },
    {
      id: "what-we-collect",
      title: "Information we collect",
      body: [
        "Information you give us:",
        [
          "Contact details: your name, phone or WhatsApp number and email address.",
          "Enquiry details: your business, the services you're interested in and anything you tell us about your project.",
          "Project materials: content, logos, photos, product information and other files you send us to deliver your project.",
          "Account access: logins or access to your domain, hosting, ad, analytics or social media accounts, when you share them so we can do the work.",
          "Billing details: the name, business details and payment references needed for invoices and records.",
        ],
        "Information collected automatically:",
        [
          "Our hosting provider records standard technical logs (such as IP address, browser type, the page requested and the time) to deliver the website and keep it secure.",
          "Your light or dark theme choice is saved in your own browser’s local storage. It never leaves your device and is not sent to us.",
        ],
        "We do not use advertising or analytics cookies on this website, and we do not track you across other websites.",
      ],
    },
    {
      id: "enquiry-form",
      title: "How the enquiry form works",
      body: [
        "When you submit the form on our website, we record your name, phone number, the services you picked, anything you wrote in the details box, and which consent boxes you ticked (the required consent box and the optional offers box). This is saved in a private spreadsheet that only ZockTech can access, so we can reply to you and keep a record of your consent.",
        "The form also opens WhatsApp (or, if you choose, your email app) with a message containing the same details. That message is only sent when you press send in WhatsApp or your email app, and it is then handled by WhatsApp (Meta) or your email provider under their own privacy policies.",
        "The two consent boxes on the form work like this: the first (required) lets us contact you on WhatsApp, phone and email about your enquiry and project. The second (optional) lets us send you offers and news. Leaving the second box unticked never affects your enquiry.",
      ],
    },
    {
      id: "whatsapp",
      title: "WhatsApp messages and your consent",
      body: [
        `We use WhatsApp Business accounts on two numbers: ${site.phoneDisplay} and ${site.phone2Display}. Both are official ZockTech numbers, and messages from them are sent by our team, not by a personal account.`,
        "We only message you on WhatsApp when you've given us your number and agreed to hear from us, for example by messaging us first, or by ticking the consent box on our enquiry form. That consent covers messages about your enquiry and project: replies, quotes, previews, updates and invoices.",
        "We only send offers and news if you've separately agreed to them, for example with the optional box on our form. Saying no to offers never affects your enquiry or project.",
        "You can stop messages at any time: reply STOP on WhatsApp, or tell us by phone or email. We'll honour your request whether you make it on WhatsApp or anywhere else, and remove you from any offers list. We may still send essential messages about a project you've started with us, unless you ask us to use email instead.",
        "WhatsApp is provided by WhatsApp LLC, part of Meta. Messages are end-to-end encrypted, and Meta processes some information (such as your phone number and when messages are sent) under its own terms and privacy policy.",
      ],
    },
    {
      id: "how-we-use",
      title: "How we use your information",
      body: [
        [
          "To reply to your enquiry and prepare a quote.",
          "To plan, deliver and support the services you ask us for.",
          "To send updates, previews, invoices and receipts about your project.",
          "To keep our website and systems secure.",
          "To meet our legal, tax and accounting obligations.",
        ],
        "We will only send you marketing messages if you have separately agreed to them, and you can stop them at any time by replying STOP or telling us.",
      ],
    },
    {
      id: "legal-basis",
      title: "Why we're allowed to use it",
      body: [
        "We process your personal data with your consent, or where you have voluntarily given it to us for a specific purpose (for example, asking for a quote or starting a project), as permitted by the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000. We may also process it where the law requires us to.",
        "You can withdraw your consent at any time by contacting us. This won't affect anything we did before you withdrew it, and we may still need to keep some records the law requires.",
      ],
    },
    {
      id: "sharing",
      title: "Who we share it with",
      body: [
        "We do not sell, rent or trade your personal information. We only share it when we need to:",
        [
          "With services we use to run the studio, such as WhatsApp, email, file storage, hosting and banking or UPI providers.",
          "With platforms needed to deliver your project, such as your hosting provider, domain registrar, Meta or Google ad platforms, and only on your instruction.",
          "With anyone we work with on your project, such as a photographer or developer, who must keep it confidential and use it only for your project.",
          "With authorities, if the law requires it.",
        ],
        "Some of these providers may store data on servers outside India. We use well-known providers that protect data with appropriate security.",
      ],
    },
    {
      id: "account-access",
      title: "Access to your accounts",
      body: [
        "If you give us access to your accounts, we use it only for the work you've asked for, keep credentials private, and never share them. Wherever possible, please add us as a user or partner instead of sharing your password. After handover, we recommend you remove our access or change your passwords.",
      ],
    },
    {
      id: "case-studies",
      title: "Our portfolio and case studies",
      body: [
        "We may show work we've done for businesses in our portfolio and case studies, as explained in our Terms & Conditions. We never publish your customers' personal data or any confidential information in them.",
      ],
    },
    {
      id: "retention",
      title: "How long we keep it",
      body: [
        "We keep enquiry messages for as long as we need them to reply and follow up. We keep project files and records while we work together and for a reasonable time after, so we can support you. We keep invoices and payment records for as long as Indian tax and accounting laws require. After that, we delete or anonymise information we no longer need.",
      ],
    },
    {
      id: "security",
      title: "How we protect it",
      body: [
        "We use reasonable security practices to protect your information, including secure, access-controlled accounts and limiting who can see your data. No method of storage or transfer is completely secure, but we work to protect your information and will tell you and the relevant authorities if a breach affects you, as the law requires.",
      ],
    },
    {
      id: "your-rights",
      title: "Your rights",
      body: [
        "You can ask us to:",
        [
          "Tell you what personal data we hold about you and how we use it.",
          "Correct, complete or update it.",
          "Delete it, unless we must keep it by law.",
          "Withdraw consent you've given us.",
          "Help with any complaint about how we've handled your data.",
        ],
        `Contact us at ${site.email} and we'll respond as soon as possible and within the time the law requires. If you're not satisfied with our answer, you can complain to the Data Protection Board of India.`,
      ],
    },
    {
      id: "children",
      title: "Children",
      body: [
        "Our services are for businesses and adults. We don't knowingly collect personal data from anyone under 18. If you believe a child has sent us their information, contact us and we'll delete it.",
      ],
    },
    {
      id: "other-sites",
      title: "Links to other websites",
      body: [
        "Our website links to WhatsApp, Instagram and other services. Their own privacy policies apply when you use them, and we're not responsible for how they handle your data.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      body: [
        "We may update this policy from time to time. The date at the top shows when it last changed. If we make an important change, we'll highlight it on this page.",
      ],
    },
    {
      id: "contact",
      title: "Contact and grievance officer",
      body: [
        `For any question, request or complaint about your personal data, contact our grievance officer, ${site.founder}. ${contactLine}`,
      ],
    },
  ],
};

export const terms: LegalDoc = {
  title: "Terms & Conditions",
  updated: "16 November 2026",
  intro:
    "These terms explain how working with ZockTech works: quotes, payments, timelines, ownership and the rest. We've kept them short and readable. Your project quote sets out the specifics; these terms cover everything around it.",
  sections: [
    {
      id: "about",
      title: "About these terms",
      body: [
        `These terms apply to your use of ${site.url.replace("https://", "")} and to any services you buy from ZockTech (“we”, “us”). By accepting a quote or paying an advance, you (“you”, the client) agree to them.`,
        "If your written quote or proposal says something different from these terms, the quote wins for that project.",
      ],
    },
    {
      id: "services",
      title: "Our services",
      body: [
        "We offer website and web app development, e-commerce stores, performance and digital marketing, graphic design, Instagram page management and content for creators. What we'll do for you, and what's included, is set out in your quote.",
      ],
    },
    {
      id: "contacting-us",
      title: "Contacting us and WhatsApp",
      body: [
        `You can reach us on WhatsApp or by phone at ${site.phoneDisplay} or ${site.phone2Display}, or by email at ${site.email}.`,
        "By contacting us, or by sending our enquiry form, you agree to these terms and our Privacy Policy, and to ZockTech contacting you on WhatsApp, phone and email about your enquiry and project. Offers and news are sent only if you separately agree to them.",
        "You can opt out of WhatsApp messages at any time by replying STOP or telling us, and we'll respect that on or off WhatsApp. Your use of WhatsApp itself is governed by WhatsApp's Terms of Service and Meta's Privacy Policy.",
        "Most project communication, approvals and updates happen on WhatsApp. A written approval sent on WhatsApp or by email counts as your approval under these terms.",
      ],
    },
    {
      id: "quotes",
      title: "Quotes and scope",
      body: [
        "Every project is custom-quoted. Your quote lists the work, deliverables, timeline and revision rounds, and is valid for the period stated on it.",
        "Anything outside the quote (new pages, features, extra designs or extra revision rounds) is a change. We'll tell you before doing it and quote it separately, and we only start once you agree.",
      ],
    },
    {
      id: "payments",
      title: "Payments",
      body: [
        [
          "Projects: 50% advance to start, and the remaining 50% on delivery, after you've reviewed and approved the work and before the final launch or handover.",
          "Ongoing services (such as ads management or Instagram management): paid monthly in advance, as agreed in your quote.",
          "Payment is by UPI or bank transfer. Applicable taxes are shown on your quote or invoice.",
          "If a payment is late, we may pause work until it's received, and timelines move accordingly.",
        ],
      ],
    },
    {
      id: "timelines",
      title: "Timelines",
      body: [
        "Timelines start once we've received the advance and the content we need from you. They depend on timely feedback and approvals. If content or feedback is delayed, the timeline moves by at least the same amount. We'll always tell you early if anything on our side affects a date.",
      ],
    },
    {
      id: "your-part",
      title: "Your responsibilities",
      body: [
        [
          "Give us accurate information and the content, files and access we need, on time.",
          "Make sure you have the right to use everything you send us (logos, photos, text, music and so on).",
          "Name one person who can give feedback and approve work.",
          "Make sure your business, products, offers and ads follow the laws and platform rules that apply to them.",
        ],
      ],
    },
    {
      id: "revisions",
      title: "Revisions and approval",
      body: [
        "Your quote includes a set number of revision rounds. We share previews at each stage. When you approve a stage or the final work, changes after that count as new work and are quoted separately.",
      ],
    },
    {
      id: "third-party",
      title: "Third-party costs and services",
      body: [
        "Costs from other providers are paid by you, directly to them, unless your quote says otherwise. These include domain names, hosting, paid themes, plugins or fonts, stock media, software subscriptions, payment gateway fees and your ad budget. We'll tell you about any of these before we start.",
        "We're not responsible for outages, price changes, policy changes or account decisions made by these providers (for example hosting companies, Meta, Google or Instagram), though we'll help you deal with them.",
      ],
    },
    {
      id: "marketing",
      title: "Marketing and advertising",
      body: [
        "We'll plan, run and optimise your campaigns with care and report on them honestly, but we can't guarantee specific results such as leads, sales, rankings, followers or reach. Results depend on your market, offer, budget and platform decisions outside our control.",
        "Ad spend is paid by you directly to the platform, from an ad account in your name. Platforms may reject or limit ads under their own policies.",
      ],
    },
    {
      id: "ownership",
      title: "Ownership",
      body: [
        "Once you've paid in full, you own the final deliverables we create specifically for you: your website design and code, graphics, content and creatives. Until then, they remain ours.",
        "We keep ownership of our own tools, code libraries, templates and know-how that existed before your project or that we use across projects, and we give you a permanent licence to use them as part of your deliverables. Open-source software and third-party assets stay under their own licences.",
        "Your domain, hosting and ad and social accounts should always be in your name. Where we set them up for you, we transfer full access to you on handover.",
      ],
    },
    {
      id: "portfolio",
      title: "Portfolio",
      body: [
        "We may show the work we did for you, such as screenshots, screen recordings and a description of the project, in our portfolio, case studies and social media. We never reveal confidential information. If you'd rather we didn't show your project, tell us in writing before launch and we won't.",
      ],
    },
    {
      id: "confidentiality",
      title: "Confidentiality and account access",
      body: [
        "We both agree to keep each other's confidential information private and to use it only for the project. If you give us access to your accounts, we use it only for the agreed work. After handover, you're responsible for your accounts and passwords, and we recommend removing our access or changing your passwords.",
      ],
    },
    {
      id: "support",
      title: "Support after launch",
      body: [
        "If something we built doesn't work as agreed, tell us and we'll fix it. Hosting, maintenance, updates and new features after launch are not included unless your quote says so, and are quoted separately. We're not responsible for problems caused by changes made by you or anyone else after handover, or by updates to third-party software.",
      ],
    },
    {
      id: "cancellation",
      title: "Cancellation and refunds",
      body: [
        "You can cancel a project at any time by telling us in writing. You pay for the work completed up to that point. The advance covers the start of the work and is not refundable once work has begun.",
        "Ongoing monthly services can be stopped by telling us before the next month begins. We may pause or end work if payments are overdue or these terms are seriously broken, after telling you first.",
      ],
    },
    {
      id: "liability",
      title: "Limitation of liability",
      body: [
        "We do our work with reasonable skill and care. To the extent the law allows, we're not liable for indirect or consequential losses, such as lost profits, lost revenue or lost data, and our total liability for any project is limited to the amount you paid us for that project. You agree to cover any claims that arise from content or materials you provided to us.",
      ],
    },
    {
      id: "website-use",
      title: "Using this website",
      body: [
        "The content, design and code of this website belong to ZockTech. You may not copy or reuse them without permission. We try to keep the information here accurate and up to date, but it's general information, not a promise or an offer.",
        "These terms and our Privacy Policy apply together to your use of this website and our services. The Privacy Policy explains how we handle personal information, including what the enquiry form records and how the two consent boxes work.",
      ],
    },
    {
      id: "law",
      title: "Governing law and disputes",
      body: [
        "These terms are governed by the laws of India. If there's ever a disagreement, we'll first try to sort it out by talking. If we can't, it will be settled by the courts in India that have jurisdiction.",
      ],
    },
    {
      id: "changes",
      title: "Changes to these terms",
      body: [
        "We may update these terms from time to time. The date at the top shows when they last changed. The terms in place when you accepted your quote apply to that project.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      body: [`Questions about these terms? ${contactLine}`],
    },
  ],
};
