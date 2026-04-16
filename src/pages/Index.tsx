import { useState } from "react";
import { Cloud, Navigation, Moon, Sunrise, AlertTriangle, Zap, HelpCircle, Compass, Timer } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import WatchFace from "@/components/WatchFace";
import WatchFaceSquare from "@/components/WatchFaceSquare";
import WatchFaceRect from "@/components/WatchFaceRect";
import WatchFaceMinimal from "@/components/WatchFaceMinimal";
import FeatureCard from "@/components/FeatureCard";
import ThemePicker from "@/components/ThemePicker";
import ShapePicker, { type WatchShape } from "@/components/ShapePicker";
import { NeonTheme, themeMap } from "@/lib/themes";

const features = [
  { icon: Cloud, title: "WEATHER ALERTS", description: "Real-time storm warnings, temperature, humidity & wind data at a glance.", color: "cyan" as const },
  { icon: Navigation, title: "TRAFFIC ALERTS", description: "Live commute times and route alerts. Never get stuck in traffic again.", color: "green" as const },
  { icon: Moon, title: "LUNAR TRACKER", description: "Moon phase, moonrise & moonset times. Perfect for outdoor enthusiasts.", color: "orange" as const },
  { icon: Sunrise, title: "SUN TIMES", description: "Sunrise & sunset times updated daily for your exact location.", color: "magenta" as const },
  { icon: Compass, title: "COMPASS", description: "Digital compass with bearing display. Always know your heading, even off-grid.", color: "cyan" as const },
  { icon: Timer, title: "CHRONOGRAPH", description: "Precision stopwatch with lap times. Track your runs, swims & workouts to the millisecond.", color: "green" as const },
];

const WatchFaceVariant = ({ shape, theme }: { shape: WatchShape; theme: NeonTheme }) => {
  switch (shape) {
    case "square":
      return <WatchFaceSquare theme={theme} />;
    case "rect":
      return <WatchFaceRect theme={theme} />;
    case "minimal":
      return <WatchFaceMinimal theme={theme} />;
    default:
      return <WatchFace theme={theme} />;
  }
};

