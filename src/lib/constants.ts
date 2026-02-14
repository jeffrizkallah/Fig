import {
  Code2,
  BarChart3,
  BrainCircuit,
  Link2,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export const NAV_ITEMS = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  span?: string;
}

export const SERVICES: Service[] = [
  {
    icon: Code2,
    title: "Custom Software",
    description:
      "Bespoke applications built to fit your exact workflow, not the other way around.",
    span: "md:col-span-2",
  },
  {
    icon: BarChart3,
    title: "Intelligent Dashboards",
    description:
      "Real-time visibility into your business. Make decisions with data, not guesswork.",
  },
  {
    icon: BrainCircuit,
    title: "AI Solutions",
    description:
      "Practical AI that automates the repetitive and amplifies the creative.",
    span: "md:col-span-2",
  },
  {
    icon: Link2,
    title: "System Integration",
    description:
      "Connect your tools, eliminate data silos, and let your systems talk to each other.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Turn hours of manual work into minutes. We find the bottlenecks and engineer them away.",
    span: "md:col-span-2",
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Chat",
    description:
      "We start with a conversation about your business, your goals, your challenges, and where things feel stuck.",
  },
  {
    number: "02",
    title: "Audit",
    description:
      "We deep-dive into your current systems and workflows, identifying what can be improved, modernised, or digitised.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "We design and develop custom digital solutions tailored to your specific needs and processes.",
  },
  {
    number: "04",
    title: "Train",
    description:
      "We upskill your team through hands-on courses and documentation so they feel confident with the new systems.",
  },
  {
    number: "05",
    title: "Support",
    description:
      "We stay with you, providing ongoing support, iteration, and optimisation as your business evolves.",
  },
];

export const DIFFERENTIATORS = [
  {
    title: "Efficiency First",
    description:
      "We obsess over removing friction from your daily operations. Every system we build saves you time.",
  },
  {
    title: "End-to-End",
    description:
      "From the first conversation to ongoing support, we're with you at every stage, not just a handoff.",
  },
  {
    title: "Human + AI",
    description:
      "We build solutions that augment your team, not replace them. Technology should empower, not complicate.",
  },
  {
    title: "ROI-Driven",
    description:
      "Every system we build earns its keep. We measure success by the time you save and the value you gain.",
  },
];
