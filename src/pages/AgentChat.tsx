import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Send, Sparkles, Brain, GraduationCap, Calendar, Loader2, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

const AGENT_CONFIGS: Record<string, { name: string; icon: any; color: string; greeting: string }> = {
  planning: { name: 'College Planning Agent', icon: GraduationCap, color: 'text-blue-400', greeting: "Hi! I'm your College Planning Agent. Tell me about your dream schools, current scores, and goals - I'll build a personalized roadmap for you!" },
  teaching: { name: 'Teaching Agent', icon: Sparkles, color: 'text-emerald-400', greeting: "Hey! I'm your Teaching Agent. Ask me anything about your subjects - I'll explain concepts, walk through problems, and cite official sources!" },
  schedule: { name: 'Schedule Agent', icon: Calendar, color: 'text-amber-400', greeting: "Hello! I'm your Schedule Agent. I'll help you track deadlines, plan your study schedule, and sync everything to your calendar!" },
  mental: { name: 'Mental Health Agent', icon: Brain, color: 'text-purple-400', greeting: "Hey there. This is a safe space. Whether you're feeling stressed about exams, overwhelmed with applications, or just need someone to talk to - I'm here." },
};

export default function AgentChat() {
  const { agentType } = useParams();
  const config = AGENT_CONFIGS[agentType || 'teaching'];
  const [messages, setMessages] = useState<Array<{role: string; content: string}>>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Call Supabase Edge Function
    try {
      const { supabase } = await import('@/lib/supabase');
      const { data: { session } } = await supabase.auth.getSession();
      const funcUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/agent-chat`;
      const res = await fetch(funcUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token || ''}`,
        },
        body: JSON.stringify({ message: input, student_id: session?.user?.id || '', session_id: 'new', subject: agentType || 'teaching' }),
      });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      // Handle non-streaming JSON response
      const data = await res.json();
      const reply = data.reply || data.content || data.message || JSON.stringify(data);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      // Fallback demo response
      setTimeout(() => {
        const fallback = getFallbackResponse(input, agentType || 'teaching');
        setMessages(prev => [...prev, { role: 'assistant', content: fallback }]);
      }, 1500);
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
          <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />Online
          </div>
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
                    <button className="text-xs text-gray-500 hover:text-blue-400 flex items-center gap-1"><Bookmark className="w-3 h-3" />Save</button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[#0f172a] rounded-2xl px-4 py-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
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
    if (lower.includes('mit')) return "MIT is extremely competitive with a ~4% acceptance rate. For CS, strong math background is crucial.\n\n**Your profile analysis:**\n- SAT 1450 is below their 50th percentile (1520-1580)\n- Focus on raising SAT + strong extracurriculars\n- Consider EA (Nov 1 deadline)\n\nWant me to build a full plan to improve your chances?";
    return "I'd love to help you plan! To build the best strategy, could you share:\n1. Your target schools (dream, match, safety)\n2. Current test scores\n3. Your intended major\n4. Extracurricular activities\n\nI'll then create a personalized roadmap for you! 🎯";
  }
  if (agentType === 'schedule') {
    return "Let me help you organize! Based on typical deadlines:\n\n**Upcoming deadlines:**\n- SAT Registration: ~6 weeks before test\n- Common App opens: Aug 1\n- Early Decision: Nov 1\n- Regular Decision: Jan 1-15\n\nWould you like me to create a study schedule based on your courses?";
  }
  if (agentType === 'mental') {
    return "I hear you. That sounds really tough. Remember that it's completely normal to feel this way during intense study periods.\n\n**A few things that might help:**\n- Take a 10-minute walk - it resets your brain\n- Break tasks into smaller chunks (Pomodoro: 25 min study, 5 min break)\n- Talk to someone you trust\n\nYou're doing great by reaching out. Would you like to share what's on your mind? 💙";
  }
  // teaching default
  if (lower.includes('chain')) return "The Chain Rule is like peeling an onion 🧅\n\n**Chain Rule:** If y = f(g(x)), then dy/dx = f'(g(x)) · g'(x)\n\n**Example:** y = (3x² + 1)⁵\n- Outer: u⁵ → 5u⁴\n- Inner: 3x² + 1 → 6x\n- Result: 5(3x²+1)⁴ · 6x\n\nWant to try one? 🎯\n\n📚 *AP Calculus Course Description 2024, Unit 3*";
  return "Great question! Let me break this down step by step.\n\nThe key concept here is to identify what you know and what you're looking for, then bridge the gap with the right technique.\n\nWould you like me to:\n1. Explain the concept first?\n2. Walk through an example?\n3. Give you practice problems?";
}
