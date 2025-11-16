<!-- src/pages/EventDetail.vue -->
<template>
  <section v-if="event">
    <h1>{{ event.title }}</h1>
    <p class="meta">
      {{ event.timeLabel }} · {{ event.eraName }} · {{ event.region?.join('、') }}
    </p>

    <div class="layout">
      <article class="main">
        <h2>背景</h2>
        <p>{{ event.background }}</p>

        <h2>经过</h2>
        <p>{{ event.process }}</p>

        <h2>结果</h2>
        <p>{{ event.result }}</p>

        <h2>影响</h2>
        <p><strong>短期：</strong>{{ event.influence.shortTerm }}</p>
        <p><strong>长期：</strong>{{ event.influence.longTerm }}</p>

        <h2>参考来源</h2>
        <ul>
          <li v-for="(s, idx) in event.sources" :key="idx">
            {{ s.title }}（{{ s.detail }}）
          </li>
        </ul>
      </article>

      <aside class="side">
        <h3>基本信息</h3>
        <ul>
          <li>时间：{{ event.timeLabel }}</li>
          <li>所属：{{ event.eraName }}</li>
          <li v-if="event.region?.length">地区：{{ event.region.join('、') }}</li>
          <li>类型：{{ event.types.join('、') }}</li>
        </ul>
      </aside>
    </div>
  </section>

  <section v-else>
    <p>未找到该事件。</p>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { events } from '@/data/events';

const route = useRoute();
const idSlug = route.params.idSlug as string;

// 简单从 "123-xuanwumen-zhibian" 里解析 id
const id = Number((idSlug || '').split('-')[0]);

const event = computed(() => events.find(e => e.id === id));
</script>

<style scoped>
.meta {
  color: #666;
  margin-bottom: 12px;
}
.layout {
  display: flex;
  gap: 24px;
}
.main {
  flex: 3;
}
.side {
  flex: 1;
  border-left: 1px solid #eee;
  padding-left: 16px;
  font-size: 13px;
}
.side ul {
  list-style: none;
  padding: 0;
}
.side li {
  margin: 4px 0;
}
</style>
