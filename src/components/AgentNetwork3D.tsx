import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Zap, Database, Shield, FileText, TrendingUp, Wrench, Brain, Cpu } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Agent {
  id: string;
  name: string;
  icon: React.ElementType;
  status: "idle" | "active" | "processing";
  connections: string[];
}

interface DataPacket {
  id: string;
  from: string;
  to: string;
  progress: number;
}

const agents: Agent[] = [
  {
    id: "coordinator",
    name: "Coordinator",
    icon: Zap,
    status: "active",
    connections: ["data-fetch", "validator", "processor"],
  },
  {
    id: "data-fetch",
    name: "Data Fetcher",
    icon: Database,
    status: "processing",
    connections: ["processor"],
  },
  {
    id: "processor",
    name: "Processor",
    icon: Brain,
    status: "processing",
    connections: ["validator"],
  },
  {
    id: "validator",
    name: "Validator",
    icon: Shield,
    status: "active",
    connections: ["artifact-gen"],
  },
  {
    id: "artifact-gen",
    name: "Artifact Gen",
    icon: FileText,
    status: "idle",
    connections: [],
  },
  {
    id: "recovery",
    name: "Recovery",
    icon: Wrench,
    status: "idle",
    connections: ["processor"],
  },
];

export function AgentNetwork3D() {
  const [rotation, setRotation] = useState(0);
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [dataPackets, setDataPackets] = useState<DataPacket[]>([]);
  const [pulseAgents, setPulseAgents] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isRotating) return;
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.3) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [isRotating]);

  // Simulate continuous data flow
  useEffect(() => {
    const interval = setInterval(() => {
      const activeAgents = agents.filter(a => a.status === "active" || a.status === "processing");
      if (activeAgents.length > 0) {
        const from = activeAgents[Math.floor(Math.random() * activeAgents.length)];
        const connections = from.connections;
        if (connections.length > 0) {
          const toId = connections[Math.floor(Math.random() * connections.length)];
          const to = agents.find(a => a.id === toId);

          if (to) {
            const packetId = `packet-${Date.now()}-${Math.random()}`;
            setDataPackets(prev => [...prev, {
              id: packetId,
              from: from.id,
              to: to.id,
              progress: 0,
            }]);

            // Add pulse effect to receiver
            setPulseAgents(prev => new Set(prev).add(to.id));
            setTimeout(() => {
              setPulseAgents(prev => {
                const next = new Set(prev);
                next.delete(to.id);
                return next;
              });
            }, 1000);

            // Animate packet
            const packetInterval = setInterval(() => {
              setDataPackets(prev => {
                const packet = prev.find(p => p.id === packetId);
                if (!packet || packet.progress >= 100) {
                  clearInterval(packetInterval);
                  setTimeout(() => {
                    setDataPackets(prev => prev.filter(p => p.id !== packetId));
                  }, 100);
                  return prev;
                }
                return prev.map(p =>
                  p.id === packetId ? { ...p, progress: p.progress + 4 } : p
                );
              });
            }, 40);
          }
        }
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Calculate 3D projection with enhanced perspective
  const project3D = (agent: Agent, index: number) => {
    const totalAgents = agents.length;
    const angle = (index / totalAgents) * 2 * Math.PI + (rotation * Math.PI) / 180;

    // Circular arrangement with depth
    const radius = 35;
    const x = 50 + radius * Math.cos(angle);
    const z = 50 + radius * Math.sin(angle);
    const y = 50 + Math.sin(angle * 2) * 15; // Oscillating height

    // Perspective projection
    const perspective = 300;
    const scale = perspective / (perspective + (z - 50));

    return {
      x: x * scale * 4 + 200,
      y: y * 3,
      scale: scale,
      z: z - 50,
    };
  };

  // Sort agents by z-depth
  const sortedAgentIndices = agents
    .map((agent, index) => ({ agent, index, z: project3D(agent, index).z }))
    .sort((a, b) => a.z - b.z);

  return (
    <Card className="glass-card overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-display font-bold mb-1">
              Agent Network Visualization
            </h3>
            <p className="text-sm text-muted-foreground">
              Real-time 3D view of agent orchestration
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={isRotating ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => setIsRotating(!isRotating)}
            >
              {isRotating ? "Auto-rotating" : "Paused"}
            </Badge>
          </div>
        </div>
      </div>

      {/* 3D Visualization */}
      <div className="relative h-[500px] bg-gradient-to-b from-secondary/30 to-background overflow-hidden">
        {/* Enhanced Grid background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 grid-bg" />
        </div>

        {/* Central Hub Glow */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-48 h-48 rounded-full bg-gradient-radial from-primary/30 via-primary/10 to-transparent blur-3xl" />
        </motion.div>

        {/* SVG Canvas for connections and packets */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="connectionGradient3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
            </linearGradient>

            <filter id="glow3D">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <radialGradient id="packetGlow">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Draw connections with depth-aware opacity */}
          {sortedAgentIndices.map(({ agent, index }) => {
            const fromPos = project3D(agent, index);
            return agent.connections.map((targetId) => {
              const targetIndex = agents.findIndex(a => a.id === targetId);
              if (targetIndex === -1) return null;

              const toPos = project3D(agents[targetIndex], targetIndex);
              const opacity = Math.max(0.3, (fromPos.scale + toPos.scale) / 2);

              return (
                <motion.line
                  key={`${agent.id}-${targetId}`}
                  x1={fromPos.x}
                  y1={fromPos.y}
                  x2={toPos.x}
                  y2={toPos.y}
                  stroke="url(#connectionGradient3D)"
                  strokeWidth={agent.status === "processing" ? 3 : 2}
                  filter="url(#glow3D)"
                  opacity={opacity}
                  strokeDasharray={agent.status === "processing" ? "8,4" : "0"}
                  animate={{
                    strokeDashoffset: agent.status === "processing" ? [0, -12] : 0,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              );
            });
          })}

          {/* Data Packets */}
          {dataPackets.map(packet => {
            const fromIndex = agents.findIndex(a => a.id === packet.from);
            const toIndex = agents.findIndex(a => a.id === packet.to);
            if (fromIndex === -1 || toIndex === -1) return null;

            const fromPos = project3D(agents[fromIndex], fromIndex);
            const toPos = project3D(agents[toIndex], toIndex);

            const x = fromPos.x + (toPos.x - fromPos.x) * (packet.progress / 100);
            const y = fromPos.y + (toPos.y - fromPos.y) * (packet.progress / 100);
            const scale = fromPos.scale + (toPos.scale - fromPos.scale) * (packet.progress / 100);

            return (
              <g key={packet.id}>
                <motion.circle
                  cx={x}
                  cy={y}
                  r={8 * scale}
                  fill="url(#packetGlow)"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                  }}
                />
                <circle
                  cx={x}
                  cy={y}
                  r={4 * scale}
                  fill="#3b82f6"
                  filter="url(#glow3D)"
                />
              </g>
            );
          })}

          {/* Draw agents */}
          {sortedAgentIndices.map(({ agent, index }) => {
            const Icon = agent.icon;
            const pos = project3D(agent, index);
            const size = 50 * pos.scale;
            const isActive = activeAgent === agent.id;
            const isPulsing = pulseAgents.has(agent.id);

            return (
              <g
                key={agent.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                className="cursor-pointer"
                onMouseEnter={() => setActiveAgent(agent.id)}
                onMouseLeave={() => setActiveAgent(null)}
              >
                {/* Outer pulse for processing/active agents */}
                {(agent.status === "processing" || isPulsing) && (
                  <motion.circle
                    cx={0}
                    cy={0}
                    r={size / 2 + 8}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    opacity="0.4"
                    animate={{
                      r: [size / 2 + 8, size / 2 + 18],
                      opacity: [0.6, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}

                {/* Agent circle with gradient border */}
                <circle
                  cx={0}
                  cy={0}
                  r={size / 2 + 3}
                  fill="url(#connectionGradient3D)"
                  opacity="0.6"
                />

                <motion.circle
                  cx={0}
                  cy={0}
                  r={size / 2}
                  fill={cn(
                    agent.status === "active" && "#3b82f6",
                    agent.status === "processing" && "#06b6d4",
                    agent.status === "idle" && "#64748b"
                  )}
                  stroke="#ffffff"
                  strokeWidth={isActive ? 4 : 3}
                  filter="url(#glow3D)"
                  animate={{
                    scale: isActive ? 1.15 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                />

                {/* Icon */}
                <foreignObject
                  x={-size / 3}
                  y={-size / 3}
                  width={size / 1.5}
                  height={size / 1.5}
                >
                  <motion.div
                    className="flex items-center justify-center w-full h-full"
                    animate={agent.status === "processing" ? {
                      rotate: [0, 360],
                    } : {}}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Icon className="w-full h-full text-white" style={{ width: '70%', height: '70%' }} />
                  </motion.div>
                </foreignObject>

                {/* Status indicator dot */}
                <motion.circle
                  cx={size / 2 - 6}
                  cy={-size / 2 + 6}
                  r={5 * pos.scale}
                  fill={cn(
                    agent.status === "active" && "#10b981",
                    agent.status === "processing" && "#f59e0b",
                    agent.status === "idle" && "#94a3b8"
                  )}
                  stroke="#ffffff"
                  strokeWidth="2"
                  animate={agent.status === "processing" ? {
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.6, 1],
                  } : {}}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                />

                {/* Label */}
                <text
                  x={0}
                  y={size / 2 + 24}
                  textAnchor="middle"
                  className="text-xs font-semibold fill-foreground"
                  opacity={isActive ? 1 : 0.8}
                  style={{ fontSize: `${12 * pos.scale}px` }}
                >
                  {agent.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-3 justify-center">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg glass-card text-xs">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>Active</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg glass-card text-xs">
            <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse" />
            <span>Processing</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg glass-card text-xs">
            <div className="w-3 h-3 rounded-full bg-slate-500" />
            <span>Idle</span>
          </div>
        </div>

        {/* Active Agent Info */}
        <AnimatePresence>
          {activeAgent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute top-4 right-4 glass-card p-4 max-w-xs border-2 border-primary/30"
            >
              {(() => {
                const agent = agents.find(a => a.id === activeAgent);
                if (!agent) return null;
                const Icon = agent.icon;
                return (
                  <>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{agent.name}</h4>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {agent.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Connections:</span>
                        <span className="font-medium">{agent.connections.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="font-medium capitalize">{agent.status}</span>
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
