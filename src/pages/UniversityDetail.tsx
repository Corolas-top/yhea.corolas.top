import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function UniversityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [uni, setUni] = useState<any>(null);
  const [majors, setMajors] = useState<any[]>([]);
  const [rankings, setRankings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (id) fetchDetail(); }, [id]);

  const fetchDetail = async () => {
    setLoading(true);
    const { data: u } = await supabase.from('universities').select('*').eq('id', id).single();
    setUni(u);
    const { data: m } = await supabase.from('university_majors').select('*').eq('university_id', id).eq('is_active', true);
    setMajors(m || []);
    const { data: r } = await supabase.from('university_rankings').select('*').eq('university_id', id).order('year', { ascending: false });
    setRankings(r || []);
    setLoading(false);
  };

  if (loading) return <div className="text-gray-500">Loading...</div>;
  if (!uni) return <div className="text-gray-500">University not found.</div>;

  // Group rankings by system
  const qsRankings = rankings.filter(r => r.ranking_system === 'QS');
  const usNewsRankings = rankings.filter(r => r.ranking_system === 'US News');
  const theRankings = rankings.filter(r => r.ranking_system === 'THE');

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" className="text-gray-400" onClick={() => navigate('/universities')}><ChevronLeft className="w-4 h-4 mr-1" />Back</Button>

      {/* Header */}
      <div className="flex items-start gap-4">
        {uni.logo_url ? <img src={uni.logo_url} className="w-20 h-20 object-contain rounded-lg" alt={uni.short_name} /> : <div className="w-20 h-20 rounded-lg bg-blue-600/20 flex items-center justify-center text-2xl font-bold">{uni.short_name?.[0]}</div>}
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{uni.name}</h2>
          <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
            <MapPin className="w-4 h-4" />{uni.country}{uni.region ? `, ${uni.region}` : ''}
            {uni.website && <a href={uni.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center gap-1"><ExternalLink className="w-3 h-3" />Website</a>}
          </div>
          <div className="flex gap-4 mt-2">
            {uni.ranking_qs && <div className="text-center px-3 py-1 bg-purple-500/10 rounded-lg"><p className="text-lg font-bold text-purple-400">#{uni.ranking_qs}</p><p className="text-[10px] text-gray-500">QS World</p></div>}
            {uni.ranking_us_news && <div className="text-center px-3 py-1 bg-blue-500/10 rounded-lg"><p className="text-lg font-bold text-blue-400">#{uni.ranking_us_news}</p><p className="text-[10px] text-gray-500">US News</p></div>}
            {uni.ranking_the && <div className="text-center px-3 py-1 bg-amber-500/10 rounded-lg"><p className="text-lg font-bold text-amber-400">#{uni.ranking_the}</p><p className="text-[10px] text-gray-500">THE</p></div>}
          </div>
        </div>
      </div>

      {/* Info */}
      {uni.description && <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-4"><p className="text-sm text-gray-300">{uni.description}</p></CardContent></Card>}

      <Tabs defaultValue="majors">
        <TabsList className="bg-[#1e293b] border border-white/10"><TabsTrigger value="majors">Majors</TabsTrigger><TabsTrigger value="rankings">Subject Rankings</TabsTrigger></TabsList>

        <TabsContent value="majors" className="mt-4">
          {majors.length === 0 ? <p className="text-gray-500">No major data available.</p> : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {majors.map(m => (
                <Card key={m.id} className="bg-[#1e293b] border-white/10"><CardContent className="p-4">
                  <p className="font-medium text-sm">{m.major_name}</p>
                  {m.college && <p className="text-xs text-gray-500">{m.college}</p>}
                  <div className="flex gap-2 mt-2 text-xs text-gray-500">
                    {m.degree_type && <span>{m.degree_type}</span>}
                    {m.duration_years && <span>{m.duration_years} years</span>}
                  </div>
                  {m.career_paths && (m.career_paths as string[]).length > 0 && <div className="flex flex-wrap gap-1 mt-2">{(m.career_paths as string[]).map((c: string) => <span key={c} className="text-[10px] px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full">{c}</span>)}</div>}
                </CardContent></Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="rankings" className="mt-4">
          <div className="space-y-4">
            {qsRankings.length > 0 && (
              <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-4">
                <h3 className="font-bold text-sm text-purple-400 mb-2">QS Rankings</h3>
                <div className="space-y-1">{qsRankings.map(r => <div key={r.id} className="flex items-center justify-between text-sm py-1"><span>{r.category}</span><span className="font-medium">#{r.rank_position} ({r.year})</span></div>)}</div>
              </CardContent></Card>
            )}
            {usNewsRankings.length > 0 && (
              <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-4">
                <h3 className="font-bold text-sm text-blue-400 mb-2">US News Rankings</h3>
                <div className="space-y-1">{usNewsRankings.map(r => <div key={r.id} className="flex items-center justify-between text-sm py-1"><span>{r.category}</span><span className="font-medium">#{r.rank_position} ({r.year})</span></div>)}</div>
              </CardContent></Card>
            )}
            {theRankings.length > 0 && (
              <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-4">
                <h3 className="font-bold text-sm text-amber-400 mb-2">THE Rankings</h3>
                <div className="space-y-1">{theRankings.map(r => <div key={r.id} className="flex items-center justify-between text-sm py-1"><span>{r.category}</span><span className="font-medium">#{r.rank_position} ({r.year})</span></div>)}</div>
              </CardContent></Card>
            )}
            {qsRankings.length === 0 && usNewsRankings.length === 0 && theRankings.length === 0 && <p className="text-gray-500">No ranking data available.</p>}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
