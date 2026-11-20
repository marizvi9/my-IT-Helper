// Time-range filtering for ticket lists.
//
// Used by the demo now AND meant for the real product later (that's why it lives
// in src/lib and not in the demo folder).
//
// Rule: UNSOLVED tickets always show, however old, so nothing gets forgotten.
// The range only hides SOLVED tickets whose last activity is older than the range.
//
// Real product note: the database will store real timestamps. "Days ago" is then
// calculated from those timestamps, and the same functions below still work.
// The SERVER should also apply the range when fetching tickets, so it doesn't send
// a year of old tickets to the browser just to hide them.

/** Number of days to look back, or null for "all time". */
export type RangeDays = number | null;

export const TIME_RANGES: { days: RangeDays; label: string }[] = [
  { days: 7, label: "Last 7 days" },
  { days: 30, label: "Last 30 days" },
  { days: 90, label: "Last 3 months" },
  { days: 180, label: "Last 6 months" },
  { days: 365, label: "Last 12 months" },
  { days: null, label: "All time" },
];

// IT admins see the whole school's tickets, so a short default keeps their list
// focused. Teachers only see their own few tickets, so they get a longer default.
export const ADMIN_DEFAULT_RANGE: RangeDays = 30;
export const TEACHER_DEFAULT_RANGE: RangeDays = 180;

export function rangeLabel(days: RangeDays): string {
  return TIME_RANGES.find((r) => r.days === days)?.label ?? "All time";
}

/** Should this ticket be shown for the chosen range? */
export function isVisibleInRange(
  ticket: { status: string; activityDays: number },
  range: RangeDays,
): boolean {
  if (ticket.status !== "solved") return true; // unsolved: always show
  if (range === null) return true;              // "All time"
  return ticket.activityDays <= range;
}

/** Turns "days ago" into a friendly label like "Today, 8:05 AM" or "3 months ago". */
export function ageLabel(daysAgo: number, time?: string): string {
  if (daysAgo === 0) return time ? `Today, ${time}` : "Today";
  if (daysAgo === 1) return time ? `Yesterday, ${time}` : "Yesterday";
  if (daysAgo < 7) return `${daysAgo} days ago`;
  if (daysAgo < 30) {
    const weeks = Math.floor(daysAgo / 7);
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  }
  if (daysAgo < 365) {
    const months = Math.floor(daysAgo / 30);
    return months === 1 ? "1 month ago" : `${months} months ago`;
  }
  const years = Math.floor(daysAgo / 365);
  return years === 1 ? "1 year ago" : `${years} years ago`;
}
