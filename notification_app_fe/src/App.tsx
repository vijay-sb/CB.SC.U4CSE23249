import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

import Navbar from "./components/Navbar";
import AllNotificationsPage from "./pages/AllNotifications";
import PriorityInboxPage from "./pages/PriorityInbox";
import { Log, configureLogger } from "logging-middleware";

import "./App.css";

const theme = createTheme({
  palette: {
    primary: { main: "#2563eb" },
    background: { default: "#f8fafc" },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
});

function App() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    // Initialise logger on mount
    const token = import.meta.env.VITE_AUTH_TOKEN || "";
    configureLogger(token, "/evaluation-service/logs");
    Log("frontend", "info", "middleware", "Vite App Mounted — Logger configured")
      .catch(() => setErrorMsg("Logging service unreachable"));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box className="app-layout">
          <Navbar />
          <Box component="main" className="container">
            <Routes>
              <Route path="/" element={<AllNotificationsPage />} />
              <Route path="/priority" element={<PriorityInboxPage />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>

      <Snackbar 
        open={!!errorMsg} 
        autoHideDuration={6000} 
        onClose={() => setErrorMsg(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" variant="filled" onClose={() => setErrorMsg(null)}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
