import { motion } from "framer-motion";
import { useState } from "react";
import {
  BarChart3, Headphones, Package, Shield, TrendingUp, DollarSign,
  Check, Star, Zap, ArrowRight, Sparkles, Filter
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AGENT_TYPES } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  BarChart3, Headphones, Package, Shield, TrendingUp, DollarSign
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

export function AgentMarketplace() {
  const [filter, setFilter] = useState<"all" | "enterprise" | "retail">("all");
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);

  const filteredAgents = filter === "all"
    ? AGENT_TYPES
    : AGENT_TYPES.filter(agent => agent.industry.toLowerCase() === filter);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
            Agent Marketplace
          </h2>
          <p className="text-muted-foreground">
            Deploy autonomous agents in seconds. No code required.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {[
            { label: "All Agents", value: "all" },
            { label: "Enterprise", value: "enterprise" },
            { label: "Retail", value: "retail" },
          ].map((f) => (
            <Button
              key={f.value}
              variant={filter === f.value ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f.value as typeof filter)}
              className="gap-1.5"
            >
              {f.label}
              {filter === f.value && <Check className="w-3 h-3" />}
            </Button>
          ))}
        </div>
      </div>

      {/* Agent Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredAgents.map((agent) => {
          const Icon = iconMap[agent.icon];
          const isHovered = hoveredAgent === agent.id;

          return (
            <motion.div
              key={agent.id}
              variants={item}
              onHoverStart={() => setHoveredAgent(agent.id)}
              onHoverEnd={() => setHoveredAgent(null)}
            >
              <Card className={cn(
                "relative overflow-hidden transition-all duration-300",
                "hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1",
                "border-2 hover:border-primary/50 cursor-pointer group"
              )}>
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <Badge
                    variant={agent.status === "active" ? "default" : "secondary"}
                    className="gap-1.5"
                  >
                    {agent.status === "active" ? (
                      <>
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        Active
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3" />
                        Beta
                      </>
                    )}
                  </Badge>
                </div>

                <div className="p-6 relative z-10">
                  {/* Icon */}
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 flex items-center justify-center mb-4 shadow-lg backdrop-blur-sm"
                    animate={{
                      scale: isHovered ? 1.1 : 1,
                      rotate: isHovered ? 5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="w-7 h-7 text-primary" />
                  </motion.div>

                  {/* Name & Description */}
                  <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {agent.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {agent.description}
                  </p>

                  {/* Capabilities */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {agent.capabilities.slice(0, 3).map((cap, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {cap}
                      </Badge>
                    ))}
                    {agent.capabilities.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{agent.capabilities.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Performance Metrics */}
                  <div className="flex items-center justify-between mb-4 p-3 rounded-lg bg-secondary/50">
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Performance</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                        <p className="text-sm font-medium">{agent.performance}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-0.5">Pricing</p>
                      <p className="text-sm font-medium">{agent.price}</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button className="w-full gap-2 group/btn" size="sm">
                      <Zap className="w-4 h-4" />
                      Deploy Agent
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </div>

                {/* Industry Tag */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/60" />
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* CTA Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card p-8 text-center"
      >
        <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-display font-bold mb-2">
          Need a custom agent?
        </h3>
        <p className="text-muted-foreground mb-4">
          Our team can build specialized agents tailored to your exact workflow.
        </p>
        <Button size="lg" variant="outline" className="gap-2">
          Request Custom Agent
          <ArrowRight className="w-4 h-4" />
        </Button>
      </motion.div>
    </div>
  );
}
