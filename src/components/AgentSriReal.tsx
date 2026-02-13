/**
 * Agent Sri - REAL AI Agent (not chatbot!)
 * Connects to FastAPI backend with natural conversation, memory, and lead qualification
 */

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Sparkles,
  Send,
  X,
  Minimize2,
  Brain,
  Zap,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "agent" | "user";
  content: string;
  timestamp: Date;
}

// ============================================================================
// CONFIGURATION
// ============================================================================
const API_URL = import.meta.env.VITE_AGENT_SRI_API_URL || "http://localhost:5106";

// ============================================================================
// AGENT SRI COMPONENT
// ============================================================================

export function AgentSriReal() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [leadScore, setLeadScore] = useState<number>(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Generate unique user ID on mount
  useEffect(() => {
    const newUserId = `user_${Math.random().toString(36).substring(2, 15)}`;
    setUserId(newUserId);
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message to Agent Sri API
  const sendMessageToAgent = async (userMessage: string) => {
    try {
      setIsTyping(true);

      // Collect website metrics
      const metrics = {
        page_url: window.location.href,
        time_on_page: performance.now() / 1000,
        scroll_depth: (window.scrollY / document.body.scrollHeight) * 100,
        referrer: document.referrer || "direct",
        clicks: [],
      };

      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          user_id: userId,
          session_id: sessionId,
          metadata: metrics,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      // Update session ID if new
      if (!sessionId) {
        setSessionId(data.session_id);
      }

      // Update lead score
      if (data.lead_score) {
        setLeadScore(data.lead_score);
      }

      // Add agent response
      const agentMessage: Message = {
        id: data.timestamp || Date.now().toString(),
        type: "agent",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, agentMessage]);
      setIsTyping(false);
    } catch (error) {
      console.error("Agent Sri error:", error);
      setIsTyping(false);

      // Fallback message
      const fallbackMessage: Message = {
        id: Date.now().toString(),
        type: "agent",
        content: "I'm having trouble connecting right now. Please try again in a moment!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    }
  };

  // Initial greeting when expanded - Agent-like with system status
  useEffect(() => {
    if (messages.length === 0 && isExpanded) {
      // System initialization message
      const systemMsg: Message = {
        id: "system-init",
        type: "agent",
        content: "🔄 Agent Sri initializing...",
        timestamp: new Date(),
      };
      setMessages([systemMsg]);

      // Show typing indicator
      setIsTyping(true);

      // Simulate agent analyzing context
      setTimeout(() => {
        setIsTyping(false);
        const greeting: Message = {
          id: "greeting",
          type: "agent",
          content: `👋 Hi! I'm Agent Sri, an autonomous AI agent running live on Operon OS.\n\nI've analyzed your session:\n• Page: ${window.location.pathname}\n• Time: ${new Date().toLocaleTimeString()}\n• Referrer: ${document.referrer || 'Direct visit'}\n\nI can help you explore Operon OS, qualify your use case, and connect you with the right resources. What would you like to know?`,
          timestamp: new Date(),
        };
        setMessages((prev) => [greeting]);
      }, 1500);
    }
  }, [isExpanded, messages.length]);

  // Handle user message
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageToSend = inputValue;
    setInputValue("");

    // Send to API
    await sendMessageToAgent(messageToSend);
  };

  // Quick action buttons
  const quickActions = [
    { label: "Features", message: "Tell me about Operon OS features" },
    { label: "Pricing", message: "What are the pricing options?" },
    { label: "Demo", message: "I want to see a demo" },
    { label: "Use Cases", message: "How can I automate workflows?" },
  ];

  const handleQuickAction = (message: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    sendMessageToAgent(message);
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
                    {/* Animated Avatar - Operon OS Logo */}
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
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shadow-lg border border-primary/20 backdrop-blur-sm">
                        <Logo className="w-12 h-12" animated={true} />
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
                        Real AI agent running on Operon OS • Not a chatbot
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

              {/* Introduction */}
              <div className="p-6 border-b border-border/50 bg-secondary/10">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-sm text-foreground leading-relaxed">
                      <strong>👋 Hi! I'm Agent Sri</strong>, a real Operon OS agent running live on this website.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      I can help you understand the platform, qualify your needs, and connect you with the right resources.
                      I learn from every conversation and get smarter over time!
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold">Ask me about:</h4>
                  <Button
                    size="sm"
                    onClick={() => setIsExpanded(true)}
                    className="gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Start Conversation
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action) => (
                    <Button
                      key={action.label}
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setIsExpanded(true);
                        setTimeout(() => handleQuickAction(action.message), 500);
                      }}
                      className="text-xs"
                    >
                      {action.label}
                    </Button>
                  ))}
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
              className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 shadow-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-transform border border-primary/20 backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Logo className="w-12 h-12" animated={true} />

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
                      <span className="text-lg font-bold text-white font-display">OS</span>
                      <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-bold">Agent Sri</h3>
                      <p className="text-xs text-muted-foreground">
                        Live AI Agent • Operon OS
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {leadScore > 0 && (
                      <Badge variant="outline" className="text-xs">
                        Lead Score: {leadScore}/100
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsExpanded(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-secondary/5">
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
                              : "bg-white dark:bg-secondary text-foreground border border-border/50"
                          )}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
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

                  {/* Agent thinking indicator - More autonomous feel */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gradient-to-r from-primary/5 to-transparent dark:from-primary/10 rounded-2xl px-4 py-3 flex items-center gap-3 border border-primary/30">
                        {/* Animated brain/thinking icon */}
                        <motion.div
                          className="relative"
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                          }}
                        >
                          <Brain className="w-4 h-4 text-primary" />
                          <motion.div
                            className="absolute -inset-1 rounded-full bg-primary/20"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.5, 0, 0.5],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                            }}
                          />
                        </motion.div>

                        {/* Animated dots with stagger */}
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 rounded-full bg-primary"
                              animate={{
                                y: [-2, 2, -2],
                                opacity: [1, 0.5, 1],
                              }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: i * 0.15,
                              }}
                            />
                          ))}
                        </div>

                        <span className="text-xs font-medium text-primary">
                          Agent analyzing...
                        </span>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border/50 bg-white dark:bg-secondary/20">
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
                      disabled={!inputValue.trim() || isTyping}
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
