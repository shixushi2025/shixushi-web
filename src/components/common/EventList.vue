<!-- src/components/common/EventList.vue -->
<template>
  <ul class="events">
    <li v-for="e in events" :key="e.id">
      <RouterLink :to="`/event/${e.id}-${e.slug}`">
        <span class="time">{{ e.timeLabel }}</span>
        <span class="title">{{ e.title }}</span>
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
}
.events li {
  padding: 6px 0;
}
.events a {
  text-decoration: none;
  color: #333;
  font-size: 14px;
}
.time {
  color: #777;
  margin-right: 8px;
}
</style>
