import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { marked } from 'marked';

const artifactsDir = 'C:\\Users\\Bob\\.gemini\\antigravity-ide\\brain\\8c2482ea-582a-4ff3-9700-c62fbc7929ab';
const docsOutputDir = 'c:\\Users\\Bob\\.gemini\\antigravity\\scratch\\PlasHafod\\docs';

if (!fs.existsSync(docsOutputDir)) {
  fs.mkdirSync(docsOutputDir, { recursive: true });
}

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

function renderAlerts(html) {
  return html.replace(
    /<blockquote>\s*<p>\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]([\s\S]*?)<\/p>\s*<\/blockquote>/gi,
    (match, type, body) => {
      const alertType = type.toUpperCase();
      let borderColor = '#3b82f6';
      let bgColor = '#eff6ff';
      let titleColor = '#1d4ed8';
      let icon = 'ℹ️';

      if (alertType === 'TIP') {
        borderColor = '#10b981';
        bgColor = '#ecfdf5';
        titleColor = '#047857';
        icon = '💡';
      } else if (alertType === 'IMPORTANT') {
        borderColor = '#8b5cf6';
        bgColor = '#f5f3ff';
        titleColor = '#6d28d9';
        icon = '📌';
      } else if (alertType === 'WARNING') {
        borderColor = '#f59e0b';
        bgColor = '#fffbeb';
        titleColor = '#b45309';
        icon = '⚠️';
      } else if (alertType === 'CAUTION') {
        borderColor = '#ef4444';
        bgColor = '#fef2f2';
        titleColor = '#b91c1c';
        icon = '🛑';
      }

      return `
        <div style="background-color: ${bgColor}; border-left: 4px solid ${borderColor}; padding: 14px 18px; margin: 18px 0; border-radius: 0 8px 8px 0; page-break-inside: avoid;">
          <div style="font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: ${titleColor}; margin-bottom: 6px;">
            ${icon} ${alertType}
          </div>
          <div style="font-size: 13px; line-height: 1.6; color: #334155;">
            ${body}
          </div>
        </div>
      `;
    }
  );
}

function renderCheckboxes(html) {
  let res = html.replace(/\[ \]/g, '<span style="display:inline-block; width:15px; height:15px; border:2px solid #64748b; border-radius:3px; vertical-align:middle; margin-right:6px; background:#fff;"></span>');
  res = res.replace(/\[x\]/gi, '<span style="display:inline-block; width:15px; height:15px; border:2px solid #16a34a; background:#16a34a; color:#fff; border-radius:3px; vertical-align:middle; margin-right:6px; text-align:center; line-height:13px; font-size:11px; font-weight:bold;">&#10003;</span>');
  return res;
}

