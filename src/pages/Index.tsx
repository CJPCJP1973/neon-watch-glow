import { Cloud, Navigation, Moon, Sunrise, AlertTriangle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import WatchFace from "@/components/WatchFace";
import FeatureCard from "@/components/FeatureCard";

const features = [
  { icon: Cloud, title: "WEATHER ALERTS", description: "Real-time storm warnings, temperature, humidity & wind data at a glance.", color: "cyan" as const },
  { icon: Navigation, title: "TRAFFIC ALERTS", description: "Live commute times and route alerts. Never get stuck in traffic again.", color: "green" as const },
  { icon: Moon, title: "LUNAR TRACKER", description: "Moon phase, moonrise & moonset times. Perfect for outdoor enthusiasts.", color: "orange" as const },
  { icon: Sunrise, title: "SUN TIMES", description: "Sunrise & sunset times updated daily for your exact location.", color: "magenta" as const },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 py-20">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(hsl(170 100% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(170 100% 50%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neon-cyan/5 blur-[120px]" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-neon-cyan" />
            <span className="font-display text-xs font-bold tracking-[0.3em] text-neon-cyan text-glow-cyan">
              NEONTIME
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-black text-foreground mb-4 leading-tight">
            YOUR WRIST.
            <br />
            <span className="text-primary text-glow-cyan">SUPERCHARGED.</span>
          </h1>

          <p className="text-muted-foreground font-body text-lg md:text-xl max-w-md mb-8">
            The ultimate watch face with weather, traffic, lunar & solar data — all in stunning neon.
          </p>

          {/* Watch Face */}
          <div className="mb-10">
            <WatchFace />
          </div>

          {/* CTA */}
          <Button variant="neon" size="lg" className="mb-3">
            SUBSCRIBE — $9.99/mo
          </Button>
          <p className="text-xs text-muted-foreground font-body">
            Compatible with Wear OS & watchOS • Cancel anytime
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="relative px-4 py-20 max-w-4xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl font-black text-center text-foreground mb-3">
          EVERYTHING ON YOUR <span className="text-neon-magenta text-glow-magenta">WRIST</span>
        </h2>
        <p className="text-center text-muted-foreground font-body mb-12 max-w-md mx-auto">
          Six data modules. One glance. Zero distractions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="relative px-4 py-20 flex flex-col items-center">
        <div className="relative p-8 rounded-2xl neon-border bg-card max-w-sm w-full text-center">
          <span className="font-display text-xs font-bold tracking-[0.2em] text-neon-green text-glow-green">
            PREMIUM
          </span>
          <div className="flex items-baseline justify-center gap-1 my-4">
            <span className="text-5xl font-display font-black text-primary text-glow-cyan">$9.99</span>
            <span className="text-muted-foreground font-body text-sm">/mo</span>
          </div>
          <ul className="space-y-2 mb-6 text-sm font-body text-muted-foreground">
            {["All watch face modules", "Real-time weather & traffic", "Lunar & solar tracking", "Unlimited customization", "Priority support"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <AlertTriangle className="w-3 h-3 text-neon-cyan" />
                {item}
              </li>
            ))}
          </ul>
          <Button variant="neon" className="w-full">GET NEONTIME</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-border">
        <span className="font-display text-xs text-muted-foreground tracking-widest">
          NEONTIME © {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
};

export default Index;
