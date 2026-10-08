import { useEffect, useMemo, useState, type MouseEvent, type ReactNode } from "react";
import * as Lucide from "lucide-react";
import { ArrowDown, ChevronLeft, ChevronRight, Clock, Download, ExternalLink, Loader2, Mail, MapPin, Quote, Send, Star, Briefcase, GraduationCap } from "lucide-react";
import { categories, profile, projects, skills, stats, tech, testimonials, timeline } from "@/data/portfolio";
import { useInView } from "./hooks";
import { GithubIcon } from "./icons";
import { socials } from "./Chrome";

function Label({ children }: { children: ReactNode }) {
  return <p className="reveal mb-4 font-mono text-sm text-primary">// {children}</p>;
}

/* ---------------- HERO ---------------- */
function RoleCycler() {
  const [i, setI] = useState(0);
  const [vis, setVis] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setVis(false);
      setTimeout(() => { setI((n) => (n + 1) % profile.roles.length); setVis(true); }, 450);
    }, 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <span className={`inline-block text-gradient transition-all duration-500 ${vis ? "translate-y-0 opacity-100 blur-0" : "-translate-y-3 opacity-0 blur-sm"}`}>
      {profile.roles[i]}
    </span>
  );
}

const particles = Array.from({ length: 26 }, (_, i) => ({
  left: (i * 37) % 100, top: 40 + ((i * 53) % 60), size: 2 + (i % 3), dur: 12 + (i % 7) * 3, delay: -(i * 1.3),
}));

