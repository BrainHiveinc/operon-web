import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Play, Pause, RotateCcw, CheckCircle2, Loader2, Zap,
  Database, Shield, FileText, TrendingUp, AlertCircle, Clock
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type MissionStep = {
  id: string;
  name: string;
  description: string;
  status: "pending" | "running" | "completed" | "validating";
  duration: number;
  icon: React.ElementType;
  output?: string;
};

const initialSteps: MissionStep[] = [
  {
    id: "step-1",
    name: "Initialize Agent",
    description: "Loading AI model and configuring parameters",
    status: "pending",
    duration: 800,
    icon: Zap,
  },
  {
    id: "step-2",
    name: "Fetch Data Sources",
    description: "Connecting to external APIs and databases",
    status: "pending",
    duration: 1200,
    icon: Database,
  },
  {
    id: "step-3",
    name: "Process Information",
    description: "Analyzing 2,487 data points with ML models",
    status: "pending",
    duration: 1500,
    icon: TrendingUp,
    output: "Found 247 relevant insights across 5 categories",
  },
  {
    id: "step-4",
    name: "Validate Results",
    description: "Running deterministic validators and quality checks",
    status: "pending",
    duration: 1000,
    icon: Shield,
    output: "Validation score: 98.5% • All checks passed",
  },
  {
    id: "step-5",
    name: "Generate Report",
    description: "Creating audit-grade artifacts and documentation",
    status: "pending",
    duration: 900,
    icon: FileText,
    output: "Generated report.pdf (247 KB) with full lineage",
  },
];

export function InteractiveMissionRunner() {
  const [steps, setSteps] = useState<MissionStep[]>(initialSteps);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [missionComplete, setMissionComplete] = useState(false);

  const runMission = async () => {
    setIsRunning(true);
    setMissionComplete(false);
    setCurrentStepIndex(0);
    setSteps(initialSteps);

    for (let i = 0; i < initialSteps.length; i++) {
      setCurrentStepIndex(i);

      // Mark current step as running
      setSteps(prev => prev.map((step, idx) =>
        idx === i ? { ...step, status: "running" } : step
      ));

      await new Promise(resolve => setTimeout(resolve, initialSteps[i].duration));

      // Mark as validating if needed
      if (initialSteps[i].output) {
        setSteps(prev => prev.map((step, idx) =>
          idx === i ? { ...step, status: "validating" } : step
        ));
        await new Promise(resolve => setTimeout(resolve, 400));
      }

      // Mark as completed
      setSteps(prev => prev.map((step, idx) =>
        idx === i ? { ...step, status: "completed" } : step
      ));
    }

    setMissionComplete(true);
    setIsRunning(false);
    setCurrentStepIndex(-1);
  };

  const resetMission = () => {
    setSteps(initialSteps);
    setCurrentStepIndex(-1);
    setMissionComplete(false);
    setIsRunning(false);
  };

  const completedSteps = steps.filter(s => s.status === "completed").length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <Card className="glass-card overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-display font-bold mb-1">
              Interactive Mission Demo
            </h3>
            <p className="text-sm text-muted-foreground">
              Watch an autonomous agent execute a real mission
            </p>
          </div>
          <div className="flex items-center gap-2">
            {!isRunning && !missionComplete && (
              <Button onClick={runMission} className="gap-2">
                <Play className="w-4 h-4" />
                Run Mission
              </Button>
            )}
            {(isRunning || missionComplete) && (
              <Button onClick={resetMission} variant="outline" className="gap-2">
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
            const Icon = step.icon;
            const isActive = currentStepIndex === index;
            const isCompleted = step.status === "completed";
            const isValidating = step.status === "validating";

            return (
              <motion.div
                key={step.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={cn(
                    "p-4 rounded-lg border-2 transition-all duration-300",
                    isActive && "border-primary bg-primary/5 shadow-lg shadow-primary/20",
                    isCompleted && !isActive && "border-blue-500/30 bg-blue-500/5",
                    !isActive && !isCompleted && "border-border/30"
                  )}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <motion.div
                      className={cn(
                        "w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0",
                        isActive && "bg-primary text-primary-foreground",
                        isCompleted && !isActive && "bg-blue-500 text-white",
                        !isActive && !isCompleted && "bg-secondary text-muted-foreground"
                      )}
                      animate={isActive ? {
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: isActive ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : isActive ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm">{step.name}</h4>
                        <Badge
                          variant={isCompleted ? "default" : "secondary"}
                          className={cn(
                            "text-xs",
                            isActive && "bg-primary/20 text-primary border-primary/30",
                            isValidating && "bg-yellow-500/20 text-yellow-600 border-yellow-500/30"
                          )}
                        >
                          {isValidating ? "Validating" : isActive ? "Running" : isCompleted ? "Done" : "Pending"}
                        </Badge>
                      </div>

                      <p className="text-xs text-muted-foreground mb-2">
                        {step.description}
                      </p>

                      {/* Duration */}
                      {(isActive || isCompleted) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="flex items-center gap-1.5 text-xs text-muted-foreground"
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
                          className="mt-3 p-3 rounded-md bg-secondary/50 border border-border/50"
                        >
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-foreground font-mono">{step.output}</p>
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

      {/* Success Banner */}
      <AnimatePresence>
        {missionComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="p-6 border-t border-border/50 bg-gradient-to-r from-blue-500/10 to-transparent"
          >
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center"
              >
                <CheckCircle2 className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h4 className="font-display font-bold text-blue-600 mb-1">
                  Mission Completed Successfully! 🎉
                </h4>
                <p className="text-sm text-muted-foreground">
                  All steps executed with 100% validation accuracy. Artifacts saved to audit trail.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
