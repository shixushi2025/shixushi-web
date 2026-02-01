/**
 * 数据最初通过 /scripts/wikidata 下的脚本生成，目前改为手动维护。
 * 若需重新同步，请在设置 ENABLE_WIKIDATA=true 后再运行相关脚本。
 */
import type { Event } from '@/types/history';
import eventsData from './events.json';

export const events: Event[] = eventsData as unknown as Event[];

export const worldPreviewEvents: Event[] = [
  {
    id: 201,
    title: '工业革命展开',
    slug: 'industrial-revolution',
    timeLabel: '18 世纪末 - 19 世纪',
    startYear: 1760,
    endYear: 1870,
    eraSlug: 'industrial-age',
    eraName: '工业时代',
    region: ['欧洲'],
    types: ['历史事件', '科技', '经济'],
    summary: '蒸汽机与机械化生产推动工业化进程，重塑全球经济格局。',
    background: '科学革命与商业扩张催化技术突破，英国率先起步。',
    process: '纺织、冶金、交通等行业机械化扩散，资本与劳动力集中。',
    result: '工厂制度普及，城市化加速，国际贸易量激增。',
    influence: {
      shortTerm: '生产效率大幅提升，社会阶层与劳动形态变化。',
      longTerm: '奠定现代工业社会基础，推动全球化与帝国扩张。',
    },
    sources: [],
  },
  {
    id: 202,
    title: '第一次世界大战',
    slug: 'ww1',
    timeLabel: '1914–1918 年',
    startYear: 1914,
    endYear: 1918,
    eraSlug: '20th-century',
    eraName: '20 世纪上半叶',
    region: ['欧洲'],
    types: ['历史事件', '政治', '军事'],
    summary: '同盟国与协约国爆发的全球性战争，造成巨大人员伤亡。',
    background: '帝国主义竞争、民族主义与殖民矛盾在巴尔干点燃。',
    process: '大战分为西线僵持与东线崩溃，多国参战与总动员。',
    result: '协约国获胜，奥斯曼与奥匈帝国解体，国际联盟成立。',
    influence: {
      shortTerm: '欧洲格局重绘，战争赔款与民族矛盾未解。',
      longTerm: '为二战与冷战埋下伏笔，推动国际合作与民族自决。',
    },
    sources: [],
  },
  {
    id: 203,
    title: '登月计划',
    slug: 'apollo-11',
    timeLabel: '1969 年',
    startYear: 1969,
    endYear: 1969,
    eraSlug: 'space-age',
    eraName: '空间时代',
    region: ['全球'],
    types: ['历史事件', '科技'],
    summary: '阿波罗 11 号任务实现人类首次登月，标志航天竞赛高峰。',
    background: '冷战背景下的美苏太空竞赛，技术与政治双重较量。',
    process: '土星五号发射、登月舱分离、宇航员在月球表面采样。',
    result: '成功返回地球，巩固美国航天领先地位。',
    influence: {
      shortTerm: '激发科技投资与公众兴趣，航天工程体系成熟。',
      longTerm: '促进卫星与深空探测发展，为商业航天奠基。',
    },
    sources: [],
  },
];
