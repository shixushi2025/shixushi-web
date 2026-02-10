export interface GeoPoint {
  lat: number;
  lng: number;
}

// 1. 现代地理基座（不变的锚点）
export interface ModernLocation {
  id: string;          // e.g., "loc_xian"
  name: string;        // 现代地名，如 "陕西省西安市"
  province: string;    // 省份，便于筛选
  coordinates: GeoPoint;
}

// 2. 历史地名层（随时间变化）
export interface HistoricalPlace {
  id: string;
  name: string;             // 古地名，如 "长安"
  modernLocationId: string; // 关联到现代地名 ID
  eras: string[];           // 适用朝代 slug，如 ["western-han", "tang"]
  type: 'capital' | 'battlefield' | 'county' | 'pass' | 'mountain'; // 类型
  description: string;      // 简述
}

// 3. 聚合视图（前端展示用）
// 当用户搜索"西安"时，我们返回这个结构：
export interface LocationTimeline {
  modern: ModernLocation;
  history: {
    [eraSlug: string]: string; // "qin": "内史/咸阳(近)", "tang": "长安"
  };
}
