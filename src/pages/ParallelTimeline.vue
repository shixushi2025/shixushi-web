<template>
  <section class="page">
    <header class="page-header">
      <p class="eyebrow">Parallel Timeline</p>
      <h1>中外历史对照表</h1>
      <p class="lead">
        以时间为轴，左侧展示中国历史进程，右侧呈现世界重大事件，直观对比不同文明的发展步调。
      </p>
    </header>

    <div class="parallel-container">
      <div class="timeline-header">
        <div class="col-cn">中国历史</div>
        <div class="col-axis">时间轴</div>
        <div class="col-world">世界历史</div>
      </div>

      <div class="timeline-body">
        <section
          v-for="group in timelineGroups"
          :key="group.label"
          class="time-group"
        >
          <div class="group-label">
            <span>{{ group.label }}</span>
          </div>

          <div class="events-row">
            <!-- China Column -->
            <div class="side cn-side">
              <div
                v-for="ev in group.cn"
                :key="ev.id"
                class="event-card cn"
                @click="goToEvent(ev)"
              >
                <div class="event-year">{{ formatYear(ev.startYear) }}</div>
                <h4 class="event-title">{{ ev.title }}</h4>
                <p class="event-summary">{{ truncate(ev.summary) }}</p>
              </div>
            </div>

            <!-- Center Axis Line (Visual only, implemented via border) -->
            <div class="center-axis"></div>

            <!-- World Column -->
            <div class="side world-side">
              <div
                v-for="ev in group.world"
                :key="ev.id"
                class="event-card world"
                @click="goToEvent(ev)"
              >
                <div class="event-year">{{ formatYear(ev.startYear) }}</div>
                <h4 class="event-title">{{ ev.title }}</h4>
                <p class="event-summary">{{ truncate(ev.summary) }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { events } from '@/data/events';
import type { Event } from '@/types/history';

const router = useRouter();

// Helper: Format year
const formatYear = (y: number) => (y < 0 ? `前${Math.abs(y)}` : `${y}`);

// Helper: Truncate text
const truncate = (text: string, len = 50) => {
  if (!text) return '';
  return text.length > len ? text.slice(0, len) + '...' : text;
};

// Group events by Century
// Logic: -200 -> "前3世纪", 1950 -> "20世纪"
const getCenturyLabel = (year: number) => {
  if (year < 0) {
    const c = Math.ceil(Math.abs(year) / 100);
    return `公元前 ${c} 世纪`;
  }
  const c = Math.floor(year / 100) + 1;
  return `公元 ${c} 世纪`;
};

// Sort events chronologically
const sortedEvents = [...events].sort((a, b) => a.startYear - b.startYear);

// Grouping Logic
const timelineGroups = computed(() => {
  const groups: Record<string, { label: string; startYear: number; cn: Event[]; world: Event[] }> = {};
  const order: string[] = [];

  sortedEvents.forEach((ev) => {
    const label = getCenturyLabel(ev.startYear);
    if (!groups[label]) {
      groups[label] = { 
        label, 
        startYear: ev.startYear, // approximate for sorting groups if needed
        cn: [], 
        world: [] 
      };
      order.push(label);
    }

    const isCN = ev.region.includes('CN');
    if (isCN) {
      groups[label].cn.push(ev);
    } else {
      groups[label].world.push(ev);
    }
  });

  // Return as array, keeping the chronological order of discovery
  return order.map(k => groups[k]);
});

const goToEvent = (ev: Event) => {
  // Use slug based navigation if possible, fallback to ID if needed
  // Route is /event/:idSlug
  router.push(`/event/${ev.slug}`);
};
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
  border: 1px solid var(--border-soft, #e5e5e5);
  box-shadow: 0 20px 36px rgba(24, 20, 15, 0.08);
  text-align: center;
}
.eyebrow {
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted, #999);
  margin-bottom: 8px;
}
.lead {
  margin: 12px auto 0;
  max-width: 600px;
  color: var(--text-body, #555);
}

.parallel-container {
  background: #fff;
  border-radius: 24px;
  border: 1px solid var(--border-soft, #e5e5e5);
  padding: 24px;
  box-shadow: 0 12px 24px rgba(0,0,0,0.05);
}

.timeline-header {
  display: grid;
  grid-template-columns: 1fr 60px 1fr;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  padding-bottom: 20px;
  border-bottom: 2px solid var(--border-soft, #e5e5e5);
  margin-bottom: 24px;
  color: var(--brand, #b35b2a);
}

.time-group {
  margin-bottom: 40px;
}

.group-label {
  text-align: center;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
}

.group-label span {
  background: var(--brand, #b35b2a);
  color: #fff;
  padding: 6px 16px;
  border-radius: 99px;
  font-size: 14px;
  font-weight: bold;
}

.events-row {
  display: grid;
  grid-template-columns: 1fr 2px 1fr; /* Center line is 2px */
  gap: 0;
}

.center-axis {
  background: var(--border-soft, #e5e5e5);
  height: 100%;
  width: 2px;
  margin: 0 auto;
}

.side {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 24px;
}

.cn-side {
  align-items: flex-end;
  text-align: right;
}

.world-side {
  align-items: flex-start;
  text-align: left;
}

.event-card {
  background: #fff8f2;
  border: 1px solid rgba(179, 91, 42, 0.1);
  border-radius: 12px;
  padding: 12px 16px;
  max-width: 320px;
  cursor: pointer;
  transition: all 0.2s;
}

.event-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(179, 91, 42, 0.1);
  border-color: var(--brand, #b35b2a);
}

/* Different style for World events to distinguish */
.world .event-card {
  background: #f4f8ff;
  border-color: rgba(42, 91, 179, 0.1);
}
.world .event-card:hover {
  border-color: #2a5bb3;
  box-shadow: 0 8px 16px rgba(42, 91, 179, 0.1);
}

.event-year {
  font-size: 12px;
  font-family: monospace;
  color: var(--text-muted, #999);
  margin-bottom: 4px;
}

.event-title {
  margin: 0 0 6px;
  font-size: 15px;
  color: var(--text-heading, #333);
}

.event-summary {
  margin: 0;
  font-size: 12px;
  color: var(--text-body, #666);
  line-height: 1.4;
}

@media (max-width: 768px) {
  .timeline-header {
    display: none;
  }
  .events-row {
    grid-template-columns: 1fr; /* Stack vertically on mobile */
  }
  .center-axis {
    display: none;
  }
  .cn-side, .world-side {
    align-items: flex-start;
    text-align: left;
    padding: 0;
    margin-bottom: 16px;
  }
  .cn-side::before {
    content: "中国";
    display: block;
    font-size: 12px;
    font-weight: bold;
    color: var(--brand);
    margin-bottom: 8px;
  }
  .world-side::before {
    content: "世界";
    display: block;
    font-size: 12px;
    font-weight: bold;
    color: #2a5bb3;
    margin-bottom: 8px;
  }
}
</style>
