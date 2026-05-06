/**
 * lib/priorityInbox.ts  — Stage 1
 * 
 * Priority scoring logic.
 * Score = Weight(Type) + RecencyDecay(Time)
 */

import { Log } from "./logger";

export type NotificationType = "Placement" | "Result" | "Event";

export interface Notification {
  ID: string;
  Type: NotificationType;
  Message: string;
  Timestamp: string; 
}

export interface ScoredNotification extends Notification {
  score: number;
}

const TYPE_WEIGHT: Record<NotificationType, number> = {
  Placement: 30,
  Result: 20,
  Event: 10,
};

function ageHours(timestamp: string): number {
  const created = new Date(timestamp).getTime();
  const now = Date.now();
  return Math.max(0, (now - created) / (1000 * 60 * 60));
}

export function computeScore(notification: Notification): number {
  const weight = TYPE_WEIGHT[notification.Type] ?? 0;
  // 10 points for new, decays over 24h
  const decay = 10 * Math.exp(-ageHours(notification.Timestamp) / 24);
  return weight + decay;
}

export function getTopN(notifications: Notification[], n: number): ScoredNotification[] {
  Log("frontend", "debug", "utils", `Ranking ${notifications.length} notifications, picking top ${n}`).catch(() => {});

  const scored: ScoredNotification[] = notifications.map((n) => ({
    ...n,
    score: computeScore(n),
  }));

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, n);
}
