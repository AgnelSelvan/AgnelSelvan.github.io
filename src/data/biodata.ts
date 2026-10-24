export type CareerStep = {
  id: string;
  role: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship" | "Self-employed" | "Degree";
  category?: "work" | "education";
  logo?: string;
  startDate: string; // e.g. "2021-06"
  endDate: string | "Present";
  description: string;
  highlights: string[];
  skills: string[];
  income?: string;
};

export const showIncome = false;

export const career: CareerStep[] = [
  {
    id: "the-family-office",
    role: "Software Engineer",
    company: "The Family Office",
    location: "Bengaluru, India",
    type: "Full-time",
    category: "work",
    startDate: "2024-02",
    endDate: "Present",
    description:
      "Engineering reliable, high-performance mobile applications and seamless financial technology workflows in Bengaluru. Architecting core client features and mission-critical financial journeys.",
    highlights: [
      "Architected scalable mobile workflows with end-to-end type safety and offline caching",
      "Engineered resilient payment and financial report tracking architectures",
      "Optimized rendering pipelines, reducing initial cold start latency and interaction delays",
    ],
    skills: [
      "Flutter",
      "React Native",
      "TypeScript",
      "Fintech",
      "Mobile Architecture",
      "REST APIs",
    ],
    income: "Competitive / Disclosed on Request",
  },
  {
    id: "independent-saas",
    role: "Founder & Independent SaaS Creator",
    company: "Self-Funded Digital Products",
    location: "Bengaluru & Remote",
    type: "Self-employed",
    category: "work",
    startDate: "2023-01",
    endDate: "Present",
    description:
      "Actively architecting, designing, and launching independent software products with long-term compound value. Creator of open-source packages adopted across fintech developer ecosystems.",
    highlights: [
      "Creator of 'upi_payment_qrcode_generator' Flutter library with thousands of merchant checkouts",
      "Building developer tools and production SaaS architectures with Next.js and Cloudflare",
      "Documenting build journeys and architecture insights on @build.with.agnel",
    ],
    skills: [
      "Full-Stack",
      "Next.js",
      "Flutter",
      "Fintech Open Source",
      "SaaS Architecture",
    ],
  },
  {
    id: "neosoft-technologies",
    role: "Software Engineer",
    company: "Neosoft Technologies",
    location: "Mumbai, India",
    type: "Full-time",
    category: "work",
    startDate: "2021-06",
    endDate: "2024-01",
    description:
      "Architected robust cross-platform mobile solutions, client architectures, and enterprise feature sets for high-traffic corporate clients across fintech, retail, and mobile ecosystems.",
    highlights: [
      "Delivered enterprise-grade cross-platform apps for global clients on tight sprint release cycles",
      "Designed reusable UI design systems and state orchestration modules adopted across teams",
      "Mentored junior developers on clean code, unit testing, and reactive architecture paradigms",
    ],
    skills: [
      "Cross-Platform",
      "iOS & Android",
      "Dart / Flutter",
      "Clean Architecture",
      "CI/CD",
    ],
  },
  {
    id: "xavier-engineering",
    role: "B.E. in Computer Engineering",
    company: "Xavier Institute of Engineering",
    location: "Mumbai, India",
    type: "Degree",
    category: "education",
    startDate: "2017-08",
    endDate: "2021-05",
    description:
      "Comprehensive 4-year degree in Computer Engineering focusing on software algorithms, systems design, and foundational computing architecture. Graduated with First Class honors.",
    highlights: [
      "Graduated First Class with Distinction from Mumbai University",
      "Specialized in Data Structures, Algorithms, Distributed Computing, and Database Systems",
      "Led final year technical capstone project on automated intelligence and computer vision",
    ],
    skills: [
      "Computer Engineering",
      "Data Structures",
      "Algorithms",
      "Systems Architecture",
      "First Class",
    ],
  },
];
