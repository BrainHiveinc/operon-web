import { motion } from "framer-motion";
import { MISSION_TIMELINE } from "@/lib/constants";
import { StatusBadge } from "./StatusBadge";
import { Layers } from "lucide-react";

export function MissionTimeline() {
  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
        <Layers className="w-4 h-4 text-primary" />
        <h3 className="font-display font-semibold text-sm">Mission Queue</h3>
      </div>
      <div className="space-y-3">
        {MISSION_TIMELINE.map((mission, index) => (
          <motion.div
            key={mission.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{mission.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {mission.time} · {mission.tasks} tasks
              </p>
            </div>
            <StatusBadge
              status={mission.status as "completed" | "running" | "retrying" | "blocked" | "queued"}
              size="sm"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
