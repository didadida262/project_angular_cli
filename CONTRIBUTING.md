# 贡献指南

感谢你考虑为 create-djangular-app 做出贡献！

## 如何贡献

### 报告 Bug

如果你发现了 bug，请通过 GitHub Issues 报告，并包含以下信息：

1. **清晰的标题**：简洁描述问题
2. **复现步骤**：详细的复现步骤
3. **期望行为**：你期望发生什么
4. **实际行为**：实际发生了什么
5. **环境信息**：
   - 操作系统
   - Node.js 版本
   - npm/yarn/pnpm 版本
   - 相关截图或错误日志

### 提交功能建议

我们欢迎新功能建议！请通过 GitHub Issues 提交，并说明：

1. **功能描述**：清晰描述你想要的功能
2. **使用场景**：为什么需要这个功能
3. **预期实现**：你期望如何使用这个功能

### Pull Request 流程

1. **Fork 项目**
   ```bash
   git clone https://github.com/your-username/create-djangular-app.git
   cd create-djangular-app
   ```

2. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-bug-fix
   ```

3. **开发**
   - 遵循项目的代码风格
   - 添加必要的测试
   - 确保所有测试通过
   - 更新相关文档

4. **提交代码**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

   提交信息格式：
   - `feat`: 新功能
   - `fix`: Bug 修复
   - `docs`: 文档更新
   - `style`: 代码格式调整
   - `refactor`: 代码重构
   - `test`: 测试相关
   - `chore`: 构建/工具相关

5. **推送并创建 PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   然后在 GitHub 上创建 Pull Request

## 开发指南

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 本地开发

1. 克隆项目
   ```bash
   git clone https://github.com/your-repo/create-djangular-app.git
   cd create-djangular-app
   ```

2. 安装依赖
   ```bash
   npm install
   ```

3. 开发模式（监听文件变化）
   ```bash
   npm run dev
   ```

4. 编译 TypeScript
   ```bash
   npm run build
   ```

5. 本地测试
   ```bash
   # 链接到全局
   npm link
   
   # 在另一个目录测试
   cd /path/to/test
   create-djangular-app test-app
   ```

### 代码规范

- 使用 TypeScript
- 遵循 ESLint 规则
- 使用 Prettier 格式化代码
- 函数和类添加必要的注释
- 保持代码简洁清晰

### 测试

- 添加单元测试覆盖新功能
- 确保所有测试通过
- 测试覆盖率应 > 80%

```bash
npm test
```

## 项目结构

```
create-djangular-app/
├── src/                 # 源代码
│   ├── index.ts        # CLI 入口
│   ├── types.ts        # 类型定义
│   ├── utils.ts        # 工具函数
│   ├── prompts.ts      # 交互式配置
│   └── generator.ts    # 项目生成器
├── dist/               # 编译输出（git 忽略）
├── templates/          # 项目模板文件
├── tests/              # 测试文件
└── docs/               # 文档
```

## 发布流程

只有维护者可以发布新版本：

1. 更新版本号
   ```bash
   npm version patch|minor|major
   ```

2. 更新 CHANGELOG.md

3. 推送标签
   ```bash
   git push --follow-tags
   ```

4. 发布到 npm
   ```bash
   npm publish
   ```

## 行为准则

- 尊重所有贡献者
- 保持友好和专业
- 接受建设性批评
- 专注于对项目最有利的事情

## 问题？

如有任何问题，请通过以下方式联系：

- 提交 GitHub Issue
- 发送邮件至：[your-email@example.com]

再次感谢你的贡献！ 🎉

