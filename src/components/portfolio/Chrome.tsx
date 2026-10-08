import { useEffect, useRef, useState } from "react";
import { ArrowUp, Mail, Menu, Moon, Sun, X } from "lucide-react";
import { nav, profile } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "./icons";

export function Preloader() {
  const [state, setState] = useState<"show" | "fade" | "gone">("show");
  useEffect(() => {
    const a = setTimeout(() => setState("fade"), 1800);
    const b = setTimeout(() => setState("gone"), 2400);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);
  if (state === "gone") return null;
  return (
    <div className={`fixed inset-0 z-[100] grid place-items-center bg-background transition-opacity duration-500 ${state === "fade" ? "opacity-0" : ""}`}>
      <div className="relative grid h-24 w-24 place-items-center">
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary border-r-cyan" />
        <span className="font-display text-3xl font-bold text-gradient">{profile.initials}</span>
      </div>
    </div>
  );
}

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      setP(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return <div className="fixed left-0 top-0 z-[60] h-0.5 w-full origin-left bg-brand" style={{ transform: `scaleX(${p})` }} />;
}

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.body.classList.add("has-cursor");
    let x = 0, y = 0, rx = 0, ry = 0, raf = 0;
    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      setHover(!!(e.target as HTMLElement).closest("a,button,input,textarea"));
    };
    const loop = () => {
      rx += (x - rx) * 0.15; ry += (y - ry) * 0.15;
      if (dot.current) dot.current.style.transform = `translate(${x}px,${y}px)`;
      if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    loop();
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); document.body.classList.remove("has-cursor"); };
  }, []);
  if (!enabled) return null;
  return (
    <>
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[90]"><div className={`-ml-1 -mt-1 h-2 w-2 rounded-full transition-colors ${hover ? "bg-cyan" : "bg-primary"}`} /></div>
      <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[90]">
        <div className={`rounded-full border transition-all duration-300 ${hover ? "-ml-6 -mt-6 h-12 w-12 border-cyan bg-cyan/10" : "-ml-4 -mt-4 h-8 w-8 border-primary/60"}`} />
      </div>
    </>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [light, setLight] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on, { passive: true });
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    nav.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => { window.removeEventListener("scroll", on); io.disconnect(); };
  }, []);

  useEffect(() => { document.documentElement.classList.toggle("light", light); }, [light]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "glass border-x-0 border-t-0 py-3" : "py-6"}`}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6" aria-label="Main">
          <a href="#top" className="flex items-center gap-3" aria-label="Home">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-brand font-display text-sm font-bold text-primary-foreground shadow-glow">{profile.initials}</span>
            <span className="hidden items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs text-muted-foreground sm:flex">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" /><span className="relative h-2 w-2 rounded-full bg-success" /></span>
              available
            </span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {nav.map((id) => (
              <a key={id} href={`#${id}`} data-active={active === id} className={`link-underline font-mono text-sm capitalize transition-colors ${active === id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>{id}</a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setLight((v) => !v)} aria-label="Toggle colour mode" className="grid h-10 w-10 place-items-center rounded-full border text-muted-foreground transition-all hover:text-foreground hover:shadow-glow">
              {light ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
            <button onClick={() => setOpen(true)} aria-label="Open menu" className="grid h-10 w-10 place-items-center rounded-full border md:hidden"><Menu className="h-4 w-4" /></button>
          </div>
        </nav>
      </header>
      {open && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-background/95 backdrop-blur-xl" role="dialog" aria-modal="true">
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full border"><X className="h-4 w-4" /></button>
          <div className="m-auto flex flex-col items-center gap-6">
            {nav.map((id, i) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="animate-rise font-display text-4xl font-bold capitalize hover:text-gradient" style={{ animationDelay: `${i * 70}ms` }}>{id}</a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export const socials = [
  { href: profile.github, label: "GitHub", Icon: GithubIcon },
  { href: profile.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
];

export function SocialRail() {
  return (
    <div className="fixed z-40 max-md:inset-x-0 max-md:bottom-0 max-md:glass max-md:border-x-0 max-md:border-b-0 md:bottom-0 md:left-8">
      <ul className="flex items-center justify-center gap-6 py-3 md:flex-col md:gap-5 md:py-0">
        {socials.map(({ href, label, Icon }) => (
          <li key={label}>
            <a href={href} aria-label={label} target="_blank" rel="noreferrer" className="block text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:text-primary">
              <Icon className="h-5 w-5" />
            </a>
          </li>
        ))}
        <li aria-hidden className="hidden h-24 w-px bg-gradient-to-b from-primary to-transparent md:block" />
      </ul>
    </div>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <a href="#top" aria-label="Back to top" className={`fixed bottom-20 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-brand text-primary-foreground shadow-glow transition-all duration-500 hover:scale-110 md:bottom-8 ${show ? "" : "pointer-events-none translate-y-6 opacity-0"}`}>
      <ArrowUp className="h-5 w-5" />
    </a>
  );
}

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const CONFETTI = ["bg-primary", "bg-cyan", "bg-coral", "bg-success"];
export function Konami() {
  const [burst, setBurst] = useState(0);
  useEffect(() => {
    let i = 0;
    const on = (e: KeyboardEvent) => {
      i = e.key === KONAMI[i] ? i + 1 : e.key === KONAMI[0] ? 1 : 0;
      if (i === KONAMI.length) { i = 0; setBurst(Date.now()); setTimeout(() => setBurst(0), 3500); }
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, []);
  if (!burst) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[95] overflow-hidden" key={burst}>
      {Array.from({ length: 120 }).map((_, i) => (
        <span key={i} className={`absolute -top-4 h-3 w-2 rounded-sm ${CONFETTI[i % 4]}`}
          style={{ left: `${Math.random() * 100}%`, animation: `confetti ${2 + Math.random() * 1.5}s cubic-bezier(.3,.6,.5,1) ${Math.random() * 0.4}s forwards`, ["--x" as string]: `${(Math.random() - 0.5) * 300}px`, ["--r" as string]: `${Math.random() * 900}deg` }} />
      ))}
    </div>
  );
}
