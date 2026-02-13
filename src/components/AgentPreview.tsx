import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Play, Pause, RotateCcw, TrendingUp, Database, Shield,
  FileText, CheckCircle2, AlertCircle, Clock, Zap
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { AGENT_TYPES } from "@/lib/constants";

interface SimulationStep {
  id: string;
  action: string;
  status: "pending" | "running" | "completed" | "error";
  duration: number;
  output?: string;
}

const simulationSteps: SimulationStep[] = [
  {
    id: "fetch",
    action: "Fetching customer data from CRM",
    status: "pending",
    duration: 800,
    output: "Retrieved 1,247 customer records",
  },
  {
    id: "analyze",
    action: "Analyzing engagement patterns",
    status: "pending",
    duration: 1200,
    output: "Identified 342 high-value targets",
  },
  {
    id: "enrich",
    action: "Enriching profiles with external data",
    status: "pending",
    duration: 1000,
    output: "Added 847 data points across 5 sources",
  },
  {
    id: "validate",
    action: "Running quality validators",
    status: "pending",
    duration: 600,
    output: "Validation score: 97.8%",
  },
  {
    id: "generate",
    action: "Generating personalized outreach",
    status: "pending",
    duration: 900,
    output: "Created 342 customized emails",
  },
];

export function AgentPreview() {
  const [selectedAgent, setSelectedAgent] = useState(AGENT_TYPES[0].id);
  const [steps, setSteps] = useState<SimulationStep[]>(simulationSteps);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);

  const agent = AGENT_TYPES.find(a => a.id === selectedAgent) || AGENT_TYPES[0];

  const runSimulation = async () => {
    setIsRunning(true);
    setIsComplete(false);
    setSteps(simulationSteps);

    for (let i = 0; i < simulationSteps.length; i++) {
      setCurrentStep(i);

      // Mark as running
      setSteps(prev => prev.map((step, idx) =>
        idx === i ? { ...step, status: "running" } : step
      ));

      await new Promise(resolve => setTimeout(resolve, simulationSteps[i].duration));

      // Mark as completed
      setSteps(prev => prev.map((step, idx) =>
        idx === i ? { ...step, status: "completed" } : step
      ));
    }

    setIsRunning(false);
    setCurrentStep(-1);
    setIsComplete(true);
  };

  const reset = () => {
    setSteps(simulationSteps.map(s => ({ ...s, status: "pending" })));
    setCurrentStep(-1);
    setIsComplete(false);
    setIsRunning(false);
  };

  const completedSteps = steps.filter(s => s.status === "completed").length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <div className="space-y-6">
      {/* Agent Selector */}
      <Card className="glass-card p-6">
        <h3 className="text-xl font-display font-bold mb-4">
          Live Agent Preview
        </h3>

        <Tabs value={selectedAgent} onValueChange={setSelectedAgent}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            {AGENT_TYPES.slice(0, 3).map((agent) => (
              <TabsTrigger key={agent.id} value={agent.id}>
                {agent.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {AGENT_TYPES.slice(0, 3).map((agent) => (
            <TabsContent key={agent.id} value={agent.id}>
              <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border-2 border-primary/30 flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{agent.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {agent.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {agent.capabilities.slice(0, 4).map((cap, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {cap}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Card>

      {/* Simulation Controls & Steps */}
      <Card className="glass-card overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-display font-bold mb-1">
                Simulation
              </h3>
              <p className="text-sm text-muted-foreground">
                Watch the agent work in real-time
              </p>
            </div>
            <div className="flex items-center gap-2">
              {!isRunning && !isComplete && (
                <Button onClick={runSimulation} size="sm" className="gap-2">
                  <Play className="w-4 h-4" />
                  Start
                </Button>
              )}
              {(isRunning || isComplete) && (
                <Button onClick={reset} size="sm" variant="outline" className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{completedSteps}/{steps.length} steps</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Steps */}
        <div className="p-6 space-y-3 max-h-[500px] overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {steps.map((step, index) => {
              const isActive = currentStep === index;
              const isCompleted = step.status === "completed";
              const isPending = step.status === "pending";

              return (
                <motion.div
                  key={step.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div
                    className={cn(
                      "p-4 rounded-lg border-2 transition-all",
                      isActive && "border-primary bg-primary/5 shadow-lg shadow-primary/20",
                      isCompleted && "border-blue-500/30 bg-blue-500/5",
                      isPending && "border-border/30 bg-secondary/20"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <motion.div
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border-2 backdrop-blur-sm",
                          isActive && "bg-primary/10 border-primary text-primary",
                          isCompleted && "bg-blue-500/10 border-blue-500/50 text-blue-500",
                          isPending && "bg-secondary/50 border-border/50 text-muted-foreground"
                        )}
                        animate={isActive ? {
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        } : {}}
                        transition={{
                          duration: 2,
                          repeat: isActive ? Infinity : 0,
                        }}
                      >
                        {isActive && <Clock className="w-5 h-5 animate-spin" />}
                        {isCompleted && <CheckCircle2 className="w-5 h-5" />}
                        {isPending && <span className="text-sm font-bold">{index + 1}</span>}
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-sm">{step.action}</h4>
                          <Badge
                            variant={isCompleted ? "default" : "secondary"}
                            className={cn(
                              "text-xs",
                              isActive && "bg-primary/20 text-primary border-primary/30"
                            )}
                          >
                            {isActive ? "Running" : isCompleted ? "Done" : "Pending"}
                          </Badge>
                        </div>

                        {/* Duration */}
                        {(isActive || isCompleted) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2"
                          >
                            <Clock className="w-3 h-3" />
                            <span>{step.duration}ms</span>
                          </motion.div>
                        )}

                        {/* Output */}
                        {step.output && isCompleted && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-3 p-3 rounded-md border bg-blue-500/10 border-blue-500/30"
                          >
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                              <p className="text-xs text-foreground">{step.output}</p>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Complete Banner */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="p-6 border-t border-border/50 bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className="relative"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  {/* Operon Logo with success styling */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-2 border-blue-500/50 flex items-center justify-center p-3 shadow-lg backdrop-blur-sm">
                    <Logo className="w-full h-full" animated={true} />
                  </div>

                  {/* Success checkmark badge */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center shadow-md"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  </motion.div>

                  {/* Pulse effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-blue-500/30"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>

                <div className="flex-1">
                  <h4 className="font-display font-bold text-blue-600 mb-1 text-lg">
                    Simulation Complete! 🎉
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Agent processed 1,247 records in {steps.reduce((acc, s) => acc + s.duration, 0)}ms
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1 text-xs text-blue-600">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>100% Success Rate</span>
                    </div>
                    <span className="text-xs text-muted-foreground">•</span>
                    <div className="flex items-center gap-1 text-xs text-blue-600">
                      <Shield className="w-3 h-3" />
                      <span>Validated</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: "Total Steps", value: steps.length, icon: TrendingUp },
          { label: "Completed", value: completedSteps, icon: CheckCircle2 },
          { label: "Success Rate", value: "100%", icon: Shield },
          { label: "Avg Time", value: `${Math.round(steps.reduce((acc, s) => acc + s.duration, 0) / steps.length)}ms`, icon: Clock },
        ].map((metric, idx) => {
          const Icon = metric.icon;
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
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{metric.label}</p>
                    <p className="text-lg font-bold">{metric.value}</p>
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
