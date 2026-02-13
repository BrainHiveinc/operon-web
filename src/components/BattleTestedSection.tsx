import { motion } from "framer-motion";
import { CheckCircle2, Zap, Activity, Target } from "lucide-react";
import { BRAND_NAME } from "@/lib/constants";

const stats = [
  {
    icon: Target,
    value: "200",
    label: "Concurrent Missions",
    description: "Running simultaneously without interference",
    color: "blue"
  },
  {
    icon: CheckCircle2,
    value: "100%",
    label: "Success Rate",
    description: "Zero failures in production stress test",
    color: "green"
  },
  {
    icon: Activity,
    value: "~30s",
    label: "P50 Latency",
    description: "Consistent performance under load",
    color: "purple"
  },
  {
    icon: Zap,
    value: "0",
    label: "Downtime",
    description: "No crashes, no hangs, no failures",
    color: "orange"
  }
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

export function BattleTestedSection() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-green-600">
              Production-Tested
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Battle-Tested at <span className="gradient-text">Enterprise Scale</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Not just a demo. {BRAND_NAME} has been stress-tested with 200 concurrent autonomous missions—delivering 100% reliability under load.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={item}
                className="glass-card p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <h3 className="font-display font-semibold mb-2 text-foreground">
                  {stat.label}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* What This Means */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-card p-8 border-2 border-primary/20"
        >
          <h3 className="text-2xl font-display font-bold mb-6 text-center">
            What This <span className="gradient-text">Actually Means</span>
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">No Race Conditions</h4>
                  <p className="text-sm text-muted-foreground">
                    200 agents accessing shared resources without conflicts
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">No Deadlocks</h4>
                  <p className="text-sm text-muted-foreground">
                    Proper queue management and resource allocation
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">No Memory Leaks</h4>
                  <p className="text-sm text-muted-foreground">
                    Stable performance from start to finish
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Predictable Latency</h4>
                  <p className="text-sm text-muted-foreground">
                    No performance degradation under load
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Enterprise-Ready</h4>
                  <p className="text-sm text-muted-foreground">
                    Proven reliability for mission-critical workloads
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Production-Tested</h4>
                  <p className="text-sm text-muted-foreground">
                    Real stress tests, not synthetic benchmarks
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-muted-foreground">
              <span className="text-foreground font-semibold">Most agentic systems break at 10-20 concurrent tasks.</span>
              {" "}We've proven {BRAND_NAME} can handle 200+ without a single failure.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
