import { useState } from 'react';
import { Video, Plus, ExternalLink, Users, Globe, BookOpen, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const demoMeetings = [
  { id: 'm1', title: 'AP Calc BC Study Session', type: 'group', platform: 'zoom', url: 'https://zoom.us/j/1234567890', meeting_id: '123 456 7890', password: 'calculus', host: 'Alex', scheduled_at: 'Today 8:00 PM', duration: 60, participants: 5, max: 10 },
  { id: 'm2', title: 'College Essay Review', type: 'group', platform: 'zoom', url: 'https://zoom.us/j/0987654321', meeting_id: '098 765 4321', password: 'essays', host: 'Sarah', scheduled_at: 'Tomorrow 7:00 PM', duration: 90, participants: 3, max: 8 },
  { id: 'm3', title: 'Open Study Room', type: 'world', platform: 'zoom', url: 'https://zoom.us/j/5555555555', meeting_id: '555 555 5555', password: 'study', host: 'Yhea', scheduled_at: 'Ongoing', duration: 240, participants: 12, max: 50 },
];

export default function Meeting() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold flex items-center gap-2"><Video className="w-6 h-6 text-violet-400" />Meeting</h2><p className="text-gray-400 mt-1">Share and join study sessions with peers</p></div>
        <Button className="bg-violet-600" onClick={() => setShowCreate(!showCreate)}><Plus className="w-4 h-4 mr-1" />Host Meeting</Button>
      </div>

      {/* How it works */}
      <div className="bg-violet-500/5 border border-violet-500/10 rounded-lg p-4">
        <p className="text-sm text-gray-400"><strong className="text-violet-400">How it works:</strong> Start your meeting on Zoom, Teams, or Google Meet first, then paste the meeting details here. Others can join via the link. <strong className="text-gray-300">Class</strong> is for course-related sessions (coming with campus version). <strong className="text-gray-300">Group</strong> is shared with your friends. <strong className="text-gray-300">World</strong> is open to all Yhea users.</p>
      </div>

      {showCreate && (
        <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-5 space-y-3">
          <h3 className="font-bold">Host a New Meeting</h3>
          <Input placeholder="Meeting Title" className="bg-[#0f172a] border-white/10" />
          <div className="grid grid-cols-2 gap-3">
            <select className="px-3 py-2 rounded-lg bg-[#0f172a] border border-white/10 text-sm text-gray-300">
              <option value="group">Group</option><option value="world">World</option><option value="class">Class (Coming Soon)</option>
            </select>
            <select className="px-3 py-2 rounded-lg bg-[#0f172a] border border-white/10 text-sm text-gray-300">
              <option value="zoom">Zoom</option><option value="teams">Teams</option><option value="google_meet">Google Meet</option><option value="other">Other</option>
            </select>
          </div>
          <Input placeholder="Meeting URL" className="bg-[#0f172a] border-white/10" />
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="Meeting ID" className="bg-[#0f172a] border-white/10" />
            <Input placeholder="Password (optional)" className="bg-[#0f172a] border-white/10" />
          </div>
          <div className="flex gap-2 justify-end"><Button variant="ghost" size="sm" onClick={() => setShowCreate(false)}>Cancel</Button><Button size="sm" className="bg-violet-600">Create</Button></div>
        </CardContent></Card>
      )}

      <Tabs defaultValue="group">
        <TabsList className="bg-[#1e293b] border border-white/10">
          <TabsTrigger value="class" className="flex items-center gap-1"><BookOpen className="w-4 h-4" />Class</TabsTrigger>
          <TabsTrigger value="group" className="flex items-center gap-1"><Users className="w-4 h-4" />Group</TabsTrigger>
          <TabsTrigger value="world" className="flex items-center gap-1"><Globe className="w-4 h-4" />World</TabsTrigger>
        </TabsList>

        <TabsContent value="class" className="mt-4">
          <div className="text-center py-12 text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="font-medium">Course meetings coming with campus version</p>
            <p className="text-sm mt-1">Will be linked to your selected courses</p>
          </div>
        </TabsContent>

        {['group', 'world'].map(tabType => (
          <TabsContent key={tabType} value={tabType} className="mt-4 space-y-3">
            {demoMeetings.filter(m => m.type === tabType).map(m => (
              <Card key={m.id} className="bg-[#1e293b] border-white/10"><CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-violet-600/20 rounded-xl flex items-center justify-center"><Video className="w-6 h-6 text-violet-400" /></div>
                    <div>
                      <h3 className="font-bold">{m.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs border-white/10 capitalize">{m.platform}</Badge>
                        <span className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" />{m.scheduled_at}</span>
                        <span className="text-xs text-gray-500 flex items-center gap-1"><Users className="w-3 h-3" />{m.participants}/{m.max}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <span>ID: {m.meeting_id}</span>
                        {m.password && <span>· PW: {m.password}</span>}
                      </div>
                    </div>
                  </div>
                  <a href={m.url} target="_blank" className="flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300 bg-violet-600/20 px-3 py-2 rounded-lg"><ExternalLink className="w-4 h-4" />Join</a>
                </div>
              </CardContent></Card>
            ))}
            {demoMeetings.filter(m => m.type === tabType).length === 0 && <p className="text-center py-12 text-gray-500">No {tabType} meetings right now.</p>}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
