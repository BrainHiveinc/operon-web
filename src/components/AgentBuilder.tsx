import { motion, AnimatePresence, Reorder } from "framer-motion";
import { useState } from "react";
import {
  Database, Shield, TrendingUp, Package, Headphones, BarChart3,
  Plus, X, Sparkles, Check, Zap, Settings
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AgentModule {
  id: string;
  name: string;
  icon: React.ElementType;
  category: string;
  description: string;
}

const availableModules: AgentModule[] = [
  {
    id: "data-fetch",
    name: "Data Fetcher",
    icon: Database,
    category: "input",
    description: "Fetch data from APIs and databases",
  },
  {
    id: "validator",
    name: "Validator",
    icon: Shield,
    category: "processing",
    description: "Validate outputs with custom rules",
  },
  {
    id: "analyzer",
    name: "Analyzer",
    icon: TrendingUp,
    category: "processing",
    description: "Analyze and process information",
  },
  {
    id: "packager",
    name: "Packager",
    icon: Package,
    category: "output",
    description: "Format and package results",
  },
  {
    id: "notifier",
    name: "Notifier",
    icon: Headphones,
    category: "output",
    description: "Send notifications and alerts",
  },
  {
    id: "reporter",
    name: "Reporter",
    icon: BarChart3,
    category: "output",
    description: "Generate comprehensive reports",
  },
];

export function AgentBuilder() {
  const [selectedModules, setSelectedModules] = useState<AgentModule[]>([]);
  const [agentName, setAgentName] = useState("My Custom Agent");
  const [isBuilding, setIsBuilding] = useState(false);
  const [isBuilt, setIsBuilt] = useState(false);

  const addModule = (module: AgentModule) => {
    if (!selectedModules.find(m => m.id === module.id)) {
      setSelectedModules([...selectedModules, module]);
    }
  };

  const removeModule = (moduleId: string) => {
    setSelectedModules(selectedModules.filter(m => m.id !== moduleId));
  };

  const buildAgent = async () => {
    setIsBuilding(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsBuilding(false);
    setIsBuilt(true);
  };

  const reset = () => {
    setSelectedModules([]);
    setAgentName("My Custom Agent");
    setIsBuilt(false);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "input": return "text-blue-500";
      case "processing": return "text-purple-500";
      case "output": return "text-blue-500";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Available Modules */}
      <Card className="glass-card p-6">
        <div className="mb-6">
          <h3 className="text-xl font-display font-bold mb-2">
            Available Modules
          </h3>
          <p className="text-sm text-muted-foreground">
            Click on agents to build your custom agent
          </p>
        </div>

        <div className="space-y-3">
          {availableModules.map((module) => {
            const Icon = module.icon;
            const isSelected = selectedModules.find(m => m.id === module.id);

            return (
              <motion.div
                key={module.id}
                layout
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className={cn(
                    "p-4 rounded-lg border-2 transition-all cursor-pointer",
                    isSelected
                      ? "border-primary/30 bg-primary/5 opacity-50"
                      : "border-border hover:border-primary/50 hover:bg-secondary/30"
                  )}
                  onClick={() => !isSelected && addModule(module)}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                      isSelected ? "bg-primary/20" : "bg-secondary"
                    )}>
                      <Icon className={cn(
                        "w-5 h-5",
                        isSelected ? "text-primary" : getCategoryColor(module.category)
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm">{module.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {module.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {module.description}
                      </p>
                    </div>
                    {isSelected && (
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Agent Builder */}
      <Card className="glass-card p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-display font-bold">
              Agent Builder
            </h3>
            {selectedModules.length > 0 && (
              <Button variant="outline" size="sm" onClick={reset}>
                Reset
              </Button>
            )}
          </div>

          {/* Agent Name Input */}
          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block">
              Agent Name
            </label>
            <input
              type="text"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border-2 border-border bg-background focus:border-primary focus:outline-none transition-colors"
              placeholder="Enter agent name"
            />
          </div>
        </div>

        {/* Drop Zone */}
        <div className={cn(
          "min-h-[300px] rounded-lg border-2 border-dashed p-4 transition-all",
          selectedModules.length > 0
            ? "border-primary/50 bg-primary/5"
            : "border-border bg-secondary/20"
        )}>
          {selectedModules.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full min-h-[300px] text-center"
            >
              <Plus className="w-12 h-12 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">
                Click modules to add them to your agent
              </p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Pipeline ({selectedModules.length} modules)
                </p>
              </div>

              <Reorder.Group
                axis="y"
                values={selectedModules}
                onReorder={setSelectedModules}
                className="space-y-3"
              >
                <AnimatePresence>
                  {selectedModules.map((module, index) => {
                    const Icon = module.icon;
                    return (
                      <Reorder.Item
                        key={module.id}
                        value={module}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="group"
                      >
                        <div className="p-4 rounded-lg border-2 border-primary/30 bg-background hover:bg-primary/5 transition-colors cursor-move">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-3 flex-1">
                              <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center flex-shrink-0">
                                <span className="text-xs font-bold text-primary">
                                  {index + 1}
                                </span>
                              </div>
                              <div className={cn(
                                "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                                "bg-primary/10"
                              )}>
                                <Icon className="w-5 h-5 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-sm">{module.name}</h4>
                                <p className="text-xs text-muted-foreground truncate">
                                  {module.description}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeModule(module.id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Reorder.Item>
                    );
                  })}
                </AnimatePresence>
              </Reorder.Group>
            </div>
          )}
        </div>

        {/* Build Button */}
        {selectedModules.length > 0 && !isBuilt && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <Button
              className="w-full gap-2"
              size="lg"
              onClick={buildAgent}
              disabled={isBuilding}
            >
              {isBuilding ? (
                <>
                  <Settings className="w-5 h-5 animate-spin" />
                  Building Agent...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Build Agent
                </>
              )}
            </Button>
          </motion.div>
        )}

        {/* Success Message */}
        <AnimatePresence>
          {isBuilt && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-6 p-4 rounded-lg bg-blue-500/10 border-2 border-blue-500/30"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-blue-600 mb-1">
                    Agent Built Successfully!
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Your agent "{agentName}" is ready to deploy with {selectedModules.length} modules
                  </p>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Sparkles className="w-4 h-4" />
                    Deploy Now
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
}
