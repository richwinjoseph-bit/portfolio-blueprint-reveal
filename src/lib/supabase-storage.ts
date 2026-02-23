import { supabase } from "@/integrations/supabase/client";

export interface PortfolioFile {
  id: string;
  title: string;
  description?: string;
  category: string;
  file_type: 'image' | 'video' | 'pdf';
  file_url: string;
  thumbnail_url?: string;
  file_size: number;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export const uploadFile = async (
  file: File,
  category: string,
  title: string,
  description?: string
): Promise<{ data: PortfolioFile | null; error: Error | null }> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${category}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('portfolio-files')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('portfolio-files')
      .getPublicUrl(filePath);

    const fileType = file.type.startsWith('image/') ? 'image'
      : file.type.startsWith('video/') ? 'video'
      : 'pdf';

    const { data, error: dbError } = await supabase
      .from('portfolio_files')
      .insert({
        title,
        description,
        category,
        file_type: fileType,
        file_url: publicUrl,
        file_size: file.size,
      })
      .select()
      .single();

    if (dbError) throw dbError;

    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

export const getFilesByCategory = async (
  category?: string
): Promise<{ data: PortfolioFile[] | null; error: Error | null }> => {
  try {
    let query = supabase
      .from('portfolio_files')
      .select('*')
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false });

    if (category && category !== 'All') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

export const deleteFile = async (
  fileId: string,
  fileUrl: string
): Promise<{ error: Error | null }> => {
  try {
    const filePath = fileUrl.split('/portfolio-files/')[1];

    const { error: storageError } = await supabase.storage
      .from('portfolio-files')
      .remove([filePath]);

    if (storageError) throw storageError;

    const { error: dbError } = await supabase
      .from('portfolio_files')
      .delete()
      .eq('id', fileId);

    if (dbError) throw dbError;

    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
};
