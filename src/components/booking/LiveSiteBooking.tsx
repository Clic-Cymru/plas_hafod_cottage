'use client';

import React, { useState, useMemo } from 'react';
import { PricingConfig, BlockedDateRange } from '@/cms/types';
import { calculateStayPrice } from '@/lib/pricing-engine';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
  isWithinInterval,
} from 'date-fns';
import { CheckCircle2, AlertCircle, Loader2, Dog, Ban } from 'lucide-react';

interface LiveSiteBookingProps {
  propertyId?: 'plas-hafod' | 'bryn-bugeiliaid-bach';
  isCymraeg?: boolean;
  pricingConfig: PricingConfig;
  blockedDates: BlockedDateRange[];
}

export function LiveSiteBooking({
  propertyId = 'plas-hafod',
  isCymraeg = false,
  pricingConfig,
  blockedDates,
}: LiveSiteBookingProps) {
  const isBBB = propertyId === 'bryn-bugeiliaid-bach';
  const propertyNameEn = isBBB ? 'Bryn Bugeiliaid Bach' : 'Bwthyn Plas Hafod Cottage';
  const propertyNameCy = isBBB ? 'Bryn Bugeiliaid Bach' : 'Fwthyn Plas Hafod';

  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date(2026, 9, 1)); // October 2026
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [pets, setPets] = useState(0);

  // Form submission states
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const month1 = currentCalendarDate;
  const month2 = addMonths(currentCalendarDate, 1);

  const prevMonth = () => setCurrentCalendarDate(subMonths(currentCalendarDate, 1));
  const nextMonth = () => setCurrentCalendarDate(addMonths(currentCalendarDate, 1));

  // Determine if day is blocked/occupied
  const isOccupied = (day: Date) => {
    return blockedDates.some((b) => {
      const s = parseISO(b.startDate);
      const e = parseISO(b.endDate);
      return (isWithinInterval(day, { start: s, end: e }) && !isSameDay(day, e)) || isSameDay(day, s);
    });
  };

  const renderMonth = (monthDate: Date) => {
    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthDate);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    return (
      <div className="flex-1 min-w-[260px] p-2">
        <h4 className="text-center font-architects text-lg font-bold text-stone-900 mb-3">
          {format(monthDate, 'MMMM yyyy')}
        </h4>
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-stone-500 mb-2 font-sans">
          <span>Mo</span>
          <span>Tu</span>
          <span>We</span>
          <span>Th</span>
          <span>Fr</span>
          <span>Sa</span>
          <span>Su</span>
        </div>
        <div className="grid grid-cols-7 gap-1 text-xs">
          {days.map((d, i) => {
            const inMonth = isSameMonth(d, monthDate);
            const occupied = isOccupied(d);
            const formatted = format(d, 'yyyy-MM-dd');
            const isSelected =
              formatted === checkIn ||
              formatted === checkOut ||
              (checkIn &&
                checkOut &&
                formatted >= checkIn &&
                formatted <= checkOut);

            return (
              <button
                key={i}
                type="button"
                disabled={!inMonth || occupied}
                onClick={() => {
                  if (!inMonth || occupied) return;
                  if (!checkIn || (checkIn && checkOut)) {
                    setCheckIn(formatted);
                    setCheckOut('');
                  } else if (checkIn && !checkOut) {
                    if (formatted > checkIn) {
                      setCheckOut(formatted);
                    } else {
                      setCheckIn(formatted);
                    }
                  }
                }}
                className={`h-9 flex items-center justify-center font-mono border border-stone-100 transition ${
                  !inMonth
                    ? 'text-stone-300 bg-stone-50 cursor-default'
                    : occupied
                    ? 'bg-[#efda07] text-stone-900 font-semibold cursor-not-allowed'
                    : isSelected
                    ? 'bg-[#99a0c1] text-white font-bold'
                    : 'text-stone-700 hover:bg-[#99a0c1]/20 cursor-pointer'
                }`}
              >
                {format(d, 'd')}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const calculation = useMemo(() => {
    if (!checkIn || !checkOut) return null;
    return calculateStayPrice(checkIn, checkOut, pricingConfig, blockedDates);
  }, [checkIn, checkOut, pricingConfig, blockedDates]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!calculation || !calculation.isValid) return;

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId,
          guestName,
          guestEmail,
          guestPhone,
          checkIn,
          checkOut,
          adults,
          children,
          pets: isBBB ? 0 : pets,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit inquiry.');

      setSubmittedId(data.inquiryId);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error submitting booking inquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="book" className="scroll-mt-24 py-16 bg-[#fbfbfd]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Section Title */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-architects text-center tracking-wide uppercase text-stone-900 mb-10">
          {isCymraeg ? 'GWIRIO ARGAELEDD AC ARCHEBU AR GYFER' : 'CHECK AVAILABILITY AND MAKE A BOOKING FOR'}{' '}
          <span className="text-[#99a0c1]">
            {isCymraeg ? propertyNameCy.toUpperCase() : propertyNameEn.toUpperCase()}
          </span>
        </h2>

        {/* Dual Calendar Box */}
        <div className="max-w-2xl mx-auto bg-white border border-stone-200 rounded-2xl shadow-md p-4 sm:p-6 mb-10">
          <div className="flex items-center justify-between px-2 mb-3">
            <button
              onClick={prevMonth}
              aria-label="Previous Month"
              className="p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition"
            >
              &larr;
            </button>
            <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider font-sans">
              {isBBB ? 'Bryn Bugeiliaid Bach Calendar' : 'Plas Hafod Cottage Calendar'}
            </span>
            <button
              onClick={nextMonth}
              aria-label="Next Month"
              className="p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition"
            >
              &rarr;
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 divide-y sm:divide-y-0 sm:divide-x divide-stone-200">
            {renderMonth(month1)}
            {renderMonth(month2)}
          </div>

          {/* Occupied Legend */}
          <div className="flex items-center justify-center gap-2 pt-4 mt-2 border-t border-stone-100 text-xs text-stone-600 font-sans">
            <span className="w-4 h-4 bg-[#efda07] inline-block rounded-sm" />
            <span>{isCymraeg ? 'Wedi ei archebu / Neilltuedig' : 'Occupied / Booked'}</span>
          </div>
        </div>

        {/* Search & Rates Bar Header */}
        <h3 className="text-xl sm:text-2xl font-architects uppercase tracking-wider text-center text-stone-800 mb-6">
          {isCymraeg
            ? `GWIRIAD PRIS AC ARGAELEDD AR GYFER ${propertyNameCy.toUpperCase()}`
            : `CHECK PRICE AND AVAILABILITY FOR ${propertyNameEn.toUpperCase()}`}
        </h3>

        <div className="max-w-4xl mx-auto bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-end">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider font-sans mb-1">
                {isCymraeg ? 'Cyrraedd' : 'Check-in'}
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-stone-800 text-sm focus:outline-none focus:border-[#99a0c1] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider font-sans mb-1">
                {isCymraeg ? 'Gadael' : 'Check-out'}
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-stone-800 text-sm focus:outline-none focus:border-[#99a0c1] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider font-sans mb-1">
                {isCymraeg ? 'Oedolion' : 'Adults'}
              </label>
              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-stone-800 text-sm focus:outline-none focus:border-[#99a0c1]"
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            {/* Pets Selection (Dogs allowed at Plas Hafod, strictly no pets at BBB) */}
            {!isBBB ? (
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider font-sans mb-1">
                  {isCymraeg ? 'Cŵn / Anifeiliaid' : 'Dogs'}
                </label>
                <select
                  value={pets}
                  onChange={(e) => setPets(Number(e.target.value))}
                  className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-stone-800 text-sm focus:outline-none focus:border-[#99a0c1]"
                >
                  <option value={0}>{isCymraeg ? '0 Ci' : '0 Dogs'}</option>
                  <option value={1}>{isCymraeg ? '1 Ci (£30)' : '1 Dog (£30)'}</option>
                  <option value={2}>{isCymraeg ? '2 Gi (£60)' : '2 Dogs (£60)'}</option>
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider font-sans mb-1">
                  {isCymraeg ? 'Anifeiliaid' : 'Pets Policy'}
                </label>
                <div className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 rounded-lg text-xs text-stone-600 border border-stone-200">
                  <Ban className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>No pets allowed</span>
                </div>
              </div>
            )}

            <div>
              <button
                type="button"
                className="w-full bg-[#99a0c1] hover:bg-[#323149] text-white font-semibold py-2.5 px-4 rounded-lg uppercase tracking-wider text-xs transition"
              >
                {isCymraeg ? 'CHWILIO' : 'SEARCH'}
              </button>
            </div>
          </div>

          {/* Pricing & Inquiry Result */}
          {calculation && (
            <div className="mt-8 pt-6 border-t border-stone-200">
              {calculation.isValid ? (
                <div className="space-y-6">
                  {/* Summary Box */}
                  <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                      <p className="font-architects text-xl text-stone-900">
                        {propertyNameEn}: {calculation.totalNights} {isCymraeg ? 'Noson' : 'Nights'} (
                        {checkIn} &rarr; {checkOut})
                      </p>
                      <p className="text-xs text-stone-500 font-sans mt-1">
                        Average rate: £{calculation.baseRateAverage} / night
                        {calculation.discountAmount > 0 &&
                          ` • Includes ${calculation.appliedDiscountName}`}
                        {!isBBB && pets > 0 && ` • Includes £${pets * 30} pet fee`}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-stone-500 uppercase tracking-wider">
                        {isCymraeg ? 'Cyfanswm' : 'Total Price'}
                      </p>
                      <p className="text-3xl font-architects text-stone-900 font-bold">
                        £{calculation.totalPrice + (!isBBB ? pets * 30 : 0)}
                      </p>
                      <p className="text-xs text-[#99a0c1] font-semibold mt-0.5">
                        {isCymraeg ? 'Blaendal: ' : 'Deposit: '}£{calculation.depositAmount}
                      </p>
                    </div>
                  </div>

                  {/* Submission Form */}
                  {submittedId ? (
                    <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-6 text-center text-emerald-800">
                      <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-600 mb-2" />
                      <h4 className="font-architects text-2xl font-bold">
                        {isCymraeg ? 'Diolch yn Fawr!' : 'Inquiry Submitted!'}
                      </h4>
                      <p className="text-sm font-sans mt-2">
                        {isCymraeg
                          ? `Rydym wedi derbyn eich ymholiad am ${propertyNameCy} a byddwn mewn cysylltiad o fewn 24 awr gyda chadarnhad y blaendal.`
                          : `We have received your booking inquiry for ${propertyNameEn} and will reply within 24 hours with deposit confirmation.`}
                      </p>
                      <p className="font-mono text-xs text-emerald-700 mt-2">
                        Ref: {submittedId} ({propertyId})
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <h4 className="font-architects text-lg text-stone-800 uppercase tracking-wide">
                        {isCymraeg ? `Cwblhewch Eich Ymholiad am ${propertyNameCy}` : `Complete Your Booking Inquiry for ${propertyNameEn}`}
                      </h4>

                      {errorMsg && (
                        <div className="p-3 bg-rose-50 border border-rose-300 rounded-lg text-xs text-rose-700">
                          {errorMsg}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <input
                          type="text"
                          required
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder={isCymraeg ? 'Eich Enw Llawn' : 'Your Full Name'}
                          className="bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-[#99a0c1]"
                        />
                        <input
                          type="email"
                          required
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          placeholder={isCymraeg ? 'Cyfeiriad E-bost' : 'Email Address'}
                          className="bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-[#99a0c1]"
                        />
                        <input
                          type="tel"
                          required
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          placeholder={isCymraeg ? 'Rhif Ffôn' : 'Phone Number'}
                          className="bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-[#99a0c1]"
                        />
                      </div>

                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={
                          isCymraeg
                            ? 'Nodiadau ychwanegol / amser cyrraedd / ceisiadau arbennig'
                            : 'Special requests, estimated arrival time, etc.'
                        }
                        className="w-full bg-white border border-stone-300 rounded-lg p-3 text-sm text-stone-800 focus:outline-none focus:border-[#99a0c1]"
                      />

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-3 rounded-lg font-architects text-sm uppercase tracking-wider font-bold bg-[#99a0c1] hover:bg-[#323149] text-white transition flex items-center justify-center gap-2 shadow-sm"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>{isCymraeg ? 'Yn anfon...' : 'Submitting...'}</span>
                          </>
                        ) : (
                          <span>{isCymraeg ? `Cadarnhau Archeb ar gyfer ${propertyNameCy}` : `Submit Booking Request for ${propertyNameEn}`}</span>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl flex items-center gap-3 text-amber-800 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0 text-amber-600" />
                  <span>{calculation.errorMessage}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
