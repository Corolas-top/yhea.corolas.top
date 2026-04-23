import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { CheckSquare, Plus, Trash2, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

export default function Tasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');

  // Form
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState('study');
  const [due, setDue] = useState('');
  const [priority, setPriority] = useState(2);

  useEffect(() => { fetchTasks(); }, [user]);

  const fetchTasks = async () => {
    if (!user) return;
    const { data } = await supabase.from('tasks').select('*').eq('user_id', user.id).order('due_date', { ascending: true });
    setTasks(data || []);
  };

  const addTask = async () => {
    if (!user || !title.trim()) return;
    await supabase.from('tasks').insert({
      user_id: user.id, title: title.trim(), description: desc.trim() || null,
      type, due_date: due ? new Date(due).toISOString() : null, priority, status: 'pending',
    });
    setShowForm(false); resetForm(); fetchTasks();
  };

  const toggleTask = async (id: string, current: string) => {
    const next = current === 'completed' ? 'pending' : 'completed';
    await supabase.from('tasks').update({ status: next, completed_at: next === 'completed' ? new Date().toISOString() : null }).eq('id', id);
    fetchTasks();
  };

  const deleteTask = async (id: string) => {
    await supabase.from('tasks').delete().eq('id', id);
    fetchTasks();
  };

  const resetForm = () => { setTitle(''); setDesc(''); setType('study'); setDue(''); setPriority(2); };

  const filtered = filter === 'all' ? tasks : filter === 'pending' ? tasks.filter(t => t.status !== 'completed') : tasks.filter(t => t.status === 'completed');
  const overdue = tasks.filter(t => t.status !== 'completed' && t.due_date && new Date(t.due_date) < new Date());

  const typeColors: Record<string, string> = { study: 'bg-blue-500/10 text-blue-400', assignment: 'bg-amber-500/10 text-amber-400', exam: 'bg-purple-500/10 text-purple-400', application_deadline: 'bg-red-500/10 text-red-400', reminder: 'bg-gray-500/10 text-gray-400' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold flex items-center gap-2"><CheckSquare className="w-6 h-6 text-blue-400" />Tasks</h2><p className="text-gray-400 mt-1">Manage all your tasks and deadlines</p></div>
        <Button className="bg-blue-600" onClick={() => setShowForm(true)}><Plus className="w-4 h-4 mr-1" />New Task</Button>
      </div>

      {overdue.length > 0 && (
        <Card className="bg-red-500/5 border-red-500/20"><CardContent className="p-3 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-400" /><p className="text-sm text-red-400">{overdue.length} overdue task{overdue.length > 1 ? 's' : ''}</p>
        </CardContent></Card>
      )}

      <div className="flex gap-2">
        {['all','pending','completed'].map(f => <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 rounded-lg text-xs capitalize ${filter === f ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-[#1e293b] border border-white/10 text-gray-400'}`}>{f} ({f === 'all' ? tasks.length : f === 'pending' ? tasks.filter(t => t.status !== 'completed').length : tasks.filter(t => t.status === 'completed').length})</button>)}
      </div>

      {filtered.length === 0 ? (
        <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-8 text-center text-gray-500">No tasks.</CardContent></Card>
      ) : (
        <div className="space-y-2">
          {filtered.map(t => (
            <Card key={t.id} className={`bg-[#1e293b] border-white/10 ${t.status === 'completed' ? 'opacity-60' : ''}`}>
              <CardContent className="p-3 flex items-center gap-3">
                <button onClick={() => toggleTask(t.id, t.status)}><CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${t.status === 'completed' ? 'text-emerald-400' : 'text-gray-600 hover:text-emerald-400'}`} /></button>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${t.status === 'completed' ? 'line-through text-gray-500' : ''}`}>{t.title}</p>
                  {t.description && <p className="text-xs text-gray-500">{t.description}</p>}
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={`text-[10px] ${typeColors[t.type] || ''}`}>{t.type}</Badge>
                    {t.due_date && <span className={`text-xs flex items-center gap-1 ${new Date(t.due_date) < new Date() && t.status !== 'completed' ? 'text-red-400' : 'text-gray-500'}`}><Clock className="w-3 h-3" />{new Date(t.due_date).toLocaleDateString()}</span>}
                    <span className="text-xs text-gray-500">P{t.priority}</span>
                  </div>
                </div>
                <button onClick={() => deleteTask(t.id)} className="text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="bg-[#1e293b] border-white/10 text-white max-w-md">
          <DialogHeader><DialogTitle>New Task</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Title *" value={title} onChange={e => setTitle(e.target.value)} className="bg-[#0f172a] border-white/10" />
            <Textarea placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} className="bg-[#0f172a] border-white/10" />
            <div><label className="text-xs text-gray-400">Type</label><div className="flex gap-1 mt-1">{['study','assignment','exam','application_deadline','reminder'].map(t => <button key={t} onClick={() => setType(t)} className={`px-2 py-1 rounded text-xs capitalize ${type === t ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-[#0f172a] border border-white/10 text-gray-400'}`}>{t}</button>)}</div></div>
            <Input type="datetime-local" value={due} onChange={e => setDue(e.target.value)} className="bg-[#0f172a] border-white/10" />
            <div><label className="text-xs text-gray-400">Priority</label><div className="flex gap-1 mt-1">{[1,2,3].map(p => <button key={p} onClick={() => setPriority(p)} className={`px-3 py-1 rounded text-xs ${priority === p ? 'bg-red-600/20 text-red-400 border border-red-500/30' : 'bg-[#0f172a] border border-white/10 text-gray-400'}`}>P{p}</button>)}</div></div>
            <Button className="w-full bg-blue-600" onClick={addTask} disabled={!title.trim()}><Plus className="w-4 h-4 mr-1" />Create</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
