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
        "group relative career-timeline-card w-full",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
      )}
    >
      {/* CSS Triangle Arrow pointing toward the center line on desktop */}
      {arrowSide === "right" ? (
        <span
          aria-hidden="true"
          className="hidden md:block absolute -right-2 top-8 w-3.5 h-3.5 rotate-45 bg-white border-t border-r border-neutral-200/90 transition-colors duration-300 group-hover:border-neutral-300"
        />
      ) : (
        <span
          aria-hidden="true"
          className="hidden md:block absolute -left-2 top-8 w-3.5 h-3.5 rotate-45 bg-white border-b border-l border-neutral-200/90 transition-colors duration-300 group-hover:border-neutral-300"
        />
      )}

      {/* Mobile-only Arrow pointing left to the mobile line */}
      <span
        aria-hidden="true"
        className="md:hidden block absolute -left-2 top-7 w-3 h-3 rotate-45 bg-white border-b border-l border-neutral-200/90 transition-colors duration-300 group-hover:border-neutral-300"
      />

      {/* 1. HEADER ROW */}
      <div className="flex items-start justify-between gap-3 pb-0.5">
        <div className="flex items-start gap-3 sm:gap-3.5 min-w-0 flex-1">
          {/* Logo container */}
          <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-neutral-100 p-2 flex items-center justify-center shrink-0 border border-neutral-200/80 overflow-hidden text-neutral-800 font-bold text-xs tracking-wider shadow-2xs mt-0.5">
            {step.logo ? (
              <Image
                src={step.logo}
                alt={`${step.company} logo`}
                width={36}
                height={36}
                className="w-full h-full object-contain"
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3
              id={`career-title-${step.id}`}
              className="text-base sm:text-lg lg:text-xl font-bold text-neutral-900 leading-snug break-words"
            >
              {step.role}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 leading-normal mt-1 break-words">
              {step.company} &bull; {step.location}
            </p>
          </div>
        </div>

        {/* Employment / Degree Type Badge */}
        <Badge
          variant="default"
          className="self-start shrink-0 bg-neutral-100 text-neutral-800 font-semibold px-3 py-1 rounded-full text-[11px] sm:text-xs shadow-2xs inline-flex items-center justify-center"
          style={{ padding: "8px 20px" }}
        >
          {step.type}
        </Badge>
      </div>

      {/* 2. DATE + DURATION ROW */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs sm:text-sm text-neutral-600 bg-neutral-50/90 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-neutral-200/60">
        <div className="flex items-center gap-1.5 text-neutral-800 font-semibold" style={{ padding: "8px 20px" }}>
          <Calendar className="w-3.5 h-3.5 text-neutral-400 shrink-0" aria-hidden="true" />
          <span>
            {formattedStart} &ndash; {formattedEnd}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {duration && (
            <span className="text-neutral-500 font-medium text-[11px] sm:text-xs">
              {duration}
            </span>
          )}

          {isCurrent && (
            <Badge
              variant="success"
              className="px-2.5 py-0.5 text-[10.5px] sm:text-xs font-semibold"
              style={{ padding: "8px 20px" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1"
                aria-hidden="true"
              />
              <span>Present</span>
            </Badge>
          )}
        </div>
      </div>

      {/* 3. DIVIDER */}
      <hr className="border-t border-neutral-100 my-0.5" />

      {/* 4. DESCRIPTION */}
      <p className="text-xs sm:text-sm md:text-[14px] leading-relaxed text-neutral-600 break-words">
        {step.description}
      </p>

      {/* 5. KEY HIGHLIGHTS */}
      {step.highlights && step.highlights.length > 0 && (
        <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-neutral-700 list-none m-0 p-0">
          {step.highlights.map((highlight, idx) => (
            <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
              <span className="w-4.5 h-4.5 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2
                  className="w-3 h-3 text-neutral-900"
                  aria-hidden="true"
                />
              </span>
              <span className="leading-relaxed break-words">{highlight}</span>
            </li>
          ))}
        </ul>
      )}

      {/* 6. SKILL TAGS */}
      {step.skills && step.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2.5 border-t border-neutral-100/90" aria-label="Skills & Technologies">
          {step.skills.map((skill, idx) => (
            <Chip key={idx} className="px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-medium" style={{ padding: "4px 10px" }}>
              {skill}
            </Chip>
          ))}
        </div>
      )}

      {/* 7. OPTIONAL FOOTER: Annual Income */}
      {showIncome && step.income && (
        <div className="mt-1 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-[11px] sm:text-xs text-neutral-500">
          <div className="flex items-center gap-1.5 font-medium text-neutral-700">
            <DollarSign className="w-3.5 h-3.5 text-neutral-400" aria-hidden="true" />
            <span>Annual Compensation</span>
          </div>
          <span className="font-semibold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded-md">
            {step.income}
          </span>
        </div>
      )}
    </article>
  );
}

export default CareerCard;
