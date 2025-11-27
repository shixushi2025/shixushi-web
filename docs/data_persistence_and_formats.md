# 首页数据持久化与数据格式约定

## 首页偏好持久化
- `src/pages/Home.vue` 会将首页的布局模式、筛选类别与关键词写入 `localStorage`，键名为 `home-preferences`。
- 结构示例：

```json
{
  "layoutVariant": "timeline-first",
  "selectedCategory": "history",
  "keyword": "改革"
}
```

读取时会校验布局 key 是否在 `homeLayoutOptions` 中，以及分类 key 是否在 `categoryOptions` 中，以避免旧数据导致错误状态。

## 新增历史事件数据
- 数据来源文件：`src/data/events.ts`，类型定义：`src/types/history.ts` 中的 `Event`。
- 必填字段：
  - `id: number`（全局唯一）
  - `title: string`
  - `slug: string`（URL 友好的唯一标识）
  - `timeLabel: string`（展示用文案，例如 `1840–1842 年`）
  - `startYear: number`（公元前用负数，例如前 221 年写 `-221`）
  - `eraSlug: string` / `eraName: string`（所属时代名称）
  - `types: string[]`（至少包含一个用于过滤的类别，如 `历史事件`、`政治`、`经济` 等）
  - `summary`, `background`, `process`, `result`（简要说明四段）
  - `influence: { shortTerm: string; longTerm: string; }`
  - `sources: SourceRef[]`（可为空数组，`SourceRef` 类型定义见 `src/types/history.ts`）
- 可选字段：
  - `endYear?: number`（跨年事件使用）
  - `region?: string[]`、`relatedEmperors?: string[]` 等补充信息。

> 建议保持 `types` 字段与首页筛选类别关键词一致（如 `经济`、`政治`、`科技`），这样新增数据能被现有筛选正确统计。

## 其它数据文件
- 首页文案与布局配置位于 `src/data/homeLayouts.ts`；新增首页模式时需提供 `HomeLayoutOption` 类型所要求的字段（Hero 文案、统计、精选专题等）。
- 模块入口卡片数据在 `Home.vue` 的 `moduleCards` 常量中，如需复用可抽离为独立数据文件。
