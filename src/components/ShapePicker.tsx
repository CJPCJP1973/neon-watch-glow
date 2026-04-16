import { Circle, Square, RectangleVertical, Minus } from "lucide-react";
import { NeonTheme, themeMap } from "@/lib/themes";

export type WatchShape = "round" | "square" | "rect" | "minimal";

interface ShapePickerProps {
  activeShape: WatchShape;
  onShapeChange: (shape: WatchShape) => void;
  theme: NeonTheme;
}

const shapes: { id: WatchShape; icon: typeof Circle; label: string }[] = [
  { id: "round", icon: Circle, label: "ROUND" },
  { id: "square", icon: Square, label: "SQUARE" },
  { id: "rect", icon: RectangleVertical, label: "BAND" },
  { id: "minimal", icon: Minus, label: "MINIMAL" },
];

const ShapePicker = ({ activeShape, onShapeChange, theme }: ShapePickerProps) => {
  const t = themeMap[theme];

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="font-display text-[10px] font-bold tracking-[0.2em] text-muted-foreground">
        CHOOSE YOUR STYLE
      </span>
      <div className="flex items-center gap-1.5">
        {shapes.map(({ id, icon: Icon, label }) => {
          const isActive = id === activeShape;
          return (
            <button
              key={id}
              onClick={() => onShapeChange(id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg border transition-all duration-300 ${
                isActive
                  ? `${t.primaryBorder} bg-muted/30`
                  : "border-transparent hover:bg-muted/20"
              }`}
              style={isActive ? { boxShadow: `0 0 10px hsl(${t.hsl} / 0.2)` } : undefined}
            >
              <Icon
                className={`w-5 h-5 transition-colors duration-300 ${
                  isActive ? `${t.primaryText}` : "text-muted-foreground"
                }`}
              />
              <span
                className={`text-[8px] font-display font-bold tracking-wider transition-colors duration-300 ${
                  isActive ? `${t.primaryText}` : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ShapePicker;
