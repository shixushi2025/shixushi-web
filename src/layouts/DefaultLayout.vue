<template>
  <div class="app-container">
    <SiteHeader />

    <main class="main-content">
      <slot />
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import SiteHeader from '@/components/layout/SiteHeader.vue';
import SiteFooter from '@/components/layout/SiteFooter.vue';
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: radial-gradient(circle at top, rgba(255, 255, 255, 0.8), transparent 55%),
    var(--bg-page);
}
.main-content {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 32px 24px 64px;
}

@media (max-width: 768px) {
  .main-content {
    padding: 24px 16px 48px;
  }
}
</style>
