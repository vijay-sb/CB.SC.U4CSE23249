import { useState, useEffect } from "react";
import { fetchNotifications } from "../lib/api/notifications";
import { getTopN, type ScoredNotification } from "../lib/priorityInbox";

export function usePriorityInbox() {
  const [topN, setTopN] = useState<ScoredNotification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [n, setN] = useState(10);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchNotifications({ limit: 10 });
        const ranked = getTopN(data.notifications, 10);
        setTopN(ranked);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { items: topN.slice(0, n), loading, error, n, setN };
}
