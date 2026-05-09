import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

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

  it("scrolls by roughly one line on successful Enter (newline)", async () => {
    const scrollBy = vi.spyOn(window, "scrollBy").mockImplementation(() => {});

    render(<TypewriterPage text={"a\nB"} />);
    fireEvent.keyDown(window, { key: "a" });

    fireEvent.keyDown(window, { key: "Enter" });

    await waitFor(() =>
      expect(scrollBy).toHaveBeenCalledWith(
        expect.objectContaining({ top: expect.any(Number), left: 0 }),
      ),
    );
    const scrollArgs = scrollBy.mock.calls[0]![0] as ScrollToOptions;
    expect((scrollArgs.top as number) > 0).toBe(true);

    fireEvent.keyDown(window, { key: "Enter" });
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    expect(scrollBy).toHaveBeenCalledTimes(1);

    scrollBy.mockRestore();
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

  it("treats typographic apostrophe like ASCII apostrophe", () => {
    render(<TypewriterPage text={"\u2019"} />);

    fireEvent.keyDown(window, { key: "'" });
    expect(screen.getByTestId("typewriter-page").textContent).toBe("\u2019");
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

  it("requests next segment when unread tail crosses threshold while typing", async () => {
    const onLoadTracked = vi.fn();

    render(
      <TypewriterPage
        text={"a".repeat(1001)}
        onLoadNextWork={onLoadTracked}
      />,
    );
    expect(onLoadTracked).not.toHaveBeenCalled();

    fireEvent.keyDown(window, { key: "a" });

    await waitFor(() => expect(onLoadTracked).toHaveBeenCalledTimes(1));
  });
});
