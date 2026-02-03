<template>
  <section v-if="era" class="page">
    <header class="page-header">
      <div class="header-meta">
        <span class="era-tag">{{ formatYear(era.startYear) }} — {{ formatYear(era.endYear) }}</span>
      </div>
      <h1>{{ era.name }}</h1>
      <p class="summary">{{ era.summary }}</p>
    </header>

    <div class="timeline-container">
      <h2 class="section-title">帝王世系与大事纪</h2>
      
      <div class="emperor-timeline">
        <div 
          v-for="emp in timelineData" 
          :key="emp.id" 
          class="emperor-block"
          :class="{ 'has-events': emp.events.length > 0 }"
        >
          <!-- 皇帝信息栏 -->
          <div class="emperor-header">
            <div class="emperor-avatar">
              {{ emp.name[0] }}
            </div>
            <div class="emperor-info">
              <h3>
                <span class="emp-name">{{ emp.name }}</span>
                <span class="emp-personal" v-if="emp.personalName">({{ emp.personalName }})</span>
              </h3>
              <div class="emp-meta">
                <span class="reign-years">{{ formatYear(emp.reignStart) }} – {{ formatYear(emp.reignEnd) }}</span>
                <span class="era-names" v-if="emp.eraNames?.length">
                  年号：{{ emp.eraNames.join('、') }}
                </span>
              </div>
            </div>
          </div>

          <!-- 关联事件列表 (仅当有事件时显示) -->
          <div v-if="emp.events.length" class="emp-events">
            <div class="connector-line"></div>
            <div class="event-cards">
              <RouterLink 
                v-for="ev in emp.events" 
                :key="ev.id" 
                :to="`/event/${ev.id}-${ev.slug}`"
                class="mini-event-card"
              >
                <span class="ev-time">{{ formatEventTime(ev) }}</span>
                <span class="ev-title">{{ ev.title }}</span>
                <span class="ev-type" v-if="ev.types?.[0]">{{ ev.types[0] }}</span>
              </RouterLink>
            </div>
          </div>
          
          <!-- 无事件时的占位 (可选，保持视觉连贯) -->
          <div v-else class="emp-quiet">
            <span class="quiet-line"></span>
          </div>
        </div>
        
        <!-- 如果该朝代没有录入皇帝数据，回退显示所有事件 -->
        <div v-if="timelineData.length === 0 && eraEvents.length > 0" class="fallback-events">
           <EventList :events="eraEvents" />
        </div>
        
        <div v-if="timelineData.length === 0 && eraEvents.length === 0" class="empty-state">
          暂无该朝代的详细记录。
        </div>
      </div>
    </div>
  </section>

  <div v-else class="not-found">
    <h2>未找到该朝代</h2>
    <RouterLink to="/era">返回朝代索引</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { eras } from '@/data/eras';
import { events } from '@/data/events';
import emperorsData from '@/data/emperors.json';
import EventList from '@/components/common/EventList.vue';
import { formatEventTime } from '@/utils/formatters';

const route = useRoute();
const slug = route.params.slug as string;

const era = computed(() => eras.find(e => e.slug === slug));

import { watchEffect } from 'vue';
watchEffect(() => {
  if (era.value) {
    document.title = `${era.value.name} - 历史朝代 | 时序史 · 时间宇宙`;
  }
});

const eraEvents = computed(() =>
  events.filter(ev => ev.eraSlug === slug).sort((a, b) => (a.startYear || 0) - (b.startYear || 0))
);

const eraEmperors = computed(() => 
  emperorsData
    .filter(emp => emp.eraSlug === slug)
    .sort((a, b) => a.reignStart - b.reignStart)
);

// 核心逻辑：将事件挂载到对应的皇帝名下
const timelineData = computed(() => {
  if (!eraEmperors.value.length) return [];

  return eraEmperors.value.map(emp => {
    const empEvents = eraEvents.value.filter(ev => {
      // 事件开始时间 >= 皇帝即位 AND <= 皇帝退位
      // 宽松匹配：有些事件可能跨度大，只要 startYear 在范围内即可
      const y = ev.startYear || 0;
      return y >= emp.reignStart && y <= emp.reignEnd;
    });
    return {
      ...emp,
      events: empEvents
    };
  });
});

