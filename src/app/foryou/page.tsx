'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function ForYou() {
  const [accepted, setAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
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

  const handleReset = () => {
    setAccepted(false);
    setRejected(false);
    setShowVideo(false);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
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
                setShowVideo(true);
                if (typeof document !== 'undefined') {
                  const docEl = document.documentElement;
                  if (docEl.requestFullscreen) {
                    docEl.requestFullscreen().catch(err => {
                      console.log("Fullscreen request failed", err);
                    });
                  } else if ((docEl as any).webkitRequestFullscreen) {
                    (docEl as any).webkitRequestFullscreen();
                  } else if ((docEl as any).msRequestFullscreen) {
                    (docEl as any).msRequestFullscreen();
                  }
                }
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
          <div className="video-iframe-wrapper">
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
