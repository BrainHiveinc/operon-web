import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";
import { COMPARISON_DATA, BRAND_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function ComparisonTable() {
  const renderValue = (value: boolean | string, isNexus: boolean) => {
    if (value === true) {
      return (
        <div className={cn(
          "flex items-center justify-center w-6 h-6 rounded-full",
          isNexus ? "bg-primary/20 text-primary" : "bg-success/20 text-success"
        )}>
          <Check className="w-4 h-4" />
        </div>
      );
    }
    if (value === false) {
      return (
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-destructive/20 text-destructive">
          <X className="w-4 h-4" />
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-warning/20 text-warning">
        <Minus className="w-4 h-4" />
      </div>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-4 px-4 font-display font-semibold text-sm">
              Feature
            </th>
            <th className="text-center py-4 px-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30">
                <span className="font-display font-semibold text-sm text-primary">
                  {BRAND_NAME}
                </span>
              </div>
            </th>
            <th className="text-center py-4 px-4 font-display font-semibold text-sm text-muted-foreground">
              Chatbots
            </th>
            <th className="text-center py-4 px-4 font-display font-semibold text-sm text-muted-foreground">
              Agent Frameworks
            </th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON_DATA.rows.map((row, index) => (
            <motion.tr
              key={row.feature}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
            >
              <td className="py-4 px-4 text-sm font-medium">{row.feature}</td>
              <td className="py-4 px-4">
                <div className="flex justify-center">
                  {renderValue(row.nexus, true)}
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex justify-center">
                  {renderValue(row.chatbots, false)}
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex justify-center">
                  {renderValue(row.frameworks, false)}
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
