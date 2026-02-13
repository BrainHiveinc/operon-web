import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ChevronRight, ArrowRight, CheckCircle2, Database, FileText,
  Layers, Lock, RefreshCcw, Zap, Code, Settings, Shield, Headphones, Users
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Terminal } from "@/components/Terminal";
import { ValidatorReport } from "@/components/ValidatorReport";
import { FeatureComparison } from "@/components/FeatureComparison";
import { CodePlayground } from "@/components/CodePlayground";
import { AgentWorkflowVisualization } from "@/components/AgentWorkflowVisualization";
import { LogoWithHeartbeat } from "@/components/LogoWithHeartbeat";
import { AgentBoardroomSection } from "@/components/AgentBoardroomSection";
import { BattleTestedSection } from "@/components/BattleTestedSection";
import { BRAND_NAME } from "@/lib/constants";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const architectureSteps = [
  { label: "Mission", icon: Zap, description: "Define the outcome you need" },
  { label: "TaskGraph", icon: Layers, description: "Decompose into executable tasks" },
  { label: "AgentJob", icon: Code, description: "Assign to specialized agents" },
  { label: "Tool Calls", icon: Settings, description: "Execute with full observability" },
  { label: "Validator", icon: CheckCircle2, description: "Verify against your criteria" },
  { label: "Artifacts", icon: FileText, description: "Store audit-ready outputs" },
];

