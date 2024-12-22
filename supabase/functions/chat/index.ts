import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GROUP_STUDY_SYSTEM_PROMPT = `You are participating in a concise, natural Bible study discussion. As a spiritual mentor, engage thoughtfully while maintaining these key guidelines:

1. Always include the full text of any scripture you reference
2. Keep responses focused and brief (2-3 sentences max before the scripture)
3. If referencing a scripture another participant mentioned, acknowledge them and add new insight
4. Share different but related scriptures that add new perspectives
5. Only Pastor Andrew should ask one follow-up question to the user
6. Maintain your unique character voice and expertise
7. Format scripture references as: "Book Chapter:Verse tells us 'actual scripture text'"

Remember to:
- Keep responses concise and natural
- Focus on practical application
- Build naturally on others' insights
- If you're Pastor Andrew, end with ONE thought-provoking question`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, character, isGroupChat, knowledgeBaseContent, conversationId, previousResponses = [] } = await req.json();
    
    if (!character) {
      throw new Error('Character information is missing');
    }

    console.log('Processing request for character:', character.name);
    console.log('Is group chat:', isGroupChat);
    console.log('Conversation ID:', conversationId);

    const systemPrompt = isGroupChat 
      ? `${GROUP_STUDY_SYSTEM_PROMPT}\n\nYou are ${character.name}, ${character.role}. ${character.description}. Your response should reflect your unique perspective while engaging naturally with the group discussion.`
      : `You are ${character.name}, ${character.role}. ${character.description}. When discussing scripture, first share one particularly relevant verse with its complete text, then explain its application briefly.`;

    const messages = [
      { 
        role: 'system', 
        content: systemPrompt 
      }
    ];

    if (knowledgeBaseContent) {
      messages.push({
        role: 'system',
        content: `Consider this relevant information: ${knowledgeBaseContent}`
      });
    }

    if (isGroupChat && previousResponses.length > 0) {
      messages.push({
        role: 'system',
        content: `Previous responses in this discussion:\n${previousResponses.map((resp: any) => `${resp.characterName}: ${resp.content}`).join('\n\n')}\n\nBuild naturally on these responses with your unique perspective and different scriptures. If you're Pastor Andrew, end with one clear follow-up question.`
      });
    }

    messages.push({
      role: 'user',
      content: isGroupChat 
        ? `As ${character.name}, provide your concise perspective on this topic, engaging naturally with previous responses while maintaining your distinct viewpoint. If you're Pastor Andrew, include one follow-up question: ${message}`
        : message
    });

    console.log('Sending request to OpenAI with messages:', messages);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0.5
      }),
    });

    const data = await response.json();
    console.log('OpenAI response received for character:', character.name);

    if (!data.choices || !data.choices[0]) {
      throw new Error('Invalid response from OpenAI');
    }

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