'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CareerSection from '@/components/career/CareerSection';
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, type Variants } from 'framer-motion';
import {
  Phone,
  Mail,
  MessageCircle,
  ExternalLink,
  ArrowRight,
  Code2,
  Layers,
  Globe,
  Database,
  Cpu,
  Smartphone,
  Menu,
  X,
  ChevronRight,
  FileText,
  Sparkles,
  Terminal,
} from 'lucide-react';

const GithubIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const InstagramIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const MediumIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
);

const TwitterIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPhotoColored, setIsPhotoColored] = useState(false);
  const [isAgnelHovered, setIsAgnelHovered] = useState(false);
  const [isAgnelHighlighted, setIsAgnelHighlighted] = useState(false);
  const [isShimmering, setIsShimmering] = useState(false);
  const [cursorHovered, setCursorHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const isAgnelActive = isAgnelHovered || isAgnelHighlighted;

  // Timed shimmer reveal after 2 seconds: transitions photo to color and highlights "Agnel"
  useEffect(() => {
    let shimmerEndTimer: NodeJS.Timeout;
    const triggerTimer = setTimeout(() => {
      setIsShimmering(true);
      setIsPhotoColored(true);
      setIsAgnelHighlighted(true);

      shimmerEndTimer = setTimeout(() => {
        setIsShimmering(false);
      }, 1800);
    }, 2000);

    return () => {
      clearTimeout(triggerTimer);
      if (shimmerEndTimer) clearTimeout(shimmerEndTimer);
    };
  }, []);

  // Mouse cursor follower coordinates & springs
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorXSpring = useSpring(cursorX, { damping: 28, stiffness: 450 });
  const cursorYSpring = useSpring(cursorY, { damping: 28, stiffness: 450 });

  // Top scroll progress bar
  const { scrollYProgress } = useScroll();
  const scrollProgressScale = useSpring(scrollYProgress, { damping: 30, stiffness: 200 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const handleDown = () => setIsMouseDown(true);
    const handleUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [cursorX, cursorY]);

  // Scroll listener for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Mouse parallax handler for Hero section
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePosition({ x, y });
  };

  const firstName = "AGNEL";
  const lastName = "SELVAN";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', damping: 20, stiffness: 100 },
    },
  };

  const projects = [
    {
      title: "UPI QR Payment Generator",
      category: "Flutter • Fintech • Open Source",
      description:
        "High-performance open-source generator for dynamic UPI payment QR codes. Adopted across Indian fintech apps to streamline contactless merchant payments.",
      link: "https://github.com/AgnelSelvan/upi_payment_qrcode_generator",
      stats: "Production Grade",
    },
    {
      title: "Voice-Enabled Smart Billing",
      category: "Flutter • AI / ML • Retail",
      description:
        "Intelligent expense tracker and voice billing system designed for Indian retailers using speech recognition to automate invoice and tally generation.",
      link: "https://medium.com/@agnelselvan",
      stats: "AI Integrated",
    },
    {
      title: "High-Fidelity UI Design Systems",
      category: "Flutter • UI / UX • Templates",
      description:
        "Curated production-ready templates including Crypto Trackers, Task Managers, and Finance Dashboards with fluid 60fps micro-interactions.",
      link: "https://github.com/AgnelSelvan/Flutter-UI-Template",
      stats: "Design System",
    },
    {
      title: "Offline-First Mobile Architectures",
      category: "MongoDB Realm • SQLite • Mobile",
      description:
        "Architectural blueprint and framework implementing zero-latency offline data storage with background synchronization across complex mobile ecosystems.",
      link: "https://github.com/AgnelSelvan/Blogs",
      stats: "Distributed Data",
    },
  ];

  const articles = [
    {
      title: "In-App Updates for Flutter Desktop Applications",
      readTime: "5 min read",
      link: "https://medium.com/@agnelselvan",
    },
    {
      title: "Deep Linking & Build Flavors in Production Mobile Apps",
      readTime: "7 min read",
      link: "https://medium.com/@agnelselvan",
    },
    {
      title: "Localization Strategies for Scalable Global Applications",
      readTime: "6 min read",
      link: "https://medium.com/@agnelselvan",
    },
    {
      title: "Cross-Platform Augmented Reality with Custom Shaders",
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
      name: "Frontend & Web Systems",
      icon: Globe,
      items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML5 / CSS3"],
    },
    {
      name: "Backend & Distributed Data",
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
    <div className="min-h-screen bg-[#FBF7F8] text-[#111827]">
      {/* Creative Animation: Global Top Scroll Progress Bar */}
      <motion.div
        style={{ scaleX: scrollProgressScale }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 origin-left z-[9999] pointer-events-none"
      />

      {/* Precision contact-centered custom cursor system */}
      <div className="cursor-canvas-fixed">
        {/* Outer Spring Follower Ring */}
        <motion.div
          className="cursor-outer-spring"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
          }}
        >
          <motion.div
            animate={{
              width: cursorHovered ? 46 : 32,
              height: cursorHovered ? 46 : 32,
              borderColor: cursorHovered ? '#fd8d00' : 'rgba(17, 24, 39, 0.75)',
              backgroundColor: cursorHovered ? 'rgba(253, 141, 0, 0.08)' : 'transparent',
              scale: isMouseDown ? 0.88 : cursorHovered ? 1.12 : 1,
            }}
            transition={{ type: 'spring', damping: 24, stiffness: 360 }}
            className="cursor-ring-shape"
          />
        </motion.div>

        {/* Real-time Precision Contact Center Dot */}
        <motion.div
          className="cursor-inner-dot-wrapper"
          style={{
            x: cursorX,
            y: cursorY,
          }}
        >
          <motion.div
            animate={{
              scale: cursorHovered ? 0 : 1,
              opacity: cursorHovered ? 0 : 1,
            }}
            transition={{ duration: 0.12 }}
            className="cursor-precision-dot"
          />
        </motion.div>
      </div>

      {/* 01. STICKY NAVBAR */}
      <header className={`bio-navbar print:hidden ${isScrolled ? 'scrolled' : ''}`}>
        <div className="bio-container nav-inner">
          {/* Logo / Initials */}
          <Link href="/" className="nav-logo-box">
            <div className="nav-avatar-pill">
              AS
            </div>
            <div className="flex flex-col">
              <span className="nav-title">
                Agnel Selvan
              </span>
              <span className="nav-subtitle">
                Software Engineer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="nav-links-desktop">
            <a href="#about" className="nav-link-item" onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)}>About</a>
            <a href="#experience" className="nav-link-item" onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)}>Experience</a>
            <a href="#expertise" className="nav-link-item" onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)}>Stack</a>
            <a href="#work" className="nav-link-item" onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)}>Work</a>
            <a href="#articles" className="nav-link-item" onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)}>Writing</a>
            <a href="#contact" className="nav-link-item" onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)}>Contact</a>
          </nav>

          {/* Right Action Button */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="btn-pill-black"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              Let&apos;s Connect
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full bg-white/80 border border-neutral-200/80 text-neutral-800 hover:bg-white transition-all shadow-2xs active:scale-95 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop Blur Overlay */}
              <motion.div
                key="mobile-drawer-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 z-[100] bg-neutral-950/40 backdrop-blur-sm lg:hidden"
                aria-hidden="true"
              />

              {/* Slide-in Drawer Sheet */}
              <motion.div
                key="mobile-drawer-sheet"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                className="fixed top-0 right-0 bottom-0 w-[88vw] max-w-[360px] z-[101] bg-[#FAF5F6] border-l border-[#EADFE2] shadow-2xl flex flex-col justify-between overflow-y-auto lg:hidden"
                role="dialog"
                aria-modal="true"
                aria-label="Navigation Menu"
              >
                {/* Drawer Header */}
                <div className="px-6 py-5 border-b border-[#E8DFE2]/80 flex items-center justify-between bg-white/70">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                      AS
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-neutral-900 leading-tight">Agnel Selvan</h3>
                      <p className="text-xs font-medium text-neutral-500">Software Engineer &bull; Portfolio</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition active:scale-95 cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Drawer Navigation Links */}
                <div className="px-5 py-6 flex-1 flex flex-col gap-2 overflow-y-auto">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 px-3 pb-1">
                    Navigation
                  </span>
                  {[
                    { name: 'About Agnel', href: '#about', icon: Terminal, num: '01' },
                    { name: 'Career & Experience', href: '#experience', icon: Layers, num: '02' },
                    { name: 'Capabilities & Stack', href: '#expertise', icon: Cpu, num: '03' },
                    { name: 'Featured Work', href: '#work', icon: Code2, num: '04' },
                    { name: 'Technical Articles', href: '#articles', icon: FileText, num: '05' },
                    { name: 'Get in Touch', href: '#contact', icon: Phone, num: '06' },
                  ].map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <a
                        key={idx}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-between px-4 py-3 rounded-2xl text-neutral-800 hover:text-neutral-950 bg-white/70 hover:bg-white border border-neutral-200/60 shadow-2xs transition-all group active:scale-[0.99] cursor-pointer"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-9 h-9 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center group-hover:bg-neutral-900 group-hover:text-white transition-colors shrink-0">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <span className="text-[13.5px] font-semibold">{item.name}</span>
                        </div>
                        <span className="text-xs font-mono font-medium text-neutral-400 group-hover:text-neutral-600">
                          {item.num}
                        </span>
                      </a>
                    );
                  })}

                  {/* Biodata & Utilities */}
                  <div className="pt-4 mt-2 border-t border-[#E8DFE2]/80">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 px-3 pb-1.5 block">
                      Quick Portals
                    </span>

                    <Link
                      href="/email-sender"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 rounded-2xl text-neutral-600 hover:text-neutral-900 bg-white/70 hover:bg-white border border-neutral-200/60 shadow-2xs transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-9 h-9 rounded-xl bg-neutral-100 text-neutral-600 flex items-center justify-center shrink-0">
                          <Mail className="w-4 h-4" />
                        </div>
                        <span className="text-[13px] font-medium">Bulk Email Sender</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Drawer Footer */}
                <div className="p-5 bg-white/80 border-t border-[#E8DFE2]/80 flex flex-col gap-3.5">
                  <a
                    href="#contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2.5 py-3 px-5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold shadow-xs transition active:scale-[0.99] cursor-pointer"
                  >
                    <span>Let&apos;s Connect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  {/* Social Profile Row */}
                  <div className="flex items-center justify-center gap-2.5 pt-1">
                    <a
                      href="https://github.com/AgnelSelvan"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Profile"
                      className="w-10 h-10 rounded-full border border-neutral-200/90 bg-white text-neutral-700 flex items-center justify-center hover:bg-neutral-50 transition shadow-2xs cursor-pointer"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="https://linkedin.com/in/agnel-selvan"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn Profile"
                      className="w-10 h-10 rounded-full border border-neutral-200/90 bg-white text-neutral-700 flex items-center justify-center hover:bg-neutral-50 transition shadow-2xs cursor-pointer"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="https://www.instagram.com/build.with.agnel"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram Profile"
                      className="w-10 h-10 rounded-full border border-neutral-200/90 bg-white text-neutral-700 flex items-center justify-center hover:bg-neutral-50 transition shadow-2xs cursor-pointer"
                    >
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="https://medium.com/@agnelselvan"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Medium Profile"
                      className="w-10 h-10 rounded-full border border-neutral-200/90 bg-white text-neutral-700 flex items-center justify-center hover:bg-neutral-50 transition shadow-2xs cursor-pointer"
                    >
                      <MediumIcon className="w-4 h-4" />
                    </a>
                  </div>

                  <p className="text-[11px] text-center text-neutral-400 font-medium">
                    &bull; Bengaluru, India &bull;
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* 02. HERO SECTION */}
      <section
        id="hero"
        className="bio-hero-section print:hidden"
        onMouseMove={handleMouseMove}
      >
        <div className="hero-glow" />

        {/* 1. HUGE NAME (Behind photo) */}
        <div className="hero-name-wrapper">
          <motion.div
            style={{
              x: mousePosition.x * -18,
              y: mousePosition.y * -14,
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          >
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="hero-huge-name"
            >
              <span
                className={`hero-name-agnel ${isAgnelActive ? 'active' : ''} ${isShimmering ? 'shimmering' : ''}`}
                onMouseEnter={() => {
                  setIsAgnelHovered(true);
                  setCursorHovered(true);
                }}
                onMouseLeave={() => {
                  setIsAgnelHovered(false);
                  setCursorHovered(false);
                }}
              >
                {firstName.split('').map((char, index) => (
                  <motion.span
                    key={`agnel-${index}`}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>

              <motion.span
                variants={letterVariants}
                className="inline-block"
              >
                {'\u00A0'}
              </motion.span>

              <span
                className="hero-name-selvan"
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
              >
                {lastName.split('').map((char, index) => (
                  <motion.span
                    key={`selvan-${index}`}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </motion.h1>
          </motion.div>
        </div>

        {/* 2. CENTER PHOTO (transparent PNG cutout) */}
        <div className="hero-photo-anchor">
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{
              y: mousePosition.y * 22,
              x: mousePosition.x * 28,
              opacity: 1,
            }}
            transition={{
              y: { type: 'spring', damping: 22, stiffness: 110 },
              x: { type: 'spring', damping: 22, stiffness: 110 },
              opacity: { duration: 0.9, delay: 0.25, ease: 'easeOut' },
            }}
            className={`hero-photo-box ${isPhotoColored ? 'colored' : ''}`}
            onClick={() => setIsPhotoColored((prev) => !prev)}
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
            title="Hover or tap to view in color"
          >
            <div className="relative" style={{ position: 'relative' }}>
              <Image
                src="/mine/main-v1.png"
                alt="Agnel Selvan"
                width={520}
                height={680}
                priority
                loading="eager"
                className="hero-photo-img"
              />
              {/* Photo-focused diagonal shimmer sweep */}
              <div className={`hero-photo-shimmer-wrapper ${isShimmering ? 'active' : ''}`} aria-hidden="true">
                <div className="hero-photo-shimmer-beam" />
              </div>
              {/* Bottom anchor fade overlay */}
              <div className="hero-photo-fade" />
            </div>
          </motion.div>
        </div>

        {/* Spacer for top alignment */}
        <div />

        {/* 4. BOTTOM-LEFT BLOCK */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="hero-bottom-left"
        >
          <div className="status-indicator">
            <span className="pulse-dot" />
            <span className="status-text">
              Software Engineer @ The Family Office
            </span>
          </div>

          <h2 className="hero-profession">
            Mobile &amp; Web Architect
          </h2>

          <p className="hero-subtitle">
            4+ years architecting high-scale reactive applications in Flutter, Swift, and modern full-stack systems.
          </p>

          <a
            href="#work"
            className="btn-pill-black hero-cta-btn"
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
          >
            <span>View Selected Work</span>
            <span className="arrow-icon">&rarr;</span>
          </a>
        </motion.div>

        {/* 5. RIGHT-SIDE VERTICAL LINKS */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="hero-bottom-right"
        >
          {/* GitHub */}
          <a
            href="https://github.com/AgnelSelvan"
            target="_blank"
            rel="noopener noreferrer"
            className="link-pill"
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
          >
            <span>GitHub (55+ Repos)</span>
            <GithubIcon className="w-3.5 h-3.5" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/agnel-selvan"
            target="_blank"
            rel="noopener noreferrer"
            className="link-pill"
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
          >
            <span>LinkedIn</span>
            <LinkedinIcon className="w-3.5 h-3.5" />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/build.with.agnel/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-pill"
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
          >
            <span>Instagram</span>
            <InstagramIcon className="w-3.5 h-3.5" />
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/919167877725?text=Hello%20Agnel,%20viewed%20your%20portfolio%20and%20would%20love%20to%20connect"
            target="_blank"
            rel="noopener noreferrer"
            className="link-pill link-pill-whatsapp"
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
          >
            <span>WhatsApp</span>
            <MessageCircle className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </section>

      {/* 03. ABOUT SECTION */}
      <section
        id="about"
        aria-label="About Agnel Selvan"
        className="bio-section bio-about-section relative overflow-hidden bg-[#FCF8F9] scroll-mt-20 sm:scroll-mt-24"
      >
        <div className="about-ambient-glow" />
        <div className="about-ambient-glow-left" />

        <motion.div
          initial={{ opacity: 0, y: 32, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="bio-container relative z-10 w-full"
        >
          {/* Section Header */}
          <div className="flex flex-col items-center justify-center text-center mb-12 sm:mb-16">
            <span className="text-xs font-bold tracking-widest text-neutral-500 uppercase px-3.5 py-1.5 rounded-full bg-white/80 border border-neutral-200/80 shadow-2xs mb-3.5">
              ABOUT AGNEL
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-tight">
              Engineering with craft, precision, and velocity.
            </h2>
            <p className="text-neutral-500 max-w-2xl text-center text-sm md:text-base mt-3 leading-relaxed">
              Senior Software Engineer with a passion for high-grade mobile architectures, reactive state engines, and developer tooling.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Column: Image Frame with Specular Sheen Sweep */}
            <div className="lg:col-span-5 flex flex-col">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="about-photo-wrapper relative rounded-3xl overflow-hidden border border-[#E8DFE2] bg-white shadow-sm flex-1 min-h-[380px] sm:min-h-[440px]"
              >
                <Image
                  src="/mine/work.webp"
                  alt="Agnel Selvan Engineering & Workspace"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center"
                />

                {/* Ambient photo overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                {/* Floating pill badge */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/60 shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/15 text-amber-600 flex items-center justify-center font-bold text-xs shrink-0">
                      4+
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900">Years Production Engineering</h4>
                      <p className="text-[11px] text-neutral-500">The Family Office &bull; Bengaluru</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Narrative Story & Key Highlights */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-6">
              <div className="p-7 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-sm border border-[#E8DFE2] shadow-2xs flex-1 flex flex-col justify-between" style={{ padding: "20px 20px" }}>
                <div className="space-y-4 text-neutral-600 text-sm sm:text-[0.95rem] leading-relaxed">
                  <p>
                    Hello! I am a Software Engineer based in <span className="inline-highlight-tag">Bengaluru</span>, originally born and raised in <span className="inline-highlight-tag">Mumbai</span>. After graduating in Computer Engineering from <span className="inline-highlight-tag">Xavier Institute of Engineering</span> (Mumbai University), I dedicated my career to architecting digital platforms that blend user delight with architectural robustness.
                  </p>
                  <p>
                    Over the past 4+ years, I have engineered mission-critical fintech solutions, zero-latency offline synchronization pipelines, and consumer products from concept to hundreds of thousands of users. My technical toolkit centers around <span className="inline-highlight-tag">Flutter</span>, <span className="inline-highlight-tag">Swift</span>, <span className="inline-highlight-tag">Next.js</span>, and offline-first engines like MongoDB Realm and SQLite.
                  </p>
                  <p>
                    Beyond enterprise development at <span className="inline-highlight-tag">The Family Office</span>, I am an active open-source author with over <span className="inline-highlight-tag">55 public repositories</span>, publish deep architectural breakdowns on Medium, and build independent SaaS utilities.
                  </p>
                </div>

                {/* Key Metric Highlights Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-6 pt-6 border-t border-[#E8DFE2]">
                  <div className="p-3.5 rounded-2xl bg-[#FCF8F9] border border-[#E8DFE2]/70" style={{ padding: "8px 20px" }}>
                    <div className="text-xl sm:text-2xl font-black text-neutral-900">4+ Years</div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">Production Experience</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#FCF8F9] border border-[#E8DFE2]/70" style={{ padding: "8px 20px" }}>
                    <div className="text-xl sm:text-2xl font-black text-neutral-900">55+</div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">Open Source Repos</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#FCF8F9] border border-[#E8DFE2]/70" style={{ padding: "8px 20px" }}>
                    <div className="text-base sm:text-lg font-bold text-neutral-900 truncate">Family Office</div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">Current Role</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#FCF8F9] border border-[#E8DFE2]/70" style={{ padding: "8px 20px" }}>
                    <div className="text-xl sm:text-2xl font-black text-neutral-900">100k+</div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">Users Reached</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  className="btn-pill-black"
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                >
                  <span>Explore Selected Work</span>
                  <span className="arrow-icon">&rarr;</span>
                </a>
                <a
                  href="https://github.com/AgnelSelvan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-white border border-[#E8DFE2] text-neutral-700 hover:bg-neutral-50 transition shadow-2xs cursor-pointer"
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                  style={{ padding: "8px 20px" }}
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 04. CAREER & EXPERIENCE SECTION (Interactive Stepper Timeline) */}
      <CareerSection showIncome={false} />

      {/* 05. TECHNICAL STACK & ARCHITECTURE SECTION */}
      <section
        id="expertise"
        aria-label="Technical Capabilities and Stack"
        className="bio-section relative overflow-hidden bg-[#FCF8F9] scroll-mt-20 sm:scroll-mt-24"
      >
        <div className="bio-container relative z-10 w-full">
          {/* Section Header */}
          <div className="flex flex-col items-center justify-center text-center mb-14 md:mb-20">
            <span className="text-xs font-bold tracking-widest text-neutral-500 uppercase px-3.5 py-1.5 rounded-full bg-white/80 border border-neutral-200/80 shadow-2xs mb-3.5">
              TECHNICAL STACK
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-tight">
              Engineering Stack &amp; Architectures
            </h2>
            <p className="text-neutral-500 max-w-2xl text-center text-sm md:text-base mt-3 leading-relaxed">
              End-to-end software engineering capabilities spanning mobile, web, distributed databases, and DevOps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {skillGroups.map((group, idx) => {
              const IconComp = group.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="p-7 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-sm border border-[#E8DFE2] shadow-2xs hover:border-[#fd8d00]/40 hover:shadow-sm transition-all flex flex-col justify-between"
                  style={{ padding: "8px 20px" }}
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                >
                  <div>
                    <div className="flex items-center gap-3.5 mb-5">
                      <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shadow-2xs">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-neutral-900">{group.name}</h3>
                        <p className="text-xs text-neutral-400">Core Architecture &amp; Frameworks</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2" style={{ padding: "10px 0px" }}>
                      {group.items.map((item, itemIdx) => (
                        <span
                          key={itemIdx}
                          style={{ padding: "4px 10px" }}
                          className="text-xs px-3 py-1.5 rounded-xl bg-neutral-100/80 border border-neutral-200/80 text-neutral-800 font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
                    <span>Production Grade</span>
                    <span className="font-semibold text-neutral-600">Enterprise Ready &bull; 60fps</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 06. FEATURED PROJECTS & OPEN SOURCE */}
      <section
        id="work"
        aria-label="Selected Projects and Open Source"
        className="bio-section relative overflow-hidden bg-[#F7F1F2] scroll-mt-20 sm:scroll-mt-24"
      >
        <div className="bio-container relative z-10 w-full">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <span className="text-xs font-bold tracking-widest text-neutral-500 uppercase px-3.5 py-1.5 rounded-full bg-white/80 border border-neutral-200/80 shadow-2xs mb-3.5 inline-block">
                FEATURED WORK
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-tight">
                Selected Projects &amp; Open Source
              </h2>
              <p className="text-neutral-500 text-sm md:text-base mt-2 max-w-xl leading-relaxed">
                Production-proven open source tools, frameworks, and architecture templates built for developers.
              </p>
            </div>
            <a
              href="https://github.com/AgnelSelvan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-900 hover:text-amber-600 transition-colors cursor-pointer"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <span>Explore all 55+ repos</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((proj, idx) => (
              <motion.a
                style={{ padding: "8px 20px" }}
                key={idx}
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group p-7 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-sm border border-[#E8DFE2] hover:border-[#fd8d00]/50 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20" style={{ padding: "8px 20px" }}>
                      {proj.category}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200 font-medium" style={{ padding: "8px 20px" }}>
                      {proj.stats}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-neutral-900 group-hover:text-amber-600 transition-colors flex items-center justify-between" style={{ padding: "8px 0px" }}>
                    <span>{proj.title}</span>
                    <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 transition-colors shrink-0 ml-2" />
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mt-3">
                    {proj.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-neutral-500 group-hover:text-neutral-900" style={{ padding: "8px 0px" }}>
                  <span>View Repository &amp; Code</span>
                  <span className="text-neutral-900 group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* 07. TECHNICAL ARTICLES & WRITING */}
      <section
        id="articles"
        aria-label="Technical Writing and Publications"
        className="bio-section relative overflow-hidden bg-[#FCF8F9] scroll-mt-20 sm:scroll-mt-24"
      >
        <div className="bio-container relative z-10 w-full">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold tracking-widest text-neutral-500 uppercase px-3.5 py-1.5 rounded-full bg-white/80 border border-neutral-200/80 shadow-2xs mb-3.5 inline-block" style={{ padding: "8px 20px" }}>
                PUBLICATIONS &amp; WRITING
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-tight">
                Technical Deep Dives &amp; Guides
              </h2>
              <p className="text-neutral-500 text-sm md:text-base mt-2 max-w-xl leading-relaxed">
                Practical guides and architecture breakdowns published on Medium.
              </p>
            </div>
            <a
              href="https://medium.com/@agnelselvan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-900 hover:text-amber-600 transition-colors cursor-pointer"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <span>Read on Medium</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="space-y-3.5">
            {articles.map((art, idx) => (
              <a
                key={idx}
                href={art.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 sm:p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#E8DFE2] hover:border-neutral-400 hover:shadow-xs transition-all flex items-center justify-between gap-4 cursor-pointer"
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                style={{ padding: "8px 20px", margin: "8px 0px" }}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-sm sm:text-base font-bold text-neutral-900 group-hover:text-amber-600 transition-colors">
                    {art.title}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-neutral-500 shrink-0">
                  <span className="hidden sm:inline bg-neutral-100 px-2.5 py-1 rounded-full font-medium">{art.readTime}</span>
                  <span className="text-neutral-900 font-bold group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 08. LET'S CONNECT (CONTACT) SECTION */}
      <section
        id="contact"
        aria-label="Contact and Connect"
        className="bio-section relative overflow-hidden bg-[#F7F1F2] py-24 sm:py-32 scroll-mt-20 sm:scroll-mt-24"
      >
        <div className="bio-container max-w-4xl mx-auto text-center relative z-10">
          <span className="text-xs font-bold tracking-widest text-neutral-500 uppercase px-3.5 py-1.5 rounded-full bg-white/80 border border-neutral-200/80 shadow-2xs mb-4 inline-block">
            LET&apos;S CONNECT
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            Let&apos;s build the next big platform.
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-4 max-w-xl mx-auto leading-relaxed">
            Interested in collaborating on high-scale mobile applications, fintech architectures, or consulting? Reach out directly.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href="mailto:agnelselvan007@gmail.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-neutral-900 text-white hover:bg-neutral-800 transition-all shadow-md cursor-pointer"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              style={{ padding: "8px 20px" }}
            >
              <Mail className="w-4 h-4" />
              <span>agnelselvan007@gmail.com</span>
            </a>
            <a
              href="https://wa.me/919167877725?text=Hello%20Agnel,%20connecting%20regarding%20collaboration"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-800 transition-all cursor-pointer shadow-2xs"
              onMouseEnter={() => setCursorHovered(true)}
              style={{ padding: "8px 20px" }}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Chat</span>
            </a>
            <a
              href="tel:+919167877725"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold bg-white border border-[#E8DFE2] text-neutral-800 hover:bg-neutral-50 transition-all cursor-pointer shadow-2xs"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              style={{ padding: "8px 20px" }}
            >
              <Phone className="w-4 h-4 text-neutral-600" />
              <span>+91 91678 77725</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-3.5 mt-10">
            <a
              href="https://github.com/AgnelSelvan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-12 h-12 rounded-full border border-neutral-200/90 bg-white text-neutral-700 hover:text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50 flex items-center justify-center transition shadow-2xs cursor-pointer hover:scale-105"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}

            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/agnel-selvan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-12 h-12 rounded-full border border-neutral-200/90 bg-white text-neutral-700 hover:text-sky-600 hover:border-neutral-400 hover:bg-neutral-50 flex items-center justify-center transition shadow-2xs cursor-pointer hover:scale-105"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/build.with.agnel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="w-12 h-12 rounded-full border border-neutral-200/90 bg-white text-neutral-700 hover:text-pink-600 hover:border-neutral-400 hover:bg-neutral-50 flex items-center justify-center transition shadow-2xs cursor-pointer hover:scale-105"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a
              href="https://medium.com/@agnelselvan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Medium Profile"
              className="w-12 h-12 rounded-full border border-neutral-200/90 bg-white text-neutral-700 hover:text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50 flex items-center justify-center transition shadow-2xs cursor-pointer hover:scale-105"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <MediumIcon className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/Agnel04454713"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X Profile"
              className="w-12 h-12 rounded-full border border-neutral-200/90 bg-white text-neutral-700 hover:text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50 flex items-center justify-center transition shadow-2xs cursor-pointer hover:scale-105"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <TwitterIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* 09. FOOTER */}
      <footer className="relative z-10 py-10 px-4 sm:px-6 border-t border-[#E8DFE2] bg-[#F2E9EE]/40 text-xs text-neutral-500">
        <div className="bio-container max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="font-bold text-neutral-900">Agnel Selvan</span>
            <span>&bull;</span>
            <span>Senior Software Engineer &amp; Architect</span>
            <span>&bull;</span>
            <span>Bengaluru &bull; Mumbai</span>
          </div>

          <div>
            &copy; {new Date().getFullYear()} Agnel Selvan &bull; All Rights Reserved
          </div>

          <a
            href="#hero"
            className="hover:text-neutral-900 transition-colors cursor-pointer"
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
          >
            Back to Top &uarr;
          </a>
        </div>
      </footer>
    </div>
  );
}
