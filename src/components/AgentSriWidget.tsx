/**
 * Agent Sri Floating Widget
 * Global floating chat widget that can be triggered from anywhere
 */

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MessageSquare, X } from "lucide-react";
import { AgentSriReal } from "./AgentSriReal";
import { Button } from "./ui/button";

export function AgentSriWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // Listen for custom events to open/close the widget
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const handleToggle = () => setIsOpen((prev) => !prev);

    window.addEventListener("agent-sri:open", handleOpen);
    window.addEventListener("agent-sri:close", handleClose);
    window.addEventListener("agent-sri:toggle", handleToggle);

    return () => {
      window.removeEventListener("agent-sri:open", handleOpen);
      window.removeEventListener("agent-sri:close", handleClose);
      window.removeEventListener("agent-sri:toggle", handleToggle);
    };
  }, []);

  return (
    <>
      {/* Floating Chat Button - Bottom Right */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="h-14 w-14 rounded-full shadow-2xl bg-gradient-to-br from-primary to-primary/80 hover:from-primary hover:to-primary/90 relative group"
            >
              {/* Pulse ring animation */}
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/30"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />

              {/* Live indicator dot */}
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-background shadow-lg"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.8, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />

              <MessageSquare className="w-6 h-6 text-white relative z-10" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-md max-h-[600px] shadow-2xl rounded-2xl overflow-hidden"
          >
            {/* Close button */}
            <div className="absolute top-4 right-4 z-10">
              <Button
                onClick={() => setIsOpen(false)}
                size="sm"
                variant="ghost"
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Agent Sri Chat Interface */}
            <div className="h-full overflow-auto">
              <AgentSriReal />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Helper functions to trigger the widget from anywhere
export const openAgentSri = () => {
  window.dispatchEvent(new CustomEvent("agent-sri:open"));
};

export const closeAgentSri = () => {
  window.dispatchEvent(new CustomEvent("agent-sri:close"));
};

export const toggleAgentSri = () => {
  window.dispatchEvent(new CustomEvent("agent-sri:toggle"));
};
