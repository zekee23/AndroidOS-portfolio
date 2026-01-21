import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { APPS } from "../data/app.config.js";
import AppIcon from "../components/AppIcon.jsx";
import ClockWidget from "../components/ClockWidget.jsx";
import AppDock from "../components/AppDock.jsx";
import { getManilaTemperature } from '../utils/weather.js';
import { useManilaTemperature } from '../hooks/useManilaWeather.js';
import { getTimeBasedBackground } from '../utils/timeBackground.js';

export default function HomeScreen({ openApp }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const temperature = useManilaTemperature();
  const [background, setBackground] = useState(getTimeBasedBackground());

  
  useEffect(() => {
    const timer = setInterval(() => {
      // FOR TESTING: Replace 'new Date()' with 'testTime' to use manual time
      const newTime = new Date(); // Change this to 'testTime' when testing
      setCurrentTime(newTime);
      setBackground(getTimeBasedBackground(newTime));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 28,
        bottom: 0,
        left: 0,
        right: 0,
        height: '100vh',
        background: background.gradient,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: { xs: '40px', sm: '43px' },
      }}
    >
      {/* Mountain silhouettes */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%)',
          clipPath: 'polygon(0 100%, 0 60%, 15% 40%, 25% 50%, 35% 35%, 45% 45%, 55% 30%, 65% 40%, 75% 25%, 85% 35%, 95% 20%, 100% 30%, 100% 100%)',
          backgroundColor: background.mountainColor,
        }}
      />
      
      {/* Lake reflection */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '25%',
          background: background.lakeColor,
        }}
      />

      
      {/* Clock Widget */}
      <ClockWidget currentTime={currentTime} temperature={temperature} />

      {/* App Dock */}
      <AppDock openApp={openApp} />
    </Box>
  );
}