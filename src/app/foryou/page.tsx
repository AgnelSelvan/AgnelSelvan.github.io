/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function ForYou() {
  const [isMay15, setIsMay15] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const dateParam = params.get('date');
      if (dateParam === '2026-05-25' || dateParam?.includes('25')) {
        setIsMay15(true);
        return;
      }
    }

    const today = new Date();
    // Month is 0-indexed (4 = May)
    const isMay15Date = today.getDate() === 25 && today.getMonth() === 4;
    if (isMay15Date) {
      setIsMay15(true);
    }
  }, []);

  if (isMay15) {
    return <PageNotAvailable />;
  }

  return <FlowerSketchPage />;
}

function PageNotAvailable() {
  return (
    <main className="na-page">
      <div className="na-bg" />
      <div className="na-card animate-fade-in">
        <div className="na-icon-container">
          <div className="na-icon-ring" />
          <span className="na-icon">🌸</span>
        </div>
        <h1 className="na-title">Page Not Available</h1>
        <p className="na-message">
          This page is currently undergoing seasonal updates. Please reach out to the administrator for access or try again later.
        </p>
        <div className="na-divider" />
        <p className="na-footer">Reach out to Admin</p>
      </div>

      <style jsx global>{`
        .na-page {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          font-family: 'Outfit', 'Inter', sans-serif;
          background-color: #0d0914;
        }

        .na-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          background: radial-gradient(circle at 50% 50%, #20132b 0%, #0d0914 100%);
        }

        /* Glowing background blobs */
        .na-bg::before {
          content: '';
          position: absolute;
          top: -20%;
          left: -20%;
          width: 60%;
          height: 60%;
          background: radial-gradient(circle, rgba(255, 75, 114, 0.15) 0%, transparent 70%);
          filter: blur(50px);
          animation: floatBlob1 20s infinite alternate ease-in-out;
        }

        .na-bg::after {
          content: '';
          position: absolute;
          bottom: -20%;
          right: -20%;
          width: 60%;
          height: 60%;
          background: radial-gradient(circle, rgba(189, 0, 255, 0.15) 0%, transparent 70%);
          filter: blur(50px);
          animation: floatBlob2 20s infinite alternate ease-in-out;
        }

        @keyframes floatBlob1 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(10%, 10%) scale(1.1); }
        }

        @keyframes floatBlob2 {
          0% { transform: translate(0, 0) scale(1.1); }
          100% { transform: translate(-10%, -10%) scale(1); }
        }

        .na-card {
          position: relative;
          z-index: 10;
          width: 90%;
          max-width: 440px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 32px;
          padding: 3rem 2rem;
          text-align: center;
          box-shadow:
            0 30px 60px rgba(0, 0, 0, 0.6),
            0 0 100px rgba(255, 75, 114, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transform: translateY(0);
          animation: cardPop 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .na-icon-container {
          position: relative;
          width: 80px;
          height: 80px;
          margin: 0 auto 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .na-icon-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px dashed rgba(255, 75, 114, 0.3);
          animation: spinRing 15s infinite linear;
        }

        .na-icon {
          font-size: 3rem;
          filter: drop-shadow(0 0 10px rgba(255, 75, 114, 0.5));
          animation: floatIcon 4s infinite ease-in-out alternate;
        }

        .na-title {
          font-size: 1.85rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #ffffff 0%, #ff85a2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .na-message {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.6;
          font-weight: 500;
          margin-bottom: 2rem;
          padding: 0 0.5rem;
        }

        .na-divider {
          width: 50px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #ff4b72, transparent);
          margin: 0 auto 1.5rem;
        }

        .na-footer {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #ff4b72;
          text-shadow: 0 0 8px rgba(255, 75, 114, 0.3);
        }

        @keyframes cardPop {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes floatIcon {
          0% { transform: translateY(0) rotate(-5deg); }
          100% { transform: translateY(-8px) rotate(5deg); }
        }
      `}</style>
    </main>
  );
}

