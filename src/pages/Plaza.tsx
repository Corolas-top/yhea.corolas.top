import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Heart, Bookmark, MessageSquare, Compass } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function Plaza() {
  const [notes, setNotes] = useState<any[]>([]);
  useEffect(() => { supabase.from('notes').select('*, author:users(name)').eq('visibility', 'published').order('heat_score', { ascending: false }).limit(20).then(({ data }) => setNotes(data || [])); }, []);

  const interact = async (noteId: string, type: 'like' | 'bookmark') => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;
    const { data: ex } = await supabase.from('note_interactions').select('id').eq('note_id', noteId).eq('user_id', session.user.id).eq('type', type).single();
    if (ex) await supabase.from('note_interactions').delete().eq('id', ex.id);
    else await supabase.from('note_interactions').insert({ note_id: noteId, user_id: session.user.id, type });
    supabase.from('notes').select('*, author:users(name)').eq('visibility', 'published').order('heat_score', { ascending: false }).limit(20).then(({ data }) => setNotes(data || []));
  };

  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold flex items-center gap-2"><Compass className="w-6 h-6 text-purple-400" />Plaza</h2><p className="text-gray-400 mt-1 text-sm">Discover published notes from the community</p></div>
      {notes.length === 0 ? <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-8 text-center text-gray-500">No published notes yet.</CardContent></Card> : (
        <div className="space-y-3">
          {notes.map(n => (
            <Card key={n.id} className="bg-[#1e293b] border-white/10">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold flex-shrink-0">{(n.author?.name || 'Y')[0]}</div>
                  <div className="flex-1">
                    <p className="font-medium">{n.title}</p>
                    {n.content && <p className="text-sm text-gray-400 mt-1 line-clamp-3">{n.content.slice(0, 200)}</p>}
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                      <button onClick={() => interact(n.id, 'like')} className="flex items-center gap-1 hover:text-red-400"><Heart className="w-3.5 h-3.5" />{n.likes_count || 0}</button>
                      <button onClick={() => interact(n.id, 'bookmark')} className="flex items-center gap-1 hover:text-amber-400"><Bookmark className="w-3.5 h-3.5" />{n.bookmarks_count || 0}</button>
                      <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" />{n.comments_count || 0}</span>
                      <span className="ml-auto text-amber-400 font-medium">{n.heat_score || 0} pts</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
