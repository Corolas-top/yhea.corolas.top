import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Award, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function StdTests() {
  const [tests, setTests] = useState<any[]>([]);
  useEffect(() => { supabase.from('standardized_tests').select('*').eq('is_active', true).then(({ data }) => setTests(data || [])); }, []);

  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold flex items-center gap-2"><Award className="w-6 h-6 text-emerald-400" />Standardized Tests</h2><p className="text-gray-400 mt-1 text-sm">TOEFL, IELTS, Duolingo, SAT, ACT</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {tests.map(t => (
          <Card key={t.id} className="bg-[#1e293b] border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center"><Award className="w-5 h-5 text-emerald-400" /></div>
                <div className="flex-1">
                  <p className="font-medium">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.max_score || 'N/A'} max · {t.duration || 'N/A'}</p>
                </div>
                {t.registration_url && <a href={t.registration_url} target="_blank" rel="noopener noreferrer" className="text-blue-400"><ExternalLink className="w-4 h-4" /></a>}
              </div>
              {t.sections && t.sections.length > 0 && (
                <div className="mt-3 space-y-1">
                  {t.sections.map((s: any, i: number) => (
                    <div key={i} className="flex justify-between text-xs p-2 bg-[#0f172a] rounded"><span className="text-gray-300">{s.name}</span><span className="text-gray-500">{s.duration} · {s.score_range}</span></div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        {tests.length === 0 && <p className="text-gray-500 text-sm col-span-2">No test data. Add in database.</p>}
      </div>
    </div>
  );
}
