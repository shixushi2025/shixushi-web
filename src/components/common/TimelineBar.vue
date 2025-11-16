<template>
  <div class="timeline-bar">
    <div
      v-for="era in eras"
      :key="era.slug"
      class="era-item"
    >
      <RouterLink :to="`/era/${era.slug}`">
        <div class="era-name">{{ era.name }}</div>
        <div class="era-range">{{ era.startYear }}–{{ era.endYear }}</div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { Era } from '@/types/history';

defineProps<{
  eras: Era[];
}>();
</script>

<style scoped>
.timeline-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.era-item a {
  display: block;
  padding: 8px 12px;
  border-radius: 16px;
  border: 1px solid #ddd;
  text-decoration: none;
  font-size: 13px;
  color: #333;
}
.era-name {
  font-weight: 600;
}
.era-range {
  font-size: 11px;
  color: #777;
}
</style>
