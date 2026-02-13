import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Zap, ArrowRight, Send } from "lucide-react";
import { Button } from "./ui/button";
import { LogoWithHeartbeat } from "./LogoWithHeartbeat";
import { ExecutionVisualizer } from "./ExecutionVisualizer";
import { Mission } from "./LiveGovernanceDemo";
import { AgentApiService } from "@/services/agentApi";

interface AgentSriDemoProps {
  open: boolean;
  onClose: () => void;
}

interface PromptEntry {
  id: string;
  prompt: string;
  response: string;
  timestamp: number;
}

const exampleMissions = [
  "Analyze our Q4 sales data and identify top 3 growth opportunities",
  "Research competitors in AI governance space and create executive summary",
  "Review support tickets from last week and categorize common issues",
  "Generate technical documentation for our new API features"
];

export function AgentSriDemo({ open, onClose }: AgentSriDemoProps) {
  const [history, setHistory] = useState<PromptEntry[]>([]);
  const [input, setInput] = useState("");
  const [currentMission, setCurrentMission] = useState<Mission | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [missionCount, setMissionCount] = useState(0);
  const [showUserForm, setShowUserForm] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "" });

  if (!open) return null;

  const handleSubmit = async () => {
    if (!input.trim() || isExecuting) return;

    // Check if this is the 2nd mission and user info not collected
    if (missionCount === 1 && !userInfo.name) {
      setShowUserForm(true);
      return;
    }

    const userPrompt = input;
    setCurrentPrompt(userPrompt);
    setInput("");
    setIsExecuting(true);

    // Create mission for visualization
    const newMission: Mission = {
      id: `mission_${Date.now()}`,
      title: userPrompt.split('.')[0].substring(0, 50),
      description: userPrompt,
      status: "executing",
      tasks: [],
      agents: [],
      governanceChecks: [],
      toolUsage: [],
      startTime: Date.now()
    };

    setCurrentMission(newMission);

    // Animate governance visualization
    setTimeout(() => {
      setCurrentMission(prev => prev ? {
        ...prev,
        tasks: [
          { id: "task_1", name: "Processing with AI...", status: "executing", progress: 30 }
        ],
        agents: [
          { id: "agent_1", name: "Agent Sri", type: "analyzer", status: "working", color: "primary" }
        ],
        governanceChecks: [
          { id: "gc_1", type: "policy", description: "Security validation", status: "checking", timestamp: Date.now() }
        ]
      } : null);
    }, 500);

    try {
      // Call real AI
      const response = await AgentApiService.executeMission({
        description: userPrompt
      });

      // Update mission as completed
      setCurrentMission(prev => prev ? {
        ...prev,
        status: "completed",
        endTime: Date.now(),
        tasks: [
          { id: "task_1", name: "Mission completed", status: "completed", progress: 100 }
        ],
        governanceChecks: [
          { id: "gc_1", type: "policy", description: "Security validated ✓", status: "passed", timestamp: Date.now() }
        ]
      } : null);

      // Add to history
      setHistory(prev => [...prev, {
        id: `entry_${Date.now()}`,
        prompt: userPrompt,
        response: response.mission.result.sections[0]?.content || 'Mission completed successfully',
        timestamp: Date.now()
      }]);

      setIsExecuting(false);
      setCurrentPrompt("");
      setMissionCount(prev => prev + 1);

      // Clear visualization after 2 seconds
      setTimeout(() => {
        setCurrentMission(null);
      }, 2000);

    } catch (error) {
      console.error('[AgentSriDemo] Error:', error);

      setCurrentMission(prev => prev ? {
        ...prev,
        status: "failed",
        endTime: Date.now(),
        tasks: [
          { id: "task_1", name: "Execution failed", status: "failed", progress: 0 }
        ]
      } : null);

      setHistory(prev => [...prev, {
        id: `entry_${Date.now()}`,
        prompt: userPrompt,
        response: `Error: ${error instanceof Error ? error.message : 'Failed to execute mission'}`,
        timestamp: Date.now()
      }]);

      setIsExecuting(false);
      setCurrentPrompt("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleUserFormSubmit = () => {
    if (userInfo.name && userInfo.email && userInfo.phone) {
      setShowUserForm(false);
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-6xl h-[85vh] bg-black border border-primary/20 rounded-xl overflow-hidden"
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              animate={{
                x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between p-6 border-b border-primary/20">
          <div className="flex items-center gap-4">
            <LogoWithHeartbeat size="md" showText={false} />
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Agent Sri
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Enterprise AI Agent with Built-in Governance
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="relative z-10 h-[calc(100%-88px)]">
          <AnimatePresence mode="wait">
            {showUserForm ? (
              <motion.div
                key="user-form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="h-full flex items-center justify-center p-8"
              >
                <div className="max-w-md w-full bg-primary/5 border border-primary/20 rounded-xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Continue with Agent Sri</h3>
                  <p className="text-muted-foreground mb-6">Enter your details to run more missions</p>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Name</label>
                      <input
                        type="text"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-muted/5 border border-primary/20 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                      <input
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-muted/5 border border-primary/20 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Phone</label>
                      <input
                        type="tel"
                        value={userInfo.phone}
                        onChange={(e) => setUserInfo(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-muted/5 border border-primary/20 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleUserFormSubmit}
                    disabled={!userInfo.name || !userInfo.email || !userInfo.phone}
                    className="w-full mt-6 gap-2"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="execution"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex"
              >
                {/* Left: Prompt Interface */}
                <div className="w-2/5 border-r border-primary/20 flex flex-col bg-black/40">
                  {/* Prompt Header */}
                  <div className="p-4 border-b border-primary/20">
                    <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm">
                      <span className="text-white">$</span>
                      <span>agent-sri</span>
                      <span className="text-muted-foreground">--execute</span>
                    </div>
                  </div>

                  {/* Prompt History */}
                  <div className="flex-1 overflow-y-auto p-6 font-mono text-sm space-y-6">
                    {history.length === 0 && (
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Welcome to Agent Sri - Enterprise AI with Governance
                        </p>
                        <p className="text-white/70 text-xs">
                          Enter a task below and watch autonomous execution with real-time compliance →
                        </p>
                        <div className="mt-6 space-y-2">
                          <p className="text-xs text-muted-foreground">Quick start examples:</p>
                          {exampleMissions.map((ex, i) => (
                            <button
                              key={i}
                              onClick={() => setInput(ex)}
                              className="block w-full text-left text-xs px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-emerald-400/80 hover:text-emerald-400 transition-colors"
                            >
                              $ {ex}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {history.map((entry) => (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                      >
                        {/* User Prompt */}
                        <div className="flex items-start gap-2">
                          <span className="text-emerald-400 flex-shrink-0">$</span>
                          <span className="text-white">{entry.prompt}</span>
                        </div>

                        {/* Agent Response */}
                        <div className="pl-4 border-l-2 border-primary/30">
                          <div className="text-xs text-primary mb-2 flex items-center gap-2">
                            <Zap className="w-3 h-3" />
                            <span>Agent Sri Response (Governance: ✓ Passed)</span>
                          </div>
                          <div className="text-white/90 whitespace-pre-wrap leading-relaxed">
                            {entry.response}
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {isExecuting && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-emerald-400">$</span>
                          <span className="text-white">{currentPrompt}</span>
                        </div>
                        <div className="pl-4 flex items-center gap-2 text-primary/70">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Zap className="w-3 h-3" />
                          </motion.div>
                          <span className="text-sm">Executing with governance...</span>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Prompt Input */}
                  <div className="p-4 border-t border-primary/20 bg-black/60">
                    {missionCount > 0 && (
                      <div className="mb-3 text-center">
                        <p className="text-xs text-emerald-400 font-mono">
                          [{missionCount} {missionCount === 1 ? 'task' : 'tasks'} completed]
                        </p>
                      </div>
                    )}
                    <div className="flex gap-2 items-center">
                      <span className="text-emerald-400 font-mono">$</span>
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter your task..."
                        disabled={isExecuting}
                        className="flex-1 px-3 py-2 bg-transparent border-none text-white font-mono text-sm placeholder:text-muted-foreground/50 focus:outline-none disabled:opacity-50"
                      />
                      <Button
                        onClick={handleSubmit}
                        disabled={!input.trim() || isExecuting}
                        size="sm"
                        variant="ghost"
                        className="px-3"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Right: Execution Visualizer */}
                <div className="flex-1 bg-gradient-to-br from-slate-900/50 to-black/30 overflow-y-auto">
                  {currentMission ? (
                    <ExecutionVisualizer mission={currentMission} />
                  ) : (
                    <div className="h-full flex items-center justify-center text-center p-12">
                      <div className="max-w-md">
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <Sparkles className="w-20 h-20 mx-auto mb-6 text-primary" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white mb-3">
                          Enterprise Governance in Action
                        </h3>
                        <p className="text-base text-muted-foreground mb-6">
                          Enter a task to watch Agent Sri execute with:
                        </p>
                        <div className="space-y-3 text-left">
                          <div className="flex items-start gap-3 text-sm text-white/80">
                            <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-emerald-400">✓</span>
                            </div>
                            <div>
                              <p className="font-medium text-white">Real-time Compliance Checks</p>
                              <p className="text-xs text-muted-foreground">Policy validation at every step</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 text-sm text-white/80">
                            <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-blue-400">✓</span>
                            </div>
                            <div>
                              <p className="font-medium text-white">Complete Audit Trail</p>
                              <p className="text-xs text-muted-foreground">Track every action and decision</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 text-sm text-white/80">
                            <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-purple-400">✓</span>
                            </div>
                            <div>
                              <p className="font-medium text-white">Enterprise Security</p>
                              <p className="text-xs text-muted-foreground">Built-in safety controls and monitoring</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
