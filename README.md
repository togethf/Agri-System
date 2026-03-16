# 农业害虫智能监测系统 (Agri-Pest Intelligent Monitoring System)

AI 驱动的农业害虫监测与防治决策支持系统。

## 项目简介

本项目是一个集成了害虫检测、知识图谱、数据大屏和智能问诊的完整农业害虫监测系统。

![GitHub last commit](https://img.shields.io/github/last-commit/togethf/Agri-System)
![Python](https://img.shields.io/badge/python-3.8%2B-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 系统架构

```
┌─────────────────────────────────────────────────────────────┐
│                    农业害虫智能监测系统                       │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ 害虫检测     │  │ 知识图谱     │  │ 数据大屏     │       │
│  │ pest_*.pt    │  │ Neo4j        │  │ ECharts      │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│           │                │                │                │
│           └────────────────┼────────────────┘                │
│                            │                                 │
│                  ┌─────────┴─────────┐                       │
│                  │   智能问诊对比     │                       │
│                  │  (Baseline vs KG) │                       │
│                  └───────────────────┘                       │
└─────────────────────────────────────────────────────────────┘
```

## 子项目

| 模块 | 描述 |
|------|------|
| [**pest_detection**](pest_detection/) | 基于 YOLO 的害虫检测工具，支持 9 种害虫识别 |
| [**pest_dashboard**](pest_dashboard/) | 虫情监测数据大屏，环境数据与虫情可视化 |
| [**knowledge_base**](knowledge_base/) | 农业害虫知识图谱与智能问诊对比系统 |

## 快速开始

### 1. 克隆项目

```bash
git clone --recursive https://github.com/togethf/Agri-System.git
cd Agri-System
```

### 2. 安装依赖

```bash
# 基础依赖
pip install ultralytics neo4j pyyaml flask pillow

# pest_dashboard 依赖
pip install django

# 知识图谱可视化
pip install vis-network
```

### 3. 使用各模块

#### 害虫检测

```bash
cd pest_detection
python pest_detector.py input_images/test.jpg
```

#### 启动数据大屏

```bash
cd pest_dashboard
python manage.py runserver
# 访问 http://localhost:8000/pest_dashboard
```

#### 知识图谱可视化

```bash
cd knowledge_base
python tools/visualize_kg.py
# 打开 kg_visualization.html
```

#### 智能问诊对比

```bash
cd knowledge_base/comparison_tool
python app.py
# 访问 http://localhost:5000
```

## 检测的害虫类别

| ID | 名称 | ID | 名称 |
|----|------|----|------|
| 0 | 稻纵卷叶螟 | 5 | 玉米螟 |
| 1 | 二化螟 | 6 | 蚜虫 |
| 2 | 大螟 | 7 | 蝼蛄 |
| 3 | 黑白蚁 | 8 | 金龟子 |
| 4 | 稻蓟马 | | |

## 知识图谱 Schema

### 核心实体

- **Pest** - 害虫物种
- **Disease** - 植物病害
- **Crop** - 作物物种
- **Pesticide** - 农药/杀菌剂
- **Symptom** - 症状

### 核心关系

| 关系 | 描述 |
|------|------|
| `AFFECTS` | 害虫危害作物 |
| `CAUSES` | 害虫导致症状 |
| `CONTROLLED_BY` | 害虫可被农药防治 |
| `FAVORED_BY_WEATHER` | 天气促进害虫发生 |

## 项目结构

```
Agri-System/
├── pest.pt                     # YOLO 害虫检测模型
├── pest_detection/             # 害虫检测模块
│   ├── pest_detector.py        # 检测主程序
│   ├── batch_detect.py         # 批量检测
│   └── input_images/           # 输入图片目录
│
├── pest_dashboard/             # 数据大屏模块
│   ├── templates/              # HTML 模板
│   ├── static/                 # 静态资源
│   └── manage.py               # Django 管理
│
├── knowledge_base/             # 知识图谱模块
│   ├── data/                   # 数据文件
│   ├── tools/                  # 处理工具
│   ├── comparison_tool/        # 问诊对比工具
│   └── kg_visualization.html   # 图谱可视化
│
└── README.md                   # 项目文档
```

## 环境要求

- Python 3.8+
- Node.js 14+ (可选，用于前端开发)
- Neo4j 4.4+ (知识图谱存储)

## 配置 Neo4j

```bash
export NEO4J_URI=bolt://localhost:7687
export NEO4J_USER=neo4j
export NEO4J_PASSWORD=your_password
```

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 联系方式

- GitHub: [@togethf](https://github.com/togethf)
- 项目仓库：https://github.com/togethf/Agri-System
