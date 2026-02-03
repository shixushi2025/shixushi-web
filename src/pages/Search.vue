<template>
  <section class="page">
    <header class="page-header">
      <p class="eyebrow">Search Results</p>
      <h1>“{{ query }}” 的搜索结果</h1>
      <p class="lead">
        共找到 {{ totalCount }} 条匹配内容
        <span v-if="totalCount === 0">，请尝试更换关键词。</span>
      </p>
    </header>

    <div v-if="totalCount > 0" class="results-container">
      <!-- 人物结果 -->
      <section v-if="matchedPeople.length" class="result-group">
        <h2>人物 ({{ matchedPeople.length }})</h2>
        <div class="card-grid">
          <RouterLink 
            v-for="p in matchedPeople" 
            :key="p.id" 
            :to="`/people/${p.id}`"
            class="result-card person-card"
          >
            <div class="icon">👤</div>
            <div class="info">
              <h3>{{ p.name }} <span class="tag">{{ p.dynasty }}</span></h3>
              <p>{{ p.summary }}</p>
            </div>
          </RouterLink>
        </div>
      </section>

      <!-- 朝代结果 -->
      <section v-if="matchedEras.length" class="result-group">
        <h2>朝代 ({{ matchedEras.length }})</h2>
        <div class="card-grid">
          <RouterLink 
            v-for="e in matchedEras" 
            :key="e.id" 
            :to="`/era/${e.slug}`"
            class="result-card era-card"
          >
            <div class="icon">⛩️</div>
            <div class="info">
              <h3>{{ e.name }}</h3>
              <p>{{ e.startYear }} — {{ e.endYear }}</p>
            </div>
          </RouterLink>
        </div>
      </section>

      <!-- 事件结果 -->
      <section v-if="matchedEvents.length" class="result-group">
        <h2>历史事件 ({{ matchedEvents.length }})</h2>
        <div class="list-view">
          <RouterLink 
            v-for="ev in matchedEvents" 
            :key="ev.id" 
            :to="`/event/${ev.id}-${ev.slug}`"
            class="list-item"
          >
            <span class="time">{{ formatEventTime(ev) }}</span>
            <span class="title">{{ ev.title }}</span>
            <span class="era-badge">{{ getEraName(ev.eraSlug) }}</span>
          </RouterLink>
        </div>
      </section>
    </div>

    <div v-else class="empty-state">
      <div class="empty-icon">🔍</div>
      <p>没有找到相关内容</p>
      <div class="suggestions">
        <p>试试搜索：</p>
        <div class="tags">
          <RouterLink to="/search?q=李白">李白</RouterLink>
          <RouterLink to="/search?q=改革">改革</RouterLink>
          <RouterLink to="/search?q=唐朝">唐朝</RouterLink>
          <RouterLink to="/search?q=战争">战争</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import Fuse from 'fuse.js';
import { events } from '@/data/events';
import peopleData from '@/data/people.json';
import { eras } from '@/data/eras';
import { formatEventTime, getEraName } from '@/utils/formatters';

const route = useRoute();
const query = computed(() => (route.query.q as string || '').trim());

// 配置 Fuse
const peopleFuse = new Fuse(peopleData, {
  keys: [
    { name: 'name', weight: 2 },
    { name: 'title', weight: 1.5 },
    { name: 'summary', weight: 1 },
    'achievements'
  ],
  threshold: 0.3,
});

const eraFuse = new Fuse(eras, {
  keys: [
    { name: 'name', weight: 2 },
    'summary'
  ],
  threshold: 0.3,
});

const eventFuse = new Fuse(events, {
  keys: [
    { name: 'title', weight: 2 },
    { name: 'summary', weight: 1.2 },
    'background',
    'process'
  ],
  threshold: 0.3,
});

// 搜索逻辑
const matchedPeople = computed(() => {
  if (!query.value) return [];
  return peopleFuse.search(query.value).map(r => r.item);
});

const matchedEras = computed(() => {
  if (!query.value) return [];
  return eraFuse.search(query.value).map(r => r.item);
});

const matchedEvents = computed(() => {
  if (!query.value) return [];
  return eventFuse.search(query.value).map(r => r.item);
});

const totalCount = computed(() => matchedPeople.value.length + matchedEras.value.length + matchedEvents.value.length);
</script>

<style scoped>
.page {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.page-header {
  background: #fff;
  padding: 32px;
  border-radius: 24px;
  border: 1px solid var(--border-soft);
  text-align: center;
}
.eyebrow {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  margin-bottom: 8px;
}
h1 {
  font-size: 28px;
  margin: 0 0 8px;
  color: var(--text-strong);
}
.lead {
  margin: 0;
  color: var(--text-body);
}

.results-container {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

h2 {
  font-size: 18px;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border-soft);
  color: var(--text-muted);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.result-card {
  background: #fff;
  border: 1px solid var(--border-soft);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
}
.result-card:hover {
  border-color: var(--brand);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
.icon {
  font-size: 24px;
  background: var(--bg-muted);
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}
.info h3 {
  margin: 0 0 4px;
  font-size: 16px;
  color: var(--text-strong);
}
.info p {
  margin: 0;
  font-size: 13px;
  color: var(--text-muted);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.tag {
  font-size: 11px;
  background: var(--bg-muted);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--text-muted);
  margin-left: 6px;
  font-weight: normal;
}

.list-view {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.list-item {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #fff;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid var(--border-soft);
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
}
.list-item:hover {
  border-color: var(--brand);
  background: #fffbf5;
}
.time {
  font-size: 13px;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
  width: 80px;
  flex-shrink: 0;
}
.title {
  font-weight: 600;
  color: var(--text-strong);
  flex-grow: 1;
}
.era-badge {
  font-size: 12px;
  color: #94a3b8;
  background: #f1f5f9;
  padding: 2px 8px;
  border-radius: 99px;
}

.empty-state {
  text-align: center;
  padding: 60px 0;
  color: var(--text-muted);
}
.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.3;
}
.suggestions {
  margin-top: 24px;
}
.tags {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 8px;
}
.tags a {
  background: #fff;
  border: 1px solid var(--border-soft);
  padding: 6px 16px;
  border-radius: 99px;
  text-decoration: none;
  color: var(--brand);
  font-size: 14px;
  transition: all 0.2s;
}
.tags a:hover {
  border-color: var(--brand);
  background: var(--brand);
  color: #fff;
}
</style>
