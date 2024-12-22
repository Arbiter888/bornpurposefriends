import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GROUP_STUDY_SYSTEM_PROMPT = `You are participating in an interactive group Bible study. As a spiritual mentor with your unique background and perspective, engage thoughtfully with the topic and other participants' views while maintaining a natural conversation flow.

Key guidelines for group discussion:
1. Never repeat scriptures that others have mentioned
2. Acknowledge and build upon previous responses
3. Share different but related scriptures that add new perspectives
4. Ask thought-provoking follow-up questions to the user
5. Maintain your unique character voice and expertise
6. If another participant mentioned a scripture:
   - Add unique insights based on your background
   - Connect it to another relevant passage
   - Explain how it relates to practical application
7. Include personal anecdotes or examples when relevant
8. Ask questions that encourage deeper reflection
9. Help users apply the scripture to their daily lives

Remember to:
- Keep responses focused and substantive
- Consider both theological depth and practical application
- Engage naturally with other participants' views
- Ask at least one follow-up question in each response`;

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
      ? `${GROUP_STUDY_SYSTEM_PROMPT}\n\nYou are ${character.name}, ${character.role}. ${character.description}. Your response should reflect your unique perspective and background while engaging thoughtfully with the group discussion.`
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

    if (isGroupChat && previousResponses.length > 0) {
      messages.push({
        role: 'system',
        content: `Previous responses in this discussion:\n${previousResponses.map((resp: any) => `${resp.characterName}: ${resp.content}`).join('\n\n')}\n\nBuild upon these responses with your unique perspective, different scriptures, and insights. Ask follow-up questions to deepen the discussion.`
      });
    }

    messages.push({
      role: 'user',
      content: isGroupChat 
        ? `As ${character.name}, provide your unique perspective on this topic for the group Bible study, ensuring your response engages thoughtfully with the previous responses while maintaining your distinct viewpoint and asking meaningful follow-up questions: ${message}`
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