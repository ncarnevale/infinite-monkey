"use client";

import { normalizeComparableText } from "../lib/normalize-text";
import { useCallback, useEffect, useMemo, useState } from "react";

type TypewriterPageProps = {
  text: string;
};

const LINE_HEIGHT_PX = 28;

export function TypewriterPage({ text }: TypewriterPageProps) {
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
      const nextChar = text[revealedCount]!;
      const matches =
        nextChar === "\n"
          ? e.key === "Enter"
          : normalizeComparableText(e.key) === normalizeComparableText(nextChar);
      if (matches) {
        e.preventDefault();
        e.stopPropagation();
        if (nextChar === "\n") scrollToNextLine();
        setRevealedCount((n) => n + 1);
      }
    };

    window.addEventListener("keydown", onKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", onKeyDown, { capture: true });
  }, [revealedCount, scrollToNextLine, text]);

  return (
    <div
      className="whitespace-pre-wrap pb-[min(50vh,28rem)]"
      data-testid="typewriter-page"
    >
      {display}
    </div>
  );
}
