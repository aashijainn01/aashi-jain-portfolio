import { createFileRoute } from "@tanstack/react-router";
import { BackToTop, Cursor, Konami, Navbar, Preloader, ScrollProgress, SocialRail } from "@/components/portfolio/Chrome";
import { About, Contact, Footer, Hero, Journey, Projects, Skills, Testimonials } from "@/components/portfolio/Sections";
import { useRevealAll } from "@/components/portfolio/hooks";

const title = "Alex Morgan — Full Stack Developer & UI Engineer";
const description = "Portfolio of Alex Morgan, a San Francisco full stack developer crafting digital experiences at the intersection of logic and design.";

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
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
