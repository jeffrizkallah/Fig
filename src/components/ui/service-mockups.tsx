"use client";

import { Check, Clock } from "lucide-react";
import type { ServiceMockupId } from "@/lib/constants";

interface MockupProps {
  className?: string;
}

const MOCKUP_MAP: Record<ServiceMockupId, React.FC<MockupProps>> = {
  "dispatch-dashboard": DispatchDashboardMockup,
  "kpi-dashboard": KpiDashboardMockup,
  "invoice-extraction": InvoiceExtractionMockup,
  "website-showcase": WebsiteShowcaseMockup,
  "system-integration": SystemIntegrationMockup,
  "onboarding-pipeline": OnboardingPipelineMockup,
};

export function ServiceMockup({
  mockupId,
  className,
}: {
  mockupId: ServiceMockupId;
  className?: string;
}) {
  const Component = MOCKUP_MAP[mockupId];
  return <Component className={className} />;
}

/* ── shared chrome bar ──────────────────────────────────── */

function MockupChrome() {
  return (
    <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/40 bg-[#f5f5f0]">
      <div className="w-1.5 h-1.5 rounded-full bg-[#e87171]/50" />
      <div className="w-1.5 h-1.5 rounded-full bg-[#e8c871]/50" />
      <div className="w-1.5 h-1.5 rounded-full bg-[#71c87a]/50" />
    </div>
  );
}

function MockupShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-border/60 bg-white overflow-hidden select-none ${className ?? ""}`}
    >
      <MockupChrome />
      {children}
    </div>
  );
}

/* ── 1. Dispatch Dashboard (Custom Software) ───────────── */

function DispatchDashboardMockup({ className }: MockupProps) {
  const rows = [
    { name: "Route A-12", driver: "M. Chen", status: "active" },
    { name: "Route B-07", driver: "J. Patel", status: "pending" },
    { name: "Route C-03", driver: "S. Kim", status: "active" },
    { name: "Route D-19", driver: "L. Torres", status: "active" },
  ];

  return (
    <MockupShell className={className}>
      <div className="flex h-[148px]">
        {/* Sidebar */}
        <div className="w-10 bg-[#f5f5f0] border-r border-border/40 flex flex-col items-center gap-2 pt-3">
          <div className="w-5 h-1 rounded-full bg-accent/40" />
          <div className="w-5 h-1 rounded-full bg-accent/20" />
          <div className="w-5 h-1 rounded-full bg-accent/20" />
          <div className="w-5 h-1 rounded-full bg-accent/20" />
        </div>

        {/* Table area */}
        <div className="flex-1 p-2.5">
          {/* Header row */}
          <div className="flex items-center gap-2 pb-1.5 mb-1.5 border-b border-border/30">
            <span className="text-[9px] font-medium text-text-secondary/60 w-16">
              Route
            </span>
            <span className="text-[9px] font-medium text-text-secondary/60 w-16">
              Driver
            </span>
            <span className="text-[9px] font-medium text-text-secondary/60 ml-auto">
              Status
            </span>
          </div>

          {/* Data rows */}
          {rows.map((row, i) => (
            <div
              key={row.name}
              className="flex items-center gap-2 py-1"
            >
              <span className="text-[9px] text-text-primary/70 w-16 truncate">
                {row.name}
              </span>
              <span className="text-[9px] text-text-secondary/60 w-16 truncate">
                {row.driver}
              </span>
              <div className="ml-auto flex items-center gap-1">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${row.status === "active" ? "bg-accent" : "bg-accent-warm"}`}
                  style={row.status === "active" ? { animation: `mockup-pulse 2s ease-in-out infinite ${i * 0.4}s` } : undefined}
                />
                <span className="text-[8px] text-text-secondary/50">
                  {row.status === "active" ? "En route" : "Pending"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MockupShell>
  );
}

/* ── 2. KPI Dashboard (Intelligent Dashboards) ─────────── */

