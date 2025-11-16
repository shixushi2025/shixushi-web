<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero">
      <h1>用时间线串起中国历史与世界大事件</h1>
      <p class="subtitle">
        从夏商周到当代，从玄武门之变到世界大战，一条时间轴看懂历史脉络。
      </p>
      <div class="hero-actions">
        <RouterLink to="/china" class="btn primary">中国历史时间线</RouterLink>
        <RouterLink to="/world" class="btn">世界重大事件</RouterLink>
      </div>
    </section>

    <!-- 快速入口 -->
    <section class="section">
      <h2>快速入口</h2>
      <div class="card-grid">
        <div class="card">
          <h3>按朝代查看历史</h3>
          <p>从夏商周到宋元明清，一步步往下深挖。</p>
          <RouterLink to="/era" class="link">进入朝代列表 →</RouterLink>
        </div>
        <div class="card">
          <h3>历史人物索引</h3>
          <p>皇帝、名将、思想家、科学家，一网打尽。</p>
          <RouterLink to="/people" class="link">查看人物 →</RouterLink>
        </div>
        <div class="card">
          <h3>专题视角</h3>
          <p>战争、制度、科技、思想，从主题纵向穿越历史。</p>
          <RouterLink to="/topics" class="link">浏览专题 →</RouterLink>
        </div>
      </div>
    </section>

    <!-- 中国时间线预览 -->
    <section class="section">
      <h2>中国历史时间线（总览）</h2>
      <TimelineBar :eras="chinaEras" />
    </section>

    <!-- 世界事件预览 -->
    <section class="section">
      <h2>世界重大历史事件一览</h2>
      <ul class="list">
        <li v-for="e in worldPreviewEvents" :key="e.id">
          <RouterLink :to="`/event/${e.id}-${e.slug}`">
            {{ e.timeLabel }} {{ e.title }}
          </RouterLink>
        </li>
      </ul>
      <RouterLink to="/world" class="link">查看完整世界时间线 →</RouterLink>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import TimelineBar from '@/components/common/TimelineBar.vue';
import { chinaEras } from '@/data/eras';
import { worldPreviewEvents } from '@/data/events';
</script>

<style scoped>
.hero {
  padding: 32px 0 24px;
}
.hero h1 {
  font-size: 26px;
  margin-bottom: 12px;
}
.subtitle {
  color: #666;
  margin-bottom: 16px;
}
.hero-actions {
  display: flex;
  gap: 12px;
}
.btn {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 18px;
  border: 1px solid #ddd;
  font-size: 14px;
  text-decoration: none;
  color: #333;
}
.btn.primary {
  background: #222;
  color: #fff;
  border-color: #222;
}
.section {
  margin-top: 32px;
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 12px;
}
.card {
  border-radius: 8px;
  border: 1px solid #eee;
  padding: 16px;
  background: #fff;
}
.card h3 {
  margin-bottom: 8px;
}
.card p {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}
.link {
  font-size: 14px;
  color: #0070f3;
  text-decoration: none;
}
.list {
  margin: 8px 0 12px;
  padding-left: 18px;
}
.list li {
  margin: 4px 0;
}
</style>
