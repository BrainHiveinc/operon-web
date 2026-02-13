import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ChevronRight, Play, AlertTriangle, XCircle, HelpCircle, Shield,
  Layers, CheckCircle2, RefreshCcw, FileText, Database, Lock,
  TrendingUp, Headphones, BarChart3, Terminal as TerminalIcon, DollarSign, Users,
  ArrowRight, Sparkles, Zap, Eye
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { AgentOrchestrator } from "@/components/AgentOrchestrator";
import { LogoWithHeartbeat } from "@/components/LogoWithHeartbeat";
import { AgentSriDemoChat } from "@/components/AgentSriDemoChat";
import { WhyOperonSection } from "@/components/WhyOperonSection";
import {
  BRAND_NAME, METRICS, PAIN_POINTS, CAPABILITIES, USE_CASES
} from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  AlertTriangle, XCircle, HelpCircle, Shield,
  Layers, CheckCircle2, RefreshCcw, FileText, Database, Lock,
  TrendingUp, Headphones, BarChart3, Terminal: TerminalIcon, DollarSign, Users,
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

// Hero Section
function HeroSection({ onOpenDemo }: { onOpenDemo: () => void }) {
  return (
    <section className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="section-container section-padding relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Operon OS Brand Title */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6"
          >
            <span className="gradient-text">{BRAND_NAME}</span>
          </motion.h1>

          {/* Logo Hero with Agent Sri and Heartbeat */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8"
          >
            <LogoWithHeartbeat size="lg" clickable={true} showBadge={true} />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              For Enterprise & Entrepreneurs
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 px-4 sm:px-0"
          >
            <span className="gradient-text">AI agents</span>{" "}
            <span className="text-foreground">you can govern.</span>
          </motion.h1>

          {/* Battle-Tested Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card border-2 border-green-500/30 mb-8"
          >
            <div className="flex items-center gap-2">
              <motion.div
                className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center gap-0.5 shadow-lg shadow-green-500/50"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </motion.div>
              <span className="text-sm font-semibold text-foreground">Battle-Tested:</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="font-bold text-primary">200 concurrent missions</span>
              <div className="w-px h-4 bg-border" />
              <span className="font-bold text-green-600">0 failures</span>
            </div>
          </motion.div>

          {/* Subhead */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 px-4 sm:px-0">
            Build your autonomous AI workforce with enterprise-grade governance. Think of it as Kubernetes for AI agents—orchestration, reliability, and governance at scale.
          </p>

          {/* Hero CTA - Prominent Agent Sri Demo */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 sm:mb-12 px-4 sm:px-0">
            <Button
              onClick={onOpenDemo}
              size="lg"
              className="gap-3 glow group relative overflow-hidden w-full sm:w-auto min-h-[56px] text-lg px-10 py-6"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <motion.div
                className="w-2 h-2 rounded-full bg-blue-400 shadow-lg shadow-blue-500/50"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Zap className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="font-bold">Try Agent Sri Now</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="gap-2 w-full sm:w-auto min-h-[56px] text-lg px-8"
              asChild
            >
              <Link to="/product">
                <Play className="w-5 h-5" />
                Watch how it works
              </Link>
            </Button>
          </div>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-8 text-sm text-muted-foreground px-4 sm:px-0"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>Enterprise-ready</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" />
              <span>SOC 2 compliant</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>No credit card required</span>
            </div>
          </motion.div>

          {/* Proof Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-10 px-4 sm:px-0"
          >
            {METRICS.map((metric) => (
              <div key={metric.label} className="text-center min-w-[80px]">
                <p className="text-xl sm:text-2xl md:text-3xl font-display font-bold gradient-text">
                  {metric.value}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

// Live Agent Network Section
function LiveAgentNetworkSection() {
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
            Watch Agents <span className="gradient-text">Orchestrate in Real-Time</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            See how multiple AI agents coordinate autonomously with built-in governance
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <AgentOrchestrator />
        </motion.div>
      </div>
    </section>
  );
}

// Problem Section
function ProblemSection() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8 md:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4 px-4 sm:px-0">
            Current AI agents are <span className="text-destructive">ungovernable</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
            Without proper controls, AI agents become liability generators.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {PAIN_POINTS.map((point) => {
            const Icon = iconMap[point.icon];
            return (
              <motion.div
                key={point.title}
                variants={item}
                className="glass-card-hover p-5 sm:p-6"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-3 sm:mb-4">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-destructive" />
                </div>
                <h3 className="font-display font-semibold mb-2 text-sm sm:text-base">{point.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{point.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// Solution Section
function SolutionSection() {
  return (
    <section className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8 md:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4 px-4 sm:px-0">
            Governance-first agent infrastructure
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
            {BRAND_NAME} gives you the primitives to run AI at scale.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {CAPABILITIES.map((cap) => {
            const Icon = iconMap[cap.icon];
            return (
              <motion.div
                key={cap.title}
                variants={item}
                className="glass-card-hover p-5 sm:p-6 group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold mb-2 text-sm sm:text-base">{cap.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{cap.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// Use Cases Section
function UseCasesSection() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8 md:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4 px-4 sm:px-0">
            Built for real workloads
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
            Teams use {BRAND_NAME} for high-stakes automation.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {USE_CASES.map((useCase) => {
            const Icon = iconMap[useCase.icon];
            return (
              <motion.div
                key={useCase.title}
                variants={item}
                className="glass-card-hover p-5 sm:p-6 group"
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-display font-semibold mb-2 text-sm sm:text-base">{useCase.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{useCase.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-12 px-4 sm:px-0"
        >
          <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto min-h-[44px]" asChild>
            <Link to="/use-cases">
              View all use cases
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// Final CTA Section
function FinalCTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow opacity-50" />
      
      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6 px-4 sm:px-0">
            Stop demo agents.{" "}
            <span className="gradient-text">Start governable automation.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 px-4 sm:px-0">
            Join the teams running mission-critical AI workloads.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <Button size="lg" className="gap-2 glow w-full sm:w-auto min-h-[44px]" asChild>
              <Link to="/contact">
                Request access
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto min-h-[44px]" asChild>
              <Link to="/docs">Read the docs</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [demoOpen, setDemoOpen] = useState(false);

  // Always show full homepage - instant value approach for enterprise
  return (
    <Layout>
      <HeroSection onOpenDemo={() => setDemoOpen(true)} />
      <WhyOperonSection />
      <ProblemSection />
      <SolutionSection />
      <LiveAgentNetworkSection />
      <UseCasesSection />
      <FinalCTASection />

      {/* Agent Sri Mission Executor */}
      <AgentSriDemoChat
        open={demoOpen}
        onClose={() => setDemoOpen(false)}
        onUserComplete={() => {}}
      />
    </Layout>
  );
}
