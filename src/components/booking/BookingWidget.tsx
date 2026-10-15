'use client';

import React, { useState, useMemo } from 'react';
import { Locale } from '@/lib/i18n';
import { enDictionary } from '@/lib/i18n/dictionaries/en';
import { cyDictionary } from '@/lib/i18n/dictionaries/cy';
import { PricingConfig, BlockedDateRange } from '@/cms/types';
import { calculateStayPrice, isDateBlocked } from '@/lib/pricing-engine';
import { format, addDays } from 'date-fns';
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  AlertCircle,
  Tag,
  ShieldCheck,
  User,
  Mail,
  Phone,
  Send,
  Loader2,
  Clock,
  Sparkles
} from 'lucide-react';

interface BookingWidgetProps {
  currentLocale: Locale;
  pricingConfig: PricingConfig;
  blockedDates: BlockedDateRange[];
}

export function BookingWidget({ currentLocale, pricingConfig, blockedDates }: BookingWidgetProps) {
  const dict = currentLocale === 'cy' ? cyDictionary : enDictionary;

  // Default suggested dates initialized safely to prevent prerender hydration mismatches
  const [checkIn, setCheckIn] = useState<string>('2026-11-01');
  const [checkOut, setCheckOut] = useState<string>('2026-11-08');
  const [todayStr, setTodayStr] = useState<string>('2026-10-15');

  React.useEffect(() => {
    const today = new Date();
    const formattedToday = format(today, 'yyyy-MM-dd');
    setTodayStr(formattedToday);
    setCheckIn(format(addDays(today, 14), 'yyyy-MM-dd'));
    setCheckOut(format(addDays(today, 21), 'yyyy-MM-dd'));
  }, []);

  // Form states
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [pets, setPets] = useState(0);
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Live calculation from pricing engine
  const calculation = useMemo(() => {
    return calculateStayPrice(checkIn, checkOut, pricingConfig, blockedDates);
  }, [checkIn, checkOut, pricingConfig, blockedDates]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!calculation.isValid) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestName,
          guestEmail,
          guestPhone,
          checkIn,
          checkOut,
          adults,
          children,
          pets,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setSubmitSuccess(data.inquiryId || 'CONFIRMED');
    } catch (err: any) {
      setErrorMessage(err.message || 'Error sending inquiry. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="booking" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-900/30 text-amber-300 border border-amber-700/50 mb-3">
          <CalendarIcon className="w-3.5 h-3.5" />
          {dict.pricing.heading}
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-stone-100 font-bold tracking-tight">
          {dict.pricing.subheading}
        </h2>
        <p className="mt-4 text-stone-400 text-sm sm:text-base">
          {dict.bookingForm.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Date Selection & Calculation Engine */}
        <div className="lg:col-span-7 bg-stone-900/90 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <h3 className="text-xl font-serif text-amber-100 font-semibold mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            {dict.pricing.selectDatesPrompt}
          </h3>

          {/* Date Picker Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-2">
                {dict.pricing.checkInLabel}
              </label>
              <input
                type="date"
                value={checkIn}
                min={todayStr}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-3 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-2">
                {dict.pricing.checkOutLabel}
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn || todayStr}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-3 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-sm"
              />
            </div>
          </div>

          {/* Active Seasons & Offers Banner */}
          <div className="bg-amber-950/30 border border-amber-800/40 rounded-xl p-4 mb-6 flex items-start gap-3">
            <Tag className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-200/90 space-y-1">
              <p className="font-semibold text-amber-200">
                {dict.pricing.specialOffer}
              </p>
              <p className="text-stone-400">
                {dict.pricing.seasonalRatesNote}
              </p>
            </div>
          </div>

          {/* Calculation Breakdown */}
          {calculation.isValid ? (
            <div className="bg-stone-950 border border-stone-800 rounded-xl p-5 space-y-3">
              <div className="flex justify-between items-center text-sm text-stone-300">
                <span>{dict.pricing.totalNights}:</span>
                <span className="font-medium text-stone-100 font-mono">
                  {calculation.totalNights} nights
                </span>
              </div>

              <div className="flex justify-between items-center text-sm text-stone-300">
                <span>{dict.pricing.nightlyRate}:</span>
                <span className="font-medium text-stone-100 font-mono">
                  £{calculation.baseRateAverage} / night avg
                </span>
              </div>

              <div className="flex justify-between items-center text-sm text-stone-300">
                <span>{dict.pricing.subtotal}:</span>
                <span className="font-mono">£{calculation.subtotal}</span>
              </div>

              {calculation.discountAmount > 0 && (
                <div className="flex justify-between items-center text-sm text-emerald-400 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-4 h-4" />
                    {calculation.appliedDiscountName || dict.pricing.discount}:
                  </span>
                  <span className="font-mono">-£{calculation.discountAmount}</span>
                </div>
              )}

              {calculation.cleaningFee > 0 && (
                <div className="flex justify-between items-center text-sm text-stone-400">
                  <span>{dict.pricing.cleaningFee}:</span>
                  <span className="font-mono">£{calculation.cleaningFee}</span>
                </div>
              )}

              <div className="pt-3 border-t border-stone-800 flex justify-between items-baseline">
                <span className="text-base font-semibold text-stone-100">
                  {dict.pricing.total}:
                </span>
                <span className="text-2xl font-bold font-serif text-amber-300">
                  £{calculation.totalPrice}
                </span>
              </div>

              {/* Deposit & Balance Notice */}
              <div className="bg-stone-900 rounded-lg p-3 text-xs text-stone-300 space-y-1">
                <div className="flex justify-between font-semibold text-amber-200">
                  <span>{dict.pricing.depositDueNow.replace('{percent}', calculation.depositPercentage.toString())}</span>
                  <span className="font-mono text-sm">£{calculation.depositAmount}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>{dict.pricing.balanceDueNotice}</span>
                  <span className="font-mono">£{calculation.balanceDue}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-rose-950/40 border border-rose-900/60 rounded-xl p-4 flex items-start gap-3 text-rose-300 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-400" />
              <div>
                <p className="font-medium text-rose-200">{calculation.errorMessage}</p>
                <p className="text-xs text-rose-300/80 mt-1">
                  Plas Hafod requires a minimum stay of {calculation.minStayRequired} nights.
                </p>
              </div>
            </div>
          )}

          {/* Blocked Dates Info */}
          <div className="mt-6 pt-4 border-t border-stone-800/80">
            <h4 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
              {dict.pricing.unavailableNotice}
            </h4>
            <div className="flex flex-wrap gap-2">
              {blockedDates.map((b) => (
                <span
                  key={b.id}
                  className="px-2.5 py-1 bg-stone-950 border border-stone-800 rounded-md text-[11px] text-stone-400 font-mono"
                >
                  {b.startDate} → {b.endDate}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Inquiry Form */}
        <div className="lg:col-span-5 bg-stone-900/90 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          {submitSuccess ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-950 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif text-amber-100 font-bold">
                {dict.bookingForm.successTitle}
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed">
                {dict.bookingForm.successMessage}
              </p>
              <div className="bg-stone-950 border border-stone-800 rounded-lg p-3 text-xs text-stone-400 font-mono">
                Reference: {submitSuccess}
              </div>
              <button
                type="button"
                onClick={() => setSubmitSuccess(null)}
                className="mt-4 px-6 py-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-sm font-medium transition"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b border-stone-800 pb-3 mb-4">
                <h3 className="text-lg font-serif font-semibold text-amber-100">
                  {dict.bookingForm.title}
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  Direct client admin integration with instant confirmation.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 bg-rose-950/60 border border-rose-900 rounded-lg text-xs text-rose-300">
                  {errorMessage}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  {dict.bookingForm.fullName} *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Rhiannon Lloyd"
                    className="w-full pl-9 pr-3 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  {dict.bookingForm.email} *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="e.g. rhiannon@example.co.uk"
                    className="w-full pl-9 pr-3 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  {dict.bookingForm.phone} *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="+44 7700 900077"
                    className="w-full pl-9 pr-3 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Guest Counts */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    {dict.bookingForm.adults}
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-2 py-2 text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    {dict.bookingForm.children}
                  </label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-2 py-2 text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {[0, 1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    {dict.bookingForm.pets}
                  </label>
                  <select
                    value={pets}
                    onChange={(e) => setPets(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-2 py-2 text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {[0, 1, 2].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  {dict.bookingForm.notes}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Estimated arrival time, cot requested, etc."
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl p-3 text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <button
                type="submit"
                disabled={!calculation.isValid || isSubmitting}
                className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg ${
                  calculation.isValid && !isSubmitting
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 cursor-pointer shadow-amber-900/40'
                    : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{dict.bookingForm.submitting}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{dict.bookingForm.submitButton}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{dict.pricing.directOwnerBookingNotice}</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
