"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Clock, Video } from "lucide-react";
import {
  BOOKING_WINDOW_DAYS,
  calendlySlotUrl,
  type BookingEvent,
  type DaySlots,
  type Slot,
} from "@/lib/booking";
import { getAvailability } from "@/actions/availability";
import { cn } from "@/lib/utils";

const POPUP_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";
const POPUP_CSS = "https://assets.calendly.com/assets/external/widget.css";

// Fallback slots used when Calendly availability cannot be read. Booking still
// completes on Calendly, which rejects anything already taken.
const FALLBACK_HOURS = [9, 10, 11, 14, 15, 16];

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (opts: { url: string }) => void };
  }
}

function toISODate(d: Date) {
  // Local date, not UTC — toISOString() would shift the day for negative offsets.
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function BookingPanel() {
  const [availability, setAvailability] = useState<DaySlots[] | null>(null);
  const [event, setEvent] = useState<BookingEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const [selected, setSelected] = useState<string | null>(null);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const lastBookable = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() + BOOKING_WINDOW_DAYS);
    return d;
  }, [today]);

  // Load Calendly's popup assets once, so choosing a slot opens instantly.
  useEffect(() => {
    if (!document.querySelector(`link[href="${POPUP_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = POPUP_CSS;
      document.head.appendChild(link);
    }
    if (!document.querySelector(`script[src="${POPUP_SCRIPT}"]`)) {
      const script = document.createElement("script");
      script.src = POPUP_SCRIPT;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    getAvailability()
      .then((info) => {
        if (cancelled) return;
        setAvailability(info.days);
        setEvent(info.event);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  /** Open slots for a given date, real where known, otherwise the fallback. */
  const slotsFor = useMemo(() => {
    const map = new Map<string, Slot[]>();
    if (availability) {
      for (const d of availability) map.set(d.date, d.slots);
    }
    return (iso: string): Slot[] => {
      if (availability) return map.get(iso) ?? [];
      const [y, m, day] = iso.split("-").map(Number);
      const d = new Date(y, m - 1, day);
      if (d.getDay() === 0 || d.getDay() === 6) return [];
      return FALLBACK_HOURS.map((h) => ({
        start: new Date(y, m - 1, day, h, 0, 0).toISOString(),
      }));
    };
  }, [availability]);

  function isBookable(d: Date) {
    if (d < today || d > lastBookable) return false;
    return slotsFor(toISODate(d)).length > 0;
  }

  // Monday-first grid for the visible month.
  const grid = useMemo(() => {
    const first = startOfMonth(month);
    const offset = (first.getDay() + 6) % 7;
    const daysInMonth = new Date(
      month.getFullYear(),
      month.getMonth() + 1,
      0
    ).getDate();
    const cells: (Date | null)[] = Array(offset).fill(null);
    for (let i = 1; i <= daysInMonth; i++) {
      cells.push(new Date(month.getFullYear(), month.getMonth(), i));
    }
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [month]);

  const canGoBack = startOfMonth(month) > startOfMonth(today);
  const canGoForward = startOfMonth(month) < startOfMonth(lastBookable);

  const selectedSlots = selected ? slotsFor(selected) : [];

  // e.g. "Lisbon, GMT+1" — friendlier than the raw "Europe/Lisbon" string.
  const timeZoneLabel = useMemo(() => {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const city = zone.split("/").pop()?.replace(/_/g, " ") ?? zone;
    const offset =
      new Intl.DateTimeFormat("en-GB", {
        timeZoneName: "shortOffset",
      })
        .formatToParts(new Date())
        .find((p) => p.type === "timeZoneName")?.value ?? "";
    return offset ? `${city}, ${offset}` : city;
  }, []);

  function book(slot: Slot) {
    // Prefer Calendly's own per-slot link; fall back to building one.
    const url = slot.url ?? calendlySlotUrl(slot.start);
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url });
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 flex flex-col gap-6">
      {/* Meeting summary */}
      <div className="flex flex-col gap-2">
        <h3 className="font-heading text-2xl text-text-primary">
          {event?.name ?? "Intro call"}
        </h3>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-text-secondary">
          <span className="inline-flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent" />
            {event?.duration ?? 30} minutes
          </span>
          <span className="inline-flex items-center gap-2">
            <Video className="w-4 h-4 text-accent" />
            {event?.location ?? "Google Meet"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_180px] gap-6 sm:gap-8">
        {/* Calendar */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-heading text-lg text-text-primary">
              {month.toLocaleDateString("en-GB", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous month"
                disabled={!canGoBack}
                onClick={() =>
                  setMonth(
                    new Date(month.getFullYear(), month.getMonth() - 1, 1)
                  )
                }
                className="w-8 h-8 rounded-full border border-border grid place-items-center text-text-secondary transition-colors hover:bg-bg-secondary disabled:opacity-30 disabled:pointer-events-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Next month"
                disabled={!canGoForward}
                onClick={() =>
                  setMonth(
                    new Date(month.getFullYear(), month.getMonth() + 1, 1)
                  )
                }
                className="w-8 h-8 rounded-full border border-border grid place-items-center text-text-secondary transition-colors hover:bg-bg-secondary disabled:opacity-30 disabled:pointer-events-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <span
                key={i}
                aria-hidden
                className="h-7 grid place-items-center font-mono text-[10px] tracking-[0.08em] uppercase text-text-secondary"
              >
                {d}
              </span>
            ))}

            {grid.map((d, i) => {
              if (!d) return <span key={i} />;
              const iso = toISODate(d);
              const bookable = isBookable(d);
              const isSelected = selected === iso;
              const isToday = iso === toISODate(today);

              return (
                <button
                  key={i}
                  type="button"
                  disabled={!bookable}
                  onClick={() => setSelected(iso)}
                  aria-label={d.toLocaleDateString("en-GB", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                  aria-pressed={isSelected}
                  className={cn(
                    "relative h-10 rounded-lg text-sm tabular-nums transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                    isSelected
                      ? "bg-text-primary text-white font-medium"
                      : bookable
                        ? "text-text-primary hover:bg-accent/10 font-medium"
                        : "text-text-secondary/35 cursor-default"
                  )}
                >
                  {d.getDate()}
                  {isToday && !isSelected && (
                    <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                  )}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-text-secondary">
            Times shown in your local time ({timeZoneLabel}).
          </p>
        </div>

        {/* Times */}
        <div className="flex flex-col gap-3 sm:border-l sm:border-border sm:pl-8">
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-text-secondary">
            {selected
              ? new Date(selected + "T00:00:00").toLocaleDateString("en-GB", {
                  weekday: "long",
                  day: "numeric",
                  month: "short",
                })
              : "Pick a day"}
          </span>

          <div className="flex flex-col gap-2 max-h-[260px] overflow-y-auto pr-1">
            <AnimatePresence mode="popLayout" initial={false}>
              {loading && !selected && (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-text-secondary"
                >
                  Checking the calendar…
                </motion.span>
              )}

              {!loading && !selected && (
                <motion.span
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-text-secondary leading-relaxed"
                >
                  Choose a date to see open times.
                </motion.span>
              )}

              {selected &&
                selectedSlots.map((slot) => (
                  <motion.button
                    key={slot.start}
                    type="button"
                    layout
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    onClick={() => book(slot)}
                    className="h-11 shrink-0 rounded-xl border border-border bg-white text-sm font-medium text-text-primary tabular-nums transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-white cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                  >
                    {new Date(slot.start).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </motion.button>
                ))}

              {selected && selectedSlots.length === 0 && (
                <motion.span
                  key="none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-text-secondary leading-relaxed"
                >
                  Nothing open that day. Try another.
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
