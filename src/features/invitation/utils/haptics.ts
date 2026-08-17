/**
 * Short haptic feedback for touch devices.
 *
 * Silently does nothing where the API is unsupported (every desktop browser,
 * and iOS Safari), so callers can fire it unconditionally.
 */
export function vibrate(pattern: number | number[]) {
  if (
    typeof navigator === "undefined" ||
    typeof navigator.vibrate !== "function"
  ) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  navigator.vibrate(pattern);
}
