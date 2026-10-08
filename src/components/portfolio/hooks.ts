import { useEffect, useRef, useState } from "react";

export function useInView<T extends Element>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/** Adds `.in` to every `.reveal*` element once visible (including ones added later). */
export function useRevealAll() {
  useEffect(() => {
    const sel = ".reveal:not(.in), .reveal-left:not(.in), .reveal-right:not(.in), .reveal-3d:not(.in)";
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e?.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.05 });
    const scan = () => document.querySelectorAll(sel).forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
}

/** Pulls an element toward the cursor (max 15px) and springs back on leave. */
export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = Math.max(-15, Math.min(15, (e.clientX - r.left - r.width / 2) * 0.3));
      const dy = Math.max(-15, Math.min(15, (e.clientY - r.top - r.height / 2) * 0.3));
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const leave = () => { el.style.transform = ""; };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
  }, []);
  return ref;
}

/** Digits scramble randomly, then land on the final value. */
export function useScramble(value: number, start: boolean) {
  const [text, setText] = useState("0");
  useEffect(() => {
    if (!start) return;
    const len = String(value).length;
    let n = 0;
    const id = setInterval(() => {
      n++;
      if (n > 22) { setText(String(value)); clearInterval(id); return; }
      setText(Array.from({ length: len }, () => Math.floor(Math.random() * 10)).join(""));
    }, 45);
    return () => clearInterval(id);
  }, [value, start]);
  return text;
}

export function fireConfetti(ms = 3000) {
  const wrap = document.createElement("div");
  wrap.className = "pointer-events-none fixed inset-0 z-[120] overflow-hidden";
  const colors = ["var(--primary)", "var(--accent2)", "var(--accent3)", "var(--success)"];
  for (let i = 0; i < 120; i++) {
    const s = document.createElement("span");
    s.style.cssText = `position:absolute;top:-20px;left:${Math.random() * 100}%;width:8px;height:14px;border-radius:2px;background:${colors[i % 4]};--x:${(Math.random() - 0.5) * 300}px;--r:${Math.random() * 900}deg;animation:confetti ${1.8 + Math.random() * 1.5}s ${Math.random() * (ms / 2000)}s cubic-bezier(.2,.6,.4,1) forwards`;
    wrap.appendChild(s);
  }
  document.body.appendChild(wrap);
  setTimeout(() => wrap.remove(), ms + 2500);
}
