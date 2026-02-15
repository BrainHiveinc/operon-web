/**
 * File System Scanner - Analyzes project structure and files
 * Works in browser environment with virtual file system
 */

export interface FileInfo {
  path: string;
  name: string;
  type: 'file' | 'directory';
  size?: number;
  extension?: string;
  language?: string;
  lastModified?: number;
}

export interface FileTree {
  name: string;
  type: 'file' | 'directory';
  path: string;
  children?: FileTree[];
}

export interface CodeAnalysis {
  path: string;
  language: string;
  lines: number;
  complexity: number;
  imports: string[];
  exports: string[];
  functions: string[];
  classes: string[];
  issues: string[];
}

export class FileSystemScanner {
  private files: Map<string, FileInfo> = new Map();
  private fileContents: Map<string, string> = new Map();
  private analyses: Map<string, CodeAnalysis> = new Map();

  constructor(private rootPath: string = '/') {}

  async scan(): Promise<void> {
    // In browser environment, we maintain a virtual file system
    // This would be populated by user uploads or API calls
    console.log(`[FileSystemScanner] Initialized for path: ${this.rootPath}`);
  }

  async addFile(path: string, content: string): Promise<void> {
    const info = this.extractFileInfo(path);
    this.files.set(path, info);
    this.fileContents.set(path, content);

    // Auto-analyze code files
    if (this.isCodeFile(path)) {
      const analysis = await this.analyzeCode(path);
      this.analyses.set(path, analysis);
    }
  }

  async readFile(path: string): Promise<string> {
    const content = this.fileContents.get(path);
    if (!content) {
      throw new Error(`File not found: ${path}`);
    }
    return content;
  }

  async writeFile(path: string, content: string): Promise<void> {
    await this.addFile(path, content);
  }

  async deleteFile(path: string): Promise<void> {
    this.files.delete(path);
    this.fileContents.delete(path);
    this.analyses.delete(path);
  }

  async analyzeCode(path: string): Promise<CodeAnalysis> {
    const content = await this.readFile(path);
    const info = this.files.get(path);

    if (!info) {
      throw new Error(`File not found: ${path}`);
    }

    const language = this.detectLanguage(path);
    const lines = content.split('\n').length;

    // Basic code analysis
    const analysis: CodeAnalysis = {
      path,
      language,
      lines,
      complexity: this.calculateComplexity(content),
      imports: this.extractImports(content, language),
      exports: this.extractExports(content, language),
      functions: this.extractFunctions(content, language),
      classes: this.extractClasses(content, language),
      issues: this.detectIssues(content, language)
    };

    this.analyses.set(path, analysis);
    return analysis;
  }

  getFileList(): FileInfo[] {
    return Array.from(this.files.values());
  }

  getTree(): FileTree {
    const root: FileTree = {
      name: 'root',
      type: 'directory',
      path: this.rootPath,
      children: []
    };

    // Build tree from flat file list
    for (const [path, info] of this.files) {
      this.addToTree(root, path, info);
    }

    return root;
  }

  async analyzeFile(path: string): Promise<CodeAnalysis> {
    return this.analyzeCode(path);
  }

  detectLanguage(): string {
    return this.detectPrimaryLanguage();
  }

  detectPrimaryLanguage(): string {
    const languageCounts = new Map<string, number>();

    for (const file of this.files.values()) {
      if (file.language) {
        languageCounts.set(
          file.language,
          (languageCounts.get(file.language) || 0) + 1
        );
      }
    }

    let maxCount = 0;
    let primaryLanguage = 'unknown';

    for (const [lang, count] of languageCounts) {
      if (count > maxCount) {
        maxCount = count;
        primaryLanguage = lang;
      }
    }

    return primaryLanguage;
  }

  detectFramework(): string {
    const files = Array.from(this.files.keys());

    // Check for common framework indicators
    if (files.some(f => f.includes('package.json'))) {
      const packageJson = this.fileContents.get('package.json');
      if (packageJson) {
        if (packageJson.includes('"react"')) return 'React';
        if (packageJson.includes('"vue"')) return 'Vue';
        if (packageJson.includes('"angular"')) return 'Angular';
        if (packageJson.includes('"next"')) return 'Next.js';
      }
    }

    if (files.some(f => f.includes('vite.config'))) return 'Vite';
    if (files.some(f => f.includes('webpack.config'))) return 'Webpack';

    return 'unknown';
  }

  private extractFileInfo(path: string): FileInfo {
    const parts = path.split('/');
    const name = parts[parts.length - 1];
    const extension = name.includes('.') ? name.split('.').pop() : undefined;
    const language = extension ? this.detectLanguage(path) : undefined;

    return {
      path,
      name,
      type: 'file',
      extension,
      language,
      lastModified: Date.now()
    };
  }

  private detectLanguage(path: string): string {
    const ext = path.split('.').pop()?.toLowerCase();

    const languageMap: Record<string, string> = {
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'py': 'python',
      'java': 'java',
      'cpp': 'cpp',
      'c': 'c',
      'go': 'go',
      'rs': 'rust',
      'rb': 'ruby',
      'php': 'php',
      'swift': 'swift',
      'kt': 'kotlin',
      'html': 'html',
      'css': 'css',
      'scss': 'scss',
      'json': 'json',
      'md': 'markdown'
    };

    return languageMap[ext || ''] || 'unknown';
  }

