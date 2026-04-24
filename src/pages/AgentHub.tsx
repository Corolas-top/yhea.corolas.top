import { useNavigate } from 'react-router-dom';
import { GraduationCap, Sparkles, FileEdit, Brain, Zap, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AGENTS = [
  { id: 'admission', name: 'Admission Advisor', desc: 'Design your college application strategy, school list & timeline based on your profile.', icon: GraduationCap, color: 'text-blue-400', bg: 'from-blue-500/10 to-blue-600/5', border: 'border-blue-500/20' },
  { id: 'teacher', name: 'Course Teacher', desc: 'Learn any subject by unit/chapter. Practice problems with official curriculum sources.', icon: Sparkles, color: 'text-emerald-400', bg: 'from-emerald-500/10 to-emerald-600/5', border: 'border-emerald-500/20' },
  { id: 'essay', name: 'Essay Assistant', desc: 'Brainstorm, outline & refine application essays. Imports your notes & profile.', icon: FileEdit, color: 'text-purple-400', bg: 'from-purple-500/10 to-purple-600/5', border: 'border-purple-500/20' },
  { id: 'free', name: 'Free Agent', desc: 'A versatile AI that can handle any task: research, planning, writing, or just chat.', icon: Brain, color: 'text-amber-400', bg: 'from-amber-500/10 to-amber-600/5', border: 'border-amber-500/20' },
];

export default function AgentHub() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2"><Zap className="w-6 h-6 text-blue-400" />Yhea Agents</h2>
        <p className="text-gray-400 mt-1 text-sm">AI-powered assistants for every aspect of your academic journey</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {AGENTS.map(a => (
          <Card key={a.id} className={`bg-gradient-to-br ${a.bg} ${a.border} border cursor-pointer hover:scale-[1.01] transition-transform`} onClick={() => navigate(`/agent/${a.id}`)}>
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${a.color}`}><a.icon className="w-6 h-6" /></div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{a.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{a.desc}</p>
                  <div className="flex items-center gap-1 mt-3 text-sm text-blue-400">Start chat <ChevronRight className="w-4 h-4" /></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
