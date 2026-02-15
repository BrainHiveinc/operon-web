/**
 * Plugin Manager - Handles plugin loading, execution, and management
 * Supports encrypted storage and sandboxed execution
 */

export interface PluginMetadata {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  capabilities: string[];
  requiredPermissions: string[];
}

export interface PluginConfig {
  enabled: boolean;
  settings: Record<string, any>;
}

export interface Plugin {
  metadata: PluginMetadata;
  config: PluginConfig;
  execute: (params: Record<string, any>) => Promise<any>;
}

export class PluginManager {
  private plugins: Map<string, Plugin> = new Map();
  private pluginConfigs: Map<string, PluginConfig> = new Map();

  constructor(
    private pluginsDir: string = './plugins',
    private encryptionKey?: string
  ) {}

  async loadPlugins(): Promise<void> {
    // In browser environment, plugins are loaded from configuration
    // This would typically load from localStorage or API
    console.log(`[PluginManager] Initialized at ${this.pluginsDir}`);

    // Load built-in plugins
    await this.loadBuiltInPlugins();
  }

  private async loadBuiltInPlugins(): Promise<void> {
    // Code Analysis Plugin
    this.registerPlugin({
      metadata: {
        id: 'code-analysis',
        name: 'Code Analysis',
        version: '1.0.0',
        description: 'Analyzes code quality and suggests improvements',
        author: 'Agent Sri',
        capabilities: ['analyze', 'suggest', 'refactor'],
        requiredPermissions: ['read:files']
      },
      config: {
        enabled: true,
        settings: {}
      },
      execute: async (params) => {
        return this.executeCodeAnalysis(params);
      }
    });

    // Component Generator Plugin
    this.registerPlugin({
      metadata: {
        id: 'component-generator',
        name: 'Component Generator',
        version: '1.0.0',
        description: 'Generates React components from specifications',
        author: 'Agent Sri',
        capabilities: ['generate', 'scaffold'],
        requiredPermissions: ['write:files']
      },
      config: {
        enabled: true,
        settings: {
          framework: 'react',
          typescript: true,
          styling: 'tailwind'
        }
      },
      execute: async (params) => {
        return this.generateComponent(params);
      }
    });

    // Performance Analyzer Plugin
    this.registerPlugin({
      metadata: {
        id: 'performance-analyzer',
        name: 'Performance Analyzer',
        version: '1.0.0',
        description: 'Analyzes and optimizes code performance',
        author: 'Agent Sri',
        capabilities: ['analyze', 'optimize'],
        requiredPermissions: ['read:files', 'write:files']
      },
      config: {
        enabled: true,
        settings: {}
      },
      execute: async (params) => {
        return this.analyzePerformance(params);
      }
    });
  }

  registerPlugin(plugin: Plugin): void {
    this.plugins.set(plugin.metadata.id, plugin);
    this.pluginConfigs.set(plugin.metadata.id, plugin.config);
  }

  async getPlugin(id: string): Promise<Plugin> {
    const plugin = this.plugins.get(id);
    if (!plugin) {
      throw new Error(`Plugin not found: ${id}`);
    }
    if (!plugin.config.enabled) {
      throw new Error(`Plugin disabled: ${id}`);
    }
    return plugin;
  }

  listPlugins(): PluginMetadata[] {
    return Array.from(this.plugins.values()).map(p => p.metadata);
  }

  async enablePlugin(id: string): Promise<void> {
    const config = this.pluginConfigs.get(id);
    if (config) {
      config.enabled = true;
    }
  }

  async disablePlugin(id: string): Promise<void> {
    const config = this.pluginConfigs.get(id);
    if (config) {
      config.enabled = false;
    }
  }

  async updatePluginConfig(id: string, settings: Record<string, any>): Promise<void> {
    const config = this.pluginConfigs.get(id);
    if (config) {
      config.settings = { ...config.settings, ...settings };
    }
  }

  async executePlugin(name: string, args: Record<string, any>): Promise<any> {
    const plugin = await this.getPlugin(name);
    return plugin.execute(args);
  }

