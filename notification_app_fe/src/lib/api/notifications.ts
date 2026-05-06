/**
 * lib/api/notifications.ts
 * API wrapper for fetching notifications with logging.
 */

import { Log } from "../logger";
import type { Notification } from "../priorityInbox";

export type NotificationFilterType = "Event" | "Result" | "Placement" | "";

export interface FetchNotificationsParams {
  limit?: number;
  page?: number;
  notification_type?: NotificationFilterType;
}

export interface NotificationsResponse {
  notifications: Notification[];
}

export async function fetchNotifications(
  params: FetchNotificationsParams = {}
): Promise<NotificationsResponse> {
  // Vite uses import.meta.env, Node uses process.env
  const token = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_AUTH_TOKEN) || process.env.VITE_AUTH_TOKEN || "";
  const base = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_NOTIFICATIONS_URL) || process.env.VITE_NOTIFICATIONS_URL || "";

  if (!base) throw new Error("API URL missing from environment");

  // Handle relative URLs for proxying in the browser
  let url: URL;
  if (base.startsWith("http")) {
    url = new URL(base);
  } else if (typeof window !== "undefined") {
    url = new URL(base, window.location.origin);
  } else {
    // Node environment fallback for scripts
    url = new URL(base, "http://localhost");
  }

  if (params.limit) url.searchParams.set("limit", String(params.limit));
  if (params.page) url.searchParams.set("page", String(params.page));
  if (params.notification_type) url.searchParams.set("notification_type", params.notification_type);

  Log("frontend", "info", "api", `API Request: ${url.searchParams.toString()}`).catch(() => {});

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    Log("frontend", "error", "api", `Fetch failed: ${res.status}`).catch(() => {});
    throw new Error(`API Error: ${res.status}`);
  }

  const data = await res.json();
  Log("frontend", "info", "api", `Received ${data.notifications.length} notifications`).catch(() => {});
  return data;
}
