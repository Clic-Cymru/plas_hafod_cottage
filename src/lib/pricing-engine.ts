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
  petFee: number;
  totalPrice: number;
  depositType?: 'fixed' | 'percentage';
  fixedDepositAmount?: number;
  depositPercentage: number;
  depositAmount: number;
  balanceDue: number;
  requiresFullPayment?: boolean;
  daysUntilCheckIn?: number;
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
  blockedDates: BlockedDateRange[] = [],
  pets: number = 0
): CalculationResult {
  let petFee = 0;
  if (pets === 1) {
    petFee = typeof config.petFee === 'number' ? config.petFee : 40;
  } else if (pets >= 2) {
    petFee = typeof config.petFee2Dogs === 'number'
      ? config.petFee2Dogs
      : (typeof config.petFee === 'number' ? config.petFee * 2 : 55);
  }

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
      petFee,
      totalPrice: 0,
      depositType: config.depositType || 'fixed',
      fixedDepositAmount: config.fixedDepositAmount ?? 200,
      depositPercentage: config.depositPercentage,
      depositAmount: 0,
      balanceDue: 0,
      minStayRequired: 2,
    };
  }

  const checkIn = parseISO(checkInStr);
  const checkOut = parseISO(checkOutStr);

  // Enforce that check-in is at least 1 day ahead of the current date (tomorrow or later)
  const tomorrowStr = format(addDays(new Date(), 1), 'yyyy-MM-dd');
  if (checkInStr < tomorrowStr) {
    return {
      isValid: false,
      errorMessage: 'Check-in date must be at least one day ahead of the current date.',
      totalNights: 0,
      nightlyBreakdown: [],
      baseRateAverage: config.baseRate,
      subtotal: 0,
      discountAmount: 0,
      cleaningFee: config.cleaningFee || 0,
      petFee,
      totalPrice: 0,
      depositType: config.depositType || 'fixed',
      fixedDepositAmount: config.fixedDepositAmount ?? 200,
      depositPercentage: config.depositPercentage,
      depositAmount: 0,
      balanceDue: 0,
      minStayRequired: 2,
    };
  }

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
      petFee,
      totalPrice: 0,
      depositType: config.depositType || 'fixed',
      fixedDepositAmount: config.fixedDepositAmount ?? 200,
      depositPercentage: config.depositPercentage,
      depositAmount: 0,
      balanceDue: 0,
      minStayRequired: 2,
    };
  }

  // Iterate each night of the stay
  const nightlyBreakdown: NightDetail[] = [];
  let maxMinStay = 2; // default minimum stay

  // Sort seasons by duration ascending so narrower spans (e.g. school half terms) take priority over broad seasonal blocks
  const sortedSeasons = [...(config.seasons || [])].sort((a, b) => {
    const durA = Math.abs(new Date(a.endDate).getTime() - new Date(a.startDate).getTime());
    const durB = Math.abs(new Date(b.endDate).getTime() - new Date(b.startDate).getTime());
    return durA - durB;
  });

  for (let i = 0; i < totalNights; i++) {
    const currentNight = addDays(checkIn, i);
    const dateFormatted = format(currentNight, 'yyyy-MM-dd');

    // 1. Check for blocked conflict
    if (isDateBlocked(dateFormatted, blockedDates)) {
      const ukDate = format(currentNight, 'dd/MM/yyyy');
      return {
        isValid: false,
        errorMessage: `The date ${ukDate} is not available. Please choose alternate dates.`,
        totalNights,
        nightlyBreakdown: [],
        baseRateAverage: config.baseRate,
        subtotal: 0,
        discountAmount: 0,
        cleaningFee: config.cleaningFee || 0,
        petFee,
        totalPrice: 0,
        depositPercentage: config.depositPercentage,
        depositAmount: 0,
        balanceDue: 0,
        minStayRequired: maxMinStay,
      };
    }

    // 2. Identify seasonal rate matching this night (Fri & Sat = weekend rate if configured)
    const dayOfWeek = currentNight.getDay(); // 0 = Sun, 5 = Fri, 6 = Sat
    const isWeekendNight = dayOfWeek === 5 || dayOfWeek === 6;

    let rate = isWeekendNight && typeof config.weekendBaseRate === 'number'
      ? config.weekendBaseRate
      : config.baseRate;
    let seasonName: string | undefined = undefined;

    for (const season of sortedSeasons) {
      const sStart = parseISO(season.startDate);
      const sEnd = parseISO(season.endDate);
      if (
        (isAfter(currentNight, sStart) || currentNight.getTime() === sStart.getTime()) &&
        (isBefore(currentNight, sEnd) || currentNight.getTime() === sEnd.getTime())
      ) {
        const hasDistinctWeekendRate =
          isWeekendNight &&
          typeof season.weekendRate === 'number' &&
          season.weekendRate !== season.nightlyRate;
        rate = hasDistinctWeekendRate ? season.weekendRate! : season.nightlyRate;
        seasonName = hasDistinctWeekendRate ? `${season.name} (Weekend)` : season.name;
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
      petFee,
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
  const totalPrice = Math.max(0, subtotal - discountAmount + cleaningFee + petFee);
  const depositType = config.depositType || 'fixed';
  const fixedDepositAmount = typeof config.fixedDepositAmount === 'number' ? config.fixedDepositAmount : 200;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysUntilCheckIn = differenceInCalendarDays(checkIn, today);
  const requiresFullPayment = daysUntilCheckIn <= 60;

  let depositAmount = 0;
  if (requiresFullPayment) {
    depositAmount = totalPrice;
  } else if (depositType === 'fixed') {
    depositAmount = Math.min(fixedDepositAmount, totalPrice);
  } else {
    depositAmount = Math.round((totalPrice * (config.depositPercentage || 25)) / 100);
  }
  const balanceDue = Math.max(0, totalPrice - depositAmount);

  return {
    isValid: true,
    totalNights,
    nightlyBreakdown,
    baseRateAverage: Math.round(subtotal / totalNights),
    subtotal,
    discountAmount,
    appliedDiscountName,
    cleaningFee,
    petFee,
    totalPrice,
    depositType,
    fixedDepositAmount,
    depositPercentage: config.depositPercentage,
    depositAmount,
    balanceDue,
    requiresFullPayment,
    daysUntilCheckIn,
    minStayRequired: maxMinStay,
  };
}
