<template>
  <section v-if="person" class="page">
    <header class="page-header">
      <div class="header-meta">
        <span class="dynasty-badge">{{ person.dynasty }}</span>
        <span v-if="person.title" class="title-badge">{{ person.title }}</span>
      </div>
      <h1>{{ person.name }}</h1>
      <p class="years">
        {{ formatYear(person.birthYear) }} – {{ formatYear(person.deathYear) }}
      </p>
      <div v-if="person.quote" class="quote-box">
        “{{ person.quote }}”
      </div>
    </header>

    <div class="content-grid">
      <!-- 左侧：主要信息 -->
      <div class="main-col">
        <article class="card">
          <h2>人物简介</h2>
          <p class="summary-text">{{ person.summary }}</p>
        </article>

        <article class="card" v-if="person.achievements && person.achievements.length">
          <h2>主要成就</h2>
          <ul class="achievement-list">
            <li v-for="(ach, idx) in person.achievements" :key="idx">
              <span class="check-icon">✓</span>
              {{ ach }}
            </li>
          </ul>
        </article>

        <article class="card" v-if="relatedEvents.length">
          <h2>相关历史事件</h2>
          <div class="event-links">
            <RouterLink 
              v-for="ev in relatedEvents" 
              :key="ev.id" 
              :to="`/event/${ev.id}-${ev.slug}`"
              class="event-link-card"
            >
              <span class="event-year">{{ ev.timeLabel }}</span>
              <span class="event-title">{{ ev.title }}</span>
              <span class="arrow">→</span>
            </RouterLink>
          </div>
        </article>
      </div>

      <!-- 右侧：侧边栏 -->
      <aside class="sidebar">
        <div class="side-card info-card">
          <h3>基本档案</h3>
          <dl>
            <dt>姓名</dt>
            <dd>{{ person.name }}</dd>
            <dt>身份</dt>
            <dd>{{ person.categories.join('、') }}</dd>
            <dt>朝代</dt>
            <dd>{{ person.dynasty }}</dd>
          </dl>
        </div>
      </aside>
    </div>
  </section>
  
  <div v-else class="not-found">
    <h2>未找到该人物信息</h2>
    <RouterLink to="/people">返回人物列表</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import peopleData from '@/data/people.json';
import eventsData from '@/data/events.json';

const route = useRoute();
// 兼容 /people/3001 或 /people/3001-confucius 格式
const idSlug = route.params.idSlug;
let idParam = '';
if (Array.isArray(idSlug)) {
  idParam = idSlug[0];
} else if (typeof idSlug === 'string') {
  idParam = idSlug;
}
const personId = parseInt(idParam.split('-')[0] || '0');

const person = computed(() => {
  return peopleData.find(p => p.id === personId);
});

const relatedEvents = computed(() => {
  if (!person.value || !person.value.relatedEventIds) return [];
  // @ts-ignore
  return eventsData.filter(ev => person.value!.relatedEventIds.includes(ev.id));
});

function formatYear(year?: number) {
  if (!year) return '?';
  return year < 0 ? `前 ${Math.abs(year)}` : year;
}
</script>

<style scoped>
.page {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* Header */
.page-header {
  background: #fff;
  border-radius: 24px;
  padding: 40px;
  text-align: center;
  border: 1px solid var(--border-soft);
  background: linear-gradient(to bottom, #fff, #fcfcfc);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}
.header-meta {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
}
.dynasty-badge, .title-badge {
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 600;
  letter-spacing: 0.05em;
}
.dynasty-badge {
  background: #2c1810;
  color: #fff;
}
.title-badge {
  background: #fff7ed;
  color: #c2410c;
  border: 1px solid #ffedd5;
}
h1 {
  font-size: 42px;
  margin: 0 0 8px;
  color: #1a202c;
  font-family: "Songti SC", serif;
}
.years {
  font-size: 16px;
  color: #64748b;
  font-variant-numeric: tabular-nums;
  margin: 0 0 24px;
}
.quote-box {
  display: inline-block;
  font-size: 20px;
  color: #5d4037;
  font-family: "Kaiti SC", "KaiTi", serif;
  position: relative;
  padding: 0 20px;
}

/* Grid Layout */
.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  align-items: start;
}
.main-col {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Cards */
.card {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid var(--border-soft);
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
h2 {
  font-size: 18px;
  margin: 0 0 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
}
.summary-text {
  font-size: 16px;
  line-height: 1.8;
  color: #334155;
}

/* Achievements */
.achievement-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.achievement-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  color: #475569;
}
.check-icon {
  color: var(--brand);
  font-weight: bold;
}

/* Event Links */
.event-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.event-link-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: #f8fafc;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
  border: 1px solid transparent;
}
.event-link-card:hover {
  background: #fff;
  border-color: var(--brand);
  box-shadow: 0 4px 12px rgba(247, 153, 68, 0.1);
  transform: translateX(4px);
}
.event-year {
  font-size: 13px;
  color: #94a3b8;
  font-weight: 600;
  min-width: 60px;
}
.event-title {
  font-weight: 600;
  color: #1e293b;
  flex-grow: 1;
}
.arrow {
  color: #cbd5e1;
}

/* Sidebar */
.info-card {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid var(--border-soft);
}
.info-card h3 {
  font-size: 16px;
  margin: 0 0 16px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
dl {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 12px 24px;
  margin: 0;
  font-size: 14px;
}
dt {
  color: #94a3b8;
}
dd {
  margin: 0;
  color: #1e293b;
  font-weight: 500;
  text-align: right;
}

.not-found {
  text-align: center;
  padding: 60px;
}

@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
  .page-header {
    padding: 24px;
  }
  h1 {
    font-size: 32px;
  }
}
</style>
