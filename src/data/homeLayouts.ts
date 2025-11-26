export type HeroCopy = {
  eyebrow: string;
  pill: string;
  pillAccent: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; link: string };
  secondaryCta: { label: string; link: string };
};

export type Highlight = { pill: string; label: string; desc: string };
export type StatChip = { label: string; value: string };
export type FeaturedTopic = {
  id: string;
  title: string;
  tag: string;
  era: string;
  summary: string;
  link: string;
};

export type HomeLayoutKey = 'timeline-first' | 'topic-side';

export type HomeLayoutOption = {
  key: HomeLayoutKey;
  label: string;
  description: string;
  emphasis: 'timeline' | 'topic';
  hero: HeroCopy;
  highlights: Highlight[];
  stats: StatChip[];
  featuredTopics?: FeaturedTopic[];
};

export const homeLayoutOptions: HomeLayoutOption[] = [
  {
    key: 'timeline-first',
    label: '方案 A · 时间流主舞台',
    description: '首屏即进入纵向时间流，强调沉浸式阅读与轻量筛选。',
    emphasis: 'timeline',
    hero: {
      eyebrow: '时序史 · 时间宇宙',
      pill: '时间流 · 事件网络',
      pillAccent: '#f79944',
      title: '专注历史长河，避开当下喧嚣的纵向时间线',
      subtitle:
        '精选历史事件按时间顺序展开，梳理王朝更迭、战争、制度与人物。可按类别筛选，也可直接滚动沉浸阅读。',
      primaryCta: { label: '进入历史模块', link: '/china' },
      secondaryCta: { label: '查看世界/专题', link: '/world' },
    },
    highlights: [
      { pill: '宏观脉络', label: '从王朝到制度', desc: '宏观把握大一统与分裂时期、制度变革、文化流变。' },
      { pill: '转折瞬间', label: '战争与改革', desc: '记录决定性战役、开创性制度与重大思想转向。' },
      { pill: '人物线索', label: '人物与轨迹', desc: '用人物与家族串起时代气质，辅助追踪关键节点。' },
    ],
    stats: [
      { label: '事件条目', value: '示例 8 条' },
      { label: '专题草案', value: '示例 4 个' },
      { label: '史料整理', value: '逐步补全' },
    ],
  },
  {
    key: 'topic-side',
    label: '方案 B · 专题+时间线',
    description: '突出策展专题，时间线为辅助补充，可快速切换主题。',
    emphasis: 'topic',
    hero: {
      eyebrow: '专题策展 · 对照阅读',
      pill: '专题精选 · 事件索引',
      pillAccent: '#805ad5',
      title: '以专题与人物为线索，搭配时间线的历史首页',
      subtitle:
        '专题卡片策展关键议题，侧栏时间线保持纵向阅读。切换不同主题，也能保持时间脉络的连续感。',
      primaryCta: { label: '查看专题索引', link: '/topics' },
      secondaryCta: { label: '切换到时间线模式', link: '/?layout=timeline-first' },
    },
    highlights: [
      { pill: '精选专题', label: '制度·战争·思想', desc: '以策展专题视角导航，快速进入深度阅读。' },
      { pill: '人物群像', label: '人物与家族', desc: '用人物、家族补充时代气质与节点。' },
      { pill: '时间线辅助', label: '侧栏时间轴', desc: '紧凑时间线辅助跳转事件详情，保持纵向脉络。' },
    ],
    stats: [
      { label: '历史事件', value: '与时间线同步' },
      { label: '专题卡片', value: '四类示例标签' },
      { label: '双模式', value: '一键切换' },
    ],
    featuredTopics: [
      {
        id: 'topic-reform',
        title: '制度与改革脉络',
        tag: '制度',
        era: '先秦 - 近代',
        summary: '从郡县、科举到民国宪政尝试，梳理制度变革的关键节点。',
        link: '/topics/reform',
      },
      {
        id: 'topic-war',
        title: '战争与地缘转折',
        tag: '战争',
        era: '春秋战国 - 当代',
        summary: '聚焦决定性战役与地缘重组，对照周边与全球事件。',
        link: '/topics/war',
      },
      {
        id: 'topic-thought',
        title: '思想与学术流变',
        tag: '思想',
        era: '先秦 - 20世纪',
        summary: '从诸子到近代学术，引导阅读思想转向与代表人物。',
        link: '/topics/thought',
      },
      {
        id: 'topic-tech',
        title: '科技与基础设施',
        tag: '科技',
        era: '秦汉 - 当代',
        summary: '关注交通、能源、通信、工业化等影响社会结构的技术。',
        link: '/topics/tech',
      },
    ],
  },
];

export const defaultLayoutKey: HomeLayoutKey = 'timeline-first';
