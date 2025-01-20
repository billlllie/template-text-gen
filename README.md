# Prompt Generator

一个基于 Vue.js 的提示词生成工具，帮助用户通过模板快速生成格式化的提示词。

## 主要功能

- 模板管理：创建、编辑、删除模板
- 模板自动加载：启动时自动加载预定义模板
- 模板上传：支持上传自定义模板
- 提示词生成：根据模板生成格式化提示词

## 使用说明

1. 安装依赖
```bash
npm install
```

2. 启动开发服务器
```bash
npm run serve
```

3. 访问应用
打开浏览器访问 http://localhost:8080

## 开发指南

### 项目结构
```
src/
├── components/      # Vue组件
├── data/            # 模板数据
├── router/          # 路由配置
└── assets/          # 静态资源
```

### 添加新模板
1. 在`src/data/templates/`目录下创建新的模板文件
2. 在`src/data/templates/index.js`中导入新模板
3. 重启开发服务器

## 贡献指南

欢迎提交 Pull Request。请确保：
- 代码风格一致
- 添加必要的测试
- 更新相关文档
