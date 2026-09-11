"use server";

import {
  BOOKING_WINDOW_DAYS,
  CALENDLY_URL,
  type BookingInfo,
  type Slot,
} from "@/lib/booking";

const API = "https://api.calendly.com";

/**
 * Reads real open slots from Calendly.
 *
 * Returns null when no token is configured or the API is unreachable — the
 * picker then offers every weekday slot and lets Calendly reject anything
 * already taken at the confirmation step, so booking still works.
 */
export async function getAvailability(): Promise<BookingInfo> {
  const empty: BookingInfo = { event: null, days: null };
  const token = process.env.CALENDLY_TOKEN;
  if (!token) return empty;

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    // The event type URI is needed before availability can be queried, and it
    // is not derivable from the public link, so look it up from the user's
    // event types and match on the public scheduling URL.
    const meRes = await fetch(`${API}/users/me`, {
      headers,
      next: { revalidate: 3600 },
    });
    if (!meRes.ok) return empty;
    const me = await meRes.json();
    const userUri: string = me?.resource?.uri;
    if (!userUri) return empty;

    const typesRes = await fetch(
      `${API}/event_types?user=${encodeURIComponent(userUri)}&active=true`,
      { headers, next: { revalidate: 3600 } }
    );
    if (!typesRes.ok) return empty;
    const types = await typesRes.json();

    const wanted = CALENDLY_URL.replace(/\/+$/, "");
    const match =
      types?.collection?.find(
        (t: { scheduling_url?: string }) =>
          t.scheduling_url?.replace(/\/+$/, "") === wanted
      ) ?? types?.collection?.[0];
    if (!match?.uri) return empty;

    // Header details come from Calendly so they never drift from the real
    // event settings.
    const event = {
      name: match.name ?? "Intro call",
      duration: match.duration ?? 30,
      location: locationLabel(match.locations),
    };

    // Calendly caps availability queries at 7 days per request, so walk the
    // window in weekly chunks.
    const now = new Date();
    const end = new Date(now);
    end.setDate(end.getDate() + BOOKING_WINDOW_DAYS);

    const byDate = new Map<string, Slot[]>();
    const cursor = new Date(now);

    while (cursor < end) {
      const chunkStart = new Date(cursor);
      const chunkEnd = new Date(cursor);
      chunkEnd.setDate(chunkEnd.getDate() + 7);
      if (chunkEnd > end) chunkEnd.setTime(end.getTime());

      const url =
        `${API}/event_type_available_times` +
        `?event_type=${encodeURIComponent(match.uri)}` +
        `&start_time=${encodeURIComponent(chunkStart.toISOString())}` +
        `&end_time=${encodeURIComponent(chunkEnd.toISOString())}`;

      const res = await fetch(url, { headers, next: { revalidate: 300 } });
      if (res.ok) {
        const data = await res.json();
        for (const slot of data?.collection ?? []) {
          if (slot.status && slot.status !== "available") continue;
          const iso: string = slot.start_time;
          if (!iso) continue;
          // Calendly hands back a link straight to this exact time; using it
          // is far more reliable than rebuilding the URL from date params.
          const day = iso.slice(0, 10);
          const list = byDate.get(day) ?? [];
          list.push({ start: iso, url: slot.scheduling_url });
          byDate.set(day, list);
        }
      }

      cursor.setDate(cursor.getDate() + 7);
    }

    // An empty map means Calendly could not compute availability (most often
    // a disconnected calendar). Fall back rather than showing no times at all.
    const days =
      byDate.size > 0
        ? [...byDate.entries()]
            .map(([date, slots]) => ({
              date,
              slots: slots.sort((a, b) => a.start.localeCompare(b.start)),
            }))
            .sort((a, b) => a.date.localeCompare(b.date))
        : null;

    return { event, days };
  } catch {
    return empty;
  }
}

/** Maps Calendly's location kinds to something a visitor recognises. */
function locationLabel(
  locations: { kind?: string; location?: string }[] | undefined
): string | null {
  const kind = locations?.[0]?.kind;
  switch (kind) {
    case "google_conference":
      return "Google Meet";
    case "zoom_conference":
      return "Zoom";
    case "microsoft_teams_conference":
      return "Microsoft Teams";
    case "physical":
      return locations?.[0]?.location ?? "In person";
    case "outbound_call":
    case "inbound_call":
      return "Phone call";
    default:
      return null;
  }
}
