<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const slug = route.params.slug as string;

const displayTitle = computed(() => {
  if (!slug) return '专题详情';
  return decodeURIComponent(slug).replace(/-/g, ' / ');
});
</script>

<template>
  <section class="page">
    <header class="page-header">
      <p class="eyebrow">专题</p>
      <h1>{{ displayTitle }}</h1>
      <p class="lead">该专题的内容尚在整理阶段，下方示例展示结构化呈现方式。</p>
    </header>

    <div class="sections">
      <article>
        <h2>纵向脉络</h2>
        <p>按时间段拆分主题的发展，例如制度诞生—演进—变革。</p>
      </article>
      <article>
        <h2>关键事件</h2>
        <p>列出影响该专题的关键事件，并与中国/世界历史互相参照。</p>
      </article>
      <article>
        <h2>参考资料</h2>
        <p>收集书目、论文与多媒体资源，便于延伸阅读。</p>
      </article>
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
  box-shadow: 0 18px 32px rgba(25, 16, 8, 0.09);
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
.sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}
.sections article {
  border-radius: 20px;
  border: 1px solid var(--border-soft);
  padding: 18px;
  background: #fff;
}
.sections p {
  margin: 0;
  color: var(--text-muted);
}

@media (max-width: 640px) {
  .page-header {
    padding: 20px;
  }
}
</style>
