import { useState } from 'react';
import { Heart, TrendingUp, Clock, ThumbsUp, MessageCircle, Bookmark, Search, Sparkles, Flame, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const notes = [
  { id: 'n1', title: 'AP Calc BC: Chain Rule Summary', content: 'The Chain Rule is crucial for differentiating composite functions. Think of it like peeling an onion - you have to deal with the outer layer first, then work your way inside...', author: 'Yhea Learner', avatar: 'Y', heat: 320, likes: 42, comments: 8, bookmarks: 15, views: 520, date: '2h ago', tags: ['calculus', 'chain-rule'], color: 'from-blue-500 to-cyan-500' },
  { id: 'n2', title: 'IB Physics IA: Complete Guide', content: 'After spending 3 months on my Physics IA, here is everything I learned about choosing a topic, structuring your report, and getting that 7...', author: 'PhysicsWhiz', avatar: 'P', heat: 285, likes: 38, comments: 12, bookmarks: 22, views: 480, date: '5h ago', tags: ['physics', 'IB', 'IA'], color: 'from-purple-500 to-pink-500' },
  { id: 'n3', title: 'US vs UK: Which Is Right For You?', content: 'I applied to both US and UK universities and got into MIT and Cambridge. Here is my honest comparison of the two systems...', author: 'AppGuru', avatar: 'A', heat: 450, likes: 67, comments: 23, bookmarks: 34, views: 890, date: '1d ago', tags: ['application', 'US', 'UK'], color: 'from-amber-500 to-orange-500' },
  { id: 'n4', title: 'SAT Math: Top 10 Formulas You Must Know', content: 'After scoring 800 on SAT Math, these are the formulas that saved me the most time during the test...', author: 'MathMaster', avatar: 'M', heat: 210, likes: 29, comments: 5, bookmarks: 18, views: 340, date: '1d ago', tags: ['SAT', 'math', 'formulas'], color: 'from-emerald-500 to-teal-500' },
  { id: 'n5', title: 'How I Scored 1550 on My First SAT Attempt', content: 'Three months of consistent prep, these were the resources and strategies that worked for me...', author: 'SATChamp', avatar: 'S', heat: 180, likes: 24, comments: 6, bookmarks: 11, views: 290, date: '2d ago', tags: ['SAT', 'study-tips'], color: 'from-red-500 to-rose-500' },
  { id: 'n6', title: 'TOK Essay: Knowledge Question Framework', content: 'The secret to a strong TOK essay is framing your knowledge question correctly. Here is the framework I used...', author: 'TOKExpert', avatar: 'T', heat: 150, likes: 19, comments: 4, bookmarks: 9, views: 220, date: '3d ago', tags: ['TOK', 'IB', 'essay'], color: 'from-indigo-500 to-violet-500' },
];

export default function Plaza() {
  const [tab, setTab] = useState('trending');
  const [search, setSearch] = useState('');

  const sorted = tab === 'trending' ? [...notes].sort((a, b) => b.heat - a.heat) : [...notes].sort((a, b) => (a.date > b.date ? -1 : 1));
  const filtered = search ? sorted.filter(n => n.title.toLowerCase().includes(search.toLowerCase()) || n.tags.some(t => t.includes(search.toLowerCase()))) : sorted;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div><h2 className="text-2xl font-bold flex items-center gap-2"><Heart className="w-6 h-6 text-pink-400" />Plaza</h2><p className="text-gray-400 mt-1">Discover and share knowledge with the community</p></div>
        <div className="flex items-center gap-2 bg-amber-500/10 px-3 py-2 rounded-lg"><Zap className="w-4 h-4 text-amber-400" /><span className="text-xs font-medium text-amber-400">Publish notes to earn YC!</span></div>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1"><Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" /><Input placeholder="Search notes, topics, tags..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 bg-[#1e293b] border-white/10" /></div>
      </div>

      <div className="flex gap-2">
        <button onClick={() => setTab('trending')} className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === 'trending' ? 'bg-pink-500/20 text-pink-400' : 'bg-[#1e293b] text-gray-400'}`}><TrendingUp className="w-4 h-4" />Trending</button>
        <button onClick={() => setTab('latest')} className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === 'latest' ? 'bg-pink-500/20 text-pink-400' : 'bg-[#1e293b] text-gray-400'}`}><Clock className="w-4 h-4" />Latest</button>
        <button onClick={() => setTab('following')} className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === 'following' ? 'bg-pink-500/20 text-pink-400' : 'bg-[#1e293b] text-gray-400'}`}><Sparkles className="w-4 h-4" />Following</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(note => (
          <Card key={note.id} className="bg-[#1e293b] border-white/10 hover:border-pink-500/30 transition-all cursor-pointer group overflow-hidden">
            {/* Color bar */}
            <div className={`h-1 bg-gradient-to-r ${note.color}`} />
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${note.color} flex items-center justify-center text-xs font-bold`}>{note.avatar}</div>
                <div><p className="text-sm font-medium">{note.author}</p><p className="text-xs text-gray-500">{note.date}</p></div>
                {note.heat > 300 && <Badge className="ml-auto bg-red-500/20 text-red-400 text-xs"><Flame className="w-3 h-3 mr-1" />Hot</Badge>}
              </div>
              <h3 className="font-bold text-lg mb-2 group-hover:text-pink-400 transition-colors">{note.title}</h3>
              <p className="text-sm text-gray-400 line-clamp-2">{note.content}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {note.tags.map(t => <Badge key={t} variant="secondary" className="text-[10px] bg-white/5">{t}</Badge>)}
              </div>
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/5">
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-pink-400"><ThumbsUp className="w-3.5 h-3.5" />{note.likes}</button>
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-400"><MessageCircle className="w-3.5 h-3.5" />{note.comments}</button>
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-amber-400"><Bookmark className="w-3.5 h-3.5" />{note.bookmarks}</button>
                <span className="text-xs text-gray-600 ml-auto">{note.views} views</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
