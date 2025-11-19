<template>
  <section class="page">
    <header class="page-header">
      <p class="eyebrow">World Timeline</p>
      <h1>世界重大事件时间线</h1>
      <p class="lead">
        聚焦对全球格局与中国进程产生重要影响的节点，后续将扩展至更多地区、领域与专题视角。
      </p>
    </header>

    <EventList :events="worldPreviewEvents" />

    <div class="focus-grid">
      <article v-for="area in focusAreas" :key="area.title">
        <h3>{{ area.title }}</h3>
        <p>{{ area.desc }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import EventList from '@/components/common/EventList.vue';
import { worldPreviewEvents } from '@/data/events';

const focusAreas = [
  { title: '全球战争与和平秩序', desc: '记录两次世界大战、冷战以及地区冲突对国际秩序的重塑。' },
  { title: '科学革命与工业化', desc: '追踪科技突破与产业革命如何改变生产方式与社会结构。' },
  { title: '殖民体系与民族独立', desc: '关注殖民扩张、独立浪潮以及新兴国家的诞生。' },
];
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.page-header {
  background: #fff;
  border-radius: 28px;
  padding: 28px;
  border: 1px solid var(--border-soft);
  box-shadow: 0 20px 36px rgba(24, 20, 15, 0.08);
}
.eyebrow {
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 8px;
}
.lead {
  margin: 0;
  color: var(--text-body);
}
.focus-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}
.focus-grid article {
  background: #fff;
  border-radius: 20px;
  padding: 18px;
  border: 1px dashed var(--border-soft);
  color: var(--text-body);
}
.focus-grid p {
  margin: 0;
  color: var(--text-muted);
}

@media (max-width: 640px) {
  .page-header {
    padding: 20px;
  }
}
</style>
