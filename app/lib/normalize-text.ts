/** En/em dash, minus, hyphen variants → ASCII `-` */
const DASH_LIKE = /[\u2013\u2014\u2212\u2010\u2011]/g;
/** NBSP and narrow NBSP → ordinary space */
const SPACE_LIKE = /[\u00A0\u202F]/g;
/** Unicode apostrophe / single-quote lookalikes → ASCII `'` */
const APOSTROPHE_LIKE = /[\u2018\u2019\u201A\u02BC]/g;
/** Unicode double-quote lookalikes → ASCII `"` */
const DOUBLE_QUOTE_LIKE = /[\u201C\u201D\u201E\u00AB\u00BB]/g;

/**
 * Normalize punctuation and common Unicode lookalikes so source text and
 * keyboard input compare equal for the typewriter flow.
 */
export function normalizeComparableText(s: string): string {
  return s
    .replace(/\uFEFF/g, "")
    .replace(/\u2026/g, "...")
    .replace(DASH_LIKE, "-")
    .replace(SPACE_LIKE, " ")
    .replace(/\u2032/g, "'")
    .replace(/\u2033/g, '"')
    .replace(APOSTROPHE_LIKE, "'")
    .replace(DOUBLE_QUOTE_LIKE, '"');
}
