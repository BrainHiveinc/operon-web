export const BRAND_NAME = "Operon OS";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Product" },
  { href: "/heartbeat", label: "Heartbeat" },
  { href: "/agent-marketplace", label: "Agents" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/docs", label: "Docs" },
  { href: "/contact", label: "Get Started" },
];

export const FOOTER_LINKS = {
  product: [
    { href: "/product", label: "Features" },
    { href: "/how-it-works", label: "How it works" },
    { href: "/use-cases", label: "Use cases" },
    { href: "/pricing", label: "Pricing" },
    { href: "/changelog", label: "Changelog" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
    { href: "/security", label: "Security" },
  ],
  resources: [
    { href: "/docs", label: "Documentation" },
    { href: "/changelog", label: "Changelog" },
    { href: "https://github.com", label: "GitHub" },
    { href: "https://twitter.com", label: "Twitter" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
};

export const METRICS = [
  { value: "200+", label: "Concurrent missions" },
  { value: "0", label: "Silent failures" },
  { value: "1000+", label: "Target capacity" },
];

export const PAIN_POINTS = [
  {
    title: "Agents fail silently",
    description: "No alerts. No logs. You only discover failures when customers complain.",
    icon: "AlertTriangle",
  },
  {
    title: "No deterministic validation",
    description: "Outputs are checked manually—or not at all. Quality is a gamble.",
    icon: "XCircle",
  },
  {
    title: 'No "who owns failure?"',
    description: "When things break, there's no clear accountability chain or retry logic.",
    icon: "HelpCircle",
  },
  {
    title: "No governance or blast radius",
    description: "Agents can touch anything. One bad prompt can cause cascading damage.",
    icon: "Shield",
  },
];

export const CAPABILITIES = [
  {
    title: "Mission runner & queue",
    description: "Launch thousands of concurrent missions with priority queuing, rate limiting, and dependency management.",
    icon: "Layers",
  },
  {
    title: "Deterministic validators",
    description: "Define pass/fail criteria before execution. Every output is validated against your rules.",
    icon: "CheckCircle2",
  },
  {
    title: "Retries + backoff policies",
    description: "Automatic retries with exponential backoff. Configure max attempts, delays, and fallback behaviors.",
    icon: "RefreshCcw",
  },
  {
    title: "Audit logs & artifacts",
    description: "Every tool call, decision, and output is logged. Export compliance-ready audit trails.",
    icon: "FileText",
  },
  {
    title: "RAG traceability",
    description: "See exactly which sources informed each decision. Full context bundles for every run.",
    icon: "Database",
  },
  {
    title: "Governance & permissions",
    description: "Scope what agents can access. Approval workflows for high-risk actions. Blast radius control.",
    icon: "Lock",
  },
];

export const USE_CASES = [
  {
    title: "Growth ops automation",
    description: "Automate lead scoring, outreach sequencing, and attribution tracking with validated outputs.",
    icon: "TrendingUp",
  },
  {
    title: "Support triage & resolution",
    description: "Draft responses, categorize tickets, and escalate edge cases—all with human-in-the-loop validation.",
    icon: "Headphones",
  },
  {
    title: "Data QA & reporting",
    description: "Validate data pipelines, generate reports, and catch anomalies before they reach stakeholders.",
    icon: "BarChart3",
  },
  {
    title: "DevOps runbooks",
    description: "Execute incident response playbooks with approval gates and automatic rollback capabilities.",
    icon: "Terminal",
  },
  {
    title: "FinOps cost management",
    description: "Monitor cloud spend, detect anomalies, and execute cost-saving actions with governance guardrails.",
    icon: "DollarSign",
  },
  {
    title: "Sales research → CRM",
    description: "Enrich leads, update CRM fields, and maintain data hygiene with traceable source attribution.",
    icon: "Users",
  },
];

export const TESTIMONIALS = [
  {
    quote: "We went from manually reviewing every AI output to trusting validated missions. The audit trail alone justified the investment.",
    author: "Sarah Chen",
    role: "VP of Operations",
    company: "ScaleFlow",
    avatar: "SC",
  },
  {
    quote: "Finally, an AI platform that treats governance as a feature, not an afterthought. Our compliance team actually approves of our automation now.",
    author: "Marcus Rodriguez",
    role: "CTO",
    company: "FinanceAI",
    avatar: "MR",
  },
  {
    quote: "The retry semantics and validator reports saved us from three potential data disasters in the first month. Zero silent failures is real.",
    author: "Emily Watson",
    role: "Head of Data",
    company: "DataCore",
    avatar: "EW",
  },
];

export const COMPARISON_DATA = {
  headers: ["Feature", "Operon OS", "Chatbots", "Agent Frameworks"],
  rows: [
    { feature: "Long-running missions", nexus: true, chatbots: false, frameworks: "Partial" },
    { feature: "Outcome ownership", nexus: true, chatbots: false, frameworks: false },
    { feature: "Deterministic validation", nexus: true, chatbots: false, frameworks: false },
    { feature: "Retry semantics", nexus: true, chatbots: false, frameworks: "Partial" },
    { feature: "Audit-grade artifacts", nexus: true, chatbots: false, frameworks: false },
    { feature: "RAG traceability", nexus: true, chatbots: false, frameworks: "Partial" },
    { feature: "Governance + blast radius", nexus: true, chatbots: false, frameworks: false },
    { feature: "Multi-agent orchestration", nexus: true, chatbots: false, frameworks: "Partial" },
    { feature: "Autonomous workforce", nexus: true, chatbots: false, frameworks: false },
  ],
};

export const PRICING_TIERS = [
  {
    name: "Starter",
    description: "For solo builders and small teams",
    price: "$49",
    period: "/month",
    features: [
      "1,000 missions/month",
      "5 concurrent agents",
      "Basic validators",
      "7-day log retention",
      "Community support",
      "Email notifications",
    ],
    cta: "Start free trial",
    popular: false,
  },
  {
    name: "Team",
    description: "For growing teams with production workloads",
    price: "$299",
    period: "/month",
    features: [
      "25,000 missions/month",
      "25 concurrent agents",
      "Custom validators",
      "90-day log retention",
      "Priority support",
      "Slack integration",
      "API access",
      "Team permissions",
    ],
    cta: "Start free trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For organizations requiring governance at scale",
    price: "Custom",
    period: "",
    features: [
      "Unlimited missions",
      "Unlimited agents",
      "Advanced validators + AI",
      "Unlimited log retention",
      "24/7 dedicated support",
      "SSO + SAML",
      "Custom integrations",
      "Approval workflows",
      "Compliance exports",
      "SLA guarantee",
    ],
    cta: "Contact sales",
    popular: false,
  },
];

export const TERMINAL_LOGS = [
  { time: "14:32:01", level: "info", message: "Mission #2847 initialized → growth_ops/lead_enrichment" },
  { time: "14:32:01", level: "info", message: "Agent pool: 3 available, 2 assigned" },
  { time: "14:32:02", level: "success", message: "TaskGraph compiled: 12 tasks, 4 parallel branches" },
  { time: "14:32:03", level: "info", message: "Tool call: clearbit.enrich_company (apollo.io)" },
  { time: "14:32:04", level: "success", message: "Validator passed: schema_check (confidence: 0.98)" },
  { time: "14:32:05", level: "warn", message: "Retry #1: rate_limit_exceeded, backoff: 2000ms" },
  { time: "14:32:07", level: "success", message: "Tool call: clearbit.enrich_company → 200 OK" },
  { time: "14:32:08", level: "success", message: "Validator passed: data_quality_check (15/15 fields)" },
  { time: "14:32:09", level: "info", message: "Artifact saved: /missions/2847/outputs/enriched.json" },
  { time: "14:32:10", level: "success", message: "Mission #2847 COMPLETED in 9.2s (all validators passed)" },
];

export const MISSION_TIMELINE = [
  { status: "completed", name: "Lead enrichment batch #1", time: "2m ago", tasks: "12/12" },
  { status: "running", name: "CRM sync pipeline", time: "now", tasks: "7/15" },
  { status: "retrying", name: "Email verification job", time: "now", tasks: "3/8" },
  { status: "blocked", name: "Slack notification", time: "pending", tasks: "0/3" },
  { status: "queued", name: "Weekly report generation", time: "in 5m", tasks: "0/20" },
];

export const CHANGELOG_ENTRIES = [
  {
    version: "2.4.0",
    date: "2024-01-15",
    title: "Enhanced RAG Traceability",
    description: "Full source attribution for every context bundle. See exactly which documents informed each decision.",
    type: "feature",
  },
  {
    version: "2.3.2",
    date: "2024-01-10",
    title: "Performance Improvements",
    description: "Mission queue processing is now 40% faster. Reduced cold start times for agents.",
    type: "improvement",
  },
  {
    version: "2.3.1",
    date: "2024-01-08",
    title: "Bug Fix: Retry Logic",
    description: "Fixed an edge case where exponential backoff could exceed configured limits.",
    type: "fix",
  },
  {
    version: "2.3.0",
    date: "2024-01-05",
    title: "Approval Workflows",
    description: "Define human-in-the-loop gates for high-risk actions. Slack and email notifications included.",
    type: "feature",
  },
  {
    version: "2.2.0",
    date: "2023-12-20",
    title: "Custom Validator SDK",
    description: "Build validators in TypeScript. Full access to mission context and previous outputs.",
    type: "feature",
  },
];

export const TEAM_MEMBERS = [
  {
    name: "Alex Rivera",
    role: "CEO & Co-founder",
    bio: "Previously VP Eng at Stripe. Built payment infrastructure serving millions of merchants.",
    avatar: "AR",
  },
  {
    name: "Jordan Kim",
    role: "CTO & Co-founder",
    bio: "Ex-Google AI researcher. Led autonomous systems at Waymo for 5 years.",
    avatar: "JK",
  },
  {
    name: "Sam Patel",
    role: "Head of Product",
    bio: "Product leader at Linear and Notion. Obsessed with developer experience.",
    avatar: "SP",
  },
  {
    name: "Casey Chen",
    role: "Head of Engineering",
    bio: "Staff engineer at Meta. Built distributed systems handling billions of events.",
    avatar: "CC",
  },
];

export const JOB_OPENINGS = [
  {
    title: "Senior Backend Engineer",
    team: "Platform",
    location: "Remote (US/EU)",
    type: "Full-time",
  },
  {
    title: "Staff Frontend Engineer",
    team: "Product",
    location: "San Francisco, CA",
    type: "Full-time",
  },
  {
    title: "Developer Advocate",
    team: "Developer Relations",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Solutions Engineer",
    team: "Sales",
    location: "New York, NY",
    type: "Full-time",
  },
];

export const SECURITY_CERTIFICATIONS = [
  { name: "SOC 2 Type II", status: "Certified", icon: "Shield" },
  { name: "GDPR Compliant", status: "Compliant", icon: "Lock" },
  { name: "HIPAA Ready", status: "Available", icon: "FileCheck" },
  { name: "ISO 27001", status: "In Progress", icon: "Award" },
];

// Multi-Agent Workforce Features
export const AGENT_TYPES = [
  {
    id: "data-analyst",
    name: "Data Analyst Agent",
    description: "Autonomous data processing, analysis, and insight generation with real-time validation.",
    capabilities: ["SQL queries", "Data cleaning", "Report generation", "Anomaly detection"],
    industry: "Enterprise",
    price: "$0.08/task",
    performance: "99.2% accuracy",
    icon: "BarChart3",
    status: "active",
  },
  {
    id: "customer-service",
    name: "Customer Service Agent",
    description: "24/7 intelligent customer support with sentiment analysis and escalation protocols.",
    capabilities: ["Ticket triage", "Response drafting", "Sentiment analysis", "Escalation routing"],
    industry: "Retail",
    price: "$0.05/interaction",
    performance: "94% CSAT",
    icon: "Headphones",
    status: "active",
  },
  {
    id: "inventory-optimizer",
    name: "Inventory Optimizer",
    description: "Real-time stock level monitoring, demand forecasting, and automated reordering.",
    capabilities: ["Demand forecasting", "Stock alerts", "Auto-reordering", "Supplier coordination"],
    industry: "Retail",
    price: "$0.12/SKU/day",
    performance: "30% waste reduction",
    icon: "Package",
    status: "active",
  },
  {
    id: "security-monitor",
    name: "Security Monitor Agent",
    description: "Continuous threat detection, vulnerability scanning, and incident response automation.",
    capabilities: ["Threat detection", "Log analysis", "Incident response", "Compliance checks"],
    industry: "Enterprise",
    price: "$0.15/event",
    performance: "99.9% uptime",
    icon: "Shield",
    status: "active",
  },
  {
    id: "sales-researcher",
    name: "Sales Research Agent",
    description: "Automated lead enrichment, market research, and competitive intelligence gathering.",
    capabilities: ["Lead enrichment", "Market analysis", "Competitor tracking", "CRM sync"],
    industry: "Enterprise",
    price: "$0.10/lead",
    performance: "5hrs saved/rep/week",
    icon: "TrendingUp",
    status: "active",
  },
  {
    id: "price-optimizer",
    name: "Dynamic Pricing Agent",
    description: "AI-powered price optimization based on demand, competition, and inventory levels.",
    capabilities: ["Price optimization", "Competitor monitoring", "Demand analysis", "A/B testing"],
    industry: "Retail",
    price: "$0.06/SKU/day",
    performance: "18% margin increase",
    icon: "DollarSign",
    status: "beta",
  },
];

// Retail-Specific Use Cases
export const RETAIL_USE_CASES = [
  {
    title: "Autonomous Inventory Management",
    description: "Multi-agent system monitors stock levels, predicts demand, and automatically reorders across all locations.",
    metrics: { roi: "340%", time_saved: "25hrs/week", accuracy: "98%" },
    agents_used: ["inventory-optimizer", "data-analyst"],
    icon: "Package",
  },
  {
    title: "Intelligent Customer Support",
    description: "Agent workforce handles inquiries 24/7, escalates complex issues, and learns from every interaction.",
    metrics: { roi: "280%", response_time: "-85%", csat: "94%" },
    agents_used: ["customer-service"],
    icon: "MessageSquare",
  },
  {
    title: "Dynamic Pricing & Promotions",
    description: "Real-time price optimization across channels based on inventory, demand, and competitor pricing.",
    metrics: { roi: "520%", margin_increase: "18%", sales_lift: "23%" },
    agents_used: ["price-optimizer", "data-analyst"],
    icon: "TrendingUp",
  },
  {
    title: "Personalized Marketing Campaigns",
    description: "Agent analyzes customer behavior, segments audiences, and generates personalized campaigns automatically.",
    metrics: { roi: "410%", conversion_rate: "+45%", engagement: "+62%" },
    agents_used: ["data-analyst", "sales-researcher"],
    icon: "Target",
  },
];

// Enterprise Use Cases
export const ENTERPRISE_USE_CASES = [
  {
    title: "Autonomous Security Operations",
    description: "Multi-agent SOC monitors threats 24/7, responds to incidents, and maintains compliance automatically.",
    metrics: { roi: "450%", mttr: "-60%", false_positives: "-75%" },
    agents_used: ["security-monitor", "data-analyst"],
    icon: "Shield",
  },
  {
    title: "Intelligent Data Pipeline",
    description: "Agent workforce validates, transforms, and routes data while detecting anomalies in real-time.",
    metrics: { roi: "380%", data_quality: "99.9%", processing_time: "-70%" },
    agents_used: ["data-analyst"],
    icon: "Database",
  },
  {
    title: "Automated Sales Operations",
    description: "Agents enrich leads, update CRM, schedule meetings, and generate insights for sales teams.",
    metrics: { roi: "620%", pipeline_growth: "+35%", time_saved: "8hrs/rep/week" },
    agents_used: ["sales-researcher", "data-analyst"],
    icon: "Users",
  },
  {
    title: "DevOps Automation",
    description: "Multi-agent system handles deployments, monitors performance, and executes runbooks autonomously.",
    metrics: { roi: "490%", deployment_frequency: "+300%", mttr: "-65%" },
    agents_used: ["security-monitor"],
    icon: "Terminal",
  },
];

// Agent Orchestration Metrics
export const ORCHESTRATION_METRICS = [
  { label: "Active Agents", value: "1,247", change: "+18%", trend: "up" },
  { label: "Tasks Completed Today", value: "45.2K", change: "+12%", trend: "up" },
  { label: "Avg Response Time", value: "1.2s", change: "-23%", trend: "down" },
  { label: "Success Rate", value: "99.4%", change: "+0.3%", trend: "up" },
  { label: "Cost Savings", value: "$142K", change: "+28%", trend: "up" },
  { label: "Agent Utilization", value: "87%", change: "+5%", trend: "up" },
];
