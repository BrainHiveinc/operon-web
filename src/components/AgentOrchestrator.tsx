import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Search, Database, Code, FileText, Shield, BarChart3, TestTube, Network, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface Agent {
  id: string;
  name: string;
  icon: React.ElementType;
  status: "idle" | "active" | "completed";
  angle: number; // Position angle in degrees
}

interface Particle {
  id: string;
  fromAgent: string;
  progress: number;
  startAngle: number;
}

const workerAgents: Omit<Agent, "status">[] = [
  { id: "research", name: "Research", icon: Search, angle: 0 },
  { id: "data", name: "Data", icon: Database, angle: 45 },
  { id: "testing", name: "Testing", icon: TestTube, angle: 90 },
  { id: "writer", name: "Writer", icon: FileText, angle: 135 },
  { id: "validator", name: "Validator", icon: Shield, angle: 180 },
  { id: "analytics", name: "Analytics", icon: BarChart3, angle: 225 },
  { id: "code", name: "Code", icon: Code, angle: 270 },
  { id: "monitor", name: "Monitor", icon: Network, angle: 315 }
];

export function AgentOrchestrator() {
  const [agents, setAgents] = useState<Agent[]>(
    workerAgents.map(a => ({ ...a, status: "idle" as const }))
  );
  const [pulseKey, setPulseKey] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);

  // Agent activation cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => {
        const newAgents = [...prev];
        const idleAgents = newAgents.filter(a => a.status === "idle");

        if (idleAgents.length > 0 && Math.random() > 0.4) {
          const randomAgent = idleAgents[Math.floor(Math.random() * idleAgents.length)];
          const idx = newAgents.findIndex(a => a.id === randomAgent.id);

          // Activate agent
          newAgents[idx] = { ...newAgents[idx], status: "active" };

          // Complete after 3 seconds
          setTimeout(() => {
            setAgents(current => {
              const updated = [...current];
              const i = updated.findIndex(a => a.id === randomAgent.id);
              if (i !== -1) updated[i] = { ...updated[i], status: "completed" };
              return updated;
            });

            // Reset to idle after 1.5 seconds
            setTimeout(() => {
              setAgents(current => {
                const updated = [...current];
                const i = updated.findIndex(a => a.id === randomAgent.id);
                if (i !== -1) updated[i] = { ...updated[i], status: "idle" };
                return updated;
              });
            }, 1500);
          }, 3000);
        }

        return newAgents;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Pulse animation trigger
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseKey(k => k + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Spawn particles from active agents (increased frequency for more neural connections)
  useEffect(() => {
    const interval = setInterval(() => {
      agents.forEach(agent => {
        if (agent.status === "active" && Math.random() > 0.1) {
          const newParticle: Particle = {
            id: `particle-${particleIdRef.current++}`,
            fromAgent: agent.id,
            progress: 0,
            startAngle: agent.angle
          };
          setParticles(prev => [...prev, newParticle]);
        }
      });
    }, 200);
    return () => clearInterval(interval);
  }, [agents]);

  // Animate particles moving toward Queen
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev =>
        prev
          .map(p => ({ ...p, progress: p.progress + 0.03 }))
          .filter(p => p.progress <= 1)
      );
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const activeCount = agents.filter(a => a.status === "active").length;

  return (
    <div className="glass-card p-6 rounded-xl border border-primary/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="relative"
          >
            <Activity className="w-5 h-5 text-primary" />
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/30"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          <h3 className="text-lg font-semibold text-foreground">Live Agents Network</h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs text-muted-foreground">
            <span className="text-primary font-medium">{activeCount}</span> active
          </div>
          <motion.div
            className="w-2 h-2 rounded-full bg-blue-500"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [1, 0.6, 1],
              boxShadow: ["0 0 0px rgba(59, 130, 246, 0.5)", "0 0 20px rgba(59, 130, 246, 0.8)", "0 0 0px rgba(59, 130, 246, 0.5)"]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </div>

      {/* Network Visualization */}
      <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-background via-primary/5 to-background rounded-lg border border-primary/10 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(var(--primary-rgb), 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(var(--primary-rgb), 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }} />

        {/* Radial pulse waves from Queen */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`queen-pulse-${pulseKey}`}
            className="absolute pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ width: 0, height: 0, opacity: 0.6 }}
            animate={{
              width: "300px",
              height: "300px",
              opacity: 0
            }}
            transition={{ duration: 3, ease: "easeOut" }}
          >
            <div className="w-full h-full rounded-full border-2 border-primary/40" />
          </motion.div>
        </AnimatePresence>

        {/* Radial pulse waves from each active agent */}
        {agents.map((agent) => {
          if (agent.status !== "active") return null;

          const radius = 32;
          const angleRad = (agent.angle * Math.PI) / 180;
          const x = 50 + Math.cos(angleRad) * radius;
          const y = 50 + Math.sin(angleRad) * radius;

          return (
            <AnimatePresence key={`pulse-${agent.id}`} mode="popLayout">
              <motion.div
                key={`pulse-1-${agent.id}-${pulseKey}`}
                className="absolute pointer-events-none"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ width: 0, height: 0, opacity: 0.7 }}
                animate={{
                  width: "150px",
                  height: "150px",
                  opacity: 0
                }}
                transition={{ duration: 2, ease: "easeOut", repeat: Infinity, repeatDelay: 1 }}
              >
                <div className="w-full h-full rounded-full border-2 border-primary/60" />
              </motion.div>
            </AnimatePresence>
          );
        })}

        {/* Energy field glow */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(var(--primary-rgb), 0.15) 0%, transparent 70%)"
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Neural Signal Particles - Flowing from agents to Queen */}
        {particles.map(particle => {
          const radius = 32; // Starting radius
          const angleRad = (particle.startAngle * Math.PI) / 180;

          // Start position (agent location)
          const startX = 50 + Math.cos(angleRad) * radius;
          const startY = 50 + Math.sin(angleRad) * radius;

          // End position (Queen at center)
          const endX = 50;
          const endY = 50;

          // Current position based on progress
          const currentX = startX + (endX - startX) * particle.progress;
          const currentY = startY + (endY - startY) * particle.progress;

          return (
            <motion.div
              key={particle.id}
              className="absolute z-10 pointer-events-none"
              style={{
                left: `${currentX}%`,
                top: `${currentY}%`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: particle.progress < 0.9 ? 0.8 : 0.8 * (1 - (particle.progress - 0.9) / 0.1)
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              {/* Particle glow */}
              <div className="w-3 h-3 rounded-full bg-primary/60 blur-sm" />
              {/* Particle core */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                style={{ boxShadow: '0 0 8px rgba(99, 102, 241, 0.8)' }}
              />
            </motion.div>
          );
        })}

        {/* Queen Agent - Center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <motion.div
            className="relative"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Pulsing outer glow */}
            <motion.div
              className="absolute inset-0 w-20 h-20 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(var(--primary-rgb), 0.4) 0%, transparent 70%)"
              }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.8, 0.3, 0.8]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Queen circle */}
            <motion.div
              className="relative flex items-center justify-center w-16 h-16 rounded-full bg-primary/30 border-2 border-primary backdrop-blur-sm"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(99, 102, 241, 0.5)",
                  "0 0 40px rgba(99, 102, 241, 0.8)",
                  "0 0 20px rgba(99, 102, 241, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Crown className="w-7 h-7 text-primary drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
            </motion.div>

            {/* Label */}
            <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <div className="text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm text-primary bg-primary/10 border border-primary/30">
                Queen Agent
              </div>
            </div>
          </motion.div>
        </div>

        {/* Worker Agents - Circular Layout */}
        {agents.map((agent) => {
          const Icon = agent.icon;
          const isActive = agent.status === "active";
          const isCompleted = agent.status === "completed";

          // Calculate position (32% radius from center)
          const radius = 32; // percentage
          const angleRad = (agent.angle * Math.PI) / 180;
          const x = 50 + Math.cos(angleRad) * radius;
          const y = 50 + Math.sin(angleRad) * radius;

          return (
            <motion.div
              key={agent.id}
              className="absolute z-10"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: isActive ? [0, -4, 0] : 0
              }}
              transition={{
                scale: { duration: 0.5, delay: agent.angle / 360 },
                opacity: { duration: 0.5, delay: agent.angle / 360 },
                y: isActive ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : {}
              }}
            >
              {/* Activation glow */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    className="absolute inset-0 w-20 h-20 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full"
                    style={{
                      background: "radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, transparent 70%)"
                    }}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.8, 0, 0.8]
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </AnimatePresence>

              {/* Agent circle */}
              <motion.div
                className={cn(
                  "relative flex items-center justify-center w-14 h-14 rounded-full border-2 backdrop-blur-sm transition-all",
                  agent.status === "idle" && "bg-background/60 border-border shadow-md",
                  agent.status === "active" && "bg-primary/30 border-primary shadow-2xl shadow-primary/50",
                  agent.status === "completed" && "bg-blue-500/30 border-blue-500 shadow-xl shadow-blue-500/40"
                )}
                animate={isActive ? {
                  borderColor: ["rgb(99, 102, 241)", "rgb(139, 142, 255)", "rgb(99, 102, 241)"],
                  boxShadow: [
                    "0 0 20px rgba(99, 102, 241, 0.5)",
                    "0 0 40px rgba(99, 102, 241, 0.8)",
                    "0 0 20px rgba(99, 102, 241, 0.5)"
                  ]
                } : {}}
                transition={isActive ? { duration: 1.5, repeat: Infinity } : {}}
              >
                {/* Spinning ring for active agents */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary/0 border-t-primary/80"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                )}

                <motion.div
                  animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                  transition={isActive ? { duration: 1.5, repeat: Infinity } : {}}
                >
                  <Icon
                    className={cn(
                      "w-6 h-6 drop-shadow-lg",
                      agent.status === "idle" && "text-muted-foreground",
                      agent.status === "active" && "text-primary",
                      agent.status === "completed" && "text-blue-500"
                    )}
                    style={isActive ? { filter: 'drop-shadow(0 0 8px currentColor)' } : {}}
                  />
                </motion.div>

                {/* Status indicator */}
                {isCompleted && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-background"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                  />
                )}
              </motion.div>

              {/* Label */}
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <div className={cn(
                  "text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm",
                  "text-foreground bg-background/80 border border-border"
                )}>
                  {agent.name}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer stats */}
      <div className="mt-4 pt-4 border-t border-primary/10 flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground">
            Network: <span className="text-blue-500 font-medium">Healthy</span>
          </span>
          <span className="text-muted-foreground">
            Agents: <span className="text-primary font-medium">{agents.length}</span>
          </span>
        </div>
        <span className="text-primary">Governance: Active ✓</span>
      </div>
    </div>
  );
}
