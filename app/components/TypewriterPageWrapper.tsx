"use client";

import { useCallback, useEffect, useState } from "react";

import { TypewriterPage } from "./TypewriterPage";
import { fetchWorkTextClient } from "../lib/work-text";
import { WORKS } from "../lib/works-manifest";

type TypewriterPageWrapperProps = {
  initialText: string;
};

export function TypewriterPageWrapper({ initialText }: TypewriterPageWrapperProps) {
  const [text, setText] = useState(initialText);
  const [workIdx, setWorkIdx] = useState(0);

  const loadNextWork = useCallback(() => {
    const nextIdx = workIdx + 1;
    if (nextIdx >= WORKS.length) return;

    const nextWork = WORKS[nextIdx]!;

    void fetchWorkTextClient(nextWork).then((chunk) => {
      setText((prev) => prev + '\n\n\n\n\n' + chunk);
      setWorkIdx(nextIdx);
    });
  }, [workIdx]);

  return (
    <div className="w-full">
      <TypewriterPage text={text} onLoadNextWork={loadNextWork} />
    </div>
  );
}
