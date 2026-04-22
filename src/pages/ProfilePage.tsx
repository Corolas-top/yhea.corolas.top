import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { User, Mail, Tag, BookOpen, Globe, Award, Save, Upload } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [tags, setTags] = useState(user?.tags?.join(', ') || '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await (supabase.from('users') as any).update({
      name, bio,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    }).eq('id', user.id);
    if (!error) {
      setMessage('Profile updated!');
      refreshUser();
    }
    setSaving(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    const path = `avatars/${user.id}/${Date.now()}.${file.name.split('.').pop()}`;
    const { error: upErr } = await supabase.storage.from('yhea').upload(path, file);
    if (upErr) { setMessage('Upload failed'); return; }
    const { data } = supabase.storage.from('yhea').getPublicUrl(path);
    await (supabase.from('users') as any).update({ avatar_url: data.publicUrl }).eq('id', user.id);
    refreshUser();
    setMessage('Avatar updated!');
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold flex items-center gap-2"><User className="w-6 h-6" />My Profile</h2>

      {/* Avatar */}
      <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-6 flex items-center gap-6">
        <div className="relative">
          {user?.avatar_url ? (
            <img src={user.avatar_url} className="w-20 h-20 rounded-full object-cover" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold">{user?.name?.[0] || 'Y'}</div>
          )}
          <label className="absolute -bottom-1 -right-1 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700">
            <Upload className="w-3.5 h-3.5" /><input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} />
          </label>
        </div>
        <div>
          <h3 className="font-bold text-lg">{user?.name}</h3>
          <p className="text-sm text-gray-400 flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{user?.email}</p>
          <div className="flex gap-2 mt-2">
            {user?.tags?.map(t => <span key={t} className="text-xs bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full">{t}</span>)}
          </div>
        </div>
      </CardContent></Card>

      {/* Edit Form */}
      <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-6 space-y-4">
        <div><label className="text-sm font-medium text-gray-300">Display Name</label><Input value={name} onChange={e => setName(e.target.value)} className="mt-1 bg-[#0f172a] border-white/10" /></div>
        <div><label className="text-sm font-medium text-gray-300">Bio</label><Input value={bio} onChange={e => setBio(e.target.value)} placeholder="A short intro..." className="mt-1 bg-[#0f172a] border-white/10" /></div>
        <div><label className="text-sm font-medium text-gray-300">Tags (comma separated)</label><Input value={tags} onChange={e => setTags(e.target.value)} placeholder="e.g. Math Lover, CS Enthusiast" className="mt-1 bg-[#0f172a] border-white/10" /></div>
        {message && <p className="text-sm text-emerald-400">{message}</p>}
        <Button onClick={handleSave} disabled={saving} className="bg-blue-600"><Save className="w-4 h-4 mr-2" />{saving ? 'Saving...' : 'Save Changes'}</Button>
      </CardContent></Card>

      {/* Academic Info Display */}
      <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2"><BookOpen className="w-4 h-4 text-blue-400" />Academic Info</h3>
        <p className="text-sm text-gray-400 mb-3">This is set during onboarding. Go through onboarding again to change.</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-[#0f172a] rounded-lg"><p className="text-xs text-gray-500">Curriculum</p><p className="text-sm font-medium">AP</p></div>
          <div className="p-3 bg-[#0f172a] rounded-lg"><p className="text-xs text-gray-500">Year</p><p className="text-sm font-medium">Year 2</p></div>
          <div className="p-3 bg-[#0f172a] rounded-lg"><p className="text-xs text-gray-500">Subjects</p><p className="text-sm font-medium">Calculus BC, Physics C, CS A</p></div>
          <div className="p-3 bg-[#0f172a] rounded-lg"><p className="text-xs text-gray-500">Target Countries</p><p className="text-sm font-medium">USA, Canada</p></div>
        </div>
      </CardContent></Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-4 text-center">
          <Award className="w-5 h-5 text-amber-400 mx-auto mb-1" /><p className="text-lg font-bold">12</p><p className="text-xs text-gray-500">Notes</p>
        </CardContent></Card>
        <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-4 text-center">
          <Globe className="w-5 h-5 text-blue-400 mx-auto mb-1" /><p className="text-lg font-bold">5</p><p className="text-xs text-gray-500">Chats</p>
        </CardContent></Card>
        <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-4 text-center">
          <Tag className="w-5 h-5 text-emerald-400 mx-auto mb-1" /><p className="text-lg font-bold">350</p><p className="text-xs text-gray-500">YC Earned</p>
        </CardContent></Card>
      </div>
    </div>
  );
}
