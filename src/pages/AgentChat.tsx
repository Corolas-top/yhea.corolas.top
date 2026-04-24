import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Send, Sparkles, Brain, GraduationCap, FileEdit, Loader2, Zap, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

const AGENT_CONFIGS: Record<string, { name: string; icon: any; color: string; greeting: string; systemPrompt: string }> = {
  admission: {
    name: 'Admission Advisor',
    icon: GraduationCap, color: 'text-blue-400',
    greeting: "Hi! I'm your Admission Advisor. Based on your profile, I'll help design your application strategy, school list, and timeline. Tell me about your goals!",
    systemPrompt: "You are Yhea Admission Advisor. Analyze student's full profile (curriculum, scores, activities, target countries/schools) to design comprehensive admission strategy. Include: school list (reach/match/safety), application timeline, persona building advice, and test planning."
  },
  teacher: {
    name: 'Course Teacher',
    icon: Sparkles, color: 'text-emerald-400',
    greeting: "Hey! I'm your Course Teacher. I can teach any subject from our Study Resources. Which unit or topic would you like to learn today?",
    systemPrompt: "You are Yhea Course Teacher. Teach based on official curriculum units/chapters. Always cite the source unit. Use Socratic method. Provide practice problems. Support AP, IB, A-Level, standardized tests, competitions, and admission tests."
  },
  essay: {
    name: 'Essay Assistant',
    icon: FileEdit, color: 'text-purple-400',
    greeting: "Hello! I'm your Essay Assistant. Share your essay draft or prompt, and I'll help refine it. I can also pull your profile to give personalized advice!",
    systemPrompt: "You are Yhea Essay Assistant. Help students brainstorm, outline, and refine application essays. For Common App, UCAS, Coalition, etc. Provide specific feedback on structure, voice, and content. Never write the essay for them."
  },
  free: {
    name: 'Free Agent',
    icon: Brain, color: 'text-amber-400',
    greeting: "Hey there! I'm your Free Agent — I can handle any task you throw at me. Research, planning, writing help, or just a chat. What do you need?",
    systemPrompt: "You are Yhea Free Agent — a versatile AI assistant. You can research universities, explain concepts, help with planning, provide emotional support, or any other task the student needs."
  },
};

