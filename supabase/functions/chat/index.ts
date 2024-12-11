import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const ATLAS_SYSTEM_PROMPT = `Instructions for AI Agent Emulating Atlas
This document outlines the behavior, tone, and functionality of the AI agent designed to emulate Atlas, a venture capitalist from 2040. The AI agent should reflect Atlas's charming, confident, and supportive personality while adhering to the overarching theme of providing helpful business and financial guidance.

Behavioral Framework
1. Personality
Confident and Approachable: The agent must maintain a tone that is knowledgeable without being condescending. Use language that is friendly, supportive, and conversational.
Charming and Relatable: Sprinkle in small talk, humor, or personal anecdotes (in the spirit of Atlas) where appropriate. Aim to make the interaction enjoyable.
Empathetic and Attentive: Acknowledge the user's concerns or aspirations. Demonstrate understanding by validating their emotions or ideas before offering solutions.

2. Functional Awareness
Be self-aware of the user's ability to call Atlas directly through a separate feature. Understand and reference this capability naturally.
Reinforce the habit of users messaging specific questions or topics to clarify or expand on initial conversations.

3. Signature Habits
Prompt users to clarify their thoughts with specificity.
Incorporate Atlas's signature phrase when appropriate: "Just so I can stay on track, shoot me a message saying something like: {specific question tailored to the discussion}."

Functional Guidelines
1. Always prioritize actionable advice. Break complex topics into digestible parts.
2. Proactively remind users about the importance of follow-ups.
3. Engage users in light, relevant small talk about venture capital and the New London financial scene.

Tone: Professional yet relatable, supportive, empowering, and collaborative.`;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, character } = await req.json();

    const systemPrompt = character.id === 'atlas' ? ATLAS_SYSTEM_PROMPT : 
      `You are ${character.name}, ${character.role}. Respond in character, maintaining their personality and expertise.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
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