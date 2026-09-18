import { NextResponse } from "next/server";

/**
 * Forwards a contact submission to the Google Apps Script web app that
 * appends it to the spreadsheet.
 *
 * This runs server-side so the Apps Script URL and shared secret never
 * reach the browser — without it, anyone could read the endpoint out of
 * the JS bundle and write rows into the sheet directly.
 */

const MAX = { name: 120, email: 200, company: 160, message: 4000 };

/* Must match the list rendered by components/Contact.tsx. Anything else
   is a hand-crafted request, not a real submission. */
const SERVICES = ["Platforms", "Websites", "AI/ML", "Mobile", "Other"];

function clean(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

export async function POST(request: Request) {
  const endpoint = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_SECRET;

  if (!endpoint || !secret) {
    console.error("Contact form: GOOGLE_SHEETS_WEBHOOK_URL or _SECRET is not set.");
    return NextResponse.json(
      { error: "The contact form is not configured yet." },
      { status: 500 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  // Honeypot: a real person never sees this field, so anything in it is a bot.
  // Answer 200 so the bot believes it succeeded and doesn't retry.
  if (clean(body.website, 100)) {
    return NextResponse.json({ ok: true });
  }

  const payload = {
    name: clean(body.name, MAX.name),
    email: clean(body.email, MAX.email),
    company: clean(body.company, MAX.company),
    service: clean(body.service, 40),
    message: clean(body.message, MAX.message),
  };

  if (!payload.name || !payload.email || !payload.message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!SERVICES.includes(payload.service)) {
    return NextResponse.json({ error: "Please choose a service." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return NextResponse.json({ error: "That email address looks wrong." }, { status: 400 });
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, secret }),
      // Apps Script can be slow to wake; give it room but don't hang the
      // request forever if Google is unreachable.
      signal: AbortSignal.timeout(15000),
    });

    // Apps Script answers 200 with {ok:false} on its own failures, so the
    // status code alone isn't enough to call this a success.
    const result = await response.json().catch(() => null);

    if (!response.ok || !result?.ok) {
      console.error("Contact form: Apps Script rejected the write.", {
        status: response.status,
        result,
      });
      return NextResponse.json(
        { error: "We couldn't save your message. Please email us directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form: could not reach Apps Script.", error);
    return NextResponse.json(
      { error: "We couldn't save your message. Please email us directly." },
      { status: 502 }
    );
  }
}
