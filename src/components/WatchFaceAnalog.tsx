import { useState, useEffect, useRef } from "react";
import { NeonTheme, themeMap } from "@/lib/themes";
import { Play, Pause, RotateCcw } from "lucide-react";

interface WatchFaceAnalogProps {
  theme?: NeonTheme;
}

const WatchFaceAnalog = ({ theme = "cyan" }: WatchFaceAnalogProps) => {
  const [time, setTime] = useState(new Date());
  const [chronoMs, setChronoMs] = useState(0);
  const [chronoRunning, setChronoRunning] = useState(false);
  const startRef = useRef<number | null>(null);
  const baseRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const t = themeMap[theme];

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (chronoRunning) {
      startRef.current = performance.now();
      const tick = () => {
        const now = performance.now();
        setChronoMs(baseRef.current + (now - (startRef.current ?? now)));
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }
  }, [chronoRunning]);

  const toggleChrono = () => {
    if (chronoRunning) {
      baseRef.current = chronoMs;
      setChronoRunning(false);
    } else {
      setChronoRunning(true);
    }
  };

  const resetChrono = () => {
    setChronoRunning(false);
    baseRef.current = 0;
    setChronoMs(0);
  };

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const dateNum = time.getDate();

  const hourAngle = (hours + minutes / 60) * 30;
  const minuteAngle = (minutes + seconds / 60) * 6;
  const secondAngle = seconds * 6;

  // Chronograph: large center hand = chrono seconds (sweep), sub-dial 9 o'clock = chrono minutes (0-30)
  const chronoSeconds = (chronoMs / 1000) % 60;
  const chronoMinutesTotal = Math.floor(chronoMs / 60000);
  const chronoSecondAngle = chronoSeconds * 6;
  const chronoMinuteAngle = (chronoMinutesTotal % 30) * 12;

  // 12 hour numbers around the dial (pulled in to make room for tachymeter)
  const numbers = Array.from({ length: 12 }, (_, i) => {
    const num = i === 0 ? 12 : i;
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const radius = 95;
    const x = 160 + radius * Math.cos(angle);
    const y = 160 + radius * Math.sin(angle);
    return { num, x, y };
  });

  // Sub-dial center (9 o'clock position)
  const subCx = 110;
  const subCy = 160;
  const subR = 22;

  return (
    <div className="flex flex-col items-center gap-4">
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

        {/* Inner bezel (tachymeter ring boundary) */}
        <div className={`absolute inset-2 rounded-full border ${t.primaryBorder} opacity-20 transition-colors duration-500`} />
        <div className={`absolute inset-[26px] rounded-full border ${t.primaryBorder} opacity-30 transition-colors duration-500`} />

        <svg viewBox="0 0 320 320" className="relative z-10 w-full h-full">
          {/* Tachymeter markings (outer ring) */}
          {[60, 70, 75, 80, 90, 100, 120, 150, 180, 200, 240, 300, 400, 500].map((val) => {
            // Angle: where the second hand points after `val` seconds (val sec = 3600/val units/hr)
            // Only place values where seconds <= 60 (i.e., val >= 60)
            const sec = 3600 / val;
            if (sec > 60) return null;
            const angleDeg = sec * 6 - 90;
            const angle = angleDeg * (Math.PI / 180);
            const tickInner = 134;
            const tickOuter = 142;
            const labelR = 124;
            const x1 = 160 + tickInner * Math.cos(angle);
            const y1 = 160 + tickInner * Math.sin(angle);
            const x2 = 160 + tickOuter * Math.cos(angle);
            const y2 = 160 + tickOuter * Math.sin(angle);
            const lx = 160 + labelR * Math.cos(angle);
            const ly = 160 + labelR * Math.sin(angle);
            return (
              <g key={val}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={`hsl(${t.hsl})`}
                  strokeOpacity="0.7"
                  strokeWidth="1"
                />
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontFamily="Orbitron, sans-serif"
                  fontWeight="700"
                  fontSize="7"
                  fill={`hsl(${t.hsl})`}
                  opacity="0.85"
                  style={{ filter: `drop-shadow(0 0 2px hsl(${t.hsl} / 0.6))` }}
                >
                  {val}
                </text>
              </g>
            );
          })}
          {/* TACHYMETER label */}
          <text
            x="160"
            y="138"
            textAnchor="middle"
            fontFamily="Orbitron, sans-serif"
            fontWeight="700"
            fontSize="5"
            fill={`hsl(${t.hsl})`}
            opacity="0.6"
            letterSpacing="2"
          >
            TACHYMETER
          </text>

          {/* Minute ticks */}
          {Array.from({ length: 60 }).map((_, i) => {
            if (i % 5 === 0) return null;
            const angle = (i * 6 - 90) * (Math.PI / 180);
            const x1 = 160 + 110 * Math.cos(angle);
            const y1 = 160 + 110 * Math.sin(angle);
            const x2 = 160 + 116 * Math.cos(angle);
            const y2 = 160 + 116 * Math.sin(angle);
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

          {/* Hour numbers (skip 3 for date, skip 9 for chrono sub-dial) */}
          {numbers.map(({ num, x, y }) => (
            num === 3 || num === 9 ? null : (
              <text
                key={num}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="Orbitron, sans-serif"
                fontWeight="900"
                fontSize="16"
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

          {/* Chronograph minute sub-dial at 9 o'clock (0-30) */}
          <g>
            <circle
              cx={subCx}
              cy={subCy}
              r={subR}
              fill="black"
              stroke={`hsl(${t.hsl})`}
              strokeWidth="1.5"
              style={{ filter: `drop-shadow(0 0 4px hsl(${t.hsl} / 0.7))` }}
            />
            {/* Sub-dial ticks at 0, 10, 20 */}
            {[0, 10, 20].map((m) => {
              const a = (m * 12 - 90) * (Math.PI / 180);
              const x1 = subCx + (subR - 5) * Math.cos(a);
              const y1 = subCy + (subR - 5) * Math.sin(a);
              const x2 = subCx + subR * Math.cos(a);
              const y2 = subCy + subR * Math.sin(a);
              return (
                <line
                  key={m}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={`hsl(${t.hsl})`}
                  strokeWidth="1.5"
                />
              );
            })}
            <text
              x={subCx}
              y={subCy + subR - 8}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="Orbitron, sans-serif"
              fontWeight="700"
              fontSize="6"
              fill={`hsl(${t.hsl})`}
              opacity="0.7"
            >
              MIN
            </text>
            {/* Sub-dial hand */}
            <line
              x1={subCx}
              y1={subCy}
              x2={subCx}
              y2={subCy - subR + 4}
              stroke={`hsl(${t.hsl})`}
              strokeWidth="2"
              strokeLinecap="round"
              transform={`rotate(${chronoMinuteAngle} ${subCx} ${subCy})`}
              style={{ filter: `drop-shadow(0 0 3px hsl(${t.hsl}))` }}
            />
            <circle cx={subCx} cy={subCy} r="2" fill={`hsl(${t.hsl})`} />
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

          {/* Chronograph sweep second hand (themed, only visible when active) */}
          {(chronoRunning || chronoMs > 0) && (
            <line
              x1="160"
              y1="180"
              x2="160"
              y2="40"
              stroke={`hsl(${t.hsl})`}
              strokeWidth="1.5"
              strokeLinecap="round"
              transform={`rotate(${chronoSecondAngle} 160 160)`}
              style={{ filter: `drop-shadow(0 0 5px hsl(${t.hsl})) drop-shadow(0 0 10px hsl(${t.hsl} / 0.6))` }}
            />
          )}

          {/* Center cap */}
          <circle cx="160" cy="160" r="6" fill="white" />
          <circle cx="160" cy="160" r="3" fill={`hsl(${t.hsl})`} />
        </svg>
      </div>

      {/* Chronograph controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleChrono}
          aria-label={chronoRunning ? "Pause chronograph" : "Start chronograph"}
          className={`flex items-center justify-center w-10 h-10 rounded-full bg-background border-2 ${t.primaryBorder} transition-all hover:scale-105`}
          style={{ boxShadow: `0 0 8px hsl(${t.hsl} / 0.5)`, color: `hsl(${t.hsl})` }}
        >
          {chronoRunning ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <div
          className="font-mono text-lg tabular-nums min-w-[110px] text-center"
          style={{ color: `hsl(${t.hsl})`, textShadow: `0 0 6px hsl(${t.hsl} / 0.7)` }}
        >
          {String(Math.floor(chronoMs / 60000)).padStart(2, "0")}:
          {String(Math.floor((chronoMs / 1000) % 60)).padStart(2, "0")}.
          {String(Math.floor((chronoMs % 1000) / 10)).padStart(2, "0")}
        </div>
        <button
          onClick={resetChrono}
          aria-label="Reset chronograph"
          className={`flex items-center justify-center w-10 h-10 rounded-full bg-background border-2 ${t.primaryBorder} transition-all hover:scale-105`}
          style={{ boxShadow: `0 0 8px hsl(${t.hsl} / 0.5)`, color: `hsl(${t.hsl})` }}
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
};

export default WatchFaceAnalog;
