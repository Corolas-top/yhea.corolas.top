import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { FileEdit, Plus, Save, Trash2, Clock, BookOpen, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

export default function Essays() {
  const { user } = useAuth();
  const [essays, setEssays] = useState<any[]>([]);
  const [, setLoading] = useState(true);
  const [systems, setSystems] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [content, setContent] = useState('');
  const [systemId, setSystemId] = useState('');

  useEffect(() => { fetchData(); }, [user]);

  const fetchData = async () => {
    setLoading(true);
    setLoading(true);
    if (!user) return;
    const { data: e } = await supabase.from('essays').select('*').eq('user_id', user.id).order('updated_at', { ascending: false });
    setEssays(e || []);
    const { data: s } = await supabase.from('application_systems').select('*').eq('is_active', true);
    setSystems(s || []);
  };

  const handleSave = async () => {
    if (!user || !title.trim()) return;
    const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
    const payload = { user_id: user.id, title: title.trim(), prompt: prompt.trim() || null, content: content.trim(), word_count: wordCount, system_id: systemId || null, status: 'draft' as const };
    if (editingId) {
      await supabase.from('essays').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', editingId);
    } else {
      await supabase.from('essays').insert(payload);
    }
    setShowForm(false); setEditingId(null); resetForm(); fetchData();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('essays').delete().eq('id', id);
    fetchData();
  };

  const openEditor = (essay?: any) => {
    if (essay) {
      setEditingId(essay.id); setTitle(essay.title); setPrompt(essay.prompt || ''); setContent(essay.content || ''); setSystemId(essay.system_id || '');
    } else { resetForm(); setEditingId(null); }
    setShowForm(true);
  };

  const resetForm = () => { setTitle(''); setPrompt(''); setContent(''); setSystemId(''); };

  const statusColors: Record<string, string> = { draft: 'bg-gray-500/10 text-gray-400', reviewing: 'bg-amber-500/10 text-amber-400', final: 'bg-emerald-500/10 text-emerald-400' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold flex items-center gap-2"><FileEdit className="w-6 h-6 text-blue-400" />Essays</h2><p className="text-gray-400 mt-1">Write and manage application essays</p></div>
        <Button className="bg-blue-600" onClick={() => openEditor()}><Plus className="w-4 h-4 mr-1" />New Essay</Button>
      </div>

      {essays.length === 0 ? (
        <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-8 text-center text-gray-500">
          <FileEdit className="w-12 h-12 mx-auto mb-3 opacity-30" /><p>No essays yet. Start writing!</p>
          <Button size="sm" className="mt-3 bg-blue-600" onClick={() => openEditor()}><Plus className="w-4 h-4 mr-1" />Create Essay</Button>
        </CardContent></Card>
      ) : (
        <div className="space-y-3">
          {essays.map(e => (
            <Card key={e.id} className="bg-[#1e293b] border-white/10 hover:border-blue-500/30 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => openEditor(e)}>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{e.title}</p>
                      <Badge className={`text-[10px] ${statusColors[e.status] || ''}`}>{e.status}</Badge>
                    </div>
                    {e.prompt && <p className="text-xs text-gray-500 mt-1 italic">"{e.prompt.slice(0, 100)}{e.prompt.length > 100 ? '...' : ''}"</p>}
                    <p className="text-xs text-gray-400 mt-1">{e.content?.slice(0, 150) || 'No content'}...</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{e.word_count || 0} words</span>
                      {systems.find(s => s.id === e.system_id)?.name && <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{systems.find(s => s.id === e.system_id)?.name}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-2">
                    <button onClick={() => openEditor(e)} className="p-1.5 hover:bg-white/5 rounded text-blue-400"><FileEdit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(e.id)} className="p-1.5 hover:bg-white/5 rounded text-red-400"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Editor Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="bg-[#1e293b] border-white/10 text-white max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editingId ? 'Edit Essay' : 'New Essay'}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Essay Title *" value={title} onChange={e => setTitle(e.target.value)} className="bg-[#0f172a] border-white/10" />
            <Textarea placeholder="Prompt (copy from application)" value={prompt} onChange={e => setPrompt(e.target.value)} className="bg-[#0f172a] border-white/10 min-h-[60px]" />
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Application System</label>
              <select value={systemId} onChange={e => setSystemId(e.target.value)} className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300">
                <option value="">None</option>
                {systems.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <Textarea placeholder="Write your essay here..." value={content} onChange={e => setContent(e.target.value)} className="bg-[#0f172a] border-white/10 min-h-[300px]" />
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">{(content.trim() ? content.trim().split(/\s+/).length : 0)} words</p>
              <div className="flex gap-2">
                <Button variant="outline" className="border-white/10" onClick={() => { setShowForm(false); resetForm(); }}><X className="w-4 h-4" /></Button>
                <Button className="bg-blue-600" onClick={handleSave} disabled={!title.trim()}><Save className="w-4 h-4 mr-1" />Save</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