function formatYear(year?: number) {
  if (!year) return '?';
  return year < 0 ? `前${Math.abs(year)}` : `${year}`;
}
</script>

<style scoped>
.page {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.page-header {
  text-align: center;
  padding: 40px 20px;
  background: #fff;
  border-radius: 24px;
  border: 1px solid var(--border-soft);
  background: linear-gradient(to bottom, #fff, #fdfbf7);
}
.era-tag {
  font-size: 13px;
  font-weight: 600;
  color: #94a3b8;
  letter-spacing: 0.05em;
  background: #f1f5f9;
  padding: 4px 12px;
  border-radius: 99px;
}
h1 {
  font-size: 42px;
  margin: 16px 0;
  color: #2c1810;
  font-family: "Songti SC", serif;
}
.summary {
  font-size: 16px;
  line-height: 1.6;
  color: #475569;
  max-width: 600px;
  margin: 0 auto;
}

.section-title {
  font-size: 20px;
  margin-bottom: 24px;
  padding-left: 12px;
  border-left: 4px solid var(--brand);
  color: #1e293b;
}

.emperor-timeline {
  display: flex;
  flex-direction: column;
  gap: 0; /* 紧凑连接 */
  position: relative;
}
/* 贯穿的时间轴线 */
.emperor-timeline::before {
  content: '';
  position: absolute;
  top: 10px;
  bottom: 10px;
  left: 24px; /* 对应头像中心 */
  width: 2px;
  background: #e2e8f0;
  z-index: 0;
}

.emperor-block {
  position: relative;
  z-index: 1;
  padding-bottom: 24px;
}

.emperor-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.emperor-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #e2e8f0;
  color: #64748b;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 20px;
  font-family: "Songti SC", serif;
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);
  flex-shrink: 0;
}
/* 有事件的皇帝高亮 */
.has-events .emperor-avatar {
  border-color: var(--brand);
  color: var(--brand);
  background: #fff7ed;
  box-shadow: 0 0 0 4px rgba(247, 153, 68, 0.1);
}

.emperor-info h3 {
  margin: 0;
  font-size: 18px;
  color: #334155;
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.has-events .emperor-info h3 {
  color: #1e293b;
  font-size: 20px;
}
.emp-personal {
  font-size: 14px;
  font-weight: 400;
  color: #94a3b8;
}
.emp-meta {
  font-size: 13px;
  color: #64748b;
  margin-top: 4px;
}
.reign-years {
  font-variant-numeric: tabular-nums;
  margin-right: 12px;
}

/* 事件区域 */
.emp-events {
  margin-left: 64px; /* 让出左侧头像空间 */
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.mini-event-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  border: 1px solid var(--border-soft);
  padding: 12px 16px;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}
.mini-event-card:hover {
  border-color: var(--brand);
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(247, 153, 68, 0.1);
}
.ev-time {
  font-size: 13px;
  color: #94a3b8;
  font-weight: 600;
  min-width: 60px;
}
.ev-title {
  font-weight: 600;
  color: #1e293b;
  flex-grow: 1;
}
.ev-type {
  font-size: 11px;
  padding: 2px 6px;
  background: #f1f5f9;
  color: #64748b;
  border-radius: 4px;
}

/* 安静线条 */
.emp-quiet {
  margin-left: 24px;
  height: 12px; /* 最小间距 */
  border-left: 2px solid #e2e8f0;
}

.not-found {
  text-align: center;
  padding: 60px;
}

@media (max-width: 640px) {
  .page-header {
    padding: 24px;
  }
  h1 { font-size: 32px; }
  .emperor-header { gap: 12px; }
  .emperor-avatar { width: 40px; height: 40px; font-size: 16px; }
  .emperor-timeline::before { left: 20px; }
  .emp-events { margin-left: 52px; }
}
</style>
