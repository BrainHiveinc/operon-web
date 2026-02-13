import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ChevronRight, Book, Code, Zap, Database, FileText, Lock, 
  Terminal, Settings, ExternalLink
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { LogoWithHeartbeat } from "@/components/LogoWithHeartbeat";
import { BRAND_NAME } from "@/lib/constants";

const sections = [
  {
    title: "Getting Started",
    icon: Zap,
    items: [
      { title: "Quickstart Guide", description: "Ship your first mission in under 5 minutes" },
      { title: "Installation", description: "CLI and SDK setup for your environment" },
      { title: "Authentication", description: "API keys and authentication flows" },
      { title: "Your First Mission", description: "Step-by-step walkthrough" },
    ],
  },
  {
    title: "Core Concepts",
    icon: Book,
    items: [
      { title: "Missions", description: "Define outcomes and success criteria" },
      { title: "TaskGraphs", description: "Decompose work into parallel tasks" },
      { title: "Agents", description: "Configure pools and capabilities" },
      { title: "Validators", description: "Ensure output quality" },
    ],
  },
  {
    title: "Configuration",
    icon: Settings,
    items: [
      { title: "Mission Definition", description: "YAML schema reference" },
      { title: "Agent Pools", description: "Capacity and routing" },
      { title: "Retry Policies", description: "Backoff and conditions" },
      { title: "Governance", description: "Permissions and approvals" },
    ],
  },
  {
    title: "API Reference",
    icon: Code,
    items: [
      { title: "REST API", description: "HTTP endpoints and payloads" },
      { title: "TypeScript SDK", description: "Client library reference" },
      { title: "Webhooks", description: "Event notifications" },
      { title: "GraphQL", description: "Query and mutation schema" },
    ],
  },
  {
    title: "Validators",
    icon: FileText,
    items: [
      { title: "Built-in Validators", description: "Schema, quality, business rules" },
      { title: "Custom Validators", description: "TypeScript SDK guide" },
      { title: "Validator Reports", description: "Understanding outputs" },
      { title: "Confidence Scores", description: "Threshold configuration" },
    ],
  },
  {
    title: "Integrations",
    icon: Database,
    items: [
      { title: "Slack", description: "Notifications and approvals" },
      { title: "CRM Systems", description: "Salesforce, HubSpot, etc." },
      { title: "Data Warehouses", description: "Snowflake, BigQuery, etc." },
      { title: "Custom Tools", description: "Build your own integrations" },
    ],
  },
];

const codeExamples = {
  quickstart: `import { Nexus } from '@nexus/sdk';

const client = new Nexus({
  apiKey: process.env.NEXUS_API_KEY
});

// Define and run a mission
const mission = await client.missions.create({
  name: 'lead_enrichment',
  params: {
    company: 'Acme Corp',
    fields: ['size', 'industry', 'funding']
  },
  validators: ['schema_check', 'data_quality']
});

// Wait for completion
const result = await mission.wait();
console.log('Mission completed:', result.status);
console.log('Artifacts:', result.artifacts);`,
};

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
            <span className="gradient-text">Documentation</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Everything you need to build, deploy, and govern AI missions with {BRAND_NAME}.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gap-2" asChild>
              <Link to="/docs">
                <Book className="w-4 h-4" />
                Quickstart Guide
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <Link to="/docs">
                <Code className="w-4 h-4" />
                API Reference
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function QuickstartSection() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-display font-bold mb-4">
              Ship your first mission in 5 minutes
            </h2>
            <p className="text-muted-foreground mb-6">
              Install the SDK, configure your API key, and run a mission with built-in validators.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Terminal className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">1. Install the SDK</h3>
                  <code className="text-sm text-muted-foreground font-mono">
                    npm install @nexus/sdk
                  </code>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Lock className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">2. Configure authentication</h3>
                  <code className="text-sm text-muted-foreground font-mono">
                    export NEXUS_API_KEY=nx_...
                  </code>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">3. Run your first mission</h3>
                  <p className="text-sm text-muted-foreground">
                    See the code example →
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="terminal">
              <div className="terminal-header">
                <div className="terminal-dot bg-destructive" />
                <div className="terminal-dot bg-warning" />
                <div className="terminal-dot bg-success" />
                <span className="ml-3 text-xs text-muted-foreground font-mono">
                  quickstart.ts
                </span>
              </div>
              <div className="terminal-body">
                <pre className="text-sm text-muted-foreground overflow-x-auto">
                  <code>{codeExamples.quickstart}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SectionsSection() {
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
            Explore the docs
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sections.map((section) => (
            <motion.div
              key={section.title}
              variants={item}
              className="glass-card p-6 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <section.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold">{section.title}</h3>
              </div>
              <ul className="space-y-3">
                {section.items.map((docItem) => (
                  <li key={docItem.title}>
                    <Link
                      to="/docs"
                      className="flex items-center justify-between text-sm hover:text-primary transition-colors group/item"
                    >
                      <span>{docItem.title}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
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
            Can't find what you're looking for?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our team is here to help. Reach out with questions or feedback.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gap-2" asChild>
              <Link to="/contact">
                Contact support
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                View on GitHub
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function DocsPage() {
  return (
    <Layout>
      <HeroSection />
      <QuickstartSection />
      <SectionsSection />
      <CTASection />
    </Layout>
  );
}