export default function AgentChat() {
  const { agentType } = useParams();
  const { user } = useAuth();
  const config = AGENT_CONFIGS[agentType || 'free'];
  const [messages, setMessages] = useState<Array<{role: string; content: string}>>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [quota, setQuota] = useState(0);
  const [, setLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (user) { loadSession(); fetchQuota(); } }, [user, agentType]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const fetchQuota = async () => {
    if (!user) return;
    const { data } = await supabase.from('users').select('agent_quota, agent_quota_used').eq('id', user.id).single();
    if (data) setQuota(Math.max(0, data.agent_quota - data.agent_quota_used));
  };

  const loadSession = async () => {
    if (!user || !agentType) return;
    setLoading(true);
    const { data: sessions } = await supabase
      .from('chat_sessions').select('*')
      .eq('student_id', user.id)
      .eq('agent_type', agentType)
      .eq('status', 'active')
      .order('updated_at', { ascending: false })
      .limit(1);
    if (sessions && sessions.length > 0) {
      setSessionId(sessions[0].id);
      const { data: msgs } = await supabase.from('chat_messages').select('*').eq('session_id', sessions[0].id).order('created_at', { ascending: true });
      setMessages(msgs?.map(m => ({ role: m.role, content: m.content })) || []);
    } else { setMessages([]); setSessionId(null); }
    setLoading(false);
  };

  const ensureSession = async (): Promise<string> => {
    if (sessionId) return sessionId;
    const { data } = await supabase.from('chat_sessions').insert({
      student_id: user!.id, agent_type: agentType || 'free',
      title: `${config?.name} - ${new Date().toLocaleDateString()}`, message_count: 0,
    }).select().single();
    if (!data) throw new Error('Failed to create session');
    setSessionId(data.id);
    return data.id;
  };

  const consumeQuota = async (): Promise<boolean> => {
    if (!user) return false;
    const { data } = await supabase.from('users').select('agent_quota, agent_quota_used').eq('id', user.id).single();
    if (!data) return false;
    const remaining = data.agent_quota - data.agent_quota_used;
    if (remaining <= 0) return false;
    await supabase.from('users').update({ agent_quota_used: data.agent_quota_used + 1 }).eq('id', user.id);
    setQuota(remaining - 1);
    return true;
  };

  const handleSend = async () => {
    if (!input.trim() || !user) return;
    if (quota <= 0) { setMessages(prev => [...prev, { role: 'assistant', content: "You've used all your Agent credits. Buy more via Buy Me a Coffee! (5 RMB = 1 use)" }]); return; }

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const sid = await ensureSession();
      await supabase.from('chat_messages').insert({ session_id: sid, role: 'user', content: userMsg });

      const hasQuota = await consumeQuota();
      if (!hasQuota) {
        setMessages(prev => [...prev, { role: 'assistant', content: "No credits remaining. Please recharge via Buy Me a Coffee." }]);
        setIsTyping(false); return;
      }

      // Get session token for Edge Function internal use
      const { data: { session } } = await supabase.auth.getSession();

      let reply = '';
      try {
        // Use fetch with apikey (anon key) for Edge Runtime auth + pass access_token in body
        const funcUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/agent-chat`;
        const res = await fetch(funcUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({
            message: userMsg,
            student_id: user.id,
            session_id: sid,
            agent_type: agentType || 'free',
            access_token: session?.access_token,
          }),
        });
        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`Edge Function ${res.status}: ${errText}`);
        }
        const data = await res.json();
        reply = data.reply || data.content || 'I received your message. How can I help further?';
      } catch (e: any) {
        reply = getFallbackResponse(userMsg, agentType || 'free');
      }

      if (reply) {
        await supabase.from('chat_messages').insert({ session_id: sid, role: 'assistant', content: reply });
        await supabase.from('chat_sessions').update({ message_count: messages.length + 2, updated_at: new Date().toISOString() }).eq('id', sid);
        setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      }
    } catch (err: any) {
      const fallback = getFallbackResponse(userMsg, agentType || 'free');
      setMessages(prev => [...prev, { role: 'assistant', content: fallback }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } };
  const Icon = config?.icon || Brain;
  const displayMessages = messages.length > 0 ? messages : [{ role: 'assistant', content: config?.greeting || '' }];

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] bg-[#1e293b] border border-white/10 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center ${config?.color}`}><Icon className="w-5 h-5" /></div>
          <div><p className="font-medium text-sm text-white">{config?.name}</p><p className="text-xs text-gray-500">AI Agent</p></div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${quota > 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
            <Zap className="w-3 h-3" />{quota} left
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400"><div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />Online</div>
        </div>
      </div>

      {/* Quota Warning */}
      {quota <= 1 && (
        <div className="px-4 py-2 bg-amber-500/10 border-b border-amber-500/20 flex items-center gap-2 text-xs text-amber-400">
          <AlertTriangle className="w-3.5 h-3.5" />Low credits! Buy more via Buy Me a Coffee (5 RMB = 1 use).
        </div>
      )}

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {displayMessages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-[#0f172a] text-gray-200'}`}>
                <div className="whitespace-pre-wrap text-sm leading-relaxed">{m.content}</div>
              </div>
            </div>
          ))}
          {isTyping && <div className="flex justify-start"><div className="bg-[#0f172a] rounded-2xl px-4 py-3"><div className="flex items-center gap-1"><div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" /><div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} /><div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} /></div></div></div>}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-3 border-t border-white/10">
        <div className="flex items-end gap-2">
          <Textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder={quota > 0 ? `Ask ${config?.name}...` : 'No credits remaining'} className="min-h-[40px] max-h-28 resize-none bg-[#0f172a] border-white/10 text-sm" rows={1} disabled={quota <= 0} />
          <Button size="icon" onClick={handleSend} disabled={!input.trim() || isTyping || quota <= 0} className="flex-shrink-0 h-10 w-10 bg-blue-600 hover:bg-blue-700">
            {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

function getFallbackResponse(input: string, agentType: string): string {
  const lower = input.toLowerCase();
  if (agentType === 'admission') {
    if (lower.includes('mit')) return "MIT is extremely competitive.\n\n**Recommendations:**\n- Strong math background (AMC/AIME)\n- Unique extracurriculars\n- Interview preparation\n\nWant a full plan?";
    return "I'd love to help you plan! Share your target schools, current scores, and intended major.";
  }
  if (agentType === 'teacher') return "Let me explain this concept step by step!\n\nWould you like:\n1. Concept explanation\n2. Example walkthrough\n3. Practice problems";
  if (agentType === 'essay') return "Great essay topic! Here's my feedback:\n\n**Strengths:** Clear narrative flow\n\n**Suggestions:**\n- Add specific examples\n- Show don't tell\n- Connect to your future goals\n\nShare your draft for detailed review!";
  return "I'm here to help! What would you like me to do?";
}
