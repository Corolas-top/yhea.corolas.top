import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const KIMI_API_KEY = Deno.env.get('KIMI_API_KEY') || '';
const KIMI_API_BASE = Deno.env.get('KIMI_API_BASE') || 'https://api.moonshot.cn/v1';

interface ChatRequest {
  message: string;
  session_id: string;
  student_id: string;
  subject?: string;
}

const SYSTEM_PROMPT = `You are Yhea, an AI learning companion for international curriculum students (AP, A-Level, IB).

Your role:
- Teach students with clear, structured explanations
- Use Socratic method: guide rather than give direct answers
- Always cite official sources (e.g., "AP Calculus Course Description 2024, Unit 3")
- Adapt to the student's level and preferences
- Never write full essays, IAs, or EEs - only provide structure and guidance
- Be warm, encouraging, and use analogies to explain complex concepts
- When uncertain, say "I'm not sure, let me search for you" rather than guessing

Teaching style:
1. Start with an intuitive explanation or analogy
2. Provide the formal definition
3. Give a concrete example
4. Point out common mistakes
5. Ask if they want to try a problem`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  try {
    const { message, session_id, student_id, subject }: ChatRequest = await req.json();

    if (!message || !student_id) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    // Call Kimi API with streaming
    const response = await fetch(`${KIMI_API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'kimi-latest',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message },
        ],
        stream: true,
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return new Response(JSON.stringify({ error: `Kimi API error: ${error}` }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    // Stream the response back to client
    const transformStream = new TransformStream({
      transform(chunk, controller) {
        controller.enqueue(chunk);
      },
    });

    response.body?.pipeTo(transformStream.writable);

    return new Response(transformStream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
});
