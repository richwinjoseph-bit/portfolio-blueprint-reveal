import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { getFilesByCategory, PortfolioFile, deleteFile } from "@/lib/supabase-storage";
import { FileUploadDialog } from "./FileUploadDialog";
import { Trash2, FileText } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const categories = [
  "All",
  "Posters",
  "Branding Identities",
  "Illustrations",
  "Magazine Designs",
  "Other Projects",
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [files, setFiles] = useState<PortfolioFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
    loadFiles();
  }, [activeCategory]);

  const checkAuth = async () => {
    const { data } = await supabase.auth.getSession();
    setIsAuthenticated(!!data.session);
  };

  const loadFiles = async () => {
    setLoading(true);
    const { data, error } = await getFilesByCategory(activeCategory);
    if (error) {
      toast.error("Failed to load files");
    } else {
      setFiles(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (fileId: string, fileUrl: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return;

    const { error } = await deleteFile(fileId, fileUrl);
    if (error) {
      toast.error("Failed to delete file");
    } else {
      toast.success("File deleted successfully");
      loadFiles();
    }
  };

  const filtered = files;

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
        {loading ? (
          <div className="text-center text-surface-dark-foreground/50 py-12">
            Loading projects...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-surface-dark-foreground/50 py-12">
            No projects found in this category. Upload your first project!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((file, i) => (
              <motion.div
                key={file.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
                className="group relative aspect-[4/3] rounded-lg overflow-hidden hover-lift"
              >
                {file.file_type === 'image' && (
                  <img
                    src={file.file_url}
                    alt={file.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                {file.file_type === 'video' && (
                  <video
                    src={file.file_url}
                    className="absolute inset-0 w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => e.currentTarget.pause()}
                  />
                )}
                {file.file_type === 'pdf' && (
                  <div className="absolute inset-0 bg-accent flex items-center justify-center">
                    <FileText className="w-20 h-20 text-accent-foreground/30" />
                  </div>
                )}

                {/* Overlay with title */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-display text-xl md:text-2xl text-primary-foreground mb-1">
                      {file.title}
                    </h3>
                    {file.description && (
                      <p className="font-body text-sm text-primary-foreground/80 mb-2">
                        {file.description}
                      </p>
                    )}
                    <span className="font-body text-xs uppercase tracking-[0.2em] text-primary-foreground/60">
                      {file.category}
                    </span>
                  </div>
                </div>

                {/* Delete button for authenticated users */}
                {isAuthenticated && (
                  <button
                    onClick={() => handleDelete(file.id, file.file_url)}
                    className="absolute top-3 right-3 p-2 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 z-10"
                    title="Delete file"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                {/* Click to view full size or download */}
                <a
                  href={file.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0"
                  title={`View ${file.title}`}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Upload button - only visible to authenticated users */}
      {isAuthenticated && <FileUploadDialog onUploadComplete={loadFiles} />}
    </section>
  );
};

export default ProjectsSection;
