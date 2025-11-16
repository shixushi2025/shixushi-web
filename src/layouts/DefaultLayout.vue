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
}
.main-content {
  flex: 1;
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 16px 48px;
}
</style>
