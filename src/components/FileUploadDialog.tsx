import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Loader2 } from "lucide-react";
import { uploadFile } from "@/lib/supabase-storage";
import { toast } from "sonner";

const categories = [
  "Posters",
  "Branding Identities",
  "Illustrations",
  "Magazine Designs",
  "Other Projects",
];

export const FileUploadDialog = ({ onUploadComplete }: { onUploadComplete: () => void }) => {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !title || !category) {
      toast.error("Please fill in all required fields");
      return;
    }

    setUploading(true);

    const { data, error } = await uploadFile(file, category, title, description);

    if (error) {
      toast.error(`Upload failed: ${error.message}`);
    } else {
      toast.success("File uploaded successfully!");
      setOpen(false);
      setTitle("");
      setDescription("");
      setCategory("");
      setFile(null);
      onUploadComplete();
    }

    setUploading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const validTypes = [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp',
        'video/mp4', 'video/webm', 'video/quicktime',
        'application/pdf'
      ];

      if (!validTypes.includes(selectedFile.type)) {
        toast.error("Invalid file type. Please upload images, videos, or PDFs only.");
        return;
      }

      if (selectedFile.size > 52428800) {
        toast.error("File size must be less than 50MB");
        return;
      }

      setFile(selectedFile);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-8 right-8 z-50 h-14 w-14 rounded-full shadow-lg">
          <Upload className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Portfolio File</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file">File</Label>
            <Input
              id="file"
              type="file"
              accept="image/*,video/*,.pdf"
              onChange={handleFileChange}
              required
            />
            <p className="text-xs text-muted-foreground">
              Accepted: Images, Videos (MP4, WebM, MOV), PDFs (max 50MB)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Project title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the project"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={uploading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={uploading}>
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Upload"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
