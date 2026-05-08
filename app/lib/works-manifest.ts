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
