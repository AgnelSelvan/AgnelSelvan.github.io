import React from "react";
import { cn } from "@/lib/utils";

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export function Chip({ className, children, ...props }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full border border-neutral-200/80 text-xs font-medium bg-neutral-50 text-neutral-700 transition-colors hover:bg-neutral-100",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Chip;
