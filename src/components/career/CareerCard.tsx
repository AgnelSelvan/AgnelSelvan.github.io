import React from "react";
import Image from "next/image";
import { Calendar, CheckCircle2, DollarSign } from "lucide-react";
import { CareerStep } from "@/data/biodata";
import { formatCareerDate, calculateDuration, cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Chip from "@/components/ui/Chip";

export interface CareerCardProps {
  step: CareerStep;
  arrowSide: "left" | "right";
  showIncome?: boolean;
}

function getInitials(name: string): string {
  if (!name) return "CO";
  const words = name.replace(/[^a-zA-Z0-9\s]/g, "").trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  if (words.length === 2)
    return (words[0][0] + words[1][0]).toUpperCase();
  return (words[0][0] + words[1][0] + words[2][0]).toUpperCase();
}

export function CareerCard({
  step,
  arrowSide = "left",
  showIncome = false,
}: CareerCardProps) {
  const isCurrent = step.endDate === "Present";
  const formattedStart = formatCareerDate(step.startDate);
  const formattedEnd = formatCareerDate(step.endDate);
  const duration = calculateDuration(step.startDate, step.endDate);
  const initials = getInitials(step.company);

  return (
    <article
      tabIndex={0}
      aria-labelledby={`career-title-${step.id}`}
      className={cn(
        "group relative bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/80",
        "shadow-[0_8px_30px_rgba(0,0,0,0.04)]",
        "p-6 sm:p-8 md:p-9 lg:p-10 flex flex-col gap-5 md:gap-6",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] hover:border-neutral-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
      )}
    >
      {/* CSS Triangle Arrow pointing toward the center line on desktop */}
      {arrowSide === "right" ? (
        <span
          aria-hidden="true"
          className="hidden md:block absolute -right-1.5 top-8 w-3 h-3 rotate-45 bg-white border-t border-r border-neutral-200/80 transition-colors duration-300 group-hover:border-neutral-300"
        />
      ) : (
        <span
          aria-hidden="true"
          className="hidden md:block absolute -left-1.5 top-8 w-3 h-3 rotate-45 bg-white border-b border-l border-neutral-200/80 transition-colors duration-300 group-hover:border-neutral-300"
        />
      )}

      {/* Mobile-only Arrow pointing left to the mobile line */}
      <span
        aria-hidden="true"
        className="md:hidden block absolute -left-1.5 top-8 w-3 h-3 rotate-45 bg-white border-b border-l border-neutral-200/80 transition-colors duration-300 group-hover:border-neutral-300"
      />

      {/* 1. HEADER ROW */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
          {/* Logo container */}
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-neutral-100 p-2 sm:p-2.5 flex items-center justify-center shrink-0 border border-neutral-200/70 overflow-hidden text-neutral-800 font-bold text-xs tracking-wider shadow-2xs">
            {step.logo ? (
              <Image
                src={step.logo}
                alt={`${step.company} logo`}
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>

          <div className="min-w-0">
            <h3
              id={`career-title-${step.id}`}
              className="text-lg sm:text-xl font-bold text-neutral-900 leading-snug truncate"
            >
              {step.role}
            </h3>
            <p className="text-sm sm:text-[15px] text-neutral-500 truncate mt-0.5">
              {step.company} &bull; {step.location}
            </p>
          </div>
        </div>

        {/* Employment Type Badge */}
        <Badge
          variant="default"
          className="self-start sm:self-auto shrink-0 bg-neutral-100 text-neutral-700 font-semibold px-3.5 py-1 rounded-full text-xs"
        >
          {step.type}
        </Badge>
      </div>

      {/* 2. DATE + DURATION ROW */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-sm text-neutral-600 bg-neutral-50/90 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-neutral-200/60">
        <div className="flex items-center gap-1.5 text-neutral-700 font-medium">
          <Calendar className="w-4 h-4 text-neutral-400 shrink-0" aria-hidden="true" />
          <span>
            {formattedStart} &ndash; {formattedEnd}
          </span>
        </div>

        {duration && (
          <span className="text-neutral-400 font-normal text-sm">
            &bull; {duration}
          </span>
        )}

        {isCurrent && (
          <Badge
            variant="success"
            className="ml-auto px-2.5 py-0.5 text-xs font-semibold"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
              aria-hidden="true"
            />
            <span>Present</span>
          </Badge>
        )}
      </div>

      {/* 3. DIVIDER */}
      <hr className="border-t border-neutral-100/90 my-0.5" />

      {/* 4. DESCRIPTION */}
      <p className="text-sm sm:text-[15px] md:text-base leading-relaxed text-neutral-600">
        {step.description}
      </p>

      {/* 5. KEY HIGHLIGHTS */}
      {step.highlights && step.highlights.length > 0 && (
        <ul className="flex flex-col gap-2.5 sm:gap-3 text-sm sm:text-[14.5px] text-neutral-700 list-none m-0 p-0">
          {step.highlights.map((highlight, idx) => (
            <li key={idx} className="flex items-start gap-2.5 sm:gap-3 leading-relaxed">
              <span className="w-5 h-5 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2
                  className="w-3.5 h-3.5 text-neutral-900"
                  aria-hidden="true"
                />
              </span>
              <span className="leading-relaxed">{highlight}</span>
            </li>
          ))}
        </ul>
      )}

      {/* 6. SKILL TAGS */}
      {step.skills && step.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-100/80" aria-label="Skills & Technologies">
          {step.skills.map((skill, idx) => (
            <Chip key={idx}>{skill}</Chip>
          ))}
        </div>
      )}

      {/* 7. OPTIONAL FOOTER: Annual Income */}
      {showIncome && step.income && (
        <div className="mt-2 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center gap-1.5 font-medium text-neutral-700">
            <DollarSign className="w-3.5 h-3.5 text-neutral-400" aria-hidden="true" />
            <span>Annual Compensation</span>
          </div>
          <span className="font-semibold text-neutral-900 bg-neutral-100 px-2.5 py-1 rounded-md">
            {step.income}
          </span>
        </div>
      )}
    </article>
  );
}

export default CareerCard;
