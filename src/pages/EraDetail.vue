<!-- src/pages/EraDetail.vue -->
<template>
  <section v-if="era" class="page">
    <header class="page-header">
      <p class="eyebrow">Dynasty Detail</p>
      <h1>{{ era.name }}</h1>
      <p class="meta">{{ era.startYear }} – {{ era.endYear }}</p>
      <p class="summary">
        {{ era.summary }}
      </p>
    </header>

    <div class="info-grid">
      <div class="card">
        <h2>时期划分</h2>
        <p v-if="!era.periods?.length" class="placeholder">该时期的分期信息待补充。</p>
        <ul v-else class="periods">
          <li v-for="p in era.periods" :key="p.key">
            <strong>{{ p.name }}</strong>
            <span>{{ p.startYear }} – {{ p.endYear }}</span>
          </li>
        </ul>
      </div>

      <div class="card">
        <h2>代表事件</h2>
        <p v-if="!eraEvents.length" class="placeholder">暂未收录该时期的事件。</p>
        <EventList v-else :events="eraEvents" />
      </div>
    </div>
  </section>

  <section v-else class="page">
    <p>未找到该朝代。</p>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { eras } from '@/data/eras';
import { events } from '@/data/events';
import EventList from '@/components/common/EventList.vue';

const route = useRoute();
const slug = route.params.slug as string;

const era = computed(() => eras.find(e => e.slug === slug));

const eraEvents = computed(() =>
  events.filter(ev => ev.eraSlug === slug).sort((a, b) => (a.startYear || 0) - (b.startYear || 0))
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
  box-shadow: 0 20px 40px rgba(28, 20, 9, 0.08);
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
  margin: 0 0 8px;
}
.summary {
  margin: 0;
  color: var(--text-body);
}
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}
.card {
  background: #fff;
  border-radius: 24px;
  padding: 24px;
  border: 1px solid var(--border-soft);
  box-shadow: 0 12px 26px rgba(24, 17, 7, 0.08);
}
.periods {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.periods li {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 14px;
}
.periods span {
  color: var(--text-muted);
}
.placeholder {
  color: var(--text-muted);
  font-size: 14px;
}

@media (max-width: 640px) {
  .page-header {
    padding: 20px;
  }
}
</style>