function LegacyGiftCard() {
  const [viewMode, setViewMode] = useState<'gift' | 'flower'>('gift');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get('view');
      if (viewParam === 'flower') {
        setViewMode('flower');
        return;
      } else if (viewParam === 'gift' || viewParam === 'panda') {
        setViewMode('gift');
        return;
      }

      const dateParam = params.get('date');
      if (dateParam === '2026-05-23' || dateParam?.includes('23')) {
        setViewMode('flower');
        return;
      }
    }

    const today = new Date();
    // Month is 0-indexed (4 = May). Trigger on May 23 (today!)
    const isMay23 = today.getDate() === 23 && today.getMonth() === 4;
    if (isMay23) {
      setViewMode('flower');
    } else {
      setViewMode('gift');
    }
  }, []);

  const [accepted, setAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showVolumePrompt, setShowVolumePrompt] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; left: number; delay: number; duration: number; size: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate hearts on acceptance
  useEffect(() => {
    if (accepted) {
      const newHearts = Array.from({ length: 45 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100, // percentage
        delay: Math.random() * 4, // seconds
        duration: 3 + Math.random() * 4, // seconds
        size: 15 + Math.random() * 30, // pixels
      }));
      setHearts(newHearts);
    }
  }, [accepted]);

  const handleYes = () => {
    setAccepted(true);
    setRejected(false);
  };

  const handleNo = () => {
    setRejected(true);
    setAccepted(false);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
    setShowVolumePrompt(false);
    if (typeof document !== 'undefined') {
      if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(err => console.log(err));
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen();
        }
      }
    }
  };

  if (viewMode === 'flower') {
    return <FlowerSketchPage />;
  }

  return (
    <main className={`foryou-page ${rejected ? 'theme-red' : accepted ? 'theme-accepted' : ''}`}>
      {/* Background Animated Gradient */}
      <div className={`foryou-bg ${accepted ? 'accepted-bg' : rejected ? 'rejected-bg' : ''}`} />

      {/* Floating Hearts background (visible when accepted) */}
      {accepted && (
        <div className="hearts-container">
          {hearts.map(heart => (
            <div
              key={heart.id}
              className="heart"
              style={{
                left: `${heart.left}%`,
                animationDelay: `${heart.delay}s`,
                animationDuration: `${heart.duration}s`,
                width: `${heart.size}px`,
                height: `${heart.size}px`,
              }}
            >
              ❤️
            </div>
          ))}
        </div>
      )}

      {/* Main Interactive Card */}
      <div className="card-container" ref={containerRef}>
        {accepted ? (
          /* Accepted State: Exactly as per First Reference Image */
          <div className="card-content animate-scale-up">
            <h1 className="accepted-title-ref">
              THATS A GOODGIRL
            </h1>

            {/* Dog holding Rose in Middle */}
            <div className="dog-wrapper accepted-dog-ref">
              <div className="dog-shadow accepted-shadow-ref" />
              <Image
                src="/dog_rose_transparent.png"
                alt="Cute Golden Retriever holding Rose"
                width={350}
                height={350}
                className="dog-img animate-float"
                priority
              />
            </div>

            {/* NEXT Button in bottom right corner */}
            <button
              id="next-button"
              className="btn-next"
              onClick={() => {
                // 1. Open the video player and show custom animated volume prompt
                setShowVideo(true);
                setShowVolumePrompt(true);

                // 2. Request fullscreen on the document (perfect for Desktop / Android)
                if (typeof document !== 'undefined') {
                  const docEl = document.documentElement;
                  if (docEl.requestFullscreen) {
                    docEl.requestFullscreen().catch(() => { });
                  } else if ((docEl as any).webkitRequestFullscreen) {
                    (docEl as any).webkitRequestFullscreen();
                  } else if ((docEl as any).msRequestFullscreen) {
                    (docEl as any).msRequestFullscreen();
                  }

                  // 3. Try targeted elements (overlay / iframe) specifically for iOS/WKWebView compatibilities
                  setTimeout(() => {
                    const overlay = document.querySelector('.video-overlay');
                    const iframe = document.querySelector('.video-iframe');
                    const targets = [overlay, iframe];
                    for (const target of targets) {
                      if (target) {
                        try {
                          if (target.requestFullscreen) {
                            target.requestFullscreen().catch(() => { });
                            break;
                          } else if ((target as any).webkitRequestFullscreen) {
                            (target as any).webkitRequestFullscreen();
                            break;
                          } else if ((target as any).webkitEnterFullscreen) {
                            (target as any).webkitEnterFullscreen();
                            break;
                          }
                        } catch (e) {
                          console.log("iOS/Targeted fullscreen fallback tried: ", e);
                        }
                      }
                    }
                  }, 80);
                }

                // 4. Automatically dismiss the volume prompt after 2 seconds to reveal the video
                setTimeout(() => {
                  setShowVolumePrompt(false);
                }, 2200);
              }}
            >
              NEXT 💖
            </button>
          </div>
        ) : rejected ? (
          /* Rejected State Screen (HOW DARE YOU!) */
          <div className="card-content animate-scale-up">
            <h1 className="rejected-title">
              HOW DARE YOU!
            </h1>

            {/* Speech Bubble */}
            <div className="speech-bubble-container">
              <div className="speech-bubble rejected-bubble">
                THE AUDACITY! I am highly offended! 😡
              </div>
              <div className="speech-bubble-arrow rejected-arrow" />
            </div>

            {/* Angry Chihuahua in the Middle */}
            <div className="dog-wrapper rejected-dog">
              <div className="dog-shadow rejected-shadow" />
              <Image
                src="/chihuahua_transparent.png"
                alt="Angry Indignant Chihuahua"
                width={320}
                height={320}
                className="dog-img animate-shake"
                priority
              />
            </div>

            <button
              id="try-again-button"
              className="btn-pill btn-yes"
              onClick={() => {
                setRejected(false);
                setAccepted(false);
              }}
            >
              TRY AGAIN
            </button>
          </div>
        ) : (
          /* Initial State Screen */
          <div className="card-content animate-fade-in">
            {/* Title - Polish from first image */}
            <h1 className="gift-title">
              PLS ACCEPT THE GIFT
            </h1>

            {/* Speech Bubble */}
            <div className="speech-bubble-container">
              <div className="speech-bubble">
                I brought you these beautiful flowers! Please accept them... 🥺
              </div>
              <div className="speech-bubble-arrow" />
            </div>

            {/* Dog in the Middle */}
            <div className="dog-wrapper">
              <div className="dog-shadow" />
              <Image
                src="/dog_transparent.png"
                alt="Cute Puppy with Flower Bouquet and Hat"
                width={320}
                height={320}
                className="dog-img animate-float"
                priority
              />
            </div>

            {/* Buttons - Pill buttons like first image kept static */}
            <div className="button-group">
              <button
                id="yes-button"
                className="btn-pill btn-yes"
                onClick={handleYes}
              >
                YES
              </button>

              <button
                id="no-button"
                className="btn-pill btn-no"
                onClick={handleNo}
              >
                NO
              </button>
            </div>
          </div>
        )}
      </div>

      {showVideo && (
        <div className="video-overlay animate-video-fade">
          <button
            className="video-close-btn"
            onClick={handleCloseVideo}
            aria-label="Close Video Player"
          >
            ✕ CLOSE PLAYER
          </button>

          {/* Custom Animated Volume Dialog */}
          {showVolumePrompt && (
            <div className="volume-prompt-overlay">
              <div className="volume-prompt-card">
                <div className="volume-speaker-outer">
                  <div className="volume-speaker-pulse" />
                  <span className="speaker-emoji">🔊</span>
                </div>
                <h2 className="volume-prompt-title">RAISE YOUR VOLUME!</h2>
                <p className="volume-prompt-subtitle">Turn your volume to 100% for the best surprise 💖</p>
                <div className="volume-progress-track">
                  <div className="volume-progress-fill" />
                </div>
              </div>
            </div>
          )}

          <div className="video-iframe-wrapper" style={{ opacity: showVolumePrompt ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }}>
            <iframe
              className="video-iframe"
              src="https://www.youtube.com/embed/mpxEUex3dek?start=107&autoplay=1&mute=0&playsinline=1&rel=0&modestbranding=1"
              title="Special Surprise Video"
              allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Styled JSX Styles */}
      <style jsx global>{`
        /* Volume Prompt Styling */
        .volume-prompt-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000000;
          z-index: 100000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.4s ease-out forwards;
        }

        .volume-prompt-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 28px;
          padding: 2.5rem 2rem;
          width: 90%;
          max-width: 400px;
          text-align: center;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4), 0 0 100px rgba(255, 75, 114, 0.15);
          display: flex;
          flex-direction: column;
          align-items: center;
          transform: scale(0.95);
          animation: volumePop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .volume-speaker-outer {
          position: relative;
          width: 90px;
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .volume-speaker-pulse {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(255, 75, 114, 0.2);
          animation: speakerPulse 1.2s infinite ease-out;
        }

        .speaker-emoji {
          font-size: 3.5rem;
          z-index: 2;
          filter: drop-shadow(0 0 10px rgba(255, 75, 114, 0.4));
          animation: speakerShake 0.6s infinite ease-in-out alternate;
        }

        .volume-prompt-title {
          font-size: 1.6rem;
          font-weight: 900;
          color: #ffffff;
          letter-spacing: 1px;
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          background: linear-gradient(45deg, #ff4b72, #ff85a2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .volume-prompt-subtitle {
          font-size: 0.95rem;
          color: #cccccc;
          font-weight: 500;
          line-height: 1.5;
          margin-bottom: 2rem;
        }

        .volume-progress-track {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          overflow: hidden;
          position: relative;
        }

        .volume-progress-fill {
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, #ff4b72 0%, #ff85a2 100%);
          border-radius: 10px;
          animation: progressFillUp 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          box-shadow: 0 0 10px #ff4b72;
        }

        @keyframes volumePop {
          to { transform: scale(1); }
        }

        @keyframes speakerPulse {
          0% { transform: scale(0.9); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        @keyframes speakerShake {
          0% { transform: rotate(-5deg) scale(1); }
          100% { transform: rotate(5deg) scale(1.08); }
        }

        @keyframes progressFillUp {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        /* Fullscreen Landscape Video Player Overlay */
        .video-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #000000;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .video-iframe-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          max-width: 100%;
          max-height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000000;
        }

        .video-iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }

        .video-close-btn {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #ffffff;
          padding: 0.7rem 1.4rem;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 1px;
          cursor: pointer;
          z-index: 100001;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
        }

        .video-close-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
        }

        .video-close-btn:active {
          transform: scale(0.95);
        }

        @keyframes videoFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-video-fade {
          animation: videoFade 0.4s ease-out forwards;
        }

        /* Landscape orientation handling on mobile portrait screens */
        @media (max-width: 768px) and (orientation: portrait) {
          .video-overlay {
            width: 100vh !important;
            height: 100vw !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) rotate(90deg) !important;
            transform-origin: center !important;
          }
        }

        .foryou-page {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          font-family: 'Outfit', 'Inter', sans-serif;
          color: #333333;
          padding: 1.5rem;
          background-color: #ffccd5;
        }

        /* Ambient glowing pink background */
        .foryou-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -2;
          background: radial-gradient(circle at 50% 50%, #fff0f5 0%, #ffb3c1 100%);
          transition: background 1.5s ease-in-out;
        }

        .foryou-bg.accepted-bg {
          background: radial-gradient(circle at 50% 50%, #ffe3e8 0%, #ff85a2 100%);
        }

        .foryou-bg.rejected-bg {
          background: radial-gradient(circle at 50% 50%, #fff0f3 0%, #ff8fa3 100%);
        }


        /* Red Theme overrides for Rejection State */
        .foryou-page.theme-red {
          background-color: #ffcccc !important;
        }

        .foryou-page.theme-red::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          box-shadow: inset 0 0 100px rgba(179, 0, 0, 0.4);
          z-index: 10;
          animation: redVignettePulse 2s infinite ease-in-out;
        }

        .foryou-page.theme-red .foryou-bg.rejected-bg {
          background: radial-gradient(circle at 50% 50%, #ffebeb 0%, #b30000 100%) !important;
        }

        .foryou-page.theme-red .card-container {
          background: rgba(255, 252, 252, 0.95) !important;
          border: 1px solid rgba(179, 0, 0, 0.4) !important;
          box-shadow: 0 24px 64px rgba(179, 0, 0, 0.22), 0 4px 16px rgba(179, 0, 0, 0.08) !important;
        }

        .foryou-page.theme-red #try-again-button {
          background: linear-gradient(135deg, #ff3333 0%, #800000 100%) !important;
          color: #ffffff !important;
          box-shadow: 0 8px 20px rgba(179, 0, 0, 0.25) !important;
        }

        .foryou-page.theme-red #try-again-button:hover {
          background: linear-gradient(135deg, #ff1a1a 0%, #990000 100%) !important;
          box-shadow: 0 10px 25px rgba(179, 0, 0, 0.45) !important;
        }

        .speech-bubble.rejected-bubble {
          background: #b30000 !important;
          color: #ffffff !important;
          box-shadow: 0 10px 25px rgba(179, 0, 0, 0.35) !important;
        }

        .speech-bubble-arrow.rejected-arrow {
          border-top-color: #b30000 !important;
        }

        /* Card Container with soft rose-tinted border and glowing shadow */
        .card-container {
          width: 100%;
          max-width: 480px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 182, 193, 0.6);
          box-shadow: 0 24px 64px rgba(255, 75, 114, 0.12), 0 4px 16px rgba(255, 75, 114, 0.04);
          border-radius: 36px;
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 5;
          text-align: center;
        }

        .card-content {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Heading */
        .gift-title {
          font-size: 2rem;
          font-weight: 800;
          color: #d91b5c;
          letter-spacing: -0.5px;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
        }

        .success-title {
          font-size: 2rem;
          font-weight: 900;
          color: #ff3366;
          letter-spacing: -0.5px;
          margin-bottom: 1.5rem;
          animation: textPulse 1.5s infinite alternate;
        }

        .rejected-title {
          font-size: 2rem;
          font-weight: 900;
          color: #b71c1c;
          letter-spacing: -0.5px;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          animation: textPulse 1s infinite alternate;
          text-shadow: 0 0 15px rgba(183, 28, 28, 0.35);
        }

        .accepted-title-ref {
          font-size: 2.5rem;
          font-weight: 900;
          color: #d91b5c; /* Premium pink/rose title matching theme */
          letter-spacing: 0.5px;
          margin-bottom: 2rem;
          text-transform: uppercase;
          text-align: center;
          font-family: 'Outfit', sans-serif;
        }

        /* Cute speech bubble in deep hot pink theme */
        .speech-bubble-container {
          position: relative;
          width: 100%;
          max-width: 320px;
          margin-bottom: 1.25rem;
          z-index: 4;
        }

        .speech-bubble {
          background: #ff4b72;
          color: #ffffff;
          border-radius: 18px;
          padding: 0.8rem 1.25rem;
          font-size: 0.9rem;
          font-weight: 600;
          line-height: 1.4;
          box-shadow: 0 10px 25px rgba(255, 75, 114, 0.25);
        }

        .speech-bubble-arrow {
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 10px solid #ff4b72;
        }

        /* Dog Image wrapper and shadow */
        .dog-wrapper {
          position: relative;
          width: 250px;
          height: 250px;
          margin: 0.5rem 0 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dog-img {
          object-fit: contain;
          z-index: 2;
          width: 100%;
          height: 100%;
        }

        /* A highly realistic shadow behind the transparent dog */
        .dog-shadow {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 160px;
          height: 22px;
          background: rgba(255, 75, 114, 0.12);
          border-radius: 50%;
          filter: blur(8px);
          z-index: 1;
          transition: width 0.3s, height 0.3s;
        }

        /* Heart floating & bounce animation states */
        .success-dog, .rejected-dog {
          width: 260px;
          height: 260px;
          margin-bottom: 1.5rem;
        }

        .success-shadow {
          width: 170px;
          height: 24px;
          background: rgba(255, 51, 102, 0.15);
          filter: blur(10px);
        }

        .rejected-shadow {
          width: 170px;
          height: 24px;
          background: rgba(183, 28, 28, 0.2);
          filter: blur(10px);
        }

        .accepted-dog-ref {
          width: 320px;
          height: 320px;
          margin-bottom: 2rem;
        }

        .accepted-shadow-ref {
          width: 220px;
          height: 26px;
          background: rgba(255, 75, 114, 0.12);
          filter: blur(12px);
        }

        .floating-crown {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%) rotate(-12deg);
          font-size: 2.2rem;
          z-index: 3;
          animation: crownFloat 2s infinite alternate ease-in-out;
        }

        /* Button group aligned side-by-side like first image reference */
        .button-group {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
          width: 100%;
          min-height: 80px;
          position: relative;
        }

        /* pill button styling with pink theme overlays */
        .btn-pill {
          min-width: 120px;
          padding: 0.9rem 1.8rem;
          border-radius: 20px;
          font-size: 1.15rem;
          font-weight: 800;
          text-align: center;
          border: none;
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.2s;
          box-shadow: 0 8px 20px rgba(255, 75, 114, 0.12);
          outline: none;
        }

        .btn-pill:active {
          transform: scale(0.95);
        }

        /* YES button - beautiful premium deep pink rose gradient */
        .btn-yes {
          background: linear-gradient(135deg, #ff4b72 0%, #ff7b92 100%);
          color: #ffffff;
        }

        .btn-yes:hover {
          background: linear-gradient(135deg, #e62250 0%, #ff5277 100%);
          box-shadow: 0 10px 25px rgba(255, 75, 114, 0.4);
        }

        /* NO button - same matching pill style and pink color */
        .btn-no {
          background: linear-gradient(135deg, #ff4b72 0%, #ff7b92 100%);
          color: #ffffff;
          position: relative;
          z-index: 8;
        }

        .btn-no:hover {
          background: linear-gradient(135deg, #e62250 0%, #ff5277 100%);
          box-shadow: 0 10px 25px rgba(255, 75, 114, 0.4);
        }

        /* NEXT button in pink gradient for "THATS A GOODGIRL" state */
        .btn-next {
          position: absolute;
          bottom: 2.5rem;
          right: 2.5rem;
          background: linear-gradient(135deg, #ff4b72 0%, #ff7b92 100%) !important; /* Premium pink gradient matching YES button */
          color: #ffffff !important;
          padding: 0.9rem 2.2rem;
          border-radius: 20px; /* matched pill rounded shape */
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: 0.5px;
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(255, 75, 114, 0.25) !important;
          transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.2s, background-color 0.2s;
          text-transform: uppercase;
          z-index: 100;
          outline: none;
        }

        .btn-next:hover {
          background: linear-gradient(135deg, #e62250 0%, #ff5277 100%) !important;
          box-shadow: 0 10px 28px rgba(255, 75, 114, 0.4) !important;
          transform: translateY(-2px);
        }

        .btn-next:active {
          transform: translateY(0) scale(0.95);
        }

        /* Celebration letter */
        .gift-reveal-box {
          background: #fff5f7;
          border: 1px dashed #ff4b72;
          border-radius: 20px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: inset 0 2px 8px rgba(255, 75, 114, 0.05);
          position: relative;
          animation: popLetter 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .gift-letter {
          color: #475569;
          font-size: 0.95rem;
          line-height: 1.6;
          text-align: center;
        }

        .gift-letter h3 {
          color: #ff3366;
          font-size: 1.2rem;
          margin-bottom: 0.6rem;
          font-weight: 800;
        }

        .sparkle {
          position: absolute;
          font-size: 1.2rem;
          animation: sparkleSpin 3s infinite linear;
        }

        .left-sparkle {
          top: 10px;
          left: 15px;
        }

        .right-sparkle {
          bottom: 10px;
          right: 15px;
        }

        .btn-reset {
          background: linear-gradient(135deg, #ff4b72 0%, #ff7b92 100%);
          color: white;
          width: 100%;
          max-width: 260px;
          font-size: 1.05rem;
        }

        .btn-reset:hover {
          box-shadow: 0 10px 25px rgba(255, 75, 114, 0.35);
          transform: translateY(-2px);
        }

        /* Floating Hearts Animations */
        .hearts-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          pointer-events: none;
        }

        .heart {
          position: absolute;
          bottom: -50px;
          font-size: 2rem;
          color: #ff3366;
          text-shadow: 0 4px 8px rgba(255, 51, 102, 0.15);
          animation: floatUp 5s infinite linear;
          opacity: 0;
        }

        /* CSS Keyframe Animations */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }

        .animate-scale-up {
          animation: scaleUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        .animate-float {
          animation: float 4s infinite ease-in-out;
        }

        @keyframes successBounce {
          0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
          40% { transform: translateY(-15px) scale(1.02) rotate(2deg); }
          60% { transform: translateY(-8px) scale(0.98) rotate(-1deg); }
        }

        .animate-success-bounce {
          animation: successBounce 2.5s infinite ease-in-out;
        }

        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          20%, 60% { transform: rotate(-3deg) scale(1.01); }
          40%, 80% { transform: rotate(3deg) scale(0.99); }
        }

        .animate-shake {
          animation: shake 0.3s infinite ease-in-out;
        }

        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(0.3) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          90% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(-105vh) scale(1.2) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes crownFloat {
          from { transform: translateX(-50%) translateY(0) rotate(-12deg); }
          to { transform: translateX(-50%) translateY(-6px) rotate(-12deg); }
        }

        @keyframes textPulse {
          from { transform: scale(1); }
          to { transform: scale(1.03); }
        }

        @keyframes redVignettePulse {
          0%, 100% { opacity: 0.65; }
          50% { opacity: 1; }
        }

        @keyframes sparkleSpin {
          0% { transform: scale(0.8) rotate(0deg); opacity: 0.5; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
          100% { transform: scale(0.8) rotate(360deg); opacity: 0.5; }
        }

        @keyframes popLetter {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        /* Mobile specific enhancements */
        @media (max-width: 600px) {
          .foryou-page {
            padding: 1rem;
          }
          .card-container {
            border-radius: 28px;
            padding: 2rem 1.25rem;
          }
          .gift-title, .success-title {
            font-size: 1.65rem;
          }
          .dog-wrapper {
            width: 220px;
            height: 220px;
            margin-bottom: 1.5rem;
          }
          .dog-shadow {
            width: 140px;
            height: 18px;
          }
          .success-dog {
            width: 220px;
            height: 220px;
          }
          .btn-pill {
            min-width: 105px;
            padding: 0.8rem 1.4rem;
            font-size: 1.05rem;
          }
          .button-group {
            gap: 1rem;
          }
          .speech-bubble {
            font-size: 0.85rem;
            padding: 0.7rem 1rem;
          }
          .floating-crown {
            font-size: 1.8rem;
          }
          .accepted-title-ref {
            font-size: 1.8rem !important;
            margin-bottom: 1.5rem !important;
          }
          .accepted-dog-ref {
            width: 250px !important;
            height: 250px !important;
          }
          .accepted-shadow-ref {
            width: 170px !important;
            height: 20px !important;
          }
          .btn-next {
            position: relative !important;
            bottom: auto !important;
            right: auto !important;
            margin-top: 1.5rem !important;
            width: 100% !important;
            max-width: 200px !important;
            text-align: center !important;
            display: inline-block !important;
            box-shadow: 0 6px 18px rgba(255, 75, 114, 0.2) !important;
          }
        }
      `}</style>
    </main>
  );
}

