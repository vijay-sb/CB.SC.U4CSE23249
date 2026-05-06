/**
 * lib/logger.ts
 * Re-exports the logging middleware.
 * Using the package name since it's now properly configured as an ESM module.
 */
import { Log as LogFn, configureLogger as configFn } from "logging-middleware";

export const Log = LogFn;
export const configureLogger = configFn;

export type { Stack, Level, Package, LogResponse } from "logging-middleware";
