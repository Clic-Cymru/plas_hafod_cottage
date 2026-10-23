'use client';

import React, { useState } from 'react';
import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';
import '@/cms/studio/studio.css';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'iji5mij0';
const isConfigured = Boolean(projectId && projectId !== 'demo-project');

export default function StudioPage() {
  const [dismissGuide, setDismissGuide] = useState(false);

  if (!isConfigured && !dismissGuide) {
    return (
      <div className="min-h-screen bg-[#201526] text-[#f7f2e9] flex items-center justify-center p-6 font-sans">
        <div className="max-w-xl w-full bg-[#292033] border-2 border-[#552077] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle Clic Cymru background glow */}
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#eed44e]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Clic Cymru Brand Header */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#552077]/50">
            <div className="flex items-center gap-3">
              <div className="flex flex-col leading-none">
                <span className="font-extrabold text-2xl tracking-tight text-[#eed44e] font-sans uppercase">
                  CLIC
                </span>
                <span className="text-[8px] font-bold tracking-[3px] text-[#cbbaff] uppercase mt-0.5">
                  CYMRU
                </span>
              </div>
              <div className="h-7 w-[1px] bg-white/20" />
              <div>
                <h1 className="text-lg font-bold text-white tracking-wide">
                  Plas Hafod Cottage Management
                </h1>
                <p className="text-xs text-[#cbbaff]">
                  Stiwdio Ddwyieithog · Bilingual Content Engine
                </p>
              </div>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#552077] text-[#cbbaff]">
              Sanity v3
            </span>
          </div>

          <div className="bg-[#1a1120] border border-[#552077]/60 rounded-2xl p-5 mb-6 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#eed44e]">
              Connect Your Sanity Project:
            </h2>
            <ol className="list-decimal list-inside text-xs text-stone-300 space-y-2 leading-relaxed">
              <li>
                Log into or create a free account at{' '}
                <a
                  href="https://www.sanity.io/manage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#eed44e] underline font-semibold hover:text-white"
                >
                  sanity.io/manage
                </a>
                .
              </li>
              <li>
                Create a project named <strong>Plas Hafod Cottage</strong> with dataset <strong>production</strong>.
              </li>
              <li>
                Paste your Project ID into your <code className="bg-[#292033] px-1.5 py-0.5 rounded text-[#eed44e] font-mono text-xs">.env.local</code> file:
                <pre className="mt-2 p-3 bg-[#0f0914] rounded-xl text-xs font-mono text-[#daefbe] overflow-x-auto border border-white/5">
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=your_write_token_here
                </pre>
              </li>
            </ol>
          </div>

          <div className="text-xs text-[#c1b4ca] mb-6">
            <p className="font-bold text-white mb-2">100% Editable via Clic Cymru Studio:</p>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <span className="flex items-center gap-1.5">
                <span className="text-[#eed44e]">✓</span> English &amp; Cymraeg Copy
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#eed44e]">✓</span> Hero Slides &amp; Banner
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#eed44e]">✓</span> Seasonal Pricing &amp; Rates
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#eed44e]">✓</span> Live Blocked Dates
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#eed44e]">✓</span> Snowdonia Walking Trails
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#eed44e]">✓</span> Booking Inquiries Inbox
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#eed44e]">✓</span> Reviews (Airbnb, Vrbo)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#eed44e]">✓</span> Terms &amp; Pet Policies
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#552077]/50">
            <a
              href="/"
              className="text-xs text-stone-400 hover:text-white transition"
            >
              ← Back to Main Website
            </a>
            <button
              onClick={() => setDismissGuide(true)}
              className="px-5 py-2.5 rounded-full bg-[#eed44e] text-[#241929] font-bold text-xs hover:bg-[#ffe359] transition shadow-lg flex items-center gap-2"
            >
              Open Studio Interface →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
