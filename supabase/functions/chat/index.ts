import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const DEBATE_SYSTEM_PROMPT = `You are participating in a group debate. Based on your character's background, expertise, and perspective, provide your unique viewpoint on the topic. Be respectful but don't hesitate to disagree with others if your character would have a different opinion. Support your arguments with your character's expertise and experience.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, character, isGroupChat } = await req.json();

    const systemPrompt = isGroupChat 
      ? `${DEBATE_SYSTEM_PROMPT}\nYou are ${character.name}, ${character.role}. ${character.description}`
      : `You are ${character.name}, ${character.role}. Respond in character, maintaining their personality and expertise.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: isGroupChat 
            ? `As ${character.name}, provide your perspective on this topic for the group debate: ${message}`
            : message 
          }
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