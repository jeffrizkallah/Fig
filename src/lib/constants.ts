import {
  Code2,
  BarChart3,
  BrainCircuit,
  Globe,
  Link2,
  Workflow,
  MessageCircle,
  Search,
  Wrench,
  GraduationCap,
  LifeBuoy,
  Zap,
  ArrowRight,
  Users,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export const NAV_ITEMS = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "FAQ", href: "#faq" },
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
  icon: LucideIcon;
  /** How long this step usually takes */
  when: string;
  /** What the client has in hand at the end of it */
  deliverable: string;
  /** Photo shown while this step is active, under /public */
  image: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Chat",
    icon: MessageCircle,
    description:
      "A real conversation, not a sales call. What you do, what's slow, and what's quietly driving your team mad. We'll tell you honestly whether we can help.",
    when: "Week 1",
    deliverable: "A 30-minute call, then a one-page summary of what we heard.",
    image: "/process/01-chat-v3.jpg",
  },
  {
    number: "02",
    title: "Audit",
    icon: Search,
    description:
      "We follow the work. Where it stalls, where it's typed twice, where it sits in someone's inbox. Then we show you the handful of things worth building — and the ones that aren't.",
    when: "Weeks 1–2",
    deliverable: "A written audit with a prioritised list of what to fix first.",
    image: "/process/02-audit-v3.jpg",
  },
  {
    number: "03",
    title: "Build",
    icon: Wrench,
    description:
      "Then we build it. Properly, around the systems you already use. You'll see something working in weeks, not at the end.",
    when: "Weeks 3–10",
    deliverable: "Working software, in your hands every week, not at the end.",
    image: "/process/03-build-v3.jpg",
  },
  {
    number: "04",
    title: "Train",
    icon: GraduationCap,
    description:
      "We sit with your team until it clicks. No 40-page manual nobody reads. By the end they're not using a new tool — they're just working.",
    when: "Final week",
    deliverable: "Confident people and a manual they will actually open.",
    image: "/process/04-train-v3.jpg",
  },
  {
    number: "05",
    title: "Support",
    icon: LifeBuoy,
    description:
      "We don't hand it over and vanish. We stay, fix what needs fixing, and keep improving it as the business changes.",
    when: "Ongoing",
    deliverable: "A direct line to us and a monthly check-in.",
    image: "/process/05-support-v3.jpg",
  },
];

export interface Differentiator {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const DIFFERENTIATORS: Differentiator[] = [
  {
    title: "We take work away",
    icon: Zap,
    description:
      "Every tool we build has one job: give your team back hours they're currently losing. If it adds a step, we've built it wrong.",
  },
  {
    title: "No handover, no vanishing act",
    icon: ArrowRight,
    description:
      "We're not consultants who leave you a strategy deck. We build it, and we're still here after it launches.",
  },
  {
    title: "Your team gets faster. Nobody gets replaced.",
    icon: Users,
    description:
      "We build tools that take the boring half of the job, so your people can be better at the half that actually matters.",
  },
  {
    title: "The right tool, not the trendy one",
    icon: TrendingUp,
    description:
      "We'd rather talk you out of something than sell you a system you don't need. If it doesn't save you real hours, we shouldn't be building it.",
  },
];
