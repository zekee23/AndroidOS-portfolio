import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Wifi, Moon, Sun, Volume2, Settings } from 'lucide-react';

function QuickSettingsPanel({ isOpen, isDragging, panelHeight }, ref) {
  const [quickSettings, setQuickSettings] = useState({
    wifi: true,
    darkMode: false,
    brightness: 70,
    volume: 50,
  });

  const maxPanelHeight = 500;

  // Calculate opacity based on panel height
  

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

  // Expose methods to parent component (for compatibility)
  useImperativeHandle(ref, () => ({
    getPanelHeight: () => panelHeight,
  }));

  // Apply brightness
 

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

  // Quick settings items
  const quickSettingsItems = [
    { id: 'wifi', label: 'Wi-Fi', icon: <Wifi className="w-6 h-6" />, active: quickSettings.wifi },
    { id: 'darkMode', label: 'Dark Mode', icon: quickSettings.darkMode ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />, active: quickSettings.darkMode },
    { id: 'volume', label: 'Volume', icon: <Volume2 className="w-6 h-6" />, active: quickSettings.volume > 0 },
  ];

  // Keep panel mounted as long as it has height or should be open
  

  return (
    <div 
  className="fixed inset-x-0 z-[9999] bg-black rounded-b-3xl shadow-2xl"
  style={{
  top: '28px',
  height: `${panelHeight}px`,
  transform: `translateY(${panelHeight === 0 ? '-8px' : '0px'})`,
  opacity: Math.min(panelHeight / 120, 1),
  transition: isDragging
    ? 'none'
    : 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s ease, opacity 0.2s ease',
  overflow: 'hidden'
}}




>
      <div className="h-full overflow-y-auto"
      style={{ pointerEvents: 'auto' }}>
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
        </div>

        {/* Quick Settings Grid */}
        <div className="grid grid-cols-4 gap-4">
          {quickSettingsItems.map((setting) => (
            <button
              key={setting.id}
              className={`flex flex-col items-center p-3 rounded-2xl
  transition-all active:scale-95
  ${setting.active 
    ? 'bg-blue-100 dark:bg-blue-900/50'
    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
  }
`}
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
            value={quickSettings.brightness}
            onChange={(e) => updateSlider('brightness', parseInt(e.target.value))}
            className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none"
            style={{
              background: `linear-gradient(90deg, #3b82f6 0%, #3b82f6 ${quickSettings.brightness}%, #e5e7eb ${quickSettings.brightness}%, #e5e7eb 100%)`
            }}
          />
        </div>
      </div>

      {/* Volume Slider */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <Volume2 className="w-5 h-5 text-gray-900 dark:text-white" />
          <input
            type="range"
            min="0"
            max="100"
            value={quickSettings.volume}
            onChange={(e) => updateSlider('volume', parseInt(e.target.value))}
            className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none"
            style={{
              background: `linear-gradient(90deg, #3b82f6 0%, #3b82f6 ${quickSettings.volume}%, #e5e7eb ${quickSettings.volume}%, #e5e7eb 100%)`
            }}
          />
        </div>
      </div>
      

      {/* Drag handle */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      </div>
    </div>
    {panelHeight > 0 && (
  <div
    className="fixed inset-0 pointer-events-none z-[1]"
    style={{
      backgroundColor: '#000',
      opacity: 1 - quickSettings.brightness / 100
    }}
  />
)}
    </div>
  );
}

export default forwardRef(QuickSettingsPanel);