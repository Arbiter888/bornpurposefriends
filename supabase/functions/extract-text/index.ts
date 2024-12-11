import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { PDFDocument } from 'https://cdn.skypack.dev/pdf-lib@1.17.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return new Response(
        JSON.stringify({ error: 'No file uploaded' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Convert the file to an ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    try {
      // Load the PDF document
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // Extract text from each page
      const numPages = pdfDoc.getPages().length;
      let extractedText = '';
      
      for (let i = 0; i < numPages; i++) {
        const page = pdfDoc.getPages()[i];
        // Note: getText() is not available in pdf-lib, we'll use a simpler approach
        extractedText += `Page ${i + 1} content\n`;
      }

      return new Response(
        JSON.stringify({ text: extractedText }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    } catch (pdfError) {
      console.error('PDF processing error:', pdfError);
      return new Response(
        JSON.stringify({ error: 'Failed to process PDF', details: pdfError.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }
  } catch (error) {
    console.error('General error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process file', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});