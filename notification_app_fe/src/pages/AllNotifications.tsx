import { useNotifications } from "../hooks/useNotifications";
import { useViewedState } from "../hooks/useViewedState";
import NotificationCard from "../components/NotificationCard";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function AllNotificationsPage() {
  const { 
    notifications, loading, error, page, hasMore, filterType, setFilterType, nextPage, prevPage 
  } = useNotifications();
  const { isViewed, markViewed } = useViewedState();

  return (
    <Box>
      <Box className="page-header">
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mb: 1 }}>
            Notifications
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Stay updated with the latest campus activities and results.
          </Typography>
        </Box>
        
        <ToggleButtonGroup 
          size="small" 
          value={filterType} 
          exclusive 
          onChange={(_, v) => v !== null && setFilterType(v)}
          sx={{ 
            bgcolor: 'white', 
            p: 0.5, 
            borderRadius: '12px',
            '& .MuiToggleButton-root': { border: 'none', borderRadius: '8px !important', px: 2 }
          }}
        >
          <ToggleButton value="">All</ToggleButton>
          <ToggleButton value="Placement">Placements</ToggleButton>
          <ToggleButton value="Result">Results</ToggleButton>
          <ToggleButton value="Event">Events</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {loading ? (
        <Box className="empty-state">
          <Typography variant="h6">Loading notifications...</Typography>
        </Box>
      ) : (
        <Box>
          {notifications.length === 0 ? (
            <Box className="empty-state">
              <Typography variant="h6">No notifications found</Typography>
              <Typography variant="body2">Try changing the filters or check back later.</Typography>
            </Box>
          ) : (
            <Box>
              {notifications.map(n => (
                <NotificationCard key={n.ID} notification={n} isViewed={isViewed(n.ID)} onView={markViewed} />
              ))}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 6, alignItems: 'center' }}>
                <Button 
                  variant="outlined" 
                  disabled={page === 1} 
                  onClick={prevPage}
                  sx={{ borderRadius: '10px', textTransform: 'none' }}
                >
                  Previous
                </Button>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  Page {page}
                </Typography>
                <Button 
                  variant="outlined" 
                  disabled={!hasMore} 
                  onClick={nextPage}
                  sx={{ borderRadius: '10px', textTransform: 'none' }}
                >
                  Next
                </Button>
              </Box>
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
