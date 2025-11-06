import * as fs from 'fs-extra';
import * as path from 'path';
import validateNpmPackageName from 'validate-npm-package-name';
import chalk from 'chalk';

/**
 * 验证项目名称是否合法
 */
export function validateProjectName(name: string): { valid: boolean; message?: string } {
  const validation = validateNpmPackageName(name);
  
  if (!validation.validForNewPackages) {
    const errors = [...(validation.errors || []), ...(validation.warnings || [])];
    return {
      valid: false,
      message: `项目名称不合法: ${errors.join(', ')}`
    };
  }
  
  return { valid: true };
}

/**
 * 检查目录是否存在且非空
 */
export async function isDirectoryEmpty(dir: string): Promise<boolean> {
  try {
    const files = await fs.readdir(dir);
    return files.length === 0;
  } catch (error) {
    // 目录不存在，返回true
    return true;
  }
}

/**
 * 确保目录存在
 */
export async function ensureDir(dir: string): Promise<void> {
  await fs.ensureDir(dir);
}

/**
 * 获取项目根目录
 */
export function getProjectRoot(projectName: string): string {
  return path.join(process.cwd(), projectName);
}

/**
 * 打印成功消息
 */
export function logSuccess(message: string): void {
  console.log(chalk.green('✔') + ' ' + message);
}

/**
 * 打印错误消息
 */
export function logError(message: string): void {
  console.log(chalk.red('✖') + ' ' + message);
}

/**
 * 打印警告消息
 */
export function logWarning(message: string): void {
  console.log(chalk.yellow('⚠') + ' ' + message);
}

/**
 * 打印信息消息
 */
export function logInfo(message: string): void {
  console.log(chalk.blue('ℹ') + ' ' + message);
}

/**
 * 打印成功创建的提示信息
 */
export function printSuccessMessage(projectName: string, packageManager: string): void {
  console.log();
  console.log(chalk.green('✨ 项目创建成功!'));
  console.log();
  console.log('开始使用你的项目:');
  console.log();
  console.log(chalk.cyan(`  cd ${projectName}`));
  
  if (packageManager === 'npm') {
    console.log(chalk.cyan('  npm install'));
    console.log(chalk.cyan('  npm start'));
  } else if (packageManager === 'yarn') {
    console.log(chalk.cyan('  yarn'));
    console.log(chalk.cyan('  yarn start'));
  } else {
    console.log(chalk.cyan('  pnpm install'));
    console.log(chalk.cyan('  pnpm start'));
  }
  
  console.log();
  console.log('快乐编码! 🎉');
  console.log();
}

/**
 * 替换模板变量
 */
export function replaceTemplateVariables(
  content: string,
  variables: Record<string, string>
): string {
  let result = content;
  
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g');
    result = result.replace(regex, value);
  });
  
  return result;
}

