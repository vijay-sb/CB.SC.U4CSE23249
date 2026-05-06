import { useState, useEffect, useCallback } from "react";
import { fetchNotifications, type NotificationFilterType } from "../lib/api/notifications";
import type { Notification } from "../lib/priorityInbox";
import { Log } from "../lib/logger";

const PAGE_LIMIT = 10;

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filterType, setFilterType] = useState<NotificationFilterType>("");

  const load = useCallback(async (p: number, f: NotificationFilterType) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchNotifications({ limit: PAGE_LIMIT, page: p, notification_type: f });
      setNotifications(data.notifications);
      setHasMore(data.notifications.length === PAGE_LIMIT);
    } catch (err: any) {
      setError(err.message);
      Log("frontend", "error", "hook", `Fetch failed: ${err.message}`).catch(() => {});
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(page, filterType);
  }, [page, filterType, load]);

  return {
    notifications, loading, error, page, hasMore, filterType,
    setFilterType: (f: NotificationFilterType) => { setPage(1); setFilterType(f); },
    nextPage: () => setPage(p => p + 1),
    prevPage: () => setPage(p => Math.max(1, p - 1))
  };
}
