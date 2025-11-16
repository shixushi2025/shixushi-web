// src/data/events.ts
import type { Event } from '@/types/history';

export const events: Event[] = [
  {
    id: 123,
    title: '玄武门之变',
    slug: 'xuanwumen-zhibian',
    timeLabel: '626 年',
    startYear: 626,
    eraSlug: 'tang',
    eraName: '唐朝',
    region: ['中国', '长安'],
    types: ['政治', '宫廷政变'],
    summary: '唐太宗李世民发动的宫廷政变，夺取皇位并奠定其统治基础。',
    background: '唐高祖李渊建国后，太子李建成与秦王李世民之间权力斗争日趋激烈……',
    process: '626 年六月初四，李世民率兵埋伏于长安宫城玄武门……',
    result: '李建成、李元吉被杀，李世民掌握军政大权，后即位为唐太宗。',
    influence: {
      shortTerm: '唐朝统治集团完成新一轮权力重组。',
      longTerm: '为后来的“贞观之治”奠定基础，同时也成为中国历史上著名的宫廷政变案例。',
    },
    sources: [
      { type: 'book', title: '旧唐书', detail: '卷 X' },
      { type: 'book', title: '新唐书', detail: '卷 Y' },
    ],
  },
  {
    id: 201,
    title: '第一次世界大战',
    slug: 'world-war-i',
    timeLabel: '1914–1918 年',
    startYear: 1914,
    endYear: 1918,
    eraSlug: 'world-modern',
    eraName: '世界近现代史',
    region: ['欧洲', '全球'],
    types: ['战争'],
    summary: '20 世纪初爆发的全球性战争，深刻改变了世界格局。',
    background: '欧洲列强在殖民、军备、联盟体系等方面矛盾激化……',
    process: '由萨拉热窝事件引发，协约国与同盟国之间形成大规模战争……',
    result: '同盟国战败、帝国瓦解，国际联盟成立，但为二战埋下伏笔。',
    influence: {
      shortTerm: '带来了大量伤亡和经济破坏，欧洲格局重组。',
      longTerm: '推动世界秩序重构，民族自决浪潮兴起，对中国等国家也产生深远影响。',
    },
    sources: [
      { type: 'book', title: '剑桥第一次世界大战史', detail: '' },
    ],
  },
];

export const worldPreviewEvents = events.filter(e => e.region?.includes('欧洲') || e.eraSlug === 'world-modern');
