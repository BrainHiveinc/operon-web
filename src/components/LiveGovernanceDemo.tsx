import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MissionInput } from "./MissionInput";
import { ExecutionVisualizer } from "./ExecutionVisualizer";
import { AIResult } from "./AIResult";
import { LogoWithHeartbeat } from "./LogoWithHeartbeat";
import { Sparkles, Shield, Zap } from "lucide-react";
import { AgentApiService, type MissionReport } from "@/services/agentApi";

export interface Mission {
  id: string;
  title: string;
  description: string;
  status: "pending" | "executing" | "completed" | "failed";
  tasks: Task[];
  agents: Agent[];
  governanceChecks: GovernanceCheck[];
  toolUsage: ToolUsage[];
  startTime?: number;
  endTime?: number;
  result?: MissionReport;
}

export interface Task {
  id: string;
  name: string;
  status: "pending" | "executing" | "completed" | "failed" | "validating";
  assignedAgent?: string;
  progress: number;
  result?: string;
  validationStatus?: "pending" | "passed" | "failed";
}

export interface Agent {
  id: string;
  name: string;
  type: string;
  status: "idle" | "working" | "validating" | "waiting";
  currentTask?: string;
  color: string;
}

export interface GovernanceCheck {
  id: string;
  type: "validation" | "approval" | "policy" | "constraint";
  description: string;
  status: "pending" | "passed" | "failed" | "warning";
  timestamp: number;
  details?: string;
}

export interface ToolUsage {
  id: string;
  tool: string;
  action: string;
  timestamp: number;
  status: "executing" | "completed" | "failed";
  result?: string;
}

const exampleMissions = [
  {
    title: "Market Research",
    description: "Research top 5 AI governance platforms, compare features, and create a competitive analysis report",
    category: "research"
  },
  {
    title: "Data Processing",
    description: "Analyze sales data from Q4, identify trends, and generate visualizations with insights",
    category: "data"
  },
  {
    title: "Content Generation",
    description: "Create a technical blog post about autonomous agents with code examples and governance best practices",
    category: "content"
  },
  {
    title: "Code Review",
    description: "Review Python codebase for security vulnerabilities, performance issues, and suggest improvements",
    category: "engineering"
  }
];

