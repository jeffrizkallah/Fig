import {
  Code2,
  BarChart3,
  BrainCircuit,
  Globe,
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

export interface ServiceFeature {
  label: string;
}

export type ServiceMockupId =
  | "dispatch-dashboard"
  | "kpi-dashboard"
  | "invoice-extraction"
  | "website-showcase"
  | "system-integration"
  | "onboarding-pipeline";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  span?: string;
  extendedDescription: string;
  features: ServiceFeature[];
  useCase: {
    description: string;
    mockupId: ServiceMockupId;
  };
}

export const SERVICES: Service[] = [
  {
    icon: Code2,
    title: "Custom Software",
    description:
      "Bespoke applications built to fit your exact workflow, not the other way around.",
    span: "md:col-span-2",
    extendedDescription:
      "We design and develop tailor-made software solutions that integrate seamlessly into your existing operations. From internal tools and customer portals to full-stack platforms, every line of code is written with your specific business logic in mind.",
    features: [
      { label: "Full-stack web & mobile applications" },
      { label: "API design and integration" },
      { label: "Legacy system modernisation" },
      { label: "Scalable cloud-native architecture" },
    ],
    useCase: {
      mockupId: "dispatch-dashboard",
      description:
        "A logistics company replaced three disconnected spreadsheets with a single custom dispatch dashboard, cutting scheduling time by 60%.",
    },
  },
  {
    icon: BarChart3,
    title: "Intelligent Dashboards",
    description:
      "Real-time visibility into your business. Make decisions with data, not guesswork.",
    span: "md:col-span-2",
    extendedDescription:
      "We build live dashboards that pull data from across your business into one clear view. Whether it's sales performance, operational metrics, or customer insights, you'll always know exactly where things stand.",
    features: [
      { label: "Real-time data visualisation" },
      { label: "Multi-source data aggregation" },
      { label: "Custom KPI tracking" },
      { label: "Automated reporting & alerts" },
    ],
    useCase: {
      mockupId: "kpi-dashboard",
      description:
        "A retail chain consolidated data from 12 stores into a single dashboard, reducing monthly reporting from 3 days to 15 minutes.",
    },
  },
  {
    icon: BrainCircuit,
    title: "AI Solutions",
    description:
      "Practical AI that automates the repetitive and amplifies the creative.",
    span: "md:col-span-2",
    extendedDescription:
      "We implement AI where it actually matters, automating tedious tasks, extracting insights from unstructured data, and giving your team superpowers. No hype, just practical applications that deliver measurable results.",
    features: [
      { label: "Document processing & extraction" },
      { label: "Predictive analytics & forecasting" },
      { label: "Natural language interfaces" },
      { label: "Custom model training & fine-tuning" },
    ],
    useCase: {
      mockupId: "invoice-extraction",
      description:
        "An accounting firm automated invoice processing with AI, reducing manual data entry by 85% and virtually eliminating transcription errors.",
    },
  },
  {
    icon: Link2,
    title: "System Integration",
    description:
      "Connect your tools, eliminate data silos, and let your systems talk to each other.",
    span: "md:col-span-2",
    extendedDescription:
      "We bridge the gaps between your existing tools and platforms so data flows automatically where it needs to go. No more copy-pasting between systems or wondering which spreadsheet has the latest numbers.",
    features: [
      { label: "API & webhook development" },
      { label: "CRM & ERP integration" },
      { label: "Data synchronisation pipelines" },
      { label: "Third-party platform connectors" },
    ],
    useCase: {
      mockupId: "system-integration",
      description:
        "A property management company connected their CRM, accounting software, and maintenance portal, eliminating 20 hours of weekly manual data entry.",
    },
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Turn hours of manual work into minutes. We find the bottlenecks and engineer them away.",
    span: "md:col-span-2",
    extendedDescription:
      "We map out your team's repetitive processes and build automated workflows that handle them end-to-end. From approval chains and notifications to document generation and scheduling, we turn manual chores into one-click operations.",
    features: [
      { label: "Business process automation" },
      { label: "Approval & notification workflows" },
      { label: "Automated document generation" },
      { label: "Scheduled task orchestration" },
    ],
    useCase: {
      mockupId: "onboarding-pipeline",
      description:
        "A consulting firm automated their client onboarding process, from contracts and NDAs to access provisioning and welcome emails, reducing onboarding time from 2 days to 10 minutes.",
    },
  },
  {
    icon: Globe,
    title: "Websites",
    description:
      "Fast, beautiful websites that turn visitors into customers. No templates, built from scratch for your brand.",
    span: "md:col-span-2",
    extendedDescription:
      "We design and develop high-performance websites that look exceptional and convert. From landing pages and marketing sites to full e-commerce platforms, every site is custom-built with SEO, speed, and mobile-first design baked in from day one.",
    features: [
      { label: "Custom design & branding" },
      { label: "SEO & performance optimisation" },
      { label: "Mobile-first responsive layouts" },
      { label: "CMS integration & content management" },
    ],
    useCase: {
      mockupId: "website-showcase",
      description:
        "A boutique law firm replaced their outdated template site with a custom-built website, increasing organic enquiries by 140% within three months.",
    },
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

export const COMPANY_SIZE_OPTIONS = [
  { value: "1-5", label: "1–5 employees" },
  { value: "6-15", label: "6–15 employees" },
  { value: "16-50", label: "16–50 employees" },
  { value: "51-100", label: "51–100 employees" },
  { value: "100+", label: "100+ employees" },
];

export const ANNUAL_REVENUE_OPTIONS = [
  { value: "under-100k", label: "Under $100K" },
  { value: "100k-250k", label: "$100K – $250K" },
  { value: "250k-500k", label: "$250K – $500K" },
  { value: "500k-1m", label: "$500K – $1M" },
  { value: "1m+", label: "$1M+" },
];

export const PROJECT_BUDGET_OPTIONS = [
  { value: "under-2k", label: "Under $2K" },
  { value: "2k-5k", label: "$2K – $5K" },
  { value: "5k-10k", label: "$5K – $10K" },
  { value: "10k-25k", label: "$10K – $25K" },
  { value: "25k+", label: "$25K+" },
];

export const SERVICES_INTEREST_OPTIONS = [
  { value: "custom-software", label: "Custom Software" },
  { value: "intelligent-dashboards", label: "Intelligent Dashboards" },
  { value: "ai-solutions", label: "AI Solutions" },
  { value: "system-integration", label: "System Integration" },
  { value: "workflow-automation", label: "Workflow Automation" },
  { value: "websites", label: "Websites" },
  { value: "not-sure", label: "Not sure yet" },
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
