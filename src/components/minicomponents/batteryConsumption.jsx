import { useState, useEffect } from 'react';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import Battery6BarIcon from '@mui/icons-material/Battery6Bar';
import Battery4BarIcon from '@mui/icons-material/Battery4Bar';
import Battery2BarIcon from '@mui/icons-material/Battery2Bar';
import Battery0BarIcon from '@mui/icons-material/Battery0Bar';
import BatteryAlertIcon from '@mui/icons-material/BatteryAlert';

export default function BatteryConsumption() {
    const [battery, setBattery] = useState(100);
    
    useEffect(() => {
        const timer = setInterval(() => {
            setBattery(prev => Math.max(0, prev - 0.1));
        }, 5000);
        return () => clearInterval(timer);
    }, []);
    
    const getBatteryIcon = () => {
        if (battery > 75) return <BatteryFullIcon sx={{ fontSize: 16 }} />;
        if (battery > 50) return <Battery6BarIcon sx={{ fontSize: 16 }} />;
        if (battery > 25) return <Battery4BarIcon sx={{ fontSize: 16 }} />;
        if (battery > 10) return <Battery2BarIcon sx={{ fontSize: 16 }} />;
        if (battery > 5) return <Battery0BarIcon sx={{ fontSize: 16 }} />;
        return <BatteryAlertIcon sx={{ fontSize: 16, color: '#ef4444' }} />;
    };
    
    return (
        <div className="battery-consumption text-white text-lg font-mono flex items-center gap-1">
            {getBatteryIcon()}
            <span className="text-xs">{battery.toFixed(0)}%</span>
        </div>
    );
}