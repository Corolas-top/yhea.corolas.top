import { useNavigate } from 'react-router-dom';
import { Bot, GraduationCap, Calendar, Brain, Target, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const agents = [
  {
    type: 'planning',
    name: 'College Planning Agent',
    desc: 'Helps you build a complete college application strategy: school selection, test targets, course planning, competitions & projects.',
    icon: GraduationCap,
    color: 'from-blue-500 to-blue-600',
    features: ['School matching (Reach/Match/Safety)', 'Test score targets', 'Course recommendations', 'Competition planning'],
  },
  {
    type: 'teaching',
    name: 'Teaching Agent',
    desc: 'Your personal tutor for each subject. Ask questions, get explanations, practice problems, and track your understanding.',
    icon: Sparkles,
    color: 'from-emerald-500 to-emerald-600',
    features: ['Subject-specific tutoring', 'Step-by-step problem solving', 'Concept explanations with analogies', 'Source-cited answers'],
  },
  {
    type: 'schedule',
    name: 'Schedule Agent',
    desc: 'Manages your deadlines, exams, and tasks. Syncs with your calendar and reminds you of upcoming deadlines.',
    icon: Calendar,
    color: 'from-amber-500 to-amber-600',
    features: ['Deadline tracking', 'Calendar sync', 'Task prioritization', 'Study schedule generation'],
  },
  {
    type: 'mental',
    name: 'Mental Health Agent',
    desc: 'A safe space to talk about stress, anxiety, or burnout. Provides emotional support and practical coping strategies.',
    icon: Brain,
    color: 'from-purple-500 to-purple-600',
    features: ['Emotional support', 'Stress management tips', 'Study-life balance advice', 'Crisis resources'],
  },
];

export default function AgentHub() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2"><Bot className="w-6 h-6 text-blue-400" /> Agent Hub</h2>
        <p className="text-gray-400 mt-1">Choose an AI Agent to help you with different aspects of your journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map(agent => (
          <Card key={agent.type} className="bg-[#1e293b] border-white/10 hover:border-blue-500/30 transition-all cursor-pointer group" onClick={() => navigate(`/agent/${agent.type}`)}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <agent.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">{agent.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{agent.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {agent.features.map(f => (
                      <span key={f} className="text-xs bg-white/5 text-gray-300 px-2 py-1 rounded-md border border-white/5">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 flex items-start gap-3">
        <Target className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-blue-300">How it works</p>
          <p className="text-sm text-gray-400 mt-1">Each Agent specializes in a different area. Your conversations are private and not shared between Agents. The College Planning Agent can sync your plan to the Planning page.</p>
        </div>
      </div>
    </div>
  );
}
