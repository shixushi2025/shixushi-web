export const parseYearFromDateTime = (value?: string | null): number | null => {
  if (!value) return null;
  const match = value.match(/^-?\d+/);
  if (!match) return null;
  return Number(match[0]);
};

export const ensureYear = (candidate: number | null | undefined, fallback: number): number =>
  typeof candidate === 'number' && Number.isFinite(candidate) ? candidate : fallback;

