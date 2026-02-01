<template>
  <section class="page">
    <header class="page-header">
      <p class="eyebrow">Figures</p>
      <h1>历史风云人物</h1>
      <p class="lead">纵览 {{ peopleData.length }} 位改变历史进程的关键人物。</p>
    </header>

    <div class="timeline-groups">
      <section v-for="group in groupedPeople" :key="group.dynasty" class="dynasty-section">
        <h2 class="dynasty-title">
          <span class="dot"></span>
          {{ group.dynasty }}
        </h2>
        
        <div class="people-grid">
          <article v-for="person in group.items" :key="person.id" class="person-card">
            <header>
              <div class="meta">
                <span class="role-tag" :class="getRoleClass(person.categories[0])">
                  {{ person.categories[0] }}
                </span>
                <span v-if="person.title" class="title-tag">{{ person.title }}</span>
              </div>
              <h3>
                <RouterLink :to="`/people/${person.id}`">{{ person.name }}</RouterLink>
              </h3>
              <p class="years" v-if="person.birthYear">
                {{ formatYear(person.birthYear) }} – {{ formatYear(person.deathYear) }}
              </p>
            </header>
            
            <p class="summary">{{ person.summary }}</p>
            
            <blockquote v-if="person.quote" class="quote">
              “{{ person.quote }}”
            </blockquote>

            <div class="achievements" v-if="person.achievements?.length">
              <span v-for="(ach, idx) in person.achievements.slice(0, 2)" :key="idx" class="ach-pill">
                {{ ach }}
              </span>
            </div>
          </article>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import peopleData from '@/data/people.json';

// 按朝代顺序定义，确保排序正确
const dynastyOrder = ['春秋', '战国', '秦朝', '西汉', '东汉', '三国', '东晋', '唐朝', '北宋', '南宋', '元朝', '明朝', '清朝'];

const groupedPeople = computed(() => {
  const groups: Record<string, typeof peopleData> = {};
  
  peopleData.forEach(p => {
    // 归一化朝代名称（处理可能的别名）
    let dyn = p.dynasty;
    if (!groups[dyn]) {
      groups[dyn] = [];
    }
    groups[dyn].push(p);
  });

  // 按预定义顺序排序分组，未定义的朝代放到最后
  return Object.keys(groups)
    .sort((a, b) => {
      const idxA = dynastyOrder.indexOf(a);
      const idxB = dynastyOrder.indexOf(b);
      if (idxA === -1 && idxB === -1) return 0;
      if (idxA === -1) return 1;
      if (idxB === -1) return -1;
      return idxA - idxB;
    })
    .map(dyn => ({
      dynasty: dyn,
      items: groups[dyn].sort((a, b) => (a.birthYear || 0) - (b.birthYear || 0))
    }));
});

function formatYear(year?: number) {
  if (!year) return '?';
  return year < 0 ? `前${Math.abs(year)}` : year;
}

function getRoleClass(category: string) {
  const map: Record<string, string> = {
    '政治': 'role-pol',
    '军事': 'role-mil',
    '文化': 'role-cul',
    '思想': 'role-cul',
    '科技': 'role-tech',
    '外交': 'role-dip'
  };
  return map[category] || '';
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 1000px;
  margin: 0 auto;
}
.page-header {
  background: #fff;
  border-radius: 24px;
  padding: 32px;
  border: 1px solid var(--border-soft);
  text-align: center;
  background: linear-gradient(to bottom, #fff, #fdfbf7);
}
.eyebrow {
  font-size: 13px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--brand);
  font-weight: 600;
  margin-bottom: 8px;
}
.page-header h1 {
  font-size: 32px;
  margin-bottom: 12px;
  color: #2c1810;
}
.lead {
  margin: 0;
  color: var(--text-muted);
}

.timeline-groups {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-left: 16px;
  border-left: 2px solid #e2e8f0; /* 贯穿的时间轴线 */
  margin-left: 20px;
}

.dynasty-section {
  position: relative;
}

.dynasty-title {
  font-size: 20px;
  color: var(--text-strong);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  position: relative;
}
.dynasty-title .dot {
  position: absolute;
  left: -23px; /* 对齐左侧轴线 */
  width: 12px;
  height: 12px;
  background: var(--brand);
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 0 3px rgba(247, 153, 68, 0.2);
}

.people-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.person-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  border: 1px solid var(--border-soft);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
}
.person-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.06);
  border-color: var(--brand);
}

.person-card header {
  margin-bottom: 12px;
}
.meta {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}
.role-tag {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
  background: #f1f5f9;
  color: #64748b;
}
.role-pol { background: #eff6ff; color: #3b82f6; }
.role-mil { background: #fef2f2; color: #ef4444; }
.role-cul { background: #f0fdf4; color: #22c55e; }
.role-tech { background: #f5f3ff; color: #8b5cf6; }

.title-tag {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #fff7ed;
  color: #c2410c;
  border: 1px solid #ffedd5;
}

.person-card h3 {
  margin: 0;
  font-size: 18px;
}
.person-card h3 a {
  color: #1a202c;
  text-decoration: none;
}
.person-card h3 a:hover {
  color: var(--brand);
}

.years {
  margin: 4px 0 0;
  font-size: 12px;
  color: #94a3b8;
  font-variant-numeric: tabular-nums;
}

.summary {
  font-size: 14px;
  color: #475569;
  line-height: 1.5;
  margin-bottom: 16px;
  flex-grow: 1; /* 让底部对齐 */
}

.quote {
  margin: 0 0 16px;
  padding-left: 10px;
  border-left: 2px solid #cbd5e1;
  font-size: 13px;
  color: #5d4037;
  font-style: italic;
  font-family: "Songti SC", serif;
}

.achievements {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto; /* 推到底部 */
}
.ach-pill {
  font-size: 11px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #64748b;
  padding: 2px 8px;
  border-radius: 12px;
}

@media (max-width: 640px) {
  .people-grid {
    grid-template-columns: 1fr;
  }
  .timeline-groups {
    padding-left: 0;
    border-left: none;
    margin-left: 0;
  }
  .dynasty-title .dot {
    display: none;
  }
}
</style>
