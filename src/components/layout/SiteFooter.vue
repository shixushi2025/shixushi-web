<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="brand">
        <p class="name">时序史 · 时间宇宙</p>
        <p>
          用一条竖向时间线串联历史、当下与未来的事件，结合结构化数据与专题视角呈现变化。
        </p>
        <p class="copyright">© {{ year }} 时序史 · 时间宇宙</p>
      </div>

      <div class="columns">
        <div class="column">
          <h4>快速导航</h4>
          <RouterLink to="/china">中国时间线</RouterLink>
          <RouterLink to="/world">世界事件</RouterLink>
          <RouterLink to="/era">按朝代</RouterLink>
          <RouterLink to="/people">人物</RouterLink>
        </div>

        <div class="column">
          <h4>设计进度</h4>
          <p>当前为演示数据，持续补充朝代、人物与专题内容。</p>
          <p class="muted">欢迎通过 issue/邮件反馈设计建议。</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

const year = new Date().getFullYear();
</script>

<style scoped>
.footer {
  border-top: 1px solid var(--border-soft);
  background: var(--bg-muted);
  margin-top: 48px;
}
.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  font-size: 14px;
}
.brand {
  flex: 1 1 260px;
}
.name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}
.columns {
  display: flex;
  flex: 1 1 320px;
  gap: 32px;
}
.column {
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: var(--text-body);
}
.column h4 {
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-muted);
  margin-bottom: 8px;
}
.column a {
  color: var(--text-body);
  font-size: 14px;
}
.muted {
  color: var(--text-muted);
  font-size: 13px;
}
.copyright {
  margin-top: 12px;
  color: var(--text-muted);
  font-size: 12px;
}

@media (max-width: 768px) {
  .footer-inner {
    flex-direction: column;
    padding: 24px 16px 32px;
  }
  .columns {
    flex-direction: column;
    gap: 24px;
  }
}
</style>
