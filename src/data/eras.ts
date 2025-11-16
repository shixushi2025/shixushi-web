// src/data/eras.ts
import type { Era } from '@/types/history';

export const chinaEras: Era[] = [
  {
    id: 1,
    name: '夏商周',
    slug: 'xia-shang-zhou',
    startYear: -2070,
    endYear: -256,
    summary: '中国早期王朝时期，国家形态与礼乐制度初步形成。',
    periods: [],
  },
  {
    id: 2,
    name: '秦汉',
    slug: 'qin-han',
    startYear: -221,
    endYear: 220,
    summary: '中国大一统帝国的建立与巩固。',
    periods: [],
  },
  {
    id: 3,
    name: '唐朝',
    slug: 'tang',
    startYear: 618,
    endYear: 907,
    summary: '中国古代封建社会的鼎盛时期，对外交流频繁、文化高度繁荣。',
    periods: [
      { key: 'early', name: '初唐', startYear: 618, endYear: 712 },
      { key: 'peak', name: '盛唐', startYear: 713, endYear: 755 },
      { key: 'middle', name: '中唐', startYear: 756, endYear: 820 },
      { key: 'late', name: '晚唐', startYear: 821, endYear: 907 },
    ],
  },
  // ... 其他时期
];

export const eras = chinaEras; // 暂时一样，方便 EraList 用
