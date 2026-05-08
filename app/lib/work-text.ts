import { gutenbergUrl, type WorkManifestItem } from "./works-manifest";

const START_MARKER = "*** START OF THE PROJECT GUTENBERG EBOOK";
const END_MARKER = "*** END OF THE PROJECT GUTENBERG EBOOK";

/** PG Shakespeare ebooks put Contents + Dramatis before the script; the play starts at ACT I with SCENE I in all caps. */
const SHAKESPEARE_OPENING =
  "\n\nACT I\n\nSCENE I.";

const BY_LINE = "By William Shakespeare";

function extractGutenbergBody(raw: string): string {
  const startIdx = raw.indexOf(START_MARKER);
  const endIdx = raw.indexOf(END_MARKER);
  if (startIdx < 0 || endIdx < 0) {
    throw new Error("Project Gutenberg start/end markers not found");
  }
  const bodyStart = raw.indexOf("\n", startIdx) + 1;
  return raw.slice(bodyStart, endIdx).replace(/\r\n/g, "\n");
}

/** Title line + attribution, matching project display format for PG Shakespeare ebooks. */
function formatWorkHeading(title: string): string {
  return `${title}\n\n${BY_LINE}`;
}

function sliceFromShakespeareOpeningIfPresent(body: string): string {
  const playStart = body.indexOf(SHAKESPEARE_OPENING);
  if (playStart >= 0) {
    return body.slice(playStart + 2);
  }
  return body;
}

function normalizeCleanedBody(body: string): string {
  return body
    .split("\n")
    .map((line) => line.replace(/\s+$/, ""))
    .join("\n")
    .replace(/_([^_\n]+)_/g, "$1")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim();
}

export function cleanGutenbergText(raw: string, title: string): string {
  let body = extractGutenbergBody(raw);
  body = sliceFromShakespeareOpeningIfPresent(body);
  body = normalizeCleanedBody(body);
  return `${formatWorkHeading(title)}\n\n\n${body}`;
}

export async function fetchWorkText(item: WorkManifestItem): Promise<string> {
  const res = await fetch(gutenbergUrl(item.gutenbergId), { cache: "force-cache" });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${item.title} (#${item.gutenbergId}): ${res.status}`);
  }
  return cleanGutenbergText(await res.text(), item.title);
}
