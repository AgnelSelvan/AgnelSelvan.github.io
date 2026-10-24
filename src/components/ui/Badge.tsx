import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "outline" | "muted";
  children: React.ReactNode;
}

export function Badge({
  variant = "default",
  className,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-neutral-100 text-neutral-800 border-neutral-200/80",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    outline: "bg-white text-neutral-700 border-neutral-300",
    muted: "bg-neutral-50 text-neutral-500 border-neutral-200/60",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
