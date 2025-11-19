<template>
  <div class="timeline" v-if="events.length">
    <div v-for="event in events" :key="event.id" class="timeline-item">
      <div class="time-column">
        <span class="time-label">{{ event.timeLabel }}</span>
        <span class="era-label">{{ event.eraName }}</span>
      </div>
      <div class="axis">
        <span class="dot"></span>
      </div>
      <article class="event-card">
        <header>
          <div class="tags">
            <span
              v-for="(type, idx) in event.types"
              :key="idx"
              class="tag"
            >
              {{ type }}
            </span>
          </div>
          <h3>{{ event.title }}</h3>
          <p class="summary">{{ event.summary }}</p>
        </header>
        <footer>
          <div class="meta">
            <span v-if="event.region?.length">地区：{{ event.region.join('、') }}</span>
            <span v-if="event.eraSlug">时期：{{ event.eraName }}</span>
          </div>
          <RouterLink :to="`/event/${event.id}-${event.slug}`" class="detail-link">
            查看详情 &rarr;
          </RouterLink>
        </footer>
      </article>
    </div>
  </div>
  <p v-else class="empty">暂无符合条件的事件。</p>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { Event } from '@/types/history';

defineProps<{
  events: Event[];
}>();
</script>

<style scoped>
.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-left: 8px;
}
.timeline-item {
  display: grid;
  grid-template-columns: 140px 40px minmax(0, 1fr);
  gap: 16px;
  align-items: flex-start;
}
.time-column {
  text-align: right;
  font-size: 14px;
  color: var(--text-muted);
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 4px;
}
.time-label {
  font-weight: 600;
  color: var(--text-strong);
}
.axis {
  position: relative;
  width: 40px;
  display: flex;
  justify-content: center;
}
.axis::before {
  content: '';
  position: absolute;
  left: calc(50% - 1px);
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border-soft);
}
.dot {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: var(--brand);
  margin-top: 8px;
  z-index: 1;
  border: 2px solid #fff;
  box-shadow: 0 0 0 4px rgba(247, 153, 68, 0.25);
}
.event-card {
  background: #fff;
  border-radius: 20px;
  border: 1px solid var(--border-soft);
  padding: 18px 20px;
  box-shadow: 0 12px 24px rgba(41, 28, 10, 0.09);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.event-card header h3 {
  margin: 8px 0 6px;
  font-size: 18px;
}
.summary {
  margin: 0;
  color: var(--text-body);
  font-size: 14px;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid rgba(247, 153, 68, 0.3);
  background: rgba(247, 153, 68, 0.12);
  color: var(--brand);
}
.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 12px;
  color: var(--text-muted);
}
.detail-link {
  margin-left: auto;
  font-weight: 600;
  color: var(--text-strong);
}
.empty {
  text-align: center;
  color: var(--text-muted);
  margin: 32px 0;
}

@media (max-width: 768px) {
  .timeline-item {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .time-column {
    text-align: left;
    flex-direction: row;
    gap: 12px;
  }
  .axis {
    display: none;
  }
}
</style>
