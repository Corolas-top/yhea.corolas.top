import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { FileEdit, Plus, Save, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const SYSTEM_SLUGS: Record<string, { name: string; questions: string[] }> = {
  'common-app': { name: 'Common App', questions: ['Personal Essay (650 words max)'] },
  'ucas': { name: 'UCAS', questions: ['Why this course?', 'How qualifications prepared you?', 'What else have you done?'] },
  'uc': { name: 'UC Application', questions: ['PIQ 1', 'PIQ 2', 'PIQ 3', 'PIQ 4'] },
  'mit': { name: 'MIT', questions: ['Essay 1', 'Essay 2', 'Essay 3', 'Essay 4', 'Essay 5'] },
  'other': { name: 'Other', questions: ['Custom Essay'] },
};

export default function Essays() {
  const { user } = useAuth();
  const [essays, setEssays] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selSystem, setSelSystem] = useState('common-app');
  const [selQ, setSelQ] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => { if (user) fetchEssays(); }, [user]);

  const fetchEssays = async () => {
    const { data } = await supabase.from('essays').select('*').eq('user_id', user!.id).order('updated_at', { ascending: false });
    setEssays(data || []);
  };

  const saveEssay = async () => {
    if (!user || !title.trim()) return;
    const sys = SYSTEM_SLUGS[selSystem];
    await supabase.from('essays').insert({
      user_id: user.id, system_slug: selSystem, title: title.trim(),
      prompt: sys.questions[selQ], content: content.trim(),
      word_count: content.trim() ? content.trim().split(/\s+/).length : 0, status: 'draft'
    });
    setShowForm(false); setTitle(''); setContent(''); fetchEssays();
  };

  const deleteEssay = async (id: string) => { await supabase.from('essays').delete().eq('id', id); fetchEssays(); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold flex items-center gap-2"><FileEdit className="w-6 h-6 text-blue-400" />My Application Essays</h2></div>
        <Button size="sm" className="bg-blue-600" onClick={() => setShowForm(true)}><Plus className="w-4 h-4 mr-1" />New</Button>
      </div>
      {essays.length === 0 ? <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-8 text-center text-gray-500">No essays yet. Start writing!</CardContent></Card> : (
        <div className="space-y-2">
          {essays.map(e => (
            <Card key={e.id} className="bg-[#1e293b] border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{e.title}</p>
                    <p className="text-xs text-gray-500">{e.system_slug} · {e.word_count || 0} words · {e.status}</p>
                    {e.prompt && <p className="text-xs text-gray-400 italic mt-1">{e.prompt}</p>}
                  </div>
                  <button onClick={() => deleteEssay(e.id)} className="text-red-400"><Trash2 className="w-4 h-4" /></button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="bg-[#1e293b] border-white/10 text-white max-w-lg">
          <DialogHeader><DialogTitle>New Essay</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <select value={selSystem} onChange={e => { setSelSystem(e.target.value); setSelQ(0); }} className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-3 py-2 text-sm">
              {Object.entries(SYSTEM_SLUGS).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
            </select>
            <select value={selQ} onChange={e => setSelQ(parseInt(e.target.value))} className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-3 py-2 text-sm">
              {SYSTEM_SLUGS[selSystem].questions.map((q, i) => <option key={i} value={i}>{q}</option>)}
            </select>
            <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="bg-[#0f172a] border-white/10" />
            <Textarea placeholder="Write your essay..." value={content} onChange={e => setContent(e.target.value)} className="bg-[#0f172a] border-white/10 min-h-[200px]" />
            <p className="text-xs text-gray-500">{(content.trim() ? content.trim().split(/\s+/).length : 0)} words</p>
            <Button className="w-full bg-blue-600" onClick={saveEssay} disabled={!title.trim()}><Save className="w-4 h-4 mr-1" />Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
