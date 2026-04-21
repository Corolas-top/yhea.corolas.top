import { useNavigate } from 'react-router-dom';
import { useCourses } from '@/hooks/useStore';
import { BookOpen, Clock, Layers, ChevronRight, GraduationCap, FlaskConical, Calculator, Atom } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const iconMap: Record<string, React.ElementType> = {
  CALC_BC: Calculator,
  PHYSICS_C: Atom,
  MATH_AA_HL: Calculator,
  PHYSICS_HL: FlaskConical,
};

export default function Learning() {
  const { courses } = useCourses();
  const navigate = useNavigate();

  const grouped = {
    AP: courses.filter(c => c.curriculum === 'AP'),
    IB: courses.filter(c => c.curriculum === 'IB'),
    'A-Level': courses.filter(c => c.curriculum === 'A-Level'),
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2"><BookOpen className="w-6 h-6" /> Learning Center</h2>
        <p className="text-gray-500 mt-1">Structured curriculum paths for AP, A-Level & IB</p>
      </div>

      <Tabs defaultValue="AP" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="AP">AP</TabsTrigger>
          <TabsTrigger value="IB">IB</TabsTrigger>
          <TabsTrigger value="A-Level">A-Level</TabsTrigger>
        </TabsList>

        {Object.entries(grouped).map(([curriculum, list]) => (
          <TabsContent key={curriculum} value={curriculum} className="mt-6">
            <div className="grid gap-4">
              {list.map(course => {
                const Icon = iconMap[course.subject_code] || GraduationCap;
                return (
                  <Card key={course.id} className={`hover:shadow-md transition-shadow ${!course.is_active ? 'opacity-60' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${course.is_active ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-lg">{course.full_name}</h3>
                              {course.is_active ? (
                                <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
                              ) : (
                                <Badge variant="secondary">Coming Soon</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{course.description}</p>
                            <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                              <span className="flex items-center gap-1"><Layers className="w-4 h-4" />{course.total_units} Units</span>
                              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{course.estimated_hours}h</span>
                            </div>
                            {course.is_active && (
                              <div className="mt-3">
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span>Progress</span><span>Unit 1 of {course.total_units}</span>
                                </div>
                                <Progress value={10} className="h-2" />
                              </div>
                            )}
                          </div>
                        </div>
                        {course.is_active && (
                          <button onClick={() => navigate(`/learning/${course.id}/u1`)} className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Start <ChevronRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              {list.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No courses available for {curriculum} yet.</p>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
