import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ChevronRight, TrendingUp, Headphones, BarChart3, 
  Terminal, DollarSign, Users, ArrowRight, CheckCircle2
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { LogoWithHeartbeat } from "@/components/LogoWithHeartbeat";
import { USE_CASES, BRAND_NAME } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp, Headphones, BarChart3, Terminal, DollarSign, Users,
};

const detailedUseCases = [
  {
    ...USE_CASES[0],
    details: [
      "Enrich leads from multiple sources in parallel",
      "Score and prioritize based on custom criteria",
      "Update CRM with full source attribution",
      "Generate weekly performance reports",
    ],
    workflow: "Lead import → Enrichment → Scoring → CRM sync → Reporting",
  },
  {
    ...USE_CASES[1],
    details: [
      "Auto-categorize incoming tickets",
      "Draft initial responses with knowledge base context",
      "Escalate edge cases with full conversation history",
      "Track resolution quality metrics",
    ],
    workflow: "Ticket received → Categorize → Draft → Review → Resolve",
  },
  {
    ...USE_CASES[2],
    details: [
      "Monitor data pipeline outputs",
      "Validate against business rules",
      "Generate anomaly reports",
      "Alert stakeholders on quality issues",
    ],
    workflow: "Pipeline run → Validation → Anomaly detection → Reporting",
  },
  {
    ...USE_CASES[3],
    details: [
      "Execute incident response playbooks",
      "Auto-remediate known issues",
      "Escalate with approval gates",
      "Generate post-mortems with full context",
    ],
    workflow: "Alert triggered → Triage → Remediate → Validate → Document",
  },
  {
    ...USE_CASES[4],
    details: [
      "Monitor cloud spend across providers",
      "Detect cost anomalies and spikes",
      "Execute cost-saving recommendations",
      "Generate CFO-ready reports",
    ],
    workflow: "Cost data → Analysis → Recommendations → Approval → Execute",
  },
  {
    ...USE_CASES[5],
    details: [
      "Research prospects from multiple sources",
      "Validate and deduplicate data",
      "Enrich CRM records with confidence scores",
      "Maintain data hygiene automatically",
    ],
    workflow: "Research → Validate → Enrich → Sync → Audit",
  },
];

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
            Built for <span className="gradient-text">real workloads</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Teams use {BRAND_NAME} for high-stakes automation where failure isn't an option. 
            Explore how leading companies deploy governed AI.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  return (
    <section className="section-padding">
      <div className="section-container">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-16"
        >
          {detailedUseCases.map((useCase, index) => {
            const Icon = iconMap[useCase.icon];
            return (
              <motion.div
                key={useCase.title}
                variants={item}
                className={`grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-semibold">{useCase.title}</h3>
                      <span className="text-sm font-mono text-primary">{useCase.metrics}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6">{useCase.description}</p>
                  <ul className="space-y-2 mb-6">
                    {useCase.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="glass-card p-6">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                      Mission Workflow
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 font-mono text-sm">
                      {useCase.workflow.split(" → ").map((step, i, arr) => (
                        <span key={step} className="flex items-center gap-2">
                          <span className="px-3 py-1.5 rounded-lg bg-secondary text-foreground">
                            {step}
                          </span>
                          {i < arr.length - 1 && (
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Have a different use case?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {BRAND_NAME} is flexible enough to handle any mission-critical AI workload. 
            Let's discuss your requirements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gap-2" asChild>
              <Link to="/contact">
                Talk to us
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/docs">Read the docs</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function UseCasesPage() {
  return (
    <Layout>
      <HeroSection />
      <UseCasesSection />
      <CTASection />
    </Layout>
  );
}
