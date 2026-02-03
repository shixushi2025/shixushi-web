<template>
  <section class="page">
    <header class="page-header">
      <p class="eyebrow">Dynasty Index</p>
      <h1>历代王朝索引</h1>
      <p class="lead">
        中华文明脉络的骨架。点击卡片进入该朝代的详细编年史。
      </p>
    </header>

    <div class="timeline-group-container">
      <section
        v-for="group in groupedEras"
        :key="group.period"
        class="period-section"
      >
        <div class="period-header">
          <h2 class="period-title">{{ group.period }}</h2>
          <div class="period-line"></div>
        </div>

        <div class="era-grid">
          <RouterLink
            v-for="era in group.list"
            :key="era.slug"
            :to="`/era/${era.slug}`"
            class="era-card"
          >
            <div class="card-inner">
              <header class="card-head">
                <div class="era-title-row">
                  <h3 class="era-name">{{ era.name }}</h3>
                  <span class="era-years">
                    {{ formatYear(era.startYear) }} — {{ formatYear(era.endYear) }}
                  </span>
                </div>
              </header>
              <p class="summary">{{ era.summary }}</p>
            </div>
            <div class="card-decoration"></div>
          </RouterLink>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { eras } from '@/data/eras';
import type { Era } from '@/types/history';

// 格式化年份
const formatYear = (y: number) => (y < 0 ? `前${Math.abs(y)}` : `${y}`);

// 分组逻辑
const groupedEras = computed(() => {
  const groups: Record<string, Era[]> = {};
  const order: string[] = [];

  eras.forEach(era => {
    const p = era.broadPeriod || '其他';
    if (!groups[p]) {
      groups[p] = [];
      order.push(p);
    }
    groups[p].push(era);
  });

  return order.map(p => ({
    period: p,
    list: groups[p]
  }));
});
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 1100px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(to bottom, #fff, #fbfbfa);
  border-radius: 24px;
  border: 1px solid var(--border-soft);
}

.eyebrow {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--brand);
  font-weight: 700;
  margin-bottom: 12px;
}

h1 {
  font-size: 36px;
  margin: 0 0 16px;
  color: #2c1810;
  font-family: "Songti SC", serif;
}

.lead {
  color: #64748b;
  font-size: 16px;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* 分组样式 */
.timeline-group-container {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.period-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.period-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.period-title {
  font-size: 24px;
  font-weight: 700;
  color: #2c1810;
  margin: 0;
  white-space: nowrap;
  font-family: "Songti SC", serif;
}

.period-line {
  height: 1px;
  background: rgba(44, 24, 16, 0.1);
  flex: 1;
}

/* 卡片网格 */
.era-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.era-card {
  position: relative;
  background: #fff;
  border-radius: 16px;
  border: 1px solid var(--border-soft);
  text-decoration: none;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
}

.era-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 20px -4px rgba(44, 24, 16, 0.08);
  border-color: var(--brand);
}

.card-inner {
  padding: 24px;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
}

.card-decoration {
  position: absolute;
  top: 0;
  right: 0;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, transparent 50%, rgba(247, 153, 68, 0.05) 50%);
  z-index: 0;
  pointer-events: none;
}

.era-title-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 8px;
  padding-bottom: 12px;
  border-bottom: 1px dashed #e2e8f0;
}

.era-name {
  margin: 0;
  font-size: 20px;
  color: #1a202c;
  font-weight: 700;
}

.era-years {
  font-size: 13px;
  font-family: monospace;
  color: #94a3b8;
  font-weight: 500;
}

.summary {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: #64748b;
  flex: 1; /* 让文字撑满 */
}

@media (max-width: 640px) {
  .page-header {
    padding: 32px 16px;
  }
  .era-grid {
    grid-template-columns: 1fr;
  }
}
</style>
