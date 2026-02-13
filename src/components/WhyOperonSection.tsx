import { motion } from "framer-motion";
import { MessageSquare, User, Network, Shield, Users, Zap, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { BRAND_NAME } from "@/lib/constants";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const aiTools = [
  {
    name: "ChatGPT / Claude / Gemini / Grok + More",
    icon: MessageSquare,
    tagline: "AI Models & Tools",
    color: "blue",
    strengths: [
      "Powerful reasoning & generation",
      "Specialized capabilities",
      "Enterprise ready (individually)"
    ],
    gaps: [
      "Single-agent focus",
      "No multi-agent orchestration",
      "No autonomous workspace coordination"
    ],
    role: "The AI engines"
  },
  {
    name: BRAND_NAME + " Platform",
    icon: Network,
    tagline: "Multi-Agent Autonomous Workspace",
    color: "emerald",
    strengths: [
      "Plugs into any AI model",
      "Orchestrates multi-agent teams",
      "Autonomous workspace platform",
      "Agent-to-agent coordination",
      "Handles 1000+ concurrent missions"
    ],
    gaps: [],
    role: "The orchestration platform"
  }
];

export function WhyOperonSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-secondary/30 via-background to-secondary/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 dots-bg opacity-20" />

      <div className="section-container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
          >
            <Network className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Orchestration Layer
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
            Multi-Agent Autonomous Workspace
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            We don't replace ChatGPT or Claude. <strong className="text-foreground">We orchestrate them together</strong> — coordinating multi-agent teams in an autonomous workspace.
          </p>
          <p className="text-lg text-primary font-semibold">
            Think of it as <strong>Kubernetes for AI agents</strong> — the platform that makes them work as a team
          </p>
        </motion.div>

        {/* How It Works */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16"
        >
          {aiTools.map((tool) => {
            const Icon = tool.icon;
            const isOperon = tool.name.includes(BRAND_NAME);

            return (
              <motion.div
                key={tool.name}
                variants={item}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`relative glass-card p-8 ${
                  isOperon
                    ? 'border-2 border-primary ring-4 ring-primary/10 shadow-xl shadow-primary/20'
                    : 'border border-border hover:border-primary/30 transition-colors'
                }`}
              >
                {/* Header */}
                <div className="flex items-start gap-3 mb-4 pb-4 border-b border-border">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      isOperon ? 'bg-primary/10' : 'bg-secondary'
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        isOperon ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-lg mb-1">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-primary font-semibold">
                      {tool.role}
                    </p>
                  </div>
                </div>

                {/* Strengths */}
                <div className="space-y-2 mb-4">
                  <div className="text-xs font-semibold text-foreground mb-2">
                    ✅ Strengths:
                  </div>
                  {tool.strengths.map((strength) => (
                    <div
                      key={strength}
                      className="flex items-start gap-2 text-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{strength}</span>
                    </div>
                  ))}
                </div>

                {/* Gaps */}
                {tool.gaps.length > 0 && (
                  <div className="space-y-2 pt-4 border-t border-border">
                    <div className="text-xs font-semibold text-muted-foreground mb-2">
                      📋 Needs:
                    </div>
                    {tool.gaps.map((gap) => (
                      <div
                        key={gap}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span className="text-muted-foreground">• {gap}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Visual Flow Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="glass-card p-8 border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {/* AI Models */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center gap-2 px-4 py-3 bg-card border border-border rounded-xl"
              >
                <MessageSquare className="w-6 h-6 text-blue-500" />
                <span className="text-xs font-semibold">ChatGPT</span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center gap-2 px-4 py-3 bg-card border border-border rounded-xl"
              >
                <MessageSquare className="w-6 h-6 text-purple-500" />
                <span className="text-xs font-semibold">Claude</span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center gap-2 px-4 py-3 bg-card border border-border rounded-xl"
              >
                <MessageSquare className="w-6 h-6 text-orange-500" />
                <span className="text-xs font-semibold">Gemini</span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center gap-2 px-4 py-3 bg-card border border-border rounded-xl"
              >
                <MessageSquare className="w-6 h-6 text-cyan-500" />
                <span className="text-xs font-semibold">Grok</span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center gap-2 px-4 py-3 bg-card border border-border rounded-xl"
              >
                <Sparkles className="w-6 h-6 text-yellow-500" />
                <span className="text-xs font-semibold">Other LLMs</span>
              </motion.div>

              {/* Arrow */}
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="hidden md:block"
              >
                <div className="text-4xl text-primary">→</div>
              </motion.div>

              {/* Operon OS */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center gap-2 px-8 py-6 bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary rounded-xl shadow-lg shadow-primary/20"
              >
                <Network className="w-10 h-10 text-primary" />
                <span className="text-base font-bold gradient-text">{BRAND_NAME}</span>
                <span className="text-xs text-muted-foreground">Orchestrates All</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto glass-card p-10 border-2 border-primary/20 bg-gradient-to-br from-background to-secondary/30"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Network className="w-10 h-10 text-primary" />
            <h3 className="text-2xl md:text-3xl font-display font-bold">
              The <span className="gradient-text">Multi-Agent Platform</span>
            </h3>
          </div>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Use ChatGPT for reasoning. Claude for coding. Grok for real-time data. Specialized models for your domain.
            <br />
            <strong className="text-foreground text-xl">{BRAND_NAME} orchestrates them as a coordinated team</strong> — creating an autonomous workspace where multiple agents collaborate, govern each other, and scale to 1000+ concurrent missions.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 text-base">
            <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
              <Users className="w-8 h-8 text-primary" />
              <span className="font-semibold">Autonomous workspace</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
              <Network className="w-8 h-8 text-primary" />
              <span className="font-semibold">Multi-agent orchestration</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
              <Zap className="w-8 h-8 text-primary" />
              <span className="font-semibold">1000+ concurrent missions</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
