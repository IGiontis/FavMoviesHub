import { useState, useEffect, useRef, useCallback } from "react";

export function useInfiniteScroll(itemsLength, loadCount = 6) {
  const [visibleCount, setVisibleCount] = useState(loadCount);
  const loadMoreRef = useRef(null);

  const onIntersect = useCallback(
    (entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount((count) => Math.min(count + loadCount, itemsLength));
      }
    },
    [itemsLength, loadCount]
  );

  useEffect(() => {
    const currentRef = loadMoreRef.current;
    if (!currentRef) return undefined;

    const observer = new IntersectionObserver(onIntersect, {
      rootMargin: "200px",
      threshold: 1.0,
    });

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, [onIntersect]);

  // Reset visibleCount if itemsLength shrinks (e.g., new friend selected)
  useEffect(() => {
    if (visibleCount > itemsLength) {
      setVisibleCount(itemsLength);
    }
  }, [itemsLength, visibleCount]);

  return { visibleCount, loadMoreRef, setVisibleCount };
}