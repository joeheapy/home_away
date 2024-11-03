import { createClient } from '@supabase/supabase-js';

const bucket = 'temp-home-away';

const url = process.env.SUPABASE_URL as string;
const key = process.env.SUPABASE_KEY as string;
// Create a single supabase client for interacting with your database
export const supabase = createClient(url, key);

// Upload an image to Supabase Storage and return the public URL
export const uploadImage = async (image: File) => {
  const timestamp = Date.now();
  // Generate a unique name for the image
  const newName = `${timestamp}-${image.name}`;
  // Upload the image to Supabase Storage
  const { data } = await supabase.storage
    .from(bucket)
    .upload(newName, image, {
      cacheControl: '3600',
    });
  if (!data) throw new Error('Image upload failed');
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};