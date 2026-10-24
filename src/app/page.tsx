'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Smartphone,
  Layers,
  Sparkles,
  ExternalLink,
  Mail,
  Phone,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Terminal,
  Cpu,
  Globe,
  Database,
  Menu,
  X,
  FileText,
  ChevronRight,
} from 'lucide-react';

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const MediumIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
);

const TwitterIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const projects = [
    {
      title: "UPI QR Payment Generator",
      category: "Flutter • Fintech • Open Source",
      description:
        "High-performance open-source generator for dynamic UPI payment QR codes. Adopted across Indian fintech apps to streamline contactless merchant payments.",
      link: "https://github.com/AgnelSelvan/upi_payment_qrcode_generator",
      featured: true,
      stats: "Production Grade",
    },
    {
      title: "Voice-Enabled Smart Billing",
      category: "Flutter • AI / ML • Retail",
      description:
        "Intelligent expense tracker and voice billing system designed for Indian retailers using speech recognition to automate invoice and tally generation.",
      link: "https://medium.com/@agnelselvan",
      featured: true,
      stats: "AI Integrated",
    },
    {
      title: "High-Fidelity UI Design Systems",
      category: "Flutter • UI / UX • Templates",
      description:
        "Curated production-ready templates including Crypto Trackers, Task Managers, and Finance Dashboards with fluid 60fps micro-interactions.",
      link: "https://github.com/AgnelSelvan/Flutter-UI-Template",
      featured: false,
      stats: "Design System",
    },
    {
      title: "Offline-First Mobile Architectures",
      category: "MongoDB Realm • SQLite • Mobile",
      description:
        "Architectural blueprint and framework implementing zero-latency offline data storage with background synchronization across complex mobile ecosystems.",
      link: "https://github.com/AgnelSelvan/Blogs",
      featured: false,
      stats: "Distributed Data",
    },
  ];

  const experience = [
    {
      company: "The Family Office",
      role: "Software Engineer",
      period: "2024 — Present",
      location: "Bengaluru, Karnataka",
      type: "Full-Time",
      description:
        "Architecting robust, secure wealth-management mobile platforms. Building reactive state architectures, high-performance financial data visualizations, and bank-grade client security layers.",
      skills: ["Flutter", "Dart", "Fintech", "Mobile Security", "Reactive Architecture"],
    },
    {
      company: "Independent SaaS Creator",
      role: "Founder & Builder",
      period: "2023 — Present",
      location: "Remote",
      type: "Side Ventures",
      description:
        "Actively conceptualizing, designing, and launching independent software products and developer utilities with modern full-stack technologies.",
      skills: ["Next.js", "TypeScript", "Tailwind CSS", "Cloudflare", "Serverless"],
    },
    {
      company: "Neosoft Technologies",
      role: "Software Engineer",
      period: "2021 — 2024",
      location: "Mumbai, Maharashtra",
      type: "3 Years",
      description:
        "Developed cross-platform mobile solutions for global enterprise clients. Engineered dynamic QR payment integrations, offline-first sync pipelines, and optimized build delivery workflows.",
      skills: ["Flutter", "Swift (iOS)", "REST APIs", "CI/CD", "State Management"],
    },
  ];

  const articles = [
    {
      title: "In-App Updates for Flutter Desktop Applications",
      platform: "Medium",
      readTime: "5 min read",
      link: "https://medium.com/@agnelselvan",
    },
    {
      title: "Deep Linking & Build Flavors in Production Mobile Apps",
      platform: "Medium",
      readTime: "7 min read",
      link: "https://medium.com/@agnelselvan",
    },
    {
      title: "Localization Strategies for Scalable Global Applications",
      platform: "Medium",
      readTime: "6 min read",
      link: "https://medium.com/@agnelselvan",
    },
    {
      title: "Cross-Platform Augmented Reality with Custom Shaders",
      platform: "Medium",
      readTime: "8 min read",
      link: "https://medium.com/@agnelselvan",
    },
  ];

  const skillGroups = [
    {
      name: "Mobile Engineering",
      icon: Smartphone,
      items: ["Flutter", "Dart", "Swift (iOS)", "SwiftUI", "Android", "BLoC & Provider", "Shaders & OpenGL"],
    },
    {
      name: "Frontend & Web",
      icon: Globe,
      items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML5 / CSS3"],
    },
    {
      name: "Backend & Databases",
      icon: Database,
      items: ["Node.js", "Python", "Go", "PostgreSQL", "MongoDB Realm", "Firebase", "SQLite"],
    },
    {
      name: "Architecture & DevOps",
      icon: Cpu,
      items: ["Clean Architecture", "Offline-First Sync", "CI/CD Pipelines", "App Store Connect", "Git / GitHub"],
    },
  ];

  return (
    <main className="min-h-screen bg-[#07090E] text-neutral-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Ambient Radial Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] bg-sky-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-emerald-500/8 rounded-full blur-[160px]" />
      </div>

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#07090E]/80 border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2 text-decoration-none">
            <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
              AGNEL<span className="text-amber-400">.S</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Software Engineer
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-medium text-neutral-300">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#expertise" className="hover:text-white transition-colors">Expertise</a>
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#articles" className="hover:text-white transition-colors">Articles</a>
            <Link href="/email-sender" className="hover:text-white transition-colors">Bulk Sender</Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              className="px-4 py-2 rounded-full text-xs font-bold bg-white text-black hover:bg-amber-400 hover:text-black transition-all shadow-sm"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-neutral-200 transition-all active:scale-95 shadow-xs"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Slide-in Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop Blur */}
              <motion.div
                key="home-drawer-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm md:hidden"
                aria-hidden="true"
              />

              {/* Drawer Sheet */}
              <motion.div
                key="home-drawer-sheet"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                className="fixed top-0 right-0 bottom-0 w-[86vw] max-w-[340px] z-[101] bg-[#0A0D15] border-l border-white/[0.1] shadow-2xl flex flex-col justify-between overflow-y-auto md:hidden"
                role="dialog"
                aria-modal="true"
                aria-label="Navigation Menu"
              >
                {/* Header */}
                <div className="p-5 pb-4 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-black flex items-center justify-center font-bold text-xs shadow-xs">
                      AS
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white leading-tight">Agnel Selvan</h3>
                      <p className="text-[11px] font-medium text-neutral-400">Software Engineer</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-neutral-300 hover:text-white border border-white/[0.1] flex items-center justify-center transition active:scale-95"
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="px-4 py-5 flex-1 flex flex-col gap-1.5 overflow-y-auto">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 px-3 pb-1">
                    Navigation
                  </span>
                  {[
                    { name: 'About', href: '#about', icon: Terminal, num: '01' },
                    { name: 'Experience', href: '#experience', icon: Briefcase, num: '02' },
                    { name: 'Expertise & Stack', href: '#expertise', icon: Layers, num: '03' },
                    { name: 'Featured Work', href: '#work', icon: Code2, num: '04' },
                    { name: 'Articles & Writing', href: '#articles', icon: FileText, num: '05' },
                  ].map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <a
                        key={idx}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-neutral-300 hover:text-white bg-white/[0.02] hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08] transition-all group active:scale-[0.99]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-white/[0.05] text-amber-400 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-black transition-colors">
                            <IconComponent className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-semibold">{item.name}</span>
                        </div>
                        <span className="text-[10px] font-mono font-medium text-neutral-500 group-hover:text-neutral-300">
                          {item.num}
                        </span>
                      </a>
                    );
                  })}

                  {/* Biodata & Utilities */}
                  <div className="pt-3 mt-1 border-t border-white/[0.08]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 px-3 pb-1.5 block">
                      Quick Portals
                    </span>
                    <Link
                      href="/biodata"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-neutral-200 hover:text-white bg-gradient-to-r from-rose-500/10 to-amber-500/10 hover:from-rose-500/20 hover:to-amber-500/20 border border-rose-500/20 transition-all group mb-1.5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Matrimonial Biodata</div>
                          <div className="text-[10px] text-neutral-400">Personal &amp; Family Profile</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-rose-400 group-hover:translate-x-0.5 transition-transform" />
                    </Link>

                    <Link
                      href="/email-sender"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3.5 py-2 rounded-xl text-neutral-400 hover:text-neutral-200 bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-white/[0.05] text-neutral-400 flex items-center justify-center">
                          <Mail className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-medium">Bulk Email Sender</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-white/[0.02] border-t border-white/[0.08] flex flex-col gap-3">
                  <a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-white hover:bg-neutral-100 text-black text-xs font-bold shadow-xs transition active:scale-[0.99]"
                  >
                    <span>Get in Touch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  {/* Social Profile Row */}
                  <div className="flex items-center justify-center gap-2 pt-1">
                    <a
                      href="tel:+919167877725"
                      aria-label="Direct Phone Call"
                      className="w-8 h-8 rounded-full border border-white/[0.1] bg-white/[0.05] text-neutral-300 hover:text-white hover:bg-white/[0.1] flex items-center justify-center transition"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="mailto:agnelselvan007@gmail.com"
                      aria-label="Email Agnel"
                      className="w-8 h-8 rounded-full border border-white/[0.1] bg-white/[0.05] text-neutral-300 hover:text-white hover:bg-white/[0.1] flex items-center justify-center transition"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://linkedin.com/in/agnel-selvan"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn Profile"
                      className="w-8 h-8 rounded-full border border-white/[0.1] bg-white/[0.05] text-neutral-300 hover:text-white hover:bg-white/[0.1] flex items-center justify-center transition"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://github.com/AgnelSelvan"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Profile"
                      className="w-8 h-8 rounded-full border border-white/[0.1] bg-white/[0.05] text-neutral-300 hover:text-white hover:bg-white/[0.1] flex items-center justify-center transition"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <p className="text-[10px] text-center text-neutral-500 font-medium">
                    &bull; Bengaluru, India &bull;
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 sm:pt-40 lg:pt-48 pb-20 sm:pb-28 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start gap-4"
          >
            {/* Live Status Chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/[0.06] border border-white/[0.12] text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Software Engineer @ The Family Office &bull; Bengaluru</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mt-2">
              Building High-Performance <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400">
                Mobile &amp; Web Architectures.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-neutral-400 max-w-2xl leading-relaxed mt-2 font-normal">
              Senior Software Engineer with 4+ years of expertise architecting high-scale mobile applications in{' '}
              <span className="text-white font-medium">Flutter</span>,{' '}
              <span className="text-white font-medium">Swift</span>, and full-stack systems with{' '}
              <span className="text-white font-medium">Next.js</span>. Creator of open-source tools with{' '}
              <span className="text-white font-medium">55+ public repositories</span>.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6">
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-white text-black hover:bg-amber-400 hover:text-black transition-all shadow-md group"
              >
                <span>View Selected Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://github.com/AgnelSelvan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] text-white transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub (55+ Repos)</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
              </a>

              <a
                href="https://linkedin.com/in/agnel-selvan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] text-white transition-all"
              >
                <LinkedinIcon className="w-4 h-4 text-sky-400" />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* Key Metric Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-14 pt-10 border-t border-white/[0.08] w-full">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">4+ Years</div>
                <div className="text-xs text-neutral-400 mt-1">Production Experience</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">55+</div>
                <div className="text-xs text-neutral-400 mt-1">Open Source Repos</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">The Family Office</div>
                <div className="text-xs text-neutral-400 mt-1">Current Full-Time Role</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">100k+</div>
                <div className="text-xs text-neutral-400 mt-1">Developer &amp; App Impact</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-20 px-4 sm:px-6 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">About Me</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
                Engineering with craft, precision, and velocity.
              </h2>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
              <p>
                I am a Software Engineer based in Bengaluru, originally born and raised in Mumbai. With a solid
                academic foundation in Computer Engineering from Xavier Institute of Engineering, my career has been
                dedicated to architecting high-grade digital experiences that balance user delight with architectural robustness.
              </p>
              <p>
                Over the past 4+ years, I have specialized in mobile architectures — taking complex fintech, real-time sync,
                and consumer products from concept to hundreds of thousands of users. My technical toolkit centers around{' '}
                <span className="text-white font-medium">Flutter</span>, <span className="text-white font-medium">Swift</span>,{' '}
                <span className="text-white font-medium">Next.js</span>, and offline-first data engines like MongoDB Realm and SQLite.
              </p>
              <p>
                Beyond full-time engineering at The Family Office, I am an active open-source creator with over 55
                repositories, publish technical deep dives on Medium, and build independent SaaS utilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Journey Section */}
      <section id="experience" className="relative z-10 py-20 px-4 sm:px-6 bg-white/[0.015] border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Career Trajectory</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Professional Experience
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2">
              Track record of building fintech platforms, enterprise mobile solutions, and scalable software.
            </p>
          </div>

          <div className="space-y-6">
            {experience.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 sm:p-8 rounded-2xl bg-[#0D111A]/90 border border-white/[0.08] hover:border-amber-400/40 transition-all shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.06]">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-lg sm:text-xl font-bold text-white">{exp.role}</h3>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">
                        {exp.type}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-neutral-300 mt-1">
                      {exp.company} &bull; <span className="text-neutral-400 font-normal">{exp.location}</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-neutral-400">
                    {exp.period}
                  </div>
                </div>

                <p className="text-sm text-neutral-300 leading-relaxed mt-4">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/[0.04]">
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-neutral-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 sm:p-8 rounded-2xl bg-[#0D111A]/90 border border-white/[0.08] hover:border-sky-400/40 transition-all shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.06]">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      Bachelor of Engineering (B.E.) in Computer Engineering
                    </h3>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-sky-400/10 text-sky-400 border border-sky-400/20">
                      Degree
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-neutral-300 mt-1">
                    Xavier Institute of Engineering &bull; <span className="text-neutral-400 font-normal">Mumbai University</span>
                  </div>
                </div>
                <div className="text-xs sm:text-sm font-medium text-neutral-400">
                  2017 — 2021
                </div>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed mt-4">
                Rigorous four-year engineering curriculum covering Data Structures, Algorithms, Distributed Systems, Database Management, and Software Architecture.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Expertise Grid */}
      <section id="expertise" className="relative z-10 py-20 px-4 sm:px-6 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Capabilities</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Technical Expertise
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2">
              End-to-end software engineering stack spanning mobile, web, distributed databases, and cloud workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {skillGroups.map((group, idx) => {
              const IconComp = group.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-6 rounded-2xl bg-[#0D111A]/90 border border-white/[0.08] hover:border-amber-400/30 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{group.name}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item, itemIdx) => (
                      <span
                        key={itemIdx}
                        className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-neutral-200 font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects / Open Source */}
      <section id="work" className="relative z-10 py-20 px-4 sm:px-6 bg-white/[0.015] border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Featured Work</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
                Selected Projects &amp; Open Source
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-lg">
                Production-proven open source tools, frameworks, and architecture templates built for developers.
              </p>
            </div>
            <a
              href="https://github.com/AgnelSelvan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>Explore all 55+ repositories</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj, idx) => (
              <motion.a
                key={idx}
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group p-6 sm:p-7 rounded-2xl bg-[#0D111A]/90 border border-white/[0.08] hover:border-amber-400/50 hover:bg-[#111624] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                      {proj.category}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/[0.06] text-neutral-300 border border-white/[0.08]">
                      {proj.stats}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
                    <span>{proj.title}</span>
                    <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors shrink-0 ml-2" />
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mt-3">
                    {proj.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-neutral-400 group-hover:text-neutral-200">
                  <span>View Repository / Docs</span>
                  <span className="text-amber-400">&rarr;</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Articles & Writing Section */}
      <section id="articles" className="relative z-10 py-20 px-4 sm:px-6 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Publications</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
                Technical Writing &amp; Guides
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2">
                Practical guides and architecture breakdowns published on Medium.
              </p>
            </div>
            <a
              href="https://medium.com/@agnelselvan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>Read on Medium</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="space-y-3">
            {articles.map((art, idx) => (
              <a
                key={idx}
                href={art.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 sm:p-5 rounded-xl bg-[#0D111A]/80 border border-white/[0.06] hover:border-white/20 hover:bg-[#121724] transition-all flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-sm sm:text-base font-semibold text-white group-hover:text-amber-300 transition-colors">
                    {art.title}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-neutral-400 shrink-0">
                  <span className="hidden sm:inline">{art.readTime}</span>
                  <span className="text-amber-400 font-bold group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-24 sm:py-32 px-4 sm:px-6 bg-white/[0.015] border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Connect</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-3">
            Let&apos;s build the next big platform.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-4 max-w-xl mx-auto leading-relaxed">
            Interested in collaborating on high-scale mobile applications, fintech architectures, or consulting? Reach out directly.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:agnelselvan007@gmail.com"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold bg-white text-black hover:bg-amber-400 transition-all shadow-md"
            >
              <Mail className="w-4 h-4" />
              <span>agnelselvan007@gmail.com</span>
            </a>
            <a
              href="tel:+919167877725"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] text-white transition-all"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>+91 91678 77725</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-5 mt-10">
            <a
              href="https://github.com/AgnelSelvan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-neutral-400 hover:text-white transition-all"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/agnel-selvan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-neutral-400 hover:text-white transition-all"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a
              href="https://medium.com/@agnelselvan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Medium"
              className="p-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-neutral-400 hover:text-white transition-all"
            >
              <MediumIcon className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/Agnel04454713"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X"
              className="p-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-neutral-400 hover:text-white transition-all"
            >
              <TwitterIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-10 px-4 sm:px-6 border-t border-white/[0.06] text-xs text-neutral-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-300">Agnel Selvan</span>
            <span>&bull;</span>
            <span>Senior Software Engineer</span>
            <span>&bull;</span>
            <span>Bengaluru / Mumbai</span>
          </div>

          <div>
            &copy; {new Date().getFullYear()} Agnel Selvan &bull; Built with Next.js &amp; Tailwind CSS
          </div>

          <a href="#" className="hover:text-neutral-300 transition-colors">
            Back to Top &uarr;
          </a>
        </div>
      </footer>
    </main>
  );
}
