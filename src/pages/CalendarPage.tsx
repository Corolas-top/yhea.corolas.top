import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import {
  CalendarDays, ChevronLeft, ChevronRight, Plus, Trash2, Clock, MapPin
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

export default function CalendarPage() {
  const { user } = useAuth();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formType, setFormType] = useState('task');
  const [formStart, setFormStart] = useState('');
  const [formEnd, setFormEnd] = useState('');
  const [formAllDay, setFormAllDay] = useState(false);
  const [formLocation, setFormLocation] = useState('');

  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  useEffect(() => { fetchEvents(); }, [user, currentMonth, currentYear]);

  const fetchEvents = async () => {
    if (!user) return;
    setLoading(true);
    const startOfMonth = new Date(currentYear, currentMonth, 1).toISOString();
    const endOfMonth = new Date(currentYear, currentMonth + 1, 1).toISOString();
    const { data } = await supabase
      .from('calendar_events').select('*')
      .eq('user_id', user.id)
      .gte('start_at', startOfMonth)
      .lt('start_at', endOfMonth)
      .order('start_at', { ascending: true });
    setEvents(data || []);
    setLoading(false);
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const getEventsForDate = (day: number) => {
    const dateStr = new Date(currentYear, currentMonth, day).toDateString();
    return events.filter(e => new Date(e.start_at).toDateString() === dateStr);
  };

  const handleAddEvent = async () => {
    if (!user || !formTitle.trim() || !formStart) return;
    const { error } = await supabase.from('calendar_events').insert({
      user_id: user.id,
      title: formTitle.trim(),
      description: formDesc.trim() || null,
      event_type: formType,
      start_at: new Date(formStart).toISOString(),
      end_at: formEnd ? new Date(formEnd).toISOString() : null,
      all_day: formAllDay,
      location: formLocation.trim() || null,
    });
    if (!error) {
      setShowAdd(false); resetForm(); fetchEvents();
    }
  };

  const handleDeleteEvent = async (id: string) => {
    await supabase.from('calendar_events').delete().eq('id', id);
    fetchEvents();
  };

  const resetForm = () => {
    setFormTitle(''); setFormDesc(''); setFormType('task');
    setFormStart(''); setFormEnd(''); setFormAllDay(false); setFormLocation('');
  };

  const openAddDialog = (day?: number) => {
    if (day) {
      const d = new Date(currentYear, currentMonth, day);
      d.setHours(9, 0, 0, 0);
      setFormStart(d.toISOString().slice(0, 16));
    }
    setShowAdd(true);
  };

  const selectedEvents = selectedDate ? events.filter(e => new Date(e.start_at).toDateString() === new Date(selectedDate).toDateString()) : [];

  const typeColors: Record<string, string> = {
    task: 'bg-blue-500', exam: 'bg-purple-500', meeting: 'bg-emerald-500', deadline: 'bg-red-500', reminder: 'bg-amber-500'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold flex items-center gap-2"><CalendarDays className="w-6 h-6 text-purple-400" />Calendar</h2><p className="text-gray-400 mt-1">Manage your schedule and deadlines</p></div>
        <Button className="bg-purple-600" onClick={() => openAddDialog()}><Plus className="w-4 h-4 mr-1" />Add Event</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <Card className="lg:col-span-2 bg-[#1e293b] border-white/10"><CardContent className="p-5">
          {/* Month Nav */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => { if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); } else setCurrentMonth(currentMonth - 1); }} className="p-2 hover:bg-white/5 rounded-lg"><ChevronLeft className="w-5 h-5" /></button>
            <h3 className="font-bold text-lg">{monthNames[currentMonth]} {currentYear}</h3>
            <button onClick={() => { if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); } else setCurrentMonth(currentMonth + 1); }} className="p-2 hover:bg-white/5 rounded-lg"><ChevronRight className="w-5 h-5" /></button>
          </div>
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d} className="text-center text-xs font-medium text-gray-500 py-2">{d}</div>)}
          </div>
          {/* Days */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }, (_, i) => <div key={`e-${i}`} />)}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const dayEvents = getEventsForDate(day);
              const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
              const isSelected = selectedDate === new Date(currentYear, currentMonth, day).toISOString().split('T')[0];
              return (
                <button key={day} onClick={() => { const ds = new Date(currentYear, currentMonth, day).toISOString().split('T')[0]; setSelectedDate(ds); }}
                  className={`min-h-[80px] p-1.5 rounded-lg text-left transition-colors border ${isSelected ? 'border-purple-500 bg-purple-500/10' : isToday ? 'border-blue-500 bg-blue-500/5' : 'border-transparent hover:bg-white/5'}`}>
                  <span className={`text-sm font-medium ${isToday ? 'text-blue-400' : 'text-gray-300'}`}>{day}</span>
                  <div className="flex flex-wrap gap-0.5 mt-1">
                    {dayEvents.slice(0, 3).map((e, j) => (
                      <div key={j} className={`w-1.5 h-1.5 rounded-full ${typeColors[e.event_type] || 'bg-gray-500'}`} />
                    ))}
                    {dayEvents.length > 3 && <span className="text-[9px] text-gray-500 ml-0.5">+{dayEvents.length - 3}</span>}
                  </div>
                </button>
              );
            })}
          </div>
          {loading && <p className="text-center text-sm text-gray-500 mt-4">Loading events...</p>}
        </CardContent></Card>

        {/* Event List / Detail */}
        <div className="space-y-4">
          <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-5">
            <h3 className="font-bold mb-3">
              {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'Select a date'}
            </h3>
            {selectedEvents.length === 0 ? (
              <p className="text-sm text-gray-500">{selectedDate ? 'No events on this day.' : 'Click a date to see events.'}</p>
            ) : (
              <div className="space-y-2">
                {selectedEvents.map(e => (
                  <div key={e.id} className="p-3 bg-[#0f172a] rounded-lg group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${typeColors[e.event_type] || 'bg-gray-500'}`} />
                        <p className="text-sm font-medium">{e.title}</p>
                      </div>
                      <button onClick={() => handleDeleteEvent(e.id)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                    {e.description && <p className="text-xs text-gray-500 mt-1 ml-4">{e.description}</p>}
                    <div className="flex items-center gap-3 mt-1 ml-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{e.all_day ? 'All day' : new Date(e.start_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      {e.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{e.location}</span>}
                    </div>
                    <Badge className="mt-1 ml-4 text-[10px]" variant="outline">{e.event_type}</Badge>
                  </div>
                ))}
              </div>
            )}
            {selectedDate && <Button size="sm" className="mt-3 w-full bg-purple-600/20 text-purple-400 hover:bg-purple-600/30" onClick={() => openAddDialog(new Date(selectedDate).getDate())}><Plus className="w-3.5 h-3.5 mr-1" />Add Event</Button>}
          </CardContent></Card>

          {/* Legend */}
          <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              {Object.entries(typeColors).map(([t, c]) => (
                <div key={t} className="flex items-center gap-1.5"><div className={`w-2 h-2 rounded-full ${c}`} /><span className="text-xs text-gray-400 capitalize">{t}</span></div>
              ))}
            </div>
          </CardContent></Card>
        </div>
      </div>

      {/* Add Event Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="bg-[#1e293b] border-white/10 text-white max-w-md">
          <DialogHeader><DialogTitle className="flex items-center gap-2"><Plus className="w-5 h-5" />Add New Event</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Event Title *" value={formTitle} onChange={e => setFormTitle(e.target.value)} className="bg-[#0f172a] border-white/10" />
            <Textarea placeholder="Description (optional)" value={formDesc} onChange={e => setFormDesc(e.target.value)} className="bg-[#0f172a] border-white/10 min-h-[60px]" />
            <div className="grid grid-cols-2 gap-2">
              <div><label className="text-xs text-gray-400">Start *</label><Input type="datetime-local" value={formStart} onChange={e => setFormStart(e.target.value)} className="bg-[#0f172a] border-white/10" /></div>
              <div><label className="text-xs text-gray-400">End</label><Input type="datetime-local" value={formEnd} onChange={e => setFormEnd(e.target.value)} className="bg-[#0f172a] border-white/10" /></div>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Event Type</label>
              <div className="flex gap-2">
                {['task','exam','meeting','deadline','reminder'].map(t => (
                  <button key={t} onClick={() => setFormType(t)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${formType === t ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30' : 'bg-[#0f172a] border border-white/10 text-gray-400'}`}>{t}</button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2"><input type="checkbox" checked={formAllDay} onChange={e => setFormAllDay(e.target.checked)} className="rounded border-white/20" /><span className="text-sm text-gray-400">All day event</span></div>
            <Input placeholder="Location (optional)" value={formLocation} onChange={e => setFormLocation(e.target.value)} className="bg-[#0f172a] border-white/10" />
            <Button className="w-full bg-purple-600" onClick={handleAddEvent} disabled={!formTitle.trim() || !formStart}><Plus className="w-4 h-4 mr-1" />Create Event</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
