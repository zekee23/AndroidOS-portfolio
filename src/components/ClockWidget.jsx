import { Box, Typography } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AirIcon from '@mui/icons-material/Air';

export default function ClockWidget({ currentTime, temperature }) {
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date) => {
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatFullDate = (date) => {
    const options = { weekday: 'long', day: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-US', options);
  };

  const getWeatherIcon = (temp) => {
    if (temp >= 35) return { icon: <WbSunnyIcon />, color: '#FF6B35' };
    if (temp >= 30) return { icon: <WbSunnyIcon />, color: '#FFD700' };
    if (temp >= 25) return { icon: <WbCloudyIcon />, color: '#87CEEB' };
    if (temp >= 20) return { icon: <CloudIcon />, color: '#B0C4DE' };
    if (temp >= 15) return { icon: <CloudIcon />, color: '#708090' };
    return { icon: <ThunderstormIcon />, color: '#4682B4' };
  };

  const weather = getWeatherIcon(temperature);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: 'white',
        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
        zIndex: 10,
        padding: { xs: '0 16px', sm: '0' },
        width: { xs: '100%', sm: 'auto' },
      }}
    >
      {/* Date above clock */}
      <Typography
        variant="h6"
        sx={{
          fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem' },
          fontWeight: 300,
          mb: { xs: 0.5, sm: 1 },
          opacity: 0.9,
        }}
      >
        {formatDate(currentTime)}
      </Typography>

      {/* Main clock */}
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem', lg: '4.5rem' },
          fontWeight: 200,
          lineHeight: 1,
          mb: { xs: 1, sm: 2 },
        }}
      >
        {formatTime(currentTime)}
      </Typography>

      {/* Full date and weather */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: { xs: 0.5, sm: 1 },
          mt: { xs: 1, sm: 2 },
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
            fontWeight: 300,
            opacity: 0.9,
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          {formatFullDate(currentTime)}
        </Typography>
        
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            ml: { xs: 0, sm: 2 },
            mt: { xs: 0.5, sm: 0 },
          }}
        >
          <Box
            sx={{
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem' },
              color: weather.color,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {weather.icon}
          </Box>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
              fontWeight: 300,
              opacity: 0.9,
            }}
          >
            {temperature}°C
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
