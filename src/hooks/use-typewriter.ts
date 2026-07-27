"use client";

import { useEffect, useState } from "react";

interface TypewriterOptions {
  typeSpeed?: number;
  deleteSpeed?: number;
  /** How long to hold a completed word before deleting it. */
  pauseMs?: number;
}

/**
 * Cycles through `words`, typing and deleting one character at a time.
 *
 * Returns the current partial string. Callers are responsible for rendering the
 * caret and for exposing the full list to assistive tech (the animated text
 * itself should be aria-hidden — a screen reader announcing one letter at a
 * time is unusable).
 */
export function useTypewriter(
  words: readonly string[],
  { typeSpeed = 80, deleteSpeed = 40, pauseMs = 1800 }: TypewriterOptions = {},
) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;

    const current = words[index % words.length];

    // Word fully typed — hold, then start deleting.
    if (!deleting && text === current) {
      const hold = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(hold);
    }

    // Word fully deleted — advance to the next one.
    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const timer = setTimeout(
      () => {
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
        );
      },
      deleting ? deleteSpeed : typeSpeed,
    );

    return () => clearTimeout(timer);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pauseMs]);

  return text;
}
