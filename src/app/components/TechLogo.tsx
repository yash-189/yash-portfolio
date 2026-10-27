import {
  siExpo,
  siFigma,
  siLighthouse,
  siNextdotjs,
  siReact,
  siReactquery,
  siRedux,
  siShadcnui,
  siSocketdotio,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

const logos: Record<string, SimpleIcon> = {
  Figma: siFigma,
  React: siReact,
  "Next.js": siNextdotjs,
  TypeScript: siTypescript,
  "Tailwind CSS": siTailwindcss,
  "shadcn/ui": siShadcnui,
  "React Query": siReactquery,
  "Redux Toolkit": siRedux,
  "Socket.IO": siSocketdotio,
  Lighthouse: siLighthouse,
  "React Native": siReact,
  Expo: siExpo,
};

export function TechLogo({ name, className = "size-3.5" }: { name: string; className?: string }) {
  const logo = logos[name];
  if (!logo) return null;
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`${className} fill-current`}>
      <path d={logo.path} />
    </svg>
  );
}
