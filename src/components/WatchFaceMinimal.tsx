import { useState, useEffect } from "react";
import { Moon, Sunrise, Sunset } from "lucide-react";
import { NeonTheme, themeMap } from "@/lib/themes";

interface WatchFaceMinimalProps {
  theme?: NeonTheme;
}

const WatchFaceMinimal = ({ theme = "cyan" }: WatchFaceMinimalProps) => {
  const [time, setTime] = useState(new Date());
  const t = themeMap[theme];

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");
  const dateStr = time.toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric" }).toUpperCase();

  return (
    <div
      className={`relative w-[300px] h-[300px] rounded-full bg-background border ${t.primaryBorder} overflow-hidden select-none transition-all duration-500`}
      style={{ boxShadow: `0 0 10px hsl(${t.hsl} / 0.2), 0 0 30px hsl(${t.hsl} / 0.08)` }}
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
        {/* Date */}
        <span className="text-[10px] font-display font-semibold text-muted-foreground tracking-[0.15em] mb-4">
          {dateStr}
        </span>

        {/* Time - large and clean */}
        <div className="flex items-baseline">
          <span className={`text-7xl font-display font-black ${t.primaryText} ${t.primaryGlow} tracking-wider transition-colors duration-500`}>
            {hours}
          </span>
          <span className={`text-7xl font-display font-black ${t.primaryText} opacity-40 animate-pulse mx-0.5`}>:</span>
          <span className={`text-7xl font-display font-black ${t.primaryText} ${t.primaryGlow} tracking-wider transition-colors duration-500`}>
            {minutes}
          </span>
        </div>

        {/* Seconds - subtle */}
        <span className={`text-sm font-display font-semibold ${t.primaryText} opacity-50 mt-1`}>{seconds}</span>

        {/* Thin divider */}
        <div className="w-16 h-px my-4" style={{ background: `hsl(${t.hsl} / 0.25)` }} />

        {/* Minimal bottom info */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1">
            <Sunrise className="w-3 h-3 text-neon-orange opacity-70" />
            <span className="text-[10px] font-display font-semibold text-muted-foreground">6:42</span>
          </div>
          <Moon className="w-3.5 h-3.5 text-neon-yellow opacity-60" />
          <div className="flex items-center gap-1">
            <Sunset className="w-3 h-3 text-neon-magenta opacity-70" />
            <span className="text-[10px] font-display font-semibold text-muted-foreground">7:58</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchFaceMinimal;
