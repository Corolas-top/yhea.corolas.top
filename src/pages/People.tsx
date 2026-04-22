import { useState } from 'react';
import { Users, Search, MessageCircle, UserPlus, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const friends = [
  { id: 'f1', name: 'Alex Chen', status: 'online', last_msg: 'Hey, did you finish the Calc problem set?' },
  { id: 'f2', name: 'Sarah Kim', status: 'offline', last_msg: 'Thanks for the notes!' },
  { id: 'f3', name: 'Jordan Lee', status: 'online', last_msg: 'Let me check that for you' },
];

const groups = [
  { id: 'g1', name: 'AP Calc BC Study Group', members: 12, last_msg: 'Anyone up for a practice session?' },
  { id: 'g2', name: 'Class of 2027 Applications', members: 45, last_msg: 'MIT deadline is coming up!' },
];

const messages: Record<string, Array<{role: string; content: string}>> = {
  f1: [
    { role: 'them', content: 'Hey! Did you finish the Calc problem set?' },
    { role: 'me', content: 'Almost done! Stuck on #12 about integration by parts' },
    { role: 'them', content: 'Oh I got that one! Want me to walk you through it?' },
  ],
};

export default function People() {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState(messages);

  const activeFriend = friends.find(f => f.id === activeChat);
  const activeGroup = groups.find(g => g.id === activeChat);
  const currentMessages = chatMessages[activeChat || ''] || [];

  const sendMessage = () => {
    if (!chatInput.trim() || !activeChat) return;
    setChatMessages(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), { role: 'me', content: chatInput }],
    }));
    setChatInput('');
  };

  if (activeChat) {
    return (
      <div className="flex flex-col h-[calc(100vh-6rem)] bg-[#1e293b] border border-white/10 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <button onClick={() => setActiveChat(null)} className="text-gray-400 hover:text-white"><MessageCircle className="w-5 h-5" /></button>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">{(activeFriend?.name || activeGroup?.name)?.[0]}</div>
            <div><p className="font-medium text-sm">{activeFriend?.name || activeGroup?.name}</p><p className="text-xs text-gray-500">{activeFriend ? (activeFriend.status === 'online' ? 'Online' : 'Offline') : `${activeGroup?.members} members`}</p></div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {currentMessages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${m.role === 'me' ? 'bg-blue-600 text-white' : 'bg-[#0f172a] text-gray-300'}`}>{m.content}</div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-white/10 flex gap-2">
          <Input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Type a message..." className="bg-[#0f172a] border-white/10" />
          <Button size="sm" className="bg-blue-600" onClick={sendMessage}>Send</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold flex items-center gap-2"><Users className="w-6 h-6 text-cyan-400" />People</h2><p className="text-gray-400 mt-1">Connect with fellow students</p></div>
        <Button className="bg-cyan-600"><UserPlus className="w-4 h-4 mr-1" />Add Friend</Button>
      </div>

      {/* Privacy Notice */}
      <div className="flex items-start gap-2 p-3 bg-amber-500/5 border border-amber-500/10 rounded-lg">
        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-400/80">Chats are automatically deleted after 7 days to protect your privacy.</p>
      </div>

      <div className="relative"><Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" /><Input placeholder="Search friends or groups..." className="pl-10 bg-[#1e293b] border-white/10" /></div>

      <Tabs defaultValue="friends">
        <TabsList className="bg-[#1e293b] border border-white/10"><TabsTrigger value="friends">Friends ({friends.length})</TabsTrigger><TabsTrigger value="groups">Groups ({groups.length})</TabsTrigger></TabsList>

        <TabsContent value="friends" className="mt-4 space-y-2">
          {friends.map(f => (
            <Card key={f.id} className="bg-[#1e293b] border-white/10 hover:border-cyan-500/30 transition-all cursor-pointer" onClick={() => setActiveChat(f.id)}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="relative"><div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm">{f.name[0]}</div><div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#1e293b] ${f.status === 'online' ? 'bg-emerald-500' : 'bg-gray-500'}`} /></div>
                <div className="flex-1 min-w-0"><p className="font-medium text-sm">{f.name}</p><p className="text-xs text-gray-500 truncate">{f.last_msg}</p></div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="groups" className="mt-4 space-y-2">
          {groups.map(g => (
            <Card key={g.id} className="bg-[#1e293b] border-white/10 hover:border-cyan-500/30 transition-all cursor-pointer" onClick={() => setActiveChat(g.id)}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center"><Users className="w-5 h-5" /></div>
                <div className="flex-1 min-w-0"><p className="font-medium text-sm">{g.name}</p><p className="text-xs text-gray-500">{g.members} members · {g.last_msg}</p></div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
