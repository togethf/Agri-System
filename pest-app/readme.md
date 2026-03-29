# AI 虫情智能问诊 APP

一款基于 UniApp 开发的移动端虫情智能诊断应用，支持 iOS、Android 和微信小程序。

## 功能特性

### 1. 首页 (Home)
- 📊 今日虫情简报数据看板
- 📱 田间设备列表及状态监控
- 🔄 下拉刷新更新数据

### 2. 拍照识别 (Camera)
- 📷 拍照采集虫害/病害图片
- 🖼️ 从相册选择图片
- 📤 提交图片并跳转到 AI 问诊

### 3. AI 问诊 (Consult)
- 💬 多模态聊天界面
- 🤖 AI 智能诊断报告
- 🔍 支持继续追问

## 技术栈

- **框架**: UniApp (Vue 3)
- **样式**: SCSS
- **平台**: iOS / Android / 微信小程序

## 项目结构

```
ai-pest-app/
├── pages/                 # 页面目录
│   ├── home/             # 首页
│   │   └── index.vue
│   ├── camera/           # 拍照识别页
│   │   └── index.vue
│   └── consult/          # AI 问诊页
│       └── index.vue
├── static/               # 静态资源
│   └── tabbar/          # 底部导航图标
├── App.vue              # 应用配置
├── main.js              # 入口文件
├── pages.json           # 页面路由配置
├── manifest.json        # 应用配置
└── package.json         # 依赖配置
```

## 快速开始

### 安装依赖

```bash
npm install
# 或使用
yarn install
```

### 运行项目

```bash
# 微信小程序
npm run dev:mp-weixin

# H5
npm run dev:h5
```

### 构建项目

```bash
# 微信小程序
npm run build:mp-weixin

# H5
npm run build:h5
```

## 开发工具

- [HBuilderX](https://www.dcloud.io/hbuilderx.html) - 推荐 IDE
- [VS Code](https://code.visualstudio.com/) + Volar 插件

## Mock 数据

当前版本使用 Mock 数据，后续版本将接入真实 API。

## License

MIT
