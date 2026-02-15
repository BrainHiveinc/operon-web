/**
 * Vector Memory System
 * Persistent learning and context retention
 * No external dependencies - uses TF-IDF for similarity
 */

export interface MemoryConfig {
  collectionName: string;
  persistKey: string;
}

export interface TaskMemory {
  id: string;
  instruction: string;
  planSummary: string;
  success: boolean;
  timestamp: number;
  resultSummary: string;
  embedding: number[];
}

export interface Pattern {
  type: string;
  code?: string;
  description: string;
  successRate: number;
  usageCount: number;
}

export class VectorMemory {
  private config: MemoryConfig;
  private memories: TaskMemory[] = [];
  private patterns: Pattern[] = [];
  private vocabulary: Map<string, number> = new Map();
  private idfScores: Map<string, number> = new Map();

  constructor(config: MemoryConfig) {
    this.config = config;
  }

  async initialize(): Promise<void> {
    // Load from localStorage if available
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(this.config.persistKey);
      if (stored) {
        const data = JSON.parse(stored);
        this.memories = data.memories || [];
        this.patterns = data.patterns || [];
        this.vocabulary = new Map(data.vocabulary || []);
        this.idfScores = new Map(data.idfScores || []);
      }
    }

    console.log(`[Memory] Initialized with ${this.memories.length} memories`);
  }

  async storeTaskOutcome(
    taskId: string,
    instruction: string,
    plan: any,
    result: any,
    success: boolean
  ): Promise<void> {
    const embedding = this.generateEmbedding(instruction);

    const memory: TaskMemory = {
      id: taskId,
      instruction,
      planSummary: plan.description,
      success,
      timestamp: Date.now(),
      resultSummary: result.summary,
      embedding
    };

    this.memories.push(memory);

    // Update patterns if successful
    if (success) {
      await this.updatePatterns(plan, result);
    }

    // Limit memory size
    if (this.memories.length > 1000) {
      this.memories = this.memories.slice(-1000);
    }

    await this.persist();
  }

  async findSimilarTasks(instruction: string, k: number = 3): Promise<TaskMemory[]> {
    if (this.memories.length === 0) {
      return [];
    }

    const queryEmbedding = this.generateEmbedding(instruction);

    // Calculate cosine similarity with all memories
    const similarities = this.memories.map(memory => ({
      memory,
      similarity: this.cosineSimilarity(queryEmbedding, memory.embedding)
    }));

    // Sort by similarity and return top k
    similarities.sort((a, b) => b.similarity - a.similarity);

    return similarities.slice(0, k).map(s => s.memory);
  }

  async getPatterns(): Promise<Pattern[]> {
    return this.patterns;
  }

  async getComponentPatterns(): Promise<Pattern[]> {
    return this.patterns.filter(p => p.type === 'component');
  }

  async analyzePatterns(query: string): Promise<Pattern[]> {
    const queryWords = this.tokenize(query.toLowerCase());

    return this.patterns.filter(pattern => {
      const patternWords = this.tokenize(pattern.description.toLowerCase());
      return queryWords.some(word => patternWords.includes(word));
    });
  }

  private async updatePatterns(plan: any, result: any): Promise<void> {
    // Extract patterns from successful executions
    plan.steps.forEach((step: any) => {
      if (step.actionType === 'file_write' || step.actionType === 'generate_component') {
        const code = step.params.content || step.result;
        if (code) {
          this.learnPattern({
            type: step.actionType,
            code,
            description: step.description,
            success: true
          });
        }
      }
    });
  }

  private learnPattern(data: { type: string; code: string; description: string; success: boolean }): void {
    // Find existing pattern
    const existing = this.patterns.find(
      p => p.type === data.type && p.description === data.description
    );

    if (existing) {
      // Update success rate
      const totalUses = existing.usageCount + 1;
      const totalSuccess = (existing.successRate * existing.usageCount) + (data.success ? 1 : 0);
      existing.successRate = totalSuccess / totalUses;
      existing.usageCount = totalUses;
    } else {
      // Add new pattern
      this.patterns.push({
        type: data.type,
        code: data.code,
        description: data.description,
        successRate: data.success ? 1.0 : 0.0,
        usageCount: 1
      });
    }

    // Keep only successful patterns
    this.patterns = this.patterns.filter(p => p.successRate > 0.5);

    // Limit pattern count
    if (this.patterns.length > 100) {
      this.patterns.sort((a, b) => b.successRate - a.successRate);
      this.patterns = this.patterns.slice(0, 100);
    }
  }

  private generateEmbedding(text: string): number[] {
    // Simple TF-IDF based embedding
    const words = this.tokenize(text.toLowerCase());

    // Update vocabulary
    words.forEach(word => {
      if (!this.vocabulary.has(word)) {
        this.vocabulary.set(word, this.vocabulary.size);
      }
    });

    // Calculate IDF if needed
    if (this.idfScores.size === 0 && this.memories.length > 0) {
      this.calculateIDF();
    }

    // Create embedding vector
    const embedding = new Array(Math.max(100, this.vocabulary.size)).fill(0);

    words.forEach(word => {
      const idx = this.vocabulary.get(word);
      if (idx !== undefined && idx < embedding.length) {
        const tf = words.filter(w => w === word).length / words.length;
        const idf = this.idfScores.get(word) || 1;
        embedding[idx] = tf * idf;
      }
    });

    return this.normalize(embedding);
  }

  private calculateIDF(): void {
    const docCount = this.memories.length;

    this.vocabulary.forEach((_, word) => {
      const docsWithWord = this.memories.filter(m =>
        this.tokenize(m.instruction.toLowerCase()).includes(word)
      ).length;

      const idf = Math.log(docCount / (docsWithWord + 1));
      this.idfScores.set(word, idf);
    });
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    const minLength = Math.min(a.length, b.length);

    for (let i = 0; i < minLength; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }

    if (normA === 0 || normB === 0) return 0;

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  private normalize(vector: number[]): number[] {
    const norm = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
    return norm === 0 ? vector : vector.map(val => val / norm);
  }

  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2);
  }

  async persist(): Promise<void> {
    if (typeof window !== 'undefined') {
      const data = {
        memories: this.memories,
        patterns: this.patterns,
        vocabulary: Array.from(this.vocabulary.entries()),
        idfScores: Array.from(this.idfScores.entries())
      };

      localStorage.setItem(this.config.persistKey, JSON.stringify(data));
    }
  }

  getStats() {
    return {
      totalMemories: this.memories.length,
      successfulTasks: this.memories.filter(m => m.success).length,
      patternsLearned: this.patterns.length,
      vocabularySize: this.vocabulary.size
    };
  }

  async analyzePatterns(query: string): Promise<any> {
    // Analyze patterns related to query
    const relevantPatterns = this.patterns.filter(p =>
      p.description.toLowerCase().includes(query.toLowerCase())
    );

    return {
      query,
      patterns: relevantPatterns,
      totalPatterns: this.patterns.length,
      avgSuccessRate: relevantPatterns.length > 0
        ? relevantPatterns.reduce((sum, p) => sum + p.successRate, 0) / relevantPatterns.length
        : 0
    };
  }

  async getComponentPatterns(): Promise<any[]> {
    // Return patterns specifically for component generation
    return this.patterns.filter(p => p.type === 'component');
  }
}
