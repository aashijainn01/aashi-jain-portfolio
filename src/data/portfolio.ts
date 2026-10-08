// All editable portfolio content lives here.
export const profile = {
  first: "Alex",
  last: "Morgan",
  initials: "AM",
  role: "Full Stack Developer & UI Engineer",
  roles: ["Full Stack Developer", "UI/UX Engineer", "Open Source Contributor", "Problem Solver"],
  tagline: "I craft digital experiences that live at the intersection of logic and design.",
  location: "San Francisco, CA (Open to Remote)",
  email: "hello@alexmorgan.dev",
  github: "https://github.com/alexmorgan",
  linkedin: "https://linkedin.com/in/alexmorgan",
  twitter: "https://x.com/alexmorgan",
  cv: "#",
};

export const nav = ["about", "skills", "projects", "journey", "testimonials", "contact"];

export const stats = [
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Projects Completed" },
  { value: 20, suffix: "+", label: "Happy Clients" },
  { value: -1, suffix: "∞", label: "Cups of Coffee" },
];

export const tech = ["React", "TypeScript", "Node.js", "Python", "PostgreSQL", "Docker", "AWS", "Figma", "Next.js", "GraphQL"];

export const skills = [
  { name: "Frontend", icon: "Monitor", items: [["React / Next.js", 95], ["TypeScript", 92], ["Tailwind CSS", 94]] },
  { name: "Backend", icon: "Server", items: [["Node.js", 90], ["Python", 82], ["GraphQL", 85]] },
  { name: "DevOps & Cloud", icon: "Cloud", items: [["AWS", 80], ["Docker", 85], ["CI/CD", 78]] },
  { name: "Design Tools", icon: "PenTool", items: [["Figma", 90], ["Framer", 75], ["Motion design", 70]] },
  { name: "Databases", icon: "Database", items: [["PostgreSQL", 88], ["Redis", 76], ["MongoDB", 80]] },
  { name: "Soft Skills", icon: "Users", items: [["Communication", 92], ["Mentoring", 85], ["Product sense", 88]] },
] as const;

export const categories = ["All", "Web Apps", "Mobile", "Open Source", "UI/UX"] as const;

export const projects = [
  { title: "NexaFlow", cat: "Web Apps", featured: true, desc: "AI-powered workflow automation SaaS that turns plain-English requests into running pipelines.", tags: ["Next.js", "OpenAI", "Postgres"], hue: 280 },
  { title: "CryptoCanvas", cat: "Web Apps", featured: false, desc: "Real-time crypto dashboard streaming 2,000+ markets with sub-second chart updates.", tags: ["React", "WebSockets", "D3"], hue: 220 },
  { title: "StudioUI", cat: "Open Source", featured: true, desc: "Open source React component library with 4k+ GitHub stars and first-class accessibility.", tags: ["TypeScript", "Radix", "Storybook"], hue: 300 },
  { title: "PulseMetrics", cat: "UI/UX", featured: false, desc: "Developer analytics platform that makes engineering velocity visible without the noise.", tags: ["Figma", "React", "ClickHouse"], hue: 200 },
  { title: "EcoTrack", cat: "Mobile", featured: false, desc: "Carbon footprint tracking app nudging 40k users toward greener daily habits.", tags: ["React Native", "Expo", "Supabase"], hue: 150 },
  { title: "Threadly", cat: "Mobile", featured: false, desc: "Social platform for developers to share snippets, threads and side projects.", tags: ["Flutter", "GraphQL", "Redis"], hue: 20 },
];

export const timeline = [
  { kind: "work", role: "Senior Full Stack Engineer", org: "Vercelion Labs", date: "2024 — Present", points: ["Led rebuild of core dashboard, cutting load time 62%", "Mentored a team of 5 engineers"], tags: ["Next.js", "AWS", "tRPC"] },
  { kind: "work", role: "Frontend Engineer", org: "Pixelwave", date: "2022 — 2024", points: ["Shipped design system used across 9 products", "Raised Lighthouse scores to 98+"], tags: ["React", "TypeScript", "Figma"] },
  { kind: "work", role: "Full Stack Developer", org: "Freelance", date: "2021 — 2022", points: ["Delivered 20+ client projects end-to-end", "Built e-commerce stores doing $1M+ GMV"], tags: ["Node.js", "Postgres", "Stripe"] },
  { kind: "edu", role: "B.S. Computer Science", org: "UC Berkeley", date: "2017 — 2021", points: ["Focus on HCI & distributed systems", "Hackathon winner ×3"], tags: ["Algorithms", "HCI"] },
  { kind: "edu", role: "Interaction Design Certificate", org: "IDF Online", date: "2022", points: ["Advanced UX research and prototyping"], tags: ["UX", "Research"] },
];

export const testimonials = [
  { name: "Sarah Chen", role: "CTO", company: "NexaFlow", text: "Alex took a vague idea and turned it into a product our customers rave about. Rare blend of engineering rigor and taste." },
  { name: "Marcus Webb", role: "Product Lead", company: "Pixelwave", text: "The design system Alex built saved us months. Every component felt considered, documented and fast." },
  { name: "Priya Nair", role: "Founder", company: "EcoTrack", text: "Communicative, proactive and genuinely invested. Our app launched early and hit #3 in its category." },
  { name: "Diego Alvarez", role: "Engineering Manager", company: "Vercelion", text: "Alex raises the bar for the whole team. Code reviews from Alex are basically free masterclasses." },
];
