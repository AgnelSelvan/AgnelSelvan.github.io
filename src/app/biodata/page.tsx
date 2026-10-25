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
  User,
  ChevronRight,
  TrendingUp,
  ArrowRight,
  Award,
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

export default function BiodataPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPhotoColored, setIsPhotoColored] = useState(false);
  const [isAgnelHovered, setIsAgnelHovered] = useState(false);
  const [isAgnelHighlighted, setIsAgnelHighlighted] = useState(false);
  const [isShimmering, setIsShimmering] = useState(false);

  const isAgnelActive = isAgnelHovered || isAgnelHighlighted;

  // After 2 seconds: bottom-left to top-right shimmer reveal, transition photo to color and Agnel to orange
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
  const [cursorHovered, setCursorHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Mouse cursor follower coordinates & springs
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorXSpring = useSpring(cursorX, { damping: 28, stiffness: 450 });
  const cursorYSpring = useSpring(cursorY, { damping: 28, stiffness: 450 });

  // Creative Animation: Global Top Scroll Progress Bar
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

  // Lock body scroll when mobile menu or photo lightbox is open
  useEffect(() => {
    if (isMenuOpen || selectedPhoto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, selectedPhoto]);

  // Keyboard navigation for lightbox & mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
        setIsMenuOpen(false);
      }
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
    {
      src: '/mine/work.webp',
      alt: 'Agnel Selvan Software Engineer & Workspace',
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
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full bg-white/80 border border-neutral-200/80 text-neutral-800 hover:bg-white transition-all shadow-2xs active:scale-95"
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
                      <p className="text-xs font-medium text-neutral-500">Biodata &bull; 2026</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-9 h-9 rounded-full bg-white hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200/80 flex items-center justify-center transition shadow-2xs active:scale-95"
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Nav Links */}
                <div style={{ padding: "8px 20px" }} className="px-5 py-6 flex-1 flex flex-col gap-2.5 overflow-y-auto">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 px-3 pb-1">
                    Sections
                  </span>
                  {[
                    { name: 'About Agnel', href: '#about', icon: User, num: '01' },
                    { name: 'Family Details', href: '#family', icon: Users, num: '02' },
                    { name: 'Education & Career', href: '#education', icon: GraduationCap, num: '03' },
                    { name: 'Photo Gallery', href: '#gallery', icon: Camera, num: '04' },
                    { name: 'Partner Preferences', href: '#preferences', icon: Heart, num: '05' },
                    { name: 'Connect & Contact', href: '#contact', icon: Mail, num: '06' },
                  ].map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <a
                        style={{ padding: "8px 20px" }}
                        key={idx}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-between px-4 py-3 rounded-2xl text-neutral-700 hover:text-neutral-950 bg-white/60 hover:bg-white border border-neutral-200/40 hover:border-[#E8DFE2] transition-all group active:scale-[0.99] shadow-2xs"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-9 h-9 rounded-xl bg-[#F0E6E8] text-neutral-700 flex items-center justify-center group-hover:bg-neutral-900 group-hover:text-white transition-colors shrink-0">
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

                  <div className="pt-4 mt-2 border-t border-[#E8DFE2]/70">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 px-3 pb-1.5 block">
                      Professional
                    </span>
                    <Link
                      href="/"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between p-3.5 rounded-2xl text-neutral-700 hover:text-neutral-950 bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/25 transition-all group shadow-2xs"
                    >
                      <div className="flex items-center gap-3.5" style={{ padding: "8px 20px" }}>
                        <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[13px] font-bold text-neutral-900">Career Portfolio</div>
                          <div className="text-[11px] text-neutral-500">Engineering Work &amp; Resume</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-amber-700 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Drawer Footer */}
                <div className="p-5 bg-white/80 border-t border-[#E8DFE2] flex flex-col gap-3.5" style={{ padding: "8px 20px" }}>
                  <a
                    style={{ padding: "8px 20px" }}
                    href="https://wa.me/919167877725?text=Hello%20Agnel,%20connecting%20regarding%20your%20biodata"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2.5 py-3 px-5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold shadow-xs transition active:scale-[0.99]"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Connect on WhatsApp</span>
                  </a>

                  {/* Quick Contact Icons */}
                  <div className="flex items-center justify-center gap-2.5 pt-1">
                    <a
                      href="tel:+919167877725"
                      aria-label="Direct Phone Call"
                      className="w-10 h-10 rounded-full border border-neutral-200/90 bg-white text-neutral-700 flex items-center justify-center hover:bg-neutral-50 transition shadow-2xs"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <a
                      href="mailto:agnelselvan007@gmail.com"
                      aria-label="Email Agnel"
                      className="w-10 h-10 rounded-full border border-neutral-200/90 bg-white text-neutral-700 flex items-center justify-center hover:bg-neutral-50 transition shadow-2xs"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <a
                      href="https://www.instagram.com/build.with.agnel/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram Profile"
                      className="w-10 h-10 rounded-full border border-neutral-200/90 bg-white text-neutral-700 flex items-center justify-center hover:bg-neutral-50 transition shadow-2xs"
                    >
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="https://linkedin.com/in/agnel-selvan"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn Profile"
                      className="w-10 h-10 rounded-full border border-neutral-200/90 bg-white text-neutral-700 flex items-center justify-center hover:bg-neutral-50 transition shadow-2xs"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="https://github.com/AgnelSelvan"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Profile"
                      className="w-10 h-10 rounded-full border border-neutral-200/90 bg-white text-neutral-700 flex items-center justify-center hover:bg-neutral-50 transition shadow-2xs"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  </div>

                  <p className="text-[11px] text-center text-neutral-400 font-medium">
                    &bull; Bengaluru &bull; Mumbai &bull;
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* 02. FULL-VIEWPORT HERO SECTION */}
      <section
        id="hero"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="bio-hero-section relative overflow-hidden"
      >
        {/* Soft background glow */}
        <div className="hero-glow" />

        {/* Global diagonal shimmer light beam (bottom-left to top-right) */}
        <div className={`hero-diagonal-shimmer-track ${isShimmering ? 'active' : ''}`} aria-hidden="true">
          <div className="hero-diagonal-shimmer-beam" />
        </div>

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

          {/* GitHub */}
          <a
            href="https://github.com/AgnelSelvan"
            target="_blank"
            rel="noopener noreferrer"
            className="link-pill"
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
          >
            <span>GitHub</span>
            <GithubIcon className="w-3.5 h-3.5" />
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

        <motion.div
          initial={{ opacity: 0, y: 32, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="bio-container relative z-10 w-full"
        >
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
                  {/* Creative Animation: Specular Light Sheen Sweep */}
                  <div className="about-photo-shimmer" />
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
        </motion.div>
      </section>

      {/* 04. FAMILY DETAILS */}
      <section id="family" className="bio-section bio-family-section relative overflow-hidden bg-alt-section">
        {/* Ambient Background Glows */}
        <div className="family-ambient-glow" />
        <div className="family-ambient-glow-right" />

        <motion.div
          initial={{ opacity: 0, y: 32, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="bio-container relative z-10 w-full"
        >
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
                  {/* Creative Animation: Specular Light Sheen Sweep */}
                  <div className="about-photo-shimmer" />
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
        </motion.div>
      </section>

      {/* 05. CAREER & PROFESSIONAL JOURNEY */}
      <CareerSection />


      {/* 07. PHOTO GALLERY */}
      <section id="gallery" className="bio-section bio-gallery-section relative overflow-hidden bg-alt-section">
        {/* Ambient Background Glows */}
        <div className="gallery-ambient-glow" />
        <div className="gallery-ambient-glow-right" />

        <motion.div
          initial={{ opacity: 0, y: 32, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="bio-container relative z-10 w-full"
        >
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
                <span>8 Photographs &bull; Candid, Lifestyle &amp; Workspace Moments</span>
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
        </motion.div>
      </section>

      {/* 08. PARTNER EXPECTATIONS & VALUES */}
      <section id="preferences" className="bio-section bio-preferences-section relative overflow-hidden">
        {/* Ambient Subtle Background Glow */}
        <div className="preferences-ambient-glow" />

        <motion.div
          initial={{ opacity: 0, y: 32, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="bio-container relative z-10 w-full max-w-4xl mx-auto"
        >
          {/* Header Section - Minimal & Subtle */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55 }}
            className="w-full flex flex-col items-center justify-center text-center mb-8 sm:mb-10 px-2"
          >
            <span className="section-badge inline-flex items-center justify-center gap-1.5 leading-none !mb-2 py-1 px-3 text-[11px] shadow-xs">
              <Heart className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
              <span>Partner Expectations</span>
            </span>
            <h2 className="section-title text-2xl sm:text-3xl lg:text-4xl text-center font-extrabold tracking-tight">
              What I Value in a Life Partner
            </h2>
            <p className="section-sub text-xs sm:text-sm text-neutral-600 !mt-2 max-w-md mx-auto text-center leading-relaxed">
              Looking for a kind, grounded companion to build a meaningful, peaceful, and joyful life together.
            </p>
          </motion.div>

          {/* 4 Clean Standalone Preference Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Core Character */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="preference-pillar-card"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Core Character
                  </span>
                  <div className="w-6 h-6 rounded-md bg-black/[0.04] text-neutral-600 flex items-center justify-center">
                    <Heart className="w-3.5 h-3.5" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-neutral-900 leading-snug">
                  Kind, Empathetic &amp; Grounded
                </h3>
                <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed mt-2">
                  Values warmth, emotional maturity, mutual respect, and finding genuine happiness in simple everyday moments.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-black/[0.05] flex items-center justify-between text-xs text-neutral-500">
                <span>Warmth &bull; Empathy</span>
                <span className="font-semibold text-neutral-700">Essential</span>
              </div>
            </motion.div>

            {/* 2. Career & Family */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="preference-pillar-card"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Career &amp; Family
                  </span>
                  <div className="w-6 h-6 rounded-md bg-black/[0.04] text-neutral-600 flex items-center justify-center">
                    <Compass className="w-3.5 h-3.5" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-neutral-900 leading-snug">
                  Family or Working Professional
                </h3>
                <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed mt-2">
                  Open to working professionals or homemakers who value balanced priorities, mutual encouragement, and home warmth.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-black/[0.05] flex items-center justify-between text-xs text-neutral-500">
                <span>Balanced Life &bull; Growth</span>
                <span className="font-semibold text-neutral-700">Supportive</span>
              </div>
            </motion.div>

            {/* 3. Communication */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="preference-pillar-card"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Communication
                  </span>
                  <div className="w-6 h-6 rounded-md bg-black/[0.04] text-neutral-600 flex items-center justify-center">
                    <MessageCircle className="w-3.5 h-3.5" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-neutral-900 leading-snug">
                  Honest &amp; Calm Communication
                </h3>
                <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed mt-2">
                  Believes in discussing challenges calmly, laughing genuinely, respecting individuality, and building deep friendship.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-black/[0.05] flex items-center justify-between text-xs text-neutral-500">
                <span>Transparency &bull; Trust</span>
                <span className="font-semibold text-neutral-700">Friendship</span>
              </div>
            </motion.div>

            {/* 4. Background & Values */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="preference-pillar-card"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Background
                  </span>
                  <div className="w-6 h-6 rounded-md bg-black/[0.04] text-neutral-600 flex items-center justify-center">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-neutral-900 leading-snug">
                  Age: 23&ndash;27 &bull; Catholic / Open
                </h3>
                <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed mt-2">
                  Graduate or Post-Graduate. Based in Bengaluru, Mumbai, or open to relocating. Shared moral character is primary.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-black/[0.05] flex items-center justify-between text-xs text-neutral-500">
                <span>Shared Values &bull; Flexible</span>
                <span className="font-semibold text-neutral-700">Harmony</span>
              </div>
            </motion.div>
          </div>

          {/* Subtle Card Footer */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-6 pt-4 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-4 px-2"
          >
            <div className="text-xs text-neutral-500 font-medium">
              Foundations: Trust &bull; Friendship &bull; Mutual Respect &bull; Open Outlook
            </div>

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
        </motion.div>
      </section>

      {/* 09. CONTACT / EXPRESS INTEREST SECTION */}
      <section id="contact" className="bio-section bio-contact-section relative overflow-hidden bg-alt-section">
        {/* Ambient Subtle Background Glow */}
        <div className="contact-ambient-glow" />

        <motion.div
          initial={{ opacity: 0, y: 32, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="bio-container relative z-10 w-full max-w-3xl mx-auto"
        >
          {/* Centered Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55 }}
            className="w-full flex flex-col items-center justify-center text-center mb-8 sm:mb-10 px-2"
          >
            <span className="section-badge inline-flex items-center justify-center gap-1.5 leading-none !mb-2 py-1 px-3 text-[11px] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
              <span>Let&apos;s Connect</span>
            </span>
            <h2 className="section-title text-2xl sm:text-3xl lg:text-4xl text-center font-extrabold tracking-tight">
              Ready to Start a Conversation?
            </h2>
            <p className="section-sub text-xs sm:text-sm text-neutral-600 !mt-2 max-w-md mx-auto text-center leading-relaxed">
              Whether you are a prospective partner or family reaching out, you are warmly invited to connect directly.
            </p>
          </motion.div>

          {/* Unified Social & Direct Connection Icons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="my-8 flex flex-col items-center justify-center gap-4"
          >
            <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
              {/* WhatsApp */}
              <a
                href="https://wa.me/919167877725?text=Hello%20Agnel,%20connecting%20regarding%20your%20biodata"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp (+91 91678 77725)"
                title="WhatsApp: +91 91678 77725"
                className="w-12 h-12 sm:w-13 sm:h-13 rounded-full border border-black/[0.08] bg-white text-neutral-700 hover:text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50/50 flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
              >
                <MessageCircle className="w-5 h-5" />
              </a>

              {/* Direct Call */}
              <a
                href="tel:+919167877725"
                aria-label="Direct Phone Call (+91 91678 77725)"
                title="Call Agnel: +91 91678 77725"
                className="w-12 h-12 sm:w-13 sm:h-13 rounded-full border border-black/[0.08] bg-white text-neutral-700 hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50/50 flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
              >
                <Phone className="w-5 h-5" />
              </a>

              {/* Email */}
              <a
                href="mailto:agnelselvan007@gmail.com?subject=Regarding%20Marriage%20Biodata%20-%20Agnel%20Selvan"
                aria-label="Send Email (agnelselvan007@gmail.com)"
                title="Email: agnelselvan007@gmail.com"
                className="w-12 h-12 sm:w-13 sm:h-13 rounded-full border border-black/[0.08] bg-white text-neutral-700 hover:text-sky-600 hover:border-sky-300 hover:bg-sky-50/50 flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
              >
                <Mail className="w-5 h-5" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/build.with.agnel/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram (@agnel.selvan)"
                title="Instagram: @agnel.selvan"
                className="w-12 h-12 sm:w-13 sm:h-13 rounded-full border border-black/[0.08] bg-white text-neutral-700 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50/50 flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
              >
                <InstagramIcon className="w-5 h-5" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/agnel-selvan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn (Agnel Selvan)"
                title="LinkedIn: Agnel Selvan"
                className="w-12 h-12 sm:w-13 sm:h-13 rounded-full border border-black/[0.08] bg-white text-neutral-700 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50 flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/AgnelSelvan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub (Agnel Selvan)"
                title="GitHub: Agnel Selvan"
                className="w-12 h-12 sm:w-13 sm:h-13 rounded-full border border-black/[0.08] bg-white text-neutral-700 hover:text-neutral-900 hover:border-neutral-400 hover:bg-neutral-100/60 flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
              >
                <GithubIcon className="w-5 h-5" />
              </a>
            </div>

            {/* Subtle Contact Handle Reference */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-neutral-500 font-medium">
              <span>+91 91678 77725</span>
              <span>&bull;</span>
              <span>agnelselvan007@gmail.com</span>
            </div>
          </motion.div>

          {/* Footer Guidance & Back to Top */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-8 pt-4 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-4 px-2"
          >
            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 font-medium">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                <span>Bengaluru &bull; Mumbai</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                <span>Parents &amp; family welcome to connect</span>
              </div>
            </div>

            <a
              href="#hero"
              className="btn-pill-black !py-1.5 !px-4 !text-xs shadow-xs"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <span>Back to Top</span>
              <span className="arrow-icon">&uarr;</span>
            </a>
          </motion.div>
        </motion.div>
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
            &copy; {new Date().getFullYear()} Agnel Selvan
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
