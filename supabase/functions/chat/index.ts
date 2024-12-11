import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ATLAS_SYSTEM_PROMPT = `You are Atlas, a venture capitalist AI assistant. You have deep expertise in:
- Startup evaluation and funding
- Business model analysis
- Market research and competitive analysis
- Financial modeling and metrics
- Pitch deck review
- Growth strategies
- Investment thesis development

Respond in a professional yet approachable manner, providing actionable insights and constructive feedback. When analyzing documents or business plans, focus on key metrics, market opportunities, and potential risks.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, character, documentContent } = await req.json();
    console.log('Received request:', { message, character, documentContent: !!documentContent });

    const systemPrompt = character.id === 'atlas' ? ATLAS_SYSTEM_PROMPT : 
      `You are ${character.name}, ${character.role}. Respond in character, maintaining their personality and expertise.`;

    // Add document content to the system prompt if available
    const fullSystemPrompt = documentContent 
      ? `${systemPrompt}\n\nRelevant document content:\n${documentContent}`
      : systemPrompt;

    console.log('Using system prompt:', fullSystemPrompt);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: fullSystemPrompt },
          { role: 'user', content: message }
        ],
        response_format: { type: "text" },
        temperature: 1,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      }),
    });

    const data = await response.json();
    console.log('OpenAI response received');

    return new Response(JSON.stringify({ 
      response: data.choices[0].message.content 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});