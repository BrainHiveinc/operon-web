import { motion } from "framer-motion";
import { useState } from "react";
import {
  Sparkles, TrendingUp, Zap, ArrowRight, Star, Check,
  BarChart3, Headphones, DollarSign, Shield, Package
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AgentCombo {
  id: string;
  name: string;
  description: string;
  agents: string[];
  use_case: string;
  roi_increase: string;
  complexity: "simple" | "moderate" | "advanced";
  icon: React.ElementType;
  benefits: string[];
}

const combinations: AgentCombo[] = [
  {
    id: "growth-stack",
    name: "Growth Stack",
    description: "Complete lead generation and qualification pipeline",
    agents: ["Lead Enrichment", "Data Analyst", "Support Agent"],
    use_case: "Scale outbound sales operations",
    roi_increase: "3.4x",
    complexity: "simple",
    icon: TrendingUp,
    benefits: [
      "Automate lead research",
      "Qualify prospects automatically",
      "Personalized outreach at scale",
    ],
  },
  {
    id: "customer-success",
    name: "Customer Success Suite",
    description: "Proactive customer support and retention automation",
    agents: ["Support Agent", "Data Analyst", "Inventory Manager"],
    use_case: "Reduce churn and increase satisfaction",
    roi_increase: "2.8x",
    complexity: "moderate",
    icon: Headphones,
    benefits: [
      "24/7 customer support",
      "Predict churn risks",
      "Automated health scoring",
    ],
  },
  {
    id: "revenue-ops",
    name: "Revenue Operations",
    description: "End-to-end revenue analytics and forecasting",
    agents: ["Data Analyst", "Financial Analyst", "Lead Enrichment"],
    use_case: "Optimize revenue pipeline",
    roi_increase: "4.1x",
    complexity: "advanced",
    icon: DollarSign,
    benefits: [
      "Real-time revenue forecasting",
      "Pipeline health monitoring",
      "Deal risk prediction",
    ],
  },
  {
    id: "compliance-guard",
    name: "Compliance Guardian",
    description: "Automated compliance monitoring and audit trails",
    agents: ["Data Analyst", "Support Agent", "Financial Analyst"],
    use_case: "Ensure regulatory compliance",
    roi_increase: "2.1x",
    complexity: "advanced",
    icon: Shield,
    benefits: [
      "Continuous compliance monitoring",
      "Automated audit trails",
      "Risk alert system",
    ],
  },
  {
    id: "ops-optimizer",
    name: "Operations Optimizer",
    description: "Streamline inventory and logistics operations",
    agents: ["Inventory Manager", "Data Analyst", "Support Agent"],
    use_case: "Optimize supply chain",
    roi_increase: "3.2x",
    complexity: "moderate",
    icon: Package,
    benefits: [
      "Real-time inventory optimization",
      "Demand forecasting",
      "Automated reordering",
    ],
  },
  {
    id: "analytics-engine",
    name: "Analytics Engine",
    description: "Comprehensive business intelligence automation",
    agents: ["Data Analyst", "Financial Analyst", "Lead Enrichment"],
    use_case: "Data-driven decision making",
    roi_increase: "3.7x",
    complexity: "moderate",
    icon: BarChart3,
    benefits: [
      "Automated reporting",
      "Predictive analytics",
      "Custom dashboards",
    ],
  },
];

export function AgentCombinations() {
  const [selectedCombo, setSelectedCombo] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "simple" | "moderate" | "advanced">("all");

  const filteredCombos = filter === "all"
    ? combinations
    : combinations.filter(c => c.complexity === filter);

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "simple": return "text-blue-500";
      case "moderate": return "text-yellow-500";
      case "advanced": return "text-orange-500";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-card p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-display font-bold mb-2">
              Recommended Combinations
            </h3>
            <p className="text-sm text-muted-foreground">
              Pre-built agent stacks optimized for specific workflows
            </p>
          </div>

          {/* Complexity Filter */}
          <div className="flex items-center gap-2">
            {[
              { label: "All", value: "all" },
              { label: "Simple", value: "simple" },
              { label: "Moderate", value: "moderate" },
              { label: "Advanced", value: "advanced" },
            ].map((f) => (
              <Button
                key={f.value}
                variant={filter === f.value ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f.value as typeof filter)}
                className="text-xs"
              >
                {f.label}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Combinations Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCombos.map((combo, index) => {
          const Icon = combo.icon;
          const isSelected = selectedCombo === combo.id;

          return (
            <motion.div
              key={combo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              layout
            >
              <Card
                className={cn(
                  "glass-card overflow-hidden transition-all duration-300 cursor-pointer group h-full",
                  "hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1",
                  isSelected && "ring-2 ring-primary shadow-xl shadow-primary/20"
                )}
                onClick={() => setSelectedCombo(isSelected ? null : combo.id)}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="p-6 relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>

                    <div className="flex flex-col items-end gap-1">
                      <Badge
                        variant="secondary"
                        className={cn("text-xs", getComplexityColor(combo.complexity))}
                      >
                        {combo.complexity}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-bold gradient-text">
                          {combo.roi_increase} ROI
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {combo.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {combo.description}
                  </p>

                  {/* Use Case */}
                  <div className="mb-4 p-3 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground mb-1">Use Case</p>
                    <p className="text-sm font-medium">{combo.use_case}</p>
                  </div>

                  {/* Agents */}
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-2">
                      Included Agents ({combo.agents.length})
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {combo.agents.map((agent, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {agent}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4 space-y-2"
                    >
                      <p className="text-xs text-muted-foreground mb-2">Key Benefits</p>
                      {combo.benefits.map((benefit, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center gap-2 text-sm"
                        >
                          <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          <span className="text-foreground">{benefit}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: isSelected ? 1 : 0,
                      y: isSelected ? 0 : 10
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button className="w-full gap-2 group/btn" size="sm">
                      <Sparkles className="w-4 h-4" />
                      Deploy Combo
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>

                  {!isSelected && (
                    <div className="text-center">
                      <Button variant="ghost" size="sm" className="text-xs group-hover:text-primary">
                        Click to see benefits
                      </Button>
                    </div>
                  )}
                </div>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/60" />
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Stats */}
      <Card className="glass-card p-6">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { label: "Total Combinations", value: combinations.length },
            { label: "Avg ROI Increase", value: "3.2x" },
            { label: "Agents Included", value: "6" },
            { label: "Enterprise Ready", value: "100%" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl font-display font-bold gradient-text mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
