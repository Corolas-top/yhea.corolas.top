import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import {
  Target, Plus, Trash2, CheckCircle2, Clock, MapPin, GraduationCap
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Planning() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<any[]>([]);
  const [targets, setTargets] = useState<any[]>([]);
  const [unis, setUnis] = useState<any[]>([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [activeTab, setActiveTab] = useState('tasks');

  // Task form
  const [tTitle, setTTitle] = useState('');
  const [tDesc, setTDesc] = useState('');
  const [tType, setTType] = useState('study');
  const [tDue, setTDue] = useState('');
  const [tPriority, setTPriority] = useState(2);

  useEffect(() => { fetchData(); }, [user]);

  const fetchData = async () => {
    if (!user) return;
    // Tasks
    const { data: td } = await supabase.from('tasks').select('*').eq('user_id', user.id).order('due_date', { ascending: true });
    setTasks(td || []);
    // University targets
    const { data: ut } = await supabase.from('student_university_targets').select('*').eq('student_id', user.id).order('priority', { ascending: true });
    setTargets(ut || []);
    // Universities for dropdown
    const { data: ud } = await supabase.from('universities').select('*').eq('is_active', true).order('ranking_qs', { ascending: true }).limit(50);
    setUnis(ud || []);
  };

  const addTask = async () => {
    if (!user || !tTitle.trim()) return;
    await supabase.from('tasks').insert({
      user_id: user.id, title: tTitle.trim(), description: tDesc.trim() || null,
      type: tType, due_date: tDue ? new Date(tDue).toISOString() : null,
      priority: tPriority, status: 'pending',
    });
    setShowTaskForm(false); resetTaskForm(); fetchData();
  };

  const toggleTask = async (id: string, current: string) => {
    const next = current === 'completed' ? 'pending' : 'completed';
    await supabase.from('tasks').update({ status: next, completed_at: next === 'completed' ? new Date().toISOString() : null }).eq('id', id);
    fetchData();
  };

  const deleteTask = async (id: string) => {
    await supabase.from('tasks').delete().eq('id', id);
    fetchData();
  };

  const addTarget = async (uniId: string) => {
    if (!user) return;
    await supabase.from('student_university_targets').insert({ student_id: user.id, university_id: uniId, status: 'targeting', priority: 2 });
    fetchData();
  };

  const removeTarget = async (id: string) => {
    await supabase.from('student_university_targets').delete().eq('id', id);
    fetchData();
  };

  const resetTaskForm = () => { setTTitle(''); setTDesc(''); setTType('study'); setTDue(''); setTPriority(2); };

  const typeColors: Record<string, string> = { study: 'bg-blue-500/10 text-blue-400', assignment: 'bg-amber-500/10 text-amber-400', exam: 'bg-purple-500/10 text-purple-400', application_deadline: 'bg-red-500/10 text-red-400', reminder: 'bg-gray-500/10 text-gray-400' };

  const pendingTasks = tasks.filter(t => t.status !== 'completed');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold flex items-center gap-2"><Target className="w-6 h-6 text-blue-400" />Planning</h2><p className="text-gray-400 mt-1">Tasks, deadlines, and university targets</p></div>
        <Button className="bg-blue-600" onClick={() => setShowTaskForm(true)}><Plus className="w-4 h-4 mr-1" />New Task</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-[#1e293b] border border-white/10"><TabsTrigger value="tasks">Tasks</TabsTrigger><TabsTrigger value="universities">My Universities</TabsTrigger></TabsList>

        <TabsContent value="tasks" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-4">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2"><Clock className="w-4 h-4 text-blue-400" />Pending ({pendingTasks.length})</h3>
              {pendingTasks.length === 0 ? <p className="text-xs text-gray-500 text-center py-4">No pending tasks!</p> : (
                <div className="space-y-2">
                  {pendingTasks.map(t => (
                    <div key={t.id} className="flex items-center gap-2 p-3 bg-[#0f172a] rounded-lg group">
                      <button onClick={() => toggleTask(t.id, t.status)}><CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${t.status === 'completed' ? 'text-emerald-400' : 'text-gray-600 hover:text-emerald-400'}`} /></button>
                      <div className="flex-1 min-w-0"><p className="text-sm font-medium">{t.title}</p>{t.due_date && <p className="text-xs text-gray-500">{new Date(t.due_date).toLocaleDateString()}</p>}</div>
                      <Badge className={`text-[10px] ${typeColors[t.type] || ''}`}>{t.type}</Badge>
                      <button onClick={() => deleteTask(t.id)} className="opacity-0 group-hover:opacity-100 text-red-400 ml-1"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent></Card>
            <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-4">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" />Completed ({completedTasks.length})</h3>
              {completedTasks.length === 0 ? <p className="text-xs text-gray-500 text-center py-4">No completed tasks yet.</p> : (
                <div className="space-y-2">
                  {completedTasks.map(t => (
                    <div key={t.id} className="flex items-center gap-2 p-3 bg-[#0f172a] rounded-lg opacity-60">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <p className="text-sm line-through text-gray-500">{t.title}</p>
                      <button onClick={() => toggleTask(t.id, 'completed')} className="ml-auto text-xs text-blue-400">Undo</button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent></Card>
          </div>
        </TabsContent>

        <TabsContent value="universities" className="mt-4">
          <div className="space-y-4">
            {/* My Targets */}
            <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-4">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2"><GraduationCap className="w-4 h-4 text-blue-400" />My Target Universities ({targets.length})</h3>
              {targets.length === 0 ? <p className="text-xs text-gray-500">No universities added. Search and add below!</p> : (
                <div className="flex flex-wrap gap-2">
                  {targets.map(t => {
                    const uni = unis.find(u => u.id === t.university_id);
                    return uni ? (
                      <div key={t.id} className="flex items-center gap-2 px-3 py-2 bg-[#0f172a] rounded-lg">
                        {uni.logo_url ? <img src={uni.logo_url} className="w-6 h-6 object-contain" /> : <div className="w-6 h-6 rounded bg-blue-600/20 flex items-center justify-center text-xs font-bold">{uni.short_name?.[0]}</div>}
                        <div><p className="text-sm font-medium">{uni.name}</p><p className="text-xs text-gray-500">{uni.country} {uni.ranking_qs ? `\u00b7 QS #${uni.ranking_qs}` : ''}</p></div>
                        <button onClick={() => removeTarget(t.id)} className="ml-2 text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    ) : null;
                  })}
                </div>
              )}
            </CardContent></Card>
            {/* Add Universities */}
            <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-4">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2"><MapPin className="w-4 h-4 text-purple-400" />Add Universities</h3>
              <div className="max-h-64 overflow-y-auto space-y-1">
                {unis.filter(u => !targets.some(t => t.university_id === u.id)).map(u => (
                  <div key={u.id} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg">
                    <div className="flex items-center gap-2">
                      {u.logo_url ? <img src={u.logo_url} className="w-5 h-5 object-contain" /> : <div className="w-5 h-5 rounded bg-blue-600/20 flex items-center justify-center text-[10px] font-bold">{u.short_name?.[0]}</div>}
                      <span className="text-sm">{u.name}</span>
                    </div>
                    <Button size="sm" variant="outline" className="border-white/10 text-xs" onClick={() => addTarget(u.id)}><Plus className="w-3 h-3 mr-1" />Add</Button>
                  </div>
                ))}
              </div>
            </CardContent></Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Task Form */}
      <Dialog open={showTaskForm} onOpenChange={setShowTaskForm}>
        <DialogContent className="bg-[#1e293b] border-white/10 text-white max-w-md">
          <DialogHeader><DialogTitle>New Task</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Task Title *" value={tTitle} onChange={e => setTTitle(e.target.value)} className="bg-[#0f172a] border-white/10" />
            <Textarea placeholder="Description" value={tDesc} onChange={e => setTDesc(e.target.value)} className="bg-[#0f172a] border-white/10" />
            <div><label className="text-xs text-gray-400">Type</label><div className="flex gap-2 mt-1">{['study','assignment','exam','application_deadline','reminder'].map(t => <button key={t} onClick={() => setTType(t)} className={`px-2 py-1 rounded text-xs capitalize ${tType === t ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-[#0f172a] border border-white/10 text-gray-400'}`}>{t}</button>)}</div></div>
            <div><label className="text-xs text-gray-400">Due Date</label><Input type="datetime-local" value={tDue} onChange={e => setTDue(e.target.value)} className="bg-[#0f172a] border-white/10" /></div>
            <div><label className="text-xs text-gray-400">Priority</label><div className="flex gap-2 mt-1">{[1,2,3].map(p => <button key={p} onClick={() => setTPriority(p)} className={`px-3 py-1 rounded text-xs ${tPriority === p ? 'bg-red-600/20 text-red-400 border border-red-500/30' : 'bg-[#0f172a] border border-white/10 text-gray-400'}`}>P{p}</button>)}</div></div>
            <Button className="w-full bg-blue-600" onClick={addTask} disabled={!tTitle.trim()}><Plus className="w-4 h-4 mr-1" />Create Task</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
