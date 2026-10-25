import { Resend } from 'resend';
import fs from 'fs';

// Read .env.local
const envFile = fs.readFileSync('.env.local', 'utf8');
const envVars = Object.fromEntries(
  envFile
    .split('\n')
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('#') && l.includes('='))
    .map(l => {
      const idx = l.indexOf('=');
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
    })
);

const apiKey = envVars.RESEND_API_KEY || process.env.RESEND_API_KEY;
const fromEmail = envVars.RESEND_FROM_EMAIL || 'Plas Hafod Cottage <info@plashafodcottage.co.uk>';
const ownerEmail = envVars.NOTIFICATION_EMAIL || 'info@plashafodcottage.co.uk';

if (!apiKey) {
  console.error('❌ Error: RESEND_API_KEY is not set in .env.local');
  process.exit(1);
}

const resend = new Resend(apiKey);

async function testLiveEmail() {
  console.log(`📡 Sending test email via Resend...`);
  console.log(`   From: ${fromEmail}`);
  console.log(`   To: ${ownerEmail}`);

  try {
    const response = await resend.emails.send({
      from: fromEmail,
      to: ownerEmail,
      subject: '✅ Plas Hafod Cottage: Resend Verification Test',
      html: `
        <div style="font-family: sans-serif; padding: 20px; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #323149;">Plas Hafod Transactional Email Verification</h2>
          <p>Congratulations! Your domain DNS and Resend API key have been successfully configured.</p>
          <p>The Next.js booking and contact forms can now dispatch live alerts to you and instant confirmations to your guests.</p>
          <hr style="border: 0; border-top: 1px solid #edf2f7; margin: 20px 0;">
          <p style="font-size: 12px; color: #718096;">Timestamp: ${new Date().toISOString()}</p>
        </div>
      `,
    });

    if (response.error) {
      console.error('❌ Resend API Error:', response.error);
    } else {
      console.log('🎉 Success! Email dispatched successfully. Message ID:', response.data?.id);
    }
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

testLiveEmail();
