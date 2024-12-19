import { supabase } from "@/integrations/supabase/client";

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: 'link' | 'youtube';
}

export const validateYouTubeUrl = (url: string) => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
  return youtubeRegex.test(url);
};

export const fetchUserResources = async (userId: string) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId)
    .in('status', ['link', 'youtube']);

  if (error) throw error;

  if (!data) return [];

  return data.map(item => ({
    id: item.id,
    title: item.title,
    url: item.description || '',
    type: item.status as 'link' | 'youtube'
  }));
};

export const addResource = async (userId: string, title: string, url: string, type: 'link' | 'youtube') => {
  const { data, error } = await supabase
    .from('tasks')
    .insert({
      user_id: userId,
      title,
      description: url,
      status: type
    })
    .select()
    .single();

  if (error) throw error;
  if (!data) throw new Error('No data returned from insert');

  return {
    id: data.id,
    title: data.title,
    url: data.description || '',
    type: data.status as 'link' | 'youtube'
  };
};

export const deleteResource = async (id: string) => {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);

  if (error) throw error;
};