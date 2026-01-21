import { useState, useEffect, useRef } from 'react';
import WifiIcon from '@mui/icons-material/Wifi';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SettingsIcon from '@mui/icons-material/Settings';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import CloseIcon from '@mui/icons-material/Close';

export default function NotificationShade({ isOpen, onClose }) {
  const [quickSettings, setQuickSettings] = useState({
    wifi: true,
    bluetooth: false,
    airplane: false,
    brightness: 70,
    volume: 50,
    darkMode: false,
  });

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);
  const dragStart = useRef({ x: 0, y: 0 });
  const modalRef = useRef(null);

  // Apply brightness to entire page
  useEffect(() => {
    document.documentElement.style.filter = `brightness(${quickSettings.brightness}%)`;
    return () => {
      document.documentElement.style.filter = '';
    };
  }, [quickSettings.brightness]);

  // Apply dark mode to entire page
  useEffect(() => {
    if (quickSettings.darkMode) {
      document.body.classList.add('dark-mode');
      document.body.style.backgroundColor = '#000000';
      document.body.style.color = '#ffffff';
    } else {
      document.body.classList.remove('dark-mode');
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    }
  }, [quickSettings.darkMode]);

  const toggleSetting = (setting) => {
    setQuickSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const updateSlider = (setting, value) => {
    setQuickSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  // Drag functionality
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragProgress(0);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      const newX = e.clientX - dragStart.current.x;
      const newY = e.clientY - dragStart.current.y;
      
      setPosition({
        x: newX,
        y: newY
      });

      // Calculate drag progress for opacity animation
      const progress = Math.min(Math.abs(newY) / 200, 1);
      setDragProgress(progress);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setDragProgress(0);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-start justify-center pt-4">
      {/* Backdrop with opacity animation during drag */}
      <div 
        className="absolute inset-0 bg-black transition-opacity duration-200"
        style={{ 
          opacity: isDragging ? Math.max(0.3, 0.7 - dragProgress * 0.4) : 0.7 
        }}
        onClick={onClose}
      />
      
      {/* Draggable Modal */}
      <div
        ref={modalRef}
        className="relative w-96 bg-black/95 backdrop-blur-xl rounded-2xl shadow-2xl transition-opacity duration-200"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: isDragging ? 'grabbing' : 'grab',
          opacity: isDragging ? Math.max(0.8, 1 - dragProgress * 0.2) : 1
        }}
      >
        {/* Header with drag handle */}
        <div 
          className="flex items-center justify-between p-4 border-b border-white/10"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">12:21</span>
            </div>
            <div>
              <div className="text-white font-medium">Friday, March 18</div>
              <div className="text-white/60 text-xs">Emergency calls only</div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </button>
        </div>

        {/* Quick Settings Grid */}
        <div className="p-4">
          <div className="grid grid-cols-4 gap-3 mb-4">
            {/* Internet */}
            <button
              onClick={() => toggleSetting('wifi')}
              className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                quickSettings.wifi 
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30' 
                  : 'bg-white/10 text-white/60 border border-transparent'
              }`}
            >
              <WifiIcon sx={{ fontSize: 24 }} />
              <span className="text-xs mt-1">Internet</span>
              <span className="text-xs text-white/40">Ron Wi-Fi</span>
            </button>

            {/* Bluetooth */}
            <button
              onClick={() => toggleSetting('bluetooth')}
              className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                quickSettings.bluetooth 
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30' 
                  : 'bg-white/10 text-white/60 border border-transparent'
              }`}
            >
              <BluetoothIcon sx={{ fontSize: 24 }} />
              <span className="text-xs mt-1">Bluetooth</span>
              <span className="text-xs text-green-400">On</span>
            </button>

            {/* Airplane */}
            <button
              onClick={() => toggleSetting('airplane')}
              className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                quickSettings.airplane 
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-400/30' 
                  : 'bg-white/10 text-white/60 border border-transparent'
              }`}
            >
              <AirplanemodeActiveIcon sx={{ fontSize: 24 }} />
              <span className="text-xs mt-1">Airplane</span>
              <span className="text-xs text-white/40">mode</span>
            </button>

            {/* QR Code */}
            <button className="flex flex-col items-center p-3 rounded-xl bg-white/10 text-white/60 border border-transparent">
              <span className="text-2xl mb-1">📷</span>
              <span className="text-xs mt-1">QR code</span>
              <span className="text-xs text-white/40">Tap to scan</span>
            </button>

            {/* Auto-rotate */}
            <button className="flex flex-col items-center p-3 rounded-xl bg-white/10 text-white/60 border border-transparent">
              <span className="text-2xl mb-1">🔄</span>
              <span className="text-xs mt-1">Auto-rotate</span>
              <span className="text-xs text-white/40">Off</span>
            </button>

            {/* Dark Mode */}
            <button
              onClick={() => toggleSetting('darkMode')}
              className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                quickSettings.darkMode 
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-400/30' 
                  : 'bg-white/10 text-white/60 border border-transparent'
              }`}
            >
              {quickSettings.darkMode ? <DarkModeIcon sx={{ fontSize: 24 }} /> : <LightModeIcon sx={{ fontSize: 24 }} />}
              <span className="text-xs mt-1">Dark</span>
              <span className="text-xs text-white/40">{quickSettings.darkMode ? 'On' : 'Off'}</span>
            </button>

            {/* Media Output */}
            <button className="flex flex-col items-center p-3 rounded-xl bg-white/10 text-white/60 border border-transparent">
              <span className="text-2xl mb-1">🔊</span>
              <span className="text-xs mt-1">Media</span>
              <span className="text-xs text-white/40">Phone</span>
            </button>

            {/* Do Not Disturb */}
            <button className="flex flex-col items-center p-3 rounded-xl bg-white/10 text-white/60 border border-transparent">
              <span className="text-2xl mb-1">🔕</span>
              <span className="text-xs mt-1">DND</span>
              <span className="text-xs text-white/40">Off</span>
            </button>
          </div>

          {/* Brightness Slider */}
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-2">
              {quickSettings.darkMode ? <Brightness4Icon sx={{ fontSize: 20, color: 'white' }} /> : <Brightness7Icon sx={{ fontSize: 20, color: 'white' }} />}
              <input
                type="range"
                min="10"
                max="100"
                value={quickSettings.brightness}
                onChange={(e) => updateSlider('brightness', parseInt(e.target.value))}
                className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-white text-xs w-8">{quickSettings.brightness}%</span>
            </div>
          </div>

          {/* Volume Slider */}
          <div className="mb-4">
            <div className="flex items-center gap-3">
              <VolumeUpIcon sx={{ fontSize: 20, color: 'white' }} />
              <input
                type="range"
                min="0"
                max="100"
                value={quickSettings.volume}
                onChange={(e) => updateSlider('volume', parseInt(e.target.value))}
                className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-white text-xs w-8">{quickSettings.volume}%</span>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between p-4 border-t border-white/10">
          <button className="p-2 text-white/60 hover:text-white transition-colors">
            <SettingsIcon sx={{ fontSize: 20 }} />
          </button>
          <button className="p-2 text-white/60 hover:text-white transition-colors">
            <span className="text-xl">⚙️</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
