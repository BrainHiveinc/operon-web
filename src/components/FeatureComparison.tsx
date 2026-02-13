import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check, X, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type FeatureCategory = "governance" | "observability" | "reliability" | "scale";

interface Feature {
  name: string;
  category: FeatureCategory;
  operonOS: boolean | string;
  traditional: boolean | string;
  frameworks: boolean | string;
}

const features: Feature[] = [
  {
    name: "Deterministic execution",
    category: "reliability",
    operonOS: true,
    traditional: false,
    frameworks: "Partial",
  },
  {
    name: "Custom validators",
    category: "governance",
    operonOS: "TypeScript",
    traditional: false,
    frameworks: "Limited",
  },
  {
    name: "Audit trails",
    category: "observability",
    operonOS: "Full lineage",
    traditional: false,
    frameworks: "Logs only",
  },
  {
    name: "Retry policies",
    category: "reliability",
    operonOS: "Configurable",
    traditional: "Manual",
    frameworks: "Basic",
  },
  {
    name: "Permission controls",
    category: "governance",
    operonOS: "RBAC + Policies",
    traditional: false,
    frameworks: false,
  },
  {
    name: "Rate limiting",
    category: "scale",
    operonOS: "Per-pool",
    traditional: "API-level",
    frameworks: "Global",
  },
  {
    name: "Context bundles",
    category: "observability",
    operonOS: "Source-attributed",
    traditional: false,
    frameworks: false,
  },
  {
    name: "Blast radius controls",
    category: "governance",
    operonOS: "Configurable",
    traditional: false,
    frameworks: false,
  },
  {
    name: "Auto-scaling pools",
    category: "scale",
    operonOS: true,
    traditional: false,
    frameworks: "Cloud-only",
  },
  {
    name: "Tool call tracing",
    category: "observability",
    operonOS: "Full traces",
    traditional: "Logs",
    frameworks: "Partial",
  },
];

const categories = [
  { id: "governance" as FeatureCategory, label: "Governance", color: "text-purple-500" },
  { id: "observability" as FeatureCategory, label: "Observability", color: "text-blue-500" },
  { id: "reliability" as FeatureCategory, label: "Reliability", color: "text-blue-500" },
  { id: "scale" as FeatureCategory, label: "Scale", color: "text-orange-500" },
];

export function FeatureComparison() {
  const [selectedCategories, setSelectedCategories] = useState<Set<FeatureCategory>>(
    new Set(categories.map(c => c.id))
  );

  const toggleCategory = (category: FeatureCategory) => {
    setSelectedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const filteredFeatures = features.filter(f => selectedCategories.has(f.category));

  const renderCell = (value: boolean | string) => {
    if (value === true) {
      return (
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Check className="w-4 h-4 text-blue-500" />
          </div>
        </div>
      );
    }
    if (value === false) {
      return (
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
            <X className="w-4 h-4 text-red-500" />
          </div>
        </div>
      );
    }
    return (
      <div className="text-center text-sm font-medium text-foreground">
        {value}
      </div>
    );
  };

  return (
    <Card className="glass-card p-6">
      {/* Category Filters */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">
          Filter by category
        </h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all cursor-pointer",
                selectedCategories.has(category.id)
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-border/60"
              )}
              onClick={() => toggleCategory(category.id)}
            >
              <Switch
                checked={selectedCategories.has(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
                onClick={(e) => e.stopPropagation()}
              />
              <span className={cn("text-sm font-medium", category.color)}>
                {category.label}
              </span>
              <Badge variant="secondary" className="text-xs">
                {features.filter(f => f.category === category.id).length}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 px-4 font-display font-semibold text-foreground">
                Feature
              </th>
              <th className="text-center py-4 px-4">
                <div className="flex flex-col items-center gap-1">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="font-display font-semibold gradient-text">
                    Operon OS
                  </span>
                </div>
              </th>
              <th className="text-center py-4 px-4">
                <span className="font-display font-semibold text-muted-foreground">
                  Traditional AI
                </span>
              </th>
              <th className="text-center py-4 px-4">
                <span className="font-display font-semibold text-muted-foreground">
                  Frameworks
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {filteredFeatures.map((feature, index) => {
                const category = categories.find(c => c.id === feature.category);
                return (
                  <motion.tr
                    key={feature.name}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{feature.name}</span>
                        <Badge
                          variant="secondary"
                          className={cn("text-xs", category?.color)}
                        >
                          {category?.label}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.03 + 0.1 }}
                      >
                        {renderCell(feature.operonOS)}
                      </motion.div>
                    </td>
                    <td className="py-4 px-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.03 + 0.15 }}
                      >
                        {renderCell(feature.traditional)}
                      </motion.div>
                    </td>
                    <td className="py-4 px-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.03 + 0.2 }}
                      >
                        {renderCell(feature.frameworks)}
                      </motion.div>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {filteredFeatures.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-muted-foreground"
        >
          Select at least one category to see features
        </motion.div>
      )}
    </Card>
  );
}
