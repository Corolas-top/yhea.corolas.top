import { useParams, useNavigate } from 'react-router-dom';
import { useUniversities } from '@/hooks/useStore';
import {
  ChevronLeft, MapPin, Globe, Users, TrendingUp, DollarSign,
  Star, Target, Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function UniversityDetail() {
  const { uniId } = useParams();
  const navigate = useNavigate();
  const { universities, getMajors } = useUniversities();
  const uni = universities.find(u => u.id === uniId);
  const majors = uni ? getMajors(uni.id) : [];

  if (!uni) return <div className="text-center py-12">University not found</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <button onClick={() => navigate('/universities')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
        <ChevronLeft className="w-4 h-4" /> Back to Universities
      </button>

      {/* Header */}
      <div className="flex items-start gap-5">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl font-bold text-white">
          {uni.short_name[0]}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl font-bold">{uni.name}</h1>
            <Badge variant={uni.type === 'private' ? 'default' : 'secondary'}>{uni.type || 'university'}</Badge>
          </div>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{uni.country}{uni.region ? `, ${uni.region}` : ''}</span>
            <span className="flex items-center gap-1"><Globe className="w-4 h-4" /><a href={uni.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">{uni.website?.replace('https://', '')}</a></span>
          </div>
          {uni.description && <p className="mt-3 text-gray-600 dark:text-gray-400">{uni.description}</p>}
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4 text-center"><TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-1" /><p className="text-2xl font-bold">#{uni.ranking_qs || '-'}</p><p className="text-xs text-gray-500">QS World</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-1" /><p className="text-2xl font-bold">#{uni.ranking_us_news || '-'}</p><p className="text-xs text-gray-500">US News</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><Users className="w-6 h-6 text-green-600 mx-auto mb-1" /><p className="text-2xl font-bold">{(uni.acceptance_rate && (uni.acceptance_rate * 100).toFixed(0)) || '-'}%</p><p className="text-xs text-gray-500">Acceptance</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><DollarSign className="w-6 h-6 text-amber-600 mx-auto mb-1" /><p className="text-2xl font-bold">{uni.tuition_range || '-'}</p><p className="text-xs text-gray-500">Tuition</p></CardContent></Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="majors">Majors</TabsTrigger>
          <TabsTrigger value="admission">Admission</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-lg">About {uni.short_name}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {uni.campus_info && <div><h4 className="font-medium text-sm mb-1">Campus</h4><p className="text-sm text-gray-600 dark:text-gray-400">{uni.campus_info}</p></div>}
              {uni.student_population && <div><h4 className="font-medium text-sm mb-1">Student Body</h4><p className="text-sm text-gray-600 dark:text-gray-400">{uni.student_population.toLocaleString()} students</p></div>}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium text-sm flex items-center gap-2"><Target className="w-4 h-4" />Application Requirements</h4>
                  <ul className="mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• SAT/ACT (optional for most)</li>
                    <li>• TOEFL/IELTS for intl students</li>
                    <li>• 2 Teacher recommendations</li>
                    <li>• Personal essays</li>
                    <li>• Extracurricular activities list</li>
                  </ul>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium text-sm flex items-center gap-2"><Star className="w-4 h-4" />Notable Alumni Fields</h4>
                  <ul className="mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Technology & Engineering</li>
                    <li>• Finance & Consulting</li>
                    <li>• Research & Academia</li>
                    <li>• Entrepreneurship</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="majors" className="mt-6 space-y-3">
          {majors.map(m => (
            <Card key={m.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold">{m.major_name}</h3>
                    {m.college && <p className="text-sm text-gray-500">{m.college}</p>}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{m.description}</p>
                    <div className="flex items-center gap-3 mt-3">
                      {m.degree_type && <Badge variant="outline">{m.degree_type}</Badge>}
                      {m.duration_years && <Badge variant="outline">{m.duration_years} years</Badge>}
                    </div>
                    {m.career_paths && (
                      <div className="mt-3">
                        <p className="text-xs text-gray-500 mb-1">Career Paths:</p>
                        <div className="flex flex-wrap gap-1">
                          {m.career_paths.map((cp: string, i: number) => (
                            <Badge key={i} variant="secondary" className="text-xs">{cp}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {majors.length === 0 && <p className="text-center text-gray-500 py-8">Major data coming soon. Add via Admin panel.</p>}
        </TabsContent>

        <TabsContent value="admission" className="mt-6 space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-lg">Admission Statistics (2024)</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                  <p className="text-2xl font-bold text-blue-600">{uni.acceptance_rate ? (uni.acceptance_rate * 100).toFixed(1) : '-'}%</p>
                  <p className="text-xs text-gray-500">Acceptance Rate</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                  <p className="text-2xl font-bold">~{uni.student_population ? Math.round(uni.student_population * (uni.acceptance_rate || 0.1) * 0.4) : '-'}</p>
                  <p className="text-xs text-gray-500">Intl Students</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                  <p className="text-2xl font-bold">3.9+</p>
                  <p className="text-xs text-gray-500">Avg GPA</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">Application Timeline</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['Early Decision/Action: Nov 1', 'Regular Decision: Jan 1-15', 'Decision Release: March-April', 'Enrollment Deadline: May 1'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">{i + 1}</div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button className="w-full" onClick={() => navigate('/application-guide')}>
            <Sparkles className="w-4 h-4 mr-2" />View Full Application Guide
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
