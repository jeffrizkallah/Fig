export interface CaseStudy {
  id: string;
  name: string;
  sector: string;
  city: string;
  timeline: string;
  team: string;
  services: string[];
  struggle: string;
  built: string;
  bullets: string[];
  result: string;
  metrics: { value: string; label: string }[];
  quote: string;
  who: string;
  role: string;
}

// Example clients until the real ones are collected. Swap the entries, keep the shape.
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "quinta-do-vale",
    name: "Quinta do Vale",
    sector: "Wine producer",
    city: "Douro",
    timeline: "9 weeks",
    team: "2 people",
    services: ["Custom software", "Dashboards", "Integration"],
    struggle:
      "Orders arrived by WhatsApp, email and phone. Every morning two people retyped them into spreadsheets, and the stock in the warehouse never matched the sheet.",
    built:
      "An ordering portal for their distributors, a live stock view for the warehouse, and invoices that go straight into their accountant's software without anyone retyping them.",
    bullets: [
      "Distributor ordering portal in Portuguese and English",
      "Warehouse stock dashboard with low-stock alerts",
      "Invoicing sync with their accountant's system",
    ],
    result:
      "Order handling went from most of a morning to under an hour. Stock mismatches went to zero in the second month, and distributors started ordering more often because it was easier.",
    metrics: [
      { value: "−70%", label: "admin hours per week" },
      { value: "0", label: "stock mismatches since month two" },
      { value: "3.2×", label: "faster order turnaround" },
    ],
    quote:
      "We thought we needed a bigger team. It turned out we needed the orders to stop arriving in six different places. Fig understood that in the first call.",
    who: "Ana Ferreira",
    role: "Owner, Quinta do Vale",
  },
  {
    id: "marques-e-filhos",
    name: "Marques & Filhos",
    sector: "Building materials",
    city: "Braga",
    timeline: "7 weeks",
    team: "2 people",
    services: ["Custom software", "Automation", "Integration"],
    struggle:
      "Every quote was built by hand in Excel by the same person. Customers waited two or three days, and by then some had already bought elsewhere.",
    built:
      "A quoting tool with their full price catalogue, discount rules and a branded PDF at the end, connected to the CRM so nothing is entered twice.",
    bullets: [
      "Price catalogue with supplier margins built in",
      "Branded PDF quotes in one click",
      "CRM sync and automatic follow-up reminders",
    ],
    result:
      "Quotes now go out in about 20 minutes. The team sends a third more of them, and the owner stopped being the bottleneck for every sale.",
    metrics: [
      { value: "20 min", label: "per quote, down from 2 days" },
      { value: "+31%", label: "quotes sent per month" },
      { value: "4", label: "people who can quote, was 1" },
    ],
    quote:
      "I used to do every quote myself, evenings included. Now anyone on the floor can send one, and they all look better than mine did.",
    who: "Rui Marques",
    role: "Managing Director, Marques & Filhos",
  },
  {
    id: "clinica-sorriso",
    name: "Clínica Sorriso",
    sector: "Dental clinics",
    city: "Lisbon · 3 locations",
    timeline: "6 weeks",
    team: "2 people",
    services: ["Automation", "Dashboards", "Integration"],
    struggle:
      "Reception called every patient by hand the day before. No-shows still ran at roughly one in five, and the monthly numbers per clinic took a week to put together.",
    built:
      "Automatic reminders by SMS and WhatsApp with one-tap confirmation, tied to their booking system, plus a live dashboard across all three clinics.",
    bullets: [
      "Reminders with confirm and reschedule links",
      "Waiting-list backfill for cancelled slots",
      "Live occupancy, revenue and no-shows per clinic",
    ],
    result:
      "No-shows dropped by 42% in three months. Reception got its afternoons back, and the directors see each clinic's numbers the same day instead of a week later.",
    metrics: [
      { value: "−42%", label: "no-shows in three months" },
      { value: "0", label: "manual reminder calls" },
      { value: "Same day", label: "reporting, was 7 days" },
    ],
    quote:
      "The reminders paid for the whole project in the first quarter. The dashboard is the part I did not know I needed.",
    who: "Sofia Almeida",
    role: "Clinical Director, Clínica Sorriso",
  },
];
