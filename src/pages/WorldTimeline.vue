<template>
  <section class="page">
    <header class="page-header">
      <div class="header-content">
        <p class="eyebrow">Global Perspective</p>
        <h1>世界重大事件</h1>
        <p class="lead">
          从文明古国到全球化时代，追踪塑造现代世界的关键转折点。
        </p>
      </div>
      <div class="header-decoration">🗺️</div>
    </header>

    <div class="world-timeline">
      <div v-for="group in groupedEvents" :key="group.label" class="time-group">
        <div class="group-label">
          <span>{{ group.label }}</span>
        </div>
        
        <div class="events-list">
          <RouterLink 
            v-for="ev in group.events" 
            :key="ev.id"
            :to="`/event/${ev.id}-${ev.slug}`"
            class="world-event-card"
          >
            <div class="event-meta">
              <span class="year">{{ formatYear(ev.startYear) }}</span>
              <div class="badges">
                <span v-for="r in ev.region" :key="r" class="region-badge">{{ r }}</span>
              </div>
            </div>
            
            <div class="event-content">
              <h3>{{ ev.title }}</h3>
              <p>{{ ev.summary }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { worldPreviewEvents } from '@/data/events';
import type { Event } from '@/types/history';

// 格式化年份
const formatYear = (y: number) => (y < 0 ? `前${Math.abs(y)}` : `${y}`);

// 分组逻辑 (按世纪)
const groupedEvents = computed(() => {
  const groups: Record<string, Event[]> = {};
  const order: string[] = [];

  // 按时间排序
  const sorted = [...worldPreviewEvents].sort((a, b) => a.startYear - b.startYear);

  sorted.forEach(ev => {
    let label = '';
    if (ev.startYear < 0) {
      const c = Math.ceil(Math.abs(ev.startYear) / 100);
      label = `公元前 ${c} 世纪`;
    } else {
      const c = Math.floor(ev.startYear / 100) + 1;
      label = `公元 ${c} 世纪`;
    }

    if (!groups[label]) {
      groups[label] = [];
      order.push(label);
    }
    groups[label]!.push(ev);
  });

  return order.map(label => ({
    label,
    events: groups[label]
  }));
});
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 900px;
  margin: 0 auto;
}

/* Header with Blue Theme */
.page-header {
  background: linear-gradient(135deg, #eef5ff 0%, #ffffff 100%);
  border-radius: 24px;
  padding: 40px;
  border: 1px solid rgba(40, 115, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.header-content {
  position: relative;
  z-index: 1;
  max-width: 600px;
}

.eyebrow {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #2873ff;
  font-weight: 700;
  margin-bottom: 12px;
}

h1 {
  font-size: 36px;
  margin: 0 0 16px;
  color: #1a202c;
  font-family: "Songti SC", serif;
}

.lead {
  color: #64748b;
  font-size: 16px;
  line-height: 1.6;
}

.header-decoration {
  font-size: 80px;
  opacity: 0.1;
  transform: rotate(-10deg);
  position: absolute;
  right: 40px;
  bottom: -10px;
  user-select: none;
}

/* Timeline Styles */
.world-timeline {
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-left: 20px;
  border-left: 2px solid rgba(40, 115, 255, 0.1);
  margin-left: 20px;
}

.time-group {
  position: relative;
}

.group-label {
  position: absolute;
  left: -34px; /* Adjust based on border padding */
  top: -6px;
  background: #2873ff;
  color: #fff;
  padding: 4px 12px;
  border-radius: 99px;
  font-size: 13px;
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(40, 115, 255, 0.2);
}

.events-list {
  display: grid;
  gap: 16px;
  padding-top: 32px; /* Make space for label */
}

.world-event-card {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 20px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 20px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.world-event-card:hover {
  transform: translateX(4px);
  border-color: #2873ff;
  box-shadow: 0 8px 16px rgba(40, 115, 255, 0.08);
}

.event-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}

.year {
  font-size: 16px;
  font-weight: 700;
  color: #2c3e50;
  font-family: monospace;
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.region-badge {
  font-size: 11px;
  background: #f1f5f9;
  color: #64748b;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
}

.event-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.event-content h3 {
  margin: 0;
  font-size: 18px;
  color: #1a202c;
  line-height: 1.3;
}

.event-content p {
  margin: 0;
  font-size: 14px;
  color: #64748b;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 640px) {
  .world-event-card {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .event-meta {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .world-timeline {
    margin-left: 10px;
    padding-left: 16px;
  }
  .group-label {
    left: -28px;
  }
}
</style>
