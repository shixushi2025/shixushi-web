<template>
  <section class="page">
    <header class="page-header">
      <p class="eyebrow">Topic Timeline</p>
      <h1>{{ topicName }}史</h1>
      <p class="lead">共收录 {{ topicEvents.length }} 个关键节点</p>
    </header>

    <div class="timeline-container">
      <EventTimeline :events="topicEvents" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { events } from '@/data/events';
import EventTimeline from '@/components/common/EventTimeline.vue';

const route = useRoute();
const slug = route.params.slug as string;

const topicName = computed(() => decodeURIComponent(slug));

import { watchEffect } from 'vue';
watchEffect(() => {
  if (topicName.value) {
    document.title = `${topicName.value}史 - 历史专题 | 时序史 · 时间宇宙`;
  }
});

const topicEvents = computed(() => {
  return events
    .filter(ev => ev.types?.includes(topicName.value))
    .sort((a, b) => (a.startYear || 0) - (b.startYear || 0));
});
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 900px;
  margin: 0 auto;
}
.page-header {
  text-align: center;
  padding: 40px;
  background: #fff;
  border-radius: 24px;
  border: 1px solid var(--border-soft);
  background: linear-gradient(to bottom, #fff, #fdfbf7);
}
.eyebrow {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--brand);
  font-weight: 600;
  margin-bottom: 12px;
}
h1 {
  font-size: 36px;
  margin: 0 0 12px;
  color: #1a202c;
  font-family: "Songti SC", serif;
}
.lead {
  margin: 0;
  color: #64748b;
  font-variant-numeric: tabular-nums;
}
</style>
