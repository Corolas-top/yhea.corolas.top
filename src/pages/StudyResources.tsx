import { useNavigate } from 'react-router-dom';
import { BookOpen, Award, FlaskConical, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const CATEGORIES = [
  { id: 'curriculum', label: 'Curriculum', desc: 'AP / IB / A-Level courses, syllabi, units & practice', icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { id: 'tests', label: 'Standardized Tests', desc: 'TOEFL, IELTS, Duolingo, SAT, ACT prep', icon: Award, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { id: 'admission-tests', label: 'Admission Tests', desc: 'TMUA, ESAT, MAT, STEP, LNAT, UCAT & more', icon: FlaskConical, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { id: 'competitions', label: 'Competitions', desc: 'Academic competitions & contests', icon: Trophy, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { id: 'certificates', label: 'Awards', desc: 'Professional & academic certificates', icon: Award, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
];

export default function StudyResources() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold flex items-center gap-2"><BookOpen className="w-6 h-6 text-blue-400" />Study Resources</h2><p className="text-gray-400 mt-1 text-sm">Everything you need for your academic journey</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map(c => (
          <Card key={c.id} className="bg-[#1e293b] border-white/10 hover:border-blue-500/30 cursor-pointer transition-colors" onClick={() => navigate(`/resources/${c.id}`)}>
            <CardContent className="p-5">
              <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center ${c.color}`}><c.icon className="w-5 h-5" /></div>
              <h3 className="font-bold mt-3">{c.label}</h3>
              <p className="text-sm text-gray-400 mt-1">{c.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
