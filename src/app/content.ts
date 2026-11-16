export type Project = {
  id: string;
  name: string;
  kind: string;
  summary: string;
  highlights: string[];
  stack: string[];
  year: string;
  image: string;
  github: string;
  live?: string;
  screens?: { src: string; alt: string; width: number; height: number }[];
};

export const projects: Project[] = [
  {
    id: "yatrik",
    kind: "Web app",
    name: "Yatrik",
    summary:
      "A travel booking site for India: tours filtered by region and theme, day-by-day itineraries, cab booking with all-inclusive fares, and a checkout that takes payment through Razorpay.",
    highlights: [
      "The server calculates every amount and verifies each payment signature",
      "Tour content is checked against a Zod schema before it reaches a page",
      "Sessions kept in an HMAC-signed, httpOnly cookie",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Radix UI", "Zod", "Razorpay"],
    year: "2026",
    image: "/projects/yatrik-mockup.jpg",
    screens: [
      { src: "/projects/yatrik/tours.jpg", alt: "Yatrik tours list with region and theme filters", width: 1600, height: 1000 },
      { src: "/projects/yatrik/tour.jpg", alt: "Yatrik tour page with itinerary", width: 1600, height: 1000 },
      { src: "/projects/yatrik/checkout.jpg", alt: "Yatrik tour checkout", width: 1600, height: 1000 },
      { src: "/projects/yatrik/cab-checkout.jpg", alt: "Yatrik cab checkout", width: 1600, height: 1000 },
    ],
    github: "https://github.com/yash-189/yatrik",
    live: "https://yatrik-seven.vercel.app",
  },
  {
    id: "eatsxpress",
    kind: "Mobile app",
    name: "EatsXpress",
    summary:
      "A food delivery app for Android and iOS: phone OTP sign-in, restaurants and menus served from a headless CMS, a basket, favourites and a live delivery map.",
    highlights: ["Phone OTP sign-in with Firebase Auth", "Restaurants and menus served from Sanity", "Basket, favourites and location in Redux Toolkit slices"],
    stack: ["React Native", "Expo", "Redux Toolkit", "Firebase"],
    year: "2023",
    image: "/projects/eatsxpress-mockup.jpg",
    screens: [
      { src: "/projects/eatsxpress/signin.jpg", alt: "EatsXpress phone login, OTP verify, email login and sign up screens", width: 1600, height: 813 },
      { src: "/projects/eatsxpress/order.jpg", alt: "EatsXpress home, restaurant menu, cart and account screens", width: 1600, height: 813 },
    ],
    github: "https://github.com/yash-189/Eatsxpress",
  },
  {
    id: "react-dashboard",
    kind: "Web app",
    name: "eCommerce Dashboard",
    summary:
      "A close build of the ByeWind eCommerce dashboard design: KPI cards, revenue and projection charts, a sales map, and an orders table with search, sorting, filters and row selection.",
    highlights: ["One reusable data table built on TanStack Table", "Loading, empty and error states for every table", "Light and dark themes, matched to the design"],
    stack: ["React", "React Query", "TanStack Table", "Recharts", "shadcn/ui"],
    year: "2025",
    image: "/projects/dashboard-mockup.jpg",
    github: "https://github.com/yash-189/react-dashboard",
    live: "https://react-dashboard-psi-three.vercel.app",
  },
  {
    id: "clover",
    kind: "Web app",
    name: "Clover",
    summary:
      "An anime discovery app with trending, popular and genre rows, search, and sign-up and log-in. Data comes from the AniList GraphQL API.",
    highlights: ["Queries to the AniList GraphQL API kept in one shared context", "Skeleton loaders sized to the real cards", "Sign-up and log-in with a token-based session"],
    stack: ["React", "Context API", "AniList GraphQL", "React Router"],
    year: "2023",
    image: "/projects/clover-mockup.jpg",
    github: "https://github.com/yash-189/clover",
    live: "https://clover-stream.netlify.app",
  },
  {
    id: "wearly",
    kind: "Web app",
    name: "Wearly",
    summary:
      "A fashion storefront with category browsing, sorting, search, product pages, a bag that survives a refresh, and a checkout that flags each invalid field.",
    highlights: ["Bag state in Redux Toolkit, saved to localStorage", "Per-field checkout errors that clear as you fix them", "Catalogue filters kept in the URL, so views can be shared"],
    stack: ["React", "Redux Toolkit", "React Router", "Tailwind CSS"],
    year: "2023",
    image: "/projects/wearly-mockup.jpg",
    github: "https://github.com/yash-189/wearly-fashion-store",
    live: "https://wearly-fashion-store.vercel.app",
  },
];

export const bio = {
  name: "Yash Saini",
  role: "Frontend Developer",
  experience: "3 years experience",
  location: "Meerut · Delhi NCR",
  tagline: "I build interfaces that look right and work right.",
  stack: ["React", "Next.js", "Tailwind CSS", "React Native"],
  paragraphs: [
    "I'm a frontend developer with **3+ years of experience** building React and Next.js applications for fintech and SaaS products.",
    "My work goes beyond implementing interfaces. I think about how applications are structured, how features interact, how data flows through the system, and how to keep the codebase maintainable as the product evolves. I've worked on complex, data-heavy applications involving transaction management, payment workflows, settlement reporting and analytics, where performance and data consistency matter.",
    "I also have a strong eye for UI quality. I care about typography, spacing, alignment, visual hierarchy and interaction details. I build shared UI patterns to keep the experience consistent across an application.",
    "I take ownership of frontend features from development through production, handle production issues independently, and use AI-assisted development in my workflow to improve efficiency without compromising quality.",
    "Beyond frontend, I've also contributed to backend modules, giving me a better understanding of how APIs, business logic and frontend applications work together.",
  ],
};

export const contact = {
  email: "yashsaini189@gmail.com",
  socials: [{ label: "GitHub", href: "https://github.com/yash-189" }],
};

export type Story = {
  role: string;
  hook: string;
  problem: string;
  decisions: { title: string; body: string }[];
  details: string[];
};

export const stories: Record<string, Story> = {
  yatrik: {
    role: "Design and build",
    hook: "Book tours and cabs across India, with payments verified on the server.",
    problem:
      "Browsing tours should feel light and visual, but paying for one has to be strict. Anything the browser sends, including the price, can be changed before it arrives, so the checkout can't trust it.",
    decisions: [
      {
        title: "The server works out every amount",
        body: "The browser only sends what was picked: the tour, the travellers, the cab. The payment order is created on the server from its own prices, so the total can't be edited in devtools.",
      },
      {
        title: "Each payment is checked before it counts",
        body: "After Razorpay returns, the server recomputes the payment signature with an HMAC and compares it in constant time. A booking is only confirmed when they match.",
      },
      {
        title: "Content validated against a schema",
        body: "Every tour is checked against a Zod schema before it’s used. A missing field or a wrong region fails early instead of breaking a live page, and the same schema types the data everywhere.",
      },
    ],
    details: [
      "Tours filterable by region and theme, with day-by-day itineraries",
      "Cab booking with all-inclusive fares worked out up front",
      "Sessions in an HMAC-signed, httpOnly cookie that the server verifies on every request",
    ],
  },
  "react-dashboard": {
    role: "Frontend build",
    hook: "A close build of an eCommerce dashboard design, with a reusable data table and every state handled.",
    problem:
      "A dashboard design shows the happy path: full tables and finished charts. A real build also has to handle loading, empty results and errors, work in light and dark, and stay faithful to the spacing and type in the file.",
    decisions: [
      {
        title: "One data table for every list",
        body: "Search, sorting, filters, pagination and row selection live in a single DataTable built on TanStack Table. Each new list only defines its columns.",
      },
      {
        title: "Every state designed, not just the full one",
        body: "Tables have their own loading skeleton, empty state and error state with a retry, so the layout holds whatever the data does.",
      },
      {
        title: "shadcn/ui as the base, styled to the design",
        body: "Accessible primitives came from shadcn/ui, so the time went into matching spacing, type and colour to the design instead of rebuilding dropdowns and dialogs.",
      },
    ],
    details: [
      "KPI cards, projection and revenue charts, and a sales map with Recharts",
      "Light and dark themes",
      "Collapsible sidebars for navigation, notifications and activity",
    ],
  },
  eatsxpress: {
    role: "Design and build",
    hook: "A food delivery app for Android and iOS from one Expo codebase.",
    problem:
      "A delivery app keeps a lot of state alive across screens: who you are, where you are, what's in the basket and what you saved. Restaurants and menus also change often, so they couldn't be hard-coded into the app.",
    decisions: [
      {
        title: "Restaurants come from a headless CMS",
        body: "Restaurants, dishes and categories are served from Sanity. Menus can change without shipping a new build of the app.",
      },
      {
        title: "Phone OTP sign-in with Firebase",
        body: "Phone number and one-time code is how people expect to sign in to a delivery app. Firebase Auth sends and checks the codes and keeps the session signed in.",
      },
      {
        title: "State split into focused slices",
        body: "Auth, basket, favourites and location each have their own Redux Toolkit slice. Every screen reads only what it needs.",
      },
    ],
    details: [
      "Onboarding, phone and email sign-in flows",
      "Basket, favourites and a delivery screen with a live map",
      "One Expo codebase for Android and iOS, styled with NativeWind",
    ],
  },
  clover: {
    role: "Design and build",
    hook: "An anime discovery app built on the AniList GraphQL API.",
    problem:
      "A discovery page loads many rows of cards at once from a large catalogue. It has to feel quick, and the layout can't jump around while all of that data arrives.",
    decisions: [
      {
        title: "Queries kept in one shared context",
        body: "Requests to the AniList GraphQL API live in a single React context, so the rows read prepared data and don't each fetch on their own.",
      },
      {
        title: "Skeletons sized to the real cards",
        body: "Each row shows skeletons with the same size as its loaded cards, so nothing shifts when the data lands.",
      },
      {
        title: "Sign-up and log-in with a token",
        body: "Accounts use a token kept in the browser. The header switches between signed-in and signed-out states from it.",
      },
    ],
    details: [
      "Trending, popular and genre rows",
      "Search across the AniList catalogue",
      "Carousels for featured titles",
    ],
  },
  wearly: {
    role: "Design and build",
    hook: "A fashion storefront with a bag that survives a refresh and a checkout that says what's wrong.",
    problem:
      "Two things break trust in a small shop: a bag that empties when the page reloads, and a checkout that rejects the form without saying which field is wrong. Both had to be solid, on top of fast browsing.",
    decisions: [
      {
        title: "The bag is saved as it changes",
        body: "Bag state lives in a Redux Toolkit slice. A store subscription writes it to localStorage on every change and reads it back on load, so a refresh or a closed tab keeps it.",
      },
      {
        title: "Errors next to the field that caused them",
        body: "Checkout validates each field and shows the message under it. The error clears as soon as that field is edited, instead of waiting for another submit.",
      },
      {
        title: "Filters live in the URL",
        body: "The selected category is read from the query string, so a filtered view can be shared or bookmarked, and the back button works as expected.",
      },
    ],
    details: [
      "Category browsing, sorting and search",
      "Product pages with an image gallery, shipping and returns details",
      "An order confirmation page after checkout",
    ],
  },
};

export type SkillGroup = { label: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend and mobile",
    skills: [
      "React",
      "Next.js",
      "React Native",
      "Expo",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Firebase",
    ],
  },
  {
    label: "Styling and motion",
    skills: [
      "Tailwind CSS",
      "shadcn/ui",
      "Radix UI",
      "Motion",
    ],
  },
  {
    label: "State and data",
    skills: [
      "React Query",
      "Redux Toolkit",
      "Zustand",
      "GraphQL",
      "Socket.IO",
      "Zod",
    ],
  },
  {
    label: "Design and tooling",
    skills: [
      "Figma",
      "Git",
      "GitHub",
      "Vercel",
      "Vite",
      "Lighthouse",
    ],
  },
  {
    label: "Payments",
    skills: ["Razorpay Payment Gateway", "Cashfree Payment Gateway", "Juspay Payment Gateway"],
  },
  {
    label: "AI-assisted development",
    skills: ["Cursor", "Claude", "OpenAI", "Perplexity"],
  },
];

