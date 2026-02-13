import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Briefcase, TrendingUp, Users, Package, DollarSign,
  Shield, BarChart3, Lightbulb, Target, Zap, Check, Building2
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CLevel {
  id: string;
  role: string;
  title: string;
  icon: React.ElementType;
  color: string;
  description: string;
  responsibilities: string[];
  kpis: string[];
  teams: string[];
  status: "active" | "available";
}

const cLevelAgents: CLevel[] = [
  {
    id: "ceo",
    role: "CEO",
    title: "Chief Executive Officer",
    icon: Briefcase,
    color: "from-purple-500 to-purple-600",
    description: "Strategic vision and company-wide decision making",
    responsibilities: [
      "Company strategy execution",
      "Board communications",
      "Stakeholder management",
      "Vision & mission alignment",
    ],
    kpis: ["Revenue growth", "Market share", "Company valuation"],
    teams: ["Executive", "Board"],
    status: "active",
  },
  {
    id: "cto",
    role: "CTO",
    title: "Chief Technology Officer",
    icon: Zap,
    color: "from-blue-500 to-blue-600",
    description: "Technology strategy and product development oversight",
    responsibilities: [
      "Technology roadmap planning",
      "Engineering team leadership",
      "Technical architecture decisions",
      "Innovation & R&D",
    ],
    kpis: ["System uptime", "Development velocity", "Tech debt ratio"],
    teams: ["Engineering", "Product", "DevOps"],
    status: "active",
  },
  {
    id: "coo",
    role: "COO",
    title: "Chief Operating Officer",
    icon: Package,
    color: "from-blue-500 to-blue-600",
    description: "Operations optimization and process management",
    responsibilities: [
      "Operations efficiency",
      "Process optimization",
      "Supply chain management",
      "Quality assurance",
    ],
    kpis: ["Operational efficiency", "Cost per unit", "Process cycle time"],
    teams: ["Operations", "Logistics", "Quality"],
    status: "active",
  },
  {
    id: "cmo",
    role: "CMO",
    title: "Chief Marketing Officer",
    icon: TrendingUp,
    color: "from-orange-500 to-orange-600",
    description: "Marketing strategy and brand management",
    responsibilities: [
      "Marketing strategy execution",
      "Brand positioning",
      "Customer acquisition",
      "Market research & analytics",
    ],
    kpis: ["CAC", "Brand awareness", "Marketing ROI"],
    teams: ["Marketing", "Growth", "Content"],
    status: "active",
  },
  {
    id: "cfo",
    role: "CFO",
    title: "Chief Financial Officer",
    icon: DollarSign,
    color: "from-emerald-500 to-emerald-600",
    description: "Financial planning and risk management",
    responsibilities: [
      "Financial planning & analysis",
      "Budget management",
      "Investor relations",
      "Risk management",
    ],
    kpis: ["Burn rate", "Cash runway", "Revenue per employee"],
    teams: ["Finance", "Accounting", "FP&A"],
    status: "active",
  },
  {
    id: "cpo",
    role: "CPO",
    title: "Chief Product Officer",
    icon: Lightbulb,
    color: "from-pink-500 to-pink-600",
    description: "Product vision and user experience",
    responsibilities: [
      "Product strategy & roadmap",
      "User experience design",
      "Product-market fit",
      "Feature prioritization",
    ],
    kpis: ["User engagement", "Feature adoption", "NPS score"],
    teams: ["Product", "Design", "Research"],
    status: "active",
  },
  {
    id: "chro",
    role: "CHRO",
    title: "Chief Human Resources Officer",
    icon: Users,
    color: "from-indigo-500 to-indigo-600",
    description: "Talent management and organizational culture",
    responsibilities: [
      "Talent acquisition & retention",
      "Culture & engagement",
      "Performance management",
      "Compensation & benefits",
    ],
    kpis: ["Employee satisfaction", "Retention rate", "Time to hire"],
    teams: ["HR", "Recruiting", "People Ops"],
    status: "active",
  },
  {
    id: "ciso",
    role: "CISO",
    title: "Chief Information Security Officer",
    icon: Shield,
    color: "from-red-500 to-red-600",
    description: "Security strategy and compliance",
    responsibilities: [
      "Security strategy & governance",
      "Compliance management",
      "Incident response",
      "Risk assessment",
    ],
    kpis: ["Security incidents", "Compliance score", "Mean time to detect"],
    teams: ["Security", "Compliance", "IT"],
    status: "active",
  },
  {
    id: "cdo",
    role: "CDO",
    title: "Chief Data Officer",
    icon: BarChart3,
    color: "from-cyan-500 to-cyan-600",
    description: "Data strategy and analytics leadership",
    responsibilities: [
      "Data strategy & governance",
      "Analytics & insights",
      "Data infrastructure",
      "AI/ML initiatives",
    ],
    kpis: ["Data quality", "Analytics adoption", "Model accuracy"],
    teams: ["Data", "Analytics", "ML"],
    status: "available",
  },
];

