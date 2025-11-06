#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { collectProjectConfig } from './prompts';
import { ProjectGenerator } from './generator';
import {
  validateProjectName,
  isDirectoryEmpty,
  getProjectRoot,
  logError,
  logWarning,
  printSuccessMessage,
} from './utils';
import * as fs from 'fs-extra';

const packageJson = require('../package.json');

const program = new Command();

async function main() {
  console.log();
  console.log(chalk.cyan.bold('╔══════════════════════════════════════╗'));
  console.log(chalk.cyan.bold('║   Create-DjAngular-App CLI Tool     ║'));
  console.log(chalk.cyan.bold('╚══════════════════════════════════════╝'));
  console.log();

  program
    .name('create-djangular-app')
    .description('创建一个干净的 Angular 项目脚手架')
    .version(packageJson.version)
    .argument('[project-name]', '项目名称')
    .option('--skip-install', '跳过依赖安装')
    .option('--skip-git', '跳过 Git 初始化')
    .option('-t, --template <template>', '使用指定模板（暂未实现）')
    .action(async (projectName: string | undefined, options) => {
      try {
        // 收集项目配置
        console.log(chalk.blue('📋 请回答以下问题以配置你的项目:\n'));
        const config = await collectProjectConfig(projectName);

        // 验证项目名称
        const validation = validateProjectName(config.projectName);
        if (!validation.valid) {
          logError(validation.message || '项目名称无效');
          process.exit(1);
        }

        // 检查目录是否存在
        const projectRoot = getProjectRoot(config.projectName);
        const dirExists = await fs.pathExists(projectRoot);

        if (dirExists) {
          const isEmpty = await isDirectoryEmpty(projectRoot);
          if (!isEmpty) {
            logError(`目录 "${config.projectName}" 已存在且不为空！`);
            process.exit(1);
          }
        }

        console.log();
        console.log(chalk.cyan('🚀 开始创建项目...\n'));

        // 生成项目
        const generator = new ProjectGenerator(config);
        await generator.generate();

        console.log();

        // 安装依赖
        if (!options.skipInstall) {
          const ora = (await import('ora')).default;
          const spinner = ora('安装依赖包...').start();

          try {
            const { exec } = require('child_process');
            const { promisify } = require('util');
            const execAsync = promisify(exec);

            const installCmd =
              config.packageManager === 'npm'
                ? 'npm install'
                : config.packageManager === 'yarn'
                ? 'yarn'
                : 'pnpm install';

            await execAsync(installCmd, { cwd: projectRoot });
            spinner.succeed('依赖安装完成!');
          } catch (error) {
            spinner.fail('依赖安装失败');
            logWarning('你可以稍后手动运行安装命令');
          }
        } else {
          logWarning('已跳过依赖安装');
        }

        // 打印成功消息
        console.log();
        printSuccessMessage(config.projectName, config.packageManager);
      } catch (error) {
        console.log();
        logError('项目创建失败: ' + (error instanceof Error ? error.message : String(error)));
        process.exit(1);
      }
    });

  program.parse(process.argv);

  // 如果没有提供任何参数，显示帮助信息
  if (process.argv.length === 2) {
    program.help();
  }
}

main().catch((error) => {
  logError('发生意外错误: ' + (error instanceof Error ? error.message : String(error)));
  process.exit(1);
});

