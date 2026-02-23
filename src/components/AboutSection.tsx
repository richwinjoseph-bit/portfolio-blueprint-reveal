import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const lines = [
    "With a background in design, I bring a blend of",
    "creativity and strategic thinking to every project.",
    "My expertise in branding, logo creation, print design,",
    "and social media allows me to craft cohesive visual",
    "narratives that resonate with audiences and fulfill",
    "business goals.",
  ];

  return (
    <section ref={ref} className="relative py-32 md:py-44 px-6 md:px-12 lg:px-24 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left column */}
          <div>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "3rem" } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="h-[2px] bg-accent mb-8"
            />
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-display text-[clamp(3rem,7vw,6rem)] leading-[0.95] text-foreground"
              >
                ABOUT ME
              </motion.h2>
            </div>
            <div className="overflow-hidden mt-4">
              <motion.p
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-display text-xl md:text-2xl text-accent tracking-wider"
              >
                CREATIVE DESIGNER
              </motion.p>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-body text-lg md:text-xl text-foreground/80 mt-8 leading-relaxed"
            >
              Specializing in Branding, Print, and Digital Solutions
            </motion.p>
          </div>

          {/* Right column - line-by-line reveal */}
          <div className="pt-4 lg:pt-16">
            <div className="space-y-0">
              {lines.map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.p
                    initial={{ y: "100%", opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                    transition={{
                      duration: 0.7,
                      delay: 0.5 + i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="font-body text-base md:text-lg text-muted-foreground leading-relaxed"
                  >
                    {line}
                  </motion.p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
