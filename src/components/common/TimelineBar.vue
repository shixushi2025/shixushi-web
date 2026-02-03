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
  padding: 20px;
  border-radius: 24px;
  border: 1px solid var(--border-soft);
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 12px 30px rgba(51, 36, 8, 0.08);
}
.era-item {
  flex-grow: 1;
}
.era-item a {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  padding: 8px 16px;
  border-radius: 12px;
  border: 1px solid var(--border-soft, #e5e5e5);
  background: #fff;
  font-size: 13px;
  color: var(--text-body);
  line-height: 1.3;
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
  min-width: 80px;
}
.era-item a:hover {
  border-color: var(--brand, #b35b2a);
  background: #fff8f2;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(179, 91, 42, 0.15);
  z-index: 1;
}
.era-name {
  font-weight: bold;
  font-size: 14px;
  color: var(--text-heading, #2c1810);
  margin-bottom: 2px;
}
.era-range {
  font-size: 11px;
  color: var(--text-muted, #999);
  font-feature-settings: "tnum";
}

@media (max-width: 600px) {
  .timeline-bar {
    padding: 12px;
    gap: 6px;
    border-radius: 16px;
  }
  .era-item a {
    padding: 8px 10px;
  }
}
</style>