export type CompanyProject = {
  id: string;
  name: string;
  domain: string;
  summary: string;
  stack: string[];
  points: string[];
};

export const companyProjects: CompanyProject[] = [
  {
    id: "payments",
    name: "Payment gateway & operations dashboards",
    domain: "Fintech",
    summary:
      "The merchant and internal dashboards around a payment gateway: transactions, payment flows, settlements, reporting and analytics.",
    stack: ["Next.js", "React", "React Query", "Tailwind CSS"],
    points: [
      "Built for scale: tables handle hundreds of thousands of records. Pagination, sorting and filtering run on the server, and long lists are virtualised so only visible rows render",
      "Exact money: amounts stay in minor units end to end and are formatted only at display, so totals and settlement reports always match the ledger",
      "Live payment status: changes arrive from gateway webhooks and show up in the dashboard without a manual refresh, so operators see the true state of every payment",
      "One data layer: React Query handles transformation, pagination, filters and caching for every module, so screens stay fast and new modules don't reinvent fetching",
      "Secure sessions: sensitive requests are encrypted on the client and tokens refresh silently, so operators never lose work to an expired session",
    ],
  },
  {
    id: "rewardcal",
    name: "Rewards platform",
    domain: "Full-stack web application",
    summary:
      "A full-stack web application where people join events, earn points and redeem them, with an admin dashboard that runs the whole platform. I built it end to end: the API, the database, the user app and the admin app.",
    stack: ["React", "Next.js", "PostgreSQL", "Redis", "Socket.IO"],
    points: [
      "Modular architecture: each feature is split into commands, queries, domain logic and infrastructure behind clear interfaces, so business rules stay testable and independent of the framework and database",
      "Financial-grade wallet: an append-only ledger with idempotency keys, row-level locking and a balance that can never go negative, so retries and concurrent requests can't create or lose points",
      "Reliable event-driven processing: state changes and their side effects are written in one transaction through a transactional outbox, then delivered by background queues with retries and a dead-letter queue",
      "Security in depth: tamper-proof signed sign-in for users, Argon2 password hashing and two-factor authentication for admins, short-lived JWTs with refresh rotation, and rate limiting enforced across every server instance",
      "Fine-grained RBAC: permissions per module and action, plus an audit log that records who changed what and when",
      "Real-time at scale: websocket rooms per user and per item, with Redis carrying events, cache and rate limits across servers so the app scales horizontally",
      "Performance and operations: Redis caching with event-driven invalidation, scheduled jobs for automated publishing and review locks, health checks, structured logging and error monitoring in production",
    ],
  },
  {
    id: "workforce",
    name: "ERP platform",
    domain: "Enterprise",
    summary:
      "A modular ERP covering HR & payroll, finance & accounting, inventory and sales, with dashboards and workflows for admins, managers and employees.",
    stack: ["React", "Next.js", "React Query", "Tailwind CSS"],
    points: [
      "One platform, many modules: HR & payroll, invoices and ledgers, stock and warehouses, quotes and orders, all built on the same layout, data layer and component system so the product feels like one system",
      "Fine-grained RBAC: permissions are checked per module and action, so routes, menus, buttons and API calls all follow the same rules and hidden features can't be reached directly",
      "Approval workflows: leave, attendance, purchase and payment requests move through configurable multi-level approvals, with every state change tracked for an audit trail",
      "Payroll and finance views where accuracy matters: salary runs, invoices, payments and tax summaries with totals that reconcile and exports for accounting",
      "Data-heavy screens built for daily use: server-side pagination, advanced filters, bulk actions and exports across employees, stock, orders and transactions",
    ],
  },
];

export type Role = {
  role: string;
  company: string;
  place: string;
  period: string;
  summary: string;
};

export const roles: Role[] = [
  {
    role: "Frontend Developer",
    company: "Hypertech Infosystem",
    place: "Remote",
    period: "Mar 2023 – Present",
    summary:
      "Building fintech products, HRMS tools and customer-facing web apps in React and Next.js. I own modules end to end, from the frontend architecture and shared components to production releases, working closely with backend, design and product.",
  },
];
