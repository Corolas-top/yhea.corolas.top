import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { User, Camera, Save } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProfilePage() {
  const { user } = useAuth();
  const [, setProfile] = useState<any>(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [curriculum, setCurriculum] = useState<string[]>([]);
  const [year, setYear] = useState(1);
  const [countries, setCountries] = useState('');
  const [majors, setMajors] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (user) fetchProfile(); }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    setName(user.name || '');
    setBio(user.bio || '');
    const { data } = await supabase.from('student_profiles').select('*').eq('user_id', user.id).single();
    if (data) {
      setProfile(data);
    // Profile data loaded for reference
      setCurriculum(data.curriculum || []);
      setYear(data.year || 1);
      setCountries((data.target_countries || []).join(', '));
      setMajors((data.target_majors || []).join(', '));
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    await supabase.from('users').update({ name, bio }).eq('id', user.id);
    await supabase.from('student_profiles').update({
      curriculum, year,
      target_countries: countries.split(',').map((s: string) => s.trim()).filter(Boolean),
      target_majors: majors.split(',').map((s: string) => s.trim()).filter(Boolean),
      updated_at: new Date().toISOString()
    }).eq('user_id', user.id);
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center gap-2"><User className="w-6 h-6 text-blue-400" />My Profile</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-5 text-center">
          <div className="relative mx-auto w-24 h-24 mb-4">
            <div className="w-24 h-24 rounded-full bg-blue-600/20 flex items-center justify-center text-2xl font-bold">{name?.[0] || '?'}</div>
            <label className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700">
              <Camera className="w-4 h-4" /><input type="file" accept="image/*" className="hidden" />
            </label>
          </div>
          <Input value={name} onChange={e => setName(e.target.value)} className="bg-[#0f172a] border-white/10 text-center font-medium mb-2" />
          <Input value={bio} onChange={e => setBio(e.target.value)} placeholder="Bio" className="bg-[#0f172a] border-white/10 text-sm text-center mb-3" />
          <Button size="sm" className="bg-blue-600" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : <><Save className="w-4 h-4 mr-1" />Save</>}</Button>
        </CardContent></Card>
        <div className="lg:col-span-2 space-y-4">
          <Tabs defaultValue="info">
            <TabsList className="bg-[#1e293b] border border-white/10"><TabsTrigger value="info">My Info</TabsTrigger><TabsTrigger value="goal">My Goal</TabsTrigger><TabsTrigger value="scores">Scores</TabsTrigger></TabsList>
            <TabsContent value="info" className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#1e293b] border border-white/10 rounded-lg"><p className="text-xs text-gray-500">Curriculum</p>
                  <div className="flex gap-2 mt-1">{['AP','IB','A-Level'].map(c => <button key={c} onClick={() => setCurriculum(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])} className={`px-2 py-1 rounded text-xs ${curriculum.includes(c) ? 'bg-blue-600/20 text-blue-400' : 'bg-[#0f172a] text-gray-500'}`}>{c}</button>)}</div>
                </div>
                <div className="p-3 bg-[#1e293b] border border-white/10 rounded-lg"><p className="text-xs text-gray-500">Year</p>
                  <div className="flex gap-1 mt-1">{[1,2,3,4].map(y => <button key={y} onClick={() => setYear(y)} className={`px-2 py-1 rounded text-xs ${year === y ? 'bg-blue-600/20 text-blue-400' : 'bg-[#0f172a] text-gray-500'}`}>{y}</button>)}</div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="goal" className="mt-4 space-y-3">
              <div className="p-3 bg-[#1e293b] border border-white/10 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Target Countries/Regions (comma separated)</p>
                <Input value={countries} onChange={e => setCountries(e.target.value)} className="bg-[#0f172a] border-white/10" />
              </div>
              <div className="p-3 bg-[#1e293b] border border-white/10 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Target Majors (comma separated)</p>
                <Input value={majors} onChange={e => setMajors(e.target.value)} className="bg-[#0f172a] border-white/10" />
              </div>
            </TabsContent>
            <TabsContent value="scores" className="mt-4">
              <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-4 text-center text-gray-500">Add your course and test scores here.</CardContent></Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
