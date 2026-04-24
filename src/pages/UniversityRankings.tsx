import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Trophy, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Ranking systems: QS, THE
const QS_CATEGORIES = ['Overall', 'Arts & Humanities', 'Engineering & Technology', 'Life Sciences & Medicine', 'Natural Sciences', 'Social Sciences & Management'];
const THE_CATEGORIES = ['Overall', 'Arts & Humanities', 'Business & Economics', 'Computer Science', 'Education', 'Engineering', 'Law', 'Life Sciences', 'Medicine', 'Physical Sciences', 'Psychology', 'Social Sciences'];

export default function UniversityRankings() {
  const [unis, setUnis] = useState<any[]>([]);
  const [rankings, setRankings] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [activeSystem, setActiveSystem] = useState('QS');
  const [activeCategory, setActiveCategory] = useState('Overall');
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: u } = await supabase.from('universities').select('*').eq('is_active', true).limit(500);
    setUnis(u || []);
    const { data: r } = await supabase.from('university_rankings').select('*').in('ranking_system', ['QS', 'THE']);
    setRankings(r || []);
    setLoading(false);
  };

  const getRankForUni = (uniId: string) => {
    return rankings.find(r => r.university_id === uniId && r.ranking_system === activeSystem && r.category === activeCategory);
  };

  const filtered = unis
    .map(u => ({ ...u, rank: getRankForUni(u.id) }))
    .filter(u => u.rank) // Only show universities with ranking in this category
    .sort((a, b) => (a.rank?.rank_position || 999) - (b.rank?.rank_position || 999))
    .filter(u => !search || u.name?.toLowerCase().includes(search.toLowerCase()) || u.country?.toLowerCase().includes(search.toLowerCase()));

  const categories = activeSystem === 'QS' ? QS_CATEGORIES : THE_CATEGORIES;

  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold flex items-center gap-2"><Trophy className="w-6 h-6 text-amber-400" />University Rankings</h2><p className="text-gray-400 mt-1">QS & THE 2026 rankings</p></div>

      <div className="flex gap-2"><div className="relative flex-1"><Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" /><Input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="bg-[#1e293b] border-white/10 pl-9" /></div></div>

      <Tabs value={activeSystem} onValueChange={setActiveSystem}>
        <TabsList className="bg-[#1e293b] border border-white/10"><TabsTrigger value="QS">QS</TabsTrigger><TabsTrigger value="THE">THE</TabsTrigger></TabsList>

        <TabsContent value={activeSystem} className="mt-4">
          <div className="flex flex-wrap gap-1 mb-4">
            {categories.map(c => <button key={c} onClick={() => setActiveCategory(c)} className={`px-3 py-1 rounded-lg text-xs ${activeCategory === c ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30' : 'bg-[#1e293b] border border-white/10 text-gray-400'}`}>{c}</button>)}
          </div>

          {loading ? <p className="text-gray-500">Loading...</p> : filtered.length === 0 ? (
            <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-8 text-center text-gray-500">No ranking data for this category.</CardContent></Card>
          ) : (
            <div className="space-y-1">
              {filtered.slice(0, 100).map((u) => (
                <div key={u.id} className="flex items-center gap-3 p-3 bg-[#1e293b] border border-white/5 rounded-lg hover:border-white/10 transition-colors">
                  <span className="w-8 text-center font-bold text-amber-400">{u.rank?.rank_position}</span>
                  {u.logo_url ? <img src={u.logo_url} className="w-8 h-8 object-contain rounded" /> : <div className="w-8 h-8 rounded bg-blue-600/20 flex items-center justify-center text-xs font-bold">{u.short_name?.[0]}</div>}
                  <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{u.name}</p><p className="text-xs text-gray-500">{u.country}</p></div>
                  {u.ranking_qs && <span className="text-xs text-purple-400">QS #{u.ranking_qs}</span>}
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
