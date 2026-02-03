<template>
  <div class="vertical-timeline">
    <div
      v-for="group in groupedEraBlocks"
      :key="group.periodName"
      class="period-group"
    >
      <!-- 大时期标题 (Sticky Header) -->
      <div class="period-header">
        <h2 class="period-title">{{ group.periodName }}</h2>
        <span class="period-line"></span>
      </div>

      <!-- 该时期下的朝代列表 -->
      <section
        v-for="(eraBlock, idx) in group.eras"
        :key="eraBlock.era.slug"
        class="era-block"
      >
        <div class="timeline-axis">
          <span class="dot"></span>
          <!-- Only draw line if not the last item in this group -->
          <span class="line" v-if="idx < group.eras.length - 1"></span>
        </div>

        <div class="era-content">
          <header class="era-header">
            <div>
              <p class="label">
                {{ formatYear(eraBlock.era.startYear) }} ·
                {{ formatYear(eraBlock.era.endYear) }}
              </p>
              <h3>{{ eraBlock.era.name }}</h3>
            </div>
            <p class="summary">{{ eraBlock.era.summary }}</p>
          </header>

          <div class="era-body">
            <div class="column">
              <p class="column-title">皇帝/统治者</p>
              <p class="filter-tip">
                点击某位皇帝即可在右侧查看与其关联的事件（再次点击可取消筛选）。
              </p>
              <ul>
                <li v-for="emperor in eraBlock.emperors" :key="emperor.id">
                  <button
                    type="button"
                    class="emperor-btn"
                    :class="{
                      active: isSelectedEmperor(eraBlock.era.slug, emperor.slug),
                    }"
                    @click="selectEmperor(eraBlock.era.slug, emperor.slug)"
                  >
                    <strong>{{ emperor.name }}</strong>
                    <span>
                      {{ formatYear(emperor.reignStart) }} –
                      {{ formatYear(emperor.reignEnd) }}
                    </span>
                  </button>
                </li>
              </ul>
              <p v-if="!eraBlock.emperors.length" class="placeholder">
                相关数据完善中。
              </p>
            </div>

            <div class="column">
              <p class="column-title">关键事件</p>

              <!-- 选中皇帝时的简介卡片 -->
              <div v-if="selectedEmperor" class="emperor-bio-card">
                <header>
                  <h4>{{ selectedEmperor.name }}</h4>
                  <span class="reign-date">
                    {{ formatYear(selectedEmperor.reignStart) }} –
                    {{ formatYear(selectedEmperor.reignEnd) }}
                  </span>
                </header>
                <p class="bio-summary">
                  {{ selectedEmperor.summary || "暂无详细生平简介。" }}
                </p>
              </div>

              <p
                class="filter-tip"
                v-if="selectedEraSlug === eraBlock.era.slug && selectedEmperor"
              >
                已选：{{ selectedEmperor?.name }}，展示与其在本朝关联的事件。
              </p>
              <p class="filter-tip" v-else>显示该朝范围内的代表事件。</p>
              <ul>
                <li
                  v-for="event in getEventsForEra(eraBlock.era.slug)"
                  :key="event.id"
                >
                  <strong>{{ formatEventTime(event) }}</strong>
                  <span>{{ event.title }}</span>
                </li>
              </ul>
              <p
                v-if="!getEventsForEra(eraBlock.era.slug).length"
                class="placeholder"
              >
                {{
                  selectedEraSlug === eraBlock.era.slug && selectedEmperor
                    ? "该皇帝暂无已关联的事件。"
                    : "该时期事件待补充。"
                }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { Era, Emperor, Event } from "@/types/history";
import { formatEventTime } from "@/utils/formatters";

const props = defineProps<{
  eras: Era[];
  emperors: Emperor[];
  events?: Event[];
}>();

const timelineEvents = computed(() => props.events ?? []);
const selectedEmperorSlug = ref<string | null>(null);
const selectedEraSlug = ref<string | null>(null);

const emperorMap = computed(() => {
  const map: Record<string, Emperor> = {};
  props.emperors.forEach((emp) => {
    map[emp.slug] = emp;
  });
  return map;
});

const selectedEmperor = computed(() => {
  if (!selectedEmperorSlug.value) return null;
  return emperorMap.value[selectedEmperorSlug.value] ?? null;
});

const selectEmperor = (eraSlug: string, slug: string) => {
  const isSameSelection =
    selectedEraSlug.value === eraSlug && selectedEmperorSlug.value === slug;
  if (isSameSelection) {
    selectedEraSlug.value = null;
    selectedEmperorSlug.value = null;
  } else {
    selectedEraSlug.value = eraSlug;
    selectedEmperorSlug.value = slug;
  }
};

const isSelectedEmperor = (eraSlug: string, slug: string) =>
  selectedEraSlug.value === eraSlug && selectedEmperorSlug.value === slug;

const groupedEmperors = computed(() => {
  const map: Record<string, Emperor[]> = {};
  props.emperors.forEach((emp) => {
    const bucket = map[emp.eraSlug] ?? (map[emp.eraSlug] = []);
    bucket.push(emp);
  });
  Object.keys(map).forEach((key) => {
    const list = map[key];
    if (list) {
      list.sort((a, b) => a.reignStart - b.reignStart);
    }
  });
  return map;
});

const groupedEvents = computed(() => {
  const map: Record<string, Event[]> = {};
  timelineEvents.value.forEach((ev) => {
    const bucket = map[ev.eraSlug] ?? (map[ev.eraSlug] = []);
    bucket.push(ev);
  });
  Object.keys(map).forEach((key) => {
    const list = map[key];
    if (list) {
      list.sort((a, b) => a.startYear - b.startYear);
    }
  });
  return map;
});

const eraEventsCache = computed(() => groupedEvents.value);

const getEventsForEra = (eraSlug: string) => {
  const events = eraEventsCache.value[eraSlug] ?? [];
  if (
    !selectedEraSlug.value ||
    selectedEraSlug.value !== eraSlug ||
    !selectedEmperorSlug.value
  ) {
    return events;
  }
  return events.filter((ev) =>
    ev.relatedEmperorSlugs?.includes(selectedEmperorSlug.value as string)
  );
};

// Original flat list of blocks
const flatEraBlocks = computed(() => {
  return [...props.eras]
    .sort((a, b) => a.startYear - b.startYear)
    .map((era) => ({
      era,
      emperors: groupedEmperors.value[era.slug] ?? [],
      events: groupedEvents.value[era.slug] ?? [],
    }));
});

// Grouped by broadPeriod
const groupedEraBlocks = computed(() => {
  const groups: Record<string, typeof flatEraBlocks.value> = {};
  const order: string[] = [];

  flatEraBlocks.value.forEach((block) => {
    const periodName = block.era.broadPeriod || "其他时期";
    if (!groups[periodName]) {
      groups[periodName] = [];
      order.push(periodName);
    }
    groups[periodName].push(block);
  });

  return order.map((name) => ({
    periodName: name,
    eras: groups[name]!,
  }));
});

const formatYear = (year: number) => {
  if (year < 0) return `前 ${Math.abs(year)} 年`;
  return `${year} 年`;
};
</script>

<style scoped>
.vertical-timeline {
  display: flex;
  flex-direction: column;
  gap: 40px; /* Gap between period groups */
}

/* Period Header Styles */
.period-header {
  position: sticky;
  top: 80px; /* Adjust based on site header height */
  z-index: 10;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(5px);
  padding: 12px 0;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 2px solid var(--brand, #b35b2a);
}
.period-title {
  font-size: 20px;
  font-weight: 800;
  color: var(--brand, #b35b2a);
  margin: 0;
  white-space: nowrap;
}
.period-line {
  flex: 1;
  height: 2px;
  background: transparent; 
}

/* Era Block Styles */
.era-block {
  display: grid;
  grid-template-columns: 40px 1fr; /* Axis | Content */
  gap: 16px;
  margin-bottom: 24px;
}

.timeline-axis {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 24px; /* Align dot with content header */
}

.dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--brand);
  border: 3px solid #fff;
  box-shadow: 0 0 0 2px rgba(179, 91, 42, 0.3);
  flex-shrink: 0;
}

.line {
  flex: 1;
  width: 2px;
  background: linear-gradient(
    180deg,
    rgba(179, 91, 42, 0.9),
    rgba(179, 91, 42, 0.2)
  );
  margin-top: 4px;
  min-height: 40px;
}

.era-content {
  background: #fff;
  border-radius: 24px;
  border: 1px solid var(--border-soft);
  box-shadow: 0 12px 24px rgba(32, 21, 8, 0.08);
  padding: 24px;
}

.era-header {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

.label {
  font-size: 12px;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.summary {
  margin: 0;
  color: var(--text-muted);
}

.era-body {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.column {
  border: 1px solid var(--border-soft);
  border-radius: 16px;
  padding: 16px;
  background: #fffaf5;
}

.column-title {
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 12px;
}

.filter-tip {
  margin: 0 0 12px;
  font-size: 12px;
  color: var(--text-muted);
}

.column ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.column li {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.emperor-btn {
  text-align: left;
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 10px 12px;
  background: #fff;
  width: 100%;
  cursor: pointer;
  transition: border 0.2s ease, background 0.2s ease;
}

.emperor-btn:hover {
  border-color: rgba(179, 91, 42, 0.6);
  background: rgba(179, 91, 42, 0.05);
}

.emperor-btn.active {
  border-color: var(--brand);
  background: rgba(179, 91, 42, 0.12);
}

.column strong,
.emperor-btn strong {
  font-size: 14px;
  color: var(--text-strong);
}

.column span,
.emperor-btn span {
  color: var(--text-muted);
  font-size: 13px;
}

.placeholder {
  margin: 8px 0 0;
  color: var(--text-muted);
  font-size: 13px;
}

/* Emperor Bio Card Styles */
.emperor-bio-card {
  background: #fff;
  border: 1px solid rgba(179, 91, 42, 0.2);
  border-left: 4px solid var(--brand, #b35b2a);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}
.emperor-bio-card header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.05);
  padding-bottom: 8px;
}
.emperor-bio-card h4 {
  margin: 0;
  font-size: 16px;
  color: var(--text-heading, #2c1810);
}
.emperor-bio-card .reign-date {
  font-size: 12px;
  color: var(--text-muted, #8c8c8c);
  font-family: monospace;
}
.emperor-bio-card .bio-summary {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-body, #4a4a4a);
  text-align: justify;
}

@media (max-width: 640px) {
  .era-content {
    padding: 16px;
  }
  .era-block {
    grid-template-columns: 24px 1fr;
    gap: 12px;
  }
  .dot {
    width: 12px;
    height: 12px;
  }
  .period-header {
    top: 60px;
    font-size: 18px;
  }
}
</style>