export function OrgStructure() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [showTeams, setShowTeams] = useState(false);

  const selectedCLevel = cLevelAgents.find(a => a.id === selectedAgent);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4"
        >
          <Building2 className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            {cLevelAgents.filter(a => a.status === "active").length} Active C-Level Agents
          </span>
        </motion.div>
        <p className="text-muted-foreground">
          Click on any executive to see their capabilities
        </p>
      </div>

      {/* Org Chart */}
      <div className="relative">
        {/* CEO at top */}
        <div className="flex justify-center mb-12">
          <AgentCard
            agent={cLevelAgents[0]}
            isSelected={selectedAgent === cLevelAgents[0].id}
            onClick={() => setSelectedAgent(
              selectedAgent === cLevelAgents[0].id ? null : cLevelAgents[0].id
            )}
          />
        </div>

        {/* Connection lines */}
        <div className="absolute top-24 left-1/2 w-px h-12 bg-gradient-to-b from-border to-transparent -translate-x-1/2" />

        {/* Rest of C-suite */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
          {/* Top connection line */}
          <div className="absolute top-0 left-8 right-8 h-px bg-border hidden md:block" />

          {cLevelAgents.slice(1).map((agent, index) => (
            <div key={agent.id} className="relative">
              {/* Vertical connection to horizontal line */}
              <div className="absolute top-0 left-1/2 w-px h-6 bg-border -translate-x-1/2 hidden md:block" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="mt-6"
              >
                <AgentCard
                  agent={agent}
                  isSelected={selectedAgent === agent.id}
                  onClick={() => setSelectedAgent(
                    selectedAgent === agent.id ? null : agent.id
                  )}
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Agent Details */}
      <AnimatePresence>
        {selectedCLevel && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Card className="glass-card p-6 border-2 border-primary/50">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left: Info */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={cn(
                      "w-16 h-16 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg",
                      selectedCLevel.color
                    )}>
                      <selectedCLevel.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-bold">{selectedCLevel.role}</h3>
                      <p className="text-sm text-muted-foreground">{selectedCLevel.title}</p>
                    </div>
                    <Badge
                      variant={selectedCLevel.status === "active" ? "default" : "secondary"}
                      className="ml-auto"
                    >
                      {selectedCLevel.status}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground mb-6">
                    {selectedCLevel.description}
                  </p>

                  {/* Responsibilities */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Key Responsibilities</h4>
                    <div className="space-y-2">
                      {selectedCLevel.responsibilities.map((resp, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center gap-2 text-sm"
                        >
                          <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          <span>{resp}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Metrics */}
                <div>
                  {/* KPIs */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Key Performance Indicators</h4>
                    <div className="space-y-2">
                      {selectedCLevel.kpis.map((kpi, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="p-3 rounded-lg bg-secondary/50 border border-border"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{kpi}</span>
                            <Target className="w-4 h-4 text-primary" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Teams */}
                  <div>
                    <h4 className="font-semibold mb-3">
                      Manages Teams ({selectedCLevel.teams.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCLevel.teams.map((team, idx) => (
                        <Badge key={idx} variant="outline">
                          {team}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Deploy Button */}
                  <div className="mt-6">
                    <Button className="w-full gap-2" size="lg">
                      <Zap className="w-5 h-5" />
                      Deploy {selectedCLevel.role} Agent
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: "Total C-Suite", value: cLevelAgents.length, icon: Users },
          { label: "Active Agents", value: cLevelAgents.filter(a => a.status === "active").length, icon: Zap },
          { label: "Avg Teams", value: "3.2", icon: Package },
          { label: "Coverage", value: "100%", icon: Target },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="glass-card p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Agent Card Component
function AgentCard({
  agent,
  isSelected,
  onClick,
}: {
  agent: CLevel;
  isSelected: boolean;
  onClick: () => void;
}) {
  const Icon = agent.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <Card
        className={cn(
          "cursor-pointer transition-all duration-300 group overflow-hidden",
          "hover:shadow-xl hover:shadow-primary/20",
          isSelected && "ring-2 ring-primary shadow-xl shadow-primary/20"
        )}
      >
        <div className="p-4">
          {/* Icon */}
          <motion.div
            className={cn(
              "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center mx-auto mb-3 shadow-lg",
              agent.color
            )}
            animate={isSelected ? {
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            } : {}}
            transition={{
              duration: 2,
              repeat: isSelected ? Infinity : 0,
            }}
          >
            <Icon className="w-7 h-7 text-white" />
          </motion.div>

          {/* Role */}
          <h3 className="text-lg font-display font-bold text-center mb-1 group-hover:text-primary transition-colors">
            {agent.role}
          </h3>
          <p className="text-xs text-muted-foreground text-center mb-2">
            {agent.title}
          </p>

          {/* Status */}
          <div className="flex justify-center">
            <Badge
              variant={agent.status === "active" ? "default" : "secondary"}
              className="text-xs"
            >
              {agent.status === "active" && (
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse mr-1.5" />
              )}
              {agent.status}
            </Badge>
          </div>
        </div>

        {/* Bottom accent */}
        <div className={cn(
          "h-1 bg-gradient-to-r",
          agent.color
        )} />
      </Card>
    </motion.div>
  );
}
