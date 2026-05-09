"use client";

import { normalizeComparableText } from "../lib/normalize-text";
import { useCallback, useEffect, useMemo, useState } from "react";

export const PREFETCH_REMAINING_CHARS = 1000;

type TypewriterPageProps = {
  text: string;
  onLoadNextWork?: () => void;
};

const LINE_HEIGHT_PX = 28;

export function TypewriterPage({ text, onLoadNextWork }: TypewriterPageProps) {
  const [revealedCount, setRevealedCount] = useState(0);

  const display = useMemo(
    () => text.slice(0, revealedCount),
    [text, revealedCount],
  );

  const scrollToNextLine = useCallback(() => {
    window.scrollBy({ top: LINE_HEIGHT_PX, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (revealedCount >= text.length) return;

      if (e.metaKey || e.ctrlKey || e.altKey || /^F\d+$/.test(e.key)) return;

      e.preventDefault();
      e.stopPropagation();

      const nextChar = text[revealedCount]!;
      const matches =
        nextChar === "\n"
          ? e.key === "Enter"
          : normalizeComparableText(e.key) === normalizeComparableText(nextChar);
      if (!matches) return;

      setRevealedCount(c => c + 1);
      if (nextChar === "\n") scrollToNextLine();

      const remainingChars = text.length - (revealedCount + 1);
      if (remainingChars === PREFETCH_REMAINING_CHARS) onLoadNextWork?.();
    };

    window.addEventListener("keydown", onKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", onKeyDown, { capture: true });
  }, [text, revealedCount, scrollToNextLine, onLoadNextWork]);

  return (
    <div
      className="whitespace-pre-wrap pb-[min(50vh,28rem)]"
      data-testid="typewriter-page"
    >
      {display}
    </div>
  );
}
