<template>
  <header class="header">
    <div class="header-inner">
      <RouterLink to="/" class="logo" @click="closeMenu">
        <span class="logo-mark">线</span>
        <div class="logo-text">
          <span class="logo-main">时序史 · 时间宇宙</span>
          <span class="logo-sub">历史 · 当下 · 未来</span>
        </div>
      </RouterLink>

      <button
        class="nav-toggle"
        type="button"
        @click="toggleMenu"
        :aria-expanded="isNavOpen"
        aria-label="展开或收起导航"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav :class="['nav', { open: isNavOpen }]">
        <div class="nav-links">
          <RouterLink to="/china" @click="closeMenu">中国时间线</RouterLink>
          <RouterLink to="/world" @click="closeMenu">世界事件</RouterLink>
          <RouterLink to="/era" @click="closeMenu">按朝代</RouterLink>
          <RouterLink to="/people" @click="closeMenu">人物</RouterLink>
          <RouterLink to="/topics" @click="closeMenu">专题</RouterLink>
        </div>

        <form class="search" @submit.prevent="onSearch">
          <input v-model="q" type="text" placeholder="搜索人物、事件、朝代..." />
          <button type="submit">搜索</button>
        </form>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useRoute, RouterLink } from 'vue-router';

const router = useRouter();
const route = useRoute();
const q = ref('');
const isNavOpen = ref(false);

const closeMenu = () => {
  isNavOpen.value = false;
};

const onSearch = () => {
  if (!q.value.trim()) return;
  router.push({ path: '/search', query: { q: q.value.trim() } });
  q.value = '';
  closeMenu();
};

const toggleMenu = () => {
  isNavOpen.value = !isNavOpen.value;
};

watch(
  () => route.fullPath,
  () => {
    isNavOpen.value = false;
  }
);
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid var(--border-soft);
  background: rgba(246, 242, 234, 0.9);
  backdrop-filter: saturate(180%) blur(16px);
}
.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  gap: 24px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}
.logo-mark {
  font-size: 20px;
  font-weight: 700;
  background: linear-gradient(135deg, #ff8a3c, #f45c2c);
  color: #fff;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  box-shadow: 0 8px 20px rgba(244, 92, 44, 0.35);
}
.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}
.logo-main {
  font-size: 18px;
  font-weight: 600;
}
.logo-sub {
  font-size: 12px;
  color: var(--text-muted);
  letter-spacing: 0.1em;
}
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  gap: 16px;
}
.nav-links {
  display: flex;
  gap: 8px;
}
.nav a {
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 18px;
  color: var(--text-body);
  transition: background 0.2s ease, color 0.2s ease;
}
.nav a.router-link-active {
  background: var(--text-strong);
  color: #fff;
}
.search {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--border-soft);
  border-radius: 999px;
  padding: 4px 8px;
  background: #fff;
}
.search input {
  border: none;
  background: transparent;
  font-size: 13px;
  width: 180px;
}
.search input:focus {
  outline: none;
}
.search button {
  border: none;
  background: var(--brand);
  color: #fff;
  font-size: 12px;
  padding: 6px 16px;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.2s ease;
}
.search button:hover {
  background: var(--brand-dark);
}
.nav-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: 1px solid var(--border-soft);
  background: #fff;
  cursor: pointer;
}
.nav-toggle span {
  display: block;
  height: 2px;
  width: 20px;
  background: var(--text-strong);
  margin: 0 auto;
  transition: transform 0.2s ease;
}

@media (max-width: 900px) {
  .header-inner {
    flex-wrap: wrap;
    padding: 12px 16px;
  }
  .nav-toggle {
    display: flex;
    margin-left: auto;
  }
  .nav {
    flex-direction: column;
    width: 100%;
    border: 1px solid var(--border-soft);
    border-radius: 18px;
    background: #fff;
    padding: 0;
    margin-top: 12px;
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transform: translateY(-4px);
    transition: max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease,
      transform 0.3s ease;
  }
  .nav.open {
    padding: 16px;
    max-height: 480px;
    opacity: 1;
    transform: translateY(0);
  }
  .nav-links {
    flex-direction: column;
    width: 100%;
  }
  .nav a {
    width: 100%;
  }
  .search {
    width: 100%;
    border-radius: 12px;
  }
  .search input {
    width: 100%;
  }
}
</style>
