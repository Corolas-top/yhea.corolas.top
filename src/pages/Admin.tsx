import { useState } from 'react';
import { Settings, Database, Plus, Trash2, Edit3, BookOpen, MapPin, ClipboardList, Award, GraduationCap, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const demoCourses = [
  { id: '1', curriculum: 'AP', name: 'Calculus BC', units: 10, active: true },
  { id: '2', curriculum: 'AP', name: 'Physics C', units: 14, active: false },
  { id: '3', curriculum: 'IB', name: 'Math AA HL', units: 5, active: false },
];

const demoUnis = [
  { id: '1', name: 'MIT', short_name: 'MIT', country: 'USA', qs: 1, active: true },
  { id: '2', name: 'Stanford', short_name: 'Stanford', country: 'USA', qs: 3, active: true },
];

const demoComps = [
  { id: '1', name: 'AMC 12', category: 'STEM', subcategory: 'Mathematics', yhea: 4.5, active: true },
  { id: '2', name: 'Physics Bowl', category: 'STEM', subcategory: 'Physics', yhea: 3.8, active: true },
];

export default function Admin() {
  const [tab, setTab] = useState('courses');
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold flex items-center gap-2"><Settings className="w-6 h-6 text-purple-400" />Admin Panel</h2>
          <Badge className="bg-purple-500/20 text-purple-400">Admin Only</Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[{ icon: BookOpen, label: 'Courses', count: 4 }, { icon: MapPin, label: 'Universities', count: 8 }, { icon: Award, label: 'Competitions', count: 6 }, { icon: ClipboardList, label: 'Guides', count: 5 }].map(s => (
          <Card key={s.label} className="bg-[#1e293b] border-white/10"><CardContent className="p-4 text-center">
            <s.icon className="w-6 h-6 text-blue-400 mx-auto mb-1" /><p className="text-2xl font-bold">{s.count}</p><p className="text-xs text-gray-500">{s.label}</p>
          </CardContent></Card>
        ))}
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-[#1e293b] border border-white/10">
          <TabsTrigger value="courses"><BookOpen className="w-4 h-4 mr-1" />Courses</TabsTrigger>
          <TabsTrigger value="universities"><MapPin className="w-4 h-4 mr-1" />Universities</TabsTrigger>
          <TabsTrigger value="competitions"><Award className="w-4 h-4 mr-1" />Competitions</TabsTrigger>
          <TabsTrigger value="guides"><ClipboardList className="w-4 h-4 mr-1" />Guides</TabsTrigger>
          <TabsTrigger value="data"><Database className="w-4 h-4 mr-1" />Data</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="mt-4 space-y-3">
          <div className="flex justify-between"><h3 className="font-bold">Manage Courses</h3><Button size="sm" onClick={() => setShowAdd(!showAdd)}><Plus className="w-4 h-4 mr-1" />Add</Button></div>
          {showAdd && (
            <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-4 space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <select className="px-3 py-2 rounded-lg bg-[#0f172a] border border-white/10 text-sm"><option>AP</option><option>IB</option><option>A-Level</option></select>
                <Input placeholder="Subject Code" className="bg-[#0f172a] border-white/10" />
                <Input placeholder="Subject Name" className="bg-[#0f172a] border-white/10" />
              </div>
              <Textarea placeholder="Description" className="bg-[#0f172a] border-white/10" rows={2} />
              <div className="flex gap-2 justify-end"><Button variant="ghost" size="sm" onClick={() => setShowAdd(false)}>Cancel</Button><Button size="sm" className="bg-blue-600">Save</Button></div>
            </CardContent></Card>
          )}
          {demoCourses.map(c => (
            <div key={c.id} className="flex items-center justify-between p-4 bg-[#1e293b] border border-white/10 rounded-lg">
              <div className="flex items-center gap-3"><Badge>{c.curriculum}</Badge><div><p className="font-medium">{c.name}</p><p className="text-xs text-gray-500">{c.units} units · {c.active ? 'Active' : 'Inactive'}</p></div></div>
              <div className="flex gap-1"><Button variant="ghost" size="icon" className="h-8 w-8"><Edit3 className="w-4 h-4" /></Button><Button variant="ghost" size="icon" className="h-8 w-8 text-red-400"><Trash2 className="w-4 h-4" /></Button></div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="universities" className="mt-4 space-y-3">
          <div className="flex justify-between"><h3 className="font-bold">Manage Universities</h3><Button size="sm"><Plus className="w-4 h-4 mr-1" />Add</Button></div>
          {demoUnis.map(u => (
            <div key={u.id} className="flex items-center justify-between p-4 bg-[#1e293b] border border-white/10 rounded-lg">
              <div><p className="font-medium">{u.name} ({u.short_name})</p><p className="text-xs text-gray-500">{u.country} · QS #{u.qs}</p></div>
              <div className="flex gap-1"><Button variant="ghost" size="icon" className="h-8 w-8"><Edit3 className="w-4 h-4" /></Button><Button variant="ghost" size="icon" className="h-8 w-8 text-red-400"><Trash2 className="w-4 h-4" /></Button></div>
            </div>
          ))}
          <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-lg">
            <p className="text-sm text-blue-300 font-medium flex items-center gap-2"><GraduationCap className="w-4 h-4" />Upload University Logos</p>
            <p className="text-xs text-gray-400 mt-1">Place PNG files in /public/logos/ folder with format: [university-id].png (e.g., mit.png, stanford.png)</p>
          </div>
        </TabsContent>

        <TabsContent value="competitions" className="mt-4 space-y-3">
          <div className="flex justify-between"><h3 className="font-bold">Manage Competitions</h3><Button size="sm"><Plus className="w-4 h-4 mr-1" />Add</Button></div>
          {demoComps.map(c => (
            <div key={c.id} className="flex items-center justify-between p-4 bg-[#1e293b] border border-white/10 rounded-lg">
              <div><p className="font-medium">{c.name}</p><p className="text-xs text-gray-500">{c.category} · {c.subcategory} · Yhea: {c.yhea}</p></div>
              <div className="flex gap-1"><Button variant="ghost" size="icon" className="h-8 w-8"><Edit3 className="w-4 h-4" /></Button><Button variant="ghost" size="icon" className="h-8 w-8 text-red-400"><Trash2 className="w-4 h-4" /></Button></div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="data" className="mt-4">
          <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-6 space-y-4">
            <div className="p-4 bg-blue-500/5 rounded-lg">
              <h4 className="font-medium text-blue-300 mb-2">Supabase Setup</h4>
              <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
                <li>Run the SQL migration in Supabase SQL Editor</li>
                <li>Enable Auth providers (Email + Google OAuth)</li>
                <li>Deploy Edge Functions with: <code className="bg-[#0f172a] px-2 py-0.5 rounded text-xs">supabase functions deploy agent-chat</code></li>
                <li>Set secrets: <code className="bg-[#0f172a] px-2 py-0.5 rounded text-xs">supabase secrets set KIMI_API_KEY=xxx</code></li>
              </ol>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 border-2 border-dashed border-white/10 rounded-lg text-center"><Database className="w-8 h-8 text-gray-500 mx-auto mb-2" /><p className="text-sm font-medium">Export Data</p><Button variant="outline" size="sm" className="mt-2 border-white/10">Export JSON</Button></div>
              <div className="p-4 border-2 border-dashed border-white/10 rounded-lg text-center"><FileText className="w-8 h-8 text-gray-500 mx-auto mb-2" /><p className="text-sm font-medium">Import Data</p><Button variant="outline" size="sm" className="mt-2 border-white/10">Import JSON</Button></div>
            </div>
          </CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
