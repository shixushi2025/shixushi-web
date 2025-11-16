<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const idSlug = route.params.idSlug as string;
</script>

<template>
  <div>
    <h1>人物详情：{{ idSlug }}</h1>
    <p>这里展示该人物的生平与相关事件。</p>
  </div>
</template>
