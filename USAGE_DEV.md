# Create-DjAngular-App 使用文档

## 📋 目录
- [开发模式](#开发模式)
- [本地测试](#本地测试)
- [发布到npm](#发布到npm)
- [用户使用](#用户使用)
- [常见问题](#常见问题)

---

## 🛠️ 开发模式

### 1. 首次设置

```bash
# 进入项目目录
cd /Users/miles_wang/Desktop/work/project_angular_cli

# 修复 npm 缓存权限（如果需要）
sudo chown -R 501:20 "/Users/miles_wang/.npm-cache"

# 安装依赖
npm install

# 编译 TypeScript
npm run build
```

### 2. 开发时自动编译

```bash
# 监听文件变化，自动编译
npm run dev
```

### 3. 项目结构说明

```
project_angular_cli/
├── src/                    # CLI 工具源码（你编写的代码）
│   ├── index.ts           # 入口文件
│   ├── generator.ts       # 项目生成器
│   ├── prompts.ts         # 交互式问答
│   ├── types.ts           # 类型定义
│   └── utils.ts           # 工具函数
│
├── template/              # Angular 项目模板（会被拷贝）
│   ├── package.json       # 包含 {{projectName}} 变量
│   ├── angular.json
│   └── src/              # 完整的 Angular 项目
│
├── dist/                  # 编译输出（npm run build 生成）
│   ├── index.js          # 编译后的入口
│   └── ...
│
└── package.json          # CLI 工具的配置
```

---

## 🧪 本地测试

### 方法1：使用 npm link（推荐）

#### Step 1: 清理旧的链接（如果存在）

```bash
# 取消全局链接
npm unlink -g create-djangular-app

# 或者强制删除
rm -f /Users/miles_wang/.nvm/versions/node/v*/bin/create-djangular-app
rm -f /Users/miles_wang/.nvm/versions/node/v*/bin/create-DjAngular-app
```

#### Step 2: 创建新链接

```bash
# 在项目目录中
cd /Users/miles_wang/Desktop/work/project_angular_cli

# 编译（确保 dist/ 是最新的）
npm run build

# 创建全局链接
npm link
```

#### Step 3: 测试使用

```bash
# 去一个测试目录
cd /tmp

# 创建测试项目
create-DjAngular-app test-app

# 或者
create-djangular-app test-app
```

#### Step 4: 验证生成的项目

```bash
cd test-app
npm install
npm start
```

打开浏览器访问 `http://localhost:4200`，应该能看到欢迎页面。

#### Step 5: 测试完毕后清理

```bash
# 删除测试项目
rm -rf /tmp/test-app

# 取消全局链接
npm unlink -g create-djangular-app
```

### 方法2：直接运行（不使用 link）

```bash
# 在项目目录
cd /Users/miles_wang/Desktop/work/project_angular_cli

# 编译
npm run build

# 直接运行
node dist/index.js /tmp/test-app
```

---

## 📦 发布到 npm

### 准备工作

#### 1. 确保已登录 npm

```bash
# 检查是否已登录
npm whoami

# 如果未登录
npm login
```

#### 2. 更新版本号

```bash
# 补丁版本 (1.0.0 -> 1.0.1)
npm version patch

# 次版本 (1.0.0 -> 1.1.0)
npm version minor

# 主版本 (1.0.0 -> 2.0.0)
npm version major
```

#### 3. 检查包内容

```bash
# 查看将要发布的文件
npm pack --dry-run

# 应该包含：
# - dist/ 目录
# - template/ 目录
# - package.json
# - README.md
# - LICENSE
```

#### 4. 最终检查

- [ ] `npm run build` 无错误
- [ ] `dist/` 目录存在且最新
- [ ] `template/` 目录完整
- [ ] `package.json` 中的 `name`、`version` 正确
- [ ] `README.md` 完善
- [ ] 本地测试通过

### 发布

```bash
# 编译
npm run build

# 发布到 npm（会自动运行 prepublishOnly 脚本）
npm publish

# 如果是首次发布，可能需要设置为公开
npm publish --access public
```

### 发布后验证

```bash
# 等待几分钟（npm 同步需要时间）

# 在新目录测试
cd ~/Desktop
npx create-DjAngular-app test-from-npm

# 如果成功，说明发布OK
```

---

## 👤 用户使用

### 安装和使用

```bash
# 方式1：使用 npx（推荐，无需安装）
npx create-DjAngular-app my-app

# 方式2：全局安装后使用
npm install -g create-djangular-app
create-DjAngular-app my-app
```

### 创建项目流程

```bash
# 1. 运行命令
npx create-DjAngular-app my-app

# 2. 回答配置问题
? 请输入项目名称: my-app
? 是否启用 TypeScript 严格模式? Yes
? 选择 CSS 预处理器: SCSS (推荐)
? 是否启用路由? Yes
? 是否启用单元测试? Yes
? 是否启用 E2E 测试? No
? 选择代码规范工具: ESLint (推荐)
? 选择包管理器: npm

# 3. 等待创建完成（约 5-10 秒）

# 4. 进入项目
cd my-app

# 5. 安装依赖
npm install

# 6. 启动开发服务器
npm start

# 7. 打开浏览器
# 访问 http://localhost:4200
```

---

## ❓ 常见问题

### Q1: npm link 报错 EEXIST

**错误信息：**
```
npm ERR! code EEXIST
npm ERR! File exists: /path/to/bin/create-DjAngular-app
```

**解决方案：**
```bash
# 方法1：取消旧链接
npm unlink -g create-djangular-app
npm link

# 方法2：强制覆盖
npm link --force

# 方法3：手动删除
rm /Users/miles_wang/.nvm/versions/node/v*/bin/create-djangular-app
rm /Users/miles_wang/.nvm/versions/node/v*/bin/create-DjAngular-app
npm link
```

### Q2: 为什么不自动安装依赖？

**原因：**
遵循现代脚手架趋势（如 create-vite、create-vue），让用户：
- 自由选择安装时机
- 选择自己喜欢的包管理器
- 避免网络问题导致创建失败
- 更快的项目创建体验

**手动安装：**
```bash
cd my-app
npm install   # 或 yarn install / pnpm install
```

### Q3: npm 缓存权限问题

**错误信息：**
```
npm ERR! code EPERM
npm ERR! Your cache folder contains root-owned files
```

**解决方案：**
```bash
sudo chown -R 501:20 "/Users/miles_wang/.npm-cache"
```

### Q4: 修改了代码但 npm link 没生效

**原因：**
没有重新编译。

**解决方案：**
```bash
npm run build
# npm link 会自动使用最新的 dist/
```

### Q5: 生成的项目启动失败

**排查步骤：**

```bash
cd generated-project

# 1. 检查是否安装了依赖
ls node_modules/  # 应该有很多包

# 2. 手动安装依赖
npm install

# 3. 检查 Angular 版本
ng version

# 4. 清理缓存重试
rm -rf node_modules package-lock.json
npm install
```

### Q6: 如何修改模板？

模板文件在 `template/` 目录：

```bash
# 修改模板
vim template/src/app/app.component.ts

# 重新编译 CLI 工具
npm run build

# 测试
npm link
create-DjAngular-app test-new-template
```

**注意**：模板是固定的项目，不使用变量替换。
- 默认项目名称：`My Angular App`
- 用户可以在生成后自行修改 `package.json`、`index.html` 等文件中的项目名称

### Q7: 如何添加新的配置选项？

1. 修改 `src/types.ts` 添加新字段
2. 修改 `src/prompts.ts` 添加新问题
3. 修改 `src/generator.ts` 根据配置调整生成逻辑
4. 编译测试

### Q8: 发布后发现 bug 怎么办？

```bash
# 1. 修复 bug
vim src/xxx.ts

# 2. 编译
npm run build

# 3. 本地测试
npm link
create-DjAngular-app test-fix

# 4. 更新版本
npm version patch

# 5. 重新发布
npm publish

# 6. 用户更新
npx create-DjAngular-app@latest my-app
```

---

## 🔍 调试技巧

### 查看生成的文件

```bash
# 在 generator.ts 中添加日志
console.log('Copying template from:', this.templateRoot);
console.log('To:', this.projectRoot);
```

### 查看模板变量替换

```bash
# 检查 package.json 是否替换成功
cat /tmp/test-app/package.json | grep "name"
# 应该是: "name": "test-app"
```

### 查看完整错误日志

```bash
# npm 错误日志位置
cat ~/.npm-cache/_logs/*-debug.log
```

---

## 📝 开发检查清单

### 修改代码前
- [ ] 了解要修改的功能
- [ ] 阅读相关代码
- [ ] 确认修改方案

### 修改代码后
- [ ] 编译：`npm run build`
- [ ] 无 TypeScript 错误
- [ ] 本地测试：`npm link && create-DjAngular-app test`
- [ ] 生成的项目可以正常运行：`cd test && npm start`
- [ ] 检查欢迎页面和设置页面
- [ ] 清理测试项目：`rm -rf test`

### 发布前
- [ ] 更新 `CHANGELOG.md`
- [ ] 更新版本号：`npm version patch/minor/major`
- [ ] 确认 `README.md` 准确
- [ ] 本地完整测试通过
- [ ] Git 提交所有更改
- [ ] 打 tag：`git tag v1.0.x`

### 发布后
- [ ] 等待 5-10 分钟
- [ ] 测试：`npx create-DjAngular-app@latest test-npm`
- [ ] 更新文档（如果需要）
- [ ] 通知用户更新

---

## 🎯 快速命令参考

```bash
# 开发
npm install          # 安装依赖
npm run build        # 编译
npm run dev          # 监听模式编译

# 测试
npm link             # 本地链接
npm unlink -g pkg    # 取消链接
create-DjAngular-app # 测试命令

# 发布
npm version patch    # 更新版本
npm publish          # 发布到 npm
npm publish --dry-run # 预览发布内容

# 清理
rm -rf dist/         # 删除编译文件
rm -rf node_modules/ # 删除依赖
npm cache clean -f   # 清理缓存
```

---

**祝开发顺利！** 🎉

