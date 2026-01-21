import { useState, useRef, useEffect, createContext, useContext } from 'react';
import QuickSettingsPanel from './QuickSettingsPanel.jsx';

// Create context for quick settings state
const QuickSettingsContext = createContext();

export const useQuickSettings = () => useContext(QuickSettingsContext);

export default function TabletFrame({ children }) {
  const [showQuickSettings, setShowQuickSettings] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [panelHeight, setPanelHeight] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const quickSettingsPanelRef = useRef(null);
  const currentDragDistance = useRef(0);
  const maxPanelHeight = 500;

  const STATUS_BAR_HEIGHT = 28;


  const quickSettingsValue = {
    isOpen: showQuickSettings || isDragging,
    isDragging
  };

 const handleDragStart = (clientY) => {
  console.log('Drag start attempted at:', clientY, 'Threshold:', STATUS_BAR_HEIGHT + 20);
  if (clientY <= STATUS_BAR_HEIGHT + 20) {
    console.log('Drag started successfully');
    setIsDragging(true);
    setDragStart(clientY);
    setPanelHeight(0);
    currentDragDistance.current = 0;
    setShowQuickSettings(true);
  } else {
    console.log('Drag start - outside threshold');
  }
};


  const handleDragMove = (clientY) => {
  if (!isDragging) return;

  const distance = clientY - dragStart;
  const adjusted = Math.max(0, distance);

  console.log('Drag move - distance:', distance, 'adjusted:', adjusted);

  setDragDistance(adjusted);
  currentDragDistance.current = adjusted;
  setPanelHeight(Math.min(adjusted, maxPanelHeight));
};

 const handleDragEnd = () => {
  if (!isDragging) return;

  // Use ref to get the most current drag distance
  const currentHeight = currentDragDistance.current;
  const heightPercentage = (currentHeight / maxPanelHeight) * 100;
  
  // Check if mobile screen (less than 768px)
  const isMobile = window.innerWidth < 768;
  const mobileThreshold = 400; // 400px for mobile
  
  console.log('Drag end - Current height:', currentHeight, 'Percentage:', heightPercentage, 'Is mobile:', isMobile);

  if (isMobile) {
    // Mobile logic: if dragged 400px or more, stick to middle
    if (currentHeight >= mobileThreshold) {
      console.log('Mobile: Snapping to middle (400px+)');
      setPanelHeight(maxPanelHeight * 0.5);
      setShowQuickSettings(true);
    } else {
      console.log('Mobile: Closing panel (below 400px)');
      setPanelHeight(0);
      setShowQuickSettings(false);
    }
  } else {
    // Desktop logic: percentage-based
    if (heightPercentage >= 50) {
      console.log('Desktop: Snapping to middle (50%+)');
      setPanelHeight(maxPanelHeight * 0.5);
      setShowQuickSettings(true);
    } else if (heightPercentage >= 20) {
      console.log('Desktop: Snapping to middle (20-50%)');
      setPanelHeight(maxPanelHeight * 0.5);
      setShowQuickSettings(true);
    } else {
      console.log('Desktop: Closing panel (below 20%)');
      setPanelHeight(0);
      setShowQuickSettings(false);
    }
  }

  setIsDragging(false);
};


  // Mouse events
  const handleMouseDown = (e) => {
    handleDragStart(e.clientY);
  };

  const handleMouseMove = (e) => {
    handleDragMove(e.clientY);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  // Touch events
  const handleTouchStart = (e) => {
    handleDragStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      e.preventDefault();
      handleDragMove(e.touches[0].clientY);
    }
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
  }, [isDragging, dragStart]);

  return (
    <div 
      className="
        w-full h-screen
        bg-slate-900
        shadow-2xl
        flex flex-col
        relative
        overflow-hidden
      "
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{ touchAction: 'none' }}
    >
      <QuickSettingsContext.Provider value={quickSettingsValue}>
        {children}
      </QuickSettingsContext.Provider>
      
      {/* Drag indicator */}
      {isDragging && (
        <div 
          className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-white/20 rounded-full px-3 py-1 text-white text-xs pointer-events-none z-50"
          style={{ opacity: Math.min(dragDistance / 50, 1) }}
        >
          Pull down for quick settings
        </div>
      )}

      {/* Quick Settings Panel */}
      {(showQuickSettings || panelHeight > 0 || isDragging) && (
  <QuickSettingsPanel
    ref={quickSettingsPanelRef}
    isOpen={showQuickSettings || isDragging}
    isDragging={isDragging}
    panelHeight={panelHeight}
  />
)}

    </div>
  );
}