  private isCodeFile(path: string): boolean {
    const codeExtensions = [
      'js', 'jsx', 'ts', 'tsx', 'py', 'java', 'cpp', 'c',
      'go', 'rs', 'rb', 'php', 'swift', 'kt'
    ];
    const ext = path.split('.').pop()?.toLowerCase();
    return codeExtensions.includes(ext || '');
  }

  private calculateComplexity(content: string): number {
    // Simple cyclomatic complexity approximation
    let complexity = 1;

    const complexityKeywords = [
      'if', 'else', 'for', 'while', 'case', 'catch',
      '&&', '||', '?'
    ];

    for (const keyword of complexityKeywords) {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      const matches = content.match(regex);
      if (matches) {
        complexity += matches.length;
      }
    }

    return complexity;
  }

  private extractImports(content: string, language: string): string[] {
    const imports: string[] = [];

    if (language === 'javascript' || language === 'typescript') {
      // import { x } from 'y'
      const importRegex = /import\s+.*?\s+from\s+['"](.+?)['"]/g;
      let match;
      while ((match = importRegex.exec(content)) !== null) {
        imports.push(match[1]);
      }

      // import 'x'
      const simpleImportRegex = /import\s+['"](.+?)['"]/g;
      while ((match = simpleImportRegex.exec(content)) !== null) {
        if (!imports.includes(match[1])) {
          imports.push(match[1]);
        }
      }
    }

    if (language === 'python') {
      // import x or from x import y
      const pythonImportRegex = /(?:from\s+(\S+)\s+)?import\s+(.+)/g;
      let match;
      while ((match = pythonImportRegex.exec(content)) !== null) {
        imports.push(match[1] || match[2].split(',')[0].trim());
      }
    }

    return imports;
  }

  private extractExports(content: string, language: string): string[] {
    const exports: string[] = [];

    if (language === 'javascript' || language === 'typescript') {
      // export { x }
      const namedExportRegex = /export\s+\{\s*([^}]+)\s*\}/g;
      let match;
      while ((match = namedExportRegex.exec(content)) !== null) {
        const names = match[1].split(',').map(n => n.trim());
        exports.push(...names);
      }

      // export function/class/const name
      const directExportRegex = /export\s+(?:async\s+)?(?:function|class|const|let|var)\s+(\w+)/g;
      while ((match = directExportRegex.exec(content)) !== null) {
        exports.push(match[1]);
      }

      // export default
      if (content.includes('export default')) {
        exports.push('default');
      }
    }

    return exports;
  }

  private extractFunctions(content: string, language: string): string[] {
    const functions: string[] = [];

    if (language === 'javascript' || language === 'typescript') {
      // function name() or async function name()
      const funcRegex = /(?:async\s+)?function\s+(\w+)/g;
      let match;
      while ((match = funcRegex.exec(content)) !== null) {
        functions.push(match[1]);
      }

      // const name = () => or const name = function()
      const arrowFuncRegex = /const\s+(\w+)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>/g;
      while ((match = arrowFuncRegex.exec(content)) !== null) {
        functions.push(match[1]);
      }
    }

    if (language === 'python') {
      // def name():
      const pythonFuncRegex = /def\s+(\w+)\s*\(/g;
      let match;
      while ((match = pythonFuncRegex.exec(content)) !== null) {
        functions.push(match[1]);
      }
    }

    return functions;
  }

  private extractClasses(content: string, language: string): string[] {
    const classes: string[] = [];

    if (language === 'javascript' || language === 'typescript') {
      // class Name
      const classRegex = /class\s+(\w+)/g;
      let match;
      while ((match = classRegex.exec(content)) !== null) {
        classes.push(match[1]);
      }
    }

    if (language === 'python') {
      // class Name:
      const pythonClassRegex = /class\s+(\w+)\s*[:(]/g;
      let match;
      while ((match = pythonClassRegex.exec(content)) !== null) {
        classes.push(match[1]);
      }
    }

    return classes;
  }

  private detectIssues(content: string, language: string): string[] {
    const issues: string[] = [];

    // Check for common issues
    if (content.includes('console.log') && language === 'javascript') {
      issues.push('Contains console.log statements');
    }

    if (content.includes('TODO') || content.includes('FIXME')) {
      issues.push('Contains TODO/FIXME comments');
    }

    if (content.includes('any') && language === 'typescript') {
      const anyCount = (content.match(/:\s*any/g) || []).length;
      if (anyCount > 3) {
        issues.push(`Excessive use of 'any' type (${anyCount} occurrences)`);
      }
    }

    // Check for long functions (>50 lines)
    const functions = this.extractFunctions(content, language);
    if (functions.length > 0) {
      const avgLinesPerFunc = content.split('\n').length / functions.length;
      if (avgLinesPerFunc > 50) {
        issues.push('Contains long functions (consider refactoring)');
      }
    }

    return issues;
  }

  private addToTree(tree: FileTree, path: string, info: FileInfo): void {
    const parts = path.split('/').filter(p => p);
    let current = tree;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length - 1;

      if (!current.children) {
        current.children = [];
      }

      let child = current.children.find(c => c.name === part);

      if (!child) {
        child = {
          name: part,
          type: isLast ? info.type : 'directory',
          path: parts.slice(0, i + 1).join('/'),
          children: isLast ? undefined : []
        };
        current.children.push(child);
      }

      current = child;
    }
  }
}