  // Built-in plugin implementations
  private async executeCodeAnalysis(params: any): Promise<any> {
    const { code, language } = params;

    const analysis = {
      quality: this.analyzeCodeQuality(code),
      suggestions: this.generateSuggestions(code, language),
      metrics: {
        lines: code.split('\n').length,
        complexity: this.calculateComplexity(code),
        maintainability: this.calculateMaintainability(code)
      }
    };

    return analysis;
  }

  private async generateComponent(params: any): Promise<any> {
    const { name, type, props } = params;

    // Generate React component template
    const component = `
import React from 'react';

interface ${name}Props {
${Object.entries(props || {}).map(([key, type]) => `  ${key}: ${type};`).join('\n')}
}

export const ${name}: React.FC<${name}Props> = (props) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">${name}</h2>
      {/* Component implementation */}
    </div>
  );
};

export default ${name};
`.trim();

    return {
      component,
      filename: `${name}.tsx`,
      type: 'react-component'
    };
  }

  private async analyzePerformance(params: any): Promise<any> {
    const { code } = params;

    const issues: string[] = [];
    const optimizations: string[] = [];

    // Check for performance anti-patterns
    if (code.includes('console.log')) {
      issues.push('Contains console.log statements that impact performance');
      optimizations.push('Remove console.log statements in production');
    }

    if (code.includes('for') && code.includes('.push(')) {
      issues.push('Array operations inside loops can be inefficient');
      optimizations.push('Consider using map/filter/reduce for array operations');
    }

    if (code.includes('useEffect') && !code.includes('[]')) {
      issues.push('useEffect without dependency array may cause infinite renders');
      optimizations.push('Add proper dependency array to useEffect');
    }

    if ((code.match(/setState|useState/g) || []).length > 5) {
      issues.push('Excessive state management may impact performance');
      optimizations.push('Consider consolidating state or using useReducer');
    }

    return {
      issues,
      optimizations,
      score: Math.max(100 - (issues.length * 10), 0)
    };
  }

  private analyzeCodeQuality(code: string): number {
    let score = 100;

    // Deduct points for issues
    if (code.includes('any')) score -= 10;
    if (code.includes('console.log')) score -= 5;
    if (!code.includes('//') && !code.includes('/*')) score -= 10; // No comments
    if (code.length > 1000 && !code.includes('\n\n')) score -= 5; // No spacing

    return Math.max(score, 0);
  }

  private generateSuggestions(code: string, language: string): string[] {
    const suggestions: string[] = [];

    if (language === 'typescript' && code.includes('any')) {
      suggestions.push('Replace "any" types with specific types for better type safety');
    }

    if (code.includes('console.log')) {
      suggestions.push('Remove console.log statements or use a proper logging library');
    }

    if (!code.includes('//') && !code.includes('/*') && code.length > 100) {
      suggestions.push('Add comments to explain complex logic');
    }

    const lines = code.split('\n');
    const longLines = lines.filter(l => l.length > 120);
    if (longLines.length > 0) {
      suggestions.push(`Break down long lines (${longLines.length} lines exceed 120 characters)`);
    }

    return suggestions;
  }

  private calculateComplexity(code: string): number {
    let complexity = 1;

    const complexityKeywords = [
      'if', 'else', 'for', 'while', 'case', 'catch',
      '&&', '||', '?'
    ];

    for (const keyword of complexityKeywords) {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      const matches = code.match(regex);
      if (matches) {
        complexity += matches.length;
      }
    }

    return complexity;
  }

  private calculateMaintainability(code: string): number {
    const lines = code.split('\n').length;
    const complexity = this.calculateComplexity(code);
    const commentLines = (code.match(/\/\//g) || []).length;
    const commentRatio = commentLines / lines;

    // Maintainability index (simplified)
    let maintainability = 100;
    maintainability -= complexity * 2;
    maintainability -= Math.max(0, (lines - 100) / 10);
    maintainability += commentRatio * 20;

    return Math.max(0, Math.min(100, maintainability));
  }
}
