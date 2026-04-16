import { type LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: "cyan" | "magenta" | "green" | "orange";
}

const colorMap = {
  cyan: "text-neon-cyan text-glow-cyan border-neon-cyan/30",
  magenta: "text-neon-magenta text-glow-magenta border-neon-magenta/30",
  green: "text-neon-green text-glow-green border-neon-green/30",
  orange: "text-neon-orange text-glow-orange border-neon-orange/30",
};

const FeatureCard = ({ icon: Icon, title, description, color }: FeatureCardProps) => (
  <div className="group relative p-5 rounded-xl bg-card border border-border hover:border-neon-cyan/40 transition-all duration-300">
    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative z-10">
      <Icon className={`w-8 h-8 mb-3 ${colorMap[color]}`} />
      <h3 className="font-display font-bold text-foreground text-sm mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground font-body leading-relaxed">{description}</p>
    </div>
  </div>
);

export default FeatureCard;
