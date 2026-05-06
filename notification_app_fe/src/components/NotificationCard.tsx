import { useEffect, useRef } from "react";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import type { Notification, ScoredNotification } from "../lib/priorityInbox";

const TYPE_CONFIG: any = { 
  Placement: { color: "success", label: "Career" }, 
  Result: { color: "primary", label: "Academic" }, 
  Event: { color: "warning", label: "Campus Life" } 
};

export default function NotificationCard({ 
  notification, isViewed, onView, showScore 
}: { 
  notification: Notification | ScoredNotification, isViewed: boolean, onView: (id: string) => void, showScore?: boolean 
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isViewed || !ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { onView(notification.ID); obs.disconnect(); }
    }, { threshold: 0.6 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [notification.ID, isViewed, onView]);

  const score = "score" in notification ? (notification as ScoredNotification).score : null;
  const config = TYPE_CONFIG[notification.Type] || { color: "default", label: notification.Type };

  return (
    <Box ref={ref} className={`n-card ${isViewed ? 'n-card--viewed' : 'n-card--new'}`}>
      <Box sx={{ display: 'flex', gap: 1, mb: 1.5, alignItems: 'center' }}>
        <Chip 
          label={config.label} 
          color={config.color} 
          size="small" 
          sx={{ fontWeight: 700, borderRadius: '6px', height: '20px', fontSize: '0.65rem', textTransform: 'uppercase' }} 
        />
        {showScore && score !== null && (
          <Box sx={{ px: 1, py: 0.25, bgcolor: '#f1f5f9', borderRadius: '6px', display: 'flex', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: '#475569', fontSize: '0.65rem' }}>
              PRIORITY: {score.toFixed(1)}
            </Typography>
          </Box>
        )}
        <Typography variant="caption" sx={{ ml: 'auto', color: 'text.secondary', fontWeight: 500 }}>
          {new Date(notification.Timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Typography>
      </Box>
      <Typography variant="body1" sx={{ fontWeight: 600, color: '#1e293b', lineHeight: 1.5 }}>
        {notification.Message}
      </Typography>
    </Box>
  );
}
