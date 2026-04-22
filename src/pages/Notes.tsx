import { useState } from 'react';
import { StickyNote, Plus, Search, Lock, Eye, Clock, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const demoNotes = [
  { id: 'n1', title: 'AP Calc BC: Chain Rule Summary', content: 'The Chain Rule is crucial for differentiating composite functions. Think of it like peeling an onion...', visibility: 'published' as const, heat: 120, likes: 15, comments: 4, date: '2026-04-15', tags: ['calculus', 'chain-rule'] },
  { id: 'n2', title: 'Integration by Parts: My Method', content: 'LIATE rule for choosing u and dv...', visibility: 'published' as const, heat: 85, likes: 12, comments: 3, date: '2026-04-16', tags: ['integration', 'by-parts'] },
  { id: 'n3', title: 'US vs UK Application Guide', content: 'US: holistic, essays matter. UK: academic focus...', visibility: 'published' as const, heat: 200, likes: 28, comments: 7, date: '2026-04-17', tags: ['application', 'comparison'] },
  { id: 'n4', title: 'Personal Draft - Physics IA', content: 'This is my private draft for the physics internal assessment...', visibility: 'private' as const, heat: 0, likes: 0, comments: 0, date: '2026-04-18', tags: ['physics', 'IA'] },
];

export default function Notes() {
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newVis, setNewVis] = useState<'private' | 'published'>('private');

  const filtered = demoNotes.filter(n => !search || n.title.toLowerCase().includes(search.toLowerCase()));

  const handleCreate = () => {
    if (!newTitle.trim()) return;
    demoNotes.unshift({ id: `n${Date.now()}`, title: newTitle, content: newContent, visibility: newVis, heat: 0, likes: 0, comments: 0, date: new Date().toISOString().slice(0, 10), tags: [] });
    setNewTitle(''); setNewContent(''); setShowCreate(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold flex items-center gap-2"><StickyNote className="w-6 h-6 text-emerald-400" />Notes</h2><p className="text-gray-400 mt-1">Your personal knowledge library. Publish to earn credits!</p></div>
        <Button className="bg-emerald-600" onClick={() => setShowCreate(!showCreate)}><Plus className="w-4 h-4 mr-1" />New Note</Button>
      </div>

      {showCreate && (
        <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-5 space-y-3">
          <Input placeholder="Note title..." value={newTitle} onChange={e => setNewTitle(e.target.value)} className="bg-[#0f172a] border-white/10" />
          <Textarea placeholder="Write your note... (LaTeX supported with $...$)" value={newContent} onChange={e => setNewContent(e.target.value)} rows={6} className="bg-[#0f172a] border-white/10" />
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button onClick={() => setNewVis('private')} className={`px-3 py-1.5 rounded-lg text-sm ${newVis === 'private' ? 'bg-blue-600/20 text-blue-400' : 'bg-[#0f172a] text-gray-400'}`}><Lock className="w-3.5 h-3.5 inline mr-1" />Private</button>
              <button onClick={() => setNewVis('published')} className={`px-3 py-1.5 rounded-lg text-sm ${newVis === 'published' ? 'bg-green-600/20 text-green-400' : 'bg-[#0f172a] text-gray-400'}`}><Eye className="w-3.5 h-3.5 inline mr-1" />Publish (+5 YC)</button>
            </div>
            <div className="flex gap-2"><Button variant="ghost" size="sm" onClick={() => setShowCreate(false)}>Cancel</Button><Button size="sm" className="bg-emerald-600" onClick={handleCreate}>Save</Button></div>
          </div>
        </CardContent></Card>
      )}

      <div className="relative"><Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" /><Input placeholder="Search notes..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 bg-[#1e293b] border-white/10" /></div>

      <Tabs defaultValue="all">
        <TabsList className="bg-[#1e293b] border border-white/10"><TabsTrigger value="all">All</TabsTrigger><TabsTrigger value="private">Private</TabsTrigger><TabsTrigger value="published">Published</TabsTrigger></TabsList>
        <TabsContent value="all" className="mt-4 space-y-3">
          {filtered.map(n => (
            <Card key={n.id} className="bg-[#1e293b] border-white/10"><CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold">{n.title}</h3>
                    {n.visibility === 'published' ? <Badge className="bg-green-500/20 text-green-400 text-xs"><Eye className="w-3 h-3 mr-1" />Public</Badge> : <Badge variant="secondary" className="text-xs"><Lock className="w-3 h-3 mr-1" />Private</Badge>}
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{n.content}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{n.date}</span>
                    {n.heat > 0 && <span className="text-amber-400 flex items-center gap-1"><Sparkles className="w-3 h-3" />{n.heat} heat</span>}
                    <div className="flex gap-1">{n.tags.map(t => <Badge key={t} variant="outline" className="text-[10px] border-white/10">{t}</Badge>)}</div>
                  </div>
                </div>
              </div>
            </CardContent></Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
