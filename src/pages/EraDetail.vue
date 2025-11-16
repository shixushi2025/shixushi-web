<!-- src/pages/EraDetail.vue -->
<template>
  <section v-if="era">
    <h1>{{ era.name }}</h1>
    <p class="meta">{{ era.startYear }}–{{ era.endYear }}</p>
    <p class="summary">{{ era.summary }}</p>

    <h2>时期划分</h2>
    <ul class="periods">
      <li v-for="p in era.periods" :key="p.key">
        <strong>{{ p.name }}</strong>（{{ p.startYear }}–{{ p.endYear }}）
      </li>
    </ul>

    <h2>代表事件</h2>
    <EventList :events="eraEvents" />
  </section>

  <section v-else>
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
  events.filter(ev => ev.eraSlug === slug).sort((a, b) => a.startYear - b.startYear)
);
</script>

<style scoped>
.meta {
  color: #666;
  margin-bottom: 6px;
}
.summary {
  margin-bottom: 16px;
}
.periods {
  margin-bottom: 16px;
  padding-left: 18px;
}
</style>
