import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Send, Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MissionExample {
  title: string;
  description: string;
  category: string;
}

interface MissionInputProps {
  onSubmit: (mission: string) => void;
  examples: MissionExample[];
  isExecuting: boolean;
}

const categoryColors: Record<string, string> = {
  research: "bg-blue-500/10 text-blue-500 border-blue-500/30",
  data: "bg-purple-500/10 text-purple-500 border-purple-500/30",
  content: "bg-blue-500/10 text-blue-500 border-blue-500/30",
  engineering: "bg-orange-500/10 text-orange-500 border-orange-500/30"
};

export function MissionInput({ onSubmit, examples, isExecuting }: MissionInputProps) {
  const [mission, setMission] = useState("");
  const [selectedExample, setSelectedExample] = useState<string | null>(null);

  const handleSubmit = () => {
    if (mission.trim() && !isExecuting) {
      onSubmit(mission);
      setMission("");
      setSelectedExample(null);
    }
  };

  const handleExampleClick = (example: MissionExample) => {
    setMission(example.description);
    setSelectedExample(example.title);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  return (
    <div className="glass-card p-6 sm:p-8 h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-display font-bold mb-2 flex items-center gap-2">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          Give Agent Sri a Mission
        </h3>
        <p className="text-sm text-muted-foreground">
          Describe what you want Agent Sri to do. Be specific about the outcome you need.
        </p>
      </div>

      {/* Example Missions */}
      <div className="mb-6">
        <p className="text-xs font-medium text-muted-foreground mb-3">
          Try an example:
        </p>
        <div className="grid sm:grid-cols-2 gap-2">
          {examples.map((example) => (
            <motion.button
              key={example.title}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleExampleClick(example)}
              className={cn(
                "text-left p-3 rounded-lg border transition-all text-xs sm:text-sm",
                selectedExample === example.title
                  ? "bg-primary/10 border-primary/50"
                  : "bg-secondary/50 border-border/50 hover:bg-secondary hover:border-border"
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={cn(
                  "px-2 py-0.5 rounded text-xs border",
                  categoryColors[example.category] || categoryColors.research
                )}>
                  {example.category}
                </span>
              </div>
              <p className="font-medium text-foreground line-clamp-1">
                {example.title}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Mission Input */}
      <div className="flex-1 flex flex-col">
        <label className="text-sm font-medium mb-2">Your Mission</label>
        <Textarea
          value={mission}
          onChange={(e) => setMission(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Example: Research the top 5 AI governance platforms, compare their features, pricing, and create a detailed comparison report with recommendations..."
          className="flex-1 min-h-[150px] sm:min-h-[200px] resize-none font-mono text-sm"
          disabled={isExecuting}
        />

        {/* Character Count */}
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-muted-foreground">
            {mission.length > 0 && `${mission.length} characters`}
          </p>
          <p className="text-xs text-muted-foreground">
            Press ⌘+Enter to execute
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <Button
          onClick={handleSubmit}
          disabled={!mission.trim() || isExecuting}
          size="lg"
          className="w-full gap-2 glow"
        >
          {isExecuting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Executing Mission...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Execute Mission
            </>
          )}
        </Button>
      </div>

      {/* Info */}
      <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-primary">Live Demo:</span> Watch as Agent Sri breaks down your mission,
          assigns agents, validates each step, and maintains full governance control.
        </p>
      </div>
    </div>
  );
}
