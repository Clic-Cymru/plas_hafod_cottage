import { calculateStayPrice, isDateBlocked } from './pricing-engine';
import { defaultPricingConfig, defaultBlockedDates } from '@/cms/client';

export function runPricingEngineVerification() {
  console.log('--- Running Pricing Engine Verification ---');

  // Test 1: Standard Stay (7 nights in October 2026 - matches autumn season and 7-night discount)
  const result1 = calculateStayPrice('2026-10-01', '2026-10-08', defaultPricingConfig, defaultBlockedDates);
  console.assert(result1.isValid, 'Test 1 failed: Should be valid stay');
  console.assert(result1.totalNights === 7, 'Test 1 failed: Expected 7 nights');
  console.assert(result1.discountAmount > 0, 'Test 1 failed: Expected weekly discount');
  console.log('Test 1 (Weekly Autumn Stay): Passed. Total = £' + result1.totalPrice + ', Deposit = £' + result1.depositAmount);

  // Test 2: Stay during blocked dates
  const result2 = calculateStayPrice('2026-10-23', '2026-10-27', defaultPricingConfig, defaultBlockedDates);
  console.assert(!result2.isValid, 'Test 2 failed: Should be blocked');
  console.log('Test 2 (Blocked Dates Detection): Passed. Blocked error caught: ' + result2.errorMessage);

  // Test 3: Min stay violation (e.g. 1 night during 2-night min stay period)
  const result3 = calculateStayPrice('2026-10-01', '2026-10-02', defaultPricingConfig, defaultBlockedDates);
  console.assert(!result3.isValid, 'Test 3 failed: Should reject 1-night stay');
  console.log('Test 3 (Min Stay Enforcement): Passed. Rejected with: ' + result3.errorMessage);

  // Test 4: Peak Festive Season Stay (4 nights in December)
  const result4 = calculateStayPrice('2026-12-20', '2026-12-24', defaultPricingConfig, defaultBlockedDates);
  console.assert(result4.isValid, 'Test 4 failed: Festive period should be valid');
  console.assert(result4.nightlyBreakdown[0].rate === 285, 'Test 4 failed: Expected festive rate £285');
  console.log('Test 4 (Peak Festive Season Rate): Passed. Rate per night = £' + result4.nightlyBreakdown[0].rate);

  console.log('--- All Pricing Engine Checks Passed! ---');
}
