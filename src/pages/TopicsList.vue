<template>
  <section class="page">
    <header class="page-header">
      <p class="eyebrow">Topics</p>
      <h1>专题列表</h1>
      <p class="lead">战争、制度、科技、思想等专题会陆续上线，便于纵向阅读。</p>
    </header>

    <div class="topics-grid">
      <RouterLink v-for="topic in topics" :key="topic.slug" :to="`/topics/${topic.slug}`" class="topic-card">
        <span class="topic-tag">{{ topic.tag }}</span>
        <h3>{{ topic.title }}</h3>
        <p>{{ topic.summary }}</p>
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

const topics = [
  { tag: '制度', title: '制度变革与国家治理', summary: '横跨三千年的政治制度与治理工具演化。', slug: 'systems' },
  { tag: '军事', title: '关键战争与地缘格局', summary: '用战役与军事技术的升级来观察地缘稳定与扩张。', slug: 'wars' },
  { tag: '文化', title: '思想文化与学术流派', summary: '串联儒释道、理学、启蒙与新文化思潮。', slug: 'thought' },
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
  padding: 28px;
  border-radius: 28px;
  border: 1px solid var(--border-soft);
  box-shadow: 0 18px 34px rgba(24, 18, 10, 0.08);
}
.eyebrow {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--text-muted);
  margin-bottom: 8px;
}
.lead {
  margin: 0;
  color: var(--text-body);
}
.topics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}
.topic-card {
  border-radius: 22px;
  border: 1px solid var(--border-soft);
  padding: 20px;
  background: #fff;
  color: var(--text-body);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.topic-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 24px rgba(22, 16, 8, 0.12);
}
.topic-tag {
  font-size: 12px;
  letter-spacing: 0.12em;
  color: var(--text-muted);
  text-transform: uppercase;
}
.topic-card p {
  color: var(--text-muted);
}

@media (max-width: 640px) {
  .page-header {
    padding: 20px;
  }
}
</style>
