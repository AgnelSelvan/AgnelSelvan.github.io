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

  // Letter stagger animation config for the HUGE name
  const fullName = "AGNEL SELVAN";
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

  // Gallery images with descriptions
  const galleryItems = [
    {
      src: '/mine/main.png',
      alt: 'Agnel Selvan Portrait',
      caption: 'Main Portrait • Software Engineer',
      tag: 'Portrait',
    },
    {
      src: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
      alt: 'Kerala Backwaters & Nature',
      caption: 'Recent road trip across peaceful backwaters in Kerala',
      tag: 'Travel',
    },
    {
      src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      alt: 'Independent SaaS Workspace',
      caption: 'Deep focus hours: architecting & shipping independent SaaS apps',
      tag: 'Passion',
    },
    {
      src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      alt: 'Warm smile and casual look',
      caption: 'Weekend coffee, good books, and conversations',
      tag: 'Lifestyle',
    },
    {
      src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
      alt: 'Professional and thoughtful',
      caption: 'Thoughtful, calm, and grounded approach to life and work',
      tag: 'Mindset',
    },
    {
      src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
      alt: 'Road Trip Adventures',
      caption: 'Scenic drives and exploring countryside escapes',
      tag: 'Road Trips',
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
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              {fullName.split('').map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
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
                src="/mine/main.png"
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
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
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
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.2 }}
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
      <section id="family" className="bio-section bg-alt-section">
        <div className="bio-container">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <span className="section-badge section-badge-white">
              Family Background
            </span>
            <h2 className="section-title">
              Warm, Grounded &amp; Close-Knit
            </h2>
            <p className="section-sub">
              Raised with traditional values, mutual respect, and unconditional encouragement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8 mb-12 sm:mb-14">
            {/* Father */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bio-card flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                  Father
                </span>
                <h3 className="text-xl font-bold text-neutral-900">
                  Father
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed pt-1">
                  Supportive family head with business / private service background. Instilled values of discipline, honesty, and hard work.
                </p>
              </div>
              <div className="mt-8 pt-5 sm:mt-10 sm:pt-6 border-t border-neutral-100 text-xs font-semibold text-neutral-500">
                Grounded &bull; Guiding Pillar
              </div>
            </motion.div>

            {/* Mother */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bio-card flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                  Mother
                </span>
                <h3 className="text-xl font-bold text-neutral-900">
                  Mother
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed pt-1">
                  Homemaker. The emotional anchor and heart of our family, known for her warmth, hospitality, and devout faith.
                </p>
              </div>
              <div className="mt-8 pt-5 sm:mt-10 sm:pt-6 border-t border-neutral-100 text-xs font-semibold text-neutral-500">
                Loving &bull; Homemaker
              </div>
            </motion.div>

            {/* Siblings & Family Type */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bio-card flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                  Family Structure
                </span>
                <h3 className="text-xl font-bold text-neutral-900">
                  Nuclear &bull; Close-Knit
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed pt-1">
                  Close family with loving sibling bond. We celebrate family milestones together, respect individuality, and maintain strong roots in Mumbai.
                </p>
              </div>
              <div className="mt-8 pt-5 sm:mt-10 sm:pt-6 border-t border-neutral-100 text-xs font-semibold text-neutral-500">
                Native Place: Mumbai / Tamil Nadu roots
              </div>
            </motion.div>
          </div>

          {/* Family Statement Box */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bio-card flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6"
          >
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-800 shrink-0">
              <Users className="w-6 h-6 text-neutral-700" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-bold text-neutral-900 text-base sm:text-lg">
                Family Values &amp; Outlook
              </h4>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                We are a moderate, forward-thinking Roman Catholic family that blends cultural roots with modern aspirations. We value education, peaceful homes, mutual respect between partners, and treating each other&apos;s families with genuine regard.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 05. EDUCATION & CAREER TIMELINE */}
      <section id="education" className="bio-section">
        <div id="career" className="scroll-mt-28 bio-container">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <span className="section-badge">
              Education &amp; Career
            </span>
            <h2 className="section-title">
              My Professional Journey
            </h2>
            <p className="section-sub">
              Engineering foundation from Mumbai, mobile software engineering, and independent SaaS building.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bio-card flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-8 pb-5 border-b border-neutral-100">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-800 shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg sm:text-xl text-neutral-900">Academic Background</h3>
                    <span className="text-xs text-neutral-500 font-medium">Undergraduation &amp; Junior College</span>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="relative pl-7 border-l-2 border-neutral-200">
                    <span className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-black ring-4 ring-white" />
                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wide block mb-1">
                      2017 &ndash; 2021 &bull; Mumbai
                    </span>
                    <h4 className="text-base font-bold text-neutral-900">
                      Bachelor of Computer Engineering (B.E.)
                    </h4>
                    <p className="text-sm font-semibold text-neutral-700 mt-0.5">
                      Xavier Institute of Engineering, Mumbai
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-500 mt-2 leading-relaxed">
                      Four-year comprehensive engineering degree focusing on software algorithms, systems design, and computer engineering.
                    </p>
                  </div>

                  <div className="relative pl-7 border-l-2 border-neutral-200">
                    <span className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-neutral-300 ring-4 ring-white" />
                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wide block mb-1">
                      Higher Secondary Education (12th)
                    </span>
                    <h4 className="text-base font-bold text-neutral-900">
                      SIES College of Arts, Science and Commerce
                    </h4>
                    <p className="text-sm font-semibold text-neutral-700 mt-0.5">
                      Mumbai, Maharashtra
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-500 mt-2 leading-relaxed">
                      Completed 12th standard with Science and Computer Science foundation.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Career Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bio-card flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-8 pb-5 border-b border-neutral-100">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-800 shrink-0">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg sm:text-xl text-neutral-900">Work Experience</h3>
                    <span className="text-xs text-neutral-500 font-medium">Software Engineering Roles</span>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* The Family Office */}
                  <div className="relative pl-7 border-l-2 border-neutral-200">
                    <span className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-emerald-600 ring-4 ring-white" />
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide block mb-1">
                      2024 &ndash; Present &bull; Bengaluru
                    </span>
                    <h4 className="text-base font-bold text-neutral-900">
                      Software Engineer &bull; Mobile Application Engineer
                    </h4>
                    <p className="text-sm font-semibold text-neutral-700 mt-0.5">
                      The Family Office
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-500 mt-2 leading-relaxed">
                      Engineering reliable, high-performance mobile applications and seamless financial technology workflows.
                    </p>
                  </div>

                  {/* Neosoft */}
                  <div className="relative pl-7 border-l-2 border-neutral-200">
                    <span className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-neutral-300 ring-4 ring-white" />
                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wide block mb-1">
                      2021 &ndash; 2024 &bull; Mumbai
                    </span>
                    <h4 className="text-base font-bold text-neutral-900">
                      Software Engineer
                    </h4>
                    <p className="text-sm font-semibold text-neutral-700 mt-0.5">
                      Neosoft Technologies
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-500 mt-2 leading-relaxed">
                      Architected robust cross-platform mobile solutions, client architectures, and enterprise feature sets over 3 years.
                    </p>
                  </div>

                  {/* Independent SaaS Builder */}
                  <div className="relative pl-7 border-l-2 border-amber-300 bg-amber-50/50 p-4 rounded-2xl -ml-2">
                    <span className="absolute -left-1.5 top-5 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-white" />
                    <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wide block mb-1">
                      Personal Priority &bull; After 9-to-5
                    </span>
                    <h4 className="text-sm font-bold text-amber-950">
                      Independent SaaS Builder &amp; Creator
                    </h4>
                    <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                      Actively architecting, designing, and launching independent software products with long-term compound value and monetizing them.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 07. PHOTO GALLERY */}
      <section id="gallery" className="bio-section">
        <div className="bio-container">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <span className="section-badge">
              Moments &amp; Glimpses
            </span>
            <h2 className="section-title">
              Photo Gallery
            </h2>
            <p className="section-sub">
              Click on any photo for an expanded view.
            </p>
          </motion.div>

          {/* Masonry-Style Responsive Grid */}
          <div className="gallery-grid">
            {galleryItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => setSelectedPhoto(item.src)}
                className="gallery-card"
              >
                <div
                  className="gallery-img-box"
                  style={{ position: 'relative' }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="gallery-img"
                  />
                  <div className="gallery-overlay">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-blue-300">
                      {item.tag}
                    </span>
                    <p className="text-sm font-semibold mt-1">
                      {item.caption}
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-white flex items-center justify-between text-xs text-neutral-600 font-medium">
                  <span>{item.tag}</span>
                  <span className="text-neutral-400 hover:text-black transition-colors">Expand &rarr;</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Lightbox Modal */}
          <AnimatePresence>
            {selectedPhoto && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPhoto(null)}
                className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
              >
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Close photo view"
                >
                  <X className="w-6 h-6" />
                </button>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="relative max-w-4xl max-h-[85vh] w-full h-[70vh] rounded-2xl overflow-hidden"
                  style={{ position: 'relative' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={selectedPhoto}
                    alt="Expanded portrait photo"
                    fill
                    sizes="90vw"
                    className="object-contain"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 08. PARTNER PREFERENCES */}
      <section id="preferences" className="bio-section bg-alt-section">
        <div className="bio-container">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <span className="section-badge section-badge-white">
              Partner Expectations
            </span>
            <h2 className="section-title">
              What I Value in a Life Partner
            </h2>
            <p className="section-sub">
              Looking for a genuine, caring companion to build a meaningful, joyful life together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            {/* Core Values & Outlook */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bio-card flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-7 pb-4 border-b border-neutral-100">
                  <div className="w-11 h-11 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
                    <Heart className="w-5 h-5 fill-rose-500/20" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg sm:text-xl text-neutral-900">Core Qualities &amp; Values</h3>
                    <span className="text-xs text-neutral-500 font-medium">Emotional Maturity &amp; Outlook</span>
                  </div>
                </div>

                <ul className="space-y-5 sm:space-y-6 text-sm text-neutral-700 leading-relaxed">
                  <li className="flex items-start gap-3.5">
                    <span className="w-2 h-2 rounded-full bg-neutral-900 mt-2 shrink-0" />
                    <span><b>Kind, Empathetic &amp; Grounded:</b> Someone who values warmth, emotional maturity, mutual respect, and simple joys in life.</span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-2 h-2 rounded-full bg-neutral-900 mt-2 shrink-0" />
                    <span><b>Family or Working Professional:</b> Values warmth, mutual respect, healthy career-life balance, and creates a welcoming home environment.</span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-2 h-2 rounded-full bg-neutral-900 mt-2 shrink-0" />
                    <span><b>Clear Communicator:</b> Believes in open conversations, discussing challenges calmly, and growing together through every phase of life.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 sm:mt-10 sm:pt-7 border-t border-neutral-100 text-xs font-semibold text-neutral-500">
                Foundations: Trust &bull; Friendship &bull; Mutual Respect
              </div>
            </motion.div>

            {/* General Preferences & Practical Compatibility */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bio-card flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-7 pb-4 border-b border-neutral-100">
                  <div className="w-11 h-11 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-800 shrink-0">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg sm:text-xl text-neutral-900">Background &amp; Compatibility</h3>
                    <span className="text-xs text-neutral-500 font-medium">Practical Parameters</span>
                  </div>
                </div>

                <div className="space-y-1 text-sm">
                  <div className="flex justify-between py-3.5 border-b border-neutral-100">
                    <span className="text-neutral-500">Age Range</span>
                    <span className="font-semibold text-neutral-800">23 &ndash; 27 Years</span>
                  </div>
                  <div className="flex justify-between py-3.5 border-b border-neutral-100">
                    <span className="text-neutral-500">Height</span>
                    <span className="font-semibold text-neutral-800">5&apos; 2&quot; &ndash; 5&apos; 8&quot;</span>
                  </div>
                  <div className="flex justify-between py-3.5 border-b border-neutral-100">
                    <span className="text-neutral-500">Education</span>
                    <span className="font-semibold text-neutral-800 text-right">Graduate / Post-Graduate</span>
                  </div>
                  <div className="flex justify-between py-3.5 border-b border-neutral-100">
                    <span className="text-neutral-500">Career / Profession</span>
                    <span className="font-semibold text-neutral-800 text-right">Working Professional (Open to any career)</span>
                  </div>
                  <div className="flex justify-between py-3.5">
                    <span className="text-neutral-500">Preferred Location</span>
                    <span className="font-semibold text-neutral-800 text-right">Bengaluru, Mumbai, or open to relocating</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 sm:mt-10 sm:pt-7 border-t border-neutral-100 text-xs text-neutral-500 leading-relaxed">
                Open-minded and flexible. Shared values and mutual respect matter far more than rigid checkboxes.
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 09. CONTACT / EXPRESS INTEREST SECTION */}
      <section id="contact" className="bio-section">
        <div className="bio-container max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">
              Let&apos;s Connect
            </span>
            <h2 className="section-title text-4xl sm:text-5xl" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
              Ready to Start a Conversation?
            </h2>
            <p className="section-sub max-w-xl mx-auto mb-10">
              Whether you are a prospective partner or a parent reaching out on behalf of your family, you are warmly invited to connect directly.
            </p>
          </motion.div>

          {/* Primary Contact Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            {/* WhatsApp Direct */}
            <a
              href="https://wa.me/919167877725?text=Hello%20Agnel,%20connecting%20regarding%20your%20biodata"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-black"
              style={{ backgroundColor: '#059669', padding: '0.85rem 1.75rem' }}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>

            {/* Direct Call / Phone */}
            <a
              href="tel:+919167877725"
              className="btn-pill-black"
              style={{ padding: '0.85rem 1.75rem' }}
            >
              <Phone className="w-4 h-4" />
              <span>Call: +91 91678 77725</span>
            </a>

            {/* Email */}
            <a
              href="mailto:agnelselvan007@gmail.com?subject=Regarding%20Marriage%20Biodata%20-%20Agnel%20Selvan"
              className="link-pill"
              style={{ padding: '0.85rem 1.5rem' }}
            >
              <Mail className="w-4 h-4" />
              <span>Email Me</span>
            </a>
          </div>

          {/* Social & Professional Handles */}
          <div className="bio-card max-w-lg mx-auto flex items-center justify-around text-xs font-semibold text-neutral-700">
            <a
              href="https://www.instagram.com/agnel.selvan/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-black transition-colors"
            >
              <InstagramIcon className="w-4 h-4 text-pink-600" />
              <span>@agnel.selvan</span>
            </a>
            <span className="text-neutral-300">|</span>
            <a
              href="https://linkedin.com/in/agnel-selvan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-black transition-colors"
            >
              <LinkedinIcon className="w-4 h-4 text-blue-600" />
              <span>linkedin/in/agnel-selvan</span>
            </a>
          </div>

          <p className="text-xs text-neutral-400 mt-6">
            Parents &amp; family members are warmly welcome to contact directly via phone call or WhatsApp.
          </p>
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
