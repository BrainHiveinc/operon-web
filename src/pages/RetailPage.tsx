import { Layout } from "@/components/layout/Layout";
import { ROICalculator } from "@/components/ROICalculator";
import { motion } from "framer-motion";
import {
  ShoppingCart, Package, TrendingUp, MessageSquare, Target, DollarSign,
  CheckCircle2, ArrowRight, Sparkles
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RETAIL_USE_CASES } from "@/lib/constants";
import { Link } from "react-router-dom";

const iconMap: Record<string, React.ElementType> = {
  Package, MessageSquare, TrendingUp, Target, ShoppingCart
};

export default function RetailPage() {
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
            className="max-w-4xl mx-auto text-center mb-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
            >
              <ShoppingCart className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Built for modern retail
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight mb-6">
              <span className="text-foreground">AI agents for</span>{" "}
              <span className="gradient-text">retail operations.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Autonomous agents that manage inventory, optimize pricing, handle customer service,
              and drive sales—24/7 with zero downtime.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {[
                { value: "340%", label: "Avg ROI" },
                { value: "25hrs", label: "Saved/week" },
                { value: "98%", label: "Accuracy" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="text-center"
                >
                  <p className="text-3xl md:text-4xl font-display font-bold gradient-text">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="section-padding bg-secondary/30">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Calculate your ROI
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See exactly how much you'll save by automating with Operon OS.
              Real numbers, real savings.
            </p>
          </motion.div>

          <ROICalculator />
        </div>
      </section>

      {/* Retail Use Cases */}
      <section className="section-padding">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Proven retail solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real retailers achieving real results with autonomous AI agents.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {RETAIL_USE_CASES.map((useCase, idx) => {
              const Icon = iconMap[useCase.icon] || Package;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="p-6 glass-card-hover h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display font-semibold mb-2">{useCase.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {useCase.description}
                        </p>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-3 rounded-lg bg-secondary/50">
                        <p className="text-xs text-muted-foreground mb-1">ROI</p>
                        <p className="font-display font-bold text-primary">
                          {useCase.metrics.roi}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-secondary/50">
                        <p className="text-xs text-muted-foreground mb-1">Time Saved</p>
                        <p className="font-display font-bold text-primary">
                          {useCase.metrics.time_saved || useCase.metrics.response_time || useCase.metrics.conversion_rate}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-secondary/50">
                        <p className="text-xs text-muted-foreground mb-1">Accuracy</p>
                        <p className="font-display font-bold text-primary">
                          {useCase.metrics.accuracy || useCase.metrics.csat || useCase.metrics.engagement}
                        </p>
                      </div>
                    </div>

                    {/* Agents Used */}
                    <div className="mt-4 pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-xs text-muted-foreground">Agents:</p>
                        {useCase.agents_used.map((agent, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {agent.replace("-", " ")}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button size="lg" className="gap-2" asChild>
              <Link to="/contact">
                Start automating your retail operations
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section-padding bg-secondary/30">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Retail success stories
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                company: "FreshMart",
                industry: "Grocery",
                result: "$2.4M saved annually",
                quote: "Inventory waste dropped 85% in the first quarter.",
                metric: "85% waste reduction",
              },
              {
                company: "StyleHub",
                industry: "Fashion Retail",
                result: "340% ROI in 6 months",
                quote: "Dynamic pricing increased our margins by 22%.",
                metric: "22% margin increase",
              },
              {
                company: "TechGear",
                industry: "Electronics",
                result: "25hrs/week saved",
                quote: "Customer satisfaction hit all-time highs with 24/7 support.",
                metric: "96% CSAT score",
              },
            ].map((story, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-6 glass-card h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-display font-semibold">{story.company}</h4>
                      <p className="text-xs text-muted-foreground">{story.industry}</p>
                    </div>
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>

                  <div className="mb-4 p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-2xl font-display font-bold gradient-text">
                      {story.result}
                    </p>
                  </div>

                  <p className="text-sm text-muted-foreground italic mb-4">
                    "{story.quote}"
                  </p>

                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-medium">{story.metric}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 text-center max-w-3xl mx-auto"
          >
            <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Ready to transform your retail operations?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join retailers already saving millions with autonomous AI agents.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gap-2" asChild>
                <Link to="/contact">
                  Request a demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/agent-marketplace">Browse agents</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
