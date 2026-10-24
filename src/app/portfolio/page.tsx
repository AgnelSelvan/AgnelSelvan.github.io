'use client';

// Preserved developer portfolio page
import React from 'react';

export default function PortfolioPage() {
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
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'radial-gradient(circle at 50% 0%, rgba(255, 215, 0, 0.05) 0%, transparent 70%)'
      }} />

      <header style={{ padding: '2.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="premium-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              color: '#000'
            }}>
              AS
            </div>
            <span style={{ fontWeight: 600, letterSpacing: '0.5px' }}>AGNEL SELVAN</span>
          </div>

          <nav style={{ display: 'flex', gap: '2rem' }}>
            <a href="#about" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem' }}>About</a>
            <a href="#projects" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem' }}>Projects</a>
            <a href="#articles" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem' }}>Articles</a>
            <a href="/biodata" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>Biodata &rarr;</a>
          </nav>
        </div>
      </header>

      <section style={{ padding: '8rem 0 6rem', textAlign: 'center' }}>
        <div className="premium-container">
          <div style={{
            display: 'inline-block',
            padding: '0.4rem 1rem',
            background: 'rgba(255,215,0,0.1)',
            border: '1px solid rgba(255,215,0,0.2)',
            borderRadius: '100px',
            color: 'var(--accent-primary)',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '2rem'
          }}>
            SENIOR SOFTWARE ENGINEER • MOBILE SPECIALIST
          </div>

          <h1 style={{
            fontSize: 'clamp(3rem, 10vw, 6rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-2px',
            marginBottom: '2rem'
          }}>
            Crafting Scalable, <br />
            <span className="gradient-text">High-Impact</span> Apps.
          </h1>

          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            color: 'var(--text-dim)',
            maxWidth: '700px',
            margin: '0 auto 3.5rem',
            lineHeight: 1.6
          }}>
            Over 5 years architecting mobile experiences for enterprise and high-growth startups. Specializing in Flutter, offline sync engines, and dynamic user interfaces.
          </p>
        </div>
      </section>

      <section id="projects" style={{ padding: '6rem 0' }}>
        <div className="premium-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {projects.map((p, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '2.5rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 600 }}>{p.tech}</span>
                <h3 style={{ fontSize: '1.5rem', margin: '0.8rem 0', fontWeight: 700 }}>{p.name}</h3>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>{p.info}</p>
                <a href={p.link} target="_blank" style={{ color: 'white', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>View Project ↗</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="articles" style={{ padding: '6rem 0' }}>
        <div className="premium-container">
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '3rem' }}>Technical Writing</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {articles.map((article, idx) => (
              <div key={idx} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '2rem',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
              }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 600 }}>{article}</h3>
                <a href="https://medium.com/@agnelselvan" target="_blank" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 600 }}>Read Article ↗</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" style={{ padding: '8rem 0 4rem', textAlign: 'center' }}>
        <div className="premium-container">
          <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem' }}>Let&apos;s build the Next Big App.</h2>
          <a href="mailto:agnelselvan007@gmail.com" style={{ fontSize: '1.3rem', color: 'white' }}>agnelselvan007@gmail.com</a>
        </div>
      </footer>
    </main>
  );
}
