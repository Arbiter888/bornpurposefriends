import { supabase } from "@/integrations/supabase/client";

const formatSearchQuery = (text: string): string => {
  // Remove special characters and split into words
  const words = text
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 0);
  
  // Join words with & for AND operation in tsquery
  return words.join(' & ');
};

export const searchKnowledgeBase = async (message: string) => {
  const formattedQuery = formatSearchQuery(message);
  
  if (!formattedQuery) {
    return null;
  }

  const { data: documents, error } = await supabase
    .from('documents')
    .select('content')
    .textSearch('content', formattedQuery)
    .limit(1);

  if (error) {
    console.error('Error searching knowledge base:', error);
    return null;
  }

  return documents?.[0]?.content || null;
};