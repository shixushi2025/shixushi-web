<template>
  <section class="page">
    <header class="page-header">
      <p class="eyebrow">Dynasty Index</p>
      <h1>按朝代查看历史</h1>
      <p class="lead">沿着朝代顺序进入，每个节点都对应详尽的时间线与事件列表。</p>
    </header>

    <div class="era-grid">
      <RouterLink v-for="era in eras" :key="era.slug" :to="`/era/${era.slug}`" class="era-card">
        <header>
          <h2>{{ era.name }}</h2>
          <p>{{ era.startYear }} – {{ era.endYear }}</p>
        </header>
        <p class="summary">{{ era.summary }}</p>
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { eras } from '@/data/eras';
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.page-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 12px;
  color: var(--text-muted);
}
.lead {
  color: var(--text-muted);
}
.era-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
.era-card {
  border-radius: 20px;
  padding: 20px;
  background: #fff;
  border: 1px solid var(--border-soft);
  color: var(--text-body);
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.era-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 24px rgba(33, 24, 8, 0.12);
}
.era-card header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
}
.era-card h2 {
  margin: 0;
  font-size: 20px;
}
.era-card p {
  margin: 0;
  color: var(--text-muted);
  font-size: 14px;
}
.summary {
  color: var(--text-body);
}
</style>
