import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TERMINAL_LOGS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Terminal() {
  const [visibleLogs, setVisibleLogs] = useState<typeof TERMINAL_LOGS>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLogs((prev) => {
        if (prev.length >= TERMINAL_LOGS.length) {
          return [];
        }
        return TERMINAL_LOGS.slice(0, prev.length + 1);
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "success":
        return "text-success";
      case "warn":
        return "text-warning";
      case "error":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "success":
        return "bg-success/20 text-success";
      case "warn":
        return "bg-warning/20 text-warning";
      case "error":
        return "bg-destructive/20 text-destructive";
      default:
        return "bg-info/20 text-info";
    }
  };

  return (
    <div className="terminal overflow-hidden shadow-2xl shadow-primary/10">
      <div className="terminal-header">
        <div className="terminal-dot bg-destructive" />
        <div className="terminal-dot bg-warning" />
        <div className="terminal-dot bg-success" />
        <span className="ml-3 text-xs text-muted-foreground font-mono">
          nexus-cli — mission-runner
        </span>
      </div>
      <div className="terminal-body min-h-[280px] max-h-[320px] overflow-hidden">
        {visibleLogs.map((log, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-start gap-3 py-1"
          >
            <span className="text-muted-foreground/60 shrink-0">{log.time}</span>
            <span
              className={cn(
                "text-xs px-1.5 py-0.5 rounded shrink-0 font-medium uppercase tracking-wide",
                getLevelBadge(log.level)
              )}
            >
              {log.level}
            </span>
            <span className={cn("break-all", getLevelColor(log.level))}>
              {log.message}
            </span>
          </motion.div>
        ))}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-2 h-4 bg-primary ml-1 mt-1"
        />
      </div>
    </div>
  );
}
