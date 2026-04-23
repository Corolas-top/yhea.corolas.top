import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Video, Plus, Trash2, Copy, ExternalLink, Users, Calendar, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Meeting() {
  const { user } = useAuth();
  const [meetings, setMeetings] = useState<any[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  // Form
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [mType, setMType] = useState('group');
  const [url, setUrl] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [duration, setDuration] = useState(60);
  const [maxPpl, setMaxPpl] = useState(10);

  useEffect(() => { fetchMeetings(); }, [user]);

  const fetchMeetings = async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase.from('meetings').select('*')
      .or(`host_id.eq.${user.id},meeting_type.eq.world`)
      .order('scheduled_at', { ascending: true });
    setMeetings(data || []);
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!user || !title.trim()) return;
    await supabase.from('meetings').insert({
      host_id: user.id, title: title.trim(), description: desc.trim() || null,
      meeting_type: mType, meeting_url: url.trim() || null,
      scheduled_at: scheduledAt ? new Date(scheduledAt).toISOString() : null,
      duration_minutes: duration, max_participants: maxPpl, status: 'scheduled',
    });
    setShowCreate(false); resetForm(); fetchMeetings();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('meetings').delete().eq('id', id);
    fetchMeetings();
  };

  const handleCopyUrl = (url: string) => { navigator.clipboard.writeText(url); };

  const resetForm = () => { setTitle(''); setDesc(''); setMType('group'); setUrl(''); setScheduledAt(''); setDuration(60); setMaxPpl(10); };

  const filtered = activeTab === 'all' ? meetings : meetings.filter(m => m.meeting_type === activeTab);

  const typeColors: Record<string, string> = { class: 'bg-blue-500/10 text-blue-400', group: 'bg-emerald-500/10 text-emerald-400', world: 'bg-purple-500/10 text-purple-400' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold flex items-center gap-2"><Video className="w-6 h-6 text-violet-400" />Meeting</h2><p className="text-gray-400 mt-1">Host and join study sessions</p></div>
        <Button className="bg-violet-600" onClick={() => setShowCreate(true)}><Plus className="w-4 h-4 mr-1" />Host Meeting</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-[#1e293b] border border-white/10"><TabsTrigger value="all">All</TabsTrigger><TabsTrigger value="class">Class</TabsTrigger><TabsTrigger value="group">Group</TabsTrigger><TabsTrigger value="world">World</TabsTrigger></TabsList>
        <TabsContent value={activeTab} className="mt-4">
          {loading ? <p className="text-gray-500">Loading...</p> : filtered.length === 0 ? (
            <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-8 text-center text-gray-500">
              <Video className="w-12 h-12 mx-auto mb-3 opacity-30" /><p>No meetings. Host one!</p>
            </CardContent></Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filtered.map(m => (
                <Card key={m.id} className="bg-[#1e293b] border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2"><Badge className={`text-[10px] ${typeColors[m.meeting_type] || ''}`}>{m.meeting_type}</Badge>{m.host_id === user?.id && <Badge variant="outline" className="text-[10px]">Host</Badge>}</div>
                        <p className="font-medium mt-2">{m.title}</p>
                        {m.description && <p className="text-xs text-gray-500 mt-1">{m.description}</p>}
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                          {m.scheduled_at && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(m.scheduled_at).toLocaleString()}</span>}
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{m.duration_minutes}min</span>
                          <span className="flex items-center gap-1"><Users className="w-3 h-3" />max {m.max_participants}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        {m.meeting_url && <button onClick={() => handleCopyUrl(m.meeting_url)} className="p-1.5 hover:bg-white/5 rounded text-gray-500 hover:text-blue-400" title="Copy link"><Copy className="w-4 h-4" /></button>}
                        {m.host_id === user?.id && <button onClick={() => handleDelete(m.id)} className="p-1.5 hover:bg-white/5 rounded text-red-400"><Trash2 className="w-4 h-4" /></button>}
                      </div>
                    </div>
                    {m.meeting_url && (
                      <a href={m.meeting_url} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center justify-center gap-2 w-full py-2 bg-violet-600/20 text-violet-400 rounded-lg text-sm hover:bg-violet-600/30 transition-colors">
                        <ExternalLink className="w-4 h-4" />Join Meeting
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Create Dialog */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="bg-[#1e293b] border-white/10 text-white max-w-md">
          <DialogHeader><DialogTitle>Host New Meeting</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Meeting Title *" value={title} onChange={e => setTitle(e.target.value)} className="bg-[#0f172a] border-white/10" />
            <Textarea placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} className="bg-[#0f172a] border-white/10 min-h-[60px]" />
            <div><label className="text-xs text-gray-400 mb-1 block">Type</label><div className="flex gap-2">{['class','group','world'].map(t => <button key={t} onClick={() => setMType(t)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize ${mType === t ? 'bg-violet-600/20 text-violet-400 border border-violet-500/30' : 'bg-[#0f172a] border border-white/10 text-gray-400'}`}>{t}</button>)}</div></div>
            <Input placeholder="Meeting URL (Zoom/Google Meet/etc)" value={url} onChange={e => setUrl(e.target.value)} className="bg-[#0f172a] border-white/10" />
            <div className="grid grid-cols-2 gap-2">
              <div><label className="text-xs text-gray-400">Schedule</label><Input type="datetime-local" value={scheduledAt} onChange={e => setScheduledAt(e.target.value)} className="bg-[#0f172a] border-white/10" /></div>
              <div><label className="text-xs text-gray-400">Duration (min)</label><Input type="number" value={duration} onChange={e => setDuration(parseInt(e.target.value) || 60)} className="bg-[#0f172a] border-white/10" /></div>
            </div>
            <Button className="w-full bg-violet-600" onClick={handleCreate} disabled={!title.trim()}><Plus className="w-4 h-4 mr-1" />Create Meeting</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
