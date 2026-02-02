<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <div class="hero-left">
          <div class="hero-labels">
            <span class="glow-pill">时序史 · Time Universe</span>
          </div>
          <h1>纵览五千年文明脉络</h1>
          <p class="subtitle">
            从先秦到近代，跨越朝代更替，连接中西历史。探索 {{ stats.events }} 个关键时刻，
            {{ stats.people }} 位风云人物与 {{ stats.emperors }} 位帝王。
          </p>
          <div class="hero-actions">
            <RouterLink to="/china" class="btn primary">开始探索</RouterLink>
            <RouterLink to="/people" class="btn ghost">风云人物</RouterLink>
          </div>
          <div class="stat-badges">
            <span class="stat-chip">
              <span class="value">{{ stats.events }}</span>
              <span class="label">历史事件</span>
            </span>
            <span class="stat-chip">
              <span class="value">{{ stats.people }}</span>
              <span class="label">风云人物</span>
            </span>
            <span class="stat-chip">
              <span class="value">{{ stats.emperors }}</span>
              <span class="label">帝王世系</span>
            </span>
          </div>
        </div>
        
        <!-- 今日推荐卡片 -->
        <div class="hero-panel">
          <div class="panel-header">
            <span class="pill">历史上的回响</span>
          </div>
          <div v-if="featuredPerson" class="daily-feature">
            <span class="feature-icon">“</span>
            <p class="feature-quote">{{ featuredPerson.quote }}</p>
            <p class="feature-author">—— {{ featuredPerson.name }} ({{ featuredPerson.dynasty }})</p>
            <RouterLink :to="`/people/${featuredPerson.id}`" class="feature-link">查看人物 →</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- 模块导航 -->
    <section class="modules-panel">
      <div class="module-grid">
        <RouterLink
          v-for="card in moduleCards"
          :key="card.focusKey"
          :to="card.link"
          class="module-card"
          :class="card.focusKey"
          :style="getCardStyle(card.focusKey)"
        >
          <div class="module-card__header">
            <span class="pill" :style="getPillStyle(card.focusKey)">
              <span class="pill-icon">{{ getFocusMeta(card.focusKey).icon }}</span>
              {{ card.focus }} · {{ card.tag }}
            </span>
            <span class="module-illustration">{{ getFocusMeta(card.focusKey).glyph }}</span>
          </div>
          <h3>{{ card.title }}</h3>
          <p class="module-subtitle" v-if="card.subtitle">{{ card.subtitle }}</p>
          <p>{{ card.desc }}</p>
          <span class="module-link">
            <span class="label">{{ card.cta }}</span>
            <span class="arrow">→</span>
          </span>
        </RouterLink>
      </div>
    </section>

    <!-- 最新收录事件预览 -->
    <section class="timeline-preview">
      <div class="section-head">
        <h2>最新收录事件</h2>
        <RouterLink to="/china" class="text-link">查看全部历史 →</RouterLink>
      </div>
      <EventTimeline :events="recentEvents" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import EventTimeline from '@/components/common/EventTimeline.vue';
import { events } from '@/data/events';
import peopleData from '@/data/people.json';
import emperorData from '@/data/emperors.json';

// 统计数据
const stats = computed(() => ({
  events: events.length,
  people: peopleData.length,
  emperors: emperorData.length
}));

// 随机推荐一个有格言的人物
const featuredPerson = computed(() => {
  const candidates = peopleData.filter(p => p.quote);
  if (!candidates.length) return null;
  // 简单伪随机，实际可用当天日期做种子
  const idx = Math.floor(Math.random() * candidates.length);
  return candidates[idx];
});

// 展示部分事件（例如挑几个重要的或随机的，这里暂取前几条作为示例，实际可取更有代表性的）
const recentEvents = computed(() => {
  // 过滤掉世界史，只看中国史，取前5条
  return events.filter(e => !e.types?.includes('世界史')).slice(0, 5);
});

// 动态计算模块卡片数据
const moduleCards = computed(() => {
  const worldEvents = events.filter(e => e.types?.includes('世界史'));
  const latestWorld = worldEvents[worldEvents.length - 1];
  
  return [
    {
      focus: '历史',
      focusKey: 'history',
      title: '中国史主轴',
      subtitle: '王朝更迭与制度脉络',
      desc: '从夏商周到近现代，详尽记录朝代兴衰。',
      link: '/china',
      cta: '进入历史模块',
      tag: '年代轴',
    },
    {
      focus: '世界',
      focusKey: 'world',
      title: '世界重大事件',
      subtitle: latestWorld 
        ? `同期：${latestWorld.title}`
        : '全球视角下的时代转折',
      desc: '同步全球战争、工业化、地缘节点，与中国进程对照。',
      link: '/world',
      cta: '浏览世界线',
      tag: '对照阅读',
    },
    {
      focus: '专题',
      focusKey: 'topic',
      title: '专题与人物',
      subtitle: '制度·思想·科技',
      desc: '聚焦变革关键点：#变法 #科举 #大一统',
      link: '/topics',
      cta: '查看专题索引',
      tag: '深度策展',
    },
    {
      focus: '人物',
      focusKey: 'people',
      title: '人物索引',
      subtitle: '人物谱系与影响轨迹',
      desc: `收录 ${peopleData.length} 位风云人物`,
      link: '/people',
      cta: '阅读人物传记',
      tag: '传记目录',
    },
  ];
});

