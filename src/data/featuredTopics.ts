import { preQinResearch } from './topics/pre-qin';

export interface FeaturedTopic {
  slug: string;
  title: string;
  summary: string;
  content: string; // Markdown
}

export const featuredTopics: FeaturedTopic[] = [
  {
    slug: 'pre-qin-research',
    title: '先秦历史综合研究',
    summary: '文明溯源、制度变革与思想奠基——重新审视中华文明的轴心时代。从史前传说到百家争鸣的深度解析。',
    content: preQinResearch
  }
];
