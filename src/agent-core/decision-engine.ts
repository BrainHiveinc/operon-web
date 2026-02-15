/**
 * Decision Engine - The brain of Agent Sri
 * Handles understanding, planning, and risk assessment
 * No external APIs - pure logic
 */

import { AutonomyLevel } from './orchestrator';
import { VectorMemory } from './memory/vector-store';

export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export enum ActionType {
  FILE_READ = 'file_read',
  FILE_WRITE = 'file_write',
  FILE_DELETE = 'file_delete',
  ANALYZE_CODE = 'analyze_code',
  ANALYZE_PATTERNS = 'analyze_patterns',
  PLUGIN_EXECUTE = 'plugin_execute',
  IMPROVE_CODE = 'improve_code',
  GENERATE_COMPONENT = 'generate_component',
  DEPLOY_CHANGES = 'deploy_changes',
  SEND_MESSAGE = 'send_message'
}

export interface ExecutionStep {
  stepNumber: number;
  actionType: ActionType;
  description: string;
  params: Record<string, any>;
  critical: boolean;
  riskLevel: RiskLevel;
  estimatedDuration: number;
}

export interface ExecutionPlan {
  taskId: string;
  description: string;
  steps: ExecutionStep[];
  estimatedTotalTime: number;
  overallRisk: RiskLevel;
}

export interface RiskAssessment {
  level: RiskLevel;
  requiresApproval: boolean;
  concerns: string[];
  destructiveActions: string[];
  externalCalls: string[];
}

export interface DecisionEngineConfig {
  memory?: VectorMemory;
  autonomy: AutonomyLevel;
}

export class DecisionEngine {
  private config: DecisionEngineConfig;

  // High risk actions that need approval
  private static HIGH_RISK_ACTIONS = [
    ActionType.FILE_DELETE,
    ActionType.FILE_WRITE,
    ActionType.DEPLOY_CHANGES,
    ActionType.SEND_MESSAGE
  ];

  // Low risk actions that can auto-execute
  private static LOW_RISK_ACTIONS = [
    ActionType.FILE_READ,
    ActionType.ANALYZE_CODE,
    ActionType.ANALYZE_PATTERNS
  ];

  constructor(config: DecisionEngineConfig) {
    this.config = config;
  }

  async createPlan(
    instruction: string,
    context: Record<string, any>
  ): Promise<ExecutionPlan> {
    // Parse intent from instruction
    const intent = this.parseIntent(instruction);

    // Check memory for similar successful tasks
    let similarApproaches: any[] = [];
    if (this.config.memory) {
      const similar = await this.config.memory.findSimilarTasks(instruction, 3);
      similarApproaches = similar.filter(s => s.success);
    }

    // Generate steps based on intent and learned patterns
    const steps = this.generateSteps(intent, context, similarApproaches);

    // Calculate overall risk
    const overallRisk = this.calculateOverallRisk(steps);

    // Estimate time
    const estimatedTotalTime = steps.reduce((sum, step) => sum + step.estimatedDuration, 0);

    return {
      taskId: '',
      description: instruction,
      steps,
      estimatedTotalTime,
      overallRisk
    };
  }

  async assessRisk(plan: ExecutionPlan): Promise<RiskAssessment> {
    const concerns: string[] = [];
    const destructiveActions: string[] = [];
    const externalCalls: string[] = [];

    // Analyze each step
    plan.steps.forEach(step => {
      if (step.actionType === ActionType.FILE_DELETE) {
        destructiveActions.push(`Delete file: ${step.params.path}`);
        concerns.push('Irreversible file deletion');
      }

      if (step.actionType === ActionType.FILE_WRITE) {
        concerns.push(`Modify file: ${step.params.path}`);
      }

      if (step.actionType === ActionType.DEPLOY_CHANGES) {
        destructiveActions.push('Deploy changes to production');
        concerns.push('Changes will be visible to users');
      }

      if (step.actionType === ActionType.SEND_MESSAGE) {
        externalCalls.push(`Send message to: ${step.params.to}`);
        concerns.push('External communication');
      }
    });

    // Determine if approval needed based on autonomy level
    let requiresApproval = false;

    if (this.config.autonomy === AutonomyLevel.INTERACTIVE) {
      requiresApproval = true;
    } else if (this.config.autonomy === AutonomyLevel.SEMI_AUTONOMOUS) {
      requiresApproval = destructiveActions.length > 0 || plan.overallRisk !== RiskLevel.LOW;
    } else if (this.config.autonomy === AutonomyLevel.FULLY_AUTONOMOUS) {
      requiresApproval = plan.overallRisk === RiskLevel.HIGH;
    }

    return {
      level: plan.overallRisk,
      requiresApproval,
      concerns,
      destructiveActions,
      externalCalls
    };
  }

