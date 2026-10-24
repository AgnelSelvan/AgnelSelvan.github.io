'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring, type Variants } from 'framer-motion';
import {
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  MapPin,
  Heart,
  Briefcase,
  GraduationCap,
  Users,
  Compass,
  CheckCircle2,
  Sparkles,
  X,
  Menu,
  ShieldCheck,
  Code2,
  Building2,
  Laptop,
  Rocket,
  Camera,
} from 'lucide-react';

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

export default function BiodataPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPhotoColored, setIsPhotoColored] = useState(false);
  const [isAgnelHovered, setIsAgnelHovered] = useState(false);
  const [cursorHovered, setCursorHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Mouse cursor follower coordinates & springs
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorXSpring = useSpring(cursorX, { damping: 28, stiffness: 450 });
  const cursorYSpring = useSpring(cursorY, { damping: 28, stiffness: 450 });

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

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPhoto(null);
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

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  // Essential Biodata Facts list
  const essentialFacts = [
    { label: 'Full Name', value: 'Agnel Selvan' },
    { label: 'Age / DOB', value: '1999 (27 Years)' },
    { label: 'Height', value: "5' 9\" (175 cm)" },
    { label: 'Birth Place', value: 'Mumbai, Maharashtra' },
    { label: 'Religion / Rite', value: 'Roman Catholic' },
    { label: 'Mother Tongue', value: 'Tamil' },
    { label: 'Languages', value: 'Tamil, English, Hindi, Marathi' },
    { label: 'Profession', value: 'Software Engineer @ The Family Office' },
    { label: 'Marital Status', value: 'Never Married' },
    { label: 'Diet', value: 'Non-Vegetarian / Flexible' },
    { label: 'Current City', value: 'Bengaluru, Karnataka' },
    { label: 'Roots', value: 'Tamil Nadu' },
  ];

  // Mouse & Touch Dragging + Smooth Auto-scroll for Essential Biodata Ribbon
  const biodataScrollRef = React.useRef<HTMLDivElement>(null);
  const isDraggingBiodataRef = React.useRef(false);
  const startXBiodataRef = React.useRef(0);
  const scrollLeftBiodataRef = React.useRef(0);
  const isHoveredBiodataRef = React.useRef(false);

  useEffect(() => {
    const el = biodataScrollRef.current;
    if (!el) return;

    let animId: number;
    const speed = 0.5; // gentle continuous auto-scroll

    const step = () => {
      if (!isHoveredBiodataRef.current && !isDraggingBiodataRef.current && el) {
        el.scrollLeft += speed;
        // Continuous wrap-around loop
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleBiodataMouseDown = (e: React.MouseEvent) => {
    const el = biodataScrollRef.current;
    if (!el) return;
    isDraggingBiodataRef.current = true;
    startXBiodataRef.current = e.pageX - el.offsetLeft;
    scrollLeftBiodataRef.current = el.scrollLeft;
  };

  const handleBiodataMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingBiodataRef.current) return;
    e.preventDefault();
    const el = biodataScrollRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXBiodataRef.current) * 1.5;
    el.scrollLeft = scrollLeftBiodataRef.current - walk;
  };

  const handleBiodataMouseUp = () => {
    isDraggingBiodataRef.current = false;
  };

  const handleBiodataMouseLeave = () => {
    isDraggingBiodataRef.current = false;
    isHoveredBiodataRef.current = false;
  };

  const handleBiodataMouseEnter = () => {
    isHoveredBiodataRef.current = true;
  };

  // Mouse & Touch Dragging + Smooth Auto-scroll for Photo Gallery Ribbon
  const galleryScrollRef = React.useRef<HTMLDivElement>(null);
  const isDraggingGalleryRef = React.useRef(false);
  const startXGalleryRef = React.useRef(0);
  const scrollLeftGalleryRef = React.useRef(0);
  const isHoveredGalleryRef = React.useRef(false);

  useEffect(() => {
    const el = galleryScrollRef.current;
    if (!el) return;

    let animId: number;
    const speed = 0.55; // gentle continuous auto-scroll

    const step = () => {
      if (!isHoveredGalleryRef.current && !isDraggingGalleryRef.current && el) {
        el.scrollLeft += speed;
        // Continuous wrap-around loop
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleGalleryMouseDown = (e: React.MouseEvent) => {
    const el = galleryScrollRef.current;
    if (!el) return;
    isDraggingGalleryRef.current = true;
    startXGalleryRef.current = e.pageX - el.offsetLeft;
    scrollLeftGalleryRef.current = el.scrollLeft;
  };

  const handleGalleryMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingGalleryRef.current) return;
    e.preventDefault();
    const el = galleryScrollRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXGalleryRef.current) * 1.5;
    el.scrollLeft = scrollLeftGalleryRef.current - walk;
  };

  const handleGalleryMouseUp = () => {
    isDraggingGalleryRef.current = false;
  };

  const handleGalleryMouseLeave = () => {
    isDraggingGalleryRef.current = false;
    isHoveredGalleryRef.current = false;
  };

  const handleGalleryMouseEnter = () => {
    isHoveredGalleryRef.current = true;
  };

  // Letter stagger animation config for the HUGE name
  const firstName = "AGNEL";
  const lastName = "SELVAN";
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.045,
        delayChildren: 0.15,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  };

  // Gallery images from public/mine/many
  const galleryItems = [
    {
      src: '/mine/many/IMG_2008.webp',
      alt: 'Agnel Selvan Portrait',
    },
    {
      src: '/mine/many/IMG_2064.webp',
      alt: 'Agnel Selvan Lifestyle',
    },
    {
      src: '/mine/many/IMG_2113.webp',
      alt: 'Agnel Selvan Portrait',
    },
    {
      src: '/mine/many/IMG_2244_Original.webp',
      alt: 'Agnel Selvan Festive',
    },
    {
      src: '/mine/many/IMG_2619.webp',
      alt: 'Agnel Selvan Outdoors',
    },
    {
      src: '/mine/many/IMG_6304.webp',
      alt: 'Agnel Selvan Portrait',
    },
    {
      src: '/mine/many/new.webp',
      alt: 'Agnel Selvan Portrait',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF7F8] text-[#111827]">
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

        {/* Real-time Precision Contact Center Dot (Point of contact) */}
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
          <a href="#hero" className="nav-logo-box">
            <div className="nav-avatar-pill">
              AS
            </div>
            <div className="flex flex-col">
              <span className="nav-title">
                Agnel Selvan
              </span>
              <span className="nav-subtitle">
                Biodata of Agnel
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="nav-links-desktop">
            <a href="#about" className="nav-link-item">About</a>
            <a href="#family" className="nav-link-item">Family</a>
            <a href="#education" className="nav-link-item">Education</a>
            <a href="#career" className="nav-link-item">Career</a>
            <a href="#gallery" className="nav-link-item">Gallery</a>
            <a href="#preferences" className="nav-link-item">Preferences</a>
            <a href="#contact" className="nav-link-item">Contact</a>
          </nav>

          {/* Right Action Button */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/919167877725?text=Hello%20Agnel,%20connecting%20regarding%20your%20biodata"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-black"
            >
              Let&apos;s Connect
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-full text-neutral-800 hover:bg-black/5"
              aria-label="Toggle Navigation Menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#F7F1F2] border-b border-[#E8DFE2] px-6 py-5 flex flex-col gap-3.5"
            >
              {[
                { name: 'About Agnel', href: '#about' },
                { name: 'Family Details', href: '#family' },
                { name: 'Education & Career', href: '#education' },
                { name: 'Photo Gallery', href: '#gallery' },
                { name: 'Partner Preferences', href: '#preferences' },
                { name: 'Contact Information', href: '#contact' },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-semibold text-neutral-800 py-1.5 border-b border-neutral-200/60"
                >
                  {item.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 02. FULL-VIEWPORT HERO SECTION */}
      <section
        id="hero"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="bio-hero-section"
      >
        {/* Soft background glow */}
        <div className="hero-glow" />

        {/* 1. HUGE NAME BEHIND THE PHOTO */}
        <div className="hero-name-wrapper">
          <motion.div
            animate={{
              x: mousePosition.x * 16,
              y: mousePosition.y * 10,
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="w-full flex justify-center px-2"
          >
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="hero-huge-name"
            >
              <span
                className={`hero-name-agnel ${isAgnelHovered ? 'active' : ''}`}
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
              Profile Summary
            </span>
          </div>

          <h2 className="hero-profession">
            Software Engineer
          </h2>

          <p className="hero-subtitle">
            Looking for a caring, family or working professional life partner.
          </p>

          <a
            href="#contact"
            className="btn-pill-black hero-cta-btn"
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
          >
            <span>Express Interest</span>
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
          {/* Instagram */}
          <a
            href="https://www.instagram.com/agnel.selvan/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-pill"
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
          >
            <span>Instagram</span>
            <InstagramIcon className="w-3.5 h-3.5" />
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

          {/* WhatsApp */}
          <a
            href="https://wa.me/919167877725?text=Hello%20Agnel,%20viewed%20your%20biodata%20and%20would%20love%20to%20connect"
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

      {/* 03. ABOUT ME SECTION */}
      <section id="about" className="bio-section bio-about-section relative overflow-hidden">
        {/* Ambient Romantic Background Glows */}
        <div className="about-ambient-glow" />
        <div className="about-ambient-glow-left" />

        <div className="bio-container relative z-10 w-full">
          {/* Unified Desktop View: Left Column (Centered Title + Cool Card) & Right Column (Desktop Height - Navbar Height Photo) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch bio-about-grid">
            {/* Left Column: Title Section (Centered in Available Space) + Cool Story & One-Line Auto-Scrollable Marquee */}
            <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-between">
              {/* Title / Header Section - Centered in Available Space */}
              <motion.div
                initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col items-center justify-center text-center mb-2.5 lg:mb-3 px-2"
              >
                <span className="section-badge inline-flex items-center justify-center gap-1.5 leading-none !mb-1.5 py-0.5 px-2.5 text-[10px] shadow-xs">
                  <Heart className="w-3 h-3 text-rose-500 fill-rose-500/20 shrink-0" />
                  <span className="leading-none">About Me &amp; Outlook</span>
                </span>
                <h2 className="section-title text-xl sm:text-2xl lg:text-[2rem] text-center font-extrabold tracking-tight">
                  Who am I?
                </h2>
                <p className="section-sub text-[11px] sm:text-xs text-neutral-600 !mt-1 max-w-md mx-auto text-center leading-normal">
                  Software engineer born &amp; raised in Mumbai, based in Bengaluru. Grounded, calm, ambitious, and looking forward to building a loving life partnership.
                </p>
              </motion.div>

              {/* Romantic & Cool Narrative Card - Minimal, Modern, Trustworthy */}
              <motion.div
                initial={{ opacity: 0, x: -25, scale: 0.98, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="about-card-romantic rounded-2xl flex-1 flex flex-col justify-between"
              >
                {/* Narrative Story - Clean, Compact & Generously Spaced */}
                <div className="space-y-2.5 text-neutral-600 text-xs sm:text-[0.84rem] leading-relaxed">
                  <p>
                    Hello! I was born and brought up in <span className="inline-highlight-tag">Mumbai</span> in a Roman Catholic family with strong moral and family values. After completing my B.E. in Computer Engineering from <span className="inline-highlight-tag">Xavier Institute of Engineering</span>, I moved to <span className="inline-highlight-tag">Bengaluru</span>, where I currently work full-time as a Software Engineer at <span className="inline-highlight-tag">The Family Office</span>.
                  </p>
                  <p>
                    After my 9-to-5, I build <span className="inline-highlight-tag">independent SaaS applications</span> and monetize them. Outside work and coding, I love taking trips &mdash; monsoon trekking around Mumbai, camping outdoors, and scenic road trips (like my recent drive exploring the backwaters of <span className="inline-highlight-tag">Kerala</span>), along with good music and coffee conversations.
                  </p>
                </div>

                {/* Essential Biodata Details Sub-Card - Elegant, Minimal, Modern & Trustworthy */}
                <div className="my-3 sm:my-3.5 essential-bio-card rounded-2xl">
                  <div className="flex items-center justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0">
                        <Sparkles className="w-3 h-3" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-900 leading-tight">
                          Essential Biodata Details
                        </span>
                        <span className="text-[10px] text-neutral-400 font-medium flex items-center gap-1.5 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Auto-scrolling &bull; Drag or scroll
                        </span>
                      </div>
                    </div>

                    {/* Black Pill Button with Hover Arrow Animation */}
                    <a
                      href="#family"
                      className="btn-pill-black !py-1 !px-3 !text-[11px] shrink-0"
                      onMouseEnter={() => setCursorHovered(true)}
                      onMouseLeave={() => setCursorHovered(false)}
                    >
                      <span>Family Profile</span>
                      <span className="arrow-icon">&rarr;</span>
                    </a>
                  </div>

                  {/* One-Line Draggable & Auto-Scrollable Track */}
                  <div
                    ref={biodataScrollRef}
                    className="bio-draggable-ribbon mt-1"
                    onMouseDown={handleBiodataMouseDown}
                    onMouseMove={handleBiodataMouseMove}
                    onMouseUp={handleBiodataMouseUp}
                    onMouseLeave={handleBiodataMouseLeave}
                    onMouseEnter={handleBiodataMouseEnter}
                  >
                    <div className="flex items-center gap-2 flex-nowrap w-max py-0.5 select-none">
                      {essentialFacts.map((fact, idx) => (
                        <div key={`fact-1-${idx}`} className="fact-pill-inline select-none">
                          <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">
                            {fact.label}
                          </span>
                          <span className="text-neutral-300 font-light">&bull;</span>
                          <span className="text-[11px] font-semibold text-neutral-800">
                            {fact.value}
                          </span>
                        </div>
                      ))}
                      {essentialFacts.map((fact, idx) => (
                        <div key={`fact-2-${idx}`} className="fact-pill-inline select-none" aria-hidden="true">
                          <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">
                            {fact.label}
                          </span>
                          <span className="text-neutral-300 font-light">&bull;</span>
                          <span className="text-[11px] font-semibold text-neutral-800">
                            {fact.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer with Location/Faith & Black Pill Button with Hover Arrow Animation */}
                <div className="mt-auto pt-3 sm:pt-3.5 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-neutral-500 font-medium">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                      <span>Born in Mumbai &bull; Based in Bengaluru</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                      <span>Roman Catholic Faith &bull; Roots: Tamil Nadu</span>
                    </div>
                  </div>

                  {/* Black Pill Button with Hover Arrow Animation */}
                  <a
                    href="#contact"
                    className="btn-pill-black !py-1.5 !px-3.5 !text-xs shadow-xs"
                    onMouseEnter={() => setCursorHovered(true)}
                    onMouseLeave={() => setCursorHovered(false)}
                  >
                    <span>Express Interest</span>
                    <span className="arrow-icon">&rarr;</span>
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Romantic Photo Showcase taking Desktop Height - Navbar Height */}
            <motion.div
              initial={{ opacity: 0, x: 35, scale: 0.96, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 xl:col-span-5 flex justify-center h-full"
            >
              <div
                className="about-photo-wrapper w-full h-full group"
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
              >
                <div className="about-photo-frame">
                  <Image
                    src="/mine/IMG_1578.jpg"
                    alt="Agnel Selvan"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                    className="about-photo-img"
                    priority={false}
                  />
                  {/* Rounded border fade opacity overlay */}
                  <div className="about-photo-fade-border" />

                  {/* Floating romantic badge with Live Pulsing Dot */}
                  <div className="about-photo-badge flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span>Agnel Selvan &bull; 27 Years (1999) &bull; Software Engineer</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 04. FAMILY DETAILS */}
      <section id="family" className="bio-section bio-family-section relative overflow-hidden bg-alt-section">
        {/* Ambient Background Glows */}
        <div className="family-ambient-glow" />
        <div className="family-ambient-glow-right" />

        <div className="bio-container relative z-10 w-full">
          {/* Unified Desktop View: Left Column (Photo) & Right Column (Centered Title + Family Card) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch bio-family-grid">
            {/* Left Column: Family Photo Showcase taking Desktop Height - Navbar Height */}
            <motion.div
              initial={{ opacity: 0, x: -35, scale: 0.96, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="order-2 lg:order-1 lg:col-span-5 xl:col-span-5 flex justify-center h-full"
            >
              <div
                className="about-photo-wrapper w-full h-full group"
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
              >
                <div className="about-photo-frame">
                  <Image
                    src="/mine/IMG_7820.webp"
                    alt="The Selvan Family"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                    className="about-photo-img object-cover object-center"
                    priority={false}
                  />
                  {/* Rounded border fade opacity overlay */}
                  <div className="about-photo-fade-border" />

                  {/* Floating romantic badge with Live Pulsing Dot */}
                  <div className="about-photo-badge flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span>The Selvan Family &bull; Mumbai Roots</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Title Section (Centered in Available Space) + Individual Family Structure Cards */}
            <div className="order-1 lg:order-2 lg:col-span-7 xl:col-span-7 flex flex-col justify-between py-1 lg:py-2">
              {/* Title / Header Section - Centered in Available Space */}
              <motion.div
                initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col items-center justify-center text-center mb-3 sm:mb-4 px-2"
              >
                <span className="section-badge inline-flex items-center justify-center gap-1.5 leading-none !mb-1.5 py-0.5 px-2.5 text-[10px] shadow-xs">
                  <Users className="w-3 h-3 text-amber-600 shrink-0" />
                  <span className="leading-none">Family Background &amp; Structure</span>
                </span>
                <h2 className="section-title text-xl sm:text-2xl lg:text-[2rem] text-center font-extrabold tracking-tight">
                  Warm, Grounded &amp; Close-Knit
                </h2>
                <p className="section-sub text-[11px] sm:text-xs text-neutral-600 !mt-1 max-w-md mx-auto text-center leading-normal">
                  Raised with traditional Catholic moral values, mutual respect, and unconditional encouragement.
                </p>
              </motion.div>

              {/* Individual Family Structure & Pillars Cards (Outside standalone cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 lg:gap-4.5 my-auto flex-1">
                {/* 1. Father */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.98, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="family-pillar-card hover:border-amber-400/40"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                      <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-neutral-400">
                        Father
                      </span>
                      <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
                        <Briefcase className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug">
                      Guiding Pillar
                    </h3>
                    <p className="text-xs sm:text-[12.5px] text-neutral-600 leading-relaxed mt-2">
                      Supportive family head with business &amp; private service background. Instilled values of discipline, honesty, and hard work.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] sm:text-xs font-semibold text-neutral-500">
                    <span>Discipline &bull; Integrity</span>
                    <span className="text-amber-600 font-bold">&bull; Guiding Pillar</span>
                  </div>
                </motion.div>

                {/* 2. Mother */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.98, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="family-pillar-card hover:border-rose-400/40"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                      <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-neutral-400">
                        Mother
                      </span>
                      <div className="w-6 h-6 rounded-lg bg-rose-500/10 text-rose-600 flex items-center justify-center">
                        <Heart className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug">
                      Heart of the Home
                    </h3>
                    <p className="text-xs sm:text-[12.5px] text-neutral-600 leading-relaxed mt-2">
                      Homemaker and the emotional anchor of our home. Known for her warmth, loving hospitality, and devout faith.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] sm:text-xs font-semibold text-neutral-500">
                    <span>Warmth &bull; Hospitality</span>
                    <span className="text-rose-600 font-bold">&bull; Anchor</span>
                  </div>
                </motion.div>

                {/* 3. Family Structure */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.98, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.55, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
                  className="family-pillar-card hover:border-sky-400/40"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                      <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-neutral-400">
                        Family Structure
                      </span>
                      <div className="w-6 h-6 rounded-lg bg-sky-500/10 text-sky-600 flex items-center justify-center">
                        <Users className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug">
                      Nuclear &bull; Close-Knit
                    </h3>
                    <p className="text-xs sm:text-[12.5px] text-neutral-600 leading-relaxed mt-2">
                      Close family with loving sibling bond. We celebrate milestones together, respect individuality, and maintain strong values.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] sm:text-xs font-semibold text-neutral-500">
                    <span>4 Members &bull; Mutual Respect</span>
                    <span className="text-sky-600 font-bold">&bull; Sibling Bond</span>
                  </div>
                </motion.div>

                {/* 4. Heritage & Roots */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.98, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.55, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
                  className="family-pillar-card hover:border-emerald-400/40"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                      <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-neutral-400">
                        Heritage &amp; Faith
                      </span>
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug">
                      Mumbai Native &bull; Tamil Roots
                    </h3>
                    <p className="text-xs sm:text-[12.5px] text-neutral-600 leading-relaxed mt-2">
                      Born and brought up in Mumbai with cherished ancestral Tamil Catholic roots. Forward-thinking outlook with high moral standards.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] sm:text-xs font-semibold text-neutral-500">
                    <span>Roman Catholic &bull; Moderate</span>
                    <span className="text-emerald-600 font-bold">&bull; Cultural Roots</span>
                  </div>
                </motion.div>
              </div>

              {/* Card Footer with Location/Faith & Black Pill Button with Hover Arrow Animation */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-3.5 sm:mt-4 pt-3 sm:pt-3.5 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-3 px-1"
              >
                <div className="flex flex-wrap items-center gap-4 text-[11px] text-neutral-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                    <span>Native: Mumbai &bull; Work: Bengaluru</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                    <span>Roman Catholic Faith &bull; Roots: Tamil Nadu</span>
                  </div>
                </div>

              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 05. EDUCATION & CAREER / PROFESSIONAL JOURNEY */}
      <section id="education" className="bio-section bio-career-section relative overflow-hidden">
        {/* Anchor for career nav link */}
        <div id="career" className="absolute top-0 left-0 scroll-mt-28" />

        {/* Ambient Background Glows */}
        <div className="career-ambient-glow" />
        <div className="career-ambient-glow-left" />

        <div className="bio-container relative z-10 w-full">
          {/* Unified Desktop View: Left Column (Content & Standalone Cards) & Right Column (Photo) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch bio-career-grid">
            {/* Left Column: Title Section + 4 Standalone Career Pillar Cards */}
            <div className="order-1 lg:order-1 lg:col-span-7 xl:col-span-7 flex flex-col justify-between py-1 lg:py-2">
              {/* Title / Header Section - Centered in Available Space */}
              <motion.div
                initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col items-center justify-center text-center mb-3 sm:mb-4 px-2"
              >
                <span className="section-badge inline-flex items-center justify-center gap-1.5 leading-none !mb-1.5 py-0.5 px-2.5 text-[10px] shadow-xs">
                  <Briefcase className="w-3 h-3 text-amber-600 shrink-0" />
                  <span className="leading-none">Education &amp; Professional Journey</span>
                </span>
                <h2 className="section-title text-xl sm:text-2xl lg:text-[2rem] text-center font-extrabold tracking-tight">
                  Craft, Code &amp; Building SaaS
                </h2>
                <p className="section-sub text-[11px] sm:text-xs text-neutral-600 !mt-1 max-w-md mx-auto text-center leading-normal">
                  Engineering foundation from Mumbai, mobile software engineering, and independent SaaS building.
                </p>
              </motion.div>

              {/* Individual Career Structure & Pillars Cards (Outside standalone cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 lg:gap-4.5 my-auto flex-1">
                {/* 1. Current Full-Time Role: The Family Office */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.98, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="career-pillar-card hover:border-emerald-400/40"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                      <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-emerald-600">
                        2024 &ndash; Present &bull; Bengaluru
                      </span>
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                        <Building2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug">
                      Software Engineer
                    </h3>
                    <p className="text-[11px] font-semibold text-neutral-700 mt-0.5">
                      The Family Office &bull; Mobile Engineering
                    </p>
                    <p className="text-xs sm:text-[12.5px] text-neutral-600 leading-relaxed mt-2">
                      Engineering reliable, high-performance mobile applications and seamless financial technology workflows.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] sm:text-xs font-semibold text-neutral-500">
                    <span>Mobile Apps &bull; Fintech</span>
                    <span className="text-emerald-600 font-bold">&bull; Full-Time</span>
                  </div>
                </motion.div>

                {/* 2. Side Ventures: Independent SaaS Builder */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.98, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="career-pillar-card hover:border-amber-400/40"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                      <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-amber-700">
                        After 9-to-5 &bull; Personal Priority
                      </span>
                      <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
                        <Rocket className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug">
                      Independent SaaS Creator
                    </h3>
                    <p className="text-[11px] font-semibold text-neutral-700 mt-0.5">
                      Self-Funded Digital Products
                    </p>
                    <p className="text-xs sm:text-[12.5px] text-neutral-600 leading-relaxed mt-2">
                      Actively architecting, designing, and launching independent software products with long-term compound value.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] sm:text-xs font-semibold text-neutral-500">
                    <span>Full-Stack &bull; SaaS</span>
                    <span className="text-amber-600 font-bold">&bull; Builder</span>
                  </div>
                </motion.div>

                {/* 3. Prior Role: Neosoft Technologies */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.98, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.55, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
                  className="career-pillar-card hover:border-sky-400/40"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                      <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-neutral-400">
                        2021 &ndash; 2024 &bull; Mumbai
                      </span>
                      <div className="w-6 h-6 rounded-lg bg-sky-500/10 text-sky-600 flex items-center justify-center">
                        <Code2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug">
                      Software Engineer
                    </h3>
                    <p className="text-[11px] font-semibold text-neutral-700 mt-0.5">
                      Neosoft Technologies &bull; 3 Years
                    </p>
                    <p className="text-xs sm:text-[12.5px] text-neutral-600 leading-relaxed mt-2">
                      Architected robust cross-platform mobile solutions, client architectures, and enterprise feature sets.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] sm:text-xs font-semibold text-neutral-500">
                    <span>Cross-Platform &bull; Mobile</span>
                    <span className="text-sky-600 font-bold">&bull; Enterprise</span>
                  </div>
                </motion.div>

                {/* 4. Academic Foundation: Xavier Institute of Engineering */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.98, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.55, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
                  className="career-pillar-card hover:border-purple-400/40"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                      <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-neutral-400">
                        2017 &ndash; 2021 &bull; Mumbai
                      </span>
                      <div className="w-6 h-6 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
                        <GraduationCap className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug">
                      B.E. Computer Engineering
                    </h3>
                    <p className="text-[11px] font-semibold text-neutral-700 mt-0.5">
                      Xavier Institute of Engineering
                    </p>
                    <p className="text-xs sm:text-[12.5px] text-neutral-600 leading-relaxed mt-2">
                      Comprehensive 4-year degree focusing on software algorithms, systems design, and computer engineering foundation.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] sm:text-xs font-semibold text-neutral-500">
                    <span>Xavier &bull; Mumbai Univ</span>
                    <span className="text-purple-600 font-bold">&bull; First Class</span>
                  </div>
                </motion.div>
              </div>

              {/* Card Footer with Details */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-3.5 sm:mt-4 pt-3 sm:pt-3.5 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-3 px-1"
              >
                <div className="flex flex-wrap items-center gap-4 text-[11px] text-neutral-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Laptop className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                    <span>Specialization: Mobile Apps &bull; React Native &bull; TypeScript</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                    <span>Work: Bengaluru &bull; Native: Mumbai</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Work Photo Showcase taking Desktop Height - Navbar Height */}
            <motion.div
              initial={{ opacity: 0, x: 35, scale: 0.96, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="order-2 lg:order-2 lg:col-span-5 xl:col-span-5 flex justify-center h-full"
            >
              <div
                className="about-photo-wrapper w-full h-full group"
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
              >
                <div className="about-photo-frame">
                  <Image
                    src="/mine/work.webp"
                    alt="Agnel Selvan at Work"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                    className="about-photo-img object-cover object-center"
                    priority={false}
                  />
                  {/* Rounded border fade opacity overlay */}
                  <div className="about-photo-fade-border" />

                  {/* Floating romantic/professional badge with Live Pulsing Dot */}
                  <div className="about-photo-badge flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span>Software Engineer &bull; The Family Office</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 07. PHOTO GALLERY */}
      <section id="gallery" className="bio-section bio-gallery-section relative overflow-hidden bg-alt-section">
        {/* Ambient Background Glows */}
        <div className="gallery-ambient-glow" />
        <div className="gallery-ambient-glow-right" />

        <div className="bio-container relative z-10 w-full">
          {/* Centered Header with Lots of Whitespace */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center justify-center text-center mb-6 sm:mb-8 px-4"
          >
            <span className="section-badge inline-flex items-center justify-center gap-2 leading-none !mb-2.5 py-2 px-4.5 text-xs shadow-xs">
              <Camera className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="leading-none font-semibold">Moments &amp; Perspectives</span>
            </span>
            <h2 className="section-title text-2xl sm:text-3xl lg:text-[2.25rem] text-center font-extrabold tracking-tight">
              Photo Gallery &amp; Life Moments
            </h2>
            <p className="section-sub text-xs sm:text-sm text-neutral-600 !mt-1.5 max-w-lg mx-auto text-center leading-relaxed">
              A candid glimpse into everyday life, outdoor road trips, festive celebrations, and quiet reflections.
            </p>
          </motion.div>

          {/* Auto-scrolling & Draggable Horizontal Ribbon */}
          <div
            ref={galleryScrollRef}
            className="gallery-auto-track select-none"
            onMouseDown={handleGalleryMouseDown}
            onMouseMove={handleGalleryMouseMove}
            onMouseUp={handleGalleryMouseUp}
            onMouseLeave={handleGalleryMouseLeave}
            onMouseEnter={handleGalleryMouseEnter}
            onContextMenu={(e) => e.preventDefault()}
          >
            {/* Duplicated track for smooth infinite continuous scrolling */}
            {[...galleryItems, ...galleryItems].map((item, idx) => (
              <div
                key={`gallery-${idx}`}
                className="gallery-auto-card group"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              >
                {/* Photo Frame: Full rounded-2xl card without chips, titles, or descriptions */}
                <div
                  className="gallery-photo-frame"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 270px, (max-width: 1024px) 300px, 330px"
                    className="object-cover object-center pointer-events-none select-none group-hover:scale-105 transition-transform duration-500"
                    priority={idx < 2}
                    draggable={false}
                  />

                  {/* Subtle hover gradient depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  {/* Anti-copy transparent shield layer */}
                  <div
                    className="absolute inset-0 z-10"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Section Footer with Metadata and Black Pill Button with Hover Arrow Animation */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 pt-4 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-4 px-2"
          >
            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 font-medium">
              <div className="flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                <span>7 Photographs &bull; Candid &amp; Lifestyle Moments</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                <span>Pause on Hover &bull; Drag or Swipe Freely</span>
              </div>
            </div>

            {/* Black Pill Buttons with Hover Arrow Animation */}
            <div className="flex items-center gap-2.5">
              <a
                href="#preferences"
                className="btn-pill-black !py-1.5 !px-4 !text-xs shadow-xs"
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
              >
                <span>Partner Preferences</span>
                <span className="arrow-icon">&rarr;</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 08. PARTNER EXPECTATIONS & VALUES */}
      <section id="preferences" className="bio-section bio-preferences-section relative overflow-hidden">
        {/* Ambient Background Glows */}
        <div className="preferences-ambient-glow" />
        <div className="preferences-ambient-glow-right" />

        <div className="bio-container relative z-10 w-full">
          {/* Unified Desktop View: Left Column (Photo) & Right Column (Content & 4 Standalone Cards) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch bio-preferences-grid">
            {/* Left Column: Photo Showcase taking Desktop Height - Navbar Height */}
            <motion.div
              initial={{ opacity: 0, x: -35, scale: 0.96, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="order-2 lg:order-1 lg:col-span-5 xl:col-span-5 flex justify-center h-full"
            >
              <div
                className="about-photo-wrapper w-full h-full group"
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
              >
                <div className="about-photo-frame">
                  <Image
                    src="/mine/IMG_1579.webp"
                    alt="Agnel Selvan"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                    className="about-photo-img object-cover object-center"
                    priority={false}
                  />
                  {/* Rounded border fade opacity overlay */}
                  <div className="about-photo-fade-border" />

                  {/* Floating romantic badge with Live Pulsing Dot */}
                  <div className="about-photo-badge flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                    </span>
                    <span>Life Partner Search &bull; Values &amp; Mutual Respect</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Title Section (Centered) + 4 Standalone Partner Preference Cards */}
            <div className="order-1 lg:order-2 lg:col-span-7 xl:col-span-7 flex flex-col justify-between py-1 lg:py-2">
              {/* Title / Header Section - Centered in Available Space */}
              <motion.div
                initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col items-center justify-center text-center mb-3 sm:mb-4 px-2"
              >
                <span className="section-badge inline-flex items-center justify-center gap-1.5 leading-none !mb-1.5 py-0.5 px-2.5 text-[10px] shadow-xs">
                  <Heart className="w-3 h-3 text-rose-500 shrink-0 fill-rose-500/20" />
                  <span className="leading-none">Partner Expectations &amp; Outlook</span>
                </span>
                <h2 className="section-title text-xl sm:text-2xl lg:text-[2rem] text-center font-extrabold tracking-tight">
                  What I Value in a Life Partner
                </h2>
                <p className="section-sub text-[11px] sm:text-xs text-neutral-600 !mt-1 max-w-md mx-auto text-center leading-normal">
                  Looking for a kind, grounded companion to build a meaningful, peaceful, and joyful life together.
                </p>
              </motion.div>

              {/* Individual Preference Structure & Pillars Cards (Outside standalone cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 lg:gap-4.5 my-auto flex-1">
                {/* 1. Emotional Maturity & Warmth */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.98, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="preference-pillar-card hover:border-rose-400/40"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                      <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-rose-600">
                        Core Character
                      </span>
                      <div className="w-6 h-6 rounded-lg bg-rose-500/10 text-rose-600 flex items-center justify-center">
                        <Heart className="w-3.5 h-3.5 fill-rose-600/20" />
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug">
                      Kind, Empathetic &amp; Grounded
                    </h3>
                    <p className="text-xs sm:text-[12.5px] text-neutral-600 leading-relaxed mt-2">
                      Values warmth, emotional maturity, mutual respect, and finding genuine happiness in simple everyday moments.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] sm:text-xs font-semibold text-neutral-500">
                    <span>Warmth &bull; Empathy</span>
                    <span className="text-rose-600 font-bold">&bull; Essential</span>
                  </div>
                </motion.div>

                {/* 2. Balanced Life Outlook */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.98, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="preference-pillar-card hover:border-amber-400/40"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                      <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-amber-700">
                        Career &amp; Family
                      </span>
                      <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
                        <Compass className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug">
                      Family or Working Professional
                    </h3>
                    <p className="text-xs sm:text-[12.5px] text-neutral-600 leading-relaxed mt-2">
                      Open to working professionals or homemakers who value balanced priorities, mutual encouragement, and home warmth.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] sm:text-xs font-semibold text-neutral-500">
                    <span>Balanced Life &bull; Growth</span>
                    <span className="text-amber-600 font-bold">&bull; Supportive</span>
                  </div>
                </motion.div>

                {/* 3. Open Communication & Friendship */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.98, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.55, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
                  className="preference-pillar-card hover:border-sky-400/40"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                      <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-sky-600">
                        Partnership Dynamic
                      </span>
                      <div className="w-6 h-6 rounded-lg bg-sky-500/10 text-sky-600 flex items-center justify-center">
                        <MessageCircle className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug">
                      Honest &amp; Calm Communication
                    </h3>
                    <p className="text-xs sm:text-[12.5px] text-neutral-600 leading-relaxed mt-2">
                      Believes in discussing challenges calmly, laughing genuinely, respecting individuality, and building deep friendship.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] sm:text-xs font-semibold text-neutral-500">
                    <span>Transparency &bull; Trust</span>
                    <span className="text-sky-600 font-bold">&bull; Friendship</span>
                  </div>
                </motion.div>

                {/* 4. Compatibility & Background */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.98, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.55, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
                  className="preference-pillar-card hover:border-emerald-400/40"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                      <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-neutral-400">
                        Compatibility Parameters
                      </span>
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug">
                      Age: 23&ndash;27 &bull; Catholic / Open
                    </h3>
                    <p className="text-xs sm:text-[12.5px] text-neutral-600 leading-relaxed mt-2">
                      Graduate or Post-Graduate. Based in Bengaluru, Mumbai, or open to relocating. Shared moral character is primary.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] sm:text-xs font-semibold text-neutral-500">
                    <span>Shared Values &bull; Flexible</span>
                    <span className="text-emerald-600 font-bold">&bull; Harmony</span>
                  </div>
                </motion.div>
              </div>

              {/* Card Footer with Details & Black Pill Button with Hover Arrow Animation */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-3.5 sm:mt-4 pt-3 sm:pt-3.5 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-3 px-1"
              >
                <div className="flex flex-wrap items-center gap-4 text-[11px] text-neutral-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                    <span>Foundations: Trust &bull; Friendship &bull; Mutual Respect</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                    <span>Open-minded &amp; Flexible Outlook</span>
                  </div>
                </div>

                {/* Black Pill Button with Hover Arrow Animation */}
                <a
                  href="#contact"
                  className="btn-pill-black !py-1.5 !px-4 !text-xs shadow-xs"
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                >
                  <span>Connect Directly</span>
                  <span className="arrow-icon">&rarr;</span>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 09. CONTACT / EXPRESS INTEREST SECTION */}
      <section id="contact" className="bio-section bio-contact-section relative overflow-hidden bg-alt-section">
        {/* Ambient Background Glows */}
        <div className="contact-ambient-glow" />
        <div className="contact-ambient-glow-left" />

        <div className="bio-container relative z-10 w-full">
          {/* Unified Desktop View: Left Column (Content & Contact Cards) & Right Column (Photo) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch bio-contact-grid">
            {/* Left Column: Title Section + 3 Standalone Contact Cards + Social Links */}
            <div className="order-1 lg:order-1 lg:col-span-7 xl:col-span-7 flex flex-col justify-between py-1 lg:py-2">
              {/* Title / Header Section - Centered in Available Space */}
              <motion.div
                initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col items-center justify-center text-center mb-3 sm:mb-4 px-2"
              >
                <span className="section-badge inline-flex items-center justify-center gap-1.5 leading-none !mb-1.5 py-0.5 px-2.5 text-[10px] shadow-xs">
                  <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span className="leading-none">Let&apos;s Connect &amp; Converse</span>
                </span>
                <h2 className="section-title text-xl sm:text-2xl lg:text-[2rem] text-center font-extrabold tracking-tight">
                  Ready to Start a Conversation?
                </h2>
                <p className="section-sub text-[11px] sm:text-xs text-neutral-600 !mt-1 max-w-md mx-auto text-center leading-normal">
                  Whether you are a prospective partner or a family reaching out, you are warmly invited to connect directly.
                </p>
              </motion.div>

              {/* Individual Contact Action Cards in 3-Card Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5 my-auto flex-1">
                {/* 1. WhatsApp Direct */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.98, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="contact-pillar-card hover:border-emerald-500/40"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                        Instant Message
                      </span>
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                        <MessageCircle className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-[0.95rem] font-bold text-neutral-900 leading-snug">
                      WhatsApp Chat
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed mt-1.5">
                      Fastest and most convenient way to introduce, exchange biodatas, or chat.
                    </p>
                  </div>
                  <div className="mt-3.5 pt-2.5 border-t border-black/[0.05]">
                    <a
                      href="https://wa.me/919167877725?text=Hello%20Agnel,%20connecting%20regarding%20your%20biodata"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-pill-black !py-1 !px-3 !text-[11px] !bg-[#059669] w-full justify-center shadow-xs"
                      onMouseEnter={() => setCursorHovered(true)}
                      onMouseLeave={() => setCursorHovered(false)}
                    >
                      <span>Chat on WhatsApp</span>
                      <span className="arrow-icon">&rarr;</span>
                    </a>
                  </div>
                </motion.div>

                {/* 2. Direct Phone Call */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.98, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="contact-pillar-card hover:border-amber-400/40"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                        Family &amp; Parents
                      </span>
                      <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-[0.95rem] font-bold text-neutral-900 leading-snug">
                      Direct Call
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed mt-1.5">
                      +91 91678 77725 &bull; Parents and family are warmly welcome to call directly.
                    </p>
                  </div>
                  <div className="mt-3.5 pt-2.5 border-t border-black/[0.05]">
                    <a
                      href="tel:+919167877725"
                      className="btn-pill-black !py-1 !px-3 !text-[11px] w-full justify-center shadow-xs"
                      onMouseEnter={() => setCursorHovered(true)}
                      onMouseLeave={() => setCursorHovered(false)}
                    >
                      <span>Call Agnel</span>
                      <span className="arrow-icon">&rarr;</span>
                    </a>
                  </div>
                </motion.div>

                {/* 3. Email Correspondence */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.98, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.55, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
                  className="contact-pillar-card hover:border-sky-400/40"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
                        Official Profiles
                      </span>
                      <div className="w-6 h-6 rounded-lg bg-sky-500/10 text-sky-600 flex items-center justify-center">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-[0.95rem] font-bold text-neutral-900 leading-snug">
                      Email
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed mt-1.5">
                      agnelselvan007@gmail.com &bull; Send detailed profiles or written correspondence.
                    </p>
                  </div>
                  <div className="mt-3.5 pt-2.5 border-t border-black/[0.05]">
                    <a
                      href="mailto:agnelselvan007@gmail.com?subject=Regarding%20Marriage%20Biodata%20-%20Agnel%20Selvan"
                      className="btn-pill-black !py-1 !px-3 !text-[11px] w-full justify-center shadow-xs"
                      onMouseEnter={() => setCursorHovered(true)}
                      onMouseLeave={() => setCursorHovered(false)}
                    >
                      <span>Send Email</span>
                      <span className="arrow-icon">&rarr;</span>
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Social Media & Verification Strip */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.34 }}
                className="mt-3 p-2.5 sm:p-3 rounded-2xl bg-white/80 backdrop-blur-md border border-black/[0.06] flex flex-wrap items-center justify-between gap-3 shadow-2xs"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Verified Profiles:</span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/agnel.selvan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-pill !py-1 !px-3 !text-[11px]"
                    onMouseEnter={() => setCursorHovered(true)}
                    onMouseLeave={() => setCursorHovered(false)}
                  >
                    <span>Instagram</span>
                    <InstagramIcon className="w-3 h-3 text-pink-600" />
                  </a>
                  <a
                    href="https://linkedin.com/in/agnel-selvan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-pill !py-1 !px-3 !text-[11px]"
                    onMouseEnter={() => setCursorHovered(true)}
                    onMouseLeave={() => setCursorHovered(false)}
                  >
                    <span>LinkedIn</span>
                    <LinkedinIcon className="w-3 h-3 text-blue-600" />
                  </a>
                </div>
              </motion.div>

              {/* Card Footer with Location/Family Guidance */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-3.5 pt-3 sm:pt-3.5 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-3 px-1"
              >
                <div className="flex flex-wrap items-center gap-4 text-[11px] text-neutral-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                    <span>Based: Bengaluru &bull; Native: Mumbai</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                    <span>Family &amp; Parents are warmly welcome to connect</span>
                  </div>
                </div>

                <a
                  href="#hero"
                  className="btn-pill-black !py-1 !px-3.5 !text-[11px] shadow-xs"
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                >
                  <span>Back to Top</span>
                  <span className="arrow-icon">&uarr;</span>
                </a>
              </motion.div>
            </div>

            {/* Right Column: Contact Photo Showcase taking Desktop Height - Navbar Height */}
            <motion.div
              initial={{ opacity: 0, x: 35, scale: 0.96, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="order-2 lg:order-2 lg:col-span-5 xl:col-span-5 flex justify-center h-full"
            >
              <div
                className="about-photo-wrapper w-full h-full group"
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
              >
                <div className="about-photo-frame">
                  <Image
                    src="/mine/many/IMG_2113.webp"
                    alt="Agnel Selvan"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                    className="about-photo-img object-cover object-center"
                    priority={false}
                  />
                  {/* Rounded border fade opacity overlay */}
                  <div className="about-photo-fade-border" />

                  {/* Floating romantic badge with Live Pulsing Dot */}
                  <div className="about-photo-badge flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span>Agnel Selvan &bull; Open for Genuine Conversations</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 10. MINIMAL FOOTER */}
      <footer className="py-8 border-t border-[#E8DFE2] px-6 text-center text-xs text-neutral-500 print:hidden">
        <div className="bio-container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-900">Agnel Selvan</span>
            <span>&bull;</span>
            <span>Marriage Biodata</span>
          </div>

          <div>
            &copy; {new Date().getFullYear()} Agnel Selvan &bull; Built with Next.js &amp; Framer Motion
          </div>

          <a
            href="#hero"
            className="text-neutral-700 hover:text-black font-semibold transition-colors"
          >
            Back to Top &uarr;
          </a>
        </div>
      </footer>
    </div>
  );
}
