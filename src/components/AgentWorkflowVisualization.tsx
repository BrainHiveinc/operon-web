import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Database, Shield, FileText, CheckCircle2, Brain, Network, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface WorkflowAgent {
  id: string;
  name: string;
  icon: React.ElementType;
  status: "idle" | "active" | "completed";
  description: string;
}

interface DataPacket {
  id: string;
  fromIndex: number;
  progress: number;
}

const agents: WorkflowAgent[] = [
  {
    id: "receive",
    name: "Mission Receive",
    icon: Zap,
    status: "idle",
    description: "Incoming mission request",
  },
  {
    id: "context",
    name: "Context Fetch",
    icon: Database,
    status: "idle",
    description: "RAG context retrieval",
  },
  {
    id: "execute",
    name: "Agent Execute",
    icon: Brain,
    status: "idle",
    description: "Task execution with tools",
  },
  {
    id: "validate",
    name: "Governance Check",
    icon: Shield,
    status: "idle",
    description: "Policy validation",
  },
  {
    id: "artifact",
    name: "Artifact Store",
    icon: FileText,
    status: "idle",
    description: "Audit-ready output",
  },
  {
    id: "complete",
    name: "Mission Complete",
    icon: CheckCircle2,
    status: "idle",
    description: "Validated success",
  },
];

export function AgentWorkflowVisualization() {
  const [workflow, setWorkflow] = useState<WorkflowAgent[]>(agents);
  const [dataPackets, setDataPackets] = useState<DataPacket[]>([]);
  const [cycleCount, setCycleCount] = useState(0);

  // Workflow execution cycle
  useEffect(() => {
    let currentStep = 0;

    const executeWorkflow = () => {
      if (currentStep >= agents.length) {
        // Complete workflow, reset after 2 seconds
        setTimeout(() => {
          setWorkflow(agents.map(a => ({ ...a, status: "idle" })));
          currentStep = 0;
          setCycleCount(prev => prev + 1);
          setTimeout(executeWorkflow, 1000);
        }, 2000);
        return;
      }

      // Activate current step
      setWorkflow(prev =>
        prev.map((agent, idx) =>
          idx === currentStep
            ? { ...agent, status: "active" }
            : agent
        )
      );

      // Create data packet
      if (currentStep > 0) {
        const packetId = `packet-${Date.now()}`;
        setDataPackets(prev => [...prev, {
          id: packetId,
          fromIndex: currentStep - 1,
          progress: 0,
        }]);

        // Animate packet
        const interval = setInterval(() => {
          setDataPackets(prev => {
            const packet = prev.find(p => p.id === packetId);
            if (!packet || packet.progress >= 100) {
              clearInterval(interval);
              setTimeout(() => {
                setDataPackets(prev => prev.filter(p => p.id !== packetId));
              }, 100);
              return prev;
            }
            return prev.map(p =>
              p.id === packetId ? { ...p, progress: p.progress + 5 } : p
            );
          });
        }, 30);
      }

      // Mark as completed and move to next
      setTimeout(() => {
        setWorkflow(prev =>
          prev.map((agent, idx) =>
            idx === currentStep
              ? { ...agent, status: "completed" }
              : agent
          )
        );

        currentStep++;
        setTimeout(executeWorkflow, 800);
      }, 1500);
    };

    const initialDelay = setTimeout(executeWorkflow, 1000);

    return () => {
      clearTimeout(initialDelay);
    };
  }, []);

  const activeCount = workflow.filter(a => a.status === "active").length;
  const completedCount = workflow.filter(a => a.status === "completed").length;

  return (
    <Card className="glass-card overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <Network className="w-5 h-5 text-primary" />
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/30"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <div>
              <h3 className="text-xl font-display font-bold">
                Agent Workflow Pipeline
              </h3>
              <p className="text-sm text-muted-foreground">
                Watch missions flow through governance-first execution
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <span className="text-muted-foreground">Cycles: </span>
              <span className="text-primary font-semibold">{cycleCount}</span>
            </div>
            <motion.div
              className="w-2 h-2 rounded-full bg-blue-500"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [1, 0.6, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </div>

      {/* Workflow Visualization */}
      <div className="relative p-8 bg-gradient-to-b from-secondary/30 to-background overflow-hidden min-h-[400px]">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-10 grid-bg" />

        {/* Workflow stages */}
        <div className="relative max-w-5xl mx-auto overflow-x-auto pb-4 pt-2">
          <div className="grid grid-cols-6 gap-4 items-center min-w-[800px]">
            {workflow.map((agent, index) => {
              const Icon = agent.icon;
              const isActive = agent.status === "active";
              const isCompleted = agent.status === "completed";

              return (
                <div key={agent.id} className="relative flex flex-col items-center overflow-visible">
                  {/* Connection line to next agent */}
                  {index < workflow.length - 1 && (
                    <div className="absolute top-12 left-1/2 w-full h-1 -ml-[50%]">
                      <motion.div
                        className={cn(
                          "h-full rounded-full transition-colors duration-300",
                          isCompleted ? "bg-primary" : "bg-border"
                        )}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isCompleted ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ transformOrigin: "left" }}
                      />

                      {/* Animated data packets */}
                      <AnimatePresence>
                        {dataPackets
                          .filter(p => p.fromIndex === index)
                          .map(packet => (
                            <motion.div
                              key={packet.id}
                              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50"
                              initial={{ left: "0%" }}
                              animate={{ left: `${packet.progress}%` }}
                              exit={{ opacity: 0 }}
                            >
                              <motion.div
                                className="absolute inset-0 rounded-full bg-primary/30"
                                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 0.6, repeat: Infinity }}
                              />
                            </motion.div>
                          ))}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Agent node */}
                  <motion.div
                    className={cn(
                      "relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300",
                      isActive && "ring-4 ring-primary/50 ring-offset-2 ring-offset-background",
                      isCompleted ? "bg-gradient-to-br from-primary to-primary/60" : "bg-card border-2 border-border"
                    )}
                    animate={{
                      scale: isActive ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      duration: 1,
                      repeat: isActive ? Infinity : 0,
                    }}
                  >
                    <Icon
                      className={cn(
                        "w-8 h-8 transition-colors duration-300",
                        isCompleted ? "text-white" : isActive ? "text-primary" : "text-muted-foreground"
                      )}
                    />

                    {/* Pulse ring for active */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl border-2 border-primary"
                        initial={{ scale: 1, opacity: 0.6 }}
                        animate={{ scale: 1.4, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}

                    {/* Status indicator */}
                    {(isActive || isCompleted) && (
                      <motion.div
                        className={cn(
                          "absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center",
                          isCompleted ? "bg-green-500" : "bg-orange-500"
                        )}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        {isCompleted && (
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        )}
                        {isActive && (
                          <motion.div
                            className="w-2 h-2 rounded-full bg-white"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                          />
                        )}
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Agent info */}
                  <div className="mt-4 text-center">
                    <p className={cn(
                      "text-sm font-semibold mb-1 transition-colors duration-300",
                      isCompleted ? "text-primary" : isActive ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {agent.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {agent.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="absolute bottom-6 left-6 right-6 flex justify-center gap-4">
          <div className="glass-card px-4 py-2 text-sm">
            <span className="text-muted-foreground">Active: </span>
            <span className="font-semibold text-orange-500">{activeCount}</span>
          </div>
          <div className="glass-card px-4 py-2 text-sm">
            <span className="text-muted-foreground">Completed: </span>
            <span className="font-semibold text-green-500">{completedCount}/{workflow.length}</span>
          </div>
          <div className="glass-card px-4 py-2 text-sm flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-muted-foreground">Live workflow execution</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
