import { useState } from 'react';
import { useNotes } from '@/hooks/useStore';
import {
  Heart, TrendingUp, Clock, ThumbsUp, MessageCircle, Bookmark,
  Share2, Search, Sparkles, Flame, Zap
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Plaza() {
  const { notes } = useNotes();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const published = notes.filter(n => n.visibility === 'published');

  const filtered = published.filter(n => {
    const matchSearch = !search || n.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'all' || n.course_id?.includes(activeFilter.toLowerCase());
    return matchSearch && matchFilter;
  });

  const sortedByHeat = [...filtered].sort((a, b) => (b.heat_score || 0) - (a.heat_score || 0));
  const sortedByNewest = [...filtered].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2"><Heart className="w-6 h-6" /> Plaza</h2>
          <p className="text-gray-500 mt-1">Discover and share knowledge with the community</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 px-4 py-2 rounded-lg">
          <Zap className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-medium text-amber-700">Publish notes to earn YC credits!</span>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input placeholder="Search notes..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <select value={activeFilter} onChange={e => setActiveFilter(e.target.value)} className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm">
          <option value="all">All Subjects</option>
          <option value="calc">Calculus</option>
          <option value="physics">Physics</option>
          <option value="application">Application</option>
        </select>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="trending">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="trending"><TrendingUp className="w-4 h-4 mr-1" />Trending</TabsTrigger>
          <TabsTrigger value="latest"><Clock className="w-4 h-4 mr-1" />Latest</TabsTrigger>
          <TabsTrigger value="following"><Sparkles className="w-4 h-4 mr-1" />Following</TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedByHeat.map(note => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="latest" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedByNewest.map(note => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="following" className="mt-6">
          <div className="text-center py-12 text-gray-500">
            <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Follow creators to see their notes here!</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function NoteCard({ note }: { note: any }) {
  return (
    <Card className="hover:shadow-lg transition-all cursor-pointer group">
      <CardContent className="p-5">
        {/* Author */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
            {note.author?.name?.[0] || 'Y'}
          </div>
          <div>
            <p className="text-sm font-medium">{note.author?.name || 'Anonymous'}</p>
            <p className="text-xs text-gray-500">{new Date(note.created_at).toLocaleDateString()}</p>
          </div>
          {note.heat_score > 100 && (
            <Badge className="ml-auto bg-red-100 text-red-700"><Flame className="w-3 h-3 mr-1" />Hot</Badge>
          )}
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">{note.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-3">{note.content_text || 'No preview available'}</p>

        {/* Tags */}
        {note.topic_tags && note.topic_tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {note.topic_tags.map((t: string, i: number) => (
              <Badge key={i} variant="secondary" className="text-xs">{t}</Badge>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
          <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors">
            <ThumbsUp className="w-4 h-4" />{note.likes_count}
          </button>
          <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-500 transition-colors">
            <MessageCircle className="w-4 h-4" />{note.comments_count}
          </button>
          <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-amber-500 transition-colors">
            <Bookmark className="w-4 h-4" />{note.bookmarks_count}
          </button>
          <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-green-500 transition-colors ml-auto">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
