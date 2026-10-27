/**
 * UK Date Utilities (dd/MM/yyyy)
 * Standardizes date formatting across client presentation, email templates, and backend schemas.
 */

/**
 * Formats a date string (YYYY-MM-DD or ISO 8601) or Date object into UK format: dd/MM/yyyy
 * Example: '2026-11-15' -> '15/11/2026'
 */
export function formatDateUK(date: string | Date | null | undefined): string {
  if (!date) return '';

  if (date instanceof Date) {
    if (isNaN(date.getTime())) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const str = String(date).trim();

  // Already dd/MM/yyyy
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(str)) {
    return str;
  }

  // YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss
  const match = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    const [, yyyy, mm, dd] = match;
    return `${dd}/${mm}/${yyyy}`;
  }

  // Fallback for valid Date parse
  const parsed = new Date(str);
  if (!isNaN(parsed.getTime())) {
    const day = String(parsed.getDate()).padStart(2, '0');
    const month = String(parsed.getMonth() + 1).padStart(2, '0');
    const year = parsed.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return str;
}

/**
 * Formats a check-in and check-out date range into UK format: dd/MM/yyyy → dd/MM/yyyy
 */
export function formatDateRangeUK(
  startDate: string | Date | null | undefined,
  endDate: string | Date | null | undefined,
  separator: string = '→'
): string {
  const start = formatDateUK(startDate);
  const end = formatDateUK(endDate);
  if (start && end) return `${start} ${separator} ${end}`;
  return start || end || '';
}

/**
 * Converts a UK format date string (dd/MM/yyyy) back to ISO date string (YYYY-MM-DD)
 */
export function parseUKToISO(ukDate: string | null | undefined): string {
  if (!ukDate) return '';
  const match = ukDate.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (match) {
    const [, dd, mm, yyyy] = match;
    return `${yyyy}-${mm}-${dd}`;
  }
  return ukDate;
}
