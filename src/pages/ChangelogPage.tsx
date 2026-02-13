import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Sparkles, Zap, Bug } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CHANGELOG_ENTRIES } from "@/lib/constants";

const typeStyles = {
  feature: { icon: Sparkles, color: "text-primary", bg: "bg-primary/10" },
  improvement: { icon: Zap, color: "text-info", bg: "bg-info/10" },
  fix: { icon: Bug, color: "text-warning", bg: "bg-warning/10" },
};

export default function ChangelogPage() {
  return (
    <Layout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="section-container section-padding relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-6">
              <span className="gradient-text">Changelog</span>
            </h1>
            <p className="text-lg text-muted-foreground">What's new and improved in Nexus.</p>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-8">
            {CHANGELOG_ENTRIES.map((entry, index) => {
              const style = typeStyles[entry.type as keyof typeof typeStyles];
              const Icon = style.icon;
              return (
                <motion.div key={entry.version} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="glass-card p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg ${style.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${style.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-sm text-primary">{entry.version}</span>
                        <span className="text-xs text-muted-foreground">{entry.date}</span>
                      </div>
                      <h3 className="font-display font-semibold mb-2">{entry.title}</h3>
                      <p className="text-sm text-muted-foreground">{entry.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
