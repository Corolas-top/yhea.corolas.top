import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { User, Camera, Save, Award, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [, setLoading] = useState(true);
  const [points, setPoints] = useState<any>(null);
  const [quota, setQuota] = useState<any>(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (user) fetchProfile(); }, [user]);

  const fetchProfile = async () => {
    setLoading(true);
    if (!user) return;
    const { data: p } = await supabase.from('student_profiles').select('*').eq('user_id', user.id).single();
    setProfile(p);
    setName(user.name || '');
    setBio(user.bio || '');
    setAvatarUrl(user.avatar_url || '');

    const { data: pt } = await supabase.from('point_balances').select('*').eq('user_id', user.id).single();
    setPoints(pt);
    const { data: q } = await supabase.from('ai_usage_quotas').select('*').eq('user_id', user.id).single();
    setQuota(q);
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    await supabase.from('users').update({ name, bio }).eq('id', user.id);
    setSaving(false);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files?.[0]) return;
    const file = e.target.files[0];
    const filePath = `${user.id}/avatar-${Date.now()}`;
    const { error } = await supabase.storage.from('yhea').upload(filePath, file);
    if (!error) {
      const { data: url } = supabase.storage.from('yhea').getPublicUrl(filePath);
      setAvatarUrl(url.publicUrl);
      await supabase.from('users').update({ avatar_url: url.publicUrl }).eq('id', user.id);
    }
  };

  const aiUsed = quota ? (quota.base_daily_limit + quota.bonus_from_points - quota.base_remaining - quota.bonus_remaining) : 0;
  const aiTotal = quota ? (quota.base_daily_limit + quota.bonus_from_points) : 10;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center gap-2"><User className="w-6 h-6 text-blue-400" />Profile</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Avatar & Basic Info */}
        <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-5 text-center">
          <div className="relative mx-auto w-24 h-24 mb-4">
            {avatarUrl ? <img src={avatarUrl} className="w-24 h-24 rounded-full object-cover" alt="avatar" /> : <div className="w-24 h-24 rounded-full bg-blue-600/20 flex items-center justify-center text-2xl font-bold">{name?.[0] || '?'}</div>}
            <label className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700">
              <Camera className="w-4 h-4" /><input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
            </label>
          </div>
          <Input value={name} onChange={e => setName(e.target.value)} className="bg-[#0f172a] border-white/10 text-center font-medium mb-2" />
          <Textarea placeholder="Bio" value={bio} onChange={e => setBio(e.target.value)} className="bg-[#0f172a] border-white/10 text-sm min-h-[60px] mb-3" />
          <Button size="sm" className="bg-blue-600" onClick={handleSave} disabled={saving}><Save className="w-4 h-4 mr-1" />{saving ? 'Saving...' : 'Save'}</Button>
        </CardContent></Card>

        {/* Stats */}
        <Card className="bg-[#1e293b] border-white/10 lg:col-span-2"><CardContent className="p-5">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-[#0f172a] rounded-lg"><Award className="w-6 h-6 text-amber-400 mx-auto mb-1" /><p className="text-2xl font-bold">{points?.balance || 0}</p><p className="text-xs text-gray-500">YC Points</p></div>
            <div className="text-center p-4 bg-[#0f172a] rounded-lg"><Zap className="w-6 h-6 text-emerald-400 mx-auto mb-1" /><p className="text-2xl font-bold">{aiTotal - aiUsed}/{aiTotal}</p><p className="text-xs text-gray-500">AI Left Today</p></div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Daily AI Usage</p>
            <Progress value={(aiUsed / aiTotal) * 100} className="h-2" />
            <p className="text-xs text-gray-500">{aiUsed} used · {aiTotal - aiUsed} remaining</p>
          </div>
          {profile && (
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium">Academic Profile</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="p-2 bg-[#0f172a] rounded"><span className="text-gray-500">Curriculum:</span> {profile.curriculum}</div>
                <div className="p-2 bg-[#0f172a] rounded"><span className="text-gray-500">Year:</span> {profile.year}</div>
                <div className="p-2 bg-[#0f172a] rounded"><span className="text-gray-500">Subjects:</span> {(profile.subjects || []).length} selected</div>
                <div className="p-2 bg-[#0f172a] rounded"><span className="text-gray-500">Countries:</span> {(profile.target_countries || []).join(', ') || 'None'}</div>
              </div>
            </div>
          )}
        </CardContent></Card>
      </div>
    </div>
  );
}
