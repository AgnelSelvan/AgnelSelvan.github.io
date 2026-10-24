"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { Briefcase, Building2, Rocket, GraduationCap, Code2 } from "lucide-react";
import { CareerStep } from "@/data/biodata";
import { formatCareerDate, calculateDuration, cn } from "@/lib/utils";
import CareerCard from "./CareerCard";

export interface CareerStepItemProps {
  step: CareerStep;
  index: number;
  total: number;
  showIncome?: boolean;
}

function getStepIcon(step: CareerStep) {
  if (step.category === "education" || step.id.includes("xavier") || step.id.includes("engineering")) {
    return GraduationCap;
  }
  if (step.id.includes("saas") || step.type === "Self-employed") {
    return Rocket;
  }
  if (step.id.includes("neosoft")) {
    return Code2;
  }
  if (step.id.includes("family")) {
    return Building2;
  }
  return Briefcase;
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

  const StepIcon = getStepIcon(step);

  // Desktop slide-in animation variants: left cards from x: -40, right from x: 40
  const cardVariants: Variants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, x: isLeft ? -40 : 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const mobileCardVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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
      className="relative list-none"
      aria-label={`${step.role} at ${step.company}`}
    >
      {/* ========================================================
          DESKTOP LAYOUT (md and up): Alternating Left and Right
          with Line running down the exact Middle
         ======================================================== */}
      <div className="hidden md:flex items-center w-full relative">
        {/* LEFT COLUMN (50% width) */}
        <div className="w-[calc(50%-22px)] flex items-center justify-end pr-8 lg:pr-12">
          {isLeft ? (
            <div className="w-full relative flex items-center justify-end">
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
              {/* Horizontal Connector to Center Middle Line */}
              <div
                aria-hidden="true"
                className="absolute -right-8 lg:-right-12 w-8 lg:w-12 h-[2px] bg-[#E4DDE0]"
              />
            </div>
          ) : (
            /* Balanced opposite side displaying period & category */
            <div className="text-right pr-4 lg:pr-6 flex flex-col items-end">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                {step.category === "education" ? "Academic Foundation" : "Career Milestone"}
              </span>
              <span className="text-base lg:text-lg font-bold text-neutral-800 mt-1">
                {dateRangeDisplay}
              </span>
              {duration && (
                <span className="text-xs text-neutral-500 font-medium mt-0.5">
                  {duration} &bull; {step.location}
                </span>
              )}
            </div>
          )}
        </div>

        {/* CENTER NODE (44px circle right on the middle line) */}
        <div className="shrink-0 relative z-10">
          <motion.div
            variants={nodeVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div
              className={cn(
                "w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300",
                "border-2 border-black",
                isActive
                  ? "bg-black text-white shadow-lg ring-4 ring-black/10 scale-105"
                  : "bg-white text-neutral-800 shadow-sm hover:scale-105"
              )}
              aria-hidden="true"
            >
              <StepIcon className="w-4.5 h-4.5" />
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN (50% width) */}
        <div className="w-[calc(50%-22px)] flex items-center justify-start pl-8 lg:pl-12">
          {!isLeft ? (
            <div className="w-full relative flex items-center justify-start">
              {/* Horizontal Connector to Center Middle Line */}
              <div
                aria-hidden="true"
                className="absolute -left-8 lg:-left-12 w-8 lg:w-12 h-[2px] bg-[#E4DDE0]"
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
            <div className="text-left pl-4 lg:pl-6 flex flex-col items-start">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                {step.category === "education" ? "Academic Foundation" : "Career Milestone"}
              </span>
              <span className="text-base lg:text-lg font-bold text-neutral-800 mt-1">
                {dateRangeDisplay}
              </span>
              {duration && (
                <span className="text-xs text-neutral-500 font-medium mt-0.5">
                  {duration} &bull; {step.location}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================
          MOBILE LAYOUT (below md): Stacked with Left Stepper Line
         ======================================================== */}
      <div className="md:hidden relative pl-14 sm:pl-16 w-full">
        {/* Node sitting on left line */}
        <motion.div
          variants={nodeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="absolute left-5 sm:left-6 top-8 -translate-x-1/2 z-10"
        >
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 border-black",
              isActive
                ? "bg-black text-white shadow-md ring-4 ring-black/10"
                : "bg-white text-neutral-800 shadow-xs"
            )}
            aria-hidden="true"
          >
            <StepIcon className="w-4 h-4" />
          </div>
        </motion.div>

        {/* Short horizontal connector from left line to card */}
        <div
          aria-hidden="true"
          className="absolute left-5 sm:left-6 top-[3.25rem] w-9 sm:w-10 h-[2px] bg-[#E4DDE0]"
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
