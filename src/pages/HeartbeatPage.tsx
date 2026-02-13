import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Activity, ArrowRight, CheckCircle2, Clock, Shield, FileText,
  Lock, RefreshCw, Zap, AlertTriangle, Code, GitBranch,
  Target, Eye, Database, ChevronRight, Users, PlayCircle
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { LogoWithHeartbeat } from "@/components/LogoWithHeartbeat";
import { HeartbeatLiveAnimation } from "@/components/HeartbeatLiveAnimation";
import { BRAND_NAME } from "@/lib/constants";
import { useState } from "react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

// LifecyclePhases matching the actual code
const lifecyclePhases = [
  {
    status: "pending",
    icon: FileText,
    label: "Propose",
    description: "Agent suggests a task",
    color: "blue",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30"
  },
  {
    status: "approved",
    icon: Clock,
    label: "Approve",
    description: "Approved with grace period",
    color: "yellow",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30"
  },
  {
    status: "executing",
    icon: Zap,
    label: "Execute",
    description: "Running in sandbox",
    color: "purple",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30"
  },
  {
    status: "validating",
    icon: Shield,
    label: "Validate",
    description: "Verify governance rules",
    color: "orange",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30"
  },
  {
    status: "completed",
    icon: CheckCircle2,
    label: "Complete",
    description: "Approved & logged",
    color: "emerald",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30"
  }
];

const governanceControls = [
  {
    icon: Shield,
    title: "Approval Required",
    description: "Every proposal needs explicit human approval before execution",
    color: "text-blue-500"
  },
  {
    icon: Clock,
    title: "Grace Periods",
    description: "Configurable time window for revoking approvals before execution",
    color: "text-purple-500"
  },
  {
    icon: Lock,
    title: "Revocation Windows",
    description: "Control when and how proposals can be stopped or rolled back",
    color: "text-orange-500"
  },
  {
    icon: Eye,
    title: "Audit Trails",
    description: "Append-only JSONL logs capture every state transition forever",
    color: "text-emerald-500"
  },
  {
    icon: RefreshCw,
    title: "Toggle Throttling",
    description: "Prevents flip-flopping with configurable limits on approve/revoke cycles",
    color: "text-red-500"
  },
  {
    icon: Database,
    title: "Execution Metadata",
    description: "Full capture of stdout, stderr, artifacts, exit codes, and duration",
    color: "text-indigo-500"
  }
];