function renderMermaidVisuals(html) {
  // Replace mermaid code block with high quality responsive visual cards
  return html.replace(
    /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/gi,
    (match, code) => {
      if (code.includes('Daily Cron Trigger')) {
        return `
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:18px 22px; margin:22px 0; page-break-inside:avoid;">
            <div style="font-weight:700; font-size:14px; color:#1e1b2e; margin-bottom:12px; border-bottom:2px solid #efda07; padding-bottom:6px; display:inline-block;">
              ⚡ Automated Check-In & Balance Sequence
            </div>
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:12px; margin-top:8px;">
              <div style="background:#fff; border:1px solid #cbd5e1; border-radius:8px; padding:12px;">
                <div style="font-size:11px; font-weight:800; color:#3b82f6; text-transform:uppercase;">Step 1 &bull; 09:00 AM</div>
                <div style="font-size:13px; font-weight:700; margin-top:4px; color:#0f172a;">Daily Scheduled Cron</div>
                <div style="font-size:11px; color:#64748b; margin-top:4px;">Cloudflare Worker evaluates active bookings in Sanity.</div>
              </div>
              <div style="background:#fff; border:1px solid #cbd5e1; border-radius:8px; padding:12px;">
                <div style="font-size:11px; font-weight:800; color:#8b5cf6; text-transform:uppercase;">Step 2 &bull; 14-Day Check</div>
                <div style="font-size:13px; font-weight:700; margin-top:4px; color:#0f172a;">Filter Stay Windows</div>
                <div style="font-size:11px; color:#64748b; margin-top:4px;">Identifies bookings arriving within 14 days.</div>
              </div>
              <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:12px;">
                <div style="font-size:11px; font-weight:800; color:#15803d; text-transform:uppercase;">Condition A &bull; Balance Paid</div>
                <div style="font-size:13px; font-weight:700; margin-top:4px; color:#166534;">Dispatch Arrival Guide</div>
                <div style="font-size:11px; color:#166534; margin-top:4px;">Releases secret Key Safe Code, WiFi & directions via Resend.</div>
              </div>
              <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:12px;">
                <div style="font-size:11px; font-weight:800; color:#b45309; text-transform:uppercase;">Condition B &bull; Balance Unpaid</div>
                <div style="font-size:13px; font-weight:700; margin-top:4px; color:#92400e;">Send Balance Reminder</div>
                <div style="font-size:11px; color:#92400e; margin-top:4px;">Key code is safely withheld; BACS payment details sent.</div>
              </div>
            </div>
          </div>
        `;
      } else if (code.includes('Guest Submits Inquiry')) {
        return `
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:18px 22px; margin:22px 0; page-break-inside:avoid;">
            <div style="font-weight:700; font-size:14px; color:#1e1b2e; margin-bottom:12px; border-bottom:2px solid #efda07; padding-bottom:6px; display:inline-block;">
              📋 Reservation & Payment Lifecycle Overview
            </div>
            <div style="display:flex; flex-direction:column; gap:8px;">
              <div style="display:flex; align-items:center; gap:12px; background:#fff; padding:10px 14px; border:1px solid #e2e8f0; border-radius:6px;">
                <span style="background:#323149; color:#efda07; font-weight:800; border-radius:50%; width:24px; height:24px; display:flex; align-items:center; justify-content:center; font-size:12px;">1</span>
                <span style="font-size:13px; color:#1e293b; font-weight:600;">Guest requests dates on website &rarr; Instant email alert arrives in your inbox.</span>
              </div>
              <div style="display:flex; align-items:center; gap:12px; background:#fff; padding:10px 14px; border:1px solid #e2e8f0; border-radius:6px;">
                <span style="background:#323149; color:#efda07; font-weight:800; border-radius:50%; width:24px; height:24px; display:flex; align-items:center; justify-content:center; font-size:12px;">2</span>
                <span style="font-size:13px; color:#1e293b; font-weight:600;">Open Sanity Studio &rarr; Click 'Send Deposit Request Email' with 1 click.</span>
              </div>
              <div style="display:flex; align-items:center; gap:12px; background:#fff; padding:10px 14px; border:1px solid #e2e8f0; border-radius:6px;">
                <span style="background:#323149; color:#efda07; font-weight:800; border-radius:50%; width:24px; height:24px; display:flex; align-items:center; justify-content:center; font-size:12px;">3</span>
                <span style="font-size:13px; color:#1e293b; font-weight:600;">Guest transfers deposit via BACS &rarr; Click 'Mark Paid & Confirmed ✓' (Calendar locks).</span>
              </div>
              <div style="display:flex; align-items:center; gap:12px; background:#fff; padding:10px 14px; border:1px solid #e2e8f0; border-radius:6px;">
                <span style="background:#323149; color:#efda07; font-weight:800; border-radius:50%; width:24px; height:24px; display:flex; align-items:center; justify-content:center; font-size:12px;">4</span>
                <span style="font-size:13px; color:#1e293b; font-weight:600;">14 days before arrival &rarr; Final balance reminder or key safe arrival pack is dispatched.</span>
              </div>
            </div>
          </div>
        `;
      }
      return '';
    }
  );
}

function buildHtmlDocument({ title, subtitle, date, contentHtml }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 18mm 16mm 18mm 16mm;
      @bottom-right {
        content: counter(page) " / " counter(pages);
      }
    }
    *, *:before, *:after { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1e293b;
      line-height: 1.55;
      font-size: 13.5px;
      margin: 0;
      padding: 0;
      background: #ffffff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .header-banner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 3px solid #efda07;
      padding-bottom: 16px;
      margin-bottom: 24px;
    }
    .logo-container {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .logo-img {
      height: 48px;
      width: auto;
    }
    .brand-title {
      font-size: 16px;
      font-weight: 800;
      color: #1e1b2e;
      letter-spacing: -0.2px;
      margin: 0;
    }
    .brand-sub {
      font-size: 12px;
      color: #64748b;
      margin: 2px 0 0;
    }
    .meta-box {
      text-align: right;
      font-size: 11px;
      color: #64748b;
    }
    .meta-badge {
      display: inline-block;
      background: #323149;
      color: #efda07;
      font-weight: 700;
      font-size: 10px;
      padding: 3px 8px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 4px;
    }
    h1 {
      font-size: 24px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.4px;
      margin: 0 0 6px;
      line-height: 1.25;
    }
    .doc-subtitle {
      font-size: 14px;
      color: #475569;
      margin: 0 0 20px;
      line-height: 1.45;
    }
    h2 {
      font-size: 16px;
      font-weight: 700;
      color: #1e1b2e;
      margin: 26px 0 10px;
      padding-bottom: 6px;
      border-bottom: 1.5px solid #e2e8f0;
      page-break-after: avoid;
    }
    h3 {
      font-size: 14px;
      font-weight: 700;
      color: #334155;
      margin: 18px 0 6px;
      page-break-after: avoid;
    }
    p {
      margin: 0 0 12px;
    }
    ul, ol {
      margin: 0 0 14px;
      padding-left: 22px;
    }
    li {
      margin-bottom: 6px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0 22px;
      font-size: 12.5px;
      page-break-inside: auto;
    }
    tr {
      page-break-inside: avoid;
      page-break-after: auto;
    }
    th {
      background: #323149;
      color: #ffffff;
      font-weight: 700;
      text-align: left;
      padding: 8px 10px;
      border: 1px solid #323149;
      font-size: 12px;
    }
    td {
      padding: 8px 10px;
      border: 1px solid #cbd5e1;
      vertical-align: top;
    }
    tbody tr:nth-child(even) {
      background-color: #f8fafc;
    }
    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      background: #f1f5f9;
      padding: 2px 5px;
      border-radius: 4px;
      font-size: 12px;
      color: #0f172a;
    }
    pre {
      background: #1e1b2e;
      color: #f8fafc;
      padding: 12px 14px;
      border-radius: 8px;
      overflow-x: auto;
      font-size: 12px;
      page-break-inside: avoid;
      margin: 14px 0;
    }
    pre code {
      background: transparent;
      color: inherit;
      padding: 0;
    }
    a {
      color: #2563eb;
      text-decoration: none;
    }
    .doc-footer {
      margin-top: 36px;
      padding-top: 14px;
      border-top: 1px solid #e2e8f0;
      font-size: 11px;
      color: #94a3b8;
      display: flex;
      justify-content: space-between;
      align-items: center;
      page-break-inside: avoid;
    }
  </style>