const Index = () => {
  const [activeTheme, setActiveTheme] = useState<NeonTheme>("cyan");
  const [activeShape, setActiveShape] = useState<WatchShape>("round");
  const t = themeMap[activeTheme];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 py-20">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03] transition-all duration-500"
          style={{
            backgroundImage: `linear-gradient(hsl(${t.hsl}) 1px, transparent 1px), linear-gradient(90deg, hsl(${t.hsl}) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] transition-all duration-700"
          style={{ backgroundColor: `hsl(${t.hsl} / 0.06)` }}
        />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-6">
            <Zap className={`w-5 h-5 ${t.primaryText} transition-colors duration-500`} />
            <span className={`font-display text-xs font-bold tracking-[0.3em] ${t.primaryText} ${t.primaryGlow} transition-colors duration-500`}>
              NEONTIME
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-black text-foreground mb-4 leading-tight">
            YOUR WRIST.
            <br />
            <span className={`${t.primaryText} ${t.primaryGlow} transition-colors duration-500`}>SUPERCHARGED.</span>
          </h1>

          <p className="text-muted-foreground font-body text-lg md:text-xl max-w-md mb-8">
            The ultimate watch face with weather, traffic, lunar & solar data — all in stunning neon.
          </p>

          {/* Watch Face */}
          <div className="mb-6 flex items-center justify-center min-h-[340px]">
            <WatchFaceVariant shape={activeShape} theme={activeTheme} />
          </div>

          {/* Shape Picker */}
          <div className="mb-4">
            <ShapePicker activeShape={activeShape} onShapeChange={setActiveShape} theme={activeTheme} />
          </div>

          {/* Theme Picker */}
          <div className="mb-8">
            <ThemePicker activeTheme={activeTheme} onThemeChange={setActiveTheme} />
          </div>

          {/* CTA */}
          <Button variant="neon" size="lg" className="mb-3" asChild>
            <a href="https://cash.app/$fishkillerzstaking" target="_blank" rel="noopener noreferrer">
              SUBSCRIBE — $9.99/mo
            </a>
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
          Eight data modules. One glance. Zero distractions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="relative px-4 py-20 max-w-5xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl font-black text-center text-foreground mb-3">
          4 STYLES. <span className={`${t.primaryText} ${t.primaryGlow} transition-colors duration-500`}>ONE SUB.</span>
        </h2>
        <p className="text-center text-muted-foreground font-body mb-12 max-w-md mx-auto">
          Pick the watch face that matches your vibe. Switch anytime.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
          {([
            { shape: "round" as const, label: "CLASSIC" },
            { shape: "square" as const, label: "SQUARE" },
            { shape: "rect" as const, label: "BAND" },
            { shape: "minimal" as const, label: "MINIMAL" },
          ]).map(({ shape, label }) => (
            <div key={shape} className="flex flex-col items-center gap-3">
              <div className="transform scale-[0.55] origin-center">
                <WatchFaceVariant shape={shape} theme={activeTheme} />
              </div>
              <span className={`font-display text-xs font-bold tracking-[0.15em] ${
                activeShape === shape ? `${t.primaryText} ${t.primaryGlow}` : "text-muted-foreground"
              } transition-colors duration-300`}>
                {label}
              </span>
            </div>
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
            <span className={`text-5xl font-display font-black ${t.primaryText} ${t.primaryGlow} transition-colors duration-500`}>$9.99</span>
            <span className="text-muted-foreground font-body text-sm">/mo</span>
          </div>
          <ul className="space-y-2 mb-6 text-sm font-body text-muted-foreground">
            {["All 4 watch face styles", "Real-time weather & traffic", "Lunar & solar tracking", "Compass & chronograph", "6 neon color themes", "Priority support"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <AlertTriangle className={`w-3 h-3 ${t.primaryText} transition-colors duration-500`} />
                {item}
              </li>
            ))}
          </ul>
          <Button variant="neon" className="w-full" asChild>
            <a href="https://cash.app/$fishkillerzstaking" target="_blank" rel="noopener noreferrer">GET NEONTIME</a>
          </Button>

          {/* Payment info */}
          <div className="mt-5 pt-4 border-t border-border space-y-2">
            <p className="text-[11px] font-display font-bold tracking-wider text-neon-green text-glow-green">
              HOW IT WORKS
            </p>
            <ol className="space-y-1.5 text-xs font-body text-muted-foreground text-left list-decimal list-inside">
              <li>Tap <span className="text-foreground font-semibold">"Get NeonTime"</span> to pay <span className="text-foreground font-semibold">$9.99</span> via Cash App</li>
              <li>Send to <span className={`font-semibold ${t.primaryText}`}>$fishkillerzstaking</span></li>
              <li>Include your <span className="text-foreground font-semibold">email</span> in the payment note</li>
              <li>Receive your watch face download link within <span className="text-foreground font-semibold">24 hours</span></li>
            </ol>
            <p className="text-[10px] text-muted-foreground font-body pt-1">
              Questions? Message us on Cash App. Subscription renews monthly — cancel anytime by messaging us.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative px-4 py-20 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-3">
          <HelpCircle className={`w-5 h-5 ${t.primaryText} transition-colors duration-500`} />
          <h2 className="font-display text-2xl md:text-3xl font-black text-center text-foreground">
            FAQ
          </h2>
        </div>
        <p className="text-center text-muted-foreground font-body mb-10 max-w-md mx-auto">
          Got questions? We've got answers.
        </p>

        <Accordion type="single" collapsible className="space-y-2">
          {[
            {
              q: "Which watches are compatible?",
              a: "NeonTime works with Wear OS (Samsung Galaxy Watch, Google Pixel Watch, etc.) and watchOS (Apple Watch Series 4 and newer). We're constantly adding support for more devices.",
            },
            {
              q: "How do I install the watch face?",
              a: "After payment, you'll receive a download link via email within 24 hours. Follow the included instructions to install on your specific watch model — it takes under 2 minutes.",
            },
            {
              q: "Do weather and traffic alerts update in real-time?",
              a: "Yes! Weather data refreshes every 15 minutes and traffic alerts update based on your commute schedule. All data is pulled from trusted sources and displayed right on your wrist.",
            },
            {
              q: "Can I customize colors and styles after purchase?",
              a: "Absolutely. Your subscription includes all 4 watch face styles (Classic, Square, Band, Minimal) and all 6 neon color themes. Switch between them anytime from the companion app.",
            },
            {
              q: "How does the $9.99/mo subscription work?",
              a: "Payment is via Cash App to $fishkillerzstaking. Include your email in the payment note. Your subscription renews monthly — to cancel, simply message us on Cash App anytime.",
            },
            {
              q: "What lunar and solar data is shown?",
              a: "You get real-time moon phase (new, waxing, full, waning), moonrise/moonset times, plus daily sunrise and sunset times — all calculated for your exact GPS location.",
            },
            {
              q: "Is there a free trial?",
              a: "We don't currently offer a free trial, but you can cancel anytime after your first month with no questions asked. We're confident you'll love NeonTime.",
            },
          ].map(({ q, a }, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border border-border rounded-lg px-4 overflow-hidden"
            >
              <AccordionTrigger className="font-display text-sm font-bold text-foreground hover:no-underline py-4">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-sm font-body text-muted-foreground pb-4">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
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