  private parseIntent(instruction: string): {
    action: string;
    target?: string;
    details: Record<string, any>;
  } {
    const lower = instruction.toLowerCase();

    // Analyze website
    if (lower.includes('analyze') && (lower.includes('website') || lower.includes('site'))) {
      return {
        action: 'analyze_website',
        details: { scope: 'full' }
      };
    }

    // Improve something
    if (lower.includes('improve') || lower.includes('optimize') || lower.includes('fix')) {
      const target = this.extractTarget(instruction);
      return {
        action: 'improve',
        target,
        details: { type: 'improvement' }
      };
    }

    // Create/generate
    if (lower.includes('create') || lower.includes('generate') || lower.includes('build')) {
      const target = this.extractTarget(instruction);
      return {
        action: 'create',
        target,
        details: { type: 'generation' }
      };
    }

    // Add feature
    if (lower.includes('add') && lower.includes('feature')) {
      return {
        action: 'add_feature',
        details: { description: instruction }
      };
    }

    // Fix bug
    if (lower.includes('fix') && lower.includes('bug')) {
      return {
        action: 'fix_bug',
        details: { description: instruction }
      };
    }

    // Default: analysis
    return {
      action: 'analyze',
      details: { query: instruction }
    };
  }

  private extractTarget(instruction: string): string {
    // Extract target from instruction (simple heuristic)
    const words = instruction.split(' ');
    const actionWords = ['improve', 'optimize', 'fix', 'create', 'generate', 'build'];

    let targetIndex = -1;
    actionWords.forEach(action => {
      const idx = words.findIndex(w => w.toLowerCase().includes(action));
      if (idx !== -1 && idx < words.length - 1) {
        targetIndex = idx + 1;
      }
    });

    return targetIndex !== -1 ? words.slice(targetIndex).join(' ') : 'unknown';
  }

  private generateSteps(
    intent: { action: string; target?: string; details: Record<string, any> },
    context: Record<string, any>,
    similarApproaches: any[]
  ): ExecutionStep[] {
    const steps: ExecutionStep[] = [];

    switch (intent.action) {
      case 'analyze_website':
        steps.push(...this.createAnalysisSteps(context));
        break;

      case 'improve':
        steps.push(...this.createImprovementSteps(intent.target!, context, similarApproaches));
        break;

      case 'create':
        steps.push(...this.createGenerationSteps(intent.target!, context));
        break;

      case 'add_feature':
        steps.push(...this.createFeatureSteps(intent.details.description, context));
        break;

      case 'fix_bug':
        steps.push(...this.createBugFixSteps(intent.details.description, context));
        break;

      default:
        steps.push(...this.createAnalysisSteps(context));
    }

    // Add step numbers
    steps.forEach((step, idx) => {
      step.stepNumber = idx + 1;
    });

    return steps;
  }

