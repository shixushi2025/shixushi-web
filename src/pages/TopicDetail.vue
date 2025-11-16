<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const slug = route.params.slug as string;
</script>

<template>
  <div>
    <h1>专题详情：{{ slug }}</h1>
    <p>这里展示按主题串起来的历史脉络。</p>
  </div>
</template>
