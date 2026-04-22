import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Globe, TrendingUp, Star, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const uniData: Record<string, any> = {
  mit: { name: 'MIT', short_name: 'MIT', country: 'USA', region: 'Massachusetts', type: 'private', ranking_qs: 1, ranking_us_news: 2, ranking_the: 3, website: 'https://web.mit.edu', description: 'World-renowned private research university in Cambridge, Massachusetts. Known for engineering, physical sciences, and technology.', campus_info: 'Urban campus along the Charles River, 168 acres', tuition_range: '$59,750/year', student_population: 11500, majors: [{ name: 'Computer Science', college: 'EECS', degree: 'BS', years: 4, desc: 'Algorithms, AI, systems, theory' }, { name: 'Mathematics', college: 'Science', degree: 'BS', years: 4, desc: 'Pure and applied mathematics' }, { name: 'Physics', college: 'Science', degree: 'BS', years: 4, desc: 'Theoretical and experimental physics' }] },
  cmu: { name: 'Carnegie Mellon University', short_name: 'CMU', country: 'USA', region: 'Pennsylvania', type: 'private', ranking_qs: 51, ranking_us_news: 24, ranking_the: 24, website: 'https://www.cmu.edu', description: 'World-renowned for computer science, robotics, and fine arts.', campus_info: 'Urban campus, 140 acres', tuition_range: '$63,829/year', student_population: 15000, majors: [{ name: 'Computer Science', college: 'SCS', degree: 'BS', years: 4, desc: '#1 in the world. ML, HCI, robotics' }, { name: 'Information Systems', college: 'Dietrich', degree: 'BS', years: 4, desc: 'Tech meets business' }] },
};

const rankingCategories = {
  QS: ['Engineering & Technology', 'Natural Sciences', 'Social Sciences & Management', 'Arts & Humanities', 'Life Sciences & Medicine'],
  'US News': ['Computer Science', 'Engineering', 'Mathematics', 'Physics', 'Economics', 'Psychology'],
  THE: ['Computer Science', 'Engineering', 'Physical Sciences', 'Life Sciences', 'Social Sciences', 'Arts & Humanities', 'Business & Economics', 'Education', 'Law', 'Psychology', 'Clinical & Health'],
};

export default function UniversityDetail() {
  const { uniId } = useParams();
  const navigate = useNavigate();
  const uni = uniData[uniId || ''];

  if (!uni) return <div className="text-center py-12 text-gray-400">University not found</div>;

  return (
    <div className="space-y-6">
      <button onClick={() => navigate('/universities')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-white"><ChevronLeft className="w-4 h-4" />Back</button>

      <div className="flex items-start gap-5">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl font-bold text-white">{uni.short_name[0]}</div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-3xl font-bold">{uni.name}</h1>
            <Badge className="bg-white/10 text-gray-300">{uni.type}</Badge>
          </div>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{uni.country}{uni.region ? `, ${uni.region}` : ''}</span>
            <span className="flex items-center gap-1"><Globe className="w-4 h-4" /><a href={uni.website} target="_blank" className="hover:text-blue-400">{uni.website?.replace('https://', '')}</a></span>
          </div>
          <p className="mt-3 text-gray-400">{uni.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[{ label: 'QS World', value: uni.ranking_qs ? `#${uni.ranking_qs}` : '-' }, { label: 'US News', value: uni.ranking_us_news ? `#${uni.ranking_us_news}` : '-' }, { label: 'THE', value: uni.ranking_the ? `#${uni.ranking_the}` : '-' }, { label: 'Students', value: uni.student_population?.toLocaleString() }].map(s => (
          <Card key={s.label} className="bg-[#1e293b] border-white/10"><CardContent className="p-4 text-center"><TrendingUp className="w-5 h-5 text-blue-400 mx-auto mb-1" /><p className="text-xl font-bold">{s.value}</p><p className="text-xs text-gray-500">{s.label}</p></CardContent></Card>
        ))}
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="bg-[#1e293b] border border-white/10"><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="majors">Majors</TabsTrigger><TabsTrigger value="rankings">Subject Rankings</TabsTrigger></TabsList>

        <TabsContent value="overview" className="mt-4">
          <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-6 space-y-4">
            {uni.campus_info && <div><h4 className="font-medium text-sm text-gray-300 mb-1">Campus</h4><p className="text-sm text-gray-400">{uni.campus_info}</p></div>}
            {uni.tuition_range && <div><h4 className="font-medium text-sm text-gray-300 mb-1">Tuition</h4><p className="text-sm text-gray-400">{uni.tuition_range}</p></div>}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-[#0f172a] rounded-lg"><h4 className="font-medium text-sm flex items-center gap-2 text-gray-300"><BookOpen className="w-4 h-4" />Requirements</h4><ul className="mt-2 text-sm text-gray-400 space-y-1"><li>• Transcripts</li><li>• Test scores (SAT/ACT optional)</li><li>• Essays</li><li>• 2 Recommendations</li></ul></div>
              <div className="p-3 bg-[#0f172a] rounded-lg"><h4 className="font-medium text-sm flex items-center gap-2 text-gray-300"><Star className="w-4 h-4" />Notable Fields</h4><ul className="mt-2 text-sm text-gray-400 space-y-1"><li>• Technology & Engineering</li><li>• Finance & Consulting</li><li>• Research & Academia</li><li>• Entrepreneurship</li></ul></div>
            </div>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="majors" className="mt-4 space-y-3">
          {uni.majors?.map((m: any) => (
            <Card key={m.name} className="bg-[#1e293b] border-white/10"><CardContent className="p-5">
              <h3 className="font-bold">{m.name}</h3>
              <p className="text-sm text-gray-500">{m.college} · {m.degree} · {m.years} years</p>
              <p className="text-sm text-gray-400 mt-2">{m.desc}</p>
            </CardContent></Card>
          )) || <p className="text-gray-500 text-center py-8">Major data coming soon.</p>}
        </TabsContent>

        <TabsContent value="rankings" className="mt-4 space-y-6">
          {Object.entries(rankingCategories).map(([source, categories]) => (
            <div key={source}>
              <h3 className="font-bold text-lg mb-3">{source} Subject Rankings</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {categories.map(cat => (
                  <div key={cat} className="p-3 bg-[#1e293b] border border-white/10 rounded-lg flex items-center justify-between">
                    <span className="text-sm">{cat}</span>
                    <Badge variant="outline" className="border-white/10 text-xs">#{Math.floor(Math.random() * 50) + 1}</Badge>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
