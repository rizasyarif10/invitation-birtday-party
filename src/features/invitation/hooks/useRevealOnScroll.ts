import { useEffect } from "react";

const STAGGER_MS = 70;
const MAX_STAGGER_MS = 280;

/**
 * Reveals blocks as they scroll into view.
 *
 * Two markers work together:
 * - `data-reveal` is the trigger. Put it on each block that should animate on
 *   its own, not on the whole page section — a full-page section animating as
 *   one unit reads like a stack of panels popping in.
 * - `data-reveal-item` marks children that fade in one after another once
 *   their `data-reveal` ancestor is reached.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    const reveal = (block: HTMLElement) => {
      block.classList.add("reveal-visible");
      block
        .querySelectorAll<HTMLElement>("[data-reveal-item]")
        .forEach((item, index) => {
          item.style.animationDelay = `${Math.min(index * STAGGER_MS, MAX_STAGGER_MS)}ms`;
          item.classList.add("reveal-visible");
        });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        });
      },
      // Trigger on the block's top edge instead of a share of its height:
      // blocks taller than the viewport would otherwise fire long after the
      // user has scrolled into them.
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );

    document
      .querySelectorAll<HTMLElement>("[data-reveal]")
      .forEach((block) => observer.observe(block));

    return () => observer.disconnect();
  }, []);
}