// 辅助样式函数
const focusMeta: Record<string, { gradient: string; accent: string; icon: string; glyph: string }> = {
  history: {
    gradient: 'linear-gradient(135deg, rgba(247, 153, 68, 0.14), rgba(255, 227, 199, 0.8))',
    accent: '#f79944',
    icon: '⏳',
    glyph: '📜',
  },
  world: {
    gradient: 'linear-gradient(135deg, rgba(40, 115, 255, 0.16), rgba(218, 232, 255, 0.9))',
    accent: '#2873ff',
    icon: '🌐',
    glyph: '🗺️',
  },
  topic: {
    gradient: 'linear-gradient(135deg, rgba(128, 90, 213, 0.16), rgba(233, 224, 255, 0.9))',
    accent: '#805ad5',
    icon: '📂',
    glyph: '🎯',
  },
  people: {
    gradient: 'linear-gradient(135deg, rgba(0, 196, 140, 0.14), rgba(214, 246, 237, 0.9))',
    accent: '#00c48c',
    icon: '👥',
    glyph: '🧭',
  },
  era: {
    gradient: 'linear-gradient(135deg, rgba(220, 38, 38, 0.14), rgba(254, 226, 226, 0.9))',
    accent: '#dc2626',
    icon: '⛩️',
    glyph: '👑',
  }
};

const getFocusMeta = (key: string) => focusMeta[key] || focusMeta.history!;

const getCardStyle = (key: string) => {
  const meta = getFocusMeta(key);
  return {
    backgroundImage: meta.gradient,
    borderColor: `${meta.accent}33`,
    boxShadow: `0 16px 30px ${meta.accent}22`,
  };
};

const getPillStyle = (key: string) => {
  const meta = getFocusMeta(key);
  return {
    background: `${meta.accent}12`,
    color: meta.accent,
    borderColor: `${meta.accent}40`,
  };
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 48px;
  max-width: 1100px;
  margin: 0 auto;
}

/* Hero Section */
.hero {
  background: #fff;
  border-radius: 32px;
  padding: 48px;
  border: 1px solid var(--border-soft);
  background: linear-gradient(135deg, #fff, #fffbf5);
  box-shadow: 0 20px 40px rgba(0,0,0,0.04);
}
.hero-content {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 48px;
  align-items: center;
}
.hero-left {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.glow-pill {
  font-size: 12px;
  font-weight: 700;
  color: var(--brand);
  background: rgba(247, 153, 68, 0.1);
  padding: 6px 12px;
  border-radius: 99px;
  display: inline-block;
  letter-spacing: 0.05em;
}
h1 {
  font-size: 48px;
  line-height: 1.1;
  color: #2c1810;
  font-family: "Songti SC", serif;
  margin: 0;
}
.subtitle {
  font-size: 16px;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}
.hero-actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}
.btn {
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}
.btn.primary {
  background: #2c1810;
  color: #fff;
}
.btn.primary:hover {
  background: #4a3b32;
  transform: translateY(-2px);
}
.btn.ghost {
  background: #f1f5f9;
  color: #475569;
}
.btn.ghost:hover {
  background: #e2e8f0;
}

.stat-badges {
  display: flex;
  gap: 16px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(0,0,0,0.06);
}
.stat-chip {
  display: flex;
  flex-direction: column;
}
.stat-chip .value {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
}
.stat-chip .label {
  font-size: 12px;
  color: #94a3b8;
}

/* Daily Feature Panel */
.hero-panel {
  background: #fff;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 12px 24px rgba(0,0,0,0.03);
  position: relative;
  overflow: hidden;
}
.hero-panel::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; height: 6px;
  background: linear-gradient(90deg, #f79944, #f45c2c);
}
.panel-header .pill {
  font-size: 12px;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.daily-feature {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.feature-icon {
  font-size: 48px;
  color: rgba(247, 153, 68, 0.2);
  line-height: 1;
  font-family: serif;
}
.feature-quote {
  font-size: 20px;
  font-family: "Songti SC", serif;
  color: #2c1810;
  line-height: 1.5;
  margin: 0;
}
.feature-author {
  font-size: 14px;
  color: #64748b;
  margin: 0;
}
.feature-link {
  font-size: 14px;
  font-weight: 600;
  color: var(--brand);
  text-decoration: none;
  margin-top: 8px;
}

/* Modules Grid */
.module-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}
.module-card {
  background: #fff;
  padding: 24px;
  border-radius: 20px;
  border: 1px solid var(--border-soft);
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.module-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.06);
  border-color: var(--brand);
}
.module-icon {
  font-size: 32px;
  margin-bottom: 8px;
}
.module-card h3 {
  margin: 0;
  font-size: 18px;
  color: #1e293b;
}
.module-card p {
  margin: 0;
  font-size: 14px;
  color: #64748b;
  line-height: 1.5;
}

/* Timeline Preview */
.timeline-preview {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.section-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.section-head h2 {
  font-size: 24px;
  margin: 0;
}
.text-link {
  color: var(--brand);
  font-weight: 600;
  text-decoration: none;
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    padding: 24px;
  }
  .hero {
    padding: 0;
    background: transparent;
    box-shadow: none;
    border: none;
  }
  .hero-content {
    background: #fff;
    border: 1px solid var(--border-soft);
    border-radius: 24px;
  }
  h1 {
    font-size: 32px;
  }
}
</style>
