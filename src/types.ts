/**
 * 项目配置选项接口
 */
export interface ProjectConfig {
  projectName: string;
  strictMode: boolean;
  stylePreprocessor: 'css' | 'scss' | 'less';
  routing: boolean;
  unitTesting: boolean;
  e2eTesting: boolean;
  linter: 'eslint' | 'none';
  packageManager: 'npm' | 'yarn' | 'pnpm';
}

/**
 * CLI 选项接口
 */
export interface CliOptions {
  template?: string;
  skipInstall?: boolean;
  skipGit?: boolean;
}

/**
 * 模板文件配置
 */
export interface TemplateFile {
  path: string;
  content: string;
}

