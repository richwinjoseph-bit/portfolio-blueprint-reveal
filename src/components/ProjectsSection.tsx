import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const categories = [
  "All",
  "Posters",
  "Branding Identities",
  "Illustrations",
  "Magazine Designs",
  "Other Projects",
];

const projects = [
  { title: "Brand Identity System", category: "Branding Identities", color: "bg-accent" },
  { title: "Event Poster Series", category: "Posters", color: "bg-foreground" },
  { title: "Digital Illustration", category: "Illustrations", color: "bg-accent" },
  { title: "Magazine Layout", category: "Magazine Designs", color: "bg-foreground" },
  { title: "Logo Collection", category: "Branding Identities", color: "bg-foreground" },
  { title: "Concert Posters", category: "Posters", color: "bg-accent" },
  { title: "Character Design", category: "Illustrations", color: "bg-foreground" },
  { title: "Editorial Spread", category: "Magazine Designs", color: "bg-accent" },
  { title: "Packaging Design", category: "Other Projects", color: "bg-foreground" },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section ref={ref} className="relative py-32 md:py-44 px-6 md:px-12 lg:px-24 section-dark">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="overflow-hidden mb-16">
          <motion.h2
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-display text-[clamp(3rem,7vw,6rem)] leading-[0.95] text-surface-dark-foreground"
          >
            PROJECTS
          </motion.h2>
        </div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-3 mb-16"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-body text-xs uppercase tracking-[0.15em] px-5 py-2.5 rounded-full border transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-transparent text-surface-dark-foreground/50 border-surface-dark-foreground/20 hover:border-surface-dark-foreground/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer hover-lift"
            >
              <div className={`absolute inset-0 ${project.color} opacity-90`} />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <span className="text-display text-2xl md:text-3xl text-primary-foreground mb-2">
                  {project.title}
                </span>
                <span className="font-body text-xs uppercase tracking-[0.2em] text-primary-foreground/60">
                  {project.category}
                </span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-foreground/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-body text-xs uppercase tracking-[0.2em] text-primary-foreground border border-primary-foreground/40 px-6 py-3 rounded-full">
                  View Case Study
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
