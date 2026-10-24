export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}

/**
 * Format a date string like "2021-06" to "Jun 2021".
 * Returns "Present" if value is "Present".
 */
export function formatCareerDate(dateStr: string | "Present"): string {
  if (dateStr === "Present" || !dateStr) {
    return "Present";
  }

  const [yearStr, monthStr] = dateStr.split("-");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);

  if (isNaN(year) || isNaN(month)) {
    return dateStr;
  }

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthName = monthNames[month - 1] ?? "";
  return `${monthName} ${year}`;
}

/**
 * Auto-compute human-readable duration from startDate and endDate.
 * Example output: "2 yrs 10 mos", "1 yr", "8 mos".
 */
export function calculateDuration(
  startDateStr: string,
  endDateStr: string | "Present"
): string {
  if (!startDateStr) return "";

  const [startYearStr, startMonthStr] = startDateStr.split("-");
  const startYear = parseInt(startYearStr, 10);
  const startMonth = parseInt(startMonthStr, 10);

  if (isNaN(startYear) || isNaN(startMonth)) return "";

  let endYear: number;
  let endMonth: number;

  if (endDateStr === "Present") {
    const now = new Date();
    endYear = now.getFullYear();
    endMonth = now.getMonth() + 1; // 1-indexed
  } else {
    const [yStr, mStr] = endDateStr.split("-");
    endYear = parseInt(yStr, 10);
    endMonth = parseInt(mStr, 10);
  }

  if (isNaN(endYear) || isNaN(endMonth)) return "";

  // Inclusive month difference
  const totalMonths = Math.max(
    1,
    (endYear - startYear) * 12 + (endMonth - startMonth) + 1
  );

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const parts: string[] = [];
  if (years > 0) {
    parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  }
  if (months > 0) {
    parts.push(`${months} ${months === 1 ? "mo" : "mos"}`);
  }

  return parts.join(" ") || "1 mo";
}
