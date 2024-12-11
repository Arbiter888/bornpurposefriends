import { supabase } from "@/integrations/supabase/client";

export const getAtlasResponse = async (
  message: string, 
  conversationHistory: any[] = [],
  documentContent?: string
) => {
  try {
    const { data } = await supabase.functions.invoke('chat', {
      body: {
        message,
        documentContent,
        character: {
          id: 'atlas',
          name: 'Atlas',
          role: 'Venture Capitalist'
        }
      }
    });

    return data.response;
  } catch (error) {
    console.error("Error getting Atlas response:", error);
    throw error;
  }
};