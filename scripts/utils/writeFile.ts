import { writeFileSync } from 'node:fs';
import path from 'node:path';

const AUTOGEN_BANNER = `/**
 * This file is auto-generated via the scripts in /scripts/wikidata.
 * Do not edit by hand. Update the data through the scripts instead.
 */
`;

export const writeDataFile = (relativePath: string, body: string) => {
  const filePath = path.resolve(process.cwd(), relativePath);
  writeFileSync(filePath, `${AUTOGEN_BANNER}${body}`);
  console.log(`✔ Wrote ${relativePath}`);
};

