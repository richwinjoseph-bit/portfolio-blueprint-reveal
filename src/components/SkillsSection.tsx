import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  "Graphic Design",
  "Branding Design",
  "Print Design",
  "Social Media",
  "UI/UX Design",
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 md:py-44 px-6 md:px-12 lg:px-24 section-accent overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Skills */}
          <div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-display text-[clamp(2.5rem,5vw,4rem)] leading-none text-accent-foreground mb-10"
              >
                SKILLS
              </motion.h2>
            </div>
            <div className="space-y-4">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ x: -40, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group cursor-default"
                >
                  <span className="font-body text-sm md:text-base uppercase tracking-[0.15em] text-accent-foreground/80 relative inline-block">
                    {skill}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-foreground/60 transition-all duration-300 group-hover:w-full" />
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-display text-[clamp(2.5rem,5vw,4rem)] leading-none text-accent-foreground mb-10"
              >
                TOOLS
              </motion.h2>
            </div>
            <div className="flex gap-4">
              {["Ps", "Ai", "Ae"].map((tool, i) => (
                <motion.div
                  key={tool}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="w-14 h-14 rounded-lg bg-foreground flex items-center justify-center hover-lift"
                >
                  <span className="font-body text-sm font-semibold text-background">{tool}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Approach */}
          <div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-display text-[clamp(2.5rem,5vw,4rem)] leading-[1] text-accent-foreground mb-10"
              >
                APPROACH<br />TO DESIGN
              </motion.h2>
            </div>

            <motion.div
              initial={{ x: 60, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-body text-sm font-bold uppercase tracking-wider text-accent-foreground mb-2">
                  Research and Strategy
                </h3>
                <p className="font-body text-sm text-accent-foreground/70 leading-relaxed uppercase tracking-wide">
                  I start by understanding the brand's personality, market, and target audience.
                </p>
              </div>
              <div>
                <h3 className="font-body text-sm font-bold uppercase tracking-wider text-accent-foreground mb-2">
                  Collaboration
                </h3>
                <p className="font-body text-sm text-accent-foreground/70 leading-relaxed uppercase tracking-wide">
                  I work closely with cross-functional teams to ensure alignment and seamless integration.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