function HeroSection() {
  return (
    <section className="relative overflow-hidden section-padding bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="absolute inset-0 bg-hero-glow opacity-40" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Pulsating Operon Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <LogoWithHeartbeat size="lg" clickable={false} showBadge={false} active={true} />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
          >
            <Activity className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">The {BRAND_NAME} Governance Engine</span>
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
            <span className="gradient-text">Heartbeat Framework</span>
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl text-foreground mb-4 font-medium">
            How AI agents work like a project manager
          </p>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Humans use Scrum & Agile for collaboration.
            <br />
            <span className="text-foreground font-semibold">Agents use Heartbeat</span> for structured autonomous execution with built-in governance.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2 glow" asChild>
              <Link to="/product">
                <PlayCircle className="w-5 h-5" />
                See it in action
                <ChevronRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <Link to="/contact">Request access</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function LifecycleSection() {
  const [activePhase, setActivePhase] = useState(0);

  return (
    <section className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            The Proposal Lifecycle
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Every agent action flows through a hardened lifecycle with strict state transitions and governance validation at every step.
          </p>
        </motion.div>

        {/* Lifecycle Flow */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12"
        >
          {lifecyclePhases.map((phase, index) => {
            const Icon = phase.icon;
            const isActive = index === activePhase;
            return (
              <motion.button
                key={phase.status}
                variants={item}
                onClick={() => setActivePhase(index)}
                className={`glass-card p-6 text-center group cursor-pointer transition-all ${
                  isActive ? `border-2 ${phase.borderColor} glow` : ''
                }`}
              >
                <div className={`w-14 h-14 rounded-lg ${phase.bgColor} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-7 h-7 text-${phase.color}-500`} />
                </div>
                <div className="text-xs text-muted-foreground mb-1">Step {index + 1}</div>
                <h3 className="font-display font-bold mb-2">{phase.label}</h3>
                <p className="text-sm text-muted-foreground">{phase.description}</p>

                {index < lifecyclePhases.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-primary/30" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Code Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-card p-6 border-l-4 border-primary"
        >
          <div className="flex items-start gap-4 mb-4">
            <Code className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-display font-bold text-lg mb-2">State Transition Validation</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Every state change is validated against allowed transitions. No shortcuts, no exceptions.
              </p>
            </div>
          </div>
          <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-foreground/80">
{`_VALID_TRANSITIONS = {
    "pending": {"approved_pending", "rejected", "revoked"},
    "approved_pending": {"approved_locked", "revoked", "rejected"},
    "approved_locked": {"executing", "revoked"},
    "executing": {"executed", "failed", "revoked"},
    "executed": {"reinstated"}
}`}
            </pre>
          </div>
        </motion.div>

        {/* Live Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-display font-bold mb-3">
              Watch Proposals Flow <span className="gradient-text">Live</span>
            </h3>
            <p className="text-muted-foreground">
              See the Heartbeat framework in action as proposals move through each governance stage
            </p>
          </div>
          <div className="max-w-6xl mx-auto glass-card p-8 border-2 border-primary/20">
            <HeartbeatLiveAnimation />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function GovernanceControlsSection() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="gradient-text">Built-in Governance</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Six layers of control ensure agents never go rogue. Every action is controlled, logged, and reversible.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {governanceControls.map((control) => {
            const Icon = control.icon;
            return (
              <motion.div
                key={control.title}
                variants={item}
                className="glass-card-hover p-6"
              >
                <Icon className={`w-10 h-10 ${control.color} mb-4`} />
                <h3 className="font-display font-bold text-lg mb-2">{control.title}</h3>
                <p className="text-sm text-muted-foreground">{control.description}</p>
              </motion.div>
            );
          })}
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
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Why Heartbeat Changes Everything
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Without Heartbeat */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 border-2 border-destructive/30"
          >
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-8 h-8 text-destructive" />
              <h3 className="text-xl font-display font-bold">Without Heartbeat</h3>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">❌</span>
                <span>Agents execute immediately without approval</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">❌</span>
                <span>No way to revoke or stop running tasks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">❌</span>
                <span>Limited visibility into what agents are doing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">❌</span>
                <span>Sparse or no audit trails</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">❌</span>
                <span>Black box execution with minimal metadata</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">❌</span>
                <span>Agents can flip-flop on decisions</span>
              </li>
            </ul>
          </motion.div>

          {/* With Heartbeat */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 border-2 border-primary glow"
          >
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-8 h-8 text-primary animate-pulse" />
              <h3 className="text-xl font-display font-bold gradient-text">With Heartbeat</h3>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-foreground font-medium">Explicit approval required for every action</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-foreground font-medium">Grace periods with revocation windows</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-foreground font-medium">Real-time visibility into all agent activity</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-foreground font-medium">Append-only audit logs (immutable history)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-foreground font-medium">Full execution metadata (logs, artifacts, metrics)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-foreground font-medium">Toggle throttling prevents erratic behavior</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TechnicalDeepDiveSection() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Technical Deep Dive
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Battle-tested architecture designed for enterprise compliance and audit requirements.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Append-Only Logs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <Database className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-display font-bold text-lg mb-3">Append-Only JSONL</h3>
            <p className="text-sm text-muted-foreground mb-4">
              All proposals and executions are logged to immutable JSONL files. Nothing is ever deleted or modified.
            </p>
            <div className="bg-secondary/50 rounded p-3 font-mono text-xs overflow-x-auto">
              <pre className="text-foreground/70">
{`proposals.jsonl
executions.jsonl`}
              </pre>
            </div>
          </motion.div>

          {/* Execution Metadata */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <FileText className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-display font-bold text-lg mb-3">Rich Metadata</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Every execution captures comprehensive data for compliance and debugging.
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• stdout/stderr (first 4KB)</li>
              <li>• Exit codes & success flags</li>
              <li>• Start/finish timestamps</li>
              <li>• Duration in seconds</li>
              <li>• Artifacts produced</li>
              <li>• Runner information</li>
            </ul>
          </motion.div>

          {/* Idempotent Execution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <RefreshCw className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-display font-bold text-lg mb-3">Idempotent & Safe</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Proposals won't re-execute if already in progress or completed. State transitions are strictly validated.
            </p>
            <div className="bg-secondary/50 rounded p-3 font-mono text-xs overflow-x-auto">
              <pre className="text-foreground/70">
{`if status == "executed":
  raise ValueError(
    "already executed"
  )`}
              </pre>
            </div>
          </motion.div>
        </div>
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
          className="glass-card p-12 text-center max-w-4xl mx-auto border-2 border-primary glow"
        >
          <Activity className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to govern your AI workforce?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Heartbeat is the foundation of {BRAND_NAME}. Every agent runs through this governance layer. No exceptions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2" asChild>
              <Link to="/contact">
                Request access
                <ChevronRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <Link to="/product">See the platform</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function HeartbeatPage() {
  return (
    <Layout>
      <HeroSection />
      <LifecycleSection />
      <GovernanceControlsSection />
      <ComparisonSection />
      <TechnicalDeepDiveSection />
      <CTASection />
    </Layout>
  );
}
