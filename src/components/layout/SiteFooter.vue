<template>
  <footer class="footer">
    <div class="footer-inner">
      <p>© {{ year }} 时序史 · 历史时间轴 lishishijian.com</p>
      <p class="desc">
        聚焦中国历史与世界重大事件，采用时间线与结构化数据呈现历史脉络。
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<style scoped>
.footer {
  border-top: 1px solid #eee;
  padding: 16px;
  background: #fafafa;
}
.footer-inner {
  max-width: 1100px;
  margin: 0 auto;
  font-size: 12px;
  color: #777;
}
.desc {
  margin-top: 4px;
}
</style>
