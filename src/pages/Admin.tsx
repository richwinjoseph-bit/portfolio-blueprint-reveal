import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Trash2, Upload, ExternalLink } from "lucide-react";

const PROJECT_SLUGS = [
  { slug: "brand-identity-system", label: "Brand Identity System" },
  { slug: "event-poster-series", label: "Event Poster Series" },
  { slug: "digital-illustration", label: "Digital Illustration" },
  { slug: "magazine-layout", label: "Magazine Layout" },
  { slug: "logo-collection", label: "Logo Collection" },
  { slug: "concert-posters", label: "Concert Posters" },
  { slug: "character-design", label: "Character Design" },
  { slug: "editorial-spread", label: "Editorial Spread" },
  { slug: "packaging-design", label: "Packaging Design" },
];

type MediaItem = {
  id: string;
  project_slug: string;
  file_name: string;
  file_url: string;
  file_type: string;
  thumbnail_url: string | null;
  created_at: string;
};

const Admin = () => {
  const [selectedProject, setSelectedProject] = useState(PROJECT_SLUGS[0].slug);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const fetchMedia = useCallback(async () => {
    const { data } = await supabase
      .from("project_media")
      .select("*")
      .eq("project_slug", selectedProject)
      .order("created_at", { ascending: false });
    setMedia((data as MediaItem[]) || []);
  }, [selectedProject]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate("/admin-login");
    });
  }, [navigate]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const getFileType = (file: File): "image" | "video" | "pdf" | null => {
    if (file.type.startsWith("image/")) return "image";
    if (file.type.startsWith("video/")) return "video";
    if (file.type === "application/pdf") return "pdf";
    return null;
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);

    for (const file of Array.from(files)) {
      const fileType = getFileType(file);
      if (!fileType) continue;

      const path = `${selectedProject}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("project-media")
        .upload(path, file);

      if (uploadError) {
        console.error("Upload error:", uploadError);
        continue;
      }

      const { data: urlData } = supabase.storage
        .from("project-media")
        .getPublicUrl(path);

      await supabase.from("project_media").insert({
        project_slug: selectedProject,
        file_name: file.name,
        file_url: urlData.publicUrl,
        file_type: fileType,
      });
    }

    setUploading(false);
    fetchMedia();
    e.target.value = "";
  };

  const handleDelete = async (item: MediaItem) => {
    const filePath = item.file_url.split("/project-media/")[1];
    if (filePath) {
      await supabase.storage.from("project-media").remove([filePath]);
    }
    await supabase.from("project_media").delete().eq("id", item.id);
    fetchMedia();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen section-dark text-surface-dark-foreground px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-display text-4xl">MEDIA MANAGER</h1>
          <div className="flex gap-3">
            <button onClick={() => navigate("/")} className="font-body text-xs uppercase tracking-widest border border-surface-dark-foreground/20 px-4 py-2 rounded-full hover:border-surface-dark-foreground/50 transition-colors">
              View Site
            </button>
            <button onClick={handleLogout} className="font-body text-xs uppercase tracking-widest border border-surface-dark-foreground/20 px-4 py-2 rounded-full hover:border-destructive transition-colors">
              Logout
            </button>
          </div>
        </div>

        {/* Project selector */}
        <div className="flex flex-wrap gap-2 mb-8">
          {PROJECT_SLUGS.map((p) => (
            <button
              key={p.slug}
              onClick={() => setSelectedProject(p.slug)}
              className={`font-body text-xs uppercase tracking-[0.12em] px-4 py-2 rounded-full border transition-all duration-300 ${
                selectedProject === p.slug
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-transparent text-surface-dark-foreground/50 border-surface-dark-foreground/20 hover:border-surface-dark-foreground/50"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Upload area */}
        <label className="block border-2 border-dashed border-surface-dark-foreground/20 rounded-xl p-10 text-center cursor-pointer hover:border-accent transition-colors mb-10">
          <Upload className="mx-auto mb-3 opacity-40" size={32} />
          <span className="font-body text-sm text-surface-dark-foreground/50">
            {uploading ? "Uploading..." : "Click to upload images, videos, or PDFs"}
          </span>
          <input
            type="file"
            multiple
            accept="image/*,video/*,application/pdf"
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>

        {/* Media grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {media.map((item) => (
            <div key={item.id} className="group relative rounded-lg overflow-hidden border border-surface-dark-foreground/10 bg-surface-dark-foreground/5">
              {item.file_type === "image" && (
                <img src={item.file_url} alt={item.file_name} className="w-full aspect-square object-cover" />
              )}
              {item.file_type === "video" && (
                <video src={item.file_url} className="w-full aspect-square object-cover" muted />
              )}
              {item.file_type === "pdf" && (
                <div className="w-full aspect-square flex flex-col items-center justify-center bg-accent/10 p-4">
                  <span className="text-display text-2xl text-accent mb-2">PDF</span>
                  <span className="font-body text-xs text-surface-dark-foreground/60 text-center truncate w-full">{item.file_name}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                {item.file_type === "pdf" && (
                  <a href={item.file_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
                    <ExternalLink size={16} />
                  </a>
                )}
                <button onClick={() => handleDelete(item)} className="p-2 rounded-full border border-destructive text-destructive hover:bg-destructive/10">
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="p-2">
                <span className="font-body text-[10px] text-surface-dark-foreground/40 uppercase tracking-wider">{item.file_type}</span>
              </div>
            </div>
          ))}
        </div>

        {media.length === 0 && (
          <p className="font-body text-sm text-surface-dark-foreground/30 text-center py-12">No media uploaded for this project yet.</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
