import { useState } from 'react';
import { Award, Target, Clock, Plus, ExternalLink, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const competitions = [
  { id: 'c1', name: 'AMC 12', category: 'STEM', subcategory: 'Mathematics', desc: 'American Mathematics Competition for grades 11-12. 25 MCQ, 75 min.', eligibility: 'Grade 11-12', timeline: 'Nov (A) / Nov (B)', website: 'https://maa.org', difficulty: 4, commitment: 3, prestige: 5, quality: 5, experience: 4, yhea_score: 4.5 },
  { id: 'c2', name: 'AIME', category: 'STEM', subcategory: 'Mathematics', desc: 'American Invitational Mathematics Examination. 15 problems, 3 hours.', eligibility: 'AMC 10/12 qualifiers', timeline: 'Feb', website: 'https://maa.org', difficulty: 5, commitment: 4, prestige: 5, quality: 5, experience: 4, yhea_score: 4.6 },
  { id: 'c3', name: 'Physics Bowl', category: 'STEM', subcategory: 'Physics', desc: 'High School Physics Competition by AAPT. 45 questions, 45 min.', eligibility: 'All high school', timeline: 'March', website: 'https://aapt.org', difficulty: 3, commitment: 2, prestige: 4, quality: 4, experience: 4, yhea_score: 3.8 },
  { id: 'c4', name: 'USACO', category: 'STEM', subcategory: 'Computer Science', desc: 'USA Computing Olympiad. 4 online contests per year.', eligibility: 'All students globally', timeline: 'Dec/Jan/Feb/Open', website: 'https://usaco.org', difficulty: 5, commitment: 5, prestige: 5, quality: 5, experience: 4, yhea_score: 4.8 },
  { id: 'c5', name: 'IEO', category: 'Humanities', subcategory: 'Economics', desc: 'International Economics Olympiad. Economics + Finance + Business case.', eligibility: 'Grade 9-12', timeline: 'July (national) / Sep (intl)', website: 'https://ecolymp.org', difficulty: 3, commitment: 3, prestige: 4, quality: 4, experience: 4, yhea_score: 3.8 },
  { id: 'c6', name: 'NEC', category: 'Humanities', subcategory: 'Economics', desc: 'National Economics Challenge. Teams of 3-4 students.', eligibility: 'High school teams', timeline: 'Dec-Feb', website: 'https://counciforeconed.org', difficulty: 3, commitment: 3, prestige: 3, quality: 4, experience: 5, yhea_score: 3.6 },
  { id: 'c7', name: 'FRC', category: 'STEM', subcategory: 'Engineering', desc: 'FIRST Robotics Competition. Build 120lb robots in 6 weeks.', eligibility: 'High school teams', timeline: 'Jan-Apr', website: 'https://firstinspires.org', difficulty: 4, commitment: 5, prestige: 4, quality: 5, experience: 5, yhea_score: 4.5 },
  { id: 'c8', name: 'Conrad Challenge', category: 'STEM', subcategory: 'Innovation', desc: 'Entrepreneurship + STEM innovation competition. Teams create solutions.', eligibility: 'Age 13-18', timeline: 'Oct-Feb', website: 'https://conradchallenge.org', difficulty: 3, commitment: 4, prestige: 3, quality: 4, experience: 5, yhea_score: 3.8 },
];

const categories = ['All', 'STEM', 'Humanities', 'Business', 'Arts', 'Comprehensive'];

function PentagonScore({ scores }: { scores: { difficulty: number; commitment: number; prestige: number; quality: number; experience: number } }) {
  const s = scores;
  const points = [
    { x: 50, y: 50 - s.difficulty * 8 },
    { x: 50 + Math.sin(72 * Math.PI / 180) * s.prestige * 8, y: 50 - Math.cos(72 * Math.PI / 180) * s.prestige * 8 },
    { x: 50 + Math.sin(144 * Math.PI / 180) * s.experience * 8, y: 50 - Math.cos(144 * Math.PI / 180) * s.experience * 8 },
    { x: 50 + Math.sin(216 * Math.PI / 180) * s.quality * 8, y: 50 - Math.cos(216 * Math.PI / 180) * s.quality * 8 },
    { x: 50 + Math.sin(288 * Math.PI / 180) * s.commitment * 8, y: 50 - Math.cos(288 * Math.PI / 180) * s.commitment * 8 },
  ];
  const polygon = points.map(p => `${p.x},${p.y}`).join(' ');
  const labels = ['Difficulty', 'Prestige', 'Experience', 'Quality', 'Commitment'];
  const labelPos = [
    { x: 50, y: 8 }, { x: 92, y: 30 }, { x: 78, y: 88 }, { x: 22, y: 88 }, { x: 8, y: 30 },
  ];

  return (
    <svg viewBox="0 0 100 100" className="w-28 h-28">
      {/* Background pentagon */}
      <polygon points="50,10 90,38 78,90 22,90 10,38" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <polygon points="50,26 74,42 66,74 34,74 26,42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      <polygon points="50,42 58,54 54,82 46,82 42,54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      {/* Score pentagon */}
      <polygon points={polygon} fill="rgba(59,130,246,0.3)" stroke="#3b82f6" strokeWidth="1.5" />
      {/* Labels */}
      {labels.map((l, i) => <text key={i} x={labelPos[i].x} y={labelPos[i].y} textAnchor="middle" fontSize="6" fill="#9ca3af">{l}</text>)}
    </svg>
  );
}

export default function Background() {
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? competitions : competitions.filter(c => c.category === activeCategory);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div><h2 className="text-2xl font-bold flex items-center gap-2"><Award className="w-6 h-6 text-amber-400" />Background</h2><p className="text-gray-400 mt-1">Competitions, projects & background building</p></div>
        <Button className="bg-amber-600"><Plus className="w-4 h-4 mr-1" />Add Project</Button>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map(c => (
          <button key={c} onClick={() => setActiveCategory(c)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${activeCategory === c ? 'bg-amber-600/20 border-amber-500 text-amber-400' : 'bg-[#1e293b] border-white/10 text-gray-400 hover:border-white/20'}`}>{c}</button>
        ))}
      </div>

      <Tabs defaultValue="competitions">
        <TabsList className="bg-[#1e293b] border border-white/10"><TabsTrigger value="competitions"><Award className="w-4 h-4 mr-1" />Competitions</TabsTrigger><TabsTrigger value="projects"><Lock className="w-4 h-4 mr-1" />My Projects</TabsTrigger></TabsList>

        <TabsContent value="competitions" className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(c => (
            <Card key={c.id} className="bg-[#1e293b] border-white/10 hover:border-amber-500/30 transition-all">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0"><PentagonScore scores={{ difficulty: c.difficulty, commitment: c.commitment, prestige: c.prestige, quality: c.quality, experience: c.experience }} /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold">{c.name}</h3>
                      <Badge className="bg-amber-500/20 text-amber-400 text-xs">Yhea {c.yhea_score}</Badge>
                    </div>
                    <div className="flex gap-2 mt-1"><Badge variant="outline" className="text-xs border-white/10">{c.category}</Badge><Badge variant="outline" className="text-xs border-white/10">{c.subcategory}</Badge></div>
                    <p className="text-sm text-gray-400 mt-2 line-clamp-2">{c.desc}</p>
                    <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Target className="w-3 h-3" />{c.eligibility}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{c.timeline}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {c.website && <a href={c.website} target="_blank" className="text-xs text-blue-400 hover:underline flex items-center gap-1"><ExternalLink className="w-3 h-3" />Website</a>}
                    </div>
                    {/* Score bars */}
                    <div className="grid grid-cols-5 gap-1 mt-3">
                      {[{ label: 'Difficulty', val: c.difficulty }, { label: 'Commitment', val: c.commitment }, { label: 'Prestige', val: c.prestige }, { label: 'Quality', val: c.quality }, { label: 'Experience', val: c.experience }].map(s => (
                        <div key={s.label} className="text-center">
                          <div className="flex gap-0.5 justify-center">{Array.from({ length: 5 }, (_, i) => <div key={i} className={`w-1.5 h-3 rounded-sm ${i < s.val ? 'bg-amber-500' : 'bg-white/10'}`} />)}</div>
                          <span className="text-[10px] text-gray-500 mt-0.5 block">{s.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="projects" className="mt-4">
          <div className="text-center py-12 text-gray-500">
            <Lock className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Your personal projects (not public)</p>
            <Button className="mt-4 bg-amber-600"><Plus className="w-4 h-4 mr-1" />Add Personal Project</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
