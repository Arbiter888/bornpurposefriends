import { supabase } from "@/integrations/supabase/client";

export const searchKnowledgeBase = async (message: string) => {
  const { data: documents, error } = await supabase
    .from('documents')
    .select('content')
    .textSearch('content', message, {
      config: 'english'
    })
    .limit(1);

  if (error) {
    console.error('Error searching knowledge base:', error);
    return null;
  }

  return documents?.[0]?.content || null;
};