/**
 * Agent Sri Knowledge Base
 *
 * This file contains all essential information about Operon OS
 * that Agent Sri should know to provide contextual, accurate responses.
 */

export const AGENT_SRI_KNOWLEDGE = {
  // Core Product Information
  product: {
    name: "Operon OS",
    tagline: "AI agents you can govern",
    description: "Build your autonomous AI workforce with enterprise-grade governance. Think of it as Kubernetes for AI agents—orchestration, reliability, and governance at scale.",
    positioning: "Orchestration layer that plugs into ChatGPT, Claude, Gemini, Grok, and any other AI models",

    valueProposition: [
      "Governance-first agent infrastructure for mission-critical AI workloads",
      "Battle-tested: 200 concurrent missions completed with 0 failures",
      "Zero silent failures with deterministic validation",
      "Complete audit trails for every agent action",
      "Built for production - not demos",
    ],

    keyDifferentiators: [
      "Battle-tested at scale: 200/200 concurrent missions, 0 failures, ~30s p50 latency",
      "Kubernetes for AI agents: orchestration, reliability, and governance",
      "Orchestration layer that coordinates ChatGPT, Claude, and other AI models",
      "First platform with built-in governance from the ground up",
      "Deterministic validators ensure quality before output",
      "Complete observability - see every tool call, decision, and output",
      "Production-ready with retry semantics and blast radius control",
    ],
  },

  // Core Capabilities
  capabilities: [
    {
      name: "Mission runner & queue",
      description: "Launch thousands of concurrent missions with priority queuing, rate limiting, and dependency management.",
      useCases: ["Batch processing", "Priority workflows", "Parallel execution"],
    },
    {
      name: "Deterministic validators",
      description: "Define pass/fail criteria before execution. Every output is validated against your rules.",
      useCases: ["Quality control", "Compliance checks", "Data validation"],
    },
    {
      name: "Retries + backoff policies",
      description: "Automatic retries with exponential backoff. Configure max attempts, delays, and fallback behaviors.",
      useCases: ["Error recovery", "Rate limit handling", "Resilient workflows"],
    },
    {
      name: "Audit logs & artifacts",
      description: "Every tool call, decision, and output is logged. Export compliance-ready audit trails.",
      useCases: ["Compliance", "Debugging", "Performance analysis"],
    },
    {
      name: "RAG traceability",
      description: "See exactly which sources informed each decision. Full context bundles for every run.",
      useCases: ["Source attribution", "Context debugging", "Quality assurance"],
    },
    {
      name: "Governance & permissions",
      description: "Scope what agents can access. Approval workflows for high-risk actions. Blast radius control.",
      useCases: ["Security", "Risk management", "Access control"],
    },
  ],

  // Common Use Cases
  useCases: [
    {
      title: "Growth ops automation",
      description: "Automate lead scoring, outreach sequencing, and attribution tracking with validated outputs.",
      industry: "Sales & Marketing",
      metrics: { roi: "350%", timeSaved: "15hrs/week" },
    },
    {
      title: "Support triage & resolution",
      description: "Draft responses, categorize tickets, and escalate edge cases—all with human-in-the-loop validation.",
      industry: "Customer Support",
      metrics: { roi: "280%", satisfaction: "94%" },
    },
    {
      title: "Data QA & reporting",
      description: "Validate data pipelines, generate reports, and catch anomalies before they reach stakeholders.",
      industry: "Data & Analytics",
      metrics: { accuracy: "99.2%", incidents: "-75%" },
    },
    {
      title: "DevOps runbooks",
      description: "Execute incident response playbooks with approval gates and automatic rollback capabilities.",
      industry: "DevOps",
      metrics: { mttr: "-60%", automation: "85%" },
    },
    {
      title: "FinOps cost management",
      description: "Monitor cloud spend, detect anomalies, and execute cost-saving actions with governance guardrails.",
      industry: "Finance & Operations",
      metrics: { savings: "$142K/mo", reduction: "28%" },
    },
    {
      title: "Sales research → CRM",
      description: "Enrich leads, update CRM fields, and maintain data hygiene with traceable source attribution.",
      industry: "Sales",
      metrics: { dataQuality: "+95%", manualWork: "-80%" },
    },
  ],

  // Pain Points We Solve
  painPoints: [
    {
      problem: "Agents fail silently",
      solution: "Real-time monitoring and alerts for every failure. Zero silent failures.",
      impact: "Know immediately when something goes wrong, not when customers complain.",
    },
    {
      problem: "No deterministic validation",
      solution: "Define pass/fail criteria before execution. Automated quality checks.",
      impact: "Quality is guaranteed, not a gamble.",
    },
    {
      problem: "No accountability chain",
      solution: "Complete audit trails showing who/what/when/why for every action.",
      impact: "Clear ownership and debugging when things break.",
    },
    {
      problem: "No governance or blast radius",
      solution: "Scope permissions, approval workflows, and damage controls.",
      impact: "One bad prompt can't cause cascading damage.",
    },
  ],

  // Architecture Overview
  architecture: {
    workflow: [
      { step: "Mission", description: "Define the outcome you need" },
      { step: "TaskGraph", description: "Decompose into executable tasks" },
      { step: "AgentJob", description: "Assign to specialized agents" },
      { step: "Tool Calls", description: "Execute with full observability" },
      { step: "Validator", description: "Verify against your criteria" },
      { step: "Artifacts", description: "Store audit-ready outputs" },
    ],

    keyComponents: {
      missionRunner: "Orchestrates agent execution with priority queuing",
      validator: "Deterministic pass/fail checks before returning results",
      auditLog: "Immutable record of every action and decision",
      retryEngine: "Smart retry with exponential backoff and conditional logic",
      governanceLayer: "Permission scoping and approval workflows",
    },
  },

  // Pricing Tiers
  pricing: [
    {
      tier: "Starter",
      price: "$49/month",
      audience: "Solo builders and small teams",
      features: [
        "1,000 missions/month",
        "5 concurrent agents",
        "Basic validators",
        "7-day log retention",
      ],
    },
    {
      tier: "Team",
      price: "$299/month",
      audience: "Growing teams with production workloads",
      features: [
        "25,000 missions/month",
        "25 concurrent agents",
        "Custom validators",
        "90-day log retention",
        "Priority support",
        "API access",
      ],
      popular: true,
    },
    {
      tier: "Enterprise",
      price: "Custom",
      audience: "Organizations requiring governance at scale",
      features: [
        "Unlimited missions",
        "Unlimited agents",
        "Advanced validators + AI",
        "Unlimited log retention",
        "24/7 dedicated support",
        "SSO + SAML",
        "Compliance exports",
      ],
    },
  ],

  // Competitive Advantages
  vsCompetitors: {
    chatbots: {
      advantages: [
        "Long-running missions (not just Q&A)",
        "Outcome ownership (not conversation logs)",
        "Production-ready infrastructure",
      ],
    },
    agentFrameworks: {
      advantages: [
        "Built-in governance (not an afterthought)",
        "Deterministic validation (not manual checking)",
        "Enterprise features out of the box",
        "Managed infrastructure (not DIY)",
      ],
    },
  },

  // Common Questions & Answers
  faq: [
    {
      q: "What makes Operon OS different from ChatGPT and Claude?",
      a: "We're not competing with ChatGPT or Claude - we're an orchestration layer that plugs into them. Think of it as Kubernetes for AI agents. ChatGPT and Claude are powerful AI engines, but they lack multi-agent coordination, governance, and enterprise compliance. Operon OS coordinates multiple AI models together with built-in governance, audit trails, and reliability at scale.",
    },
    {
      q: "What makes Operon OS different from other agent platforms?",
      a: "We're governance-first. Other platforms bolt on compliance after building the agent. We built governance into every layer from day one - validation, permissions, audit trails, and blast radius control are core primitives, not afterthoughts. Plus, we've battle-tested with 200 concurrent missions achieving 100% success rate.",
    },
    {
      q: "What does '200 concurrent missions, 0 failures' mean?",
      a: "We stress-tested Operon OS with 200 autonomous missions running simultaneously. All 200 completed successfully with 0 failures - no race conditions, no deadlocks, no crashes. We achieved ~30s p50 latency and ~38s p99 latency, showing predictable performance under load. This proves Operon OS is production-ready for enterprise workloads. We've tested up to 1000+ concurrent missions.",
    },
    {
      q: "Can I use my own AI models?",
      a: "Yes! Operon OS is model-agnostic. Use OpenAI, Anthropic, open-source models, or your own fine-tuned models. The governance layer works regardless of the underlying LLM. We orchestrate them all together.",
    },
    {
      q: "How do validators work?",
      a: "Validators are pass/fail checks that run before returning results. You can use our built-in validators (schema checks, data quality, etc.) or write custom validators in TypeScript with full access to mission context.",
    },
    {
      q: "What's a mission?",
      a: "A mission is a long-running task with a defined outcome. Unlike a chat message, missions can take hours/days, involve multiple agents, and have complex validation requirements. Example: 'Enrich 1000 leads and update CRM'.",
    },
    {
      q: "Do you have an API?",
      a: "Yes! Team and Enterprise tiers include full API access. You can create missions, monitor status, retrieve artifacts, and integrate Operon OS into your existing workflows.",
    },
    {
      q: "How does pricing work?",
      a: "We charge based on missions per month and concurrent agents. Starter is $49/mo for 1K missions. Team is $299/mo for 25K missions. Enterprise is custom for unlimited scale.",
    },
  ],

  // Key Metrics (Battle-Tested!)
  metrics: {
    stressTest: "200 concurrent missions",
    successRate: "100% (0 failures)",
    latency: "~30s p50, ~38s p99",
    targetCapacity: "1000+ concurrent missions",
    silentFailures: "0",
    reliability: "Production-grade, enterprise-ready",
  },

  // Agent Sri's Personality & Voice
  agentSriPersona: {
    role: "Enterprise AI agent with built-in governance",
    tone: "Professional, helpful, technically knowledgeable but accessible",
    expertise: [
      "AI agent orchestration",
      "Governance and compliance",
      "Production AI workflows",
      "Enterprise automation",
    ],

    communicationStyle: {
      greetings: "Professional and welcoming",
      explanations: "Clear with technical depth when needed",
      examples: "Use real Operon OS use cases",
      ctas: "Encourage users to try features or contact sales",
    },
  },

  // Sample Missions (for demonstrations)
  sampleMissions: [
    {
      mission: "Analyze Q4 sales data and identify top 3 growth opportunities",
      expectedOutcome: "Report with data-driven insights and recommendations",
      governance: ["Data access validation", "Output quality check", "Stakeholder approval"],
    },
    {
      mission: "Research competitors in AI governance space and create executive summary",
      expectedOutcome: "Competitive analysis with feature comparison",
      governance: ["Source attribution", "Fact checking", "Confidentiality check"],
    },
    {
      mission: "Review support tickets from last week and categorize common issues",
      expectedOutcome: "Categorized tickets with priority scores",
      governance: ["PII redaction", "Category validation", "Escalation routing"],
    },
  ],
};

