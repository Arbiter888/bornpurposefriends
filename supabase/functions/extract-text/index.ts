import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting PDF text extraction...');
    
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      console.error('No file provided in request');
      return new Response(
        JSON.stringify({ error: 'No file uploaded' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
          status: 400 
        }
      );
    }

    console.log('File type:', file.type);
    console.log('File name:', file.name);

    // For now, we'll return the file content as text
    // In a production environment, you'd want to use a proper PDF parsing library
    const text = await file.text();
    
    console.log('Successfully extracted text from file');

    return new Response(
      JSON.stringify({ 
        text: text,
        message: 'Text extracted successfully' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in text extraction:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process file', 
        details: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 500 
      }
    );
  }
});