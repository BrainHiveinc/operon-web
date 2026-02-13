import { motion } from "framer-motion";
import { Zap, RefreshCw, CheckCircle2, Settings, Database, Link } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

const agentActions = [
  {
    id: 1,
    action: "Parse mission context",
    status: "completed",
    time: "0.2s",
    icon: Settings,
  },
  {
    id: 2,
    action: "Load RAG context bundle",
    status: "completed",
    time: "1.1s",
    icon: Database,
    sources: 3,
  },
  {
    id: 3,
    action: "Execute clearbit.enrich_company",
    status: "completed",
    time: "2.8s",
    icon: Link,
    retries: 1,
  },
  {
    id: 4,
    action: "Validate output schema",
    status: "completed",
    time: "0.4s",
    icon: CheckCircle2,
  },
  {
    id: 5,
    action: "Execute apollo.search_contacts",
    status: "running",
    time: "1.2s",
    icon: Link,
  },
  {
    id: 6,
    action: "Final validation pass",
    status: "queued",
    time: "—",
    icon: CheckCircle2,
  },
];

export function AgentActionsPanel() {
  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
        <Zap className="w-4 h-4 text-primary" />
        <h3 className="font-display font-semibold text-sm">Agent Actions</h3>
      </div>
      <div className="space-y-2">
        {agentActions.map((action, index) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50"
          >
            <div className="mt-0.5">
              <action.icon className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-medium text-sm truncate">{action.action}</p>
                {action.retries && action.retries > 0 && (
                  <span className="flex items-center gap-1 text-xs text-warning">
                    <RefreshCw className="w-3 h-3" />
                    {action.retries}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{action.time}</span>
                {action.sources && <span>{action.sources} sources</span>}
              </div>
            </div>
            <StatusBadge
              status={action.status as "completed" | "running" | "queued"}
              size="sm"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
