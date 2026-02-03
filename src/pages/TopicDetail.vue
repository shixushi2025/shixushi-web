<template>
  <section class="page">
    <!-- 模式 A: 深度研究文章 (Featured Topic) -->
    <div v-if="featuredTopic" class="article-view">
      <header class="page-header">
        <p class="eyebrow">Deep Research</p>
        <h1>{{ featuredTopic.title }}</h1>
        <p class="lead">{{ featuredTopic.summary }}</p>
      </header>

      <article class="markdown-body" v-html="renderedContent"></article>
    </div>

    <!-- 模式 B: 标签聚合时间线 (Tag Topic) -->
    <div v-else class="tag-view">
      <header class="page-header">
        <p class="eyebrow">Topic Timeline</p>
        <h1>{{ topicName }}史</h1>
        <p class="lead">共收录 {{ topicEvents.length }} 个关键节点</p>
      </header>

      <div class="timeline-container">
        <EventTimeline :events="topicEvents" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { marked } from 'marked';
import { events } from '@/data/events';
import { featuredTopics } from '@/data/featuredTopics';
import EventTimeline from '@/components/common/EventTimeline.vue';

const route = useRoute();
const slug = route.params.slug as string;

// 1. 尝试匹配深度专题
const featuredTopic = computed(() => {
  return featuredTopics.find(t => t.slug === slug);
});

// 渲染 Markdown
const renderedContent = computed(() => {
  if (!featuredTopic.value) return '';
  return marked.parse(featuredTopic.value.content);
});

// 2. 否则视为普通标签 Slug
const topicName = computed(() => decodeURIComponent(slug));

// 3. 聚合标签事件
const topicEvents = computed(() => {
  if (featuredTopic.value) return [];
  return events
    .filter(ev => ev.types?.includes(topicName.value as any))
    .sort((a, b) => (a.startYear || 0) - (b.startYear || 0));
});

watchEffect(() => {
  if (featuredTopic.value) {
    document.title = `${featuredTopic.value.title} - 深度研究 | 时序史`;
  } else if (topicName.value) {
    document.title = `${topicName.value}史 - 历史专题 | 时序史`;
  }
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

.tag-view {
  display: flex;
  flex-direction: column;
  gap: 32px;
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
  line-height: 1.6;
}

/* Markdown Styles */
.markdown-body {
  background: #fff;
  padding: 40px;
  border-radius: 24px;
  border: 1px solid var(--border-soft);
  color: #334155;
  line-height: 1.8;
  font-size: 16px;
}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3) {
  color: #1e293b;
  margin-top: 1.5em;
  margin-bottom: 0.8em;
  font-weight: 700;
}

.markdown-body :deep(h2) {
  font-size: 24px;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 12px;
}

.markdown-body :deep(h3) {
  font-size: 20px;
}

.markdown-body :deep(p) {
  margin-bottom: 1.2em;
  text-align: justify;
}

.markdown-body :deep(ul), 
.markdown-body :deep(ol) {
  margin-bottom: 1.2em;
  padding-left: 24px;
}

.markdown-body :deep(li) {
  margin-bottom: 0.5em;
}

.markdown-body :deep(blockquote) {
  margin: 1.5em 0;
  padding: 12px 20px;
  border-left: 4px solid var(--brand);
  background: #fffaf5;
  color: #555;
  font-style: italic;
}

.markdown-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 2em 0;
}

.markdown-body :deep(th),
.markdown-body :deep(td) {
  padding: 12px;
  border: 1px solid #e2e8f0;
  text-align: left;
}

.markdown-body :deep(th) {
  background: #f8fafc;
  font-weight: 600;
}

@media (max-width: 640px) {
  .page-header, .markdown-body {
    padding: 24px;
  }
  h1 { font-size: 28px; }
}
</style>
