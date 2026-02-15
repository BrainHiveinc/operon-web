/**
 * Agent Sri Core Integration
 * Initializes and exports the autonomous agent for use throughout the app
 */

import { AgentOrchestrator, OperationMode, AutonomyLevel } from '@/agent-core/orchestrator';

// Initialize agent with default configuration
const agentConfig = {
  mode: OperationMode.WEB,
  autonomy: AutonomyLevel.SEMI_AUTONOMOUS, // Requires approval for high-risk actions
  memoryEnabled: true,
  pluginsEnabled: true,
  maxIterations: 10,
  approvalTimeout: 300000, // 5 minutes
  websiteUrl: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
};

// Create agent instance
export const agent = new AgentOrchestrator(agentConfig);

// Flag to track initialization
let initPromise: Promise<void> | null = null;

/**
 * Initialize Agent Sri
 * Call this once at app startup
 */
export async function initializeAgent(): Promise<void> {
  // Prevent multiple initializations
  if (initPromise) {
    return initPromise;
  }

  initPromise = agent.initialize().catch(error => {
    console.error('[Agent Sri] Initialization failed:', error);
    initPromise = null; // Allow retry
    throw error;
  });

  return initPromise;
}

/**
 * Check if agent is ready
 */
export function isAgentReady(): boolean {
  return initPromise !== null;
}

/**
 * Get agent stats
 */
export async function getAgentStats() {
  const memoryStats = await agent.getMemoryStats();
  const activeTasks = agent.getActiveTasks();
  const history = agent.getTaskHistory();

  return {
    initialized: isAgentReady(),
    activeTasks: activeTasks.length,
    completedTasks: history.length,
    memoryStats
  };
}

/**
 * Process user request through Agent Sri
 */
export async function processUserRequest(
  instruction: string,
  context?: Record<string, any>
) {
  // Ensure agent is initialized
  if (!isAgentReady()) {
    await initializeAgent();
  }

  return agent.processRequest(instruction, context, 'user');
}

// Initialize agent on module load (browser only)
if (typeof window !== 'undefined') {
  initializeAgent().catch(error => {
    console.error('[Agent Sri] Auto-initialization failed:', error);
  });
}
