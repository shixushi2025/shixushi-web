<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const idSlug = route.params.idSlug as string;

const displayName = computed(() => {
  if (!idSlug) return '人物详情';
  return decodeURIComponent(idSlug)
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
});
</script>

<template>
  <section class="page">
    <header class="page-header">
      <p class="eyebrow">人物</p>
      <h1>{{ displayName }}</h1>
      <p class="lead">该人物的详细资料尚在整理中，以下为示例模块，展示未来的排版方式。</p>
    </header>

    <div class="detail-grid">
      <article class="card">
        <h2>生平概览</h2>
        <p>在这里写该人物的时代背景、身份与生平主线。</p>
      </article>
      <article class="card">
        <h2>相关事件</h2>
        <ul>
          <li>事件 A</li>
          <li>事件 B</li>
        </ul>
      </article>
      <article class="card">
        <h2>影响与评价</h2>
        <p>用两个段落分析其对历史进程的影响。</p>
      </article>

      <aside class="side-card">
        <h3>基本信息</h3>
        <ul>
          <li><span>时代</span><strong>待补充</strong></li>
          <li><span>籍贯</span><strong>待补充</strong></li>
          <li><span>身份</span><strong>待补充</strong></li>
        </ul>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.page-header {
  background: #fff;
  padding: 28px;
  border-radius: 28px;
  border: 1px solid var(--border-soft);
  box-shadow: 0 18px 36px rgba(28, 20, 11, 0.08);
}
.eyebrow {
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 8px;
}
.lead {
  margin: 0;
  color: var(--text-body);
}
.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
.card {
  background: #fff;
  border-radius: 20px;
  padding: 18px;
  border: 1px solid var(--border-soft);
  box-shadow: 0 12px 20px rgba(24, 15, 6, 0.08);
}
.card ul {
  padding-left: 18px;
}
.side-card {
  grid-column: span 2;
  border-radius: 24px;
  border: 1px dashed var(--border-soft);
  padding: 20px;
  background: #fffdf6;
}
.side-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.side-card li {
  display: flex;
  justify-content: space-between;
  color: var(--text-muted);
  font-size: 14px;
}
.side-card strong {
  color: var(--text-strong);
}

@media (max-width: 640px) {
  .page-header {
    padding: 20px;
  }
  .side-card {
    grid-column: span 1;
  }
}
</style>
