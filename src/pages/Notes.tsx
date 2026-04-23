import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import {
  StickyNote, Plus, Save, Trash2, Eye, EyeOff, X, Bookmark, Heart, MessageSquare
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Notes() {
  const { user } = useAuth();
  const [myNotes, setMyNotes] = useState<any[]>([]);
  const [publishedNotes, setPublishedNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('my');

  // Create/Edit state
  const [showEditor, setShowEditor] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [visibility, setVisibility] = useState<'private' | 'published'>('private');
  const [tags, setTags] = useState('');

  const fetchNotes = async () => {
    if (!user) return;
    setLoading(true);
    // My notes
    const { data: my } = await supabase.from('notes').select('*').eq('author_id', user.id).order('updated_at', { ascending: false });
    setMyNotes(my || []);
    // Published notes (Plaza)
    const { data: pub } = await supabase.from('notes').select('*, author:users(name, avatar_url)').eq('visibility', 'published').order('heat_score', { ascending: false }).limit(20);
    setPublishedNotes(pub || []);
    setLoading(false);
  };

  useEffect(() => { fetchNotes(); }, [user]);

  const handleSave = async () => {
    if (!user || !title.trim()) return;
    const payload = {
      author_id: user.id,
      title: title.trim(),
      content_text: content.trim(),
      content_json: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: content }] }] },
      visibility,
      topic_tags: tags.split(',').map((t: string) => t.trim()).filter(Boolean),
      source_type: 'manual',
    };

    if (editingId) {
      await supabase.from('notes').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', editingId);
    } else {
      await supabase.from('notes').insert({ ...payload, heat_score: 0, likes_count: 0, comments_count: 0, bookmarks_count: 0, views_count: 0 });
    }
    setShowEditor(false); setEditingId(null); resetForm(); fetchNotes();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('notes').delete().eq('id', id);
    fetchNotes();
  };

  const handleToggleVisibility = async (id: string, current: string) => {
    const next = current === 'published' ? 'private' : 'published';
    const updates: any = { visibility: next };
    if (next === 'published') updates.published_at = new Date().toISOString();
    await supabase.from('notes').update(updates).eq('id', id);
    fetchNotes();
  };

  const handleInteract = async (noteId: string, type: 'like' | 'bookmark') => {
    if (!user) return;
    // Check if already interacted
    const { data: existing } = await supabase.from('note_interactions').select('id').eq('note_id', noteId).eq('user_id', user.id).eq('type', type).single();
    if (existing) {
      await supabase.from('note_interactions').delete().eq('id', existing.id);
    } else {
      await supabase.from('note_interactions').insert({ note_id: noteId, user_id: user.id, type });
    }
    fetchNotes();
  };

  const resetForm = () => { setTitle(''); setContent(''); setVisibility('private'); setTags(''); };

  const openEditor = (note?: any) => {
    if (note) { setEditingId(note.id); setTitle(note.title); setContent(note.content_text || ''); setVisibility(note.visibility); setTags((note.topic_tags || []).join(', ')); }
    else { resetForm(); setEditingId(null); }
    setShowEditor(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold flex items-center gap-2"><StickyNote className="w-6 h-6 text-purple-400" />Notes</h2><p className="text-gray-400 mt-1">Write, publish, and earn points</p></div>
        <Button className="bg-purple-600" onClick={() => openEditor()}><Plus className="w-4 h-4 mr-1" />New Note</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-[#1e293b] border border-white/10">
          <TabsTrigger value="my">My Notes ({myNotes.length})</TabsTrigger>
          <TabsTrigger value="plaza">Plaza ({publishedNotes.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="my" className="mt-4">
          {loading ? <p className="text-gray-500">Loading...</p> : myNotes.length === 0 ? (
            <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-8 text-center text-gray-500">
              <StickyNote className="w-12 h-12 mx-auto mb-3 opacity-30" /><p>No notes yet. Start writing!</p>
              <Button size="sm" className="mt-3 bg-purple-600" onClick={() => openEditor()}><Plus className="w-4 h-4 mr-1" />Create Note</Button>
            </CardContent></Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {myNotes.map(n => (
                <Card key={n.id} className="bg-[#1e293b] border-white/10 hover:border-purple-500/30 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0 cursor-pointer" onClick={() => openEditor(n)}>
                        <p className="font-medium truncate">{n.title}</p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{n.content_text?.slice(0, 100) || 'No content'}</p>
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        <button onClick={() => handleToggleVisibility(n.id, n.visibility)} className="p-1 hover:bg-white/5 rounded">
                          {n.visibility === 'published' ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4 text-gray-500" />}
                        </button>
                        <button onClick={() => handleDelete(n.id)} className="p-1 hover:bg-white/5 rounded text-red-400"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-[10px]">{n.visibility}</Badge>
                      {n.topic_tags?.map((t: string) => <Badge key={t} className="text-[10px] bg-purple-500/10 text-purple-400">{t}</Badge>)}
                      <span className="text-xs text-gray-500 ml-auto">{n.heat_score || 0} pts</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="plaza" className="mt-4">
          {publishedNotes.length === 0 ? (
            <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-8 text-center text-gray-500">
              <Heart className="w-12 h-12 mx-auto mb-3 opacity-30" /><p>No published notes yet. Be the first!</p>
            </CardContent></Card>
          ) : (
            <div className="space-y-3">
              {publishedNotes.map(n => (
                <Card key={n.id} className="bg-[#1e293b] border-white/10 hover:border-purple-500/30 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold flex-shrink-0">{(n.author?.name || 'Y')[0]}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{n.title}</p>
                        <p className="text-sm text-gray-400 mt-1 line-clamp-3">{n.content_text?.slice(0, 200)}</p>
                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                          <button onClick={() => handleInteract(n.id, 'like')} className="flex items-center gap-1 hover:text-red-400 transition-colors"><Heart className="w-3.5 h-3.5" />{n.likes_count || 0}</button>
                          <button onClick={() => handleInteract(n.id, 'bookmark')} className="flex items-center gap-1 hover:text-amber-400 transition-colors"><Bookmark className="w-3.5 h-3.5" />{n.bookmarks_count || 0}</button>
                          <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" />{n.comments_count || 0}</span>
                          <span className="ml-auto text-amber-400 font-medium">{n.heat_score || 0} pts</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Editor Dialog */}
      <Dialog open={showEditor} onOpenChange={setShowEditor}>
        <DialogContent className="bg-[#1e293b] border-white/10 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editingId ? 'Edit Note' : 'New Note'}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="bg-[#0f172a] border-white/10" />
            <Textarea placeholder="Write your note here... (supports markdown)" value={content} onChange={e => setContent(e.target.value)} className="bg-[#0f172a] border-white/10 min-h-[200px]" />
            <Input placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} className="bg-[#0f172a] border-white/10" />
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">Visibility:</span>
              <button onClick={() => setVisibility('private')} className={`px-3 py-1 rounded-lg text-xs ${visibility === 'private' ? 'bg-blue-600/20 text-blue-400' : 'text-gray-500'}`}>Private</button>
              <button onClick={() => setVisibility('published')} className={`px-3 py-1 rounded-lg text-xs ${visibility === 'published' ? 'bg-emerald-600/20 text-emerald-400' : 'text-gray-500'}`}>Publish</button>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 bg-purple-600" onClick={handleSave} disabled={!title.trim()}><Save className="w-4 h-4 mr-1" />{editingId ? 'Update' : 'Save'}</Button>
              <Button variant="outline" className="border-white/10" onClick={() => { setShowEditor(false); resetForm(); }}><X className="w-4 h-4" /></Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
