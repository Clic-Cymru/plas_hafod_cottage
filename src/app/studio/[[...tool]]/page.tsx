'use client';

import React, { useState } from 'react';
import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const isConfigured = Boolean(projectId && projectId !== 'demo-project');

export default function StudioPage() {
  const [dismissGuide, setDismissGuide] = useState(false);

  if (!isConfigured && !dismissGuide) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#efda07] text-slate-950 flex items-center justify-center font-bold text-xl select-none">
              PH
            </div>
            <div>
              <h1 className="text-xl font-bold">Plas Hafod Cottage Management Studio</h1>
              <p className="text-sm text-slate-400">Headless CMS Setup & Client Dashboard</p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-700/60 rounded-xl p-4 mb-6 space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#efda07]">
              Quick 2-Minute Setup:
            </h2>
            <ol className="list-decimal list-inside text-sm text-slate-300 space-y-2">
              <li>
                Log into or create a free account at{' '}
                <a
                  href="https://www.sanity.io/manage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-300 underline font-semibold hover:text-amber-200"
                >
                  sanity.io/manage
                </a>
                .
              </li>
              <li>
                Create a project (e.g. <strong>Plas Hafod Cottage</strong>) with dataset <strong>production</strong>.
              </li>
              <li>
                Add your Project ID to your <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-300 font-mono text-xs">.env.local</code> file:
                <pre className="mt-2 p-3 bg-slate-950 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto">
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=your_write_token_here
                </pre>
              </li>
            </ol>
          </div>

          <div className="text-xs text-slate-400 mb-6">
            <p className="font-semibold text-slate-300 mb-1">Once connected, your client can manage:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Seasonal nightly rates & stay discounts for both cottages</li>
              <li>Calendar blocked dates (maintenance, owner stays, phone bookings)</li>
              <li>Incoming booking inquiries with real-time status updates</li>
              <li>Guestbook reviews & bilingual text content</li>
            </ul>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-700/60">
            <a
              href="/"
              className="text-sm text-slate-400 hover:text-white transition"
            >
              ← Back to Main Website
            </a>
            <button
              onClick={() => setDismissGuide(true)}
              className="px-5 py-2.5 rounded-lg bg-[#efda07] text-slate-950 font-bold text-sm hover:bg-[#ffe600] transition"
            >
              Continue to Studio UI →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
