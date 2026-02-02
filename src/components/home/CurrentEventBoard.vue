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
  if (label.includes('经')) return 'pill-economy';
  if (label.includes('政')) return 'pill-politics';
  if (label.includes('科') || label.includes('技')) return 'pill-tech';
  return 'pill-generic';
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
.pill-economy {
  background: rgba(255, 166, 43, 0.1);
  color: #c26400;
  border-color: rgba(255, 166, 43, 0.4);
}
.pill-politics {
  background: rgba(235, 87, 87, 0.1);
  color: #b01d1d;
  border-color: rgba(235, 87, 87, 0.4);
}
.pill-tech {
  background: rgba(59, 130, 246, 0.12);
  color: #1d4ed8;
  border-color: rgba(59, 130, 246, 0.35);
}
.pill-generic {
  background: rgba(103, 80, 31, 0.1);
  color: #5c3b09;
  border-color: rgba(103, 80, 31, 0.4);
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
