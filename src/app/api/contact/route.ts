import { NextResponse } from 'next/server';
import { cmsClient } from '@/cms/client';
import { sendContactEmails } from '@/lib/email/resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone = '', subject = 'General Inquiry', message } = body;

    // Guardrail: Honeypot bot protection (prevents spam bots from consuming Sanity mutation quota)
    if (body.website_url || body.honeypot || body.bot_field) {
      return NextResponse.json({
        success: true,
        message: 'Thank you! Your message has been sent.',
      });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please provide your name, email address, and message.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // 1. Save Contact Message in Sanity CMS / Inbox
    const contactRecord = await cmsClient.createContactMessage({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    // 2. Dispatch Automated Emails via Resend (Owner Alert + Guest Auto-Reply)
    await sendContactEmails({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      subject: subject.trim(),
      message: message.trim(),
      submittedAt: contactRecord.createdAt,
    });

    return NextResponse.json({
      success: true,
      messageId: contactRecord.id,
      message: 'Thank you! Your message has been sent. We will respond within 24 hours.',
    });
  } catch (error: any) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error processing contact message.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const messages = await cmsClient.getContactMessages();
    return NextResponse.json({ messages });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
