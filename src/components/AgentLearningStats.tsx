/**
 * Agent Learning Stats - Shows agent learning progress
 */

import { useEffect, useState } from 'react';
import { Brain, TrendingUp, Database, Zap } from 'lucide-react';
import { getAgentStats } from '@/services/agentSriCore';
import { motion } from 'framer-motion';

interface AgentStats {
  initialized: boolean;
  activeTasks: number;
  completedTasks: number;
  memoryStats: {
    totalMemories: number;
    successfulTasks: number;
    patternsLearned: number;
    vocabularySize: number;
  } | null;
}

export function AgentLearningStats() {
  const [stats, setStats] = useState<AgentStats | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const agentStats = await getAgentStats();
        setStats(agentStats);
      } catch (error) {
        console.error('[AgentStats] Failed to load:', error);
      }
    };

    // Load immediately
    loadStats();

    // Update every 30 seconds
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!stats || !stats.initialized) {
    return null;
  }

  const { memoryStats, completedTasks } = stats;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 shadow-2xl"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Agent Learning</h3>
          <p className="text-xs text-slate-400">Live Intelligence</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard
          icon={<TrendingUp className="w-4 h-4" />}
          label="Tasks Completed"
          value={completedTasks}
          color="from-green-500 to-emerald-500"
        />
        <StatCard
          icon={<Zap className="w-4 h-4" />}
          label="Patterns Learned"
          value={memoryStats?.patternsLearned || 0}
          color="from-blue-500 to-cyan-500"
        />
        <StatCard
          icon={<Database className="w-4 h-4" />}
          label="Success Rate"
          value={
            memoryStats && memoryStats.totalMemories > 0
              ? `${Math.round((memoryStats.successfulTasks / memoryStats.totalMemories) * 100)}%`
              : '0%'
          }
          color="from-purple-500 to-pink-500"
          isPercentage
        />
        <StatCard
          icon={<Brain className="w-4 h-4" />}
          label="Vocabulary"
          value={memoryStats?.vocabularySize || 0}
          color="from-orange-500 to-red-500"
        />
      </div>

      {memoryStats && memoryStats.patternsLearned > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-700/50">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Agent is learning and improving</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: string;
  isPercentage?: boolean;
}

function StatCard({ icon, label, value, color, isPercentage }: StatCardProps) {
  return (
    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/30">
      <div className="flex items-center gap-2 mb-2">
        <div className={`p-1.5 bg-gradient-to-br ${color} rounded-md text-white`}>
          {icon}
        </div>
        <span className="text-xs text-slate-400">{label}</span>
      </div>
      <div className={`text-2xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
        {value}
      </div>
    </div>
  );
}
