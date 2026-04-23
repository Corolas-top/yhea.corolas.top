import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, CheckCircle2, PenLine, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SYSTEMS_DATA = [
  { name: 'Common App', slug: 'common-app', country: 'USA', description: 'Used by 1000+ US universities. Main essay (650 words) + supplemental essays.', requirements: ['Main Essay (650 words)', 'Activities List (10 slots)', 'Courses & Grades', 'Recommendation Letters', 'Application Fee'] },
  { name: 'Coalition App', slug: 'coalition', country: 'USA', description: 'Alternative to Common App with Locker feature for early document storage.', requirements: ['Essays', 'Locker Portfolio', 'Activities', 'Recommendation Letters'] },
  { name: 'UC Application', slug: 'uc', country: 'USA', description: 'For all 9 UC campuses. 4 PIQs (350 words each). No recommendation letters.', requirements: ['4 Personal Insight Questions (350 words each)', 'Activities & Awards', 'No recommendation letters', '$80 per campus'] },
  { name: 'MIT Application', slug: 'mit', country: 'USA', description: 'MIT uses its own application system, not Common App.', requirements: ['5 Short Essays', 'Activities', 'Recommendation Letters', 'Interview (optional)'] },
  { name: 'UCAS', slug: 'ucas', country: 'UK', description: 'For all UK universities. Personal statement (4000 characters) + 5 choices.', requirements: ['Personal Statement (4000 chars)', 'Academic Reference', '5 Course Choices', 'Predicted Grades'] },
  { name: 'OUAC', slug: 'ouac', country: 'Canada', description: 'Ontario Universities Application Centre. Apply to multiple Ontario schools.', requirements: ['Application Form', 'Transcripts', 'Supplemental Applications', 'Language Test Results'] },
];

export default function ApplyGuide() {
  const navigate = useNavigate();
  const [guides, setGuides] = useState<Record<string, any[]>>({});

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    for (const sys of SYSTEMS_DATA) {
      const { data } = await supabase.from('application_guides').select('*').eq('section', sys.slug).eq('is_active', true).order('order_index', { ascending: true });
      if (data && data.length > 0) {
        setGuides(prev => ({ ...prev, [sys.slug]: data }));
      }
    }
  };

  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold flex items-center gap-2"><ClipboardList className="w-6 h-6 text-blue-400" />Apply Guide</h2><p className="text-gray-400 mt-1">Application systems, deadlines, and requirements</p></div>

      <Tabs defaultValue="common-app">
        <TabsList className="bg-[#1e293b] border border-white/10 flex-wrap h-auto gap-1 py-1">
          {SYSTEMS_DATA.map(s => <TabsTrigger key={s.slug} value={s.slug} className="text-xs">{s.name}</TabsTrigger>)}
        </TabsList>

        {SYSTEMS_DATA.map(sys => (
          <TabsContent key={sys.slug} value={sys.slug} className="mt-4 space-y-4">
            <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div><h3 className="font-bold text-lg flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-400" />{sys.name}</h3>
                  <Badge className="mt-1" variant="outline">{sys.country}</Badge>
                </div>
                <Button size="sm" className="bg-blue-600" onClick={() => navigate('/essays')}><PenLine className="w-4 h-4 mr-1" />Write Essays</Button>
              </div>
              <p className="text-gray-300 mt-3 text-sm">{sys.description}</p>
              <div className="mt-4">
                <h4 className="font-semibold text-sm mb-2">Requirements</h4>
                <div className="space-y-1">
                  {sys.requirements.map((r, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />{r}</div>
                  ))}
                </div>
              </div>
            </CardContent></Card>

            {/* Guide Content from DB */}
            {guides[sys.slug] && guides[sys.slug].length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Detailed Guide</h4>
                {guides[sys.slug].map(g => (
                  <Card key={g.id} className="bg-[#1e293b] border-white/10"><CardContent className="p-4">
                    <p className="font-medium text-sm">{g.title}</p>
                    <p className="text-sm text-gray-400 mt-1 whitespace-pre-wrap">{g.content}</p>
                  </CardContent></Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