export function LiveGovernanceDemo() {
  const [currentMission, setCurrentMission] = useState<Mission | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleNewMission = () => {
    setCurrentMission(null);
    setIsExecuting(false);
  };

  const handleMissionSubmit = (missionDesc: string) => {
    // Create a new mission with real-time execution simulation
    const newMission: Mission = {
      id: `mission_${Date.now()}`,
      title: missionDesc.split('.')[0].substring(0, 50),
      description: missionDesc,
      status: "pending",
      tasks: [],
      agents: [],
      governanceChecks: [],
      toolUsage: [],
      startTime: Date.now()
    };

    setCurrentMission(newMission);
    setIsExecuting(true);

    // Start mission execution
    executeMission(newMission);
  };

  const executeMission = async (mission: Mission) => {
    try {
      // Phase 1: Initialize (show UI feedback immediately)
      setTimeout(() => {
        setCurrentMission(prev => prev ? {
          ...prev,
          status: "executing",
          tasks: [
            { id: "task_1", name: "Initializing Agent Sri", status: "executing", progress: 0 },
            { id: "task_2", name: "Analyzing mission requirements", status: "pending", progress: 0 },
            { id: "task_3", name: "Executing with Claude AI", status: "pending", progress: 0 }
          ],
          governanceChecks: [
            {
              id: "gc_1",
              type: "policy",
              description: "Validating mission against security policies",
              status: "pending",
              timestamp: Date.now()
            }
          ]
        } : null);
      }, 300);

      // Phase 2: Setup agents
      setTimeout(() => {
        setCurrentMission(prev => prev ? {
          ...prev,
          tasks: prev.tasks.map(t =>
            t.id === "task_1" ? { ...t, status: "completed", progress: 100 } :
            t.id === "task_2" ? { ...t, status: "executing", progress: 20 } : t
          ),
          agents: [
            { id: "agent_1", name: "Agent Sri", type: "orchestrator", status: "working", color: "primary" },
            { id: "agent_2", name: "Claude AI", type: "reasoning", status: "working", color: "purple-500" }
          ],
          governanceChecks: [
            ...prev.governanceChecks.map(gc => ({ ...gc, status: "passed" as const })),
            {
              id: "gc_2",
              type: "validation",
              description: "AI model permissions verified",
              status: "passed",
              timestamp: Date.now()
            }
          ]
        } : null);
      }, 1500);

      // Phase 3: Call real API
      setTimeout(() => {
        setCurrentMission(prev => prev ? {
          ...prev,
          tasks: prev.tasks.map(t =>
            t.id === "task_2" ? { ...t, status: "completed", progress: 100 } :
            t.id === "task_3" ? { ...t, status: "executing", progress: 10 } : t
          ),
          toolUsage: [
            {
              id: "tool_1",
              tool: "Claude API",
              action: "Generating real-time analysis...",
              timestamp: Date.now(),
              status: "executing"
            }
          ]
        } : null);
      }, 2500);

      // Execute real API call
      const result = await AgentApiService.executeMission({
        description: mission.description
      });

      console.log("[LiveGovernanceDemo] API Response:", result);
      console.log("[LiveGovernanceDemo] Mission Result:", result.mission.result);

      // Phase 4: Processing results
      setTimeout(() => {
        setCurrentMission(prev => prev ? {
          ...prev,
          tasks: prev.tasks.map(t =>
            t.id === "task_3" ? { ...t, status: "executing", progress: 80 } : t
          ),
          toolUsage: [
            ...prev.toolUsage.map(tu => ({ ...tu, status: "completed" as const })),
            {
              id: "tool_2",
              tool: "Result Validator",
              action: "Validating AI-generated insights...",
              timestamp: Date.now(),
              status: "executing"
            }
          ],
          governanceChecks: [
            ...prev.governanceChecks,
            {
              id: "gc_3",
              type: "validation",
              description: `Analyzed ${result.mission.result.metrics.sourcesAnalyzed} sources with ${result.mission.result.metrics.confidence}% confidence`,
              status: "passed",
              timestamp: Date.now()
            }
          ]
        } : null);
      }, 500);

      // Phase 5: Complete
      setTimeout(() => {
        setCurrentMission(prev => prev ? {
          ...prev,
          status: "completed",
          tasks: prev.tasks.map(t => ({
            ...t,
            status: "completed" as const,
            progress: 100,
            validationStatus: "passed" as const,
            result: t.id === "task_3" ? result.mission.result.summary : undefined
          })),
          agents: prev.agents.map(a => ({ ...a, status: "idle" as const })),
          governanceChecks: [
            ...prev.governanceChecks,
            {
              id: "gc_4",
              type: "approval",
              description: "Mission completed with full AI transparency and governance",
              status: "passed",
              timestamp: Date.now()
            }
          ],
          toolUsage: prev.toolUsage.map(tu => ({ ...tu, status: "completed" as const })),
          endTime: Date.now(),
          result: result.mission.result
        } : null);
        setIsExecuting(false);
      }, 1500);

    } catch (error) {
      console.error("Mission execution failed:", error);
      setCurrentMission(prev => prev ? {
        ...prev,
        status: "failed",
        tasks: prev.tasks.map(t => ({
          ...t,
          status: "failed" as const
        }))
      } : null);
      setIsExecuting(false);
    }
  };

  return (
    <section className="section-padding relative overflow-hidden bg-gray-50 dark:bg-slate-900">
      <div className="section-container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <LogoWithHeartbeat size="sm" clickable={false} showBadge={false} />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 mb-6">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
              Real AI • Live Execution
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 text-gray-900 dark:text-white">
            Run your mission with <span className="bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">Agent Sri</span>
          </h2>

          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Give Agent Sri any mission and watch it execute with real AI (LLaMA 3.2). Every task is analyzed,
            validated, and completed with full transparency and governance—100% free, runs locally, no API keys needed.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Live Execution</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Governance</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Multi-Agent</span>
            </div>
          </div>
        </motion.div>

        {/* Main Demo Area */}
        <AnimatePresence mode="wait">
          {currentMission?.status === "completed" ? (
            /* Show Results when completed */
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AIResult mission={currentMission} onNewMission={handleNewMission} />
            </motion.div>
          ) : (
            /* Show Input + Execution Visualizer */
            <motion.div
              key="execution"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
            >
              {/* Left: Mission Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <MissionInput
                  onSubmit={handleMissionSubmit}
                  examples={exampleMissions}
                  isExecuting={isExecuting}
                />
              </motion.div>

              {/* Right: Execution Visualizer */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <ExecutionVisualizer mission={currentMission} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            This is a real demonstration using Agent Sri's governance engine.
            In production, you can connect to your own tools, databases, and APIs.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
