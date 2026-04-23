import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ExternalLink, ChevronRight, Award, GraduationCap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Learning() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<any[]>([]);
  const [tests, setTests] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, [user]);

  const fetchData = async () => {
    setLoading(true);
    // All courses
    const { data: cData } = await supabase.from('courses').select('*').eq('is_active', true).order('subject_name', { ascending: true });
    setCourses(cData || []);
    // Standardized tests
    const { data: tData } = await supabase.from('standardized_tests').select('*, sections:standardized_test_sections(*)').eq('is_active', true);
    setTests(tData || []);
    // Profile for "My Courses"
    if (user) {
      const { data: p } = await supabase.from('student_profiles').select('*').eq('user_id', user.id).single();
      setProfile(p);
    }
    setLoading(false);
  };

  const mySubjects = profile?.subjects || [];
  const myCurriculum = profile?.curriculum;

  const myCourses = courses.filter(c => mySubjects.some((s: string) => c.full_name?.includes(s) || c.subject_name?.includes(s)));
  const apCourses = courses.filter(c => c.curriculum === 'AP');
  const ibCourses = courses.filter(c => c.curriculum === 'IB');
  const alCourses = courses.filter(c => c.curriculum === 'A-Level');

  const langTests = tests.filter(t => t.category === 'language');
  const acadTests = tests.filter(t => t.category === 'academic');

  const CourseCard = ({ course }: { course: any }) => (
    <Card className="bg-[#1e293b] border-white/10 hover:border-blue-500/30 transition-all cursor-pointer group" onClick={() => navigate(`/learning/${course.id}/u1`)}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center"><BookOpen className="w-5 h-5 text-blue-400" /></div>
          <div className="flex-1 min-w-0"><p className="font-medium text-sm truncate">{course.full_name}</p><p className="text-xs text-gray-500">{course.total_units} units \u00b7 {course.estimated_hours || '?'} hrs</p></div>
          <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors" />
        </div>
        {course.description && <p className="text-xs text-gray-500 mt-2 line-clamp-2">{course.description}</p>}
        {course.official_guide_url && (
          <button onClick={(e) => { e.stopPropagation(); window.open(course.official_guide_url, '_blank'); }} className="text-xs text-blue-400 hover:underline mt-2 flex items-center gap-1"><ExternalLink className="w-3 h-3" />Official Guide</button>
        )}
      </CardContent>
    </Card>
  );

  const TestCard = ({ test }: { test: any }) => (
    <Card className="bg-[#1e293b] border-white/10">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center"><Award className="w-5 h-5 text-amber-400" /></div>
          <div className="flex-1"><p className="font-medium text-sm">{test.name}</p><p className="text-xs text-gray-500">{test.max_score || 'N/A'} max \u00b7 {test.duration || 'N/A'}</p></div>
        </div>
        {test.sections && test.sections.length > 0 && (
          <div className="mt-3 space-y-1">
            {test.sections.map((s: any) => (
              <div key={s.id} className="flex items-center justify-between text-xs p-2 bg-[#0f172a] rounded"><span className="text-gray-300">{s.name}</span><span className="text-gray-500">{s.duration} \u00b7 {s.score_range}</span></div>
            ))}
          </div>
        )}
        {test.registration_url && <button onClick={() => window.open(test.registration_url, '_blank')} className="text-xs text-blue-400 hover:underline mt-2 flex items-center gap-1"><ExternalLink className="w-3 h-3" />Register</button>}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold flex items-center gap-2"><BookOpen className="w-6 h-6 text-blue-400" />Learning Center</h2><p className="text-gray-400 mt-1">Courses, standardized tests, and study materials</p></div>

      <Tabs defaultValue="my-courses">
        <TabsList className="bg-[#1e293b] border border-white/10">
          <TabsTrigger value="my-courses">My Courses</TabsTrigger>
          <TabsTrigger value="standardized">Standardized Tests</TabsTrigger>
          <TabsTrigger value="ap">AP</TabsTrigger>
          <TabsTrigger value="ib">IB</TabsTrigger>
          <TabsTrigger value="a-level">A-Level</TabsTrigger>
        </TabsList>

        <TabsContent value="my-courses" className="mt-4">
          {!myCurriculum ? (
            <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-8 text-center text-gray-500">
              <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-30" /><p>Complete onboarding to see your courses.</p>
            </CardContent></Card>
          ) : myCourses.length === 0 ? (
            <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-8 text-center text-gray-500">
              <p>No matching courses. Select subjects in your profile!</p>
            </CardContent></Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">{myCourses.map(c => <CourseCard key={c.id} course={c} />)}</div>
          )}
        </TabsContent>

        <TabsContent value="standardized" className="mt-4">
          <div className="space-y-6">
            <div><h3 className="font-semibold text-sm text-gray-400 mb-2">Language Tests</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-3">{langTests.map(t => <TestCard key={t.id} test={t} />)}</div></div>
            <div><h3 className="font-semibold text-sm text-gray-400 mb-2">Academic Tests</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-3">{acadTests.map(t => <TestCard key={t.id} test={t} />)}</div></div>
          </div>
        </TabsContent>

        <TabsContent value="ap" className="mt-4"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">{apCourses.map(c => <CourseCard key={c.id} course={c} />)}</div></TabsContent>
        <TabsContent value="ib" className="mt-4"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">{ibCourses.map(c => <CourseCard key={c.id} course={c} />)}</div></TabsContent>
        <TabsContent value="a-level" className="mt-4"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">{alCourses.map(c => <CourseCard key={c.id} course={c} />)}</div></TabsContent>
      </Tabs>
    </div>
  );
}