</head>
<body>
  <div class="header-banner">
    <div class="logo-container">
      <img src="https://cdn.sanity.io/images/iji5mij0/production/e869c435303f83aea95717dda5de5b822310fb00-821x523.png" alt="Plas Hafod Logo" class="logo-img" />
      <div>
        <div class="brand-title">Plas Hafod &amp; Bryn Bugeiliaid Bach</div>
        <div class="brand-sub">Nebo, Penygroes, Gwynedd &bull; Parc Cenedlaethol Eryri (Snowdonia)</div>
      </div>
    </div>
    <div class="meta-box">
      <div class="meta-badge">Official Release</div>
      <div>Date: ${date}</div>
      <div>Prepared by: Clic-Cymru</div>
    </div>
  </div>

  <div class="content">
    ${contentHtml}
  </div>

  <div class="doc-footer">
    <div>Plas Hafod Cottage &amp; Bryn Bugeiliaid Bach &bull; Website Launch Documentation</div>
    <div>plashafodcottage.co.uk &bull; Siwsan &amp; Neil</div>
  </div>
</body>
</html>`;
}

async function convertMarkdownToPdf(mdFilePath, outputPdfName, docTitle, docSubtitle) {
  const mdContent = fs.readFileSync(mdFilePath, 'utf8');
  let rawHtml = marked.parse(mdContent);
  rawHtml = renderAlerts(rawHtml);
  rawHtml = renderCheckboxes(rawHtml);
  rawHtml = renderMermaidVisuals(rawHtml);

  const fullHtml = buildHtmlDocument({
    title: docTitle,
    subtitle: docSubtitle,
    date: '28 October 2026',
    contentHtml: rawHtml,
  });

  const tempHtmlPath = path.join(docsOutputDir, `${outputPdfName}.html`);
  fs.writeFileSync(tempHtmlPath, fullHtml, 'utf8');

  const artifactPdfPath = path.join(artifactsDir, `${outputPdfName}.pdf`);
  const docsPdfPath = path.join(docsOutputDir, `${outputPdfName}.pdf`);

  // Run Edge headless to print to PDF
  const args = [
    '--headless',
    '--disable-gpu',
    '--no-pdf-header-footer',
    `--print-to-pdf=${docsPdfPath}`,
    tempHtmlPath,
  ];

  console.log(`Generating PDF for ${outputPdfName}...`);
  execFileSync(edgePath, args);

  // Copy to artifacts dir
  fs.copyFileSync(docsPdfPath, artifactPdfPath);
  console.log(`Saved: ${docsPdfPath}`);
  console.log(`Copied to artifacts: ${artifactPdfPath}`);

  return { docsPdfPath, artifactPdfPath };
}

async function main() {
  const file1 = path.join(artifactsDir, 'pre_migration_testing_checklist.md');
  const file2 = path.join(artifactsDir, 'sanity_studio_client_guide.md');

  console.log('Generating PDF 1: Pre-Migration Testing Checklist...');
  await convertMarkdownToPdf(
    file1,
    'Plas_Hafod_Pre_Migration_Testing_Checklist',
    'Plas Hafod & Bryn Bugeiliaid Bach: Pre-Migration Testing Checklist',
    'Technical verification checklist, live test scenarios, and DNS migration protocol.'
  );

  console.log('Generating PDF 2: Sanity Studio Client Guidelines...');
  await convertMarkdownToPdf(
    file2,
    'Plas_Hafod_Sanity_Studio_Client_Guide',
    'Welcome to Your Website Management Portal: A Guide for Siwsan & Neil',
    'Visual day-to-day user manual for managing bookings, BACS payments, tariffs, and availability.'
  );

  console.log('Both PDFs generated successfully!');
}

main().catch((err) => {
  console.error('Error generating PDFs:', err);
  process.exit(1);
});
