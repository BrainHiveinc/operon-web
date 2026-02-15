/**
 * Agent Sri Core Orchestrator
 * Main coordinator for autonomous agent operations
 * No external APIs - fully self-contained
 */

import { VectorMemory } from './memory/vector-store';
import { DecisionEngine, ExecutionPlan } from './decision-engine';
import { ApprovalGate } from './approval-gate';
import { FileSystemScanner } from './filesystem/scanner';
import { PluginManager } from './plugins/manager';

export enum OperationMode {
  WEB = 'web',
  API = 'api',
  BACKGROUND = 'background'
}

export enum AutonomyLevel {
  FULLY_AUTONOMOUS = 'full',
  SEMI_AUTONOMOUS = 'semi',
  INTERACTIVE = 'interactive'
}

export interface AgentConfig {
  mode: OperationMode;
  autonomy: AutonomyLevel;
  workspacePath?: string;
  memoryEnabled: boolean;
  pluginsEnabled: boolean;
  maxIterations: number;
  approvalTimeout: number;
  websiteUrl: string;
}

export interface AgentTask {
  id: string;
  instruction: string;
  context?: Record<string, any>;
  source: string;
  status: 'pending' | 'planning' | 'executing' | 'completed' | 'failed';
  createdAt: number;
  completedAt?: number;
}

export class AgentOrchestrator {
  private config: AgentConfig;
  private sessionId: string;
  private isInitialized: boolean = false;

  // Core components
  private memory?: VectorMemory;
  private decisionEngine?: DecisionEngine;
  private approvalGate?: ApprovalGate;
  private pluginManager?: PluginManager;
  private filesystem?: FileSystemScanner;

  // State
  private activeTasks: Map<string, AgentTask> = new Map();
  private taskHistory: AgentTask[] = [];

  constructor(config: AgentConfig) {
    this.config = config;
    this.sessionId = this.generateSessionId();
  }

  async initialize(): Promise<void> {
    console.log(`[Agent Sri] Initializing in ${this.config.mode} mode...`);

    // 1. Initialize Memory System
    if (this.config.memoryEnabled) {
      this.memory = new VectorMemory({
        collectionName: `agent_${this.sessionId}`,
        persistKey: 'agent_sri_memory'
      });
      await this.memory.initialize();
    }

    // 2. Initialize Decision Engine
    this.decisionEngine = new DecisionEngine({
      memory: this.memory,
      autonomy: this.config.autonomy
    });

    // 3. Initialize Approval Gate
    this.approvalGate = new ApprovalGate({
      mode: this.config.mode,
      autonomy: this.config.autonomy,
      timeout: this.config.approvalTimeout
    });

    // 4. Initialize Plugin Manager
    if (this.config.pluginsEnabled) {
      this.pluginManager = new PluginManager();
      await this.pluginManager.loadPlugins();
    }

    // 5. Initialize File System Scanner
    if (this.config.workspacePath) {
      this.filesystem = new FileSystemScanner(this.config.workspacePath);
      await this.filesystem.scan();
    }

    this.isInitialized = true;
    console.log('[Agent Sri] ✅ Initialized successfully!');
  }

