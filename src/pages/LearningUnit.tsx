import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourseDetail } from '@/hooks/useStore';
import {
  ChevronLeft, ChevronRight, BookOpen, Clock, CheckCircle2,
  Circle, AlertTriangle, Lightbulb, Calculator, PenLine,
  MessageCircle, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function LearningUnit() {
  const { courseId, unitId } = useParams();
  const navigate = useNavigate();
  const { units, getNodesForUnit } = useCourseDetail(courseId || '');
  const unit = units.find(u => u.id === unitId);
  const nodes = getNodesForUnit(unitId || '');
  const [selectedNode, setSelectedNode] = useState(nodes[0]);
  const [showExercise, setShowExercise] = useState(false);

  if (!unit) return <div>Unit not found</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <button onClick={() => navigate('/learning')} className="hover:text-blue-600">Learning</button>
        <ChevronRight className="w-4 h-4" />
        <span>AP Calculus BC</span>
        <ChevronRight className="w-4 h-4" />
        <span className="font-medium text-gray-900 dark:text-gray-100">{unit.unit_title}</span>
      </div>

      {/* Unit Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">Unit {unit.unit_number}: {unit.unit_title}</h2>
          <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{unit.estimated_hours}h</span>
            <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" />{nodes.length} topics</span>
          </div>
        </div>
        <Button onClick={() => navigate('/agent')}><Sparkles className="w-4 h-4 mr-2" />Ask Yhea</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Topic List */}
        <div className="lg:col-span-1 space-y-2">
          <h3 className="font-semibold text-sm uppercase text-gray-500 mb-3">Topics</h3>
          {nodes.map((node, idx) => (
            <button
              key={node.id}
              onClick={() => { setSelectedNode(node); setShowExercise(false); }}
              className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${
                selectedNode?.id === node.id ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800 border border-transparent'
              }`}
            >
              <div className="mt-0.5">{idx < 2 ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5 text-gray-300" />}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{node.node_number}: {node.title}</p>
                <p className="text-xs text-gray-500">{node.estimated_minutes} min · {node.difficulty === 1 ? 'Easy' : node.difficulty === 3 ? 'Medium' : 'Hard'}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-2">
          {selectedNode ? (
            <Card>
              <CardContent className="p-6">
                {!showExercise ? (
                  <>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="outline">{selectedNode.node_number}</Badge>
                      <span className="text-sm text-gray-500">{selectedNode.estimated_minutes} min read</span>
                    </div>

                    <h3 className="text-xl font-bold mb-4">{selectedNode.title}</h3>

                    <div className="prose dark:prose-invert max-w-none">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selectedNode.content}</p>

                      {selectedNode.key_formulas && selectedNode.key_formulas.length > 0 && (
                        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <h4 className="font-semibold text-sm mb-3 flex items-center gap-2"><Calculator className="w-4 h-4" />Key Formulas</h4>
                          <div className="space-y-2">
                            {selectedNode.key_formulas.map((f: any, i: number) => (
                              <div key={i} className="flex items-start gap-3">
                                <code className="bg-white dark:bg-gray-800 px-3 py-1.5 rounded text-sm font-mono">{f.formula}</code>
                                <span className="text-sm text-gray-600 dark:text-gray-400">{f.description}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedNode.common_mistakes && selectedNode.common_mistakes.length > 0 && (
                        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                          <h4 className="font-semibold text-sm mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-600" />Common Mistakes</h4>
                          <div className="space-y-2">
                            {selectedNode.common_mistakes.map((m: any, i: number) => (
                              <div key={i}>
                                <p className="text-sm text-red-600 dark:text-red-400 font-medium">❌ {m.mistake}</p>
                                <p className="text-sm text-green-600 dark:text-green-400">✓ {m.correction}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedNode.key_concepts && selectedNode.key_concepts.length > 0 && (
                        <div className="mt-6">
                          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><Lightbulb className="w-4 h-4" />Key Concepts</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedNode.key_concepts.map((c: string, i: number) => (
                              <Badge key={i} variant="secondary">{c}</Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-xs text-gray-500">
                        📚 Source: {selectedNode.source_document}{selectedNode.source_page ? `, ${selectedNode.source_page}` : ''}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-6 pt-4 border-t">
                      <Button onClick={() => setShowExercise(true)}><PenLine className="w-4 h-4 mr-2" />Try Exercise</Button>
                      <Button variant="outline" onClick={() => navigate('/agent')}><MessageCircle className="w-4 h-4 mr-2" />Ask Yhea</Button>
                      <Button variant="ghost" size="sm">Mark Complete</Button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Button variant="ghost" size="sm" onClick={() => setShowExercise(false)}><ChevronLeft className="w-4 h-4" /> Back</Button>
                      <h3 className="font-bold">Practice: {selectedNode.title}</h3>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="font-medium mb-4">Find the derivative of f(x) = (2x³ + 5x)⁴</p>
                      <div className="space-y-2">
                        {['4(2x³ + 5x)³ · (6x² + 5)', '4(2x³ + 5x)³', '(2x³ + 5x)⁴ · (6x² + 5)', '4(6x² + 5)³'].map((opt, i) => (
                          <button key={i} className="w-full p-3 text-left border rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-sm">
                            {['A', 'B', 'C', 'D'][i]}. {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button variant="outline">Check Answer</Button>
                      <Button variant="ghost" size="sm">Show Solution</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">Select a topic to begin</div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <Button variant="outline"><ChevronLeft className="w-4 h-4 mr-2" />Previous Unit</Button>
        <Button>Next Unit<ChevronRight className="w-4 h-4 ml-2" /></Button>
      </div>
    </div>
  );
}
