import { cn } from "@/lib/utils";

type Status = "completed" | "running" | "retrying" | "blocked" | "queued";

interface StatusBadgeProps {
  status: Status;
  size?: "sm" | "md";
}

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const styles: Record<Status, string> = {
    completed: "bg-success/15 text-success border-success/30",
    running: "bg-info/15 text-info border-info/30",
    retrying: "bg-warning/15 text-warning border-warning/30",
    blocked: "bg-destructive/15 text-destructive border-destructive/30",
    queued: "bg-muted text-muted-foreground border-border",
  };

  const labels: Record<Status, string> = {
    completed: "COMPLETED",
    running: "RUNNING",
    retrying: "RETRYING",
    blocked: "BLOCKED",
    queued: "QUEUED",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-mono uppercase tracking-wider",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs",
        styles[status]
      )}
    >
      <span
        className={cn(
          "rounded-full animate-pulse",
          size === "sm" ? "w-1.5 h-1.5" : "w-2 h-2",
          {
            "bg-success": status === "completed",
            "bg-info": status === "running",
            "bg-warning": status === "retrying",
            "bg-destructive": status === "blocked",
            "bg-muted-foreground": status === "queued",
          }
        )}
      />
      {labels[status]}
    </span>
  );
}
