<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { eras } from '@/data/eras';
import placesRaw from '@/data/places_raw.json';
import mapsData from '@/data/maps.json';
import { wmtsLayers } from '@/data/wmts_layers';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const searchQuery = ref('');
const selectedEraSlug = ref('');
const mapMode = ref<'static' | 'digital'>('static');
let map: L.Map | null = null;
let tileLayer: L.TileLayer | null = null;

// Filter places based on search and era
const filteredPlaces = computed(() => {
  let result = placesRaw;

  if (selectedEraSlug.value) {
    result = result.filter(p => p.eras.includes(selectedEraSlug.value));
  }

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(p => 
      p.name.includes(q) || 
      p.modernDescription.includes(q) || 
      p.historicalDescription.includes(q)
    );
  }

  return result.slice(0, 50); // Limit for performance during dev
});

const currentEraMap = computed(() => {
  if (!selectedEraSlug.value) return null;
  
  // Find map chapter that includes the selected era
  const mapChapter = mapsData.find(m => m.eraSlugs.includes(selectedEraSlug.value));
  
  if (mapChapter) {
    return {
      title: mapChapter.title,
      description: mapChapter.description,
      images: mapChapter.images // Array of URLs
    };
  }
  return null;
});

const currentWmtsLayer = computed(() => {
  if (!selectedEraSlug.value) return null;
  return wmtsLayers.find(l => l.era.includes(selectedEraSlug.value));
});

function selectEra(slug: string) {
  selectedEraSlug.value = slug === selectedEraSlug.value ? '' : slug;
}

// Leaflet Logic
watch([selectedEraSlug, mapMode], async () => {
  if (mapMode.value === 'digital' && selectedEraSlug.value) {
    await nextTick();
    initMap();
    updateTileLayer();
  }
});

function initMap() {
  if (map) return;
  
  const mapContainer = document.getElementById('leaflet-map');
  if (!mapContainer) return;

  // Use EPSG:3857 (Web Mercator) as default, but Sinica maps are compatible with Google Maps tile schema
  map = L.map('leaflet-map').setView([34.3416, 108.9398], 5); // Center on Xi'an

  // Add OSM base layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    opacity: 0.5 // Semi-transparent to let history shine through? Or opaque?
  }).addTo(map);
}

function updateTileLayer() {
  if (!map) return;
  if (tileLayer) {
    map.removeLayer(tileLayer);
    tileLayer = null;
  }

  const layerInfo = currentWmtsLayer.value;
  if (layerInfo) {
    const template = `https://gis.sinica.edu.tw/ccts/file-exists.php?img=${layerInfo.id}-${layerInfo.format}-{z}-{x}-{y}`;

    tileLayer = L.tileLayer(template, {
      maxZoom: 10,
      minZoom: 3,
      attribution: 'Academia Sinica',
    });
    tileLayer.addTo(map);
  }
}
</script>

<template>
  <div class="geo-contrast-page">
    <header class="page-header">
      <h1>古今地名对照</h1>
      <p>探索中国历史地理的变迁</p>
    </header>

    <div class="controls">
      <div class="search-bar">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="搜索古地名或今地名（如：长安、西安）" 
          class="search-input"
        />
        <div class="mode-toggle">
          <button :class="{ active: mapMode === 'static' }" @click="mapMode = 'static'">高清古图</button>
          <button :class="{ active: mapMode === 'digital' }" @click="mapMode = 'digital'">数字地图</button>
        </div>
      </div>
      
      <div class="era-filters">
        <button 
          v-for="era in eras" 
          :key="era.slug"
          :class="{ active: selectedEraSlug === era.slug }"
          @click="selectEra(era.slug)"
        >
          {{ era.name }}
        </button>
      </div>
    </div>

    <div class="content-split">
      <div class="place-list">
        <div v-if="filteredPlaces.length === 0" class="empty-state">
          未找到相关地名
        </div>
        <div 
          v-for="place in filteredPlaces" 
          :key="place.id" 
          class="place-card"
        >
          <div class="place-header">
            <h3>{{ place.name }}</h3>
            <span class="place-type">{{ place.type }}</span>
          </div>
          <div class="place-body">
            <p><strong>今地：</strong>{{ place.modernDescription || '未知' }}</p>
            <p class="desc">{{ place.historicalDescription }}</p>
          </div>
        </div>
      </div>

      <div class="map-view">
        <!-- Digital Map View -->
        <div v-show="mapMode === 'digital'" id="leaflet-map" class="map-container"></div>
        <div v-show="mapMode === 'digital' && !selectedEraSlug" class="map-placeholder-overlay">
          请选择朝代以加载数字历史地图
        </div>

        <!-- Static Map View -->
        <div v-show="mapMode === 'static'">
          <div v-if="currentEraMap" class="historical-map-overlay">
            <div class="map-info">
              <h3>{{ currentEraMap.title }}</h3>
              <p>{{ currentEraMap.description.substring(0, 100) }}...</p>
            </div>
            <div v-for="imgUrl in currentEraMap.images" :key="imgUrl" class="map-image-container">
              <img :src="imgUrl" :alt="currentEraMap.title" loading="lazy" />
            </div>
            <div v-if="currentEraMap.images.length === 0" class="no-map-images">
              <p>暂无该时期的高清地图</p>
            </div>
          </div>
          <div v-else class="map-placeholder">
            <p>请选择朝代查看对应古地图</p>
            <p>或在左侧列表查看地名详情</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.geo-contrast-page {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 2rem;
  text-align: center;
}

.controls {
  margin-bottom: 2rem;
}

.search-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.search-input {
  flex: 1;
  padding: 1rem;
  font-size: 1.1rem;
  border: 1px solid var(--border-soft);
  border-radius: 8px;
  background: var(--bg-card);
  color: var(--text-strong);
}

.mode-toggle {
  display: flex;
  border: 1px solid var(--border-soft);
  border-radius: 8px;
  overflow: hidden;
}

.mode-toggle button {
  padding: 0 1.5rem;
  background: var(--bg-card);
  border: none;
  border-left: 1px solid var(--border-soft);
  cursor: pointer;
  font-weight: bold;
}

.mode-toggle button:first-child {
  border-left: none;
}

.mode-toggle button.active {
  background: var(--brand);
  color: white;
}

.era-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.era-filters button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-soft);
  border-radius: 20px;
  background: var(--bg-card);
  cursor: pointer;
  transition: all 0.2s;
}

.era-filters button.active {
  background: var(--brand);
  color: white;
  border-color: var(--brand);
}

.content-split {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  height: 600px;
}

.place-list {
  overflow-y: auto;
  padding-right: 1rem;
}

.place-card {
  background: var(--bg-card);
  border: 1px solid var(--border-soft);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.place-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.place-type {
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
  background: var(--bg-muted);
  border-radius: 4px;
}

.desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-top: 0.5rem;
}

.map-view {
  background: var(--bg-muted);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  /* Ensure map fills container */
}

.map-container {
  width: 100%;
  height: 100%;
  z-index: 1;
}

.map-placeholder-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  z-index: 1000;
  pointer-events: none;
}

.historical-map-overlay {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 1rem;
}

.map-info {
  margin-bottom: 1rem;
  background: var(--bg-card);
  padding: 1rem;
  border-radius: 8px;
}

.map-image-container {
  margin-bottom: 2rem;
  border: 1px solid var(--border-soft);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.map-image-container img {
  width: 100%;
  height: auto;
  display: block;
}

.no-map-images {
  text-align: center;
  padding: 2rem;
  color: var(--text-muted);
}

.map-placeholder {
  text-align: center;
  color: var(--text-muted);
}
</style>
