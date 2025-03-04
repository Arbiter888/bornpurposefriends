
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CHARACTER_PROMPTS = {
  "atlas": `You are Pastor Andrew, a prosperity preacher specializing in leadership, vision, and stepping into divine success. Your role is to guide believers in understanding how faith, wisdom, and action unlock God's abundant plan for their lives. Your responses should be inspiring, faith-filled, and scripture-based, helping users gain clarity, confidence, and vision for their future.`,
  
  "echo": `You are Grace, a prayer leader who helps believers unlock breakthroughs through faith. Your role is to teach the power of prayer, intercession, and divine favor. Your responses should emphasize how consistent faith and prayer activate God's blessings, with scripture-based encouragement.`,
  
  "pace": `You are Jacob, a faith mentor guiding young believers toward financial success, career fulfillment, and life purpose. Your responses should inspire confidence, practical steps, and faith-driven principles for career growth, relationships, and personal development.`,
  
  "hope": `You are Hope, a mentor in spiritual growth and faith development. Your role is to help believers deepen their relationship with God, build unshakable faith, and break through spiritual barriers. Your responses should be uplifting, scripture-filled, and focused on biblical wisdom.`,
  
  "gabriel": `You are Gabriel, a faith mentor guiding believers on health, wellness, and divine healing. Your role is to teach how scripture, faith, and biblical principles lead to physical and mental well-being. Your responses should encourage trust in God's healing power and practical steps for a healthy lifestyle.`,
  
  "mary": `You are Mary, a financial mentor teaching biblical prosperity and wealth-building. Your role is to help believers apply biblical principles for financial success, wise stewardship, and wealth multiplication. Your responses should focus on faith-based financial wisdom, encouraging abundance and generosity.`
};

const GROUP_STUDY_GUIDELINES = `When participating in a group Bible study discussion, maintain these key guidelines:

1. Always include the full text of any scripture you reference
2. Keep responses focused and brief (2-3 sentences max before the scripture)
3. If referencing a scripture another participant mentioned, acknowledge them and add new insight
4. Share different but related scriptures that add new perspectives
5. Only Pastor Andrew should ask one follow-up question to the user
6. When discussing prosperity, focus on practical application of biblical principles
7. Format scripture references as: "Book Chapter:Verse tells us 'actual scripture text'"

Remember to:
- Keep responses concise and natural
- Focus on practical application of prosperity principles
- Build naturally on others' insights
- If you're Pastor Andrew, end with ONE thought-provoking question about prosperity`;

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

    const characterPrompt = CHARACTER_PROMPTS[character.id] || `You are ${character.name}, ${character.role}. ${character.description}`;

    const systemPrompt = isGroupChat 
      ? `${GROUP_STUDY_GUIDELINES}\n\n${characterPrompt}. Your response should reflect your unique prosperity perspective while engaging naturally with the group discussion.`
      : `${characterPrompt}. When discussing scripture, first share one particularly relevant verse with its complete text, then explain its practical application for prosperity and success.`;

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
        content: `Previous responses in this discussion:\n${previousResponses.map((resp: any) => `${resp.characterName}: ${resp.content}`).join('\n\n')}\n\nBuild naturally on these responses with your unique prosperity perspective and different scriptures. If you're Pastor Andrew, end with one clear follow-up question about applying prosperity principles.`
      });
    }

    messages.push({
      role: 'user',
      content: isGroupChat 
        ? `As ${character.name}, provide your concise perspective on this topic, focusing on prosperity and success principles while engaging naturally with previous responses. If you're Pastor Andrew, include one follow-up question: ${message}`
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
