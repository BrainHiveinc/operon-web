/**
 * Logo with Heartbeat - Reusable component for any page
 * Wraps the Operon logo with the heartbeat visualization behind it
 */

import { motion } from "framer-motion";
import { Logo } from "./Logo";
import { HeartbeatBackground } from "./HeartbeatBackground";
import { openAgentSri } from "./AgentSriWidget";

interface LogoWithHeartbeatProps {
  size?: "sm" | "md" | "lg" | "xl";
  clickable?: boolean;
  showBadge?: boolean;
  showText?: boolean;
  className?: string;
  active?: boolean; // NEW: Makes heartbeat faster when agents are working
}

const sizeClasses = {
  sm: "w-16 h-16 md:w-20 md:h-20",
  md: "w-20 h-20 md:w-24 md:h-24",
  lg: "w-24 h-24 md:w-32 md:h-32",
  xl: "w-32 h-32 md:w-40 md:h-40",
};

const heartbeatSizes = {
  sm: "w-[400px] h-[400px]",
  md: "w-[500px] h-[500px]",
  lg: "w-[600px] h-[600px]",
  xl: "w-[800px] h-[800px]",
};

export function LogoWithHeartbeat({
  size = "lg",
  clickable = true,
  showBadge = false,
  showText = true,
  className = "",
  active = true, // Default to true - agents are always working!
}: LogoWithHeartbeatProps) {
  const LogoContainer = clickable ? "button" : "div";

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative inline-flex items-center justify-center">
        {/* Heartbeat Background - Behind and centered on logo */}
        <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${heartbeatSizes[size]} pointer-events-none z-0`}>
          <motion.div
            className="w-full h-full"
            animate={active ? {
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8]
            } : {}}
            transition={active ? {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            } : {}}
          >
            <HeartbeatBackground centered={false} />
          </motion.div>
        </div>

        <LogoContainer
          {...(clickable && {
            onClick: openAgentSri,
            type: "button" as const,
          })}
          className={`relative group ${clickable ? 'cursor-pointer' : ''} z-10`}
        >
          {/* Orbital Logo */}
          <Logo className={sizeClasses[size]} animated={true} />

          {/* Hover Effect Ring (only if clickable) */}
          {clickable && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </LogoContainer>
      </div>

      {/* Agent Sri Badge (optional) */}
      {showBadge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30"
        >
          {/* Red dot with eyes */}
          <div className="relative w-4 h-4 rounded-full bg-red-500 animate-pulse shadow-lg shadow-red-500/50 flex items-center justify-center">
            <div className="flex gap-[2px] items-center">
              <div className="w-[3px] h-[3px] rounded-full bg-white" />
              <div className="w-[3px] h-[3px] rounded-full bg-white" />
            </div>
          </div>
          <span className="text-xs md:text-sm font-medium text-blue-600 dark:text-blue-500">
            Agent Sri Live
          </span>
        </motion.div>
      )}
    </div>
  );
}
