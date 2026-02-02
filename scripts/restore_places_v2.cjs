const fs = require('fs');
const path = require('path');

const oldEventsPath = path.join(__dirname, '../old_events.json');
const currentEventsPath = path.join(__dirname, '../src/data/events.ts');

const oldEvents = JSON.parse(fs.readFileSync(oldEventsPath, 'utf-8'));
let tsContent = fs.readFileSync(currentEventsPath, 'utf-8');

// 提取 JSON 部分
// 假设文件结构是: export const events: Event[] = [...]; ...
const startMarker = 'export const events: Event[] = ';
const endMarker = ';\n\nexport const worldPreviewEvents';
const startIndex = tsContent.indexOf(startMarker) + startMarker.length;
const endIndex = tsContent.indexOf(endMarker);

if (startIndex < startMarker.length || endIndex === -1) {
    console.error('Could not parse events.ts structure');
    process.exit(1);
}

const jsonPart = tsContent.substring(startIndex, endIndex);
let currentEvents;

try {
    currentEvents = JSON.parse(jsonPart);
} catch (e) {
    console.error('Failed to parse current events JSON:', e);
    // 可能是因为有些 key 没加引号？刚才看 events.ts 应该是标准 JSON 格式
    process.exit(1);
}

// 构建旧数据的 ID -> Regions 映射
const idToRegions = {};
oldEvents.forEach(ev => {
  if (ev.region && ev.region.length) {
    const places = ev.region.filter(r => r !== '全国' && r !== '中国' && r !== '南方' && r !== '北方' && r !== '沿海'); 
    if (places.length) {
      idToRegions[ev.id] = places;
    }
  }
});

let updateCount = 0;

currentEvents.forEach(ev => {
    // 只有当 places 不存在或为空时才补充
    if ((!ev.places || ev.places.length === 0) && idToRegions[ev.id]) {
        ev.places = idToRegions[ev.id].map(r => ({
            ancient: r, // 暂时把省份作为古地名，提示用户这是一个待考证的模糊地址
            modern: r
        }));
        updateCount++;
    }
});

const newContent = tsContent.substring(0, startIndex) + 
                   JSON.stringify(currentEvents, null, 2) + 
                   tsContent.substring(endIndex);

fs.writeFileSync(currentEventsPath, newContent);
console.log(`Successfully restored locations for ${updateCount} events.`);
