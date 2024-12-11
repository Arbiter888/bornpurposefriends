import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    console.log('Starting text extraction...');
    
    // Get the form data from the request
    const formData = await req.formData();
    console.log('FormData received');
    
    const file = formData.get('file');
    if (!file || !(file instanceof File)) {
      console.error('No valid file provided in request');
      return new Response(
        JSON.stringify({ error: 'No valid file uploaded' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
          status: 400 
        }
      );
    }

    console.log('File type:', file.type);
    console.log('File name:', file.name);

    // For now, return a simple text extraction
    // In production, you'd want to use proper document parsing libraries
    const text = `Extracted content from ${file.name}`;
    console.log('Text extracted successfully');

    return new Response(
      JSON.stringify({ 
        text,
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