import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Send, Sparkles, Brain, GraduationCap, Calendar, Loader2, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

const AGENT_CONFIGS: Record<string, { name: string; icon: any; color: string; greeting: string }> = {
  planning: { name: 'College Planning Agent', icon: GraduationCap, color: 'text-blue-400', greeting: "Hi! I'm your College Planning Agent. Tell me about your dream schools and goals \u2014 I'll build a personalized roadmap!" },
  teaching: { name: 'Teaching Agent', icon: Sparkles, color: 'text-emerald-400', greeting: "Hey! I'm your Teaching Agent. Ask me anything about your subjects \u2014 I'll explain concepts and cite official sources!" },
  schedule: { name: 'Schedule Agent', icon: Calendar, color: 'text-amber-400', greeting: "Hello! I'm your Schedule Agent. I'll help track deadlines and plan your study schedule!" },
  mental: { name: 'Mental Health Agent', icon: Brain, color: 'text-purple-400', greeting: "Hey there. This is a safe space. I'm here to listen and support you through the stress." },
};

export default function AgentChat() {
  const { agentType } = useParams();
  const { user } = useAuth();
  const config = AGENT_CONFIGS[agentType || 'teaching'];
  const [messages, setMessages] = useState<Array<{role: string; content: string; id?: string}>>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [, setLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Load or create session
  useEffect(() => {
    if (!user || !agentType) return;
    loadSession();
  }, [user, agentType]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const loadSession = async () => {
    setLoading(true);
    // Find existing active session for this agent
    const { data: sessions } = await supabase
      .from('chat_sessions').select('*')
      .eq('student_id', user!.id)
      .eq('agent_type', agentType)
      .eq('status', 'active')
      .order('updated_at', { ascending: false })
      .limit(1);

    if (sessions && sessions.length > 0) {
      const sess = sessions[0];
      setSessionId(sess.id);
      // Load messages
      const { data: msgs } = await supabase
        .from('chat_messages').select('*')
        .eq('session_id', sess.id)
        .order('created_at', { ascending: true });
      setMessages(msgs?.map(m => ({ role: m.role, content: m.content, id: m.id })) || []);
    } else {
      setMessages([]);
      setSessionId(null);
    }
    setLoading(false);
  };

  const ensureSession = async (): Promise<string> => {
    if (sessionId) return sessionId;
    // Create new session
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert({
        student_id: user!.id,
        agent_type: agentType || 'teaching',
        title: `${config?.name} - ${new Date().toLocaleDateString()}`,
        message_count: 0,
      })
      .select().single();
    if (error) throw error;
    setSessionId(data.id);
    return data.id;
  };

  const handleSend = async () => {
    if (!input.trim() || !user) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const sid = await ensureSession();

      // Save user message to DB
      await supabase.from('chat_messages').insert({ session_id: sid, role: 'user', content: userMsg });
      await supabase.from('chat_sessions').update({ message_count: messages.length + 1, updated_at: new Date().toISOString() }).eq('id', sid);

      // Call Edge Function
      const { data: { session } } = await supabase.auth.getSession();
      const funcUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/agent-chat`;
      const res = await fetch(funcUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token || ''}`,
        },
        body: JSON.stringify({
          message: userMsg,
          student_id: user.id,
          session_id: sid,
          agent_type: agentType || 'teaching',
        }),
      });

      let reply: string;
      if (res.ok) {
        const data = await res.json();
        reply = data.reply || data.content || data.choices?.[0]?.message?.content || 'I received your message. How can I help further?';
      } else {
        reply = getFallbackResponse(userMsg, agentType || 'teaching');
      }

      // Save assistant message to DB
      await supabase.from('chat_messages').insert({ session_id: sid, role: 'assistant', content: reply });
      await supabase.from('chat_sessions').update({ message_count: messages.length + 2, updated_at: new Date().toISOString() }).eq('id', sid);

      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err: any) {
      const fallback = getFallbackResponse(userMsg, agentType || 'teaching');
      setMessages(prev => [...prev, { role: 'assistant', content: fallback }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const Icon = config?.icon || Sparkles;
  const displayMessages = messages.length > 0 ? messages : [{ role: 'assistant', content: config?.greeting || '' }];

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] bg-[#1e293b] border border-white/10 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center ${config?.color}`}><Icon className="w-5 h-5" /></div>
          <div><p className="font-medium text-sm text-white">{config?.name}</p><p className="text-xs text-gray-500">AI Agent</p></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400"><div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />Online</div>
          <span className="text-xs text-gray-500">{messages.length} msgs</span>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {displayMessages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-[#0f172a] text-gray-200'}`}>
                <div className="whitespace-pre-wrap text-sm leading-relaxed">{m.content}</div>
                {m.role === 'assistant' && (
                  <div className="flex items-center gap-3 mt-2 pt-2 border-t border-white/5">
                    <button className="text-xs text-gray-500 hover:text-blue-400 flex items-center gap-1 transition-colors"><Bookmark className="w-3 h-3" />Save</button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start"><div className="bg-[#0f172a] rounded-2xl px-4 py-3">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div></div>
          )}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-3 border-t border-white/10">
        <div className="flex items-end gap-2">
          <Textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
            placeholder={`Ask ${config?.name}...`} className="min-h-[40px] max-h-28 resize-none bg-[#0f172a] border-white/10 text-sm" rows={1} />
          <Button size="icon" onClick={handleSend} disabled={!input.trim() || isTyping} className="flex-shrink-0 h-10 w-10 bg-blue-600 hover:bg-blue-700">
            {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

function getFallbackResponse(input: string, agentType: string): string {
  const lower = input.toLowerCase();
  if (agentType === 'planning') {
    if (lower.includes('mit')) return "MIT is extremely competitive. For CS, you'll need strong math + extracurriculars.\n\n**Recommendations:**\n- SAT: 1520-1580 (50th percentile)\n- Focus on math competitions (AMC, AIME)\n- Consider EA (Nov 1 deadline)\n\nWant me to build a full plan?";
    return "I'd love to help you plan! Share:\n1. Target schools (dream, match, safety)\n2. Current test scores\n3. Intended major\n4. Extracurriculars\n\nI'll create a personalized roadmap!";
  }
  if (agentType === 'schedule') return "**Upcoming deadlines:**\n- SAT Registration: ~6 weeks before\n- Common App: Aug 1 opens\n- Early Decision: Nov 1\n- Regular Decision: Jan 1-15\n\nWant me to create a study schedule?";
  if (agentType === 'mental') return "I hear you. It's completely normal to feel this way during intense periods.\n\n**Tips:**\n- 10-min walk resets your brain\n- Pomodoro: 25 min study, 5 min break\n- Talk to someone you trust\n\nYou're doing great by reaching out. Want to share more?";
  // teaching default
  if (lower.includes('chain')) return "The Chain Rule is like peeling an onion!\n\n**If y = f(g(x)):** dy/dx = f'(g(x)) * g'(x)\n\n**Example: y = (3x\u00b2+1)\u2075**\n- Outer: u\u2075 \u2192 5u\u2074\n- Inner: 3x\u00b2+1 \u2192 6x\n- Result: 5(3x\u00b2+1)\u2074 * 6x\n\nWant to try one?\n\n\ud83d\udcd6 *AP Calculus 2024, Unit 3*";
  return "Great question! Let me break this down step by step.\n\nWould you like me to:\n1. Explain the concept first?\n2. Walk through an example?\n3. Give you practice problems?";
}