  async processRequest(
    instruction: string,
    context?: Record<string, any>,
    source: string = 'user'
  ): Promise<{
    taskId: string;
    status: string;
    success: boolean;
    steps: any[];
    summary: string;
    learned: boolean;
  }> {
    if (!this.isInitialized) {
      throw new Error('Agent not initialized');
    }

    const taskId = this.generateTaskId();
    const task: AgentTask = {
      id: taskId,
      instruction,
      context,
      source,
      status: 'pending',
      createdAt: Date.now()
    };

    this.activeTasks.set(taskId, task);

    try {
      // Step 1: Gather context
      task.status = 'planning';
      const fullContext = await this.gatherContext(instruction, context);

      // Step 2: Create execution plan
      const plan = await this.decisionEngine!.createPlan(instruction, fullContext);
      console.log(`[Task ${taskId}] Plan created: ${plan.steps.length} steps`);

      // Step 3: Assess risk
      const risk = await this.decisionEngine!.assessRisk(plan);
      console.log(`[Task ${taskId}] Risk level: ${risk.level}`);

      // Step 4: Check approval if needed
      if (risk.requiresApproval) {
        const approval = await this.approvalGate!.requestApproval(
          taskId,
          plan,
          risk,
          source
        );

        if (!approval.granted) {
          task.status = 'failed';
          return {
            taskId,
            status: 'rejected',
            success: false,
            steps: [],
            summary: `Rejected: ${approval.reason}`,
            learned: false
          };
        }
      }

      // Step 5: Execute plan
      task.status = 'executing';
      const result = await this.executePlan(taskId, plan, fullContext);

      // Step 6: Learn from outcome
      let learned = false;
      if (this.memory && result.success) {
        await this.memory.storeTaskOutcome(
          taskId,
          instruction,
          plan,
          result,
          result.success
        );
        learned = true;
      }

      task.status = result.success ? 'completed' : 'failed';
      task.completedAt = Date.now();
      this.taskHistory.push(task);
      this.activeTasks.delete(taskId);

      return {
        ...result,
        learned
      };

    } catch (error) {
      task.status = 'failed';
      task.completedAt = Date.now();
      this.activeTasks.delete(taskId);

      throw error;
    }
  }

  private async gatherContext(
    instruction: string,
    userContext?: Record<string, any>
  ): Promise<Record<string, any>> {
    const context: Record<string, any> = userContext || {};

    // Add file system context
    if (this.filesystem) {
      context.filesystem = {
        files: this.filesystem.getFileList(),
        structure: this.filesystem.getTree(),
        language: this.filesystem.detectLanguage(),
        framework: this.filesystem.detectFramework()
      };
    }

    // Add memory context (similar tasks)
    if (this.memory) {
      const similarTasks = await this.memory.findSimilarTasks(instruction, 3);
      context.memory = {
        similarTasks,
        patterns: await this.memory.getPatterns()
      };
    }

    // Add plugin context
    if (this.pluginManager) {
      context.plugins = this.pluginManager.listPlugins();
    }

    // Add website context
    context.website = {
      url: this.config.websiteUrl,
      sessionId: this.sessionId,
      taskHistory: this.taskHistory.length
    };

    return context;
  }

  private async executePlan(
    taskId: string,
    plan: ExecutionPlan,
    context: Record<string, any>
  ): Promise<{
    taskId: string;
    status: string;
    success: boolean;
    steps: any[];
    summary: string;
  }> {
    const results: any[] = [];
    const task = this.activeTasks.get(taskId);

    for (let i = 0; i < plan.steps.length; i++) {
      const step = plan.steps[i];
      console.log(`[Task ${taskId}] Step ${i + 1}/${plan.steps.length}: ${step.description}`);

      try {
        const stepResult = await this.executeStep(step, context);
        results.push({
          step: i + 1,
          description: step.description,
          success: true,
          result: stepResult
        });

      } catch (error) {
        console.error(`[Task ${taskId}] Step ${i + 1} failed:`, error);
        results.push({
          step: i + 1,
          description: step.description,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });

        // Stop if critical step fails
        if (step.critical) {
          break;
        }
      }
    }

    const success = results.every(r => r.success);

    return {
      taskId,
      status: success ? 'completed' : 'failed',
      success,
      steps: results,
      summary: this.generateSummary(results)
    };
  }

