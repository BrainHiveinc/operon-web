// Agent Sri API Service - Vercel Serverless + Groq Integration

// API endpoint - works both locally (Vite proxy) and in production (Vercel)
const API_URL = '/api/execute-mission';

export interface MissionRequest {
  description: string;
  category?: string;
}

export type MissionReport = {
  title: string;
  summary: string;
  sections: Array<{
    title: string;
    content: string;
  }>;
  metrics: {
    sourcesAnalyzed: number;
    dataPoints: number;
    confidence: number;
  };
};

export interface MissionResponse {
  success: boolean;
  mission: {
    description: string;
    result: MissionReport;
    status: string;
    endTime: number;
  };
}

export class AgentApiService {
  static async executeMission(mission: MissionRequest): Promise<MissionResponse> {
    try {
      console.log('[Agent Sri] Executing mission:', mission.description);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: mission.description
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('[Agent Sri] ✅ Mission completed');

      return data;

    } catch (error) {
      console.error('[Agent Sri] Error:', error);
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Failed to execute mission. Please try again.'
      );
    }
  }

  static async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: 'health check' })
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}
