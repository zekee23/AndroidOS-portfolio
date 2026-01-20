import { useState, useEffect } from 'react';

export default function DigitalClock() {
    const [time, setTime] = useState(new Date());
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        // Sets up the timer to update the time every second
        const timer = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setTime(new Date());
                setIsTransitioning(false);
            }, 150);
        }, 1000);

        // Cleans up the interval when the component unmounts
        return () => clearInterval(timer);
    }, []);

    // Get the current hours and format for 12-hour display
    const hours24 = time.getHours();
    // 0 AM/PM is 12:00, otherwise modulo 12
    const hours12 = (hours24 % 12) || 12; 
    // Pad with '0' if needed for single digit hours (e.g., 09)
    const formattedHours = hours12.toString().padStart(2, '0');

    // Get minutes and pad with '0' if needed
    const minutes = time.getMinutes().toString().padStart(2, '0');
    
    // Determine AM/PM
    const period = hours24 >= 12 ? 'PM' : 'AM';

    return (
        <div className={`digital-clock text-white text-lg font-roboto font-light gap-2 transition-all duration-300 ease-in-out ${
            isTransitioning ? 'opacity-70 scale-95' : 'opacity-100 scale-100'
        }`}>
            {/* Display in 12-hour format */}
            <span className="inline-block transition-all duration-300">
                {formattedHours}
            </span>
            <span className="inline-block animate-pulse">:</span>
            <span className="inline-block transition-all duration-300">
                {minutes} 
            </span>
            &nbsp;
            <span className="ml-1 inline-block transition-all duration-300">
                {period}
            </span>
            &nbsp;
            <span className="ml-2 text-xs text-gray-400 font-roboto transition-all duration-300">
                EST
            </span>
        </div>
    );
}
