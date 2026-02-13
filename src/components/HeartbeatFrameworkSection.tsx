import { motion } from "framer-motion";
import { Activity, Users, GitBranch, Target, RefreshCw, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import { BRAND_NAME } from "@/lib/constants";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const heartbeatStages = [
  {
    icon: Target,
    label: "Mission",
    description: "Agent receives objective",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    icon: GitBranch,
    label: "Context",
    description: "Gathers required data",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  },
  {
    icon: Zap,
    label: "Execute",
    description: "Performs actions",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10"
  },
  {
    icon: CheckCircle2,
    label: "Validate",
    description: "Checks governance rules",
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    icon: RefreshCw,
    label: "Iterate",
    description: "Refines until complete",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10"
  },
  {
    icon: Activity,
    label: "Report",
    description: "Delivers artifact",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10"
  }
];

export function HeartbeatFrameworkSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-glow opacity-30" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="section-container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
          >
            <Activity className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">
              The {BRAND_NAME} Difference
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 sm:mb-6 px-4 sm:px-0">
            <span className="gradient-text">Heartbeat Framework</span>
            <br />
            <span className="text-foreground text-2xl sm:text-3xl md:text-4xl">
              How agents work autonomously
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4 sm:px-0">
            Humans use <span className="text-foreground font-semibold">Scrum & Agile</span> for collaboration.
            <br />
            Agents use <span className="gradient-text font-semibold">Heartbeat</span> for structured autonomous execution.
          </p>
        </motion.div>

        {/* Comparison Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 mb-12 max-w-5xl mx-auto"
        >
          {/* Human Way */}
          <div className="glass-card p-6 sm:p-8 border-2 border-muted">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-muted-foreground" />
              <h3 className="text-xl font-display font-bold text-foreground">Human Teams</h3>
            </div>
            <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <span>Daily standups & sprint planning</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <span>Manual coordination & communication</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <span>Retrospectives for improvement</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <span>Works for people, not machines</span>
              </li>
            </ul>
          </div>

          {/* Agent Way */}
          <div className="glass-card p-6 sm:p-8 border-2 border-primary glow">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-8 h-8 text-primary animate-pulse" />
              <h3 className="text-xl font-display font-bold gradient-text">Agent Heartbeat</h3>
            </div>
            <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <span className="text-foreground font-medium">Continuous autonomous cycles</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <span className="text-foreground font-medium">Built-in governance validation</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <span className="text-foreground font-medium">Self-correcting through iteration</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <span className="text-foreground font-medium">Multi-agent orchestration at scale</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Heartbeat Cycle Visualization */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {heartbeatStages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <motion.div
                  key={stage.label}
                  variants={item}
                  className="glass-card-hover p-4 sm:p-5 text-center group relative"
                >
                  {/* Stage Number */}
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{index + 1}</span>
                  </div>

                  {/* Icon */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg ${stage.bgColor} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${stage.color}`} />
                  </div>

                  {/* Label */}
                  <h4 className="font-display font-semibold mb-1 text-sm sm:text-base">{stage.label}</h4>
                  <p className="text-xs text-muted-foreground">{stage.description}</p>

                  {/* Arrow (except last) */}
                  {index < heartbeatStages.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-primary/30" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Cycle Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20">
              <RefreshCw className="w-4 h-4 text-primary animate-spin" style={{ animationDuration: '3s' }} />
              <span className="text-sm text-muted-foreground">
                Repeats continuously until mission complete
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto px-4 sm:px-0">
            <span className="text-foreground font-semibold">Like a project manager in every agent.</span>
            <br />
            Structured. Collaborative. Autonomous. At scale.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
