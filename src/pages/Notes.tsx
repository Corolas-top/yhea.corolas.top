import { useState } from 'react';
import { useNotes } from '@/hooks/useStore';
import {
  StickyNote, Plus, Search, Eye, Lock, Sparkles,
  ChevronRight, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

export default function Notes() {
  // navigate for future use
  const { notes, createNote } = useNotes();
  // courses for future filter
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newVisibility, setNewVisibility] = useState<'private' | 'published'>('private');

  const myNotes = notes.filter(n => n.author_id === 'demo');
  const filtered = myNotes.filter(n =>
    !search || n.title.toLowerCase().includes(search.toLowerCase()) || n.content_text?.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    await createNote({
      title: newTitle,
      content_json: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: newContent }] }] },
      content_text: newContent,
      visibility: newVisibility,
      topic_tags: [],
    });
    setNewTitle('');
    setNewContent('');
    setShowCreate(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2"><StickyNote className="w-6 h-6" /> My Notes</h2>
          <p className="text-gray-500 mt-1">Your personal knowledge library. Publish to earn credits!</p>
        </div>
        <Button onClick={() => setShowCreate(!showCreate)}><Plus className="w-4 h-4 mr-2" />New Note</Button>
      </div>

      {/* Create Form */}
      {showCreate && (
        <Card>
          <CardContent className="p-5 space-y-4">
            <Input placeholder="Note title..." value={newTitle} onChange={e => setNewTitle(e.target.value)} />
            <Textarea placeholder="Write your note content... (LaTeX supported with $...$)" value={newContent} onChange={e => setNewContent(e.target.value)} rows={6} />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button onClick={() => setNewVisibility('private')} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${newVisibility === 'private' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}><Lock className="w-3.5 h-3.5 inline mr-1" />Private</button>
                <button onClick={() => setNewVisibility('published')} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${newVisibility === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}><Eye className="w-3.5 h-3.5 inline mr-1" />Publish (+5 YC)</button>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowCreate(false)}>Cancel</Button>
                <Button size="sm" onClick={handleCreate}>Save Note</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <Input placeholder="Search your notes..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>

      {/* Notes List */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({filtered.length})</TabsTrigger>
          <TabsTrigger value="private">Private</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4 space-y-3">
          {filtered.map(note => (
            <Card key={note.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold">{note.title}</h3>
                      {note.visibility === 'published' ? (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100"><Eye className="w-3 h-3 mr-1" />Public</Badge>
                      ) : (
                        <Badge variant="secondary"><Lock className="w-3 h-3 mr-1" />Private</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2">{note.content_text || 'No content'}</p>
                    <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(note.created_at).toLocaleDateString()}</span>
                      {note.heat_score > 0 && <span className="flex items-center gap-1 text-amber-600"><Sparkles className="w-3 h-3" />{note.heat_score} heat</span>}
                      {note.likes_count > 0 && <span>{note.likes_count} likes</span>}
                      {note.topic_tags && note.topic_tags.length > 0 && (
                        <div className="flex gap-1">
                          {note.topic_tags.map((t, i) => (
                            <Badge key={i} variant="outline" className="text-xs">{t}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="flex-shrink-0"><ChevronRight className="w-4 h-4" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {filtered.length === 0 && <div className="text-center py-12 text-gray-500"><StickyNote className="w-12 h-12 mx-auto mb-3 opacity-50" /><p>No notes yet. Create your first one!</p></div>}
        </TabsContent>

        <TabsContent value="private" className="mt-4 space-y-3">
          {filtered.filter(n => n.visibility !== 'published').map(note => (
            <Card key={note.id}><CardContent className="p-5"><h3 className="font-bold">{note.title}</h3><p className="text-sm text-gray-500 mt-1">{note.content_text?.slice(0, 100)}...</p></CardContent></Card>
          ))}
        </TabsContent>

        <TabsContent value="published" className="mt-4 space-y-3">
          {filtered.filter(n => n.visibility === 'published').map(note => (
            <Card key={note.id}><CardContent className="p-5"><h3 className="font-bold">{note.title}</h3><p className="text-sm text-gray-500 mt-1">{note.content_text?.slice(0, 100)}...</p><Badge className="mt-2 bg-green-100 text-green-700">{note.heat_score} heat</Badge></CardContent></Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
