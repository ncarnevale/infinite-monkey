/**
 * Scaling beyond a single work is intentionally additive-only (no cleaner/parser changes):
 *
 * 1. Append entries to WORKS — same shape for every PG plain-text title.
 * 2. Optional per-work endpoint, e.g. GET /api/works/[id] → fetchWorkText(item) as text/plain.
 * 3. Optional Client Component typewriter: when progress crosses ~80% of current text, fetch the
 *    next work and concatenate or swap; state can stay minimal (e.g. work id + offset in localStorage).
 *
 * Poetry and plays both use the same START/END Gutenberg envelope, so cleanGutenbergText stays shared.
 */

export type WorkManifestItem = {
  id: string; // 'tempest', 'hamlet', ...
  gutenbergId: number; // 1540, 1524, ...
  title: string;
};

export function gutenbergUrl(gutenbergId: number): string {
  return `https://www.gutenberg.org/cache/epub/${gutenbergId}/pg${gutenbergId}.txt`;
}

export const WORKS: readonly WorkManifestItem[] = [
  { id: "tempest", gutenbergId: 1540, title: "The Tempest" },
];
