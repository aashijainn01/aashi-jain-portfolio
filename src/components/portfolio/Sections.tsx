import { useEffect, useMemo, useRef, useState, type MouseEvent as RME } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BookOpen, Brain, Check, Cloud, Code, Cpu, Download, ExternalLink, GraduationCap, Loader2, Mail, Medal, Send, Trophy } from "lucide-react";
import { achievements, bioCards, categories, constellations, education, heroStats, nav, profile, projectImages, projects, stats } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "./icons";
import { fireConfetti, useInView, useMagnetic, useScramble } from "./hooks";

const icons = { GraduationCap, Code, Trophy, Medal, Cloud, Brain, Cpu, BookOpen } as const;
const hueText = { primary: "text-primary", accent2: "text-accent2", accent3: "text-accent3", success: "text-success" } as const;
const hueVar = { primary: "var(--primary)", accent2: "var(--accent2)", accent3: "var(--accent3)", success: "var(--success)" } as const;

function Label({ children }: { children: string }) {
  return <p className="reveal mb-4 font-mono text-sm text-accent2">{children}</p>;
}

function Words({ text, className = "" }: { text: string; className?: string }) {
  return (
    <motion.h2 className={className} initial="h" whileInView="s" viewport={{ once: true, amount: 0.5 }} transition={{ staggerChildren: 0.07 }}>
      {text.split(" ").map((w, i) => (
        <motion.span key={i} className="mr-[0.25em] inline-block" variants={{ h: { opacity: 0, y: 24 }, s: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}>{w}</motion.span>
      ))}
    </motion.h2>
  );
}

/* ---------------- HERO ---------------- */
function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const css = getComputedStyle(document.documentElement);
    const cols = [css.getPropertyValue("--primary").trim(), css.getPropertyValue("--accent2").trim()];
    let w = 0, h = 0, raf = 0, mx = -999, my = -999;
    const resize = () => { w = c.width = c.offsetWidth; h = c.height = c.offsetHeight; };
    resize();
    const ps = Array.from({ length: 45 }, () => {
      const x = Math.random() * w, y = Math.random() * h;
      return { x, y, ox: x, oy: y, r: 1 + Math.random() * 1.5, a: 0.3 + Math.random() * 0.5, c: cols[Math.random() > 0.5 ? 1 : 0] };
    });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy);
        if (d < 150 && d > 0) { const f = (150 - d) / 150 * 6; p.x += (dx / d) * f; p.y += (dy / d) * f; }
        p.x += (p.ox - p.x) * 0.03; p.y += (p.oy - p.y) * 0.03;
        ctx.globalAlpha = p.a; ctx.fillStyle = p.c!;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(tick);
    };
    tick();
    const move = (e: MouseEvent) => { const r = c.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; };
    window.addEventListener("mousemove", move);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", move); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}

type Tok = [string, string];
const K = "text-primary", S = "text-success", C = "text-muted-foreground", A = "text-accent3", P = "text-foreground";
const code: Tok[] = [
  ["@RestController\n@RequestMapping(", A], ['"/api/aashi"', S], [")\n", A],
  ["public class ", K], ["PortfolioController {\n\n", P],
  ["    @Autowired\n", A], ["    private ", K], ["DeveloperService dev;\n\n", P],
  ["    @GetMapping(", A], ['"/skills"', S], [")\n", A],
  ["    public ", K], ["ResponseEntity<List<String>> getSkills() {\n", P],
  ["        return ", K], ["ResponseEntity.ok(\n            dev.getExpertise()  ", P],
  ["// ✨ Spring Boot\n                                // ☁️ AWS Cloud\n                                // 🤖 AI Integration\n                                // 🏗️ Microservices\n", C],
  ["        );\n    }\n}\n", P], ["// Ranked #1535 globally — TCS CodeVita S13", C],
];
const total = code.reduce((n, [t]) => n + t.length, 0);

