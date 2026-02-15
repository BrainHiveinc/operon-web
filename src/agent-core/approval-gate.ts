/**
 * Approval Gate - Manages approval flow for risky operations
 * Handles different modes (web, API, background) and autonomy levels
 */

import type { ExecutionPlan, RiskAssessment } from './decision-engine';

export enum ApprovalStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  TIMEOUT = 'timeout',
  AUTO_APPROVED = 'auto_approved'
}

export interface ApprovalRequest {
  taskId: string;
  plan: ExecutionPlan;
  risk: RiskAssessment;
  source: string;
  timestamp: number;
}

export interface ApprovalResult {
  granted: boolean;
  status: ApprovalStatus;
  reason?: string;
  approvedBy?: string;
  approvedAt?: number;
}

export interface ApprovalGateConfig {
  mode: string;
  autonomy: string;
  timeout?: number;
}

export class ApprovalGate {
  private pendingApprovals: Map<string, ApprovalRequest> = new Map();
  private approvalCallbacks: Map<string, (result: ApprovalResult) => void> = new Map();
  private mode: string;
  private autonomy: string;
  private timeout: number;

  constructor(config: ApprovalGateConfig) {
    this.mode = config.mode;
    this.autonomy = config.autonomy;
    this.timeout = config.timeout || 300000; // 5 minutes default
  }

  async requestApproval(
    taskId: string,
    plan: ExecutionPlan,
    risk: RiskAssessment,
    source: string
  ): Promise<ApprovalResult> {
    // Check if auto-approval possible based on autonomy level and risk
    if (this.shouldAutoApprove(risk)) {
      return {
        granted: true,
        status: ApprovalStatus.AUTO_APPROVED,
        reason: 'Auto-approved based on autonomy level and low risk',
        approvedAt: Date.now()
      };
    }

    // Create approval request
    const request: ApprovalRequest = {
      taskId,
      plan,
      risk,
      source,
      timestamp: Date.now()
    };

    this.pendingApprovals.set(taskId, request);

    // Send approval notification based on mode
    await this.notifyApprovalNeeded(request);

    // Wait for approval or timeout
    return new Promise((resolve) => {
      const timeoutId = setTimeout(() => {
        this.pendingApprovals.delete(taskId);
        this.approvalCallbacks.delete(taskId);
        resolve({
          granted: false,
          status: ApprovalStatus.TIMEOUT,
          reason: 'Approval request timed out'
        });
      }, this.timeout);

      this.approvalCallbacks.set(taskId, (result) => {
        clearTimeout(timeoutId);
        this.pendingApprovals.delete(taskId);
        this.approvalCallbacks.delete(taskId);
        resolve(result);
      });
    });
  }

  async approve(taskId: string, approvedBy: string = 'user'): Promise<boolean> {
    const callback = this.approvalCallbacks.get(taskId);
    if (!callback) {
      return false;
    }

    callback({
      granted: true,
      status: ApprovalStatus.APPROVED,
      approvedBy,
      approvedAt: Date.now()
    });

    return true;
  }

  async reject(taskId: string, reason: string = 'User rejected'): Promise<boolean> {
    const callback = this.approvalCallbacks.get(taskId);
    if (!callback) {
      return false;
    }

    callback({
      granted: false,
      status: ApprovalStatus.REJECTED,
      reason
    });

    return true;
  }

  private shouldAutoApprove(risk: RiskAssessment): boolean {
    // Fully autonomous: auto-approve low and medium risk
    if (this.autonomy === 'full') {
      return risk.level === 'low' || risk.level === 'medium';
    }

    // Semi-autonomous: auto-approve only low risk
    if (this.autonomy === 'semi') {
      return risk.level === 'low';
    }

    // Interactive: never auto-approve
    return false;
  }

  private async notifyApprovalNeeded(request: ApprovalRequest): Promise<void> {
    // In web mode, we'd typically emit an event for UI to show modal
    if (this.mode === 'web') {
      this.emitWebNotification(request);
    }

    // In API mode, we'd log and wait for API call
    if (this.mode === 'api') {
      console.log(`[Approval Required] Task ${request.taskId}: ${request.plan.description}`);
      console.log(`Risk: ${request.risk.level} - ${request.risk.reason}`);
    }

    // In background mode, send notification (email, Slack, etc.)
    if (this.mode === 'background') {
      await this.sendBackgroundNotification(request);
    }
  }

  private emitWebNotification(request: ApprovalRequest): void {
    // Emit custom event for UI to catch
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('agent-approval-needed', {
        detail: {
          taskId: request.taskId,
          description: request.plan.description,
          risk: request.risk,
          steps: request.plan.steps.length
        }
      }));
    }
  }

  private async sendBackgroundNotification(request: ApprovalRequest): Promise<void> {
    // In production, send to notification service (email, Slack, etc.)
    // For now, just log
    console.log(`[Background Approval Needed]`);
    console.log(`Task: ${request.taskId}`);
    console.log(`Description: ${request.plan.description}`);
    console.log(`Risk: ${request.risk.level}`);
    console.log(`Steps: ${request.plan.steps.length}`);
  }

  getPendingApprovals(): ApprovalRequest[] {
    return Array.from(this.pendingApprovals.values());
  }

  hasPendingApproval(taskId: string): boolean {
    return this.pendingApprovals.has(taskId);
  }
}