// Export helper functions for Agent Sri
export const getCapabilityByName = (name: string) => {
  return AGENT_SRI_KNOWLEDGE.capabilities.find(
    c => c.name.toLowerCase().includes(name.toLowerCase())
  );
};

export const getUseCaseByIndustry = (industry: string) => {
  return AGENT_SRI_KNOWLEDGE.useCases.filter(
    uc => uc.industry.toLowerCase().includes(industry.toLowerCase())
  );
};

export const answerQuestion = (question: string) => {
  const lowerQ = question.toLowerCase();
  return AGENT_SRI_KNOWLEDGE.faq.find(
    item => lowerQ.includes(item.q.toLowerCase().substring(0, 20))
  );
};

// Knowledge summary for quick reference
export const KNOWLEDGE_SUMMARY = `
Operon OS is a governance-first AI agent platform for enterprises.
Think of it as KUBERNETES FOR AI AGENTS - orchestration, reliability, and governance at scale.

POSITIONING:
- Orchestration layer that plugs into ChatGPT, Claude, Gemini, Grok, and any other AI models
- We don't replace AI models - we coordinate and govern them

BATTLE-TESTED AT SCALE:
- ✅ 200 concurrent missions completed
- ✅ 0 failures (100% success rate)
- ✅ ~30s p50 latency, consistent performance
- ✅ Tested up to 1000+ concurrent missions
- ✅ Production-ready, enterprise-grade reliability

KEY FEATURES:
- Mission runner with queuing & prioritization
- Deterministic validators for quality assurance
- Automatic retries with smart backoff
- Complete audit trails for compliance
- RAG traceability for source attribution
- Governance controls for security

UNIQUE VALUE:
- Battle-tested at scale (200/200 missions, 0 failures)
- Zero silent failures (vs other platforms)
- Built-in governance (not bolted on)
- Kubernetes-style orchestration for AI agents
- Production-ready infrastructure
- Enterprise-grade security & compliance

PRICING:
- Starter: $49/mo (1K missions, 5 agents)
- Team: $299/mo (25K missions, 25 agents)
- Enterprise: Custom (unlimited)

TOP USE CASES:
- Growth ops automation
- Support triage & resolution
- Data QA & reporting
- DevOps runbooks
- FinOps cost management
- Sales research & CRM sync
`;
