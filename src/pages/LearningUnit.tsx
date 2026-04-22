import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, AlertTriangle, Lightbulb, Calculator, PenLine, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const unitData: Record<string, { unit_title: string; topics: Array<{ node_number: string; title: string; content: string; key_concepts: string[]; key_formulas: Array<{formula: string; description: string}>; common_mistakes: Array<{mistake: string; correction: string}>; source_document: string; difficulty: number; estimated_minutes: number }> }> = {
  u1: {
    unit_title: 'Limits and Continuity',
    topics: [
      { node_number: '1.1', title: 'Introducing Calculus', content: 'Calculus is the mathematics of change. While algebra deals with constant rates, calculus allows us to analyze instantaneous rates of change. The central question: how do we measure change at a single instant?', key_concepts: ['instantaneous rate of change', 'average rate of change', 'secant line', 'tangent line'], key_formulas: [{ formula: '\\text{Avg Rate} = \\frac{f(b)-f(a)}{b-a}', description: 'Slope of secant line' }], common_mistakes: [{ mistake: 'Confusing average rate with instantaneous rate', correction: 'Average rate requires an interval; instantaneous is the limit as interval shrinks to zero.' }], source_document: 'AP Calculus Course Description 2024', difficulty: 1, estimated_minutes: 15 },
      { node_number: '1.2', title: 'Defining Limits and Using Limit Notation', content: 'The limit of f(x) as x approaches c is L if we can make f(x) arbitrarily close to L by taking x sufficiently close to c. Notation: lim(x→c) f(x) = L.', key_concepts: ['limit notation', 'two-sided limit', 'one-sided limits'], key_formulas: [{ formula: '\\lim_{x \\to c} f(x) = L', description: 'The limit of f(x) as x approaches c equals L' }, { formula: '\\lim_{x \\to c^-} f(x) \\text{ and } \\lim_{x \\to c^+} f(x)', description: 'Left-hand and right-hand limits' }], common_mistakes: [{ mistake: 'Thinking the limit must equal f(c)', correction: 'The limit depends on nearby values, not f(c) itself. The function may be undefined at c.' }], source_document: 'AP Calculus Course Description 2024', difficulty: 2, estimated_minutes: 20 },
      { node_number: '1.3', title: 'Estimating Limit Values from Graphs', content: 'To estimate a limit from a graph, observe the y-value the function approaches as x approaches c from both sides.', key_concepts: ['graphical estimation', 'left approach', 'right approach'], key_formulas: [], common_mistakes: [{ mistake: 'Looking at f(c) instead of the approaching value', correction: 'Focus on where the curve is heading, not the point itself.' }], source_document: 'AP Calculus Course Description 2024', difficulty: 1, estimated_minutes: 15 },
      { node_number: '1.4', title: 'Determining Limits Using Algebraic Manipulation', content: 'When direct substitution yields indeterminate forms (0/0), use factoring, rationalizing, or simplifying complex fractions.', key_concepts: ['factoring', 'rationalizing', 'indeterminate form'], key_formulas: [], common_mistakes: [{ mistake: 'Giving up when direct substitution gives 0/0', correction: '0/0 is a signal to manipulate algebraically - factor, rationalize, or simplify.' }], source_document: 'AP Calculus Course Description 2024', difficulty: 3, estimated_minutes: 25 },
    ],
  },
};

