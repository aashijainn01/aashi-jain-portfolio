import { useEffect, useRef, useState } from "react";
import { ArrowUp, FolderGit2, Home, Mail, Menu, Palette, Sparkles, X } from "lucide-react";
import { nav, profile } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "./icons";
import { fireConfetti } from "./hooks";

export function Preloader() {
  const [state, setState] = useState<"show" | "fade" | "gone">("show");
  useEffect(() => {
    const a = setTimeout(() => setState("fade"), 2100);
    const b = setTimeout(() => setState("gone"), 2600);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);
  if (state === "gone") return null;
  return (
    <div className={`fixed inset-0 z-[100] grid place-items-center bg-background transition-opacity duration-500 ${state === "fade" ? "opacity-0" : ""}`}>
      <svg viewBox="0 0 200 120" className="w-56" style={{ animation: "pulse-once 0.5s ease 1.6s" }} aria-label={profile.initials}>
        <defs>
          <linearGradient id="pl" x1="0" x2="1"><stop offset="0" stopColor="var(--primary)" /><stop offset="1" stopColor="var(--accent2)" /></linearGradient>
        </defs>
        <text x="100" y="92" textAnchor="middle" fontFamily="Space Grotesk" fontWeight="800" fontSize="96" fill="url(#pl)" fillOpacity="0" stroke="url(#pl)" strokeWidth="1.5" strokeDasharray="400" strokeDashoffset="400" style={{ animation: "draw 1.1s ease forwards, fill-in 0.5s ease 1.1s forwards" }}>
          {profile.initials}
        </text>
      </svg>
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
  return (
    <div className="fixed left-0 top-0 z-[60] h-[3px] w-full overflow-hidden">
      <div className="h-full bg-tri transition-[width] duration-150" style={{ width: `${p * 100}%`, backgroundSize: "300% 100%", backgroundPosition: `${p * 100}% 0` }} />
    </div>
  );
}

type Mode = "default" | "click" | "view" | "text";
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("default");
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.body.classList.add("has-cursor");
    let x = -100, y = -100, rx = -100, ry = -100, raf = 0;
    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      const t = e.target as HTMLElement;
      if (t.closest("[data-cursor='view']")) setMode("view");
      else if (t.closest("input,textarea")) setMode("text");
      else if (t.closest("a,button,[role='button']")) setMode("click");
      else setMode("default");
    };
    const loop = () => {
      rx += (x - rx) * 0.14; ry += (y - ry) * 0.14;
      if (dot.current) dot.current.style.transform = `translate(${x}px,${y}px)`;
      if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener("mousemove", move);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", move); document.body.classList.remove("has-cursor"); };
  }, []);
  if (!enabled) return null;
  const big = mode === "click" || mode === "view";
  return (
    <>
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[110]">
        <div className={`-translate-x-1/2 -translate-y-1/2 bg-foreground transition-all duration-200 ${mode === "text" ? "h-6 w-0.5 rounded" : "h-2 w-2 rounded-full"} ${big ? "opacity-0" : ""}`} />
      </div>
      <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[109]">
        <div className={`grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border font-mono text-[9px] font-bold tracking-widest transition-all duration-300 ${big ? "h-[60px] w-[60px] border-accent2 bg-accent2/10 text-accent2" : "h-10 w-10 border-primary/40"} ${mode === "text" ? "scale-50 opacity-0" : ""}`}>
          {mode === "click" ? "CLICK" : mode === "view" ? "VIEW" : ""}
        </div>
      </div>
    </>
  );
}

export function Konami() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const seq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let i = 0;
    const on = (e: KeyboardEvent) => {
      i = e.key.toLowerCase() === seq[i]!.toLowerCase() ? i + 1 : e.key === seq[0] ? 1 : 0;
      if (i === seq.length) {
        i = 0;
        setShow(true);
        fireConfetti(3000);
        setTimeout(() => setShow(false), 4500);
      }
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, []);
  if (!show) return null;
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[115] bg-primary" style={{ animation: "flash 0.7s ease forwards" }} />
      <div role="status" className="glass glass-border fixed bottom-24 left-1/2 z-[121] w-[min(92vw,26rem)] -translate-x-1/2 animate-rise rounded-2xl p-4 text-center text-sm shadow-glow md:bottom-10">
        🎉 You found the Easter Egg! Hiring me would be equally smart.
      </div>
    </>
  );
}

