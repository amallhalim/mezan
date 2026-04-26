// hooks/useScrollableTabs.ts
import { useRef, useState, useEffect, useCallback } from 'react';

interface UseScrollableTabsOptions {
  selectedId: number;
  scrollAmount?: number;
}

interface UseScrollableTabsReturn {
  scrollRef: React.RefObject<HTMLDivElement>;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  scrollLeft: () => void;
  scrollRight: () => void;
}

export function useScroller({
  selectedId,
  scrollAmount = 200
}: UseScrollableTabsOptions): UseScrollableTabsReturn {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);
    return () => { el.removeEventListener('scroll', checkScroll); ro.disconnect(); };
  }, [checkScroll]);

  // Auto-scroll active tab into view
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const active = el.querySelector('[data-active="true"]') as HTMLElement;
    active?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [selectedId]);

  const scrollLeft = useCallback(() => {
    scrollRef.current?.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  }, [scrollAmount]);

  const scrollRight = useCallback(() => {
    scrollRef.current?.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }, [scrollAmount]);

  return { scrollRef, canScrollLeft, canScrollRight, scrollLeft, scrollRight };
}