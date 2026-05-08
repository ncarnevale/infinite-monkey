"use client";

import { useEffect, useMemo, useState } from "react";

type TypewriterPageProps = {
  text: string;
};

export function TypewriterPage({ text }: TypewriterPageProps) {
  const [revealedCount, setRevealedCount] = useState(0);

  const display = useMemo(
    () => text.slice(0, revealedCount),
    [text, revealedCount],
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (revealedCount >= text.length) return;
      const nextChar = text[revealedCount]!;
      const matches =
        nextChar === "\n" ? e.key === "Enter" : e.key === nextChar;
      if (matches) {
        e.preventDefault();
        setRevealedCount((n) => n + 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [revealedCount, text]);

  return (
    <div className="whitespace-pre-wrap" data-testid="typewriter-page">
      {display}
    </div>
  );
}
