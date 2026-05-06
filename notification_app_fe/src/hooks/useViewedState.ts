import { useState, useEffect, useCallback } from "react";

const KEY = "cn_viewed_ids";

export function useViewedState() {
  const [viewed, setViewed] = useState<Set<string>>(new Set());

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) setViewed(new Set(JSON.parse(raw)));
  }, []);

  const markViewed = useCallback((id: string) => {
    setViewed(prev => {
      if (prev.has(id)) return prev;
      const next = new Set(prev).add(id);
      localStorage.setItem(KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  return { isViewed: (id: string) => viewed.has(id), markViewed };
}
