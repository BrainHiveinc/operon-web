import { Layout } from "@/components/layout/Layout";
import { AgentMarketplace } from "@/components/AgentMarketplace";
import { AgentBuilder } from "@/components/AgentBuilder";
import { AgentPreview } from "@/components/AgentPreview";
import { AgentCombinations } from "@/components/AgentCombinations";
import { OrgStructure } from "@/components/OrgStructure";
import { LogoWithHeartbeat } from "@/components/LogoWithHeartbeat";
import { motion } from "framer-motion";
import { Sparkles, Zap, Shield, TrendingUp } from "lucide-react";

export default function AgentMarketplacePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow opacity-30" />
        <div className="absolute inset-0 grid-bg opacity-20" />

        <div className="section-container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center mb-10"
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

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Specialized agents available
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight mb-6">
              <span className="gradient-text">Deploy AI agents</span>{" "}
              <span className="text-foreground">in seconds.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Pre-built, production-ready agents for enterprise and retail.
              No code, no setup, just instant automation.
            </p>

            {/* Value Props */}
            <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              {[
                { icon: Zap, label: "Deploy in 60 seconds" },
                { icon: Shield, label: "Enterprise-grade security" },
                { icon: TrendingUp, label: "Proven ROI" },
              ].map((prop, idx) => {
                const Icon = prop.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Icon className="w-4 h-4 text-primary" />
                    <span>{prop.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* C-Level Agents Org Structure */}
      <section className="section-padding bg-secondary/30">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Executive-Level AI Agents
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Deploy C-suite agents that handle strategic decision making, operations, and leadership tasks across your organization
            </p>
          </motion.div>

          <OrgStructure />
        </div>
      </section>

      {/* Agent Marketplace */}
      <section className="section-padding">
        <div className="section-container">
          <AgentMarketplace />
        </div>
      </section>

      {/* Agent Combinations */}
      <section className="section-padding">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Powerful agent combinations
            </h2>
            <p className="text-lg text-muted-foreground">
              Pre-built stacks that work together seamlessly for maximum impact
            </p>
          </motion.div>

          <AgentCombinations />
        </div>
      </section>

      {/* Agent Preview */}
      <section className="section-padding bg-secondary/30">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              See agents in action
            </h2>
            <p className="text-lg text-muted-foreground">
              Watch a live simulation of how agents work
            </p>
          </motion.div>

          <AgentPreview />
        </div>
      </section>

      {/* Agent Builder */}
      <section className="section-padding">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Build your custom agent
            </h2>
            <p className="text-lg text-muted-foreground">
              Drag and drop modules to create the perfect agent for your workflow
            </p>
          </motion.div>

          <AgentBuilder />
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-secondary/30">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Three steps to autonomous AI
            </h2>
            <p className="text-lg text-muted-foreground">
              From zero to production in minutes, not months.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Choose your agent",
                description: "Browse pre-built agents or request a custom one for your exact workflow.",
              },
              {
                step: "02",
                title: "Configure & connect",
                description: "Set permissions, connect your tools, and define validation rules—all in minutes.",
              },
              {
                step: "03",
                title: "Deploy & monitor",
                description: "Launch your agent workforce and watch real-time dashboards show ROI instantly.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mx-auto mb-4">
                  <span className="font-display font-bold text-lg text-primary-foreground">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-display font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
