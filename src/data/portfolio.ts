// All editable portfolio content lives here.
export const profile = {
  first: "Aashi",
  last: "Jain",
  initials: "AJ",
  role: "Java Backend Developer",
  roles: ["Java Backend Developer", "Spring Boot Specialist", "AI Integration Enthusiast", "Problem Solver"],
  tagline: "I craft efficient, scalable, and AI-driven backend solutions.",
  email: "jaashi017@gmail.com",
  phone: "9074428080",
  github: "https://github.com/aashijainn01",
  linkedin: "https://linkedin.com/in/aashi-jain-b2500a329",
  cv: "#",
};

export const bio =
  "Motivated software developer specializing in Java backend development and AI-driven applications. Proficient in Spring Boot, REST APIs, and integrating intelligent systems into modern web applications. Passionate about creating efficient, scalable, and data-driven solutions.";

export const nav = ["about", "skills", "projects", "journey", "contact"];

export const stats = [
  { value: 10, suffix: "+", label: "GitHub Repositories" },
  { value: 4, suffix: "", label: "Cloud & AI Certifications" },
  { value: 1535, suffix: "", label: "TCS CodeVita Global Rank" },
  { value: -1, suffix: "∞", label: "Lines of Code" },
];

export const tech = ["Java", "Spring Boot", "MySQL", "Hibernate", "AWS", "Docker", "Git", "REST APIs"];

export const skills = [
  { name: "Programming Languages", icon: "Code", items: ["Java"] },
  { name: "Backend Development", icon: "Server", items: ["Spring Boot", "REST APIs", "Microservices", "API Integration"] },
  { name: "Frameworks & Libraries", icon: "Layers", items: ["Spring Framework", "Spring Data JPA", "Hibernate"] },
  { name: "Database", icon: "Database", items: ["MySQL", "H2 Database"] },
  { name: "Cloud and Deployment", icon: "Cloud", items: ["AWS", "Docker", "Render"] },
  { name: "Tools & Core Skills", icon: "Wrench", items: ["Git", "GitHub", "Postman", "OOP", "Data Structures & Algorithms", "AI Integration"] },
] as const;

export const categories = ["All", "Spring Boot", "AI & ML", "Microservices"] as const;

export const projects = [
  { title: "CodeSage", cats: ["Spring Boot", "AI & ML"], featured: true, desc: "Generative AI-powered code review system that automatically analyzes GitHub pull requests using webhooks and LLMs.", tags: ["Java", "Spring Boot", "GitHub Webhooks", "LLM APIs"], hue: 280 },
  { title: "Medisphere", cats: ["Spring Boot", "Microservices"], featured: true, desc: "Scalable Medical Center Management System using a Microservices Architecture with JWT authentication and API Gateway.", tags: ["Java", "Spring Boot", "Spring Security", "MySQL", "Microservices"], hue: 200 },
  { title: "ProPredict", cats: ["Spring Boot"], featured: false, desc: "Property Price Prediction & Loan Recommendation Platform with premium adjustment logic and analytics dashboard.", tags: ["Java", "Spring Boot", "Hibernate", "REST APIs"], hue: 300 },
  { title: "AI Virtual Mouse", cats: ["AI & ML"], featured: false, desc: "Computer vision-based human-computer interaction system enabling touchless cursor control via hand gestures.", tags: ["Python", "OpenCV", "MediaPipe"], hue: 160 },
  { title: "Audio Customer Support Agent", cats: ["AI & ML"], featured: false, desc: "AI-powered audio agent for seamless customer support interactions.", tags: ["Python", "AI"], hue: 20 },
];

export const timeline = [
  { kind: "edu", role: "B.Tech in Information Technology", org: "Acropolis Institute of Technology and Research", date: "2023 — 2027" },
  { kind: "edu", role: "Higher Secondary", org: "St. Joseph's Convent Hr. Sec School", date: "72.6%" },
];

export const achievements = [
  "AWS Certified Cloud Practitioner & AI Practitioner",
  "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
  "TCS CodeVita Season 13 – Global Rank 1535",
  "NVIDIA Deep Learning Institute (DLI) – Fundamentals of Deep Learning",
  "NPTEL – Programming in Java & Intro to DBMS",
];
