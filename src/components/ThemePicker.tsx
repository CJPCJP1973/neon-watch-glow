import { NeonTheme, themeMap } from "@/lib/themes";

interface ThemePickerProps {
  activeTheme: NeonTheme;
  onThemeChange: (theme: NeonTheme) => void;
}

const themes: NeonTheme[] = ["cyan", "magenta", "green", "orange", "blue", "yellow"];

const ThemePicker = ({ activeTheme, onThemeChange }: ThemePickerProps) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="font-display text-[10px] font-bold tracking-[0.2em] text-muted-foreground">
        CHOOSE YOUR THEME
      </span>
      <div className="flex items-center gap-2">
        {themes.map((theme) => {
          const isActive = theme === activeTheme;
          return (
            <button
              key={theme}
              onClick={() => onThemeChange(theme)}
              className={`relative w-9 h-9 rounded-full transition-all duration-300 ${themeMap[theme].primaryBg} ${
                isActive
                  ? "scale-110 ring-2 ring-offset-2 ring-offset-background"
                  : "opacity-50 hover:opacity-80 hover:scale-105"
              }`}
              style={{
                boxShadow: isActive
                  ? `0 0 15px hsl(${themeMap[theme].hsl} / 0.6), 0 0 30px hsl(${themeMap[theme].hsl} / 0.3)`
                  : "none",
                ringColor: isActive ? `hsl(${themeMap[theme].hsl})` : undefined,
              }}
              title={themeMap[theme].label}
            >
              {isActive && (
                <span className="absolute inset-0 flex items-center justify-center text-background font-display text-xs font-black">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemePicker;
