import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box 
          sx={{ 
            width: 32, 
            height: 32, 
            bgcolor: '#2563eb', 
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 900
          }}
        >
          C
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em' }}>
          CampusNotify
        </Typography>
      </Box>
      <div className="nav-links">
        <NavLink to="/" end>Explore</NavLink>
        <NavLink to="/priority">Priority</NavLink>
      </div>
    </nav>
  );
}
