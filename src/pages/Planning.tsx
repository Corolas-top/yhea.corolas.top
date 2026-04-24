import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Target, Plus, CheckCircle2, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Planning() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<any[]>([]);
  const [logics, setLogics] = useState<any>(null);
  const [showTask, setShowTask] = useState(false);
  const [tTitle, setTTitle] = useState('');
  const [tDue, setTDue] = useState('');
  const [tType, setTType] = useState('study');

  useEffect(() => { if (user) fetchData(); }, [user]);

  const fetchData = async () => {
    const { data: td } = await supabase.from('tasks').select('*').eq('user_id', user!.id).order('due_date', { ascending: true });
    setTasks(td || []);
    const { data: ld } = await supabase.from('planning_logics').select('*').eq('user_id', user!.id).single();
    setLogics(ld);
  };

  const addTask = async () => {
    if (!user || !tTitle.trim()) return;
    await supabase.from('tasks').insert({ user_id: user.id, title: tTitle.trim(), type: tType, due_date: tDue ? new Date(tDue).toISOString() : null, status: 'pending', priority: 2 });
    setShowTask(false); setTTitle(''); setTDue(''); setTType('study'); fetchData();
  };

  const toggleTask = async (id: string, st: string) => {
    const next = st === 'completed' ? 'pending' : 'completed';
    await supabase.from('tasks').update({ status: next, completed_at: next === 'completed' ? new Date().toISOString() : null }).eq('id', id);
    fetchData();
  };

  const deleteTask = async (id: string) => { await supabase.from('tasks').delete().eq('id', id); fetchData(); };

  const pending = tasks.filter(t => t.status !== 'completed');
  const completed = tasks.filter(t => t.status === 'completed');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold flex items-center gap-2"><Target className="w-6 h-6 text-blue-400" />Planning</h2></div>
        <Button size="sm" className="bg-blue-600" onClick={() => setShowTask(true)}><Plus className="w-4 h-4 mr-1" />Task</Button>
      </div>

      <Tabs defaultValue="timeline">
        <TabsList className="bg-[#1e293b] border border-white/10"><TabsTrigger value="timeline">Timeline</TabsTrigger><TabsTrigger value="logics">Logics</TabsTrigger></TabsList>
        <TabsContent value="timeline" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-4">
              <h3 className="font-bold text-sm mb-3">Pending ({pending.length})</h3>
              {pending.length === 0 ? <p className="text-xs text-gray-500">All caught up!</p> : <div className="space-y-2">
                {pending.map(t => <div key={t.id} className="flex items-center gap-2 p-3 bg-[#0f172a] rounded-lg">
                  <button onClick={() => toggleTask(t.id, t.status)}><CheckCircle2 className="w-5 h-5 text-gray-600 hover:text-emerald-400" /></button>
                  <div className="flex-1 min-w-0"><p className="text-sm font-medium">{t.title}</p>{t.due_date && <p className="text-xs text-gray-500">{new Date(t.due_date).toLocaleDateString()}</p>}</div>
                  <button onClick={() => deleteTask(t.id)} className="text-red-400"><Trash2 className="w-4 h-4" /></button>
                </div>)}
              </div>}
            </CardContent></Card>
            <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-4">
              <h3 className="font-bold text-sm mb-3 text-emerald-400">Completed ({completed.length})</h3>
              {completed.length === 0 ? <p className="text-xs text-gray-500">None yet.</p> : <div className="space-y-2">
                {completed.map(t => <div key={t.id} className="flex items-center gap-2 p-3 bg-[#0f172a] rounded-lg opacity-60">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" /><p className="text-sm line-through text-gray-500">{t.title}</p>
                  <button onClick={() => toggleTask(t.id, 'completed')} className="ml-auto text-xs text-blue-400">Undo</button>
                </div>)}
              </div>}
            </CardContent></Card>
          </div>
          {showTask && <div className="mt-4 p-4 bg-[#1e293b] border border-white/10 rounded-lg space-y-2">
            <Input placeholder="Task title" value={tTitle} onChange={e => setTTitle(e.target.value)} className="bg-[#0f172a] border-white/10" />
            <div className="flex gap-2"><Input type="datetime-local" value={tDue} onChange={e => setTDue(e.target.value)} className="bg-[#0f172a] border-white/10" />
            <Button size="sm" className="bg-blue-600" onClick={addTask} disabled={!tTitle.trim()}>Add</Button></div>
          </div>}
        </TabsContent>
        <TabsContent value="logics" className="mt-4">
          {logics ? <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-4 space-y-3">
            {logics.persona && <div><p className="text-xs text-gray-500">Persona</p><p className="text-sm">{logics.persona}</p></div>}
            {logics.strengths && (logics.strengths as string[]).length > 0 && <div><p className="text-xs text-gray-500">Strengths</p><div className="flex flex-wrap gap-1">{(logics.strengths as string[]).map((s: string) => <span key={s} className="text-xs px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full">{s}</span>)}</div></div>}
            {logics.strategy && <div><p className="text-xs text-gray-500">Strategy</p><p className="text-sm">{logics.strategy}</p></div>}
          </CardContent></Card> : <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-8 text-center text-gray-500">No planning logics yet. Use Admission Advisor to generate one!</CardContent></Card>}
        </TabsContent>
      </Tabs>
    </div>
  );
}
