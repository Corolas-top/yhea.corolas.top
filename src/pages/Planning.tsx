import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, CheckCircle2, GraduationCap, FileText, Globe, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Planning() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'agent' | 'manual'>('manual');

  const mySchools = [
    { name: 'MIT', major: 'Computer Science', category: 'reach', progress: 30 },
    { name: 'CMU', major: 'Computer Science', category: 'match', progress: 60 },
    { name: 'UIUC', major: 'Computer Science', category: 'safety', progress: 15 },
  ];

  const timeline = [
    { date: 'Aug 2025', title: 'SAT Test', desc: 'Register and take SAT', done: true },
    { date: 'Sep 2025', title: 'Request Recommendations', desc: 'Ask 2 teachers for LOR', done: false },
    { date: 'Oct 2025', title: 'MIT EA Deadline', desc: 'Submit Early Action', done: false },
    { date: 'Nov 2025', title: 'CMU ED Deadline', desc: 'Submit Early Decision', done: false },
    { date: 'Jan 2026', title: 'Regular Decision', desc: 'Final submissions', done: false },
  ];

  const catColor: Record<string, string> = { reach: 'bg-red-500/20 text-red-400', match: 'bg-blue-500/20 text-blue-400', safety: 'bg-emerald-500/20 text-emerald-400' };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div><h2 className="text-2xl font-bold flex items-center gap-2"><Target className="w-6 h-6 text-purple-400" />Planning Center</h2><p className="text-gray-400 mt-1">Your personalized roadmap to university admission</p></div>
        <Button className="bg-purple-600" onClick={() => navigate('/agent/planning')}><Sparkles className="w-4 h-4 mr-2" />Ask Planning Agent</Button>
      </div>

      {/* Mode Selection */}
      <div className="flex gap-2">
        <button onClick={() => setMode('manual')} className={`flex-1 p-4 rounded-xl border text-left transition-all ${mode === 'manual' ? 'bg-blue-600/20 border-blue-500' : 'bg-[#1e293b] border-white/10'}`}>
          <FileText className={`w-5 h-5 mb-2 ${mode === 'manual' ? 'text-blue-400' : 'text-gray-500'}`} />
          <p className={`font-medium ${mode === 'manual' ? 'text-blue-400' : 'text-gray-400'}`}>Manual Planning</p>
          <p className="text-xs text-gray-500 mt-1">Fill in your targets and timeline yourself</p>
        </button>
        <button onClick={() => setMode('agent')} className={`flex-1 p-4 rounded-xl border text-left transition-all ${mode === 'agent' ? 'bg-blue-600/20 border-blue-500' : 'bg-[#1e293b] border-white/10'}`}>
          <Sparkles className={`w-5 h-5 mb-2 ${mode === 'agent' ? 'text-blue-400' : 'text-gray-500'}`} />
          <p className={`font-medium ${mode === 'agent' ? 'text-blue-400' : 'text-gray-400'}`}>Agent Planning</p>
          <p className="text-xs text-gray-500 mt-1">Let the College Planning Agent build your roadmap</p>
        </button>
      </div>

      {mode === 'agent' && (
        <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-6 text-center">
          <Sparkles className="w-12 h-12 text-blue-400 mx-auto mb-3" />
          <h3 className="font-bold text-lg mb-2">Let the Agent Plan for You</h3>
          <p className="text-gray-400 text-sm mb-4">Share your profile, goals, and preferences with the College Planning Agent. It will generate a complete roadmap including school selection, test targets, course recommendations, and competition suggestions.</p>
          <Button className="bg-blue-600" onClick={() => navigate('/agent/planning')}>Start with Planning Agent</Button>
        </CardContent></Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[{ icon: Target, label: 'Target Schools', value: '3' }, { icon: GraduationCap, label: 'Essays Done', value: '1/5' }, { icon: FileText, label: 'SAT Score', value: '1450' }, { icon: Globe, label: 'Countries', value: '2' }].map(s => (
          <Card key={s.label} className="bg-[#1e293b] border-white/10"><CardContent className="p-4 flex items-center gap-3">
            <s.icon className="w-8 h-8 text-blue-400" /><div><p className="text-2xl font-bold">{s.value}</p><p className="text-xs text-gray-500">{s.label}</p></div>
          </CardContent></Card>
        ))}
      </div>

      <Tabs defaultValue="schools">
        <TabsList className="bg-[#1e293b] border border-white/10"><TabsTrigger value="schools">My Schools</TabsTrigger><TabsTrigger value="timeline">Timeline</TabsTrigger><TabsTrigger value="profile">My Profile</TabsTrigger></TabsList>

        <TabsContent value="schools" className="mt-4 space-y-3">
          {mySchools.map(s => (
            <Card key={s.name} className="bg-[#1e293b] border-white/10"><CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-lg font-bold">{s.name[0]}</div>
                  <div>
                    <div className="flex items-center gap-2"><h3 className="font-bold">{s.name}</h3><Badge className={catColor[s.category]}>{s.category}</Badge></div>
                    <p className="text-sm text-gray-500">{s.major}</p>
                    <Progress value={s.progress} className="h-2 w-40 mt-2 bg-white/5" />
                  </div>
                </div>
                <span className="text-sm text-gray-500">{s.progress}%</span>
              </div>
            </CardContent></Card>
          ))}
        </TabsContent>

        <TabsContent value="timeline" className="mt-4">
          <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-6">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/10" />
              <div className="space-y-4">
                {timeline.map((t, i) => (
                  <div key={i} className="relative flex items-start gap-4 pl-10">
                    <div className={`absolute left-2.5 w-3 h-3 rounded-full border-2 ${t.done ? 'bg-emerald-500 border-emerald-500' : 'bg-[#1e293b] border-gray-600'}`} />
                    <div className={`flex-1 p-4 rounded-lg ${t.done ? 'bg-emerald-500/10' : 'bg-[#0f172a]'}`}>
                      <div className="flex items-center justify-between">
                        <div><p className="text-xs text-gray-500">{t.date}</p><p className={`font-medium ${t.done ? 'line-through text-gray-500' : 'text-gray-300'}`}>{t.title}</p></div>
                        {t.done && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="profile" className="mt-4">
          <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-6 space-y-4">
            <div><h3 className="font-medium mb-2">Academic Profile</h3><div className="grid grid-cols-2 gap-2">
              <div className="p-3 bg-[#0f172a] rounded-lg"><p className="text-xs text-gray-500">Curriculum</p><p className="font-medium">AP</p></div>
              <div className="p-3 bg-[#0f172a] rounded-lg"><p className="text-xs text-gray-500">Year</p><p className="font-medium">Year 2</p></div>
              <div className="p-3 bg-[#0f172a] rounded-lg"><p className="text-xs text-gray-500">Subjects</p><p className="font-medium">Calc BC, Physics C, CS A</p></div>
              <div className="p-3 bg-[#0f172a] rounded-lg"><p className="text-xs text-gray-500">GPA</p><p className="font-medium">3.92 / 4.0</p></div>
            </div></div>
            <div><h3 className="font-medium mb-2">Test Scores</h3><div className="grid grid-cols-2 gap-2">
              <div className="p-3 bg-[#0f172a] rounded-lg"><p className="text-xs text-gray-500">SAT</p><p className="font-medium">1450</p></div>
              <div className="p-3 bg-[#0f172a] rounded-lg"><p className="text-xs text-gray-500">TOEFL</p><p className="font-medium">110</p></div>
            </div></div>
          </CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
