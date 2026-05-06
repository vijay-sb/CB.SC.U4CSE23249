/**
 * scripts/stage1_verify.ts
 * CLI runner for Stage 1 algorithm verification.
 */

import { fetchNotifications } from "../src/lib/api/notifications";
import { getTopN } from "../src/lib/priorityInbox";
import { configureLogger } from "../src/lib/logger";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function run() {
  console.log("--- Stage 1: Priority Algorithm Verification ---");
  
  const token = process.env.VITE_AUTH_TOKEN || "";
  const endpoint = "http://20.207.122.201/evaluation-service/logs";
  configureLogger(token, endpoint);

  // For fetchNotifications to work in Node with the relative URL in .env.local
  process.env.VITE_NOTIFICATIONS_URL = "http://20.207.122.201/evaluation-service/notifications";

  try {
    const data = await fetchNotifications({ limit: 10 });
    const top10 = getTopN(data.notifications, 10);
    
    console.log(`\nFetched ${data.notifications.length} items. Top 10 Ranked:\n`);
    console.table(top10.map((n, i) => ({
      Rank: i + 1,
      Type: n.Type,
      Score: n.score.toFixed(2),
      Message: n.Message.substring(0, 50) + "...",
      Date: n.Timestamp
    })));
  } catch (e) {
    console.error("Verification failed:", e);
  }
}

run();
