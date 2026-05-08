import { gutenbergUrl, type WorkManifestItem } from "./works-manifest";

const START_MARKER = "*** START OF THE PROJECT GUTENBERG EBOOK";
const END_MARKER = "*** END OF THE PROJECT GUTENBERG EBOOK";

export function cleanGutenbergText(raw: string): string {
  const startIdx = raw.indexOf(START_MARKER);
  const endIdx = raw.indexOf(END_MARKER);
  if (startIdx < 0 || endIdx < 0) {
    throw new Error("Project Gutenberg start/end markers not found");
  }
  const bodyStart = raw.indexOf("\n", startIdx) + 1;
  const body = raw.slice(bodyStart, endIdx);

  return body
    .split("\n")
    .map((line) => line.replace(/\s+$/, ""))
    .join("\n")
    .replace(/_([^_\n]+)_/g, "$1")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim();
}

export async function fetchWorkText(item: WorkManifestItem): Promise<string> {
  const res = await fetch(gutenbergUrl(item.gutenbergId), { cache: "force-cache" });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${item.title} (#${item.gutenbergId}): ${res.status}`);
  }
  return cleanGutenbergText(await res.text());
}
