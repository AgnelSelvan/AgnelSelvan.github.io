"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { career as defaultCareerSteps, showIncome as defaultShowIncome, CareerStep } from "@/data/biodata";
import CareerStepItem from "./CareerStepItem";

export interface CareerSectionProps {
  steps?: CareerStep[];
  showIncome?: boolean;
}

export function CareerSection({
  steps = defaultCareerSteps,
  showIncome = defaultShowIncome,
}: CareerSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress through the career timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 65%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <section
      id="career"
      aria-label="Professional Career & Education Journey"
      className="relative py-20 md:py-28 bg-[#F7F1F2] overflow-hidden"
    >
      {/* Anchor for education nav links */}
      <div id="education" className="absolute top-0 left-0 scroll-mt-28" />

      {/* Background Decorative Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-rose-200/20 to-amber-200/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-rose-200/20 to-neutral-200/20 blur-3xl"
      />

      {/* WHOLE WIDTH CONTAINER */}
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================
            CENTERED SECTION HEADING
           ======================================================== */}
        <div className="flex flex-col items-center justify-center text-center mb-16 md:mb-24">
          {/* Eyebrow Label */}
          <span className="text-xs font-bold tracking-widest text-neutral-500 uppercase px-3.5 py-1.5 rounded-full bg-white/70 border border-neutral-200/80 shadow-2xs mb-3.5">
            CAREER &amp; EDUCATION
          </span>

          {/* Main H2 Heading */}
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-tight">
            Professional &amp; Academic Journey
          </h2>

          {/* Muted One-line Subtitle */}
          <p className="text-neutral-500 max-w-2xl text-center text-sm md:text-base mt-3 leading-relaxed">
            A chronological timeline of engineering leadership, enterprise mobile architecture, independent SaaS products, and computer engineering foundation.
          </p>
        </div>

        {/* ========================================================
            TIMELINE CONTAINER (Line in middle, alternating cards)
           ======================================================== */}
        <div ref={containerRef} className="relative w-full">
          {/* DESKTOP TIMELINE TRACK: Exact Middle */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-6 bottom-6 w-[2px] bg-[#E4DDE0]"
          >
            {/* Scroll-driven black progress line fill */}
            <motion.div
              style={{ scaleY }}
              className="w-full h-full bg-black origin-top"
            />
          </div>

          {/* MOBILE TIMELINE TRACK: Left aligned */}
          <div
            aria-hidden="true"
            className="md:hidden block absolute left-5 sm:left-6 -translate-x-1/2 top-6 bottom-6 w-[2px] bg-[#E4DDE0]"
          >
            {/* Scroll-driven black progress line fill */}
            <motion.div
              style={{ scaleY }}
              className="w-full h-full bg-black origin-top"
            />
          </div>

          {/* ========================================================
              ACCESSIBLE ORDERED LIST OF STEPS (Left & Right Alternating)
             ======================================================== */}
          <ol className="relative space-y-16 md:space-y-24 p-0 m-0">
            {steps.map((step, index) => (
              <CareerStepItem
                key={step.id}
                step={step}
                index={index}
                total={steps.length}
                showIncome={showIncome}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default CareerSection;
