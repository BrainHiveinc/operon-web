import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Sparkles,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
  Send,
  X,
  Minimize2,
  Maximize2,
  Zap,
  Brain,
  Target,
  Mail,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "agent" | "user";
  content: string;
  timestamp: Date;
}

interface LiveMetric {
  label: string;
  value: number;
  trend: "up" | "down" | "neutral";
  icon: React.ElementType;
  color: string;
}

interface Activity {
  id: string;
  type: "conversation" | "qualified" | "engaged";
  message: string;
  timestamp: Date;
}

export function AgentSri() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [conversationStage, setConversationStage] = useState<
    "greeting" | "collecting" | "qualifying" | "completed"
  >("greeting");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Live metrics
  const [metrics, setMetrics] = useState<LiveMetric[]>([
    {
      label: "Active Conversations",
      value: 3,
      trend: "up",
      icon: MessageSquare,
      color: "text-blue-500",
    },
    {
      label: "Leads Qualified Today",
      value: 12,
      trend: "up",
      icon: Target,
      color: "text-blue-500",
    },
    {
      label: "Avg Response Time",
      value: 2,
      trend: "neutral",
      icon: Clock,
      color: "text-purple-500",
    },
  ]);

  // Recent activities
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      type: "qualified",
      message: "Enterprise lead qualified - Series B startup",
      timestamp: new Date(Date.now() - 120000),
    },
    {
      id: "2",
      type: "conversation",
      message: "Started conversation with founder from SaaS company",
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: "3",
      type: "engaged",
      message: "Developer exploring autonomous agents",
      timestamp: new Date(Date.now() - 480000),
    },
  ]);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value: metric.value + (Math.random() > 0.5 ? 1 : 0),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate agent typing
  const agentType = async (content: string) => {
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));
    setIsTyping(false);

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "agent",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0 && isExpanded) {
      setTimeout(() => {
        agentType(
          "👋 Hi! I'm Agent Sri, Operon's live AI assistant. I'm here to understand how autonomous agents could transform your business. What brings you here today?"
        );
      }, 500);
    }
  }, [isExpanded, messages.length]);

  // Handle user message
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Conversation logic
    if (conversationStage === "greeting") {
      await agentType(
        "Great! Before we dive in, I'd love to personalize our conversation. What's your name?"
      );
      setConversationStage("collecting");
    } else if (conversationStage === "collecting" && !visitorName) {
      setVisitorName(inputValue);
      await agentType(
        `Nice to meet you, ${inputValue}! 😊 And what's the best email to send you information?`
      );
    } else if (conversationStage === "collecting" && visitorName && !visitorEmail) {
      setVisitorEmail(inputValue);
      await agentType(
        `Perfect! ${visitorName}, I've noted ${inputValue}. Now, tell me - are you exploring AI agents for sales, operations, or something else?`
      );
      setConversationStage("qualifying");

      // Send email notification
      sendEmailNotification(visitorName, inputValue, messages);
    } else if (conversationStage === "qualifying") {
      await agentType(
        `That's really interesting! Based on what you've shared, I think our autonomous ${inputValue.toLowerCase().includes("sales") ? "sales" : "operations"} agents could be a great fit. Would you like to see a live demo or speak with our team?`
      );

      // Add new activity
      const newActivity: Activity = {
        id: Date.now().toString(),
        type: "qualified",
        message: `${visitorName} qualified - interested in ${inputValue}`,
        timestamp: new Date(),
      };
      setActivities((prev) => [newActivity, ...prev.slice(0, 2)]);

      setConversationStage("completed");
    } else if (conversationStage === "completed") {
      await agentType(
        `Excellent! I'm connecting you with our team now. You'll receive an email at ${visitorEmail} within the next few minutes. In the meantime, feel free to explore our agent marketplace! 🚀`
      );
    }
  };

  // Mock email notification function
  const sendEmailNotification = (name: string, email: string, history: Message[]) => {
    console.log("Email notification sent to insriki@gmail.com", {
      visitorName: name,
      visitorEmail: email,
      conversationHistory: history,
      timestamp: new Date(),
    });
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <>
      {/* Compact View - Hero Integration */}
      <AnimatePresence>
        {!isExpanded && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-full"
          >
            <Card className="glass-card border-2 border-primary/30 overflow-hidden">
              {/* Header with Live Badge */}
              <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 border-b border-primary/20">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    {/* Animated Avatar */}
                    <motion.div
                      className="relative"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
                        <Brain className="w-8 h-8 text-white" />
                      </div>

                      {/* Live pulse indicator */}
                      <motion.div
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-500 border-2 border-white shadow-lg flex items-center justify-center"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.8, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      >
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </motion.div>

                      {/* Pulse ring */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-primary/30"
                        animate={{
                          scale: [1, 1.4, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    </motion.div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-display font-bold">Agent Sri</h3>
                        <Badge className="bg-blue-500/20 text-blue-600 border-blue-500/30 gap-1">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1.5 h-1.5 rounded-full bg-blue-500"
                          />
                          LIVE
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Autonomous AI assistant • Qualifying leads in real-time
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs gap-1">
                          <Sparkles className="w-3 h-3" />
                          Powered by Operon OS
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => setIsMinimized(true)}
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Live Metrics */}
              <div className="grid grid-cols-3 gap-4 p-6 border-b border-border/50 bg-secondary/20">
                {metrics.map((metric, idx) => {
                  const Icon = metric.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={cn("w-4 h-4", metric.color)} />
                        <span className="text-xs text-muted-foreground">
                          {metric.label}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <motion.span
                          key={metric.value}
                          initial={{ scale: 1.2, color: "#3b82f6" }}
                          animate={{ scale: 1, color: "inherit" }}
                          className="text-2xl font-bold"
                        >
                          {metric.value}
                        </motion.span>
                        {metric.trend === "up" && (
                          <TrendingUp className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Recent Activity Feed */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    Recent Activity
                  </h4>
                  <Button
                    size="sm"
                    onClick={() => setIsExpanded(true)}
                    className="gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Start Conversation
                  </Button>
                </div>

                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {activities.map((activity, idx) => (
                      <motion.div
                        key={activity.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border border-border/50"
                      >
                        <div
                          className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                            activity.type === "qualified" && "bg-blue-500/20",
                            activity.type === "conversation" && "bg-blue-500/20",
                            activity.type === "engaged" && "bg-purple-500/20"
                          )}
                        >
                          {activity.type === "qualified" && (
                            <CheckCircle2 className="w-4 h-4 text-blue-500" />
                          )}
                          {activity.type === "conversation" && (
                            <MessageSquare className="w-4 h-4 text-blue-500" />
                          )}
                          {activity.type === "engaged" && (
                            <Users className="w-4 h-4 text-purple-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground">
                            {activity.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatTime(activity.timestamp)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized View */}
      <AnimatePresence>
        {isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.button
              onClick={() => setIsMinimized(false)}
              className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/60 shadow-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Brain className="w-8 h-8 text-white" />

              {/* Live indicator */}
              <motion.div
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-500 border-2 border-white shadow-lg"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />

              {/* Pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-primary"
                animate={{
                  scale: [1, 1.4],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Conversation View */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[80vh] flex flex-col"
            >
              <Card className="glass-card border-2 border-primary/30 flex flex-col h-full overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-border/50 bg-gradient-to-r from-primary/10 to-transparent flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                      <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-bold">Agent Sri</h3>
                      <p className="text-xs text-muted-foreground">
                        Autonomous AI Assistant
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsExpanded(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                          "flex",
                          message.type === "user" ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[80%] rounded-2xl px-4 py-3",
                            message.type === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-foreground"
                          )}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Typing indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-secondary rounded-2xl px-4 py-3 flex items-center gap-2">
                        <motion.div
                          className="flex gap-1"
                          animate={{
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                          }}
                        >
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border/50 bg-secondary/20">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-3 rounded-xl border-2 border-border bg-background focus:border-primary focus:outline-none transition-colors"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      className="gap-2"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
