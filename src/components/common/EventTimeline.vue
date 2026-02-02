<template>
  <div class="timeline" v-if="events.length">
    <div v-for="event in events" :key="event.id" class="timeline-item">
      <div class="time-column">
        <span class="time-label">{{ formatEventTime(event) }}</span>
        <span class="era-label">{{ getEraName(event.eraSlug) }}</span>
      </div>
      <div class="axis">
        <span class="dot" :class="{ 'dot-world': isWorldEvent(event) }"></span>
      </div>
      <article class="event-card" :class="{ 'is-world': isWorldEvent(event) }">
        <header>
          <div class="tags">
            <span
              v-for="(type, idx) in event.types"
              :key="idx"
              class="tag"
              :class="{ 'tag-world': type === '世界史' }"
            >
              {{ type }}
            </span>
          </div>
          <h3>{{ event.title }}</h3>
          <p class="summary">{{ event.summary }}</p>
        </header>

        <!-- 史料原文展示区域 -->
        <div v-if="hasQuotes(event)" class="source-quote-box">
          <details>
            <summary>📜 史料实证</summary>
            <div class="source-content">
              <blockquote v-for="(src, idx) in event.sources" :key="idx" v-show="src.quote">
                <p v-if="src.quote" class="quote-text">“{{ src.quote }}”</p>
                <cite>
                  — {{ src.title }}
                  <a v-if="src.url" :href="src.url" target="_blank" rel="noopener" title="查看原文">↗</a>
                </cite>
              </blockquote>
            </div>
          </details>
        </div>

        <footer>
          <div class="meta">
            <span v-if="event.region?.length">地区：{{ event.region.map(formatRegion).join('、') }}</span>
            <span v-if="event.eraSlug">时期：{{ getEraName(event.eraSlug) }}</span>
          </div>
          <RouterLink :to="`/event/${event.id}-${event.slug}`" class="detail-link">
            查看详情 &rarr;
          </RouterLink>
        </footer>
      </article>
    </div>
  </div>
  <p v-else class="empty">暂无符合条件的事件。</p>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { Event } from '@/types/history';
import { formatEventTime, formatRegion, getEraName } from '@/utils/formatters';

defineProps<{
  events: Event[];
}>();

const isWorldEvent = (ev: Event) => ev.types && ev.types.includes('世界史');
const hasQuotes = (ev: Event) => ev.sources && ev.sources.some(s => s.quote);
</script>

<style scoped>
.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-left: 8px;
}
.timeline-item {
  display: grid;
  grid-template-columns: 140px 40px minmax(0, 1fr);
  gap: 16px;
  align-items: flex-start;
}
.time-column {
  text-align: right;
  font-size: 14px;
  color: var(--text-muted);
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 4px;
}
.time-label {
  font-weight: 600;
  color: var(--text-strong);
}
.axis {
  position: relative;
  width: 40px;
  display: flex;
  justify-content: center;
}
.axis::before {
  content: '';
  position: absolute;
  left: calc(50% - 1px);
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border-soft);
}
.dot {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: var(--brand);
  margin-top: 8px;
  z-index: 1;
  border: 2px solid #fff;
  box-shadow: 0 0 0 4px rgba(247, 153, 68, 0.25);
}
/* 世界史节点样式 */
.dot.dot-world {
  background: #718096;
  box-shadow: 0 0 0 4px rgba(113, 128, 150, 0.25);
}

.event-card {
  background: #fff;
  border-radius: 20px;
  border: 1px solid var(--border-soft);
  padding: 18px 20px;
  box-shadow: 0 12px 24px rgba(41, 28, 10, 0.09);
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.2s ease;
}
/* 世界史卡片样式 */
.event-card.is-world {
  background: #f7fafc;
  border-color: #cbd5e0;
}
.event-card.is-world h3 {
  color: #2d3748;
}

.event-card header h3 {
  margin: 8px 0 6px;
  font-size: 18px;
}
.summary {
  margin: 0;
  color: var(--text-body);
  font-size: 14px;
  line-height: 1.6;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid rgba(247, 153, 68, 0.3);
  background: rgba(247, 153, 68, 0.12);
  color: var(--brand);
}
.tag.tag-world {
  border-color: #cbd5e0;
  background: #e2e8f0;
  color: #4a5568;
}

/* 史料引用区域 */
.source-quote-box {
  margin-top: 4px;
  margin-bottom: 4px;
}
.source-quote-box details {
  border-top: 1px dashed var(--border-soft);
  padding-top: 8px;
}
.source-quote-box summary {
  cursor: pointer;
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 500;
  user-select: none;
  list-style: none; /* 隐藏默认三角 */
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.source-quote-box summary::-webkit-details-marker {
  display: none;
}
.source-quote-box summary:hover {
  color: var(--brand);
}
.source-content {
  margin-top: 10px;
  padding: 12px 16px;
  background: #fffbf5; /* 暖色仿纸背景 */
  border-radius: 8px;
  border-left: 3px solid #d4b483;
}
.quote-text {
  margin: 0 0 6px;
  font-size: 14px;
  line-height: 1.7;
  color: #5d4037; /* 深褐色字体 */
  font-family: "Songti SC", "SimSun", "Noto Serif SC", serif;
  font-style: italic;
}
.source-content cite {
  display: block;
  text-align: right;
  font-size: 12px;
  color: #8d6e63;
  font-style: normal;
}
.source-content a {
  text-decoration: none;
  color: var(--brand);
  margin-left: 4px;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 12px;
  color: var(--text-muted);
}
.detail-link {
  margin-left: auto;
  font-weight: 600;
  color: var(--text-strong);
}
.empty {
  text-align: center;
  color: var(--text-muted);
  margin: 32px 0;
}

@media (max-width: 768px) {
  .timeline-item {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .time-column {
    text-align: left;
    flex-direction: row;
    gap: 12px;
  }
  .axis {
    display: none;
  }
}
</style>
