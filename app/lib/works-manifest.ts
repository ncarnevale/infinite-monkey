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

// Follows the first folio order https://wikipedia.org/wiki/First_Folio
export const ORDERED_SHAKESPEARE_WORKS: readonly WorkManifestItem[] = [
  { id: "tempest", gutenbergId: 1540, title: "The Tempest" },
  { id: "two-gentlemen-of-verona", gutenbergId: 1509, title: "Two Gentlemen of Verona" },
  { id: "merry-wives-of-windsor", gutenbergId: 1517, title: "The Merry Wives of Windsor" },
  { id: "measure-for-measure", gutenbergId: 1530, title: "Measure for Measure" },
  { id: "comedy-of-errors", gutenbergId: 1504, title: "The Comedy of Errors" },
  { id: "much-ado-about-nothing", gutenbergId: 1519, title: "Much Ado about Nothing" },
  { id: "loves-labours-lost", gutenbergId: 1510, title: "Love's Labour's Lost" },
  { id: "a-midsummer-nights-dream", gutenbergId: 1514, title: "A Midsummer Night's Dream" },
  { id: "merchant-of-venice", gutenbergId: 1515, title: "The Merchant of Venice" },
  { id: "as-you-like-it", gutenbergId: 1523, title: "As You Like It" },
  { id: "taming-of-the-shrew", gutenbergId: 1508, title: "The Taming of the Shrew" },
  { id: "alls-well-that-ends-well", gutenbergId: 1529, title: "All's Well That Ends Well" },
  { id: "twelfth-night", gutenbergId: 1526, title: "Twelfth Night" },
  { id: "the-winters-tale", gutenbergId: 1539, title: "The Winter's Tale" },
  { id: "king-john", gutenbergId: 1511, title: "King John" },
  { id: "richard-ii", gutenbergId: 1512, title: "King Richard II" },
  { id: "henry-iv-part-1", gutenbergId: 1516, title: "King Henry IV, Part 1" },
  { id: "henry-iv-part-2", gutenbergId: 1518, title: "King Henry IV, Part 2" },
  { id: "henry-v", gutenbergId: 1521, title: "King Henry V" },
  { id: "henry-vi-part-1", gutenbergId: 1500, title: "King Henry VI, Part 1" },
  { id: "henry-vi-part-2", gutenbergId: 1501, title: "King Henry VI, Part 2" },
  { id: "henry-vi-part-3", gutenbergId: 1502, title: "King Henry VI, Part 3" },
  { id: "richard-iii", gutenbergId: 1503, title: "King Richard III" },
  { id: "henry-viii", gutenbergId: 1541, title: "King Henry VIII" },
  { id: "troilus-and-cressida", gutenbergId: 1528, title: "Troilus and Cressida" },
  { id: "coriolanus", gutenbergId: 1535, title: "Coriolanus" },
  { id: "titus-andronicus", gutenbergId: 1507, title: "Titus Andronicus" },
  { id: "romeo-and-juliet", gutenbergId: 1513, title: "Romeo and Juliet" },
  { id: "timon-of-athens", gutenbergId: 1536, title: "Timon of Athens" },
  { id: "julius-caesar", gutenbergId: 1522, title: "Julius Caesar" },
  { id: "macbeth", gutenbergId: 1533, title: "Macbeth" },
  { id: "hamlet", gutenbergId: 1524, title: "Hamlet" },
  { id: "king-lear", gutenbergId: 1532, title: "King Lear" },
  { id: "othello", gutenbergId: 1531, title: "Othello" },
  { id: "antony-and-cleopatra", gutenbergId: 1534, title: "Antony and Cleopatra" },
  { id: "cymbeline", gutenbergId: 1133, title: "Cymbeline" },
];

export const WORKS: readonly WorkManifestItem[] = ORDERED_SHAKESPEARE_WORKS;
