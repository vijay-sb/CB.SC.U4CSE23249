/**
 * Logging Middleware
 *
 * Single reusable Log() function that ships structured log events to the
 * central evaluation service. Call configureLogger() once at app startup
 * to register the bearer token before any Log() call is made.
 */

export type Stack = "frontend" | "backend";
export type Level = "debug" | "info" | "warn" | "error" | "fatal";
export type Package =
  | "api"
  | "component"
  | "hook"
  | "page"
  | "state"
  | "style"
  | "cache"
  | "controller"
  | "cron_job"
  | "db"
  | "domain"
  | "handler"
  | "repository"
  | "route"
  | "service"
  | "auth"
  | "config"
  | "middleware"
  | "utils";

export interface LogResponse {
  logID: string;
  message: string;
}

// ── internal state ───────────────────────────────────────────────────────────

let _bearerToken: string | null = null;
let _endpoint: string = "http://20.207.122.201/evaluation-service/logs";

// ── public API ───────────────────────────────────────────────────────────────

/**
 * Register the bearer token and optional endpoint. Must be called before Log().
 */
export function configureLogger(token: string, endpoint?: string): void {
  if (!token || typeof token !== "string") {
    throw new Error("[logging-middleware] configureLogger: token must be a non-empty string");
  }
  _bearerToken = token;
  if (endpoint) {
    _endpoint = endpoint;
  }
}

/**
 * Send a structured log event to the evaluation service.
 *
 * @param stack   "frontend" | "backend"
 * @param level   "debug" | "info" | "warn" | "error" | "fatal"
 * @param pkg     package identifier (lower-case, from allowed list)
 * @param message descriptive message — be specific, not generic
 */
export async function Log(
  stack: Stack,
  level: Level,
  pkg: Package,
  message: string
): Promise<LogResponse> {
  if (!_bearerToken) {
    throw new Error(
      "[logging-middleware] Log() called before configureLogger(). Call configureLogger(token) at app startup."
    );
  }

  if (!message.trim()) {
    throw new Error("[logging-middleware] Log() requires a non-empty message.");
  }

  const payload = { stack, level, package: pkg, message };

  const response = await fetch(_endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${_bearerToken}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(
      `[logging-middleware] HTTP ${response.status} — could not deliver log: ${JSON.stringify(payload)}`
    );
  }

  return response.json() as Promise<LogResponse>;
}
