import { useEffect, useRef } from 'react';

type Options = IntersectionObserverInit & {
  enabled?: boolean;
  onIntersect: () => void;
};

export function useIntersection<T extends Element>({
  enabled = true,
  root,
  rootMargin = '600px 0px',
  threshold = 0,
  onIntersect,
}: Options) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    console.log(el)
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first?.isIntersecting) onIntersect();
      },
      { root, rootMargin, threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [enabled, root, rootMargin, threshold, onIntersect]);

  return ref;
}
