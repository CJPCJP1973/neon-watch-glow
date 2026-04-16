import { useState, useEffect } from "react";
import { Cloud, Sun, Moon, AlertTriangle, Navigation, Sunrise, Sunset, Droplets, Wind, ThermometerSun } from "lucide-react";

const WatchFace = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");
  const dayName = time.toLocaleDateString("en", { weekday: "short" }).toUpperCase();
  const dateStr = time.toLocaleDateString("en", { month: "short", day: "numeric" }).toUpperCase();

  return (
    <div className="relative w-[320px] h-[320px] rounded-full bg-background border-2 border-neon-cyan box-glow-cyan overflow-hidden select-none">
      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
        <div
          className="absolute inset-x-0 h-8 bg-gradient-to-b from-neon-cyan/5 to-transparent"
          style={{ animation: "scan-line 4s linear infinite" }}
        />
      </div>

      {/* Inner bezel */}
      <div className="absolute inset-2 rounded-full border border-neon-cyan/20" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        {/* Weather alert bar */}
        <div className="flex items-center gap-1.5 mb-1">
          <AlertTriangle className="w-3 h-3 text-neon-orange" style={{ animation: "pulse-glow 2s ease-in-out infinite" }} />
          <span className="text-[10px] font-display font-bold text-neon-orange text-glow-orange tracking-wider">
            STORM ALERT 3PM
          </span>
        </div>

        {/* Main time */}
        <div className="flex items-baseline gap-0.5">
          <span className="text-6xl font-display font-black text-primary text-glow-cyan tracking-wider">
            {hours}
          </span>
          <span className="text-6xl font-display font-black text-neon-magenta text-glow-magenta animate-pulse">
            :
          </span>
          <span className="text-6xl font-display font-black text-primary text-glow-cyan tracking-wider">
            {minutes}
          </span>
        </div>

        {/* Seconds + Date */}
        <div className="flex items-center gap-3 -mt-1">
          <span className="text-lg font-display font-bold text-neon-green text-glow-green">
            {seconds}
          </span>
          <span className="text-xs font-display font-semibold text-muted-foreground">
            {dayName}
          </span>
          <span className="text-xs font-display font-semibold text-neon-yellow">
            {dateStr}
          </span>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent my-2" />

        {/* Info grid */}
        <div className="grid grid-cols-3 gap-x-4 gap-y-1.5 w-full">
          {/* Weather */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1">
              <ThermometerSun className="w-3 h-3 text-neon-orange" />
              <span className="text-xs font-display font-bold text-neon-orange">72°F</span>
            </div>
            <div className="flex items-center gap-0.5">
              <Droplets className="w-2.5 h-2.5 text-neon-blue" />
              <span className="text-[9px] font-body text-neon-blue">65%</span>
            </div>
          </div>

          {/* Lunar */}
          <div className="flex flex-col items-center">
            <Moon className="w-3.5 h-3.5 text-neon-yellow" />
            <span className="text-[9px] font-display font-semibold text-neon-yellow">WAXING</span>
          </div>

          {/* Wind */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1">
              <Wind className="w-3 h-3 text-neon-cyan" />
              <span className="text-xs font-display font-bold text-primary">12mph</span>
            </div>
            <span className="text-[9px] font-body text-muted-foreground">NW</span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-neon-magenta/30 to-transparent my-1.5" />

        {/* Bottom row */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1">
            <Sunrise className="w-3 h-3 text-neon-orange" />
            <span className="text-[10px] font-display font-bold text-neon-orange">6:42</span>
          </div>

          <div className="flex items-center gap-1">
            <Navigation className="w-3 h-3 text-neon-green" />
            <span className="text-[10px] font-display font-bold text-neon-green">12 MIN</span>
          </div>

          <div className="flex items-center gap-1">
            <Sunset className="w-3 h-3 text-neon-magenta" />
            <span className="text-[10px] font-display font-bold text-neon-magenta">7:58</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchFace;
