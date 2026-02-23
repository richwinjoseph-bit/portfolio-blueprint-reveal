import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const letterVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.6 + i * 0.04,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
} as const;

const HeroSection = () => {
  const name = "RICHWIN JOSEPH";
  const subtitle = "CREATIVE DESIGNER";
  const stagger = "I AM A DESIGNER";

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center section-dark overflow-hidden px-6">
      {/* Top nav bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-6 md:px-12"
      >
        <span className="font-body text-sm tracking-[0.2em] uppercase text-surface-dark-foreground/60">
          Richwin Joseph
        </span>
        <span className="font-body text-sm tracking-[0.2em] text-surface-dark-foreground/60">
          2026
        </span>
      </motion.div>

      {/* Main title */}
      <div className="text-center">
        <div className="overflow-hidden mb-2">
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-sm md:text-base tracking-[0.3em] uppercase text-surface-dark-foreground/50 mb-6"
          >
            Portfolio 2026
          </motion.p>
        </div>

        <div className="overflow-hidden">
          <h1 className="text-display text-[clamp(3rem,12vw,10rem)] leading-[0.9] tracking-tight text-surface-dark-foreground">
            {name.split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
                style={{ marginRight: char === " " ? "0.3em" : "0" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>
        </div>

        <div className="overflow-hidden mt-4">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-display text-[clamp(1.2rem,3vw,2.5rem)] tracking-[0.15em] text-accent">
              {subtitle}
            </p>
          </motion.div>
        </div>

        {/* Stagger text */}
        <div className="mt-12 overflow-hidden">
          <div className="flex items-center justify-center gap-[0.3em]">
            {stagger.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 1.6 + i * 0.05,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-body text-xs md:text-sm tracking-[0.25em] uppercase text-surface-dark-foreground/40 inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="font-body text-[10px] tracking-[0.3em] uppercase text-surface-dark-foreground/30">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 text-surface-dark-foreground/30 scroll-indicator" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
