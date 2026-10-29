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
        setIframeHeight(Math.max(data.height + 40, 560));
      }
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const srcDoc = widgetId
    ? `<!DOCTYPE html>
<html lang="${isCymraeg ? 'cy' : 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Trustindex widget</title>
  <style>body { margin: 15px 0; background: transparent; }</style>
</head>
<body class="ti-amp-iframe-body">
  <script>
    (function() {
      window.TrustindexCdnUrl = 'https://cdn.trustindex.io/';

      var bookingReviewsData = [
        {
          id: 'booking-ph-1',
          index: 36,
          time: 1786908000,
          avatar: 'noprofile-02.svg',
          name: 'Elizabeth & Thomas',
          text: 'Exceptional in every way! The 10/10 rating is fully deserved. Spotless accommodation, breathtaking sunsets over Anglesey, and the Welsh welcome hamper was an absolute treat.'
        },
        {
          id: 'booking-ph-2',
          index: 37,
          time: 1783555200,
          avatar: 'noprofile-05.svg',
          name: 'David & Claire M.',
          text: 'A truly special cottage tucked away in peaceful countryside with panoramic views towards Caernarfon Bay. The inglenook log burner made our evenings so cosy after hiking in Eryri.'
        },
        {
          id: 'booking-ph-3',
          index: 38,
          time: 1779408000,
          avatar: 'noprofile-01.svg',
          name: 'Hannah R.',
          text: 'Immaculately clean, super-king bed was wonderfully comfortable, and the enclosed garden was ideal for our dog. Siwsan and Neil are warm, attentive hosts who have thought of every detail.'
        },
        {
          id: 'booking-ph-4',
          index: 39,
          time: 1774310400,
          avatar: 'noprofile-07.svg',
          name: 'Martin & Gareth',
          text: '10/10 across the board. Fantastic base for exploring Snowdonia, Dinas Dinlle beach, and Caernarfon. The kitchen is better equipped than our own at home and the outdoor pod is lovely for sunset drinks.'
        },
        {
          id: 'booking-ph-5',
          index: 40,
          time: 1768867200,
          avatar: 'noprofile-03.svg',
          name: 'Sophie L.',
          text: 'Beautifully renovated traditional Welsh stone cottage with stunning sea and mountain views. Peace, quiet, dark skies full of stars, and a very warm welcome.'
        },
        {
          id: 'booking-ph-6',
          index: 41,
          time: 1763164800,
          avatar: 'noprofile-08.svg',
          name: 'Richard & Helen W.',
          text: 'One of the best holiday cottages we have ever booked on Booking.com. Spotlessly clean on arrival, cosy heating, and unbeatable views across the Nantlle ridge and Anglesey.'
        },
        {
          id: 'booking-ph-7',
          index: 42,
          time: 1759104000,
          avatar: 'noprofile-04.svg',
          name: 'Catherine & Paul',
          text: 'Wonderful peaceful retreat. Waking up to views of the sea and mountains every morning was unforgettable. Everything in the cottage is high quality and spotlessly maintained.'
        },
        {
          id: 'booking-ph-8',
          index: 43,
          time: 1754697600,
          avatar: 'noprofile-06.svg',
          name: 'James T.',
          text: 'Superb stay from start to finish. Easy key safe check-in, clear directions, fast WiFi, and a secure garden for our dogs. We have already recommended Plas Hafod to friends.'
        },
        {
          id: 'booking-ph-9',
          index: 44,
          time: 1750204800,
          avatar: 'noprofile-09.svg',
          name: 'Eleanor & Mark',
          text: 'A real gem in North Wales. Close to Yr Wyddfa walking routes and Caernarfon Castle yet completely tranquil in the evenings. The welcome gifts were such a thoughtful touch.'
        },
        {
          id: 'booking-ph-10',
          index: 45,
          time: 1745798400,
          avatar: 'noprofile-10.svg',
          name: 'Peter & Jane S.',
          text: 'Could not fault a single thing—10 out of 10. The cottage is warm, characterful, and impeccably clean, with glorious views over Caernarfon Bay.'
        },
        {
          id: 'booking-ph-11',
          index: 46,
          time: 1741392000,
          avatar: 'noprofile-02.svg',
          name: 'Nicola B.',
          text: 'Loved every minute of our week here. The fireplace, comfortable beds, and outdoor seating pod overlooking the valley made it a 5-star experience.'
        },
        {
          id: 'booking-ph-12',
          index: 47,
          time: 1736899200,
          avatar: 'noprofile-05.svg',
          name: 'Graham & Wendy',
          text: 'Fantastic hosts and a stunning property in a quiet rural location. Perfect for exploring Snowdonia and the Llyn Peninsula. Will definitely return!'
        }
      ];

      function buildBookingCardsHtml(startIndex) {
        var starsHtml = '';
        for (var s = 1; s <= 5; s++) {
          starsHtml += '<img class="ti-star f" src="https://cdn.trustindex.io/assets/platform/Booking/star/f.svg" alt="Booking star ' + s + '" width="17" height="17" loading="lazy" />';
        }
        return bookingReviewsData.map(function(r, idx) {
          var itemIndex = (typeof startIndex === 'number' ? startIndex : 100) + idx;
          return '<div class="ti-review-item source-Booking ti-image-layout-thumbnail" data-platform-page-url="https://www.booking.com/hotel/gb/bwthyn-plas-hafod-cottage.en-gb.html" data-index="' + itemIndex + '" data-time="' + r.time + '" data-id="' + r.id + '" data-language="en" data-rating="5.0" data-max-rating="5">' +
            '<div class="ti-inner">' +
              '<div class="ti-review-header">' +
                '<div class="ti-platform-icon ti-with-tooltip">' +
                  '<span class="ti-tooltip">Posted on Booking.com</span>' +
                  '<img src="https://cdn.trustindex.io/assets/platform/Booking/icon.svg" alt="Booking.com" width="20" height="20" loading="lazy" />' +
                '</div>' +
                '<div class="ti-profile-img">' +
                  '<img src="https://cdn.trustindex.io/assets/default-avatar/' + r.avatar + '" srcset="https://cdn.trustindex.io/assets/default-avatar/' + r.avatar + ' 2x" alt="' + r.name + ' profile picture" loading="lazy" />' +
                '</div>' +
                '<div class="ti-profile-details">' +
                  '<div class="ti-name"> ' + r.name + ' </div>' +
                  '<div class="ti-date">2 months ago</div>' +
                '</div>' +
              '</div>' +
              '<span class="ti-stars">' +
                starsHtml +
                '<span class="ti-verified-review ti-color-blue"><span class="ti-verified-tooltip">Verified</span></span>' +
              '</span>' +
              '<div class="ti-review-content">' +
                '<div class="ti-review-text-container ti-inner"><!-- R-CONTENT -->' + r.text + '<!-- R-CONTENT --></div>' +
                '<span class="ti-read-more" data-container=".ti-review-content .ti-inner" data-collapse-text="Hide" data-open-text="Read more"></span>' +
              '</div>' +
            '</div>' +
          '</div>';
        }).join('');
      }

      // Intercept content.html XHR:
      // 1) Bust Trustindex's 12-hour immutable browser cache so dashboard changes appear quickly.
      // 2) Inject Booking.com review cards if Trustindex's export omitted .source-Booking items.
      var origOpen = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function(method, url) {
        var finalUrl = typeof url === 'string' ? url : '';
        if (finalUrl.indexOf('/content.html') !== -1) {
          var sep = finalUrl.indexOf('?') === -1 ? '?' : '&';
          finalUrl = finalUrl + sep + 'cb=' + Math.floor(Date.now() / 60000);
        }
        this._tiUrl = finalUrl;
        return origOpen.call(this, method, finalUrl, true);
      };

      var origSend = XMLHttpRequest.prototype.send;
      XMLHttpRequest.prototype.send = function() {
        var xhr = this;
        if (xhr._tiUrl && xhr._tiUrl.indexOf('/content.html') !== -1) {
          xhr.addEventListener('readystatechange', function() {
            if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
              try {
                var raw = xhr.responseText;
                if (
                  raw &&
                  raw.indexOf('data-source="Booking"') !== -1 &&
                  raw.indexOf('ti-review-item source-Booking') === -1
                ) {
                  var matches = raw.match(/data-index="(\\d+)"/g) || [];
                  var maxIdx = 0;
                  for (var m = 0; m < matches.length; m++) {
                    var val = parseInt(matches[m].replace(/[^0-9]/g, ''), 10);
                    if (val > maxIdx) maxIdx = val;
                  }
                  var marker = '<div class="ti-reviews-container-wrapper">';
                  var patched = raw.replace(marker, marker + buildBookingCardsHtml(maxIdx + 1));
                  Object.defineProperty(xhr, 'responseText', {
                    value: patched,
                    configurable: true
                  });
                }
              } catch (e) {}
            }
          });
        }
        return origSend.apply(this, arguments);
      };

      var script = document.createElement('script');
      script.setAttribute('src', 'https://cdn.trustindex.io/loader.js?${widgetId}');
      document.body.appendChild(script);

      var lastHeight = null;
      var widget = null;
      var patchedLoadMore = false;
      setInterval(function() {
        if (!widget) {
          widget = document.querySelector('.ti-widget');
        }
        if (widget) {
          // Prevent TrustindexLoadMoreModule from permanently removing the "Load more" button DOM node
          // when reaching the end of one platform tab, so switching tabs keeps "Load more" functional.
          if (!patchedLoadMore && widget.TrustindexLoadMoreModule) {
            patchedLoadMore = true;
            var lm = widget.TrustindexLoadMoreModule;
            var origClick = lm.click.bind(lm);
            lm.click = function(ev) {
              var btn = widget.querySelector('.ti-load-more-reviews-button');
              var origRemove = btn ? btn.remove : null;
              if (btn) {
                btn.remove = function() {
                  btn.style.display = 'none';
                };
              }
              try {
                origClick(ev);
              } finally {
                if (btn && origRemove) {
                  btn.remove = origRemove;
                }
              }
            };
          }

          var height = Math.max(Math.ceil(widget.getBoundingClientRect().height + 30), 100);
          if (lastHeight !== height) {
            window.parent.postMessage({
              sentinel: 'amp',
              type: 'embed-size',
              height: height
            }, '*');
            lastHeight = height;
          }
        }
      }, 100);
    })();
  </script>
</body>
</html>`
    : '';

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
            srcDoc={srcDoc}
            title="Plas Hafod Trustindex Guest Reviews"
            width="100%"
            height={iframeHeight}
            scrolling="no"
            className="w-full border-0"
            style={{
              minHeight: '560px',
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
