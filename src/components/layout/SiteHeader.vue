<template>
  <header class="header">
    <div class="header-inner">
      <RouterLink to="/" class="logo">
        <span class="logo-main">时序史</span>
        <span class="logo-sub">历史时间轴</span>
      </RouterLink>

      <nav class="nav">
        <RouterLink to="/china">中国时间线</RouterLink>
        <RouterLink to="/world">世界事件</RouterLink>
        <RouterLink to="/era">按朝代</RouterLink>
        <RouterLink to="/people">人物</RouterLink>
        <RouterLink to="/topics">专题</RouterLink>
      </nav>

      <form class="search" @submit.prevent="onSearch">
        <input v-model="q" type="text" placeholder="搜索人物、事件、朝代..." />
      </form>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';

const router = useRouter();
const q = ref('');

const onSearch = () => {
  if (!q.value.trim()) return;
  router.push({ path: '/search', query: { q: q.value.trim() } });
};
</script>

<style scoped>
.header {
  border-bottom: 1px solid #eee;
  background: #fff;
}
.header-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 24px;
}
.logo {
  text-decoration: none;
  display: flex;
  flex-direction: column;
}
.logo-main {
  font-weight: 700;
  font-size: 18px;
  color: #222;
}
.logo-sub {
  font-size: 12px;
  color: #777;
}
.nav {
  display: flex;
  gap: 12px;
  flex: 1;
}
.nav a {
  text-decoration: none;
  color: #444;
  font-size: 14px;
}
.nav a.router-link-active {
  font-weight: 600;
  color: #000;
}
.search input {
  border: 1px solid #ddd;
  border-radius: 16px;
  padding: 4px 10px;
  font-size: 13px;
}
</style>
