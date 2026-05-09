import { describe, expect, it } from "vitest";

import { normalizeComparableText } from "../normalize-text";

describe("normalizeComparableText", () => {
  it("maps curly single quotes and apostrophe lookalikes to ASCII apostrophe", () => {
    expect(normalizeComparableText("\u2018x\u2019")).toBe("'x'");
    expect(normalizeComparableText("\u201Ax")).toBe("'x");
    expect(normalizeComparableText("\u02BC")).toBe("'");
  });

  it("leaves ASCII apostrophe and double quote unchanged", () => {
    expect(normalizeComparableText(`it's "fine"`)).toBe(`it's "fine"`);
  });

  it("maps curly double quotes and guillemets to ASCII double quote", () => {
    expect(normalizeComparableText("\u201Chello\u201D")).toBe(`"hello"`);
    expect(normalizeComparableText("\u201Ehello\u201D")).toBe(`"hello"`);
    expect(normalizeComparableText("\u00ABhello\u00BB")).toBe(`"hello"`);
  });

  it("maps en dash, em dash, and minus sign to hyphen-minus", () => {
    expect(normalizeComparableText("a\u2013b\u2014c\u2212d")).toBe("a-b-c-d");
    expect(normalizeComparableText("x\u2010y\u2011z")).toBe("x-y-z");
  });

  it("maps ellipsis character to three ASCII periods", () => {
    expect(normalizeComparableText("wait\u2026now")).toBe("wait...now");
  });

  it("maps no-break spaces to ordinary space", () => {
    expect(normalizeComparableText("a\u00A0b\u202Fc")).toBe("a b c");
  });

  it("strips byte order mark", () => {
    expect(normalizeComparableText("\uFEFFhello")).toBe("hello");
  });

  it("maps prime and double prime to straight quotes", () => {
    expect(normalizeComparableText("90\u203260\u2033")).toBe("90'60\"");
  });
});
