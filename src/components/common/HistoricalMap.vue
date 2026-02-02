<template>
  <div id="map" class="map-container"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { HistoricalPlace } from '@/types/history';

const props = defineProps<{
  places: HistoricalPlace[];
}>();

const map = ref<L.Map | null>(null);

onMounted(() => {
  const validPlaces = props.places.filter(p => p.geo);
  if (!validPlaces.length) return;

  // 初始化地图，中心点设为第一个地点
  const [lng, lat] = validPlaces[0].geo!;
  // 使用 nextTick 确保容器已渲染，或者简单的延时
  setTimeout(() => {
      map.value = L.map('map').setView([lat, lng], 5);

      // 加载底图 (使用 CartoDB Positron 浅色风格，更有历史感)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map.value);

      // 修复 Leaflet 默认 icon 问题
      const DefaultIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });
      L.Marker.prototype.options.icon = DefaultIcon;

      // 打点
      const bounds = L.latLngBounds([]);
      validPlaces.forEach(p => {
        if (p.geo) {
          const [plng, plat] = p.geo;
          L.marker([plat, plng])
            .addTo(map.value!)
            .bindPopup(`<b>${p.ancient}</b><br>${p.modern || ''}`);
          bounds.extend([plat, plng]);
        }
      });
      
      // 如果有多个点，自动缩放视野
      if (validPlaces.length > 1) {
        map.value.fitBounds(bounds, { padding: [50, 50] });
      }
  }, 100);
});
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 300px;
  border-radius: 12px;
  z-index: 0;
  border: 1px solid var(--border-soft);
}
</style>
