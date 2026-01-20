import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import ViewListIcon from '@mui/icons-material/ViewList';

export default function NavigationBar({ onBack, onHome, onRecent }) {
  const [pressedButton, setPressedButton] = useState(null);

  const handleButtonPress = (button, action) => {
    setPressedButton(button);
    setTimeout(() => setPressedButton(null), 150);
    if (action) action();
  };

  return (
    <AppBar
    
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "#333",
        bottom: 0,
        left: 0,
        right: 0,
        top: "auto",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: { xs: 32, sm: 36, md: 43 },
          px: { xs: 0.5, sm: 1, md: 2 },
          display: "flex",
          justifyContent: "center",
          gap: { xs: 8, sm: 12, md: 20 },
        }}
      >
        {/* Back Button */}
        <button
          onClick={() => handleButtonPress('back', onBack)}
          className={`p-1 xs:p-1.5 sm:p-2 rounded-full transition-all duration-150 ${
            pressedButton === 'back' 
              ? 'bg-white/20 scale-90' 
              : 'hover:bg-white/10 active:scale-95'
          }`}
        >
          <ArrowBackIcon sx={{ fontSize: { xs: 14, sm: 16, md: 20 }, color: 'white' }} />
        </button>

        {/* Home Button */}
        <button
          onClick={() => handleButtonPress('home', onHome)}
          className={`p-1 xs:p-1.5 sm:p-2 rounded-full transition-all duration-150 ${
            pressedButton === 'home' 
              ? 'bg-white/20 scale-90' 
              : 'hover:bg-white/10 active:scale-95'
          }`}
        >
          <HomeIcon sx={{ fontSize: { xs: 14, sm: 16, md: 20 }, color: 'white' }} />
        </button>

        {/* Recent Apps Button */}
        <button
          onClick={() => handleButtonPress('recent', onRecent)}
          className={`p-1 xs:p-1.5 sm:p-2 rounded-full transition-all duration-150 ${
            pressedButton === 'recent' 
              ? 'bg-white/20 scale-90' 
              : 'hover:bg-white/10 active:scale-95'
          }`}
        >
          <ViewListIcon sx={{ fontSize: { xs: 14, sm: 16, md: 20 }, color: 'white' }} />
        </button>
      </Toolbar>
    </AppBar>
  );
}
