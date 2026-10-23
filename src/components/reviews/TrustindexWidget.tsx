'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface TrustindexWidgetProps {
  scriptUrl?: string;
  embedCode?: string;
  isCymraeg?: boolean;
  className?: string;
}

/**
 * Extracts the clean Trustindex widget identifier regardless of how it was pasted:
 * - Direct ID: "4a4d3e0840a425233b16403d1a0"
 * - Script URL: "https://cdn.trustindex.io/loader.js?4a4d3e0840a425233b16403d1a0"
 * - HTML snippet: "<script defer async src='https://cdn.trustindex.io/loader.js?4a4d3e0840a425233b16403d1a0'></script>"
 * - Iframe URL: "https://cdn.trustindex.io/amp-widget.html#4a4d3e0840a425233b16403d1a0"
 */
function extractTrustindexId(input?: string): string | null {
  if (!input) return null;
  const str = input.trim();
  if (!str) return null;

  // Match query parameter or hash: ?[ID] or #[ID]
  const paramMatch = str.match(/(?:\?|#)([a-zA-Z0-9_-]{12,})/);
  if (paramMatch && paramMatch[1]) {
    return paramMatch[1];
  }

  // Match raw alphanumeric 20+ character ID
  const directMatch = str.match(/^([a-zA-Z0-9_-]{12,})$/);
  if (directMatch && directMatch[1]) {
    return directMatch[1];
  }

  return null;
}

export function TrustindexWidget({
  scriptUrl,
  embedCode,
  isCymraeg = false,
  className = '',
}: TrustindexWidgetProps) {
  // Extract ID from scriptUrl or embedCode
  const widgetId = extractTrustindexId(scriptUrl) || extractTrustindexId(embedCode);
  const [iframeHeight, setIframeHeight] = useState<number>(980);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Auto-resize iframe dynamically using Trustindex's postMessage protocol
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      let data = event.data;
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch {
          // not JSON
        }
      }

      if (
        data &&
        (data.sentinel === 'amp' || data.type === 'embed-size') &&
        typeof data.height === 'number'
      ) {
        // Generous bottom clearance ensures all cards and the "Load more reviews" button are never cut off
        setIframeHeight(Math.max(data.height + 40, 960));
      }
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className={`w-full ${className}`}>
      {/* Live Sync Platform Trust Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-stone-200/80 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-stone-700 uppercase font-sans">
            {isCymraeg
              ? 'Wedi’i Gysoni’n Fyw o’r Prif Lwyfannau Archebu'
              : 'Live Synced Across Major Booking Platforms'}
          </span>
        </div>

        {/* Brand Badges */}
        <div className="flex items-center gap-3 sm:gap-4 opacity-80">
          <div className="relative w-16 h-5">
            <Image
              src="/images/wp/logo-airbnb.png"
              alt="Airbnb"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative w-14 h-5">
            <Image
              src="/images/wp/logo-vrbo.png"
              alt="Vrbo"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative w-16 h-5">
            <Image
              src="/images/wp/logo-booking.svg"
              alt="Booking.com"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative w-14 h-5">
            <Image
              src="/images/wp/logo-google.svg"
              alt="Google Reviews"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Trustindex Live Reviews Frame */}
      {widgetId ? (
        <div className="relative w-full transition-all duration-300">
          <iframe
            src={`https://cdn.trustindex.io/amp-widget.html#${widgetId}`}
            title="Plas Hafod Trustindex Guest Reviews"
            width="100%"
            height={iframeHeight}
            scrolling="no"
            className="w-full border-0"
            style={{
              minHeight: '960px',
              height: `${iframeHeight}px`,
              border: 'none',
              display: 'block',
              background: 'transparent',
            }}
          />
        </div>
      ) : (
        <div className="p-6 text-center text-sm text-stone-400 bg-white rounded-2xl border border-stone-200">
          {isCymraeg
            ? 'Rhif adnabyddus Trustindex heb ei osod eto yn Gosodiadau Gwefan Sanity.'
            : 'Trustindex widget ID has not been set yet in Sanity Site Settings.'}
        </div>
      )}
    </div>
  );
}
