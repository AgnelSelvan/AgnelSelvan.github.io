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

  // Mouse cursor follower coordinates & springs
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorXSpring = useSpring(cursorX, { damping: 25, stiffness: 350 });
  const cursorYSpring = useSpring(cursorY, { damping: 25, stiffness: 350 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
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
      {/* Round circle border follower replacing default mouse pointer */}
      <motion.div
        className="cursor-ring-container pointer-events-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          animate={{
            width: cursorHovered ? 48 : 34,
            height: cursorHovered ? 48 : 34,
            borderColor: cursorHovered ? '#000000' : 'rgba(17, 24, 39, 0.7)',
            backgroundColor: cursorHovered ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
            scale: cursorHovered ? 1.15 : 1,
          }}
          transition={{ type: 'spring', damping: 22, stiffness: 320 }}
          style={{
            borderRadius: '50%',
            borderWidth: '2px',
            borderStyle: 'solid',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          {/* Inner precision center dot */}
          <motion.div
            animate={{
              scale: cursorHovered ? 0 : 1,
              opacity: cursorHovered ? 0 : 1,
            }}
            transition={{ duration: 0.15 }}
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: '#111827',
            }}
          />
        </motion.div>
      </motion.div>

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
      <section id="about" className="bio-section">
        <div className="bio-container">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <span className="section-badge">
              About Me
            </span>
            <h2 className="section-title">
              A Genuine Glimpse Into My Life
            </h2>
            <p className="section-sub">
              Software engineer born and raised in Mumbai, now based in Bengaluru. Grounded, calm, ambitious, and family-first.
            </p>
          </motion.div>

          {/* Narrative & SaaS Highlight */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
            {/* Main Story */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-7 bio-card flex flex-col justify-between"
            >
              <div className="space-y-4 text-neutral-700 text-sm md:text-base leading-relaxed">
                <p>
                  Hello and welcome! I was born and brought up in <b>Mumbai</b> in a warm, supportive Roman Catholic household. Having completed my graduation in Computer Engineering from <b>Xavier Institute of Engineering</b>, I currently work in <b>Bengaluru</b> as a Software Engineer at <b>The Family Office</b>.
                </p>
                <p>
                  People often describe me as calm, respectful, composed, and dependable. I believe in maintaining strong family bonds, open communication, and treating others with kindness and humility.
                </p>
                <p>
                  Outside my regular schedule, I enjoy peaceful road trips (recently traveled through picturesque spots across <b>Kerala</b>), listening to good music, exploring tech concepts, and sharing meaningful conversations over coffee.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-wrap items-center gap-6 text-xs text-neutral-500 font-medium">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-neutral-700" />
                  <span>Born in Mumbai &bull; Based in Bengaluru</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-neutral-700" />
                  <span>Roman Catholic Faith &amp; Moral Values</span>
                </div>
              </div>
            </motion.div>

            {/* Top Priority: Independent SaaS Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 saas-priority-card"
            >
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-semibold tracking-wide mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                  <span>Top Passion &amp; Focus</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  Building Independent SaaS
                </h3>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  In my free time, my primary passion and priority is building and scaling <b>independent SaaS applications</b>. I genuinely love architecting digital tools from scratch, turning ideas into useful products, and building with long-term ownership and purpose.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                <span>Creator &bull; Problem Solver &bull; Builder</span>
                <span className="font-mono text-emerald-400 font-semibold">&#9679; Actively Shipping</span>
              </div>
            </motion.div>
          </div>

          {/* Quick Facts Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bio-card"
          >
            <h3 className="text-lg font-bold text-neutral-900 mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-neutral-800" />
              <span>Essential Biodata Details</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {[
                { label: 'Full Name', value: 'Agnel Selvan' },
                { label: 'Age / DOB', value: '27 Years (1997)' },
                { label: 'Height', value: "5' 9\" (175 cm)" },
                { label: 'Birth Place', value: 'Mumbai, Maharashtra' },
                { label: 'Religion / Rite', value: 'Roman Catholic' },
                { label: 'Mother Tongue', value: 'Tamil' },
                { label: 'Languages', value: 'English, Hindi, Marathi, Tamil' },
                { label: 'Marital Status', value: 'Never Married' },
                { label: 'Diet', value: 'Non-Vegetarian / Flexible' },
                { label: 'Current Residence', value: 'Bengaluru, Karnataka' },
              ].map((fact, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                    {fact.label}
                  </span>
                  <span className="text-sm font-semibold text-neutral-800 leading-snug">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Father */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bio-card flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Father
                </span>
                <h3 className="text-xl font-bold text-neutral-900 mt-1 mb-2">
                  Father
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Supportive family head with business / private service background. Instilled values of discipline, honesty, and hard work.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 text-xs font-medium text-neutral-500">
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
              <div>
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Mother
                </span>
                <h3 className="text-xl font-bold text-neutral-900 mt-1 mb-2">
                  Mother
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Homemaker. The emotional anchor and heart of our family, known for her warmth, hospitality, and devout faith.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 text-xs font-medium text-neutral-500">
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
              <div>
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Family Structure
                </span>
                <h3 className="text-xl font-bold text-neutral-900 mt-1 mb-2">
                  Nuclear &bull; Close-Knit
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Close family with loving sibling bond. We celebrate family milestones together, respect individuality, and maintain strong roots in Mumbai.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 text-xs font-medium text-neutral-500">
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
            className="bio-card flex items-start gap-4"
          >
            <Users className="w-6 h-6 text-neutral-700 shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-neutral-900 text-base mb-1">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bio-card"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-800">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-900">Academic Background</h3>
                  <span className="text-xs text-neutral-500 font-medium">Undergraduation &amp; Junior College</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="relative pl-6 border-l-2 border-neutral-200">
                  <span className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-black" />
                  <span className="text-xs font-semibold text-neutral-400">2017 &ndash; 2021 &bull; Mumbai</span>
                  <h4 className="text-base font-bold text-neutral-900 mt-0.5">
                    Bachelor of Computer Engineering (B.E.)
                  </h4>
                  <p className="text-sm font-semibold text-neutral-700">
                    Xavier Institute of Engineering, Mumbai
                  </p>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    Four-year comprehensive engineering degree focusing on software algorithms, systems design, and computer engineering.
                  </p>
                </div>

                <div className="relative pl-6 border-l-2 border-neutral-200">
                  <span className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-neutral-300" />
                  <span className="text-xs font-semibold text-neutral-400">Higher Secondary Education (12th)</span>
                  <h4 className="text-base font-bold text-neutral-900 mt-0.5">
                    SIES College of Arts, Science and Commerce
                  </h4>
                  <p className="text-sm text-neutral-600">
                    Mumbai, Maharashtra
                  </p>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    Completed 12th standard with Science and Computer Science foundation.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Career Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bio-card"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-800">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-900">Work Experience</h3>
                  <span className="text-xs text-neutral-500 font-medium">Software Engineering Roles</span>
                </div>
              </div>

              <div className="space-y-6">
                {/* The Family Office */}
                <div className="relative pl-6 border-l-2 border-neutral-200">
                  <span className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-emerald-600" />
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">
                    2024 &ndash; Present &bull; Bengaluru
                  </span>
                  <h4 className="text-base font-bold text-neutral-900 mt-0.5">
                    Software Engineer &bull; Mobile Application Engineer
                  </h4>
                  <p className="text-sm font-semibold text-neutral-700">
                    The Family Office
                  </p>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    Engineering reliable, high-performance mobile applications and seamless financial technology workflows.
                  </p>
                </div>

                {/* Neosoft */}
                <div className="relative pl-6 border-l-2 border-neutral-200">
                  <span className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-neutral-300" />
                  <span className="text-xs font-semibold text-neutral-400">
                    2021 &ndash; 2024 &bull; Mumbai
                  </span>
                  <h4 className="text-base font-bold text-neutral-900 mt-0.5">
                    Software Engineer
                  </h4>
                  <p className="text-sm font-semibold text-neutral-700">
                    Neosoft Technologies
                  </p>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    Architected robust cross-platform mobile solutions, client architectures, and enterprise feature sets over 3 years.
                  </p>
                </div>

                {/* Independent SaaS Builder */}
                <div className="relative pl-6 border-l-2 border-blue-200 bg-blue-50/60 p-3.5 rounded-xl -ml-2">
                  <span className="absolute -left-1.5 top-5 w-3 h-3 rounded-full bg-blue-600" />
                  <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wide">
                    Personal Priority &bull; Free Time
                  </span>
                  <h4 className="text-sm font-bold text-blue-950 mt-0.5">
                    Independent SaaS Builder &amp; Creator
                  </h4>
                  <p className="text-xs text-blue-900/80 mt-1 leading-relaxed">
                    Actively architecting, designing, and launching independent software products with long-term compound value.
                  </p>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Core Values & Outlook */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bio-card flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="w-5 h-5 text-rose-500" />
                  <h3 className="font-bold text-lg text-neutral-900">Core Qualities &amp; Values</h3>
                </div>
                <ul className="space-y-4 text-sm text-neutral-700 leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 mt-2 shrink-0" />
                    <span><b>Kind, Empathetic &amp; Grounded:</b> Someone who values warmth, emotional maturity, mutual respect, and simple joys in life.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 mt-2 shrink-0" />
                    <span><b>Family or Working Professional:</b> Values warmth, mutual respect, healthy career-life balance, and creates a welcoming home environment.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 mt-2 shrink-0" />
                    <span><b>Clear Communicator:</b> Believes in open conversations, discussing challenges calmly, and growing together through every phase of life.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-100 text-xs font-semibold text-neutral-500">
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
                <div className="flex items-center gap-2 mb-4">
                  <Compass className="w-5 h-5 text-neutral-800" />
                  <h3 className="font-bold text-lg text-neutral-900">Background &amp; Compatibility</h3>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between py-2 border-b border-neutral-100">
                    <span className="text-neutral-500">Age Range</span>
                    <span className="font-semibold text-neutral-800">23 &ndash; 27 Years</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-neutral-100">
                    <span className="text-neutral-500">Height</span>
                    <span className="font-semibold text-neutral-800">5&apos; 2&quot; &ndash; 5&apos; 8&quot;</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-neutral-100">
                    <span className="text-neutral-500">Education</span>
                    <span className="font-semibold text-neutral-800 text-right">Graduate / Post-Graduate</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-neutral-100">
                    <span className="text-neutral-500">Career / Profession</span>
                    <span className="font-semibold text-neutral-800 text-right">Working Professional (Open to any career)</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-neutral-500">Preferred Location</span>
                    <span className="font-semibold text-neutral-800 text-right">Bengaluru, Mumbai, or open to relocating</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 text-xs text-neutral-500 leading-relaxed">
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
