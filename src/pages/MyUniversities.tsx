import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function MyUniversities() {
  const { user } = useAuth();
  const [targets, setTargets] = useState<any[]>([]);
  const [allUnis, setAllUnis] = useState<any[]>([]);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => { if (user) fetchData(); }, [user]);

  const fetchData = async () => {
    if (!user) return;
    const { data: t } = await supabase.from('student_university_targets').select('*, university:universities(*)').eq('student_id', user.id);
    setTargets(t || []);
    const { data: u } = await supabase.from('universities').select('*').eq('is_active', true).order('ranking_qs', { ascending: true }).limit(200);
    setAllUnis(u || []);
  };

  const addTarget = async (uniId: string) => {
    if (!user) return;
    await supabase.from('student_university_targets').insert({ student_id: user.id, university_id: uniId, status: 'targeting', priority: 2 });
    fetchData();
  };

  const removeTarget = async (id: string) => {
    await supabase.from('student_university_targets').delete().eq('id', id);
    fetchData();
  };

  const myUniIds = targets.map(t => t.university_id);
  const available = allUnis.filter(u => !myUniIds.includes(u.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold flex items-center gap-2"><GraduationCap className="w-6 h-6 text-blue-400" />My Universities</h2><p className="text-gray-400 mt-1">Your dream school list</p></div>
        <Button className="bg-blue-600" onClick={() => setShowAdd(!showAdd)}><Plus className="w-4 h-4 mr-1" />{showAdd ? 'Close' : 'Add'}</Button>
      </div>

      {showAdd && (
        <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-4">
          <p className="text-sm text-gray-400 mb-2">Select universities to add:</p>
          <div className="max-h-64 overflow-y-auto space-y-1">
            {available.slice(0, 50).map(u => (
              <div key={u.id} className="flex items-center justify-between p-2 hover:bg-white/5 rounded">
                <div className="flex items-center gap-2"><span className="text-xs text-gray-500">{u.ranking_qs ? `#${u.ranking_qs}` : ''}</span><span className="text-sm">{u.name}</span><span className="text-xs text-gray-500">{u.country}</span></div>
                <Button size="sm" variant="outline" className="border-white/10 text-xs" onClick={() => addTarget(u.id)}><Plus className="w-3 h-3" /></Button>
              </div>
            ))}
          </div>
        </CardContent></Card>
      )}

      {targets.length === 0 ? (
        <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-8 text-center text-gray-500">No universities added. Start building your list!</CardContent></Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {targets.map(t => (
            <Card key={t.id} className="bg-[#1e293b] border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {t.university?.logo_url ? <img src={t.university.logo_url} className="w-10 h-10 object-contain rounded" /> : <div className="w-10 h-10 rounded bg-blue-600/20 flex items-center justify-center text-sm font-bold">{t.university?.short_name?.[0]}</div>}
                    <div><p className="font-medium">{t.university?.name}</p><p className="text-xs text-gray-500">{t.university?.country} {t.university?.ranking_qs ? `\u00b7 QS #${t.university.ranking_qs}` : ''}</p></div>
                  </div>
                  <button onClick={() => removeTarget(t.id)} className="text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
                </div>
                <div className="flex gap-2 mt-2">
                  {['targeting','reaching','applying','admitted'].map(s => (
                    <button key={s} onClick={async () => { await supabase.from('student_university_targets').update({ status: s }).eq('id', t.id); fetchData(); }}
                      className={`text-[10px] px-2 py-0.5 rounded-full ${t.status === s ? 'bg-blue-600/20 text-blue-400' : 'bg-white/5 text-gray-500'}`}>{s}</button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
