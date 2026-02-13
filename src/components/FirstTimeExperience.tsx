import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";
import { LogoWithHeartbeat } from "./LogoWithHeartbeat";
import { Button } from "./ui/button";
import { BRAND_NAME } from "@/lib/constants";

interface FirstTimeExperienceProps {
  onComplete: () => void;
  onOpenDemo: () => void;
}

export function FirstTimeExperience({ onComplete, onOpenDemo }: FirstTimeExperienceProps) {
  const [stage, setStage] = useState<'logo' | 'live' | 'mission'>('logo');
  const [clicks, setClicks] = useState(0);

  const handleLogoClick = () => {
    setClicks(prev => prev + 1);

    if (clicks === 0) {
      // First click: Show "Agent Sri Live"
      setStage('live');
    } else if (clicks === 1) {
      // Second click: Show "Run your mission"
      setStage('mission');
    }
  };

  const handleRunMission = () => {
    // Open the demo
    onOpenDemo();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-background to-secondary/20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-hero-glow opacity-30" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Pulsating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          animate={{
            x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
            y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Stage 1: Just the pulsating logo */}
        <AnimatePresence mode="wait">
          {stage === 'logo' && (
            <motion.div
              key="logo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="cursor-pointer"
              onClick={handleLogoClick}
            >
              {/* Operon OS Title */}
              <motion.h1
                className="text-5xl md:text-6xl font-display font-bold mb-8"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="gradient-text">{BRAND_NAME}</span>
              </motion.h1>

              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <LogoWithHeartbeat size="xl" clickable={false} showBadge={false} active={true} />
              </motion.div>

              <motion.div
                className="mt-8"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="text-muted-foreground text-sm">Click to begin</p>
              </motion.div>
            </motion.div>
          )}

          {/* Stage 2: Logo + "Agent Sri Live" */}
          {stage === 'live' && (
            <motion.div
              key="live"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="cursor-pointer"
              onClick={handleLogoClick}
            >
              {/* Operon OS Title */}
              <motion.h1
                className="text-4xl md:text-5xl font-display font-bold mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="gradient-text">{BRAND_NAME}</span>
              </motion.h1>

              <LogoWithHeartbeat size="xl" clickable={false} showBadge={false} active={true} />

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <motion.div
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500/10 border-2 border-blue-500/30"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(59, 130, 246, 0.3)",
                      "0 0 40px rgba(59, 130, 246, 0.5)",
                      "0 0 20px rgba(59, 130, 246, 0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div
                    className="w-3 h-3 rounded-full bg-blue-500"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.7, 1]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                    <span className="text-xl font-bold text-white">Agent Sri</span>
                    <span className="text-xl font-bold text-blue-400">Live</span>
                  </div>
                </motion.div>

                <p className="text-muted-foreground text-sm mt-4">Click again to continue</p>
              </motion.div>
            </motion.div>
          )}

          {/* Stage 3: Logo + Badge + "Run your mission" button */}
          {stage === 'mission' && (
            <motion.div
              key="mission"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LogoWithHeartbeat size="xl" clickable={false} showBadge={true} active={true} />

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">
                  <span className="gradient-text">{BRAND_NAME}</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  AI agents you can govern
                </p>

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    onClick={handleRunMission}
                    size="lg"
                    className="gap-3 glow group relative overflow-hidden px-8 py-6 text-lg"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <motion.div
                      className="w-2 h-2 rounded-full bg-blue-400 shadow-lg shadow-blue-500/50"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <Zap className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">Run Your Mission</span>
                  </Button>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-sm text-muted-foreground mt-6"
                >
                  Experience governance-first AI in action →
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
