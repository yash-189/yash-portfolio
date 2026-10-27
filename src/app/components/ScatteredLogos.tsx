import { TechLogo } from "./TechLogo";

const SCATTER = [
  { name: "Figma", top: 13, left: 7, size: 44, rotate: -18 },
  { name: "Tailwind CSS", top: 17, left: 88, size: 30, rotate: 24 },
  { name: "TypeScript", top: 24, left: 62, size: 26, rotate: -9 },
  { name: "Redux Toolkit", top: 29, left: 3, size: 34, rotate: 31 },
  { name: "React", top: 35, left: 93, size: 52, rotate: -27 },
  { name: "Next.js", top: 41, left: 19, size: 28, rotate: 12 },
  { name: "shadcn/ui", top: 48, left: 76, size: 36, rotate: -40 },
  { name: "React Query", top: 55, left: 9, size: 40, rotate: 17 },
  { name: "Expo", top: 61, left: 54, size: 24, rotate: -14 },
  { name: "Socket.IO", top: 68, left: 95, size: 32, rotate: 36 },
  { name: "Lighthouse", top: 74, left: 31, size: 30, rotate: -22 },
  { name: "Figma", top: 79, left: 84, size: 26, rotate: 8 },
];

export function ScatteredLogos() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {SCATTER.map((logo, i) => (
        <span
          key={i}
          className="absolute text-ink-soft/25"
          style={{
            top: `${logo.top}%`,
            left: `${logo.left}%`,
            width: logo.size,
            height: logo.size,
            transform: `translate(-50%, -50%) rotate(${logo.rotate}deg)`,
          }}
        >
          <TechLogo name={logo.name} className="size-full" />
        </span>
      ))}
    </div>
  );
}
