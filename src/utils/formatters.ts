// src/utils/formatters.ts
import type { Event, RegionKey } from '@/types/history';
import { eras } from '@/data/eras';

/**
 * 动态计算事件的时间显示字符串
 * @param event 
 * @returns 例如: "1914–1918 年" 或 "626 年"
 */
export function formatEventTime(event: Pick<Event, 'startYear' | 'endYear'>): string {
  const { startYear, endYear } = event;
  
  if (!endYear || startYear === endYear) {
    return formatYear(startYear);
  }
  
  return `${formatYear(startYear)}–${formatYear(endYear)}`;
}

function formatYear(year: number): string {
  if (year < 0) {
    return `前 ${Math.abs(year)}`;
  }
  return `${year}`;
}

/**
 * 区域代码转中文显示
 */
export const REGION_MAP: Record<RegionKey, string> = {
  CN: '中国',
  EU: '欧洲',
  US: '北美', // 或美国
  JP: '日本',
  GLOBAL: '全球',
  OTHER: '其他'
};

export function formatRegion(key: RegionKey): string {
  return REGION_MAP[key] || '未知区域';
}

/**
 * 获取朝代/时代名称
 */
export function getEraName(slug: string): string {
  const era = eras.find(e => e.slug === slug);
  return era ? era.name : slug;
}
