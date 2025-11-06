import * as fs from 'fs-extra';
import * as path from 'path';
import ora from 'ora';
import { ProjectConfig } from './types';
import { ensureDir, logSuccess, logError } from './utils';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * 项目生成器类 - 模板拷贝方式
 */
export class ProjectGenerator {
  private config: ProjectConfig;
  private projectRoot: string;
  private templateRoot: string;

  constructor(config: ProjectConfig) {
    this.config = config;
    this.projectRoot = path.join(process.cwd(), config.projectName);
    this.templateRoot = path.join(__dirname, '../template');
  }

  /**
   * 生成项目
   */
  async generate(): Promise<void> {
    const spinner = ora('正在创建项目...').start();

    try {
      // 1. 创建项目目录
      await ensureDir(this.projectRoot);
      spinner.text = '创建项目目录...';

      // 2. 拷贝模板文件
      await this.copyTemplate();
      spinner.text = '拷贝项目模板...';

      // 3. 根据用户配置调整文件
      await this.adjustByConfig();
      spinner.text = '根据配置调整项目...';

      // 6. 初始化Git
      if (!process.argv.includes('--skip-git')) {
        await this.initGit();
        spinner.text = '初始化Git仓库...';
      }

      spinner.succeed('项目创建成功!');
      logSuccess(`项目已创建在: ${this.projectRoot}`);
    } catch (error) {
      spinner.fail('项目创建失败');
      logError(error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  /**
   * 拷贝模板目录
   */
  private async copyTemplate(): Promise<void> {
    await fs.copy(this.templateRoot, this.projectRoot, {
      // 明确拷贝所有文件，包括 dotfiles
      overwrite: true,
      errorOnExist: false,
      filter: (src) => {
        // 过滤掉 node_modules 等目录，但保留所有配置文件（包括 .gitignore）
        const relativePath = path.relative(this.templateRoot, src);
        
        // 排除特定目录
        if (relativePath.includes('node_modules') || 
            relativePath.includes('.angular') ||
            relativePath.includes('dist') ||
            relativePath.includes('coverage')) {
          return false;
        }
        
        // 包含所有其他文件，特别是 dotfiles
        return true;
      }
    });
  }

  /**
   * 根据用户配置调整项目
   */
  private async adjustByConfig(): Promise<void> {
    // 如果不使用路由，可以移除路由相关代码
    if (!this.config.routing) {
      // 这里可以添加移除路由的逻辑
    }

    // 如果不使用单元测试，移除测试相关文件
    if (!this.config.unitTesting) {
      const testFiles = [
        'karma.conf.js',
        'tsconfig.spec.json'
      ];
      
      for (const file of testFiles) {
        const filePath = path.join(this.projectRoot, file);
        if (await fs.pathExists(filePath)) {
          await fs.remove(filePath);
        }
      }

      // 更新 package.json，移除测试相关依赖
      await this.updatePackageJson();
    }

    // 如果不使用 ESLint，移除配置文件
    if (this.config.linter === 'none') {
      const lintFiles = ['.eslintrc.json'];
      
      for (const file of lintFiles) {
        const filePath = path.join(this.projectRoot, file);
        if (await fs.pathExists(filePath)) {
          await fs.remove(filePath);
        }
      }
    }

    // 根据 CSS 预处理器调整
    if (this.config.stylePreprocessor !== 'scss') {
      // 如果选择 CSS 或 Less，需要转换样式文件
      // 这里简化处理，保持 SCSS
    }
  }

  /**
   * 更新 package.json
   */
  private async updatePackageJson(): Promise<void> {
    const pkgPath = path.join(this.projectRoot, 'package.json');
    const pkg: any = await fs.readJson(pkgPath);

    // 根据配置移除不需要的依赖
    if (!this.config.unitTesting && pkg.devDependencies) {
      const testDeps = [
        '@types/jasmine',
        'jasmine-core',
        'karma',
        'karma-chrome-launcher',
        'karma-coverage',
        'karma-jasmine',
        'karma-jasmine-html-reporter'
      ];

      testDeps.forEach(dep => {
        delete pkg.devDependencies[dep];
      });

      if (pkg.scripts) {
        pkg.scripts.test = 'echo "No tests configured"';
      }
    }

    if (this.config.linter === 'none' && pkg.devDependencies) {
      const lintDeps = [
        '@angular-eslint/builder',
        '@angular-eslint/eslint-plugin',
        '@angular-eslint/eslint-plugin-template',
        '@angular-eslint/schematics',
        '@angular-eslint/template-parser',
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
        'eslint'
      ];

      lintDeps.forEach(dep => {
        delete pkg.devDependencies[dep];
      });

      if (pkg.scripts) {
        pkg.scripts.lint = 'echo "No linter configured"';
      }
    }

    await fs.writeJson(pkgPath, pkg, { spaces: 2 });
  }

  /**
   * 初始化Git仓库
   */
  private async initGit(): Promise<void> {
    try {
      await execAsync('git init', { cwd: this.projectRoot });
      await execAsync('git add -A', { cwd: this.projectRoot });
      await execAsync('git commit -m "Initial commit from create-djangular-app"', {
        cwd: this.projectRoot
      });
    } catch (error) {
      // Git初始化失败不影响项目创建
      console.warn('Git初始化失败，但项目已成功创建');
    }
  }
}
