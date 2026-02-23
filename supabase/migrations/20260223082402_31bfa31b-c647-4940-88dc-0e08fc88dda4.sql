
-- Create storage bucket for project media (public read)
INSERT INTO storage.buckets (id, name, public) VALUES ('project-media', 'project-media', true);

-- Allow public read access
CREATE POLICY "Public can view project media"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-media');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'project-media');

-- Allow authenticated users to delete
CREATE POLICY "Authenticated users can delete media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'project-media');

-- Table to track uploaded media per project
CREATE TABLE public.project_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_slug TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL CHECK (file_type IN ('image', 'video', 'pdf')),
  thumbnail_url TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.project_media ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Anyone can view project media"
ON public.project_media FOR SELECT
USING (true);

-- Auth users can manage
CREATE POLICY "Auth users can insert media"
ON public.project_media FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Auth users can update media"
ON public.project_media FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Auth users can delete media"
ON public.project_media FOR DELETE
TO authenticated
USING (true);
