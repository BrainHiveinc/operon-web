import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ChevronRight, ArrowDown, Zap, Layers, Code, CheckCircle2, 
  FileText, RefreshCcw, Lock, Database, BarChart3
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { BRAND_NAME } from "@/lib/constants";

const steps = [
  {
    number: "01",
    title: "Define your mission",
    description: "Start with the outcome you need. Describe the mission in natural language or structured YAML with typed parameters, timeouts, and success criteria.",
    icon: Zap,
    details: [
      "Natural language or YAML definition",
      "Typed input parameters",
      "Configurable timeouts",
      "Success criteria specification",
    ],
  },
  {
    number: "02",
    title: "Compile the TaskGraph",
    description: "The platform decomposes your mission into a directed acyclic graph of executable tasks with dependencies, parallelization hints, and resource requirements.",
    icon: Layers,
    details: [
      "Automatic task decomposition",
      "Dependency resolution",
      "Parallelization optimization",
      "Resource allocation",
    ],
  },
  {
    number: "03",
    title: "Assign to agents",
    description: "Tasks are assigned to specialized agents from your configured pools. Each agent has defined capabilities, rate limits, and tool access permissions.",
    icon: Code,
    details: [
      "Capability-based routing",
      "Pool-level rate limiting",
      "Tool access control",
      "Priority queuing",
    ],
  },
  {
    number: "04",
    title: "Execute with observability",
    description: "Agents execute tool calls with full logging. Every API call, decision point, and intermediate result is captured for debugging and audit purposes.",
    icon: Database,
    details: [
      "Real-time execution logs",
      "Tool call tracing",
      "Context bundle tracking",
      "Performance metrics",
    ],
  },
  {
    number: "05",
    title: "Validate outputs",
    description: "Each output passes through your configured validators. Validators can check schemas, data quality, business rules, or run custom TypeScript logic.",
    icon: CheckCircle2,
    details: [
      "Schema validation",
      "Data quality checks",
      "Custom business rules",
      "Confidence scoring",
    ],
  },
  {
    number: "06",
    title: "Handle failures gracefully",
    description: "When validators fail, the retry system kicks in. Configure exponential backoff, conditional retries, and fallback behaviors for different error types.",
    icon: RefreshCcw,
    details: [
      "Exponential backoff",
      "Conditional retry logic",
      "Error classification",
      "Fallback behaviors",
    ],
  },
  {
    number: "07",
    title: "Store audit artifacts",
    description: "Every mission run generates audit-grade artifacts: inputs, outputs, validator reports, tool call logs, and full execution traces.",
    icon: FileText,
    details: [
      "Structured artifacts",
      "Compliance exports",
      "Version tracking",
      "Retention policies",
    ],
  },
  {
    number: "08",
    title: "Enforce governance",
    description: "Governance policies run throughout the pipeline. Approval workflows for high-risk actions, blast radius limits, and permission checks.",
    icon: Lock,
    details: [
      "Approval workflows",
      "Blast radius control",
      "Permission enforcement",
      "Audit logging",
    ],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
};

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
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight mb-6">
            How <span className="gradient-text">{BRAND_NAME}</span> works
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            From mission definition to audit-ready artifacts. Follow the journey of an AI workload 
            through our governance-first platform.
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex justify-center"
          >
            <ArrowDown className="w-6 h-6 text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function StepsSection() {
  return (
    <section className="section-padding">
      <div className="section-container">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={item}
              className="relative"
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-20 bottom-0 w-px bg-gradient-to-b from-primary/50 to-transparent hidden md:block" />
              )}
              
              <div className="grid md:grid-cols-12 gap-6 items-start">
                {/* Number */}
                <div className="md:col-span-1 flex md:justify-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <span className="font-mono font-bold text-primary">{step.number}</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="md:col-span-6">
                  <div className="flex items-center gap-3 mb-3">
                    <step.icon className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-display font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                
                {/* Details */}
                <div className="md:col-span-5">
                  <div className="glass-card p-4">
                    <ul className="space-y-2">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
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

function MetricsSection() {
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
            What you get
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every mission generates observable metrics and audit-ready artifacts.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          <div className="glass-card p-6 text-center">
            <BarChart3 className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-display font-semibold text-2xl mb-2">100%</h3>
            <p className="text-sm text-muted-foreground">Execution observability</p>
          </div>
          <div className="glass-card p-6 text-center">
            <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-display font-semibold text-2xl mb-2">0</h3>
            <p className="text-sm text-muted-foreground">Silent failures</p>
          </div>
          <div className="glass-card p-6 text-center">
            <FileText className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-display font-semibold text-2xl mb-2">Full</h3>
            <p className="text-sm text-muted-foreground">Audit trail coverage</p>
          </div>
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
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Ready to see it in action?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Request access and ship your first governed mission in under 30 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gap-2" asChild>
              <Link to="/contact">
                Request access
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/product">Explore the product</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function HowItWorksPage() {
  return (
    <Layout>
      <HeroSection />
      <StepsSection />
      <MetricsSection />
      <CTASection />
    </Layout>
  );
}
