import inquirer from 'inquirer';
import { ProjectConfig } from './types';
import { validateProjectName } from './utils';

/**
 * 收集项目配置信息
 */
export async function collectProjectConfig(projectName?: string): Promise<ProjectConfig> {
  const questions: inquirer.QuestionCollection = [];

  // 如果未提供项目名称，询问
  if (!projectName) {
    questions.push({
      type: 'input',
      name: 'projectName',
      message: '请输入项目名称:',
      default: 'my-angular-app',
      validate: (input: string) => {
        const result = validateProjectName(input);
        return result.valid || result.message || false;
      }
    });
  }

  // 其他配置选项
  questions.push(
    {
      type: 'confirm',
      name: 'strictMode',
      message: '是否启用 TypeScript 严格模式?',
      default: true
    },
    {
      type: 'list',
      name: 'stylePreprocessor',
      message: '选择 CSS 预处理器:',
      choices: [
        { name: 'SCSS (推荐)', value: 'scss' },
        { name: 'CSS', value: 'css' },
        { name: 'Less', value: 'less' }
      ],
      default: 'scss'
    },
    {
      type: 'confirm',
      name: 'routing',
      message: '是否启用路由?',
      default: true
    },
    {
      type: 'confirm',
      name: 'unitTesting',
      message: '是否启用单元测试?',
      default: true
    },
    {
      type: 'confirm',
      name: 'e2eTesting',
      message: '是否启用 E2E 测试?',
      default: false
    },
    {
      type: 'list',
      name: 'linter',
      message: '选择代码规范工具:',
      choices: [
        { name: 'ESLint (推荐)', value: 'eslint' },
        { name: '不使用', value: 'none' }
      ],
      default: 'eslint'
    },
    {
      type: 'list',
      name: 'packageManager',
      message: '选择包管理器:',
      choices: [
        { name: 'npm', value: 'npm' },
        { name: 'yarn', value: 'yarn' },
        { name: 'pnpm', value: 'pnpm' }
      ],
      default: 'npm'
    }
  );

  const answers = await inquirer.prompt(questions);

  return {
    projectName: projectName || answers.projectName,
    strictMode: answers.strictMode,
    stylePreprocessor: answers.stylePreprocessor,
    routing: answers.routing,
    unitTesting: answers.unitTesting,
    e2eTesting: answers.e2eTesting,
    linter: answers.linter,
    packageManager: answers.packageManager
  };
}