export function Hero() {
  return (
    <section id="top" className="grain relative flex min-h-screen items-center overflow-hidden">
      <div className="mesh absolute inset-0 opacity-60" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" aria-hidden />
      {particles.map((p, i) => (
        <span key={i} aria-hidden className={`animate-drift absolute rounded-full ${i % 2 ? "bg-cyan shadow-glow-cyan" : "bg-primary shadow-glow"}`}
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s` }} />
      ))}
      <div className="relative mx-auto w-full max-w-7xl px-6 pt-24 md:pl-24">
        <p className="animate-rise font-mono text-sm text-cyan" style={{ animationDelay: "2.3s" }}>Hi, my name is</p>
        <h1 className="mt-4 font-display font-bold leading-[0.9] tracking-tight">
          <span className="animate-rise block text-6xl sm:text-7xl md:text-8xl lg:text-9xl" style={{ animationDelay: "2.4s" }}>{profile.first}</span>
          <span className="animate-rise text-outline block text-6xl sm:text-7xl md:text-8xl lg:text-9xl" style={{ animationDelay: "2.5s" }}>{profile.last}</span>
        </h1>
        <p className="animate-rise mt-8 h-10 font-display text-2xl font-medium sm:text-3xl" style={{ animationDelay: "2.6s" }}><RoleCycler /></p>
        <p className="animate-rise mt-4 max-w-xl text-lg text-muted-foreground" style={{ animationDelay: "2.7s" }}>{profile.tagline}</p>
        <div className="animate-rise mt-10 flex flex-wrap gap-4" style={{ animationDelay: "2.8s" }}>
          <a href="#projects" className="rounded-full bg-primary px-8 py-4 font-medium text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-glow">View My Work</a>
          <a href={profile.cv} className="shimmer inline-flex items-center gap-2 rounded-full border border-primary/50 px-8 py-4 font-medium transition-all duration-300 hover:scale-105 hover:border-cyan">
            <Download className="h-4 w-4" /> Download CV
          </a>
        </div>
      </div>
      <a href="#about" aria-label="Scroll to about" className="absolute bottom-20 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground md:bottom-8">
        <span className="font-mono text-xs">scroll</span>
        <ArrowDown className="animate-bounce-line h-4 w-4" />
      </a>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */
function Counter({ value, suffix, label }: (typeof stats)[number]) {
  const { ref, inView } = useInView<HTMLDivElement>(0.5);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView || value < 0) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / 1600);
      setN(Math.round(value * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <div ref={ref} className="glass rounded-2xl p-5 transition-all hover:shadow-glow">
      <div className="font-display text-4xl font-bold text-gradient">{value < 0 ? suffix : `${n}${suffix}`}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-32 md:pl-24">
      <div className="reveal absolute right-6 top-20 flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs">
        <span className="relative flex h-2 w-2"><span className="absolute h-full w-full animate-ping rounded-full bg-success opacity-75" /><span className="relative h-2 w-2 rounded-full bg-success" /></span>
        Available for freelance
      </div>
      <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <Label>about me</Label>
          <h2 className="reveal text-4xl font-bold sm:text-5xl">More than just a <span className="text-gradient">developer.</span></h2>
          <div className="reveal mt-8 space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>I'm a full stack engineer based in San Francisco who fell in love with the web after building a terrible fan site at age 13. A decade later, I still get the same rush when an idea becomes something people can touch.</p>
            <p>These days I partner with startups and product teams to design and ship fast, accessible, delightful software — from the database schema to the last micro-interaction.</p>
            <p>When I'm not coding you'll find me contributing to open source, sketching UI ideas in Figma, or hunting down the city's best pour-over.</p>
          </div>
          <div className="reveal mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => <Counter key={s.label} {...s} />)}
          </div>
        </div>
        <div className="reveal relative mx-auto aspect-square w-full max-w-sm">
          <div className="animate-blob absolute inset-0 bg-brand opacity-80 blur-2xl" />
          <div className="animate-blob glass relative grid h-full w-full place-items-center overflow-hidden">
            <span className="font-display text-8xl font-bold text-gradient">{profile.initials}</span>
          </div>
          <div className="animate-float glass absolute -bottom-8 -left-6 w-64 rounded-xl p-4 font-mono text-xs shadow-glow">
            <div className="mb-3 flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-coral" /><span className="h-2.5 w-2.5 rounded-full bg-cyan" /><span className="h-2.5 w-2.5 rounded-full bg-success" /></div>
            <p><span className="text-primary">const</span> alex = {"{"}</p>
            <p className="pl-4">loves: <span className="text-cyan">"clean code"</span>,</p>
            <p className="pl-4">coffee: <span className="text-coral">Infinity</span>,</p>
            <p className="pl-4">hireable: <span className="text-success">true</span></p>
            <p>{"}"};</p>
          </div>
        </div>
      </div>
      <div className="reveal mt-28 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee flex w-max gap-6">
          {[...tech, ...tech].map((t, i) => (
            <div key={i} className="glass flex w-32 shrink-0 flex-col items-center gap-2 rounded-2xl py-5 transition-transform duration-300 hover:scale-110">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand font-mono text-sm font-bold text-primary-foreground">{t.slice(0, 2)}</span>
              <span className="text-sm text-muted-foreground">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SKILLS ---------------- */
function SkillCard({ s, i }: { s: (typeof skills)[number]; i: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const Icon = (Lucide as unknown as Record<string, Lucide.LucideIcon>)[s.icon] ?? Lucide.Code;
  return (
    <div ref={ref} className="reveal glass group rounded-3xl p-7 transition-all duration-500 hover:-translate-y-2 hover:border-primary hover:shadow-glow" style={{ transitionDelay: `${i * 60}ms` }}>
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary"><Icon className="h-5 w-5" /></span>
        <h3 className="text-xl font-semibold">{s.name}</h3>
      </div>
      <ul className="mt-6 space-y-4">
        {s.items.map(([name, pct]) => (
          <li key={name}>
            <div className="mb-1.5 flex justify-between text-sm"><span>{name}</span><span className="font-mono text-muted-foreground">{pct}%</span></div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-brand transition-[width] duration-[1400ms] ease-out" style={{ width: inView ? `${pct}%` : "0%" }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-7xl px-6 py-32 md:pl-24">
      <Label>expertise</Label>
      <h2 className="reveal text-4xl font-bold sm:text-5xl">Tools of the <span className="text-gradient">trade.</span></h2>
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((s, i) => <SkillCard key={s.name} s={s} i={i} />)}
      </div>
    </section>
  );
}

/* ---------------- PROJECTS ---------------- */
function ProjectCard({ p }: { p: (typeof projects)[number] }) {
  const [t, setT] = useState("");
  const move = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    setT(`perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`);
  };
  return (
    <article onMouseMove={move} onMouseLeave={() => setT("")} style={{ transform: t }}
      className="glass group overflow-hidden rounded-3xl transition-[transform,box-shadow] duration-300 ease-out hover:shadow-glow animate-rise">
      <div className="relative h-56 overflow-hidden" style={{ background: `linear-gradient(135deg, oklch(0.45 0.2 ${p.hue}), oklch(0.25 0.1 ${p.hue + 40}))` }}>
        <div className="absolute inset-6 top-10 rounded-t-xl border border-b-0 bg-background/40 backdrop-blur transition-transform duration-700 group-hover:-translate-y-2">
          <div className="flex gap-1.5 p-3"><span className="h-2 w-2 rounded-full bg-foreground/40" /><span className="h-2 w-2 rounded-full bg-foreground/40" /><span className="h-2 w-2 rounded-full bg-foreground/40" /></div>
          <div className="space-y-2 px-4"><div className="h-3 w-1/2 rounded bg-foreground/30" /><div className="h-2 w-3/4 rounded bg-foreground/15" /><div className="grid grid-cols-3 gap-2 pt-2"><div className="h-12 rounded bg-foreground/10" /><div className="h-12 rounded bg-foreground/10" /><div className="h-12 rounded bg-foreground/10" /></div></div>
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-background/60 px-3 py-1 font-mono text-xs backdrop-blur">{p.cat}</span>
        {p.featured && <span className="absolute right-4 top-4 rounded-full bg-coral px-3 py-1 font-mono text-xs text-primary-foreground">Featured</span>}
      </div>
      <div className="p-7">
        <h3 className="text-2xl font-bold">{p.title}</h3>
        <p className="mt-2 line-clamp-2 text-muted-foreground">{p.desc}</p>
        <div className="mt-4 flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="rounded-full border px-3 py-1 font-mono text-xs text-muted-foreground">{t}</span>)}</div>
        <div className="mt-6 flex gap-3">
          <a href="#" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:shadow-glow"><ExternalLink className="h-4 w-4" /> Live Demo</a>
          <a href={profile.github} className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all hover:border-cyan hover:text-cyan"><GithubIcon className="h-4 w-4" /> GitHub</a>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const list = useMemo(() => (cat === "All" ? projects : projects.filter((p) => p.cat === cat)), [cat]);
  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-32 md:pl-24">
      <Label>selected work</Label>
      <h2 className="reveal text-4xl font-bold sm:text-5xl">Things I've <span className="text-gradient">Built</span></h2>
      <div className="reveal mt-10 flex flex-wrap gap-3" role="tablist">
        {categories.map((c) => (
          <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
            className={`rounded-full px-5 py-2 text-sm transition-all duration-300 ${cat === c ? "bg-primary text-primary-foreground shadow-glow" : "border text-muted-foreground hover:text-foreground"}`}>{c}</button>
        ))}
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {list.map((p) => <ProjectCard key={p.title + cat} p={p} />)}
      </div>
    </section>
  );
}

/* ---------------- TIMELINE ---------------- */
export function Journey() {
  return (
    <section id="journey" className="mx-auto max-w-6xl px-6 py-32 md:pl-24">
      <Label>journey</Label>
      <h2 className="reveal text-4xl font-bold sm:text-5xl">Where I've <span className="text-gradient">been.</span></h2>
      <div className="relative mt-16">
        <div className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-primary via-cyan to-transparent md:left-1/2" aria-hidden />
        <ol className="space-y-12">
          {timeline.map((e, i) => {
            const left = i % 2 === 0;
            const Icon = e.kind === "edu" ? GraduationCap : Briefcase;
            return (
              <li key={e.role} className="relative md:grid md:grid-cols-2 md:gap-16">
                <span className="absolute left-5 top-6 z-10 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full bg-brand text-primary-foreground shadow-glow md:left-1/2"><Icon className="h-4 w-4" /></span>
                <div className={`${left ? "reveal-left md:col-start-1" : "reveal-right md:col-start-2"} glass ml-14 rounded-3xl p-7 transition-all hover:shadow-glow md:ml-0`}>
                  <p className="font-mono text-xs text-cyan">{e.date}</p>
                  <h3 className="mt-2 text-xl font-bold">{e.role}</h3>
                  <p className="text-muted-foreground">{e.org}</p>
                  <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">{e.points.map((pt) => <li key={pt} className="flex gap-2"><span className="text-primary">▹</span>{pt}</li>)}</ul>
                  <div className="mt-4 flex flex-wrap gap-2">{e.tags.map((t) => <span key={t} className="rounded-full bg-accent px-3 py-1 font-mono text-xs">{t}</span>)}</div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), 5500);
    return () => clearInterval(t);
  }, [paused, n]);
  return (
    <section id="testimonials" className="mx-auto max-w-4xl px-6 py-32 text-center">
      <Label>what they say</Label>
      <h2 className="reveal text-4xl font-bold sm:text-5xl">Kind <span className="text-gradient">words.</span></h2>
      <div className="reveal relative mt-14 overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="flex transition-transform duration-700 [transition-timing-function:var(--ease)]" style={{ transform: `translateX(-${i * 100}%)` }}>
          {testimonials.map((t) => (
            <figure key={t.name} className="w-full shrink-0 px-2">
              <div className="glass relative rounded-3xl p-10 sm:p-14">
                <Quote className="absolute left-8 top-8 h-12 w-12 text-primary/40" />
                <div className="mb-6 flex justify-center gap-1">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current text-coral" />)}</div>
                <blockquote className="text-xl leading-relaxed sm:text-2xl">"{t.text}"</blockquote>
                <figcaption className="mt-8 flex items-center justify-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-brand font-bold text-primary-foreground">{t.name.split(" ").map((w) => w[0]).join("")}</span>
                  <span className="text-left"><span className="block font-semibold">{t.name}</span><span className="text-sm text-muted-foreground">{t.role}, {t.company}</span></span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
      <div className="mt-8 flex items-center justify-center gap-6">
        <button onClick={() => setI((i - 1 + n) % n)} aria-label="Previous testimonial" className="grid h-11 w-11 place-items-center rounded-full border transition-all hover:shadow-glow"><ChevronLeft className="h-5 w-5" /></button>
        <div className="flex gap-2">{testimonials.map((_, k) => <button key={k} onClick={() => setI(k)} aria-label={`Testimonial ${k + 1}`} className={`h-2 rounded-full transition-all duration-500 ${k === i ? "w-8 bg-brand" : "w-2 bg-muted-foreground/40"}`} />)}</div>
        <button onClick={() => setI((i + 1) % n)} aria-label="Next testimonial" className="grid h-11 w-11 place-items-center rounded-full border transition-all hover:shadow-glow"><ChevronRight className="h-5 w-5" /></button>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function Field({ id, label, type = "text", area }: { id: string; label: string; type?: string; area?: boolean }) {
  const cls = "peer w-full rounded-xl border bg-surface/60 px-4 pb-2.5 pt-6 outline-none transition-all duration-300 focus:border-primary focus:shadow-glow";
  return (
    <div className="relative">
      {area ? <textarea id={id} name={id} required rows={5} placeholder=" " className={`${cls} resize-none`} /> : <input id={id} name={id} type={type} required placeholder=" " className={cls} />}
      <label htmlFor={id} className="pointer-events-none absolute left-4 top-4 text-muted-foreground transition-all duration-300 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs">{label}</label>
    </div>
  );
}

export function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const info = [
    { Icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { Icon: MapPin, label: "Location", value: profile.location },
    { Icon: Clock, label: "Availability", value: "Open for new projects" },
  ];
  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-6 py-32 md:pl-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand opacity-20 blur-[120px]" aria-hidden />
      <Label>get in touch</Label>
      <h2 className="reveal text-4xl font-bold sm:text-5xl">Let's Build Something <span className="text-gradient">Amazing</span></h2>
      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div className="reveal-left space-y-4">
          {info.map(({ Icon, label, value, href }) => (
            <a key={label} href={href} className="glass flex items-center gap-4 rounded-2xl p-5 transition-all hover:translate-x-1 hover:shadow-glow">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-primary"><Icon className="h-5 w-5" /></span>
              <span className="min-w-0"><span className="block font-mono text-xs text-muted-foreground">{label}</span><span className="block truncate">{value}</span></span>
            </a>
          ))}
          <div className="flex gap-3 pt-4">
            {socials.map(({ href, label, Icon }) => (
              <a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer" className="grid h-12 w-12 place-items-center rounded-full border transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary hover:shadow-glow"><Icon className="h-5 w-5" /></a>
            ))}
          </div>
        </div>
        <form className="reveal-right glass space-y-5 rounded-3xl p-8"
          onSubmit={(e) => { e.preventDefault(); setState("sending"); setTimeout(() => { setState("sent"); (e.target as HTMLFormElement).reset(); }, 1500); }}>
          <div className="grid gap-5 sm:grid-cols-2"><Field id="name" label="Name" /><Field id="email" label="Email" type="email" /></div>
          <Field id="subject" label="Subject" />
          <Field id="message" label="Message" area />
          <button disabled={state === "sending"} className="shimmer flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-4 font-medium text-primary-foreground transition-all hover:shadow-glow disabled:opacity-70">
            {state === "sending" ? <><Loader2 className="h-5 w-5 animate-spin" /> Sending…</> : state === "sent" ? "Message sent — talk soon!" : <><Send className="h-5 w-5" /> Send Message</>}
          </button>
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative pb-20 md:pb-0">
      <div className="h-px bg-brand" />
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row md:pl-24">
        <a href="#top" className="font-display text-lg font-bold">{profile.first} <span className="text-gradient">{profile.last}</span></a>
        <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          {["about", "projects", "contact"].map((id) => <a key={id} href={`#${id}`} className="link-underline capitalize hover:text-foreground">{id}</a>)}
        </nav>
        <p className="text-sm text-muted-foreground">Built with ❤️ and ☕</p>
      </div>
    </footer>
  );
}
