import { createFileRoute } from "@tanstack/react-router";
import { BackToTop, Cursor, Konami, Navbar, Preloader, ScrollProgress, SocialRail } from "@/components/portfolio/Chrome";
import { About, Contact, Footer, Hero, Journey, Projects, Skills } from "@/components/portfolio/Sections";
import { useRevealAll } from "@/components/portfolio/hooks";

const title = "Aashi Jain — Java Backend Developer";
const description = "Portfolio of Aashi Jain, a Java & Spring Boot backend developer building efficient, scalable, AI-driven solutions.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useRevealAll();
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <Cursor />
      <Konami />
      <Navbar />
      <SocialRail />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
