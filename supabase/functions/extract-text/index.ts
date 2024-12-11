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
    console.log('FormData received:', formData);
    
    const file = formData.get('file');
    console.log('File object:', file);

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

    // For now, we'll return a placeholder text for documents
    // In a production environment, you'd want to use proper document parsing libraries
    const text = `Content extracted from ${file.name}. This is a placeholder text while we implement proper document parsing.`;
    
    console.log('Successfully created placeholder text for document');

    return new Response(
      JSON.stringify({ 
        text: text,
        message: 'Text placeholder created successfully' 
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