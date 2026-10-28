'use client';

import React, { useState, useEffect } from 'react';
import type { Config } from 'sanity';
import '@/cms/studio/studio.css';

export default function StudioPage() {
  const [StudioComponent, setStudioComponent] = useState<React.ComponentType<{ config: Config }> | null>(null);
  const [sanityConfig, setSanityConfig] = useState<Config | null>(null);

  useEffect(() => {
    Promise.all([
      import('next-sanity/studio'),
      import('../../../../sanity.config'),
    ])
      .then(([studioMod, configMod]) => {
        setStudioComponent(() => studioMod.NextStudio);
        setSanityConfig(configMod.default);
      })
      .catch((err) => {
        console.error('Failed to load Sanity Studio:', err);
      });
  }, []);

  if (!StudioComponent || !sanityConfig) {
    return (
      <div className="min-h-screen bg-[#101112] flex flex-col items-center justify-center text-stone-300 font-sans p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full border-2 border-[#efda07] border-t-transparent animate-spin" />
          <span className="text-base font-semibold tracking-wide text-white">
            Loading Plas Hafod Studio...
          </span>
        </div>
        <p className="text-xs text-stone-500">
          Initializing Clic Cymru Content Engine
        </p>
      </div>
    );
  }

  return <StudioComponent config={sanityConfig} />;
}