function Terminal() {
  const [n, setN] = useState(0);
  useEffect(() => {
    let id: ReturnType<typeof setInterval>;
    const start = setTimeout(() => { id = setInterval(() => setN((v) => (v >= total ? (clearInterval(id), v) : v + 2)), 18); }, 3400);
    return () => { clearTimeout(start); clearInterval(id); };
  }, []);
  let left = n;
  return (
    <div className="glass glass-border w-full overflow-hidden rounded-2xl shadow-glow-soft transition-transform duration-700 [transform:perspective(1000px)_rotateX(5deg)_rotateY(-5deg)] hover:[transform:none]">
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-code-red" /><span className="h-3 w-3 rounded-full bg-code-yellow" /><span className="h-3 w-3 rounded-full bg-success" />
        <span className="ml-3 font-mono text-xs text-muted-foreground">aashi@dev:~</span>
      </div>
      <pre className="h-[400px] overflow-hidden p-5 font-mono text-[11px] leading-relaxed sm:text-xs">
        {code.map(([t, cls], i) => {
          if (left <= 0) return null;
          const part = t.slice(0, left); left -= t.length;
          return <span key={i} className={cls}>{part}</span>;
        })}
        <span className="animate-blink text-accent2">▋</span>
      </pre>
    </div>
  );
}

