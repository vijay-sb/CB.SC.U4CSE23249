import { usePriorityInbox } from "../hooks/usePriorityInbox";
import { useViewedState } from "../hooks/useViewedState";
import NotificationCard from "../components/NotificationCard";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function PriorityInboxPage() {
  const { items, loading, error, n, setN } = usePriorityInbox();
  const { isViewed, markViewed } = useViewedState();

  return (
    <Box>
      <Box className="page-header">
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mb: 1 }}>
            Priority Inbox
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Critical updates ranked by impact and freshness.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase' }}>
            Show Top:
          </Typography>
          <ToggleButtonGroup 
            size="small" 
            value={n} 
            exclusive 
            onChange={(_, v) => v && setN(v)}
            sx={{ 
              bgcolor: 'white', 
              p: 0.5, 
              borderRadius: '12px',
              '& .MuiToggleButton-root': { border: 'none', borderRadius: '8px !important', px: 2 }
            }}
          >
            <ToggleButton value={10}>10</ToggleButton>
            <ToggleButton value={15}>15</ToggleButton>
            <ToggleButton value={20}>20</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {loading ? (
        <Box className="empty-state">
          <Typography variant="h6">Calculating priorities...</Typography>
        </Box>
      ) : (
        <Box>
          {items.length === 0 ? (
            <Box className="empty-state">
              <Typography variant="h6">Inbox empty</Typography>
              <Typography variant="body2">No high-priority updates currently available.</Typography>
            </Box>
          ) : (
            <Box>
              {items.map(n => (
                <NotificationCard key={n.ID} notification={n} isViewed={isViewed(n.ID)} onView={markViewed} showScore />
              ))}
            </Box>
          )}
        </Box>
      )}
      {error && (
        <Box sx={{ textAlign: 'center', mt: 4, p: 2, bgcolor: '#fef2f2', color: '#991b1b', borderRadius: '12px' }}>
          {error}
        </Box>
      )}
    </Box>
  );
}
