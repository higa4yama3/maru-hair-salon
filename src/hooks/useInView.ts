import { useRef, useState, useEffect } from "react";

interface UseInViewOptions {
  readonly threshold?: number;
  readonly rootMargin?: string;
}

export function useInView(options: UseInViewOptions = {}) {
  const { threshold = 0.12, rootMargin = "0px 0px -60px 0px" } = options;
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current as HTMLElement | null;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isInView };
}