export default function LearningUnit() {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const unit = unitData[unitId || ''] || unitData['u1'];
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [showExercise, setShowExercise] = useState(false);
  const topic = unit.topics[selectedIdx];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <button onClick={() => navigate('/learning')} className="hover:text-blue-400">Learning</button><ChevronRight className="w-4 h-4" /><span>AP Calculus BC</span><ChevronRight className="w-4 h-4" /><span className="text-white font-medium">{unit.unit_title}</span>
      </div>

      <div className="flex items-start justify-between">
        <div><h2 className="text-2xl font-bold">Unit 1: {unit.unit_title}</h2><p className="text-sm text-gray-500 mt-1">{unit.topics.length} topics</p></div>
        <Button onClick={() => navigate('/agent/teaching')} className="bg-blue-600"><Sparkles className="w-4 h-4 mr-2" />Ask Agent</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 space-y-1">
          <h3 className="font-semibold text-xs uppercase text-gray-500 mb-2">Topics</h3>
          {unit.topics.map((t, idx) => (
            <button key={idx} onClick={() => { setSelectedIdx(idx); setShowExercise(false); }} className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors border ${selectedIdx === idx ? 'bg-blue-600/10 border-blue-500/30' : 'hover:bg-white/5 border-transparent'}`}>
              {idx < 1 ? <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" /> : <Circle className="w-5 h-5 text-gray-700 mt-0.5" />}
              <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{t.node_number}: {t.title}</p><p className="text-xs text-gray-500">{t.estimated_minutes} min · {t.difficulty === 1 ? 'Easy' : t.difficulty === 3 ? 'Medium' : 'Hard'}</p></div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2">
          <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-6">
            {!showExercise ? (
              <>
                <div className="flex items-center gap-2 mb-4"><Badge variant="outline" className="border-white/10">{topic.node_number}</Badge><span className="text-sm text-gray-500">{topic.estimated_minutes} min read</span></div>
                <h3 className="text-xl font-bold mb-4">{topic.title}</h3>
                <p className="text-gray-300 leading-relaxed">{topic.content}</p>

                {topic.key_formulas.length > 0 && (
                  <div className="mt-5 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-sm mb-3 flex items-center gap-2 text-blue-400"><Calculator className="w-4 h-4" />Key Formulas</h4>
                    <div className="space-y-2">{topic.key_formulas.map((f, i) => (
                      <div key={i} className="flex items-start gap-3"><code className="bg-[#0f172a] px-3 py-1.5 rounded text-sm font-mono text-blue-300">{f.formula}</code><span className="text-sm text-gray-400">{f.description}</span></div>
                    ))}</div>
                  </div>
                )}

                {topic.common_mistakes.length > 0 && (
                  <div className="mt-5 p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    <h4 className="font-semibold text-sm mb-3 flex items-center gap-2 text-amber-400"><AlertTriangle className="w-4 h-4" />Common Mistakes</h4>
                    {topic.common_mistakes.map((m, i) => (
                      <div key={i}><p className="text-sm text-red-400">❌ {m.mistake}</p><p className="text-sm text-emerald-400">✓ {m.correction}</p></div>
                    ))}
                  </div>
                )}

                {topic.key_concepts.length > 0 && (
                  <div className="mt-5"><h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><Lightbulb className="w-4 h-4" />Key Concepts</h4><div className="flex flex-wrap gap-2">{topic.key_concepts.map((c, i) => <Badge key={i} variant="secondary" className="bg-white/5">{c}</Badge>)}</div></div>
                )}

                <div className="mt-4 p-3 bg-[#0f172a] rounded-lg text-xs text-gray-500">📚 Source: {topic.source_document}</div>

                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-white/5">
                  <Button onClick={() => setShowExercise(true)} className="bg-blue-600"><PenLine className="w-4 h-4 mr-2" />Try Exercise</Button>
                  <Button variant="outline" className="border-white/10" onClick={() => navigate('/agent/teaching')}><MessageCircle className="w-4 h-4 mr-2" />Ask Agent</Button>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4"><Button variant="ghost" size="sm" onClick={() => setShowExercise(false)}><ChevronLeft className="w-4 h-4" />Back</Button><h3 className="font-bold">Practice: {topic.title}</h3></div>
                <div className="p-4 bg-[#0f172a] rounded-lg">
                  <p className="font-medium mb-4">Find the derivative of f(x) = (2x³ + 5x)⁴</p>
                  <div className="space-y-2">{['4(2x³ + 5x)³ · (6x² + 5)', '4(2x³ + 5x)³', '(2x³ + 5x)⁴ · (6x² + 5)', '4(6x² + 5)³'].map((opt, i) => (
                    <button key={i} className="w-full p-3 text-left border border-white/10 rounded-lg hover:bg-blue-500/10 transition-colors text-sm">{['A', 'B', 'C', 'D'][i]}. {opt}</button>
                  ))}</div>
                </div>
                <div className="flex gap-2"><Button variant="outline" className="border-white/10">Check Answer</Button><Button variant="ghost" size="sm">Show Solution</Button></div>
              </div>
            )}
          </CardContent></Card>
        </div>
      </div>
    </div>
  );
}
