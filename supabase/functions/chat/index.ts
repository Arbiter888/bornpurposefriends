import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GROUP_STUDY_SYSTEM_PROMPT = `You are participating in an interactive group Bible study. As a spiritual mentor with your unique background and perspective, engage thoughtfully with the topic and other participants' views.

Key guidelines:
1. Maintain your distinct character voice and expertise throughout
2. When referencing scripture:
   - If introducing a new scripture, explain its context and relevance thoroughly
   - If referencing a scripture another participant mentioned, either:
     a) Add a unique perspective or interpretation based on your background
     b) Acknowledge and build upon their interpretation, adding your own insights
     c) Connect it to another relevant passage or practical application
3. Draw from your specific background and beliefs to offer unique insights
4. Engage respectfully with other participants' views, showing how different perspectives can deepen understanding
5. Keep responses focused and concise while being substantive
6. Consider both theological depth and practical application in your responses

Remember to maintain your character's unique voice and perspective throughout the discussion.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, character, isGroupChat, knowledgeBaseContent, conversationId } = await req.json();
    
    if (!character) {
      throw new Error('Character information is missing');
    }

    console.log('Processing request for character:', character.name);
    console.log('Is group debate:', isGroupChat);
    console.log('Conversation ID:', conversationId);

    const systemPrompt = isGroupChat 
      ? `${GROUP_STUDY_SYSTEM_PROMPT}\nYou are ${character.name}, ${character.role}. ${character.description}. Your response should reflect your unique perspective and background while engaging thoughtfully with the group discussion.`
      : `You are ${character.name}, ${character.role}. ${character.description}. When discussing scripture, first focus on one particularly relevant verse or passage that directly addresses the topic at hand. Explain this scripture in detail, including its context and application, before mentioning other related verses.`;

    const messages = [
      { 
        role: 'system', 
        content: systemPrompt 
      }
    ];

    if (knowledgeBaseContent) {
      messages.push({
        role: 'system',
        content: `Consider this relevant information from the knowledge base: ${knowledgeBaseContent}`
      });
    }

    const characterContext = [
      `Your nationality is ${character.nationality}.`,
      `Your key skills are: ${Array.isArray(character.skills) ? character.skills.join(', ') : 'varied'}.`,
      `Common topics you discuss: ${Array.isArray(character.conversationTopics) ? character.conversationTopics.join(', ') : 'various topics'}.`,
      `In group discussions, you should provide unique insights based on your background as ${character.role} and your specific expertise.`
    ].join(' ');

    messages.push({
      role: 'system',
      content: characterContext
    });

    messages.push({
      role: 'user',
      content: isGroupChat 
        ? `As ${character.name}, provide your unique perspective on this topic for the group Bible study, ensuring your response engages thoughtfully with the discussion while maintaining your distinct viewpoint: ${message}`
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
        temperature: 0.9,
        max_tokens: 2048,
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