import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, FlaskConical, Calculator, Atom, Languages, Layers, BookMarked, ChevronRight, GraduationCap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const standardizedTests = [
  { id: 'toefl', code: 'TOEFL', name: 'TOEFL iBT', category: 'language', maxScore: '120', duration: '~3 hours', sections: [{ name: 'Reading', questions: '20', time: '35 min' }, { name: 'Listening', questions: '28', time: '36 min' }, { name: 'Speaking', questions: '4 tasks', time: '16 min' }, { name: 'Writing', questions: '2 tasks', time: '29 min' }] },
  { id: 'ielts', code: 'IELTS', name: 'IELTS Academic', category: 'language', maxScore: '9.0', duration: '2h45m', sections: [{ name: 'Listening', questions: '40', time: '30 min' }, { name: 'Reading', questions: '40', time: '60 min' }, { name: 'Writing', questions: '2 tasks', time: '60 min' }, { name: 'Speaking', questions: '3 parts', time: '11-14 min' }] },
  { id: 'det', code: 'DET', name: 'Duolingo English Test', category: 'language', maxScore: '160', duration: '1 hour', sections: [{ name: 'Adaptive Test', questions: 'varies', time: '45 min' }, { name: 'Video Interview', questions: '2 prompts', time: '10 min' }, { name: 'Writing Sample', questions: '1 prompt', time: '5 min' }] },
  { id: 'sat', code: 'SAT', name: 'SAT', category: 'academic', maxScore: '1600', duration: '2h14m', sections: [{ name: 'Reading & Writing', questions: '54', time: '64 min' }, { name: 'Math', questions: '44', time: '70 min' }] },
  { id: 'act', code: 'ACT', name: 'ACT', category: 'academic', maxScore: '36', duration: '2h55m', sections: [{ name: 'English', questions: '75', time: '45 min' }, { name: 'Math', questions: '60', time: '60 min' }, { name: 'Reading', questions: '40', time: '35 min' }, { name: 'Science', questions: '40', time: '35 min' }] },
];

const apCourses = [
  { id: 'ap-calc-bc', code: 'CALC_BC', name: 'Calculus BC', units: 10, hours: 150, desc: 'Differential/integral calculus, parametric, polar, series', icon: Calculator },
  { id: 'ap-physics-c', code: 'PHYSICS_C', name: 'Physics C', units: 14, hours: 180, desc: 'Mechanics + Electricity & Magnetism (calculus-based)', icon: Atom },
  { id: 'ap-chem', code: 'CHEM', name: 'Chemistry', units: 9, hours: 140, desc: 'Atomic structure, bonding, reactions, thermodynamics', icon: FlaskConical },
];

const ibCourses = [
  { id: 'ib-math-aa-hl', code: 'MATH_AA_HL', name: 'Math AA HL', units: 5, hours: 240, desc: 'Rigorous: calculus, algebra, proof, complex numbers', icon: Calculator },
  { id: 'ib-physics-hl', code: 'PHYSICS_HL', name: 'Physics HL', units: 12, hours: 240, desc: 'Mechanics, waves, electricity, quantum, astrophysics', icon: Atom },
];

const alevelCourses = [
  { id: 'al-math', code: 'MATH', name: 'Mathematics', units: 6, hours: 180, desc: 'Pure 1-3, Mechanics, Statistics 1-2', icon: Calculator },
];

