/*
  # Create portfolio files storage system

  1. New Tables
    - `portfolio_files`
      - `id` (uuid, primary key)
      - `title` (text) - File/project title
      - `description` (text, nullable) - Optional description
      - `category` (text) - Category: Posters, Branding Identities, Illustrations, Magazine Designs, Other Projects
      - `file_type` (text) - Type: image, video, pdf
      - `file_url` (text) - Storage URL
      - `thumbnail_url` (text, nullable) - Thumbnail for videos/pdfs
      - `file_size` (bigint) - File size in bytes
      - `order_index` (integer, default 0) - For manual ordering
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Storage
    - Create 'portfolio-files' bucket for storing uploaded files
    
  3. Security
    - Enable RLS on `portfolio_files` table
    - Add policies for public read access
    - Add policies for authenticated insert/update/delete (for admin)
*/

-- Create the portfolio_files table
CREATE TABLE IF NOT EXISTS portfolio_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL CHECK (category IN ('Posters', 'Branding Identities', 'Illustrations', 'Magazine Designs', 'Other Projects')),
  file_type text NOT NULL CHECK (file_type IN ('image', 'video', 'pdf')),
  file_url text NOT NULL,
  thumbnail_url text,
  file_size bigint NOT NULL,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE portfolio_files ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view portfolio files
CREATE POLICY "Anyone can view portfolio files"
  ON portfolio_files
  FOR SELECT
  USING (true);

-- Policy: Authenticated users can insert files (for admin)
CREATE POLICY "Authenticated users can insert files"
  ON portfolio_files
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update files (for admin)
CREATE POLICY "Authenticated users can update files"
  ON portfolio_files
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can delete files (for admin)
CREATE POLICY "Authenticated users can delete files"
  ON portfolio_files
  FOR DELETE
  TO authenticated
  USING (true);

-- Create index for faster category queries
CREATE INDEX IF NOT EXISTS idx_portfolio_files_category ON portfolio_files(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_files_order ON portfolio_files(order_index);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_portfolio_files_updated_at
  BEFORE UPDATE ON portfolio_files
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();