const accents = ["violet", "cyan", "rose"] as const;
function AccentToggle() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const saved = accents.indexOf((localStorage.getItem("accent") ?? "violet") as (typeof accents)[number]);
    if (saved > 0) setI(saved);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.accent = accents[i];
    localStorage.setItem("accent", accents[i]!);
  }, [i]);
  return (
    <button onClick={() => setI((i + 1) % 3)} aria-label={`Accent colour: ${accents[i]}. Switch accent`} className="glass grid h-10 w-10 place-items-center rounded-full transition-all hover:shadow-glow-soft">
      <Palette className="h-4 w-4 text-primary transition-colors duration-500" />
    </button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 40);
      let cur = "";
      for (const id of nav) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = id;
      }
      setActive(cur);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);
  return (
    <>
      <header className={`fixed inset-x-0 top-[3px] z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-6"}`}>
        <div className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-2 transition-all duration-500 ${scrolled ? "glass mx-4 md:mx-auto" : ""}`}>
          <a href="#home" className="font-display text-xl font-bold"><span className="text-gradient-2">{profile.initials}</span><span className="text-primary">.</span></a>
          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((n, k) => (
              <a key={n} href={`#${n}`} data-active={active === n} className="link-underline font-mono text-sm capitalize text-muted-foreground transition-colors hover:text-foreground data-[active=true]:text-foreground">
                <span className="text-primary">0{k + 1}.</span> {n}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <AccentToggle />
            <button onClick={() => setOpen(true)} aria-label="Open menu" className="glass grid h-10 w-10 place-items-center rounded-full md:hidden"><Menu className="h-4 w-4" /></button>
          </div>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-[90] flex flex-col bg-background/95 p-6 backdrop-blur-xl md:hidden">
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="glass ml-auto grid h-10 w-10 place-items-center rounded-full"><X className="h-4 w-4" /></button>
          <nav className="mt-16 flex flex-col gap-6">
            {nav.map((n, k) => (
              <a key={n} href={`#${n}`} onClick={() => setOpen(false)} className="animate-rise font-display text-4xl font-bold capitalize" style={{ animationDelay: `${k * 80}ms` }}>
                <span className="font-mono text-base text-primary">0{k + 1}.</span> {n}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

export function MobileNav() {
  const items = [
    { href: "#home", label: "Home", Icon: Home },
    { href: "#projects", label: "Projects", Icon: FolderGit2 },
    { href: "#skills", label: "Skills", Icon: Sparkles },
    { href: "#contact", label: "Contact", Icon: Mail },
  ];
  return (
    <nav className="glass fixed inset-x-3 bottom-3 z-50 flex justify-around rounded-2xl py-2 md:hidden">
      {items.map(({ href, label, Icon }) => (
        <a key={href} href={href} className="flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] text-muted-foreground hover:text-foreground">
          <Icon className="h-5 w-5" />{label}
        </a>
      ))}
    </nav>
  );
}

export function SocialRail() {
  const links = [
    { href: profile.github, label: "GitHub", Icon: GithubIcon },
    { href: profile.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
    { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
  ];
  return (
    <div className="fixed bottom-0 left-6 z-40 hidden flex-col items-center gap-5 md:flex">
      {links.map(({ href, label, Icon }) => (
        <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={label} className="group relative grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-all hover:-translate-y-1 hover:text-primary hover:shadow-glow-soft">
          <Icon className="h-5 w-5" />
          <span className="glass pointer-events-none absolute left-12 whitespace-nowrap rounded-md px-2 py-1 font-mono text-xs opacity-0 transition-opacity group-hover:opacity-100">{label}</span>
        </a>
      ))}
      <span className="h-24 w-px bg-gradient-to-b from-primary to-transparent shadow-glow" />
    </div>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
      className={`fixed bottom-24 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-brand text-primary-foreground shadow-glow transition-all duration-500 md:bottom-8 ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}>
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
