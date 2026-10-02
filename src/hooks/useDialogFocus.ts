import { useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Moves focus into a modal on open, keeps Tab inside it, and returns focus
 * to the element that opened it when it closes.
 */
export function useDialogFocus<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    const opener = document.activeElement as HTMLElement | null;
    const getFocusable = () =>
      Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));

    getFocusable()[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // Skip restoring when another dialog has already taken focus
      const active = document.activeElement;
      const focusIsOurs = active === document.body || dialog.contains(active);
      if (
        focusIsOurs &&
        opener &&
        document.contains(opener) &&
        !opener.hasAttribute("disabled")
      ) {
        opener.focus();
      }
    };
  }, []);

  return ref;
}
