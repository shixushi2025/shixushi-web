<!-- src/components/common/EventList.vue -->
<template>
  <ul class="events">
    <li v-for="e in events" :key="e.id">
      <RouterLink class="event-card" :to="`/event/${e.id}-${e.slug}`">
        <span class="bullet"></span>
        <div class="event-content">
          <span class="title">{{ e.title }}</span>
          <span class="meta">
            {{ e.timeLabel }}
            <template v-if="e.region?.length">
              · {{ e.region.join('、') }}
            </template>
          </span>
        </div>
        <span class="arrow">&rarr;</span>
      </RouterLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { Event } from '@/types/history';

defineProps<{
  events: Event[];
}>();
</script>

<style scoped>
.events {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.event-card {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #fff;
  border-radius: 16px;
  border: 1px solid var(--border-soft);
  box-shadow: 0 12px 24px rgba(27, 20, 8, 0.08);
  color: var(--text-body);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.event-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 28px rgba(27, 20, 8, 0.15);
}
.bullet {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: var(--brand);
}
.title {
  font-weight: 600;
  font-size: 15px;
}
.meta {
  display: block;
  font-size: 13px;
  color: var(--text-muted);
}
.arrow {
  font-size: 18px;
  color: var(--text-muted);
}

@media (max-width: 600px) {
  .event-card {
    grid-template-columns: auto 1fr;
    gap: 10px;
  }
  .arrow {
    display: none;
  }
}
</style>
