export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatCompactNumber(value: number) {
  if (value < 1000) {
    return `${value}`;
  }

  if (value < 1000000) {
    return `${(value / 1000).toFixed(1)}K`;
  }

  return `${(value / 1000000).toFixed(1)}M`;
}

export function parseTags(rawValue: string) {
  return rawValue
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 8);
}
