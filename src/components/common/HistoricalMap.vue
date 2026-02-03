<template>
  <div id="map" class="map-container"></div>
</template>

<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { HistoricalPlace } from '@/types/history';

const props = defineProps<{
  places: HistoricalPlace[];
}>();

// 使用 shallowRef 避免 Vue 深度代理 Leaflet 实例
const map = shallowRef<any>(null);

onMounted(() => {
  const validPlaces = props.places.filter(p => p.geo && p.geo.length === 2);
  if (!validPlaces.length) return;

  // 初始化地图，中心点设为第一个地点
  const place = validPlaces[0];
  if (!place || !place.geo) return;

  const lat = place.geo[1];
  const lng = place.geo[0];

  setTimeout(() => {
      // 检查 DOM 元素是否存在
      if (!document.getElementById('map')) return;

      const mapInstance = L.map('map').setView([lat, lng], 5);
      map.value = mapInstance;

      // 加载底图
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(mapInstance);

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
            .addTo(mapInstance)
            .bindPopup(`<b>${p.ancient}</b><br>${p.modern || ''}`);
          bounds.extend([plat, plng]);
        }
      });
      
      if (validPlaces.length > 1) {
        mapInstance.fitBounds(bounds, { padding: [50, 50] });
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
