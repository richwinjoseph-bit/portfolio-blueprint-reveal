import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Play } from "lucide-react";

const categories = [
  "All",
  "Posters",
  "Branding Identities",
  "Illustrations",
  "Magazine Designs",
  "Other Projects",
];

const projects = [
  { title: "Brand Identity System", category: "Branding Identities", slug: "brand-identity-system", color: "bg-accent" },
  { title: "Event Poster Series", category: "Posters", slug: "event-poster-series", color: "bg-foreground" },
  { title: "Digital Illustration", category: "Illustrations", slug: "digital-illustration", color: "bg-accent" },
  { title: "Magazine Layout", category: "Magazine Designs", slug: "magazine-layout", color: "bg-foreground" },
  { title: "Logo Collection", category: "Branding Identities", slug: "logo-collection", color: "bg-foreground" },
  { title: "Concert Posters", category: "Posters", slug: "concert-posters", color: "bg-accent" },
  { title: "Character Design", category: "Illustrations", slug: "character-design", color: "bg-foreground" },
  { title: "Editorial Spread", category: "Magazine Designs", slug: "editorial-spread", color: "bg-accent" },
  { title: "Packaging Design", category: "Other Projects", slug: "packaging-design", color: "bg-foreground" },
];

type MediaItem = {
  id: string;
  project_slug: string;
  file_name: string;
  file_url: string;
  file_type: string;
};

const ProjectCard = ({ project, media, index, isInView }: { project: typeof projects[0]; media: MediaItem[]; index: number; isInView: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const thumbnail = media.find((m) => m.file_type === "image");
  const video = media.find((m) => m.file_type === "video");
  const pdfs = media.filter((m) => m.file_type === "pdf");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4 + index * 0.08 }}
      className="group relative rounded-lg overflow-hidden cursor-pointer hover-lift"
    >
      {/* Main card visual */}
      <div className="relative aspect-[4/3]">
        {thumbnail ? (
          <img src={thumbnail.file_url} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
        ) : video ? (
          <video
            ref={videoRef}
            src={video.file_url}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
            onMouseEnter={() => videoRef.current?.play()}
            onMouseLeave={() => { videoRef.current?.pause(); if (videoRef.current) videoRef.current.currentTime = 0; }}
          />
        ) : (
          <div className={`absolute inset-0 ${project.color} opacity-90`} />
        )}

        {/* Title overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-foreground/30">
          <span className="text-display text-2xl md:text-3xl text-primary-foreground mb-2">
            {project.title}
          </span>
          <span className="font-body text-xs uppercase tracking-[0.2em] text-primary-foreground/60">
            {project.category}
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-foreground/90 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {video && (
            <span className="font-body text-xs uppercase tracking-[0.2em] text-primary-foreground/60 flex items-center gap-1">
              <Play size={12} /> Video available
            </span>
          )}
          <span className="font-body text-xs uppercase tracking-[0.2em] text-primary-foreground border border-primary-foreground/40 px-6 py-3 rounded-full">
            View Case Study
          </span>
        </div>
      </div>

      {/* PDF thumbnails row */}
      {pdfs.length > 0 && (
        <div className="bg-surface-dark-foreground/5 border-t border-surface-dark-foreground/10 p-3 flex flex-wrap gap-2">
          {pdfs.map((pdf) => (
            <a
              key={pdf.id}
              href={pdf.file_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 bg-accent/10 hover:bg-accent/20 text-accent px-3 py-1.5 rounded-md transition-colors"
            >
              <FileText size={14} />
              <span className="font-body text-[11px] truncate max-w-[100px]">{pdf.file_name}</span>
            </a>
          ))}
        </div>
      )}
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [allMedia, setAllMedia] = useState<MediaItem[]>([]);

  useEffect(() => {
    const fetchMedia = async () => {
      const { data } = await supabase
        .from("project_media")
        .select("id, project_slug, file_name, file_url, file_type")
        .order("display_order");
      setAllMedia((data as MediaItem[]) || []);
    };
    fetchMedia();
  }, []);

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section ref={ref} className="relative py-32 md:py-44 px-6 md:px-12 lg:px-24 section-dark">
      <div className="max-w-7xl mx-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              media={allMedia.filter((m) => m.project_slug === project.slug)}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
