
import { events } from '../src/data/events';

function checkData() {
  const ids = new Set();
  const slugs = new Set();
  let errors = [];

  console.log(`Checking ${events.length} events...`);

  events.forEach((event, index) => {
    // 1. ID 唯一性
    if (ids.has(event.id)) {
      errors.push(`Duplicate ID found: ${event.id} (at index ${index})`);
    }
    ids.add(event.id);

    // 2. Slug 唯一性
    if (slugs.has(event.slug)) {
      errors.push(`Duplicate Slug found: ${event.slug} (Title: ${event.title})`);
    }
    slugs.add(event.slug);

    // 3. 时间逻辑
    if (event.endYear && event.endYear < event.startYear) {
      errors.push(`Invalid year range for: ${event.title} (${event.startYear} to ${event.endYear})`);
    }

    // 4. 必填内容检查
    if (!event.summary || event.summary.length < 5) {
      errors.push(`Short or missing summary for: ${event.title}`);
    }

    if (event.sources.length === 0) {
      // 记录警告，不一定是错误，但对历史项目很重要
      console.warn(`Warning: No sources for [${event.id}] ${event.title}`);
    }
  });

  if (errors.length > 0) {
    console.error("❌ Data Checks Failed:");
    errors.forEach(err => console.error(` - ${err}`));
    process.exit(1);
  } else {
    console.log("✅ All basic data integrity checks passed!");
  }
}

checkData();
