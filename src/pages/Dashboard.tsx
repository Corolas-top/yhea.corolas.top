import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { LayoutDashboard, Target, CalendarDays, StickyNote, Bot, Zap, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [quota, setQuota] = useState(4);

  useEffect(() => { if (user) fetchData(); }, [user]);

  const fetchData = async () => {
    const uid = user!.id;
    const today = new Date().toISOString();
    const [{ data: t }, { data: e }, { data: n }, { data: s }] = await Promise.all([
      supabase.from('tasks').select('*').eq('user_id', uid).in('status', ['pending', 'in_progress']).order('due_date', { ascending: true }).limit(5),
      supabase.from('calendar_events').select('*').eq('user_id', uid).gte('start_at', today).order('start_at', { ascending: true }).limit(5),
      supabase.from('notes').select('*').eq('author_id', uid).order('updated_at', { ascending: false }).limit(4),
      supabase.from('chat_sessions').select('*').eq('student_id', uid).eq('status', 'active').order('updated_at', { ascending: false }).limit(4),
    ]);
    setTasks(t || []); setEvents(e || []); setNotes(n || []); setSessions(s || []);
    const { data: u } = await supabase.from('users').select('agent_quota, agent_quota_used').eq('id', uid).single();
    if (u) setQuota(Math.max(0, u.agent_quota - u.agent_quota_used));
  };

  const toggleTask = async (id: string, st: string) => {
    const next = st === 'completed' ? 'pending' : 'completed';
    await supabase.from('tasks').update({ status: next }).eq('id', id);
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2"><LayoutDashboard className="w-6 h-6 text-blue-400" />Dashboard</h2>
        <p className="text-gray-400 mt-1 text-sm">Welcome back, {user?.name || 'student'}!</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-3 flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center"><Target className="w-5 h-5 text-blue-400" /></div><div><p className="text-lg font-bold">{tasks.length}</p><p className="text-[11px] text-gray-500">Active Tasks</p></div></CardContent></Card>
        <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-3 flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center"><StickyNote className="w-5 h-5 text-purple-400" /></div><div><p className="text-lg font-bold">{notes.length}</p><p className="text-[11px] text-gray-500">Notes</p></div></CardContent></Card>
        <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-3 flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center"><Bot className="w-5 h-5 text-emerald-400" /></div><div><p className="text-lg font-bold">{sessions.length}</p><p className="text-[11px] text-gray-500">AI Chats</p></div></CardContent></Card>
        <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-3 flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center"><Zap className="w-5 h-5 text-amber-400" /></div><div><p className="text-lg font-bold">{quota}</p><p className="text-[11px] text-gray-500">AI Uses Left</p></div></CardContent></Card>
      </div>

      {/* Quota bar */}
      <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-3"><div className="flex items-center justify-between mb-1"><p className="text-sm flex items-center gap-2"><Zap className="w-4 h-4 text-emerald-400" />Agent Quota</p><span className="text-xs text-gray-500">{4 - quota}/4 used</span></div><Progress value={((4 - quota) / 4) * 100} className="h-2" /></CardContent></Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-4">
          <h3 className="font-bold text-sm mb-3 flex items-center gap-2"><Target className="w-4 h-4 text-blue-400" />Upcoming Tasks</h3>
          {tasks.length === 0 ? <p className="text-sm text-gray-500">No pending tasks.</p> : <div className="space-y-2">
            {tasks.map(t => <div key={t.id} className="flex items-center gap-2 p-2 bg-[#0f172a] rounded-lg">
              <button onClick={() => toggleTask(t.id, t.status)}><CheckCircle2 className={`w-4 h-4 ${t.status === 'completed' ? 'text-emerald-400' : 'text-gray-600'}`} /></button>
              <p className="text-sm flex-1">{t.title}</p>
              {t.due_date && <span className="text-[10px] text-gray-500">{new Date(t.due_date).toLocaleDateString()}</span>}
            </div>)}
          </div>}
        </CardContent></Card>
        <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-4">
          <h3 className="font-bold text-sm mb-3 flex items-center gap-2"><CalendarDays className="w-4 h-4 text-purple-400" />Upcoming Events</h3>
          {events.length === 0 ? <p className="text-sm text-gray-500">No upcoming events.</p> : <div className="space-y-2">
            {events.map(e => <div key={e.id} className="flex items-center gap-2 p-2 bg-[#0f172a] rounded-lg">
              <CalendarDays className="w-4 h-4 text-purple-400" />
              <p className="text-sm flex-1">{e.title}</p>
              <span className="text-[10px] text-gray-500">{new Date(e.start_at).toLocaleDateString()}</span>
            </div>)}
          </div>}
        </CardContent></Card>
      </div>
    </div>
  );
}