  private async executeStep(
    step: any,
    context: Record<string, any>
  ): Promise<any> {
    const { actionType, params } = step;

    switch (actionType) {
      case 'analyze_code':
        return this.filesystem?.analyzeFile(params.path);

      case 'file_read':
        return this.filesystem?.readFile(params.path);

      case 'file_write':
        return this.filesystem?.writeFile(params.path, params.content);

      case 'analyze_patterns':
        return this.memory?.analyzePatterns(params.query);

      case 'plugin_execute':
        return this.pluginManager?.executePlugin(params.name, params.args);

      case 'improve_code':
        return this.improveCode(params);

      case 'generate_component':
        return this.generateComponent(params);

      default:
        throw new Error(`Unknown action type: ${actionType}`);
    }
  }

  private async improveCode(params: any): Promise<any> {
    // Analyze code and suggest improvements
    if (!this.filesystem) {
      throw new Error('Filesystem not available');
    }

    const file = await this.filesystem.readFile(params.path);
    const analysis = await this.filesystem.analyzeFile(params.path);

    // Get patterns from memory about successful code
    const patterns = this.memory
      ? await this.memory.getPatterns()
      : [];

    // Generate improvements based on patterns and analysis
    const improvements = this.generateImprovements(file, analysis, patterns);

    return improvements;
  }

  private async generateComponent(params: any): Promise<any> {
    // Generate React component based on patterns learned
    const patterns = this.memory
      ? await this.memory.getComponentPatterns()
      : [];

    // Use learned patterns to generate new component
    const component = this.buildComponent(params.name, params.props, patterns);

    return component;
  }

  private generateImprovements(
    code: string,
    analysis: any,
    patterns: any[]
  ): any {
    const improvements: any[] = [];

    // Check for common issues
    if (analysis.complexity > 10) {
      improvements.push({
        type: 'complexity',
        severity: 'high',
        suggestion: 'Split into smaller functions',
        confidence: 0.9
      });
    }

    // Check against learned patterns
    patterns.forEach(pattern => {
      if (pattern.type === 'best_practice' && !code.includes(pattern.code)) {
        improvements.push({
          type: 'pattern',
          severity: 'medium',
          suggestion: pattern.description,
          code: pattern.code,
          confidence: pattern.successRate
        });
      }
    });

    return improvements;
  }

  private buildComponent(
    name: string,
    props: any,
    patterns: any[]
  ): string {
    // Find most successful component patterns
    const template = patterns.find(p => p.type === 'component' && p.successRate > 0.8);

    if (template) {
      // Use learned template
      return this.applyTemplate(template.code, name, props);
    }

    // Default template
    return `
import React from 'react';

export interface ${name}Props {
  ${Object.entries(props).map(([k, v]) => `${k}: ${v};`).join('\n  ')}
}

export const ${name}: React.FC<${name}Props> = (props) => {
  return (
    <div className="${name.toLowerCase()}">
      {/* Component content */}
    </div>
  );
};
    `.trim();
  }

  private applyTemplate(template: string, name: string, props: any): string {
    return template
      .replace(/ComponentName/g, name)
      .replace(/\/\* props \*\//g, Object.entries(props).map(([k, v]) => `${k}: ${v};`).join('\n  '));
  }

  private generateSummary(results: any[]): string {
    const successCount = results.filter(r => r.success).length;
    const totalCount = results.length;

    if (successCount === totalCount) {
      return `Successfully completed all ${totalCount} steps`;
    } else if (successCount === 0) {
      return `Failed to complete any steps`;
    } else {
      return `Completed ${successCount} of ${totalCount} steps`;
    }
  }

  private generateSessionId(): string {
    return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateTaskId(): string {
    return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Public API for monitoring
  getActiveTasks(): AgentTask[] {
    return Array.from(this.activeTasks.values());
  }

  getTaskHistory(): AgentTask[] {
    return this.taskHistory;
  }

  async getMemoryStats() {
    if (!this.memory) return null;
    return this.memory.getStats();
  }

  async shutdown(): Promise<void> {
    console.log('[Agent Sri] Shutting down...');

    if (this.memory) {
      await this.memory.persist();
    }

    console.log('[Agent Sri] ✅ Shutdown complete');
  }
}