function Roles() {
  const [i, setI] = useState(0);
  useEffect(() => { const id = setInterval(() => setI((v) => (v + 1) % profile.roles.length), 3000); return () => clearInterval(id); }, []);
  return (
    <div className="relative h-8 font-mono text-lg sm:text-xl">
      <AnimatePresence mode="wait">
        <motion.p key={i} initial={{ opacity: 0, y: 10, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -10, filter: "blur(6px)" }} transition={{ duration: 0.45 }} className="absolute">
          <span className="text-accent2">&gt;</span> {profile.roles[i]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export function Hero() {
  const mag = useMagnetic<HTMLAnchorElement>();
  const mag2 = useMagnetic<HTMLAnchorElement>();
  return (
    <section id="home" className="grain relative flex min-h-screen items-center overflow-hidden pb-24 pt-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {(["--primary", "--accent2", "--accent3"] as const).map((v, k) => (
          <div key={v} className="absolute left-1/2 top-1/2 -ml-[300px] -mt-[300px] h-[600px] w-[600px] animate-aurora rounded-full opacity-[0.18] blur-[100px]" style={{ background: `var(${v})`, animationDelay: `${-k * 8.6}s` }} />
        ))}
        <div className="blueprint absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>
      <Particles />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-6 md:pl-24 grid-cols-1 lg:grid-cols-[3fr_2fr] [&>*]:min-w-0">
        <div>
          <p className="animate-rise font-mono text-sm text-accent2 [animation-delay:2.5s]">// hello world, I'm<span className="animate-blink">|</span></p>
          <h1 className="mt-4 animate-rise font-display text-6xl font-black leading-[0.9] tracking-tight [animation-delay:2.6s] sm:text-7xl lg:text-8xl">
            <span className="glitch" data-text={profile.first.toUpperCase()}>{profile.first.toUpperCase()}</span><br />
            <span className="glitch text-gradient-2" data-text={profile.last.toUpperCase()}>{profile.last.toUpperCase()}</span>
          </h1>
          <div className="mt-6 animate-rise [animation-delay:2.8s]"><Roles /></div>
          <p className="mt-6 max-w-xl animate-rise text-lg italic text-muted-foreground [animation-delay:3s]">"{profile.tagline}"</p>
          <div className="mt-10 flex animate-rise flex-wrap gap-4 [animation-delay:3.2s]">
            <a ref={mag} href="#projects" className="group relative inline-flex items-center gap-2 rounded-full bg-cta px-7 py-3.5 font-semibold text-primary-foreground shadow-glow-soft transition-transform duration-300 animate-inner-glow">
              See My Work <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
            </a>
            <a ref={mag2} href={profile.cv} className="group dash-border inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold transition-all duration-300 hover:bg-card hover:backdrop-blur-xl">
              <Download className="h-4 w-4 group-hover:animate-bounce" /> Download Resume
            </a>
          </div>
          <div className="mt-10 flex animate-rise flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-muted-foreground [animation-delay:3.4s]">
            {heroStats.map((s, k) => (
              <span key={s} className="flex items-center gap-4">{k > 0 && <span className="h-3 w-px bg-border" />}<span>{["⭐", "🧑‍💻", "☁️"][k]} {s}</span></span>
            ))}
          </div>
        </div>
        <div className="animate-rise [animation-delay:3s]"><Terminal /></div>
      </div>
      <a href="#about" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] text-muted-foreground md:flex">
        <span className="relative h-14 w-px overflow-hidden"><span className="absolute inset-0 animate-grow-line bg-gradient-to-b from-primary to-accent2" /></span>
        <span className="h-2 w-2 animate-bounce-dot rounded-full bg-accent2 shadow-glow" />
        scroll to explore
      </a>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */
function Stat({ value, suffix, label, start }: { value: number; suffix: string; label: string; start: boolean }) {
  const t = useScramble(value, start);
  return (
    <div>
      <p className="font-display text-4xl font-bold text-gradient-2">{t}{suffix}</p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
      <span className="mt-2 block h-0.5 w-8 bg-primary/60" />
    </div>
  );
}

function FlipCard({ c, k }: { c: (typeof bioCards)[number]; k: number }) {
  const [flip, setFlip] = useState(false);
  const Icon = icons[c.icon];
  return (
    <button onClick={() => setFlip(!flip)} aria-pressed={flip} className="reveal h-40 text-left [perspective:1000px]" style={{ transitionDelay: `${k * 100}ms` }}>
      <div className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${flip ? "[transform:rotateY(180deg)]" : ""}`}>
        <div className="glass glass-border absolute inset-0 rounded-2xl p-5 transition-shadow [backface-visibility:hidden] hover:shadow-glow-soft">
          <Icon className="h-6 w-6 text-primary" />
          <p className="mt-3 font-display text-lg font-bold">{c.title}</p>
          <p className="text-sm text-muted-foreground">{c.front}</p>
          <p className="absolute bottom-3 right-4 font-mono text-[10px] text-accent2">tap to flip ↻</p>
        </div>
        <div className="absolute inset-0 rounded-2xl bg-brand p-5 text-sm leading-relaxed text-primary-foreground [backface-visibility:hidden] [transform:rotateY(180deg)]">{c.back}</div>
      </div>
    </button>
  );
}

export function About() {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const badges = [["☕", "Java", "-top-2 left-6"], ["🌱", "Spring", "top-10 -right-4"], ["☁️", "AWS", "bottom-12 -left-6"], ["🤖", "AI", "-bottom-2 right-10"]] as const;
  return (
    <motion.section id="about" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="mx-auto max-w-6xl px-6 py-32 md:pl-24">
      <div className="grid items-center gap-16 lg:grid-cols-[3fr_2fr]">
        <div>
          <Label>// about_me.json</Label>
          <Words text="Turning complex backend problems into elegant solutions." className="font-display text-4xl font-bold leading-tight sm:text-5xl" />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">{bioCards.map((c, k) => <FlipCard key={c.title} c={c} k={k} />)}</div>
          <div ref={ref} className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">{stats.map((s) => <Stat key={s.label} {...s} start={inView} />)}</div>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-sm">
          <div className="hexagon absolute inset-0 overflow-hidden">
            <div className="absolute -inset-1/4 animate-spin-slow" style={{ background: "conic-gradient(var(--primary), var(--accent2), var(--accent3), var(--primary))" }} />
            <div className="hexagon absolute inset-[3px] grid place-items-center bg-background">
              <div className="grid h-3/5 w-3/5 place-items-center rounded-full bg-tri shadow-glow">
                <span className="font-display text-6xl font-extrabold text-primary-foreground">{profile.initials}</span>
              </div>
            </div>
          </div>
          {badges.map(([e, n, pos], k) => (
            <span key={n} className={`glass absolute ${pos} animate-float rounded-full px-3 py-1.5 font-mono text-xs`} style={{ animationDelay: `${k * 0.7}s` }}>{e} {n}</span>
          ))}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0">
            <div className="animate-orbit [--r:190px] max-sm:[--r:150px]">
              <span className="glass -ml-[90px] -mt-3 flex w-[180px] items-center justify-center gap-2 rounded-full px-3 py-1.5 font-mono text-[9px] tracking-wider">
                <span className="relative flex h-2 w-2"><span className="absolute inset-0 animate-ping-ring rounded-full bg-success" /><span className="h-2 w-2 rounded-full bg-success" /></span>
                AVAILABLE FOR OPPORTUNITIES
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* ---------------- SKILLS ---------------- */
export function Skills() {
  const [hover, setHover] = useState<string | null>(null);
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const core = constellations[0]!.stars[0]!;
  const all = constellations.flatMap((g) => g.stars.map((s) => ({ ...s, group: g.name, hue: g.hue })));
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-32 md:pl-24">
      <Label>// skill_galaxy</Label>
      <Words text="The Arsenal." className="font-display text-4xl font-bold sm:text-5xl" />
      <p className="reveal mt-4 text-muted-foreground">Hover a star to explore each constellation.</p>
      <div ref={ref} className="glass glass-border relative mt-12 overflow-hidden rounded-3xl">
        <svg viewBox="0 0 1000 620" className="w-full" role="img" aria-label="Skill constellation map">
          {constellations.map((g, gi) => (
            <g key={g.name} className="transition-opacity duration-1000" style={{ opacity: inView ? 1 : 0, transitionDelay: `${gi * 150}ms` }}>
              {g.stars.slice(1).map((s, i) => { const a = g.stars[i]!; return <line key={s.name} x1={a.x} y1={a.y} x2={s.x} y2={s.y} stroke={hueVar[g.hue]} strokeOpacity="0.35" strokeWidth="1" />; })}
              {gi > 0 && <line x1={g.stars[0]!.x} y1={g.stars[0]!.y} x2={core.x} y2={core.y} stroke="var(--muted-foreground)" strokeOpacity="0.15" strokeDasharray="4 6" />}
              <text x={g.stars[0]!.x} y={g.stars[0]!.y - 26} fontFamily="JetBrains Mono" fontSize="11" fill={hueVar[g.hue]} opacity="0.7">{g.name}</text>
            </g>
          ))}
          {all.map((s, i) => {
            const on = hover === s.name, isCore = s.group === "Core";
            const r = (isCore ? 9 : 5) * (on ? 1.8 : 1);
            return (
              <g key={s.name} onMouseEnter={() => setHover(s.name)} onMouseLeave={() => setHover(null)} className="cursor-pointer" style={{ opacity: inView ? 1 : 0, transition: `opacity .8s ${i * 40}ms` }}>
                <circle cx={s.x} cy={s.y} r={r * 3} fill={hueVar[s.hue]} opacity={on ? 0.25 : 0.1} style={{ transition: "all .3s" }} />
                <circle cx={s.x} cy={s.y} r={r} fill={hueVar[s.hue]} className="animate-twinkle" style={{ animationDelay: `${(i * 0.37) % 3}s`, transition: "r .3s", filter: `drop-shadow(0 0 6px ${hueVar[s.hue]})` }} />
                <text x={s.x} y={s.y + r + 16} textAnchor="middle" fontSize={isCore ? 15 : 12} fontWeight={isCore ? 700 : 400} fill="var(--foreground)" opacity={on || isCore ? 1 : 0.65}>{s.name}</text>
                {on && (
                  <g>
                    <rect x={s.x - 75} y={s.y - r - 48} width="150" height="34" rx="8" fill="var(--elevated)" stroke={hueVar[s.hue]} />
                    <text x={s.x} y={s.y - r - 26} textAnchor="middle" fontSize="12" fill="var(--foreground)" fontFamily="JetBrains Mono">{s.group}</text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      <div className="mt-10 flex flex-wrap gap-2">
        {all.map((s, i) => (
          <span key={s.name} className="reveal rounded-full border px-4 py-1.5 font-mono text-xs transition-all duration-300 hover:scale-110" style={{ transitionDelay: `${i * 25}ms`, ["--h" as string]: hueVar[s.hue] }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 18px ${hueVar[s.hue]}`; e.currentTarget.style.borderColor = hueVar[s.hue]; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = ""; e.currentTarget.style.borderColor = ""; }}>
            {s.name}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------------- PROJECTS ---------------- */
function ProjectCard({ p }: { p: (typeof projects)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const image = projectImages[p.title];
  const move = (e: RME) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(800px) rotateX(${(0.5 - y) * 12}deg) rotateY(${(x - 0.5) * 12}deg)`;
    el.style.setProperty("--mx", `${x * 100}%`); el.style.setProperty("--my", `${y * 100}%`);
  };
  return (
    <div ref={ref} data-cursor="view" onMouseMove={move} onMouseLeave={() => { if (ref.current) ref.current.style.transform = ""; }} className="group holo glass glass-border flex h-full flex-col overflow-hidden rounded-3xl hover:shadow-glow-soft">
      <div className="relative h-48 shrink-0 overflow-hidden bg-background">
        {image && <img src={image.src} alt={image.alt} loading="lazy" width={1280} height={768} className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none" />}
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full bg-background/60 px-3 py-1 font-mono text-[10px] backdrop-blur">{p.label}</span>
          {p.featured && <span className="rounded-full bg-background/80 px-3 py-1 font-mono text-[10px] font-bold text-code-yellow">★ FEATURED</span>}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl font-bold text-gradient-2">{p.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.desc}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">{p.tags.map((t) => <span key={t} className="rounded-full bg-accent px-2.5 py-0.5 font-mono text-[10px]">{t}</span>)}</div>
        <div className="mt-auto flex items-center justify-between border-t pt-4 text-sm">
          <span className="flex items-center gap-1.5 text-muted-foreground/60" title="Live demo coming soon"><ExternalLink className="h-4 w-4" /> Live Demo</span>
          <a href={p.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 font-semibold transition-colors hover:text-accent2"><GithubIcon className="h-4 w-4" /> GitHub</a>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const list = useMemo(() => projects.filter((p) => cat === "All" || (p.cats as readonly string[]).includes(cat)), [cat]);
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-32 md:pl-24">
      <Label>// selected_work</Label>
      <motion.h2 className="font-display text-4xl font-bold sm:text-5xl" initial="h" whileInView="s" viewport={{ once: true }} transition={{ staggerChildren: 0.04 }}>
        {"Things I've Built".split("").map((ch, i) => <motion.span key={i} className="inline-block whitespace-pre" variants={{ h: { opacity: 0, y: 30, rotate: 10 }, s: { opacity: 1, y: 0, rotate: 0 } }}>{ch}</motion.span>)}
      </motion.h2>
      <div className="mt-10 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`relative rounded-full px-5 py-2 text-sm transition-colors ${cat === c ? "text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"}`}>
            {cat === c && <motion.span layoutId="tab" className="absolute inset-0 rounded-full bg-brand shadow-glow-soft" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
            <span className="relative">{c}</span>
          </button>
        ))}
      </div>
      <motion.div layout className="-mx-6 mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p, k) => (
            <motion.div key={p.title} layout initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0, transition: { delay: k * 0.08 } }} exit={{ opacity: 0, scale: 0.9 }} className="w-[85%] shrink-0 snap-center md:w-auto">
              <ProjectCard p={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

/* ---------------- ACHIEVEMENTS ---------------- */
export function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-6xl px-6 py-32 md:pl-24">
      <Label>// trophy_wall</Label>
      <h2 className="reveal font-display text-4xl font-bold sm:text-5xl"><span className="shimmer-text">Certifications &</span> <span className="text-gradient">Recognition</span></h2>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, k) => {
          const Icon = icons[a.icon];
          return (
            <div key={a.title} className="reveal-3d [perspective:900px]" style={{ transitionDelay: `${k * 100}ms` }}>
              <div className="shimmer glass rounded-2xl border p-6 transition-transform duration-500 hover:[transform:rotateY(15deg)]" style={{ borderColor: `color-mix(in oklab, ${hueVar[a.hue]} 50%, transparent)`, boxShadow: `0 0 24px -10px ${hueVar[a.hue]}` }}>
                <Icon className={`h-8 w-8 ${hueText[a.hue]}`} />
                <h3 className="mt-4 font-display text-lg font-bold">{a.title}</h3>
                <p className="mt-1 text-sm">{a.detail}</p>
                <p className="mt-3 font-mono text-xs italic text-muted-foreground">{a.org}</p>
              </div>
            </div>
          );
        })}
      </div>

      <h3 id="journey" className="reveal mt-24 flex items-center gap-3 font-display text-2xl font-bold"><GraduationCap className="h-6 w-6 text-accent2" /> Education</h3>
      <div className="relative mt-12">
        <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-gradient-to-r from-primary via-accent2 to-accent3 md:block" aria-hidden />
        <div className="absolute bottom-0 left-[7px] top-0 w-px bg-gradient-to-b from-primary via-accent2 to-accent3 md:hidden" aria-hidden />
        <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
          {education.map((e, k) => (
            <li key={e.role} className="reveal relative pl-10 md:pl-0 md:pt-10" style={{ transitionDelay: `${k * 150}ms` }}>
              <span className="absolute left-0 top-0 grid h-4 w-4 place-items-center">
                <span className="absolute inset-0 animate-ping-ring rounded-full bg-accent2" />
                <span className="h-4 w-4 rounded-full bg-brand shadow-glow" />
              </span>
              <p className="font-mono text-xs text-accent2">{e.date}</p>
              <h4 className="mt-2 text-lg font-bold">{e.role}</h4>
              <p className="text-sm text-muted-foreground">{e.org}</p>
              <span className="mt-3 inline-block rounded-full bg-accent px-3 py-1 font-mono text-xs">{e.score}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function Field({ id, label, type = "text", area, value, onChange }: { id: string; label: string; type?: string; area?: boolean; value: string; onChange: (v: string) => void }) {
  const cls = "peer w-full rounded-xl border bg-background/40 px-4 pb-2.5 pt-6 text-sm outline-none transition-all focus:border-primary focus:shadow-glow-soft";
  return (
    <div className="relative">
      {area
        ? <textarea id={id} required rows={5} maxLength={600} placeholder=" " value={value} onChange={(e) => onChange(e.target.value)} className={`${cls} resize-none`} />
        : <input id={id} type={type} required placeholder=" " value={value} onChange={(e) => onChange(e.target.value)} className={cls} />}
      <label htmlFor={id} className="pointer-events-none absolute left-4 top-2 font-mono text-[10px] text-primary transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-muted-foreground peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-primary">{label}</label>
      {area && <span className="absolute bottom-2 right-3 font-mono text-[10px] text-muted-foreground">{value.length}/600</span>}
    </div>
  );
}

export function Contact() {
  const [f, setF] = useState({ name: "", email: "", subject: "", message: "" });
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const set = (k: keyof typeof f) => (v: string) => setF({ ...f, [k]: v });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    setTimeout(() => { setState("sent"); fireConfetti(1500); setF({ name: "", email: "", subject: "", message: "" }); setTimeout(() => setState("idle"), 3500); }, 1500);
  };
  const items = [
    { href: `mailto:${profile.email}`, label: profile.email, Icon: Mail },
    { href: profile.linkedin, label: "linkedin.com/in/aashi-jain-b2500a329", Icon: LinkedinIcon },
    { href: profile.github, label: "github.com/aashijainn01", Icon: GithubIcon },
  ];
  return (
    <section id="contact" className="relative overflow-hidden py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -ml-[300px] -mt-[300px] h-[600px] w-[600px] animate-blob bg-primary/25 blur-[100px]" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 md:pl-24">
        <Label>// open_portal</Label>
        <Words text="Let's Build Something Amazing Together" className="max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl" />
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="reveal-left glass glass-border flex flex-col rounded-3xl p-8">
            <span className="font-display text-6xl font-black text-gradient">{profile.initials}</span>
            <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-xs text-success">
              <span className="relative flex h-2 w-2"><span className="absolute inset-0 animate-ping-ring rounded-full bg-success" /><span className="h-2 w-2 rounded-full bg-success" /></span>
              Available for opportunities
            </span>
            <div className="mt-8 space-y-3">
              {items.map(({ href, label, Icon }) => (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group flex items-center gap-4 rounded-xl p-3 transition-all hover:translate-x-2 hover:bg-accent">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand text-primary-foreground"><Icon className="h-4 w-4" /></span>
                  <span className="break-all text-sm">{label}</span>
                </a>
              ))}
            </div>
            <p className="mt-auto pt-8 font-mono text-xs text-muted-foreground">Let's connect</p>
            <div className="mt-3 flex gap-3">
              <a href={profile.github} target="_blank" rel="noreferrer" className="group glass flex items-center gap-2 rounded-full px-5 py-2.5 text-sm hover:shadow-glow-soft"><GithubIcon className="h-4 w-4 group-hover:animate-bounce" /> GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="group glass relative flex items-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-sm">
                <span className="absolute inset-0 -translate-x-full bg-brand transition-transform duration-500 group-hover:translate-x-0" />
                <LinkedinIcon className="relative h-4 w-4" /><span className="relative">LinkedIn</span>
              </a>
            </div>
          </div>
          <form onSubmit={submit} className="reveal-right glass glass-border space-y-4 rounded-3xl p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="name" label="Name" value={f.name} onChange={set("name")} />
              <Field id="email" label="Email" type="email" value={f.email} onChange={set("email")} />
            </div>
            <Field id="subject" label="Subject" value={f.subject} onChange={set("subject")} />
            <Field id="message" label="Message" area value={f.message} onChange={set("message")} />
            <button disabled={state !== "idle"} className="shimmer flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-4 font-semibold text-primary-foreground shadow-glow-soft transition-all disabled:opacity-90">
              {state === "idle" && <><Send className="h-4 w-4" /> Send Message</>}
              {state === "sending" && <Loader2 className="h-5 w-5 animate-spin" />}
              {state === "sent" && <><Check className="h-5 w-5" /> Message sent!</>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
export function Footer() {
  const links = [["Home", "home"], ["About", "about"], ["Projects", "projects"], ["Contact", "contact"]];
  return (
    <footer className="relative px-6 pb-28 pt-10 md:pb-10 md:pl-24">
      <div className="absolute inset-x-0 top-0 h-px bg-tri" />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 text-sm text-muted-foreground md:flex-row">
        <p><span className="font-display font-bold text-foreground">{profile.first} {profile.last}</span> · © 2026</p>
        <nav className="flex gap-6">{links.map(([l, h]) => <a key={h} href={`#${h}`} className="link-underline hover:text-foreground">{l}</a>)}</nav>
        <p>Crafted with Java ☕ + React ⚛️ + ❤️</p>
      </div>
      <span className="sr-only">{nav.join(", ")}</span>
    </footer>
  );
}
