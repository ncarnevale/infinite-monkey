import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { TypewriterPage } from "../TypewriterPage";

afterEach(() => {
  cleanup();
});

describe("TypewriterPage", () => {
  it("starts empty until keys match from the beginning", () => {
    render(<TypewriterPage text={"a\nB"} />);
    expect(screen.getByTestId("typewriter-page").textContent).toBe("");
  });

  it("reveals sequentially: letter, Enter for newline, then letter", () => {
    render(<TypewriterPage text={"a\nB"} />);

    fireEvent.keyDown(window, { key: "a" });
    expect(screen.getByTestId("typewriter-page").textContent).toBe("a");

    fireEvent.keyDown(window, { key: "Enter" });
    expect(screen.getByTestId("typewriter-page").textContent).toBe("a\n");

    fireEvent.keyDown(window, { key: "B" });
    expect(screen.getByTestId("typewriter-page").textContent).toBe("a\nB");
  });

  it("does not advance on wrong key", () => {
    render(<TypewriterPage text={"hello"} />);

    fireEvent.keyDown(window, { key: "x" });
    expect(screen.getByTestId("typewriter-page").textContent).toBe("");

    fireEvent.keyDown(window, { key: "h" });
    expect(screen.getByTestId("typewriter-page").textContent).toBe("h");
  });

  it("is case-sensitive", () => {
    render(<TypewriterPage text={"a"} />);

    fireEvent.keyDown(window, { key: "A" });
    expect(screen.getByTestId("typewriter-page").textContent).toBe("");

    fireEvent.keyDown(window, { key: "a" });
    expect(screen.getByTestId("typewriter-page").textContent).toBe("a");
  });

  it("ignores extra keypresses after full reveal", () => {
    render(<TypewriterPage text={"ab"} />);

    fireEvent.keyDown(window, { key: "a" });
    fireEvent.keyDown(window, { key: "b" });
    expect(screen.getByTestId("typewriter-page").textContent).toBe("ab");

    fireEvent.keyDown(window, { key: "c" });
    fireEvent.keyDown(window, { key: "d" });
    expect(screen.getByTestId("typewriter-page").textContent).toBe("ab");
  });
});
