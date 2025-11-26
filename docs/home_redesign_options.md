# 首页重设计方案与数据结构建议

以下方案围绕“只看历史”的定位，提供不同层次的首页布局思路，并附带事件/专题数据结构示例，便于后续实现。

## 方案 A：时间流主舞台
- **核心理念**：将时间轴置于首屏主视觉，配合轻量筛选，突出“纵向阅读”。
- **信息区块**：
  1) Hero：以一句话价值主张+按钮（中国线、世界线）。
  2) 轻量筛选：类别 pill + 关键词搜索，实时筛选时间线数据。
  3) 主时间轴：默认展示最新/最关键历史事件，支持按朝代或世纪分隔。
  4) 深度模块入口：历史/世界/专题/人物四宫格。
  5) 统计与更新：展示事件条数、专题数、最近一次补全时间。
- **交互要点**：首屏即可滚动时间轴；加载更多保持连续沉浸。

## 方案 B：专题+时间线并排
- **核心理念**：突出策展专题，时间线作为辅助补充。
- **信息区块**：
  1) Hero：专题化 slogan + 快速入口（专题索引/人物/世界）。
  2) 专题精选：3-6 张专题卡片，包含主题标签（制度、战争、思想、科技）。
  3) 时间线侧栏：紧凑版时间轴，支持按类别过滤，点击跳转详细事件页。
  4) 模块导航：历史、世界、专题、人物的入口条。
  5) 更新播报：以 ticker 形式滚动近期新增/修订事件。
- **交互要点**：专题卡支持 hover 展开摘要和关键节点；时间线在侧栏连续滚动。

## 方案 C：人物驱动的历史视角
- **核心理念**：以人物或家族为线索串联事件，兼顾制度/战争分支。
- **信息区块**：
  1) Hero：人物视角 CTA（“按人物看历史”）。
  2) 人物群像：按时代分组展示代表人物，点击进入人物档案。
  3) 事件关联：选中人物后右侧时间线仅显示与其关联的事件。
  4) 专题挂载：人物页挂载相关专题（如“戊戌变法”“宋代文臣集团”）。
  5) 底部扩展：历史/世界主线入口，保持返回整体时间轴的路径。
- **交互要点**：人物选择驱动时间线过滤；支持对比两个角色的事件交集。

## 推荐模块化信息层次
1. **首屏价值主张**：一句话定位 + 主要 CTA（历史/世界）。
2. **筛选/搜索**：类目 pill、朝代/世纪切换、关键词搜索。
3. **时间线展示**：分段加载、朝代/世纪分隔、事件类型标签。
4. **专题/人物入口**：精选专题卡、人物索引卡，提供二次深度阅读。
5. **更新与统计**：事件数、专题数、最近更新；可选「更新日志」入口。

## 数据结构示例

### 事件（Event）
```ts
export type Event = {
  id: string;
  title: string;
  time: string; // ISO 或 "-0200" 表示公元前
  timeLabel: string; // 展示用，如 "前221年"、"1894年"、"1969年7月"
  eraName?: string; // 朝代或世纪，如 "秦"、"宋"、"20世纪"
  summary: string;
  location?: string;
  types: string[]; // ["历史", "战争", "制度"]，过滤用
  topics?: string[]; // 关联专题 id
  people?: string[]; // 关联人物 id
  refs?: string[]; // 史料/参考
};
```

### 专题（Topic）
```ts
export type Topic = {
  id: string;
  title: string;
  slug: string;
  category: '制度' | '战争' | '思想' | '科技' | '社会';
  summary: string;
  keyEvents: string[]; // Event id 列表
  keyPeople?: string[]; // People id 列表
  timeline?: { time: string; eventId: string }[]; // 可选专题内时间线
  reading?: string[]; // 推荐书目/文章
};
```

### 人物（People）
```ts
export type People = {
  id: string;
  name: string;
  birth?: string;
  death?: string;
  era?: string; // 朝代/世纪
  titles?: string[]; // 职衔/身份
  summary: string;
  events?: string[]; // 关联事件 id
  topics?: string[]; // 关联专题 id
};
```

### 模块配置（ModuleCard）
```ts
export type ModuleCard = {
  focus: '历史' | '世界' | '专题' | '人物';
  focusKey: 'history' | 'world' | 'topic' | 'people';
  title: string;
  subtitle: string;
  desc: string;
  link: string;
  cta: string;
  tag: string;
};
```

### 页面文案/选项元数据（可抽离）
- 将首页 Hero 文案、统计、筛选选项、模块卡片抽到 `src/data/home.ts`，便于方案切换和 A/B。
- 支持 `heroVariants`、`moduleLayouts` 等配置化导出，在 `Home.vue` 中按开关切换。

## 实施建议
1. 抽离首页文案与模块数据到数据文件，组件仅负责渲染。
2. 时间线组件支持通过 props 传入过滤条件与分页策略。
3. 专题/人物数据与事件保持双向引用，便于交叉过滤与跳转。
4. 若需 A/B 测试不同方案，可在本地通过 query 或环境变量切换 `layoutVariant`。
