/**
 * Calendly scheduling.
 *
 * The calendar UI is ours; Calendly owns the final confirmation step, because
 * their public API can read availability but cannot create a booking.
 *
 * CALENDLY_URL is the public event link. CALENDLY_TOKEN (server only, set in
 * .env.local) is a personal access token used to read real open slots. Without
 * the token the UI still renders and every slot hands off to Calendly, so the
 * booking flow always works — it just cannot grey out times already taken.
 */
export const CALENDLY_URL = "https://calendly.com/trainingwithjeff/intro-call";

export const BOOKING_ENABLED = CALENDLY_URL.length > 0;

/** How many days ahead the picker offers. */
export const BOOKING_WINDOW_DAYS = 30;

export interface BookingEvent {
  name: string;
  duration: number;
  location: string | null;
}

export interface BookingInfo {
  event: BookingEvent | null;
  /** null when Calendly could not report availability; the UI then falls back. */
  days: DaySlots[] | null;
}

export interface Slot {
  /** Full ISO start time, e.g. "2026-09-14T09:00:00Z". */
  start: string;
  /**
   * Calendly's own link straight to this time. Present for real availability;
   * absent for fallback slots, which are booked via calendlySlotUrl instead.
   */
  url?: string;
}

export interface DaySlots {
  /** ISO date, e.g. "2026-09-14". */
  date: string;
  slots: Slot[];
}

/**
 * Builds the Calendly popup URL for one chosen slot. Calendly reads
 * `month`, `date` and `?back=1` to open directly on that time.
 */
export function calendlySlotUrl(isoStart: string) {
  const sep = CALENDLY_URL.includes("?") ? "&" : "?";
  return (
    CALENDLY_URL +
    sep +
    new URLSearchParams({
      month: isoStart.slice(0, 7),
      date: isoStart.slice(0, 10),
      hide_landing_page_details: "1",
      hide_gdpr_banner: "1",
      background_color: "ffffff",
      text_color: "1A1A1A",
      primary_color: "4A7C59",
    }).toString()
  );
}
