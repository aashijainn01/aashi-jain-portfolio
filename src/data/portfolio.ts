import codesageImage from "@/assets/codesage.jpg";
import medisphereImage from "@/assets/medisphere.jpg";
import propredictImage from "@/assets/propredict.jpg";
import virtualMouseImage from "@/assets/virtual-mouse.jpg";
import audioAgentImage from "@/assets/audio-agent.jpg";

export const projectImages: Record<string, { src: string; alt: string }> = {
  CodeSage: { src: codesageImage, alt: "AI code review illustrated with a laptop, magnifying lens and connected Git branches" },
  Medisphere: { src: medisphereImage, alt: "Hospital connected to patient records and appointment scheduling modules" },
  "ProPredict AI": { src: propredictImage, alt: "Modern house with property price charts and a location pin" },
  "AI Virtual Mouse": { src: virtualMouseImage, alt: "Hand gesture tracking controlling a glowing mouse pointer" },
  "Audio Customer Support Agent": { src: audioAgentImage, alt: "Customer support headset with an AI audio waveform" },
};

// All editable portfolio content lives here.
export const profile = {
  first: "Aashi",
  last: "Jain",
  initials: "AJ",
  role: "Java Backend Developer",
  roles: ["Java Backend Developer", "Spring Boot Architect", "AI Integration Builder", "Microservices Engineer", "Problem Solver"],
  tagline: "I build things that scale. From microservices to AI-powered systems — I engineer backends that are fast, secure, and intelligent.",
  email: "jaashi017@gmail.com",
  phone: "9074428080",
  github: "https://github.com/aashijainn01",
  linkedin: "https://linkedin.com/in/aashi-jain-b2500a329",
  cv: "#",
};

export const heroStats = ["10 Public Repos", "Active Since Sep 2024", "4 Cloud Certifications"];

export const nav = ["about", "skills", "projects", "achievements", "contact"];

export const bioCards = [
  { icon: "GraduationCap", title: "The Student", front: "B.Tech IT @ Acropolis, 2023–2027", back: "Studying Information Technology at Acropolis Institute of Technology and Research with a CGPA of 76.5." },
  { icon: "Code", title: "The Builder", front: "Microservices, Spring Boot, AI APIs", back: "I design REST APIs and microservices in Spring Boot, and wire LLMs and AI services into real backends." },
  { icon: "Trophy", title: "The Achiever", front: "TCS CodeVita #1535, AWS Certified, Oracle OCI", back: "Global rank 1535 in TCS CodeVita Season 13, AWS Cloud & AI Practitioner, and Oracle OCI Generative AI Professional." },
] as const;

export const stats = [
  { value: 10, suffix: "+", label: "GitHub Repos" },
  { value: 4, suffix: "", label: "Cloud & AI Certs" },
  { value: 1535, suffix: "", label: "TCS Global Rank" },
  { value: 2, suffix: "+", label: "Years Coding" },
];

export type Star = { name: string; x: number; y: number };
export const constellations: { name: string; hue: "primary" | "accent2" | "accent3" | "success"; stars: Star[] }[] = [
  { name: "Core", hue: "primary", stars: [{ name: "Java", x: 470, y: 285 }, { name: "Spring Boot", x: 550, y: 325 }] },
  { name: "Backend Orbit", hue: "accent2", stars: [{ name: "JPA", x: 120, y: 170 }, { name: "REST APIs", x: 210, y: 105 }, { name: "Microservices", x: 320, y: 80 }, { name: "Spring Security", x: 350, y: 190 }, { name: "Hibernate", x: 230, y: 230 }] },
  { name: "Data Layer", hue: "success", stars: [{ name: "MySQL", x: 160, y: 420 }, { name: "H2 Database", x: 270, y: 480 }] },
  { name: "Cloud Ring", hue: "accent2", stars: [{ name: "AWS", x: 700, y: 100 }, { name: "Docker", x: 810, y: 70 }, { name: "Render", x: 870, y: 170 }] },
  { name: "AI Cluster", hue: "accent3", stars: [{ name: "AI Integration", x: 700, y: 430 }, { name: "LLM APIs", x: 810, y: 380 }, { name: "Python", x: 890, y: 470 }, { name: "OpenCV", x: 770, y: 530 }] },
  { name: "Tools Nebula", hue: "primary", stars: [{ name: "Git", x: 400, y: 520 }, { name: "GitHub", x: 460, y: 575 }, { name: "Postman", x: 560, y: 565 }, { name: "OOP", x: 610, y: 500 }, { name: "DSA", x: 500, y: 460 }] },
];

