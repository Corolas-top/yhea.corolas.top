import { useState } from 'react';
import { FileEdit, Plus, Save, Trash2, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const appSystems = ['Common App', 'Coalition', 'UC Application', 'MIT', 'UCAS', 'Independent'];

const demoEssays = [
  { id: 'e1', system: 'Common App', prompt: 'Some students have a background...', title: 'My Story', content: 'Growing up in a multicultural family...', status: 'draft' as const, word_count: 420 },
  { id: 'e2', system: 'UC Application', prompt: 'Describe an example of leadership...', title: 'Leading the Robotics Team', content: 'When I joined the robotics team in sophomore year...', status: 'reviewing' as const, word_count: 340 },
];

export default function Essays() {
    const [essays, setEssays] = useState(demoEssays);
  const [showCreate, setShowCreate] = useState(false);
  const [newSystem, setNewSystem] = useState('Common App');
  const [newTitle, setNewTitle] = useState('');
  const [newPrompt, setNewPrompt] = useState('');
  const [newContent, setNewContent] = useState('');

  const handleCreate = () => {
    if (!newTitle.trim()) return;
    setEssays([{ id: `e${Date.now()}`, system: newSystem, prompt: newPrompt, title: newTitle, content: newContent, status: 'draft', word_count: newContent.split(/\s+/).length }, ...essays]);
    setNewTitle(''); setNewPrompt(''); setNewContent(''); setShowCreate(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold flex items-center gap-2"><FileEdit className="w-6 h-6 text-purple-400" />Essays</h2><p className="text-gray-400 mt-1">Write and manage your application essays by system</p></div>
        <Button className="bg-purple-600" onClick={() => setShowCreate(!showCreate)}><Plus className="w-4 h-4 mr-1" />New Essay</Button>
      </div>

      {showCreate && (
        <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-5 space-y-3">
          <select value={newSystem} onChange={e => setNewSystem(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[#0f172a] border border-white/10 text-sm text-gray-300">
            {appSystems.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <Input placeholder="Essay Title" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="bg-[#0f172a] border-white/10" />
          <Input placeholder="Prompt (optional)" value={newPrompt} onChange={e => setNewPrompt(e.target.value)} className="bg-[#0f172a] border-white/10" />
          <Textarea placeholder="Start writing..." value={newContent} onChange={e => setNewContent(e.target.value)} rows={8} className="bg-[#0f172a] border-white/10" />
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">{newContent.split(/\s+/).length} words</span>
            <div className="flex gap-2"><Button variant="ghost" size="sm" onClick={() => setShowCreate(false)}>Cancel</Button><Button size="sm" className="bg-purple-600" onClick={handleCreate}><Save className="w-4 h-4 mr-1" />Save</Button></div>
          </div>
        </CardContent></Card>
      )}

      <Tabs defaultValue="all">
        <TabsList className="bg-[#1e293b] border border-white/10"><TabsTrigger value="all">All ({essays.length})</TabsTrigger>
          {appSystems.slice(0, 4).map(s => <TabsTrigger key={s} value={s}>{s}</TabsTrigger>)}
        </TabsList>

        <TabsContent value="all" className="mt-4 space-y-3">
          {essays.map(essay => (
            <Card key={essay.id} className="bg-[#1e293b] border-white/10"><CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold">{essay.title}</h3>
                    <Badge variant="outline" className="text-xs border-white/10">{essay.system}</Badge>
                    {essay.status === 'draft' ? <Badge className="bg-amber-500/20 text-amber-400 text-xs">Draft</Badge> : <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">Reviewing</Badge>}
                  </div>
                  {essay.prompt && <p className="text-xs text-gray-500 mb-2">{essay.prompt.slice(0, 100)}...</p>}
                  <p className="text-sm text-gray-400 line-clamp-2">{essay.content}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{essay.word_count} words</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </CardContent></Card>
          ))}
          {essays.length === 0 && <div className="text-center py-12 text-gray-500"><FileEdit className="w-12 h-12 mx-auto mb-3 opacity-50" /><p>No essays yet. Create your first one!</p></div>}
        </TabsContent>
      </Tabs>
    </div>
  );
}
