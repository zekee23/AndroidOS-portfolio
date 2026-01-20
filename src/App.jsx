import { useState } from "react";
import TabletFrame from "./components/TabletFrame.jsx";
import StatusBar from "./components/StatusBar.jsx";
import NavigationBar from "./components/NavigationBar.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import AppWindow from "./components/AppWindow.jsx";
import "./index.css";

export default function App() {
  const [activeApp, setActiveApp] = useState(null);
  const [showRecent, setShowRecent] = useState(false);

  const handleBack = () => {
    if (activeApp) {
      setActiveApp(null);
    }
  };

  const handleHome = () => {
    setActiveApp(null);
    setShowRecent(false);
  };

  const handleRecent = () => {
    setShowRecent(!showRecent);
  };

  return (
    <TabletFrame>
      <StatusBar />

      {!activeApp && (
        <HomeScreen openApp={setActiveApp} />
      )}

      {activeApp && (
        <AppWindow
          app={activeApp}
          close={() => setActiveApp(null)}
        />
      )}

      <NavigationBar 
        onBack={handleBack}
        onHome={handleHome}
        onRecent={handleRecent}
      />
    </TabletFrame>
  );
}
