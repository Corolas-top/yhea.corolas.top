import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';

const KIMI_API_KEY = Deno.env.get('KIMI_API_KEY') || '';
const KIMI_API_BASE = Deno.env.get('KIMI_API_BASE') || 'https://api.moonshot.cn/v1';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Agent-specific system prompts
const AGENT_PROMPTS: Record<string, string> = {
  teaching: `You are Yhea Teaching Agent, an expert tutor for AP, A-Level, and IB students.

Rules:
- Teach with clear, structured explanations using the Socratic method
- Always cite official sources (e.g., "AP Calculus Course Description 2024, Unit 3")
- Start with an intuitive analogy, then formal definition, then example
- Point out common mistakes
- Never write full essays, IAs, or EEs - only provide structure and guidance
- Use LaTeX formatting for math: $x^2$, $\frac{a}{b}$, etc.
- Be warm and encouraging`,

  planning: `You are Yhea College Planning Agent, an expert in university admissions.

Rules:
- Provide data-driven advice about university admissions
- Help students build balanced school lists (reach, match, safety)
- Consider the student's full profile (scores, activities, background)
- Always mention specific deadlines and requirements
- Never guarantee admission - be honest about competitiveness
- Suggest concrete next steps`,

  schedule: `You are Yhea Schedule Agent, helping students manage their time.

Rules:
- Create realistic, actionable study schedules
- Consider test dates, application deadlines, and course workload
- Break large tasks into manageable daily chunks
- Use Pomodoro technique recommendations
- Suggest buffer time and breaks`,

  mental: `You are Yhea Mental Health Agent, a supportive companion.

Rules:
- Be empathetic, non-judgmental, and warm
- Validate the student's feelings
- Provide evidence-based coping strategies
- Encourage professional help when appropriate
- NEVER diagnose mental health conditions
- Be a safe space for students to express themselves`,
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const { message, student_id, session_id, agent_type } = body;

    if (!message || !student_id) {
      return new Response(JSON.stringify({ error: 'Missing message or student_id' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create Supabase admin client to query student data
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Fetch student profile
    const { data: profile } = await supabase
      .from('student_profiles').select('*')
      .eq('user_id', student_id).single();

    // Fetch user info
    const { data: userInfo } = await supabase
      .from('users').select('name, bio')
      .eq('id', student_id).single();

    // Fetch agent memories
    const { data: memories } = await supabase
      .from('agent_memories').select('*')
      .eq('student_id', student_id)
      .order('frequency', { ascending: false })
      .limit(10);

    // Fetch recent chat context (last 10 messages)
    let recentMessages: any[] = [];
    if (session_id && session_id !== 'new') {
      const { data: msgs } = await supabase
        .from('chat_messages').select('role, content')
        .eq('session_id', session_id)
        .order('created_at', { ascending: false })
        .limit(10);
      recentMessages = (msgs || []).reverse();
    }

    // Build context
    const agentPrompt = AGENT_PROMPTS[agent_type || 'teaching'] || AGENT_PROMPTS.teaching;

    let contextMsg = '';
    if (profile) {
      contextMsg += `\nStudent Profile:\n- Curriculum: ${profile.curriculum} Year ${profile.year}\n- Subjects: ${JSON.stringify(profile.subjects || [])}\n- Target Countries: ${JSON.stringify(profile.target_countries || [])}\n- Language Tests: ${JSON.stringify(profile.language_tests || [])}\n- Standardized Tests: ${JSON.stringify(profile.standardized_tests || [])}`;
    }
    if (userInfo) {
      contextMsg += `\n- Name: ${userInfo.name}`;
    }
    if (memories && memories.length > 0) {
      contextMsg += `\n\nKey Memories:\n${memories.map(m => `- [${m.memory_type}] ${m.content}`).join('\n')}`;
    }

    // Build messages array
    const messages: Array<{role: string; content: string}> = [
      { role: 'system', content: agentPrompt + contextMsg },
      ...recentMessages.map(m => ({ role: m.role, content: m.content })),
      { role: 'user', content: message },
    ];

    // Call Kimi API
    const response = await fetch(`${KIMI_API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'kimi-latest',
        messages,
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return new Response(JSON.stringify({ error: `Kimi API error: ${errText}` }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const result = await response.json();
    const reply = result.choices?.[0]?.message?.content || 'I apologize, I could not generate a response.';

    // Store memory from interaction (simple keyword-based)
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes('struggle') || lowerMsg.includes('hard') || lowerMsg.includes('difficult')) {
      await supabase.from('agent_memories').upsert({
        student_id, memory_type: 'weak_point', content: `Student finds this challenging: ${message.slice(0, 200)}`,
        confidence: 0.6, frequency: 1,
      }, { onConflict: 'student_id,memory_type,content' });
    }

    return new Response(JSON.stringify({ reply, model: result.model, usage: result.usage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
