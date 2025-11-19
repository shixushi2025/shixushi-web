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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  padding: 20px;
  border-radius: 24px;
  border: 1px solid var(--border-soft);
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 12px 30px rgba(51, 36, 8, 0.08);
}
.era-item a {
  display: block;
  padding: 12px 16px;
  border-radius: 18px;
  border: 1px solid transparent;
  background: var(--bg-muted);
  font-size: 13px;
  color: var(--text-body);
  line-height: 1.4;
  transition: transform 0.2s ease, border 0.2s ease, box-shadow 0.2s ease;
}
.era-item a:hover {
  border-color: var(--brand);
  box-shadow: 0 10px 18px rgba(56, 33, 10, 0.12);
  transform: translateY(-2px);
}
.era-name {
  font-weight: 600;
  font-size: 14px;
}
.era-range {
  font-size: 12px;
  color: var(--text-muted);
}

@media (max-width: 600px) {
  .timeline-bar {
    padding: 16px;
    border-radius: 18px;
  }
}
</style>
