import { useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Plus, GraduationCap, FileText, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const events = [
  { date: 5, title: 'SAT Registration', type: 'deadline', color: 'bg-red-500/20 text-red-400 border-red-500/20' },
  { date: 12, title: 'Chain Rule Study', type: 'study', color: 'bg-blue-500/20 text-blue-400 border-blue-500/20' },
  { date: 15, title: 'MIT EA Deadline', type: 'deadline', color: 'bg-red-500/20 text-red-400 border-red-500/20' },
  { date: 18, title: 'Physics IA Draft', type: 'assignment', color: 'bg-amber-500/20 text-amber-400 border-amber-500/20' },
  { date: 22, title: 'TOEFL Mock Test', type: 'exam', color: 'bg-purple-500/20 text-purple-400 border-purple-500/20' },
  { date: 25, title: 'Integration Review', type: 'study', color: 'bg-blue-500/20 text-blue-400 border-blue-500/20' },
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1)); // April 2026
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const getEventsForDay = (day: number) => events.filter(e => e.date === day);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold flex items-center gap-2"><CalendarDays className="w-6 h-6 text-amber-400" />Calendar</h2><p className="text-gray-400 mt-1">Syncs with your Planning and Tasks</p></div>
        <Button size="sm" className="bg-blue-600"><Plus className="w-4 h-4 mr-1" />Add Event</Button>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between bg-[#1e293b] border border-white/10 rounded-xl p-4">
        <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="p-2 hover:bg-white/5 rounded-lg"><ChevronLeft className="w-5 h-5" /></button>
        <h3 className="text-lg font-bold">{currentDate.toLocaleString('en', { month: 'long', year: 'numeric' })}</h3>
        <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="p-2 hover:bg-white/5 rounded-lg"><ChevronRight className="w-5 h-5" /></button>
      </div>

      {/* Calendar Grid */}
      <Card className="bg-[#1e293b] border-white/10">
        <CardContent className="p-4">
          <div className="grid grid-cols-7 gap-1">
            {DAYS.map(d => <div key={d} className="text-center text-xs font-medium text-gray-500 py-2">{d}</div>)}
            {Array.from({ length: firstDay }, (_, i) => <div key={`empty-${i}`} />)}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const dayEvents = getEventsForDay(day);
              const isToday = day === 22; // demo
              return (
                <div key={day} className={`min-h-[80px] p-1 rounded-lg border ${isToday ? 'border-blue-500/30 bg-blue-500/5' : 'border-transparent hover:bg-white/5'} transition-colors`}>
                  <span className={`text-sm font-medium ${isToday ? 'text-blue-400' : 'text-gray-300'}`}>{day}</span>
                  <div className="space-y-0.5 mt-1">
                    {dayEvents.map((e, idx) => (
                      <div key={idx} className={`text-[10px] px-1.5 py-0.5 rounded ${e.color} truncate`}>{e.title}</div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events List */}
      <div className="space-y-2">
        <h3 className="font-semibold text-sm text-gray-400 uppercase tracking-wider">Upcoming</h3>
        {events.slice(0, 4).map((e, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-[#1e293b] border border-white/10 rounded-lg">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${e.type === 'deadline' ? 'bg-red-500/10' : e.type === 'exam' ? 'bg-purple-500/10' : 'bg-blue-500/10'}`}>
              {e.type === 'deadline' ? <AlertCircle className="w-5 h-5 text-red-400" /> : e.type === 'exam' ? <GraduationCap className="w-5 h-5 text-purple-400" /> : <FileText className="w-5 h-5 text-blue-400" />}
            </div>
            <div className="flex-1"><p className="text-sm font-medium">{e.title}</p><p className="text-xs text-gray-500">Apr {e.date}, 2026</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}
