import { useState, useRef, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SignalCellular4BarIcon from "@mui/icons-material/SignalCellular4Bar";
import WifiIcon from "@mui/icons-material/Wifi";
import QuickSettingsPanel from "./QuickSettingsPanel.jsx";
import BatteryConsumption from "./minicomponents/batteryConsumption.jsx";

export default function StatusBar() {
  const [showQuickSettings, setShowQuickSettings] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const quickSettingsPanelRef = useRef(null);

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

  const handleDragStart = (clientY, originalEvent) => {
    setIsDragging(true);
    setDragStart(clientY);
    setDragDistance(0);
    // Open quick settings and delegate drag handling to the panel
    setShowQuickSettings(true);
    // Call the panel's status bar drag handler with the original event
    setTimeout(() => {
      quickSettingsPanelRef.current?.handleStatusBarMouseDown(originalEvent);
    }, 0);
  };

  const handleDragMove = (clientY) => {
    if (!isDragging) return;
    
    const distance = clientY - dragStart;
    setDragDistance(distance);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragDistance(0);
  };

  // Mouse events
  const handleMouseDown = (e) => {
    e.preventDefault();
    handleDragStart(e.clientY, e);
  };

  const handleMouseMove = (e) => {
    handleDragMove(e.clientY);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  // Touch events
  const handleTouchStart = (e) => {
    e.preventDefault();
    handleDragStart(e.touches[0].clientY, e);
    // Call the panel's status bar touch handler
    setTimeout(() => {
      quickSettingsPanelRef.current?.handleStatusBarTouchStart(e);
    }, 0);
  };

  const handleTouchMove = (e) => {
    handleDragMove(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Add global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e) => handleMouseMove(e);
      const handleGlobalMouseUp = () => handleMouseUp();
      
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          height: 28,
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.85)",
          transition: isDragging ? "none" : "background-color 0.2s ease-in-out",
          cursor: isDragging ? "grabbing" : "grab",
          transform: isDragging ? `translateY(${Math.min(dragDistance, 20)}px)` : "translateY(0)",
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
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: 'none' }}
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

      {/* Drag indicator */}
      {isDragging && (
        <div 
          className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-white/20 rounded-full px-3 py-1 text-white text-xs pointer-events-none z-50"
          style={{ opacity: Math.min(dragDistance / 50, 1) }}
        >
          Pull down for quick settings
        </div>
      )}

      <QuickSettingsPanel 
        ref={quickSettingsPanelRef}
        isOpen={showQuickSettings}
        onClose={() => setShowQuickSettings(false)}
      />
    </>
  );
}
