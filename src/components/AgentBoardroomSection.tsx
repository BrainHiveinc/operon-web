import { motion } from "framer-motion";
import { Users, MessageSquare, Target, TrendingUp, AlertCircle, CheckCircle2, Clock, Lightbulb } from "lucide-react";
import { useState, useEffect } from "react";

const agents = [
  { id: "sri", name: "Agent Sri", role: "Lead", color: "emerald", avatar: "👨‍💼" },
  { id: "data", name: "Data Agent", role: "Analytics", color: "blue", avatar: "📊" },
  { id: "comp", name: "Compliance Agent", role: "Governance", color: "purple", avatar: "⚖️" },
  { id: "ops", name: "Ops Agent", role: "Execution", color: "orange", avatar: "⚡" }
];

const meetingTopics = [
  { icon: Target, label: "Today's Objectives", speaker: "sri", message: "3 compliance reports due, 2 data analyses pending" },
  { icon: TrendingUp, label: "Progress Update", speaker: "data", message: "Q4 analysis 87% complete, on track for delivery" },
  { icon: AlertCircle, label: "Blockers", speaker: "comp", message: "Waiting on legal approval for policy changes" },
  { icon: CheckCircle2, label: "Completed Tasks", speaker: "ops", message: "All overnight batch processes succeeded" },
  { icon: Lightbulb, label: "Optimizations", speaker: "sri", message: "New workflow reduces processing time by 40%" }
];

export function AgentBoardroomSection() {
  const [currentTopic, setCurrentTopic] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTopic((prev) => (prev + 1) % meetingTopics.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentSpeaker = agents.find(a => a.id === meetingTopics[currentTopic].speaker);

  return (
    <section className="section-padding bg-secondary/30">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
          >
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Multi-Agent Collaboration
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 sm:mb-6 px-4 sm:px-0">
            <span className="gradient-text">Daily Boardroom Meetings</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4 sm:px-0">
            Every day, your agents sync like a scrum team. Autonomous coordination at scale.
          </p>
        </motion.div>

        {/* Boardroom Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          {/* Meeting Room */}
          <div className="glass-card p-6 sm:p-8 md:p-10">
            {/* Meeting Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg">Daily Sync</h3>
                  <p className="text-sm text-muted-foreground">Agent Coordination Session</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>09:00 AM</span>
              </div>
            </div>

            {/* Agents around the table */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {agents.map((agent) => {
                const isCurrentSpeaker = currentSpeaker?.id === agent.id;
                return (
                  <motion.div
                    key={agent.id}
                    animate={isCurrentSpeaker ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.5 }}
                    className={`glass-card-hover p-4 text-center ${
                      isCurrentSpeaker ? 'border-2 border-primary glow' : ''
                    }`}
                  >
                    <div className="text-4xl mb-2">{agent.avatar}</div>
                    <h4 className="font-semibold text-sm mb-1">{agent.name}</h4>
                    <p className="text-xs text-muted-foreground">{agent.role}</p>
                    {isCurrentSpeaker && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2 flex items-center justify-center gap-1"
                      >
                        <MessageSquare className="w-3 h-3 text-primary animate-pulse" />
                        <span className="text-xs text-primary font-medium">Speaking</span>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Current Discussion Topic */}
            <motion.div
              key={currentTopic}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-card bg-primary/5 p-6 border-l-4 border-primary"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {(() => {
                    const Icon = meetingTopics[currentTopic].icon;
                    return <Icon className="w-5 h-5 text-primary" />;
                  })()}
                </div>
                <div className="flex-1">
                  <h4 className="font-display font-bold mb-2 text-foreground">
                    {meetingTopics[currentTopic].label}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {meetingTopics[currentTopic].message}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-primary">
                    <span className="font-medium">{currentSpeaker?.name}</span>
                    <span className="text-muted-foreground">• {currentSpeaker?.role}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Topic Progress Indicators */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {meetingTopics.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTopic(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentTopic
                      ? 'bg-primary w-8'
                      : 'bg-primary/20 hover:bg-primary/40'
                  }`}
                  aria-label={`Go to topic ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Meeting Outcomes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-3 gap-4 mt-6"
          >
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold gradient-text mb-1">100%</div>
              <p className="text-sm text-muted-foreground">Autonomous</p>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold gradient-text mb-1">Daily</div>
              <p className="text-sm text-muted-foreground">Coordination</p>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold gradient-text mb-1">Real-time</div>
              <p className="text-sm text-muted-foreground">Sync</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Description */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center max-w-3xl mx-auto px-4"
        >
          <p className="text-base sm:text-lg text-muted-foreground">
            <span className="text-foreground font-semibold">No manual standups required.</span>
            {" "}Agents coordinate autonomously, share progress, identify blockers, and optimize workflows—just like your best teams, but 24/7 without human intervention.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