const features = [
  {
    title: "Mission Definition Language",
    description: "Define missions in YAML or JSON with typed parameters, timeout policies, and success criteria.",
    icon: Code,
    code: `mission:
  name: lead_enrichment
  timeout: 300s
  retry:
    max_attempts: 3
    backoff: exponential
  validators:
    - schema_check
    - data_quality`,
  },
  {
    title: "Agent Pool Management",
    description: "Configure agent pools with capacity limits, priority queues, and automatic scaling.",
    icon: Layers,
    code: `agents:
  pool: growth_ops
  capacity: 10
  priority: high
  rate_limit: 100/min
  fallback: support_pool`,
  },
  {
    title: "Custom Validators",
    description: "Write validators in TypeScript with full access to mission context and previous outputs.",
    icon: CheckCircle2,
    code: `export const schemaValidator = {
  name: 'schema_check',
  run: async (output, context) => {
    const valid = await validateSchema(
      output, 
      context.expectedSchema
    );
    return { passed: valid, confidence: 0.98 };
  }
};`,
  },
  {
    title: "Retry Policies",
    description: "Configure sophisticated retry strategies with exponential backoff, jitter, and conditional logic.",
    icon: RefreshCcw,
    code: `retry:
  strategy: exponential
  base_delay: 1000ms
  max_delay: 30s
  jitter: true
  conditions:
    - error: rate_limit
      action: retry
    - error: auth_failed
      action: fail`,
  },
  {
    title: "RAG Context Bundles",
    description: "See exactly which documents informed each decision with full source attribution.",
    icon: Database,
    code: `context:
  bundle_id: ctx_2847_001
  sources:
    - doc: company_data.json
      chunks: [12, 45, 67]
    - doc: enrichment_rules.md
      chunks: [3, 8]
  token_count: 4521`,
  },
  {
    title: "Governance Policies",
    description: "Define permissions, approval workflows, and blast radius controls for sensitive operations.",
    icon: Lock,
    code: `governance:
  permissions:
    - action: crm.update
      requires: admin
  approval:
    - action: bulk_delete
      approvers: [ops_lead]
  blast_radius:
    max_records: 1000`,
  },
];

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="section-container section-padding relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Logo with Heartbeat */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8"
          >
            <LogoWithHeartbeat size="md" clickable={true} showBadge={false} />
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight mb-6">
            Deploy AI agents you can <span className="gradient-text">actually govern</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Run autonomous agents at scale with built-in approval workflows, audit trails,
            and compliance controls. Because ungoverned AI is a liability, not an asset.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gap-2" asChild>
              <Link to="/contact">
                Request access
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <Link to="/heartbeat">
                See how it works
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function GovernedUseCasesSection() {
  const useCases = [
    {
      title: "Compliance Automation",
      industry: "Healthcare & Finance",
      problem: "Manual compliance checks are slow and error-prone",
      solution: "Agents audit transactions 24/7 with approval workflows",
      governance: "Every flagged item requires human review before action",
      icon: Shield,
      color: "emerald"
    },
    {
      title: "Customer Support at Scale",
      industry: "Enterprise SaaS",
      problem: "Support agents overwhelmed, response times suffering",
      solution: "AI handles tier-1 issues, escalates complex cases",
      governance: "All responses validated before sending to customers",
      icon: Headphones,
      color: "blue"
    },
    {
      title: "QA & Test Automation",
      industry: "All Industries",
      problem: "Manual testing slow, regression bugs slip through",
      solution: "Agents run test suites, identify failures, suggest fixes",
      governance: "Test results validated before deployment approval",
      icon: CheckCircle2,
      color: "green"
    },
    {
      title: "Staffing & Recruiting",
      industry: "HR & Talent",
      problem: "Resume screening takes hours, candidates fall through cracks",
      solution: "Agents screen resumes, schedule interviews, send updates",
      governance: "All candidate communications require recruiter approval",
      icon: Users,
      color: "purple"
    },
    {
      title: "Legacy Code Maintenance",
      industry: "All Industries",
      problem: "Old codebases undocumented, maintenance risky",
      solution: "Agents analyze code, suggest refactors, update docs",
      governance: "All code changes reviewed before committing",
      icon: Code,
      color: "indigo"
    },
    {
      title: "Data Processing Pipelines",
      industry: "Analytics & BI",
      problem: "Data quality issues cause downstream failures",
      solution: "Agents validate, transform, and flag anomalies",
      governance: "Validation gates prevent bad data from propagating",
      icon: Database,
      color: "orange"
    }
  ];

  return (
    <section className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            What You Can <span className="gradient-text">Actually Build</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Real-world use cases where governance isn't optional—it's the only way to deploy AI safely.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          {useCases.map((useCase) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={useCase.title}
                variants={item}
                className="glass-card p-6 group hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-${useCase.color}-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 text-${useCase.color}-500`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-lg mb-1">{useCase.title}</h3>
                    <p className="text-xs text-muted-foreground">{useCase.industry}</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-destructive font-medium">Problem:</span>
                    <span className="text-muted-foreground ml-2">{useCase.problem}</span>
                  </div>
                  <div>
                    <span className="text-primary font-medium">Solution:</span>
                    <span className="text-foreground ml-2">{useCase.solution}</span>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <div className="flex items-start gap-2">
                      <Lock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-foreground">Governance:</span>
                        <span className="text-muted-foreground ml-2">{useCase.governance}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button variant="outline" size="lg" className="gap-2" asChild>
            <Link to="/use-cases">
              See all use cases
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function ArchitectureSection() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            The execution pipeline
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every mission flows through a deterministic pipeline with full observability at each step.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {architectureSteps.map((step, index) => (
            <div key={step.label} className="flex items-center">
              <div className="glass-card p-4 text-center min-w-[140px]">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="font-display font-semibold text-sm mb-1">{step.label}</p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
              {index < architectureSteps.length - 1 && (
                <ArrowRight className="w-5 h-5 text-muted-foreground mx-2 hidden md:block" />
              )}
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Terminal />
        </motion.div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Every primitive you need
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Configure missions with declarative YAML, write custom validators in TypeScript, 
            and set governance policies that scale.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={item}
              className={`grid lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-semibold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
              </div>
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="terminal">
                  <div className="terminal-header">
                    <div className="terminal-dot bg-destructive" />
                    <div className="terminal-dot bg-warning" />
                    <div className="terminal-dot bg-success" />
                  </div>
                  <div className="terminal-body">
                    <pre className="text-sm text-muted-foreground">
                      <code>{feature.code}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ValidatorSection() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Validator reports with full evidence
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every mission generates a comprehensive validator report with inputs, steps,
            tool calls, evidence links, and retry history.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
        >
          <ValidatorReport />
        </motion.div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Not just another AI platform
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how {BRAND_NAME} compares to traditional AI and frameworks.
            Toggle categories to filter features.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <FeatureComparison />
        </motion.div>
      </div>
    </section>
  );
}

function PlaygroundSection() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Try it yourself
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Edit and run live examples to see how {BRAND_NAME} works.
            Experiment with missions, validators, and policies.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <CodePlayground />
        </motion.div>
      </div>
    </section>
  );
}

function NetworkSection() {
  return (
    <section className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Watch governance in action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how missions flow through validation, execution, and audit at every step.
            Real-time observability for every agent action.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <AgentWorkflowVisualization />
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12 text-center"
        >
          <Shield className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
            Ready to run governed AI?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Get started with {BRAND_NAME} and ship your first mission in under 30 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gap-2" asChild>
              <Link to="/contact">
                Request access
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/how-it-works">See how it works</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function ProductPage() {
  return (
    <Layout>
      <HeroSection />
      <GovernedUseCasesSection />
      <ArchitectureSection />
      <NetworkSection />
      <AgentBoardroomSection />
      <BattleTestedSection />
      <ComparisonSection />
      <PlaygroundSection />
      <FeaturesSection />
      <ValidatorSection />
      <CTASection />
    </Layout>
  );
}
