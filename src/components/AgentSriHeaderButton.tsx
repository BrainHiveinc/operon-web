/**
 * Agent Sri Header Button - Simple button that scrolls to Agent Sri section
 */

import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AgentSriHeaderButton() {
  const scrollToAgentSri = () => {
    // Scroll to Agent Sri section on homepage
    const agentSection = document.querySelector('[data-agent-sri]');
    if (agentSection) {
      agentSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Button
      onClick={scrollToAgentSri}
      variant="outline"
      size="sm"
      className="gap-2 relative overflow-hidden group border-primary/30 hover:border-primary/60 transition-all duration-300"
    >
      {/* OS Logo */}
      <motion.div
        className="relative w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold text-xs"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        OS
        {/* Live indicator */}
        <motion.div
          className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-blue-500 border border-white"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </motion.div>

      <span className="relative font-medium text-sm">Agent Sri</span>
      <MessageSquare className="w-4 h-4" />
    </Button>
  );
}
