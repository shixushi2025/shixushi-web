<template>
  <section>
    <h1>按朝代查看历史</h1>
    <p class="desc">从夏商周到宋元明清，按朝代进入对应时间线。</p>

    <ul class="era-list">
      <li v-for="era in eras" :key="era.slug">
        <RouterLink :to="`/era/${era.slug}`">
          <h2>{{ era.name }}</h2>
          <p>{{ era.startYear }}–{{ era.endYear }} · {{ era.summary }}</p>
        </RouterLink>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { eras } from '@/data/eras';
</script>

<style scoped>
.desc {
  margin-bottom: 12px;
  color: #666;
}
.era-list {
  list-style: none;
  padding: 0;
}
.era-list li {
  border-bottom: 1px solid #eee;
  padding: 12px 0;
}
.era-list a {
  text-decoration: none;
  color: #333;
}
.era-list h2 {
  font-size: 18px;
  margin-bottom: 4px;
}
.era-list p {
  font-size: 13px;
  color: #666;
}
</style>
