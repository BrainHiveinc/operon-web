import { motion, AnimatePresence } from "framer-motion";
import { Mission, Task, Agent, GovernanceCheck, ToolUsage } from "./LiveGovernanceDemo";
import {
  CheckCircle2, Circle, Loader2, XCircle, AlertTriangle,
  Shield, Zap, Search, Database, Code, FileText, Clock,
  TrendingUp, Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";

interface ExecutionVisualizerProps {
  mission: Mission | null;
}

const toolIcons: Record<string, React.ElementType> = {
  "Web Search": Search,
  "Data Analysis": Database,
  "Code Execution": Code,
  "File Operations": FileText
};

const statusIcons: Record<Task["status"], React.ElementType> = {
  pending: Circle,
  executing: Loader2,
  completed: CheckCircle2,
  failed: XCircle,
  validating: Shield
};

const statusColors: Record<Task["status"], string> = {
  pending: "text-muted-foreground",
  executing: "text-primary animate-spin",
  completed: "text-blue-500",
  failed: "text-red-500",
  validating: "text-yellow-500"
};

const governanceColors: Record<GovernanceCheck["status"], string> = {
  pending: "bg-yellow-500/10 border-yellow-500/30 text-yellow-500",
  passed: "bg-blue-500/10 border-blue-500/30 text-blue-500",
  failed: "bg-red-500/10 border-red-500/30 text-red-500",
  warning: "bg-orange-500/10 border-orange-500/30 text-orange-500"
};

export function ExecutionVisualizer({ mission }: ExecutionVisualizerProps) {
  if (!mission) {
    return (
      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-sm p-8 h-full flex flex-col items-center justify-center text-center min-h-[500px]">
        <Activity className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-xl font-display font-semibold mb-2 text-gray-700 dark:text-gray-300">
          Ready to Execute
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm">
          Enter a mission on the left to watch Agent Sri execute it with full governance controls in real-time.
        </p>
      </div>
    );
  }

  const executionTime = mission.endTime
    ? ((mission.endTime - (mission.startTime || 0)) / 1000).toFixed(1)
    : mission.startTime
    ? ((Date.now() - mission.startTime) / 1000).toFixed(1)
    : "0.0";

  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-sm p-6 sm:p-8 h-full flex flex-col max-h-[800px] overflow-hidden">
      {/* Header with Status */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg sm:text-xl font-display font-bold line-clamp-1 text-gray-900 dark:text-white">
              {mission.title}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Mission ID: {mission.id}
            </p>
          </div>
          <div className={cn(
            "px-3 py-1 rounded-full text-xs font-medium border flex-shrink-0",
            mission.status === "completed" && "bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400",
            mission.status === "executing" && "bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400",
            mission.status === "failed" && "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400",
            mission.status === "pending" && "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-400"
          )}>
            {mission.status === "executing" && (
              <Loader2 className="w-3 h-3 inline mr-1 animate-spin" />
            )}
            {mission.status.toUpperCase()}
          </div>
        </div>

        {/* Execution Stats */}
        <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {executionTime}s
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {mission.tasks.filter(t => t.status === "completed").length}/{mission.tasks.length} tasks
          </div>
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            {mission.governanceChecks.filter(gc => gc.status === "passed").length} checks
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-2">
        {/* Active Agents */}
        {mission.agents.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
              <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Active Agents
            </h4>
            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {mission.agents.map((agent) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="p-3 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          agent.status === "working" && "bg-indigo-600 dark:bg-indigo-400 animate-pulse shadow-lg shadow-indigo-500/50",
                          agent.status === "idle" && "bg-gray-400 dark:bg-gray-600",
                          agent.status === "validating" && "bg-amber-500 animate-pulse shadow-lg shadow-amber-500/50"
                        )} />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{agent.name}</span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">({agent.type})</span>
                      </div>
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        agent.status === "working" && "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400",
                        agent.status === "idle" && "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400",
                        agent.status === "validating" && "bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400"
                      )}>
                        {agent.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Task Execution */}
        {mission.tasks.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Task Execution
            </h4>
            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {mission.tasks.map((task, index) => {
                  const StatusIcon = statusIcons[task.status];
                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700"
                    >
                      <div className="flex items-start gap-3">
                        <StatusIcon className={cn(
                          "w-4 h-4 mt-0.5 flex-shrink-0",
                          task.status === "pending" && "text-gray-400 dark:text-gray-600",
                          task.status === "executing" && "text-indigo-600 dark:text-indigo-400 animate-spin",
                          task.status === "completed" && "text-emerald-600 dark:text-emerald-400",
                          task.status === "failed" && "text-red-600 dark:text-red-400",
                          task.status === "validating" && "text-amber-600 dark:text-amber-400"
                        )} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-1 text-gray-900 dark:text-white">{task.name}</p>
                          {task.assignedAgent && (
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                              Assigned to: {task.assignedAgent}
                            </p>
                          )}
                          {task.status === "executing" && task.progress > 0 && (
                            <div className="mt-2">
                              <Progress value={task.progress} className="h-1" />
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{task.progress}%</p>
                            </div>
                          )}
                          {task.validationStatus && (
                            <div className="mt-2 flex items-center gap-1 text-xs">
                              <Shield className="w-3 h-3" />
                              <span className={cn(
                                task.validationStatus === "passed" && "text-emerald-600 dark:text-emerald-400",
                                task.validationStatus === "pending" && "text-amber-600 dark:text-amber-400",
                                task.validationStatus === "failed" && "text-red-600 dark:text-red-400"
                              )}>
                                Validation: {task.validationStatus}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Tool Usage */}
        {mission.toolUsage.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
              <Code className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Tool Usage
            </h4>
            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {mission.toolUsage.map((tool) => {
                  const ToolIcon = toolIcons[tool.tool] || Code;
                  return (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <ToolIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{tool.tool}</span>
                        {tool.status === "executing" && (
                          <Loader2 className="w-3 h-3 text-indigo-600 dark:text-indigo-400 animate-spin ml-auto" />
                        )}
                        {tool.status === "completed" && (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400 ml-auto" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{tool.action}</p>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Governance Checks */}
        {mission.governanceChecks.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
              <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Governance Checks
            </h4>
            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {mission.governanceChecks.map((check) => (
                  <motion.div
                    key={check.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={cn(
                      "p-3 rounded-lg border text-xs",
                      check.status === "pending" && "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200",
                      check.status === "passed" && "bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200",
                      check.status === "failed" && "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-900 dark:text-red-200",
                      check.status === "warning" && "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800 text-orange-900 dark:text-orange-200"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      {check.status === "passed" && <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />}
                      {check.status === "pending" && <Loader2 className="w-4 h-4 flex-shrink-0 mt-0.5 animate-spin" />}
                      {check.status === "failed" && <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />}
                      {check.status === "warning" && <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium uppercase tracking-wide mb-1">{check.type}</p>
                        <p>{check.description}</p>
                        {check.details && (
                          <p className="mt-1 opacity-80">{check.details}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
