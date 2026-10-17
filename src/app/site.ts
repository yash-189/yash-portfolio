// Site-wide values used by metadata, the share image, robots.txt and the sitemap.

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const site = {
  name: "Yash Saini",
  title: "Yash Saini, Frontend Developer",
  description:
    "Frontend developer who also designs. I build dashboards, admin tools and product UIs with React, Next.js and TypeScript, and sweat the details.",
};
