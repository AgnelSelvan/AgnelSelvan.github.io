'use client';

import React, { useState } from 'react';

export default function ValentinePage() {
  const [noClickCount, setNoClickCount] = useState(0);
  const [yesClicked, setYesClicked] = useState(false);

  const noTexts = ['NO', 'Huh!? Are you sure', 'Really Sure?', 'Are you positive?', 'Just think about it', 'If you say No, I\'ll be sad...', 'I\'ll be very sad...', 'I\'ll be very very sad'];
  const noButtonText = noTexts[Math.min(noClickCount, noTexts.length - 1)];
  const isFullScreen = noClickCount >= noTexts.length;

  const noStyles: Record<number, React.CSSProperties> = {
    0: {},
    1: { padding: '4px 22px', fontSize: '0.95rem' },
    2: { padding: '3px 19px', fontSize: '0.88rem' },
    3: { padding: '3px 16px', fontSize: '0.8rem' },
    4: { padding: '2px 14px', fontSize: '0.73rem' },
    5: { padding: '2px 12px', fontSize: '0.65rem' },
    6: { padding: '2px 10px', fontSize: '0.58rem' },
    7: { padding: '1px 8px', fontSize: '0.5rem' },
  };
  const yesStyles: Record<number, React.CSSProperties> = {
    0: {},
    1: { padding: '20px 60px', fontSize: '1.8rem' },
    2: { padding: '24px 72px', fontSize: '2rem' },
    3: { padding: '28px 80px', fontSize: '2.3rem' },
    4: { padding: '32px 90px', fontSize: '2.6rem' },
    5: { padding: '36px 100px', fontSize: '2.8rem' },
    6: { padding: '40px 110px', fontSize: '3rem' },
    7: { padding: '44px 120px', fontSize: '3.2rem' },
  };

  const noButtonStyle = noStyles[Math.min(noClickCount, 7)] || {};
  const yesButtonStyle = isFullScreen
    ? { position: 'fixed' as const, top: 0, left: 0, width: '100vw', height: '100vh', fontSize: '5rem', zIndex: 9999, borderRadius: 0 }
    : yesStyles[Math.min(noClickCount, 7)] || {};

  // Emotion: 0=happy 1=surprised 2=worried 3=pleading 4=sad 5=crying 6=sobbing 7=devastated
  const emotions = ['happy', 'surprised', 'worried', 'pleading', 'sad', 'crying', 'sobbing', 'devastated'];
  const emotion = emotions[Math.min(noClickCount, 7)];

  /* ============================================================
   * YES SCREEN — Hugging pandas with hearts
   * ============================================================ */
  if (yesClicked) {
    return (
      <main className="vc yes-screen">
        <h1 className="yes-title">This May 13<br/> I found my mei tera... &gt;&lt;</h1>

        <div className="hug-scene">
          {/* floating hearts */}
          <div className="float-heart fh1"></div>
          <div className="float-heart fh2"></div>
          <div className="float-heart fh3"></div>

          <div className="hug-wrap">
            {/* LEFT PANDA */}
            <div className="hp hp-l">
              <div className="hp-ear hp-el1"></div><div className="hp-ear hp-el2"></div>
              <div className="hp-head">
                <div className="hp-fur-shine"></div>
                <div className="hp-patch hp-pl1"></div><div className="hp-patch hp-pl2"></div>
                <div className="hp-eye-happy hp-ehl"></div><div className="hp-eye-happy hp-ehr"></div>
                <div className="hp-blush hp-bll"></div><div className="hp-blush hp-blr"></div>
                <div className="hp-nose"></div>
                <div className="hp-smile"></div>
              </div>
              <div className="hp-body"><div className="hp-belly"></div></div>
              <div className="hp-arm hp-al1"></div><div className="hp-arm hp-al2"></div>
              <div className="hp-foot hp-fl1"></div><div className="hp-foot hp-fl2"></div>
            </div>

            {/* RIGHT PANDA */}
            <div className="hp hp-r">
              <div className="hp-ear hp-er1"></div><div className="hp-ear hp-er2"></div>
              <div className="hp-head">
                <div className="hp-fur-shine"></div>
                <div className="hp-patch hp-pr1"></div><div className="hp-patch hp-pr2"></div>
                <div className="hp-eye-happy hp-ehrl"></div><div className="hp-eye-happy hp-ehrr"></div>
                <div className="hp-blush hp-brl"></div><div className="hp-blush hp-brr"></div>
                <div className="hp-nose"></div>
                <div className="hp-smile"></div>
              </div>
              <div className="hp-body"><div className="hp-belly"></div></div>
              <div className="hp-arm hp-ar1"></div><div className="hp-arm hp-ar2"></div>
              <div className="hp-foot hp-fr1"></div><div className="hp-foot hp-fr2"></div>
            </div>
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap" rel="stylesheet" />

        <style jsx global>{`
          /* ── YES SCREEN ── */
          .vc.yes-screen {
            --fur: #f5f0ea; --fur-shade: #e8e0d4; --patch: #2a2a2a; --nose-c: #2a2a2a;
            --blush: rgba(248,160,176,0.55); --highlight: rgba(255,255,255,0.85);
            min-height:100vh; display:flex; flex-direction:column;
            align-items:center; justify-content:center;
            background: linear-gradient(180deg,#fce4ec 0%,#f8bbd0 50%,#f48fb1 100%);
            font-family:'Caveat',cursive; overflow:hidden;
          }
          .yes-title {
            font-size:3.2rem; color:#c62828; font-weight:700;
            margin-bottom:1.5rem; text-align:center;
            animation: titlePop .6s ease-out;
            text-shadow: 0 2px 8px rgba(198,40,40,0.2);
          }
          @keyframes titlePop { 0%{transform:scale(.3);opacity:0} 60%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }

          .hug-scene { position:relative; width:320px; height:300px; }

          /* floating hearts */
          .float-heart {
            position:absolute; z-index:20;
            width:20px; height:20px;
            background:#e91e63;
            transform: rotate(-45deg);
            animation: heartRise 3s ease-in-out infinite;
          }
          .float-heart::before,.float-heart::after {
            content:''; position:absolute;
            width:20px; height:20px;
            background:#e91e63; border-radius:50%;
          }
          .float-heart::before { top:-10px; left:0; }
          .float-heart::after  { top:0; right:-10px; }
          .fh1 { top:20px; left:40px; animation-delay:0s; }
          .fh2 { top:10px; right:50px; animation-delay:1s; }
          .fh3 { top:60px; left:50%; animation-delay:2s; }
          @keyframes heartRise {
            0%{transform:rotate(-45deg) translateY(0) scale(1);opacity:1}
            50%{transform:rotate(-45deg) translateY(-30px) scale(1.3);opacity:.7}
            100%{transform:rotate(-45deg) translateY(0) scale(1);opacity:1}
          }

          .hug-wrap {
            position:absolute; bottom:20px; left:50%; transform:translateX(-50%);
            width:280px; height:240px;
            animation: hugSway 2.5s ease-in-out infinite;
          }
          @keyframes hugSway {
            0%,100%{transform:translateX(-50%) rotate(0deg) translateY(0)}
            25%{transform:translateX(-50%) rotate(-2deg) translateY(-6px)}
            75%{transform:translateX(-50%) rotate(2deg) translateY(-6px)}
          }

          .hp { position:absolute; width:140px; height:200px; }
          .hp-l { left:0; top:20px; z-index:2; }
          .hp-r { right:0; top:10px; z-index:3; }

          .hp-ear {
            position:absolute; width:38px; height:38px;
            background: radial-gradient(circle at 40% 35%, #3a3a3a, var(--patch));
            border-radius:50%; top:-8px;
            box-shadow: inset 0 -3px 6px rgba(0,0,0,0.3);
          }
          .hp-el1,.hp-er1 { left:16px; } .hp-el2,.hp-er2 { right:16px; }

          .hp .hp-head {
            position:absolute; width:110px; height:105px;
            background: radial-gradient(ellipse at 45% 35%, white, var(--fur));
            border-radius:50%; top:15px; left:15px;
            box-shadow: 0 4px 18px rgba(0,0,0,0.08), inset 0 -4px 12px rgba(0,0,0,0.04);
            z-index:3;
          }
          .hp-fur-shine {
            position:absolute; width:40px; height:20px;
            background: radial-gradient(ellipse, var(--highlight), transparent);
            top:8px; left:30px; border-radius:50%; opacity:.6;
          }

          .hp-patch {
            position:absolute; width:30px; height:26px;
            background: radial-gradient(ellipse at 50% 40%, #3a3a3a, var(--patch));
            border-radius:50%; top:34px;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
          }
          .hp-pl1,.hp-pr1 { left:16px; transform:rotate(-10deg); }
          .hp-pl2,.hp-pr2 { right:16px; transform:rotate(10deg); }

          .hp-eye-happy {
            position:absolute; width:12px; height:6px;
            border-bottom:3px solid white; border-radius:0 0 50% 50%;
            top:40px; z-index:1;
          }
          .hp-ehl,.hp-ehrl { left:25px; } .hp-ehr,.hp-ehrr { right:25px; }

          .hp .hp-blush {
            position:absolute; width:20px; height:12px;
            background: var(--blush); border-radius:50%;
            top:54px; filter: blur(1px);
          }
          .hp-bll,.hp-brl { left:8px; } .hp-blr,.hp-brr { right:8px; }

          .hp .hp-nose {
            position:absolute; width:12px; height:8px;
            background: radial-gradient(ellipse, #3a3a3a, var(--nose-c));
            border-radius:50%; top:52px; left:50%; transform:translateX(-50%);
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
          }

          .hp .hp-smile {
            position:absolute; width:14px; height:7px;
            border-bottom:3px solid var(--nose-c); border-radius:0 0 50% 50%;
            top:62px; left:50%; transform:translateX(-50%);
          }

          .hp .hp-body {
            position:absolute; width:100px; height:85px;
            background: radial-gradient(ellipse at 50% 40%, white, var(--fur));
            border-radius:50%; bottom:15px; left:20px;
            box-shadow: 0 6px 20px rgba(0,0,0,0.06), inset 0 -4px 10px rgba(0,0,0,0.03);
            z-index:2;
          }
          .hp .hp-belly {
            position:absolute; width:55px; height:45px;
            background: radial-gradient(ellipse, var(--fur-shade), transparent);
            border-radius:50%; top:15px; left:50%; transform:translateX(-50%);
            opacity:.4;
          }

          .hp .hp-arm {
            position:absolute; width:28px; height:48px;
            background: radial-gradient(ellipse at 50% 30%, #3a3a3a, var(--patch));
            border-radius:50%; z-index:4;
            box-shadow: inset 0 -3px 6px rgba(0,0,0,0.2);
          }
          .hp-al1 { bottom:35px; left:4px; transform:rotate(20deg); }
          .hp-al2 { bottom:35px; right:-6px; transform:rotate(-35deg); z-index:5; }
          .hp-ar1 { bottom:35px; left:-6px; transform:rotate(35deg); z-index:5; }
          .hp-ar2 { bottom:35px; right:4px; transform:rotate(-20deg); }

          .hp .hp-foot {
            position:absolute; width:36px; height:20px;
            background: radial-gradient(ellipse, #3a3a3a, var(--patch));
            border-radius:50%; bottom:0; z-index:2;
            box-shadow: inset 0 -2px 4px rgba(0,0,0,0.2);
          }
          .hp-fl1,.hp-fr1 { left:22px; } .hp-fl2,.hp-fr2 { right:22px; }

          @media(max-width:640px){
            .yes-title{font-size:2rem}
            .hug-wrap{transform:translateX(-50%) scale(.75)}
          }
        `}</style>
      </main>
    );
  }

  /* ============================================================
   * MAIN SCREEN — Emotional panda
   * ============================================================ */
  return (
    <main className="vc">
      <h1 className="v-title">Today is May 13, What<br /><strong>Mei Tera</strong>...?</h1>

      <div className="buttons-row">
        <button className="btn-yes" onClick={() => setYesClicked(true)} style={yesButtonStyle}>YES</button>
        {!isFullScreen && (
          <button className="btn-no" onClick={() => setNoClickCount(c => c + 1)} style={noButtonStyle}>
            {noButtonText}
          </button>
        )}
      </div>

      {/* ── ANIME PANDA ── */}
      <div className="p-wrap">
        {/* Ambient glow behind panda */}
        <div className={`p-glow p-glow-${emotion}`}></div>

        <div className={`p p-${emotion}`}>
          {/* Ears with inner gradient + fur highlight */}
          <div className="p-ear p-ear-l">
            <div className="p-ear-fur"></div>
          </div>
          <div className="p-ear p-ear-r">
            <div className="p-ear-fur"></div>
          </div>

          {/* Head with fur shine */}
          <div className="p-head">
            <div className="p-fur-shine"></div>
            <div className="p-fur-shine2"></div>

            {/* Eye patches with depth */}
            <div className="p-patch p-patch-l"></div>
            <div className="p-patch p-patch-r"></div>

            {/* Anime eyes */}
            <div className="p-eye p-eye-l">
              <div className="p-iris">
                <div className="p-iris-gradient"></div>
                <div className="p-pupil"></div>
                <div className="p-eye-sparkle p-sparkle1"></div>
                <div className="p-eye-sparkle p-sparkle2"></div>
              </div>
            </div>
            <div className="p-eye p-eye-r">
              <div className="p-iris">
                <div className="p-iris-gradient"></div>
                <div className="p-pupil"></div>
                <div className="p-eye-sparkle p-sparkle1"></div>
                <div className="p-eye-sparkle p-sparkle2"></div>
              </div>
            </div>

            {/* Tear streams (visible crying+) */}
            {noClickCount >= 5 && (
              <>
                <div className="p-tear-stream p-ts-l">
                  <div className="p-tear-drop p-td1"></div>
                  <div className="p-tear-drop p-td2"></div>
                </div>
                <div className="p-tear-stream p-ts-r">
                  <div className="p-tear-drop p-td3"></div>
                  <div className="p-tear-drop p-td4"></div>
                </div>
              </>
            )}

            {/* Eyebrows (worried+) */}
            {noClickCount >= 2 && (
              <>
                <div className="p-brow p-brow-l"></div>
                <div className="p-brow p-brow-r"></div>
              </>
            )}

            {/* Blush cheeks */}
            <div className="p-blush p-blush-l"></div>
            <div className="p-blush p-blush-r"></div>

            {/* Nose with highlight */}
            <div className="p-nose">
              <div className="p-nose-shine"></div>
            </div>

            {/* Mouth */}
            <div className="p-mouth"></div>
          </div>


        </div>
      </div>

      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap" rel="stylesheet" />

      <style jsx global>{`
        /* ================================================================
         * CSS VARIABLES — Emotion-controlled design tokens
         * ================================================================ */
        .vc {
          --fur: #f5f0ea;
          --fur-light: #faf8f5;
          --fur-shade: #e8e0d4;
          --patch: #2a2a2a;
          --patch-light: #3d3d3d;
          --nose-c: #2a2a2a;
          --iris: #4a3728;
          --iris-light: #6d5340;
          --highlight: rgba(255,255,255,0.9);
          --blush-c: rgba(248,160,176,0.55);
          --tear-c: rgba(100,181,246,0.7);
          --shadow: rgba(0,0,0,0.08);
          --glow-c: rgba(255,182,193,0.3);

          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, #fce4ec 0%, #f8bbd0 40%, #f48fb1 100%);
          font-family: 'Caveat', cursive, sans-serif;
          position: relative;
          overflow: hidden;
        }

        .v-title {
          font-size: 3rem; color: #5d4037; margin-bottom: 2rem;
          text-align: center; font-weight: 400;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        }
        .v-title strong {
          font-weight: 700;
        }

        .buttons-row {
          display: flex; align-items: center;
          gap: 1.5rem; margin-bottom: 2rem; z-index: 10;
        }

        .btn-yes {
          background: #d32f2f; color: white; border: none;
          padding: 14px 40px; border-radius: 10px;
          font-size: 1.3rem; font-weight: 800; cursor: pointer;
          letter-spacing: 1px; transition: all .3s ease;
          box-shadow: 0 4px 12px rgba(211,47,47,0.4);
        }
        .btn-yes:hover { transform: scale(1.08); }
        .btn-yes:active { transform: scale(0.96); }

        .btn-no {
          background: #388e3c; color: white; border: none;
          padding: 14px 40px; border-radius: 10px;
          font-size: 1.3rem; font-weight: 800; cursor: pointer;
          letter-spacing: 1px; transition: all .3s ease;
          box-shadow: 0 4px 12px rgba(56,142,60,0.4);
        }
        .btn-no:hover { transform: scale(1.08); }
        .btn-no:active { transform: scale(0.96); }

        /* ================================================================
         * PANDA WRAPPER + AMBIENT GLOW
         * ================================================================ */
        .p-wrap {
          position: relative;
          margin-top: 1rem;
        }

        .p-glow {
          position: absolute;
          width: 260px; height: 260px;
          border-radius: 50%;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          filter: blur(40px);
          z-index: 0;
          transition: background .5s ease;
        }
        .p-glow-happy     { background: rgba(255,182,193,0.35); }
        .p-glow-surprised  { background: rgba(255,213,79,0.3); }
        .p-glow-worried    { background: rgba(255,183,77,0.25); }
        .p-glow-pleading   { background: rgba(179,157,219,0.3); }
        .p-glow-sad        { background: rgba(144,164,174,0.3); }
        .p-glow-crying     { background: rgba(100,181,246,0.3); }
        .p-glow-sobbing    { background: rgba(100,181,246,0.4); }
        .p-glow-devastated { background: rgba(100,149,237,0.5); animation: glowPulse 1s ease-in-out infinite; }

        @keyframes glowPulse {
          0%,100% { opacity:.6; transform:translate(-50%,-50%) scale(1); }
          50%     { opacity:1;  transform:translate(-50%,-50%) scale(1.15); }
        }

        /* ================================================================
         * PANDA BASE + EMOTION ANIMATIONS
         * ================================================================ */
        .p {
          position: relative;
          width: 220px; height: 180px;
          z-index: 1;
          transition: all .4s ease;
        }

        /* — Happy: gentle bounce + head tilt — */
        .p-happy { animation: pHappy 2.5s ease-in-out infinite; }
        @keyframes pHappy {
          0%,100% { transform: translateY(0) rotate(0deg); }
          30%     { transform: translateY(-14px) rotate(-1.5deg); }
          70%     { transform: translateY(-14px) rotate(1.5deg); }
        }

        /* — Surprised: tiny jump + blink — */
        .p-surprised { animation: pSurprised 2s ease-in-out infinite; }
        @keyframes pSurprised {
          0%      { transform: translateY(0) scale(1); }
          8%      { transform: translateY(-18px) scale(1.04); }
          16%     { transform: translateY(-6px) scale(0.98); }
          24%     { transform: translateY(-10px) scale(1); }
          100%    { transform: translateY(0) scale(1); }
        }

        /* — Worried: nervous tremble — */
        .p-worried { animation: pWorried 2.5s ease-in-out infinite; }
        @keyframes pWorried {
          0%,100% { transform: translateX(0) rotate(0deg); }
          10%  { transform: translateX(-2px) rotate(-0.5deg); }
          20%  { transform: translateX(2px) rotate(0.5deg); }
          30%  { transform: translateX(-1px) rotate(-0.3deg); }
          40%  { transform: translateX(1px) rotate(0.3deg); }
          50%  { transform: translateX(0) rotate(0); }
        }

        /* — Pleading: slow downward bob — */
        .p-pleading { animation: pPlead 3s ease-in-out infinite; }
        @keyframes pPlead {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50%     { transform: translateY(6px) rotate(-1deg); }
        }

        /* — Sad: heavy slow breathing — */
        .p-sad { animation: pSad 3.5s ease-in-out infinite; }
        @keyframes pSad {
          0%,100% { transform: translateY(0) rotate(0); }
          50%     { transform: translateY(4px) rotate(-0.5deg); }
        }

        /* — Crying: shoulder shaking — */
        .p-crying { animation: pCry 1.4s ease-in-out infinite; }
        @keyframes pCry {
          0%,100% { transform: translateY(0) rotate(0); }
          20%  { transform: translateY(3px) rotate(-1.5deg); }
          40%  { transform: translateY(-1px) rotate(0.5deg); }
          60%  { transform: translateY(4px) rotate(-1deg); }
          80%  { transform: translateY(0) rotate(1deg); }
        }

        /* — Sobbing: intense shake — */
        .p-sobbing { animation: pSob 1s ease-in-out infinite; }
        @keyframes pSob {
          0%,100% { transform: translateY(0) rotate(0); }
          15%  { transform: translateY(4px) rotate(-2deg); }
          30%  { transform: translateY(-2px) rotate(1deg); }
          50%  { transform: translateY(5px) rotate(-1.5deg); }
          70%  { transform: translateY(-1px) rotate(2deg); }
          85%  { transform: translateY(3px) rotate(-1deg); }
        }

        /* — Devastated: collapse forward — */
        .p-devastated { animation: pDevastated .7s ease-in-out infinite; }
        @keyframes pDevastated {
          0%,100% { transform: translateY(0) rotate(0) scale(1); }
          25%  { transform: translateY(6px) rotate(-3deg) scale(0.98); }
          50%  { transform: translateY(2px) rotate(1deg) scale(1); }
          75%  { transform: translateY(7px) rotate(-2deg) scale(0.97); }
        }

        /* ================================================================
         * EARS — with inner gradient + fur highlights
         * ================================================================ */
        .p-ear {
          position: absolute;
          width: 48px; height: 48px;
          background: radial-gradient(circle at 40% 35%, var(--patch-light), var(--patch));
          border-radius: 50%;
          top: -5px; z-index: 1;
          box-shadow:
            inset 0 -4px 8px rgba(0,0,0,0.35),
            0 2px 6px var(--shadow);
          transition: all .3s ease;
        }
        .p-ear-l { left: 40px; }
        .p-ear-r { right: 40px; }

        .p-ear-fur {
          position: absolute;
          width: 18px; height: 18px;
          background: radial-gradient(circle, rgba(80,60,40,0.3), transparent);
          border-radius: 50%;
          top: 12px; left: 15px;
        }

        /* Ears droop when sad+ */
        .p-sad .p-ear-l, .p-crying .p-ear-l,
        .p-sobbing .p-ear-l, .p-devastated .p-ear-l { transform: rotate(-12deg); top: 0; }
        .p-sad .p-ear-r, .p-crying .p-ear-r,
        .p-sobbing .p-ear-r, .p-devastated .p-ear-r { transform: rotate(12deg); top: 0; }

        /* ================================================================
         * HEAD — soft radial fur gradient + shine highlights
         * ================================================================ */
        .p-head {
          position: absolute;
          width: 160px; height: 150px;
          background: radial-gradient(ellipse at 45% 35%, white, var(--fur) 60%, var(--fur-shade));
          border-radius: 50%;
          top: 18px; left: 30px;
          box-shadow:
            0 6px 24px rgba(0,0,0,0.07),
            inset 0 -6px 16px rgba(0,0,0,0.04),
            inset 0 4px 12px rgba(255,255,255,0.4);
          z-index: 2;
          overflow: hidden;
        }

        .p-fur-shine {
          position: absolute;
          width: 55px; height: 25px;
          background: radial-gradient(ellipse, var(--highlight), transparent);
          top: 10px; left: 45px;
          border-radius: 50%; opacity: .5;
        }
        .p-fur-shine2 {
          position: absolute;
          width: 30px; height: 15px;
          background: radial-gradient(ellipse, var(--highlight), transparent);
          top: 20px; right: 25px;
          border-radius: 50%; opacity: .3;
        }

        /* ================================================================
         * EYE PATCHES — dark areas around eyes
         * ================================================================ */
        .p-patch {
          position: absolute;
          width: 42px; height: 38px;
          background: radial-gradient(ellipse at 50% 40%, var(--patch-light), var(--patch));
          border-radius: 50%;
          top: 42px;
          box-shadow: inset 0 2px 6px rgba(0,0,0,0.35);
          transition: all .3s ease;
        }
        .p-patch-l { left: 22px; transform: rotate(-10deg); }
        .p-patch-r { right: 22px; transform: rotate(10deg); }

        /* ================================================================
         * ANIME EYES — iris + pupil + sparkles
         * ================================================================ */
        .p-eye {
          position: absolute;
          width: 22px; height: 22px;
          background: white;
          border-radius: 50%;
          top: 50px; z-index: 5;
          box-shadow: inset 0 1px 4px rgba(0,0,0,0.1);
          overflow: hidden;
          transition: all .4s ease;
        }
        .p-eye-l { left: 32px; }
        .p-eye-r { right: 32px; }

        .p-iris {
          position: absolute;
          width: 16px; height: 16px;
          border-radius: 50%;
          top: 3px; left: 3px;
          overflow: hidden;
          background: var(--iris);
          transition: all .3s ease;
        }
        .p-iris-gradient {
          position: absolute; inset: 0;
          background: radial-gradient(circle at 40% 35%, var(--iris-light), var(--iris) 70%);
          border-radius: 50%;
        }
        .p-pupil {
          position: absolute;
          width: 8px; height: 8px;
          background: #111;
          border-radius: 50%;
          top: 4px; left: 4px;
          transition: all .3s ease;
        }

        /* Sparkle highlights in eyes */
        .p-eye-sparkle {
          position: absolute;
          background: white;
          border-radius: 50%;
          z-index: 6;
        }
        .p-sparkle1 { width: 5px; height: 5px; top: 2px; left: 2px; opacity: .9; }
        .p-sparkle2 { width: 3px; height: 3px; top: 8px; left: 9px; opacity: .6; }

        /* Happy: eyes look around */
        .p-happy .p-iris { animation: irisLook 4s ease-in-out infinite; }
        @keyframes irisLook {
          0%,100% { transform: translate(0,0); }
          25%  { transform: translate(2px,-1px); }
          50%  { transform: translate(-1px,1px); }
          75%  { transform: translate(1px,0); }
        }
        .p-happy .p-eye-sparkle { animation: sparkleGlow 2s ease-in-out infinite; }
        @keyframes sparkleGlow {
          0%,100% { opacity:.9; transform:scale(1); }
          50%     { opacity:1; transform:scale(1.3); }
        }

        /* Surprised: wide eyes */
        .p-surprised .p-eye {
          width: 28px; height: 28px; top: 46px;
        }
        .p-surprised .p-eye-l { left: 28px; }
        .p-surprised .p-eye-r { right: 28px; }
        .p-surprised .p-iris { width: 18px; height: 18px; }
        .p-surprised .p-pupil { width: 6px; height: 6px; top: 6px; left: 6px; }

        /* Worried: nervous small pupils */
        .p-worried .p-pupil { width: 6px; height: 6px; top: 5px; left: 5px; }
        .p-worried .p-iris { animation: irisNervous 2s ease-in-out infinite; }
        @keyframes irisNervous {
          0%,100% { transform: translate(0,0); }
          25%  { transform: translate(-1px,0); }
          50%  { transform: translate(1px,1px); }
          75%  { transform: translate(0,-1px); }
        }

        /* Pleading: watery big eyes */
        .p-pleading .p-eye { width: 24px; height: 24px; top: 48px; }
        .p-pleading .p-eye-l { left: 30px; }
        .p-pleading .p-eye-r { right: 30px; }
        .p-pleading .p-iris { width: 18px; height: 18px; top: 3px; left: 3px; }
        .p-pleading .p-pupil { width: 10px; height: 10px; top: 4px; left: 4px; }
        .p-pleading .p-sparkle1 { width: 7px; height: 7px; }
        .p-pleading .p-eye { box-shadow: inset 0 1px 4px rgba(0,0,0,0.1), 0 0 8px rgba(100,181,246,0.3); }

        /* Sad: droopy half-closed eyes */
        .p-sad .p-eye { height: 14px; top: 56px; overflow: hidden; border-radius: 0 0 50% 50%; }
        .p-sad .p-sparkle1 { opacity: .4; }
        .p-sad .p-sparkle2 { opacity: .2; }

        /* Crying: squinting + tears */
        .p-crying .p-eye { height: 10px; top: 58px; border-radius: 0 0 50% 50%; }
        .p-crying .p-sparkle1, .p-crying .p-sparkle2 { opacity: .2; }

        /* Sobbing: nearly shut eyes */
        .p-sobbing .p-eye { height: 6px; top: 60px; border-radius: 0 0 50% 50%; }
        .p-sobbing .p-eye-sparkle { opacity: 0; }

        /* Devastated: shut + glowing tears */
        .p-devastated .p-eye {
          height: 4px; top: 62px; border-radius: 0 0 50% 50%;
          box-shadow: 0 0 12px rgba(100,181,246,0.5);
        }
        .p-devastated .p-eye-sparkle { opacity: 0; }

        /* ================================================================
         * TEARS — animated streams
         * ================================================================ */
        .p-tear-stream {
          position: absolute;
          width: 8px; top: 72px;
          height: 50px; z-index: 6;
          overflow: visible;
        }
        .p-ts-l { left: 36px; }
        .p-ts-r { right: 36px; }

        .p-tear-drop {
          position: absolute;
          width: 6px; height: 10px;
          background: linear-gradient(180deg, rgba(100,181,246,0.6), rgba(100,181,246,0.2));
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          animation: tearFall 1.2s ease-in infinite;
          opacity: 0;
        }
        .p-td1 { left: 0; animation-delay: 0s; }
        .p-td2 { left: 2px; animation-delay: 0.6s; }
        .p-td3 { left: 0; animation-delay: 0.3s; }
        .p-td4 { left: 2px; animation-delay: 0.9s; }

        @keyframes tearFall {
          0%   { transform: translateY(0); opacity: 0; }
          15%  { opacity: .8; }
          100% { transform: translateY(40px); opacity: 0; }
        }

        /* Bigger tears for sobbing/devastated */
        .p-sobbing .p-tear-drop,
        .p-devastated .p-tear-drop {
          width: 8px; height: 14px;
        }
        .p-devastated .p-tear-drop {
          filter: drop-shadow(0 0 4px rgba(100,181,246,0.5));
          animation-duration: 0.8s;
        }

        /* ================================================================
         * EYEBROWS — tilt increases with sadness
         * ================================================================ */
        .p-brow {
          position: absolute;
          width: 22px; height: 5px;
          background: var(--patch);
          border-radius: 3px;
          top: 35px; z-index: 6;
          transition: all .3s ease;
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
        }
        .p-brow-l { left: 28px; transform: rotate(12deg); }
        .p-brow-r { right: 28px; transform: rotate(-12deg); }

        .p-worried .p-brow-l  { transform: rotate(15deg); }
        .p-worried .p-brow-r  { transform: rotate(-15deg); }
        .p-pleading .p-brow-l { transform: rotate(20deg); top: 33px; }
        .p-pleading .p-brow-r { transform: rotate(-20deg); top: 33px; }
        .p-sad .p-brow-l      { transform: rotate(25deg); top: 31px; }
        .p-sad .p-brow-r      { transform: rotate(-25deg); top: 31px; }
        .p-crying .p-brow-l,
        .p-sobbing .p-brow-l,
        .p-devastated .p-brow-l { transform: rotate(30deg); top: 29px; }
        .p-crying .p-brow-r,
        .p-sobbing .p-brow-r,
        .p-devastated .p-brow-r { transform: rotate(-30deg); top: 29px; }

        /* ================================================================
         * BLUSH CHEEKS — soft glow, fades when sad
         * ================================================================ */
        .p-blush {
          position: absolute;
          width: 26px; height: 16px;
          background: var(--blush-c);
          border-radius: 50%;
          top: 78px; z-index: 4;
          filter: blur(2px);
          transition: opacity .4s ease;
        }
        .p-blush-l { left: 14px; }
        .p-blush-r { right: 14px; }

        .p-sad .p-blush        { opacity: .3; }
        .p-crying .p-blush     { opacity: .2; }
        .p-sobbing .p-blush    { opacity: .1; }
        .p-devastated .p-blush { opacity: .05; }

        /* ================================================================
         * NOSE — with tiny shine highlight
         * ================================================================ */
        .p-nose {
          position: absolute;
          width: 16px; height: 11px;
          background: radial-gradient(ellipse at 45% 40%, var(--patch-light), var(--nose-c));
          border-radius: 50%;
          top: 74px; left: 50%; transform: translateX(-50%);
          z-index: 5;
          box-shadow: 0 2px 4px rgba(0,0,0,0.15);
        }
        .p-nose-shine {
          position: absolute;
          width: 5px; height: 3px;
          background: rgba(255,255,255,0.5);
          border-radius: 50%;
          top: 2px; left: 4px;
        }

        /* ================================================================
         * MOUTH — transforms per emotion
         * ================================================================ */
        .p-mouth {
          position: absolute;
          width: 18px; height: 9px;
          top: 88px; left: 50%;
          transform: translateX(-50%);
          z-index: 5;
          transition: all .3s ease;
        }

        /* Happy: cute W smile */
        .p-happy .p-mouth {
          width: 20px; height: 8px;
          border-bottom: 3px solid var(--nose-c);
          border-radius: 0 0 50% 50%;
        }
        .p-happy .p-mouth::before {
          content: '';
          position: absolute;
          width: 4px; height: 6px;
          border-left: 2px solid var(--nose-c);
          top: -2px; left: 50%; transform: translateX(-50%);
        }

        /* Surprised: small O */
        .p-surprised .p-mouth {
          width: 14px; height: 14px;
          border: 3px solid var(--nose-c);
          border-radius: 50%;
          background: radial-gradient(circle, #ffdddd, #ffcccc);
          top: 86px;
        }

        /* Worried: wavy line */
        .p-worried .p-mouth {
          width: 20px; height: 3px;
          border-bottom: 3px solid var(--nose-c);
          border-radius: 0;
          animation: mouthWaver 2s ease-in-out infinite;
        }
        @keyframes mouthWaver {
          0%,100% { transform: translateX(-50%) scaleX(1); }
          50%     { transform: translateX(-50%) scaleX(0.8) translateY(1px); }
        }

        /* Pleading: soft frown */
        .p-pleading .p-mouth {
          width: 16px; height: 6px;
          border-top: 3px solid var(--nose-c);
          border-radius: 50% 50% 0 0;
          top: 90px;
        }

        /* Sad: deeper frown */
        .p-sad .p-mouth {
          width: 20px; height: 8px;
          border-top: 3px solid var(--nose-c);
          border-radius: 50% 50% 0 0;
          top: 92px;
        }

        /* Crying: trembling frown */
        .p-crying .p-mouth {
          width: 22px; height: 9px;
          border-top: 3px solid var(--nose-c);
          border-radius: 50% 50% 0 0;
          top: 92px;
          animation: mouthTremble 1s ease-in-out infinite;
        }

        /* Sobbing */
        .p-sobbing .p-mouth {
          width: 24px; height: 10px;
          border-top: 4px solid var(--nose-c);
          border-radius: 50% 50% 0 0;
          top: 92px;
          animation: mouthTremble .7s ease-in-out infinite;
        }

        /* Devastated: wide wobbling mouth */
        .p-devastated .p-mouth {
          width: 28px; height: 12px;
          border-top: 4px solid var(--nose-c);
          border-radius: 50% 50% 0 0;
          top: 92px;
          animation: mouthWobble .5s ease-in-out infinite;
        }

        @keyframes mouthTremble {
          0%,100% { transform: translateX(-50%) scaleX(1) scaleY(1); }
          50%     { transform: translateX(-50%) scaleX(0.9) scaleY(1.1); }
        }
        @keyframes mouthWobble {
          0%,100% { transform: translateX(-50%) scaleX(1) rotate(0); }
          25%     { transform: translateX(-50%) scaleX(0.85) rotate(-1deg); }
          75%     { transform: translateX(-50%) scaleX(0.85) rotate(1deg); }
        }

        /* ================================================================
         * BODY — with belly gradient + breathing animation
         * ================================================================ */
        .p-body {
          position: absolute;
          width: 140px; height: 115px;
          background: radial-gradient(ellipse at 50% 35%, white, var(--fur) 55%, var(--fur-shade));
          border-radius: 50%;
          bottom: 20px; left: 40px;
          box-shadow:
            0 8px 28px rgba(0,0,0,0.06),
            inset 0 -6px 16px rgba(0,0,0,0.04),
            inset 0 4px 12px rgba(255,255,255,0.3);
          z-index: 1;
          animation: breathe 3.5s ease-in-out infinite;
        }

        /* Breathing slows when sad */
        .p-sad .p-body      { animation-duration: 5s; }
        .p-crying .p-body   { animation-duration: 2s; }
        .p-sobbing .p-body  { animation-duration: 1.5s; }
        .p-devastated .p-body { animation-duration: 1.2s; }

        @keyframes breathe {
          0%,100% { transform: scaleX(1) scaleY(1); }
          50%     { transform: scaleX(1.02) scaleY(1.015); }
        }

        .p-belly {
          position: absolute;
          width: 75px; height: 60px;
          background: radial-gradient(ellipse, var(--fur-shade), transparent);
          border-radius: 50%;
          top: 20px; left: 50%; transform: translateX(-50%);
          opacity: .35;
        }

        .p-body-shine {
          position: absolute;
          width: 40px; height: 20px;
          background: radial-gradient(ellipse, var(--highlight), transparent);
          top: 12px; left: 40px;
          border-radius: 50%; opacity: .3;
        }

        /* ================================================================
         * ARMS — with paw pads, position changes per emotion
         * ================================================================ */
        .p-arm {
          position: absolute;
          width: 36px; height: 62px;
          background: radial-gradient(ellipse at 50% 30%, var(--patch-light), var(--patch));
          border-radius: 50%;
          bottom: 40px; z-index: 0;
          box-shadow:
            inset 0 -4px 8px rgba(0,0,0,0.25),
            0 3px 8px var(--shadow);
          transition: all .4s ease;
        }
        .p-arm-l { left: 22px; transform: rotate(12deg); }
        .p-arm-r { right: 22px; transform: rotate(-12deg); }

        .p-paw {
          position: absolute;
          width: 14px; height: 10px;
          background: radial-gradient(ellipse, #555, #3a3a3a);
          border-radius: 50%;
          bottom: 4px; left: 50%; transform: translateX(-50%);
          opacity: .5;
        }

        /* Worried: arms close to chest */
        .p-worried .p-arm-l { transform: rotate(18deg); left: 28px; }
        .p-worried .p-arm-r { transform: rotate(-18deg); right: 28px; }

        /* Pleading: arms slightly raised */
        .p-pleading .p-arm-l { transform: rotate(22deg); left: 26px; bottom: 45px; }
        .p-pleading .p-arm-r { transform: rotate(-22deg); right: 26px; bottom: 45px; }

        /* Sad+: arms droop */
        .p-sad .p-arm-l { transform: rotate(3deg); left: 18px; bottom: 30px; }
        .p-sad .p-arm-r { transform: rotate(-3deg); right: 18px; bottom: 30px; }
        .p-crying .p-arm-l,
        .p-sobbing .p-arm-l { transform: rotate(0deg); left: 16px; bottom: 25px; }
        .p-crying .p-arm-r,
        .p-sobbing .p-arm-r { transform: rotate(0deg); right: 16px; bottom: 25px; }
        .p-devastated .p-arm-l { transform: rotate(-5deg); left: 14px; bottom: 22px; }
        .p-devastated .p-arm-r { transform: rotate(5deg); right: 14px; bottom: 22px; }

        /* ================================================================
         * FEET — with subtle paw pad
         * ================================================================ */
        .p-foot {
          position: absolute;
          width: 42px; height: 22px;
          background: radial-gradient(ellipse at 50% 40%, var(--patch-light), var(--patch));
          border-radius: 50%;
          bottom: 0; z-index: 2;
          box-shadow:
            inset 0 -3px 6px rgba(0,0,0,0.2),
            0 2px 6px var(--shadow);
        }
        .p-foot-l { left: 48px; }
        .p-foot-r { right: 48px; }

        .p-foot-pad {
          position: absolute;
          width: 16px; height: 8px;
          background: radial-gradient(ellipse, #555, transparent);
          border-radius: 50%;
          bottom: 3px; left: 50%; transform: translateX(-50%);
          opacity: .3;
        }

        /* ================================================================
         * RESPONSIVE
         * ================================================================ */
        @media (max-width: 640px) {
          .v-title { font-size: 2rem; }
          .btn-yes, .btn-no { padding: 10px 28px; font-size: 1.1rem; }
          .p { transform: scale(0.75); }
        }
      `}</style>
    </main>
  );
}
