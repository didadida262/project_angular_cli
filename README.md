# create-djangular-app

> 一个类似 `create-react-app` 的 Angular 项目脚手架工具，快速创建干净、规范的 Angular 项目。

[![npm version](https://img.shields.io/npm/v/create-djangular-app.svg)](https://www.npmjs.com/package/create-djangular-app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ 特性

- 🚀 **一键创建** - 一条命令创建完整的 Angular 项目
- 📦 **开箱即用** - 预配置完善的项目结构和开发环境
- 🎨 **最佳实践** - 遵循 Angular 官方风格指南
- 🛠️ **完善配置** - TypeScript、ESLint、Prettier 全面配置
- 💎 **干净模板** - Core/Shared/Features 清晰的模块划分
- 🎯 **示例页面** - 内置欢迎页面和设置页面
- ⚙️ **灵活配置** - 支持交互式选择项目配置

## 📦 快速开始

### 创建项目

```bash
# 方式1：使用 npx（自动下载，会提示确认）
npx create-djangular-app my-app

# 方式2：使用 npx -y（跳过确认提示）
npx -y create-djangular-app my-app

# 方式3：全局安装后使用（一劳永逸，无提示）
npm install -g create-djangular-app
create-djangular-app my-app
```

### 运行项目

```bash
cd my-app
npm install
npm start
```

打开浏览器访问 `http://localhost:4200/` 🎉

## 🎯 使用方法

### 基本用法

运行命令后，会出现交互式配置界面：

```bash
npx create-djangular-app my-angular-app

# 回答配置问题
? 请输入项目名称: my-angular-app
? 是否启用 TypeScript 严格模式? Yes
? 选择 CSS 预处理器: SCSS (推荐)
? 是否启用路由? Yes
? 是否启用单元测试? Yes
? 是否启用 E2E 测试? No
? 选择代码规范工具: ESLint (推荐)
? 选择包管理器: npm

# 项目创建完成后，按提示操作
✨ 项目创建成功!

下一步：
  cd my-angular-app
  npm install
  npm start

# 提示：生成的项目默认名称为 "My Angular App"
# 你可以在以下文件中修改项目名称：
# - package.json (name 字段)
# - src/index.html (title 标签)
# - src/app/app.component.ts (title 属性)
# - README.md (标题)
```

### 配置选项说明

| 选项 | 说明 | 推荐 |
|------|------|------|
| **TypeScript 严格模式** | 提供更好的类型安全 | ✅ 启用 |
| **CSS 预处理器** | SCSS / CSS / Less | SCSS |
| **路由** | Angular Router | ✅ 启用 |
| **单元测试** | Jasmine + Karma | ✅ 启用 |
| **E2E 测试** | 端到端测试 | 按需选择 |
| **代码规范工具** | ESLint | ✅ 启用 |
| **包管理器** | npm / yarn / pnpm | npm |

### 命令行选项

```bash
# 跳过 Git 初始化
npx create-djangular-app my-app --skip-git

# 查看版本
npx create-djangular-app --version

# 查看帮助
npx create-djangular-app --help
```

## 📁 CLI 工具项目结构

本 CLI 工具采用模板拷贝方式，项目结构如下：

```
create-djangular-app/
├── src/                          # CLI 工具源代码
│   ├── index.ts                  # 入口文件
│   ├── generator.ts              # 项目生成逻辑
│   ├── prompts.ts                # 交互式提示
│   ├── types.ts                  # TypeScript 类型定义
│   └── utils.ts                  # 工具函数
├── template/                     # Angular 项目模板（核心）
│   ├── src/                      # 模板源代码
│   │   ├── app/                  # 应用代码
│   │   │   ├── core/             # 核心模块
│   │   │   ├── shared/           # 共享模块
│   │   │   └── features/         # 功能模块
│   │   ├── assets/               # 静态资源
│   │   ├── environments/         # 环境配置
│   │   └── styles/               # 全局样式
│   ├── .vscode/                  # VSCode 配置
│   ├── .editorconfig             # 编辑器配置
│   ├── .eslintrc.json            # ESLint 配置
│   ├── .eslintignore             # ESLint 忽略规则
│   ├── .gitignore                # Git 忽略文件
│   ├── .prettierrc               # Prettier 配置
│   ├── .prettierignore           # Prettier 忽略规则
│   ├── angular.json              # Angular 配置
│   ├── package.json              # 依赖配置
│   ├── tsconfig.json             # TypeScript 配置
│   └── README.md                 # 项目文档
├── dist/                         # 编译后的 JavaScript 代码
├── package.json                  # CLI 工具配置
├── tsconfig.json                 # TypeScript 配置
└── README.md                     # 本文档
```

**工作原理：**
- CLI 工具会直接将 `template/` 目录中的完整 Angular 项目拷贝到用户指定的目录
- 模板项目是一个完整的、可直接运行的 Angular 项目
- 用户可以通过修改 `template/` 目录来自定义生成的项目结构

## 📁 生成的项目结构

```
my-app/
├── src/
│   ├── app/
│   │   ├── core/                    # 核心模块
│   │   │   ├── guards/              # 路由守卫
│   │   │   ├── interceptors/        # HTTP拦截器
│   │   │   └── services/            # 核心服务
│   │   │       ├── loading.service.ts
│   │   │       └── toast.service.ts
│   │   ├── shared/                  # 共享模块
│   │   │   ├── components/          # 通用组件
│   │   │   ├── directives/          # 指令
│   │   │   └── pipes/               # 管道
│   │   ├── features/                # 功能模块
│   │   │   ├── welcome/             # 欢迎页面
│   │   │   └── settings/            # 设置页面
│   │   ├── app.component.*          # 根组件
│   │   ├── app.routes.ts            # 路由配置
│   │   └── app.config.ts            # 应用配置
│   ├── assets/                      # 静态资源
│   ├── environments/                # 环境配置
│   ├── styles/                      # 全局样式
│   │   ├── _variables.scss          # SCSS变量
│   │   ├── _mixins.scss             # SCSS混入
│   │   └── styles.scss              # 主样式文件
│   ├── index.html                   # HTML入口
│   └── main.ts                      # TypeScript入口
├── .vscode/                         # VSCode配置
│   ├── settings.json                # 编辑器设置
│   └── extensions.json              # 推荐插件
├── .editorconfig                    # 编辑器配置
├── .eslintrc.json                   # ESLint配置
├── .eslintignore                    # ESLint忽略规则
├── .gitignore                       # Git忽略文件
├── .prettierrc                      # Prettier配置
├── .prettierignore                  # Prettier忽略规则
├── angular.json                     # Angular配置
├── package.json                     # 依赖配置
├── tsconfig.json                    # TypeScript配置
├── tsconfig.app.json                # 应用TS配置
├── tsconfig.spec.json               # 测试TS配置
├── karma.conf.js                    # Karma测试配置
└── README.md                        # 项目文档
```

## 🎨 内置功能

### 核心服务

#### LoadingService - 全局加载状态

```typescript
import { LoadingService } from '@core/services/loading.service';

constructor(private loading: LoadingService) {}

doSomething() {
  this.loading.show();
  // 异步操作
  this.loading.hide();
}
```

#### ToastService - 消息提示

```typescript
import { ToastService } from '@core/services/toast.service';

constructor(private toast: ToastService) {}

showMessage() {
  this.toast.success('操作成功！');
  this.toast.error('操作失败！');
  this.toast.warning('警告信息');
  this.toast.info('提示信息');
}
```

#### HTTP Interceptor - 自动处理请求

已在 `app.config.ts` 中配置，自动显示/隐藏 loading，可扩展添加认证 token、错误处理等。

#### Auth Guard - 路由守卫

```typescript
// 在 app.routes.ts 中使用
import { authGuard } from '@core/guards/auth.guard';

{
  path: 'protected',
  canActivate: [authGuard],
  component: ProtectedComponent
}
```

### 示例页面

#### 欢迎页面 (`/welcome`)
- 项目信息展示
- 功能特性介绍
- 快速开始指引
- 学习资源链接

#### 设置页面 (`/settings`)
- 主题切换（暗黑模式）
- 语言选择
- 通知配置
- 保存/重置功能

### 路径别名

项目配置了路径别名，方便导入：

```typescript
import { LoadingService } from '@core/services/loading.service';
import { MyComponent } from '@shared/components/my-component';
import { MyFeature } from '@features/my-feature/my-feature.component';
import { environment } from '@environments/environment';
```

## 🚀 开发指南

### 常用命令

```bash
# 启动开发服务器
npm start

# 构建生产版本
npm run build

# 运行测试
npm test

# 代码检查
npm run lint

# 格式化代码
npm run format
```

### 创建新组件

```bash
ng generate component features/my-feature
# 或简写
ng g c features/my-feature
```

### 创建新服务

```bash
ng generate service core/services/my-service
# 或简写
ng g s core/services/my-service
```

### 添加路由

编辑 `src/app/app.routes.ts`：

```typescript
{
  path: 'my-feature',
  loadComponent: () => import('./features/my-feature/my-feature.component')
    .then(m => m.MyFeatureComponent)
}
```

### 环境配置

项目包含两个环境配置：

- `environment.development.ts` - 开发环境
- `environment.ts` - 生产环境

使用方式：

```typescript
import { environment } from '@environments/environment';

const apiUrl = environment.apiUrl;
```

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Angular | 17+ | 最新稳定版，Standalone Components |
| TypeScript | 5.2+ | 类型系统、装饰器支持 |
| RxJS | 7.8+ | 响应式编程 |
| SCSS | - | CSS 预处理器 |
| ESLint | 8+ | 代码检查 |
| Prettier | 3+ | 代码格式化 |

## 💡 最佳实践

### 模块划分

- **Core 模块**：存放单例服务、拦截器、守卫等全局使用的功能
- **Shared 模块**：存放可复用的组件、指令、管道
- **Features 模块**：按业务功能划分的特性模块

### 代码规范

- 遵循 Angular 官方风格指南
- 使用 ESLint 保证代码质量
- 使用 Prettier 统一代码风格
- 组件职责单一

### 组件开发

- 优先使用 Standalone Components
- 使用 Signal 进行状态管理
- 合理使用依赖注入
- 懒加载路由优化性能

## 🔧 项目配置

### TypeScript 配置

- 支持路径别名：`@app/*`、`@core/*`、`@shared/*`、`@features/*`
- 严格模式可选
- 最新 ES 标准支持

### VSCode 配置

项目已配置推荐插件，打开项目时会提示安装：

- Angular Language Service
- Prettier
- ESLint
- TypeScript

### 代码格式化

- 保存时自动格式化
- 统一的代码风格
- 集成到 Git hooks（可选）

## 📋 系统要求

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **操作系统**: Windows 10+, macOS 10.15+, Linux

## 🎓 学习资源

- [Angular 官方文档](https://angular.io/)
- [Angular CLI 文档](https://angular.io/cli)
- [RxJS 文档](https://rxjs.dev/)
- [TypeScript 文档](https://www.typescriptlang.org/)

## ❓ 常见问题

### Q: 如何修改端口？

```bash
ng serve --port 4300
```

或在 `angular.json` 中配置。

### Q: 如何添加第三方库？

```bash
npm install library-name
```

### Q: 如何部署到生产环境？

1. 构建生产版本：`npm run build`
2. 将 `dist/` 目录部署到服务器
3. 配置服务器支持 HTML5 路由

### Q: 生成的项目可以修改吗？

完全可以！生成的项目就是你的项目，可以随意修改和定制。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🙏 致谢

灵感来源于：
- [create-react-app](https://github.com/facebook/create-react-app)
- [Vue CLI](https://github.com/vuejs/vue-cli)
- [Angular CLI](https://github.com/angular/angular-cli)

---

**Made with ❤️ by create-djangular-app Team**
