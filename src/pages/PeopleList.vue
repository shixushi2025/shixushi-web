<template>
  <section class="page">
    <header class="page-header">
      <p class="eyebrow">People</p>
      <h1>历史人物索引</h1>
      <p class="lead">从治理者、名将到思想家，逐步完善人物档案。</p>
    </header>

    <div class="group-grid">
      <article v-for="group in peopleGroups" :key="group.title">
        <p class="group-tag">{{ group.tag }}</p>
        <h3>{{ group.title }}</h3>
        <p class="desc">{{ group.desc }}</p>
        <ul>
          <li v-for="person in group.items" :key="person.slug">
            <RouterLink :to="`/people/${person.slug}`">{{ person.name }}</RouterLink>
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

const peopleGroups = [
  {
    tag: '帝王',
    title: '帝王与政治家',
    desc: '见证王朝建立、改革与转折的关键角色。',
    items: [
      { name: '秦始皇', slug: 'qin-shi-huang' },
      { name: '汉武帝', slug: 'han-wudi' },
      { name: '唐太宗', slug: 'tang-taizong' },
    ],
  },
  {
    tag: '军事',
    title: '名将与战略家',
    desc: '决定疆域和战局的军事领袖，覆盖冷兵器到近代。',
    items: [
      { name: '卫青', slug: 'wei-qing' },
      { name: '岳飞', slug: 'yue-fei' },
      { name: '戚继光', slug: 'qi-jiguang' },
    ],
  },
  {
    tag: '思想',
    title: '思想家与学者',
    desc: '奠定文化与思想土壤的学者、教育家及科学家。',
    items: [
      { name: '孔子', slug: 'kongzi' },
      { name: '朱熹', slug: 'zhu-xi' },
      { name: '张衡', slug: 'zhang-heng' },
    ],
  },
];
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.page-header {
  background: #fff;
  border-radius: 28px;
  padding: 28px;
  border: 1px solid var(--border-soft);
  box-shadow: 0 18px 32px rgba(35, 20, 8, 0.08);
}
.eyebrow {
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 8px;
}
.lead {
  margin: 0;
  color: var(--text-body);
}
.group-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
.group-grid article {
  border-radius: 20px;
  border: 1px solid var(--border-soft);
  padding: 20px;
  background: #fff;
  box-shadow: 0 12px 20px rgba(25, 15, 5, 0.05);
}
.group-tag {
  font-size: 12px;
  letter-spacing: 0.12em;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-bottom: 6px;
}
.desc {
  color: var(--text-muted);
  font-size: 14px;
  margin-bottom: 8px;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
a {
  color: var(--brand);
  font-weight: 600;
}

@media (max-width: 640px) {
  .page-header {
    padding: 20px;
  }
}
</style>