export const categories = ["All", "Spring Boot", "AI & ML", "Microservices", "Python"] as const;

export const projects = [
  { title: "CodeSage", label: "AI & Spring Boot", cats: ["Spring Boot", "AI & ML"], featured: true, grad: ["oklch(0.54 0.25 293)", "oklch(0.45 0.2 270)"], github: "https://github.com/aashijainn01/ai-github-code-reviewer", desc: "An AI-powered code review system that hooks into GitHub pull requests via webhooks, runs LLM analysis, and posts automated, intelligent review comments — like having a senior dev always available.", tags: ["Java", "Spring Boot", "GitHub Webhooks", "LLM APIs", "REST"] },
  { title: "Medisphere", label: "Microservices", cats: ["Spring Boot", "Microservices"], featured: true, grad: ["oklch(0.72 0.13 215)", "oklch(0.6 0.12 180)"], github: "https://github.com/aashijainn01/medisphere-medical-management-system", desc: "A production-grade Medical Center Management Platform built on Microservices architecture with JWT security, API Gateway routing, and services for patients, doctors, appointments, and prescriptions.", tags: ["Java", "Spring Boot", "Spring Security", "MySQL", "Spring Cloud", "Microservices"] },
  { title: "ProPredict AI", label: "AI & Spring Boot", cats: ["Spring Boot", "AI & ML"], featured: false, grad: ["oklch(0.66 0.22 354)", "oklch(0.72 0.17 50)"], github: "https://github.com/aashijainn01/ProPredict-AI", desc: "An AI-powered property analytics platform that predicts property prices using location data and ML models, with a loan recommendation engine and a full analytics dashboard.", tags: ["Java", "Spring Boot", "Hibernate", "MySQL", "REST APIs", "ML"] },
  { title: "AI Virtual Mouse", label: "AI & ML · Python", cats: ["AI & ML", "Python"], featured: false, grad: ["oklch(0.7 0.15 163)", "oklch(0.72 0.13 215)"], github: "https://github.com/aashijainn01/ai-virtual-mouse", desc: "A computer vision system enabling touchless cursor control using real-time hand gesture recognition via MediaPipe — redefining human-computer interaction without a physical mouse.", tags: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI", "Computer Vision"] },
  { title: "Audio Customer Support Agent", label: "AI & ML · Python", cats: ["AI & ML", "Python"], featured: false, grad: ["oklch(0.5 0.22 300)", "oklch(0.66 0.22 354)"], github: "https://github.com/aashijainn01/audio-customer-support-agent", desc: "An intelligent voice-powered customer support agent that processes audio input, understands intent using AI, and delivers natural, context-aware spoken responses in real-time.", tags: ["Python", "AI", "Audio Processing", "NLP"] },
];

export const achievements = [
  { icon: "Medal", hue: "accent3", title: "TCS CodeVita Season 13", detail: "Global Rank #1535", org: "Competitive Programming" },
  { icon: "Cloud", hue: "accent2", title: "AWS Certified", detail: "Cloud Practitioner + AI Practitioner", org: "Amazon Web Services" },
  { icon: "Brain", hue: "primary", title: "Oracle OCI", detail: "Generative AI Professional 2025", org: "Oracle Cloud" },
  { icon: "Cpu", hue: "success", title: "NVIDIA DLI", detail: "Fundamentals of Deep Learning", org: "NVIDIA" },
  { icon: "BookOpen", hue: "accent2", title: "NPTEL", detail: "Programming in Java + Intro to DBMS", org: "IIT / NPTEL" },
] as const;

export const education = [
  { date: "2023 → 2027", role: "B.Tech Information Technology", org: "Acropolis Institute of Technology & Research", score: "CGPA 76.5" },
  { date: "Class 12", role: "Higher Secondary", org: "St. Joseph's Convent Hr. Sec School", score: "72.6%" },
  { date: "Class 10", role: "Secondary School", org: "St. Joseph's Convent Hr. Sec School", score: "85.2%" },
];
