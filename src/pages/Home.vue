<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <p class="eyebrow">时序史 · 时间宇宙</p>
        <h1>纵向时间线，串联历史与当下的所有事件</h1>
        <p class="subtitle">
          不限制模块，所有事件都按照时间顺序排列。选择你关心的类别，或直接阅读全量时间流。
        </p>
        <div class="hero-actions">
          <RouterLink to="/china" class="btn primary">进入历史模块</RouterLink>
          <RouterLink to="/world" class="btn ghost">查看世界/专题</RouterLink>
        </div>
        <ul class="stats">
          <li v-for="stat in stats" :key="stat.label">
            <span class="value">{{ stat.value }}</span>
            <span class="label">{{ stat.label }}</span>
          </li>
        </ul>
      </div>
      <div class="hero-panel">
        <h3>精选视角</h3>
        <ul>
          <li v-for="item in heroHighlights" :key="item.label">
            <span class="pill">{{ item.pill }}</span>
            <p class="title">{{ item.label }}</p>
            <p class="desc">{{ item.desc }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="filter-panel">
      <div class="filter-controls">
        <div class="category-list">
          <button
            v-for="option in categoryOptions"
            :key="option.key"
            class="category-btn"
            :class="{ active: selectedCategory === option.key }"
            @click="selectCategory(option.key)"
          >
            {{ option.label }}
          </button>
        </div>
        <label class="search-box">
          <span>检索</span>
          <input
            v-model="keyword"
            type="text"
            placeholder="输入事件、年份或关键词"
          />
        </label>
      </div>
      <p class="filter-hint">
        当前选择：<strong>{{ activeCategoryLabel }}</strong> · 匹配
        <strong>{{ totalEvents }}</strong> 条事件
      </p>
    </section>

    <section class="timeline-section">
      <div class="section-head">
        <div>
          <h2>全局时间序列</h2>
          <p>纵向排列所有历史与当代事件，阅读时无须在不同页面跳转。</p>
        </div>
        <span class="result-info">显示 {{ displayedEvents.length }} / {{ totalEvents }}</span>
      </div>
      <EventTimeline :events="displayedEvents" />
      <button v-if="showMore" class="load-more" @click="loadMore">加载更多</button>
    </section>

    <section class="section current-panel">
      <div class="section-head">
        <div>
          <h2>当下观察</h2>
          <p>记录经济、政治、科技等正在发生的事项，用与历史相同的结构梳理。</p>
        </div>
      </div>
      <CurrentEventBoard :events="currentSpotlights" />
    </section>

    <section class="section modules-panel">
      <div class="section-head">
        <div>
          <h2>深度模块</h2>
          <p>在专门的页面中阅读分模块的细化内容。</p>
        </div>
      </div>
      <div class="module-grid">
        <RouterLink
          v-for="card in moduleCards"
          :key="card.title"
          :to="card.link"
          class="module-card"
          :style="getCardStyle(card.focusKey)"
        >
          <div class="module-card__header">
            <span class="pill" :style="getPillStyle(card.focusKey)">
              <span class="pill-icon" aria-hidden="true">{{ getFocusMeta(card.focusKey).icon }}</span>
              {{ card.focus }} · {{ card.tag }}
            </span>
            <span class="module-illustration" aria-hidden="true">{{ getFocusMeta(card.focusKey).glyph }}</span>
          </div>
          <h3>{{ card.title }}</h3>
          <p class="module-subtitle">{{ card.subtitle }}</p>
          <p>{{ card.desc }}</p>
          <span class="module-link">
            <span class="label">{{ card.cta }}</span>
            <span class="arrow" aria-hidden="true">→</span>
          </span>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { computed, ref, watch } from 'vue';
import EventTimeline from '@/components/common/EventTimeline.vue';
import CurrentEventBoard from '@/components/home/CurrentEventBoard.vue';
import type { Event } from '@/types/history';
import { events, contemporaryEvents } from '@/data/events';

const stats = [
  { label: '事件条目', value: '690+' },
  { label: '专题草案', value: '30+' },
  { label: '观测更新', value: '每周' },
];

const heroHighlights = [
  { pill: '历史环节', label: '从王朝到制度', desc: '宏观把握大一统与分裂时期、制度变革、文化流变。' },
  { pill: '现实脉搏', label: '关注政策与产业', desc: '把经济、科技、政治节点纳入同一时间叙事。' },
  { pill: '跨模块', label: '历史与当下互证', desc: '通过专题和人物勾连不同事件，让过去照亮当下。' },
];

const categoryOptions = [
  { key: 'all', label: '全部' },
  { key: 'history', label: '历史' },
  { key: 'economy', label: '经济' },
  { key: 'politics', label: '政治' },
  { key: 'tech', label: '科技' },
  { key: 'society', label: '社会' },
  { key: 'today', label: '当下观察' },
];

const categoryKeywordMap: Record<string, string[]> = {
  history: ['历史事件'],
  economy: ['经济', '金融创新'],
  politics: ['政治'],
  tech: ['科技', '算力基础设施'],
  society: ['社会'],
  today: ['当代观察'],
};

const moduleCards = [
  {
    focus: '历史',
    focusKey: 'history',
    title: '中国历史时间线',
    subtitle: '王朝更迭与制度脉络',
    desc: '从夏商周到近现代，查看朝代阶段、人物、事件详情。',
    link: '/china',
    cta: '进入历史模块',
    tag: '年代轴',
  },
  {
    focus: '世界',
    focusKey: 'world',
    title: '世界重大事件',
    subtitle: '全球视角下的时代转折',
    desc: '同步全球战争、工业化、地缘节点，与中国进程对照。',
    link: '/world',
    cta: '浏览世界线',
    tag: '对照阅读',
  },
  {
    focus: '专题',
    focusKey: 'topic',
    title: '专题与人物',
    subtitle: '制度·思想·科技的专题档案',
    desc: '围绕制度、战争、思想、科技开展纵深阅读，串联更多关联。',
    link: '/topics',
    cta: '查看专题索引',
    tag: '深度策展',
  },
  {
    focus: '人物',
    focusKey: 'people',
    title: '人物索引',
    subtitle: '人物谱系与影响轨迹',
    desc: '查看皇帝、政治人物、科学家等的生平与相关事件。',
    link: '/people',
    cta: '阅读人物传记',
    tag: '传记目录',
  },
];

type FocusMeta = { gradient: string; accent: string; icon: string; glyph: string };

const focusMeta: Record<string, FocusMeta> = {
  history: {
    gradient: 'linear-gradient(135deg, rgba(247, 153, 68, 0.14), rgba(255, 227, 199, 0.8))',
    accent: '#f79944',
    icon: '⏳',
    glyph: '📜',
  },
  world: {
    gradient: 'linear-gradient(135deg, rgba(40, 115, 255, 0.16), rgba(218, 232, 255, 0.9))',
    accent: '#2873ff',
    icon: '🌐',
    glyph: '🗺️',
  },
  topic: {
    gradient: 'linear-gradient(135deg, rgba(128, 90, 213, 0.16), rgba(233, 224, 255, 0.9))',
    accent: '#805ad5',
    icon: '📂',
    glyph: '🎯',
  },
  people: {
    gradient: 'linear-gradient(135deg, rgba(0, 196, 140, 0.14), rgba(214, 246, 237, 0.9))',
    accent: '#00c48c',
    icon: '👥',
    glyph: '🧭',
  },
};

const defaultFocusMeta: FocusMeta = focusMeta.history!;

const getFocusMeta = (key: string): FocusMeta => {
  const meta = focusMeta[key];
  return meta ?? defaultFocusMeta;
};

const getCardStyle = (key: string) => ({
  backgroundImage: getFocusMeta(key).gradient,
  borderColor: `${getFocusMeta(key).accent}33`,
  boxShadow: `0 16px 30px ${getFocusMeta(key).accent}22`,
});

const getPillStyle = (key: string) => ({
  background: `${getFocusMeta(key).accent}12`,
  color: getFocusMeta(key).accent,
  borderColor: `${getFocusMeta(key).accent}40`,
});

const selectedCategory = ref('all');
const keyword = ref('');
const limit = ref(25);

const matchCategory = (event: Event, key: string) => {
  if (key === 'all') return true;
  const keywords = categoryKeywordMap[key] ?? [];
  return keywords.some(tag => event.types.includes(tag));
};

const filteredEvents = computed(() => {
  const query = keyword.value.trim().toLowerCase();
  return events
    .filter(event => matchCategory(event, selectedCategory.value))
    .filter(event => {
      if (!query) return true;
      const fields = [event.title, event.summary, event.timeLabel, event.eraName];
      return fields.some(field => field?.toLowerCase().includes(query));
    });
});

const displayedEvents = computed(() => filteredEvents.value.slice(0, limit.value));
const totalEvents = computed(() => filteredEvents.value.length);
const showMore = computed(() => totalEvents.value > limit.value);
const activeCategoryLabel = computed(
  () => categoryOptions.find(option => option.key === selectedCategory.value)?.label ?? '全部'
);
const currentSpotlights = computed(() => contemporaryEvents.slice(0, 3));

const selectCategory = (key: string) => {
  selectedCategory.value = key;
};

const loadMore = () => {
  limit.value += 25;
};

watch(selectedCategory, () => {
  limit.value = 25;
});

watch(keyword, () => {
  limit.value = 25;
});
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 48px;
}
.hero {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px;
  padding: 40px;
  border-radius: 32px;
  background: linear-gradient(135deg, #fff2e0, #f2e1cf);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 25px 60px rgba(92, 65, 32, 0.25);
}
.hero-content h1 {
  font-size: clamp(28px, 4vw, 40px);
  margin-bottom: 16px;
}
.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 12px;
}
.subtitle {
  color: var(--text-body);
  max-width: 520px;
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 999px;
  border: 1px solid var(--text-strong);
  font-size: 14px;
  font-weight: 600;
}
.btn.primary {
  background: var(--text-strong);
  color: #fff;
}
.btn.ghost {
  background: transparent;
  color: var(--text-strong);
}
.stats {
  list-style: none;
  padding: 0;
  margin: 28px 0 0;
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}
.stats li {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.stats .value {
  font-size: 24px;
  font-weight: 700;
}
.stats .label {
  font-size: 12px;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}
.hero-panel {
  background: rgba(255, 255, 255, 0.82);
  border-radius: 24px;
  padding: 20px 24px;
  border: 1px solid rgba(255, 255, 255, 0.6);
}
.hero-panel ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.hero-panel li {
  padding-bottom: 12px;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
}
.hero-panel li:last-child {
  border-bottom: none;
}
.hero-panel .pill {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 12px;
  background: var(--bg-muted);
  color: var(--text-muted);
  margin-bottom: 6px;
}
.hero-panel .title {
  font-weight: 600;
  margin-bottom: 4px;
}
.hero-panel .desc {
  font-size: 13px;
  color: var(--text-muted);
}
.filter-panel {
  background: #fff;
  border-radius: 24px;
  padding: 20px 24px;
  border: 1px solid var(--border-soft);
  box-shadow: 0 12px 24px rgba(30, 20, 8, 0.08);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.filter-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
}
.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.category-btn {
  border: 1px solid var(--border-soft);
  background: #fff;
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
}
.category-btn.active {
  background: rgba(247, 153, 68, 0.16);
  border-color: rgba(247, 153, 68, 0.4);
  color: var(--brand);
}
.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text-muted);
}
.search-box input {
  border: 1px solid var(--border-soft);
  border-radius: 12px;
  padding: 8px 12px;
  font-size: 14px;
  min-width: 200px;
}
.filter-hint {
  margin: 0;
  font-size: 13px;
  color: var(--text-muted);
}
.timeline-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.section-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
}
.section-head h2 {
  margin-bottom: 4px;
}
.result-info {
  font-size: 13px;
  color: var(--text-muted);
}
.load-more {
  align-self: center;
  border: 1px solid var(--border-soft);
  background: #fff;
  border-radius: 999px;
  padding: 10px 26px;
  font-weight: 600;
  color: var(--text-strong);
}
.section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.module-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 18px;
}
.module-card {
  border-radius: 22px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: inherit;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  background-color: #fff;
}
.module-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 32px rgba(18, 12, 4, 0.12);
}
.module-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.module-card .pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid transparent;
  font-size: 12px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: var(--bg-muted);
}
.pill-icon {
  font-size: 14px;
}
.module-illustration {
  font-size: 28px;
  opacity: 0.8;
}
.module-subtitle {
  margin: 0;
  color: var(--text-strong);
  font-weight: 600;
  font-size: 14px;
}
.module-card p {
  margin: 0;
  color: var(--text-muted);
}
.module-link {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 999px;
  font-weight: 700;
  color: var(--text-strong);
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.06);
  width: fit-content;
}
.module-link .arrow {
  font-size: 16px;
}

@media (max-width: 768px) {
  .hero {
    padding: 28px 20px;
    border-radius: 20px;
  }
  .filter-controls {
    flex-direction: column;
    align-items: flex-start;
  }
  .search-box input {
    width: 100%;
  }
  .category-list {
    width: 100%;
  }
  .section-head {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
