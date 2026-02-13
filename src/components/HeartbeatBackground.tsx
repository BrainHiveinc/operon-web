/**
 * Heartbeat Background - Abstract pulse visualization
 * Shows system "heartbeat" without medical imagery
 */

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface HeartbeatBackgroundProps {
  centered?: boolean;
}

export function HeartbeatBackground({ centered = false }: HeartbeatBackgroundProps) {
  const [pulseKey, setPulseKey] = useState(0);

  // Trigger pulse every 2 seconds (like a heartbeat rhythm)
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseKey((prev) => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const containerClass = centered
    ? "absolute top-[180px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] overflow-visible pointer-events-none"
    : "absolute inset-0 overflow-visible pointer-events-none";

  // For centered mode, we want everything to emanate from the exact center
  const innerContainerClass = centered
    ? "absolute inset-0 flex items-center justify-center"
    : "absolute inset-0 flex items-center justify-center";

  return (
    <div className={containerClass}>
      {/* Concentric rings emanating from logo center */}
      <div className={innerContainerClass}>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`${pulseKey}-${i}`}
            className="absolute rounded-full border-2 border-primary/50"
            style={{
              boxShadow: '0 0 20px rgba(var(--primary-rgb), 0.3)'
            }}
            initial={{
              width: 0,
              height: 0,
              opacity: 1,
            }}
            animate={{
              width: `${(i + 1) * 300}px`,
              height: `${(i + 1) * 300}px`,
              opacity: 0,
            }}
            transition={{
              duration: 3,
              delay: i * 0.15,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Grid distortion waves */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary/30"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Animated distortion circle */}
        <motion.circle
          cx="50%"
          cy="50%"
          key={pulseKey}
          initial={{ r: 0, opacity: 0.6 }}
          animate={{ r: 400, opacity: 0 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary/40"
        />
      </svg>

      {/* Radial glow pulses */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          key={`glow-${pulseKey}`}
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(var(--primary-rgb), 0.4) 0%, rgba(var(--primary-rgb), 0.2) 30%, transparent 70%)",
          }}
          initial={{ scale: 0.8, opacity: 0.8 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      </div>

      {/* Particle burst on each heartbeat */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const distance = 200;
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance;

          return (
            <motion.div
              key={`particle-${pulseKey}-${i}`}
              className="absolute w-2 h-2 rounded-full bg-primary"
              style={{
                boxShadow: '0 0 10px rgba(var(--primary-rgb), 0.8)'
              }}
              initial={{
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
              }}
              animate={{
                x,
                y,
                opacity: 0,
                scale: 0,
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.05,
                ease: "easeOut",
              }}
            />
          );
        })}
      </div>

      {/* Energy field lines */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45);
          return (
            <motion.div
              key={`line-${i}`}
              className="absolute h-px w-32 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
              style={{
                transform: `rotate(${angle}deg)`,
                transformOrigin: "left center",
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scaleX: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Double pulse effect (heartbeat rhythm: lub-dub) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          key={`double-pulse-${pulseKey}`}
          className="absolute w-64 h-64 rounded-full border-2 border-primary/60"
          style={{
            boxShadow: '0 0 30px rgba(var(--primary-rgb), 0.5)'
          }}
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{
            scale: [1, 1.3, 1.35, 1.5],
            opacity: [0.8, 0.4, 0.5, 0],
          }}
          transition={{
            duration: 1.5,
            times: [0, 0.3, 0.5, 1],
            ease: "easeOut",
          }}
        />
      </div>
    </div>
  );
}
