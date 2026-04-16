import { useState, useEffect } from "react";
import { Moon, AlertTriangle, Navigation, Sunrise, Sunset, Droplets, Wind, ThermometerSun } from "lucide-react";
import { NeonTheme, themeMap } from "@/lib/themes";

interface WatchFaceRectProps {
  theme?: NeonTheme;
}

const WatchFaceRect = ({ theme = "cyan" }: WatchFaceRectProps) => {
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
      className={`relative w-[220px] h-[320px] rounded-[28px] bg-background border-2 ${t.primaryBorder} overflow-hidden select-none transition-all duration-500`}
      style={{ boxShadow: `0 0 15px hsl(${t.hsl} / 0.4), 0 0 40px hsl(${t.hsl} / 0.15)` }}
    >
      {/* Scan line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute inset-x-0 h-6 bg-gradient-to-b ${t.scanBg} to-transparent`}
          style={{ animation: "scan-line 4s linear infinite" }}
        />
      </div>

      {/* Side accent lines */}
      <div className={`absolute top-6 bottom-6 left-0 w-[2px] ${t.primaryBg} opacity-20`} />
      <div className={`absolute top-6 bottom-6 right-0 w-[2px] ${t.primaryBg} opacity-20`} />

      <div className="relative z-10 flex flex-col items-center justify-between h-full py-5 px-4">
        {/* Alert */}
        <div className="flex items-center gap-1">
          <AlertTriangle className="w-3 h-3 text-neon-orange" style={{ animation: "pulse-glow 2s ease-in-out infinite" }} />
          <span className="text-[9px] font-display font-bold text-neon-orange text-glow-orange tracking-wider">STORM 3PM</span>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-display font-semibold text-muted-foreground">{dayName}</span>
          <span className="text-[10px] font-display font-semibold text-neon-yellow">{dateStr}</span>
        </div>

        {/* Time - stacked */}
        <div className="flex flex-col items-center -space-y-3">
          <span className={`text-[64px] leading-none font-display font-black ${t.primaryText} ${t.primaryGlow} tracking-widest transition-colors duration-500`}>
            {hours}
          </span>
          <span className="text-2xl font-display font-black text-neon-magenta text-glow-magenta animate-pulse">:</span>
          <span className={`text-[64px] leading-none font-display font-black ${t.primaryText} ${t.primaryGlow} tracking-widest transition-colors duration-500`}>
            {minutes}
          </span>
        </div>

        <span className="text-sm font-display font-bold text-neon-green text-glow-green">{seconds}</span>

        {/* Divider */}
        <div className="w-full h-px" style={{ background: `linear-gradient(to right, transparent, hsl(${t.hsl} / 0.3), transparent)` }} />

        {/* Data - 2x2 grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 w-full">
          <div className="flex items-center gap-1 justify-center">
            <ThermometerSun className="w-3 h-3 text-neon-orange" />
            <span className="text-[9px] font-display font-bold text-neon-orange">72°F</span>
          </div>
          <div className="flex items-center gap-1 justify-center">
            <Moon className="w-3 h-3 text-neon-yellow" />
            <span className="text-[9px] font-display font-semibold text-neon-yellow">WAXING</span>
          </div>
          <div className="flex items-center gap-1 justify-center">
            <Sunrise className="w-3 h-3 text-neon-orange" />
            <span className="text-[9px] font-display font-bold text-neon-orange">6:42</span>
          </div>
          <div className="flex items-center gap-1 justify-center">
            <Sunset className="w-3 h-3 text-neon-magenta" />
            <span className="text-[9px] font-display font-bold text-neon-magenta">7:58</span>
          </div>
        </div>

        {/* Bottom info */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Navigation className="w-2.5 h-2.5 text-neon-green" />
            <span className="text-[8px] font-display font-bold text-neon-green">12 MIN</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind className={`w-2.5 h-2.5 ${t.primaryText}`} />
            <span className={`text-[8px] font-display font-bold ${t.primaryText}`}>12mph</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchFaceRect;
