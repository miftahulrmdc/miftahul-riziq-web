"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently considered "active".
 *
 * Uses IntersectionObserver with a band across the upper-middle of the viewport
 * rather than scroll-offset maths, so it stays correct when sections have
 * wildly different heights.
 */
export function useScrollSpy(ids: readonly string[], offset = 96) {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Among everything currently intersecting, pick the highest on screen.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        // Narrow band: top of the band sits just below the sticky navbar.
        rootMargin: `-${offset}px 0px -55% 0px`,
        threshold: 0,
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, offset]);

  return activeId;
}
