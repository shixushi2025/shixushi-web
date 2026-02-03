// src/types/history.ts

// 1. 定义核心枚举/联合类型，约束输入
// 补充 '世界史' 和 '当代观察' 以兼容旧逻辑和特定展示需求
// 扩充 '政变'、'更迭' 等常见细分类型
export const EVENT_TYPES = ['历史事件', '科技', '经济', '政治', '军事', '文化', '世界史', '当代观察', '政变', '更迭', '改革', '灾难', '民变', '外交', '统一', '建国', '盛世', '动乱', '危机', '起义', '革命', '终结', '探险'] as const;
export type EventType = typeof EVENT_TYPES[number];

// 使用 ISO 3166-1 alpha-2 代码或通用区域代码
export const REGIONS = ['CN', 'EU', 'US', 'JP', 'GLOBAL', 'OTHER'] as const;
export type RegionKey = typeof REGIONS[number];

export interface EraPeriod {
  key: string;
  name: string;
  startYear: number;
  endYear: number;
}

export interface Era {
  id: number;
  name: string;
  slug: string;
  startYear: number;
  endYear: number;
  summary: string;
  parentSlug?: string | null;
  broadPeriod?: string; // ✅ 新增：大历史分期（如“先秦”、“秦汉”）
  periods: EraPeriod[];
}

export interface Emperor {
  id: number;
  name: string;
  slug: string;
  eraSlug: string;
  reignStart: number;
  reignEnd: number;
  courtesyName?: string;
  title?: string;
  summary: string;
  eraNames?: string[];
  personalName?: string; // 修正：有些组件用了这个字段
}

// 2. 引用类型 (外键)
export interface SourceRef {
  type: 'book' | 'article' | 'paper' | 'other' | 'zhengshi';
  title: string;
  detail?: string;
  url?: string;
  quote?: string;
}

// ✅ 新增：历史地理信息
export interface HistoricalPlace {
  ancient: string;      // 古地名 (如 "长平", "建康")
  modern?: string;      // 今地名 (如 "山西高平", "江苏南京")
  geo?: [number, number]; // 经纬度 [lng, lat]
}

// 3. 核心事件模型 (Normalized)
export interface Event {
  id: number;
  title: string;
  slug: string;
  
  // 时间信息 (纯数字，用于计算和排序)
  startYear: number;
  endYear?: number; // 如果是单点事件，该字段可空或等于 startYear
  timeDisplay?: string; // ✅ 新增：手动覆盖时间显示（如"14世纪中叶"）
  
  // 关联信息 (Foreign Keys)
  eraSlug: string; // 关联 Era 表
  
  // 分类标签
  region: RegionKey[];
  types: EventType[];
  
  // 地理信息
  places?: HistoricalPlace[]; // ✅ 新增字段

  // 内容详情
  summary: string;
  background?: string;
  process?: string;
  result?: string;
  influence?: {
    shortTerm: string;
    longTerm: string;
  };
  
  sources: SourceRef[];
  
  // 人物关联 (存储 Slug)
  relatedEmperorSlugs?: string[]; 
}
