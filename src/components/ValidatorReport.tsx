import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Clock, FileText, ExternalLink, RefreshCw } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

const validatorData = {
  missionId: "#2847",
  missionName: "Lead Enrichment Batch",
  status: "completed" as const,
  startTime: "14:32:01",
  endTime: "14:32:10",
  duration: "9.2s",
  validators: [
    { name: "schema_check", passed: true, confidence: 0.98 },
    { name: "data_quality_check", passed: true, confidence: 0.95 },
    { name: "enrichment_coverage", passed: true, confidence: 0.92 },
  ],
  toolCalls: [
    { tool: "clearbit.enrich_company", status: "success", retries: 1 },
    { tool: "apollo.search_contacts", status: "success", retries: 0 },
    { tool: "crm.update_records", status: "success", retries: 0 },
  ],
  artifacts: [
    { name: "enriched_leads.json", size: "124 KB" },
    { name: "validation_report.pdf", size: "45 KB" },
    { name: "audit_log.jsonl", size: "12 KB" },
  ],
  evidence: [
    "Clearbit returned 15/15 company fields",
    "Apollo matched 12/15 contact records",
    "CRM sync completed with 0 conflicts",
  ],
};

export function ValidatorReport() {
  return (
    <div className="glass-card overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border bg-secondary/30">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <h3 className="font-display font-semibold text-sm">Validator Report</h3>
          </div>
          <StatusBadge status={validatorData.status} size="sm" />
        </div>
        <p className="text-xs text-muted-foreground">
          Mission {validatorData.missionId} · {validatorData.missionName}
        </p>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Timing */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>Duration: {validatorData.duration}</span>
          </div>
          <div className="text-muted-foreground">
            {validatorData.startTime} → {validatorData.endTime}
          </div>
        </div>

        {/* Validators */}
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Validators
          </h4>
          <div className="space-y-2">
            {validatorData.validators.map((v, i) => (
              <motion.div
                key={v.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-2 rounded bg-secondary/50"
              >
                <div className="flex items-center gap-2">
                  {v.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  ) : (
                    <XCircle className="w-4 h-4 text-destructive" />
                  )}
                  <span className="font-mono text-xs">{v.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {(v.confidence * 100).toFixed(0)}%
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tool Calls */}
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Tool Calls
          </h4>
          <div className="space-y-2">
            {validatorData.toolCalls.map((t, i) => (
              <div
                key={t.tool}
                className="flex items-center justify-between p-2 rounded bg-secondary/50"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs">{t.tool}</span>
                </div>
                <div className="flex items-center gap-2">
                  {t.retries > 0 && (
                    <span className="flex items-center gap-1 text-xs text-warning">
                      <RefreshCw className="w-3 h-3" />
                      {t.retries}
                    </span>
                  )}
                  <span className="text-xs text-success">200</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evidence */}
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Evidence
          </h4>
          <ul className="space-y-1">
            {validatorData.evidence.map((e, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="text-primary mt-0.5">•</span>
                {e}
              </li>
            ))}
          </ul>
        </div>

        {/* Artifacts */}
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Artifacts
          </h4>
          <div className="space-y-1">
            {validatorData.artifacts.map((a) => (
              <div
                key={a.name}
                className="flex items-center justify-between p-2 rounded bg-secondary/50 group cursor-pointer hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="font-mono text-xs">{a.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{a.size}</span>
                  <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