/* ============================================================
 * FLOWER SKETCH SCREEN — Real-time glowing flower sketch
 * ============================================================ */

interface Point {
  x: number;
  y: number;
}

interface StrokePath {
  points: Point[];
  color: string;
  widthFactor: number;
  phaseStart: number; // 0.0 to 1.0
  phaseEnd: number;   // 0.0 to 1.0
  isGuideLine?: boolean;
  isPetal?: boolean;
  petalBase?: Point;
  petalTip?: Point;
  petalLeft?: Point;
  petalRight?: Point;
  cpLeft?: Point;
  cpRight?: Point;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  isFlower?: boolean;
}

interface GlowingPlant {
  id: number;
  x: number;
  height: number;
  curve: number;
  growth: number;
  speed: number;
  color: string;
  leafColor: string;
  flowerSize: number;
  delay: number;
}

function FlowerSketchPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Settings
  const [showVolumeHint, setShowVolumeHint] = useState(true);
  const [fadeOutHint, setFadeOutHint] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const handleDismissVolumeHint = () => {
    if (fadeOutHint) return;
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setAudioPlaying(true);
        })
        .catch(err => {
          console.log("Audio play error on dismiss:", err);
          setAudioPlaying(false);
        });
    }
    setFadeOutHint(true);
    setTimeout(() => {
      setShowVolumeHint(false);
    }, 500);
  };

  // Background Music Playback (unedited.mp3 on repeat, played automatically after intro is dismissed)
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/unedited.mp3');
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, []);

  useEffect(() => {
    if (!showVolumeHint && audioRef.current) {
      const playAudio = () => {
        audioRef.current?.play()
          .then(() => {
            setAudioPlaying(true);
          })
          .catch(err => {
            console.log("Autoplay blocked or audio error:", err);
            setAudioPlaying(false);
          });
      };

      playAudio();

      // Fallback: play on first user interaction if blocked by browser policy
      const handleInteraction = () => {
        playAudio();
        document.removeEventListener('click', handleInteraction);
        document.removeEventListener('touchstart', handleInteraction);
      };

      document.addEventListener('click', handleInteraction);
      document.addEventListener('touchstart', handleInteraction);

      return () => {
        document.removeEventListener('click', handleInteraction);
        document.removeEventListener('touchstart', handleInteraction);
      };
    }
  }, [showVolumeHint]);

  const [preset] = useState<'rose' | 'lotus' | 'sakura'>('rose');
  const [palette, setPalette] = useState<'cherry' | 'cyan' | 'gold' | 'purple'>('cherry');
  const [speed, setSpeed] = useState<number>(0.5);
  const [glow, setGlow] = useState<number>(16);
  const [drawMode, setDrawMode] = useState<'auto' | 'interactive'>('auto');

  // Background twinkling sparkles
  const bgSparkles = useRef<{ x: number; y: number; size: number; maxOpacity: number; speed: number; phase: number }[]>([]);
  const bgBokeh = useRef<{ x: number; y: number; size: number; maxOpacity: number; speed: number; phase: number; color: string }[]>([]);

  // Canvas dimensions state to avoid reading refs during render
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: typeof window !== 'undefined' ? window.innerWidth : 800,
    height: typeof window !== 'undefined' ? window.innerHeight : 600
  });

  // Glowing Plants animation refs
  const plantsRef = useRef<GlowingPlant[]>([]);
  const showPlantsRef = useRef(false);

  useEffect(() => {
    // Reset refs on clean up or new mount
    showPlantsRef.current = false;
    plantsRef.current = [];

    const timer = setTimeout(() => {
      showPlantsRef.current = true;
      const width = canvasRef.current ? canvasRef.current.width / (window.devicePixelRatio || 1) : window.innerWidth;
      const numPlants = 24;
      const newPlants: GlowingPlant[] = [];

      for (let i = 0; i < numPlants; i++) {
        const x = (width * 0.05) + (width * 0.9) * (i / (numPlants - 1)) + (Math.random() - 0.5) * 20;
        const height = 45 + Math.random() * 75;
        const curve = (Math.random() - 0.5) * 30;
        const speed = 0.008 + Math.random() * 0.012; // slow organic growth

        const flowerColors = ['#ff0f43', '#ff5e00', '#ffde00', '#ff007f', '#bd00ff'];
        const color = flowerColors[Math.floor(Math.random() * flowerColors.length)];

        newPlants.push({
          id: i,
          x,
          height,
          curve,
          growth: 0.0,
          speed,
          color,
          leafColor: '#2e8b57',
          flowerSize: 4.5 + Math.random() * 5.5,
          delay: Math.random() * 3000 // stagger delay up to 3 seconds
        });
      }
      plantsRef.current = newPlants;
    }, 10000); // 10 seconds delay!

    return () => clearTimeout(timer);
  }, [dimensions]);

  // Animation progress stored in a ref to avoid infinite re-renders
  const progressRef = useRef<number>(0);
  const [replayKey, setReplayKey] = useState<number>(0);

  // Manual drawing lines
  const [userLines, setUserLines] = useState<{ points: Point[]; color: string; width: number }[]>([]);
  const [currentLine, setCurrentLine] = useState<Point[] | null>(null);
  const isDrawingRef = useRef(false);

  // Palette details mapping
  const paletteColors = {
    cherry: { core: '#ffffff', stroke: '#ff0f43', glow1: '#ff5e00', glow2: '#ffde00' },
    cyan: { core: '#ffffff', stroke: '#00f5ff', glow1: '#00fa9a', glow2: '#0000ff' },
    gold: { core: '#ffffff', stroke: '#ffd700', glow1: '#ff8c00', glow2: '#ff4500' },
    purple: { core: '#ffffff', stroke: '#bd00ff', glow1: '#ff007f', glow2: '#8a2be2' }
  };

  const activeColors = paletteColors[palette];

  // Helper: Get point on quadratic bezier
  const getQuadBezierPoint = (p0: Point, p1: Point, p2: Point, t: number): Point => {
    return {
      x: (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x,
      y: (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y
    };
  };

  // Helper: Generate a detailed line between two points
  const generateLinePoints = (p0: Point, p1: Point, steps = 15): Point[] => {
    const points: Point[] = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      points.push({
        x: p0.x + (p1.x - p0.x) * t,
        y: p0.y + (p1.y - p0.y) * t
      });
    }
    return points;
  };

  // Main Vector Path Generation Engine
  const sketchPaths: StrokePath[] = React.useMemo(() => {
    if (typeof window === 'undefined') return [];

    const { width, height } = dimensions;

    const cx = width / 2;
    const cy = height * 0.45;
    const R = Math.min(width, height) * 0.16;

    const paths: StrokePath[] = [];

    // ====================
    // STAGE 1: Guide Lines (0.0 to 0.08)
    // ====================
    const guideColor = activeColors.glow2;
    const circPoints: Point[] = [];
    for (let i = 0; i <= 60; i++) {
      const theta = (i / 60) * Math.PI * 2;
      circPoints.push({
        x: cx + Math.cos(theta) * R,
        y: cy + Math.sin(theta) * R
      });
    }
    paths.push({
      points: circPoints,
      color: guideColor,
      widthFactor: 0.5,
      phaseStart: 0.0,
      phaseEnd: 0.04,
      isGuideLine: true
    });

    paths.push({
      points: [{ x: cx, y: cy - R * 1.4 }, { x: cx, y: cy + R * 1.4 }],
      color: guideColor,
      widthFactor: 0.4,
      phaseStart: 0.03,
      phaseEnd: 0.06,
      isGuideLine: true
    });

    paths.push({
      points: [{ x: cx - R * 1.4, y: cy }, { x: cx + R * 1.4, y: cy }],
      color: guideColor,
      widthFactor: 0.4,
      phaseStart: 0.05,
      phaseEnd: 0.08,
      isGuideLine: true
    });

    // ====================
    // STAGE 2: Stem (0.08 to 0.22)
    // ====================
    const stemStart = { x: cx, y: height * 0.95 };
    const stemEnd = { x: cx, y: cy };
    const stemControl = { x: cx - 45, y: height * 0.7 };
    const stemPoints: Point[] = [];
    for (let i = 0; i <= 40; i++) {
      stemPoints.push(getQuadBezierPoint(stemStart, stemControl, stemEnd, i / 40));
    }
    paths.push({
      points: stemPoints,
      color: '#2e8b57',
      widthFactor: 1.8,
      phaseStart: 0.08,
      phaseEnd: 0.22
    });

    // Thorns on the stem for artistic realism
    const thorn1Pos = getQuadBezierPoint(stemStart, stemControl, stemEnd, 0.35);
    const thorn1Tip = { x: thorn1Pos.x - 12, y: thorn1Pos.y - 4 };
    const thorn1Points = [thorn1Pos, thorn1Tip, { x: thorn1Pos.x - 4, y: thorn1Pos.y + 6 }];
    paths.push({
      points: thorn1Points,
      color: '#2e8b57',
      widthFactor: 1.2,
      phaseStart: 0.14,
      phaseEnd: 0.17
    });

    const thorn2Pos = getQuadBezierPoint(stemStart, stemControl, stemEnd, 0.58);
    const thorn2Tip = { x: thorn2Pos.x + 12, y: thorn2Pos.y - 2 };
    const thorn2Points = [thorn2Pos, thorn2Tip, { x: thorn2Pos.x + 4, y: thorn2Pos.y + 6 }];
    paths.push({
      points: thorn2Points,
      color: '#2e8b57',
      widthFactor: 1.2,
      phaseStart: 0.17,
      phaseEnd: 0.20
    });

    // ====================
    // STAGE 3: Leaves (0.22 to 0.35)
    // ====================
    const leaf1Branch = getQuadBezierPoint(stemStart, stemControl, stemEnd, 0.45);
    const leaf1Tip = { x: leaf1Branch.x - R * 0.9, y: leaf1Branch.y - R * 0.2 };
    const leaf1ControlU = { x: leaf1Branch.x - R * 0.4, y: leaf1Branch.y - R * 0.6 };
    const leaf1ControlD = { x: leaf1Branch.x - R * 0.5, y: leaf1Branch.y + R * 0.2 };

    const leaf1Points: Point[] = [];
    for (let i = 0; i <= 20; i++) {
      leaf1Points.push(getQuadBezierPoint(leaf1Branch, leaf1ControlU, leaf1Tip, i / 20));
    }
    for (let i = 0; i <= 20; i++) {
      leaf1Points.push(getQuadBezierPoint(leaf1Tip, leaf1ControlD, leaf1Branch, i / 20));
    }
    paths.push({
      points: leaf1Points,
      color: '#3cb371',
      widthFactor: 1.2,
      phaseStart: 0.22,
      phaseEnd: 0.29
    });

    const leaf2Branch = getQuadBezierPoint(stemStart, stemControl, stemEnd, 0.65);
    const leaf2Tip = { x: leaf2Branch.x + R * 0.8, y: leaf2Branch.y - R * 0.3 };
    const leaf2ControlU = { x: leaf2Branch.x + R * 0.3, y: leaf2Branch.y - R * 0.6 };
    const leaf2ControlD = { x: leaf2Branch.x + R * 0.4, y: leaf2Branch.y + R * 0.1 };

    const leaf2Points: Point[] = [];
    for (let i = 0; i <= 20; i++) {
      leaf2Points.push(getQuadBezierPoint(leaf2Branch, leaf2ControlU, leaf2Tip, i / 20));
    }
    for (let i = 0; i <= 20; i++) {
      leaf2Points.push(getQuadBezierPoint(leaf2Tip, leaf2ControlD, leaf2Branch, i / 20));
    }
    paths.push({
      points: leaf2Points,
      color: '#3cb371',
      widthFactor: 1.2,
      phaseStart: 0.28,
      phaseEnd: 0.35
    });

    // ====================
    // STAGES 4, 5, 6: Petals and center (0.35 to 1.0)
    // ====================
    if (preset === 'sakura') {
      const numPetals = 5;
      const angleStep = (Math.PI * 2) / numPetals;

      for (let k = 0; k < numPetals; k++) {
        const theta = k * angleStep - Math.PI / 2;
        const ltx = cx + Math.cos(theta - 0.24) * R * 1.1;
        const lty = cy + Math.sin(theta - 0.24) * R * 1.1;

        const ccx = cx + Math.cos(theta) * R * 0.95;
        const ccy = cy + Math.sin(theta) * R * 0.95;

        const rtx = cx + Math.cos(theta + 0.24) * R * 1.1;
        const rty = cy + Math.sin(theta + 0.24) * R * 1.1;

        const cpL = { x: cx + Math.cos(theta - 0.42) * R * 0.65, y: cy + Math.sin(theta - 0.42) * R * 0.65 };
        const cpR = { x: cx + Math.cos(theta + 0.42) * R * 0.65, y: cy + Math.sin(theta + 0.42) * R * 0.65 };

        const petalPoints: Point[] = [];
        for (let i = 0; i <= 15; i++) petalPoints.push(getQuadBezierPoint({ x: cx, y: cy }, cpL, { x: ltx, y: lty }, i / 15));
        petalPoints.push(...generateLinePoints({ x: ltx, y: lty }, { x: ccx, y: ccy }, 6));
        petalPoints.push(...generateLinePoints({ x: ccx, y: ccy }, { x: rtx, y: rty }, 6));
        for (let i = 0; i <= 15; i++) petalPoints.push(getQuadBezierPoint({ x: rtx, y: rty }, cpR, { x: cx, y: cy }, i / 15));

        const startPhase = 0.35 + (k * 0.08);
        const endPhase = startPhase + 0.09;

        paths.push({
          points: petalPoints,
          color: activeColors.stroke,
          widthFactor: 1.4,
          phaseStart: startPhase,
          phaseEnd: endPhase
        });
      }

      const stamenCount = 10;
      for (let s = 0; s < stamenCount; s++) {
        const phi = (s / stamenCount) * Math.PI * 2;
        const startPt = { x: cx + Math.cos(phi) * R * 0.15, y: cy + Math.sin(phi) * R * 0.15 };
        const endPt = { x: cx + Math.cos(phi) * R * 0.48, y: cy + Math.sin(phi) * R * 0.48 };

        const stamenCtrl = {
          x: cx + Math.cos(phi + 0.1) * R * 0.32,
          y: cy + Math.sin(phi + 0.1) * R * 0.32
        };

        const stamenPoints: Point[] = [];
        for (let i = 0; i <= 12; i++) {
          stamenPoints.push(getQuadBezierPoint(startPt, stamenCtrl, endPt, i / 12));
        }

        paths.push({
          points: stamenPoints,
          color: activeColors.glow2,
          widthFactor: 0.8,
          phaseStart: 0.75 + (s * 0.015),
          phaseEnd: 0.77 + (s * 0.015)
        });
      }

      const centerRingPoints: Point[] = [];
      for (let i = 0; i <= 30; i++) {
        const phi = (i / 30) * Math.PI * 2;
        centerRingPoints.push({
          x: cx + Math.cos(phi) * R * 0.18,
          y: cy + Math.sin(phi) * R * 0.18
        });
      }
      paths.push({
        points: centerRingPoints,
        color: activeColors.stroke,
        widthFactor: 1.1,
        phaseStart: 0.92,
        phaseEnd: 1.0
      });

    } else if (preset === 'lotus') {
      const numOuter = 8;
      for (let k = 0; k < numOuter; k++) {
        const theta = (k / numOuter) * Math.PI * 2 - Math.PI / 2;
        const tx = cx + Math.cos(theta) * R * 1.15;
        const ty = cy + Math.sin(theta) * R * 1.15;

        const cpL = { x: cx + Math.cos(theta - 0.36) * R * 0.7, y: cy + Math.sin(theta - 0.36) * R * 0.7 };
        const cpR = { x: cx + Math.cos(theta + 0.36) * R * 0.7, y: cy + Math.sin(theta + 0.36) * R * 0.7 };

        const petalPoints: Point[] = [];
        for (let i = 0; i <= 18; i++) petalPoints.push(getQuadBezierPoint({ x: cx, y: cy }, cpL, { x: tx, y: ty }, i / 18));
        for (let i = 0; i <= 18; i++) petalPoints.push(getQuadBezierPoint({ x: tx, y: ty }, cpR, { x: cx, y: cy }, i / 18));

        paths.push({
          points: petalPoints,
          color: activeColors.stroke,
          widthFactor: 1.3,
          phaseStart: 0.35 + (k * 0.025),
          phaseEnd: 0.38 + (k * 0.025)
        });
      }

      const numMid = 6;
      for (let k = 0; k < numMid; k++) {
        const theta = (k / numMid) * Math.PI * 2 - Math.PI / 2 + Math.PI / 6;
        const tx = cx + Math.cos(theta) * R * 0.88;
        const ty = cy + Math.sin(theta) * R * 0.88;

        const cpL = { x: cx + Math.cos(theta - 0.3) * R * 0.5, y: cy + Math.sin(theta - 0.3) * R * 0.5 };
        const cpR = { x: cx + Math.cos(theta + 0.3) * R * 0.5, y: cy + Math.sin(theta + 0.3) * R * 0.5 };

        const petalPoints: Point[] = [];
        for (let i = 0; i <= 16; i++) petalPoints.push(getQuadBezierPoint({ x: cx, y: cy }, cpL, { x: tx, y: ty }, i / 16));
        for (let i = 0; i <= 16; i++) petalPoints.push(getQuadBezierPoint({ x: tx, y: ty }, cpR, { x: cx, y: cy }, i / 16));

        paths.push({
          points: petalPoints,
          color: activeColors.glow2,
          widthFactor: 1.1,
          phaseStart: 0.58 + (k * 0.03),
          phaseEnd: 0.61 + (k * 0.03)
        });
      }

      const numInner = 5;
      for (let k = 0; k < numInner; k++) {
        const theta = (k / numInner) * Math.PI * 2 - Math.PI / 2 + Math.PI / 10;
        const tx = cx + Math.cos(theta) * R * 0.58;
        const ty = cy + Math.sin(theta) * R * 0.58;

        const cpL = { x: cx + Math.cos(theta - 0.25) * R * 0.32, y: cy + Math.sin(theta - 0.25) * R * 0.32 };
        const cpR = { x: cx + Math.cos(theta + 0.25) * R * 0.32, y: cy + Math.sin(theta + 0.25) * R * 0.32 };

        const petalPoints: Point[] = [];
        for (let i = 0; i <= 15; i++) petalPoints.push(getQuadBezierPoint({ x: cx, y: cy }, cpL, { x: tx, y: ty }, i / 15));
        for (let i = 0; i <= 15; i++) petalPoints.push(getQuadBezierPoint({ x: tx, y: ty }, cpR, { x: cx, y: cy }, i / 15));

        paths.push({
          points: petalPoints,
          color: activeColors.core,
          widthFactor: 0.95,
          phaseStart: 0.78 + (k * 0.025),
          phaseEnd: 0.81 + (k * 0.025)
        });
      }

      const podPoints: Point[] = [];
      for (let i = 0; i <= 25; i++) {
        const phi = (i / 25) * Math.PI * 2;
        podPoints.push({
          x: cx + Math.cos(phi) * R * 0.22,
          y: cy + Math.sin(phi) * R * 0.22
        });
      }
      paths.push({
        points: podPoints,
        color: activeColors.stroke,
        widthFactor: 1.2,
        phaseStart: 0.92,
        phaseEnd: 0.97
      });

      const seedColor = activeColors.glow1;
      for (let s = 0; s < 6; s++) {
        const phi = (s / 6) * Math.PI * 2;
        const seedX = cx + Math.cos(phi) * R * 0.11;
        const seedY = cy + Math.sin(phi) * R * 0.11;
        paths.push({
          points: [{ x: seedX, y: seedY }, { x: seedX + 1, y: seedY + 1 }],
          color: seedColor,
          widthFactor: 3.0,
          phaseStart: 0.96 + (s * 0.005),
          phaseEnd: 0.98 + (s * 0.005)
        });
      }

    } else {
      // 1. Sepals (Calyx) under the rose for ultimate realism (0.20 to 0.26)
      const numSepals = 3;
      for (let k = 0; k < numSepals; k++) {
        const theta = Math.PI / 2 + (k - 1) * 0.42; // Distributed beneath the rose base
        const sepalTip = {
          x: cx + Math.cos(theta) * R * 0.64,
          y: cy + Math.sin(theta) * R * 0.64
        };
        const sepalCtrlLeft = {
          x: cx + Math.cos(theta - 0.22) * R * 0.35,
          y: cy + Math.sin(theta - 0.22) * R * 0.35
        };
        const sepalCtrlRight = {
          x: cx + Math.cos(theta + 0.22) * R * 0.35,
          y: cy + Math.sin(theta + 0.22) * R * 0.35
        };

        const sepalPoints: Point[] = [];
        // Left curve out
        for (let i = 0; i <= 15; i++) {
          sepalPoints.push(getQuadBezierPoint({ x: cx, y: cy + R * 0.05 }, sepalCtrlLeft, sepalTip, i / 15));
        }
        // Right curve back
        for (let i = 0; i <= 15; i++) {
          sepalPoints.push(getQuadBezierPoint(sepalTip, sepalCtrlRight, { x: cx, y: cy + R * 0.05 }, i / 15));
        }

        paths.push({
          points: sepalPoints,
          color: '#2e8b57',
          widthFactor: 1.15,
          phaseStart: 0.20 + k * 0.025,
          phaseEnd: 0.25 + k * 0.025
        });
      }

      // 2. Outer Rose Petals - Layer 1 (0.30 to 0.58)
      // Generates 7 gorgeous, overlapping, organic outer petals with beautiful ruffled edges
      const numRoseOuter = 7;
      for (let k = 0; k < numRoseOuter; k++) {
        const theta = (k / numRoseOuter) * Math.PI * 2 - Math.PI / 2 + (k * 0.04);

        const baseAngleLeft = theta - Math.PI / 3.2;
        const baseAngleRight = theta + Math.PI / 3.2;
        const baseR = R * 0.24;
        const baseLeft = { x: cx + Math.cos(baseAngleLeft) * baseR, y: cy + Math.sin(baseAngleLeft) * baseR };
        const baseRight = { x: cx + Math.cos(baseAngleRight) * baseR, y: cy + Math.sin(baseAngleRight) * baseR };

        const ptTip = { x: cx + Math.cos(theta) * R * 1.25, y: cy + Math.sin(theta) * R * 1.25 };
        const ptLeft = { x: cx + Math.cos(theta - 0.38) * R * 1.15, y: cy + Math.sin(theta - 0.38) * R * 1.15 };
        const ptRight = { x: cx + Math.cos(theta + 0.38) * R * 1.15, y: cy + Math.sin(theta + 0.38) * R * 1.15 };

        const cpLeft = { x: cx + Math.cos(theta - 0.48) * R * 0.78, y: cy + Math.sin(theta - 0.48) * R * 0.78 };
        const cpRight = { x: cx + Math.cos(theta + 0.48) * R * 0.78, y: cy + Math.sin(theta + 0.48) * R * 0.78 };

        const petalPoints: Point[] = [];

        // Left curve from offset base to left shoulder
        for (let i = 0; i <= 12; i++) {
          petalPoints.push(getQuadBezierPoint(baseLeft, cpLeft, ptLeft, i / 12));
        }

        // Top left edge with delicate sine ruffles (organic growth)
        for (let i = 0; i <= 12; i++) {
          const t = i / 12;
          const px = ptLeft.x + (ptTip.x - ptLeft.x) * t;
          const py = ptLeft.y + (ptTip.y - ptLeft.y) * t;
          const dx = ptTip.x - ptLeft.x;
          const dy = ptTip.y - ptLeft.y;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          const nx = -dy / len;
          const ny = dx / len;
          const wobble = Math.sin(t * Math.PI) * 4.5 * Math.sin(t * Math.PI * 2.5);
          petalPoints.push({ x: px + nx * wobble, y: py + ny * wobble });
        }

        // Top right edge with delicate sine ruffles
        for (let i = 0; i <= 12; i++) {
          const t = i / 12;
          const px = ptTip.x + (ptRight.x - ptTip.x) * t;
          const py = ptTip.y + (ptRight.y - ptTip.y) * t;
          const dx = ptRight.x - ptTip.x;
          const dy = ptRight.y - ptTip.y;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          const nx = -dy / len;
          const ny = dx / len;
          const wobble = Math.sin(t * Math.PI) * 4.5 * Math.sin(t * Math.PI * 2.5);
          petalPoints.push({ x: px + nx * wobble, y: py + ny * wobble });
        }

        // Right curve back to offset base
        for (let i = 0; i <= 12; i++) {
          petalPoints.push(getQuadBezierPoint(ptRight, cpRight, baseRight, i / 12));
        }

        paths.push({
          points: petalPoints,
          color: activeColors.stroke,
          widthFactor: 1.5,
          phaseStart: 0.30 + (k * 0.038),
          phaseEnd: 0.34 + (k * 0.038),
          isPetal: true,
          petalBase: { x: (baseLeft.x + baseRight.x) / 2, y: (baseLeft.y + baseRight.y) / 2 },
          petalTip: ptTip,
          petalLeft: ptLeft,
          petalRight: ptRight,
          cpLeft: cpLeft,
          cpRight: cpRight
        });
      }

      // 3. Middle Rose Petals - Layer 2 (0.56 to 0.76)
      // Generates 6 overlapping middle petals
      const numRoseMid = 6;
      for (let k = 0; k < numRoseMid; k++) {
        const theta = (k / numRoseMid) * Math.PI * 2 - Math.PI / 2 + Math.PI / 6 + (k * 0.03);

        const baseAngleLeft = theta - Math.PI / 3.0;
        const baseAngleRight = theta + Math.PI / 3.0;
        const baseR = R * 0.16;
        const baseLeft = { x: cx + Math.cos(baseAngleLeft) * baseR, y: cy + Math.sin(baseAngleLeft) * baseR };
        const baseRight = { x: cx + Math.cos(baseAngleRight) * baseR, y: cy + Math.sin(baseAngleRight) * baseR };

        const ptTip = { x: cx + Math.cos(theta) * R * 0.95, y: cy + Math.sin(theta) * R * 0.95 };
        const ptLeft = { x: cx + Math.cos(theta - 0.35) * R * 0.86, y: cy + Math.sin(theta - 0.35) * R * 0.86 };
        const ptRight = { x: cx + Math.cos(theta + 0.35) * R * 0.86, y: cy + Math.sin(theta + 0.35) * R * 0.86 };

        const cpLeft = { x: cx + Math.cos(theta - 0.44) * R * 0.58, y: cy + Math.sin(theta - 0.44) * R * 0.58 };
        const cpRight = { x: cx + Math.cos(theta + 0.44) * R * 0.58, y: cy + Math.sin(theta + 0.44) * R * 0.58 };

        const petalPoints: Point[] = [];

        for (let i = 0; i <= 10; i++) {
          petalPoints.push(getQuadBezierPoint(baseLeft, cpLeft, ptLeft, i / 10));
        }

        for (let i = 0; i <= 10; i++) {
          const t = i / 10;
          const px = ptLeft.x + (ptTip.x - ptLeft.x) * t;
          const py = ptLeft.y + (ptTip.y - ptLeft.y) * t;
          const dx = ptTip.x - ptLeft.x;
          const dy = ptTip.y - ptLeft.y;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          const nx = -dy / len;
          const ny = dx / len;
          const wobble = Math.sin(t * Math.PI) * 3.2 * Math.sin(t * Math.PI * 2.0);
          petalPoints.push({ x: px + nx * wobble, y: py + ny * wobble });
        }

        for (let i = 0; i <= 10; i++) {
          const t = i / 10;
          const px = ptTip.x + (ptRight.x - ptTip.x) * t;
          const py = ptTip.y + (ptRight.y - ptTip.y) * t;
          const dx = ptRight.x - ptTip.x;
          const dy = ptRight.y - ptTip.y;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          const nx = -dy / len;
          const ny = dx / len;
          const wobble = Math.sin(t * Math.PI) * 3.2 * Math.sin(t * Math.PI * 2.0);
          petalPoints.push({ x: px + nx * wobble, y: py + ny * wobble });
        }

        for (let i = 0; i <= 10; i++) {
          petalPoints.push(getQuadBezierPoint(ptRight, cpRight, baseRight, i / 10));
        }

        paths.push({
          points: petalPoints,
          color: activeColors.glow2,
          widthFactor: 1.32,
          phaseStart: 0.56 + (k * 0.032),
          phaseEnd: 0.60 + (k * 0.032),
          isPetal: true,
          petalBase: { x: (baseLeft.x + baseRight.x) / 2, y: (baseLeft.y + baseRight.y) / 2 },
          petalTip: ptTip,
          petalLeft: ptLeft,
          petalRight: ptRight,
          cpLeft: cpLeft,
          cpRight: cpRight
        });
      }

      // 4. Inner Rose Petals - Layer 3 (0.74 to 0.88)
      // Generates 5 tightly cupped inner petals
      const numRoseInner = 5;
      for (let k = 0; k < numRoseInner; k++) {
        const theta = (k / numRoseInner) * Math.PI * 2 - Math.PI / 2 + Math.PI / 10 + (k * 0.02);

        const baseAngleLeft = theta - Math.PI / 2.8;
        const baseAngleRight = theta + Math.PI / 2.8;
        const baseR = R * 0.09;
        const baseLeft = { x: cx + Math.cos(baseAngleLeft) * baseR, y: cy + Math.sin(baseAngleLeft) * baseR };
        const baseRight = { x: cx + Math.cos(baseAngleRight) * baseR, y: cy + Math.sin(baseAngleRight) * baseR };

        const ptTip = { x: cx + Math.cos(theta) * R * 0.66, y: cy + Math.sin(theta) * R * 0.66 };
        const ptLeft = { x: cx + Math.cos(theta - 0.28) * R * 0.58, y: cy + Math.sin(theta - 0.28) * R * 0.58 };
        const ptRight = { x: cx + Math.cos(theta + 0.28) * R * 0.58, y: cy + Math.sin(theta + 0.28) * R * 0.58 };

        const cpLeft = { x: cx + Math.cos(theta - 0.38) * R * 0.42, y: cy + Math.sin(theta - 0.38) * R * 0.42 };
        const cpRight = { x: cx + Math.cos(theta + 0.38) * R * 0.42, y: cy + Math.sin(theta + 0.38) * R * 0.42 };

        const petalPoints: Point[] = [];

        for (let i = 0; i <= 8; i++) {
          petalPoints.push(getQuadBezierPoint(baseLeft, cpLeft, ptLeft, i / 8));
        }

        for (let i = 0; i <= 8; i++) {
          const t = i / 8;
          const px = ptLeft.x + (ptTip.x - ptLeft.x) * t;
          const py = ptLeft.y + (ptTip.y - ptLeft.y) * t;
          const dx = ptTip.x - ptLeft.x;
          const dy = ptTip.y - ptLeft.y;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          const nx = -dy / len;
          const ny = dx / len;
          const wobble = Math.sin(t * Math.PI) * 2.0 * Math.sin(t * Math.PI * 1.5);
          petalPoints.push({ x: px + nx * wobble, y: py + ny * wobble });
        }

        for (let i = 0; i <= 8; i++) {
          const t = i / 8;
          const px = ptTip.x + (ptRight.x - ptTip.x) * t;
          const py = ptTip.y + (ptRight.y - ptTip.y) * t;
          const dx = ptRight.x - ptTip.x;
          const dy = ptRight.y - ptTip.y;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          const nx = -dy / len;
          const ny = dx / len;
          const wobble = Math.sin(t * Math.PI) * 2.0 * Math.sin(t * Math.PI * 1.5);
          petalPoints.push({ x: px + nx * wobble, y: py + ny * wobble });
        }

        for (let i = 0; i <= 8; i++) {
          petalPoints.push(getQuadBezierPoint(ptRight, cpRight, baseRight, i / 8));
        }

        paths.push({
          points: petalPoints,
          color: activeColors.glow1,
          widthFactor: 1.15,
          phaseStart: 0.74 + (k * 0.026),
          phaseEnd: 0.78 + (k * 0.026),
          isPetal: true,
          petalBase: { x: (baseLeft.x + baseRight.x) / 2, y: (baseLeft.y + baseRight.y) / 2 },
          petalTip: ptTip,
          petalLeft: ptLeft,
          petalRight: ptRight,
          cpLeft: cpLeft,
          cpRight: cpRight
        });
      }

      // 5. Tight Logarithmic Spiral Core (0.88 to 1.0)
      // Generates a dense, elegant central bud that rolls tightly into the center
      const spiralPoints: Point[] = [];
      const numTurns = 2.4;
      const maxSpirRadius = R * 0.38;
      for (let i = 0; i <= 70; i++) {
        const t = i / 70;
        const phi = t * Math.PI * 2 * numTurns + Math.PI / 2;
        const rad = Math.pow(1 - t, 1.2) * maxSpirRadius;
        spiralPoints.push({
          x: cx + Math.cos(phi) * rad,
          y: cy + Math.sin(phi) * rad
        });
      }
      paths.push({
        points: spiralPoints,
        color: activeColors.core,
        widthFactor: 1.22,
        phaseStart: 0.88,
        phaseEnd: 1.0
      });
    }

    return paths;
  }, [preset, palette, activeColors, dimensions]);

  // Resize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      const w = rect ? rect.width : window.innerWidth;
      const h = rect ? rect.height : window.innerHeight;

      setDimensions({ width: w, height: h });

      const dpr = window.devicePixelRatio || 1;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [preset]);

  // Canvas drawing & particle physics loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let localProgress = progressRef.current;
    let startTime = performance.now() - (localProgress * 15000);

    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);

    if (bgSparkles.current.length === 0) {
      for (let i = 0; i < 40; i++) {
        bgSparkles.current.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.75, // Keep in upper 75%
          size: 1.2 + Math.random() * 2.2,
          maxOpacity: 0.15 + Math.random() * 0.6,
          speed: 0.008 + Math.random() * 0.016,
          phase: Math.random() * Math.PI * 2
        });
      }
    }

    const spawnParticle = (x: number, y: number, color: string, isExplosion = false) => {
      const angle = isExplosion ? Math.random() * Math.PI * 2 : -Math.PI / 2 + (Math.random() - 0.5) * 0.6;
      const speedValue = isExplosion ? 2 + Math.random() * 4 : 0.5 + Math.random() * 1.5;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speedValue,
        vy: Math.sin(angle) * speedValue,
        color,
        size: isExplosion ? 3 + Math.random() * 4 : 1.5 + Math.random() * 2.5,
        alpha: 1.0,
        life: 0,
        maxLife: isExplosion ? 30 + Math.random() * 20 : 60 + Math.random() * 40
      });
    };

    // Helper to draw a single glowing brush stroke with advanced bioluminescent inner petal textures
    const drawGlowingPath = (
      points: Point[],
      color: string,
      widthF: number,
      drawPct = 1.0,
      isGuide = false,
      isPetal = false,
      petalBase?: Point,
      petalTip?: Point,
      petalLeft?: Point,
      petalRight?: Point,
      cpLeft?: Point,
      cpRight?: Point
    ) => {
      if (points.length < 2) return;
      const countToDraw = Math.max(2, Math.floor(points.length * drawPct));

      ctx.save();

      // 1. Render rich filled petals with deep crimson/magenta gradients and bioluminescent inner textures
      if (isPetal && drawPct > 0.1 && petalBase && petalTip) {
        ctx.save();

        // Define petal boundary path and clip
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < countToDraw; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.closePath();
        ctx.clip();

        const dist = Math.sqrt((petalTip.x - petalBase.x) ** 2 + (petalTip.y - petalBase.y) ** 2) || 80;

        // 1a. DEEP OPAQUE BASE FILL — Rich crimson/magenta petal body (like the reference)
        const baseFill = ctx.createRadialGradient(petalBase.x, petalBase.y, 0, petalBase.x, petalBase.y, dist * 1.3);
        baseFill.addColorStop(0.0, 'rgba(200, 15, 60, 0.92)');   // Deep vivid crimson core
        baseFill.addColorStop(0.35, 'rgba(170, 10, 55, 0.82)');  // Rich magenta mid
        baseFill.addColorStop(0.65, 'rgba(130, 5, 45, 0.68)');   // Dark rose body
        baseFill.addColorStop(0.85, 'rgba(80, 0, 30, 0.52)');    // Deep maroon outer
        baseFill.addColorStop(1.0, 'rgba(40, 0, 15, 0.35)');     // Near-black edge
        ctx.fillStyle = baseFill;
        ctx.fill();

        // 1b. WARM GLOW CORE OVERLAY — Bright golden-orange center radiating outward
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        const warmGlow = ctx.createRadialGradient(petalBase.x, petalBase.y, 0, petalBase.x, petalBase.y, dist * 1.1);
        warmGlow.addColorStop(0.0, 'rgba(255, 220, 50, 0.72)');   // Intense golden core
        warmGlow.addColorStop(0.2, 'rgba(255, 140, 0, 0.55)');    // Warm orange
        warmGlow.addColorStop(0.45, 'rgba(255, 40, 70, 0.35)');   // Neon red transition
        warmGlow.addColorStop(0.7, 'rgba(200, 0, 80, 0.15)');     // Faint magenta
        warmGlow.addColorStop(1.0, 'rgba(100, 0, 50, 0.0)');      // Transparent
        ctx.fillStyle = warmGlow;
        ctx.fill();
        ctx.restore();

        // 1c. PURPLE/MAGENTA TINT OVERLAY — Adds depth and the purple hues from the reference
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        // Create a linear gradient from tip to base for the purple tint
        const purpleTint = ctx.createLinearGradient(petalTip.x, petalTip.y, petalBase.x, petalBase.y);
        purpleTint.addColorStop(0.0, 'rgba(180, 40, 200, 0.22)');  // Purple at tip
        purpleTint.addColorStop(0.4, 'rgba(140, 20, 160, 0.15)');  // Orchid mid
        purpleTint.addColorStop(1.0, 'rgba(80, 0, 80, 0.0)');      // Fades to nothing at base
        ctx.fillStyle = purpleTint;
        ctx.fill();
        ctx.restore();

        // 1d. EDGE HIGHLIGHT GLOW — Bright neon glow along the petal boundary for the outline bloom
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < countToDraw; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.closePath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 3 * widthF;
        ctx.shadowBlur = glow * 1.5;
        ctx.shadowColor = color;
        ctx.globalAlpha = 0.4;
        ctx.stroke();
        ctx.restore();

        // 1e. Radiating Inner Glowing Veins (subtle, adds texture)
        if (petalLeft && petalRight && cpLeft && cpRight) {
          ctx.save();
          ctx.globalCompositeOperation = 'screen';
          ctx.globalAlpha = 0.6;

          const numVeins = 12;
          for (let v = 0; v <= numVeins; v++) {
            const u = v / numVeins;

            let targetPt = { x: 0, y: 0 };
            if (u < 0.5) {
              const t_half = u * 2;
              targetPt.x = petalLeft.x + (petalTip.x - petalLeft.x) * t_half;
              targetPt.y = petalLeft.y + (petalTip.y - petalLeft.y) * t_half;
            } else {
              const t_half = (u - 0.5) * 2;
              targetPt.x = petalTip.x + (petalRight.x - petalTip.x) * t_half;
              targetPt.y = petalTip.y + (petalRight.y - petalTip.y) * t_half;
            }

            const ctrlPt = {
              x: cpLeft.x + (cpRight.x - cpLeft.x) * u,
              y: cpLeft.y + (cpRight.y - cpLeft.y) * u
            };

            const veinCtrl = {
              x: petalBase.x + (ctrlPt.x - petalBase.x) * drawPct,
              y: petalBase.y + (ctrlPt.y - petalBase.y) * drawPct
            };
            const veinEnd = {
              x: petalBase.x + (targetPt.x - petalBase.x) * drawPct,
              y: petalBase.y + (targetPt.y - petalBase.y) * drawPct
            };

            const centerDist = Math.abs(u - 0.5);
            let strokeStyle = 'rgba(255, 60, 80, 0.28)';
            let shadowColor = '#ff0f43';
            let lineWidth = 0.45 * widthF;

            if (centerDist < 0.15) {
              strokeStyle = 'rgba(255, 230, 100, 0.45)';
              shadowColor = '#ffd700';
              lineWidth = 0.6 * widthF;
            } else if (centerDist < 0.35) {
              strokeStyle = 'rgba(255, 110, 30, 0.35)';
              shadowColor = '#ff5e00';
              lineWidth = 0.5 * widthF;
            }

            ctx.beginPath();
            ctx.moveTo(petalBase.x, petalBase.y);
            ctx.quadraticCurveTo(veinCtrl.x, veinCtrl.y, veinEnd.x, veinEnd.y);

            ctx.save();
            ctx.strokeStyle = strokeStyle;
            ctx.shadowColor = shadowColor;
            ctx.shadowBlur = 3;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
            ctx.restore();
          }
          ctx.restore();
        } else {
          // Fallback simple veins
          const drawVein = (endPt: Point, ctrlPt: Point) => {
            ctx.beginPath();
            ctx.moveTo(petalBase.x, petalBase.y);
            const veinCtrl = {
              x: petalBase.x + (ctrlPt.x - petalBase.x) * drawPct,
              y: petalBase.y + (ctrlPt.y - petalBase.y) * drawPct
            };
            const veinEnd = {
              x: petalBase.x + (endPt.x - petalBase.x) * drawPct,
              y: petalBase.y + (endPt.y - petalBase.y) * drawPct
            };
            ctx.quadraticCurveTo(veinCtrl.x, veinCtrl.y, veinEnd.x, veinEnd.y);
            ctx.strokeStyle = 'rgba(255, 195, 0, 0.3)';
            ctx.lineWidth = 0.6 * widthF;
            ctx.shadowBlur = 3;
            ctx.shadowColor = '#ff5c00';
            ctx.stroke();
          };
          drawVein(petalTip, { x: (petalBase.x + petalTip.x) / 2 - 10, y: (petalBase.y + petalTip.y) / 2 });
          if (petalLeft && petalRight) {
            drawVein(petalLeft, { x: (petalBase.x + petalLeft.x) / 2 - 5, y: (petalBase.y + petalLeft.y) / 2 - 5 });
            drawVein(petalRight, { x: (petalBase.x + petalRight.x) / 2 + 5, y: (petalBase.y + petalRight.y) / 2 - 5 });
            const midL = { x: (petalTip.x + petalLeft.x) / 2, y: (petalTip.y + petalLeft.y) / 2 };
            const midR = { x: (petalTip.x + petalRight.x) / 2, y: (petalTip.y + petalRight.y) / 2 };
            drawVein(midL, { x: (petalBase.x + midL.x) / 2 - 7, y: (petalBase.y + midL.y) / 2 });
            drawVein(midR, { x: (petalBase.x + midR.x) / 2 + 7, y: (petalBase.y + midR.y) / 2 });
          }
        }

        // 1f. Bioluminescent Stardust (micro-sparkles inside the petal)
        const seed = (petalBase.x * 43 + petalBase.y * 19) % 1000;
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        for (let d = 0; d < 18; d++) {
          const t1 = ((seed + d * 53) % 100) / 100;
          const t2 = (((seed + d * 97) % 100) / 100) - 0.5;

          if (t1 > drawPct) continue;

          const leftR = petalLeft || petalBase;
          const rightR = petalRight || petalBase;

          const midX = petalBase.x + (petalTip.x - petalBase.x) * t1;
          const midY = petalBase.y + (petalTip.y - petalBase.y) * t1;

          const spreadX = (rightR.x - leftR.x) * t2 * Math.sin(t1 * Math.PI) * 0.72;
          const spreadY = (rightR.y - leftR.y) * t2 * Math.sin(t1 * Math.PI) * 0.72;

          const dotX = midX + spreadX;
          const dotY = midY + spreadY;

          const dotSize = 0.5 + (((seed + d * 31) % 10) / 10) * 1.2;
          const dotAlpha = 0.35 + (((seed + d * 47) % 10) / 10) * 0.45;
          const dotColor = (d % 3 === 0) ? '#ffffff' : ((d % 3 === 1) ? '#ffd700' : '#ff3366');

          ctx.save();
          ctx.globalAlpha = dotAlpha;
          ctx.shadowBlur = 4;
          ctx.shadowColor = dotColor;
          ctx.fillStyle = dotColor;
          ctx.beginPath();
          ctx.arc(dotX, dotY, dotSize, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
        ctx.restore();

        ctx.restore();
      }

      if (isGuide) {
        ctx.shadowBlur = 3;
        ctx.shadowColor = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1 * widthF;
        ctx.globalAlpha = 0.12;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < countToDraw; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
        ctx.restore();
        return;
      }

      // Pass 0: Ultra-wide ambient bloom halo — very faint but broad
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.shadowBlur = glow * 4;
      ctx.shadowColor = color;
      ctx.strokeStyle = color;
      ctx.lineWidth = 14 * widthF;
      ctx.globalAlpha = 0.12;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < countToDraw; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();
      ctx.restore();

      // Pass 1: Broad Ambient Glow - Additive Blend
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.shadowBlur = glow * 2.5;
      ctx.shadowColor = color;
      ctx.strokeStyle = color;
      ctx.lineWidth = 8 * widthF;
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < countToDraw; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();

      // Pass 2: Medium Core Glow - brighter, narrower
      ctx.shadowBlur = glow * 1.2;
      ctx.lineWidth = 4.5 * widthF;
      ctx.globalAlpha = 0.65;
      ctx.stroke();
      ctx.restore();

      // Pass 3: White hot core line with colored edge bloom
      ctx.save();
      ctx.shadowBlur = 5;
      ctx.shadowColor = color;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.8 * widthF;
      ctx.globalAlpha = 1.0;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < countToDraw; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();
      ctx.restore();

      ctx.restore();
    };

    let explosionTriggered = false;

    const renderLoop = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      // 1. Radial dark background
      ctx.fillStyle = '#05070a';
      ctx.fillRect(0, 0, width, height);

      // Glowing ambient light halo around the rose — cinematic atmosphere
      const grad = ctx.createRadialGradient(width / 2, height * 0.45, 10, width / 2, height * 0.45, Math.max(width, height) * 0.6);
      grad.addColorStop(0, 'rgba(255, 15, 67, 0.14)');    // Strong cherry red core
      grad.addColorStop(0.25, 'rgba(200, 20, 80, 0.08)'); // Deep rose mid
      grad.addColorStop(0.5, 'rgba(186, 85, 211, 0.05)'); // Soft purple ambient
      grad.addColorStop(0.75, 'rgba(138, 43, 226, 0.025)'); // Blue-violet outer
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 1.4. Render large soft background bokeh circles
      if (bgBokeh.current.length === 0) {
        const colors = [
          'rgba(255, 15, 67, 0.08)',   // Neon Cherry Red
          'rgba(255, 94, 0, 0.06)',    // Orange
          'rgba(186, 85, 211, 0.08)',  // Purple/Orchid
          'rgba(138, 43, 226, 0.06)'   // Blue-violet
        ];
        for (let i = 0; i < 15; i++) {
          bgBokeh.current.push({
            x: Math.random() * width,
            y: Math.random() * height * 0.8,
            size: 30 + Math.random() * 60, // Large soft circles
            maxOpacity: 0.2 + Math.random() * 0.5,
            speed: 0.002 + Math.random() * 0.005,
            phase: Math.random() * Math.PI * 2,
            color: colors[Math.floor(Math.random() * colors.length)]
          });
        }
      }

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      bgBokeh.current.forEach(bokeh => {
        bokeh.phase += bokeh.speed;
        const opacity = bokeh.maxOpacity * (0.3 + 0.7 * Math.abs(Math.sin(bokeh.phase)));

        if (bokeh.x > width) bokeh.x = Math.random() * width;
        if (bokeh.y > height) bokeh.y = Math.random() * height;

        ctx.save();
        ctx.globalAlpha = opacity;

        // Large soft radial gradient for beautiful bokeh blur
        const bokehGrad = ctx.createRadialGradient(bokeh.x, bokeh.y, 0, bokeh.x, bokeh.y, bokeh.size);
        bokehGrad.addColorStop(0, bokeh.color);
        bokehGrad.addColorStop(0.5, bokeh.color.replace(/[\d.]+\)$/, '0.3)'));
        bokehGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = bokehGrad;
        ctx.beginPath();
        ctx.arc(bokeh.x, bokeh.y, bokeh.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      ctx.restore();

      // 1.5. Render background twinkling sparkles with Additive Blend
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      bgSparkles.current.forEach(sparkle => {
        sparkle.phase += sparkle.speed;
        const opacity = sparkle.maxOpacity * (0.25 + 0.75 * Math.abs(Math.sin(sparkle.phase)));

        // Auto-reposition if resized out of bounds
        if (sparkle.x > width) sparkle.x = Math.random() * width;
        if (sparkle.y > height) sparkle.y = Math.random() * height * 0.75;

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.shadowBlur = glow * 0.5;
        ctx.shadowColor = activeColors.stroke;
        ctx.fillStyle = '#ffffff';

        // Draw a premium artistic diamond sparkle shape
        ctx.beginPath();
        const cx = sparkle.x;
        const cy = sparkle.y;
        const s = sparkle.size;
        ctx.moveTo(cx, cy - s * 2.5);
        ctx.quadraticCurveTo(cx, cy, cx + s * 2.5, cy);
        ctx.quadraticCurveTo(cx, cy, cx, cy + s * 2.5);
        ctx.quadraticCurveTo(cx, cy, cx - s * 2.5, cy);
        ctx.quadraticCurveTo(cx, cy, cx, cy - s * 2.5);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });
      ctx.restore();

      // 2. Increment progress if in auto mode
      if (drawMode === 'auto') {
        if (showVolumeHint) {
          startTime = performance.now(); // Reset start time during the hint display
          localProgress = 0;
          progressRef.current = 0;
        } else if (localProgress < 1.0) {
          const elapsed = performance.now() - startTime;
          localProgress = Math.min(1.0, elapsed / 15000);
          progressRef.current = localProgress;
        }
      }

      // 3. Render guide lines that fade out after completion
      const guideAlpha = Math.max(0, 1.0 - (localProgress - 0.2) * 2.0);

      // 4. Render main auto-sketch flower paths
      sketchPaths.forEach(path => {
        if (localProgress < path.phaseStart) return;

        let drawPct = 1.0;
        if (localProgress < path.phaseEnd) {
          drawPct = (localProgress - path.phaseStart) / (path.phaseEnd - path.phaseStart);
        }

        if (path.isGuideLine) {
          if (guideAlpha > 0) {
            ctx.save();
            ctx.globalAlpha = guideAlpha;
            drawGlowingPath(path.points, path.color, path.widthFactor, drawPct, true);
            ctx.restore();
          }
        } else {
          drawGlowingPath(
            path.points,
            path.color,
            path.widthFactor,
            drawPct,
            false,
            path.isPetal,
            path.petalBase,
            path.petalTip,
            path.petalLeft,
            path.petalRight,
            path.cpLeft,
            path.cpRight
          );

          // Emit sparks at drawing tips in real-time
          if (localProgress < path.phaseEnd && localProgress >= path.phaseStart && Math.random() < 0.35) {
            const currentIdx = Math.floor(path.points.length * drawPct);
            const tipPoint = path.points[Math.min(currentIdx, path.points.length - 1)];
            if (tipPoint) {
              spawnParticle(tipPoint.x, tipPoint.y, path.color);
            }
          }
        }
      });

      // 5. Trigger blast particles on complete
      if (localProgress >= 1.0 && !explosionTriggered && drawMode === 'auto') {
        explosionTriggered = true;
        const cx = width / 2;
        const cy = height * 0.45;
        for (let i = 0; i < 120; i++) {
          spawnParticle(cx, cy, activeColors.stroke, true);
        }
      }

      // 6. Draw User free-drawn lines with glowing brush
      userLines.forEach(line => {
        drawGlowingPath(line.points, line.color, line.width * 0.65, 1.0, false);
      });

      if (currentLine && currentLine.length > 0) {
        drawGlowingPath(currentLine, activeColors.stroke, 1.0, 1.0, false);
      }

      // 6.5. Draw organically growing neon plants at the bottom after 10s
      if (showPlantsRef.current && plantsRef.current.length > 0) {
        plantsRef.current.forEach(plant => {
          if (plant.delay > 0) {
            plant.delay -= 16.67; // approx ms per frame
            return;
          }

          if (plant.growth < 1.0) {
            plant.growth += plant.speed;
            if (plant.growth > 1.0) plant.growth = 1.0;
          }

          const g = plant.growth;
          const curHeight = plant.height * g;
          const base = { x: plant.x, y: height };
          const tip = { x: plant.x + plant.curve * g, y: height - curHeight };
          const ctrl = { x: plant.x + (plant.curve * 0.3) * g, y: height - curHeight * 0.5 };

          // Draw plant stem
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(base.x, base.y);
          ctx.quadraticCurveTo(ctrl.x, ctrl.y, tip.x, tip.y);
          ctx.strokeStyle = plant.leafColor;
          ctx.lineWidth = 1.6;
          ctx.shadowBlur = 4;
          ctx.shadowColor = plant.leafColor;
          ctx.stroke();
          ctx.restore();

          // Draw glowing leaves
          if (g > 0.3) {
            const leafPercentages = [0.35, 0.65];
            leafPercentages.forEach((pct, idx) => {
              if (g > pct) {
                const leafT = pct;
                const leafPt = {
                  x: (1 - leafT) * (1 - leafT) * base.x + 2 * (1 - leafT) * leafT * ctrl.x + leafT * leafT * tip.x,
                  y: (1 - leafT) * (1 - leafT) * base.y + 2 * (1 - leafT) * leafT * ctrl.y + leafT * leafT * tip.y
                };

                ctx.save();
                ctx.fillStyle = plant.leafColor;
                ctx.shadowBlur = 4;
                ctx.shadowColor = plant.leafColor;

                ctx.beginPath();
                const leafSide = idx % 2 === 0 ? -1 : 1;
                const leafSize = 3.5 + g * 2.2;
                ctx.ellipse(
                  leafPt.x + leafSide * 3.5,
                  leafPt.y,
                  leafSize,
                  leafSize * 0.45,
                  (leafSide * Math.PI) / 5,
                  0,
                  Math.PI * 2
                );
                ctx.fill();
                ctx.restore();
              }
            });
          }

          // Draw glowing flower at the tip
          if (g > 0.72) {
            const fG = (g - 0.72) / 0.28;
            const r = plant.flowerSize * fG;

            ctx.save();
            ctx.globalCompositeOperation = 'screen';
            ctx.shadowBlur = glow * 0.6 * fG;
            ctx.shadowColor = plant.color;
            ctx.fillStyle = plant.color;

            // Draw 4 beautiful glowing petals around tip
            const numPetals = 4;
            for (let j = 0; j < numPetals; j++) {
              const angle = (j / numPetals) * Math.PI * 2 + (plant.id * 0.1);
              const px = tip.x + Math.cos(angle) * (r * 0.42);
              const py = tip.y + Math.sin(angle) * (r * 0.42);
              ctx.beginPath();
              ctx.arc(px, py, r * 0.62, 0, Math.PI * 2);
              ctx.fill();
            }

            // White glowing hot core of flower
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = 3;
            ctx.beginPath();
            ctx.arc(tip.x, tip.y, r * 0.32, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Emit glowing particles from the growing flower tips occasionally!
            if (Math.random() < 0.015) {
              spawnParticle(tip.x, tip.y, plant.color);
            }
          }
        });
      }

      // 7. Update and Draw Particles
      // Standard ambient background sparks
      if (Math.random() < 0.08) {
        particles.push({
          x: Math.random() * width,
          y: height + 10,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -0.3 - Math.random() * 0.6,
          color: activeColors.glow2,
          size: 1 + Math.random() * 2,
          alpha: 0.1,
          life: 0,
          maxLife: 200 + Math.random() * 150
        });
      }

      // Small small glowing flowers spawned from bottom AFTER animation ends
      if (localProgress >= 1.0 && Math.random() < 0.06) {
        const flowerColors = [
          activeColors.stroke, // Cherry red
          activeColors.glow1,  // Orange
          activeColors.glow2,  // Gold
          '#ff66b2',           // Glowing pink
          '#ff3366'            // Bright hot pink
        ];
        particles.push({
          x: Math.random() * width,
          y: height + 15,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -0.6 - Math.random() * 0.8,
          color: flowerColors[Math.floor(Math.random() * flowerColors.length)],
          size: 3.5 + Math.random() * 4.5, // Small glowing flowers (3.5px to 8px size)
          alpha: 0.0,
          life: 0,
          maxLife: 220 + Math.random() * 150,
          isFlower: true
        });
      }

      particles = particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const pct = p.life / p.maxLife;

        // Custom alpha fade for flower particles to prevent sudden appearance
        if (p.isFlower) {
          if (pct < 0.12) {
            p.alpha = pct * 8.3; // fade in rapidly
          } else if (pct > 0.8) {
            p.alpha = Math.max(0, (1 - pct) * 5.0); // fade out slowly
          } else {
            p.alpha = 1.0;
          }
        } else {
          p.alpha = Math.max(0, 1 - pct);
        }

        if (p.isFlower) {
          // Slow organic sway as the flower drifts upwards
          p.x += Math.sin(p.life * 0.025 + p.size) * 0.38;

          ctx.save();
          ctx.globalCompositeOperation = 'screen';
          ctx.globalAlpha = p.alpha * 0.82;
          ctx.shadowBlur = p.size * 1.5;
          ctx.shadowColor = p.color;
          ctx.fillStyle = p.color;

          // Draw 5 glowing petals rotating gently
          const numPetals = 5;
          const rPetal = p.size * 0.52;
          const offset = p.size * 0.62;
          const rotation = p.life * 0.012; // slow spin

          for (let i = 0; i < numPetals; i++) {
            const angle = (i / numPetals) * Math.PI * 2 + rotation;
            const px = p.x + Math.cos(angle) * offset;
            const py = p.y + Math.sin(angle) * offset;
            ctx.beginPath();
            ctx.arc(px, py, rPetal, 0, Math.PI * 2);
            ctx.fill();
          }

          // Inner glowing core
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = p.size * 0.8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.36, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        } else {
          // Standard spark circle
          ctx.save();
          ctx.globalAlpha = p.alpha * 0.8;
          ctx.shadowBlur = 6;
          ctx.shadowColor = p.color;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (1 - pct * 0.3), 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        return p.life < p.maxLife && p.y > -20 && p.x > -20 && p.x < width + 20;
      });

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [sketchPaths, drawMode, speed, glow, activeColors, userLines, currentLine, replayKey, showVolumeHint]);

  // Drawing Handlers for Free Paint mode
  const getCoordinates = (e: React.MouseEvent | React.TouchEvent): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();

    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const handleStartDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (drawMode !== 'interactive') return;
    e.preventDefault();
    const pt = getCoordinates(e);
    if (!pt) return;

    isDrawingRef.current = true;
    setCurrentLine([pt]);
  };

  const handleDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (drawMode !== 'interactive' || !isDrawingRef.current || !currentLine) return;
    e.preventDefault();
    const pt = getCoordinates(e);
    if (!pt) return;

    setCurrentLine(prev => prev ? [...prev, pt] : [pt]);
  };

  const handleEndDraw = () => {
    if (drawMode !== 'interactive' || !isDrawingRef.current || !currentLine) return;
    isDrawingRef.current = false;

    setUserLines(prev => [...prev, {
      points: currentLine,
      color: activeColors.stroke,
      width: 2
    }]);
    setCurrentLine(null);
  };

  return (
    <div className="flower-sketch-container" ref={containerRef}>

      {/* Main Drawing Canvas */}
      <canvas
        ref={canvasRef}
        className="sketch-canvas"
        onMouseDown={handleStartDraw}
        onMouseMove={handleDrawing}
        onMouseUp={handleEndDraw}
        onMouseLeave={handleEndDraw}
        onTouchStart={handleStartDraw}
        onTouchMove={handleDrawing}
        onTouchEnd={handleEndDraw}
      />

      {showVolumeHint && (
        <div
          className={`volume-hint-overlay ${fadeOutHint ? 'fade-out' : ''}`}
          onClick={handleDismissVolumeHint}
          style={{ cursor: 'pointer' }}
        >
          <div className="volume-hint-content">
            <span className="volume-icon">🔊</span>
            <h2 className="volume-text">RAISE YOUR VOLUME</h2>
            <p className="volume-subtext">Beautiful sounds ahead</p>
            <p className="volume-tap-instruction">Tap anywhere to start 💖</p>
          </div>
        </div>
      )}

      {!audioPlaying && !showVolumeHint && (
        <div className="audio-hint animate-fade-in">
          🎵 If no audio is playing, tap anywhere on the screen to play
        </div>
      )}


      <style jsx global>{`
        /* Flower Sketch Screen Styling */
        .flower-sketch-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: #05070a;
          color: #ffffff;
          overflow: hidden;
          font-family: 'Outfit', 'Inter', sans-serif;
          z-index: 1000;
        }

        .sketch-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          cursor: crosshair;
          z-index: 1001;
        }

        .sketch-header {
          position: absolute;
          top: 2rem;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          pointer-events: none;
          z-index: 1005;
        }

        .header-title {
          font-size: 2rem;
          font-weight: 900;
          letter-spacing: 4px;
          margin-bottom: 0.25rem;
          background: linear-gradient(135deg, #ffffff 0%, #ff85a2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 10px rgba(255, 75, 114, 0.3));
        }

        .header-subtitle {
          font-size: 0.9rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .btn-view-toggle {
          position: absolute;
          top: 2rem;
          right: 2rem;
          z-index: 1006;
          outline: none;
        }

        .glass-button {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          padding: 0.7rem 1.4rem;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
        }

        .glass-button:hover {
          background: rgba(255, 75, 114, 0.15);
          border-color: rgba(255, 75, 114, 0.4);
          transform: translateY(-2px);
          box-shadow: 0 0 15px rgba(255, 75, 114, 0.25);
        }

        .glass-button:active {
          transform: scale(0.95);
        }

        .controls-card {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 460px;
          background: rgba(10, 15, 25, 0.68);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6), 0 0 80px rgba(255, 75, 114, 0.06);
          border-radius: 28px;
          padding: 1.4rem 1.6rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          z-index: 1005;
          pointer-events: auto;
        }

        .control-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .control-label {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: rgba(255, 255, 255, 0.45);
        }

        .button-grid {
          display: flex;
          gap: 0.5rem;
          width: 100%;
        }

        .grid-btn {
          flex: 1;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.7);
          padding: 0.6rem 0.5rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
          outline: none;
        }

        .grid-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.15);
        }

        .grid-btn.active {
          background: linear-gradient(135deg, #ff4b72 0%, #ff7b92 100%);
          border-color: transparent;
          color: #ffffff;
          box-shadow: 0 4px 15px rgba(255, 75, 114, 0.35);
        }

        .color-swatches {
          display: flex;
          gap: 0.8rem;
          align-items: center;
        }

        .swatch-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 2px solid transparent;
          cursor: pointer;
          transition: transform 0.2s, border-color 0.2s;
          outline: none;
        }

        .swatch-btn:hover {
          transform: scale(1.15);
        }

        .swatch-btn.active {
          border-color: #ffffff;
          transform: scale(1.15);
          box-shadow: 0 0 10px currentColor;
        }

        .swatch-btn.cherry { background-color: #ff4b72; color: rgba(255, 75, 114, 0.6); }
        .swatch-btn.cyan { background-color: #00f5ff; color: rgba(0, 245, 255, 0.6); }
        .swatch-btn.gold { background-color: #ffd700; color: rgba(255, 215, 0, 0.6); }
        .swatch-btn.purple { background-color: #bd00ff; color: rgba(189, 0, 255, 0.6); }

        .flex-sliders {
          display: flex;
          gap: 1rem;
          width: 100%;
        }

        .slider-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .slider-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.6);
        }

        .sketch-range {
          -webkit-appearance: none;
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          outline: none;
        }

        .sketch-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #ff4b72;
          cursor: pointer;
          transition: transform 0.15s;
        }

        .sketch-range::-webkit-slider-thumb:hover {
          transform: scale(1.25);
        }

        .actions-row {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.2rem;
        }

        .btn-action {
          background: rgba(255, 75, 114, 0.05);
          border: 1px solid rgba(255, 75, 114, 0.15);
          color: #ff7b92;
        }

        .btn-action:hover {
          background: rgba(255, 75, 114, 0.12);
          border-color: rgba(255, 75, 114, 0.35);
        }

        .btn-clear {
          background: transparent;
          border: 1px dashed rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.6);
        }

        .btn-clear:hover {
          background: rgba(255, 255, 255, 0.03);
          color: #ffffff;
        }

        .foryou-page .btn-flower-toggle {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          z-index: 100;
        }

        @keyframes headerSlideDown {
          from { transform: translate(-50%, -20px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }

        @keyframes controlsSlideUp {
          from { transform: translate(-50%, 30px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }

        .animate-header {
          animation: headerSlideDown 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-controls {
          animation: controlsSlideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @media (max-width: 600px) {
          .header-title {
            font-size: 1.5rem;
          }
          .header-subtitle {
            font-size: 0.8rem;
          }
          .btn-view-toggle {
            top: auto;
            bottom: 25.5rem;
            right: 50%;
            transform: translateX(50%);
            width: auto;
            min-width: 160px;
          }
          .btn-view-toggle:hover {
            transform: translateX(50%) translateY(-2px);
          }
          .controls-card {
            bottom: 1rem;
            padding: 1.1rem 1.2rem;
            gap: 0.8rem;
          }
          .flex-sliders {
            flex-direction: column;
            gap: 0.6rem;
          }
          .audio-hint {
            top: 1.5rem;
            right: 1.5rem;
            transform: none;
            text-align: right;
            max-width: 180px;
            font-size: 0.65rem;
            padding: 0.35rem 0.7rem;
            border-radius: 12px;
          }
        }

        .volume-hint-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(5, 7, 10, 0.92);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          z-index: 1010;
          transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          opacity: 1;
        }

        .volume-hint-overlay.fade-out {
          opacity: 0;
          pointer-events: none;
        }

        .volume-hint-content {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .volume-icon {
          font-size: 3.8rem;
          filter: drop-shadow(0 0 16px rgba(255, 75, 114, 0.6));
          animation: bounceIcon 1.5s infinite ease-in-out;
          display: inline-block;
        }

        .volume-text {
          font-size: 1.9rem;
          font-weight: 900;
          letter-spacing: 4px;
          color: #ffffff;
          margin: 0;
          text-transform: uppercase;
          background: linear-gradient(135deg, #ffffff 0%, #ff85a2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 10px rgba(255, 75, 114, 0.3));
        }

        .volume-subtext {
          font-size: 0.95rem;
          font-weight: 600;
          margin: 0;
          color: rgba(255, 255, 255, 0.55);
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .volume-tap-instruction {
          margin-top: 1.8rem;
          font-size: 0.95rem;
          font-weight: 800;
          color: #ff7b92;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-shadow: 0 0 10px rgba(255, 123, 146, 0.55);
          animation: textPulseGlow 1.8s infinite ease-in-out;
        }

        @keyframes textPulseGlow {
          0%, 100% { opacity: 0.6; transform: scale(0.96); }
          50% { opacity: 1; transform: scale(1.04); }
        }

        @keyframes bounceIcon {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.18) rotate(6deg); }
        }

        .audio-hint {
          position: absolute;
          top: 5.5rem;
          right: 2rem;
          background: rgba(255, 75, 114, 0.15);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 75, 114, 0.3);
          color: #ff85a2;
          padding: 0.35rem 0.8rem;
          border-radius: 12px;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          z-index: 1002;
          pointer-events: none;
          text-align: right;
          max-width: 220px;
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
}
