// src/utils/readingTime.js
// Estimate reading time at ~200 words/min. Strips basic markdown noise.
export function readingTime(text = '') {
  const words = String(text).trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return { words, minutes, label: `${minutes} min read` };
}

export default readingTime;
