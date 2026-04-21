import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass, Target, CheckCircle2, Sparkles,
  GraduationCap, FileText, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Planning() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('schools');

  const mySchools = [
    { name: 'MIT', major: 'Computer Science', category: 'reach' as const, status: 'targeting', progress: 30 },
    { name: 'CMU', major: 'Computer Science', category: 'match' as const, status: 'applying', progress: 60 },
    { name: 'UIUC', major: 'Computer Science', category: 'safety' as const, status: 'considering', progress: 15 },
  ];

  const timeline = [
    { date: 'Aug 2025', title: 'SAT Test', description: 'Register and take SAT', type: 'exam', done: true },
    { date: 'Sep 2025', title: 'Request Recommendations', description: 'Ask 2 teachers for LOR', type: 'task', done: false },
    { date: 'Oct 2025', title: 'MIT EA Deadline', description: 'Submit Early Action application', type: 'deadline', done: false },
    { date: 'Nov 2025', title: 'CMU ED Deadline', description: 'Submit Early Decision application', type: 'deadline', done: false },
    { date: 'Jan 2026', title: 'Regular Decision Deadline', description: 'Final application submissions', type: 'deadline', done: false },
  ];

  const categoryColor = { reach: 'bg-red-100 text-red-700', match: 'bg-blue-100 text-blue-700', safety: 'bg-green-100 text-green-700' };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2"><Compass className="w-6 h-6" /> Planning Center</h2>
          <p className="text-gray-500 mt-1">Your personalized roadmap to university admission</p>
        </div>
        <Button onClick={() => navigate('/agent')}><Sparkles className="w-4 h-4 mr-2" />Ask Yhea to Plan</Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4 flex items-center gap-3"><Target className="w-8 h-8 text-blue-600" /><div><p className="text-2xl font-bold">3</p><p className="text-xs text-gray-500">Target Schools</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><GraduationCap className="w-8 h-8 text-purple-600" /><div><p className="text-2xl font-bold">1/5</p><p className="text-xs text-gray-500">Essays Done</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><FileText className="w-8 h-8 text-amber-600" /><div><p className="text-2xl font-bold">1450</p><p className="text-xs text-gray-500">SAT Score</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><Globe className="w-8 h-8 text-green-600" /><div><p className="text-2xl font-bold">2</p><p className="text-xs text-gray-500">Countries</p></div></CardContent></Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="schools">My Schools</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="profile">My Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="schools" className="mt-6 space-y-4">
          {mySchools.map(s => (
            <Card key={s.name}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-xl font-bold">
                      {s.name[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{s.name}</h3>
                        <Badge className={categoryColor[s.category]}>{s.category}</Badge>
                      </div>
                      <p className="text-sm text-gray-500">{s.major}</p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>Application Progress</span><span>{s.progress}%</span>
                        </div>
                        <Progress value={s.progress} className="h-2 w-48" />
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigate(`/universities/${s.name.toLowerCase()}`)}>Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button variant="outline" className="w-full" onClick={() => navigate('/universities')}>
            <Target className="w-4 h-4 mr-2" />Explore More Universities
          </Button>
        </TabsContent>

        <TabsContent value="timeline" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
                <div className="space-y-6">
                  {timeline.map((t, i) => (
                    <div key={i} className="relative flex items-start gap-4 pl-10">
                      <div className={`absolute left-2.5 w-3 h-3 rounded-full border-2 ${t.done ? 'bg-green-500 border-green-500' : t.type === 'deadline' ? 'bg-red-500 border-red-500' : 'bg-white dark:bg-gray-900 border-gray-400'}`} />
                      <div className={`flex-1 p-4 rounded-lg ${t.done ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-800'}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-gray-500">{t.date}</p>
                            <p className={`font-medium ${t.done ? 'line-through text-gray-400' : ''}`}>{t.title}</p>
                          </div>
                          {t.done && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{t.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="font-bold mb-3">Academic Profile</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"><p className="text-xs text-gray-500">Curriculum</p><p className="font-medium">AP</p></div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"><p className="text-xs text-gray-500">Year</p><p className="font-medium">Year 2 (Grade 12)</p></div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"><p className="text-xs text-gray-500">Subjects</p><p className="font-medium">Calc BC, Physics C, CS A</p></div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"><p className="text-xs text-gray-500">GPA</p><p className="font-medium">3.92 / 4.0</p></div>
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-3">Test Scores</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"><p className="text-xs text-gray-500">SAT</p><p className="font-medium">1450 (EBRW 720, Math 730)</p></div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"><p className="text-xs text-gray-500">TOEFL</p><p className="font-medium">110</p></div>
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-3">Extracurriculars</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm">Science Olympiad - National Finalist</span>
                    <Badge variant="outline">Science</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm">Coding Club - President</span>
                    <Badge variant="outline">Leadership</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
