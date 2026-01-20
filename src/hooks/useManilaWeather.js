// hooks/useManilaTemperature.js
import { useState, useEffect } from "react";
import { getManilaTemperature } from "../utils/weather";

export function useManilaTemperature() {
  const [temperature, setTemperature] = useState(
    getManilaTemperature()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTemperature(getManilaTemperature());
    }, 300000); // 5 min

    return () => clearInterval(interval);
  }, []);

  return temperature;
}
