import {
  siClaude,
  siCss3,
  siExpo,
  siFigma,
  siFirebase,
  siFramer,
  siGit,
  siGithub,
  siGraphql,
  siHtml5,
  siJavascript,
  siLighthouse,
  siNextdotjs,
  siOpenai,
  siPerplexity,
  siPostgresql,
  siRedis,
  siRadixui,
  siRazorpay,
  siReact,
  siReactquery,
  siReactrouter,
  siRedux,
  siShadcnui,
  siSocketdotio,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
  siZod,
  type SimpleIcon,
} from "simple-icons";

const recharts = {
  hex: "22B5BF",
  path: "M2 3h2v16h18v2H2zm4.3 12.7-1.4-1.4 5.1-5.1 3.5 3.5 5.6-6.1 1.5 1.3-7 7.7-3.6-3.5z",
};

const cursor = {
  hex: "8A93A6",
  path: "M8.6 5.3 10 6.7 4.7 12l5.3 5.3-1.4 1.4L1.9 12zm6.8 0L22.1 12l-6.7 6.7-1.4-1.4 5.3-5.3L14 6.7z",
};

const card = {
  hex: "8A93A6",
  path: "M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM3 9v2h18V9zm2 5v2h5v-2z",
};

const logos: Record<string, Pick<SimpleIcon, "hex" | "path">> = {
  Figma: siFigma,
  React: siReact,
  "Next.js": siNextdotjs,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  HTML: siHtml5,
  CSS: siCss3,
  "Tailwind CSS": siTailwindcss,
  "shadcn/ui": siShadcnui,
  "Radix UI": siRadixui,
  Motion: siFramer,
  "React Query": siReactquery,
  "Redux Toolkit": siRedux,
  "React Router": siReactrouter,
  GraphQL: siGraphql,
  "AniList GraphQL": siGraphql,
  "Socket.IO": siSocketdotio,
  Zod: siZod,
  Razorpay: siRazorpay,
  Lighthouse: siLighthouse,
  "React Native": siReact,
  Expo: siExpo,
  Firebase: siFirebase,
  Git: siGit,
  GitHub: siGithub,
  Vercel: siVercel,
  Vite: siVite,
  PostgreSQL: siPostgresql,
  Redis: siRedis,
  "TanStack Table": siReactquery,
  "Context API": siReact,
  Recharts: recharts,
  Claude: siClaude,
  "Cashfree Payment Gateway": card,
  "Juspay Payment Gateway": card,
  "Razorpay Payment Gateway": siRazorpay,
  OpenAI: siOpenai,
  Perplexity: siPerplexity,
  Cursor: cursor,
};

const isDarkHex = (hex: string) => {
  const n = parseInt(hex, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 60;
};

export function TechLogo({
  name,
  className = "size-3.5",
  brand = false,
}: {
  name: string;
  className?: string;
  brand?: boolean;
}) {
  const logo = logos[name];
  if (!logo) return null;
  const fill = brand && !isDarkHex(logo.hex) ? `#${logo.hex}` : "currentColor";
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill={fill}>
      <path d={logo.path} />
    </svg>
  );
}

export const hasLogo = (name: string) => name in logos;
