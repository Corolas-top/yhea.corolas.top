import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { BookOpen, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CURRICULA = ['AP', 'IB', 'A-Level'];

export default function Curriculum() {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    supabase.from('courses').select('*').eq('is_active', true).order('subject_name').then(({ data }) => setCourses(data || []));
  }, []);

  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold flex items-center gap-2"><BookOpen className="w-6 h-6 text-blue-400" />Curriculum</h2><p className="text-gray-400 mt-1 text-sm">AP, IB, and A-Level courses with full syllabi</p></div>
      <Tabs defaultValue="AP">
        <TabsList className="bg-[#1e293b] border border-white/10">{CURRICULA.map(c => <TabsTrigger key={c} value={c}>{c}</TabsTrigger>)}</TabsList>
        {CURRICULA.map(cur => (
          <TabsContent key={cur} value={cur} className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {courses.filter(c => c.curriculum === cur).map(c => (
                <Card key={c.id} className="bg-[#1e293b] border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center"><BookOpen className="w-5 h-5 text-blue-400" /></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{c.full_name}</p>
                        <p className="text-xs text-gray-500">{c.total_units} units · {c.estimated_hours || '?'} hrs</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    </div>
                    {c.description && <p className="text-xs text-gray-500 mt-2 line-clamp-2">{c.description}</p>}
                  </CardContent>
                </Card>
              ))}
              {courses.filter(c => c.curriculum === cur).length === 0 && <p className="text-gray-500 text-sm col-span-2">No courses yet. Add them in the database.</p>}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
