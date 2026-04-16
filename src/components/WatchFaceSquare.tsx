import { useState, useEffect } from "react";
import { Moon, AlertTriangle, Navigation, Sunrise, Sunset, Droplets, Wind, ThermometerSun } from "lucide-react";
import { NeonTheme, themeMap } from "@/lib/themes";

interface WatchFaceSquareProps {
  theme?: NeonTheme;
}

const WatchFaceSquare = ({ theme = "cyan" }: WatchFaceSquareProps) => {
  const [time, setTime] = useState(new Date());
  const t = themeMap[theme];

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
    <div
      className={`relative w-[280px] h-[280px] rounded-2xl bg-background border-2 ${t.primaryBorder} overflow-hidden select-none transition-all duration-500`}
      style={{ boxShadow: `0 0 15px hsl(${t.hsl} / 0.4), 0 0 40px hsl(${t.hsl} / 0.15)` }}
    >
      {/* Corner accents */}
      <div className={`absolute top-0 left-0 w-8 h-[2px] ${t.primaryBg} opacity-60`} />
      <div className={`absolute top-0 left-0 h-8 w-[2px] ${t.primaryBg} opacity-60`} />
      <div className={`absolute bottom-0 right-0 w-8 h-[2px] ${t.primaryBg} opacity-60`} />
      <div className={`absolute bottom-0 right-0 h-8 w-[2px] ${t.primaryBg} opacity-60`} />

      {/* Scan line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute inset-x-0 h-6 bg-gradient-to-b ${t.scanBg} to-transparent`}
          style={{ animation: "scan-line 4s linear infinite" }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-between h-full p-4">
        {/* Top bar: alert + date */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-neon-orange" style={{ animation: "pulse-glow 2s ease-in-out infinite" }} />
            <span className="text-[9px] font-display font-bold text-neon-orange text-glow-orange tracking-wider">STORM 3PM</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-display font-semibold text-muted-foreground">{dayName}</span>
            <span className="text-[9px] font-display font-semibold text-neon-yellow">{dateStr}</span>
          </div>
        </div>

        {/* Center: time */}
        <div className="flex flex-col items-center">
          <div className="flex items-baseline gap-1">
            <span className={`text-[56px] leading-none font-display font-black ${t.primaryText} ${t.primaryGlow} tracking-wider transition-colors duration-500`}>
              {hours}
            </span>
            <span className="text-[56px] leading-none font-display font-black text-neon-magenta text-glow-magenta animate-pulse">:</span>
            <span className={`text-[56px] leading-none font-display font-black ${t.primaryText} ${t.primaryGlow} tracking-wider transition-colors duration-500`}>
              {minutes}
            </span>
          </div>
          <span className="text-base font-display font-bold text-neon-green text-glow-green -mt-1">{seconds}</span>
        </div>

        {/* Bottom grid */}
        <div className="w-full space-y-2">
          <div className="w-full h-px" style={{ background: `linear-gradient(to right, transparent, hsl(${t.hsl} / 0.3), transparent)` }} />
          <div className="grid grid-cols-4 gap-1 w-full">
            <div className="flex flex-col items-center">
              <ThermometerSun className="w-3 h-3 text-neon-orange" />
              <span className="text-[9px] font-display font-bold text-neon-orange">72°F</span>
            </div>
            <div className="flex flex-col items-center">
              <Moon className="w-3 h-3 text-neon-yellow" />
              <span className="text-[9px] font-display font-semibold text-neon-yellow">WAXING</span>
            </div>
            <div className="flex flex-col items-center">
              <Sunrise className="w-3 h-3 text-neon-orange" />
              <span className="text-[9px] font-display font-bold text-neon-orange">6:42</span>
            </div>
            <div className="flex flex-col items-center">
              <Sunset className="w-3 h-3 text-neon-magenta" />
              <span className="text-[9px] font-display font-bold text-neon-magenta">7:58</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-1">
              <Navigation className="w-2.5 h-2.5 text-neon-green" />
              <span className="text-[9px] font-display font-bold text-neon-green">12 MIN</span>
            </div>
            <div className="flex items-center gap-1">
              <Wind className={`w-2.5 h-2.5 ${t.primaryText}`} />
              <span className={`text-[9px] font-display font-bold ${t.primaryText}`}>12mph NW</span>
            </div>
            <div className="flex items-center gap-1">
              <Droplets className="w-2.5 h-2.5 text-neon-blue" />
              <span className="text-[9px] font-display font-bold text-neon-blue">65%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchFaceSquare;
