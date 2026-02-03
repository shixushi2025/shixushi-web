<template>
  <header class="header">
    <div class="header-inner">
      <RouterLink to="/" class="logo" @click="closeMenu">
        <div class="logo-mark">史</div>
        <div class="logo-text">
          <span class="logo-main">时序史</span>
          <span class="logo-sub">TIME UNIVERSE</span>
        </div>
      </RouterLink>

      <button
        class="nav-toggle"
        type="button"
        @click="toggleMenu"
        :aria-expanded="isNavOpen"
        aria-label="Toggle navigation"
      >
        <span class="hamburger"></span>
      </button>

      <nav :class="['nav', { open: isNavOpen }]">
        <div class="nav-links">
          <RouterLink to="/china" @click="closeMenu">中国史</RouterLink>
          <RouterLink to="/world" @click="closeMenu">世界史</RouterLink>
          <RouterLink to="/parallel" @click="closeMenu">中外对照</RouterLink>
          <RouterLink to="/people" @click="closeMenu">风云人物</RouterLink>
          <RouterLink to="/era" @click="closeMenu">朝代索引</RouterLink>
        </div>

        <form class="search-bar" @submit.prevent="onSearch">
          <span class="search-icon">🔍</span>
          <input 
            v-model="q" 
            type="text" 
            placeholder="搜索历史事件、人物..." 
            aria-label="Search history"
          />
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
  z-index: 100;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}
.header-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}
.logo-mark {
  width: 40px;
  height: 40px;
  background: #2c1810;
  color: #fff;
  border-radius: 8px;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 20px;
  font-family: "Songti SC", serif;
}
.logo-text {
  display: flex;
  flex-direction: column;
}
.logo-main {
  font-size: 18px;
  font-weight: 700;
  color: #1a202c;
  letter-spacing: -0.02em;
}
.logo-sub {
  font-size: 10px;
  color: #94a3b8;
  letter-spacing: 0.15em;
  font-weight: 600;
}

/* Nav */
.nav {
  display: flex;
  align-items: center;
  gap: 32px;
}
.nav-links {
  display: flex;
  gap: 24px;
}
.nav-links a {
  color: #4a5568;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  position: relative;
  transition: color 0.2s;
}
.nav-links a:hover,
.nav-links a.router-link-active {
  color: #2c1810;
}
.nav-links a.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background: #f79944;
  border-radius: 2px;
}

/* Search */
.search-bar {
  display: flex;
  align-items: center;
  background: #f1f5f9;
  border-radius: 99px;
  padding: 6px 16px;
  transition: all 0.2s;
  border: 1px solid transparent;
}
.search-bar:focus-within {
  background: #fff;
  border-color: #cbd5e0;
  box-shadow: 0 0 0 3px rgba(203, 213, 224, 0.3);
}
.search-icon {
  font-size: 14px;
  margin-right: 8px;
  opacity: 0.5;
}
.search-bar input {
  border: none;
  background: transparent;
  font-size: 14px;
  width: 160px;
  color: #2d3748;
}
.search-bar input:focus {
  outline: none;
}
.search-bar input::placeholder {
  color: #a0aec0;
}

/* Mobile Toggle */
.nav-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}
.hamburger {
  display: block;
  width: 24px;
  height: 2px;
  background: #2d3748;
  position: relative;
}
.hamburger::before, .hamburger::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background: #2d3748;
  left: 0;
}
.hamburger::before { top: -6px; }
.hamburger::after { bottom: -6px; }

/* Responsive */
@media (max-width: 768px) {
  .nav-toggle { display: block; }
  
  .nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #fff;
    flex-direction: column;
    padding: 24px;
    border-bottom: 1px solid var(--border-soft);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    opacity: 0;
    pointer-events: none;
    transform: translateY(-10px);
    transition: all 0.2s;
  }
  .nav.open {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }
  .nav-links {
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
  }
  .search-bar {
    width: 100%;
  }
  .search-bar input {
    width: 100%;
  }
}
</style>
