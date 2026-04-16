import { useState, useEffect } from "react";
import { NeonTheme, themeMap } from "@/lib/themes";

interface WatchFaceAnalogProps {
  theme?: NeonTheme;
}

const WatchFaceAnalog = ({ theme = "cyan" }: WatchFaceAnalogProps) => {
  const [time, setTime] = useState(new Date());
  const t = themeMap[theme];

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const dateNum = time.getDate();

  const hourAngle = (hours + minutes / 60) * 30;
  const minuteAngle = (minutes + seconds / 60) * 6;
  const secondAngle = seconds * 6;

  // 12 hour numbers around the dial
  const numbers = Array.from({ length: 12 }, (_, i) => {
    const num = i === 0 ? 12 : i;
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const radius = 125;
    const x = 160 + radius * Math.cos(angle);
    const y = 160 + radius * Math.sin(angle);
    return { num, x, y };
  });

  return (
    <div
      className={`relative w-[320px] h-[320px] rounded-full bg-background border-2 ${t.primaryBorder} overflow-hidden select-none transition-all duration-500`}
      style={{ boxShadow: `0 0 15px hsl(${t.hsl} / 0.4), 0 0 40px hsl(${t.hsl} / 0.15)` }}
    >
      {/* Scan line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
        <div
          className={`absolute inset-x-0 h-8 bg-gradient-to-b ${t.scanBg} to-transparent`}
          style={{ animation: "scan-line 4s linear infinite" }}
        />
      </div>

      {/* Inner bezel */}
      <div className={`absolute inset-2 rounded-full border ${t.primaryBorder} opacity-20 transition-colors duration-500`} />

      <svg viewBox="0 0 320 320" className="relative z-10 w-full h-full">
        {/* Minute ticks */}
        {Array.from({ length: 60 }).map((_, i) => {
          if (i % 5 === 0) return null;
          const angle = (i * 6 - 90) * (Math.PI / 180);
          const x1 = 160 + 145 * Math.cos(angle);
          const y1 = 160 + 145 * Math.sin(angle);
          const x2 = 160 + 152 * Math.cos(angle);
          const y2 = 160 + 152 * Math.sin(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={`hsl(${t.hsl})`}
              strokeOpacity="0.3"
              strokeWidth="1"
            />
          );
        })}

        {/* Hour numbers (neon) */}
        {numbers.map(({ num, x, y }) => (
          num === 3 ? null : (
            <text
              key={num}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="Orbitron, sans-serif"
              fontWeight="900"
              fontSize="22"
              fill={`hsl(${t.hsl})`}
              style={{
                filter: `drop-shadow(0 0 6px hsl(${t.hsl} / 0.9)) drop-shadow(0 0 12px hsl(${t.hsl} / 0.5))`,
              }}
            >
              {num}
            </text>
          )
        ))}

        {/* Date complication window at 3 o'clock */}
        <g>
          <rect
            x="245"
            y="148"
            width="34"
            height="24"
            rx="3"
            fill="black"
            stroke={`hsl(${t.hsl})`}
            strokeWidth="1.5"
            style={{ filter: `drop-shadow(0 0 4px hsl(${t.hsl} / 0.7))` }}
          />
          <text
            x="262"
            y="160"
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily="Orbitron, sans-serif"
            fontWeight="900"
            fontSize="14"
            fill="white"
            style={{ filter: "drop-shadow(0 0 2px rgba(255,255,255,0.8))" }}
          >
            {dateNum}
          </text>
        </g>

        {/* Hour hand (white) */}
        <line
          x1="160"
          y1="160"
          x2="160"
          y2="90"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          transform={`rotate(${hourAngle} 160 160)`}
          style={{ filter: "drop-shadow(0 0 4px rgba(255,255,255,0.8))" }}
        />

        {/* Minute hand (themed neon) */}
        <line
          x1="160"
          y1="160"
          x2="160"
          y2="55"
          stroke={`hsl(${t.hsl})`}
          strokeWidth="4"
          strokeLinecap="round"
          transform={`rotate(${minuteAngle} 160 160)`}
          style={{ filter: `drop-shadow(0 0 6px hsl(${t.hsl}))` }}
        />

        {/* Second hand (white, thin) */}
        <line
          x1="160"
          y1="175"
          x2="160"
          y2="45"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          transform={`rotate(${secondAngle} 160 160)`}
          style={{ filter: "drop-shadow(0 0 3px rgba(255,255,255,0.9))" }}
        />

        {/* Center cap */}
        <circle cx="160" cy="160" r="6" fill="white" />
        <circle cx="160" cy="160" r="3" fill={`hsl(${t.hsl})`} />
      </svg>
    </div>
  );
};

export default WatchFaceAnalog;
