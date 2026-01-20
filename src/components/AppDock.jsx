import { Box, Typography } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import MessageIcon from '@mui/icons-material/Message';

import PhoneIcon from '@mui/icons-material/Phone';
import ContactsIcon from '@mui/icons-material/Contacts';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EmailIcon from '@mui/icons-material/Email';
import ChromeIcon from '@mui/icons-material/Language';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Icon from '@mdi/react';
import { mdiAccount, mdiSpotify } from '@mdi/js';
import SettingsIcon from '@mui/icons-material/Settings';
import GalleryIcon from '@mui/icons-material/PhotoLibrary';

export default function AppDock({ openApp }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const dockRef = useRef(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setScreenWidth(window.innerWidth);
      setIsMobile(mobile);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const allApps = [
    // First row
    { id: 'message', name: 'Message', icon: MessageIcon, color: '#3498db' },
    { id: 'phone', name: 'Phone', icon: PhoneIcon, color: '#4caf50' },
    { id: 'contacts', name: 'Contacts', icon: ContactsIcon, color: '#ff9800' },
    { id: 'camera', name: 'Camera', icon: CameraAltIcon, color: '#f44336' },
    // Second row
    { id: 'email', name: 'Email', icon: EmailIcon, color: '#ea4335' },
    { id: 'chrome', name: 'Browser', icon: ChromeIcon, color: '#4285f4' },
    { id: 'youtube', name: 'YouTube', icon: YouTubeIcon, color: '#ff0000' },
    { id: 'spotify', name: 'Spotify', icon: () => <Icon path={mdiSpotify} size={1} />, color: '#1db954' },
    { id: 'settings', name: 'Settings', icon: SettingsIcon, color: '#607d8b' },
    { id: 'gallery', name: 'Gallery', icon: GalleryIcon, color: '#9c27b0' },
  ];

  const appsPerPage = 5;
  const totalPages = Math.ceil(allApps.length / appsPerPage);
  const currentApps = allApps.slice(currentPage * appsPerPage, (currentPage + 1) * appsPerPage);

  const handleAppClick = (app) => {
    if (openApp) {
      openApp(app);
    }
  };

  const handlePageIndicatorClick = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleDragStart = (clientX) => {
    if (!isMobile) return; // Only allow dragging on mobile
    setIsDragging(true);
    setStartX(clientX);
    setDragDistance(0);
  };

  const handleDragMove = (clientX) => {
    if (!isDragging || !isMobile) return;
    const distance = clientX - startX;
    setDragDistance(distance);
  };

  const handleDragEnd = () => {
    if (!isMobile) return; // Only allow dragging on mobile
    if (!isDragging) return;
    
    const threshold = 50;
    if (dragDistance > threshold && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (dragDistance < -threshold && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
    
    setIsDragging(false);
    setDragDistance(0);
  };

  // Touch events
  const handleTouchStart = (e) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Mouse events (only on mobile)
  const handleMouseDown = (e) => {
    if (!isMobile) return; // Only allow dragging on mobile
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isMobile) return; // Only allow dragging on mobile
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isMobile) return; // Only allow dragging on mobile
    handleDragEnd();
  };

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
  }, [isDragging, startX]);

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: { xs: 100, sm: 100 },
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 10,
      }}
    >
      {/* Page indicators */}
      <Box
        sx={{
          display: 'flex',
          gap: 0.5,
          mb: 1,
        }}
      >
        {[...Array(totalPages)].map((_, index) => (
          <Box
            key={index}
            onClick={() => handlePageIndicatorClick(index)}
            sx={{
              width: index === currentPage ? 8 : 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: index === currentPage ? 'white' : 'rgba(255,255,255,0.4)',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.7)',
              },
            }}
          />
        ))}
      </Box>

      {/* App dock */}
      <Box
        ref={dockRef}
        sx={{
          display: 'flex',
          gap: { xs: 1, sm: 2 },
          padding: { xs: '8px 12px', sm: '12px 20px' },
          backgroundColor: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(20px)',
          borderRadius: { xs: '16px', sm: '20px' },
          border: '1px solid rgba(255,255,255,0.2)',
          transform: isDragging ? `translateX(${dragDistance}px)` : 'translateX(0)',
          transition: isDragging ? 'none' : 'transform 0.3s ease',
          cursor: isMobile ? (isDragging ? 'grabbing' : 'grab') : 'default',
          userSelect: 'none',
          touchAction: 'pan-y',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
        {currentApps.map((app) => {
          const Icon = app.icon;
          return (
            <Box
              key={app.id}
              onClick={() => handleAppClick(app)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.5,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
                '&:active': {
                  transform: 'scale(0.95)',
                },
              }}
            >
              <Box
                sx={{
                  width: { xs: 40, sm: 48 },
                  height: { xs: 40, sm: 48 },
                  borderRadius: { xs: '10px', sm: '12px' },
                  backgroundColor: app.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon
                  sx={{
                    fontSize: { xs: 20, sm: 28 },
                    color: 'white',
                  }}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: { xs: '0.6rem', sm: '0.7rem' },
                  color: 'white',
                  textAlign: 'center',
                  textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                  fontWeight: 400,
                }}
              >
                {app.name}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
