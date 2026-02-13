import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { MissionInput } from "./MissionInput";
import { ExecutionVisualizer } from "./ExecutionVisualizer";
import { MissionResults } from "./MissionResults";
import { Mission } from "./LiveGovernanceDemo";
import { LogoWithHeartbeat } from "./LogoWithHeartbeat";
import { X, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";

interface AgentSriDemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const exampleMissions = [
  {
    title: "Simple Calculation",
    description: "What is 2*2134234",
    category: "data"
  },
  {
    title: "Market Research",
    description: "Research top 5 AI governance platforms, compare features, pricing, and create a detailed comparison report with recommendations",
    category: "research"
  },
  {
    title: "Data Processing",
    description: "Analyze sales data from Q4, identify trends, and generate visualizations with insights",
    category: "data"
  },
  {
    title: "Content Generation",
    description: "Create a technical blog post about autonomous agents with code examples and governance best practices",
    category: "content"
  }
];

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export function AgentSriDemoModal({ open, onOpenChange }: AgentSriDemoModalProps) {
  const [currentMission, setCurrentMission] = useState<Mission | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  // Cleanup WebSocket on unmount or when modal closes
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!open) {
      // Close WebSocket when modal closes
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      // Reset state
      setCurrentMission(null);
      setIsExecuting(false);
      setShowResults(false);
      setError(null);
    }
  }, [open]);

  const handleMissionSubmit = async (missionDesc: string) => {
    setShowResults(false);
    setError(null);

    const newMission: Mission = {
      id: `mission_${Date.now()}`,
      title: missionDesc.split('.')[0].substring(0, 50),
      description: missionDesc,
      status: "pending",
      tasks: [],
      agents: [],
      governanceChecks: [],
      toolUsage: [],
      startTime: Date.now()
    };

    setCurrentMission(newMission);
    setIsExecuting(true);

    try {
      // Call backend API to start mission
      const response = await fetch(`${API_URL}/api/missions/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: missionDesc,
          missionId: newMission.id
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || errorData.message || 'Failed to start mission');
      }

      const data = await response.json();
      const missionId = data.missionId;

      // Connect to WebSocket for real-time updates
      const wsUrl = `${API_URL.replace('http', 'ws')}/api/missions/${missionId}/stream`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connected');
      };

      ws.onmessage = (event) => {
        try {
          const update = JSON.parse(event.data);

          // Update mission state with data from backend
          setCurrentMission(prev => {
            if (!prev) return null;

            return {
              ...prev,
              status: update.status || prev.status,
              tasks: update.tasks || prev.tasks,
              agents: update.agents || prev.agents,
              governanceChecks: update.governanceChecks || prev.governanceChecks,
              toolUsage: update.toolUsage || prev.toolUsage,
              result: update.result || prev.result,
              error: update.error
            };
          });

          // Show results when mission completes
          if (update.status === 'completed' && update.result) {
            setTimeout(() => {
              setIsExecuting(false);
              setShowResults(true);
            }, 1000);
          } else if (update.status === 'failed') {
            setError(update.error || 'Mission execution failed');
            setIsExecuting(false);
          }
        } catch (err) {
          console.error('Failed to parse WebSocket message:', err);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setError('Connection error - Please ensure backend is running on port 3001');
        setIsExecuting(false);
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
      };

    } catch (err) {
      console.error('Mission execution error:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect to Agent Sri backend');
      setIsExecuting(false);

      // Show helpful error message
      if (err instanceof Error && err.message.includes('fetch')) {
        setError('Cannot connect to backend server. Please start the backend:\n\ncd server\npython3 agent_sri_api.py');
      }
    }
  };

  const handleNewMission = () => {
    setShowResults(false);
    setCurrentMission(null);
    setIsExecuting(false);
    setError(null);

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl h-[90vh] p-0 gap-0 bg-black border-primary/20">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-primary/20 bg-black">
            <div className="flex items-center gap-4">
              <LogoWithHeartbeat size="md" showText={false} />
              <div>
                <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Agent Sri - Live Demo
                </DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Run real missions with autonomous AI agents
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="text-muted-foreground hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden bg-black">
            <AnimatePresence mode="wait">
              {error ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex items-center justify-center p-8"
                >
                  <div className="max-w-2xl w-full bg-red-500/10 border border-red-500/30 rounded-lg p-8 text-center">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-3">Connection Error</h3>
                    <p className="text-muted-foreground mb-6 whitespace-pre-line">{error}</p>
                    <div className="flex gap-3 justify-center">
                      <Button
                        onClick={handleNewMission}
                        variant="outline"
                      >
                        Try Again
                      </Button>
                      <Button
                        onClick={() => onOpenChange(false)}
                        variant="ghost"
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ) : showResults && currentMission?.result ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="h-full"
                >
                  <MissionResults
                    mission={currentMission}
                    onNewMission={handleNewMission}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="execution"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex"
                >
                  {/* Left: Mission Input */}
                  <div className="w-2/5 border-r border-primary/20 flex flex-col bg-black">
                    <MissionInput
                      onSubmit={handleMissionSubmit}
                      isExecuting={isExecuting}
                      exampleMissions={exampleMissions}
                    />
                  </div>

                  {/* Right: Execution Visualizer */}
                  <div className="flex-1 flex flex-col bg-black">
                    {currentMission ? (
                      <ExecutionVisualizer mission={currentMission} />
                    ) : (
                      <div className="flex-1 flex items-center justify-center text-muted-foreground p-8 text-center">
                        <div>
                          <Sparkles className="w-16 h-16 mx-auto mb-4 text-primary/50" />
                          <p className="text-lg text-white">Enter a mission to see Agent Sri in action</p>
                          <p className="text-sm mt-2">Try: "What is 2*2134234" for a quick demo</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
