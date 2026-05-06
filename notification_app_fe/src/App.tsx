import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { configureLogger, Log } from "./lib/logger";
import Navbar from "./components/Navbar";
import AllNotificationsPage from "./pages/AllNotifications";
import PriorityInboxPage from "./pages/PriorityInbox";
import "./App.css";

function App() {
  useEffect(() => {
    // Initialise logger on mount
    const token = import.meta.env.VITE_AUTH_TOKEN || "";
    configureLogger(token, "/evaluation-service/logs");
    Log("frontend", "info", "middleware", "Vite App Mounted — Logger configured").catch(() => {});
  }, []);

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<AllNotificationsPage />} />
            <Route path="/priority" element={<PriorityInboxPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
