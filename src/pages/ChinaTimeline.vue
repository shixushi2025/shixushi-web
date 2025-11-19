<template>
  <section class="page">
    <header class="page-header">
      <p class="eyebrow">China Timeline</p>
      <h1>中国历史时间线</h1>
      <p class="lead">
        从文明起源、王朝鼎盛到近现代转型，构建一条可缩放的纵向时间轴，帮助你在大时间框架中定位朝代、皇帝与关键事件。
      </p>
    </header>

    <section class="interactive-panel">
      <div>
        <h2>纵向分层时间轴</h2>
        <p>采用纵向分段的方式，并列展示朝代、皇帝与代表事件，更像一份可展开的结构化年表。</p>
      </div>

      <div class="filter-toggle" aria-label="切换朝代范围">
        <span>显示范围：</span>
        <div class="toggle-group">
          <button
            type="button"
            :class="{ active: showMajorOnly }"
            @click="showMajorOnly = true"
          >
            主要朝代
          </button>
          <button
            type="button"
            :class="{ active: !showMajorOnly }"
            @click="showMajorOnly = false"
          >
            全部朝代
          </button>
        </div>
      </div>

      <VerticalDynastyTimeline
        :eras="displayedEras"
        :emperors="timelineEmperors"
        :events="chinaTimelineEvents"
      />
    </section>

    <div class="grid">
      <article class="callouts">
        <h3>宏观脉络提示</h3>
        <ul>
          <li v-for="item in timelineNotes" :key="item.title">
            <strong>{{ item.title }}</strong>
            <p>{{ item.desc }}</p>
          </li>
        </ul>
      </article>

      <aside class="quick-panel">
        <h3>快速跳转</h3>
        <p>需要更快进入某个朝代？可以直接点击胶囊进入详情页。</p>
        <TimelineBar :eras="displayedEras" />
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import VerticalDynastyTimeline from '@/components/common/VerticalDynastyTimeline.vue';
import TimelineBar from '@/components/common/TimelineBar.vue';
import { chinaEras } from '@/data/eras';
import { emperors } from '@/data/emperors';
import { events } from '@/data/events';

const timelineNotes = [
  { title: '文明起源与礼乐制度', desc: '夏商周时期以宗法礼乐构建秩序，为后世政治文化奠基。' },
  { title: '大一统与文治武功', desc: '秦汉奠定中央集权，唐宋推动经济重心南移，进入文治繁荣。' },
  { title: '多元并立与近代冲击', desc: '辽金元明清与周边文明互动，晚期遭遇近代世界格局冲击。' },
];

const majorEraSlugs = new Set([
  'xia',
  'shang',
  'western-zhou',
  'eastern-zhou',
  'qin',
  'western-han',
  'xin',
  'eastern-han',
  'cao-wei',
  'shu-han',
  'sun-wu',
  'western-jin',
  'eastern-jin',
  'liu-song',
  'southern-qi',
  'southern-liang',
  'chen-dynasty',
  'northern-wei',
  'eastern-wei',
  'western-wei',
  'northern-qi',
  'northern-zhou',
  'sui',
  'tang',
  'later-liang',
  'later-tang',
  'later-jin',
  'later-han',
  'later-zhou',
  'northern-song',
  'southern-song',
  'liao',
  'xixia',
  'jin-jurchen',
  'yuan',
  'ming',
  'qing',
]);

const showMajorOnly = ref(true);

const displayedEras = computed(() =>
  (showMajorOnly.value ? chinaEras.filter(era => majorEraSlugs.has(era.slug)) : chinaEras).sort(
    (a, b) => a.startYear - b.startYear
  )
);

const displayedEraSlugSet = computed(() => new Set(displayedEras.value.map(era => era.slug)));

const timelineEmperors = computed(() => emperors.filter(emp => displayedEraSlugSet.value.has(emp.eraSlug)));

const chinaTimelineEvents = computed(() =>
  events.filter(ev => displayedEraSlugSet.value.has(ev.eraSlug)).sort((a, b) => a.startYear - b.startYear)
);
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
  box-shadow: 0 20px 40px rgba(35, 26, 13, 0.08);
}
.eyebrow {
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 8px;
}
.lead {
  color: var(--text-body);
  margin: 0;
}
.interactive-panel {
  background: #fff8ef;
  border: 1px solid rgba(229, 204, 168, 0.8);
  border-radius: 28px;
  padding: 24px;
  box-shadow: 0 20px 40px rgba(34, 18, 2, 0.08);
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.grid {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  gap: 18px;
}
.callouts,
.quick-panel {
  background: #fff;
  border-radius: 24px;
  padding: 20px;
  border: 1px solid var(--border-soft);
  box-shadow: 0 12px 20px rgba(24, 15, 5, 0.08);
}
.callouts ul {
  list-style: none;
  padding: 0;
  margin: 16px 0 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.callouts li p {
  margin: 4px 0 0;
  color: var(--text-muted);
}
.quick-panel p {
  margin-top: 4px;
  color: var(--text-muted);
}
.quick-panel :deep(.timeline-bar) {
  margin-top: 16px;
}

.filter-toggle {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: var(--text-muted);
  flex-wrap: wrap;
}
.filter-toggle .toggle-group {
  display: inline-flex;
  border: 1px solid rgba(179, 91, 42, 0.3);
  border-radius: 999px;
  overflow: hidden;
}
.filter-toggle button {
  background: transparent;
  border: none;
  padding: 6px 14px;
  font-size: 13px;
  cursor: pointer;
  color: var(--text-body);
  transition: background 0.2s, color 0.2s;
}
.filter-toggle button.active {
  background: #b35b2a;
  color: #fff;
}

@media (max-width: 800px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .page-header,
  .interactive-panel {
    padding: 20px;
  }
}
</style>
