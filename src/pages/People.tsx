import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Users, UserPlus, Send, MessageCircle, AlertTriangle, Group } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function People() {
  const { user } = useAuth();
  const [friends, setFriends] = useState<any[]>([]);
  const [, setLoading] = useState(true);
  const [groups, setGroups] = useState<any[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [msgInput, setMsgInput] = useState('');
  const [newFriendId, setNewFriendId] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [activeTab, setActiveTab] = useState('friends');

  const fetchData = async () => {
    setLoading(true);
    setLoading(true);
    if (!user) return;
    // Friendships where user is requester or addressee
    const { data: fData } = await supabase
      .from('friendships').select('*, requester:users!requester_id(name, avatar_url), addressee:users!addressee_id(name, avatar_url)')
      .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`)
      .eq('status', 'accepted');
    setFriends((fData || []).map((f: any) => ({
      id: f.requester_id === user.id ? f.addressee_id : f.requester_id,
      name: f.requester_id === user.id ? f.addressee?.name : f.requester?.name,
      friendship_id: f.id,
    })));

    // Groups
    const { data: gData } = await supabase
      .from('chat_groups').select('*')
      .or(`created_by.eq.${user.id},is_public.eq.true`)
      .order('created_at', { ascending: false });
    setGroups(gData || []);
  };

  useEffect(() => { fetchData(); }, [user]);

  useEffect(() => {
    if (!activeChat || !user) { setMessages([]); return; }
    // Determine if friend or group chat
    const isGroup = groups.some(g => g.id === activeChat);
    loadMessages(activeChat, isGroup ? 'group' : 'friend');
    const interval = setInterval(() => loadMessages(activeChat, isGroup ? 'group' : 'friend'), 5000);
    return () => clearInterval(interval);
  }, [activeChat, user]);

  const loadMessages = async (chatId: string, type: 'friend' | 'group') => {
    if (!user) return;
    let q = supabase.from('social_messages').select('*').order('created_at', { ascending: true }).limit(50);
    if (type === 'group') {
      q = q.eq('group_id', chatId);
    } else {
      q = q.or(`and(sender_id.eq.${user.id},receiver_id.eq.${chatId}),and(sender_id.eq.${chatId},receiver_id.eq.${user.id})`);
    }
    const { data } = await q;
    setMessages(data || []);
  };

  const sendMessage = async () => {
    if (!user || !msgInput.trim() || !activeChat) return;
    const isGroup = groups.some(g => g.id === activeChat);
    const payload: any = { sender_id: user.id, content: msgInput.trim() };
    if (isGroup) payload.group_id = activeChat;
    else payload.receiver_id = activeChat;
    await supabase.from('social_messages').insert(payload);
    setMsgInput('');
    loadMessages(activeChat, isGroup ? 'group' : 'friend');
  };

  const addFriend = async () => {
    if (!user || !newFriendId.trim()) return;
    await supabase.from('friendships').insert({ requester_id: user.id, addressee_id: newFriendId.trim(), status: 'pending' });
    setNewFriendId('');
    fetchData();
  };

  const createGroup = async () => {
    if (!user || !newGroupName.trim()) return;
    await supabase.from('chat_groups').insert({ name: newGroupName.trim(), created_by: user.id, is_public: false });
    setNewGroupName('');
    fetchData();
  };

  const activeFriend = friends.find(f => f.id === activeChat);
  const activeGroup = groups.find(g => g.id === activeChat);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold flex items-center gap-2"><Users className="w-6 h-6 text-cyan-400" />People</h2><p className="text-gray-400 mt-1">Friends, groups, and messages</p></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-12rem)]">
        {/* Sidebar */}
        <Card className="bg-[#1e293b] border-white/10 lg:col-span-1 overflow-hidden flex flex-col">
          <CardContent className="p-0 flex flex-col h-full">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
              <TabsList className="m-3 bg-[#0f172a]"><TabsTrigger value="friends">Friends</TabsTrigger><TabsTrigger value="groups">Groups</TabsTrigger></TabsList>
              <TabsContent value="friends" className="flex-1 overflow-y-auto px-3 pb-3 m-0 mt-0">
                <div className="flex gap-2 mb-3"><Input placeholder="User ID to add" value={newFriendId} onChange={e => setNewFriendId(e.target.value)} className="bg-[#0f172a] border-white/10 text-xs" /><Button size="sm" className="bg-cyan-600" onClick={addFriend}><UserPlus className="w-4 h-4" /></Button></div>
                {friends.length === 0 ? <p className="text-xs text-gray-500 text-center py-4">No friends yet</p> : friends.map(f => (
                  <button key={f.id} onClick={() => setActiveChat(f.id)} className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors mb-1 ${activeChat === f.id ? 'bg-cyan-500/10' : 'hover:bg-white/5'}`}>
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">{f.name?.[0] || '?'}</div>
                    <span className="text-sm">{f.name || 'Unknown'}</span>
                  </button>
                ))}
              </TabsContent>
              <TabsContent value="groups" className="flex-1 overflow-y-auto px-3 pb-3 m-0 mt-0">
                <div className="flex gap-2 mb-3"><Input placeholder="Group name" value={newGroupName} onChange={e => setNewGroupName(e.target.value)} className="bg-[#0f172a] border-white/10 text-xs" /><Button size="sm" className="bg-cyan-600" onClick={createGroup}><Group className="w-4 h-4" /></Button></div>
                {groups.length === 0 ? <p className="text-xs text-gray-500 text-center py-4">No groups yet</p> : groups.map(g => (
                  <button key={g.id} onClick={() => setActiveChat(g.id)} className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors mb-1 ${activeChat === g.id ? 'bg-cyan-500/10' : 'hover:bg-white/5'}`}>
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold">{g.name?.[0]}</div>
                    <span className="text-sm">{g.name}</span>
                  </button>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Chat */}
        <Card className="bg-[#1e293b] border-white/10 lg:col-span-2 flex flex-col overflow-hidden">
          <CardContent className="p-0 flex flex-col h-full">
            {activeChat ? (
              <>
                <div className="p-3 border-b border-white/10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">{(activeFriend?.name || activeGroup?.name)?.[0]}</div>
                  <div><p className="font-medium text-sm">{activeFriend?.name || activeGroup?.name}</p><p className="text-xs text-gray-500">{activeFriend ? 'Direct Message' : `${activeGroup ? 'Group Chat' : ''}`}</p></div>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                  {messages.length === 0 && <p className="text-xs text-gray-500 text-center py-8">No messages yet. Say hi!</p>}
                  {messages.map(m => (
                    <div key={m.id} className={`flex ${m.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] rounded-xl px-3 py-2 text-sm ${m.sender_id === user?.id ? 'bg-cyan-600 text-white' : 'bg-[#0f172a] text-gray-300'}`}>{m.content}</div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs text-amber-400/60 mb-2"><AlertTriangle className="w-3 h-3" />Messages auto-delete after 7 days</div>
                  <div className="flex gap-2"><Input value={msgInput} onChange={e => setMsgInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Type a message..." className="bg-[#0f172a] border-white/10" /><Button size="icon" className="bg-cyan-600" onClick={sendMessage}><Send className="w-4 h-4" /></Button></div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500"><MessageCircle className="w-12 h-12 opacity-30" /></div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
