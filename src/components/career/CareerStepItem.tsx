"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { Briefcase, Building2, GraduationCap, Code2 } from "lucide-react";
import { CareerStep } from "@/data/biodata";
import { formatCareerDate, calculateDuration, cn } from "@/lib/utils";
import CareerCard from "./CareerCard";

export interface CareerStepItemProps {
  step: CareerStep;
  index: number;
  total: number;
  showIncome?: boolean;
}

function renderStepIcon(step: CareerStep, className: string) {
  if (step.category === "education" || step.id.includes("xavier") || step.id.includes("engineering")) {
    return <GraduationCap className={className} />;
  }
  if (step.id.includes("neosoft")) {
    return <Code2 className={className} />;
  }
  if (step.id.includes("family")) {
    return <Building2 className={className} />;
  }
  return <Briefcase className={className} />;
}

export function CareerStepItem({
  step,
  index,
  total,
  showIncome = false,
}: CareerStepItemProps) {
  const isEven = index % 2 === 0; // step 1 on LEFT, step 2 on RIGHT
  const isLeft = isEven;
  const isCurrent = step.endDate === "Present";
  const itemRef = useRef<HTMLLIElement>(null);

  // Active step detection (nearest viewport center)
  const isInCenterView = useInView(itemRef, {
    margin: "-25% 0px -25% 0px",
  });

  const isActive = isInCenterView || (index === 0 && isCurrent);
  const shouldReduceMotion = useReducedMotion();

  const formattedStart = formatCareerDate(step.startDate);
  const formattedEnd = formatCareerDate(step.endDate);
  const dateRangeDisplay = `${formattedStart} - ${formattedEnd}`;
  const duration = calculateDuration(step.startDate, step.endDate);

  const cardVariants: Variants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, x: isLeft ? -30 : 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const mobileCardVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const nodeVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { scale: 0.6, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <li
      ref={itemRef}
      className="relative list-none w-full"
      style={{
        marginBottom: index === total - 1 ? "0px" : "clamp(64px, 10vw, 110px)",
      }}
      aria-label={`${step.role} at ${step.company}`}
    >
      {/* ========================================================
          DESKTOP LAYOUT (md and up): Alternating Left / Right
          CSS Grid with strict 2-column split and middle gap.
         ======================================================== */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-x-14 lg:gap-x-20 xl:gap-x-24 w-full relative items-start">
        {/* LEFT COLUMN (Column 1) */}
        <div className="min-w-0 w-full flex items-start justify-end">
          {isLeft ? (
            <div className="w-full relative my-3">
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="w-full"
              >
                <CareerCard
                  step={step}
                  arrowSide="right"
                  showIncome={showIncome}
                />
              </motion.div>
              {/* Horizontal Connector bridging the margin to center line */}
              <div
                aria-hidden="true"
                className="absolute right-0 translate-x-full top-8 w-7 lg:w-10 xl:w-12 h-[2px] bg-[#E4DDE0]"
              />
            </div>
          ) : (
            /* Balanced opposite side displaying period & category */
            <div className="w-full text-right my-3 pt-2 pr-3 lg:pr-5 flex flex-col items-end justify-center">
              <span
                className="career-milestone-pill"
                style={{ padding: "8px 20px" }}
              >
                {step.category === "education" ? "Academic Foundation" : "Career Milestone"}
              </span>
              <span className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-neutral-900 mt-2.5 break-words">
                {dateRangeDisplay}
              </span>
              {duration && (
                <span className="text-xs sm:text-sm text-neutral-500 font-medium mt-1">
                  {duration} &bull; {step.location}
                </span>
              )}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN (Column 2) */}
        <div className="min-w-0 w-full flex items-start justify-start">
          {!isLeft ? (
            <div className="w-full relative my-3">
              {/* Horizontal Connector bridging the margin to center line */}
              <div
                aria-hidden="true"
                className="absolute left-0 -translate-x-full top-8 w-7 lg:w-10 xl:w-12 h-[2px] bg-[#E4DDE0]"
              />
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="w-full"
              >
                <CareerCard
                  step={step}
                  arrowSide="left"
                  showIncome={showIncome}
                />
              </motion.div>
            </div>
          ) : (
            /* Balanced opposite side displaying period & category */
            <div className="w-full text-left my-3 pt-2 pl-3 lg:pl-5 flex flex-col items-start justify-center">
              <span
                className="career-milestone-pill"
                style={{ padding: "8px 20px" }}
              >
                {step.category === "education" ? "Academic Foundation" : "Career Milestone"}
              </span>
              <span className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-neutral-900 mt-2.5 break-words">
                {dateRangeDisplay}
              </span>
              {duration && (
                <span className="text-xs sm:text-sm text-neutral-500 font-medium mt-1">
                  {duration} &bull; {step.location}
                </span>
              )}
            </div>
          )}
        </div>

        {/* CENTER NODE: Anchored directly at 50% dead center in the middle gap */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[23px] z-10 shrink-0 pointer-events-none">
          <motion.div
            variants={nodeVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div
              className={cn(
                "w-10 h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center transition-all duration-300",
                "border-2 border-black pointer-events-auto",
                isActive
                  ? "bg-black text-white shadow-lg ring-4 ring-black/10 scale-105"
                  : "bg-white text-neutral-800 shadow-sm hover:scale-105"
              )}
              aria-hidden="true"
            >
              {renderStepIcon(step, "w-4 h-4 lg:w-4.5 lg:h-4.5")}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ========================================================
          MOBILE LAYOUT (below md): Fully responsive single column
         ======================================================== */}
      <div className="md:hidden relative pl-10 sm:pl-12 w-full my-2">
        {/* Node sitting on left line */}
        <motion.div
          variants={nodeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="absolute left-3.5 top-6 -translate-x-1/2 z-10"
        >
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border-2 border-black",
              isActive
                ? "bg-black text-white shadow-md ring-3 ring-black/10"
                : "bg-white text-neutral-800 shadow-2xs"
            )}
            aria-hidden="true"
          >
            {renderStepIcon(step, "w-3.5 h-3.5")}
          </div>
        </motion.div>

        {/* Short horizontal connector from left line to card */}
        <div
          aria-hidden="true"
          className="absolute left-3.5 top-10 w-6.5 sm:w-8.5 h-[2px] bg-[#E4DDE0]"
        />

        {/* Stacked Card */}
        <motion.div
          variants={mobileCardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full"
        >
          <CareerCard
            step={step}
            arrowSide="left"
            showIncome={showIncome}
          />
        </motion.div>
      </div>
    </li>
  );
}

export default CareerStepItem;
