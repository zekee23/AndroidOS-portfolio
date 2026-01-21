import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SignalCellular4BarIcon from "@mui/icons-material/SignalCellular4Bar";
import WifiIcon from "@mui/icons-material/Wifi";
import BatteryConsumption from "./minicomponents/batteryConsumption.jsx";

export default function StatusBar() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        height: 28,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.85)",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: 28,
          px: 1.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          userSelect: "none",
        }}
      >
        {/* Left side - Time and Notification */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant="body2"
            sx={{
              fontSize: '14px',
              fontWeight: 400,
              color: 'white',
            }}
          >
            {formatTime(currentTime)}
          </Typography>
         
        </Box>

        {/* Right side - System icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          
          <SignalCellular4BarIcon
            sx={{
              fontSize: 16,
              color: 'white',
              opacity: 0.8,
            }}
          />
          <WifiIcon
            sx={{
              fontSize: 16,
              color: 'white',
              opacity: 0.8,
            }}
          />
          <BatteryConsumption/>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