  private createAnalysisSteps(context: Record<string, any>): ExecutionStep[] {
    const steps: ExecutionStep[] = [];

    // Step 1: Analyze patterns in memory
    if (this.config.memory) {
      steps.push({
        stepNumber: 0,
        actionType: ActionType.ANALYZE_PATTERNS,
        description: 'Analyze learned patterns and user behavior',
        params: { query: 'user_interactions' },
        critical: false,
        riskLevel: RiskLevel.LOW,
        estimatedDuration: 5
      });
    }

    // Step 2: Analyze files if filesystem available
    if (context.filesystem) {
      steps.push({
        stepNumber: 0,
        actionType: ActionType.ANALYZE_CODE,
        description: 'Analyze website codebase',
        params: { path: '.' },
        critical: false,
        riskLevel: RiskLevel.LOW,
        estimatedDuration: 10
      });
    }

    return steps;
  }

  private createImprovementSteps(
    target: string,
    context: Record<string, any>,
    similarApproaches: any[]
  ): ExecutionStep[] {
    const steps: ExecutionStep[] = [];

    // Step 1: Analyze current state
    steps.push({
      stepNumber: 0,
      actionType: ActionType.ANALYZE_CODE,
      description: `Analyze current ${target}`,
      params: { target },
      critical: true,
      riskLevel: RiskLevel.LOW,
      estimatedDuration: 10
    });

    // Step 2: Generate improvements
    steps.push({
      stepNumber: 0,
      actionType: ActionType.IMPROVE_CODE,
      description: `Generate improvements for ${target}`,
      params: {
        target,
        useSimilarApproaches: similarApproaches.length > 0
      },
      critical: true,
      riskLevel: RiskLevel.MEDIUM,
      estimatedDuration: 15
    });

    return steps;
  }

  private createGenerationSteps(
    target: string,
    context: Record<string, any>
  ): ExecutionStep[] {
    return [{
      stepNumber: 0,
      actionType: ActionType.GENERATE_COMPONENT,
      description: `Generate ${target}`,
      params: { name: target },
      critical: true,
      riskLevel: RiskLevel.MEDIUM,
      estimatedDuration: 20
    }];
  }

  private createFeatureSteps(
    description: string,
    context: Record<string, any>
  ): ExecutionStep[] {
    const steps: ExecutionStep[] = [];

    // Step 1: Analyze requirements
    steps.push({
      stepNumber: 0,
      actionType: ActionType.ANALYZE_PATTERNS,
      description: 'Analyze feature requirements',
      params: { query: description },
      critical: true,
      riskLevel: RiskLevel.LOW,
      estimatedDuration: 5
    });

    // Step 2: Generate feature code
    steps.push({
      stepNumber: 0,
      actionType: ActionType.GENERATE_COMPONENT,
      description: 'Generate feature implementation',
      params: { description },
      critical: true,
      riskLevel: RiskLevel.MEDIUM,
      estimatedDuration: 30
    });

    return steps;
  }

  private createBugFixSteps(
    description: string,
    context: Record<string, any>
  ): ExecutionStep[] {
    const steps: ExecutionStep[] = [];

    // Step 1: Analyze bug
    steps.push({
      stepNumber: 0,
      actionType: ActionType.ANALYZE_CODE,
      description: 'Analyze bug and identify root cause',
      params: { query: description },
      critical: true,
      riskLevel: RiskLevel.LOW,
      estimatedDuration: 10
    });

    // Step 2: Generate fix
    steps.push({
      stepNumber: 0,
      actionType: ActionType.IMPROVE_CODE,
      description: 'Generate bug fix',
      params: { bugDescription: description },
      critical: true,
      riskLevel: RiskLevel.HIGH,
      estimatedDuration: 20
    });

    return steps;
  }

  private calculateOverallRisk(steps: ExecutionStep[]): RiskLevel {
    const riskScores = steps.map(step => {
      switch (step.riskLevel) {
        case RiskLevel.HIGH: return 3;
        case RiskLevel.MEDIUM: return 2;
        case RiskLevel.LOW: return 1;
      }
    });

    const avgRisk = riskScores.reduce((a, b) => a + b, 0) / riskScores.length;

    if (avgRisk >= 2.5) return RiskLevel.HIGH;
    if (avgRisk >= 1.5) return RiskLevel.MEDIUM;
    return RiskLevel.LOW;
  }
}
