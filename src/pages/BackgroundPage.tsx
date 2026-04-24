import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Award, Star, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


export default function BackgroundPage() {
  const { user } = useAuth();
  const loc = useLocation();
  const isMy = loc.pathname.includes('/my');
  const [resources, setResources] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    supabase.from('background_resources').select('*').eq('is_active', true).then(({ data }) => setResources(data || []));
    if (user) supabase.from('student_background_projects').select('*').eq('student_id', user.id).then(({ data }) => setProjects(data || []));
  }, [user]);

  // Pentagon calculation
  const dims = { academic: 0, leadership: 0, creativity: 0, research: 0, service: 0 };
  projects.forEach(p => {
    const d = p.five_dimensions || {};
    Object.keys(dims).forEach(k => { (dims as any)[k] += (d[k] || 0) * (p.prestige_score || 1); });
  });
  const max = Math.max(...Object.values(dims), 1);
  const scores = Object.entries(dims).map(([k, v]) => ({ label: k.charAt(0).toUpperCase() + k.slice(1), value: (v / max) * 5 }));

  const cats = ['competition', 'program', 'activity'];

  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold flex items-center gap-2"><Award className="w-6 h-6 text-amber-400" />Background</h2></div>

      {/* Pentagon */}
      {isMy && projects.length > 0 && (
        <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-5 flex justify-center">
          <svg width="220" height="180" viewBox="0 0 220 180">
            <g transform="translate(110,90)">
              {[1,2,3,4,5].map(i => (
                <polygon key={i} points={scores.map((_,j) => {
                  const a = (Math.PI*2*j)/5 - Math.PI/2;
                  const r = (i/5)*70;
                  return `${Math.cos(a)*r},${Math.sin(a)*r}`;
                }).join(' ')} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              ))}
              <polygon points={scores.map((s,j) => {
                const a = (Math.PI*2*j)/5 - Math.PI/2;
                const r = (s.value/5)*70;
                return `${Math.cos(a)*r},${Math.sin(a)*r}`;
              }).join(' ')} fill="rgba(251,191,36,0.15)" stroke="#fbbf24" strokeWidth="1.5" />
              {scores.map((s,j) => {
                const a = (Math.PI*2*j)/5 - Math.PI/2;
                const r = 78;
                return <text key={j} x={Math.cos(a)*r} y={Math.sin(a)*r} textAnchor="middle" dominantBaseline="middle" fill="#94a3b8" fontSize="9">{s.label}</text>;
              })}
            </g>
          </svg>
        </CardContent></Card>
      )}

      <Tabs defaultValue={isMy ? 'my' : 'resources'}>
        <TabsList className="bg-[#1e293b] border border-white/10"><TabsTrigger value="resources">Resources</TabsTrigger><TabsTrigger value="my">My Background</TabsTrigger></TabsList>
        <TabsContent value="resources" className="mt-4 space-y-4">
          {cats.map(cat => (
            <div key={cat}>
              <h3 className="font-semibold text-sm text-gray-400 mb-2 capitalize">{cat}s</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {resources.filter(r => r.category === cat).map(r => (
                  <Card key={r.id} className="bg-[#1e293b] border-white/10">
                    <CardContent className="p-4">
                      <p className="font-medium text-sm">{r.name}</p>
                      <div className="flex gap-1 mt-1">{[1,2,3,4,5].map(i => <Star key={i} className={`w-3 h-3 ${i <= (r.prestige_score || 3) ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`} />)}<span className="text-xs text-gray-500 ml-1">Prestige {r.prestige_score}/5</span></div>
                    </CardContent>
                  </Card>
                ))}
                {resources.filter(r => r.category === cat).length === 0 && <p className="text-gray-500 text-sm">No {cat}s yet.</p>}
              </div>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="my" className="mt-4">
          {projects.length === 0 ? <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-8 text-center text-gray-500">No projects yet. Add from Resources or create custom.</CardContent></Card> : (
            <div className="space-y-2">
              {projects.map(p => (
                <Card key={p.id} className="bg-[#1e293b] border-white/10">
                  <CardContent className="p-3 flex items-center gap-3">
                    <p className="font-medium text-sm flex-1">{p.custom_name || p.resource_id}</p>
                    <div className="flex gap-1">{[1,2,3,4,5].map(i => <Star key={i} className={`w-3 h-3 ${i <= (p.prestige_score || 3) ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`} />)}</div>
                    <button onClick={() => supabase.from('student_background_projects').delete().eq('id', p.id).then(() => setProjects(prev => prev.filter(x => x.id !== p.id)))} className="text-red-400"><Trash2 className="w-4 h-4" /></button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
