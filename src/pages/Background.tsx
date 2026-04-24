import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Award, Plus, Target, Clock, Trash2, ExternalLink, TrendingUp, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Background() {
  const { user } = useAuth();
  const [competitions, setCompetitions] = useState<any[]>([]);
  const [, setLoading] = useState(true);
  const [projects, setProjects] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('competitions');
  const [showCompForm, setShowCompForm] = useState(false);
  const [showProjForm, setShowProjForm] = useState(false);

  // Competition form
  const [compName, setCompName] = useState('');
  const [compCategory, setCompCategory] = useState('');
  const [compDesc, setCompDesc] = useState('');
  const [compDiff, setCompDiff] = useState(3);

  // Project form
  const [projTitle, setProjTitle] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projStatus, setProjStatus] = useState('in_progress');
  const [projImpact, setProjImpact] = useState(3);

  useEffect(() => { fetchData(); }, [user]);

  const fetchData = async () => {
    setLoading(true);
    setLoading(true);
    if (!user) return;
    const { data: c } = await supabase.from('competitions').select('*').eq('is_active', true).order('prestige_score', { ascending: false });
    setCompetitions(c || []);
    const { data: p } = await supabase.from('background_projects').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
    setProjects(p || []);
  };

  const addCompetition = async () => {
    if (!compName.trim()) return;
    await supabase.from('competitions').insert({
      name: compName.trim(), category: compCategory || 'General',
      description: compDesc.trim() || null, difficulty_level: compDiff, prestige_score: compDiff,
      is_active: true,
    });
    setShowCompForm(false); setCompName(''); setCompCategory(''); setCompDesc(''); setCompDiff(3);
    fetchData();
  };

  const addProject = async () => {
    if (!user || !projTitle.trim()) return;
    await supabase.from('background_projects').insert({
      user_id: user.id, title: projTitle.trim(), description: projDesc.trim() || null,
      category: 'academic', status: projStatus, impact_level: projImpact,
    });
    setShowProjForm(false); setProjTitle(''); setProjDesc(''); setProjStatus('in_progress'); setProjImpact(3);
    fetchData();
  };

  const deleteProject = async (id: string) => {
    await supabase.from('background_projects').delete().eq('id', id);
    fetchData();
  };

  // Compute pentagon scores from user's data
  const academic = projects.filter(p => p.category === 'academic').length;
  const leadership = projects.filter(p => p.category === 'leadership').length;
  const research = projects.filter(p => p.category === 'research').length;
  const service = projects.filter(p => p.category === 'service').length;
  const creativity = projects.filter(p => p.category === 'creative').length;
  const maxVal = Math.max(academic, leadership, research, service, creativity, 1);
  const scores = [
    { label: 'Academic', value: (academic / maxVal) * 5, count: academic },
    { label: 'Leadership', value: (leadership / maxVal) * 5, count: leadership },
    { label: 'Research', value: (research / maxVal) * 5, count: research },
    { label: 'Service', value: (service / maxVal) * 5, count: service },
    { label: 'Creativity', value: (creativity / maxVal) * 5, count: creativity },
  ];

  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold flex items-center gap-2"><Award className="w-6 h-6 text-amber-400" />Background</h2><p className="text-gray-400 mt-1">Competitions, projects, and strength analysis</p></div>

      {/* Pentagon Radar */}
      <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-5">
        <div className="flex items-center justify-center">
          <svg width="240" height="200" viewBox="0 0 240 200">
            <g transform="translate(120,100)">
              {[1,2,3,4,5].map(i => (
                <polygon key={i} points={scores.map((_, j) => {
                  const angle = (Math.PI * 2 * j) / 5 - Math.PI / 2;
                  const r = (i / 5) * 80;
                  return `${Math.cos(angle) * r},${Math.sin(angle) * r}`;
                }).join(' ')} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              ))}
              <polygon points={scores.map((s, j) => {
                const angle = (Math.PI * 2 * j) / 5 - Math.PI / 2;
                const r = (s.value / 5) * 80;
                return `${Math.cos(angle) * r},${Math.sin(angle) * r}`;
              }).join(' ')} fill="rgba(251,191,36,0.2)" stroke="#fbbf24" strokeWidth="1.5" />
              {scores.map((s, j) => {
                const angle = (Math.PI * 2 * j) / 5 - Math.PI / 2;
                const r = 88;
                return <text key={j} x={Math.cos(angle) * r} y={Math.sin(angle) * r} textAnchor="middle" dominantBaseline="middle" fill="#94a3b8" fontSize="9">{s.label}</text>;
              })}
              {scores.map((s, j) => {
                const angle = (Math.PI * 2 * j) / 5 - Math.PI / 2;
                const r = (s.value / 5) * 80;
                return <circle key={j} cx={Math.cos(angle) * r} cy={Math.sin(angle) * r} r="3" fill="#fbbf24" />;
              })}
            </g>
          </svg>
        </div>
      </CardContent></Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-[#1e293b] border border-white/10"><TabsTrigger value="competitions">Competitions</TabsTrigger><TabsTrigger value="projects">My Projects</TabsTrigger></TabsList>

        <TabsContent value="competitions" className="mt-4">
          <div className="flex justify-end mb-3"><Button size="sm" className="bg-amber-600" onClick={() => setShowCompForm(true)}><Plus className="w-4 h-4 mr-1" />Add Competition</Button></div>
          {competitions.length === 0 ? (
            <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-8 text-center text-gray-500"><Award className="w-12 h-12 mx-auto mb-3 opacity-30" /><p>No competitions added yet.</p></CardContent></Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {competitions.map(c => (
                <Card key={c.id} className="bg-[#1e293b] border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{c.name}</p>
                        {c.description && <p className="text-xs text-gray-500 mt-1">{c.description}</p>}
                        <div className="flex items-center gap-2 mt-2">
                          {Array.from({ length: 5 }, (_, i) => <Star key={i} className={`w-3 h-3 ${i < (c.prestige_score || 3) ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`} />)}
                          <span className="text-xs text-gray-500 ml-1">Prestige {c.prestige_score}/5</span>
                        </div>
                      </div>
                      {c.website_url && <a href={c.website_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 ml-2"><ExternalLink className="w-4 h-4" /></a>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="projects" className="mt-4">
          <div className="flex justify-end mb-3"><Button size="sm" className="bg-amber-600" onClick={() => setShowProjForm(true)}><Plus className="w-4 h-4 mr-1" />New Project</Button></div>
          {projects.length === 0 ? (
            <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-8 text-center text-gray-500"><Target className="w-12 h-12 mx-auto mb-3 opacity-30" /><p>No projects yet. Start one!</p></CardContent></Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {projects.map(p => (
                <Card key={p.id} className="bg-[#1e293b] border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm">{p.title}</p>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${p.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : p.status === 'in_progress' ? 'bg-blue-500/10 text-blue-400' : 'bg-gray-500/10 text-gray-400'}`}>{p.status}</span>
                        </div>
                        {p.description && <p className="text-xs text-gray-500 mt-1">{p.description}</p>}
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" />Impact {p.impact_level}/5</span>
                          {p.start_date && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(p.start_date).toLocaleDateString()}</span>}
                        </div>
                      </div>
                      <button onClick={() => deleteProject(p.id)} className="text-red-400 hover:text-red-300 ml-2"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Competition Form */}
      <Dialog open={showCompForm} onOpenChange={setShowCompForm}>
        <DialogContent className="bg-[#1e293b] border-white/10 text-white max-w-md">
          <DialogHeader><DialogTitle>Add Competition</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Competition Name *" value={compName} onChange={e => setCompName(e.target.value)} className="bg-[#0f172a] border-white/10" />
            <Input placeholder="Category (Math/Science/CS/etc)" value={compCategory} onChange={e => setCompCategory(e.target.value)} className="bg-[#0f172a] border-white/10" />
            <Textarea placeholder="Description" value={compDesc} onChange={e => setCompDesc(e.target.value)} className="bg-[#0f172a] border-white/10" />
            <div><label className="text-xs text-gray-400">Prestige Level</label>
              <div className="flex gap-1 mt-1">{[1,2,3,4,5].map(i => <button key={i} onClick={() => setCompDiff(i)}><Star className={`w-6 h-6 ${i <= compDiff ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`} /></button>)}</div>
            </div>
            <Button className="w-full bg-amber-600" onClick={addCompetition} disabled={!compName.trim()}><Plus className="w-4 h-4 mr-1" />Add</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Project Form */}
      <Dialog open={showProjForm} onOpenChange={setShowProjForm}>
        <DialogContent className="bg-[#1e293b] border-white/10 text-white max-w-md">
          <DialogHeader><DialogTitle>New Project</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Project Title *" value={projTitle} onChange={e => setProjTitle(e.target.value)} className="bg-[#0f172a] border-white/10" />
            <Textarea placeholder="Description" value={projDesc} onChange={e => setProjDesc(e.target.value)} className="bg-[#0f172a] border-white/10" />
            <div><label className="text-xs text-gray-400">Status</label><div className="flex gap-2 mt-1">{['planned','in_progress','completed'].map(s => <button key={s} onClick={() => setProjStatus(s)} className={`px-3 py-1 rounded text-xs ${projStatus === s ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-[#0f172a] border border-white/10 text-gray-400'}`}>{s}</button>)}</div></div>
            <div><label className="text-xs text-gray-400">Impact Level</label><div className="flex gap-1 mt-1">{[1,2,3,4,5].map(i => <button key={i} onClick={() => setProjImpact(i)}><Star className={`w-6 h-6 ${i <= projImpact ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`} /></button>)}</div></div>
            <Button className="w-full bg-amber-600" onClick={addProject} disabled={!projTitle.trim()}><Plus className="w-4 h-4 mr-1" />Create</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
