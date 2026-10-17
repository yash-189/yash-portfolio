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
  // Extra screens shown under "How it's built", for projects without a live link
  screens?: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    id: "react-dashboard",
    kind: "Dashboard",
    name: "eCommerce Dashboard",
    summary:
      "A pixel-perfect build of the ByeWind dashboard design: KPI cards, revenue charts, a sales map and an orders table with server-side pagination, sorting and filters.",
    highlights: ["Server-side pagination, sorting and filtering with TanStack Table", "React Query caching so pages and filters load instantly on revisit", "Pixel-perfect build of the ByeWind design with shadcn/ui"],
    stack: ["React", "React Query", "TanStack Table", "Recharts", "shadcn/ui"],
    year: "2025",
    image: "/projects/dashboard-mockup.jpg",
    github: "https://github.com/yash-189/react-dashboard",
    live: "https://react-dashboard-psi-three.vercel.app",
  },
  {
    id: "eatsxpress",
    kind: "Mobile app",
    name: "EatsXpress",
    summary:
      "A food delivery app for Android and iOS with OTP login, restaurant discovery, delivery maps, a cart with coupons and order history.",
    highlights: ["OTP login and auth state handled with Firebase", "Cart, coupons and order history in Redux Toolkit", "One Expo codebase for Android and iOS"],
    stack: ["React Native", "Expo", "Redux Toolkit", "Firebase"],
    year: "2023",
    image: "/projects/eatsxpress-mockup.jpg",
    screens: [
      { src: "/projects/eatsxpress/signin.jpg", alt: "EatsXpress phone login, OTP verify, email login and sign up screens" },
      { src: "/projects/eatsxpress/order.jpg", alt: "EatsXpress home, restaurant menu, cart and account screens" },
    ],
    github: "https://github.com/yash-189/Eatsxpress",
  },
  {
    id: "clover",
    kind: "Web app",
    name: "Clover",
    summary:
      "An anime discovery app with trending, popular and genre rows, search, skeleton loaders and JWT login. I rebuilt its data layer on the AniList GraphQL API after the old API shut down.",
    highlights: ["Rebuilt the data layer on AniList GraphQL after the original API shut down", "Skeleton loaders for every row, so layout never jumps", "JWT login with protected routes"],
    stack: ["React", "Context API", "AniList GraphQL", "React Router"],
    year: "2023",
    image: "/projects/clover-mockup.jpg",
    github: "https://github.com/yash-189/clover",
    live: "https://clover-stream.netlify.app",
  },
  {
    id: "wearly",
    kind: "Storefront",
    name: "Wearly",
    summary:
      "A fashion storefront with category filters, sorting, product pages, a saved shopping bag and a validated checkout. I redesigned it from an older project and moved it to a free product API.",
    highlights: ["Redesigned from an older project and moved to a free product API", "Shopping bag persisted across sessions", "Checkout form with field-level validation"],
    stack: ["React", "Redux Toolkit", "React Router", "Tailwind CSS"],
    year: "2023",
    image: "/projects/wearly-mockup.jpg",
    github: "https://github.com/yash-189/wearly-fashion-store",
    live: "https://wearly-fashion-store.vercel.app",
  },
];

export type Capability = {
  label: string;
  detail: string;
  tools: string[];
};

export const capabilities: Capability[] = [
  {
    label: "UI/UX design",
    detail: "Spacing and type scales, alignment, contrast, design systems and micro-interactions.",
    tools: ["Figma", "Design systems", "Accessibility"],
  },
  {
    label: "Frontend architecture",
    detail: "Feature-based folders, a single API layer, reusable components and custom hooks.",
    tools: ["React", "Next.js", "TypeScript"],
  },
  {
    label: "Server state and data",
    detail: "Caching, pagination, background refetching and keeping the UI in sync with the API.",
    tools: ["React Query", "Redux Toolkit", "Zustand"],
  },
  {
    label: "Dashboards and data UI",
    detail: "Tables with filters and sorting, charts, reports and admin screens.",
    tools: ["TanStack Table", "Recharts"],
  },
  {
    label: "Real-time interfaces",
    detail: "Live updates pushed into the React Query cache so every screen stays current.",
    tools: ["Socket.IO", "SSE"],
  },
  {
    label: "Performance",
    detail: "Route-level code splitting, lazy loading and avoiding unnecessary renders.",
    tools: ["React profiler", "Lighthouse"],
  },
  {
    label: "Mobile",
    detail: "Cross-platform apps with native navigation, maps and auth.",
    tools: ["React Native", "Expo"],
  },
];

export const bio = {
  name: "Yash Saini",
  role: "Frontend Developer",
  location: "Meerut, India",
  status: "Open to frontend roles · Remote or on-site",
  tagline: "I build interfaces that look right and work right.",
  paragraphs: [
    "I'm a frontend developer working mostly with React, Next.js and TypeScript. For the last three years I've built dashboards, admin tools and product UIs for fintech and SaaS teams.",
    "I also design. I can't leave a misaligned icon, uneven spacing or an off-grid button alone, and I usually spot these issues before anyone else does. I work from the basics: spacing scales, type hierarchy, contrast, alignment and consistent components.",
    "I like modern UI that stays clean and calm, with bold type where it matters and nothing extra. Small details like hover states, loading skeletons and empty states are where an interface feels finished.",
    "On the code side, I organise by feature, keep API logic in one layer and server state in React Query. Reusable components and hooks mean the design stays consistent as the product grows.",
  ],
};

export const contact = {
  email: "yashsaini189@gmail.com",
  socials: [{ label: "GitHub", href: "https://github.com/yash-189" }],
};
