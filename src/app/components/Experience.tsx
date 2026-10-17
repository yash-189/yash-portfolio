import { About } from "./About";
import { Capabilities } from "./Capabilities";
import { Contact } from "./Contact";
import { DetailsDemo } from "./DetailsDemo";
import { Hero } from "./Hero";
import { Nav } from "./Nav";
import { Projects } from "./Projects";

export function Experience() {
  return (
    <>
      <div className="grain" aria-hidden />
      <Nav />
      <main>
        <Hero />
        <About />
        <section id="details" className="mx-auto max-w-6xl px-6 pb-28">
          <DetailsDemo />
        </section>
        <Projects />
        <Capabilities />
        <Contact />
      </main>
    </>
  );
}
