export interface WMTSLayer {
  id: string;
  name: string;
  era: string[]; // Associated era slugs
  format: 'png' | 'jpg';
}

export const wmtsLayers: WMTSLayer[] = [
  { id: 'shang', name: '商时期地图', era: ['shang'], format: 'png' },
  { id: 'Xijhou', name: '西周时期地图', era: ['western-zhou'], format: 'png' },
  { id: 'spring_autumn', name: '春秋时期地图', era: ['chunqiu', 'eastern-zhou'], format: 'png' },
  { id: 'warring_states', name: '战国时期地图', era: ['zhanguo', 'eastern-zhou'], format: 'png' },
  { id: 'bc0210', name: '秦代历史地图', era: ['qin'], format: 'png' },
  { id: 'bc0007', name: '西汉历史地图', era: ['western-han'], format: 'png' },
  { id: 'ad0140', name: '东汉历史地图', era: ['eastern-han'], format: 'png' },
  { id: 'ad0262', name: '三国历史地图', era: ['three-kingdoms', 'cao-wei', 'shu-han', 'sun-wu'], format: 'png' },
  { id: 'ad0281', name: '西晋历史地图', era: ['western-jin'], format: 'png' },
  { id: 'ad0382', name: '东晋历史地图', era: ['eastern-jin'], format: 'png' },
  { id: 'ad0497', name: '南北朝历史地图', era: ['southern-northern-dynasties', 'northern-wei', 'southern-liang'], format: 'png' },
  { id: 'ad0612', name: '隋代历史地图', era: ['sui'], format: 'png' },
  { id: 'ad0741', name: '唐代历史地图', era: ['tang'], format: 'png' },
  { id: 'ad1111', name: '北宋历史地图', era: ['northern-song', 'liao'], format: 'png' }, // Liao often overlaps
  { id: 'ad1208', name: '南宋历史地图', era: ['southern-song', 'jin-jurchen'], format: 'png' },
  { id: 'ad1330', name: '元代历史地图', era: ['yuan'], format: 'png' },
  { id: 'ad1582', name: '明代历史地图', era: ['ming'], format: 'png' },
  { id: 'ad1820', name: '清代历史地图', era: ['qing'], format: 'png' }
];

export const getTileUrl = (layerId: string, format: string = 'png', x: number, y: number, z: number) => {
  // Template: https://gis.sinica.edu.tw/ccts/file-exists.php?img={LayerID}-{format}-{z}-{x}-{y}
  return `https://gis.sinica.edu.tw/ccts/file-exists.php?img=${layerId}-${format}-${z}-${x}-${y}`;
};
