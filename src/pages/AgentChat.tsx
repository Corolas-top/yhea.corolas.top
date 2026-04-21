import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChat, usePoints } from '@/hooks/useStore';
import {
  Send, Sparkles, Plus, Bookmark, StickyNote, Brain,
  BookOpen, Compass, ChevronLeft, Zap, Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

const suggestedQuestions = [
  { text: 'Explain the Chain Rule simply', icon: BookOpen },
  { text: 'What are my chances at MIT?', icon: Compass },
  { text: 'Help me plan this week', icon: Sparkles },
  { text: 'Integration by Parts tips', icon: Brain },
];

export default function AgentChat() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { sessions, activeMessages } = useChat();
  const { quota, deductAIUse } = usePoints();
  const [messages, setMessages] = useState(activeMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const currentSession = sessions.find(s => s.id === sessionId) || sessions[0];
  const totalRemaining = quota.base_remaining + quota.bonus_remaining;

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || totalRemaining <= 0) return;

    const userMsg = { id: `m${Date.now()}`, session_id: currentSession.id, role: 'user' as const, content: input, created_at: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    deductAIUse();

    // Simulate agent response
    setTimeout(() => {
      const responses: Record<string, string> = {
        'chain': "Think of it like peeling an onion 🧅\n\n**Step 1**: Identify the outer function\n**Step 2**: Identify the inner function\n**Step 3**: Differentiate each, then multiply\n\nExample: y = sin(x²)\n- Outer: sin(u) → cos(u)\n- Inner: x² → 2x\n- Result: cos(x²) · 2x\n\nWant to try one yourself? 🎯\n\n📚 *Source: AP Calculus Course Description 2024, Unit 3*",
        'mit': "Based on 2024 data, MIT has a ~4% acceptance rate overall.\n\nFor CS specifically:\n- Acceptance rate: ~3-4%\n- Typical SAT: 1520-1580\n- Strong math/science extracurriculars are crucial\n\nWant me to compare your profile against these stats?\n\n📊 *Source: MIT Common Data Set 2024*",
        'plan': "Let me create a weekly plan for you! 📅\n\n**This Week\'s Focus: AP Calc BC - Unit 3**\n- Mon: Chain Rule theory (25 min)\n- Tue: Practice problems (30 min)\n- Wed: Implicit differentiation (25 min)\n- Thu: Review + quiz (20 min)\n- Fri: Past paper questions (40 min)\n\nShall I add these to your task list?",
      };

      let responseText = "That's a great question! Let me think through this step by step...\n\nI'd start by identifying what we already know, then work toward what we're trying to find. The key insight here is to break the problem into smaller parts.\n\nDoes that approach make sense? I can go deeper into any part! 📚\n\n*Source: Yhea Knowledge Base*";
      const lower = userMsg.content.toLowerCase();
      if (lower.includes('chain')) responseText = responses['chain'];
      else if (lower.includes('mit') || lower.includes('chance')) responseText = responses['mit'];
      else if (lower.includes('plan')) responseText = responses['plan'];

      const agentMsg = { id: `m${Date.now() + 1}`, session_id: currentSession.id, role: 'assistant' as const, content: responseText, created_at: new Date().toISOString() };
      setMessages(prev => [...prev, agentMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div className="flex h-[calc(100vh-6rem)] gap-4">
      {/* Session Sidebar */}
      <div className="w-60 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col hidden md:flex">
        <div className="p-3 border-b border-gray-200 dark:border-gray-800">
          <Button className="w-full" size="sm" onClick={() => navigate('/agent')}>
            <Plus className="w-4 h-4 mr-1" /> New Chat
          </Button>
        </div>
        <ScrollArea className="flex-1 p-2">
          <div className="space-y-1">
            {sessions.map(s => (
              <button
                key={s.id}
                onClick={() => navigate(`/agent/${s.id}`)}
                className={`w-full flex items-center gap-2 p-2 rounded-lg text-sm text-left transition-colors ${
                  s.id === currentSession?.id ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Sparkles className="w-4 h-4 flex-shrink-0" />
                <div className="truncate"><p className="truncate font-medium">{s.title}</p><p className="text-xs text-gray-500 truncate">{s.subject}</p></div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/dashboard')} className="md:hidden"><ChevronLeft className="w-5 h-5" /></button>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-medium text-sm">Yhea Agent</p>
              <p className="text-xs text-gray-500">Your AI Learning Partner</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${totalRemaining > 3 ? 'bg-green-100 text-green-700' : totalRemaining > 0 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
              <Zap className="w-3 h-3" />{totalRemaining} left
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Hi, I'm Yhea! 👋</h3>
              <p className="text-gray-500 max-w-md mb-8">Your AI learning partner for AP, A-Level & IB. Ask me anything about your courses, university applications, or learning plans!</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
                {suggestedQuestions.map(q => (
                  <button key={q.text} onClick={() => { setInput(q.text); }} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left text-sm">
                    <q.icon className="w-4 h-4 text-blue-500" />{q.text}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map(m => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    m.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                  }`}>
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{m.content}</div>
                    {m.role === 'assistant' && (
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                        <button className="text-xs text-gray-500 hover:text-blue-500 flex items-center gap-1"><Bookmark className="w-3 h-3" /> Save</button>
                        <button className="text-xs text-gray-500 hover:text-blue-500 flex items-center gap-1"><StickyNote className="w-3 h-3" /> Note</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          {totalRemaining <= 0 && (
            <div className="mb-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-sm text-amber-700 dark:text-amber-400 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              <span>You've used all your AI chats for today. Write a note to earn more credits!</span>
              <Button size="sm" variant="outline" className="ml-auto" onClick={() => navigate('/notes')}>Write Note</Button>
            </div>
          )}
          <div className="flex items-end gap-2">
            <Textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={totalRemaining > 0 ? "Ask Yhea anything..." : "Come back tomorrow or earn credits!"}
              disabled={totalRemaining <= 0}
              className="min-h-[44px] max-h-32 resize-none"
              rows={1}
            />
            <Button size="icon" onClick={handleSend} disabled={!input.trim() || totalRemaining <= 0} className="flex-shrink-0 h-11 w-11">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
