import { PricingConfig, BlockedDateRange } from '@/cms/types';
import { parseISO, format, addDays, isWithinInterval, isBefore, isAfter, differenceInCalendarDays } from 'date-fns';

export interface NightDetail {
  date: string; // YYYY-MM-DD
  rate: number;
  seasonName?: string;
}

export interface CalculationResult {
  isValid: boolean;
  errorMessage?: string;
  totalNights: number;
  nightlyBreakdown: NightDetail[];
  baseRateAverage: number;
  subtotal: number;
  discountAmount: number;
  appliedDiscountName?: string;
  cleaningFee: number;
  totalPrice: number;
  depositPercentage: number;
  depositAmount: number;
  balanceDue: number;
  minStayRequired: number;
}

/**
 * Checks whether a given single date (YYYY-MM-DD) is blocked.
 */
export function isDateBlocked(dateStr: string, blockedDates: BlockedDateRange[]): boolean {
  const target = parseISO(dateStr);
  return blockedDates.some((block) => {
    const start = parseISO(block.startDate);
    const end = parseISO(block.endDate);
    // Guest night is unavailable if target >= start and target < end (departure morning allows check-in)
    return (
      (isWithinInterval(target, { start, end }) && dateStr !== block.endDate) ||
      dateStr === block.startDate
    );
  });
}

/**
 * Calculates pricing breakdown, seasonal rates, discounts, and deposit for a stay.
 */
export function calculateStayPrice(
  checkInStr: string,
  checkOutStr: string,
  config: PricingConfig,
  blockedDates: BlockedDateRange[] = []
): CalculationResult {
  if (!checkInStr || !checkOutStr) {
    return {
      isValid: false,
      errorMessage: 'Please select both check-in and check-out dates.',
      totalNights: 0,
      nightlyBreakdown: [],
      baseRateAverage: config.baseRate,
      subtotal: 0,
      discountAmount: 0,
      cleaningFee: config.cleaningFee || 0,
      totalPrice: 0,
      depositPercentage: config.depositPercentage,
      depositAmount: 0,
      balanceDue: 0,
      minStayRequired: 2,
    };
  }

  const checkIn = parseISO(checkInStr);
  const checkOut = parseISO(checkOutStr);

  const totalNights = differenceInCalendarDays(checkOut, checkIn);

  if (totalNights <= 0) {
    return {
      isValid: false,
      errorMessage: 'Check-out date must be after check-in date.',
      totalNights: 0,
      nightlyBreakdown: [],
      baseRateAverage: config.baseRate,
      subtotal: 0,
      discountAmount: 0,
      cleaningFee: config.cleaningFee || 0,
      totalPrice: 0,
      depositPercentage: config.depositPercentage,
      depositAmount: 0,
      balanceDue: 0,
      minStayRequired: 2,
    };
  }

  // Iterate each night of the stay
  const nightlyBreakdown: NightDetail[] = [];
  let maxMinStay = 2; // default minimum stay

  for (let i = 0; i < totalNights; i++) {
    const currentNight = addDays(checkIn, i);
    const dateFormatted = format(currentNight, 'yyyy-MM-dd');

    // 1. Check for blocked conflict
    if (isDateBlocked(dateFormatted, blockedDates)) {
      return {
        isValid: false,
        errorMessage: `The date ${dateFormatted} is not available. Please choose alternate dates.`,
        totalNights,
        nightlyBreakdown: [],
        baseRateAverage: config.baseRate,
        subtotal: 0,
        discountAmount: 0,
        cleaningFee: config.cleaningFee || 0,
        totalPrice: 0,
        depositPercentage: config.depositPercentage,
        depositAmount: 0,
        balanceDue: 0,
        minStayRequired: maxMinStay,
      };
    }

    // 2. Identify seasonal rate matching this night
    let rate = config.baseRate;
    let seasonName: string | undefined = undefined;

    for (const season of config.seasons) {
      const sStart = parseISO(season.startDate);
      const sEnd = parseISO(season.endDate);
      if (
        (isAfter(currentNight, sStart) || currentNight.getTime() === sStart.getTime()) &&
        (isBefore(currentNight, sEnd) || currentNight.getTime() === sEnd.getTime())
      ) {
        rate = season.nightlyRate;
        seasonName = season.name;
        if (season.minStay > maxMinStay) {
          maxMinStay = season.minStay;
        }
        break; // Match first active season
      }
    }

    nightlyBreakdown.push({
      date: dateFormatted,
      rate,
      seasonName,
    });
  }

  // Check minimum stay restriction
  if (totalNights < maxMinStay) {
    return {
      isValid: false,
      errorMessage: `This period requires a minimum stay of ${maxMinStay} nights (selected: ${totalNights}).`,
      totalNights,
      nightlyBreakdown,
      baseRateAverage: Math.round(nightlyBreakdown.reduce((s, n) => s + n.rate, 0) / totalNights),
      subtotal: nightlyBreakdown.reduce((s, n) => s + n.rate, 0),
      discountAmount: 0,
      cleaningFee: config.cleaningFee || 0,
      totalPrice: 0,
      depositPercentage: config.depositPercentage,
      depositAmount: 0,
      balanceDue: 0,
      minStayRequired: maxMinStay,
    };
  }

  // Calculate subtotal
  const subtotal = nightlyBreakdown.reduce((sum, item) => sum + item.rate, 0);

  // Evaluate discounts
  let discountAmount = 0;
  let appliedDiscountName: string | undefined = undefined;

  for (const discount of config.discounts) {
    if (discount.minNights && totalNights >= discount.minNights) {
      let currentDiscount = 0;
      if (discount.discountType === 'percentage') {
        currentDiscount = Math.round((subtotal * discount.value) / 100);
      } else {
        currentDiscount = Math.min(discount.value, subtotal);
      }

      if (currentDiscount > discountAmount) {
        discountAmount = currentDiscount;
        appliedDiscountName = discount.name;
      }
    }
  }

  const cleaningFee = config.cleaningFee || 0;
  const totalPrice = Math.max(0, subtotal - discountAmount + cleaningFee);
  const depositAmount = Math.round((totalPrice * config.depositPercentage) / 100);
  const balanceDue = totalPrice - depositAmount;

  return {
    isValid: true,
    totalNights,
    nightlyBreakdown,
    baseRateAverage: Math.round(subtotal / totalNights),
    subtotal,
    discountAmount,
    appliedDiscountName,
    cleaningFee,
    totalPrice,
    depositPercentage: config.depositPercentage,
    depositAmount,
    balanceDue,
    minStayRequired: maxMinStay,
  };
}
