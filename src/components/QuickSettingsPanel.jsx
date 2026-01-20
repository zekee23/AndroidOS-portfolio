import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Wifi, Moon, Sun, Github, Linkedin, Volume2, Sun as Brightness7, Moon as Brightness4, X } from 'lucide-react';

function QuickSettingsPanel({ isOpen, onClose, onStatusBarDrag }, ref) {
  const [quickSettings, setQuickSettings] = useState({
    wifi: true,
    darkMode: false,
    brightness: 70,
    volume: 50,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [panelHeight, setPanelHeight] = useState(0);
  const [startDragFromStatusBar, setStartDragFromStatusBar] = useState(false);
  
  const maxPanelHeight = 500;

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

  const handleDragStart = (clientY, fromStatusBar = false) => {
    setIsDragging(true);
    setDragStartY(clientY);
    setStartDragFromStatusBar(fromStatusBar);
  };

  const handleDragMove = (clientY) => {
    if (!isDragging) return;
    
    const deltaY = clientY - dragStartY;
    
    if (startDragFromStatusBar) {
      // Dragging down from status bar - only allow downward drag
      const newHeight = Math.min(Math.max(0, deltaY), maxPanelHeight);
      setPanelHeight(newHeight);
    } else {
      // Dragging the panel itself - allow both up and down
      const newHeight = Math.min(Math.max(0, panelHeight + deltaY), maxPanelHeight);
      setPanelHeight(newHeight);
      setDragStartY(clientY);
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    // Snap behavior: if more than 50% open, snap fully open, otherwise close
    if (panelHeight > maxPanelHeight * 0.5) {
      setPanelHeight(maxPanelHeight);
    } else {
      setPanelHeight(0);
      if (onClose) onClose();
    }
    
    setIsDragging(false);
    setStartDragFromStatusBar(false);
  };

  // Mouse events
  const handleMouseDown = (e, fromStatusBar = false) => {
    e.preventDefault();
    handleDragStart(e.clientY, fromStatusBar);
  };

  const handleMouseMove = (e) => {
    handleDragMove(e.clientY);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  // Touch events
  const handleTouchStart = (e, fromStatusBar = false) => {
    handleDragStart(e.touches[0].clientY, fromStatusBar);
  };

  const handleTouchMove = (e) => {
    handleDragMove(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Global event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, dragStartY, panelHeight, startDragFromStatusBar]);

  // Expose drag handlers to parent component for status bar
  useImperativeHandle(ref, () => ({
    handleStatusBarMouseDown: (e) => handleMouseDown(e, true),
    handleStatusBarTouchStart: (e) => handleTouchStart(e, true),
    resetPanelHeight: () => {
      setPanelHeight(0);
      setIsDragging(false);
    },
    setFullHeight: () => {
      setPanelHeight(maxPanelHeight);
    },
    getPanelHeight: () => panelHeight,
  }));

  // Apply brightness
  useEffect(() => {
    document.documentElement.style.filter = `brightness(${quickSettings.brightness}%)`;
    return () => {
      document.documentElement.style.filter = '';
    };
  }, [quickSettings.brightness]);

  // Apply dark mode
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

  // Calculate opacity based on panel height
  const backgroundOpacity = Math.min((panelHeight / maxPanelHeight) * 0.6, 0.6);

  if (!isOpen) return null;

  return (
   // 1. Update the panel structure
<div 
  className={`fixed inset-x-0 top-0 z-50 bg-gray-100 dark:bg-gray-900 rounded-b-3xl shadow-2xl transition-transform duration-300 ease-out ${
    isOpen ? 'translate-y-0' : '-translate-y-full'
  }`}
  style={{
    transform: `translateY(${isDragging ? Math.max(0, dragDistance) : isOpen ? 0 : '-100%'})`,
    transition: isDragging ? 'none' : 'transform 0.3s ease-out'
  }}
>
  {/* Header with date/time and settings */}
  <div className="px-6 pt-6 pb-2">
    <div className="flex justify-between items-center mb-6">
      <div>
        <div className="text-2xl font-medium text-gray-900 dark:text-white">
          {new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric'
          })}
        </div>
      </div>
      <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
        <Settings className="w-6 h-6 text-gray-900 dark:text-white" />
      </button>
    </div>

    {/* Quick Settings Grid */}
    <div className="grid grid-cols-4 gap-4">
      {quickSettings.map((setting) => (
        <button
          key={setting.id}
          className={`flex flex-col items-center p-3 rounded-2xl ${
            setting.active 
              ? 'bg-blue-100 dark:bg-blue-900/50' 
              : 'hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          onClick={() => toggleSetting(setting.id)}
        >
          <div className={`p-3 rounded-full mb-2 ${
            setting.active 
              ? 'bg-blue-500 text-white' 
              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
          }`}>
            {setting.icon}
          </div>
          <span className="text-xs font-medium text-gray-900 dark:text-white">
            {setting.label}
          </span>
        </button>
      ))}
    </div>
  </div>

  {/* Brightness Slider */}
  <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
    <div className="flex items-center gap-3">
      <Sun className="w-5 h-5 text-gray-900 dark:text-white" />
      <input
        type="range"
        min="0"
        max="100"
        value={brightness}
        onChange={(e) => setBrightness(e.target.value)}
        className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none"
        style={{
          background: `linear-gradient(90deg, #3b82f6 0%, #3b82f6 ${brightness}%, #e5e7eb ${brightness}%, #e5e7eb 100%)`
        }}
      />
    </div>
  </div>
</div>
  );
}

export default forwardRef(QuickSettingsPanel);