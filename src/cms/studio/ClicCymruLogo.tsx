'use client';

import React from 'react';

export function ClicCymruLogo(props: any) {
  const { renderDefault, title } = props;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '4px 6px' }}>
      {/* Clic Cymru Authentic Brand Mark */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          lineHeight: '0.85',
          fontFamily: "'Barlow Condensed', -apple-system, sans-serif",
        }}
      >
        <span
          style={{
            fontSize: '22px',
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
            fontSize: '8px',
            fontWeight: 700,
            letterSpacing: '2.8px',
            color: '#cbbaff', // Clic Lilac
            textTransform: 'uppercase',
            marginTop: '2px',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          CYMRU
        </span>
      </div>

      <div
        style={{
          height: '24px',
          width: '1px',
          background: 'rgba(255, 255, 255, 0.2)',
        }}
      />

      {/* Plas Hafod Cottage Management Badge */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span
          style={{
            fontSize: '13px',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '0.2px',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          PLAS HAFOD &amp; BRYN BUGEILIAID BACH
        </span>
        <span
          style={{
            fontSize: '10px',
            color: 'rgba(255, 255, 255, 0.7)',
            letterSpacing: '0.5px',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Stiwdio Reoli Ddwyieithog · Bilingual CMS
        </span>
      </div>
    </div>
  );
}
