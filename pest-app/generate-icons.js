// 生成简单的 tabbar 图标 (81x81 PNG)
// 使用 base64 编码的简单图标

const fs = require('fs');
const path = require('path');

// 创建一个简单的 PNG 图标（房子形状 - 首页）
function createHomeIcon(isActive) {
  const color = isActive ? '4CAF50' : '9E9E9E';
  return createSimpleIcon('M40 20 L70 45 L65 45 L65 70 L45 70 L45 55 L35 55 L35 70 L15 70 L15 45 L10 45 Z', color);
}

// 相机图标
function createCameraIcon(isActive) {
  const color = isActive ? '4CAF50' : '9E9E9E';
  return createSimpleIcon('M25 30 L35 30 L40 25 L60 25 L65 30 L75 30 L75 60 L25 60 Z M50 35 A10 10 0 1 0 50 55 A10 10 0 1 0 50 35', color);
}

// 问诊图标（对话气泡）
function createConsultIcon(isActive) {
  const color = isActive ? '4CAF50' : '9E9E9E';
  return createSimpleIcon('M20 35 A20 20 0 0 1 60 35 A20 20 0 0 1 60 55 L60 60 L50 55 A20 20 0 0 1 20 55 Z M35 40 L45 40 M35 48 L45 48 M35 56 L40 56', color);
}

function createSimpleIcon(svgPath, color) {
  // 这是一个简化的方案 - 实际需要使用 canvas 或 sharp 库生成 PNG
  // 这里我们创建一个 SVG 文件，然后说明如何转换
  return null; // 占位
}

// 创建图标目录
const iconDir = path.join(__dirname, 'src/static/tabbar');
if (!fs.existsSync(iconDir)) {
  fs.mkdirSync(iconDir, { recursive: true });
}

// 写入说明文件
fs.writeFileSync(
  path.join(iconDir, 'ICONS.md'),
  `# TabBar 图标

已生成 SVG 图标，需要转换为 PNG 格式 (81x81px)。

## 转换方法

### 方法 1: 使用在线工具
访问 https://cloudconvert.com/svg-to-png
- 上传 SVG 文件
- 设置尺寸为 81x81
- 下载 PNG

### 方法 2: 使用 Inkscape (免费)
inkscape --export-type=png --export-width=81 --export-height=81 home.svg

### 方法 3: 使用 ImageMagick
convert -background none -resize 81x81 home.svg home.png

## 或者暂时移除图标配置

编辑 src/pages.json，删除 tabBar 中每个 item 的 iconPath 和 selectedIconPath 行
`
);

console.log('图标说明已创建在 src/static/tabbar/ICONS.md');
console.log('建议使用在线工具转换 SVG 为 PNG，或暂时移除图标配置');
