<template>
  <div class="current-grid">
    <article v-for="event in events" :key="event.id" class="current-card">
      <header class="card-head">
        <span class="pill" :class="pillClass(event)">{{ primaryType(event) }}</span>
        <span class="time">{{ formatEventTime(event) }}</span>
        <span class="region" v-if="event.region?.length">{{ event.region.map(formatRegion).join('、') }}</span>
      </header>
      <h3>{{ event.title }}</h3>
      <p class="summary">{{ event.summary }}</p>
      <dl class="insight" v-if="event.influence">
        <div>
          <dt>关注点</dt>
          <dd>{{ event.background }}</dd>
        </div>
        <div>
          <dt>最新进展</dt>
          <dd>{{ event.process }}</dd>
        </div>
        <div>
          <dt>影响观察</dt>
          <dd>{{ event.influence.shortTerm }}</dd>
        </div>
        <div>
          <dt>长期趋势</dt>
          <dd>{{ event.influence.longTerm }}</dd>
        </div>
      </dl>
    </article>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Event } from '@/types/history';
import { formatEventTime, formatRegion } from '@/utils/formatters';
import { getPrimaryCategory, CATEGORY_COLORS } from '@/data/taxonomy';

const props = defineProps<{
  events: Event[];
}>();

const events = computed(() => props.events);

const baseTypes = ['历史事件', '当代观察'];

const primaryType = (event: Event) => {
  return event.types.find(type => !baseTypes.includes(type)) ?? event.types[0] ?? '事件';
};

const pillClass = (event: Event) => {
  const label = primaryType(event);
  const parent = getPrimaryCategory(label);
  const colorKey = CATEGORY_COLORS[parent] || 'gray';
  return `pill-${colorKey}`;
};
</script>

<style scoped>
.current-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
}
.current-card {
  background: #fff;
  border-radius: 20px;
  border: 1px solid var(--border-soft);
  padding: 20px;
  box-shadow: 0 12px 24px rgba(38, 25, 9, 0.08);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.card-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-muted);
}
.pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 999px;
  font-weight: 600;
  border: 1px solid transparent;
}

/* 动态颜色定义 */
.pill-red { /* 政治 */
  background: rgba(235, 87, 87, 0.1);
  color: #b01d1d;
  border-color: rgba(235, 87, 87, 0.4);
}
.pill-orange { /* 军事 */
  background: rgba(245, 158, 11, 0.1);
  color: #b45309;
  border-color: rgba(245, 158, 11, 0.4);
}
.pill-yellow { /* 经济 */
  background: rgba(255, 166, 43, 0.1);
  color: #c26400;
  border-color: rgba(255, 166, 43, 0.4);
}
.pill-blue { /* 科技 */
  background: rgba(59, 130, 246, 0.12);
  color: #1d4ed8;
  border-color: rgba(59, 130, 246, 0.35);
}
.pill-purple { /* 文化 */
  background: rgba(147, 51, 234, 0.1);
  color: #7e22ce;
  border-color: rgba(147, 51, 234, 0.35);
}
.pill-gray { /* 社会/其他 */
  background: rgba(107, 114, 128, 0.1);
  color: #374151;
  border-color: rgba(107, 114, 128, 0.3);
}
.pill-cyan { /* 世界史 */
  background: rgba(6, 182, 212, 0.1);
  color: #0e7490;
  border-color: rgba(6, 182, 212, 0.35);
}

.time {
  font-weight: 600;
  color: var(--text-strong);
}
.summary {
  margin: 0;
  color: var(--text-body);
}
.insight {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.insight div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.insight dt {
  font-size: 12px;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  text-transform: uppercase;
}
.insight dd {
  margin: 0;
  font-size: 14px;
  color: var(--text-body);
}
</style>
