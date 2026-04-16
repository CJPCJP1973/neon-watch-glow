export type NeonTheme = "cyan" | "magenta" | "green" | "orange" | "blue" | "yellow";

export interface ThemeColors {
  primary: string;
  primaryText: string;
  primaryGlow: string;
  primaryBorder: string;
  primaryBg: string;
  scanBg: string;
  label: string;
  hsl: string;
}

export const themeMap: Record<NeonTheme, ThemeColors> = {
  cyan: {
    primary: "text-neon-cyan",
    primaryText: "text-neon-cyan",
    primaryGlow: "text-glow-cyan",
    primaryBorder: "border-neon-cyan",
    primaryBg: "bg-neon-cyan",
    scanBg: "from-neon-cyan/5",
    label: "CYAN",
    hsl: "170 100% 50%",
  },
  magenta: {
    primary: "text-neon-magenta",
    primaryText: "text-neon-magenta",
    primaryGlow: "text-glow-magenta",
    primaryBorder: "border-neon-magenta",
    primaryBg: "bg-neon-magenta",
    scanBg: "from-neon-magenta/5",
    label: "MAGENTA",
    hsl: "300 100% 60%",
  },
  green: {
    primary: "text-neon-green",
    primaryText: "text-neon-green",
    primaryGlow: "text-glow-green",
    primaryBorder: "border-neon-green",
    primaryBg: "bg-neon-green",
    scanBg: "from-neon-green/5",
    label: "GREEN",
    hsl: "120 100% 50%",
  },
  orange: {
    primary: "text-neon-orange",
    primaryText: "text-neon-orange",
    primaryGlow: "text-glow-orange",
    primaryBorder: "border-neon-orange",
    primaryBg: "bg-neon-orange",
    scanBg: "from-neon-orange/5",
    label: "ORANGE",
    hsl: "25 100% 55%",
  },
  blue: {
    primary: "text-neon-blue",
    primaryText: "text-neon-blue",
    primaryGlow: "text-glow-cyan",
    primaryBorder: "border-neon-blue",
    primaryBg: "bg-neon-blue",
    scanBg: "from-neon-blue/5",
    label: "BLUE",
    hsl: "210 100% 60%",
  },
  yellow: {
    primary: "text-neon-yellow",
    primaryText: "text-neon-yellow",
    primaryGlow: "text-glow-orange",
    primaryBorder: "border-neon-yellow",
    primaryBg: "bg-neon-yellow",
    scanBg: "from-neon-yellow/5",
    label: "YELLOW",
    hsl: "55 100% 55%",
  },
};
