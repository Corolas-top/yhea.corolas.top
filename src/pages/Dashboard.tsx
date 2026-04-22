import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Bot, BookOpen, Target, StickyNote, Trophy, Zap, CalendarDays, CheckCircle2, Circle, Flame, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const quickActions = [
    { label: 'Ask Agent', icon: Bot, path: '/agent', desc: 'Get help from AI', color: 'bg-blue-600/20 text-blue-400 border-blue-500/20' },
    { label: 'Continue Learning', icon: BookOpen, path: '/learning', desc: 'Your courses', color: 'bg-emerald-600/20 text-emerald-400 border-emerald-500/20' },
    { label: 'Check Plan', icon: Target, path: '/planning', desc: 'Your roadmap', color: 'bg-purple-600/20 text-purple-400 border-purple-500/20' },
    { label: 'Write Note', icon: StickyNote, path: '/notes', desc: '+5 YC', color: 'bg-amber-600/20 text-amber-400 border-amber-500/20' },
  ];

  const tasks = [
    { title: 'Study Unit 1.2: Defining Limits', done: false, type: 'study' },
    { title: 'Review Chain Rule exercises', done: true, type: 'study' },
    { title: 'SAT Registration Deadline', done: false, type: 'deadline' },
    { title: 'Write Physics Lab Report', done: false, type: 'assignment' },
  ];

  const sessions = [
    { title: 'Chain Rule Help', agent: 'Teaching', messages: 8 },
    { title: 'US Application Strategy', agent: 'Planning', messages: 5 },
    { title: 'Integration by Parts', agent: 'Teaching', messages: 12 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Welcome back, {user?.name || 'Learner'}! 👋</h2>
        <p className="text-gray-400 mt-1">Here is your learning dashboard for today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: Zap, label: 'AI Chats Left', value: '7' },
          { icon: Trophy, label: 'YC Balance', value: '128' },
          { icon: CheckCircle2, label: 'Tasks Done', value: '1/4' },
          { icon: Flame, label: 'Day Streak', value: '3' },
        ].map(s => (
          <Card key={s.label} className="bg-[#1e293b] border-white/10"><CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center"><s.icon className="w-5 h-5 text-blue-400" /></div>
            <div><p className="text-2xl font-bold">{s.value}</p><p className="text-xs text-gray-400">{s.label}</p></div>
          </CardContent></Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map(a => (
          <button key={a.label} onClick={() => navigate(a.path)} className={`flex items-center gap-3 p-4 rounded-xl border ${a.color} hover:opacity-80 transition-opacity text-left`}>
            <a.icon className="w-5 h-5" /><div><p className="font-medium text-sm">{a.label}</p><p className="text-xs opacity-70">{a.desc}</p></div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Tasks */}
        <Card className="bg-[#1e293b] border-white/10 lg:col-span-1">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3"><h3 className="font-semibold flex items-center gap-2"><CalendarDays className="w-4 h-4 text-blue-400" />Today</h3><span className="text-xs text-gray-400">25% done</span></div>
            <Progress value={25} className="h-1.5 mb-3 bg-white/5" />
            <div className="space-y-2">
              {tasks.map(t => (
                <div key={t.title} className="flex items-start gap-2 text-sm">
                  {t.done ? <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" /> : <Circle className="w-4 h-4 text-gray-600 mt-0.5" />}
                  <span className={t.done ? 'line-through text-gray-500' : 'text-gray-300'}>{t.title}</span>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-3 text-xs text-gray-400 hover:text-white" onClick={() => navigate('/planning')}>View all</Button>
          </CardContent>
        </Card>

        {/* Recent Chats */}
        <Card className="bg-[#1e293b] border-white/10 lg:col-span-1">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2"><Bot className="w-4 h-4 text-purple-400" />Recent Chats</h3>
            <div className="space-y-2">
              {sessions.map(s => (
                <button key={s.title} onClick={() => navigate('/agent')} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors text-left">
                  <div><p className="text-sm font-medium text-gray-300">{s.title}</p><p className="text-xs text-gray-500">{s.agent} · {s.messages} msgs</p></div>
                  <TrendingUp className="w-4 h-4 text-gray-600" />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Calendar Preview */}
        <Card className="bg-[#1e293b] border-white/10 lg:col-span-1">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2"><CalendarDays className="w-4 h-4 text-amber-400" />This Week</h3>
            <div className="space-y-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
                <div key={day} className={`flex items-center gap-3 p-2 rounded-lg ${i === 0 ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-white/5'}`}>
                  <span className="text-xs font-bold text-gray-500 w-8">{day}</span>
                  <div className="flex-1">
                    {i === 0 && <p className="text-xs text-blue-300">Chain Rule Study</p>}
                    {i === 2 && <p className="text-xs text-gray-400">SAT Mock Test</p>}
                    {i === 4 && <p className="text-xs text-gray-400">IA Draft Due</p>}
                    {i !== 0 && i !== 2 && i !== 4 && <p className="text-xs text-gray-600">No events</p>}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-3 text-xs text-gray-400 hover:text-white" onClick={() => navigate('/calendar')}>Full calendar</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
