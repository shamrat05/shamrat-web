import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

export const LocalTime: React.FC = () => {
  const [timeData, setTimeData] = useState<{ time: string; status: string; isAwake: boolean } | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Format time for Dhaka (UTC+6)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Dhaka',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      };
      const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
      
      // Get hour in Dhaka (0-23)
      const bdHour = parseInt(new Intl.DateTimeFormat('en-US', { 
        timeZone: 'Asia/Dhaka', 
        hour: 'numeric', 
        hour12: false 
      }).format(now), 10);

      // Determine status smartly
      let status = 'Working';
      let isAwake = true;

      if (bdHour >= 23 || bdHour < 7) {
        status = 'Sleeping';
        isAwake = false;
      } else if (bdHour >= 7 && bdHour < 10) {
        status = 'Morning Coffee';
      } else if (bdHour >= 18 && bdHour < 23) {
        status = 'Decompressing';
      }

      setTimeData({ time: timeString, status, isAwake });
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  if (!timeData) return null;

  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-sm hover:bg-white/10 transition-colors cursor-default">
      <div className="relative flex items-center justify-center">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${timeData.isAwake ? 'bg-green-500' : 'bg-orange-500'}`}></span>
        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${timeData.isAwake ? 'bg-green-500' : 'bg-orange-500'}`}></span>
      </div>
      
      <div className="flex flex-col leading-none gap-1">
        <span className="text-xs font-medium text-text-secondary uppercase tracking-wider flex items-center gap-1">
          <Globe size={10} /> Dhaka, BD
        </span>
        <span className="text-sm font-mono text-text-primary font-semibold">
          {timeData.time} <span className="text-text-secondary mx-1">·</span> {timeData.status}
        </span>
      </div>
    </div>
  );
};