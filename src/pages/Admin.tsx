import { useState } from 'react';
import {
  Settings, Database, Plus, Trash2, Edit3, Save, X,
  BookOpen, University, ClipboardList, GraduationCap,
  ChevronDown, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { seedCourses, seedUniversities, seedMajors, seedUnits, seedNodes, seedApplicationGuides } from '@/lib/seed-data';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState(seedCourses);
  const [universities] = useState(seedUniversities);
  const [majors] = useState(seedMajors);
  const [guides] = useState(seedApplicationGuides);
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);

  // Add new course form state
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({ curriculum: 'AP', subject_code: '', subject_name: '', full_name: '', total_units: 0, estimated_hours: 0, description: '' });

  const handleAddCourse = () => {
    if (!newCourse.subject_code || !newCourse.subject_name) return;
    const course = {
      id: `${newCourse.curriculum.toLowerCase()}-${newCourse.subject_code.toLowerCase()}`,
      ...newCourse,
      official_guide_url: '',
      is_active: true,
      created_at: new Date().toISOString(),
    };
    setCourses([...courses, course as any]);
    setNewCourse({ curriculum: 'AP', subject_code: '', subject_name: '', full_name: '', total_units: 0, estimated_hours: 0, description: '' });
    setShowAddCourse(false);
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2"><Settings className="w-6 h-6" /> Admin Panel</h2>
          <p className="text-gray-500 mt-1">Manage all database content manually</p>
        </div>
        <Badge variant="default" className="bg-purple-100 text-purple-700">Admin Only</Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4 text-center"><BookOpen className="w-6 h-6 text-blue-600 mx-auto mb-1" /><p className="text-2xl font-bold">{courses.length}</p><p className="text-xs text-gray-500">Courses</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><University className="w-6 h-6 text-purple-600 mx-auto mb-1" /><p className="text-2xl font-bold">{universities.length}</p><p className="text-xs text-gray-500">Universities</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><GraduationCap className="w-6 h-6 text-green-600 mx-auto mb-1" /><p className="text-2xl font-bold">{majors.length}</p><p className="text-xs text-gray-500">Majors</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><ClipboardList className="w-6 h-6 text-amber-600 mx-auto mb-1" /><p className="text-2xl font-bold">{guides.length}</p><p className="text-xs text-gray-500">Guides</p></CardContent></Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="courses"><BookOpen className="w-4 h-4 mr-1" />Courses</TabsTrigger>
          <TabsTrigger value="universities"><University className="w-4 h-4 mr-1" />Universities</TabsTrigger>
          <TabsTrigger value="guides"><ClipboardList className="w-4 h-4 mr-1" />Guides</TabsTrigger>
          <TabsTrigger value="data"><Database className="w-4 h-4 mr-1" />Import/Export</TabsTrigger>
        </TabsList>

        {/* Courses Tab */}
        <TabsContent value="courses" className="mt-6 space-y-4">
          <div className="flex justify-between">
            <h3 className="font-bold text-lg">Manage Courses</h3>
            <Button size="sm" onClick={() => setShowAddCourse(!showAddCourse)}><Plus className="w-4 h-4 mr-1" />Add Course</Button>
          </div>

          {showAddCourse && (
            <Card>
              <CardContent className="p-5 space-y-3">
                <h4 className="font-medium">New Course</h4>
                <div className="grid grid-cols-2 gap-3">
                  <select value={newCourse.curriculum} onChange={e => setNewCourse({ ...newCourse, curriculum: e.target.value as any })} className="px-3 py-2 border rounded-lg text-sm">
                    <option value="AP">AP</option><option value="IB">IB</option><option value="A-Level">A-Level</option>
                  </select>
                  <Input placeholder="Subject Code (e.g. CALC_BC)" value={newCourse.subject_code} onChange={e => setNewCourse({ ...newCourse, subject_code: e.target.value })} />
                </div>
                <Input placeholder="Subject Name" value={newCourse.subject_name} onChange={e => setNewCourse({ ...newCourse, subject_name: e.target.value })} />
                <Input placeholder="Full Name (e.g. AP Calculus BC)" value={newCourse.full_name} onChange={e => setNewCourse({ ...newCourse, full_name: e.target.value })} />
                <Textarea placeholder="Description" value={newCourse.description} onChange={e => setNewCourse({ ...newCourse, description: e.target.value })} rows={2} />
                <div className="grid grid-cols-2 gap-3">
                  <Input type="number" placeholder="Total Units" value={newCourse.total_units} onChange={e => setNewCourse({ ...newCourse, total_units: parseInt(e.target.value) || 0 })} />
                  <Input type="number" placeholder="Estimated Hours" value={newCourse.estimated_hours} onChange={e => setNewCourse({ ...newCourse, estimated_hours: parseInt(e.target.value) || 0 })} />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleAddCourse}><Save className="w-4 h-4 mr-1" />Save</Button>
                  <Button size="sm" variant="ghost" onClick={() => setShowAddCourse(false)}><X className="w-4 h-4 mr-1" />Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-2">
            {courses.map(course => (
              <Card key={course.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge>{course.curriculum}</Badge>
                    <div>
                      <p className="font-medium">{course.full_name}</p>
                      <p className="text-xs text-gray-500">{course.total_units} units · {course.estimated_hours}h · {course.is_active ? 'Active' : 'Inactive'}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Edit3 className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDeleteCourse(course.id)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Units & Knowledge Nodes */}
          <div className="mt-6">
            <h3 className="font-bold text-lg mb-3">Units & Knowledge Nodes</h3>
            {Object.entries(seedUnits).map(([courseId, units]) => (
              <div key={courseId} className="mb-4">
                <p className="text-sm font-medium text-gray-500 mb-2">{courses.find(c => c.id === courseId)?.full_name || courseId}</p>
                <div className="space-y-1">
                  {units.map(unit => (
                    <div key={unit.id}>
                      <button
                        onClick={() => setExpandedUnit(expandedUnit === unit.id ? null : unit.id)}
                        className="w-full flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                      >
                        {expandedUnit === unit.id ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        <span className="font-medium text-sm">Unit {unit.unit_number}: {unit.unit_title}</span>
                        <span className="text-xs text-gray-500 ml-auto">{seedNodes[unit.id]?.length || 0} topics</span>
                      </button>
                      {expandedUnit === unit.id && seedNodes[unit.id] && (
                        <div className="ml-8 mt-1 space-y-1">
                          {seedNodes[unit.id].map((node: any) => (
                            <div key={node.id} className="p-3 bg-white dark:bg-gray-900 border rounded-lg text-sm">
                              <p className="font-medium">{node.node_number}: {node.title}</p>
                              <p className="text-xs text-gray-500 mt-1">{node.content.slice(0, 100)}...</p>
                              <div className="flex gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">Difficulty: {node.difficulty}</Badge>
                                <Badge variant="outline" className="text-xs">{node.estimated_minutes} min</Badge>
                                <Badge variant="outline" className="text-xs truncate max-w-[200px]">Source: {node.source_document}</Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Universities Tab */}
        <TabsContent value="universities" className="mt-6 space-y-4">
          <div className="flex justify-between">
            <h3 className="font-bold text-lg">Manage Universities</h3>
            <Button size="sm"><Plus className="w-4 h-4 mr-1" />Add University</Button>
          </div>
          <div className="space-y-2">
            {universities.map(uni => (
              <Card key={uni.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{uni.name} ({uni.short_name})</p>
                    <p className="text-xs text-gray-500">{uni.country} · QS #{uni.ranking_qs || '-'} · {(uni.acceptance_rate && (uni.acceptance_rate * 100).toFixed(0)) || '-'}% acceptance</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Edit3 className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h3 className="font-bold text-lg mt-6">Majors</h3>
          <div className="space-y-2">
            {majors.map(major => (
              <Card key={major.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{major.major_name}</p>
                    <p className="text-xs text-gray-500">{universities.find(u => u.id === major.university_id)?.short_name} · {major.degree_type} · {major.duration_years} years</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Edit3 className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Guides Tab */}
        <TabsContent value="guides" className="mt-6 space-y-4">
          <div className="flex justify-between">
            <h3 className="font-bold text-lg">Application Guides</h3>
            <Button size="sm"><Plus className="w-4 h-4 mr-1" />Add Guide</Button>
          </div>
          <div className="space-y-2">
            {guides.map(guide => (
              <Card key={guide.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge>{guide.country}</Badge>
                      <p className="font-medium">{guide.title}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Section: {guide.section} · Order: {guide.order_index}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Edit3 className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Import/Export Tab */}
        <TabsContent value="data" className="mt-6 space-y-4">
          <Card>
            <CardHeader><CardTitle>Data Management</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium mb-2">Supabase Setup Instructions</h4>
                <ol className="text-sm space-y-2 list-decimal list-inside text-gray-700 dark:text-gray-300">
                  <li>Go to your Supabase Dashboard</li>
                  <li>Navigate to the SQL Editor</li>
                  <li>Run the database migration (see migration file)</li>
                  <li>Enable Auth providers (Email + Google OAuth)</li>
                  <li>Configure Row Level Security policies</li>
                  <li>Deploy Edge Functions for AI integration</li>
                </ol>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg text-center">
                  <Database className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="font-medium text-sm">Export All Data</p>
                  <p className="text-xs text-gray-500">Download as JSON</p>
                  <Button variant="outline" size="sm" className="mt-3">Export</Button>
                </div>
                <div className="p-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg text-center">
                  <Database className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="font-medium text-sm">Import Data</p>
                  <p className="text-xs text-gray-500">Upload JSON file</p>
                  <Button variant="outline" size="sm" className="mt-3">Import</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
