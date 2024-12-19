import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const DEBATE_SYSTEM_PROMPT = `You are participating in a group debate. Based on your character's background, expertise, and perspective, provide your unique viewpoint on the topic. Your response should be distinctly different from what other characters might say, drawing from your specific background and beliefs. Be respectful but don't hesitate to disagree with others if your character would have a different opinion. Support your arguments with your character's expertise and experience. Keep responses concise, focused, and engaging. Remember to maintain your character's unique voice and perspective throughout the debate.`;

const SCRIPTURE_FOCUS_PROMPT = `When discussing scripture, first focus on one particularly relevant verse or passage that directly addresses the topic at hand. Explain this scripture in detail, including its context and application, before mentioning other related verses. This helps create a deeper understanding of each scripture reference rather than overwhelming with multiple references at once. After thoroughly exploring the primary scripture, you can then suggest other relevant verses for further study.`;

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
      ? `${DEBATE_SYSTEM_PROMPT}\nYou are ${character.name}, ${character.role}. ${character.description}. You must provide a unique perspective that differs from what other characters might say, based on your specific background and beliefs.`
      : `You are ${character.name}, ${character.role}. ${character.description}. ${SCRIPTURE_FOCUS_PROMPT}`;

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

    const characterContext = [
      `Your nationality is ${character.nationality}.`,
      `Your key skills are: ${Array.isArray(character.skills) ? character.skills.join(', ') : 'varied'}.`,
      `Common topics you discuss: ${Array.isArray(character.conversationTopics) ? character.conversationTopics.join(', ') : 'various topics'}.`
    ].join(' ');

    messages.push({
      role: 'system',
      content: characterContext
    });

    messages.push({
      role: 'user',
      content: isGroupChat 
        ? `As ${character.name}, provide your unique perspective on this topic for the group debate, ensuring your response is distinctly different from other characters: ${message}`
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
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 1,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0.3,
        presence_penalty: 0.3
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