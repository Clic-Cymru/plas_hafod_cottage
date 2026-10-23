'use client';

import React from 'react';

export function ClicCymruNavbar(props: any) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* Clic Cymru Master Studio Banner */}
      <div
        style={{
          background: '#201526',
          borderBottom: '2px solid #552077',
          padding: '8px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#ffffff',
          fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: '12px',
        }}
      >
        {/* Left: Clic Cymru Branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              lineHeight: '0.85',
              fontFamily: "'Barlow Condensed', sans-serif",
            }}
          >
            <span
              style={{
                fontSize: '24px',
                fontWeight: 800,
                letterSpacing: '-0.5px',
                color: '#eed44e', // Clic Accent Yellow
                textTransform: 'uppercase',
              }}
            >
              CLIC
            </span>
            <span
              style={{
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '3px',
                color: '#cbbaff', // Clic Lilac
                textTransform: 'uppercase',
                marginTop: '3px',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              CYMRU
            </span>
          </div>

          <div style={{ height: '26px', width: '1px', background: 'rgba(255, 255, 255, 0.18)' }} />

          <div>
            <div style={{ fontWeight: 700, fontSize: '13px', color: '#ffffff', letterSpacing: '0.3px' }}>
              PLAS HAFOD &amp; BRYN BUGEILIAID BACH
            </div>
            <div style={{ fontSize: '11px', color: '#cbbaff' }}>
              Stiwdio Reoli Ddwyieithog · Bilingual Content Management
            </div>
          </div>
        </div>

        {/* Right: Quick actions & Guardrail badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '20px',
              background: 'rgba(218, 239, 190, 0.15)',
              border: '1px solid rgba(218, 239, 190, 0.3)',
              color: '#daefbe',
              fontSize: '11px',
              fontWeight: 600,
            }}
          >
            <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#daefbe' }} />
            Free Plan Guardrails Active (1M CDN Quota)
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              background: '#eed44e',
              color: '#241929',
              fontWeight: 700,
              fontSize: '11px',
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
          >
            View Live Site ↗
          </a>

          <a
            href="/cy"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '5px 12px',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '11px',
              textDecoration: 'none',
            }}
          >
            Cymraeg ↗
          </a>
        </div>
      </div>

      {/* Render Default Sanity Workspace Navbar */}
      {props.renderDefault(props)}
    </div>
  );
}
