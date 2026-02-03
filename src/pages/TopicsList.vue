<template>
  <section class="page">
    <header class="page-header">
      <p class="eyebrow">Topics</p>
      <h1>历史专题索引</h1>
      <p class="lead">
        深度研究与自动聚合：通过 {{ featuredTopics.length + topics.length }} 个不同的切面，重新审视五千年历史脉络。
      </p>
    </header>

    <!-- 深度研究 (Featured) -->
    <section v-if="featuredTopics.length" class="featured-section">
      <h2 class="section-title">深度研究报告</h2>
      <div class="topics-grid featured-grid">
        <RouterLink
          v-for="topic in featuredTopics"
          :key="topic.slug"
          :to="`/topics/${topic.slug}`"
          class="topic-card featured"
        >
          <div class="topic-head">
            <span class="topic-tag featured-tag">Research</span>
            <span class="count-badge">深度长文</span>
          </div>
          <h3>{{ topic.title }}</h3>
          <p>{{ topic.summary }}</p>
        </RouterLink>
      </div>
    </section>

    <!-- 自动聚合 (Tags) -->
    <section>
      <h2 class="section-title">标签聚合专题</h2>
      <div class="topics-grid">
        <RouterLink 
          v-for="topic in topics" 
          :key="topic.tag" 
          :to="`/topics/${topic.tag}`" 
          class="topic-card"
          :class="getTopicClass(topic.count)"
        >
          <div class="topic-head">
            <span class="topic-tag">{{ topic.tag }}</span>
            <span class="count-badge">{{ topic.count }} 事件</span>
          </div>
          <h3>{{ topic.tag }}史</h3>
          <p>聚合 {{ topic.count }} 个相关历史节点，点击查看完整时间线。</p>
        </RouterLink>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { events } from '@/data/events';
import { featuredTopics } from '@/data/featuredTopics';

// 自动聚合 Topics
const topics = computed(() => {
  const counts: Record<string, number> = {};
  
  events.forEach(ev => {
    // 排除通用标签和非主题标签
    const validTypes = ev.types?.filter(t => !['历史事件', '世界史', '中国史', '古代'].includes(t)) || [];
    
    validTypes.forEach(t => {
      counts[t] = (counts[t] || 0) + 1;
    });
  });

  return Object.keys(counts)
    .map(tag => ({ tag, count: counts[tag] || 0 }))
    .sort((a, b) => b.count - a.count); // 按数量降序
});

function getTopicClass(count: number) {
  if (count >= 10) return 'hot';
  if (count >= 5) return 'medium';
  return 'normal';
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 1000px;
  margin: 0 auto;
}
.page-header {
  background: #fff;
  padding: 40px;
  border-radius: 24px;
  border: 1px solid var(--border-soft);
  text-align: center;
  background: linear-gradient(to bottom, #fff, #fbfbfa);
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
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #2c1810;
  margin-bottom: 20px;
  padding-left: 12px;
  border-left: 4px solid var(--brand);
}

.topics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

.topic-card {
  border-radius: 16px;
  border: 1px solid var(--border-soft);
  padding: 24px;
  background: #fff;
  text-decoration: none;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.topic-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.06);
  border-color: var(--brand);
}

/* Featured Style */
.topic-card.featured {
  background: #fffaf5;
  border-color: rgba(179, 91, 42, 0.3);
}
.featured-tag {
  background: var(--brand) !important;
  color: #fff !important;
}

/* 热度分级样式 */
.topic-card.hot {
  background: linear-gradient(135deg, #fff, #fff7ed);
  border-color: #ffedd5;
}
.topic-card.hot .topic-tag {
  color: #c2410c;
  background: #ffedd5;
}

.topic-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.topic-tag {
  font-size: 12px;
  font-weight: 700;
  color: #64748b;
  background: #f1f5f9;
  padding: 4px 8px;
  border-radius: 6px;
}
.count-badge {
  font-size: 12px;
  color: #94a3b8;
  font-weight: 600;
}

h3 {
  margin: 0;
  font-size: 18px;
  color: #1e293b;
}
p {
  margin: 0;
  color: #64748b;
  font-size: 14px;
  line-height: 1.5;
}

@media (max-width: 640px) {
  .page-header {
    padding: 24px;
  }
}
</style>
