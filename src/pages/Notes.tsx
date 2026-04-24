import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { StickyNote, Plus, Save, Trash2, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

function renderLatex(text: string) {
  if (!text) return '';
  return text
    .replace(/\\$(.+?)\\$/g, '<span class="latex-inline">$1</span>')
    .replace(/\$\$(.+?)\$\$/g, '<div class="latex-block">$1</div>')
    .replace(/\$(.+?)\$/g, '<span class="latex-inline">$1</span>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

export default function Notes() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [vis, setVis] = useState<'private' | 'published'>('private');

  useEffect(() => { if (user) fetchNotes(); }, [user]);

  const fetchNotes = async () => {
    const { data } = await supabase.from('notes').select('*').eq('author_id', user!.id).order('updated_at', { ascending: false });
    setNotes(data || []);
  };

  const saveNote = async () => {
    if (!user || !title.trim()) return;
    await supabase.from('notes').insert({ author_id: user.id, title: title.trim(), content: content.trim(), content_html: renderLatex(content), visibility: vis, heat_score: 0, likes_count: 0, comments_count: 0, bookmarks_count: 0, views_count: 0 });
    setShowForm(false); setTitle(''); setContent(''); fetchNotes();
  };

  const toggleVis = async (id: string, v: string) => {
    const next = v === 'published' ? 'private' : 'published';
    await supabase.from('notes').update({ visibility: next, published_at: next === 'published' ? new Date().toISOString() : null }).eq('id', id);
    fetchNotes();
  };

  const deleteNote = async (id: string) => { await supabase.from('notes').delete().eq('id', id); fetchNotes(); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold flex items-center gap-2"><StickyNote className="w-6 h-6 text-purple-400" />Notes</h2><p className="text-gray-400 mt-1 text-sm">Supports Markdown & LaTeX ($...$)</p></div>
        <Button size="sm" className="bg-purple-600" onClick={() => setShowForm(true)}><Plus className="w-4 h-4 mr-1" />New</Button>
      </div>
      {notes.length === 0 ? <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-8 text-center text-gray-500">No notes yet.</CardContent></Card> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {notes.map(n => (
            <Card key={n.id} className="bg-[#1e293b] border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{n.title}</p>
                  <div className="flex gap-1">
                    <button onClick={() => toggleVis(n.id, n.visibility)} className="p-1 hover:bg-white/5 rounded">{n.visibility === 'published' ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4 text-gray-500" />}</button>
                    <button onClick={() => deleteNote(n.id)} className="p-1 hover:bg-white/5 rounded text-red-400"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                {n.content && <p className="text-xs text-gray-500 mt-2 line-clamp-3">{n.content.slice(0, 150)}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="bg-[#1e293b] border-white/10 text-white max-w-2xl">
          <DialogHeader><DialogTitle>New Note</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="bg-[#0f172a] border-white/10" />
            <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Supports **bold**, *italic*, $LaTeX$" className="w-full bg-[#0f172a] border border-white/10 rounded-lg p-3 text-sm min-h-[200px] text-gray-200" />
            <div className="flex gap-2">
              <button onClick={() => setVis('private')} className={`px-3 py-1 rounded text-xs ${vis === 'private' ? 'bg-blue-600/20 text-blue-400' : 'text-gray-500'}`}>Private</button>
              <button onClick={() => setVis('published')} className={`px-3 py-1 rounded text-xs ${vis === 'published' ? 'bg-emerald-600/20 text-emerald-400' : 'text-gray-500'}`}>Publish</button>
            </div>
            <Button className="w-full bg-purple-600" onClick={saveNote} disabled={!title.trim()}><Save className="w-4 h-4 mr-1" />Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
