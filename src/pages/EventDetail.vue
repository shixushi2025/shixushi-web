<!-- src/pages/EventDetail.vue -->
<template>
  <section v-if="event" class="page">
    <header class="page-header">
      <p class="eyebrow">
        {{ event.types.includes('当代观察') ? '当代观察' : 'Historical Event' }}
      </p>
      <h1>{{ event.title }}</h1>
      <p class="meta">
        {{ event.timeLabel }} · {{ event.eraName }}
        <template v-if="event.region?.length">· {{ event.region.join('、') }}</template>
      </p>
      <p class="lead">{{ event.summary }}</p>
    </header>

    <div class="detail-layout">
      <article class="main">
        <section class="block">
          <h2>背景</h2>
          <p>{{ event.background }}</p>
        </section>

        <section class="block">
          <h2>经过</h2>
          <p>{{ event.process }}</p>
        </section>

        <section class="block">
          <h2>结果</h2>
          <p>{{ event.result }}</p>
        </section>

        <section class="block">
          <h2>影响</h2>
          <p><strong>短期：</strong>{{ event.influence.shortTerm }}</p>
          <p><strong>长期：</strong>{{ event.influence.longTerm }}</p>
        </section>

        <section class="block">
          <h2>参考来源</h2>
          <ul>
            <li v-for="(s, idx) in event.sources" :key="idx">
              {{ s.title }}
              <template v-if="s.detail">（{{ s.detail }}）</template>
            </li>
          </ul>
        </section>
      </article>

      <aside class="side-card">
        <h3>基本信息</h3>
        <ul>
          <li>
            <span>时间</span>
            <strong>{{ event.timeLabel }}</strong>
          </li>
          <li>
            <span>所属时期</span>
            <strong>{{ event.eraName }}</strong>
          </li>
          <li v-if="event.region?.length">
            <span>地区</span>
            <strong>{{ event.region.join('、') }}</strong>
          </li>
          <li>
            <span>类型</span>
            <strong>{{ event.types.join('、') }}</strong>
          </li>
        </ul>
      </aside>
    </div>
  </section>

  <section v-else class="page">
    <p>未找到该事件。</p>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { events } from '@/data/events';

const route = useRoute();
const idSlug = route.params.idSlug as string;

const id = Number((idSlug || '').split('-')[0]);

const event = computed(() => events.find(e => e.id === id));
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
  box-shadow: 0 20px 40px rgba(42, 30, 12, 0.1);
}
.eyebrow {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--text-muted);
  margin-bottom: 8px;
}
.meta {
  color: var(--text-muted);
  margin-bottom: 8px;
}
.lead {
  margin: 0;
  color: var(--text-body);
}
.detail-layout {
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(220px, 1fr);
  gap: 20px;
}
.main {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.block {
  background: #fff;
  border-radius: 20px;
  padding: 20px 24px;
  border: 1px solid var(--border-soft);
  box-shadow: 0 12px 24px rgba(25, 18, 7, 0.08);
}
.block ul {
  padding-left: 18px;
}
.side-card {
  background: #fff7ee;
  border-radius: 24px;
  padding: 24px;
  border: 1px solid rgba(246, 207, 160, 0.7);
  box-shadow: 0 10px 18px rgba(94, 67, 33, 0.15);
  height: fit-content;
}
.side-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.side-card li {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 13px;
  color: var(--text-muted);
}
.side-card strong {
  color: var(--text-strong);
  font-size: 14px;
}

@media (max-width: 900px) {
  .detail-layout {
    grid-template-columns: 1fr;
  }
  .side-card {
    order: -1;
  }
}

@media (max-width: 640px) {
  .page-header {
    padding: 20px;
  }
  .block {
    padding: 16px;
  }
}
</style>
