import { normalizeComparableText } from "./normalize-text";
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

/**
 * PG often indents prose stage directions with a single leading space after a newline.
 * Treat everything from after that space until the next blank line (`\n\n`) as one stage
 * direction and wrap it in brackets. Skip blocks that are empty or already start with `[`
 * after trimming (already marked as stage directions).
 */
function wrapIndentedStageDirections(body: string): string {
  return body.replace(/\n ([\s\S]*?)(?=\n\n|$)/g, (full, chunk: string) => {
    const t = chunk.trim();
    if (t.length === 0 || t.startsWith("[")) return full;
    return `\n[${t}]`;
  });
}

/** PG indents bracketed directions with a single space; strip it so lines start with `[`. */
function stripLeadingSpaceBeforeBracketStageDirections(body: string): string {
  return body.replace(/(^|\n) (?=\[)/g, "$1");
}

function normalizeCleanedBody(body: string): string {
  let out = body
    .split("\n")
    .map((line) => line.replace(/\s+$/, ""))
    .join("\n")
    .replace(/_([^_\n]+)_/g, "$1");
  out = wrapIndentedStageDirections(out);
  out = stripLeadingSpaceBeforeBracketStageDirections(out);
  return out.replace(/\n{4,}/g, "\n\n\n").trim();
}

export function cleanGutenbergText(raw: string, title: string): string {
  let body = extractGutenbergBody(raw);
  body = sliceFromShakespeareOpeningIfPresent(body);
  body = normalizeCleanedBody(body);
  return normalizeComparableText(`${formatWorkHeading(title)}\n\n\n${body}`);
}

export async function fetchWorkText(item: WorkManifestItem): Promise<string> {
  const res = await fetch(gutenbergUrl(item.gutenbergId), { cache: "force-cache" });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${item.title} (#${item.gutenbergId}): ${res.status}`);
  }
  return cleanGutenbergText(await res.text(), item.title);
}

/**
 * Use from the browser: Project Gutenberg does not expose CORS headers needed for cross-origin
 * `fetch` from this app, so the client calls this same-origin API instead (see `app/api/works/`).
 */
export async function fetchWorkTextClient(item: WorkManifestItem): Promise<string> {
  const res = await fetch(`/api/works/${item.gutenbergId}`, { cache: "force-cache" });
  if (!res.ok) {
    let detail = "";
    try {
      detail = (await res.text()).slice(0, 500);
    } catch {
      /* ignore */
    }
    throw new Error(`Failed to load ${item.title}: ${res.status} ${detail}`);
  }
  return res.text();
}
