import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FileText, Clock, Zap, Shield, CheckCircle2, Sparkles } from "lucide-react";

const stages = [
  { id: "pending", label: "Propose", icon: FileText, color: "#3b82f6" },
  { id: "approved", label: "Approve", icon: Clock, color: "#eab308" },
  { id: "executing", label: "Execute", icon: Zap, color: "#a855f7" },
  { id: "validating", label: "Validate", icon: Shield, color: "#f97316" },
  { id: "completed", label: "Complete", icon: CheckCircle2, color: "#10b981" }
];

interface Proposal {
  id: number;
  currentStage: number;
  task: string;
  progress: number;
}

const tasks = [
  "Generate Q4 compliance report",
  "Analyze customer sentiment data",
  "Update security policies",
  "Process invoice batch #847",
  "Deploy model v2.1 to staging",
  "Audit user permissions",
  "Backup production database"
];

export function HeartbeatLiveAnimation() {
  const [proposals, setProposals] = useState<Proposal[]>([
    { id: 1, currentStage: 0, task: tasks[0], progress: 0 }
  ]);
  const [nextId, setNextId] = useState(2);

  useEffect(() => {
    // Add new proposal every 6 seconds
    const addInterval = setInterval(() => {
      setProposals(prev => {
        const task = tasks[Math.floor(Math.random() * tasks.length)];
        return [...prev, {
          id: nextId,
          currentStage: 0,
          task,
          progress: 0
        }];
      });
      setNextId(prev => prev + 1);
    }, 6000);

    // Advance proposals through stages every 500ms
    const advanceInterval = setInterval(() => {
      setProposals(prev =>
        prev
          .map(p => {
            // Increase progress
            if (p.progress < 100) {
              return { ...p, progress: p.progress + 20 };
            }
            // Move to next stage when progress complete
            else if (p.currentStage < stages.length - 1) {
              return {
                ...p,
                currentStage: p.currentStage + 1,
                progress: 0
              };
            }
            // Mark for removal when fully complete
            return { ...p, progress: 100 };
          })
          // Remove proposals that completed final stage
          .filter(p => !(p.currentStage === stages.length - 1 && p.progress >= 100))
      );
    }, 500);

    return () => {
      clearInterval(addInterval);
      clearInterval(advanceInterval);
    };
  }, [nextId]);

  return (
    <div className="relative min-h-[600px]">
      {/* Stage Pipeline */}
      <div className="relative flex justify-between items-center mb-16 px-4">
        {/* Flowing energy line */}
        <div className="absolute inset-0 flex items-center">
          <motion.div
            className="w-full h-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 rounded-full"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>

        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const stageProposals = proposals.filter(p => p.currentStage === index);
          const hasActive = stageProposals.length > 0;

          return (
            <div key={stage.id} className="flex flex-col items-center relative z-10">
              {/* Stage Node */}
              <motion.div
                animate={hasActive ? {
                  scale: [1, 1.15, 1],
                  rotate: [0, 5, -5, 0]
                } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center relative border-4"
                  style={{
                    backgroundColor: `${stage.color}15`,
                    borderColor: hasActive ? stage.color : `${stage.color}40`,
                    boxShadow: hasActive
                      ? `0 0 40px ${stage.color}80, 0 0 80px ${stage.color}40`
                      : 'none'
                  }}
                >
                  <Icon className="w-10 h-10" style={{ color: stage.color }} />

                  {/* Particle burst */}
                  {hasActive && (
                    <>
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 rounded-full"
                          style={{ backgroundColor: stage.color }}
                          initial={{ x: 0, y: 0, opacity: 0.8 }}
                          animate={{
                            x: Math.cos((i * Math.PI * 2) / 8) * 50,
                            y: Math.sin((i * Math.PI * 2) / 8) * 50,
                            opacity: 0,
                            scale: 0
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.1
                          }}
                        />
                      ))}
                    </>
                  )}

                  {/* Rotating ring */}
                  {hasActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2"
                      style={{ borderColor: stage.color }}
                      animate={{
                        rotate: 360,
                        scale: [1, 1.3, 1]
                      }}
                      transition={{
                        rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity }
                      }}
                    />
                  )}
                </div>

                {/* Count badge */}
                {stageProposals.length > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm"
                    style={{
                      backgroundColor: stage.color,
                      boxShadow: `0 0 20px ${stage.color}`
                    }}
                  >
                    {stageProposals.length}
                  </motion.div>
                )}
              </motion.div>

              {/* Label */}
              <div className="text-center mt-4">
                <div className="text-sm font-bold" style={{ color: stage.color }}>
                  {stage.label}
                </div>
              </div>

              {/* Flowing particles between stages */}
              {index < stages.length - 1 && hasActive && (
                <motion.div
                  className="absolute left-[100%] top-10 w-4 h-4 rounded-full z-20"
                  style={{
                    backgroundColor: stage.color,
                    boxShadow: `0 0 20px ${stage.color}`
                  }}
                  animate={{
                    x: [0, 100],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <Sparkles className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Active Proposals */}
      <div className="space-y-3 min-h-[300px]">
        <AnimatePresence mode="popLayout">
          {proposals.map((proposal) => {
            const currentStage = stages[proposal.currentStage];
            return (
              <motion.div
                key={proposal.id}
                initial={{ opacity: 0, x: -100, rotateX: 90 }}
                animate={{ opacity: 1, x: 0, rotateX: 0 }}
                exit={{
                  opacity: 0,
                  x: 100,
                  scale: 0.5,
                  transition: { duration: 0.5 }
                }}
                layout
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
                className="glass-card p-5 relative overflow-hidden"
                style={{
                  borderLeft: `4px solid ${currentStage.color}`,
                  boxShadow: `0 4px 20px ${currentStage.color}20`
                }}
              >
                {/* Flowing background */}
                <motion.div
                  className="absolute inset-0 opacity-10"
                  style={{
                    background: `linear-gradient(90deg, ${currentStage.color}00, ${currentStage.color}60, ${currentStage.color}00)`
                  }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Pulsing dot */}
                    <motion.div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: currentStage.color }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.5, 1]
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="text-xs font-mono font-bold px-2 py-1 rounded"
                          style={{
                            backgroundColor: `${currentStage.color}20`,
                            color: currentStage.color
                          }}
                        >
                          #{proposal.id.toString().padStart(3, '0')}
                        </span>
                        <span className="text-sm font-medium">{proposal.task}</span>
                      </div>

                      {/* Progress bar */}
                      <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          className="absolute inset-0 opacity-30"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${currentStage.color}, transparent)`
                          }}
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: currentStage.color }}
                          animate={{ width: `${proposal.progress}%` }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div
                            className="absolute inset-0"
                            style={{
                              background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`
                            }}
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                        </motion.div>
                      </div>
                    </div>

                    {/* Stage badge */}
                    <motion.div
                      className="px-3 py-1 rounded-full text-xs font-bold"
                      style={{
                        backgroundColor: `${currentStage.color}20`,
                        color: currentStage.color,
                        border: `1px solid ${currentStage.color}`
                      }}
                      animate={{
                        boxShadow: [
                          `0 0 10px ${currentStage.color}40`,
                          `0 0 20px ${currentStage.color}80`,
                          `0 0 10px ${currentStage.color}40`
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {currentStage.label}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 grid grid-cols-5 gap-3"
      >
        {stages.map((stage) => {
          const count = proposals.filter(p => p.currentStage === stages.indexOf(stage)).length;
          return (
            <motion.div
              key={stage.id}
              className="glass-card p-4 text-center relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              style={{ borderTop: `3px solid ${stage.color}` }}
            >
              <motion.div
                className="text-3xl font-bold mb-1"
                style={{ color: stage.color }}
                key={count}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                {count}
              </motion.div>
              <div className="text-xs text-muted-foreground">{stage.label}</div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
