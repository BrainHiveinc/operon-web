import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Send, Loader2, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { LogoWithHeartbeat } from "./LogoWithHeartbeat";
import { ExecutionVisualizer } from "./ExecutionVisualizer";
import { Mission } from "./LiveGovernanceDemo";
import { AgentApiService } from "@/services/agentApi";
import { AGENT_SRI_KNOWLEDGE, KNOWLEDGE_SUMMARY } from "@/data/agent-sri-knowledge";

interface AgentSriDemoProps {
  open: boolean;
  onClose: () => void;
  onUserComplete?: () => void;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'agent' | 'system';
  content: string;
  timestamp: number;
  status?: 'sending' | 'processing' | 'complete' | 'error';
}

const exampleMissions = AGENT_SRI_KNOWLEDGE.sampleMissions.map(m => m.mission);

export function AgentSriDemoChat({ open, onClose, onUserComplete }: AgentSriDemoProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [responseCount, setResponseCount] = useState(0);
  const [showUserForm, setShowUserForm] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "" });
  const [currentMission, setCurrentMission] = useState<Mission | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!open) return null;

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      type: 'user',
      content: input,
      timestamp: Date.now(),
      status: 'complete'
    };

    setMessages(prev => [...prev, userMessage]);
    const missionText = input;
    setInput("");
    setIsProcessing(true);

    // Create mission for visualization
    const newMission: Mission = {
      id: `mission_${Date.now()}`,
      title: missionText.split('.')[0].substring(0, 50) || missionText.substring(0, 50),
      description: missionText,
      status: "executing",
      tasks: [],
      agents: [],
      governanceChecks: [],
      toolUsage: [],
      startTime: Date.now()
    };
    setCurrentMission(newMission);

    // Add processing message
    const processingMessage: ChatMessage = {
      id: `processing_${Date.now()}`,
      type: 'system',
      content: '🤖 Processing mission with governance...',
      timestamp: Date.now(),
      status: 'processing'
    };
    setMessages(prev => [...prev, processingMessage]);

    // Animate governance visualization
    setTimeout(() => {
      setCurrentMission(prev => prev ? {
        ...prev,
        tasks: [
          { id: "task_1", name: "Analyzing mission", status: "executing", progress: 30 }
        ],
        agents: [
          { id: "agent_1", name: "Agent Sri", type: "analyzer", status: "working", color: "primary" }
        ],
        governanceChecks: [
          { id: "gc_1", type: "policy", description: "Security validation", status: "pending", timestamp: Date.now() }
        ]
      } : null);
    }, 500);

    try {
      // Enhance mission with Operon OS knowledge context
      const enhancedDescription = `
You are Agent Sri, an enterprise AI agent for Operon OS - a governance-first AI agent platform.

OPERON OS CONTEXT:
${KNOWLEDGE_SUMMARY}

USER MISSION:
${missionText}

Respond as Agent Sri, referencing Operon OS capabilities and features when relevant. Be helpful, professional, and demonstrate how Operon OS governance ensures quality.
`;

      // Call real AI
      const response = await AgentApiService.executeMission({
        description: enhancedDescription
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
          { id: "gc_1", type: "policy", description: "Security validated", status: "passed", timestamp: Date.now() }
        ]
      } : null);

      // Remove processing message and add agent response
      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== processingMessage.id);
        const agentMessage: ChatMessage = {
          id: `agent_${Date.now()}`,
          type: 'agent',
          content: response.mission.result.sections[0]?.content || 'No response',
          timestamp: Date.now(),
          status: 'complete'
        };
        return [...filtered, agentMessage];
      });

      // Increment response count
      const newCount = responseCount + 1;
      setResponseCount(newCount);

      // Clear mission visualization after 2 seconds
      setTimeout(() => {
        setCurrentMission(null);
      }, 2000);

      // Show user form after 2nd response
      if (newCount === 2 && !userInfo.name) {
        setTimeout(() => {
          setShowUserForm(true);
        }, 1000);
      }

    } catch (error) {
      // Update mission as failed
      setCurrentMission(prev => prev ? {
        ...prev,
        status: "failed",
        endTime: Date.now(),
        governanceChecks: [
          { id: "gc_1", type: "policy", description: "Execution failed", status: "failed", timestamp: Date.now() }
        ]
      } : null);

      // Remove processing message and add error
      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== processingMessage.id);
        const errorMessage: ChatMessage = {
          id: `error_${Date.now()}`,
          type: 'system',
          content: `❌ Error: ${error instanceof Error ? error.message : 'Failed to process mission'}`,
          timestamp: Date.now(),
          status: 'error'
        };
        return [...filtered, errorMessage];
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const loadExample = (text: string) => {
    setInput(text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-5xl h-[85vh] bg-gradient-to-br from-background to-secondary/20 border border-border rounded-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-card/50 backdrop-blur">
          <div className="flex items-center gap-4">
            <LogoWithHeartbeat size="md" showText={false} />
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Operon OS
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <Sparkles className="w-4 h-4 text-primary" />
                <p className="text-sm font-medium text-foreground/80">
                  Agent Sri Demo
                </p>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Main Content: Two-panel layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel: Chat Messages */}
          <div className="w-1/2 border-r border-border flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 && (
                <div className="h-full flex items-center justify-center text-center p-4">
                  <div>
                    <Sparkles className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Try a Mission
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Type your own or try an example below
                    </p>
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : message.type === 'system'
                        ? message.status === 'error'
                          ? 'bg-destructive/20 border border-destructive/50 text-destructive-foreground'
                          : 'bg-blue-500/20 border border-blue-500/50 text-foreground'
                        : 'bg-card border border-border text-foreground'
                    }`}
                  >
                    {message.type === 'agent' && (
                      <div className="flex items-center gap-2 mb-2 text-emerald-500 text-sm font-semibold">
                        <CheckCircle className="w-4 h-4" />
                        <span>Agent Sri</span>
                      </div>
                    )}
                    <div className="whitespace-pre-wrap break-words">
                      {message.content}
                    </div>
                    {message.status === 'processing' && (
                      <Loader2 className="w-4 h-4 animate-spin mt-2" />
                    )}
                  </div>
                </motion.div>
              ))}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Right Panel: Governance Execution Visualizer */}
          <div className="w-1/2 bg-gradient-to-br from-secondary/30 to-background overflow-y-auto">
            {currentMission ? (
              <ExecutionVisualizer mission={currentMission} />
            ) : (
              <div className="h-full flex items-center justify-center text-center p-8">
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
                    <Sparkles className="w-16 h-16 mx-auto mb-6 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    Governance Execution
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Run a mission to see real-time governance checks
                  </p>
                  <div className="space-y-2 text-left text-sm">
                    <div className="flex items-center gap-2 text-emerald-500">
                      <CheckCircle className="w-4 h-4" />
                      <span>Policy Validation</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-500">
                      <CheckCircle className="w-4 h-4" />
                      <span>Audit Trail</span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-500">
                      <CheckCircle className="w-4 h-4" />
                      <span>Security Monitoring</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-border bg-card/50 backdrop-blur">
          <div className="flex gap-3 mb-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your mission here..."
              disabled={isProcessing}
              className="flex-1 px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isProcessing}
              size="lg"
              className="px-6"
            >
              {isProcessing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send
                </>
              )}
            </Button>
          </div>
          
          {/* Example missions - subtle */}
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2">
              {exampleMissions.slice(0, 3).map((example, i) => (
                <button
                  key={i}
                  onClick={() => loadExample(example)}
                  className="text-xs px-3 py-1.5 bg-secondary hover:bg-secondary/80 border border-border rounded-lg text-muted-foreground hover:text-foreground transition-all"
                >
                  {example.substring(0, 40)}...
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Info Form Modal */}
        {showUserForm && (
          <div className="absolute inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card border border-border rounded-2xl p-8 max-w-md w-full mx-4"
            >
              <h3 className="text-2xl font-bold text-foreground mb-2">Get Early Access</h3>
              <p className="text-muted-foreground mb-6">
                Enter your details to continue exploring Agent Sri
              </p>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button
                  onClick={() => {
                    if (userInfo.name && userInfo.email && userInfo.phone) {
                      console.log('[User Info]', userInfo);
                      onUserComplete?.();
                      setShowUserForm(false);
                    }
                  }}
                  disabled={!userInfo.name || !userInfo.email || !userInfo.phone}
                  className="w-full"
                  size="lg"
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
