'use client';

import React, { useState, useMemo } from 'react';
import { PricingConfig, BlockedDateRange } from '@/cms/types';
import { calculateStayPrice } from '@/lib/pricing-engine';
import {
  format,
  addDays,
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
import { cy } from 'date-fns/locale/cy';
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Dog,
  Ban,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { formatDateUK } from '@/lib/date-utils';

interface LiveSiteBookingProps {
  propertyId?: 'plas-hafod' | 'bryn-bugeiliaid-bach';
  isCymraeg?: boolean;
  pricingConfig: PricingConfig;
  blockedDates: BlockedDateRange[];
}

function BookingDateInput({
  label,
  value,
  min,
  onChange,
  isCymraeg = false,
  isOccupied,
}: {
  label: string;
  value: string;
  min?: string;
  onChange: (val: string) => void;
  isCymraeg?: boolean;
  isOccupied?: (day: Date) => boolean;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const placeholder = isCymraeg ? 'dd/mm/bbbb' : 'dd/mm/yyyy';

  const formatForDisplay = (iso: string) => {
    if (!iso) return '';
    const parts = iso.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return iso;
  };

  const todayIso = format(new Date(), 'yyyy-MM-dd');
  const tomorrowDate = addDays(new Date(), 1);
  const tomorrowIso = format(tomorrowDate, 'yyyy-MM-dd');
  // Any date <= effectiveExclusiveMin is disabled (defaults to todayIso so only tomorrow onwards is selectable)
  const effectiveExclusiveMin = min && min > todayIso ? min : todayIso;

  const [textValue, setTextValue] = useState(formatForDisplay(value));
  const [viewDate, setViewDate] = useState(() => {
    if (value) {
      const parts = value.split('-');
      if (parts.length === 3) {
        return new Date(Number(parts[0]), Number(parts[1]) - 1, 1);
      }
    }
    return startOfMonth(tomorrowDate);
  });

  React.useEffect(() => {
    setTextValue(formatForDisplay(value));
    if (value) {
      const parts = value.split('-');
      if (parts.length === 3) {
        setViewDate(new Date(Number(parts[0]), Number(parts[1]) - 1, 1));
      }
    } else if (min && min > todayIso) {
      const parts = min.split('-');
      if (parts.length === 3) {
        setViewDate(new Date(Number(parts[0]), Number(parts[1]) - 1, 1));
      }
    }
  }, [value, min, todayIso]);

  // Click outside listener to dismiss popover
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setTextValue(raw);

    if (!raw.trim()) {
      onChange('');
      return;
    }

    const match = raw.match(/^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})$/);
    if (match) {
      const day = match[1].padStart(2, '0');
      const month = match[2].padStart(2, '0');
      const year = match[3];
      const iso = `${year}-${month}-${day}`;
      const d = new Date(Number(year), Number(month) - 1, Number(day));
      if (!isNaN(d.getTime())) {
        onChange(iso);
        setViewDate(new Date(Number(year), Number(month) - 1, 1));
      }
    }
  };

  // Calendar dates generation
  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(viewDate);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const weekHeaders = isCymraeg
    ? ['Llu', 'Maw', 'Mer', 'Iau', 'Gwe', 'Sad', 'Sul']
    : ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider font-sans mb-1">
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          type="text"
          value={textValue}
          placeholder={placeholder}
          onChange={handleTextChange}
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 pr-9 text-stone-800 text-sm focus:outline-none focus:border-[#99a0c1] font-mono placeholder:text-stone-400 cursor-pointer"
        />
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          tabIndex={-1}
          aria-label={label}
          className="absolute right-2.5 p-1 text-stone-400 hover:text-stone-700 transition"
        >
          <CalendarIcon className="w-4 h-4" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 z-50 bg-white border border-stone-200 rounded-2xl shadow-2xl p-4 w-[285px] font-sans">
          {/* Header with Welsh/English month name and navigation */}
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="font-bold text-sm text-stone-900 capitalize">
              {format(viewDate, 'MMMM yyyy', isCymraeg ? { locale: cy } : undefined)}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={startOfMonth(viewDate) <= startOfMonth(tomorrowDate)}
                onClick={() => setViewDate((d) => subMonths(d, 1))}
                aria-label="Previous month"
                className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewDate((d) => addMonths(d, 1))}
                aria-label="Next month"
                className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-600 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-stone-500 mb-2 font-sans">
            {weekHeaders.map((h) => (
              <span key={h}>{h}</span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-xs">
            {days.map((d, i) => {
              const inMonth = isSameMonth(d, viewDate);
              const formatted = format(d, 'yyyy-MM-dd');
              const occupied = isOccupied ? isOccupied(d) : false;
              const isBeforeMin = formatted <= effectiveExclusiveMin;
              const isSelected = formatted === value;
              const disabled = !inMonth || occupied || isBeforeMin;

              return (
                <button
                  key={i}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    onChange(formatted);
                    setIsOpen(false);
                  }}
                  className={`h-8 w-8 mx-auto flex items-center justify-center rounded-lg font-mono text-xs transition ${
                    !inMonth
                      ? 'text-stone-300 cursor-default'
                      : isSelected
                      ? 'bg-[#323149] text-[#efda07] font-bold shadow-sm'
                      : occupied
                      ? 'bg-[#efda07] text-stone-900 font-semibold cursor-not-allowed'
                      : isBeforeMin
                      ? 'text-stone-300 cursor-not-allowed'
                      : 'text-stone-800 hover:bg-stone-100 font-medium'
                  }`}
                >
                  {format(d, 'd')}
                </button>
              );
            })}
          </div>

          {/* Clear / Tomorrow Footer buttons */}
          <div className="flex items-center justify-between pt-3 mt-3 border-t border-stone-100 text-xs">
            <button
              type="button"
              onClick={() => {
                onChange('');
                setTextValue('');
                setIsOpen(false);
              }}
              className="text-stone-500 hover:text-stone-800 font-medium transition"
            >
              {isCymraeg ? 'Clirio' : 'Clear'}
            </button>
            <button
              type="button"
              onClick={() => {
                const nextSelectable = format(addDays(parseISO(effectiveExclusiveMin), 1), 'yyyy-MM-dd');
                onChange(nextSelectable);
                setViewDate(parseISO(nextSelectable));
                setIsOpen(false);
              }}
              className="text-[#323149] hover:text-indigo-900 font-bold transition"
            >
              {effectiveExclusiveMin === todayIso
                ? (isCymraeg ? 'Yfory' : 'Tomorrow')
                : (isCymraeg ? 'Diwrnod Nesaf' : 'Next Day')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function LiveSiteBooking({
  propertyId = 'plas-hafod',
  isCymraeg = false,
  pricingConfig,
  blockedDates: initialBlockedDates,
}: LiveSiteBookingProps) {
  const isBBB = propertyId === 'bryn-bugeiliaid-bach';
  const propertyNameEn = isBBB ? 'Bryn Bugeiliaid Bach' : 'Bwthyn Plas Hafod Cottage';
  const propertyNameCy = isBBB ? 'Bryn Bugeiliaid Bach' : 'Fwthyn Plas Hafod';

  const [blockedDates, setBlockedDates] = useState<BlockedDateRange[]>(initialBlockedDates || []);

  React.useEffect(() => {
    let isMounted = true;
    fetch(`/api/booking?propertyId=${propertyId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data?.blockedDates && Array.isArray(data.blockedDates)) {
          setBlockedDates(data.blockedDates);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, [propertyId]);

  const minSelectableDate = format(addDays(new Date(), 1), 'yyyy-MM-dd');
  const minCalendarMonth = startOfMonth(addDays(new Date(), 1));

  const [currentCalendarDate, setCurrentCalendarDate] = useState(() => startOfMonth(addDays(new Date(), 1)));
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

  const canGoPrevMonth = startOfMonth(currentCalendarDate) > minCalendarMonth;
  const prevMonth = () => {
    if (canGoPrevMonth) {
      setCurrentCalendarDate(subMonths(currentCalendarDate, 1));
    }
  };
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
        <h4 className="text-center font-architects text-lg font-bold text-stone-900 mb-3 capitalize">
          {format(monthDate, 'MMMM yyyy', isCymraeg ? { locale: cy } : undefined)}
        </h4>
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-stone-500 mb-2 font-sans">
          {isCymraeg ? (
            <>
              <span>Llu</span>
              <span>Maw</span>
              <span>Mer</span>
              <span>Iau</span>
              <span>Gwe</span>
              <span>Sad</span>
              <span>Sul</span>
            </>
          ) : (
            <>
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
              <span>Su</span>
            </>
          )}
        </div>
        <div className="grid grid-cols-7 gap-1 text-xs">
          {days.map((d, i) => {
            const inMonth = isSameMonth(d, monthDate);
            const occupied = isOccupied(d);
            const formatted = format(d, 'yyyy-MM-dd');
            const isPastOrToday = formatted < minSelectableDate;
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
                disabled={!inMonth || occupied || isPastOrToday}
                onClick={() => {
                  if (!inMonth || occupied || isPastOrToday) return;
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
                    : isPastOrToday
                    ? 'text-stone-300 bg-stone-50/60 cursor-not-allowed'
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

  const fee1Dog = pricingConfig?.petFee ?? 40;
  const fee2Dogs = pricingConfig?.petFee2Dogs ?? 55;

  const calculation = useMemo(() => {
    if (!checkIn || !checkOut) return null;
    return calculateStayPrice(checkIn, checkOut, pricingConfig, blockedDates, isBBB ? 0 : pets);
  }, [checkIn, checkOut, pricingConfig, blockedDates, isBBB, pets]);

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
              disabled={!canGoPrevMonth}
              aria-label="Previous Month"
              className="p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
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
            <BookingDateInput
              label={isCymraeg ? 'Cyrraedd (dd/mm/bbbb)' : 'Check-in (dd/mm/yyyy)'}
              value={checkIn}
              onChange={(val) => {
                setCheckIn(val);
                if (checkOut && val && checkOut <= val) {
                  setCheckOut('');
                }
              }}
              isCymraeg={isCymraeg}
              isOccupied={isOccupied}
            />

            <BookingDateInput
              label={isCymraeg ? 'Gadael (dd/mm/bbbb)' : 'Check-out (dd/mm/yyyy)'}
              value={checkOut}
              min={checkIn || minSelectableDate}
              onChange={setCheckOut}
              isCymraeg={isCymraeg}
              isOccupied={isOccupied}
            />

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

            {/* Dogs Selection (Dogs allowed at Plas Hafod, strictly no dogs at BBB) */}
            {!isBBB ? (
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider font-sans mb-1">
                  {isCymraeg ? 'Cŵn' : 'Dogs'}
                </label>
                <select
                  value={pets}
                  onChange={(e) => setPets(Number(e.target.value))}
                  className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-stone-800 text-sm focus:outline-none focus:border-[#99a0c1]"
                >
                  <option value={0}>{isCymraeg ? '0 Ci' : '0 Dogs'}</option>
                  <option value={1}>{isCymraeg ? `1 Ci (£${fee1Dog})` : `1 Dog (£${fee1Dog})`}</option>
                  <option value={2}>{isCymraeg ? `2 Gi (£${fee2Dogs})` : `2 Dogs (£${fee2Dogs})`}</option>
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider font-sans mb-1">
                  {isCymraeg ? 'Polisi Cŵn' : 'Dog Policy'}
                </label>
                <div className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 rounded-lg text-xs text-stone-600 border border-stone-200">
                  <Ban className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{isCymraeg ? 'Dim cŵn' : 'No dogs allowed'}</span>
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
                        {formatDateUK(checkIn)} &rarr; {formatDateUK(checkOut)})
                      </p>
                      <p className="text-xs text-stone-500 font-sans mt-1">
                        Average rate: £{calculation.baseRateAverage} / night
                        {calculation.discountAmount > 0 &&
                          ` • Includes ${calculation.appliedDiscountName}`}
                        {!isBBB && pets > 0 && calculation.petFee > 0 &&
                          ` • ${isCymraeg ? `Ffi ci £${calculation.petFee}` : `Includes £${calculation.petFee} dog fee`}`}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-stone-500 uppercase tracking-wider">
                        {isCymraeg ? 'Cyfanswm' : 'Total Price'}
                      </p>
                      <p className="text-3xl font-architects text-stone-900 font-bold">
                        £{calculation.totalPrice}
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
