const fs = require('fs');
const path = require('path');

// 读取旧数据
const oldEventsPath = path.join(__dirname, '../old_events.json');
const currentEventsPath = path.join(__dirname, '../src/data/events.ts');

const oldEvents = JSON.parse(fs.readFileSync(oldEventsPath, 'utf-8'));
// 读取新数据文件内容（因为它是 TS 文件，不好直接 require，我们读取文本然后正则替换，或者暂时手动处理）
// 为了稳妥，我这里先用正则解析出 id 和 places 的关系，这比解析整个 TS AST 要简单

let currentContent = fs.readFileSync(currentEventsPath, 'utf-8');

// 构建旧数据的 ID -> Regions 映射
const idToRegions = {};
const PROVINCES = new Set(['河南', '陕西', '山东', '山西', '安徽', '江苏', '河北', '广东', '湖北', '北京', '武汉', '四川', '湖南', '福建', '甘肃', '辽宁', '内蒙古', '浙江', '江西']);

oldEvents.forEach(ev => {
  if (ev.region && ev.region.length) {
    // 过滤出省份/城市信息（排除 '全国', '南方', '北方', '沿海', '漠北' 等宏观词，或者保留它们作为参考）
    // 策略：保留所有非空词，作为 modern 地址的线索
    const places = ev.region.filter(r => r !== '全国' && r !== '中国'); 
    if (places.length) {
      idToRegions[ev.id] = places;
    }
  }
});

console.log(`Found location info for ${Object.keys(idToRegions).length} events from old data.`);

// 遍历替换
// 我们寻找类似 { id: 1001, ... places: [...] ... } 的结构
// 如果找不到 places 字段，就插入一个

// 正则匹配每个事件块
// 假设格式比较标准
let updateCount = 0;

// 简单的字符串处理策略：
// 1. 按 "id": 1001 分割定位
// 2. 检查该块是否有 "places": [
// 3. 如果没有，在 "types": [...] 后面插入 "places"

Object.keys(idToRegions).forEach(id => {
  const regions = idToRegions[id];
  const regex = new RegExp(`id:\\s*${id},[\\s\\S]*?types:\\s*\\[[^\\]]*\\](,)`, 'g');
  
  // 检查当前内容里这个 ID 是否已经有 places 了
  // 这是一个粗略检查，防止覆盖已有的详细数据
  const blockRegex = new RegExp(`id:\\s*${id},[\\s\\S]*?\\},`, 'g'); // 匹配整个对象块
  const match = currentContent.match(blockRegex);
  
  if (match) {
    const block = match[0];
    if (!block.includes('places:')) {
      // 构造新的 places 字符串
      const placesStr = regions.map(r => `{ ancient: '${r}', modern: '${r}' }`).join(', ');
      // 插入
      currentContent = currentContent.replace(
        regex, 
        (match, comma) => `${match}\n    places: [${placesStr}]${comma}`
      );
      updateCount++;
    }
  }
});

fs.writeFileSync(currentEventsPath, currentContent);
console.log(`Updated ${updateCount} events with restored location info.`);
