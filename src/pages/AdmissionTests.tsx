import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { FlaskConical, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AdmissionTests() {
  const [tests, setTests] = useState<any[]>([]);
  useEffect(() => { supabase.from('admission_tests').select('*').eq('is_active', true).then(({ data }) => setTests(data || [])); }, []);

  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold flex items-center gap-2"><FlaskConical className="w-6 h-6 text-purple-400" />Admission Tests</h2><p className="text-gray-400 mt-1 text-sm">TMUA, ESAT, TARA, MAT, STEP, LNAT, BMSAT, UCAT</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {tests.map(t => (
          <Card key={t.id} className="bg-[#1e293b] border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center"><FlaskConical className="w-5 h-5 text-purple-400" /></div>
                <div className="flex-1">
                  <p className="font-medium">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.target_universities?.join(', ') || ''}</p>
                </div>
                {t.registration_url && <a href={t.registration_url} target="_blank" rel="noopener noreferrer" className="text-blue-400"><ExternalLink className="w-4 h-4" /></a>}
              </div>
            </CardContent>
          </Card>
        ))}
        {tests.length === 0 && (
          <div className="col-span-2 space-y-2">
            {['TMUA', 'ESAT', 'TARA', 'MAT', 'STEP', 'LNAT', 'BMSAT', 'UCAT'].map(name => (
              <Card key={name} className="bg-[#1e293b] border-white/10">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center"><FlaskConical className="w-5 h-5 text-purple-400" /></div>
                  <p className="font-medium">{name}</p>
                  <span className="text-xs text-gray-500 ml-auto">Coming soon</span>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
