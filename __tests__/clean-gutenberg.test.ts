import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { cleanGutenbergText } from "../app/lib/work-text";

const fixturePath = join(import.meta.dirname, "fixtures", "pg1540.txt");

function headingPrefix(title: string): string {
  return `${title}\n\nBy William Shakespeare\n\n\n`;
}

describe("cleanGutenbergText", () => {
  it("throws when START or END marker is missing", () => {
    expect(() =>
      cleanGutenbergText(
        "no start\n*** END OF THE PROJECT GUTENBERG EBOOK ***\n",
        "Demo",
      ),
    ).toThrow("Project Gutenberg start/end markers not found");

    expect(() =>
      cleanGutenbergText(
        "*** START OF THE PROJECT GUTENBERG EBOOK DEMO ***\nbody\n",
        "Demo",
      ),
    ).toThrow("Project Gutenberg start/end markers not found");
  });

  it("prefixes cleaned body with title and Shakespeare attribution heading", () => {
    const raw = `
*** START OF THE PROJECT GUTENBERG EBOOK DEMO ***

Play body.


*** END OF THE PROJECT GUTENBERG EBOOK DEMO ***
`.trim();

    expect(cleanGutenbergText(raw, "The Tempest")).toBe(`${headingPrefix("The Tempest")}Play body.`);
  });

  it("strips boilerplate headers/footers and keeps only ebook body between markers", () => {
    const raw = `
This eBook is for the use of anyone anywhere…
Title: Demo

*** START OF THE PROJECT GUTENBERG EBOOK DEMO ***


Hello world.


*** END OF THE PROJECT GUTENBERG EBOOK DEMO ***

Updated editions will replace the previous one
`.trim();

    const out = cleanGutenbergText(raw, "Demo Title");

    expect(out).toBe(`${headingPrefix("Demo Title")}Hello world.`);
    expect(out).not.toMatch(/Title:/);
    expect(out).not.toMatch(/START OF THE PROJECT GUTENBERG EBOOK/);
    expect(out).not.toMatch(/END OF THE PROJECT GUTENBERG EBOOK/);
    expect(out).not.toMatch(/Updated editions will replace the previous one/);
  });

  it("strips italic underscores (stage directions)", () => {
    const raw = `
*** START OF THE PROJECT GUTENBERG EBOOK DEMO ***

[_Exit._]
_A confused noise within._

*** END OF THE PROJECT GUTENBERG EBOOK DEMO ***
`.trim();

    const out = cleanGutenbergText(raw, "Demo Title");
    expect(out).toContain("[Exit.]");
    expect(out).toContain("A confused noise within.");
    expect(out).not.toContain("_");
  });

  it("trims per-line trailing whitespace (PG padding)", () => {
    const raw = `
*** START OF THE PROJECT GUTENBERG EBOOK DEMO ***

MASTER. 


*** END OF THE PROJECT GUTENBERG EBOOK DEMO ***
`.trim();

    const out = cleanGutenbergText(raw, "Demo Title");
    expect(out).toContain("MASTER.");
    expect(out.split("\n").every((line) => !/\s$/.test(line))).toBe(true);
  });

  it("smoke: Tempest fixture (pg1540) is cleaned as expected", () => {
    const cleaned = cleanGutenbergText(readFileSync(fixturePath, "utf8"), "The Tempest");

    expect(cleaned.length).toBeGreaterThan(0);

    expect(cleaned.startsWith("The Tempest\n\nBy William Shakespeare")).toBe(true);
    expect(cleaned).toContain("\n\nACT I");
    const firstNonHeadingLine =
      cleaned.slice(headingPrefix("The Tempest").length).split("\n").find((line) => line.trim()) ??
      "";
    expect(firstNonHeadingLine).toBe("ACT I");

    expect(cleaned).toContain("ACT V");
    expect(cleaned).toContain("EPILOGUE");

    expect(cleaned).toContain("Let your indulgence set me free.");

    const pastHeading = cleaned.slice(headingPrefix("The Tempest").length);
    const nonBlankTrimmedLines = pastHeading
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    expect(nonBlankTrimmedLines.at(-1)).toBe("[Exit.]");

    expect(cleaned).not.toContain("[_Exit._]");
    expect(cleaned).not.toContain("*** START OF THE PROJECT GUTENBERG");
    expect(cleaned).not.toContain("*** END OF THE PROJECT GUTENBERG");
  });

  it("Tempest fixture: strips table of contents and dramatis personae", () => {
    const cleaned = cleanGutenbergText(readFileSync(fixturePath, "utf8"), "The Tempest");

    expect(cleaned.startsWith("The Tempest\n\nBy William Shakespeare")).toBe(true);
    expect(cleaned).toContain("\n\nACT I");
    expect(cleaned).not.toContain("Contents");
    expect(cleaned).not.toContain("Dramatis Personæ");
    expect(cleaned).not.toContain("PROSPERO, the right Duke of Milan");
    expect(cleaned).not.toContain("SCENE: The sea, with a Ship");
  });
});