export default function Learning() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('my-courses');

  const mySubjects = [
    { name: 'AP Calculus BC', progress: 15, totalUnits: 10, currentUnit: 'Unit 1: Limits', icon: Calculator },
    { name: 'AP Physics C', progress: 0, totalUnits: 14, currentUnit: 'Not started', icon: Atom },
  ];

  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold flex items-center gap-2"><BookOpen className="w-6 h-6 text-blue-400" />Learning Center</h2><p className="text-gray-400 mt-1">Your courses, standardized tests, and study resources</p></div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-[#1e293b] border border-white/10">
          <TabsTrigger value="my-courses" className="data-[state=active]:bg-blue-600"><BookMarked className="w-4 h-4 mr-1" />My Courses</TabsTrigger>
          <TabsTrigger value="standardized" className="data-[state=active]:bg-blue-600"><GraduationCap className="w-4 h-4 mr-1" />Standardized Tests</TabsTrigger>
          <TabsTrigger value="subjects" className="data-[state=active]:bg-blue-600"><Layers className="w-4 h-4 mr-1" />Subject Courses</TabsTrigger>
        </TabsList>

        {/* My Courses */}
        <TabsContent value="my-courses" className="mt-4 space-y-3">
          <p className="text-sm text-gray-400">Based on your profile. Go to Profile to change your subjects.</p>
          {mySubjects.map(c => (
            <Card key={c.name} className="bg-[#1e293b] border-white/10 hover:border-blue-500/30 transition-colors cursor-pointer" onClick={() => navigate('/learning/ap-calc-bc/u1')}>
              <CardContent className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center"><c.icon className="w-6 h-6 text-blue-400" /></div>
                  <div>
                    <h3 className="font-bold">{c.name}</h3>
                    <p className="text-xs text-gray-500">{c.totalUnits} units · Currently: {c.currentUnit}</p>
                    <div className="w-48 h-1.5 bg-white/5 rounded-full mt-2"><div className="h-full bg-blue-500 rounded-full" style={{ width: `${c.progress}%` }} /></div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </CardContent>
            </Card>
          ))}
          <Button variant="outline" className="w-full border-white/10 text-gray-400 hover:text-white" onClick={() => setActiveTab('subjects')}>
            <BookOpen className="w-4 h-4 mr-2" />Browse More Courses
          </Button>
        </TabsContent>

        {/* Standardized Tests */}
        <TabsContent value="standardized" className="mt-4 space-y-4">
          <div className="grid gap-4">
            {standardizedTests.map(test => (
              <Card key={test.id} className="bg-[#1e293b] border-white/10">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-600/20 rounded-lg flex items-center justify-center"><Languages className="w-5 h-5 text-emerald-400" /></div>
                      <div><h3 className="font-bold">{test.name}</h3><div className="flex gap-2 mt-1"><Badge variant="outline" className="text-xs border-white/10">{test.maxScore} max</Badge><Badge variant="outline" className="text-xs border-white/10">{test.duration}</Badge></div></div>
                    </div>
                    <Badge className={test.category === 'language' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}>{test.category === 'language' ? 'Language' : 'Academic'}</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {test.sections.map(s => (
                      <div key={s.name} className="p-2 bg-[#0f172a] rounded-lg text-center"><p className="text-xs font-medium">{s.name}</p><p className="text-xs text-gray-500">{s.questions} · {s.time}</p></div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Subject Courses */}
        <TabsContent value="subjects" className="mt-4">
          <Tabs defaultValue="AP">
            <TabsList className="bg-[#1e293b] border border-white/10 mb-4"><TabsTrigger value="AP">AP</TabsTrigger><TabsTrigger value="IB">IB</TabsTrigger><TabsTrigger value="A-Level">A-Level</TabsTrigger></TabsList>
            <TabsContent value="AP" className="space-y-3">
              {apCourses.map(c => (
                <Card key={c.id} className="bg-[#1e293b] border-white/10 hover:border-blue-500/30 transition-colors cursor-pointer" onClick={() => navigate(`/learning/${c.id}/u1`)}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 bg-blue-600/20 rounded-xl flex items-center justify-center"><c.icon className="w-5 h-5 text-blue-400" /></div>
                      <div><h3 className="font-bold">{c.name}</h3><p className="text-xs text-gray-500">{c.units} units · {c.hours}h · {c.desc}</p></div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="IB" className="space-y-3">
              {ibCourses.map(c => (
                <Card key={c.id} className="bg-[#1e293b] border-white/10 hover:border-blue-500/30 transition-colors cursor-pointer" onClick={() => navigate(`/learning/${c.id}/u1`)}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 bg-blue-600/20 rounded-xl flex items-center justify-center"><c.icon className="w-5 h-5 text-blue-400" /></div>
                      <div><h3 className="font-bold">{c.name}</h3><p className="text-xs text-gray-500">{c.units} units · {c.hours}h · {c.desc}</p></div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="A-Level" className="space-y-3">
              {alevelCourses.map(c => (
                <Card key={c.id} className="bg-[#1e293b] border-white/10 hover:border-blue-500/30 transition-colors cursor-pointer" onClick={() => navigate(`/learning/${c.id}/u1`)}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 bg-blue-600/20 rounded-xl flex items-center justify-center"><c.icon className="w-5 h-5 text-blue-400" /></div>
                      <div><h3 className="font-bold">{c.name}</h3><p className="text-xs text-gray-500">{c.units} papers · {c.hours}h · {c.desc}</p></div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}
