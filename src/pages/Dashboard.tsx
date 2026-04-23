import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Target, CalendarDays, StickyNote, Trophy, Zap, BookOpen, CheckCircle2, Clock
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const [points, setPoints] = useState<any>(null);
  const [quota, setQuota] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    setLoading(true);
    const uid = user!.id;

    // Fetch tasks (pending + in_progress only)
    const { data: tData } = await supabase
      .from('tasks').select('*')
      .eq('user_id', uid)
      .in('status', ['pending', 'in_progress'])
      .order('due_date', { ascending: true })
      .limit(5);
    setTasks(tData || []);

    // Fetch upcoming calendar events
    const today = new Date().toISOString();
    const { data: eData } = await supabase
      .from('calendar_events').select('*')
      .eq('user_id', uid)
      .gte('start_at', today)
      .order('start_at', { ascending: true })
      .limit(5);
    setEvents(eData || []);

    // Fetch my notes
    const { data: nData } = await supabase
      .from('notes').select('*')
      .eq('author_id', uid)
      .order('updated_at', { ascending: false })
      .limit(4);
    setNotes(nData || []);

    // Fetch points
    const { data: pData } = await supabase
      .from('point_balances').select('*')
      .eq('user_id', uid).single();
    setPoints(pData);

    // Fetch AI quota
    const { data: qData } = await supabase
      .from('ai_usage_quotas').select('*')
      .eq('user_id', uid).single();
    setQuota(qData);

    // Fetch profile
    const { data: profData } = await supabase
      .from('student_profiles').select('*')
      .eq('user_id', uid).single();
    setProfile(profData);

    setLoading(false);
  };

  const toggleTask = async (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    await supabase.from('tasks').update({ status: newStatus }).eq('id', taskId);
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const aiUsed = quota ? (quota.base_daily_limit + quota.bonus_from_points - quota.base_remaining - quota.bonus_remaining) : 0;
  const aiTotal = quota ? (quota.base_daily_limit + quota.bonus_from_points) : 10;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2"><LayoutDashboard className="w-6 h-6 text-blue-400" />Dashboard</h2>
        <p className="text-gray-400 mt-1">
          {loading ? 'Loading...' : profile ? `${profile.curriculum} Year ${profile.year} \u00b7 Welcome back, ${user?.name}!` : `Welcome, ${user?.name}!`}
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center"><Target className="w-5 h-5 text-blue-400" /></div>
          <div><p className="text-lg font-bold">{tasks.length}</p><p className="text-xs text-gray-500">Active Tasks</p></div>
        </CardContent></Card>
        <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center"><StickyNote className="w-5 h-5 text-purple-400" /></div>
          <div><p className="text-lg font-bold">{notes.length}</p><p className="text-xs text-gray-500">My Notes</p></div>
        </CardContent></Card>
        <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center"><Trophy className="w-5 h-5 text-amber-400" /></div>
          <div><p className="text-lg font-bold">{points?.balance || 0}</p><p className="text-xs text-gray-500">YC Points</p></div>
        </CardContent></Card>
        <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center"><Zap className="w-5 h-5 text-emerald-400" /></div>
          <div><p className="text-lg font-bold">{aiTotal - aiUsed}/{aiTotal}</p><p className="text-xs text-gray-500">AI Left</p></div>
        </CardContent></Card>
      </div>

      {/* AI Usage Progress */}
      <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium flex items-center gap-2"><Zap className="w-4 h-4 text-emerald-400" />Daily AI Usage</p>
          <span className="text-xs text-gray-500">{Math.round((aiUsed / aiTotal) * 100)}% used</span>
        </div>
        <Progress value={(aiUsed / aiTotal) * 100} className="h-2" />
      </CardContent></Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks */}
        <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold flex items-center gap-2"><Target className="w-4 h-4 text-blue-400" />Upcoming Tasks</h3>
            <Button variant="ghost" size="sm" className="text-xs text-blue-400" onClick={() => navigate('/planning')}>View All</Button>
          </div>
          {tasks.length === 0 ? (
            <div className="text-center py-6 text-gray-500 text-sm">
              <p>No tasks yet. Create one in Planning!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {tasks.map(t => (
                <div key={t.id} className="flex items-center gap-3 p-3 bg-[#0f172a] rounded-lg hover:bg-[#0f172a]/80 transition-colors">
                  <button onClick={() => toggleTask(t.id, t.status)}>
                    <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${t.status === 'completed' ? 'text-emerald-400' : 'text-gray-600 hover:text-emerald-400'}`} />
                  </button>
                  <div className="flex-1 min-w-0"><p className={`text-sm font-medium truncate ${t.status === 'completed' ? 'line-through text-gray-500' : ''}`}>{t.title}</p>
                    {t.due_date && <p className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(t.due_date).toLocaleDateString()}</p>}</div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${t.priority === 1 ? 'bg-red-500/10 text-red-400' : t.priority === 2 ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'}`}>P{t.priority}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent></Card>

        {/* Calendar Events */}
        <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold flex items-center gap-2"><CalendarDays className="w-4 h-4 text-purple-400" />Upcoming Events</h3>
            <Button variant="ghost" size="sm" className="text-xs text-blue-400" onClick={() => navigate('/calendar')}>View All</Button>
          </div>
          {events.length === 0 ? (
            <div className="text-center py-6 text-gray-500 text-sm">
              <p>No upcoming events. Add one in Calendar!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {events.map(e => (
                <div key={e.id} className="flex items-center gap-3 p-3 bg-[#0f172a] rounded-lg">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${e.event_type === 'deadline' ? 'bg-red-500/10' : e.event_type === 'exam' ? 'bg-purple-500/10' : 'bg-blue-500/10'}`}>
                    {e.event_type === 'deadline' ? <Target className="w-5 h-5 text-red-400" /> : e.event_type === 'exam' ? <BookOpen className="w-5 h-5 text-purple-400" /> : <CalendarDays className="w-5 h-5 text-blue-400" />}
                  </div>
                  <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{e.title}</p>
                    <p className="text-xs text-gray-500">{new Date(e.start_at).toLocaleDateString()} {e.all_day ? '' : new Date(e.start_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p></div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400">{e.event_type}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent></Card>
      </div>

      {/* Recent Notes */}
      <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold flex items-center gap-2"><StickyNote className="w-4 h-4 text-purple-400" />Recent Notes</h3>
          <Button variant="ghost" size="sm" className="text-xs text-blue-400" onClick={() => navigate('/notes')}>View All</Button>
        </div>
        {notes.length === 0 ? (
          <div className="text-center py-6 text-gray-500 text-sm">
            <p>No notes yet. Start writing!</p>
            <Button size="sm" className="mt-2 bg-purple-600" onClick={() => navigate('/notes')}><StickyNote className="w-4 h-4 mr-1" />New Note</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {notes.map(n => (
              <div key={n.id} className="p-4 bg-[#0f172a] rounded-lg hover:bg-[#0f172a]/80 transition-colors cursor-pointer" onClick={() => navigate('/notes')}>
                <p className="text-sm font-medium truncate">{n.title}</p>
                <p className="text-xs text-gray-500 mt-1">{n.visibility} \u00b7 {n.heat_score || 0} pts</p>
              </div>
            ))}
          </div>
        )}
      </CardContent></Card>
    </div>
  );
}
