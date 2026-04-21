import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useCourses, useTasks, usePoints, useChat, useNotes } from '@/hooks/useStore';
import {
  Sparkles, BookOpen, Compass, StickyNote, Trophy,
  Flame, ArrowRight, Zap,
  Calendar, CheckCircle2, Circle, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { courses } = useCourses();
  const { tasks } = useTasks();
  const { balance, quota } = usePoints();
  const { sessions } = useChat();
  const { notes } = useNotes();

  const activeCourses = courses.filter(c => c.is_active);
  const pendingTasks = tasks.filter(t => t.status === 'pending' || t.status === 'in_progress');
  const completedToday = tasks.filter(t => t.status === 'completed').length;
  const myNotes = notes.filter(n => n.author_id === 'demo');

  const quickActions = [
    { label: 'Ask Yhea', icon: Sparkles, path: '/agent', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
    { label: 'Continue Learning', icon: BookOpen, path: '/learning', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
    { label: 'Plan My Future', icon: Compass, path: '/planning', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
    { label: 'Write Note', icon: StickyNote, path: '/notes', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold">Welcome back, {user?.name || 'Learner'}! 👋</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Here's your learning dashboard for today.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center"><Zap className="w-5 h-5 text-blue-600" /></div>
            <div><p className="text-2xl font-bold">{quota.base_remaining}</p><p className="text-xs text-gray-500">AI Chats Left</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center"><Trophy className="w-5 h-5 text-amber-600" /></div>
            <div><p className="text-2xl font-bold">{balance.balance}</p><p className="text-xs text-gray-500">YC Balance</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-green-600" /></div>
            <div><p className="text-2xl font-bold">{completedToday}/{tasks.length}</p><p className="text-xs text-gray-500">Tasks Done</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center"><Flame className="w-5 h-5 text-purple-600" /></div>
            <div><p className="text-2xl font-bold">3</p><p className="text-xs text-gray-500">Day Streak</p></div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map(a => (
          <button key={a.label} onClick={() => navigate(a.path)} className={`flex items-center gap-3 p-4 rounded-xl ${a.color} hover:opacity-80 transition-opacity text-left`}>
            <a.icon className="w-6 h-6" />
            <span className="font-medium text-sm">{a.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Courses */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2"><BookOpen className="w-5 h-5" /> My Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeCourses.map(c => (
                <div key={c.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium">{c.full_name}</p>
                    <p className="text-xs text-gray-500">{c.total_units} units · {c.estimated_hours}h total</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-medium">Unit 1 of {c.total_units}</p>
                      <Progress value={10} className="w-24 h-2 mt-1" />
                    </div>
                    <Button size="sm" variant="outline" onClick={() => navigate(`/learning`)}>Continue</Button>
                  </div>
                </div>
              ))}
              {activeCourses.length === 0 && <p className="text-gray-500 text-sm">No active courses. Add one to get started!</p>}
            </div>
          </CardContent>
        </Card>

        {/* Tasks */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2"><Calendar className="w-5 h-5" /> Today's Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pendingTasks.slice(0, 5).map(t => (
                <div key={t.id} className="flex items-start gap-2 text-sm">
                  {t.status === 'completed' ? <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> :
                   t.status === 'in_progress' ? <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5" /> :
                   <Circle className="w-4 h-4 text-gray-400 mt-0.5" />}
                  <span className={t.status === 'completed' ? 'line-through text-gray-400' : ''}>{t.title}</span>
                </div>
              ))}
              {pendingTasks.length === 0 && <p className="text-gray-500 text-sm">All caught up! 🎉</p>}
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-3" onClick={() => navigate('/tasks')}>
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2"><Sparkles className="w-5 h-5" /> Recent Chats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sessions.slice(0, 4).map(s => (
                <button key={s.id} onClick={() => navigate(`/agent/${s.id}`)} className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg text-left transition-colors">
                  <div>
                    <p className="font-medium text-sm">{s.title}</p>
                    <p className="text-xs text-gray-500">{s.message_count} messages · {s.subject}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2"><StickyNote className="w-5 h-5" /> My Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {myNotes.slice(0, 4).map(n => (
                <div key={n.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{n.title}</p>
                    <p className="text-xs text-gray-500">{n.visibility} · {n.heat_score > 0 ? `${n.heat_score} heat` : 'draft'}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-3" onClick={() => navigate('/notes')}>
              All Notes <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
