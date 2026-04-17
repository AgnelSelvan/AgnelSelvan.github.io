'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  const projects = [
    {
      name: "UPI QR Generator",
      tech: "Flutter • Fintech",
      info: "Open-source generator for dynamic UPI payment QR codes, widely used in Indian fintech apps.",
      link: "https://github.com/AgnelSelvan/upi_payment_qrcode_generator"
    },
    {
      name: "Voice-Enabled Billing",
      tech: "Flutter • AI/ML",
      info: "Intelligent expense tracker built for Indian retailers using voice commands to automate billing.",
      link: "https://medium.com/@agnelselvan"
    },
    {
      name: "Premium UI Templates",
      tech: "Flutter • Design",
      info: "Curated collection of high-fidelity UI designs including Crypto Trackers and Task Managers.",
      link: "https://github.com/AgnelSelvan/Flutter-UI-Template"
    },
    {
      name: "Offline-First Architectures",
      tech: "MongoDB Realm • Mobile",
      info: "Implementation of robust offline capabilities and real-time sync for complex mobile ecosystems.",
      link: "https://github.com/AgnelSelvan/Blogs"
    }
  ];

  const articles = [
    "In-App Updates for Flutter Desktop",
    "Deep Linking & Flavors in Production",
    "Localization Strategies for Global Apps",
    "Cross-Platform AR with Shaders"
  ];

  return (
    <main style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'radial-gradient(circle at 10% 20%, rgba(255, 215, 0, 0.08) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(255, 140, 0, 0.05) 0%, transparent 40%)'
      }} />

      {/* Navbar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 100,
        backdropFilter: 'blur(15px)',
        WebkitBackdropFilter: 'blur(15px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '1.25rem 0'
      }}>
        <div className="premium-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'Outfit', letterSpacing: '-1px' }}>
              AGNEL<span className="gradient-text">.S</span>
            </div>
          </Link>
          <div style={{ display: 'flex', gap: '2.5rem', fontWeight: 500, fontSize: '0.9rem' }}>
            {['About', 'Expertise', 'Work', 'Articles'].map(item => (
              <Link key={item} href={`#${item.toLowerCase()}`} style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>{item}</Link>
            ))}
            <Link href="/email-sender" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}>Bulk Sender</Link>
            <Link href="#contact" className="gradient-text" style={{ fontWeight: 700, textDecoration: 'none' }}>Say Hello</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: '12rem', paddingBottom: '6rem' }}>
        <div className="premium-container animate-fade-in">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '0.6rem 1.25rem',
              borderRadius: '3rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              width: 'fit-content'
            }}>
              <span style={{ width: 8, height: 8, background: '#FFD700', borderRadius: '50%', boxShadow: '0 0 10px #FFD700' }}></span>
              AVAILABLE FOR NEW OPPORTUNITIES
            </div>
            <h1 style={{ fontSize: 'clamp(3.5rem, 10vw, 6rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-2px' }}>
              Building <br />
              Legendary <br />
              <span className="gradient-text">Mobile Apps.</span>
            </h1>
            <p style={{ maxWidth: '650px', fontSize: '1.4rem', color: 'var(--text-dim)', lineHeight: 1.5, fontWeight: 400 }}>
              Senior Software Engineer based in Mumbai. Specialist in <b style={{ color: 'white' }}>Flutter</b>, <b style={{ color: 'white' }}>Swift</b>, and high-performance mobile architectures. 55+ open-source contributions.
            </p>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1.5rem' }}>
              <a href="#work" className="btn-primary" style={{ padding: '15px 32px', fontSize: '1rem' }}>View Selected Projects</a>
              <a href="https://github.com/AgnelSelvan" target="_blank" style={{
                border: '1px solid var(--card-border)',
                padding: '15px 32px',
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'white',
                fontWeight: 600,
                fontSize: '1rem',
                backdropFilter: 'blur(5px)'
              }}>Follow on GitHub</a>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section id="expertise" style={{ padding: '6rem 0' }}>
        <div className="premium-container">
          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Technical <span className="gradient-text">Mastery.</span></h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }}>Pushing the boundaries of mobile performance and design.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
            {[
              { title: 'Flutter Ecosystem', tags: ['Dart', 'BLoC', 'Provider', 'Performance'], desc: 'Architecting scalable cross-platform solutions with complex animations and native integrations.' },
              { title: 'Native iOS', tags: ['Swift', 'SwiftUI', 'Combine', 'Objective-C'], desc: 'Building high-fidelity native experiences with deep integration into iOS system services.' },
              { title: 'Graphics & AR', tags: ['OpenGL', 'GLSL', 'ARCore', 'Renderers'], desc: 'Experimenting with custom shaders and augmented reality to create immersive digital layers.' },
              { title: 'Data & Sync', tags: ['MongoDB', 'Firebase', 'SQLite', 'Realm'], desc: 'Implementing robust offline-first synchronization and real-time data streaming architectures.' }
            ].map((skill, i) => (
              <div key={i} className="glass-card" style={{ padding: '3rem' }}>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '1.25rem', fontWeight: 700 }}>{skill.title}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {skill.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '0.7rem', padding: '0.3rem 0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', color: 'var(--accent-primary)' }}>{tag}</span>
                  ))}
                </div>
                <p style={{ color: 'var(--text-dim)', lineHeight: 1.6 }}>{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" style={{ padding: '8rem 0', background: 'rgba(255,255,255,0.01)' }}>
        <div className="premium-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
            <div>
              <h2 style={{ fontSize: '3rem', fontWeight: 800 }}>Featured <span className="gradient-text">Apps.</span></h2>
            </div>
            <a href="https://github.com/AgnelSelvan" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 600 }}>Browse all 55+ repos →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
            {projects.map((p, i) => (
              <a key={i} href={p.link} style={{ textDecoration: 'none', color: 'inherit' }} className="glass-card">
                <div style={{ height: '240px', background: 'var(--gradient-primary)', opacity: 0.1, position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.2, fontSize: '4rem' }}>📱</div>
                </div>
                <div style={{ padding: '2.5rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>{p.tech}</div>
                  <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', fontWeight: 700 }}>{p.name}</h3>
                  <p style={{ color: 'var(--text-dim)', lineHeight: 1.6 }}>{p.info}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section id="articles" style={{ padding: '6rem 0' }}>
        <div className="premium-container">
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '3rem' }}>Latest <span className="gradient-text">Writing.</span></h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {articles.map((article, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '2rem',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                transition: 'background 0.2s'
              }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 600 }}>{article}</h3>
                <a href="https://medium.com/@agnelselvan" target="_blank" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 600 }}>Read Article ↗</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" style={{ padding: '10rem 0 5rem' }}>
        <div className="premium-container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: 800, marginBottom: '2.5rem', lineHeight: 1 }}>Let&apos;s build the <br /><span className="gradient-text">Next Big App.</span></h2>
          <a href="mailto:agnelselvan007@gmail.com" style={{ fontSize: '1.5rem', color: 'white', textDecoration: 'none', borderBottom: '2px solid var(--accent-primary)', paddingBottom: '0.5rem' }}>agnelselvan007@gmail.com</a>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginTop: '5rem' }}>
            {[
              { name: 'GitHub', url: 'https://github.com/AgnelSelvan' },
              { name: 'LinkedIn', url: 'https://linkedin.com/in/agnel-selvan' },
              { name: 'Medium', url: 'https://medium.com/@agnelselvan' },
              { name: 'Twitter', url: 'https://twitter.com/Agnel04454713' }
            ].map(social => (
              <a key={social.name} href={social.url} target="_blank" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>{social.name}</a>
            ))}
          </div>

          <div style={{ marginTop: '8rem', color: 'rgba(255,255,255,0.15)', fontSize: '0.75rem', letterSpacing: '2px' }}>
            © {new Date().getFullYear()} AGNEL SELVAN • SENIOR MOBILE ENGINEER
          </div>
        </div>
      </footer>

      {/* Global CSS Inject for Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </main>
  );
}
