'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface ContactFormProps {
  isCymraeg?: boolean;
}

export function ContactForm({ isCymraeg = false }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Plas Hafod Cottage Inquiry',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to send message. Please try again.');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Plas Hafod Cottage Inquiry',
        message: '',
      });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please check your connection.');
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm">
      <div className="mb-8">
        <h3
          className="text-2xl sm:text-3xl font-architects uppercase tracking-wide text-stone-900"
          style={{ fontFamily: "'Architects Daughter', cursive, sans-serif" }}
        >
          {isCymraeg ? 'ANFONWCH NEGES ATOM' : 'SEND US A MESSAGE'}
        </h3>
        <div className="w-16 h-1 bg-[#efda07] mt-2 mb-3" />
        <p className="text-stone-600 text-sm font-sans">
          {isCymraeg
            ? 'Llenwch y ffurflen isod a byddwn yn cysylltu â chi cyn gynted â phosibl.'
            : 'Fill in the form below and we will get back to you promptly, usually within a few hours.'}
        </p>
      </div>

      {status === 'success' && (
        <div className="mb-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-emerald-900">
              {isCymraeg ? 'Diolch yn fawr! Neges wedi ei hanfon.' : 'Thank you! Message Sent Successfully.'}
            </h4>
            <p className="text-xs sm:text-sm text-emerald-700 mt-1">
              {isCymraeg
                ? 'Rydym wedi derbyn eich neges ac wedi anfon e-bost cadarnhau atoch. Byddwn mewn cysylltiad yn fuan.'
                : 'We have received your note and dispatched a confirmation auto-reply to your email. Siwsan & Neil will be in touch shortly.'}
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-3 text-xs font-semibold text-emerald-800 underline underline-offset-2 hover:text-emerald-900"
            >
              {isCymraeg ? 'Anfon neges arall' : 'Send another inquiry'}
            </button>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2 font-sans"
            >
              {isCymraeg ? 'Eich Enw Llawn *' : 'Your Full Name *'}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Siân & Geraint Roberts"
              className="w-full px-4 py-3 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#99a0c1] focus:border-transparent text-sm transition"
            />
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2 font-sans"
            >
              {isCymraeg ? 'Cyfeiriad E-bost *' : 'Email Address *'}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. sian@example.co.uk"
              className="w-full px-4 py-3 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#99a0c1] focus:border-transparent text-sm transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2 font-sans"
            >
              {isCymraeg ? 'Rhif Ffôn' : 'Phone Number'}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. 07912 345678"
              className="w-full px-4 py-3 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#99a0c1] focus:border-transparent text-sm transition"
            />
          </div>

          {/* Subject / Property */}
          <div>
            <label
              htmlFor="subject"
              className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2 font-sans"
            >
              {isCymraeg ? 'Pwnc / Eiddo o Ddiddordeb' : 'Subject / Property'}
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-stone-300 text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#99a0c1] focus:border-transparent text-sm transition"
            >
              <option value="Plas Hafod Cottage Inquiry">Plas Hafod Cottage (Main House)</option>
              <option value="Bryn Bugeiliaid Bach Inquiry">Bryn Bugeiliaid Bach (Annexe)</option>
              <option value="Availability & Dates Question">Dates & Availability Query</option>
              <option value="Dog / Pet Policy Question">Dogs & Pet Policy Question</option>
              <option value="General Cottage Question">General Inquiry</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2 font-sans"
          >
            {isCymraeg ? 'Eich Neges *' : 'Your Message *'}
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder={
              isCymraeg
                ? 'Sut allwn ni eich helpu? Dywedwch wrthym am eich dyddiadau neu unrhyw ofynion arbennig...'
                : 'How can we help? Let us know your preferred dates, group size, or any special requests...'
            }
            className="w-full px-4 py-3 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#99a0c1] focus:border-transparent text-sm transition"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{ fontFamily: "'Architects Daughter', cursive, sans-serif" }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-base font-architects font-bold uppercase tracking-wider text-white bg-[#99a0c1] hover:bg-[#323149] disabled:opacity-60 transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{isCymraeg ? 'WRTHI\'N ANFON...' : 'SENDING MESSAGE...'}</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>{isCymraeg ? 'ANFON NEGES' : 'SEND INQUIRY'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
