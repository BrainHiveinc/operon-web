import { motion } from "framer-motion";
import { useState } from "react";
import { Play, RotateCcw, CheckCircle2, AlertTriangle, Copy, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const examples = {
  mission: {
    title: "Mission Definition",
    code: `mission:
  name: lead_enrichment
  timeout: 300s
  retry:
    max_attempts: 3
    backoff: exponential
  validators:
    - schema_check
    - data_quality
  agents:
    pool: growth_ops
    capacity: 10`,
    output: {
      status: "success",
      mission_id: "msn_2847_001",
      duration: "2.4s",
      agents_used: 3,
      validations: ["✓ Schema valid", "✓ Data quality: 98.5%"],
    },
  },
  validator: {
    title: "Custom Validator",
    code: `export const schemaValidator = {
  name: 'schema_check',
  run: async (output, context) => {
    const valid = await validateSchema(
      output,
      context.expectedSchema
    );
    return {
      passed: valid,
      confidence: 0.98,
      evidence: output.metadata
    };
  }
};`,
    output: {
      status: "success",
      validator: "schema_check",
      passed: true,
      confidence: 0.98,
      checks: ["✓ Required fields present", "✓ Type validation passed", "✓ Constraints met"],
    },
  },
  policy: {
    title: "Governance Policy",
    code: `governance:
  permissions:
    - action: crm.update
      requires: admin
  approval:
    - action: bulk_delete
      approvers: [ops_lead]
  blast_radius:
    max_records: 1000
    require_approval: true`,
    output: {
      status: "success",
      policy_applied: "crm_governance",
      checks: ["✓ User has admin role", "✓ Blast radius: 247 records (under limit)", "✓ Audit trail enabled"],
    },
  },
};

type ExampleKey = keyof typeof examples;

export function CodePlayground() {
  const [activeExample, setActiveExample] = useState<ExampleKey>("mission");
  const [code, setCode] = useState(examples[activeExample].code);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleExampleChange = (key: ExampleKey) => {
    setActiveExample(key);
    setCode(examples[key].code);
    setHasRun(false);
  };

  const runCode = async () => {
    setIsRunning(true);
    setHasRun(false);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRunning(false);
    setHasRun(true);
  };

  const resetCode = () => {
    setCode(examples[activeExample].code);
    setHasRun(false);
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const example = examples[activeExample];
  const output = example.output;

  return (
    <Card className="glass-card overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-display font-bold mb-1">
              Interactive Playground
            </h3>
            <p className="text-sm text-muted-foreground">
              Edit the code and run it to see the results
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={copyCode}
              size="sm"
              variant="outline"
              className="gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </Button>
            <Button
              onClick={resetCode}
              size="sm"
              variant="outline"
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
            <Button
              onClick={runCode}
              size="sm"
              className="gap-2"
              disabled={isRunning}
            >
              <Play className="w-4 h-4" />
              {isRunning ? "Running..." : "Run"}
            </Button>
          </div>
        </div>

        {/* Example Tabs */}
        <Tabs value={activeExample} onValueChange={(v) => handleExampleChange(v as ExampleKey)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="mission">Mission</TabsTrigger>
            <TabsTrigger value="validator">Validator</TabsTrigger>
            <TabsTrigger value="policy">Policy</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Code Editor & Output */}
      <div className="grid lg:grid-cols-2 gap-0 divide-x divide-border">
        {/* Editor */}
        <div className="p-6">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-sm font-semibold text-muted-foreground">
              {example.title}
            </h4>
            <div className="text-xs text-muted-foreground font-mono">
              {code.split('\n').length} lines
            </div>
          </div>
          <div className="terminal">
            <div className="terminal-header">
              <div className="terminal-dot bg-destructive" />
              <div className="terminal-dot bg-warning" />
              <div className="terminal-dot bg-success" />
            </div>
            <div className="terminal-body min-h-[300px]">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full min-h-[300px] bg-transparent text-sm font-mono text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 p-2 rounded"
                spellCheck={false}
              />
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="p-6 bg-secondary/20">
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-muted-foreground">
              Output
            </h4>
          </div>

          {!hasRun && !isRunning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center min-h-[300px] text-muted-foreground text-sm"
            >
              Click "Run" to execute the code
            </motion.div>
          )}

          {isRunning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="min-h-[300px] space-y-3"
            >
              {[
                "Parsing configuration...",
                "Validating syntax...",
                "Checking permissions...",
                "Executing...",
              ].map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.3 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-muted-foreground">{step}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {hasRun && !isRunning && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Status */}
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  output.status === "success" ? "bg-blue-500/20" : "bg-red-500/20"
                )}>
                  {output.status === "success" ? (
                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-sm">
                    {output.status === "success" ? "Execution successful" : "Execution failed"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {'duration' in output && `Completed in ${output.duration}`}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2">
                {'mission_id' in output && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Mission ID:</span>
                    <code className="font-mono text-xs bg-secondary px-2 py-1 rounded">
                      {output.mission_id}
                    </code>
                  </div>
                )}
                {'agents_used' in output && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Agents used:</span>
                    <span className="font-medium">{output.agents_used}</span>
                  </div>
                )}
                {'validator' in output && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Validator:</span>
                    <code className="font-mono text-xs bg-secondary px-2 py-1 rounded">
                      {output.validator}
                    </code>
                  </div>
                )}
                {'confidence' in output && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Confidence:</span>
                    <span className="font-medium">{(output.confidence * 100).toFixed(1)}%</span>
                  </div>
                )}
                {'policy_applied' in output && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Policy:</span>
                    <code className="font-mono text-xs bg-secondary px-2 py-1 rounded">
                      {output.policy_applied}
                    </code>
                  </div>
                )}
              </div>

              {/* Checks/Validations */}
              {'validations' in output && output.validations && (
                <div className="space-y-2 pt-2 border-t border-border">
                  <p className="text-xs font-semibold text-muted-foreground">Validations:</p>
                  {output.validations.map((validation, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 text-sm text-blue-600"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{validation}</span>
                    </motion.div>
                  ))}
                </div>
              )}

              {'checks' in output && output.checks && (
                <div className="space-y-2 pt-2 border-t border-border">
                  <p className="text-xs font-semibold text-muted-foreground">Checks:</p>
                  {output.checks.map((check, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 text-sm text-blue-600"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{check}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </Card>
  );
}
