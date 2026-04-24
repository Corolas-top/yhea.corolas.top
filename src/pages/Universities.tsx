import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Search, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function Universities() {
  const navigate = useNavigate();
  const [unis, setUnis] = useState<any[]>([]);
  const [, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => { fetchUnis(); }, []);

  const fetchUnis = async () => {
    setLoading(true);
    let q = supabase.from('universities').select('*').eq('is_active', true);
    if (country) q = q.eq('country', country);
    q = q.order('ranking_qs', { ascending: true });
    const { data } = await q;
    setUnis(data || []);
  };

  const filtered = unis.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.short_name?.toLowerCase().includes(search.toLowerCase()) ||
    u.country?.toLowerCase().includes(search.toLowerCase())
  );

  const countries = [...new Set(unis.map(u => u.country).filter(Boolean))];

  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold flex items-center gap-2"><GraduationCap className="w-6 h-6 text-blue-400" />Universities</h2><p className="text-gray-400 mt-1">Explore university database and rankings</p></div>

      <div className="flex gap-2">
        <div className="relative flex-1"><Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" /><Input placeholder="Search universities..." value={search} onChange={e => setSearch(e.target.value)} className="bg-[#1e293b] border-white/10 pl-9" /></div>
        <select value={country} onChange={e => { setCountry(e.target.value); fetchUnis(); }} className="bg-[#1e293b] border border-white/10 rounded-lg px-3 text-sm text-gray-300">
          <option value="">All Countries</option>
          {countries.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-8 text-center text-gray-500">No universities found.</CardContent></Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map(u => (
            <Card key={u.id} className="bg-[#1e293b] border-white/10 hover:border-blue-500/30 transition-colors cursor-pointer" onClick={() => navigate(`/universities/${u.id}`)}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  {u.logo_url ? <img src={u.logo_url} className="w-12 h-12 object-contain rounded" alt={u.short_name} /> : <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center text-lg font-bold">{u.short_name?.[0]}</div>}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{u.name}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1"><MapPin className="w-3 h-3" />{u.country} {u.region}</div>
                    <div className="flex gap-3 mt-1 text-xs">
                      {u.ranking_qs && <span className="text-purple-400">QS #{u.ranking_qs}</span>}
                      {u.ranking_us_news && <span className="text-blue-400">US News #{u.ranking_us_news}</span>}
                      {u.ranking_the && <span className="text-amber-400">THE #{u.ranking_the}</span>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
