import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Layers, Plus, Trash2, RotateCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Flashcards() {
  const { user } = useAuth();
  const [decks, setDecks] = useState<any[]>([]);
  const [pubDecks, setPubDecks] = useState<any[]>([]);
  const [cards, setCards] = useState<any[]>([]);
  const [selDeck, setSelDeck] = useState<any>(null);
  const [study, setStudy] = useState(false);
  const [idx, setIdx] = useState(0);
  const [flip, setFlip] = useState(false);
  const [showDeck, setShowDeck] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [dTitle, setDTitle] = useState('');
  const [cFront, setCFront] = useState('');
  const [cBack, setCBack] = useState('');

  useEffect(() => { fetchData(); }, [user]);

  const fetchData = async () => {
    if (user) {
      const { data } = await supabase.from('flashcard_decks').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
      setDecks(data || []);
    }
    const { data: pd } = await supabase.from('flashcard_decks').select('*').eq('is_public', true).order('created_at', { ascending: false }).limit(20);
    setPubDecks(pd || []);
  };

  const fetchCards = async (deckId: string) => {
    const { data } = await supabase.from('flashcards').select('*').eq('deck_id', deckId).order('created_at', { ascending: true });
    setCards(data || []);
  };

  const createDeck = async () => {
    if (!user || !dTitle.trim()) return;
    await supabase.from('flashcard_decks').insert({ user_id: user.id, title: dTitle.trim(), card_count: 0, is_public: false });
    setShowDeck(false); setDTitle(''); fetchData();
  };

  const addCard = async () => {
    if (!selDeck || !cFront.trim() || !cBack.trim()) return;
    await supabase.from('flashcards').insert({ deck_id: selDeck.id, front: cFront.trim(), back: cBack.trim() });
    setShowCard(false); setCFront(''); setCBack(''); fetchCards(selDeck.id); fetchData();
  };

  const delCard = async (id: string) => { await supabase.from('flashcards').delete().eq('id', id); if (selDeck) fetchCards(selDeck.id); fetchData(); };

  if (study && cards.length > 0) {
    const card = cards[idx];
    return (
      <div className="space-y-4 max-w-lg mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Study: {selDeck?.title}</h2>
          <Button variant="outline" size="sm" className="border-white/10" onClick={() => { setStudy(false); setIdx(0); setFlip(false); }}>Exit</Button>
        </div>
        <p className="text-sm text-gray-500">{idx + 1} / {cards.length}</p>
        <div className="perspective-[1000px] cursor-pointer" onClick={() => setFlip(!flip)}>
          <div className="relative w-full h-72 transition-transform duration-500" style={{ transformStyle: 'preserve-3d', transform: flip ? 'rotateY(180deg)' : '' }}>
            <Card className="absolute inset-0 bg-[#1e293b] border-white/10 flex items-center justify-center"><CardContent className="text-center"><p className="text-lg">{card.front}</p><p className="text-xs text-gray-500 mt-4">Click to flip</p></CardContent></Card>
            <Card className="absolute inset-0 bg-[#1e293b] border-emerald-500/30 flex items-center justify-center" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}><CardContent className="text-center"><p className="text-lg text-emerald-400">{card.back}</p></CardContent></Card>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <Button variant="outline" size="sm" disabled={idx === 0} onClick={() => { setIdx(i => i - 1); setFlip(false); }}><ChevronLeft className="w-4 h-4" /></Button>
          <Button size="sm" className="bg-emerald-600" onClick={() => setFlip(!flip)}><RotateCw className="w-4 h-4 mr-1" />Flip</Button>
          <Button variant="outline" size="sm" disabled={idx === cards.length - 1} onClick={() => { setIdx(i => i + 1); setFlip(false); }}><ChevronRight className="w-4 h-4" /></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold flex items-center gap-2"><Layers className="w-6 h-6 text-emerald-400" />Flashcards</h2></div>
        <Button size="sm" className="bg-emerald-600" onClick={() => setShowDeck(true)}><Plus className="w-4 h-4 mr-1" />Deck</Button>
      </div>
      {!selDeck ? (
        <Tabs defaultValue="private">
          <TabsList className="bg-[#1e293b] border border-white/10"><TabsTrigger value="private">My Decks</TabsTrigger><TabsTrigger value="public">Public</TabsTrigger></TabsList>
          <TabsContent value="private" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {decks.map(d => <Card key={d.id} className="bg-[#1e293b] border-white/10 cursor-pointer hover:border-emerald-500/30" onClick={() => { setSelDeck(d); fetchCards(d.id); }}><CardContent className="p-4"><p className="font-medium">{d.title}</p><p className="text-xs text-gray-500">{d.card_count || 0} cards</p></CardContent></Card>)}
              {decks.length === 0 && <p className="text-gray-500 text-sm col-span-3">No decks. Create one!</p>}
            </div>
          </TabsContent>
          <TabsContent value="public" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {pubDecks.map(d => <Card key={d.id} className="bg-[#1e293b] border-white/10 cursor-pointer hover:border-emerald-500/30" onClick={() => { setSelDeck(d); fetchCards(d.id); }}><CardContent className="p-4"><p className="font-medium">{d.title}</p><p className="text-xs text-gray-500">{d.card_count || 0} cards · Public</p></CardContent></Card>)}
              {pubDecks.length === 0 && <p className="text-gray-500 text-sm col-span-3">No public decks yet.</p>}
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" className="border-white/10" onClick={() => { setSelDeck(null); setCards([]); }}><ChevronLeft className="w-4 h-4 mr-1" />Back</Button>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="border-white/10" onClick={() => setShowCard(true)}><Plus className="w-4 h-4 mr-1" />Card</Button>
              {cards.length > 0 && <Button size="sm" className="bg-emerald-600" onClick={() => { setStudy(true); setIdx(0); setFlip(false); }}>Study</Button>}
            </div>
          </div>
          <h3 className="font-bold">{selDeck.title} ({cards.length} cards)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {cards.map(c => <Card key={c.id} className="bg-[#1e293b] border-white/10"><CardContent className="p-3 flex justify-between items-center"><div><p className="text-sm text-emerald-400">{c.front}</p><p className="text-sm text-gray-300">{c.back}</p></div><button onClick={() => delCard(c.id)} className="text-red-400"><Trash2 className="w-4 h-4" /></button></CardContent></Card>)}
          </div>
        </div>
      )}
      <Dialog open={showDeck} onOpenChange={setShowDeck}><DialogContent className="bg-[#1e293b] border-white/10 text-white max-w-sm"><DialogHeader><DialogTitle>New Deck</DialogTitle></DialogHeader><div className="space-y-3"><Input placeholder="Title" value={dTitle} onChange={e => setDTitle(e.target.value)} className="bg-[#0f172a] border-white/10" /><Button className="w-full bg-emerald-600" onClick={createDeck} disabled={!dTitle.trim()}>Create</Button></div></DialogContent></Dialog>
      <Dialog open={showCard} onOpenChange={setShowCard}><DialogContent className="bg-[#1e293b] border-white/10 text-white max-w-sm"><DialogHeader><DialogTitle>Add Card</DialogTitle></DialogHeader><div className="space-y-3"><Input placeholder="Front" value={cFront} onChange={e => setCFront(e.target.value)} className="bg-[#0f172a] border-white/10" /><Input placeholder="Back" value={cBack} onChange={e => setCBack(e.target.value)} className="bg-[#0f172a] border-white/10" /><Button className="w-full bg-emerald-600" onClick={addCard} disabled={!cFront.trim() || !cBack.trim()}>Add</Button></div></DialogContent></Dialog>
    </div>
  );
}