function KpiDashboardMockup({ className }: MockupProps) {
  const kpis = [
    { label: "Revenue", value: "$142K", change: "+12%" },
    { label: "Orders", value: "2,847", change: "+8%" },
    { label: "Avg. Order", value: "$49.80", change: "+3%" },
  ];

  const bars = [65, 82, 45, 90, 72, 58, 85];

  return (
    <MockupShell className={className}>
      <div className="p-2.5 h-[148px] flex flex-col">
        {/* KPI cards */}
        <div className="grid grid-cols-3 gap-1.5 mb-2">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="rounded bg-[#f5f5f0] p-1.5"
            >
              <div className="text-[7px] text-text-secondary/50 uppercase tracking-wider">
                {kpi.label}
              </div>
              <div className="text-[11px] font-semibold text-text-primary/80 font-heading">
                {kpi.value}
              </div>
              <div className="text-[8px] text-accent font-medium">
                {kpi.change}
              </div>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="flex-1 flex items-end gap-1 px-1">
          {bars.map((height, i) => (
            <div
              key={i}
              className="flex-1 rounded-t"
              style={{
                height: `${height}%`,
                backgroundColor:
                  i % 2 === 0
                    ? "var(--accent)"
                    : "var(--accent-warm)",
                opacity: 0.5 + (height / 100) * 0.5,
                transformOrigin: "bottom",
                animation: `mockup-breathe ${2.5 + i * 0.3}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </MockupShell>
  );
}

/* ── 3. Invoice Extraction (AI Solutions) ──────────────── */

function InvoiceExtractionMockup({ className }: MockupProps) {
  return (
    <MockupShell className={className}>
      <div className="p-3 h-[148px] flex gap-3">
        {/* Invoice document */}
        <div className="flex-1 rounded border border-border/40 bg-white p-2.5 shadow-sm relative overflow-hidden">
          {/* Scan line */}
          <div
            className="absolute left-1 right-1 h-[1.5px] bg-accent/30 rounded-full pointer-events-none"
            style={{ animation: "mockup-scan 3s ease-in-out infinite" }}
          />
          {/* Header */}
          <div className="flex items-center justify-between mb-2.5">
            <div className="text-[10px] font-semibold text-text-primary/70 font-heading">
              INVOICE
            </div>
            <div className="text-[8px] text-text-secondary/40">
              #INV-2847
            </div>
          </div>

          {/* Placeholder lines with highlights */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1">
              <div className="h-1 w-6 rounded-full bg-border/50" />
              <div className="h-1 flex-1 rounded-full bg-accent/20 border border-accent/30" />
            </div>
            <div className="flex items-center gap-1">
              <div className="h-1 w-8 rounded-full bg-border/50" />
              <div className="h-1 w-12 rounded-full bg-accent/20 border border-accent/30" />
            </div>
            <div className="h-px bg-border/30 my-1" />
            <div className="flex items-center gap-1">
              <div className="h-1 w-14 rounded-full bg-border/50" />
              <div className="h-1 w-8 rounded-full bg-accent/20 border border-accent/30 ml-auto" />
            </div>
            <div className="flex items-center gap-1">
              <div className="h-1 w-10 rounded-full bg-border/50" />
              <div className="h-1 w-8 rounded-full bg-accent/20 border border-accent/30 ml-auto" />
            </div>
            <div className="h-px bg-border/30 my-1" />
            <div className="flex items-center gap-1">
              <div className="h-1 w-6 rounded-full bg-border/50 font-bold" />
              <div className="h-1.5 w-10 rounded-full bg-accent/30 border border-accent/40 ml-auto" />
            </div>
          </div>
        </div>

        {/* Extracted fields panel */}
        <div className="w-[45%] flex flex-col gap-1.5">
          <div className="text-[8px] text-text-secondary/50 uppercase tracking-wider font-medium">
            Extracted
          </div>
          {[
            { label: "Vendor", value: "Acme Corp" },
            { label: "Date", value: "Jan 15, 2025" },
            { label: "Amount", value: "$4,280.00" },
            { label: "Due", value: "Feb 14, 2025" },
          ].map((field) => (
            <div
              key={field.label}
              className="rounded bg-accent/8 border border-accent/15 px-1.5 py-1"
            >
              <div className="text-[7px] text-accent/60 uppercase">
                {field.label}
              </div>
              <div className="text-[9px] text-text-primary/70 font-medium">
                {field.value}
              </div>
            </div>
          ))}
          <div className="mt-auto flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-accent/15 flex items-center justify-center">
              <Check className="w-1.5 h-1.5 text-accent" />
            </div>
            <span className="text-[7px] text-accent/60">
              99.2% confidence
            </span>
          </div>
        </div>
      </div>
    </MockupShell>
  );
}

/* ── 4. Website Showcase (Websites) ─────────────────────── */

function WebsiteShowcaseMockup({ className }: MockupProps) {
  return (
    <MockupShell className={className}>
      <div className="h-[148px] flex flex-col">
        {/* Mini nav bar */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-border/30">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-accent/30" />
            <div className="w-10 h-1 rounded-full bg-text-primary/20" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-1 rounded-full bg-border/50" />
            <div className="w-6 h-1 rounded-full bg-border/50" />
            <div className="w-6 h-1 rounded-full bg-border/50" />
            <div className="w-10 h-3 rounded-full bg-accent/70" />
          </div>
        </div>

        {/* Hero section */}
        <div className="flex-1 flex">
          {/* Left content */}
          <div className="flex-1 flex flex-col justify-center px-4 py-2">
            <div className="w-20 h-1.5 rounded-full bg-text-primary/25 mb-1.5" />
            <div className="w-28 h-1.5 rounded-full bg-text-primary/25 mb-1.5" />
            <div className="w-16 h-1 rounded-full bg-text-secondary/20 mb-1" />
            <div className="w-20 h-1 rounded-full bg-text-secondary/20 mb-2.5" />
            <div className="w-14 h-3.5 rounded-full bg-accent/60" />
          </div>

          {/* Right image area */}
          <div className="w-[40%] p-2">
            <div
              className="w-full h-full rounded-lg border border-border/30 flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(74,124,89,0.1) 0%, rgba(74,124,89,0.03) 30%, rgba(196,149,106,0.1) 60%, rgba(74,124,89,0.1) 100%)",
                backgroundSize: "200% 200%",
                animation: "mockup-gradient 4s ease-in-out infinite",
              }}
            >
              <svg
                viewBox="0 0 40 40"
                className="w-8 h-8 opacity-30"
                fill="none"
              >
                <rect
                  x="4"
                  y="4"
                  width="32"
                  height="24"
                  rx="3"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                />
                <path
                  d="M4 22 L14 14 L22 20 L28 16 L36 22"
                  stroke="var(--accent)"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
                <circle cx="26" cy="12" r="3" fill="var(--accent-warm)" opacity="0.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Feature cards row */}
        <div className="flex gap-1.5 px-3 pb-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex-1 rounded bg-[#f5f5f0] p-1.5"
            >
              <div className="w-3 h-3 rounded bg-accent/15 mb-1 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-sm bg-accent/40" />
              </div>
              <div className="w-full h-0.5 rounded-full bg-border/40 mb-0.5" />
              <div className="w-3/4 h-0.5 rounded-full bg-border/30" />
            </div>
          ))}
        </div>
      </div>
    </MockupShell>
  );
}

/* ── 5. Connected Systems (System Integration) ─────────── */

function SystemIntegrationMockup({ className }: MockupProps) {
  const sources = [
    { label: "CRM", y: 20 },
    { label: "ERP", y: 65 },
    { label: "Mail", y: 110 },
  ];

  return (
    <MockupShell className={className}>
      <div className="h-[148px] p-3">
        <svg
          viewBox="0 0 400 130"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Source boxes */}
          {sources.map((src) => (
            <g key={src.label}>
              <rect
                x="10"
                y={src.y}
                width="60"
                height="28"
                rx="6"
                fill="var(--bg-secondary)"
                stroke="var(--border)"
                strokeWidth="1"
              />
              <text
                x="40"
                y={src.y + 17}
                textAnchor="middle"
                fontSize="10"
                fontFamily="var(--font-heading)"
                fill="var(--text-secondary)"
                opacity="0.7"
              >
                {src.label}
              </text>
              {/* Connecting line to hub */}
              <path
                d={`M 70 ${src.y + 14} Q 120 ${src.y + 14}, 155 65`}
                stroke="var(--accent)"
                strokeWidth="1.5"
                opacity="0.35"
                strokeLinecap="round"
              />
            </g>
          ))}

          {/* Central hub */}
          <circle
            cx="175"
            cy="65"
            r="24"
            fill="var(--accent)"
            opacity="0.12"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
          <circle
            cx="175"
            cy="65"
            r="12"
            fill="var(--accent)"
            opacity="0.25"
          />
          <text
            x="175"
            y="69"
            textAnchor="middle"
            fontSize="8"
            fontFamily="var(--font-heading)"
            fill="var(--accent)"
            fontWeight="600"
          >
            Fig
          </text>

          {/* Output line */}
          <path
            d="M 199 65 L 280 65"
            stroke="var(--accent)"
            strokeWidth="1.5"
            opacity="0.35"
            strokeLinecap="round"
          />

          {/* Arrow head */}
          <path
            d="M 276 60 L 284 65 L 276 70"
            stroke="var(--accent)"
            strokeWidth="1.5"
            opacity="0.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Output box */}
          <rect
            x="288"
            y="42"
            width="90"
            height="46"
            rx="8"
            fill="var(--accent)"
            opacity="0.08"
            stroke="var(--accent)"
            strokeWidth="1"
            strokeOpacity="0.3"
          />
          <text
            x="333"
            y="60"
            textAnchor="middle"
            fontSize="9"
            fontFamily="var(--font-heading)"
            fill="var(--accent)"
            fontWeight="600"
            opacity="0.7"
          >
            Unified
          </text>
          <text
            x="333"
            y="74"
            textAnchor="middle"
            fontSize="9"
            fontFamily="var(--font-heading)"
            fill="var(--accent)"
            fontWeight="600"
            opacity="0.7"
          >
            System
          </text>

          {/* Subtle data dots flowing along lines */}
          {sources.map((src, i) => (
            <circle key={`dot-${i}`} r="2.5" fill="var(--accent)" opacity="0.5">
              <animateMotion
                dur={`${2 + i * 0.5}s`}
                repeatCount="indefinite"
                path={`M 70 ${src.y + 14} Q 120 ${src.y + 14}, 155 65`}
              />
            </circle>
          ))}
          <circle r="2.5" fill="var(--accent)" opacity="0.5">
            <animateMotion
              dur="2s"
              repeatCount="indefinite"
              path="M 199 65 L 280 65"
            />
          </circle>
        </svg>
      </div>
    </MockupShell>
  );
}

/* ── 5. Onboarding Pipeline (Workflow Automation) ──────── */

function OnboardingPipelineMockup({ className }: MockupProps) {
  const steps = [
    { label: "Contract", done: true },
    { label: "NDA", done: true },
    { label: "Access", done: true },
    { label: "Welcome", done: false },
  ];

  return (
    <MockupShell className={className}>
      <div className="h-[148px] flex flex-col justify-center px-4 py-3">
        {/* Pipeline header */}
        <div className="text-[8px] text-text-secondary/50 uppercase tracking-wider font-medium mb-3 text-center">
          Client Onboarding
        </div>

        {/* Steps row */}
        <div className="flex items-center justify-center gap-0">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center">
              {/* Step */}
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.done
                      ? "bg-accent/15 border border-accent/30"
                      : "bg-accent-warm/15 border border-accent-warm/30"
                  }`}
                >
                  {step.done ? (
                    <Check className="w-3.5 h-3.5 text-accent" />
                  ) : (
                    <Clock
                      className="w-3.5 h-3.5 text-accent-warm"
                      style={{ animation: "mockup-pulse 2s ease-in-out infinite" }}
                    />
                  )}
                </div>
                <span className="text-[8px] text-text-secondary/60 text-center leading-tight">
                  {step.label}
                </span>
              </div>

              {/* Connector */}
              {i < steps.length - 1 && (
                <div className="w-6 sm:w-10 h-px bg-border/50 mx-1 mb-4 relative overflow-visible">
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-accent/50"
                    style={{ animation: `mockup-dot-travel 2s ease-in-out infinite ${i * 0.5}s` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-3 mx-4">
          <div className="h-1 rounded-full bg-border/30 overflow-hidden">
            <div
              className="h-full rounded-full bg-accent/50 relative overflow-hidden"
              style={{ width: "75%" }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                style={{ animation: "mockup-shimmer 2.5s ease-in-out infinite" }}
              />
            </div>
          </div>
          <div className="text-[7px] text-text-secondary/40 text-right mt-0.5">
            75% complete
          </div>
        </div>
      </div>
    </MockupShell>
  );
}
