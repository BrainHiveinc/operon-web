import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Activity, TrendingUp, TrendingDown, Clock, Zap, CheckCircle2,
  AlertTriangle, Users, DollarSign, BarChart3, ArrowUp, ArrowDown
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ORCHESTRATION_METRICS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [metrics, setMetrics] = useState(ORCHESTRATION_METRICS);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => {
        const change = (Math.random() - 0.5) * 2;
        return {
          ...metric,
          value: metric.label.includes("Time")
            ? `${(parseFloat(metric.value) + change * 0.1).toFixed(1)}s`
            : metric.value,
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      {/* Header */}
      <section className="section-padding-sm bg-secondary/30">
        <div className="section-container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                Mission Control
              </h1>
              <p className="text-muted-foreground">
                Real-time oversight of your autonomous agent workforce
              </p>
            </div>
            <Badge variant="outline" className="gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              All Systems Operational
            </Badge>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="section-padding-sm">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {metrics.map((metric, idx) => {
              const isPositive = metric.trend === "up";
              const isNegative = metric.trend === "down";
              const TrendIcon = isPositive ? ArrowUp : ArrowDown;
              const trendColor = metric.label.includes("Time")
                ? isNegative ? "text-blue-500" : "text-red-500"
                : isPositive ? "text-blue-500" : "text-red-500";

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className="p-4 glass-card">
                    <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-display font-bold gradient-text">
                        {metric.value}
                      </p>
                      <div className={cn("flex items-center gap-0.5 text-xs font-medium", trendColor)}>
                        <TrendIcon className="w-3 h-3" />
                        {metric.change}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Dashboard Grid */}
      <section className="section-padding-sm">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Active Missions */}
            <Card className="lg:col-span-2 glass-card">
              <div className="p-6 border-b border-border/50">
                <h3 className="font-display font-semibold">Active Missions</h3>
                <p className="text-sm text-muted-foreground">Currently running agent tasks</p>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { name: "Data Pipeline Validation", agent: "Data Analyst", progress: 78, status: "running" },
                  { name: "Customer Support Triage", agent: "CS Agent", progress: 92, status: "validating" },
                  { name: "Inventory Optimization", agent: "Inventory Agent", progress: 45, status: "running" },
                  { name: "Security Scan", agent: "Security Monitor", progress: 63, status: "running" },
                  { name: "Lead Enrichment Batch", agent: "Sales Researcher", progress: 100, status: "completed" },
                ].map((mission, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-sm">{mission.name}</p>
                        <p className="text-xs text-muted-foreground">{mission.agent}</p>
                      </div>
                      <Badge
                        variant={mission.status === "completed" ? "default" : "outline"}
                        className="capitalize"
                      >
                        {mission.status}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{mission.progress}%</span>
                      </div>
                      <Progress value={mission.progress} className="h-1.5" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Agent Status */}
            <Card className="glass-card">
              <div className="p-6 border-b border-border/50">
                <h3 className="font-display font-semibold">Agent Fleet</h3>
                <p className="text-sm text-muted-foreground">Deployment status</p>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { name: "Data Analyst", status: "active", tasks: 12, color: "from-blue-500 to-cyan-500" },
                  { name: "Customer Service", status: "active", tasks: 8, color: "from-purple-500 to-pink-500" },
                  { name: "Inventory Optimizer", status: "active", tasks: 5, color: "from-orange-500 to-red-500" },
                  { name: "Security Monitor", status: "active", tasks: 3, color: "from-blue-500 to-emerald-500" },
                  { name: "Sales Researcher", status: "idle", tasks: 0, color: "from-gray-500 to-gray-600" },
                  { name: "Price Optimizer", status: "beta", tasks: 2, color: "from-yellow-500 to-orange-500" },
                ].map((agent, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center",
                        agent.color
                      )}>
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{agent.name}</p>
                        <div className="flex items-center gap-1.5">
                          <div className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            agent.status === "active" ? "bg-blue-500 animate-pulse" : "bg-gray-500"
                          )} />
                          <p className="text-xs text-muted-foreground capitalize">{agent.status}</p>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">{agent.tasks}</Badge>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Activity Feed & Charts */}
      <section className="section-padding-sm">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card className="glass-card">
              <div className="p-6 border-b border-border/50">
                <h3 className="font-display font-semibold">Activity Feed</h3>
                <p className="text-sm text-muted-foreground">Last 15 minutes</p>
              </div>
              <div className="p-6 space-y-3 max-h-[400px] overflow-y-auto">
                {[
                  { time: "2m ago", event: "Mission #2847 completed", icon: CheckCircle2, color: "text-blue-500" },
                  { time: "5m ago", event: "Agent deployed: Data Analyst #4", icon: Zap, color: "text-blue-500" },
                  { time: "7m ago", event: "Validation passed: Customer data", icon: CheckCircle2, color: "text-blue-500" },
                  { time: "9m ago", event: "Retry initiated: API timeout", icon: AlertTriangle, color: "text-yellow-500" },
                  { time: "11m ago", event: "Mission #2846 started", icon: Activity, color: "text-primary" },
                  { time: "12m ago", event: "Agent scaled up: +2 instances", icon: TrendingUp, color: "text-blue-500" },
                  { time: "14m ago", event: "Report generated: Q4 metrics", icon: BarChart3, color: "text-purple-500" },
                ].map((activity, idx) => {
                  const Icon = activity.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/30 transition-colors"
                    >
                      <Icon className={cn("w-4 h-4 mt-0.5", activity.color)} />
                      <div className="flex-1">
                        <p className="text-sm">{activity.event}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>

            {/* Performance Summary */}
            <Card className="glass-card">
              <div className="p-6 border-b border-border/50">
                <h3 className="font-display font-semibold">Performance Summary</h3>
                <p className="text-sm text-muted-foreground">Last 24 hours</p>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Success Rate</span>
                    <span className="font-medium">99.4%</span>
                  </div>
                  <Progress value={99.4} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Agent Utilization</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Validation Pass Rate</span>
                    <span className="font-medium">98.2%</span>
                  </div>
                  <Progress value={98.2} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                  <div className="text-center p-4 rounded-lg bg-secondary/30">
                    <Clock className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-display font-bold gradient-text">1.2s</p>
                    <p className="text-xs text-muted-foreground">Avg Response</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-secondary/30">
                    <DollarSign className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-display font-bold gradient-text">$142K</p>
                    <p className="text-xs text-muted-foreground">Cost Savings</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
