import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Minimize2, Maximize2, Sparkles, Activity } from "lucide-react";
import { Button } from "./ui/button";
import { AgentApiService } from "@/services/agentApi";

interface Suggestion {
  id: string;
  message: string;
  action?: () => void;
}

export function PersistentAgentSri() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'agent'; content: string }>>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [pageContext, setPageContext] = useState({ path: '', title: '' });

  // Observe page changes and generate suggestions
  useEffect(() => {
    const observer = new MutationObserver(() => {
      analyzePageAndSuggest();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Initial page analysis
    analyzePageAndSuggest();

    return () => observer.disconnect();
  }, []);

  // Track page context
  useEffect(() => {
    setPageContext({
      path: window.location.pathname,
      title: document.title
    });

    // Log page view for analytics
    console.log('[Agent Sri] Page view:', {
      path: window.location.pathname,
      title: document.title,
      timestamp: Date.now()
    });
  }, [window.location.pathname]);

  const analyzePageAndSuggest = () => {
    const path = window.location.pathname;
    const newSuggestions: Suggestion[] = [];

    // Context-aware suggestions based on page
    if (path === '/') {
      newSuggestions.push({
        id: 'home_explore',
        message: "👋 Want me to guide you through Operon OS features?",
      });
    } else if (path.includes('/product')) {
      newSuggestions.push({
        id: 'product_demo',
        message: "🎯 I can show you how to deploy your first agent!",
      });
    } else if (path.includes('/dashboard')) {
      newSuggestions.push({
        id: 'dashboard_help',
        message: "📊 I notice you're on the dashboard. Need help setting up?",
      });
    }

    // Check for forms on page
    const forms = document.querySelectorAll('form');
    if (forms.length > 0 && !isOpen) {
      newSuggestions.push({
        id: 'form_help',
        message: "📝 I can help you fill out this form automatically!",
      });
    }

    // Check for errors
    const errors = document.querySelectorAll('[class*="error"]');
    if (errors.length > 0) {
      newSuggestions.push({
        id: 'error_help',
        message: "⚠️ I detected an error. Let me help fix it!",
      });
    }

    setSuggestions(newSuggestions.slice(0, 2)); // Max 2 suggestions
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { type: 'user', content: userMsg }]);
    setInput("");
    setIsThinking(true);

    try {
      // Add page context to mission
      const contextualMission = `Page: ${pageContext.path}\nUser: ${userMsg}`;

      const response = await AgentApiService.executeMission({
        description: contextualMission
      });

      const agentResponse = response.mission.result.sections[0]?.content || 'I can help with that.';

      setMessages(prev => [...prev, { type: 'agent', content: agentResponse }]);

      // Log interaction for learning
      console.log('[Agent Sri Learning]', {
        page: pageContext.path,
        userQuery: userMsg,
        agentResponse: agentResponse,
        timestamp: Date.now()
      });

    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'agent',
        content: '⚠️ Connection issue. Make sure proxy is running.'
      }]);
    } finally {
      setIsThinking(false);
    }
  };

  const executePageAction = (actionType: string) => {
    console.log('[Agent Sri Action]', actionType);
    // This will be expanded with actual browser automation
    switch(actionType) {
      case 'fill_form':
        alert('Form filling feature coming soon!');
        break;
      case 'navigate':
        alert('Navigation feature coming soon!');
        break;
      default:
        break;
    }
  };

  return (
    <>
      {/* Floating Widget Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="relative w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 group"
            >
              <Sparkles className="w-8 h-8 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

              {/* Pulse animation */}
              <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />

              {/* Active indicator */}
              <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
            </button>

            {/* Suggestion Bubbles */}
            {suggestions.length > 0 && (
              <div className="absolute bottom-20 right-0 space-y-2 w-64">
                {suggestions.map(suggestion => (
                  <motion.div
                    key={suggestion.id}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="bg-white dark:bg-gray-900 border border-primary/20 rounded-lg p-3 shadow-lg text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                    onClick={() => setIsOpen(true)}
                  >
                    {suggestion.message}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className={`fixed bottom-6 right-6 z-50 bg-white dark:bg-gray-950 border border-primary/20 rounded-2xl shadow-2xl overflow-hidden ${
              isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
            } flex flex-col transition-all`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-primary/20 bg-gradient-to-r from-primary/10 to-purple-500/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-semibold text-sm">Agent Sri</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    Watching {pageContext.path}
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="h-8 w-8"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.length === 0 && (
                    <div className="text-center text-muted-foreground text-sm py-8">
                      <Sparkles className="w-12 h-12 mx-auto mb-3 text-primary" />
                      <p>I'm watching this page and learning.</p>
                      <p className="text-xs mt-1">Ask me anything or let me suggest actions!</p>
                    </div>
                  )}

                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 text-sm ${
                          msg.type === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-gray-100 dark:bg-gray-800'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}

                  {isThinking && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-sm">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                          <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-primary/20">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Ask me anything..."
                      className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button onClick={handleSend} size="sm" disabled={!input.trim()}>
                      Send
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
