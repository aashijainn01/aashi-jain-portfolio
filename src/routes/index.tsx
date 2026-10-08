import { createFileRoute } from "@tanstack/react-router";
import { BackToTop, Cursor, Konami, MobileNav, Navbar, Preloader, ScrollProgress, SocialRail } from "@/components/portfolio/Chrome";
import { About, Achievements, Contact, Footer, Hero, Projects, Skills } from "@/components/portfolio/Sections";
import { useRevealAll } from "@/components/portfolio/hooks";

const title = "Aashi Jain — Java Backend Developer & AI Builder";
const description = "Aashi Jain builds scalable Spring Boot microservices and AI-powered backends. Explore projects, skills, and certifications.";

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
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <MobileNav />
    </>
  );
}
